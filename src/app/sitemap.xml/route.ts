import { products } from '@/data/products';

const BASE_URL = 'https://www.simlimited.net';
const locales = ['tr', 'en', 'ru', 'ar'] as const;
const defaultLocale = 'tr';

// Localized pathname mappings (must match routing.ts)
const pathnames: Record<string, Record<string, string>> = {
  '/urunler': { tr: '/urunler', en: '/products', ru: '/produkty', ar: '/products' },
  '/ozel-renk-uretimi': { tr: '/ozel-renk-uretimi', en: '/custom-color-production', ru: '/proizvodstvo-tsvetov', ar: '/custom-color-production' },
  '/temsilcilikler': { tr: '/temsilcilikler', en: '/brands', ru: '/brendy', ar: '/brands' },
  '/hakkimizda': { tr: '/hakkimizda', en: '/about', ru: '/o-nas', ar: '/about' },
  '/iletisim': { tr: '/iletisim', en: '/contact', ru: '/kontakty', ar: '/contact' },
  '/blog': { tr: '/blog', en: '/blog', ru: '/blog', ar: '/blog' },
  '/gizlilik-politikasi': { tr: '/gizlilik-politikasi', en: '/privacy-policy', ru: '/politika-konfidentsialnosti', ar: '/privacy-policy' },
  '/kullanim-kosullari': { tr: '/kullanim-kosullari', en: '/terms-of-use', ru: '/usloviya-ispolzovaniya', ar: '/terms-of-use' },
};

function getLocalizedUrl(locale: string, path: string): string {
  // Check if path has a localized version
  const localized = pathnames[path];
  const resolvedPath = localized ? localized[locale] || path : path;
  const cleanPath = resolvedPath === '/' ? '' : resolvedPath;

  if (locale === defaultLocale) {
    return `${BASE_URL}${cleanPath}`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

function getProductUrl(locale: string, slug: string): string {
  const base = pathnames['/urunler']?.[locale] || '/urunler';
  if (locale === defaultLocale) {
    return `${BASE_URL}${base}/${slug}`;
  }
  return `${BASE_URL}/${locale}${base}/${slug}`;
}

export async function GET() {
  const now = new Date().toISOString();

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/urunler', priority: '0.9', changefreq: 'weekly' },
    { path: '/ozel-renk-uretimi', priority: '0.8', changefreq: 'monthly' },
    { path: '/temsilcilikler', priority: '0.8', changefreq: 'monthly' },
    { path: '/hakkimizda', priority: '0.7', changefreq: 'monthly' },
    { path: '/iletisim', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.6', changefreq: 'weekly' },
    { path: '/gizlilik-politikasi', priority: '0.3', changefreq: 'yearly' },
    { path: '/kullanim-kosullari', priority: '0.3', changefreq: 'yearly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Static pages for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      xml += `
  <url>
    <loc>${getLocalizedUrl(locale, page.path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

      // hreflang alternates
      for (const altLocale of locales) {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${getLocalizedUrl(altLocale, page.path)}" />`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${getLocalizedUrl(defaultLocale, page.path)}" />`;

      xml += `
  </url>`;
    }
  }

  // Product detail pages
  for (const product of products) {
    for (const locale of locales) {
      xml += `
  <url>
    <loc>${getProductUrl(locale, product.slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;

      for (const altLocale of locales) {
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${getProductUrl(altLocale, product.slug)}" />`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${getProductUrl(defaultLocale, product.slug)}" />`;

      xml += `
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
