'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getProductBySlug, getProductSlug } from '@/data/products';

const productLinkDefs = [
  { key: 'offset', slug: 'sakata-inx-cmyk-murekkepler' },
  { key: 'metallic', slug: 'eva-color-gold-metalik-murekkepler' },
  { key: 'uv', slug: 'zeller-gmelin-uv-offset-murekkepleri' },
  { key: 'pantone', slug: 'sakata-inx-pantone-murekkepler' },
  { key: 'custom', slug: 'ozel-renkler' },
  { key: 'blanket', slug: 'vector-baski-blanketleri' },
  { key: 'chemicals', slug: 'hi-tech-coatings-dispersiyon-lak' },
] as const;

const companyLinks = [
  { labelKey: 'about', href: '/hakkimizda' },
  { labelKey: 'brands', href: '/temsilcilikler' },
  { labelKey: 'customColor', href: '/ozel-renk-uretimi' },
  { labelKey: 'contact', href: '/iletisim' },
  { labelKey: 'blog', href: '/blog' },
  { labelKey: 'faq', href: '/sss' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tProducts = useTranslations('products');
  const locale = useLocale();

  return (
    <>
    <footer className="border-t border-white/[0.06] bg-ink-900">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/sim-baski-malzemeleri.webp"
              alt="SIM Baskı Malzemeleri"
              width={140}
              height={45}
              className="brightness-0 invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-silver">
              {t('desc')}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${t('phone')}`}
                className="flex items-center gap-2.5 text-sm text-silver transition-colors hover:text-gold"
              >
                <Phone size={14} className="text-gold" />
                {t('phone')}
              </a>
              <a
                href={`mailto:${t('email')}`}
                className="flex items-center gap-2.5 text-sm text-silver transition-colors hover:text-gold"
              >
                <Mail size={14} className="text-gold" />
                {t('email')}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-silver">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                <span>Yakuplu, 194. Sk. No:1 D:176, 34000 Beylikdüzü/İstanbul</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream">
              {t('products')}
            </h3>
            <ul className="space-y-2.5">
              {productLinkDefs.map((item) => {
                const product = getProductBySlug(item.slug);
                const locSlug = product ? getProductSlug(product, locale) : item.slug;
                return (
                  <li key={item.key}>
                    <Link
                      href={{ pathname: '/urunler/[slug]' as const, params: { slug: locSlug } }}
                      className="text-sm text-silver transition-colors hover:text-gold"
                    >
                      {tProducts(`categories.${item.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream">
              {t('company')}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.labelKey}>
                  <Link
                    href={item.href}
                    className="text-sm text-silver transition-colors hover:text-gold"
                  >
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA Column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream">
              {t('contact')}
            </h3>
            <p className="text-sm leading-relaxed text-silver">
              {t('desc')}
            </p>
            <Link
              href="/iletisim"
              className="mt-5 inline-flex items-center gap-2 bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row lg:px-10">
          <p className="text-xs text-silver/50">
            &copy; 2026 SIM Baskı Malzemeleri. {t('rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/gizlilik-politikasi"
              className="text-xs text-silver/50 transition-colors hover:text-gold"
            >
              {t('privacyPolicy')}
            </Link>
            <span className="text-silver/20">|</span>
            <Link
              href="/kullanim-kosullari"
              className="text-xs text-silver/50 transition-colors hover:text-gold"
            >
              {t('termsOfUse')}
            </Link>
          </div>
          <p className="text-xs text-silver/50">
            Designed & Developed by{' '}
            <a
              href="https://www.indoles.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver/70 transition-colors hover:text-gold"
            >
              INDOLES Creative
            </a>
          </p>
        </div>
      </div>
    </footer>

    {/* Spacer for mobile bottom nav */}
    <div className="h-20 bg-ink-900 lg:hidden" />
    </>
  );
}
