import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { HUB_CONTENT, INK_TYPES, HUB_RELATED_POSTS, HUB_RELATED_LINKS, hubWordCount, hubText } from '@/data/murekkep-hub';
import { routing } from '@/i18n/routing';
import { getProductBySlug } from '@/data/products';
import { getBlogPostBySlug } from '@/data/blog';
import { ORGANIZATION } from '@/data/organization';
import { buildLlmsTxt } from '@/lib/llms';
import { GET as sitemapGET } from '@/app/sitemap.xml/route';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe('ink hub /matbaa-murekkepleri (brief B)', () => {
  it('route exists in four locales and is wired into nav, footer, llms and sitemap', async () => {
    const entry = routing.pathnames['/matbaa-murekkepleri'] as Record<string, string>;
    expect(entry.en).toBe('/printing-inks');
    for (const l of LOCALES) expect(entry[l]).toBeTruthy();
    expect(read('src/components/layout/VerticalNav.tsx')).toMatch(/'\/matbaa-murekkepleri'/);
    expect(read('src/components/layout/Footer.tsx')).toMatch(/'\/matbaa-murekkepleri'/);
    for (const l of LOCALES) expect(JSON.parse(read(`messages/${l}.json`)).nav.printingInks).toBeTruthy();
    expect(buildLlmsTxt()).toMatch(/\/en\/printing-inks/);
    const xml = await (await sitemapGET()).text();
    expect(xml).toMatch(/\/matbaa-murekkepleri<\/loc>/);
    expect(xml).toMatch(/\/en\/printing-inks<\/loc>/);
    expect(existsSync(join(root, 'src/app/[locale]/matbaa-murekkepleri/page.tsx'))).toBe(true);
  });
  it('volume: TR 2,000–3,200 words, EN ≥ 1,600, RU/AR ≥ 800; keyword density natural', () => {
    const tr = hubWordCount('tr');
    expect(tr).toBeGreaterThanOrEqual(2000);
    expect(tr).toBeLessThanOrEqual(3200);
    expect(hubWordCount('en')).toBeGreaterThanOrEqual(1600);
    expect(hubWordCount('ru')).toBeGreaterThanOrEqual(800);
    expect(hubWordCount('ar')).toBeGreaterThanOrEqual(800);
    const t = hubText('tr');
    const hits = (t.match(/matbaa mürekke/gi) || []).length;
    expect(hits / words(t)).toBeLessThanOrEqual(0.02);
    expect(hits).toBeGreaterThanOrEqual(8);
    expect(t).toMatch(/matbaa boyası/i);
  });
  it('head: TR title ≤ 60 with "Matbaa Mürekkepleri", H1 names types/selection/supply; EN title carries "Turkey"', () => {
    expect(HUB_CONTENT.tr.meta.title.length).toBeLessThanOrEqual(60);
    expect(HUB_CONTENT.tr.meta.title).toMatch(/Matbaa Mürekkepleri/);
    expect(HUB_CONTENT.tr.hero.h1).toMatch(/Matbaa Mürekkepleri/);
    expect(HUB_CONTENT.en.meta.title.length).toBeLessThanOrEqual(60);
    expect(HUB_CONTENT.en.meta.title).toMatch(/Printing Inks/);
    expect(HUB_CONTENT.en.hero.h1).toMatch(/Turkey/);
    for (const l of ['tr', 'en'] as const) {
      expect(HUB_CONTENT[l].meta.description.length).toBeGreaterThanOrEqual(140);
      expect(HUB_CONTENT[l].meta.description.length).toBeLessThanOrEqual(160);
    }
  });
  it('six ink types, each linking an existing product and naming matrix brands; TR body 110–260 words', () => {
    expect(INK_TYPES).toHaveLength(6);
    const names = ORGANIZATION.brands.map((b) => b.name);
    for (const t of INK_TYPES) {
      expect(getProductBySlug(t.productSlug), t.key).toBeDefined();
      for (const b of t.brands) expect(names).toContain(b);
      const n = words(t.body.tr.join(' ') + ' ' + t.whenToUse.tr);
      expect(n).toBeGreaterThanOrEqual(110);
      expect(n).toBeLessThanOrEqual(260);
      for (const l of LOCALES) expect(t.name[l]).toBeTruthy();
    }
  });
  it.each(LOCALES)('%s brand × type matrix covers the four ink brands and six types; selection table ≥ 6 rows; 10 FAQs (≥ 6 for ru/ar)', (l) => {
    const c = HUB_CONTENT[l];
    expect(c.matrix.brands).toEqual(['SAKATA INX', 'Zeller+Gmelin', 'SCHLENK', 'EVA COLOR']);
    expect(c.matrix.headers.length).toBe(INK_TYPES.length + 1);
    for (const row of c.matrix.rows) expect(row).toHaveLength(INK_TYPES.length + 1);
    expect(c.selection.rows.length).toBeGreaterThanOrEqual(6);
    expect(c.faq.items.length).toBeGreaterThanOrEqual(l === 'tr' || l === 'en' ? 10 : 6);
    expect(c.price.factors.length).toBeGreaterThanOrEqual(5);
  });
  it('related posts and links resolve', () => {
    expect(HUB_RELATED_POSTS.length).toBeGreaterThanOrEqual(8);
    for (const s of HUB_RELATED_POSTS) expect(getBlogPostBySlug(s), s).toBeDefined();
    for (const l of HUB_RELATED_LINKS) expect(l.path in routing.pathnames).toBe(true);
    expect(HUB_RELATED_LINKS.map((l) => l.path)).toContain('/matbaa-malzemeleri');
  });
  it('pillar links to the hub and the hub links back to the pillar', () => {
    expect(read('src/data/pillar-matbaa-malzemeleri.ts')).toMatch(/path: '\/matbaa-murekkepleri'/);
  });
});
