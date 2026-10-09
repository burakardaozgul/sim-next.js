import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

/**
 * Kök 404: [locale] segmentine girmeyen bilinmeyen URL'ler için (ör. /bilinmeyen).
 * Kök layout <html> üretmediği için tam belge burada verilir.
 */
export const metadata: Metadata = {
  title: { absolute: 'Sayfa Bulunamadı (404) | SIM Baskı Malzemeleri' },
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <html lang="tr">
      <body className="bg-ink-900 text-cream antialiased">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">404</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Sayfa Bulunamadı</h1>
            <p className="mt-4 text-base text-silver">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. · The page you are looking for does not exist.
            </p>
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-label="SIM Baskı Malzemeleri">
              <Link href="/" className="bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink hover:bg-gold-light">Ana Sayfa</Link>
              <Link href="/urunler" className="border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:text-gold">Ürünler</Link>
              <Link href="/en" className="border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:text-gold">English</Link>
              <Link href="/iletisim" className="border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:text-gold">İletişim</Link>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
