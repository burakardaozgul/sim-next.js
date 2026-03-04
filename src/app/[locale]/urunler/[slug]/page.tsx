import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';
import { products, getProductBySlug } from '@/data/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
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

  return createPageMetadata({
    locale,
    path: `/urunler/${slug}`,
    title: name,
    description,
    keywords: [...categoryKeywords, name],
    ogImage: product.image,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: product.gallery.length > 0 ? product.gallery : [product.image],
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'SIM Baskı Malzemeleri',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'SIM Baskı Malzemeleri',
      url: 'https://www.simlimited.net',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
