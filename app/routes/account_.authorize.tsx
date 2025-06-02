import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  return await context.customerAccount.authorize();
}
