import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const env = typeof document === "undefined" ? process.env : window.ENV;

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET;

const builder = createImageUrlBuilder({ projectId, dataset });

export function image(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
