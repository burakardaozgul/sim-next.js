import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  PILLAR_CONTENT,
  PILLAR_CATEGORIES,
  PILLAR_IMAGES,
  PILLAR_RELATED_POSTS,
  PILLAR_RELATED_LINKS,
  pillarWordCount,
  pillarText,
} from '@/data/pillar-matbaa-malzemeleri';
import { routing } from '@/i18n/routing';
import { getProductBySlug } from '@/data/products';
import { getBlogPostBySlug } from '@/data/blog';
import { ORGANIZATION, yearsSinceFounding } from '@/data/organization';

const root = join(__dirname, '..', '..');
const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe('pillar /matbaa-malzemeleri — content volume (brief A)', () => {
  it('TR body is 2,500–3,800 words', () => {
    const n = pillarWordCount('tr');
    expect(n).toBeGreaterThanOrEqual(2500);
    expect(n).toBeLessThanOrEqual(3800);
  });
  it('EN body is export-grade (≥ 1,800 words)', () => {
    expect(pillarWordCount('en')).toBeGreaterThanOrEqual(1800);
  });
  it.each(['ru', 'ar'] as const)('%s body is complete, not a stub (≥ 1,000 words)', (l) => {
    expect(pillarWordCount(l)).toBeGreaterThanOrEqual(1000);
  });
  it('TR keyword density for "matbaa malzeme*" stays natural (≤ 1.5%)', () => {
    const text = pillarText('tr');
    const hits = (text.match(/matbaa malzeme/gi) || []).length;
    expect(hits / words(text)).toBeLessThanOrEqual(0.015);
    expect(hits).toBeGreaterThanOrEqual(10);
  });
});

describe('pillar — head and hero', () => {
  it.each(LOCALES)('%s title ≤ 60 chars before the brand suffix', (l) => {
    expect(PILLAR_CONTENT[l].meta.title.length).toBeLessThanOrEqual(60);
  });
  it.each(['tr', 'en'] as const)('%s description is 140–160 chars', (l) => {
    const d = PILLAR_CONTENT[l].meta.description.length;
    expect(d).toBeGreaterThanOrEqual(140);
    expect(d).toBeLessThanOrEqual(160);
  });
  it('TR H1 names the keyword and the founding year', () => {
    expect(PILLAR_CONTENT.tr.hero.h1).toMatch(/Matbaa Malzemeleri/);
    expect(PILLAR_CONTENT.tr.hero.h1).toMatch(/1983/);
  });
  it('TR short answer is 40–70 words', () => {
    const n = words(PILLAR_CONTENT.tr.shortAnswer.text);
    expect(n).toBeGreaterThanOrEqual(40);
    expect(n).toBeLessThanOrEqual(70);
  });
  it.each(LOCALES)('%s key-facts table has 5–8 rows', (l) => {
    const rows = PILLAR_CONTENT[l].keyFacts.rows.length;
    expect(rows).toBeGreaterThanOrEqual(5);
    expect(rows).toBeLessThanOrEqual(8);
  });
});

describe('pillar — eight categories', () => {
  it('has exactly 8 categories with unique keys', () => {
    expect(PILLAR_CATEGORIES).toHaveLength(8);
    expect(new Set(PILLAR_CATEGORIES.map((c) => c.key)).size).toBe(8);
  });
  it.each(PILLAR_CATEGORIES.map((c) => [c.key, c] as const))('%s links to an existing target', (_k, c) => {
    if (c.target.type === 'product') expect(getProductBySlug(c.target.slug)).toBeDefined();
    else if (c.target.type === 'blog') expect(getBlogPostBySlug(c.target.slug)).toBeDefined();
    else expect(c.target.path in routing.pathnames).toBe(true);
  });
  it.each(PILLAR_CATEGORIES.map((c) => [c.key, c] as const))('%s TR body is 150–280 words and EN ≥ 90', (_k, c) => {
    const tr = words(c.body.tr.join(' ') + ' ' + c.whenToUse.tr);
    expect(tr).toBeGreaterThanOrEqual(150);
    expect(tr).toBeLessThanOrEqual(280);
    expect(words(c.body.en.join(' '))).toBeGreaterThanOrEqual(90);
  });
  it('category brands come from the single-source brand matrix; at least 6 of 8 groups name a brand', () => {
    const names = ORGANIZATION.brands.map((b) => b.name);
    for (const c of PILLAR_CATEGORIES) for (const b of c.brands) expect(names).toContain(b);
    expect(PILLAR_CATEGORIES.filter((c) => c.brands.length > 0).length).toBeGreaterThanOrEqual(6);
  });
  it.each(LOCALES)('%s category names and summaries exist', (l) => {
    for (const c of PILLAR_CATEGORIES) {
      expect(c.name[l]).toBeTruthy();
      expect(c.summary[l]).toBeTruthy();
      expect(c.body[l].length).toBeGreaterThan(0);
    }
  });
});

describe('pillar — decision content', () => {
  it.each(LOCALES)('%s has 7 selection criteria, 6 price factors, ≥ 6 paper rows', (l) => {
    const c = PILLAR_CONTENT[l];
    expect(c.criteria.rows).toHaveLength(7);
    expect(c.price.factors).toHaveLength(6);
    expect(c.paper.rows.length).toBeGreaterThanOrEqual(6);
  });
  it.each(LOCALES)('%s brand table covers every brand in organization.ts', (l) => {
    const rows = PILLAR_CONTENT[l].brandRows;
    for (const b of ORGANIZATION.brands) {
      expect(rows[b.name]).toBeDefined();
      expect(rows[b.name].products).toBeTruthy();
      expect(rows[b.name].role).toBeTruthy();
    }
  });
  it('TR and EN have exactly 10 FAQs; RU/AR at least 6; answers are substantive', () => {
    expect(PILLAR_CONTENT.tr.faq.items).toHaveLength(10);
    expect(PILLAR_CONTENT.en.faq.items).toHaveLength(10);
    expect(PILLAR_CONTENT.ru.faq.items.length).toBeGreaterThanOrEqual(6);
    expect(PILLAR_CONTENT.ar.faq.items.length).toBeGreaterThanOrEqual(6);
    for (const l of ['tr', 'en'] as const) for (const f of PILLAR_CONTENT[l].faq.items) expect(words(f.a)).toBeGreaterThanOrEqual(25);
  });
  it('"why since 1983" box uses single-source facts, not hard-coded years', () => {
    expect(ORGANIZATION.facts.customColorCapacityKgPerMonth).toBe(15000);
    expect(yearsSinceFounding()).toBeGreaterThanOrEqual(43);
    const tr = pillarText('tr');
    expect(tr).toContain(`${yearsSinceFounding()} yıl`);
    expect(tr).not.toMatch(/\b40\+? yıl/);
    expect(tr).toContain('15.000 kg');
    expect(PILLAR_CONTENT.tr.why.facts.length).toBeGreaterThanOrEqual(5);
  });
});

describe('pillar — links and images', () => {
  it('links six existing blog posts and the offset pillar, Istanbul page and glossary', () => {
    expect(PILLAR_RELATED_POSTS).toHaveLength(6);
    for (const s of PILLAR_RELATED_POSTS) expect(getBlogPostBySlug(s)).toBeDefined();
    const paths = PILLAR_RELATED_LINKS.map((l) => l.path);
    expect(paths).toEqual(expect.arrayContaining(['/ofset-baski-malzemeleri', '/matbaa-malzemeleri-istanbul', '/matbaa-terimleri-sozlugu']));
    for (const p of paths) expect(p in routing.pathnames).toBe(true);
  });
  it('uses 6–10 real photos with descriptive file names and alt text in four languages', () => {
    expect(PILLAR_IMAGES.length).toBeGreaterThanOrEqual(6);
    expect(PILLAR_IMAGES.length).toBeLessThanOrEqual(10);
    for (const img of PILLAR_IMAGES) {
      expect(existsSync(join(root, 'public', img.src))).toBe(true);
      expect(img.src).toMatch(/^\/images\/matbaa-malzemeleri\/[a-z0-9-]+\.webp$/);
      expect(img.src).not.toMatch(/HIP|DSC|IMG/i);
      for (const l of LOCALES) expect(words(img.alt[l])).toBeGreaterThanOrEqual(3);
    }
  });
  it('every category has a photo', () => {
    for (const c of PILLAR_CATEGORIES) expect(PILLAR_IMAGES.map((i) => i.src)).toContain(c.image);
  });
});
