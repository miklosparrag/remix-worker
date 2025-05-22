import { createHydrogenContext } from "@shopify/hydrogen";
import { AppSession } from "./session";
import { CART_QUERY_FRAGMENT } from "./fragments";

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */

import { type PlatformProxy } from "wrangler";
import { previewContext } from "../sanity/preview.server";

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<PlatformProxy<Env>, "dispose" | "caches" | "cf"> & {
      caches: PlatformProxy<Env>["caches"] | CacheStorage;
      cf: Request["cf"];
    };
  };
};

declare module "@remix-run/cloudflare" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends Awaited<ReturnType<typeof getLoadContext>> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
  }
}

export async function getLoadContext({ request, context }: GetLoadContextArgs) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  const { env, ctx: executionContext } = context.cloudflare;

  if (!env?.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);

  const [cache, session] = await Promise.all([
    context.cloudflare.caches.open("hydrogen"),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache: cache as Cache,
    waitUntil,
    session,
    i18n: { language: "EN", country: "US" },
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  const sanity = await previewContext(request.headers);

  return {
    ...hydrogenContext,
    ...context,
    sanity,
  };
}
