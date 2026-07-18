'use client';

import { useState, useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { setLocalePreference } from '@/lib/locale-cookie';

const DISMISS_KEY = 'locale-suggest-dismissed';

/**
 * Tarayıcı dili TR olmayan ziyaretçilere kendi dillerini ÖNERİR.
 * Sunucu tarafında geo/çereze göre aynı URL'de farklı içerik sunmak yerine
 * (Googlebot'un TR sayfalarda İngilizce görmesine yol açıyordu) istemci
 * tarafında yönlendirme teklif eder — botlar bunu hiç görmez.
 */
const SUGGESTIONS: Record<string, { text: string; cta: string }> = {
  en: { text: 'This page is in Turkish.', cta: 'Continue in English' },
  ru: { text: 'Эта страница на турецком языке.', cta: 'Продолжить на русском' },
  ar: { text: 'هذه الصفحة باللغة التركية.', cta: 'المتابعة بالعربية' },
};

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSuggestionSnapshot(): string | null {
  if (localStorage.getItem(DISMISS_KEY)) return null;
  if (document.cookie.includes('USER_LOCALE_PREFERENCE=')) return null;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of langs) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'tr') return null;
    if (code in SUGGESTIONS) return code;
  }
  return null;
}

function getServerSnapshot(): string | null {
  return null;
}

export default function LocaleSuggestBanner() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const suggest = useSyncExternalStore(
    subscribeToStorage,
    getSuggestionSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  if (locale !== 'tr' || !suggest || dismissed) return null;
  const s = SUGGESTIONS[suggest];

  const slug = params?.slug as string | undefined;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const href = slug
    ? { pathname: pathname as any, params: { slug } }
    : { pathname: pathname as any };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 border-b border-gold/20 bg-ink-800/95 px-4 py-2 text-xs backdrop-blur-md sm:text-sm lg:pl-[260px]">
      <span className="text-silver">{s.text}</span>
      <Link
        href={href}
        locale={suggest}
        onClick={() => setLocalePreference(suggest)}
        className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light"
      >
        {s.cta}
      </Link>
      <button
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, '1');
          setDismissed(true);
        }}
        aria-label="Dismiss"
        className="ml-1 text-silver/60 hover:text-cream"
      >
        <X size={14} />
      </button>
    </div>
  );
}
