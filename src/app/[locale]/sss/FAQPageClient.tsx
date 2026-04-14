'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQPageClient({ items: faqItems }: { items: FAQItem[] }) {
  const t = useTranslations('faq');
  const tCta = useTranslations('cta');
  const tFooter = useTranslations('footer');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero */}
        <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('subtitle')}
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
              {t('title')}
            </h1>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all hover:border-gold/20"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-sm font-semibold text-cream">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-gold transition-transform duration-300 ${
                        openIndex === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-silver">
                        {item.answer}
                      </p>
                    </div>
                  </div>
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
