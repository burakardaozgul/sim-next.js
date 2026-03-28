import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Syne, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { locales, rtlLocales, type Locale } from '@/i18n/config';
import type { Metadata, Viewport } from 'next';
import {
  BRAND_NAMES,
  BASE_KEYWORDS,
  OG_LOCALES,
  ORG_DESCRIPTIONS,
  LOCAL_BIZ_DESCRIPTIONS,
  LAYOUT_DESCRIPTIONS,
  LAYOUT_TITLES,
  getCanonicalUrl,
  getAlternateLanguages,
} from '@/lib/seo';
import CookieConsent from '@/components/layout/CookieConsent';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = 'https://www.simlimited.net';

/* ------------------------------------------------------------------ */
/*  Default metadata shared by every page                              */
/* ------------------------------------------------------------------ */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080C14',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const brandName = BRAND_NAMES[locale] || BRAND_NAMES.tr;
  const description = LAYOUT_DESCRIPTIONS[locale] || LAYOUT_DESCRIPTIONS.tr;
  const defaultTitle = LAYOUT_TITLES[locale] || LAYOUT_TITLES.tr;
  const canonical = getCanonicalUrl(locale, '/');
  const alternates = getAlternateLanguages('/');

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: defaultTitle,
      template: `%s | ${brandName}`,
    },
    description,
    keywords: BASE_KEYWORDS[locale] || BASE_KEYWORDS.tr,
    authors: [{ name: brandName }],
    creator: brandName,
    publisher: brandName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: brandName,
      locale: OG_LOCALES[locale] || 'tr_TR',
      url: canonical,
      title: defaultTitle,
      description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${brandName} - Offset Ink & Printing`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      languages: alternates,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                            */
/* ------------------------------------------------------------------ */
function OrganizationJsonLd({ locale }: { locale: string }) {
  const brandName = BRAND_NAMES[locale] || BRAND_NAMES.tr;
  const orgDescription = ORG_DESCRIPTIONS[locale] || ORG_DESCRIPTIONS.tr;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandName,
    alternateName: 'SIM Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
    description: orgDescription,
    inLanguage: locale,
    foundingDate: '1983',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yakuplu, 194. Sk. No:1 D:176',
      addressLocality: 'Beylikdüzü',
      addressRegion: 'İstanbul',
      postalCode: '34000',
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+902126376249',
      contactType: 'customer service',
      email: 'info@simlimited.net',
      availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify of static data — safe, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function LocalBusinessJsonLd({ locale }: { locale: string }) {
  const brandName = BRAND_NAMES[locale] || BRAND_NAMES.tr;
  const bizDescription = LOCAL_BIZ_DESCRIPTIONS[locale] || LOCAL_BIZ_DESCRIPTIONS.tr;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: brandName,
    image: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
    url: BASE_URL,
    telephone: '+902126376249',
    email: 'info@simlimited.net',
    description: bizDescription,
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yakuplu, 194. Sk. No:1 D:176',
      addressLocality: 'Beylikdüzü',
      addressRegion: 'İstanbul',
      postalCode: '34000',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9835,
      longitude: 28.6285,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify of static data — safe, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Layout Component                                                   */
/* ------------------------------------------------------------------ */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${cormorant.variable} ${syne.variable} ${dmSans.variable} ${notoSansArabic.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <OrganizationJsonLd locale={locale} />
        <LocalBusinessJsonLd locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <MobileBottomNav />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
