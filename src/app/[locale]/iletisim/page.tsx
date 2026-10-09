import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';
import { setRequestLocale } from 'next-intl/server';
import { contactPageJsonLd, jsonLdScriptProps } from '@/lib/schema';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'İletişim - Bize Ulaşın',
    description:
      'SIM Baskı Malzemeleri iletişim. Matbaa malzemeleri, ofset mürekkep siparişi ve fiyat teklifi için bize ulaşın. Beylikdüzü, İstanbul.',
  },
  en: {
    title: 'Contact Us',
    description:
      'Contact SIM Printing Supplies. Reach us for printing materials, offset ink orders and price quotes. Istanbul, Turkey.',
  },
  ru: {
    title: 'Контакты',
    description:
      'Свяжитесь с SIM. Заказы на полиграфические материалы и офсетные краски. Бейликдюзю, Стамбул.',
  },
  ar: {
    title: 'اتصل بنا',
    description:
      'تواصل مع SIM. للطلبات والأسعار لمواد الطباعة وأحبار الأوفست. اسطنبول، تركيا.',
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
    path: '/iletisim',
    title: m.title,
    description: m.description,
    keywords: [
      'matbaa malzemeleri sipariş',
      'baskı malzemeleri fiyat',
      'ofset mürekkep sipariş',
      'matbaa malzemeleri istanbul',
    ],
  });
}

function ContactPageJsonLd({ locale }: { locale: string }) {
  return <script {...jsonLdScriptProps(contactPageJsonLd(locale))} />;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ContactPageJsonLd locale={locale} />
      <ContactPageClient />
    </>
  );
}
