import { defineConfig } from "vite";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from "@remix-run/dev";
import { hydrogen } from "@shopify/hydrogen/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./app/lib/context";
import tailwindcss from "@tailwindcss/vite";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    hydrogen(),
    remix({
      presets: [hydrogen.v3preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_routeConfig: true,
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    minify: true,
  },
  server: {
    allowedHosts: [
      "localhost",
      "shopitest.parrag.net",
      "glorious-mature-filly.ngrok-free.app",
    ],
  },
});
