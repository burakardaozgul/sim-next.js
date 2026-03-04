'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
      // Trigger CSS transition after mount
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    setTimeout(() => setVisible(false), 400);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

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
            onClick={handleDecline}
            className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-silver transition-all hover:border-white/20 hover:text-cream"
          >
            {t('decline')}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold-light"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
