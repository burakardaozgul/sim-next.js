import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
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

const faqData: Record<string, { q: string; a: string }[]> = {
  tr: [
    { q: 'Hangi tür mürekkepler tedarik ediyorsunuz?', a: 'Ofset mürekkep (CMYK), metalik/yaldız mürekkep, UV mürekkep, PANTONE mürekkep, florasan mürekkep ve özel renk mürekkepler tedarik ve üretim yapıyoruz. SAKATA INX, DEERS (DAIHAN) ve EVAcolor markalarımız ile geniş bir ürün yelpazesi sunuyoruz.' },
    { q: 'Özel renk üretimi nasıl yapılıyor?', a: 'Özel renk üretimimiz 4 aşamadan oluşur: Önce referans renginizi alıyoruz. Sonra L-A-B dijital formülasyon ile mürekkep reçetesi oluşturuyoruz. Farklı kağıt ve gramajlarda numune baskı yapıyoruz ve onayınızın ardından seri üretime geçiyoruz.' },
    { q: 'Minimum sipariş miktarı nedir?', a: 'Özel renk üretiminde minimum sipariş miktarımız ürün tipine göre değişmektedir. Detaylı bilgi için satış ekibimizle iletişime geçebilirsiniz.' },
    { q: 'Teslimat süreniz ne kadardır?', a: 'Stok ürünlerde aynı gün veya ertesi gün teslimat yapabiliyoruz. Özel renk üretimlerinde numune onayından sonra genellikle 1-3 iş günü içinde teslimat sağlıyoruz.' },
    { q: 'Teknik destek sağlıyor musunuz?', a: 'Evet, deneyimli teknik ekibimiz matbaanızda karşılaşılan teknik sorunlara yerinde müdahale edebilmektedir. Mürekkep ayarları, renk kalibrasyonu ve baskı optimizasyonu konularında ücretsiz danışmanlık hizmeti sunuyoruz.' },
    { q: 'Hangi markalarla çalışıyorsunuz?', a: 'SAKATA INX (Japonya), DEERS/DAIHAN (Güney Kore), Hi-Tech Coatings (Hollanda), Zeller+Gmelin (Almanya), Baltink (Litvanya) ve Stahl (Hollanda) markalarının Türkiye distribütörüyüz. Ayrıca EVAcolor ve VECTOR kendi markalarımızdır.' },
  ],
  en: [
    { q: 'What types of inks do you supply?', a: 'We supply and produce offset inks (CMYK), metallic/gold inks, UV inks, PANTONE inks, fluorescent inks, and custom color inks. We offer a wide range of products with our SAKATA INX, DEERS (DAIHAN), and EVAcolor brands.' },
    { q: 'How does custom color production work?', a: 'Our custom color production consists of 4 stages: First, we receive your color reference. Then we create an ink recipe using L-A-B digital formulation. We print samples on different papers and grammages, and after your approval, we proceed to mass production.' },
    { q: 'What is the minimum order quantity?', a: 'The minimum order quantity for custom color production varies by product type. Please contact our sales team for detailed information.' },
    { q: 'What is your delivery time?', a: 'We can deliver stock products on the same day or next day. For custom color productions, we typically deliver within 1-3 business days after sample approval.' },
    { q: 'Do you provide technical support?', a: 'Yes, our experienced technical team can provide on-site intervention for technical issues at your printing facility. We offer free consultation on ink settings, color calibration, and print optimization.' },
    { q: 'Which brands do you work with?', a: 'We are the Turkish distributor for SAKATA INX (Japan), DEERS/DAIHAN (South Korea), Hi-Tech Coatings (Netherlands), Zeller+Gmelin (Germany), Baltink (Lithuania), and Stahl (Netherlands). EVAcolor and VECTOR are our own brands.' },
  ],
  ru: [
    { q: 'Какие виды красок вы поставляете?', a: 'Мы поставляем и производим офсетные краски (CMYK), металлические, УФ-краски, краски PANTONE, флуоресцентные и специальные цвета. Мы предлагаем широкий ассортимент под марками SAKATA INX, DEERS (DAIHAN) и EVAcolor.' },
    { q: 'Как работает производство специальных цветов?', a: 'Производство состоит из 4 этапов: получение цветового образца, создание рецептуры с помощью цифровой L-A-B формулировки, печать образцов на различных бумагах, серийное производство после утверждения.' },
    { q: 'Каков минимальный объём заказа?', a: 'Минимальный объём заказа зависит от типа продукции. Свяжитесь с нашим отделом продаж для получения подробной информации.' },
    { q: 'Каковы сроки доставки?', a: 'Складские товары доставляются в тот же или на следующий день. Для спеццветов — обычно 1-3 рабочих дня после утверждения образца.' },
    { q: 'Оказываете ли вы техническую поддержку?', a: 'Да, наша опытная техническая команда оказывает помощь на вашем производстве. Мы предоставляем бесплатные консультации по настройке красок, калибровке цвета и оптимизации печати.' },
    { q: 'С какими брендами вы работаете?', a: 'Мы являемся дистрибьютором SAKATA INX (Япония), DEERS/DAIHAN (Южная Корея), Hi-Tech Coatings (Нидерланды), Zeller+Gmelin (Германия), Baltink (Литва) и Stahl (Нидерланды). EVAcolor и VECTOR — наши собственные бренды.' },
  ],
  ar: [
    { q: 'ما أنواع الأحبار التي توفرونها؟', a: 'نوفر وننتج أحبار الأوفست (CMYK)، أحبار معدنية، أحبار UV، أحبار PANTONE، أحبار فلورية وألوان مخصصة. نقدم مجموعة واسعة تحت علامات SAKATA INX وDEERS (DAIHAN) وEVAcolor.' },
    { q: 'كيف يتم إنتاج الألوان المخصصة؟', a: 'يتكون الإنتاج من 4 مراحل: استلام مرجع اللون، إنشاء وصفة الحبر باستخدام صياغة L-A-B الرقمية، طباعة عينات على أوراق مختلفة، ثم الإنتاج بعد الموافقة.' },
    { q: 'ما هو الحد الأدنى لكمية الطلب؟', a: 'يختلف الحد الأدنى حسب نوع المنتج. يرجى الاتصال بفريق المبيعات للحصول على معلومات مفصلة.' },
    { q: 'ما هي مدة التسليم؟', a: 'يمكننا تسليم المنتجات المتوفرة في نفس اليوم أو اليوم التالي. للألوان المخصصة عادة خلال 1-3 أيام عمل بعد الموافقة على العينة.' },
    { q: 'هل تقدمون الدعم الفني؟', a: 'نعم، يمكن لفريقنا الفني تقديم المساعدة في موقعكم. نقدم استشارات مجانية في إعدادات الحبر ومعايرة الألوان وتحسين الطباعة.' },
    { q: 'مع أي علامات تجارية تعملون؟', a: 'نحن الموزع التركي لـ SAKATA INX (اليابان)، DEERS/DAIHAN (كوريا الجنوبية)، Hi-Tech Coatings (هولندا)، Zeller+Gmelin (ألمانيا)، Baltink (ليتوانيا) وStahl (هولندا). EVAcolor وVECTOR هي علاماتنا التجارية.' },
  ],
};

function FAQPageJsonLd({ locale }: { locale: string }) {
  const items = faqData[locale] || faqData.tr;
  const jsonLd = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <FAQPageJsonLd locale={locale} />
      <FAQPageClient />
    </>
  );
}
