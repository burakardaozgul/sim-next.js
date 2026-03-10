import type { Metadata } from 'next';

const BASE_URL = 'https://www.simlimited.net';
const DEFAULT_LOCALE = 'tr';

/**
 * Build canonical URL for a given locale and path.
 */
export function getCanonicalUrl(locale: string, path: string = ''): string {
  const cleanPath = path === '/' ? '' : path;
  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${cleanPath}`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

/**
 * Build hreflang alternate links for a given path.
 */
export function getAlternateLanguages(path: string = ''): Record<string, string> {
  const cleanPath = path === '/' ? '' : path;
  return {
    'tr': `${BASE_URL}${cleanPath}`,
    'en': `${BASE_URL}/en${cleanPath}`,
    'ru': `${BASE_URL}/ru${cleanPath}`,
    'ar': `${BASE_URL}/ar${cleanPath}`,
    'x-default': `${BASE_URL}${cleanPath}`,
  };
}

/**
 * Locale to OpenGraph locale mapping.
 */
const OG_LOCALES: Record<string, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  ru: 'ru_RU',
  ar: 'ar_SA',
};

/**
 * Generate page-specific metadata with all SEO fields.
 */
export function createPageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const alternates = getAlternateLanguages(path);
  const image = ogImage || '/og-image.jpg';

  return {
    title,
    description,
    keywords: [
      'matbaa malzemeleri',
      'baskı malzemeleri',
      ...keywords,
    ],
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SIM Baskı Malzemeleri',
      locale: OG_LOCALES[locale] || 'tr_TR',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}
