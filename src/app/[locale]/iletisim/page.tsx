import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'İletişim - Matbaa Malzemeleri için Bize Ulaşın',
    description:
      'SIM Baskı Malzemeleri ile iletişime geçin. Matbaa malzemeleri, ofset mürekkep, baskı malzemeleri siparişi ve fiyat teklifi için bize ulaşın. Beylikdüzü, İstanbul.',
  },
  en: {
    title: 'Contact Us - Get in Touch for Printing Supplies',
    description:
      'Contact SIM Printing Supplies. Reach us for printing materials, offset ink orders, and price quotes. Beylikduzu, Istanbul, Turkey.',
  },
  ru: {
    title: 'Контакты - Свяжитесь с нами',
    description:
      'Свяжитесь с SIM. Заказы на полиграфические материалы и офсетные краски. Бейликдюзю, Стамбул.',
  },
  ar: {
    title: 'اتصل بنا - تواصل معنا لمستلزمات الطباعة',
    description:
      'تواصل مع SIM. للطلبات والأسعار لمواد الطباعة وأحبار الأوفست.',
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

function ContactPageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'SIM Baskı Malzemeleri İletişim',
    url: 'https://www.simlimited.net/iletisim',
    mainEntity: {
      '@type': 'Organization',
      name: 'SIM Baskı Malzemeleri',
      url: 'https://www.simlimited.net',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+90-212-637-62-49',
          contactType: 'customer service',
          email: 'info@simlimited.net',
          availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
          areaServed: 'TR',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+90-212-637-62-49',
          contactType: 'sales',
          email: 'info@simlimited.net',
          availableLanguage: ['Turkish', 'English'],
          areaServed: 'TR',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Yakuplu, 194. Sk. No:1 D:176',
        addressLocality: 'Beylikdüzü',
        addressRegion: 'İstanbul',
        postalCode: '34000',
        addressCountry: 'TR',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <ContactPageClient />
    </>
  );
}
