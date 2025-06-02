import type { LoaderFunctionArgs } from "react-router";
import { fixDevResponse } from "~/lib/devresfix";

export async function loader({ request, context }: LoaderFunctionArgs) {
  return fixDevResponse(
    request,
    await context.customerAccount.authorize(),
    context
  );
}
