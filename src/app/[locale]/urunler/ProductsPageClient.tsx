'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { products, getProductSlug } from '@/data/products';
import { getBlurDataURL } from '@/lib/blur';
import { ArrowRight } from 'lucide-react';

export default function ProductsPageClient() {
  const t = useTranslations('products');
  const locale = useLocale();

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Header */}
        <section className="bg-ink-900 px-6 pb-10 pt-24 lg:px-10 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('subtitle')}
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
              {t('title')}
            </h1>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-ink-900 px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={{ pathname: '/urunler/[slug]', params: { slug: getProductSlug(product, locale) } }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-ink-800 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_40px_rgba(196,146,42,0.06)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name[locale] || product.name.tr}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(product.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="mb-2 inline-block text-[10px] font-medium uppercase tracking-widest text-gold">
                      {t(`categories.${product.category}`)}
                    </span>
                    <h2 className="text-base font-semibold leading-snug text-cream line-clamp-2">
                      {product.name[locale] || product.name.tr}
                    </h2>
                    <p className="mt-2 text-sm text-silver line-clamp-2">
                      {product.description[locale] || product.description.tr}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span>{t('viewAll')}</span>
                      <ArrowRight size={12} />
                    </div>
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
