import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { EXPORT_HUB, OFFSET_INK_EXPORT, EXPORT_PRODUCT_RANGE, exportWordCount, RFQ_PRODUCT_GROUPS, RFQ_INCOTERMS } from '@/data/export';
import { routing } from '@/i18n/routing';
import { getProductBySlug } from '@/data/products';
import { buildLlmsTxt } from '@/lib/llms';
import { GET as sitemapGET } from '@/app/sitemap.xml/route';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;

describe('EN export pages (brief H / 08 §3)', () => {
  it('two export routes exist in four locales with the planned EN slugs; sitemap, llms, footer wired', async () => {
    const hub = routing.pathnames['/ihracat'] as Record<string, string>;
    const ink = routing.pathnames['/ofset-murekkep-ihracati'] as Record<string, string>;
    expect(hub.en).toBe('/printing-supplies-turkey');
    expect(ink.en).toBe('/offset-ink-supplier-turkey');
    for (const l of LOCALES) { expect(hub[l]).toBeTruthy(); expect(ink[l]).toBeTruthy(); }
    const xml = await (await sitemapGET()).text();
    expect(xml).toMatch(/\/en\/printing-supplies-turkey<\/loc>/);
    expect(xml).toMatch(/\/en\/offset-ink-supplier-turkey<\/loc>/);
    expect(buildLlmsTxt()).toMatch(/printing-supplies-turkey/);
    expect(read('src/components/layout/Footer.tsx')).toMatch(/'\/ihracat'/);
    for (const l of LOCALES) expect(JSON.parse(read(`messages/${l}.json`)).nav.export).toBeTruthy();
    expect(existsSync(join(root, 'src/app/[locale]/ihracat/page.tsx'))).toBe(true);
    expect(existsSync(join(root, 'src/app/[locale]/ofset-murekkep-ihracati/page.tsx'))).toBe(true);
  });
  it('volume: EN hub ≥ 2,000 words, EN ink page ≥ 1,500; TR/RU/AR ≥ 600 each', () => {
    expect(exportWordCount('hub', 'en')).toBeGreaterThanOrEqual(2000);
    expect(exportWordCount('ink', 'en')).toBeGreaterThanOrEqual(1500);
    for (const l of ['tr', 'ru', 'ar'] as const) {
      expect(exportWordCount('hub', l)).toBeGreaterThanOrEqual(600);
      expect(exportWordCount('ink', l)).toBeGreaterThanOrEqual(600);
    }
  });
  it('EN heads carry supplier/export intent for Turkey; titles ≤ 60; descriptions 140–160', () => {
    for (const c of [EXPORT_HUB.en, OFFSET_INK_EXPORT.en]) {
      expect(c.meta.title.length).toBeLessThanOrEqual(60);
      expect(c.meta.title).toMatch(/Turkey/);
      expect(c.hero.h1).toMatch(/Turkey/);
      expect(c.meta.description.length).toBeGreaterThanOrEqual(140);
      expect(c.meta.description.length).toBeLessThanOrEqual(160);
    }
    expect(EXPORT_HUB.en.hero.lead).toContain('since 1983');
    expect(OFFSET_INK_EXPORT.en.hero.h1).toMatch(/Offset Ink/i);
  });
  it('product range covers the 8 groups with resolvable targets; hub has why-Turkey, terms, compliance, support, sectors, 8 FAQs', () => {
    expect(EXPORT_PRODUCT_RANGE).toHaveLength(8);
    for (const g of EXPORT_PRODUCT_RANGE) {
      if (g.target.type === 'product') expect(getProductBySlug(g.target.slug), g.key).toBeDefined();
      else expect(g.target.path in routing.pathnames).toBe(true);
      for (const l of LOCALES) expect(g.name[l]).toBeTruthy();
    }
    for (const l of LOCALES) {
      const c = EXPORT_HUB[l];
      expect(c.whyTurkey.items.length).toBeGreaterThanOrEqual(4);
      expect(c.terms.rows.length).toBeGreaterThanOrEqual(5);
      expect(c.compliance.items.length).toBeGreaterThanOrEqual(5);
      expect(c.sectors.items.length).toBeGreaterThanOrEqual(4);
      expect(c.faq.items.length).toBeGreaterThanOrEqual(l === 'en' ? 8 : 5);
    }
  });
  it('offset ink export page: manufacturer identity, ink type table, TDS properties, 6-step sample process, 6 FAQs', () => {
    for (const l of LOCALES) {
      const c = OFFSET_INK_EXPORT[l];
      expect(c.types.rows.length).toBeGreaterThanOrEqual(5);
      expect(c.specs.rows.length).toBeGreaterThanOrEqual(5);
      expect(c.process.steps).toHaveLength(6);
      expect(c.faq.items.length).toBeGreaterThanOrEqual(l === 'en' ? 6 : 4);
      expect(c.maker.paragraphs.join(' ')).toMatch(/EVA COLOR/);
    }
  });
  it('RFQ form: client component with country, product group, quantity, incoterm, consent and honeypot, posting to /api/contact', () => {
    const src = read('src/components/forms/RfqForm.tsx');
    expect(src).toMatch(/^'use client'/);
    for (const field of ['country', 'productGroup', 'quantity', 'incoterm', 'consent', '_honey', 'cf-turnstile-response']) expect(src).toContain(field);
    expect(src).toMatch(/fetch\('\/api\/contact'/);
    expect(src).toMatch(/track\('rfq_form_submit'/);
    expect(RFQ_PRODUCT_GROUPS.length).toBeGreaterThanOrEqual(6);
    expect(RFQ_INCOTERMS).toEqual(expect.arrayContaining(['EXW', 'FOB', 'CIF']));
    expect(read('src/app/[locale]/ihracat/page.tsx')).toMatch(/<RfqForm/);
    expect(read('src/app/[locale]/ofset-murekkep-ihracati/page.tsx')).toMatch(/<RfqForm/);
  });
  it('existing EN landing pages link to the export hub', () => {
    expect(read('src/app/[locale]/ofset-baski-malzemeleri/page.tsx')).toMatch(/exportText[\s\S]*?<Link[\s\S]*?href="\/ihracat"/);
    expect(read('src/data/pillar-matbaa-malzemeleri.ts')).toMatch(/path: '\/ihracat'/);
    expect(read('src/data/murekkep-hub.ts')).toMatch(/path: '\/ofset-murekkep-ihracati'/);
  });
});
