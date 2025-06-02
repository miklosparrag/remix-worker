import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { sha256 } from "js-sha256";

function sign_parameters(params: { [index: string]: string }): {
  signature: string;
  timestamp: string;
  api_key: string;
  [index: string]: string;
} {
  const timestamp = String(Math.round(new Date().getTime() / 1000));
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || "";
  const api_key = process.env.CLOUDINARY_API_KEY || "";
  const api_secret = process.env.CLOUDINARY_API_SECRET || "";

  var pars: string[] = [];

  Object.keys(params)
    .sort()
    .forEach((v, i, a) => {
      if (!["file", "api_key", "cloud_name", "resource_type"].includes(v)) {
        pars.push(`${v}=${params[v]}`);
      }
    });

  pars.push(`timestamp=${timestamp}`);
  const to_sign = pars.join("&").concat(api_secret);
  const signature = sha256.hex(to_sign);

  return {
    timestamp,
    signature,
    api_key,
    cloud_name,
  };
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const params: { [index: string]: string } = {};
  for (const pair of formData.entries()) {
    // ignore file types as they should not be passed in here!
    if (!(pair[1] instanceof File)) params[pair[0]] = pair[1];
  }

  const { signature, cloud_name, api_key, timestamp } = sign_parameters(params);
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  return {
    url,
    signature,
    api_key,
    timestamp,
    ...params,
  };
}
