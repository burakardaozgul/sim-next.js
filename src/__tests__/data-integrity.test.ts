import { describe, it, expect } from 'vitest';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { locales } from '@/i18n/config';
import { HOME_SERVICE_SLUGS } from '@/data/home-services';

const productSlugs = new Set(products.map((p) => p.slug));

describe('data integrity: every referenced product slug exists', () => {
  it('blog relatedProducts only reference existing products', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      for (const slug of post.relatedProducts ?? []) {
        if (!productSlugs.has(slug)) missing.push(`${post.slug} -> ${slug}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('home page service cards only link to existing products', () => {
    const missing = HOME_SERVICE_SLUGS.filter((s) => !productSlugs.has(s));
    expect(missing).toEqual([]);
  });
});

describe('data integrity: per-locale slugs', () => {
  it('every product and post has a slug for all four locales', () => {
    const missing = [...products, ...blogPosts].flatMap((x) =>
      locales.filter((l) => !x.slugs[l]).map((l) => `${x.slug}:${l}`),
    );
    expect(missing).toEqual([]);
  });
  it('slugs are unique within each locale (no unreachable duplicates)', () => {
    for (const list of [products, blogPosts]) {
      for (const l of locales) {
        const seen = new Map<string, string>();
        for (const x of list) {
          const s = x.slugs[l] || x.slug;
          expect(seen.has(s), `${l}: ${s} used by ${seen.get(s)} and ${x.slug}`).toBe(false);
          seen.set(s, x.slug);
        }
      }
    }
  });
  it('product relatedBlogPosts only reference existing posts', () => {
    const postSlugs = new Set(blogPosts.map((p) => p.slug));
    const missing = products.flatMap((p) => (p.relatedBlogPosts ?? []).filter((s) => !postSlugs.has(s)).map((s) => `${p.slug} -> ${s}`));
    expect(missing).toEqual([]);
  });
});
