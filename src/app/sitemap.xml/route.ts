import { routing } from '@/i18n/routing';
import { locales, defaultLocale } from '@/i18n/config';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { BASE_URL } from '@/data/organization';
import { localizedStaticPath, localizedProductPath, localizedBlogPath } from '@/lib/paths';
import contentDates from '@/data/content-dates.json';

export const dynamic = 'force-static';

/** Dizine girmeyen sayfalar sitemap'te yer almaz */
const NOINDEX_PATHS = new Set(['/gizlilik-politikasi', '/kullanim-kosullari']);

const PRIORITY: Record<string, { priority: string; changefreq: string }> = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/urunler': { priority: '0.9', changefreq: 'weekly' },
  '/matbaa-malzemeleri': { priority: '0.9', changefreq: 'weekly' },
  '/ofset-baski-malzemeleri': { priority: '0.9', changefreq: 'weekly' },
  '/matbaa-malzemeleri-istanbul': { priority: '0.8', changefreq: 'monthly' },
  '/ozel-renk-uretimi': { priority: '0.8', changefreq: 'monthly' },
  '/temsilcilikler': { priority: '0.8', changefreq: 'monthly' },
  '/iletisim': { priority: '0.8', changefreq: 'monthly' },
  '/hakkimizda': { priority: '0.7', changefreq: 'monthly' },
  '/sss': { priority: '0.7', changefreq: 'monthly' },
  '/matbaa-terimleri-sozlugu': { priority: '0.7', changefreq: 'monthly' },
  '/blog': { priority: '0.6', changefreq: 'weekly' },
};

type StaticKey = keyof typeof routing.pathnames;
const staticPaths = (Object.keys(routing.pathnames) as StaticKey[]).filter(
  (key) => !key.includes('[') && !NOINDEX_PATHS.has(key),
);

const abs = (path: string) => `${BASE_URL}${path === '/' ? '' : path}`;

function urlEntry(
  locs: Record<string, string>,
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  const locale = locales.find((l) => locs[l]) ?? defaultLocale;
  let xml = `
  <url>
    <loc>${locs[locale]}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
  for (const alt of locales) {
    xml += `
    <xhtml:link rel="alternate" hreflang="${alt}" href="${locs[alt]}" />`;
  }
  xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${locs[defaultLocale]}" />
  </url>`;
  return xml;
}

export async function GET() {
  const dates = contentDates as { site: string; products: string; pages: Record<string, string> };
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Statik sayfalar — her dil için ayrı <url>, hreflang seti ortak
  for (const path of staticPaths) {
    const meta = PRIORITY[path] ?? { priority: '0.5', changefreq: 'monthly' };
    const lastmod = dates.pages[path] ?? dates.site;
    for (const locale of locales) {
      const locs = Object.fromEntries(
        locales.map((l) => {
          const localized = localizedStaticPath(path, l);
          return [l, abs(localized)];
        }),
      );
      // <loc> için istenen dilin URL'si başa alınır
      xml += urlEntry({ ...locs, [locale]: locs[locale] }, lastmod, meta.changefreq, meta.priority).replace(
        `<loc>${locs[locales[0]]}</loc>`,
        `<loc>${locs[locale]}</loc>`,
      );
    }
  }

  // Ürünler
  for (const product of products) {
    const locs = Object.fromEntries(locales.map((l) => [l, abs(localizedProductPath(product.slug, l))]));
    for (const locale of locales) {
      xml += urlEntry(locs, dates.products, 'monthly', '0.7').replace(
        `<loc>${locs[locales[0]]}</loc>`,
        `<loc>${locs[locale]}</loc>`,
      );
    }
  }

  // Blog yazıları — lastmod: güncelleme tarihi yoksa yayın tarihi
  for (const post of blogPosts) {
    const locs = Object.fromEntries(locales.map((l) => [l, abs(localizedBlogPath(post.slug, l))]));
    for (const locale of locales) {
      xml += urlEntry(locs, post.updated ?? post.date, 'monthly', '0.6').replace(
        `<loc>${locs[locales[0]]}</loc>`,
        `<loc>${locs[locale]}</loc>`,
      );
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
