export type InlineSegment = { text: string; href?: string };

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

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
