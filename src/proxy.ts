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
      const redirect = NextResponse.redirect(url, 302);
      // Çereze bağlı yönlendirme asla CDN'de önbelleklenmesin (aksi hâlde çerezsiz
      // ziyaretçiler ve botlar da /en'e yönlenebilir). Statik / sayfası ayrıca önbelleklenir.
      redirect.headers.set('Cache-Control', 'private, no-store');
      redirect.headers.append('Vary', 'Cookie');
      return redirect;
    }
  }

  return permanent(intlMiddleware(request));
}

/**
 * next-intl'in yol/önek kanonikleştirme yönlendirmeleri (ör. /en/iletisim → /en/contact,
 * /products/x → /urunler/x) geçici 307 döner; bunlar kalıcı kanonikleştirmedir → 308.
 */
function permanent(response: NextResponse): NextResponse {
  if (response.status === 307) {
    const location = response.headers.get('location');
    if (location) return NextResponse.redirect(location, 308);
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
