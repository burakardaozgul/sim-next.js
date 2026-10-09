import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  // HTML'deki <link rel="alternate" hreflang> (yerelleştirilmiş slug'larla) tek kaynak;
  // next-intl'in HTTP Link başlığı TR slug'ını tüm dillere yazıp çelişki yaratıyordu.
  alternateLinks: false,
  // Her yanıta Set-Cookie: NEXT_LOCALE eklenmesin (CDN önbelleğini bozuyor;
  // dil tercihi USER_LOCALE_PREFERENCE çerezi ile istemci tarafında tutuluyor).
  localeCookie: false,
  pathnames: {
    '/': '/',
    '/urunler': {
      tr: '/urunler',
      en: '/products',
      ru: '/produkty',
      ar: '/products',
    },
    '/urunler/[slug]': {
      tr: '/urunler/[slug]',
      en: '/products/[slug]',
      ru: '/produkty/[slug]',
      ar: '/products/[slug]',
    },
    '/ozel-renk-uretimi': {
      tr: '/ozel-renk-uretimi',
      en: '/custom-color-production',
      ru: '/proizvodstvo-tsvetov',
      ar: '/custom-color-production',
    },
    '/temsilcilikler': {
      tr: '/temsilcilikler',
      en: '/brands',
      ru: '/brendy',
      ar: '/brands',
    },
    '/hakkimizda': {
      tr: '/hakkimizda',
      en: '/about',
      ru: '/o-nas',
      ar: '/about',
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact',
      ru: '/kontakty',
      ar: '/contact',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/sss': {
      tr: '/sss',
      en: '/faq',
      ru: '/voprosy',
      ar: '/faq',
    },
    '/gizlilik-politikasi': {
      tr: '/gizlilik-politikasi',
      en: '/privacy-policy',
      ru: '/politika-konfidentsialnosti',
      ar: '/privacy-policy',
    },
    '/kullanim-kosullari': {
      tr: '/kullanim-kosullari',
      en: '/terms-of-use',
      ru: '/usloviya-ispolzovaniya',
      ar: '/terms-of-use',
    },
    '/matbaa-malzemeleri': {
      tr: '/matbaa-malzemeleri',
      en: '/printing-materials',
      ru: '/poligraficheskie-materialy',
      ar: '/mawad-altibaa',
    },
    '/matbaa-malzemeleri-istanbul': {
      tr: '/matbaa-malzemeleri-istanbul',
      en: '/printing-materials-istanbul',
      ru: '/tipografskie-materialy-stambul',
      ar: '/mawad-altibaa-istanbul',
    },
    '/ofset-baski-malzemeleri': {
      tr: '/ofset-baski-malzemeleri',
      en: '/offset-printing-supplies',
      ru: '/materialy-ofsetnoj-pechati',
      ar: '/mawad-tibaat-offset',
    },
    '/matbaa-murekkepleri': {
      tr: '/matbaa-murekkepleri',
      en: '/printing-inks',
      ru: '/pechatnye-kraski',
      ar: '/ahbar-altibaa',
    },
    '/matbaa-terimleri-sozlugu': {
      tr: '/matbaa-terimleri-sozlugu',
      en: '/printing-glossary',
      ru: '/glossarij-poligrafii',
      ar: '/mustalahaat-altibaa',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
