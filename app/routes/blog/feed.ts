import { image } from "~/sanity/image";
import { Feed } from "feed";
import assert from "node:assert";
import { loadQuery } from "~/sanity/loader.server";
import { FEED_POSTS_QUERY } from "~/sanity/queries";
import type { FEED_POSTS_QUERYResult } from "~/sanity/types";
import { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request: req, context }: LoaderFunctionArgs) => {
  let siteUrl = new URL(req.url).origin;
  const { data: posts } = await loadQuery<FEED_POSTS_QUERYResult>(
    FEED_POSTS_QUERY,
    {},
    context.sanity.options
  );

  let feed = new Feed({
    title: "The Accept-ed Blog",
    description:
      "Stay informed with product updates, company news, and insights on how to sell smarter at your company.",
    author: {
      name: "Accept-ed Team",
      email: "info@accept-ed.co.uk",
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  posts.forEach((post) => {
    try {
      assert(typeof post.title === "string");
      assert(typeof post.slug === "string");
      assert(typeof post.excerpt === "string");
      assert(typeof post.publishedAt === "string");
    } catch (error) {
      console.log("Post is missing required fields for RSS feed:", post);
      return;
    }

    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${siteUrl}/blog/${post.slug}`,
      content: post.excerpt,
      image: post.mainImage?.asset
        ? image(post.mainImage)
            .size(1200, 800)
            .format("jpg")
            .url()
            .replaceAll("&", "&amp;")
        : undefined,
      author: post.author?.name ? [{ name: post.author.name }] : [],
      contributor: post.author?.name ? [{ name: post.author.name }] : [],
      date: new Date(post.publishedAt),
    });
  });

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "content-type": "application/xml",
      "cache-control": "s-maxage=31556952",
    },
  });
};
