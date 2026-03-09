'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Globe, Calendar, ExternalLink } from 'lucide-react';

const REPRESENTATIVES_DATA = [
  { logo: '/logos/sakata-logo.webp', website: 'https://www.inx.co.jp/en/' },
  { logo: '/logos/hi-tech-logo.webp', website: 'https://www.hitechcoatings.com/' },
  { logo: '/logos/I_B2.webp', website: 'https://www.daihan-ink.com/' },
  { logo: '/logos/baltink.webp', website: 'https://www.baltink.lt/' },
  { logo: '/logos/Stahl_Logo_RGB.webp', website: 'https://www.stahl.com/' },
];

const DEALERS_DATA = [
  { logo: '/logos/fuji-logo.webp', website: 'https://www.fujifilm.com/' },
  { logo: '/logos/zeller-logo.webp', website: 'https://www.zfreiland.de/' },
];

type Tab = 'representatives' | 'dealers';

export default function BrandsPageClient() {
  const t = useTranslations('brandsPage');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');
  const [activeTab, setActiveTab] = useState<Tab>('representatives');

  const representatives = REPRESENTATIVES_DATA.map((data, i) => ({
    ...data,
    name: t(`representatives.${i}.name`),
    country: t(`representatives.${i}.country`),
    since: t(`representatives.${i}.since`),
    desc: t(`representatives.${i}.desc`),
  }));

  const dealers = DEALERS_DATA.map((data, i) => ({
    ...data,
    name: t(`dealers.${i}.name`),
    country: t(`dealers.${i}.country`),
    since: t(`dealers.${i}.since`),
    desc: t(`dealers.${i}.desc`),
  }));

  const activeBrands = activeTab === 'representatives' ? representatives : dealers;

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero Header */}
        <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {t('title')}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                {REPRESENTATIVES_DATA.length + DEALERS_DATA.length}+
              </span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
              {t('subtitle')}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-silver">
              {t('intro')}
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-t border-white/[0.06] bg-ink-900 px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-2 pt-8">
              <button
                onClick={() => setActiveTab('representatives')}
                className={`rounded-full px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'representatives'
                    ? 'bg-gold text-white'
                    : 'border border-white/[0.06] bg-ink-800 text-silver hover:border-gold/20 hover:text-cream'
                }`}
              >
                {t('tabRepresentatives')}
              </button>
              <button
                onClick={() => setActiveTab('dealers')}
                className={`rounded-full px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'dealers'
                    ? 'bg-gold text-white'
                    : 'border border-white/[0.06] bg-ink-800 text-silver hover:border-gold/20 hover:text-cream'
                }`}
              >
                {t('tabDealers')}
              </button>
            </div>
          </div>
        </section>

        {/* Brand Cards */}
        <section className="bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl space-y-8">
            {activeBrands.map((brand) => (
              <div
                key={brand.name}
                className="group overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="grid items-stretch gap-0 lg:grid-cols-3">
                  {/* Logo Area */}
                  <div className="flex items-center justify-center bg-white p-10 lg:p-12">
                    <div className="relative h-20 w-full max-w-[220px] transition-transform duration-300 group-hover:scale-105 lg:h-24">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="220px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center border-t border-white/[0.06] p-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-8">
                    <h2 className="font-heading text-xl font-bold text-cream">
                      {brand.name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-silver">
                        <Globe size={13} className="text-gold" />
                        {brand.country}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-silver">
                        <Calendar size={13} className="text-gold" />
                        {t('since')}: {brand.since}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-silver">
                      {brand.desc}
                    </p>

                    {brand.website && (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                      >
                        {t('website')}
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold px-6 py-14 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                {tCta('title')}
              </h2>
              <p className="mt-2 text-sm text-white/80">
                {tCta('subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${tFooter('phone')}`}
                className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream"
              >
                {tCta('call')}
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                {tCta('quote')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
