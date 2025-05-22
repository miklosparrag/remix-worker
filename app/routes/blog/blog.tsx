import { Button } from "~/components/radiant/button";
import { Container } from "~/components/radiant/container";
import { Footer } from "~/components/radiant/footer";
import { GradientBackground } from "~/components/radiant/gradient";
import { Link } from "~/components/radiant/link";
import { Navbar } from "~/components/radiant/navbar";
import { Heading, Lead, Subheading } from "~/components/radiant/text";
import { image } from "~/sanity/image";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  RssIcon,
} from "@heroicons/react/16/solid";
import { useQuery } from "@sanity/react-loader";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { loadQuery } from "~/sanity/loader.server";
import {
  CATEGORIES_QUERY,
  FEATURED_POSTS_QUERY,
  POSTS_QUERY,
  TOTAL_POSTS_QUERY,
} from "~/sanity/queries";

import type {
  CATEGORIES_QUERYResult,
  FEATURED_POSTS_QUERYResult,
  POSTS_QUERYResult,
  TOTAL_POSTS_QUERYResult,
} from "~/sanity/types";
import { LoaderFunctionArgs, MetaArgs } from "@remix-run/cloudflare";

import "~/app.css";

const postsPerPage = 5;

export function meta({}: MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function notFound(): never {
  throw new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  let page =
    "page" in searchParams
      ? typeof searchParams.page === "string" && parseInt(searchParams.page) > 1
        ? parseInt(searchParams.page)
        : notFound()
      : 1;
  const category = searchParams.get("category") || null;

  const totalPosts = await loadQuery<TOTAL_POSTS_QUERYResult>(
    TOTAL_POSTS_QUERY,
    { category },
    { ...context.sanity.options }
  );
  const featuredPosts = await loadQuery<FEATURED_POSTS_QUERYResult>(
    FEATURED_POSTS_QUERY,
    { quantity: 3 },
    { ...context.sanity.options }
  );
  const posts = await loadQuery<POSTS_QUERYResult>(
    POSTS_QUERY,
    {
      startIndex: (page - 1) * postsPerPage,
      endIndex: page * postsPerPage,
      category,
    },
    { ...context.sanity.options }
  );
  const categories = await loadQuery<CATEGORIES_QUERYResult>(
    CATEGORIES_QUERY,
    {},
    { ...context.sanity.options }
  );

  return {
    featuredPosts,
    totalPosts,
    posts,
    categories,
  };
}

function FeaturedPosts({
  featuredPosts,
}: {
  featuredPosts: FEATURED_POSTS_QUERYResult;
}) {
  if (featuredPosts.length === 0) {
    return;
  }

  return (
    <div className="bg-linear-to-t mt-16 from-gray-100 pb-14">
      <Container>
        <h2 className="text-2xl font-medium tracking-tight">Featured</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <div
              key={post.slug}
              className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5"
            >
              {post.mainImage?.asset && (
                <img
                  alt={post.mainImage.alt || ""}
                  src={image(post.mainImage).size(1170, 780).url()}
                  className="aspect-3/2 w-full rounded-2xl object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <div className="text-sm/5 text-gray-700">
                  {dayjs(post.publishedAt).format("dddd, MMMM D, YYYY")}
                </div>
                <div className="mt-2 text-base/7 font-medium">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </div>
                <div className="mt-2 flex-1 text-sm/6 text-gray-500">
                  {post.excerpt}
                </div>
                {post.author && (
                  <div className="mt-6 flex items-center gap-3">
                    {post.author.image && (
                      <img
                        alt=""
                        src={image(post.author.image).size(64, 64).url()}
                        className="aspect-square size-6 rounded-full object-cover"
                      />
                    )}
                    <div className="text-sm/5 text-gray-700">
                      {post.author.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function Categories({
  categories,
  selected,
}: {
  categories: CATEGORIES_QUERYResult;
  selected?: string;
}) {
  if (categories.length === 0) {
    return;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {categories.find(({ slug }) => slug === selected)?.title ||
            "All categories"}
          <ChevronUpDownIcon className="size-4 fill-gray-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href="/blog"
              data-selected={selected === undefined ? true : undefined}
              className="data-focus:bg-gray-950/5 group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1"
            >
              <CheckIcon className="group-data-selected:block hidden size-4" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.slug}>
              <Link
                href={`/blog?category=${category.slug}`}
                data-selected={category.slug === selected ? true : undefined}
                className="data-focus:bg-gray-950/5 group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1"
              >
                <CheckIcon className="group-data-selected:block hidden size-4" />
                <p className="col-start-2 text-sm/6">{category.title}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      <Button
        variant="outline"
        href="/blog/feed.xml"
        reloadDocument
        className="gap-1"
      >
        <RssIcon className="size-4" />
        RSS Feed
      </Button>
    </div>
  );
}

function Posts({
  posts,
  page,
  category,
}: {
  posts: POSTS_QUERYResult;
  page: number;
  category?: string;
}) {
  if (posts.length === 0 && (page > 1 || category)) {
    notFound();
  }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-500">No posts found.</p>;
  }

  return (
    <div className="mt-6">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="relative grid grid-cols-1 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <div className="text-sm/5 max-sm:text-gray-700 sm:font-medium">
              {dayjs(post.publishedAt).format("dddd, MMMM D, YYYY")}
            </div>
            {post.author && (
              <div className="mt-2.5 flex items-center gap-3">
                {post.author.image && (
                  <img
                    alt=""
                    src={image(post.author.image).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <div className="text-sm/5 text-gray-700">
                  {post.author.name}
                </div>
              </div>
            )}
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-sm/5 font-medium">{post.title}</h2>
            <p className="mt-3 text-sm/6 text-gray-500">{post.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-1 text-sm/5 font-medium"
              >
                <span className="absolute inset-0" />
                Read more
                <ChevronRightIcon className="size-4 fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination({
  page,
  category,
  totalPosts,
}: {
  page: number;
  category?: string;
  totalPosts: number;
}) {
  function url(page: number) {
    let params = new URLSearchParams();

    if (category) params.set("category", category);
    if (page > 1) params.set("page", page.toString());

    return params.size !== 0 ? `/blog?${params.toString()}` : "/blog";
  }

  let hasPreviousPage = page - 1;
  let previousPageUrl = hasPreviousPage ? url(page - 1) : undefined;
  let hasNextPage = page * postsPerPage < totalPosts;
  let nextPageUrl = hasNextPage ? url(page + 1) : undefined;
  let pageCount = Math.ceil(totalPosts / postsPerPage);

  if (pageCount < 2) {
    return;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button
        variant="outline"
        href={previousPageUrl}
        disabled={!previousPageUrl}
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <div className="flex gap-2 max-sm:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            key={i + 1}
            href={url(i + 1)}
            data-active={i + 1 === page ? true : undefined}
            className={clsx(
              "size-7 rounded-lg text-center text-sm/7 font-medium",
              "data-hover:bg-gray-100",
              "data-active:shadow-sm data-active:ring-1 data-active:ring-black/10",
              "data-active:data-hover:bg-gray-50"
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <Button variant="outline" href={nextPageUrl} disabled={!nextPageUrl}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  let page =
    "page" in searchParams
      ? typeof searchParams.page === "string" && parseInt(searchParams.page) > 1
        ? parseInt(searchParams.page)
        : notFound()
      : 1;

  let category =
    "category" in searchParams
      ? typeof searchParams.category === "string"
        ? searchParams.category
        : undefined
      : undefined;

  const {
    posts: initialPosts,
    featuredPosts: initialFeaturedPosts,
    totalPosts: initialTotalPosts,
    categories: initialCategories,
  } = useLoaderData<typeof loader>();
  const { data: posts } = useQuery<POSTS_QUERYResult>(
    POSTS_QUERY,
    {
      statIndex: (page - 1) * postsPerPage,
      endIndex: page * postsPerPage,
      category,
    },
    { initial: initialPosts }
  );

  const { data: featuredPosts } = useQuery<FEATURED_POSTS_QUERYResult>(
    POSTS_QUERY,
    { quantity: 3 },
    { initial: initialFeaturedPosts }
  );
  const { data: totalPosts } = useQuery<TOTAL_POSTS_QUERYResult>(
    POSTS_QUERY,
    { category },
    { initial: initialTotalPosts }
  );

  const { data: categories } = useQuery<CATEGORIES_QUERYResult>(
    CATEGORIES_QUERY,
    {},
    { initial: initialCategories }
  );
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Blog</Subheading>
        <Heading as="h1" className="mt-2">
          What’s happening at Radiant.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay informed with product updates, company news, and insights on how
          to sell smarter at your company.
        </Lead>
      </Container>
      {page === 1 && !category && (
        <FeaturedPosts featuredPosts={featuredPosts} />
      )}
      <Container className="mt-16 pb-24">
        <Categories selected={category} categories={categories} />
        <Posts posts={posts} page={page} category={category} />
        <Pagination page={page} totalPosts={totalPosts} />
      </Container>
      <Footer />
    </main>
  );
}
