import { routing } from '@/i18n/routing';
import { getProductBySlug, getProductSlug } from '@/data/products';
import { getBlogPostBySlug, getBlogSlug } from '@/data/blog';

type StaticPathname = keyof typeof routing.pathnames;

function localePrefix(locale: string): string {
  return locale === routing.defaultLocale ? '' : `/${locale}`;
}

/** Statik bir rotanın (routing.pathnames anahtarı) dile göre yolu, önek dahil. */
export function localizedStaticPath(trPath: StaticPathname, locale: string): string {
  const entry = routing.pathnames[trPath] as string | Record<string, string>;
  const translated = typeof entry === 'string' ? entry : entry[locale] ?? entry.tr ?? trPath;
  const path = `${localePrefix(locale)}${translated === '/' ? '' : translated}`;
  return path || '/';
}

/** Ürün detay yolu; slug herhangi bir dilin slug'ı olabilir, hedef dilin slug'ına çevrilir. */
export function localizedProductPath(anySlug: string, locale: string): string {
  const product = getProductBySlug(anySlug);
  const slug = product ? getProductSlug(product, locale) : anySlug;
  return `${localizedStaticPath('/urunler', locale)}/${slug}`;
}

/** Blog yazısı yolu; slug herhangi bir dilin slug'ı olabilir. */
export function localizedBlogPath(anySlug: string, locale: string): string {
  const post = getBlogPostBySlug(anySlug);
  const slug = post ? getBlogSlug(post, locale) : anySlug;
  return `${localePrefix(locale)}/blog/${slug}`;
}
