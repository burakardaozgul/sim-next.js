import { describe, it, expect } from 'vitest';
import { ORGANIZATION } from '@/data/organization';
import {
  organizationJsonLd,
  localBusinessJsonLd,
  webSiteJsonLd,
  productJsonLd,
  articleJsonLd,
  contactPageJsonLd,
} from '@/lib/schema';
import { createPageMetadata } from '@/lib/seo';
import { getProductBySlug } from '@/data/products';
import { getBlogPostBySlug } from '@/data/blog';

const ORG_ID = 'https://www.simlimited.net/#organization';

describe('entity graph: one Organization, everything references it by @id', () => {
  it('Organization carries the identity fields and no invalid inLanguage', () => {
    const org = organizationJsonLd('tr') as Record<string, unknown>;
    expect(org['@id']).toBe(ORG_ID);
    expect(org.legalName).toBe(ORGANIZATION.legalName);
    expect(org.foundingDate).toBe('1983');
    expect(org).not.toHaveProperty('inLanguage');
    expect((org.address as Record<string, string>).postalCode).toBe('34524');
    expect((org.contactPoint as Record<string, string>).telephone).toBe('+902126376249');
    expect(org.sameAs).toEqual(expect.arrayContaining([expect.stringContaining('linkedin.com')]));
  });

  it('LocalBusiness is a branch of the Organization and mirrors the published opening hours', () => {
    const lb = localBusinessJsonLd('en') as Record<string, unknown>;
    expect(lb['@id']).toBe('https://www.simlimited.net/#localbusiness');
    expect((lb.parentOrganization as Record<string, string>)['@id']).toBe(ORG_ID);
    expect(lb).not.toHaveProperty('inLanguage');
    const hours = lb.openingHoursSpecification as { dayOfWeek: string[]; opens: string; closes: string };
    expect(hours.dayOfWeek).toEqual(ORGANIZATION.openingHours.dayOfWeek);
    expect(hours.opens).toBe(ORGANIZATION.openingHours.opens);
  });

  it('WebSite is published by the Organization', () => {
    const site = webSiteJsonLd() as Record<string, unknown>;
    expect((site.publisher as Record<string, string>)['@id']).toBe(ORG_ID);
  });
});

describe('Product schema', () => {
  it('has no price-less Offer (B2B quote model) and keeps the real brand', () => {
    const p = productJsonLd(getProductBySlug('sakata-inx-cmyk-murekkepler')!, 'en') as Record<string, unknown>;
    expect(p).not.toHaveProperty('offers');
    expect(p).not.toHaveProperty('inLanguage');
    expect((p.brand as Record<string, string>).name).toBe('SAKATA INX');
    expect((p.manufacturer as Record<string, string>).name).toBe('SAKATA INX');
    expect(p.url).toBe('https://www.simlimited.net/en/products/sakata-inx-cmyk-inks');
  });

  it('own brands point manufacturer at the Organization entity', () => {
    const p = productJsonLd(getProductBySlug('eva-color-gold-metalik-murekkepler')!, 'tr') as Record<string, unknown>;
    expect((p.manufacturer as Record<string, string>)['@id']).toBe(ORG_ID);
    expect((p.brand as Record<string, string>).name).toBe('EVA COLOR');
  });
});

describe('Article schema', () => {
  const post = getBlogPostBySlug('pantone-renk-sistemi-rehberi')!;
  it('references the Organization as publisher and author, uses the real modified date, no availableLanguage', () => {
    const a = articleJsonLd(post, 'en', { wordCount: 1200 }) as Record<string, unknown>;
    expect((a.publisher as Record<string, string>)['@id']).toBe(ORG_ID);
    expect((a.author as Record<string, string>)['@id']).toBe(ORG_ID);
    expect(a).not.toHaveProperty('availableLanguage');
    expect(a.dateModified).toBe(post.updated ?? post.date);
    expect((a.mainEntityOfPage as Record<string, string>)['@id']).toBe(
      'https://www.simlimited.net/en/blog/pantone-color-system-guide',
    );
  });

  it('page metadata marks articles as og:type article with the publish date', () => {
    const m = createPageMetadata({
      locale: 'tr',
      path: '/blog/x',
      title: 't',
      description: 'd',
      type: 'article',
      publishedTime: '2026-04-03',
    });
    expect((m.openGraph as { type?: string }).type).toBe('article');
    expect((m.openGraph as { publishedTime?: string }).publishedTime).toBe('2026-04-03');
  });
});

describe('ContactPage schema', () => {
  it('uses the localized URL and references the Organization', () => {
    const c = contactPageJsonLd('en') as Record<string, unknown>;
    expect(c.url).toBe('https://www.simlimited.net/en/contact');
    expect((c.mainEntity as Record<string, string>)['@id']).toBe(ORG_ID);
  });
});
