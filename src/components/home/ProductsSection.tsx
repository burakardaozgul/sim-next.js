'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

const CATEGORY_KEYS = ['all', 'offset', 'metallic', 'uv', 'pantone', 'custom', 'blanket', 'chemicals'] as const;

export default function ProductsSection() {
  const t = useTranslations('products');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const filtered = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-ink-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 max-w-lg text-base text-silver">
              {t('subtitle')}
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver transition-all hover:border-gold/30 hover:text-gold"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver transition-all hover:border-gold/30 hover:text-gold"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="scrollbar-hide mb-8 flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveFilter(key);
                if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeFilter === key
                  ? 'bg-gold text-white'
                  : 'border border-white/[0.08] bg-ink-800 text-silver hover:border-gold/20 hover:text-cream'
              }`}
            >
              {key === 'all' ? (locale === 'tr' ? 'Tümü' : locale === 'ru' ? 'Все' : locale === 'ar' ? 'الكل' : 'All') : t(`categories.${key}`)}
            </button>
          ))}
        </div>

        {/* Product Slider */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-6 flex gap-5 overflow-x-auto px-6 snap-x snap-mandatory lg:-mx-0 lg:px-0"
        >
          {filtered.map((product) => {
            const name = product.name[locale] || product.name.tr;
            const desc = product.description[locale] || product.description.tr;
            const shortDesc = desc.length > 80 ? desc.slice(0, 80) + '...' : desc;

            return (
              <Link
                key={product.slug}
                href={`/urunler/${product.slug}`}
                className="group relative flex-shrink-0 snap-start"
              >
                <div className="relative h-[320px] w-[260px] overflow-hidden rounded-xl md:h-[360px] md:w-[280px]">
                  <Image
                    src={product.image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/40 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {t(`categories.${product.category}`)}
                  </span>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-sm font-semibold leading-snug text-cream">
                      {name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-silver/80">
                      {shortDesc}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span>{t('viewAll')}</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            {t('viewAll')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
