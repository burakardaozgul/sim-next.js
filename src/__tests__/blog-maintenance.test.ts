import { describe, it, expect } from 'vitest';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { getProductBySlug } from '@/data/products';
import { routing } from '@/i18n/routing';

const LOCALES = ['tr', 'en', 'ru', 'ar'] as const;
const text = (post: (typeof blogPosts)[number], l: string) => (post.content[l] || []).map((b) => b.text || '').join(' ');
const links = (s: string) => [...s.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);

describe('blog maintenance (brief E1): structured FAQs, contextual links, Pantone snippet', () => {
  it.each(blogPosts.map((p) => [p.slug, p] as const))('%s has ≥ 3 structured FAQs in four languages', (_s, post) => {
    expect(post.faq?.length ?? 0).toBeGreaterThanOrEqual(3);
    for (const f of post.faq!) for (const l of LOCALES) {
      expect(f.q[l]?.length ?? 0).toBeGreaterThan(8);
      expect(f.a[l]?.length ?? 0).toBeGreaterThan(40);
    }
  });
  it.each(blogPosts.map((p) => [p.slug, p] as const))('%s carries ≥ 3 contextual internal links in TR and EN, all resolvable', (_s, post) => {
    for (const l of ['tr', 'en'] as const) {
      const ls = links(text(post, l));
      expect(ls.length).toBeGreaterThanOrEqual(3);
      expect(ls).toContain('/matbaa-malzemeleri');
      for (const href of ls) {
        const product = href.match(/^\/urunler\/([^/]+)$/);
        const blog = href.match(/^\/blog\/([^/]+)$/);
        if (product) expect(getProductBySlug(product[1]), href).toBeDefined();
        else if (blog) expect(getBlogPostBySlug(blog[1]), href).toBeDefined();
        else expect(href in routing.pathnames, href).toBe(true);
      }
    }
  });
  it('Pantone post targets "pantone ne demek": title ≤ 60 chars, short answer, colour-code section, updated date, ΔE aligned', () => {
    const post = getBlogPostBySlug('pantone-renk-sistemi-rehberi')!;
    expect(post.title.tr).toMatch(/Pantone Ne Demek/i);
    expect(post.title.tr.length).toBeLessThanOrEqual(60);
    expect(post.keywords).toEqual(expect.arrayContaining(['pantone ne demek', 'pantone renk kodları']));
    const tr = post.content.tr;
    const calloutIdx = tr.findIndex((b) => b.type === 'callout' && /kısa cevap/i.test(b.title || ''));
    expect(calloutIdx).toBeGreaterThanOrEqual(0);
    expect(calloutIdx).toBeLessThanOrEqual(1);
    expect(tr.some((b) => b.type === 'heading' && /renk kodları/i.test(b.text || ''))).toBe(true);
    const en = post.content.en;
    expect(en.some((b) => b.type === 'callout' && /short answer/i.test(b.title || ''))).toBe(true);
    expect(en.some((b) => b.type === 'heading' && /colou?r codes/i.test(b.text || ''))).toBe(true);
    expect(post.updated).toBeDefined();
    expect(post.updated! >= '2026-10-09').toBe(true);
    expect(text(post, 'tr')).not.toMatch(/Delta E < 1\b(?![,.]5)/);
  });
});
