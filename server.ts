import { createRequestHandler, type ServerBuild } from "@remix-run/cloudflare";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore This file won’t exist if it hasn’t yet been built
//import * as remixBuild from "virtual:remix/server-build";

import * as build from "./dist/server"; // eslint-disable-line import/no-unresolved
import { storefrontRedirect } from "@shopify/hydrogen";
import { getLoadContext } from "~/lib/context";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      console.log("hello");
      const loadContext = await getLoadContext({
        request,
        context: {
          cloudflare: {
            // This object matches the return value from Wrangler's
            // `getPlatformProxy` used during development via Remix's
            // `cloudflareDevProxyVitePlugin`:
            // https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
            cf: request.cf,
            ctx: {
              waitUntil: ctx.waitUntil.bind(ctx),
              passThroughOnException: ctx.passThroughOnException.bind(ctx),
            },
            caches,
            env,
          },
        },
      });

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleRequest = createRequestHandler(
        build as any as ServerBuild,
        process.env.NODE_ENV || ""
      );

      const response = await handleRequest(request, loadContext);

      if (loadContext.session.isPending) {
        response.headers.set("Set-Cookie", await loadContext.session.commit());
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
          storefront: loadContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
};
