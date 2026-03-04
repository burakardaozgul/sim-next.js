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

  const items = [
    {
      key: 'home',
      label: t('home'),
      href: '/',
      icon: Home,
      isActive: pathname === '/',
      type: 'link' as const,
    },
    {
      key: 'products',
      label: t('products'),
      href: '/urunler',
      icon: Package,
      isActive: pathname.startsWith('/urunler'),
      type: 'link' as const,
    },
    {
      key: 'directions',
      label: t('directions'),
      href: GOOGLE_MAPS_URL,
      icon: Navigation,
      isActive: false,
      type: 'external' as const,
    },
    {
      key: 'callNow',
      label: t('callNow'),
      href: `tel:${PHONE_NUMBER}`,
      icon: PhoneCall,
      isActive: false,
      type: 'tel' as const,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-ink-900/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch">
        {items.map((item) => {
          const Icon = item.icon;

          const content = (
            <span
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors ${
                item.isActive
                  ? 'text-gold'
                  : 'text-silver/70 active:text-gold'
              }`}
            >
              <Icon
                size={20}
                strokeWidth={item.isActive ? 2.2 : 1.6}
                className={item.isActive ? 'text-gold' : ''}
              />
              <span className="leading-none">{item.label}</span>
              {item.isActive && (
                <span className="absolute top-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-b-full bg-gold" />
              )}
            </span>
          );

          if (item.type === 'link') {
            return (
              <Link
                key={item.key}
                href={item.href}
                className="relative flex flex-1"
              >
                {content}
              </Link>
            );
          }

          return (
            <a
              key={item.key}
              href={item.href}
              {...(item.type === 'external'
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="relative flex flex-1"
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
