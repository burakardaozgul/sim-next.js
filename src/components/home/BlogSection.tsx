'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import { getBlurDataURL } from '@/lib/blur';
import { blogPosts } from '@/data/blog';

export default function BlogSection() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="border-t border-white/[0.06] bg-ink-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('title')}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
              {t('subtitle')}
            </h2>
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

        {/* Blog Cards Slider */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-6 flex gap-6 overflow-x-auto px-6 snap-x snap-mandatory lg:-mx-0 lg:px-0"
        >
          {blogPosts.slice(0, 3).map((post) => {
            const title = post.title[locale] || post.title.tr;
            const excerpt = post.excerpt[locale] || post.excerpt.tr;
            const readTime = post.readTime[locale] || post.readTime.tr;

            return (
              <article
                key={post.slug}
                className="group w-[85vw] flex-shrink-0 snap-start sm:w-[340px] lg:w-[calc(33.333%-16px)]"
              >
                <Link href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }} className="block overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all duration-300 hover:border-gold/20">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 300px, 400px"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(post.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm">
                      <Clock size={10} />
                      {readTime}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-1.5 text-xs text-silver/60">
                      <Clock size={12} />
                      <time>{new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h3 className="mb-2 text-base font-semibold leading-snug text-cream transition-colors group-hover:text-gold">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-silver/70">
                      {excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      {t('readMore')}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
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
