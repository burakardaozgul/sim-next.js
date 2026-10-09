import NextLink from 'next/link';
import { parseInlineLinks } from '@/lib/inline-links';

/**
 * "[etiket](/yol)" satır içi linklerini render eder. Sunucu ve istemci bileşenlerinde kullanılabilir.
 * İç yollar sunucuda `localizeInlineLinks` ile önceden yerelleştirilmiş olmalıdır (önek + dil slug'ı).
 */
export default function InlineText({ text, className }: { text?: string; className?: string }) {
  const parts = parseInlineLinks(text || '');
  const linkClass =
    className ?? 'text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold';
  return (
    <>
      {parts.map((part, i) =>
        part.href ? (
          part.href.startsWith('/') ? (
            <NextLink key={i} href={part.href} className={linkClass}>
              {part.text}
            </NextLink>
          ) : (
            <a key={i} href={part.href} target="_blank" rel="noopener" className={linkClass}>
              {part.text}
            </a>
          )
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
