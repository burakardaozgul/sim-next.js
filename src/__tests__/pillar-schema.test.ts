import { describe, it, expect } from 'vitest';
import { faqPageJsonLd, itemListJsonLd, breadcrumbJsonLd, webPageJsonLd } from '@/lib/schema';
import { inlineLinksToPlainText } from '@/lib/inline-links';
import { ORGANIZATION } from '@/data/organization';

describe('generic schema builders for landing pages', () => {
  it('faqPageJsonLd builds a FAQPage with Question/Answer pairs', () => {
    const s = faqPageJsonLd('tr', [{ q: 'Soru?', a: 'Cevap.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.inLanguage).toBe('tr');
    expect(s.mainEntity).toHaveLength(1);
    expect(s.mainEntity[0]).toMatchObject({ '@type': 'Question', name: 'Soru?', acceptedAnswer: { '@type': 'Answer', text: 'Cevap.' } });
  });
  it('itemListJsonLd numbers items and carries absolute URLs', () => {
    const s = itemListJsonLd('en', 'Printing material categories', [
      { name: 'Offset inks', url: 'https://www.simlimited.net/en/products/x' },
      { name: 'Blankets', url: 'https://www.simlimited.net/en/products/y' },
    ]);
    expect(s['@type']).toBe('ItemList');
    expect(s.numberOfItems).toBe(2);
    expect(s.itemListElement[1]).toMatchObject({ '@type': 'ListItem', position: 2, name: 'Blankets', url: 'https://www.simlimited.net/en/products/y' });
  });
  it('breadcrumbJsonLd resolves localized canonical URLs from TR paths', () => {
    const s = breadcrumbJsonLd('en', [
      { name: 'Home', path: '/' },
      { name: 'Printing Materials', path: '/matbaa-malzemeleri' },
    ]);
    expect(s.itemListElement[0].item).toBe('https://www.simlimited.net/en');
    expect(s.itemListElement[1]).toMatchObject({ position: 2, item: 'https://www.simlimited.net/en/printing-materials' });
  });
  it('webPageJsonLd joins the entity graph (website + organization) and names the primary image', () => {
    const s = webPageJsonLd('tr', '/matbaa-malzemeleri', { name: 'Matbaa Malzemeleri', description: 'd', image: '/images/x.webp' });
    expect(s['@id']).toBe('https://www.simlimited.net/matbaa-malzemeleri');
    expect(s.isPartOf).toEqual({ '@id': ORGANIZATION.websiteId });
    expect(s.publisher).toEqual({ '@id': ORGANIZATION.id });
    expect(s.primaryImageOfPage).toMatchObject({ '@type': 'ImageObject', url: 'https://www.simlimited.net/images/x.webp' });
  });
});

describe('inlineLinksToPlainText', () => {
  it('drops link syntax but keeps labels and surrounding text', () => {
    expect(inlineLinksToPlainText('See [SAKATA INX](/urunler/sakata-inx-cmyk-murekkepler) inks and [docs](https://x.y/a_(b)).')).toBe('See SAKATA INX inks and docs.');
  });
  it('FAQ answers in schema carry plain text', () => {
    expect(faqPageJsonLd('tr', [{ q: 'Q', a: 'A [b](/sss) c' }]).mainEntity[0].acceptedAnswer.text).toBe('A b c');
  });
});
