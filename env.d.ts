/// <reference types="vite/client" />
/// <reference types="@shopify/hydrogen" />
/// <reference types="@cloudflare/workers-types" />

// Enhance TypeScript's built-in typings.
import "@total-typescript/ts-reset";

import type {
  HydrogenContext,
  HydrogenSessionData,
  HydrogenEnv,
} from "@shopify/hydrogen";
import type { getLoadContext } from "~/lib/context";

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: { env: { NODE_ENV: "production" | "development" } };

  interface Env extends HydrogenEnv {
    // declare additional Env parameter use in the fetch handler and Remix loader context here
  }
}

declare module "react-router" {
  // TODO: remove this once we've migrated to `Route.LoaderArgs` for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }
  // TODO: remove this once we've migrated to `Route.ActionArgs` for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
  interface AppLoadContext extends Awaited<ReturnType<typeof getLoadContext>> {
    // to change context type, change the return of createAppLoadContext() instead
  }

  interface SessionData extends HydrogenSessionData {
    // declare local additions to the Remix session data here
  }
}
