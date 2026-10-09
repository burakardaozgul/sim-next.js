import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');
const msgs = (l: string) => JSON.parse(read(`messages/${l}.json`)) as Record<string, Record<string, unknown>>;
const LOCALES = ['tr', 'en', 'ru', 'ar'];

describe('inbound links to the pillar (brief A — link flow)', () => {
  it('blog post template shows a "Matbaa Malzemeleri Rehberi" block linking to the pillar', () => {
    const src = read('src/app/[locale]/blog/[slug]/BlogPostClient.tsx');
    expect(src).toMatch(/pillarGuide/);
    expect(src).toMatch(/href="\/matbaa-malzemeleri"/);
    for (const l of LOCALES) {
      const blog = msgs(l).blog as Record<string, string>;
      expect(blog.pillarGuideTitle).toBeTruthy();
      expect(blog.pillarGuideText).toBeTruthy();
      expect(blog.pillarGuideCta).toBeTruthy();
    }
  });
  it('at least five TR posts link the keyword contextually to the pillar', () => {
    const n = (read('src/data/blog.ts').match(/\]\(\/matbaa-malzemeleri\)/g) || []).length;
    expect(n).toBeGreaterThanOrEqual(5);
  });
  it('Istanbul page intro links to the pillar in every locale', () => {
    const src = read('src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx');
    expect(src).toMatch(/introPillar/);
    for (const l of LOCALES) {
      const ns = msgs(l).istanbulSeo as Record<string, string>;
      expect(ns.introPillarText).toBeTruthy();
      expect(ns.introPillarLink).toBeTruthy();
    }
  });
  it('offset pillar intro links to the main pillar', () => {
    const src = read('src/app/[locale]/ofset-baski-malzemeleri/page.tsx');
    expect((src.match(/introPillarLabel: '/g) || []).length).toBe(4);
    expect(src).toMatch(/href="\/matbaa-malzemeleri"[\s\S]{0,400}introPillarLabel/);
  });
  it('home services section links to the pillar guide', () => {
    const src = read('src/components/home/ServicesSection.tsx');
    expect(src).toMatch(/href="\/matbaa-malzemeleri"/);
    for (const l of LOCALES) expect((msgs(l).services as Record<string, string>).guideLink).toBeTruthy();
  });
  it('legacy matbaaMalzemeleri message namespace is gone (content lives in the data module)', () => {
    for (const l of LOCALES) expect(msgs(l).matbaaMalzemeleri).toBeUndefined();
  });
  it('inline-link renderer is shared (no private copy in the blog template)', () => {
    expect(read('src/app/[locale]/blog/[slug]/BlogPostClient.tsx')).not.toMatch(/function InlineText/);
    expect(read('src/components/ui/InlineText.tsx')).toMatch(/parseInlineLinks/);
  });
});
