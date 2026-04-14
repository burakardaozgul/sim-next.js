import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const BASE_URL = 'https://www.simlimited.net';

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: "Matbaa Malzemeleri: Kapsamlı Rehber ve Ürünler | SIM",
    description:
      "Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, baskı blanket ve kimyasallarında Türkiye'nin güvenilir tedarikçisi. 1983'ten beri sektörde.",
    keywords: [
      'matbaa malzemeleri', 'ofset mürekkep', 'yaldız mürekkep', 'UV mürekkep',
      'baskı blanket', 'baskı kimyasalları', 'PANTONE mürekkep', 'metalik mürekkep',
      'matbaa malzemeleri tedarikçisi', 'baskı malzemeleri türkiye',
    ],
  },
  en: {
    title: 'Printing Materials: Comprehensive Guide & Products | SIM',
    description:
      "Turkey's trusted supplier for offset ink, metallic gold ink, UV ink, printing blankets and chemicals. In the industry since 1983.",
    keywords: [
      'printing materials', 'offset ink', 'metallic ink', 'UV ink',
      'printing blanket', 'printing chemicals', 'PANTONE ink', 'gold ink',
      'printing materials supplier', 'printing supplies Turkey',
    ],
  },
  ru: {
    title: 'Полиграфические Материалы: Полное Руководство | SIM',
    description:
      'Надёжный поставщик офсетных красок, металлических красок, УФ-красок, офсетных полотен и химикатов в Турции. В отрасли с 1983 года.',
    keywords: [
      'полиграфические материалы', 'офсетные краски', 'металлические краски',
      'УФ-краски', 'офсетные полотна', 'полиграфическая химия', 'краски PANTONE',
    ],
  },
  ar: {
    title: 'مواد الطباعة: دليل شامل ومنتجات | SIM',
    description:
      'المورد الموثوق لأحبار الأوفست والأحبار المعدنية وأحبار UV وبطانيات الطباعة والكيماويات في تركيا. في الصناعة منذ 1983.',
    keywords: [
      'مواد الطباعة', 'أحبار الأوفست', 'أحبار معدنية', 'أحبار UV',
      'بطانيات الطباعة', 'كيماويات الطباعة', 'أحبار بانتون',
    ],
  },
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

const PAGE_NAMES: Record<string, string> = {
  tr: 'Matbaa Malzemeleri', en: 'Printing Materials',
  ru: 'Полиграфические Материалы', ar: 'مواد الطباعة',
};

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri',
  en: '/printing-materials',
  ru: '/poligraficheskie-materialy',
  ar: '/mawad-altibaa',
};

const CATEGORY_KEYS = ['Offset', 'Metalic', 'UV', 'Pantone', 'Blanket', 'Chemicals'] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

const CATEGORY_SLUGS: Record<CategoryKey, string> = {
  Offset: 'sakata-inx-cmyk-ofset-murekkepleri',
  Metalic: 'eva-color-gold-metalik-murekkepler',
  UV: 'zeller-gmelin-uv-ofset-murekkepleri',
  Pantone: 'sakata-inx-pantone-murekkepler',
  Blanket: 'vector-baski-blanketleri',
  Chemicals: 'hi-tech-coatings-dispersiyon-vernik',
};

const CATEGORY_ICONS: Record<CategoryKey, string> = {
  Offset: '🖨',
  Metalic: '✨',
  UV: '💡',
  Pantone: '🎨',
  Blanket: '🔧',
  Chemicals: '🧪',
};

const VIEW_LABELS: Record<string, string> = {
  tr: 'İncele', en: 'View', ru: 'Смотреть', ar: 'عرض',
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
    path: '/matbaa-malzemeleri',
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  });
}

export default async function MatbaaMalzemeleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'matbaaMalzemeleri' });

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('description'),
    url: pageUrl,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
      },
    },
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

  const jsonLdWebPage = JSON.stringify(webPageJsonLd);
  const jsonLdBreadcrumb = JSON.stringify(breadcrumbJsonLd);
  const reasons = [1, 2, 3, 4, 5, 6] as const;
  const viewLabel = VIEW_LABELS[locale] || VIEW_LABELS.tr;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdWebPage }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />

      <main className="flex min-h-screen">
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">

          {/* Hero */}
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {t('subtitle')}
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver">
                {t('description')}
              </p>
            </div>
          </section>

          {/* Section 1 — What are printing materials */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section1Title')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('section1Text')}
              </p>
            </div>
          </section>

          {/* Section 2 — Product categories */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section2Title')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORY_KEYS.map((catKey) => (
                  <Link
                    key={catKey}
                    href={{ pathname: '/urunler/[slug]' as const, params: { slug: CATEGORY_SLUGS[catKey] } }}
                    className="group flex flex-col rounded-xl border border-white/[0.06] bg-ink-800 p-6 transition-all hover:border-gold/40 hover:bg-ink-700"
                  >
                    <span className="mb-3 text-3xl">{CATEGORY_ICONS[catKey]}</span>
                    <h3 className="font-heading text-lg font-semibold text-cream">
                      {t(`category${catKey}`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">
                      {t(`category${catKey}Desc`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all group-hover:gap-2">
                      {viewLabel}
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 — Why SIM */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section3Title')}
              </h2>
              <ul className="space-y-4">
                {reasons.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-base text-silver">{t(`reason${n}`)}</span>
                  </li>
                ))}
              </ul>
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
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                {t('ctaButton')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
