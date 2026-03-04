import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Syne, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { locales, defaultLocale, rtlLocales, type Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import CookieConsent from '@/components/layout/CookieConsent';
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
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SIM Baskı Malzemeleri | Matbaa Malzemeleri & Ofset Mürekkep',
    template: '%s | SIM Baskı Malzemeleri',
  },
  description:
    'SIM Baskı Malzemeleri - Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, özel renk üretimi, blanket ve baskı kimyasalları. 1983\'ten beri matbaa sektöründe.',
  keywords: [
    'matbaa malzemeleri',
    'baskı malzemeleri',
    'ofset mürekkep',
    'matbaa mürekkebi',
    'yaldız mürekkep',
    'metalik mürekkep',
    'UV mürekkep',
    'PANTONE mürekkep',
    'özel renk üretimi',
    'baskı kimyasalları',
    'offset blanket',
    'dispersiyon lak',
    'matbaa malzemeleri istanbul',
    'baskı malzemeleri tedarikçisi',
    'SAKATA INX Türkiye',
    'EVA COLOR mürekkep',
    'SIM Baskı Malzemeleri',
  ],
  authors: [{ name: 'SIM Baskı Malzemeleri' }],
  creator: 'SIM Baskı Malzemeleri',
  publisher: 'SIM Baskı Malzemeleri',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'SIM Baskı Malzemeleri',
    locale: 'tr_TR',
    url: BASE_URL,
    title: 'SIM Baskı Malzemeleri | Matbaa Malzemeleri & Ofset Mürekkep',
    description:
      'Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız, UV mürekkep, özel renk üretimi ve baskı kimyasalları.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SIM Baskı Malzemeleri - Matbaa Malzemeleri & Ofset Mürekkep',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIM Baskı Malzemeleri | Matbaa Malzemeleri & Ofset Mürekkep',
    description:
      'Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız, UV mürekkep ve baskı kimyasalları.',
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
    canonical: BASE_URL,
    languages: {
      'tr': BASE_URL,
      'en': `${BASE_URL}/en`,
      'ru': `${BASE_URL}/ru`,
      'ar': `${BASE_URL}/ar`,
      'x-default': BASE_URL,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                            */
/* ------------------------------------------------------------------ */
function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SIM Baskı Malzemeleri',
    alternateName: 'SIM Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/wp-content/uploads/2022/05/sim-baski-malzemeleri.png`,
    description:
      'Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, özel renk üretimi ve baskı kimyasalları.',
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
      telephone: '+90-212-637-62-49',
      contactType: 'customer service',
      email: 'info@simlimited.net',
      availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
    },
    sameAs: [BASE_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'SIM Baskı Malzemeleri',
    image: `${BASE_URL}/wp-content/uploads/2022/05/sim-baski-malzemeleri.png`,
    url: BASE_URL,
    telephone: '+90-212-637-62-49',
    email: 'info@simlimited.net',
    description:
      'Matbaa malzemeleri, ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, özel renk üretimi, offset blanket ve baskı kimyasalları tedarikçisi.',
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
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
