import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { glossaryTerms } from '@/data/glossary';

const BASE_URL = 'https://www.simlimited.net';

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: 'Matbaa Terimleri Sözlüğü: 50+ Baskı Kavramı | SIM',
    description:
      'Ofset baskı, CMYK, renk yönetimi, prepress ve bitirme işlemlerinde kullanılan matbaa terimlerinin kapsamlı sözlüğü. Türkçe, İngilizce, Rusça ve Arapça tanımlar.',
    keywords: [
      'matbaa terimleri', 'baskı terimleri sözlüğü', 'ofset baskı terimleri',
      'CMYK nedir', 'renk yönetimi', 'prepress terimleri', 'dot gain nedir',
      'trapping nedir', 'ICC profil', 'matbaa sözlüğü',
    ],
  },
  en: {
    title: 'Printing Glossary: 50+ Terms Explained | SIM',
    description:
      'Comprehensive glossary of printing terms covering offset printing, CMYK, color management, prepress, and finishing. Definitions in Turkish, English, Russian, and Arabic.',
    keywords: [
      'printing glossary', 'printing terminology', 'offset printing terms',
      'what is CMYK', 'color management glossary', 'prepress terms',
      'dot gain definition', 'trapping printing', 'ICC profile printing',
    ],
  },
  ru: {
    title: 'Глоссарий полиграфии: 50+ терминов | SIM',
    description:
      'Подробный глоссарий полиграфических терминов: офсетная печать, CMYK, управление цветом, допечатная подготовка и отделка. Определения на турецком, английском, русском и арабском.',
    keywords: [
      'глоссарий полиграфии', 'термины полиграфии', 'офсетная печать термины',
      'что такое CMYK', 'управление цветом', 'допечатные термины',
    ],
  },
  ar: {
    title: 'مصطلحات الطباعة: أكثر من 50 مصطلحاً | SIM',
    description:
      'قاموس شامل لمصطلحات الطباعة يغطي الطباعة الأوفست وCMYK وإدارة الألوان وما قبل الطباعة والتشطيب. تعريفات بالتركية والإنجليزية والروسية والعربية.',
    keywords: [
      'مصطلحات الطباعة', 'قاموس الطباعة', 'مصطلحات الأوفست',
      'ما هو CMYK', 'إدارة الألوان', 'مصطلحات ما قبل الطباعة',
    ],
  },
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

const PAGE_NAMES: Record<string, string> = {
  tr: 'Matbaa Terimleri Sözlüğü',
  en: 'Printing Glossary',
  ru: 'Глоссарий полиграфии',
  ar: 'مصطلحات الطباعة',
};

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/matbaa-terimleri-sozlugu',
  en: '/printing-glossary',
  ru: '/glossarij-poligrafii',
  ar: '/mustalahaat-altibaa',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.tr;

  return createPageMetadata({
    locale,
    path: '/matbaa-terimleri-sozlugu',
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  });
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'glossary' });

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  // Build DefinedTermSet JSON-LD
  const definedTermSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: t('title'),
    description: t('subtitle'),
    url: pageUrl,
    inLanguage: locale,
    hasDefinedTerm: glossaryTerms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term[locale] || item.term.tr,
      description: item.definition[locale] || item.definition.tr,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_NAMES[locale] || HOME_NAMES.tr,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: PAGE_NAMES[locale] || PAGE_NAMES.tr,
        item: pageUrl,
      },
    ],
  };

  // Build alphabetical groups
  const grouped: Record<string, typeof glossaryTerms> = {};
  for (const termItem of glossaryTerms) {
    const termName = termItem.term[locale] || termItem.term.tr;
    const firstChar = termName.charAt(0).toUpperCase();
    if (!grouped[firstChar]) grouped[firstChar] = [];
    grouped[firstChar].push(termItem);
  }

  // Sort letters; put numeric/special chars at end
  const letters = Object.keys(grouped).sort((a, b) => {
    const aIsAlpha = /[A-ZÇĞIÖŞÜА-Я]/i.test(a);
    const bIsAlpha = /[A-ZÇĞIÖŞÜА-Я]/i.test(b);
    if (aIsAlpha && !bIsAlpha) return -1;
    if (!aIsAlpha && bIsAlpha) return 1;
    return a.localeCompare(b, locale);
  });

  // Sort terms within each group
  for (const letter of letters) {
    grouped[letter].sort((a, b) => {
      const aName = a.term[locale] || a.term.tr;
      const bName = b.term[locale] || b.term.tr;
      return aName.localeCompare(bName, locale);
    });
  }

  const isRtl = locale === 'ar';

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="flex min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">

          {/* Hero */}
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {BRAND_NAMES[locale] || BRAND_NAMES.tr}
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver">
                {t('subtitle')}
              </p>
            </div>
          </section>

          {/* Alphabetical letter navigation */}
          <nav
            aria-label="Glossary letter index"
            className="sticky top-0 z-10 border-b border-ink-600 bg-ink-800 px-6 py-3 lg:px-10"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap gap-1">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-ink-600 text-xs font-bold text-silver transition-colors hover:border-gold hover:text-gold"
                >
                  {letter}
                </a>
              ))}
            </div>
          </nav>

          {/* Terms list grouped by letter */}
          <section className="bg-ink-900 px-6 py-12 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-4xl space-y-12">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`}>
                  {/* Letter heading */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-heading text-4xl font-bold text-gold">{letter}</span>
                    <div className="flex-1 border-t border-ink-600" />
                  </div>

                  {/* Terms in this letter group */}
                  <dl className="space-y-4">
                    {grouped[letter].map((termItem) => {
                      const termName = termItem.term[locale] || termItem.term.tr;
                      const definition = termItem.definition[locale] || termItem.definition.tr;
                      return (
                        <div
                          key={termName}
                          className="rounded-lg border border-ink-600 bg-ink-800 px-5 py-4 transition-colors hover:border-gold/40"
                        >
                          <dt className="font-heading text-base font-bold text-cream">
                            {termName}
                          </dt>
                          <dd className="mt-1.5 text-sm leading-relaxed text-silver">
                            {definition}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
