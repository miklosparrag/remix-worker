import { drizzle } from "drizzle-orm/d1";
import { eq, and, InferSelectModel } from "drizzle-orm";
import { AppLoadContext } from "@remix-run/server-runtime";
import { vanceUploads } from "db/schema/vanceUpload";
import { vanceJobs } from "db/schema/vanceTransformation";
import { image } from "~/sanity/image";
import { PgJsonBuilder } from "drizzle-orm/pg-core";
import { s } from "node_modules/framer-motion/dist/types.d-CQt5spQA";

type VanceStatus = "finish" | "waiting" | "fatal" | "process";

type VanceUploadResponse = {
  code: number;
  cscode: number;
  data: {
    uid: string;
    name: string;
    thumbnail: string;
    w: number;
    h: number;
    filesize: number;
  };
  ip: string;
};

type VanceTransformResponse = {
  code: number;
  cscode: number;
  data: {
    trans_id: string;
    status: VanceStatus;
  };
  ip: string;
};

const checkProgress = async (transId: string) => {
  var form = new FormData();
  form.append("api_token", process.env.VANCEAI_API_KEY);
  form.append("trans_id", transId);

  // Vance AI tranfromation
  const res = await fetch(
    "https://api-service.vanceai.com/web_api/v1/progress",
    {
      method: "POST",
      body: form,
    }
  );
  const data: VanceTransformResponse = await res.json();

  return data.data.status;
};

export const vanceUpload = async (
  context: AppLoadContext,
  imageUrl: string,
  name: string,
  jobId: string
) => {
  if (!process.env.VANCEAI_API_KEY) {
    return;
    // error
  }

  const response = await fetch(imageUrl);
  var form = new FormData();
  var blob = await response.blob();
  form.append("api_token", process.env.VANCEAI_API_KEY);
  form.append("file", blob, name);

  const res = await fetch("https://api-service.vanceai.com/web_api/v1/upload", {
    method: "POST",
    body: form,
  });

  const data: VanceUploadResponse = await res.json();
  console.log("Vance AI upload response:", data);

  // save to database
  const db = drizzle(context.env.DB);

  const result = await db
    .insert(vanceUploads)
    .values({
      uid: data.data.uid,
      name: data.data.name,
      thumbnail: data.data.thumbnail || "",
      width: data.data.w,
      height: data.data.h,
      filesize: data.data.filesize,
    })
    .returning({ id: vanceUploads.id, uid: vanceUploads.uid });

  console.log(result);

  return result[0];
};

export const vanceTransform = async (
  context: AppLoadContext,
  uid: string,
  config: {}
) => {
  console.log("Vance AI transformation started for jobId:", uid);

  let image;
  let db;
  try {
    db = drizzle(context.env.DB);
    console.log("after db");
    const result = await db
      .select()
      .from(vanceUploads)
      .where(eq(vanceUploads.uid, uid))
      .limit(1);

    image = result[0];

    if (!image) {
      console.error("No image found for uid:", uid);
      return;
    }
    console.log("Image found for uid:", uid, image);
  } catch (error) {
    console.error("Error fetching image for uid:", uid, error);
    return;
  }
  console.log(image);
  if (!process.env.VANCEAI_API_KEY || !image) {
    return;
    // error
  }

  var form = new FormData();
  form.append("api_token", process.env.VANCEAI_API_KEY);
  form.append("uid", image?.uid);
  //form.append("webhook", "https://shopitest.parrag.net/api/vance-hook");
  form.append("jconfig", JSON.stringify(config));

  // Vance AI tranfromation
  const res = await fetch(
    "https://api-service.vanceai.com/web_api/v1/transform",
    {
      method: "POST",
      body: form,
    }
  );

  const data: VanceTransformResponse = await res.json();

  console.log("Vance AI transformation response:", data);

  const transId: string = data.data.trans_id;
  const status: string = data.data.status;

  if (status === "fatal") {
    console.error("Vance AI transformation failed:", data);
    return;
  }

  await db
    .insert(vanceJobs)
    .values({ jobId: image.jobId, transId, name: image.name, status })
    .onConflictDoNothing();
};

export const vanceToImagekit = async (
  context: AppLoadContext,
  vanceJob: InferSelectModel<typeof vanceJobs>
) => {
  const form = new FormData();
  form.append("api_token", process.env.VANCEAI_API_KEY || "");
  form.append("trans_id", vanceJob.transId);
  // Vance AI tranfromation

  const imageUrl = `https://api-service.vanceai.com/web_api/v1/download?api_token=${
    process.env.VANCEAI_API_KEY || ""
  }&trans_id=${vanceJob.transId}`;

  console.log("Vance AI transformation image URL:", imageUrl);

  context.imagekit.upload({
    file: imageUrl,
    fileName: vanceJob.name + "-" + vanceJob.name + "-" + vanceJob.transId,
  });

  console.log("Vance AI transformation uploaded to ImageKit:", vanceJob.name);

  const db = drizzle(context.env.DB);
  await db.delete(vanceJobs).where(eq(vanceJobs.transId, vanceJob.transId));
};

export const vanceProcess = async (context: AppLoadContext) => {
  if (!process.env.VANCEAI_API_KEY) {
    return;
    // error
  }
  const db = drizzle(context.env.DB);
  const result = await db.select().from(vanceJobs);
  let updated = 0;
  for (const item of result) {
    const createdAt = new Date(item.createdAt);
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const diffMinutes = diff / (1000 * 60);
    console.log("delay", diffMinutes);

    if (item.status === "finish") {
      await vanceToImagekit(context, item);
      updated++;
      continue;
    }
    const status = await checkProgress(item.transId);
    switch (status) {
      case "finish":
        await vanceToImagekit(context, item);
        updated++;
        break;
      case "fatal":
        console.error(
          `Vance AI job ${item.transId} failed with status: ${status}`
        );
        // Optionally, delete the job from the database
        //await db.delete(vanceJobs).where(eq(vanceJobs.transId, item.transId));
        break;
      case "process":
      case "waiting":
        // createdat is more than 10 minutes ago, delete the job
        // some other action may be needed here
        const createdAt = new Date(item.createdAt);
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();
        const diffMinutes = diff / (1000 * 60);
        if (diffMinutes > 10) {
          console.log(
            `Vance AI job ${item.transId} is taking too long, deleting...`
          );
          //await db.delete(vanceJobs).where(eq(vanceJobs.transId, item.transId));
        }
        break;
      default:
        console.log(`Vance AI job ${item.transId} is in status: ${status}`);
        continue;
    }
  }
  return updated;
};
