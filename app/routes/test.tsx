import { type LoaderFunctionArgs } from "react-router";
import { useFetcher, useLoaderData, type MetaFunction } from "react-router";

import { ImageKitUploadForm } from "~/components/media/ImageKitUploadForm";
import { Image, Video } from "@imagekit/react";
import {
  vanceTransform,
  vanceUploadImage,
} from "~/components/ai/VanceAiClient";
import { useState } from "react";
import type { Route } from "./+types/test";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hydrogen | Home" }];
}

const aiRemoveBackground = {
  job: "matting",
  config: {
    module: "matting",
    module_params: {
      model_name: "Mattingstable",
      no_face_blur: true,
      web_auto_mode: true,
    },
    out_params: {
      compress: {
        quality: 100,
      },
      keep_origin_name: true,
    },
  },
};

const aiCartoon2 = {
  job: "animegan",
  config: {
    module: "animegan2",
    module_params: {
      model_name: "Animegan2Stable",
      single_face: true,
      aligned_size: 512,
    },
    out_params: {
      compress: {
        quality: 100,
      },
      keep_origin_name: true,
    },
  },
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: Route.LoaderArgs) {
  let files;
  try {
    files = await context.imagekit.listFiles({
      skip: 0,
      limit: 20,
    });
  } catch (error) {
    console.log(error);
  }
  return { files };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}

async function vanceProcess(
  context: Route.LoaderArgs["context"],
  imageUrl: string | null
) {
  console.log("Vance AI process started");
  // This function can be used to initiate a Vance AI process if needed
  const ret = await vanceUploadImage(
    context,
    imageUrl as string,
    "test.jpg",
    "test-job-id5"
  );

  if (ret?.uid) {
    // If the upload was successful, you can return a success response or redirect
    console.log("Upload successful", ret.uid);
    await vanceTransform(context, ret.uid, aiRemoveBackground);
  }
}

export async function action({ request, context }: Route.ActionArgs) {
  console.log("Action called");
  const formData = await request.formData();
  const imageUrl = formData.get("fileUrl");
  const actions = formData.get("action");

  if (actions === "process") {
    console.log("Processing image with Vance AI");
    await vanceProcess(context, imageUrl as string);
    return null; // Return null to indicate success
  } else if (actions === "delete") {
    console.log("Deleting image from ImageKit");
    const fileId = formData.get("fileId");
    try {
      await context.imagekit.deleteFile(fileId as string);
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return null;
}

export default function Test({}: Route.ComponentProps) {
  const { files } = useLoaderData<typeof loader>();
  const [showUrl, setShowUrl] = useState(null);
  const fetcher = useFetcher();

  return (
    <div>
      {showUrl && (
        <div>
          <Image
            urlEndpoint="https://ik.imagekit.io/hqcwevjji"
            src={showUrl}
            transformation={[
              { focus: "face", zoom: 0.7 }, //, aiRemoveBackground: true },
            ]}
          />
        </div>
      )}
      <ImageKitUploadForm />
      <div>
        {files.map(
          (file) =>
            file.fileType === "image" && (
              <div key={file.fileId} style={{ margin: "10px" }}>
                <Image
                  urlEndpoint="https://ik.imagekit.io/hqcwevjji"
                  src={file.url}
                  key={file.fileId}
                  width={300}
                  alt={file.name}
                  onClick={() => setShowUrl(file.url)}
                />
                <p>{file.name}</p>
                <button
                  onClick={() => {
                    fetcher.submit(
                      {
                        fileId: file.fileId,
                        fileUrl: file.url,
                        action: "process",
                      },
                      { method: "post" }
                    );
                  }}
                >
                  Process with Vance AI
                </button>
                <button
                  onClick={() => {
                    fetcher.submit(
                      {
                        fileId: file.fileId,
                        fileUrl: file.url,
                        action: "delete",
                      },
                      { method: "post" }
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}
