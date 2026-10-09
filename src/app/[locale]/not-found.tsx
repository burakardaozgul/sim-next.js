import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: { absolute: 'Sayfa Bulunamadı (404) | SIM Baskı Malzemeleri' },
  robots: { index: false, follow: true },
};

const STRINGS: Record<string, { title: string; desc: string; home: string; contact: string; products: string }> = {
  tr: { title: 'Sayfa Bulunamadı', desc: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.', home: 'Ana Sayfa', contact: 'İletişim', products: 'Ürünler' },
  en: { title: 'Page Not Found', desc: 'The page you are looking for does not exist or may have moved.', home: 'Home', contact: 'Contact', products: 'Products' },
  ru: { title: 'Страница не найдена', desc: 'Запрошенная страница не существует или была перемещена.', home: 'Главная', contact: 'Контакты', products: 'Продукция' },
  ar: { title: 'الصفحة غير موجودة', desc: 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.', home: 'الرئيسية', contact: 'اتصل بنا', products: 'المنتجات' },
};

export default async function NotFound() {
  const locale = await getLocale();
  const t = STRINGS[locale] ?? STRINGS.tr;
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-900 px-6">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-base text-silver">{t.desc}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-all hover:bg-gold-light"
          >
            {t.home}
          </Link>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold/30 hover:text-gold"
          >
            {t.products}
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold/30 hover:text-gold"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </main>
  );
}
