import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { locales, defaultLocale, type Locale } from './i18n/config';
import { LOCALE_COOKIE_NAME } from './lib/locale-cookie';

// Statik routing: prefix'siz URL'ler HER ZAMAN Türkçe içerik döner.
// Geo/çereze göre aynı URL'de farklı dil sunmak, ABD'den tarayan Googlebot'un
// TR-canonical sayfalarda İngilizce içerik görmesine yol açıyordu (cloaking sinyali).
const intlMiddleware = createMiddleware(routing);
const DEFAULT_PREFIX = `/${defaultLocale}`;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Varsayılan dilin önekli URL'leri (/tr, /tr/...) kanonik değil. next-intl bunları
  // geçici (307) yönlendirir; Google'ın kopya URL'leri bırakması için kalıcı 308 gerekir.
  if (pathname === DEFAULT_PREFIX || pathname.startsWith(`${DEFAULT_PREFIX}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_PREFIX.length) || '/';
    return NextResponse.redirect(url, 308);
  }

  // Dili elle seçmiş kullanıcıyı yalnızca ana sayfada kendi diline yönlendir.
  // Botlar çerez taşımadığı için bu yönlendirmeyi hiç görmez; diğer tüm
  // URL'lerde içerik URL'nin dilinde sabittir.
  if (pathname === '/') {
    const preference = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    if (
      preference &&
      preference !== defaultLocale &&
      locales.includes(preference as Locale)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preference}`;
      return NextResponse.redirect(url, 302);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
