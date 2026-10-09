import { describe, it, expect } from 'vitest';
import { formatOpeningHours } from '@/data/organization';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { glossaryJsonLd, glossaryTermAnchor } from '@/lib/schema';
import { glossaryTerms } from '@/data/glossary';
import { parseInlineLinks } from '@/lib/inline-links';
import { localizeInlineLinks } from '@/lib/inline-links-localize';
import { buildLlmsTxt } from '@/lib/llms';
import { ORGANIZATION } from '@/data/organization';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Analytics from '@/components/layout/Analytics';

const root = join(__dirname, '..', '..');

describe('glossary anchors are unique and locale-independent (RU/AR included)', () => {
  it('every term has a non-empty, unique anchor in every locale', () => {
    for (const locale of ['tr', 'en', 'ru', 'ar']) {
      const anchors = glossaryTerms.map((t) => glossaryTermAnchor(t.term, locale));
      expect(anchors.every((a) => /^term-[a-z0-9-]+$/.test(a) && a !== 'term-'), locale).toBe(true);
      expect(new Set(anchors).size, locale).toBe(anchors.length);
    }
  });
  it('the same term shares one anchor across locales', () => {
    const t = glossaryTerms.find((x) => x.term.en === 'CMYK')!;
    expect(glossaryTermAnchor(t.term, 'ru')).toBe(glossaryTermAnchor(t.term, 'en'));
    const g = glossaryJsonLd('ru') as { hasDefinedTerm: Array<{ url: string }> };
    expect(new Set(g.hasDefinedTerm.map((d) => d.url)).size).toBe(glossaryTerms.length);
  });
});

describe('inline links in blog content', () => {
  it('handles URLs with one level of balanced parentheses', () => {
    expect(parseInlineLinks('[Offset](https://en.wikipedia.org/wiki/Offset_(printing)) devam')).toEqual([
      { text: 'Offset', href: 'https://en.wikipedia.org/wiki/Offset_(printing)' },
      { text: ' devam' },
    ]);
  });
  it('localizes internal product and blog paths to the page locale (prefix + slug)', () => {
    expect(localizeInlineLinks('Bkz. [UV](/urunler/zeller-gmelin-uv-offset-murekkepleri) ve [yazı](/blog/pantone-renk-sistemi-rehberi).', 'en')).toBe(
      'Bkz. [UV](/en/products/zeller-gmelin-uv-offset-inks) ve [yazı](/en/blog/pantone-color-system-guide).',
    );
    expect(localizeInlineLinks('[a](/urunler/ozel-renkler)', 'tr')).toBe('[a](/urunler/ozel-renkler)');
    expect(localizeInlineLinks('[s](/matbaa-malzemeleri) [x](https://example.com/a)', 'ru')).toBe(
      '[s](/ru/poligraficheskie-materialy) [x](https://example.com/a)',
    );
  });
});

describe('CSP covers Google tag endpoints', () => {
  it('connect-src allows google.com, doubleclick and googlesyndication (ads/consent beacons)', () => {
    const cfg = readFileSync(join(root, 'next.config.ts'), 'utf8');
    const connect = cfg.match(/"connect-src ([^"]+)"/)?.[1] ?? '';
    for (const host of ['https://www.google.com', 'https://*.g.doubleclick.net', 'https://pagead2.googlesyndication.com']) {
      expect(connect, host).toContain(host);
    }
  });
});

describe('single source for contact facts', () => {
  it('llms.txt formats the phone from ORGANIZATION.telephone', () => {
    const digits = ORGANIZATION.telephone.replace('+90', '');
    const formatted = `+90 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    expect(buildLlmsTxt()).toContain(formatted);
    expect(readFileSync(join(root, 'src/lib/llms.ts'), 'utf8')).not.toMatch(/637 62 49/);
  });
  it('footer address comes from ORGANIZATION', () => {
    expect(readFileSync(join(root, 'src/components/layout/Footer.tsx'), 'utf8')).toMatch(/ORGANIZATION\.address/);
  });
  it('Istanbul page working hours agree with the published opening days', () => {
    const saturday = { tr: 'Cumartesi', en: 'Saturday', ru: 'Суббота', ar: 'السبت' } as Record<string, string>;
    const hasSaturday = ORGANIZATION.openingHours.dayOfWeek.includes('Saturday');
    for (const l of ['tr', 'en', 'ru', 'ar']) {
      const m = JSON.parse(readFileSync(join(root, 'messages', `${l}.json`), 'utf8'));
      // İstanbul sayfası saatleri artık organization.ts'ten türetilir (formatOpeningHours); mesaj alanı kaldırıldı
      expect(formatOpeningHours(l as 'tr' | 'en' | 'ru' | 'ar').includes(saturday[l]), `${l}: ${formatOpeningHours(l as 'tr' | 'en' | 'ru' | 'ar')}`).toBe(hasSaturday);
      expect(m.contact.workingHoursValue.includes(saturday[l]), l).toBe(hasSaturday);
    }
  });
});

describe('Analytics id validation', () => {
  it('ignores malformed container ids instead of interpolating them into inline JS', () => {
    expect(renderToStaticMarkup(createElement(Analytics, { gtmId: "GTM-X'};alert(1);//" }))).toBe('');
    expect(renderToStaticMarkup(createElement(Analytics, { gtmId: 'GTM-ABC1234' }))).toContain('GTM-ABC1234');
  });
});

describe('content-dates script hygiene', () => {
  const src = readFileSync(join(root, 'scripts/generate-content-dates.mjs'), 'utf8');
  it('does not stamp a volatile generatedAt field', () => {
    expect(src).not.toMatch(/generatedAt/);
  });
  it('falls back to the committed file on a shallow clone', () => {
    expect(src).toMatch(/is-shallow-repository/);
  });
});
