import { LoaderFunctionArgs } from "react-router";
import type Imagekit from "imagekit";

export type AuthParams = ReturnType<Imagekit["getAuthenticationParameters"]> & {
  publicKey: string;
};

export async function loader({ context }: LoaderFunctionArgs) {
  const { token, expire, signature } =
    context.imagekit.getAuthenticationParameters();
  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
