import { describe, it, expect } from 'vitest';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
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
