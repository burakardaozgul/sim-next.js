'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BRANDS = [
  { name: 'Sakata INX', logo: '/logos/sakata-logo.png' },
  { name: 'Hi-Tech', logo: '/logos/hi-tech-logo.png' },
  { name: 'Fuji', logo: '/logos/fuji-logo.png' },
  { name: 'Zeller+Gmelin', logo: '/logos/zeller-logo.png' },
  { name: 'Gardiner', logo: '/logos/gardiner-logo.png' },
  { name: 'DEERS i', logo: '/logos/I_B2.png' },
  { name: 'Baltink', logo: '/logos/baltink.png' },
];

const AUTO_SCROLL_INTERVAL = 3000;

export default function BrandsSection() {
  const t = useTranslations('brands');
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const autoScroll = useCallback(() => {
    if (!scrollRef.current || pausedRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: 220, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [autoScroll]);

  return (
    <section className="border-t border-white/[0.06] bg-ink-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 w-full text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-silver">
            {t('subtitle')}
          </p>
        </div>

        {/* Brand Logos Slider */}
        <div
          className="relative"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-silver backdrop-blur-sm transition-all hover:border-gold/30 hover:text-gold md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-silver backdrop-blur-sm transition-all hover:border-gold/30 hover:text-gold md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-16 bg-gradient-to-r from-ink-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 bg-gradient-to-l from-ink-900 to-transparent" />

          <div
            ref={scrollRef}
            className="scrollbar-hide flex items-center justify-between gap-0 overflow-x-auto"
          >
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="group flex flex-shrink-0 items-center justify-center px-6 py-4"
                style={{ minWidth: 'calc(100% / 5)' }}
              >
                <div className="relative h-14 w-[160px] transition-all duration-300 group-hover:scale-110">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain brightness-0 invert opacity-50 transition-all duration-300 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
                    sizes="160px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
