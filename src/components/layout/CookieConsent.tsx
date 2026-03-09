'use client';

import { useState, useSyncExternalStore, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'cookie-consent';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getConsentSnapshot(): string | null {
  if (typeof window === 'undefined') return 'pending';
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return 'pending';
}

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const consent = useSyncExternalStore(subscribeToStorage, getConsentSnapshot, getServerSnapshot);
  const [show, setShow] = useState(true);

  const dismiss = useCallback((decision: string) => {
    localStorage.setItem(STORAGE_KEY, decision);
    setShow(false);
  }, []);

  // Already consented or transitioning out
  if (consent !== null) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.06] bg-ink-900/95 px-6 py-5 backdrop-blur-md transition-all duration-400 lg:px-10 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm leading-relaxed text-silver">
            {t('message')}{' '}
            <Link
              href="/gizlilik-politikasi"
              className="font-medium text-gold underline-offset-2 hover:underline"
            >
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => dismiss('declined')}
            className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-silver transition-all hover:border-white/20 hover:text-cream"
          >
            {t('decline')}
          </button>
          <button
            onClick={() => dismiss('accepted')}
            className="rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
