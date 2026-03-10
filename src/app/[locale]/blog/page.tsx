import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { createPageMetadata } from '@/lib/seo';

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
  const t = useTranslations('blog');

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="font-display text-4xl font-bold">{t('title')}</h1>
      <p className="text-silver mt-4">{t('subtitle')}</p>
    </main>
  );
}
