import type { Metadata } from 'next';

const BASE_URL = 'https://www.simlimited.net';
const DEFAULT_LOCALE = 'tr';

/* ------------------------------------------------------------------ */
/*  Locale-aware brand, keyword & description constants                */
/* ------------------------------------------------------------------ */

export const BRAND_NAMES: Record<string, string> = {
  tr: 'SIM Baskı Malzemeleri',
  en: 'SIM Printing Supplies',
  ru: 'SIM Печатные Материалы',
  ar: 'SIM مستلزمات الطباعة',
};

export const BASE_KEYWORDS: Record<string, string[]> = {
  tr: [
    'matbaa malzemeleri', 'baskı malzemeleri', 'ofset mürekkep',
    'matbaa mürekkebi', 'yaldız mürekkep', 'metalik mürekkep',
    'UV mürekkep', 'PANTONE mürekkep', 'özel renk üretimi',
    'baskı kimyasalları', 'offset blanket', 'dispersiyon lak',
    'matbaa malzemeleri istanbul', 'baskı malzemeleri tedarikçisi',
    'SAKATA INX Türkiye', 'EVA COLOR mürekkep', 'SIM Baskı Malzemeleri',
  ],
  en: [
    'printing supplies', 'printing materials', 'offset ink',
    'metallic ink', 'UV ink', 'PANTONE ink', 'custom color production',
    'printing chemicals', 'offset blanket', 'dispersion varnish',
    'printing ink supplier Turkey', 'SAKATA INX Turkey', 'EVA COLOR ink',
    'SIM Printing Supplies',
  ],
  ru: [
    'полиграфические материалы', 'офсетные краски', 'металлические краски',
    'УФ-краски', 'краски PANTONE', 'производство спеццветов',
    'полиграфическая химия', 'офсетные полотна', 'дисперсионный лак',
    'поставщик печатных красок Турция', 'SAKATA INX Турция', 'EVA COLOR',
    'SIM Печатные Материалы',
  ],
  ar: [
    'مستلزمات الطباعة', 'مواد الطباعة', 'أحبار الأوفست',
    'أحبار معدنية', 'أحبار UV', 'أحبار بانتون', 'إنتاج ألوان مخصصة',
    'كيماويات الطباعة', 'بطانيات الأوفست', 'ورنيش التشتت',
    'مورد أحبار الطباعة تركيا', 'SAKATA INX تركيا', 'EVA COLOR',
    'SIM مستلزمات الطباعة',
  ],
};

export const ORG_DESCRIPTIONS: Record<string, string> = {
  tr: 'Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, özel renk üretimi ve baskı kimyasalları. 1983\'ten beri sektörde.',
  en: 'Turkey\'s leading printing materials supplier. Offset ink, metallic ink, UV ink, custom color production, and printing chemicals. In the industry since 1983.',
  ru: 'Ведущий поставщик полиграфических материалов в Турции. Офсетные краски, металлические краски, УФ-краски, производство спеццветов и полиграфическая химия. В отрасли с 1983 года.',
  ar: 'المورد الرائد لمواد الطباعة في تركيا. أحبار أوفست، أحبار معدنية، أحبار UV، إنتاج ألوان مخصصة وكيماويات الطباعة. في الصناعة منذ عام 1983.',
};

export const LOCAL_BIZ_DESCRIPTIONS: Record<string, string> = {
  tr: 'Matbaa malzemeleri, ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, özel renk üretimi, offset blanket ve baskı kimyasalları tedarikçisi.',
  en: 'Supplier of printing materials, offset ink, metallic ink, UV ink, custom color production, offset blankets, and printing chemicals.',
  ru: 'Поставщик полиграфических материалов: офсетные краски, металлические краски, УФ-краски, производство спеццветов, офсетные полотна и полиграфическая химия.',
  ar: 'مورد مواد الطباعة وأحبار الأوفست والأحبار المعدنية وأحبار UV وإنتاج الألوان المخصصة وبطانيات الأوفست وكيماويات الطباعة.',
};

export const LAYOUT_DESCRIPTIONS: Record<string, string> = {
  tr: 'Türkiye\'nin lider matbaa tedarikçisi. Ofset, metalik, UV mürekkep, özel renk üretimi ve baskı kimyasalları. 1983\'ten beri sektörde.',
  en: 'Turkey\'s leading printing supplier. Offset, metallic, UV ink, custom color production, and printing chemicals. Since 1983.',
  ru: 'Ведущий поставщик полиграфических материалов в Турции. Офсетные, металлические, УФ-краски, производство спеццветов. С 1983 года.',
  ar: 'المورد الرائد لمواد الطباعة في تركيا. أحبار أوفست، معدنية، UV، إنتاج ألوان مخصصة وكيماويات الطباعة. منذ 1983.',
};

export const LAYOUT_TITLES: Record<string, string> = {
  tr: 'SIM Baskı Malzemeleri | Ofset Mürekkep & Matbaa',
  en: 'SIM Printing Supplies | Offset Ink & Printing Materials',
  ru: 'SIM Печатные Материалы | Офсетные Краски и Полиграфия',
  ar: 'SIM مستلزمات الطباعة | أحبار الأوفست ومواد الطباعة',
};

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
  '/matbaa-malzemeleri': { tr: '/matbaa-malzemeleri', en: '/printing-materials', ru: '/poligraficheskie-materialy', ar: '/mawad-altibaa' },
  '/matbaa-malzemeleri-istanbul': { tr: '/matbaa-malzemeleri-istanbul', en: '/printing-materials-istanbul', ru: '/tipografskie-materialy-stambul', ar: '/mawad-altibaa-istanbul' },
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
export const OG_LOCALES: Record<string, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  ru: 'ru_RU',
  ar: 'ar_SA',
};

/**
 * Build hreflang alternates using per-locale slugs.
 * Used for product/blog pages where each locale has a different slug.
 * The pathPrefix should be the Turkish path prefix (e.g. '/urunler' or '/blog').
 */
function buildSlugAlternates(
  currentPath: string,
  slugsByLocale: Record<string, string>,
): Record<string, string> {
  // Extract path prefix (e.g. '/urunler' from '/urunler/some-slug')
  const lastSlash = currentPath.lastIndexOf('/');
  const trPrefix = lastSlash > 0 ? currentPath.substring(0, lastSlash) : '';

  const result: Record<string, string> = {};
  for (const loc of ['tr', 'en', 'ru', 'ar'] as const) {
    const slug = slugsByLocale[loc] || slugsByLocale.tr;
    const translatedPrefix = translatePath(trPrefix, loc);
    if (loc === DEFAULT_LOCALE) {
      result[loc] = `${BASE_URL}${translatedPrefix}/${slug}`;
    } else {
      result[loc] = `${BASE_URL}/${loc}${translatedPrefix}/${slug}`;
    }
  }
  result['x-default'] = result.tr;
  return result;
}

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
  absoluteTitle = false,
  slugsByLocale,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
  slugsByLocale?: Record<string, string>;
}): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const alternates = slugsByLocale
    ? buildSlugAlternates(path, slugsByLocale)
    : getAlternateLanguages(path);
  const image = ogImage || '/og-image.jpg';

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [
      ...(BASE_KEYWORDS[locale] || BASE_KEYWORDS.tr),
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
      siteName: BRAND_NAMES[locale] || BRAND_NAMES.tr,
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
