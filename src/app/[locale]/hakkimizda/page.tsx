import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: "Hakkımızda - 1983'ten Beri Sektörde",
    description:
      "1983'ten bu yana Türkiye'nin lider matbaa tedarikçisi. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings Türkiye distribütörü.",
  },
  en: {
    title: 'About Us - Since 1983',
    description:
      "Turkey's leading printing materials supplier since 1983. Distributor of SAKATA INX, Zeller+Gmelin, and Hi-Tech Coatings.",
  },
  ru: {
    title: 'О нас - С 1983 года',
    description:
      'Ведущий поставщик полиграфических материалов в Турции с 1983 года. Дистрибьютор SAKATA INX и Zeller+Gmelin.',
  },
  ar: {
    title: 'من نحن - منذ 1983',
    description:
      'المورد الرائد لمواد الطباعة في تركيا منذ 1983. موزع SAKATA INX وZeller+Gmelin.',
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
    path: '/hakkimizda',
    title: m.title,
    description: m.description,
    keywords: [
      'matbaa malzemeleri tedarikçisi',
      'baskı malzemeleri üreticisi',
      'SAKATA INX Türkiye',
      'Zeller+Gmelin Türkiye',
      'EVA COLOR',
    ],
  });
}

export default function AboutPage() {
  return <AboutPageClient />;
}
