'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getBlurDataURL } from '@/lib/blur';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  Clock,
  Microscope,
  Sun,
  Factory,
  Layers,
  Award,
  Pipette,
  Printer,
  CheckCircle,
  Palette,
  Sparkles,
  Lightbulb,
  Building2,
} from 'lucide-react';

const WHY_ICONS = [Clock, Microscope, Sun, Factory, Layers, Award];
const STEP_ICONS = [Pipette, Printer, CheckCircle, Factory];
const TYPE_ICONS = [Palette, Sparkles, Lightbulb, Building2];

export default function CustomColorPageClient() {
  const t = useTranslations('customColorPage');
  const tProcess = useTranslations('process');
  const tStats = useTranslations('stats');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');

  const stats = [
    { value: tStats('capacity'), label: tStats('capacityLabel') },
    { value: '1983', label: tStats('sinceLabel') },
    { value: tStats('brands'), label: tStats('brandsLabel') },
    { value: tStats('service'), label: tStats('serviceLabel') },
  ];

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-ink-900">
          <div className="grid lg:grid-cols-2">
            {/* Text */}
            <div className="flex flex-col justify-center px-6 pb-12 pt-24 lg:px-10 lg:py-28">
              <div className="mx-auto max-w-xl lg:mx-0">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  {t('subtitle')}
                </p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-base leading-relaxed text-silver">
                  {t('heroText')}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold/90"
                  >
                    {tCta('quote')}
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`tel:${tFooter('phone')}`}
                    className="inline-flex items-center gap-2 border border-white/[0.12] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold/30 hover:text-gold"
                  >
                    {tCta('call')}
                  </a>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="relative hidden aspect-[4/3] lg:block lg:aspect-auto">
              <Image
                src="/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi.webp"
                alt={t('title')}
                fill
                className="object-cover"
                sizes="50vw"
                priority
                placeholder="blur"
                blurDataURL={getBlurDataURL('/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi.webp')}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/60 to-transparent" />
            </div>
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

        {/* Process Steps */}
        <section className="relative overflow-hidden bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {tProcess('subtitle')}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
                {tProcess('title')}
              </h2>
            </div>
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
              <div className="absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] hidden h-px bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 md:block" />
              {[0, 1, 2, 3].map((i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <div key={i} className="group relative flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-white/[0.08] bg-ink-800 transition-all duration-300 group-hover:border-gold/30 group-hover:shadow-[0_0_30px_rgba(196,146,42,0.1)]">
                        <Icon size={32} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                        {tProcess(`steps.${i}.number`)}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-cream">
                      {tProcess(`steps.${i}.title`)}
                    </h3>
                    <p className="max-w-[220px] text-sm leading-relaxed text-silver">
                      {tProcess(`steps.${i}.desc`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why SIM Custom Color */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {t('whySubtitle')}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
                {t('whyTitle')}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <div
                    key={i}
                    className="group rounded-xl border border-white/[0.06] bg-ink-900 p-6 transition-all hover:border-gold/20"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                      <Icon size={22} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-cream">
                      {t(`why.${i}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">
                      {t(`why.${i}.desc`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Production Scope — Image + Types */}
        <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp"
                    alt={t('typesTitle')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL('/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/50 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl border border-gold/20" />
              </div>

              {/* Types */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  {t('typesSubtitle')}
                </p>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-cream md:text-3xl">
                  {t('typesTitle')}
                </h2>
                <div className="mt-8 space-y-5">
                  {[0, 1, 2, 3].map((i) => {
                    const Icon = TYPE_ICONS[i];
                    return (
                      <div
                        key={i}
                        className="group flex gap-4 rounded-xl border border-white/[0.06] bg-ink-800 p-5 transition-all hover:border-gold/20"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                          <Icon size={22} className="text-gold" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-cream">
                            {t(`types.${i}.title`)}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-silver">
                            {t(`types.${i}.desc`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold px-6 py-14 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                {t('ctaTitle')}
              </h2>
              <p className="mt-2 text-sm text-white/80">
                {t('ctaText')}
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
