import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ABOUT_CONTENT, ABOUT_TIMELINE, ABOUT_PEOPLE, ABOUT_CREDENTIALS, ABOUT_IMAGES, aboutWordCount } from '@/data/about';
import { ORGANIZATION, formatThousands, yearsSinceFounding } from '@/data/organization';
import { aboutPageJsonLd, organizationJsonLd, personJsonLd } from '@/lib/schema';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe('about page content (brief G — E-E-A-T)', () => {
  it('TR ≥ 1,000 words, EN ≥ 800, RU/AR ≥ 450', () => {
    expect(aboutWordCount('tr')).toBeGreaterThanOrEqual(1000);
    expect(aboutWordCount('en')).toBeGreaterThanOrEqual(800);
    expect(aboutWordCount('ru')).toBeGreaterThanOrEqual(450);
    expect(aboutWordCount('ar')).toBeGreaterThanOrEqual(450);
  });
  it.each(LOCALES)('%s title ≤ 60 chars and H1 names 1983', (l) => {
    expect(ABOUT_CONTENT[l].meta.title.length).toBeLessThanOrEqual(60);
    expect(ABOUT_CONTENT[l].hero.h1).toMatch(/1983/);
  });
  it.each(['tr', 'en'] as const)('%s description is 140–160 chars', (l) => {
    const d = ABOUT_CONTENT[l].meta.description.length;
    expect(d).toBeGreaterThanOrEqual(140);
    expect(d).toBeLessThanOrEqual(160);
  });
  it('hero lead is the single-source positioning sentence (TR/EN)', () => {
    expect(ABOUT_CONTENT.tr.hero.lead).toBe(ORGANIZATION.positioning.tr);
    expect(ABOUT_CONTENT.en.hero.lead).toBe(ORGANIZATION.positioning.en);
  });
  it('timeline keeps the company\'s own milestones in order and in four languages', () => {
    const years = ABOUT_TIMELINE.map((t) => t.year);
    expect(years[0]).toBe('1983');
    expect(years).toEqual(expect.arrayContaining(['1998', '2002']));
    const numeric = years.filter((y) => /^\d{4}$/.test(y)).map(Number);
    expect([...numeric].sort((a, b) => a - b)).toEqual(numeric);
    expect(ABOUT_TIMELINE.length).toBeGreaterThanOrEqual(6);
    for (const t of ABOUT_TIMELINE) for (const l of LOCALES) expect(words(t.text[l])).toBeGreaterThanOrEqual(6);
  });
  it('numbers come from organization.ts facts (capacity, years, brand counts)', () => {
    const tr = ABOUT_CONTENT.tr;
    const values = tr.numbers.items.map((i) => i.value).join(' ');
    expect(values).toContain(`${formatThousands(ORGANIZATION.facts.customColorCapacityKgPerMonth, 'tr')} kg`);
    expect(values).toContain(String(yearsSinceFounding()));
    const own = ORGANIZATION.brands.filter((b) => b.role === 'own').length;
    const dist = ORGANIZATION.brands.filter((b) => b.role === 'distributor').length;
    expect(tr.numbers.items.map((i) => i.value)).toEqual(expect.arrayContaining([String(own), String(dist)]));
    expect(values).not.toMatch(/\b7 (uluslararası|marka)/i);
  });
  it.each(LOCALES)('%s has 3 activity pillars, ≥ 5 standards, 5 FAQs, mission/vision/values', (l) => {
    const c = ABOUT_CONTENT[l];
    expect(c.activities.items).toHaveLength(3);
    expect(c.standards.items.length).toBeGreaterThanOrEqual(5);
    expect(c.faq.items).toHaveLength(5);
    expect(c.mission.text).toBeTruthy();
    expect(c.vision.text).toBeTruthy();
    expect(c.values.items.length).toBeGreaterThanOrEqual(4);
  });
  it('people and credentials are typed placeholders: empty hides the section, filled entries are complete', () => {
    expect(Array.isArray(ABOUT_PEOPLE)).toBe(true);
    expect(Array.isArray(ABOUT_CREDENTIALS)).toBe(true);
    for (const p of ABOUT_PEOPLE) {
      expect(p.name).toBeTruthy();
      for (const l of LOCALES) expect(p.jobTitle[l]).toBeTruthy();
    }
    for (const c of ABOUT_CREDENTIALS) for (const l of LOCALES) expect(c.name[l]).toBeTruthy();
  });
  it('images exist and carry alt text in four languages', () => {
    expect(ABOUT_IMAGES.length).toBeGreaterThanOrEqual(3);
    for (const img of ABOUT_IMAGES) {
      expect(existsSync(join(root, 'public', img.src))).toBe(true);
      for (const l of LOCALES) expect(words(img.alt[l])).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('about page — schema and rendering', () => {
  it('aboutPageJsonLd points to the organization entity', () => {
    const s = aboutPageJsonLd('en', { name: 'About', description: 'd' });
    expect(s['@type']).toBe('AboutPage');
    expect(s['@id']).toBe('https://www.simlimited.net/en/about');
    expect(s.mainEntity).toEqual({ '@id': ORGANIZATION.id });
    expect(s.isPartOf).toEqual({ '@id': ORGANIZATION.websiteId });
  });
  it('organizationJsonLd is enriched for E-E-A-T (own brands, knowsAbout, founding place)', () => {
    const o = organizationJsonLd('tr') as Record<string, unknown>;
    const brand = o.brand as { '@type': string; name: string }[];
    expect(brand.map((b) => b.name)).toEqual(['EVA COLOR', 'VECTOR']);
    expect((o.knowsAbout as string[]).length).toBeGreaterThanOrEqual(5);
    expect(o.foundingLocation).toMatchObject({ '@type': 'Place' });
    expect(o.foundingDate).toBe('1983');
  });
  it('personJsonLd builds a Person that works for the organization', () => {
    const p = personJsonLd({ name: 'Ad Soyad', jobTitle: { tr: 'Laboratuvar Sorumlusu', en: 'Lab Manager', ru: 'x', ar: 'y' }, bio: { tr: '', en: '', ru: '', ar: '' }, linkedin: 'https://www.linkedin.com/in/x' }, 'en');
    expect(p).toMatchObject({ '@type': 'Person', name: 'Ad Soyad', jobTitle: 'Lab Manager', worksFor: { '@id': ORGANIZATION.id }, sameAs: ['https://www.linkedin.com/in/x'] });
  });
  it('about page is server-rendered from the data module (no client tabs, no aboutPage messages)', () => {
    const page = read('src/app/[locale]/hakkimizda/page.tsx');
    expect(page).toMatch(/@\/data\/about/);
    expect(page).not.toMatch(/AboutPageClient/);
    expect(existsSync(join(root, 'src/app/[locale]/hakkimizda/AboutPageClient.tsx'))).toBe(false);
    for (const l of LOCALES) expect(JSON.parse(read(`messages/${l}.json`)).aboutPage).toBeUndefined();
  });
  it('blog template shows an author box linking to the about page and a "ask our technical team" CTA', () => {
    const src = read('src/app/[locale]/blog/[slug]/BlogPostClient.tsx');
    expect(src).toMatch(/authorBox/);
    expect(src).toMatch(/href="\/hakkimizda"/);
    for (const l of LOCALES) {
      const blog = JSON.parse(read(`messages/${l}.json`)).blog as Record<string, string>;
      expect(blog.authorBoxText).toBeTruthy();
      expect(blog.authorBoxCta).toBeTruthy();
      expect(blog.authorBoxAbout).toBeTruthy();
    }
  });
  it('pillar timeline matches the company history (1983 paper/board, 1998 offset focus)', () => {
    const pillar = read('src/data/pillar-matbaa-malzemeleri.ts');
    expect(pillar).toMatch(/kâğıt, karton/);
    expect(pillar).toMatch(/year: '1998'/);
  });
});
