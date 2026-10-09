import type { BlogPost } from '@/data/blog';

/** İstemci bileşenlerine geçirilen hafif yazı özeti (tam içerik ve 4 dilli gövde taşınmaz). */
export type BlogPostSummary = Pick<BlogPost, 'slug' | 'slugs' | 'image' | 'date' | 'readTime' | 'title' | 'excerpt'>;

export function getBlogSlug(post: Pick<BlogPost, 'slug' | 'slugs'>, locale: string): string {
  return post.slugs[locale] || post.slug;
}

export function toBlogSummary(post: BlogPost): BlogPostSummary {
  const { slug, slugs, image, date, readTime, title, excerpt } = post;
  return { slug, slugs, image, date, readTime, title, excerpt };
}
