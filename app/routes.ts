import { flatRoutes } from "@remix-run/fs-routes";
import { type RouteConfig, route } from "@remix-run/route-config";
import { hydrogenRoutes } from "@shopify/hydrogen";

export default hydrogenRoutes([
  ...(await flatRoutes()),
  // Manual route definitions can be added to this array, in addition to or instead of using the `flatRoutes` file-based routing convention.
  // See https://remix.run/docs/en/main/guides/routing for more details

  // blog routes
  route("blog", "routes/blog/blog.tsx"),
  route("blog/:slug", "routes/blog/slug.tsx"),
  route("blog/feed.xml", "routes/blog/feed.ts"),

  // api routes
  route("api/cloudinary-sign", "routes/api/cloudinary-sign.ts"),
  route("api/imagekit-sign", "routes/api/imagekit-sign.ts"),
  route("api/vance-hook", "routes/api/vance-hook.ts"),
  route("api/imagekit-hook", "routes/api/imagekit-hook.ts"),
  route("api/check", "routes/api/check.ts"),

  // end of routes
]) satisfies RouteConfig;
