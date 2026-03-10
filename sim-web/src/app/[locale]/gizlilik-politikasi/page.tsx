import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import PrivacyPageClient from './PrivacyPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Gizlilik ve Çerez Politikası',
    description:
      'SIM Baskı Malzemeleri gizlilik ve çerez politikası. KVKK kapsamında kişisel verilerin korunması hakkında bilgilendirme.',
  },
  en: {
    title: 'Privacy & Cookie Policy',
    description: 'SIM Printing Supplies privacy and cookie policy.',
  },
  ru: {
    title: 'Политика конфиденциальности',
    description: 'Политика конфиденциальности SIM.',
  },
  ar: {
    title: 'سياسة الخصوصية وملفات تعريف الارتباط',
    description: 'سياسة خصوصية SIM.',
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
    path: '/gizlilik-politikasi',
    title: m.title,
    description: m.description,
    noIndex: true,
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPageClient />;
}
