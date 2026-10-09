export type InlineSegment = { text: string; href?: string };

// URL'de bir seviye dengeli parantez desteklenir: [x](https://…/Offset_(printing))
const LINK_RE = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;

/** "[etiket](/yol)" biçimindeki satır içi linkleri parçalara ayırır; linksiz metin tek parça döner. */
export function parseInlineLinks(text: string): InlineSegment[] {
  const out: InlineSegment[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ text: text.slice(last, idx) });
    out.push({ text: m[1], href: m[2] });
    last = idx + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out.length ? out : [{ text }];
}

/** "[etiket](/yol)" → "etiket" (şema metinleri, meta açıklamaları için). */
export function inlineLinksToPlainText(text: string): string {
  return parseInlineLinks(text).map((p) => p.text).join('');
}
