'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_IMAGES = [
  'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/05/DSC07958.jpg',
  'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
];

const SLIDE_ALTS = [
  'SIM Baskı Malzemeleri - Matbaa malzemeleri ve ofset mürekkep üretim tesisi',
  'SIM Baskı Malzemeleri - Özel renk üretimi laboratuvarı ve renk eşleştirme',
  'SIM Baskı Malzemeleri - Dünya markalarının Türkiye distribütörü',
];

const SLIDE_LINKS = ['/urunler', '/ozel-renk-uretimi', '/temsilcilikler'];

const AUTO_PLAY_INTERVAL = 6000;

export default function HeroSlider() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const slideCount = SLIDE_IMAGES.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setProgressKey((k) => k + 1);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideCount);
    setProgressKey((k) => k + 1);
  }, [slideCount]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
    setProgressKey((k) => k + 1);
  }, [slideCount]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-30%' : '30%',
      opacity: 0,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink-900">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDE_IMAGES[current]}
            alt={SLIDE_ALTS[current]}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-3xl px-8 text-center">
              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold"
              >
                {t('tag')}
              </motion.p>

              <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.25}
                className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-cream uppercase line-clamp-2 md:text-5xl lg:text-6xl"
              >
                {t(`slides.${current}.title`).replace('\n', ' ')}
              </motion.h1>

              <motion.p
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
              >
                {t(`slides.${current}.subtitle`)}
              </motion.p>

              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0.6}
                className="mt-8"
              >
                <Link
                  href={SLIDE_LINKS[current]}
                  className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
                >
                  {t(`slides.${current}.cta`)}
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute bottom-8 left-[calc(50%-80px)] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-900/40 text-cream/70 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-ink-900/60 hover:text-gold md:flex lg:bottom-auto lg:top-1/2 lg:left-6 lg:-translate-y-1/2"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute bottom-8 right-[calc(50%-80px)] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink-900/40 text-cream/70 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-ink-900/60 hover:text-gold md:flex lg:bottom-auto lg:top-1/2 lg:right-6 lg:-translate-y-1/2"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide Indicators with Progress Bar */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {SLIDE_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="group relative flex h-8 items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="block h-[3px] w-10 overflow-hidden rounded-full bg-white/20">
              {index === current && (
                <motion.span
                  key={progressKey}
                  className="block h-full bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: 'linear' }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-xs text-cream/50 md:flex">
        <span className="text-base font-medium text-gold">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="text-cream/30">/</span>
        <span>{String(slideCount).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
