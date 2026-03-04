import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { createPageMetadata } from '@/lib/seo';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Özel Renk Üretimi - 7/24 Renk Eşleştirme Laboratuvarı',
    description:
      'SIM Baskı Malzemeleri özel renk üretimi. 7/24 hizmet veren renk eşleştirme laboratuvarımız ile UV ve konvansiyonel mürekkepler için istediğiniz rengi üretiyoruz. Aylık 15.000 kg üretim kapasitesi.',
  },
  en: {
    title: 'Custom Color Production - 24/7 Color Matching Lab',
    description:
      'SIM custom color production. 24/7 color matching laboratory for UV and conventional inks. 15,000 kg monthly production capacity.',
  },
  ru: {
    title: 'Производство специальных цветов - Лаборатория 24/7',
    description:
      'Производство специальных цветов SIM. Лаборатория подбора цветов 24/7 для УФ и обычных красок.',
  },
  ar: {
    title: 'إنتاج الألوان المخصصة - مختبر مطابقة الألوان 24/7',
    description:
      'إنتاج الألوان المخصصة من SIM. مختبر مطابقة الألوان يعمل على مدار الساعة.',
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
    path: '/ozel-renk-uretimi',
    title: m.title,
    description: m.description,
    keywords: [
      'özel renk üretimi',
      'renk eşleştirme',
      'pantone renk',
      'mürekkep formülasyonu',
      'özel mürekkep üretimi',
    ],
  });
}

export default function CustomColorPage() {
  const t = useTranslations('process');

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="font-display text-4xl font-bold">{t('title')}</h1>
      <p className="text-silver mt-4">{t('subtitle')}</p>
    </main>
  );
}
