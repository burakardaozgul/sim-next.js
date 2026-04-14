import type { Metadata } from 'next';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { blogPosts, getBlogSlug } from '@/data/blog';
import BlogPageClient from './BlogPageClient';

const BASE_URL = 'https://www.simlimited.net';

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa',
  en: 'Home',
  ru: 'Главная',
  ar: 'الرئيسية',
};

const BLOG_NAMES: Record<string, string> = {
  tr: 'Matbaa ve Baskı Sektörü Rehberi',
  en: 'Printing Industry Insights & Guides',
  ru: 'Руководство по полиграфической отрасли',
  ar: 'دليل صناعة الطباعة والمواد',
};

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Matbaa ve Baskı Sektörü Rehberi | SIM Baskı Malzemeleri Blog',
    description:
      'Matbaa ve baskı sektörüne dair uzman içerikler: ofset mürekkep, renk yönetimi, baskı teknolojileri ve matbaa malzemeleri hakkında kapsamlı rehberler.',
  },
  en: {
    title: 'Printing Industry Insights & Guides | SIM Printing Supplies Blog',
    description:
      'Expert content on offset printing, color management, printing technologies, and supplies. In-depth guides from SIM Printing Supplies.',
  },
  ru: {
    title: 'Руководство по полиграфической отрасли | Блог SIM',
    description:
      'Экспертный контент о полиграфии: офсетные краски, управление цветом, технологии печати и полиграфические материалы. Подробные руководства от SIM.',
  },
  ar: {
    title: 'دليل صناعة الطباعة والمواد | مدونة SIM',
    description:
      'محتوى خبير حول الطباعة الأوفست وإدارة الألوان وتقنيات الطباعة ومواد الطباعة. أدلة متعمقة من SIM لمواد الطباعة.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.tr;

  return createPageMetadata({
    locale,
    path: '/blog',
    title: m.title,
    description: m.description,
    keywords: [
      'matbaa haberleri',
      'baskı teknolojileri',
      'ofset mürekkep bilgi',
      'matbaa rehberi',
      'baskı malzemeleri blog',
    ],
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const blogUrl =
    locale === 'tr' ? `${BASE_URL}/blog` : `${BASE_URL}/${locale}/blog`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: BLOG_NAMES[locale] || BLOG_NAMES.tr,
    description: (META[locale] || META.tr).description,
    url: blogUrl,
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => {
        const slug = getBlogSlug(post, locale);
        const postUrl =
          locale === 'tr'
            ? `${BASE_URL}/blog/${slug}`
            : `${BASE_URL}/${locale}/blog/${slug}`;
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: post.title[locale] || post.title.tr,
          url: postUrl,
          description: post.excerpt[locale] || post.excerpt.tr,
          image: `${BASE_URL}${post.image}`,
          datePublished: post.date,
        };
      }),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_NAMES[locale] || HOME_NAMES.tr,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: blogUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPageClient />
    </>
  );
}
