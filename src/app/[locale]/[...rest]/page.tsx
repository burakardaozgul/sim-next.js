import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

/** Bilinmeyen yerelleştirilmiş URL'ler markalı 404'e ([locale]/not-found.tsx) düşer. */
export default async function CatchAllNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
