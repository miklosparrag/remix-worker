import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { hydrogen } from "@shopify/hydrogen/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    hydrogen(),
    tsconfigPaths(),
  ],
  /*   ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },*/
  build: {
    //minify: true,
  },
  server: {
    allowedHosts: [
      "localhost",
      "shopitest.parrag.net",
      "glorious-mature-filly.ngrok-free.app",
    ],
  },
});
