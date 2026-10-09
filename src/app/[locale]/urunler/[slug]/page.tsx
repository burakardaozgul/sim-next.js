import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { createPageMetadata, translatePath } from '@/lib/seo';
import { productJsonLd } from '@/lib/schema';
import ProductDetailClient from './ProductDetailClient';
import { getProductSlug, resolveProductForLocale, getProductSlugsForLocale } from '@/data/products';
import { locales } from '@/i18n/config';
import { localizedProductPath } from '@/lib/paths';
import { LocaleSlugsProvider } from '@/components/layout/LocaleSlugsContext';
import { blogPosts, BlogPost, toBlogSummary } from '@/data/blog';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  // Her dil yalnızca kendi slug'larını üretir; başka dilin slug'ı istek anında 308 ile yönlenir.
  return locales.flatMap((locale) =>
    getProductSlugsForLocale(locale).map((slug) => ({ locale, slug })),
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
  const { product } = resolveProductForLocale(slug, locale);

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
  setRequestLocale(locale);
  const { product, redirectSlug } = resolveProductForLocale(slug, locale);

  // Başka bir dilin slug'ı ile gelen istek (kopya URL) → kalıcı 308, doğru slug.
  if (redirectSlug) permanentRedirect(localizedProductPath(redirectSlug, locale));
  if (!product) notFound();

  const relatedBlogData = (product.relatedBlogPosts || [])
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined)
    .map(toBlogSummary);

  const name = product.name[locale] || product.name.tr;

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

  const productSchema = productJsonLd(product, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <LocaleSlugsProvider slugs={product.slugs}>
        <ProductDetailClient product={product} relatedBlogPosts={relatedBlogData} />
      </LocaleSlugsProvider>
    </>
  );
}
