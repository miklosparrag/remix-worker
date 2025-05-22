import { flatRoutes } from "@remix-run/fs-routes";
import { type RouteConfig, route } from "@remix-run/route-config";
import { hydrogenRoutes } from "@shopify/hydrogen";

export default hydrogenRoutes([
  ...(await flatRoutes()),
  // Manual route definitions can be added to this array, in addition to or instead of using the `flatRoutes` file-based routing convention.
  // See https://remix.run/docs/en/main/guides/routing for more details
  route("blog", "routes/blog/blog.tsx"),
  route("blog/:slug", "routes/blog/slug.tsx"),
  route("blog/feed.xml", "routes/blog/feed.ts"),
]) satisfies RouteConfig;
