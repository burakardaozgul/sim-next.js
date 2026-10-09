import { describe, it, expect } from 'vitest';
import { blogPosts } from '@/data/blog';
import { isIndexableLocale, buildBlogPostMetadata } from '@/lib/blog-utils';
import { GET as sitemapGET } from '@/app/sitemap.xml/route';
import { buildLlmsTxt, buildLlmsFullTxt } from '@/lib/llms';

const post = blogPosts.find((p) => p.slug === 'pantone-renk-sistemi-rehberi')!;

describe('RU/AR blog summaries are support-language pages (08 §2): noindex, no hreflang, no sitemap', () => {
  it('TR and EN are always indexable; RU/AR only when the post lists them in fullLocales', () => {
    expect(isIndexableLocale(post, 'tr')).toBe(true);
    expect(isIndexableLocale(post, 'en')).toBe(true);
    expect(isIndexableLocale(post, 'ru')).toBe(false);
    expect(isIndexableLocale({ ...post, fullLocales: ['ru'] }, 'ru')).toBe(true);
    expect(isIndexableLocale({ ...post, fullLocales: ['ru'] }, 'ar')).toBe(false);
  });
  it('RU post metadata is noindex,follow and its hreflang set excludes ru/ar', () => {
    const md = buildBlogPostMetadata(post, 'ru');
    expect(md.robots).toMatchObject({ index: false, follow: true });
    const langs = Object.keys((md.alternates?.languages as Record<string, string>) || {});
    expect(langs).toEqual(expect.arrayContaining(['tr', 'en']));
    expect(langs).not.toContain('ru');
    expect(langs).not.toContain('ar');
  });
  it('TR post metadata stays indexable and lists only indexable alternates', () => {
    const md = buildBlogPostMetadata(post, 'tr');
    expect(md.robots).toBeUndefined();
    const langs = Object.keys((md.alternates?.languages as Record<string, string>) || {});
    expect(langs).not.toContain('ru');
    expect(langs).toContain('en');
  });
  it('sitemap contains no RU/AR blog URLs while no post is fully translated', async () => {
    const xml = await (await sitemapGET()).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.filter((u) => /\/(ru|ar)\/blog\//.test(u))).toHaveLength(0);
    expect(locs.filter((u) => /\/en\/blog\//.test(u)).length).toBe(blogPosts.length);
    expect(locs).toHaveLength(188 - 2 * blogPosts.length);
  });
  it('llms.txt / llms-full.txt do not advertise RU/AR blog URLs', () => {
    for (const txt of [buildLlmsTxt(), buildLlmsFullTxt()]) expect(txt).not.toMatch(/\/(ru|ar)\/blog\//);
  });
});
