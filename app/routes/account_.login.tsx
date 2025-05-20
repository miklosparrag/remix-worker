import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { fixDevResponse } from "~/lib/devresfix";

export async function loader({ request, context }: LoaderFunctionArgs) {
  return fixDevResponse(
    request,
    await context.customerAccount.login(),
    context
  );
}
