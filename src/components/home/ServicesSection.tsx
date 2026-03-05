'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';

const SERVICE_IMAGES = [
  'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09894.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/05/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
  'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09924.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Gold-Aile.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09900.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/09/blanket2.jpg',
];

const SERVICE_SLUGS = [
  'zeller-gmelin-uv-offset-murekkepleri',
  'sakata-inx-cmyk-murekkepler',
  'ozel-renkler',
  'hi-tech-coatings-dispersiyon-lak',
  'eva-color-gold-metalik-murekkepler',
  'eva-color-fluorescent-murekkepler',
  'st-dot-offset-blanketleri',
];

export default function ServicesSection() {
  const t = useTranslations('services');
  const [activeIndex, setActiveIndex] = useState(0);

  const items = Array.from({ length: 7 }, (_, i) => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }));

  return (
    <section className="border-t border-white/[0.06] bg-ink-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {t('tag')}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-cream md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Accordion List */}
          <div className="flex flex-col">
            {items.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative w-full border-b border-white/[0.06] text-left transition-all duration-300 ${
                    i === 0 ? 'border-t' : ''
                  }`}
                >
                  <div
                    className={`flex items-center justify-between px-1 py-5 transition-all duration-300 ${
                      isActive ? 'pl-4' : 'hover:pl-2'
                    }`}
                  >
                    <span
                      className={`font-heading text-base font-semibold tracking-wide transition-colors duration-300 md:text-lg ${
                        isActive ? 'text-gold' : 'text-cream group-hover:text-gold-light'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-gold text-white'
                          : 'border border-white/10 text-silver/50 group-hover:border-gold/30 group-hover:text-gold'
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Expandable description */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-1 pb-5 text-sm leading-relaxed text-silver/80">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="services-active-bar"
                      className="absolute left-0 top-0 h-full w-[2px] bg-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — Image + Info */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SERVICE_IMAGES[activeIndex]}
                      alt={items[activeIndex].title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating discover button */}
                <Link
                  href={{ pathname: '/urunler/[slug]' as const, params: { slug: SERVICE_SLUGS[activeIndex] } }}
                  className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
                >
                  {t('discover')}
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Title below image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5"
                >
                  <h3 className="font-heading text-xl font-bold text-cream">
                    {items[activeIndex].title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-silver/70">
                    {items[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
