import { routing } from '@/i18n/routing';

type PathnameEntry = string | Record<string, string>;

function translateBase(internalBase: string, locale: string): string {
  const entry = (routing.pathnames as Record<string, PathnameEntry>)[internalBase];
  if (!entry) return internalBase;
  return typeof entry === 'string' ? entry : entry[locale] ?? entry.tr ?? internalBase;
}

/**
 * Dil değiştirici için hedef dilin URL'si.
 * - `internalPathname`: next-intl `usePathname()` çıktısı (iç yol: `/urunler/[slug]` veya `/urunler/<slug>`).
 * - `slug`: dinamik sayfalarda mevcut slug; `localeSlugs` varsa hedef dilin kendi slug'ı kullanılır,
 *   yoksa mevcut slug korunur (sunucu 308 ile doğru slug'a yönlendirir).
 * Varsayılan dil (tr) hiçbir zaman önek almaz; `/tr/...` üretilmez.
 */
export function localeSwitchHref(
  internalPathname: string,
  locale: string,
  slug?: string,
  localeSlugs?: Record<string, string> | null,
): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

  if (slug) {
    const base = internalPathname.slice(0, internalPathname.lastIndexOf('/')) || '/';
    const targetSlug = localeSlugs?.[locale] ?? slug;
    return `${prefix}${translateBase(base, locale)}/${targetSlug}`;
  }

  const translated = translateBase(internalPathname, locale);
  return `${prefix}${translated === '/' ? '' : translated}` || '/';
}
