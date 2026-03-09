'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { Product, products } from '@/data/products';
import { getBlurDataURL } from '@/lib/blur';
import { ChevronLeft, Check, ArrowRight } from 'lucide-react';

export default function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations('products');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const [activeImage, setActiveImage] = useState(0);

  const name = product.name[locale] || product.name.tr;
  const description = product.description[locale] || product.description.tr;
  const features = product.features?.[locale] || product.features?.tr;

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Breadcrumb */}
        <div className="bg-ink-900 px-6 pt-20 lg:px-10 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-1.5 text-xs text-silver transition-colors hover:text-gold"
            >
              <ChevronLeft size={14} />
              {t('title')}
            </Link>
          </div>
        </div>

        {/* Product Detail */}
        <section className="bg-ink-900 px-6 py-10 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Gallery */}
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.06]">
                  <Image
                    src={product.gallery[activeImage]}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(product.gallery[activeImage])}
                  />
                </div>
                {product.gallery.length > 1 && (
                  <div className="mt-4 flex gap-3">
                    {product.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative h-16 w-20 overflow-hidden rounded-lg border transition-all ${
                          i === activeImage
                            ? 'border-gold'
                            : 'border-white/[0.06] opacity-50 hover:opacity-80'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${name} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          placeholder="blur"
                          blurDataURL={getBlurDataURL(img)}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-gold">
                  {t(`categories.${product.category}`)}
                </span>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
                  {name}
                </h1>
                <p className="mt-6 text-base leading-relaxed text-silver">
                  {description}
                </p>

                {/* Features */}
                {features && features.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-cream">
                        <Check size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
                  >
                    {tCta('quote')}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`tel:${tFooter('phone')}`}
                    className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold/40 hover:text-gold"
                  >
                    {tCta('call')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream">
                {t('title')}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={{ pathname: '/urunler/[slug]', params: { slug: rp.slug } }}
                    className="group overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all hover:border-gold/20"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.name[locale] || rp.name.tr}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL(rp.image)}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-cream line-clamp-2">
                        {rp.name[locale] || rp.name.tr}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </main>
  );
}
