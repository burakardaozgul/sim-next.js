import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Product } from '@/data/products';
import { productJsonLd, productBreadcrumbJsonLd, productFaqJsonLd, glossaryJsonLd } from '@/lib/schema';
import { slugify } from '@/lib/slugify';

const sample: Product = {
  slug: 'test-urun',
  slugs: { tr: 'test-urun', en: 'test-product', ru: 'test-produkt', ar: 'test-product' },
  image: '/images/x.webp',
  gallery: [],
  category: 'offset',
  name: { tr: 'Test Ürün', en: 'Test Product' },
  description: { tr: 'Açıklama', en: 'Description' },
  specs: [
    { label: { tr: 'Viskozite', en: 'Viscosity' }, value: { tr: '18–22 Pa·s', en: '18–22 Pa·s' } },
    { label: { tr: 'Kuruma', en: 'Drying' }, value: { tr: 'Oksidatif', en: 'Oxidative' } },
  ],
  documents: [{ label: 'TDS', url: '/docs/test-tds.pdf', type: 'TDS' }],
  faq: [{ q: { tr: 'Soru?', en: 'Question?' }, a: { tr: 'Cevap.', en: 'Answer.' } }],
};

describe('product template schema (PR-9)', () => {
  it('maps specs to Product.additionalProperty in the page locale', () => {
    const p = productJsonLd(sample, 'en') as { additionalProperty?: Array<{ name: string; value: string }> };
    expect(p.additionalProperty).toEqual([
      { '@type': 'PropertyValue', name: 'Viscosity', value: '18–22 Pa·s' },
      { '@type': 'PropertyValue', name: 'Drying', value: 'Oxidative' },
    ]);
  });
  it('omits additionalProperty when a product has no specs', () => {
    const p = productJsonLd({ ...sample, specs: undefined }, 'tr') as Record<string, unknown>;
    expect(p).not.toHaveProperty('additionalProperty');
  });
  it('breadcrumb puts the pillar between home and products', () => {
    const b = productBreadcrumbJsonLd(sample, 'en') as { itemListElement: Array<{ position: number; item: string }> };
    expect(b.itemListElement.map((i) => i.item)).toEqual([
      'https://www.simlimited.net/en',
      'https://www.simlimited.net/en/printing-materials',
      'https://www.simlimited.net/en/products',
      'https://www.simlimited.net/en/products/test-product',
    ]);
  });
  it('builds a FAQPage for products with faq entries, nothing otherwise', () => {
    const f = productFaqJsonLd(sample, 'tr') as { mainEntity: Array<{ name: string }> } | null;
    expect(f?.mainEntity[0].name).toBe('Soru?');
    expect(productFaqJsonLd({ ...sample, faq: undefined }, 'tr')).toBeNull();
  });
});

describe('glossary terms get stable anchors and URLs (PR-9)', () => {
  it('slugify handles Turkish characters and punctuation', () => {
    expect(slugify('Dot Gain (Nokta Büyümesi)')).toBe('dot-gain-nokta-buyumesi');
    expect(slugify('Işık Haslığı')).toBe('isik-hasligi');
    expect(slugify('CMYK')).toBe('cmyk');
    expect(slugify('  Çok  Boşluk ')).toBe('cok-bosluk');
  });
  it('DefinedTerm entries carry a url pointing at the term anchor', () => {
    const g = glossaryJsonLd('en') as { hasDefinedTerm: Array<{ url: string; name: string }> };
    const cmyk = g.hasDefinedTerm.find((t) => t.name === 'CMYK')!;
    expect(cmyk.url).toBe('https://www.simlimited.net/en/printing-glossary#term-cmyk');
  });
  it('the glossary page renders matching anchor ids', () => {
    const src = readFileSync(join(__dirname, '..', 'app', '[locale]', 'matbaa-terimleri-sozlugu', 'page.tsx'), 'utf8');
    expect(src).toMatch(/id=\{`term-\$\{slugify\(/);
  });
});

describe('product detail renders the new sections when present (PR-9)', () => {
  const src = readFileSync(join(__dirname, '..', 'app', '[locale]', 'urunler', '[slug]', 'ProductDetailClient.tsx'), 'utf8');
  it('specs table, documents, use cases and FAQ blocks exist in the template', () => {
    expect(src).toMatch(/product\.specs/);
    expect(src).toMatch(/product\.documents/);
    expect(src).toMatch(/product\.useCases/);
    expect(src).toMatch(/product\.faq/);
  });
  it('visible breadcrumb links to the pillar page', () => {
    expect(src).toMatch(/href="\/matbaa-malzemeleri"/);
  });
});
