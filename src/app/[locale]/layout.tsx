import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Syne, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { locales, rtlLocales, type Locale } from '@/i18n/config';
import type { Metadata, Viewport } from 'next';
import {
  BRAND_NAMES,
  BASE_KEYWORDS,
  OG_LOCALES,
  LAYOUT_DESCRIPTIONS,
  LAYOUT_TITLES,
  getCanonicalUrl,
  getAlternateLanguages,
} from '@/lib/seo';
import CookieConsent from '@/components/layout/CookieConsent';
import LocaleSuggestBanner from '@/components/layout/LocaleSuggestBanner';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Analytics from '@/components/layout/Analytics';
import '../globals.css';
import { organizationJsonLd, localBusinessJsonLd, webSiteJsonLd, jsonLdScriptProps } from '@/lib/schema';

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
/*  JSON-LD Structured Data — tek entity grafı (src/lib/schema.ts)      */
/* ------------------------------------------------------------------ */
function OrganizationJsonLd({ locale }: { locale: string }) {
  return <script {...jsonLdScriptProps(organizationJsonLd(locale))} />;
}

function LocalBusinessJsonLd({ locale }: { locale: string }) {
  return <script {...jsonLdScriptProps(localBusinessJsonLd(locale))} />;
}

function WebSiteJsonLd() {
  return <script {...jsonLdScriptProps(webSiteJsonLd())} />;
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
  setRequestLocale(locale);

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages({ locale });
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
        <WebSiteJsonLd />
        <Analytics gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <LocaleSuggestBanner />
          <MobileBottomNav />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
