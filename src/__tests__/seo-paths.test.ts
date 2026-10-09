import { describe, it, expect } from 'vitest';
import { translatePath, getCanonicalUrl, getAlternateLanguages } from '@/lib/seo';

describe('path translation (single source: routing.pathnames)', () => {
  it('translates static paths per locale', () => {
    expect(translatePath('/sss', 'ru')).toBe('/voprosy');
    expect(translatePath('/matbaa-malzemeleri', 'ar')).toBe('/mawad-altibaa');
    expect(translatePath('/blog', 'en')).toBe('/blog');
  });
  it('translates dynamic route prefixes', () => {
    expect(translatePath('/urunler/x', 'en')).toBe('/products/x');
    expect(translatePath('/urunler/x', 'tr')).toBe('/urunler/x');
  });
  it('builds canonical and hreflang URLs', () => {
    expect(getCanonicalUrl('en', '/urunler')).toBe('https://www.simlimited.net/en/products');
    expect(getCanonicalUrl('tr', '/')).toBe('https://www.simlimited.net');
    expect(getAlternateLanguages('/sss').ru).toBe('https://www.simlimited.net/ru/voprosy');
  });
});
