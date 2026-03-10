import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
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
  },
});

export type Pathnames = keyof typeof routing.pathnames;
