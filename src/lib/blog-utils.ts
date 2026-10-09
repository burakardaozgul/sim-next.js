import type { Metadata } from 'next';
import type { BlogPost } from '@/data/blog';
import { createPageMetadata } from '@/lib/seo';

/** İstemci bileşenlerine geçirilen hafif yazı özeti (tam içerik ve 4 dilli gövde taşınmaz). */
export type BlogPostSummary = Pick<BlogPost, 'slug' | 'slugs' | 'image' | 'date' | 'readTime' | 'title' | 'excerpt'>;

export function getBlogSlug(post: Pick<BlogPost, 'slug' | 'slugs'>, locale: string): string {
  return post.slugs[locale] || post.slug;
}

export function toBlogSummary(post: BlogPost): BlogPostSummary {
  const { slug, slugs, image, date, readTime, title, excerpt } = post;
  return { slug, slugs, image, date, readTime, title, excerpt };
}

/** TR ve EN her zaman dizine girer; ru/ar yalnızca yazı tam çeviriliyse (fullLocales). */
export const ALWAYS_INDEXED_LOCALES = ['tr', 'en'] as const;

export function isIndexableLocale(post: Pick<BlogPost, 'fullLocales'>, locale: string): boolean {
  return (ALWAYS_INDEXED_LOCALES as readonly string[]).includes(locale) || (post.fullLocales?.includes(locale) ?? false);
}

/** hreflang kümesi: yalnızca dizine giren dillerin slug'ları (x-default TR). */
export function indexableSlugs(post: Pick<BlogPost, 'slugs' | 'fullLocales'>): Record<string, string> {
  return Object.fromEntries(Object.entries(post.slugs).filter(([l]) => isIndexableLocale(post, l)));
}

/** Blog yazısı metadata'sı — sayfa ve testler aynı fonksiyonu kullanır. */
export function buildBlogPostMetadata(post: BlogPost, locale: string): Metadata {
  return createPageMetadata({
    locale,
    path: `/blog/${getBlogSlug(post, locale)}`,
    title: post.title[locale] || post.title.tr,
    description: post.excerpt[locale] || post.excerpt.tr,
    keywords: post.keywords,
    ogImage: post.image,
    slugsByLocale: indexableSlugs(post),
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    noIndex: !isIndexableLocale(post, locale),
  });
}
