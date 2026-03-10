'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getBlurDataURL } from '@/lib/blur';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  Shield,
  Cpu,
  Target,
  Leaf,
  HeartHandshake,
  Globe,
  Factory,
  Wrench,
  Zap,
  Award,
} from 'lucide-react';

const VALUE_ICONS = [Shield, Cpu, Target, Leaf, HeartHandshake];
const STRENGTH_ICONS = [Globe, Factory, Wrench, Zap, Award];

export default function AboutPageClient() {
  const t = useTranslations('aboutPage');
  const tStats = useTranslations('stats');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');
  const [activeTab, setActiveTab] = useState<'values' | 'strengths'>('values');

  const stats = [
    { value: tStats('capacity'), label: tStats('capacityLabel') },
    { value: '1983', label: tStats('sinceLabel') },
    { value: tStats('brands'), label: tStats('brandsLabel') },
    { value: tStats('service'), label: tStats('serviceLabel') },
  ];

  const values = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`values.items.${i}.title`),
    desc: t(`values.items.${i}.desc`),
    Icon: VALUE_ICONS[i],
  }));

  const strengths = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`strengths.items.${i}.title`),
    desc: t(`strengths.items.${i}.desc`),
    Icon: STRENGTH_ICONS[i],
  }));

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero Header */}
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

        {/* Stats Bar */}
        <section className="border-y border-white/[0.06] bg-ink-800 px-6 py-10 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-gold md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-silver">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl">
                  <Image
                    src="/images/DSC08042-500x600.webp"
                    alt="SIM Baskı Malzemeleri - Üretim"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL={getBlurDataURL('/images/DSC08042-500x600.webp')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl border border-gold/20" />
              </div>

              {/* Content */}
              <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-cream md:text-3xl">
                  {t('history.title')}
                </h2>
                <p className="mt-4 text-lg font-medium italic text-cream/80">
                  {t('history.intro')}
                </p>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-silver">
                  <p>{t('history.p1')}</p>
                  <p>{t('history.p2')}</p>
                  <p>{t('history.p3')}</p>
                  <p>{t('history.p4')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Mission */}
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Image
                    src="/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp"
                    alt="SIM Baskı Malzemeleri - Misyon"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL('/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                </div>
                <div className="p-8 lg:p-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    <Target size={24} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cream">
                    {t('mission.title')}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-silver">
                    {t('mission.text')}
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Image
                    src="/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi.webp"
                    alt="SIM Baskı Malzemeleri - Vizyon"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL('/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi.webp')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                </div>
                <div className="p-8 lg:p-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                    <Cpu size={24} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cream">
                    {t('vision.title')}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-silver">
                    {t('vision.text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values & Strengths Tabs */}
        <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Tab Headers */}
            <div className="mb-10 flex justify-center gap-2">
              <button
                onClick={() => setActiveTab('values')}
                className={`rounded-full px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'values'
                    ? 'bg-gold text-white'
                    : 'border border-white/[0.06] bg-ink-800 text-silver hover:border-gold/20 hover:text-cream'
                }`}
              >
                {t('values.title')}
              </button>
              <button
                onClick={() => setActiveTab('strengths')}
                className={`rounded-full px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'strengths'
                    ? 'bg-gold text-white'
                    : 'border border-white/[0.06] bg-ink-800 text-silver hover:border-gold/20 hover:text-cream'
                }`}
              >
                {t('strengths.title')}
              </button>
            </div>

            {/* Tab Content */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeTab === 'values' ? values : strengths).map(({ title, desc, Icon }) => (
                <div
                  key={title}
                  className="group rounded-xl border border-white/[0.06] bg-ink-800 p-6 transition-all hover:border-gold/20"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-cream">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
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
