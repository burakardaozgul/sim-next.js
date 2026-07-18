import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata, BRAND_NAMES, translatePath } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';
import { getProductBySlug, getAllProductSlugs, getProductSlug } from '@/data/products';
import { blogPosts, BlogPost } from '@/data/blog';

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

/**
 * Ürünün gerçek markası (schema.org Product.brand) — tedarikçi SIM değil.
 * SIM'in kendi ürettiği markalarda (EVA COLOR, VECTOR, özel renkler)
 * üretici de SIM'dir; distribütörlüğünü yaptığı markalarda üretici marka sahibidir.
 */
const PRODUCT_BRANDS: Array<{ prefix: string; brand: string; manufacturer: string }> = [
  { prefix: 'eva-color', brand: 'EVA COLOR', manufacturer: 'SIM Baskı Malzemeleri' },
  { prefix: 'vector', brand: 'VECTOR', manufacturer: 'SIM Baskı Malzemeleri' },
  { prefix: 'ozel-renkler', brand: 'EVA COLOR', manufacturer: 'SIM Baskı Malzemeleri' },
  { prefix: 'sakata-inx', brand: 'SAKATA INX', manufacturer: 'SAKATA INX' },
  { prefix: 'zeller-gmelin', brand: 'Zeller+Gmelin', manufacturer: 'Zeller+Gmelin' },
  { prefix: 'schlenk', brand: 'SCHLENK', manufacturer: 'SCHLENK' },
  { prefix: 'hi-tech', brand: 'Hi-Tech Coatings', manufacturer: 'Hi-Tech Coatings' },
];

function getProductBrand(slug: string) {
  return (
    PRODUCT_BRANDS.find((b) => slug.startsWith(b.prefix)) ?? {
      prefix: '',
      brand: 'SIM Baskı Malzemeleri',
      manufacturer: 'SIM Baskı Malzemeleri',
    }
  );
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

  const relatedBlogData = (product.relatedBlogPosts || [])
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);

  const name = product.name[locale] || product.name.tr;
  const description = product.description[locale] || product.description.tr;
  const categoryLabel = product.category;

  const BASE_URL = 'https://www.simlimited.net';
  const localizedSlug = getProductSlug(product, locale);
  const productsPath = translatePath('/urunler', locale);
  const productUrl =
    locale === 'tr'
      ? `${BASE_URL}${productsPath}/${localizedSlug}`
      : `${BASE_URL}/${locale}${productsPath}/${localizedSlug}`;
  const productsUrl =
    locale === 'tr' ? `${BASE_URL}${productsPath}` : `${BASE_URL}/${locale}${productsPath}`;
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
  const productBrand = getProductBrand(product.slug);
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
      name: productBrand.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: productBrand.manufacturer,
    },
    offers: {
      '@type': 'Offer',
      url: contactUrl,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: brandName,
        url: BASE_URL,
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
      <ProductDetailClient product={product} relatedBlogPosts={relatedBlogData} />
    </>
  );
}
