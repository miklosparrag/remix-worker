import { defineQuery } from 'groq'

export const TOTAL_POSTS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`)

/* export async function getPostsCount(
  category?: string,
): Promise<TOTAL_POSTS_QUERYResult> {
  return await sanityFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  })
} */

export const POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc)[$startIndex...$endIndex]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`)

/* export async function getPosts(
  startIndex: number,
  endIndex: number,
  category?: string,
): Promise<POSTS_QUERYResult> {
  return await sanityFetch({
    query: POSTS_QUERY,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
  })
} */

export const FEATURED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && isFeatured == true
  && defined(slug.current)
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image,
  },
}`)

/* export async function getFeaturedPosts(
  quantity: number,
): Promise<FEATURED_POSTS_QUERYResult> {
  return await sanityFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  })
} */

export const FEED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
]|order(isFeatured, publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
  },
}`)

/* export async function getPostsForFeed(): Promise<FEED_POSTS_QUERYResult> {
  return await sanityFetch({
    query: FEED_POSTS_QUERY,
  })
} */

export const POST_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && slug.current == $slug
][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}
`)

/* export async function getPost(slug: string): Promise<POST_QUERYResult> {
  return await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })
} */

export const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0
]|order(title asc){
  title,
  "slug": slug.current,
}`)

/* export async function getCategories(): Promise<CATEGORIES_QUERYResult> {
  // Fetch all categories that have at least one post
  return await sanityFetch({
    query: CATEGORIES_QUERY,
  })
} */
