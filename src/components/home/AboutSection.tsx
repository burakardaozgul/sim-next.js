'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('about');
  const tStats = useTranslations('stats');

  const stats = [
    { value: tStats('capacity'), label: tStats('capacityLabel') },
    { value: tStats('since'), label: tStats('sinceLabel') },
    { value: tStats('brands'), label: tStats('brandsLabel') },
    { value: tStats('service'), label: tStats('serviceLabel') },
  ];

  return (
    <section className="border-t border-white/[0.06] bg-ink-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="https://www.simlimited.net/wp-content/uploads/2022/05/DSC07958.jpg"
                alt="SIM Baskı Malzemeleri"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl border border-gold/20" />
          </div>

          {/* Content */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('tag')}
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-cream md:text-4xl">
              {t('title').replace('\\n', ' ')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-silver">
              {t('body')}
            </p>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-ink-800 px-3 py-3 text-center">
                  <p className="font-heading text-lg font-bold text-gold">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-silver/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/hakkimizda"
              className="group mt-8 inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
            >
              {t('cta')}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
