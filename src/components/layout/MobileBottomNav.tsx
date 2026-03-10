'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Home, Package, Navigation, PhoneCall } from 'lucide-react';

const PHONE_NUMBER = '+902126376249';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/SIM+BASKI+MALZEMELERİ/@40.9835,28.6285,17z';

export default function MobileBottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isProducts = pathname.startsWith('/urunler');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-ink-900/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch">
        {/* Ana Sayfa */}
        <Link href="/" className="relative flex flex-1">
          <span
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors ${
              isHome ? 'text-gold' : 'text-silver/70 active:text-gold'
            }`}
          >
            <Home size={20} strokeWidth={isHome ? 2.2 : 1.6} className={isHome ? 'text-gold' : ''} />
            <span className="leading-none">{t('home')}</span>
            {isHome && (
              <span className="absolute top-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-b-full bg-gold" />
            )}
          </span>
        </Link>

        {/* Ürünler */}
        <Link href="/urunler" className="relative flex flex-1">
          <span
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors ${
              isProducts ? 'text-gold' : 'text-silver/70 active:text-gold'
            }`}
          >
            <Package size={20} strokeWidth={isProducts ? 2.2 : 1.6} className={isProducts ? 'text-gold' : ''} />
            <span className="leading-none">{t('products')}</span>
            {isProducts && (
              <span className="absolute top-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-b-full bg-gold" />
            )}
          </span>
        </Link>

        {/* Yol Tarifi */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-1"
        >
          <span className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide text-silver/70 transition-colors active:text-gold">
            <Navigation size={20} strokeWidth={1.6} />
            <span className="leading-none">{t('directions')}</span>
          </span>
        </a>

        {/* Hemen Ara */}
        <a href={`tel:${PHONE_NUMBER}`} className="relative flex flex-1">
          <span className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide text-silver/70 transition-colors active:text-gold">
            <PhoneCall size={20} strokeWidth={1.6} />
            <span className="leading-none">{t('callNow')}</span>
          </span>
        </a>
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
