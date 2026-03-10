import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import FAQPageClient from './FAQPageClient';

const META: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Sıkça Sorulan Sorular - Matbaa Malzemeleri Hakkında',
    description:
      'SIM Baskı Malzemeleri hakkında sıkça sorulan sorular. Ofset mürekkep, özel renk üretimi, teslimat, teknik destek ve daha fazlası hakkında bilgi alın.',
  },
  en: {
    title: 'FAQ - Frequently Asked Questions About Printing Supplies',
    description:
      'Frequently asked questions about SIM Printing Supplies. Learn about offset ink, custom color production, delivery, technical support, and more.',
  },
  ru: {
    title: 'Часто задаваемые вопросы о полиграфических материалах',
    description:
      'Часто задаваемые вопросы о SIM. Узнайте об офсетных красках, производстве специальных цветов, доставке и технической поддержке.',
  },
  ar: {
    title: 'الأسئلة الشائعة - حول مستلزمات الطباعة',
    description:
      'الأسئلة الشائعة حول SIM. تعرف على أحبار الأوفست وإنتاج الألوان المخصصة والتسليم والدعم الفني.',
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

const faqData = [
  {
    q: 'Hangi tür mürekkepler tedarik ediyorsunuz?',
    a: 'Ofset mürekkep (CMYK), metalik/yaldız mürekkep, UV mürekkep, PANTONE mürekkep, florasan mürekkep ve özel renk mürekkepler tedarik ve üretim yapıyoruz. SAKATA INX, DEERS (DAIHAN) ve EVAcolor markalarımız ile geniş bir ürün yelpazesi sunuyoruz.',
  },
  {
    q: 'Özel renk üretimi nasıl yapılıyor?',
    a: 'Özel renk üretimimiz 4 aşamadan oluşur: Önce referans renginizi alıyoruz. Sonra L-A-B dijital formülasyon ile mürekkep reçetesi oluşturuyoruz. Farklı kağıt ve gramajlarda numune baskı yapıyoruz ve onayınızın ardından seri üretime geçiyoruz.',
  },
  {
    q: 'Minimum sipariş miktarı nedir?',
    a: 'Özel renk üretiminde minimum sipariş miktarımız ürün tipine göre değişmektedir. Detaylı bilgi için satış ekibimizle iletişime geçebilirsiniz.',
  },
  {
    q: 'Teslimat süreniz ne kadardır?',
    a: 'Stok ürünlerde aynı gün veya ertesi gün teslimat yapabiliyoruz. Özel renk üretimlerinde numune onayından sonra genellikle 1-3 iş günü içinde teslimat sağlıyoruz.',
  },
  {
    q: 'Teknik destek sağlıyor musunuz?',
    a: 'Evet, deneyimli teknik ekibimiz matbaanızda karşılaşılan teknik sorunlara yerinde müdahale edebilmektedir. Mürekkep ayarları, renk kalibrasyonu ve baskı optimizasyonu konularında ücretsiz danışmanlık hizmeti sunuyoruz.',
  },
  {
    q: 'Hangi markalarla çalışıyorsunuz?',
    a: 'SAKATA INX (Japonya), DEERS/DAIHAN (Güney Kore), Hi-Tech Coatings (Hollanda), Zeller+Gmelin (Almanya), Baltink (Litvanya) ve Stahl (Hollanda) markalarının Türkiye distribütörüyüz. Ayrıca EVAcolor ve VECTOR kendi markalarımızdır.',
  },
];

function FAQPageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd />
      <FAQPageClient />
    </>
  );
}
