import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import CustomColorPageClient from './CustomColorPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Özel Renk Üretimi',
    description:
      '7/24 renk eşleştirme laboratuvarı. UV ve konvansiyonel mürekkepler için özel renk üretimi. Aylık 15.000 kg kapasite.',
  },
  en: {
    title: 'Custom Color Production',
    description:
      '24/7 color matching laboratory for UV and conventional inks. Custom color production with 15,000 kg monthly capacity.',
  },
  ru: {
    title: 'Производство спеццветов',
    description:
      'Лаборатория подбора цветов 24/7. Производство специальных цветов для УФ и обычных красок. 15 000 кг/мес.',
  },
  ar: {
    title: 'إنتاج الألوان المخصصة',
    description:
      'مختبر مطابقة الألوان يعمل على مدار الساعة. إنتاج ألوان مخصصة لأحبار UV والتقليدية.',
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
  return <CustomColorPageClient />;
}
