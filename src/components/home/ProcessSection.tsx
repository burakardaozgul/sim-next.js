'use client';

import { useTranslations } from 'next-intl';
import { Pipette, Printer, CheckCircle, Factory } from 'lucide-react';

const STEP_ICONS = [Pipette, Printer, CheckCircle, Factory];

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-ink-800 py-20 lg:py-28">
      {/* Subtle background pattern */}
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {t('subtitle')}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
            {t('title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {/* Connecting line (desktop) */}
          <div className="absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] hidden h-px bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40 md:block" />

          {[0, 1, 2, 3].map((i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={i} className="group relative flex flex-col items-center text-center">
                {/* Step number & icon */}
                <div className="relative mb-6">
                  <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-white/[0.08] bg-ink-900 transition-all duration-300 group-hover:border-gold/30 group-hover:shadow-[0_0_30px_rgba(196,146,42,0.1)]">
                    <Icon size={32} className="text-gold" strokeWidth={1.5} />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                    {t(`steps.${i}.number`)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-semibold text-cream">
                  {t(`steps.${i}.title`)}
                </h3>

                {/* Description */}
                <p className="max-w-[220px] text-sm leading-relaxed text-silver">
                  {t(`steps.${i}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
