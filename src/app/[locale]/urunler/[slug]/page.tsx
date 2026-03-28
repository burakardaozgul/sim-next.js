import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';
import { products, getProductBySlug, getAllProductSlugs, getProductSlug } from '@/data/products';

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  offset: ['ofset mürekkep', 'offset ink', 'CMYK mürekkep'],
  metallic: ['metalik mürekkep', 'yaldız mürekkep', 'metallic ink'],
  uv: ['UV mürekkep', 'UV offset', 'UV ink'],
  pantone: ['PANTONE mürekkep', 'PANTONE renk', 'özel renk'],
  custom: ['özel renk üretimi', 'renk eşleştirme', 'custom color'],
  blanket: ['offset blanket', 'baskı blanket', 'printing blanket'],
  chemicals: ['baskı kimyasalları', 'dispersiyon lak', 'printing chemicals'],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const name = product.name[locale] || product.name.tr;
  const description = product.description[locale] || product.description.tr;
  const categoryKeywords = CATEGORY_KEYWORDS[product.category] || [];

  const localizedSlug = getProductSlug(product, locale);
  return createPageMetadata({
    locale,
    path: `/urunler/${localizedSlug}`,
    title: name,
    description,
    keywords: [...categoryKeywords, name],
    ogImage: product.image,
    slugsByLocale: product.slugs,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const name = product.name[locale] || product.name.tr;
  const description = product.description[locale] || product.description.tr;
  const categoryLabel = product.category;

  const BASE_URL = 'https://www.simlimited.net';
  const localizedSlug = getProductSlug(product, locale);
  const productUrl =
    locale === 'tr'
      ? `${BASE_URL}/urunler/${localizedSlug}`
      : `${BASE_URL}/${locale}/urunler/${localizedSlug}`;
  const productsUrl =
    locale === 'tr' ? `${BASE_URL}/urunler` : `${BASE_URL}/${locale}/urunler`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const homeLabels: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
  const productsLabels: Record<string, string> = { tr: 'Ürünler', en: 'Products', ru: 'Продукция', ar: 'المنتجات' };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabels[locale] || homeLabels.tr,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: productsLabels[locale] || productsLabels.tr,
        item: productsUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: productUrl,
      },
    ],
  };

  const contactUrl =
    locale === 'tr' ? `${BASE_URL}/iletisim` : `${BASE_URL}/${locale}/iletisim`;

  const brandName = BRAND_NAMES[locale] || BRAND_NAMES.tr;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.gallery.length > 0 ? product.gallery.map((img) => `${BASE_URL}${img}`) : [`${BASE_URL}${product.image}`],
    url: productUrl,
    category: categoryLabel,
    inLanguage: locale,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: brandName,
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      url: contactUrl,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'TRY',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
