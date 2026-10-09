import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { products, resolveProductForLocale, getProductSlugsForLocale } from '@/data/products';
import { blogPosts, resolveBlogPostForLocale, getBlogSlugsForLocale } from '@/data/blog';
import { localizedProductPath, localizedBlogPath } from '@/lib/paths';

describe('product slug resolution per locale', () => {
  it('resolves a slug that belongs to the requested locale', () => {
    const r = resolveProductForLocale('sakata-inx-cmyk-inks', 'en');
    expect(r.product?.slug).toBe('sakata-inx-cmyk-murekkepler');
    expect(r.redirectSlug).toBeUndefined();
  });

  it('asks for a redirect when the slug belongs to another locale', () => {
    const r = resolveProductForLocale('sakata-inx-cmyk-murekkepler', 'en');
    expect(r.product).toBeUndefined();
    expect(r.redirectSlug).toBe('sakata-inx-cmyk-inks');
  });

  it('returns nothing for an unknown slug', () => {
    const r = resolveProductForLocale('bilinmeyen-urun', 'tr');
    expect(r.product).toBeUndefined();
    expect(r.redirectSlug).toBeUndefined();
  });

  it('static params only contain the locale-own slugs', () => {
    expect(getProductSlugsForLocale('en')).toHaveLength(products.length);
    expect(getProductSlugsForLocale('en')).toContain('sakata-inx-cmyk-inks');
    expect(getProductSlugsForLocale('en')).not.toContain('sakata-inx-cmyk-murekkepler');
  });
});

describe('blog slug resolution per locale', () => {
  it('redirects a TR slug requested under /en to the EN slug', () => {
    const r = resolveBlogPostForLocale('pantone-renk-sistemi-rehberi', 'en');
    expect(r.post).toBeUndefined();
    expect(r.redirectSlug).toBe('pantone-color-system-guide');
  });

  it('redirects an EN slug requested under TR to the TR slug', () => {
    const r = resolveBlogPostForLocale('pantone-color-system-guide', 'tr');
    expect(r.redirectSlug).toBe('pantone-renk-sistemi-rehberi');
  });

  it('static params only contain the locale-own slugs', () => {
    expect(getBlogSlugsForLocale('tr')).toHaveLength(blogPosts.length);
    expect(getBlogSlugsForLocale('tr')).not.toContain('pantone-color-system-guide');
  });
});

describe('localized paths for internal links', () => {
  it('builds the product path with the locale-specific slug and prefix', () => {
    expect(localizedProductPath('sakata-inx-cmyk-murekkepler', 'tr')).toBe('/urunler/sakata-inx-cmyk-murekkepler');
    expect(localizedProductPath('sakata-inx-cmyk-murekkepler', 'en')).toBe('/en/products/sakata-inx-cmyk-inks');
    expect(localizedProductPath('sakata-inx-cmyk-murekkepler', 'ru')).toBe('/ru/produkty/sakata-inx-cmyk-kraski');
  });

  it('builds the blog path with the locale-specific slug', () => {
    expect(localizedBlogPath('pantone-renk-sistemi-rehberi', 'en')).toBe('/en/blog/pantone-color-system-guide');
    expect(localizedBlogPath('pantone-renk-sistemi-rehberi', 'tr')).toBe('/blog/pantone-renk-sistemi-rehberi');
  });
});

describe('branded 404 handling', () => {
  const app = join(__dirname, '..', 'app');
  it('has a root not-found page for unknown top-level URLs', () => {
    expect(existsSync(join(app, 'not-found.tsx'))).toBe(true);
  });
  it('has a catch-all under [locale] so unknown localized URLs render the branded 404', () => {
    expect(existsSync(join(app, '[locale]', '[...rest]', 'page.tsx'))).toBe(true);
  });
});
