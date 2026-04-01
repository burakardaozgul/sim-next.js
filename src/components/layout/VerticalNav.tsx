'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { setLocalePreference } from '@/lib/locale-cookie';
import { useParams } from 'next/navigation';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/urunler' },
  { key: 'customColor', href: '/ozel-renk-uretimi' },
  { key: 'brands', href: '/temsilcilikler' },
  { key: 'about', href: '/hakkimizda' },
  { key: 'contact', href: '/iletisim' },
] as const;

const localeData: Record<string, { label: string; flag: string; name: string }> = {
  tr: { label: 'TR', flag: '🇹🇷', name: 'Türkçe' },
  en: { label: 'EN', flag: '🇬🇧', name: 'English' },
  ru: { label: 'RU', flag: '🇷🇺', name: 'Русский' },
  ar: { label: 'AR', flag: '🇸🇦', name: 'العربية' },
};

export default function VerticalNav() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Build the href for locale switcher links
  // usePathname() from next-intl returns the template pattern (e.g. '/urunler/[slug]')
  // so we just need to pass the params alongside it for dynamic routes
  const slug = params?.slug as string | undefined;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const localeHref = slug
    ? { pathname: pathname as any, params: { slug } }
    : { pathname: pathname as any };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-ink-900/90 text-cream backdrop-blur-sm lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-50 flex h-screen w-[260px] flex-col border-r border-white/[0.06] bg-ink-900 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button - mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-silver hover:text-cream lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-6">
          <Image
            src="/images/sim-baski-malzemeleri.webp"
            alt="SIM Baskı Malzemeleri"
            width={160}
            height={50}
            className="brightness-0 invert"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-silver hover:bg-white/[0.04] hover:text-cream'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        isActive ? 'bg-gold' : 'bg-transparent group-hover:bg-silver/40'
                      }`}
                    />
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Language Selector */}
          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-silver/50">
              {t('language') ?? 'Dil'}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={localeHref as any}
                  locale={loc}
                  onClick={() => {
                    setLocalePreference(loc);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    loc === locale
                      ? 'bg-gold/10 text-gold ring-1 ring-gold/20'
                      : 'text-silver hover:bg-white/[0.04] hover:text-cream'
                  }`}
                >
                  <span className="text-base leading-none">{localeData[loc].flag}</span>
                  <span className="text-xs font-semibold tracking-wide">{localeData[loc].label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section — Contact only */}
        <div className="border-t border-white/[0.06] px-6 py-5">
          <div className="space-y-2.5">
            <a
              href={`tel:${tFooter('phone')}`}
              className="flex items-center gap-2.5 text-xs text-silver transition-colors hover:text-gold"
            >
              <Phone size={13} className="text-gold/70" />
              <span>{tFooter('phone')}</span>
            </a>
            <a
              href={`mailto:${tFooter('email')}`}
              className="flex items-center gap-2.5 text-xs text-silver transition-colors hover:text-gold"
            >
              <Mail size={13} className="text-gold/70" />
              <span>{tFooter('email')}</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
