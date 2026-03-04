import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import BrandsPageClient from './BrandsPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Temsilciliklerimiz - Dünya Markalarının Türkiye Distribütörü',
    description:
      'SIM Baskı Malzemeleri temsilcilikleri. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, Fujikura, SCHLENK - dünya markalarının Türkiye distribütörü. Matbaa malzemeleri ve baskı malzemeleri.',
  },
  en: {
    title: 'Our Brands - Turkish Distributor of World Brands',
    description:
      'SIM brand representations. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, Fujikura, SCHLENK - Turkish distributor of world printing supply brands.',
  },
  ru: {
    title: 'Наши бренды - Дистрибьютор мировых марок в Турции',
    description:
      'Представительства SIM. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings - дистрибьютор мировых полиграфических брендов.',
  },
  ar: {
    title: 'علاماتنا التجارية - موزع العلامات العالمية في تركيا',
    description:
      'تمثيلات SIM التجارية. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings - موزع العلامات العالمية لمستلزمات الطباعة.',
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
    path: '/temsilcilikler',
    title: m.title,
    description: m.description,
    keywords: [
      'SAKATA INX Türkiye',
      'Zeller+Gmelin distribütör',
      'Hi-Tech Coatings Türkiye',
      'matbaa markası',
      'mürekkep distribütör',
    ],
  });
}

export default function BrandsPage() {
  return <BrandsPageClient />;
}
