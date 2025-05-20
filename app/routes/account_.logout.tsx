import { redirect, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { fixDevResponse } from "~/lib/devresfix";

// if we don't implement this, /account/logout will get caught by account.$.tsx to do login
export async function loader() {
  return redirect("/");
}

export async function action({ request, context }: ActionFunctionArgs) {
  return fixDevResponse(
    request,
    await context.customerAccount.logout(),
    context
  );
}
