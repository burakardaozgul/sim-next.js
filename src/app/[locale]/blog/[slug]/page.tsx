import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
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

  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title,
    description,
    keywords: post.keywords,
    ogImage: post.image,
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

  const BASE_URL = 'https://www.simlimited.net';
  const title = post.title[locale] || post.title.tr;
  const description = post.excerpt[locale] || post.excerpt.tr;
  const postUrl =
    locale === 'tr'
      ? `${BASE_URL}/blog/${slug}`
      : `${BASE_URL}/${locale}/blog/${slug}`;
  const blogUrl =
    locale === 'tr' ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  // Calculate word count from content blocks
  const content = post.content[locale] || post.content.tr;
  const wordCount = content
    .filter((block) => block.text)
    .reduce((count, block) => count + (block.text?.split(/\s+/).length || 0), 0);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    author: {
      '@type': 'Organization',
      name: 'SIM Baskı Malzemeleri',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SIM Baskı Malzemeleri',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'tr' ? 'Ana Sayfa' : 'Home',
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
      <BlogPostClient post={post} />
    </>
  );
}
