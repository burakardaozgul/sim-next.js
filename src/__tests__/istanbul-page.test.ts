import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ISTANBUL_CONTENT, istanbulWordCount, istanbulDistrictRows, ISTANBUL_MAP_EMBED } from '@/data/istanbul';
import { ORGANIZATION, formatOpeningHours, formatAddress, formatTelephone } from '@/data/organization';
import { localBusinessJsonLd } from '@/lib/schema';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe('Istanbul local page (brief F) — local intent, single-source NAP, service areas', () => {
  it('TR ≥ 1,200 words, EN ≥ 900, RU/AR ≥ 500', () => {
    expect(istanbulWordCount('tr')).toBeGreaterThanOrEqual(1200);
    expect(istanbulWordCount('en')).toBeGreaterThanOrEqual(900);
    expect(istanbulWordCount('ru')).toBeGreaterThanOrEqual(500);
    expect(istanbulWordCount('ar')).toBeGreaterThanOrEqual(500);
  });
  it('title and H1 carry the local intent (İstanbul + Beylikdüzü + same-day), title ≤ 60', () => {
    const c = ISTANBUL_CONTENT.tr;
    expect(c.meta.title.length).toBeLessThanOrEqual(60);
    expect(c.meta.title).toMatch(/İstanbul/);
    expect(c.meta.title).toMatch(/Beylikdüzü/);
    expect(c.hero.h1).toMatch(/İstanbul/);
    expect(c.hero.h1).toMatch(/Aynı Gün/i);
    expect(ISTANBUL_CONTENT.en.hero.h1).toMatch(/Istanbul/);
    expect(ISTANBUL_CONTENT.en.hero.h1).toMatch(/same-day/i);
  });
  it('leaves the generic keyword to the pillar: "matbaa malzemeleri" density ≤ 1.5%, "İstanbul" ≥ 15 mentions', () => {
    const t = istanbulWordCount('tr');
    const all = JSON.stringify(ISTANBUL_CONTENT.tr);
    expect((all.match(/matbaa malzemeleri/gi) || []).length / t).toBeLessThanOrEqual(0.015);
    expect((all.match(/İstanbul/g) || []).length).toBeGreaterThanOrEqual(15);
  });
  it('service areas come from organization.ts (≥ 10 European + ≥ 6 Asian districts) and feed the delivery table and LocalBusiness.areaServed', () => {
    const eu = ORGANIZATION.serviceAreas.filter((d) => d.side === 'europe');
    const asia = ORGANIZATION.serviceAreas.filter((d) => d.side === 'asia');
    expect(eu.length).toBeGreaterThanOrEqual(10);
    expect(asia.length).toBeGreaterThanOrEqual(6);
    const rows = istanbulDistrictRows('tr');
    expect(rows).toHaveLength(ORGANIZATION.serviceAreas.length);
    for (const r of rows) expect(r.delivery).toBeTruthy();
    const lb = localBusinessJsonLd('tr') as { areaServed: { name: string }[] };
    for (const d of ORGANIZATION.serviceAreas) expect(lb.areaServed.map((a) => a.name)).toContain(d.name);
  });
  it('NAP on the page is derived from organization.ts (hours, address, phone)', () => {
    const c = ISTANBUL_CONTENT.tr;
    expect(c.location.hours).toBe(formatOpeningHours('tr'));
    expect(c.location.address).toBe(formatAddress());
    expect(c.location.phone).toBe(formatTelephone());
    expect(formatOpeningHours('tr')).toMatch(/Pazartesi.*Cumartesi.*08:30.*18:00/);
    expect(formatOpeningHours('en')).toMatch(/Monday.*Saturday.*08:30.*18:00/);
  });
  it.each(LOCALES)('%s has ≥ 5 FAQs, a transport section, a pickup section and ≥ 4 reasons', (l) => {
    const c = ISTANBUL_CONTENT[l];
    expect(c.faq.items.length).toBeGreaterThanOrEqual(5);
    expect(words(c.transport.text)).toBeGreaterThanOrEqual(30);
    expect(words(c.pickup.text)).toBeGreaterThanOrEqual(25);
    expect(c.why.items.length).toBeGreaterThanOrEqual(4);
    expect(c.districts.headers).toHaveLength(3);
  });
  it('page is server-rendered from the module with an embedded, lazy map and no istanbulSeo messages', () => {
    const page = read('src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx');
    expect(page).toMatch(/@\/data\/istanbul/);
    expect(page).toMatch(/<iframe[\s\S]*?loading="lazy"/);
    expect(ISTANBUL_MAP_EMBED).toMatch(/google\.com\/maps/);
    expect(page).toMatch(/faqPageJsonLd/);
    expect(page).not.toMatch(/istanbulSeo/);
    for (const l of LOCALES) expect(JSON.parse(read(`messages/${l}.json`)).istanbulSeo).toBeUndefined();
  });
});
