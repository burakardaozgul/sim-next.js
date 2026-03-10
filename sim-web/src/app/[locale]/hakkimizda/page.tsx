import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: "Hakkımızda - 1983'ten Beri Matbaa Sektöründe",
    description:
      "SIM Baskı Malzemeleri hakkında. 1983 yılından bu yana Türkiye'nin lider matbaa malzemeleri ve baskı malzemeleri tedarikçisi. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings Türkiye distribütörü.",
  },
  en: {
    title: 'About Us - In the Printing Industry Since 1983',
    description:
      "About SIM Printing Supplies. Turkey's leading printing materials supplier since 1983. Turkish distributor of SAKATA INX, Zeller+Gmelin, and Hi-Tech Coatings.",
  },
  ru: {
    title: 'О нас - В полиграфической отрасли с 1983 года',
    description:
      'О компании SIM. Ведущий поставщик полиграфических материалов в Турции с 1983 года.',
  },
  ar: {
    title: 'من نحن - في صناعة الطباعة منذ 1983',
    description:
      'حول SIM. المورد الرائد لمواد الطباعة في تركيا منذ 1983.',
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
