import type { MetadataRoute } from 'next';
import { products } from '@/data/products';

const BASE_URL = 'https://www.simlimited.net';

const locales = ['tr', 'en', 'ru', 'ar'] as const;
const defaultLocale = 'tr';

function getLocalePath(locale: string, path: string): string {
  const cleanPath = path === '/' ? '' : path;
  if (locale === defaultLocale) {
    return `${BASE_URL}${cleanPath}`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

function getAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = getLocalePath(locale, path);
  }
  languages['x-default'] = getLocalePath(defaultLocale, path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/urunler', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/ozel-renk-uretimi', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/temsilcilikler', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hakkimizda', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/iletisim', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/gizlilik-politikasi', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/kullanim-kosullari', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: getLocalePath(locale, page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: getAlternates(page.path),
    }))
  );

  // Product detail pages
  const productEntries: MetadataRoute.Sitemap = products.flatMap((product) =>
    locales.map((locale) => ({
      url: getLocalePath(locale, `/urunler/${product.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: getAlternates(`/urunler/${product.slug}`),
    }))
  );

  return [...staticEntries, ...productEntries];
}
