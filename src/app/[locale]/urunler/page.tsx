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

const BREADCRUMB_LABELS: Record<string, { home: string; products: string }> = {
  tr: { home: 'Ana Sayfa', products: 'Ürünler' },
  en: { home: 'Home', products: 'Products' },
  ru: { home: 'Главная', products: 'Продукция' },
  ar: { home: 'الرئيسية', products: 'المنتجات' },
};

function ProductsBreadcrumbJsonLd({ locale }: { locale: string }) {
  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.tr;
  const BASE_URL = 'https://www.simlimited.net';
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;
  const productsUrl =
    locale === 'tr' ? `${BASE_URL}/urunler` : `${BASE_URL}/${locale}/${locale === 'en' ? 'products' : locale === 'ru' ? 'produkty' : 'products'}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.products,
        item: productsUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductsBreadcrumbJsonLd locale={locale} />
      <ProductsPageClient />
    </>
  );
}
