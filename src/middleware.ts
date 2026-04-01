import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { locales, defaultLocale, type Locale } from './i18n/config';
import { countryToLocale } from './lib/geo-locale';
import { LOCALE_COOKIE_NAME } from './lib/locale-cookie';

export default function middleware(request: NextRequest) {
  // 1. Kullanıcı elle dil seçtiyse, o tercihi kullan
  const userPreference = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (userPreference && locales.includes(userPreference as Locale)) {
    const intlMiddleware = createMiddleware({
      ...routing,
      defaultLocale: userPreference as Locale,
    });
    return intlMiddleware(request);
  }

  // 2. GeoIP: CloudFront-Viewer-Country header'ından ülke kodu oku
  const country = request.headers.get('CloudFront-Viewer-Country');
  const effectiveLocale = country ? countryToLocale(country) : defaultLocale;

  const intlMiddleware = createMiddleware({
    ...routing,
    defaultLocale: effectiveLocale,
  });
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
