import { ORGANIZATION, BASE_URL } from '@/data/organization';
import { BRAND_NAMES, ORG_DESCRIPTIONS, LOCAL_BIZ_DESCRIPTIONS, getCanonicalUrl } from '@/lib/seo';
import type { Product } from '@/data/products';
import { getProductSlug } from '@/data/products';
import type { BlogPost } from '@/data/blog';
import { getBlogSlug } from '@/data/blog';
import { glossaryTerms } from '@/data/glossary';
import { slugify } from '@/lib/slugify';
import { inlineLinksToPlainText } from '@/lib/inline-links';

/**
 * JSON-LD üreticileri — tek entity grafı:
 *   Organization (#organization) ← LocalBusiness.parentOrganization, WebSite.publisher,
 *   Article.publisher/author, Product.manufacturer (kendi markalar), ContactPage.mainEntity
 */

const orgRef = { '@id': ORGANIZATION.id } as const;

const postalAddress = {
  '@type': 'PostalAddress',
  ...ORGANIZATION.address,
} as const;

export function organizationJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION.id,
    name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
    alternateName: ORGANIZATION.alternateName,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    description: ORG_DESCRIPTIONS[locale] || ORG_DESCRIPTIONS.tr,
    foundingDate: ORGANIZATION.foundingDate,
    sameAs: ORGANIZATION.sameAs,
    address: postalAddress,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORGANIZATION.telephone,
      contactType: 'customer service',
      email: ORGANIZATION.email,
      availableLanguage: ORGANIZATION.availableLanguage,
    },
  };
}

export function localBusinessJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORGANIZATION.localBusinessId,
    name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
    image: ORGANIZATION.logo,
    url: ORGANIZATION.url,
    telephone: ORGANIZATION.telephone,
    email: ORGANIZATION.email,
    description: LOCAL_BIZ_DESCRIPTIONS[locale] || LOCAL_BIZ_DESCRIPTIONS.tr,
    parentOrganization: orgRef,
    address: postalAddress,
    geo: { '@type': 'GeoCoordinates', ...ORGANIZATION.geo },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      ...ORGANIZATION.openingHours,
    },
    priceRange: '$$',
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'City', name: 'İstanbul' },
    ],
    sameAs: ORGANIZATION.sameAs,
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ORGANIZATION.websiteId,
    name: ORGANIZATION.name,
    alternateName: ORGANIZATION.alternateName,
    url: ORGANIZATION.url,
    inLanguage: ['tr', 'en', 'ru', 'ar'],
    publisher: orgRef,
  };
}

/**
 * Ürünün gerçek markası (schema.org Product.brand) — tedarikçi SIM değil.
 * SIM'in kendi ürettiği markalarda (EVA COLOR, VECTOR, özel renkler) üretici SIM'dir (#organization);
 * distribütörlüğünü yaptığı markalarda üretici marka sahibidir.
 */
const PRODUCT_BRANDS: Array<{ prefix: string; brand: string; manufacturer?: string }> = [
  { prefix: 'eva-color', brand: 'EVA COLOR' },
  { prefix: 'vector', brand: 'VECTOR' },
  { prefix: 'ozel-renkler', brand: 'EVA COLOR' },
  { prefix: 'sakata-inx', brand: 'SAKATA INX', manufacturer: 'SAKATA INX' },
  { prefix: 'zeller-gmelin', brand: 'Zeller+Gmelin', manufacturer: 'Zeller+Gmelin' },
  { prefix: 'schlenk', brand: 'SCHLENK', manufacturer: 'SCHLENK' },
  { prefix: 'hi-tech', brand: 'Hi-Tech Coatings', manufacturer: 'Hi-Tech Coatings' },
];

export function getProductBrand(slug: string) {
  return PRODUCT_BRANDS.find((b) => slug.startsWith(b.prefix)) ?? { prefix: '', brand: ORGANIZATION.name };
}

/** B2B teklif modeli: fiyatsız Offer (GSC uyarısı) yerine Offer yok; teklif CTA sayfada. */
export function productJsonLd(product: Product, locale: string) {
  const brand = getProductBrand(product.slug);
  const name = product.name[locale] || product.name.tr;
  const description = product.description[locale] || product.description.tr;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image:
      product.gallery.length > 0
        ? product.gallery.map((img) => `${BASE_URL}${img}`)
        : [`${BASE_URL}${product.image}`],
    url: getCanonicalUrl(locale, `/urunler/${getProductSlug(product, locale)}`),
    category: product.category,
    brand: { '@type': 'Brand', name: brand.brand },
    manufacturer: brand.manufacturer
      ? { '@type': 'Organization', name: brand.manufacturer }
      : orgRef,
    ...(product.specs?.length
      ? {
          additionalProperty: product.specs.map((s) => ({
            '@type': 'PropertyValue',
            name: s.label[locale] || s.label.tr,
            value: s.value[locale] || s.value.tr,
          })),
        }
      : {}),
  };
}

const HOME_LABELS: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
const PILLAR_LABELS: Record<string, string> = { tr: 'Matbaa Malzemeleri', en: 'Printing Materials', ru: 'Полиграфические материалы', ar: 'مواد الطباعة' };
const PRODUCTS_LABELS: Record<string, string> = { tr: 'Ürünler', en: 'Products', ru: 'Продукция', ar: 'المنتجات' };

/** Ana Sayfa › Matbaa Malzemeleri (pillar) › Ürünler › Ürün */
export function productBreadcrumbJsonLd(product: Product, locale: string) {
  const items = [
    { name: HOME_LABELS[locale] || HOME_LABELS.tr, item: getCanonicalUrl(locale, '/') },
    { name: PILLAR_LABELS[locale] || PILLAR_LABELS.tr, item: getCanonicalUrl(locale, '/matbaa-malzemeleri') },
    { name: PRODUCTS_LABELS[locale] || PRODUCTS_LABELS.tr, item: getCanonicalUrl(locale, '/urunler') },
    { name: product.name[locale] || product.name.tr, item: getCanonicalUrl(locale, `/urunler/${getProductSlug(product, locale)}`) },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
  };
}

export function productFaqJsonLd(product: Product, locale: string) {
  if (!product.faq?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: product.faq.map((f) => ({
      '@type': 'Question',
      name: f.q[locale] || f.q.tr,
      acceptedAnswer: { '@type': 'Answer', text: f.a[locale] || f.a.tr },
    })),
  };
}

/** Terim çapası dil bağımsız (İngilizce terimden): Kiril/Arapça slug'a çevrilemez; tüm dillerde aynı #id. */
export function glossaryTermAnchor(term: Record<string, string>, _locale?: string): string {
  void _locale;
  return `term-${slugify(term.en || term.tr)}`;
}

export function glossaryJsonLd(locale: string, meta: { name?: string; description?: string } = {}) {
  const pageUrl = getCanonicalUrl(locale, '/matbaa-terimleri-sozlugu');
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': pageUrl,
    name: meta.name ?? (locale === 'tr' ? 'Matbaa Terimleri Sözlüğü' : 'Printing Glossary'),
    ...(meta.description ? { description: meta.description } : {}),
    url: pageUrl,
    inLanguage: locale,
    publisher: orgRef,
    hasDefinedTerm: glossaryTerms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term[locale] || item.term.tr,
      description: item.definition[locale] || item.definition.tr,
      url: `${pageUrl}#${glossaryTermAnchor(item.term, locale)}`,
      inDefinedTermSet: pageUrl,
    })),
  };
}

export function articleJsonLd(post: BlogPost, locale: string, extra: { wordCount?: number } = {}) {
  const url = getCanonicalUrl(locale, `/blog/${getBlogSlug(post, locale)}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[locale] || post.title.tr,
    description: post.excerpt[locale] || post.excerpt.tr,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    ...(extra.wordCount ? { wordCount: extra.wordCount } : {}),
    inLanguage: locale,
    keywords: post.keywords.join(', '),
    author: orgRef,
    publisher: orgRef,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isAccessibleForFree: true,
  };
}

export function contactPageJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `${BRAND_NAMES[locale] || BRAND_NAMES.tr} — ${locale === 'tr' ? 'İletişim' : 'Contact'}`,
    url: getCanonicalUrl(locale, '/iletisim'),
    inLanguage: locale,
    mainEntity: orgRef,
  };
}

/** Yerel sayfa: kopya LocalBusiness yerine işletmeye referans veren WebPage. */
export function localPageJsonLd(locale: string, path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': getCanonicalUrl(locale, path),
    url: getCanonicalUrl(locale, path),
    name,
    description,
    inLanguage: locale,
    about: { '@id': ORGANIZATION.localBusinessId },
    publisher: orgRef,
  };
}

/** Genel SSS şeması (landing/pillar sayfaları). Cevaplardaki satır içi link sözdizimi düz metne çevrilir. */
export function faqPageJsonLd(locale: string, faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: inlineLinksToPlainText(f.q),
      acceptedAnswer: { '@type': 'Answer', text: inlineLinksToPlainText(f.a) },
    })),
  };
}

/** Sıralı liste (ör. pillar'daki 8 ürün kategorisi). */
export function itemListJsonLd(locale: string, name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    inLanguage: locale,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
  };
}

/** Breadcrumb; yollar TR anahtar yollardır, dile göre canonical URL'ye çevrilir. */
export function breadcrumbJsonLd(locale: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: getCanonicalUrl(locale, it.path),
    })),
  };
}

/** Entity grafına bağlı WebPage (website + organization @id'leri). */
export function webPageJsonLd(
  locale: string,
  path: string,
  meta: { name: string; description: string; image?: string; dateModified?: string },
) {
  const url = getCanonicalUrl(locale, path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    name: meta.name,
    description: meta.description,
    inLanguage: locale,
    isPartOf: { '@id': ORGANIZATION.websiteId },
    publisher: orgRef,
    about: orgRef,
    ...(meta.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: `${BASE_URL}${meta.image}` } } : {}),
    ...(meta.dateModified ? { dateModified: meta.dateModified } : {}),
  };
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
