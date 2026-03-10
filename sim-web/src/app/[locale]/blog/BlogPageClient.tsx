'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getBlurDataURL } from '@/lib/blur';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blog';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogPageClient() {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero */}
        <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              Blog
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-silver">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                  className="group overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all hover:border-gold/20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title[locale] || post.title.tr}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(post.image)}
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-gold">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString(
                        locale === 'tr' ? 'tr-TR' : locale,
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-cream line-clamp-2">
                      {post.title[locale] || post.title.tr}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-silver line-clamp-3">
                      {post.excerpt[locale] || post.excerpt.tr}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                      {t('readMore')}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
