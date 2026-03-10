'use client';

import { useTranslations } from 'next-intl';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';

export default function PrivacyPageClient() {
  const t = useTranslations('privacyPage');

  const sections = t.raw('sections') as { title: string; content: string }[];

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Hero */}
        <section className="bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-sm text-silver/60">
              {t('lastUpdated')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-4xl space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="mb-3 font-heading text-xl font-semibold text-cream">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-silver">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
