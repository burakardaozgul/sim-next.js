import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';
import { articleJsonLd } from '@/lib/schema';
import { getBlogSlug, resolveBlogPostForLocale, getBlogSlugsForLocale, getRelatedPosts, toBlogSummary } from '@/data/blog';
import { locales } from '@/i18n/config';
import { localizedBlogPath } from '@/lib/paths';
import { LocaleSlugsProvider } from '@/components/layout/LocaleSlugsContext';
import { products, Product } from '@/data/products';
import BlogPostClient from './BlogPostClient';
import { setRequestLocale } from 'next-intl/server';
import { localizeInlineLinks } from '@/lib/inline-links-localize';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogSlugsForLocale(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { post } = resolveBlogPostForLocale(slug, locale);

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
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { post, redirectSlug } = resolveBlogPostForLocale(slug, locale);

  if (redirectSlug) permanentRedirect(localizedBlogPath(redirectSlug, locale));
  if (!post) notFound();

  const relatedProductData = (post.relatedProducts || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

  const BASE_URL = 'https://www.simlimited.net';
  const title = post.title[locale] || post.title.tr;
  const localizedSlug = getBlogSlug(post, locale);
  const postUrl =
    locale === 'tr'
      ? `${BASE_URL}/blog/${localizedSlug}`
      : `${BASE_URL}/${locale}/blog/${localizedSlug}`;
  const blogUrl =
    locale === 'tr' ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  // İçerik yalnızca sayfa dilinde ve iç linkler yerelleştirilmiş olarak istemciye gider
  const content = (post.content[locale] || post.content.tr).map((block) => ({
    ...block,
    ...(block.text ? { text: localizeInlineLinks(block.text, locale) } : {}),
    ...(block.rows ? { rows: block.rows.map((r) => r.map((c) => localizeInlineLinks(c, locale))) } : {}),
  }));
  const localizedPost = { ...post, content: { [locale]: content } };
  const wordCount = content
    .filter((block) => block.text)
    .reduce((count, block) => count + (block.text?.split(/\s+/).length || 0), 0);

  const articleSchema = articleJsonLd(post, locale, { wordCount });

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
      <LocaleSlugsProvider slugs={post.slugs}>
        <BlogPostClient
          post={localizedPost}
          relatedProducts={relatedProductData}
          related={getRelatedPosts(post, 3).map(toBlogSummary)}
        />
      </LocaleSlugsProvider>
    </>
  );
}
