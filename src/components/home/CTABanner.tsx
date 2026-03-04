'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  const t = useTranslations('cta');
  const tFooter = useTranslations('footer');

  return (
    <section className="bg-gold px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-white/80">
            {t('subtitle')}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${tFooter('phone')}`}
            className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream"
          >
            {t('call')}
          </a>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
          >
            {t('quote')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
