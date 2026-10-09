import { buildLlmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/** AI motorları için üretilen llms-full.txt — kaynak: ürün/blog/sözlük/SSS veri dosyaları + organization.ts */
export async function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
