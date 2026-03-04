import { groq } from 'next-sanity';

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id, title, slug, excerpt,
    "image": images[0],
    category->{ title, slug, icon }
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id, title, slug, excerpt,
    "image": images[0],
    category->{ title, slug, icon }
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug[$locale].current == $slug][0] {
    _id, title, slug, excerpt, description, specs,
    images, datasheet, seo,
    category->{ title, slug },
    brand->{ name, logo, website }
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, coverImage, publishedAt, author, tags
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage, publishedAt, author, tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug[$locale].current == $slug][0] {
    _id, title, slug, excerpt, body, coverImage, publishedAt, author, tags, seo
  }
`;

export const allBrandsQuery = groq`
  *[_type == "brand"] | order(order asc) {
    _id, name, logo, website, description, country
  }
`;

export const allFaqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, category
  }
`;
