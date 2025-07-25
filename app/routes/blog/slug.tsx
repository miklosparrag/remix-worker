import { Button } from "~/components/radiant/button";
import { Container } from "~/components/radiant/container";
import { Footer } from "~/components/radiant/footer";
import { GradientBackground } from "~/components/radiant/gradient";
import { Link } from "~/components/radiant/link";
import { Navbar } from "~/components/radiant/navbar";
import { Heading, Subheading } from "~/components/radiant/text";
import { image } from "~/sanity/image";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@sanity/react-loader";
import dayjs from "dayjs";
import { useLoaderData } from "react-router";
import { loadQuery } from "~/sanity/loader.server";
import { previewContext } from "~/sanity/preview.server";
import { POST_QUERY } from "~/sanity/queries";
import type { POST_QUERYResult } from "~/sanity/types";
import { LoaderFunctionArgs, MetaArgs } from "react-router";

function notFound(): never {
  throw new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
}
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { options } = await previewContext(request.headers);
  const post = await loadQuery<POST_QUERYResult>(
    POST_QUERY,
    {
      slug: params.slug,
    },
    { ...options }
  );

  return {
    post,
    slug: params.slug,
  };
}

export function meta({ data }: MetaArgs<typeof loader>) {
  const post = data?.post.data;
  return [{ title: post?.title }, { description: post?.excerpt }];
}

export default function BlogPost() {
  const { slug, post: initialPost } = useLoaderData<typeof loader>();
  const { data: post } = useQuery<POST_QUERYResult>(
    POST_QUERY,
    { slug },
    { initial: initialPost }
  );
  if (!post) notFound();
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">
          {dayjs(post.publishedAt).format("dddd, MMMM D, YYYY")}
        </Subheading>
        <Heading as="h1" className="mt-2">
          {post.title}
        </Heading>
        <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            {post.author && (
              <div className="flex items-center gap-3">
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
            {Array.isArray(post.categories) && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog?category=${category.slug}`}
                    className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              {post.mainImage?.asset && (
                <img
                  alt={post.mainImage.alt || ""}
                  src={image(post.mainImage).size(2016, 1344).url()}
                  className="aspect-3/2 mb-10 w-full rounded-2xl object-cover shadow-xl"
                />
              )}
              {post.body && (
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                          {children}
                        </p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mb-10 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                          {children}
                        </blockquote>
                      ),
                    },
                    types: {
                      image: ({ value }) => (
                        <img
                          alt={value.alt || ""}
                          src={image(value).width(2000).url()}
                          className="w-full rounded-2xl"
                        />
                      ),
                      separator: ({ value }) => {
                        switch (value.style) {
                          case "line":
                            return (
                              <hr className="my-8 border-t border-gray-200" />
                            );
                          case "space":
                            return <div className="my-8" />;
                          default:
                            return null;
                        }
                      },
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => {
                        return (
                          <li className="my-2 pl-2 has-[br]:mb-8">
                            {children}
                          </li>
                        );
                      },
                      number: ({ children }) => {
                        return (
                          <li className="my-2 pl-2 has-[br]:mb-8">
                            {children}
                          </li>
                        );
                      },
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-950">
                          {children}
                        </strong>
                      ),
                      code: ({ children }) => (
                        <>
                          <span aria-hidden>`</span>
                          <code className="text-[15px]/8 font-semibold text-gray-950">
                            {children}
                          </code>
                          <span aria-hidden>`</span>
                        </>
                      ),
                      link: ({ value, children }) => {
                        return (
                          <Link
                            href={value.href}
                            className="data-hover:decoration-gray-600 font-medium text-gray-950 underline decoration-gray-400 underline-offset-4"
                          >
                            {children}
                          </Link>
                        );
                      },
                    },
                  }}
                />
              )}
              <div className="mt-10">
                <Button variant="outline" href="/blog">
                  <ChevronLeftIcon className="size-4" />
                  Back to blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
