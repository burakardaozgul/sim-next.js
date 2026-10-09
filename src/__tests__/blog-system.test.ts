import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { blogPosts, getRelatedPosts, type ContentBlock } from '@/data/blog';
import { parseInlineLinks } from '@/lib/inline-links';

describe('blog ordering', () => {
  it('lists posts newest first', () => {
    for (let i = 1; i < blogPosts.length; i++) {
      expect(blogPosts[i - 1].date >= blogPosts[i].date, `${blogPosts[i - 1].slug} before ${blogPosts[i].slug}`).toBe(true);
    }
  });
});

describe('related posts are topical, not the first two in the array', () => {
  it('returns 3 other posts ranked by shared keywords/products', () => {
    const post = blogPosts.find((p) => p.slug === 'yaldiz-baski-teknikleri-altin-gumus')!;
    const related = getRelatedPosts(post, 3);
    expect(related).toHaveLength(3);
    expect(related.map((p) => p.slug)).not.toContain(post.slug);
    // metallic topics should surface for the gold/silver guide
    expect(related.map((p) => p.slug)).toContain('metalik-murekkep-uretimi');
  });
});

describe('content blocks', () => {
  it('supports table, callout and sources blocks in the type union', () => {
    const blocks: ContentBlock[] = [
      { type: 'table', headers: ['A', 'B'], rows: [['1', '2']] },
      { type: 'callout', title: 'Kısa cevap', text: 'x' },
      { type: 'sources', items: [{ label: 'ISO 12647-2', url: 'https://www.iso.org/standard/57833.html' }] },
    ];
    expect(blocks).toHaveLength(3);
  });

  it('parses markdown-style inline links inside text', () => {
    const parts = parseInlineLinks('Bkz. [ofset mürekkep](/matbaa-murekkepleri) ve [UV](/urunler/zeller-gmelin-uv-offset-murekkepleri).');
    expect(parts).toEqual([
      { text: 'Bkz. ' },
      { text: 'ofset mürekkep', href: '/matbaa-murekkepleri' },
      { text: ' ve ' },
      { text: 'UV', href: '/urunler/zeller-gmelin-uv-offset-murekkepleri' },
      { text: '.' },
    ]);
    expect(parseInlineLinks('düz metin')).toEqual([{ text: 'düz metin' }]);
  });
});

describe('slugs', () => {
  it('has no misspelled "murakkep" slug (should be "murekkep")', () => {
    const bad = blogPosts.flatMap((p) => [p.slug, ...Object.values(p.slugs)]).filter((s) => s.includes('murakkep'));
    expect(bad).toEqual([]);
  });
});

describe('client bundles do not ship the whole blog corpus', () => {
  function walk(dir: string, out: string[] = []): string[] {
    for (const e of readdirSync(dir)) {
      const f = join(dir, e);
      if (statSync(f).isDirectory()) walk(f, out);
      else if (f.endsWith('.tsx')) out.push(f);
    }
    return out;
  }
  it("no 'use client' component imports @/data/blog", () => {
    const src = join(__dirname, '..');
    const offenders = walk(src).filter((f) => {
      const s = readFileSync(f, 'utf8');
      return /^['"]use client['"]/.test(s) && /^import (?!type\b)[^;]*from ['"]@\/data\/blog['"]/m.test(s);
    });
    expect(offenders.map((f) => f.slice(src.length + 1))).toEqual([]);
  });
});
