import type { AppLoadContext } from "react-router";
import { storefrontRedirect } from "@shopify/hydrogen";

export async function fixDevResponse(
  request: Request,
  response: Response,
  context: AppLoadContext
) {
  if (context.session.isPending) {
    response.headers.set("Set-Cookie", await context.session.commit());
  }

  if (response.status === 404) {
    /**
     * Check for redirects only when there's a 404 from the app.
     * If the redirect doesn't exist, then `storefrontRedirect`
     * will pass through the 404 response.
     */
    return storefrontRedirect({
      request,
      response,
      storefront: context.storefront,
    });
  }

  return response;
}
