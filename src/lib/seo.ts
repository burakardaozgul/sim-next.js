import type { Metadata } from 'next';

const BASE_URL = 'https://www.simlimited.net';
const DEFAULT_LOCALE = 'tr';

/**
 * Path translations matching i18n/routing.ts pathname config.
 * Maps Turkish (default) paths to their locale equivalents.
 */
const PATH_TRANSLATIONS: Record<string, Record<string, string>> = {
  '/urunler': { tr: '/urunler', en: '/products', ru: '/produkty', ar: '/products' },
  '/ozel-renk-uretimi': { tr: '/ozel-renk-uretimi', en: '/custom-color-production', ru: '/proizvodstvo-tsvetov', ar: '/custom-color-production' },
  '/temsilcilikler': { tr: '/temsilcilikler', en: '/brands', ru: '/brendy', ar: '/brands' },
  '/hakkimizda': { tr: '/hakkimizda', en: '/about', ru: '/o-nas', ar: '/about' },
  '/iletisim': { tr: '/iletisim', en: '/contact', ru: '/kontakty', ar: '/contact' },
  '/sss': { tr: '/sss', en: '/faq', ru: '/voprosy', ar: '/faq' },
  '/gizlilik-politikasi': { tr: '/gizlilik-politikasi', en: '/privacy-policy', ru: '/politika-konfidentsialnosti', ar: '/privacy-policy' },
  '/kullanim-kosullari': { tr: '/kullanim-kosullari', en: '/terms-of-use', ru: '/usloviya-ispolzovaniya', ar: '/terms-of-use' },
};

/**
 * Translate a Turkish path to the correct locale path.
 */
function translatePath(trPath: string, locale: string): string {
  // Exact match
  if (PATH_TRANSLATIONS[trPath]) {
    return PATH_TRANSLATIONS[trPath][locale] || trPath;
  }

  // Dynamic routes: check if path starts with a known prefix
  // e.g. /urunler/some-slug → /products/some-slug (for EN)
  for (const [prefix, translations] of Object.entries(PATH_TRANSLATIONS)) {
    if (trPath.startsWith(prefix + '/')) {
      const suffix = trPath.slice(prefix.length); // e.g. /some-slug
      return (translations[locale] || prefix) + suffix;
    }
  }

  // Blog and other untranslated paths stay the same
  return trPath;
}

/**
 * Build canonical URL for a given locale and path.
 */
export function getCanonicalUrl(locale: string, path: string = ''): string {
  const cleanPath = path === '/' ? '' : path;
  if (locale === DEFAULT_LOCALE) {
    return `${BASE_URL}${cleanPath}`;
  }
  const translatedPath = translatePath(cleanPath, locale);
  return `${BASE_URL}/${locale}${translatedPath}`;
}

/**
 * Build hreflang alternate links for a given path (expects Turkish path).
 */
export function getAlternateLanguages(path: string = ''): Record<string, string> {
  const cleanPath = path === '/' ? '' : path;
  return {
    'tr': `${BASE_URL}${cleanPath}`,
    'en': `${BASE_URL}/en${translatePath(cleanPath, 'en')}`,
    'ru': `${BASE_URL}/ru${translatePath(cleanPath, 'ru')}`,
    'ar': `${BASE_URL}/ar${translatePath(cleanPath, 'ar')}`,
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
