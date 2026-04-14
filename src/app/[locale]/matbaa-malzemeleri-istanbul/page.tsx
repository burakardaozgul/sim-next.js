import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

const BASE_URL = 'https://www.simlimited.net';

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: "İstanbul'da Matbaa Malzemeleri Tedarikçisi | SIM",
    description:
      "İstanbul Beylikdüzü merkezli SIM Baskı Malzemeleri'nden ofset mürekkep, metalik yaldız mürekkep, UV mürekkep ve baskı malzemeleri. Aynı gün teslimat.",
    keywords: [
      'matbaa malzemeleri istanbul', 'ofset mürekkep istanbul', 'baskı malzemeleri istanbul',
      'matbaa tedarikçisi istanbul', 'beylikdüzü matbaa', 'istanbul baskı malzemeleri',
      'matbaa malzemeleri beylikdüzü', 'ofset mürekkep tedarikçi istanbul',
    ],
  },
  en: {
    title: 'Printing Materials Supplier in Istanbul | SIM',
    description:
      'Offset ink, metallic gold ink, UV ink and printing materials from SIM Printing Supplies in Beylikdüzü, Istanbul. Same-day delivery across Istanbul.',
    keywords: [
      'printing materials Istanbul', 'offset ink Istanbul', 'printing supplier Istanbul',
      'Beylikdüzü printing', 'Istanbul printing materials', 'printing supplies Istanbul',
    ],
  },
  ru: {
    title: 'Поставщик Полиграфических Материалов в Стамбуле | SIM',
    description:
      'Офсетные краски, металлические краски, УФ-краски и полиграфические материалы от SIM в Бейликдюзю, Стамбул. Доставка в тот же день.',
    keywords: [
      'полиграфические материалы Стамбул', 'офсетные краски Стамбул',
      'поставщик печатных материалов Стамбул', 'Бейликдюзю типография',
    ],
  },
  ar: {
    title: 'مورد مواد الطباعة في إسطنبول | SIM',
    description:
      'أحبار أوفست وأحبار معدنية وأحبار UV ومواد طباعة من SIM في بيليكدوزو، إسطنبول. توصيل في نفس اليوم.',
    keywords: [
      'مواد الطباعة إسطنبول', 'أحبار أوفست إسطنبول', 'مورد مواد طباعة إسطنبول',
      'بيليكدوزو طباعة', 'مستلزمات طباعة إسطنبول',
    ],
  },
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

const PILLAR_NAMES: Record<string, string> = {
  tr: 'Matbaa Malzemeleri', en: 'Printing Materials',
  ru: 'Полиграфические Материалы', ar: 'مواد الطباعة',
};

const PAGE_NAMES: Record<string, string> = {
  tr: "İstanbul'da Matbaa Malzemeleri", en: 'Printing Materials in Istanbul',
  ru: 'Полиграфические Материалы в Стамбуле', ar: 'مواد الطباعة في إسطنبول',
};

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri-istanbul',
  en: '/printing-materials-istanbul',
  ru: '/tipografskie-materialy-stambul',
  ar: '/mawad-altibaa-istanbul',
};

const LOCALE_PILLAR_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri',
  en: '/printing-materials',
  ru: '/poligraficheskie-materialy',
  ar: '/mawad-altibaa',
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
    path: '/matbaa-malzemeleri-istanbul',
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  });
}

export default async function MatbaaMalzemeleriIstanbulPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'istanbulSeo' });

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pillarPath = LOCALE_PILLAR_PATHS[locale] || LOCALE_PILLAR_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const pillarUrl = locale === 'tr' ? `${BASE_URL}${pillarPath}` : `${BASE_URL}/${locale}${pillarPath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
    description: (META[locale] || META.tr).description,
    url: BASE_URL,
    telephone: '+90-212-637-62-49',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yakuplu, 194. Sk. No:1 D:176',
      addressLocality: 'Beylikdüzü',
      addressRegion: 'İstanbul',
      postalCode: '34524',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9835,
      longitude: 28.6285,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
    },
    sameAs: [BASE_URL],
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
        name: PILLAR_NAMES[locale] || PILLAR_NAMES.tr,
        item: pillarUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: PAGE_NAMES[locale] || PAGE_NAMES.tr,
        item: pageUrl,
      },
    ],
  };

  const jsonLdBusiness = JSON.stringify(localBusinessJsonLd);
  const jsonLdBreadcrumb = JSON.stringify(breadcrumbJsonLd);
  const services = [1, 2, 3, 4, 5] as const;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBusiness }} />
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
            </div>
          </section>

          {/* Intro */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('introTitle')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('introText')}
              </p>
            </div>
          </section>

          {/* Location info */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('locationTitle')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Adres' : locale === 'en' ? 'Address' : locale === 'ru' ? 'Адрес' : 'العنوان'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{t('address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <Phone size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Telefon' : locale === 'en' ? 'Phone' : locale === 'ru' ? 'Телефон' : 'الهاتف'}
                    </p>
                    <a
                      href={`tel:${t('phone').replace(/\s/g, '')}`}
                      className="mt-1 block text-sm text-silver transition-colors hover:text-gold"
                    >
                      {t('phone')}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <Clock size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Çalışma Saatleri' : locale === 'en' ? 'Working Hours' : locale === 'ru' ? 'Часы работы' : 'ساعات العمل'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{t('workingHours')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('servicesTitle')}
              </h2>
              <ul className="space-y-4">
                {services.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-base text-silver">{t(`service${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Istanbul */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('whyIstanbulTitle')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('whyIstanbulText')}
              </p>
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
                  href="tel:+902126376249"
                  className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream"
                >
                  {t('ctaButton')}
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  {locale === 'tr' ? 'İletişim Formu' : locale === 'en' ? 'Contact Form' : locale === 'ru' ? 'Форма связи' : 'نموذج الاتصال'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
