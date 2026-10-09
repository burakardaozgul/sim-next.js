import { routing } from '@/i18n/routing';
import { localizedStaticPath, localizedProductPath, localizedBlogPath } from '@/lib/paths';

const LINK_RE = /\]\((\/[^)\s]*)\)/g;

/**
 * Blog gövdesindeki iç linkleri ("](/urunler/<tr-slug>)", "](/blog/<slug>)", "](/sss)") sayfa diline çevirir:
 * önek + yerelleştirilmiş yol + dilin kendi slug'ı. Sunucu tarafında, içerik istemciye geçirilmeden önce çalışır.
 */
export function localizeInlineLinks(text: string, locale: string): string {
  return text.replace(LINK_RE, (_m, path: string) => {
    const product = path.match(/^\/urunler\/([^/]+)$/);
    if (product) return `](${localizedProductPath(product[1], locale)})`;
    const post = path.match(/^\/blog\/([^/]+)$/);
    if (post) return `](${localizedBlogPath(post[1], locale)})`;
    if (path in routing.pathnames) return `](${localizedStaticPath(path as keyof typeof routing.pathnames, locale)})`;
    return `](${path})`;
  });
}
