// app/sanity/preview.ts

import { createCookieSessionStorage } from "@remix-run/cloudflare";
import type { loadQuery } from "~/sanity/loader.server";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      httpOnly: true,
      name: "__sanity_preview",
      path: "/",
      sameSite: !process.env.DEV ? "none" : "lax",
      secrets: ["sccxc\xccvcxvzxvcvzcx"],
      secure: !process.env.DEV,
    },
  });

async function previewContext(
  headers: Headers
): Promise<{ preview: boolean; options: Parameters<typeof loadQuery>[2] }> {
  const previewSession = await getSession(headers.get("Cookie"));

  const preview =
    previewSession.get("projectId") === process.env.PUBLIC_SANITY_PROJECT_ID;

  return {
    preview,
    options: preview
      ? {
          perspective: "drafts",
          stega: true,
          useCdn: false,
        }
      : {
          perspective: "published",
          stega: false,
        },
  };
}

export { commitSession, destroySession, getSession, previewContext };
