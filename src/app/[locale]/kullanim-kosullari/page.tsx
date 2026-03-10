import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import TermsPageClient from './TermsPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Kullanım Koşulları',
    description: 'SIM Baskı Malzemeleri web sitesi kullanım koşulları.',
  },
  en: {
    title: 'Terms of Use',
    description: 'SIM Printing Supplies website terms of use.',
  },
  ru: {
    title: 'Условия использования',
    description: 'Условия использования сайта SIM.',
  },
  ar: {
    title: 'شروط الاستخدام',
    description: 'شروط استخدام موقع SIM.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.tr;

  return createPageMetadata({
    locale,
    path: '/kullanim-kosullari',
    title: m.title,
    description: m.description,
    noIndex: true,
  });
}

export default function TermsOfUsePage() {
  return <TermsPageClient />;
}
