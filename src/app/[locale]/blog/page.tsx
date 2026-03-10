import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import BlogPageClient from './BlogPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Blog - Matbaa Sektörü Haberleri',
    description:
      'SIM Baskı Malzemeleri blog. Matbaa malzemeleri, baskı teknolojileri ve ofset mürekkep hakkında güncel bilgiler.',
  },
  en: {
    title: 'Blog - Printing Industry News',
    description:
      'SIM Printing Supplies blog. Latest news about printing materials, offset ink technology and industry insights.',
  },
  ru: {
    title: 'Блог - Новости полиграфии',
    description:
      'Блог SIM. Новости о полиграфических материалах, офсетных красках и технологиях печати.',
  },
  ar: {
    title: 'المدونة - أخبار الطباعة',
    description:
      'مدونة SIM. أحدث الأخبار حول مواد الطباعة وتقنيات أحبار الأوفست.',
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
    ],
  });
}

export default function BlogPage() {
  return <BlogPageClient />;
}
