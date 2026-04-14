import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { faqData } from '@/data/faq';
import FAQPageClient from './FAQPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Sıkça Sorulan Sorular (SSS)',
    description:
      'SIM Baskı Malzemeleri hakkında sıkça sorulan sorular. Ofset mürekkep, özel renk üretimi, teslimat ve teknik destek bilgileri.',
  },
  en: {
    title: 'Frequently Asked Questions',
    description:
      'FAQ about SIM Printing Supplies. Learn about offset ink, custom color production, delivery and technical support.',
  },
  ru: {
    title: 'Часто задаваемые вопросы',
    description:
      'Часто задаваемые вопросы о SIM. Офсетные краски, производство спеццветов, доставка и техподдержка.',
  },
  ar: {
    title: 'الأسئلة الشائعة',
    description:
      'الأسئلة الشائعة حول SIM. أحبار الأوفست، إنتاج الألوان المخصصة، التسليم والدعم الفني.',
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
    path: '/sss',
    title: m.title,
    description: m.description,
    keywords: [
      'sıkça sorulan sorular',
      'matbaa malzemeleri sss',
      'ofset mürekkep bilgi',
      'özel renk üretimi nasıl',
      'baskı malzemeleri destek',
    ],
  });
}

function FAQPageJsonLd({ locale }: { locale: string }) {
  const items = faqData[locale] || faqData.tr;
  // JSON-LD structured data for FAQPage schema - safe static content
  const jsonLdString = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = faqData[locale] || faqData.tr;

  return (
    <>
      <FAQPageJsonLd locale={locale} />
      <FAQPageClient items={items} />
    </>
  );
}
