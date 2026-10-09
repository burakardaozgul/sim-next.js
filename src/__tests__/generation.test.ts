import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GET as sitemapGET } from '@/app/sitemap.xml/route';
import { GET as llmsGET } from '@/app/llms.txt/route';
import { GET as llmsFullGET } from '@/app/llms-full.txt/route';
import { blogPosts } from '@/data/blog';
import { products } from '@/data/products';
import contentDates from '@/data/content-dates.json';
import { buildIndexNowRequest } from '@/lib/indexnow';
import Analytics from '@/components/layout/Analytics';

describe('sitemap.xml', async () => {
  const xml = await (await sitemapGET()).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it('excludes noindex pages (privacy, terms) and ru/ar blog summaries; keeps the rest', () => {
    expect(locs.some((l) => /gizlilik|privacy|politika|kullanim|terms|usloviya/.test(l))).toBe(false);
    // 188 (önceki) + 4 (mürekkep hub'ı, 4 dil) − 2 × yazı sayısı (ru/ar özetleri, 08 §2)
    expect(locs).toHaveLength(192 - 2 * blogPosts.length);
  });

  it('uses the post date (or updated) as lastmod for blog URLs', () => {
    const post = blogPosts.find((p) => p.slug === 'baski-kimyasallari-rehberi')!;
    const block = xml.slice(xml.indexOf(`/blog/${post.slug}</loc>`));
    expect(block).toContain(`<lastmod>${post.updated ?? post.date}</lastmod>`);
  });

  it('uses generated content dates for products and static pages instead of a hard-coded constant', () => {
    const prodBlock = xml.slice(xml.indexOf(`/urunler/${products[0].slug}</loc>`));
    expect(prodBlock).toContain(`<lastmod>${contentDates.products}</lastmod>`);
    expect(xml).not.toContain("'2026-07-18'");
  });

  it('is generated from routing.pathnames (no duplicated path table in the route)', () => {
    const src = readFileSync(join(__dirname, '..', 'app', 'sitemap.xml', 'route.ts'), 'utf8');
    expect(src).toContain("from '@/i18n/routing'");
    expect(src).not.toMatch(/'\/urunler': \{ tr: '\/urunler'/);
  });
});

describe('llms.txt and llms-full.txt are generated from the data files', async () => {
  const llms = await (await llmsGET()).text();
  const full = await (await llmsFullGET()).text();

  it('lists every post with TR and EN URLs and every product', () => {
    for (const p of blogPosts) {
      expect(llms, p.slug).toContain(`https://www.simlimited.net/blog/${p.slug}`);
      expect(llms, p.slug).toContain(`https://www.simlimited.net/en/blog/${p.slugs.en}`);
    }
    for (const p of products) expect(llms, p.slug).toContain(`/urunler/${p.slug}`);
  });

  it('carries the organization facts from the single source and no stale values', () => {
    expect(llms).toContain('1983');
    expect(llms).toContain('34524');
    expect(llms).not.toContain('34000');
    expect(llms).toContain('/matbaa-malzemeleri');
    expect(llms).toContain('/en/printing-materials');
  });

  it('llms-full.txt includes all post titles, the shared FAQ and the glossary', () => {
    for (const p of blogPosts) expect(full, p.slug).toContain(p.title.tr);
    expect(full).toContain('Sıkça Sorulan Sorular');
    expect(full).toContain('Sözlük');
    expect(full).not.toContain('34000');
  });
});

describe('IndexNow', () => {
  it('builds a valid IndexNow request for the host', () => {
    const req = buildIndexNowRequest(['https://www.simlimited.net/', 'https://www.simlimited.net/blog'], 'abc123');
    expect(req.url).toBe('https://api.indexnow.org/indexnow');
    expect(req.body).toEqual({
      host: 'www.simlimited.net',
      key: 'abc123',
      keyLocation: 'https://www.simlimited.net/abc123.txt',
      urlList: ['https://www.simlimited.net/', 'https://www.simlimited.net/blog'],
    });
  });
});

describe('Analytics (GTM) component', () => {
  it('renders nothing without a container id', () => {
    expect(renderToStaticMarkup(createElement(Analytics, { gtmId: undefined }))).toBe('');
  });
  it('renders the GTM loader with consent defaults when an id is set', () => {
    const html = renderToStaticMarkup(createElement(Analytics, { gtmId: 'GTM-TEST1' }));
    expect(html).toContain('googletagmanager.com/gtm.js?id=GTM-TEST1');
    expect(html).toContain("'default'");
    expect(html).toContain('denied');
  });
});
