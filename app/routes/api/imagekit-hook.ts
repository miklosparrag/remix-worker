import { LoaderFunctionArgs } from "@remix-run/server-runtime";

export async function action({ request }: LoaderFunctionArgs) {
  console.log("Imagekit Hook");
  const data = await request.json();
  console.log("Imagekit Hook Data", data);
  return {};
}
