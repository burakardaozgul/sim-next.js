import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs, getBlogSlug } from '@/data/blog';
import { products, Product } from '@/data/products';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  const title = post.title[locale] || post.title.tr;
  const description = post.excerpt[locale] || post.excerpt.tr;

  const localizedSlug = getBlogSlug(post, locale);
  return createPageMetadata({
    locale,
    path: `/blog/${localizedSlug}`,
    title,
    description,
    keywords: post.keywords,
    ogImage: post.image,
    slugsByLocale: post.slugs,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedProductData = (post.relatedProducts || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

  const BASE_URL = 'https://www.simlimited.net';
  const title = post.title[locale] || post.title.tr;
  const description = post.excerpt[locale] || post.excerpt.tr;
  const localizedSlug = getBlogSlug(post, locale);
  const postUrl =
    locale === 'tr'
      ? `${BASE_URL}/blog/${localizedSlug}`
      : `${BASE_URL}/${locale}/blog/${localizedSlug}`;
  const blogUrl =
    locale === 'tr' ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  // Calculate word count from content blocks
  const content = post.content[locale] || post.content.tr;
  const wordCount = content
    .filter((block) => block.text)
    .reduce((count, block) => count + (block.text?.split(/\s+/).length || 0), 0);

  const LOCALE_LANG: Record<string, string> = { tr: 'Turkish', en: 'English', ru: 'Russian', ar: 'Arabic' };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    inLanguage: locale,
    keywords: post.keywords.join(', '),
    author: {
      '@type': 'Organization',
      name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    isAccessibleForFree: true,
    availableLanguage: Object.values(LOCALE_LANG),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale] || 'Ana Sayfa',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: blogUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: postUrl,
      },
    ],
  };

  const faqJsonLd = post.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: locale,
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.q[locale] || item.q.tr,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a[locale] || item.a.tr,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostClient post={post} relatedProducts={relatedProductData} />
    </>
  );
}
