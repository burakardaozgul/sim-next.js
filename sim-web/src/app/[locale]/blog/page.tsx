import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import BlogPageClient from './BlogPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Blog - Matbaa Sektöründen Haberler ve Bilgiler',
    description:
      'SIM Baskı Malzemeleri blog. Matbaa malzemeleri, baskı teknolojileri, ofset mürekkep kullanımı ve sektör haberleri hakkında güncel bilgiler.',
  },
  en: {
    title: 'Blog - News and Insights from the Printing Industry',
    description:
      'SIM Printing Supplies blog. Latest news about printing materials, offset ink technology, and industry insights.',
  },
  ru: {
    title: 'Блог - Новости полиграфической отрасли',
    description:
      'Блог SIM. Новости о полиграфических материалах, офсетных красках и технологиях печати.',
  },
  ar: {
    title: 'المدونة - أخبار ومعلومات من صناعة الطباعة',
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
