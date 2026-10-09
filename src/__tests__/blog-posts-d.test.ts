import { describe, it, expect } from 'vitest';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { getProductBySlug } from '@/data/products';

const D_SLUGS = [
  'ofset-murekkep-fiyatlari-2026',
  'metalik-yaldiz-murekkep-secimi',
  'uv-ofset-mi-led-uv-mi',
  'baski-blanketi-secimi-kompresibl-konvansiyonel',
  'matbaa-kimyasallari-satin-alma-rehberi',
  'turkiyeden-matbaa-malzemesi-ihracati-tedarik-sureci',
];
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const text = (post: (typeof blogPosts)[number], l: string) =>
  (post.content[l] || []).map((b) => [b.title, b.text, ...(b.headers || []), ...(b.rows || []).flat(), ...(b.items || []).map((i) => i.label)].filter(Boolean).join(' ')).join(' ');

describe('brief D: six new commercial-intent posts (#15–20)', () => {
  it.each(D_SLUGS)('%s exists, dated 2026-10, with slugs in four locales', (slug) => {
    const post = getBlogPostBySlug(slug)!;
    expect(post).toBeDefined();
    expect(post.date >= '2026-10-01').toBe(true);
    for (const l of ['tr', 'en', 'ru', 'ar']) expect(post.slugs[l]).toBeTruthy();
    expect(post.author).toBe('SIM Teknik Ekip');
  });
  it.each(D_SLUGS)('%s: TR ≥ 1,500 words, EN ≥ 1,100, short answer, 2 tables, sources block, 3 FAQs', (slug) => {
    const post = getBlogPostBySlug(slug)!;
    expect(words(text(post, 'tr'))).toBeGreaterThanOrEqual(1500);
    expect(words(text(post, 'en'))).toBeGreaterThanOrEqual(1100);
    expect(words(text(post, 'ru'))).toBeGreaterThanOrEqual(80);
    expect(words(text(post, 'ar'))).toBeGreaterThanOrEqual(80);
    expect(post.content.tr.some((b) => b.type === 'callout' && /kısa cevap/i.test(b.title || ''))).toBe(true);
    expect(post.content.tr.filter((b) => b.type === 'table').length).toBeGreaterThanOrEqual(2);
    expect(post.content.en.filter((b) => b.type === 'table').length).toBeGreaterThanOrEqual(2);
    expect(post.content.tr.some((b) => b.type === 'sources' && (b.items?.length ?? 0) >= 2)).toBe(true);
    expect(post.faq).toHaveLength(3);
  });
  it.each(D_SLUGS)('%s: ≥ 3 product links, a pillar or hub link, and related products that exist', (slug) => {
    const post = getBlogPostBySlug(slug)!;
    const tr = text(post, 'tr');
    const productLinks = [...tr.matchAll(/\]\(\/urunler\/([^)]+)\)/g)].map((m) => m[1]);
    expect(new Set(productLinks).size).toBeGreaterThanOrEqual(3);
    for (const s of productLinks) expect(getProductBySlug(s), s).toBeDefined();
    expect(tr).toMatch(/\]\(\/(matbaa-malzemeleri|matbaa-murekkepleri|ihracat|ofset-murekkep-ihracati)\)/);
    for (const rp of post.relatedProducts ?? []) expect(getProductBySlug(rp), rp).toBeDefined();
    expect(post.relatedProducts?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
  it('blog has 31 posts and the D posts sort to the top', () => {
    expect(blogPosts.length).toBe(31);
    expect(D_SLUGS).toContain(blogPosts[0].slug);
  });
});
