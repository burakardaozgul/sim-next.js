import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-900 px-6">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
          Sayfa Bulunamadı
        </h1>
        <p className="mt-4 text-base text-silver">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold/30 hover:text-gold"
          >
            İletişim
          </Link>
        </div>
      </div>
    </main>
  );
}
