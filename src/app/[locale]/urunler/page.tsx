import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import ProductsPageClient from './ProductsPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Matbaa Malzemeleri & Baskı Ürünleri',
    description:
      'SIM Baskı Malzemeleri ürün kataloğu. Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, PANTONE mürekkep, özel renk, offset blanket ve baskı kimyasalları. Matbaa malzemeleri için en doğru adres.',
  },
  en: {
    title: 'Printing Materials & Products',
    description:
      'SIM Printing Supplies product catalog. Offset ink, metallic ink, UV ink, PANTONE ink, custom colors, offset blankets, and printing chemicals.',
  },
  ru: {
    title: 'Полиграфические Материалы и Продукция',
    description:
      'Каталог продукции SIM. Офсетные краски, металлические краски, УФ-краски, PANTONE краски, специальные цвета и полиграфическая химия.',
  },
  ar: {
    title: 'مواد الطباعة والمنتجات',
    description:
      'كتالوج منتجات SIM. أحبار الأوفست، أحبار معدنية، أحبار UV، ألوان مخصصة وكيماويات الطباعة.',
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
    path: '/urunler',
    title: m.title,
    description: m.description,
    keywords: [
      'ofset mürekkep',
      'matbaa mürekkebi',
      'baskı malzemeleri',
      'yaldız mürekkep',
      'UV mürekkep',
      'PANTONE mürekkep',
      'offset blanket',
      'baskı kimyasalları',
    ],
  });
}

export default function ProductsPage() {
  return <ProductsPageClient />;
}
