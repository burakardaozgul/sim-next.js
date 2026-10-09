import { describe, it, expect } from 'vitest';
import { localeSwitchHref } from '@/lib/locale-switch';

const sakata = {
  tr: 'sakata-inx-cmyk-murekkepler',
  en: 'sakata-inx-cmyk-inks',
  ru: 'sakata-inx-cmyk-kraski',
  ar: 'sakata-inx-cmyk-inks',
};

describe('language switcher hrefs (built from the internal pathname)', () => {
  it('maps a product page to the target locale base path and slug', () => {
    expect(localeSwitchHref('/urunler/sakata-inx-cmyk-inks', 'ru', 'sakata-inx-cmyk-inks', sakata)).toBe(
      '/ru/produkty/sakata-inx-cmyk-kraski',
    );
    expect(localeSwitchHref('/urunler/sakata-inx-cmyk-inks', 'tr', 'sakata-inx-cmyk-inks', sakata)).toBe(
      '/urunler/sakata-inx-cmyk-murekkepler',
    );
    expect(localeSwitchHref('/urunler/sakata-inx-cmyk-murekkepler', 'ar', 'sakata-inx-cmyk-murekkepler', sakata)).toBe(
      '/ar/products/sakata-inx-cmyk-inks',
    );
  });

  it('keeps the current slug when no slug map is available (server redirects to the right slug)', () => {
    expect(localeSwitchHref('/blog/pantone-renk-sistemi-rehberi', 'en', 'pantone-renk-sistemi-rehberi', null)).toBe(
      '/en/blog/pantone-renk-sistemi-rehberi',
    );
  });

  it('translates static pages and never prefixes the default locale', () => {
    expect(localeSwitchHref('/hakkimizda', 'en')).toBe('/en/about');
    expect(localeSwitchHref('/hakkimizda', 'tr')).toBe('/hakkimizda');
    expect(localeSwitchHref('/', 'ar')).toBe('/ar');
    expect(localeSwitchHref('/', 'tr')).toBe('/');
    expect(localeSwitchHref('/matbaa-terimleri-sozlugu', 'ru')).toBe('/ru/glossarij-poligrafii');
  });
});
