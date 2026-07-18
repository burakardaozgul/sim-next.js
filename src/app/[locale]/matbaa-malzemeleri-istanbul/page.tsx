import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

const BASE_URL = 'https://www.simlimited.net';

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: "İstanbul'da Matbaa Malzemeleri Tedarikçisi",
    description:
      "İstanbul Beylikdüzü merkezli SIM Baskı Malzemeleri'nden ofset mürekkep, metalik yaldız mürekkep, UV mürekkep ve baskı malzemeleri. Aynı gün teslimat.",
    keywords: [
      'matbaa malzemeleri istanbul', 'ofset mürekkep istanbul', 'baskı malzemeleri istanbul',
      'matbaa tedarikçisi istanbul', 'beylikdüzü matbaa', 'istanbul baskı malzemeleri',
      'matbaa malzemeleri beylikdüzü', 'ofset mürekkep tedarikçi istanbul',
    ],
  },
  en: {
    title: 'Printing Materials Supplier in Istanbul',
    description:
      'Offset ink, metallic gold ink, UV ink and printing materials from SIM Printing Supplies in Beylikdüzü, Istanbul. Same-day delivery across Istanbul.',
    keywords: [
      'printing materials Istanbul', 'offset ink Istanbul', 'printing supplier Istanbul',
      'Beylikdüzü printing', 'Istanbul printing materials', 'printing supplies Istanbul',
    ],
  },
  ru: {
    title: 'Поставщик Полиграфических Материалов в Стамбуле',
    description:
      'Офсетные краски, металлические краски, УФ-краски и полиграфические материалы от SIM в Бейликдюзю, Стамбул. Доставка в тот же день.',
    keywords: [
      'полиграфические материалы Стамбул', 'офсетные краски Стамбул',
      'поставщик печатных материалов Стамбул', 'Бейликдюзю типография',
    ],
  },
  ar: {
    title: 'مورد مواد الطباعة في إسطنبول',
    description:
      'أحبار أوفست وأحبار معدنية وأحبار UV ومواد طباعة من SIM في بيليكدوزو، إسطنبول. توصيل في نفس اليوم.',
    keywords: [
      'مواد الطباعة إسطنبول', 'أحبار أوفست إسطنبول', 'مورد مواد طباعة إسطنبول',
      'بيليكدوزو طباعة', 'مستلزمات طباعة إسطنبول',
    ],
  },
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

const PILLAR_NAMES: Record<string, string> = {
  tr: 'Matbaa Malzemeleri', en: 'Printing Materials',
  ru: 'Полиграфические Материалы', ar: 'مواد الطباعة',
};

const PAGE_NAMES: Record<string, string> = {
  tr: "İstanbul'da Matbaa Malzemeleri", en: 'Printing Materials in Istanbul',
  ru: 'Полиграфические Материалы в Стамбуле', ar: 'مواد الطباعة في إسطنبول',
};

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri-istanbul',
  en: '/printing-materials-istanbul',
  ru: '/tipografskie-materialy-stambul',
  ar: '/mawad-altibaa-istanbul',
};

const LOCALE_PILLAR_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri',
  en: '/printing-materials',
  ru: '/poligraficheskie-materialy',
  ar: '/mawad-altibaa',
};

const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=40.9835,28.6285';

/* ------------------------------------------------------------------ */
/*  Derin yerel içerik (İstanbul genişletmesi)                         */
/* ------------------------------------------------------------------ */
interface LocalExtra {
  districtsTitle: string;
  districtsIntro: string;
  europeLabel: string;
  europeDistricts: string;
  europeNote: string;
  asiaLabel: string;
  asiaDistricts: string;
  asiaNote: string;
  localWhyTitle: string;
  localWhyItems: { name: string; text: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  directionsLabel: string;
  relatedTitle: string;
  relatedPillar: string;
  relatedOffset: string;
}

const LOCAL_EXTRA: Record<string, LocalExtra> = {
  tr: {
    districtsTitle: "İstanbul'un Matbaa Bölgelerine Hizmet Veriyoruz",
    districtsIntro:
      "Deposu ve renk laboratuvarı Beylikdüzü Yakuplu'da bulunan SIM; İstanbul'un tüm matbaa yoğun bölgelerine kendi sevkiyat ağıyla ulaşır. Topkapı ve Bağcılar'daki geleneksel matbaa kümelerinden İkitelli'deki ambalaj üreticilerine kadar yüzlerce işletmeye düzenli tedarik sağlıyoruz.",
    europeLabel: 'Avrupa Yakası',
    europeDistricts: 'Beylikdüzü, Esenyurt, Avcılar, Bağcılar, Güneşli, İkitelli, Topkapı, Zeytinburnu, Sefaköy, Matbaacılar Siteleri',
    europeNote: 'Stok ürünlerde aynı gün teslimat',
    asiaLabel: 'Anadolu Yakası',
    asiaDistricts: 'Ümraniye, Dudullu, Kartal, Pendik, Tuzla, Maltepe',
    asiaNote: 'Aynı gün / ertesi iş günü planlı sevkiyat',
    localWhyTitle: 'Neden İstanbul İçinden Bir Tedarikçi?',
    localWhyItems: [
      { name: 'Acil ihtiyaçta saatler içinde teslimat', text: 'Baskı ortasında biten mürekkep veya hasar gören blanket için kargo beklemek üretim kaybıdır. İstanbul içindeki araç ağımız stok ürünleri aynı gün ulaştırır.' },
      { name: 'Renk laboratuvarına fiziksel yakınlık', text: 'Özel renk çalışmalarında numunenizi elden getirebilir, reçete onayını laboratuvarda birlikte yapabilirsiniz. Islak numune ile dijital değer arasındaki fark aynı gün kapanır.' },
      { name: 'Yerinde teknik servis', text: 'Renk tutmama, emülsifikasyon veya kuruma problemi yaşadığınızda teknik ekibimiz İstanbul içinde aynı gün makinenizin başında olur.' },
      { name: 'Depodan elden teslim seçeneği', text: 'Beylikdüzü depomuzdan mesai saatleri içinde ürünlerinizi elden teslim alabilir, sipariş öncesi ürünleri yerinde inceleyebilirsiniz.' },
    ],
    faqTitle: "İstanbul'da Matbaa Malzemesi Tedariki — Sık Sorulanlar",
    faqs: [
      {
        q: "İstanbul'da matbaa malzemeleri deponuz nerede?",
        a: "Depomuz, satış ofisimiz ve renk üretim laboratuvarımız İstanbul Beylikdüzü Yakuplu'dadır (Yakuplu Mah. 194. Sk. No:1 D:176). E-5 ve TEM bağlantılarına yakın konumuyla Avrupa Yakası'ndaki matbaa bölgelerinin tümüne hızlı erişim sağlar.",
      },
      {
        q: 'Hangi ilçelere aynı gün teslimat yapıyorsunuz?',
        a: "Stokta bulunan ürünlerde Beylikdüzü, Esenyurt, Avcılar, Bağcılar, Güneşli, İkitelli, Topkapı ve Zeytinburnu başta olmak üzere Avrupa Yakası'na aynı gün teslimat yapıyoruz. Anadolu Yakası sevkiyatları aynı gün veya ertesi iş günü planlanır.",
      },
      {
        q: 'Acil mürekkep ihtiyacında ne kadar sürede teslim edebilirsiniz?',
        a: 'Mesai saatleri içinde iletilen acil taleplerde, stok ürünler İstanbul içinde genellikle aynı gün içerisinde teslim edilir. Kritik durumlarda depodan elden teslim en hızlı seçenektir; telefonla arayıp ürünü ayırtabilirsiniz.',
      },
      {
        q: "İstanbul dışından sipariş verebilir miyim?",
        a: 'Evet. Türkiye genelindeki matbaalara anlaşmalı lojistik ağımızla 1-3 iş günü içinde sevkiyat yapıyoruz. Düzenli müşterilerimiz için haftalık sevkiyat planları oluşturuyoruz.',
      },
      {
        q: 'Depodan elden teslim alabilir miyim?',
        a: 'Evet. Hafta içi 08:30-18:00 saatleri arasında Beylikdüzü depomuzdan elden teslim alabilirsiniz. Gelmeden önce telefonla stok teyidi almanızı öneririz.',
      },
    ],
    directionsLabel: 'Yol Tarifi Al',
    relatedTitle: 'İlgili Kaynaklar',
    relatedPillar: 'Matbaa Malzemeleri Rehberi',
    relatedOffset: 'Ofset Baskı Malzemeleri Rehberi',
  },
  en: {
    districtsTitle: "Serving Istanbul's Printing Districts",
    districtsIntro:
      "With its warehouse and colour laboratory in Beylikdüzü Yakuplu, SIM reaches all of Istanbul's print-dense districts through its own delivery network — from the traditional printing clusters of Topkapı and Bağcılar to the packaging manufacturers of İkitelli.",
    europeLabel: 'European Side',
    europeDistricts: 'Beylikdüzü, Esenyurt, Avcılar, Bağcılar, Güneşli, İkitelli, Topkapı, Zeytinburnu, Sefaköy, printers\' complexes',
    europeNote: 'Same-day delivery for stock items',
    asiaLabel: 'Asian Side',
    asiaDistricts: 'Ümraniye, Dudullu, Kartal, Pendik, Tuzla, Maltepe',
    asiaNote: 'Same-day / next-business-day scheduled delivery',
    localWhyTitle: 'Why a Supplier Based in Istanbul?',
    localWhyItems: [
      { name: 'Delivery within hours in emergencies', text: 'Waiting for cargo when ink runs out mid-run or a blanket is damaged means lost production. Our in-city fleet delivers stock items the same day.' },
      { name: 'Physical proximity to the colour lab', text: 'For custom colour work you can bring your sample in person and approve the recipe together at the laboratory — closing the gap between wet sample and digital value the same day.' },
      { name: 'On-site technical service', text: 'For colour, emulsification or drying problems, our technical team is at your press the same day anywhere in Istanbul.' },
      { name: 'Warehouse pickup option', text: 'You can collect products from our Beylikdüzü warehouse during working hours and inspect items before ordering.' },
    ],
    faqTitle: 'Printing Material Supply in Istanbul — FAQ',
    faqs: [
      {
        q: 'Where is your printing materials warehouse in Istanbul?',
        a: 'Our warehouse, sales office and colour laboratory are in Beylikdüzü Yakuplu, Istanbul (Yakuplu Mah. 194. Sk. No:1 D:176), close to the E-5 and TEM motorways for fast access to all European-side printing districts.',
      },
      {
        q: 'Which districts get same-day delivery?',
        a: 'For stock items we deliver same-day across the European side — notably Beylikdüzü, Esenyurt, Avcılar, Bağcılar, Güneşli, İkitelli, Topkapı and Zeytinburnu. Asian-side deliveries are scheduled same-day or next business day.',
      },
      {
        q: 'How fast can you deliver in an ink emergency?',
        a: 'For urgent requests received during working hours, stock items are usually delivered within the same day in Istanbul. In critical cases, warehouse pickup is the fastest option — call ahead to reserve the product.',
      },
      {
        q: 'Can I order from outside Istanbul?',
        a: 'Yes. We ship to printers across Turkey within 1-3 business days via our logistics partners, and set up weekly delivery schedules for regular customers.',
      },
      {
        q: 'Can I pick up from the warehouse?',
        a: 'Yes. Pickup is available from our Beylikdüzü warehouse on weekdays between 08:30 and 18:00. We recommend calling ahead to confirm stock.',
      },
    ],
    directionsLabel: 'Get Directions',
    relatedTitle: 'Related Resources',
    relatedPillar: 'Printing Materials Guide',
    relatedOffset: 'Offset Printing Supplies Guide',
  },
  ru: {
    districtsTitle: 'Обслуживаем полиграфические районы Стамбула',
    districtsIntro:
      'Склад и лаборатория цвета SIM находятся в Бейликдюзю (Якуплу). Собственная сеть доставки покрывает все насыщенные полиграфией районы Стамбула — от традиционных типографских кластеров Топкапы и Багджилара до производителей упаковки в Икителли.',
    europeLabel: 'Европейская сторона',
    europeDistricts: 'Бейликдюзю, Эсеньюрт, Авджилар, Багджилар, Гюнешли, Икителли, Топкапы, Зейтинбурну, Сефакёй',
    europeNote: 'Доставка складских позиций в тот же день',
    asiaLabel: 'Азиатская сторона',
    asiaDistricts: 'Умрание, Дудуллу, Картал, Пендик, Тузла, Мальтепе',
    asiaNote: 'В тот же день / на следующий рабочий день по графику',
    localWhyTitle: 'Почему поставщик из Стамбула?',
    localWhyItems: [
      { name: 'Доставка за часы при срочной необходимости', text: 'Ждать транспортную компанию, когда краска закончилась посреди тиража, — значит терять производство. Наш городской транспорт доставляет складские позиции в тот же день.' },
      { name: 'Близость к лаборатории цвета', text: 'Для спеццветов вы можете привезти образец лично и согласовать рецептуру прямо в лаборатории — разница между «мокрым» образцом и цифровым значением закрывается в тот же день.' },
      { name: 'Выездной технический сервис', text: 'При проблемах с цветом, эмульгированием или высыханием наша техническая команда в тот же день будет у вашей машины в любой точке Стамбула.' },
      { name: 'Самовывоз со склада', text: 'В рабочие часы вы можете забрать продукцию со склада в Бейликдюзю и осмотреть товар перед заказом.' },
    ],
    faqTitle: 'Поставка материалов в Стамбуле — вопросы и ответы',
    faqs: [
      {
        q: 'Где находится ваш склад в Стамбуле?',
        a: 'Склад, офис продаж и лаборатория цвета находятся в районе Бейликдюзю, махалле Якуплу (Yakuplu Mah. 194. Sk. No:1 D:176), рядом с трассами E-5 и TEM — быстрый доступ ко всем полиграфическим районам европейской стороны.',
      },
      {
        q: 'В какие районы доставка в тот же день?',
        a: 'Складские позиции доставляются в тот же день по европейской стороне: Бейликдюзю, Эсеньюрт, Авджилар, Багджилар, Гюнешли, Икителли, Топкапы, Зейтинбурну. Доставка на азиатскую сторону — в тот же или на следующий рабочий день.',
      },
      {
        q: 'Как быстро вы доставите краску в экстренном случае?',
        a: 'По срочным заявкам в рабочие часы складские позиции обычно доставляются по Стамбулу в течение того же дня. В критических случаях самый быстрый вариант — самовывоз; позвоните, чтобы зарезервировать товар.',
      },
      {
        q: 'Можно ли заказать из другого города?',
        a: 'Да. Мы отгружаем типографиям по всей Турции за 1-3 рабочих дня через партнёрскую логистику, а для постоянных клиентов настраиваем еженедельные графики.',
      },
      {
        q: 'Возможен ли самовывоз со склада?',
        a: 'Да, в будние дни с 08:30 до 18:00 со склада в Бейликдюзю. Рекомендуем предварительно подтвердить наличие по телефону.',
      },
    ],
    directionsLabel: 'Построить маршрут',
    relatedTitle: 'Связанные ресурсы',
    relatedPillar: 'Руководство по полиграфическим материалам',
    relatedOffset: 'Материалы для офсетной печати',
  },
  ar: {
    districtsTitle: 'نخدم مناطق الطباعة في إسطنبول',
    districtsIntro:
      'يقع مستودع SIM ومختبر الألوان في بيليك دوزو (ياكوبلو)، وتصل شبكة التوزيع الخاصة بنا إلى جميع مناطق الطباعة الكثيفة في إسطنبول — من تجمعات المطابع التقليدية في توبكابي وباجيلار إلى مصنّعي العبوات في إكيتيلي.',
    europeLabel: 'الجانب الأوروبي',
    europeDistricts: 'بيليك دوزو، إسنيورت، أفجيلار، باجيلار، غونشلي، إكيتيلي، توبكابي، زيتون بورنو، سفاكوي',
    europeNote: 'تسليم في اليوم نفسه لمنتجات المخزون',
    asiaLabel: 'الجانب الآسيوي',
    asiaDistricts: 'أومرانية، دودوللو، كارتال، بنديك، توزلا، مالتبه',
    asiaNote: 'تسليم في اليوم نفسه / اليوم التالي وفق جدول',
    localWhyTitle: 'لماذا مورد من داخل إسطنبول؟',
    localWhyItems: [
      { name: 'تسليم خلال ساعات في الحالات العاجلة', text: 'انتظار شركة الشحن عند نفاد الحبر في منتصف التيراج يعني خسارة إنتاج. أسطولنا داخل المدينة يوصل منتجات المخزون في اليوم نفسه.' },
      { name: 'قرب فعلي من مختبر الألوان', text: 'في أعمال الألوان الخاصة يمكنك إحضار عينتك بنفسك واعتماد الوصفة معاً في المختبر — فيُغلق الفارق بين العينة الرطبة والقيمة الرقمية في اليوم نفسه.' },
      { name: 'خدمة فنية ميدانية', text: 'عند مشكلات اللون أو الاستحلاب أو الجفاف يكون فريقنا الفني عند ماكينتك في اليوم نفسه في أي نقطة من إسطنبول.' },
      { name: 'خيار الاستلام من المستودع', text: 'يمكنك استلام منتجاتك من مستودع بيليك دوزو خلال ساعات العمل ومعاينة المنتجات قبل الطلب.' },
    ],
    faqTitle: 'توريد مواد الطباعة في إسطنبول — الأسئلة الشائعة',
    faqs: [
      {
        q: 'أين يقع مستودعكم في إسطنبول؟',
        a: 'يقع مستودعنا ومكتب المبيعات ومختبر الألوان في بيليك دوزو ياكوبلو، إسطنبول (Yakuplu Mah. 194. Sk. No:1 D:176)، بالقرب من طريقي E-5 وTEM لوصول سريع إلى جميع مناطق الطباعة في الجانب الأوروبي.',
      },
      {
        q: 'ما المناطق التي تشملها خدمة التسليم في اليوم نفسه؟',
        a: 'لمنتجات المخزون نسلّم في اليوم نفسه في الجانب الأوروبي، خصوصاً بيليك دوزو وإسنيورت وأفجيلار وباجيلار وغونشلي وإكيتيلي وتوبكابي وزيتون بورنو. أما شحنات الجانب الآسيوي فتُجدول لليوم نفسه أو يوم العمل التالي.',
      },
      {
        q: 'كم تستغرقون في حالة الحاجة العاجلة للحبر؟',
        a: 'للطلبات العاجلة الواردة خلال ساعات العمل تُسلَّم منتجات المخزون داخل إسطنبول عادةً في اليوم نفسه. وفي الحالات الحرجة يبقى الاستلام من المستودع الخيار الأسرع — اتصل مسبقاً لحجز المنتج.',
      },
      {
        q: 'هل يمكنني الطلب من خارج إسطنبول؟',
        a: 'نعم. نشحن للمطابع في عموم تركيا خلال 1-3 أيام عمل عبر شبكة لوجستية متعاقدة، ونُعِدّ جداول شحن أسبوعية لعملائنا المنتظمين.',
      },
      {
        q: 'هل يمكن الاستلام من المستودع مباشرة؟',
        a: 'نعم، أيام الأسبوع بين 08:30 و18:00 من مستودع بيليك دوزو. ننصح بتأكيد توفر المنتج هاتفياً قبل الحضور.',
      },
    ],
    directionsLabel: 'احصل على الاتجاهات',
    relatedTitle: 'مصادر ذات صلة',
    relatedPillar: 'دليل مواد الطباعة',
    relatedOffset: 'دليل مستلزمات طباعة الأوفست',
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
    path: '/matbaa-malzemeleri-istanbul',
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  });
}

export default async function MatbaaMalzemeleriIstanbulPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'istanbulSeo' });

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pillarPath = LOCALE_PILLAR_PATHS[locale] || LOCALE_PILLAR_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const pillarUrl = locale === 'tr' ? `${BASE_URL}${pillarPath}` : `${BASE_URL}/${locale}${pillarPath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
    description: (META[locale] || META.tr).description,
    url: BASE_URL,
    telephone: '+90-212-637-62-49',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yakuplu, 194. Sk. No:1 D:176',
      addressLocality: 'Beylikdüzü',
      addressRegion: 'İstanbul',
      postalCode: '34524',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9835,
      longitude: 28.6285,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
    },
    sameAs: [
      'https://www.facebook.com/simlimited.net/',
      'https://www.linkedin.com/company/sim-bask%C4%B1-malzemeleri/',
      'https://yandex.com.tr/maps/org/sim_baski_malzemeleri_san/59607491695/',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_NAMES[locale] || HOME_NAMES.tr,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: PILLAR_NAMES[locale] || PILLAR_NAMES.tr,
        item: pillarUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: PAGE_NAMES[locale] || PAGE_NAMES.tr,
        item: pageUrl,
      },
    ],
  };

  const extra = LOCAL_EXTRA[locale] || LOCAL_EXTRA.tr;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: extra.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const jsonLdBusiness = JSON.stringify(localBusinessJsonLd);
  const jsonLdBreadcrumb = JSON.stringify(breadcrumbJsonLd);
  const jsonLdFaq = JSON.stringify(faqJsonLd);
  const services = [1, 2, 3, 4, 5] as const;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBusiness }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdFaq }} />

      <main className="flex min-h-screen">
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">

          {/* Hero */}
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {t('subtitle')}
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
            </div>
          </section>

          {/* Intro */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('introTitle')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('introText')}
              </p>
            </div>
          </section>

          {/* Location info */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('locationTitle')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Adres' : locale === 'en' ? 'Address' : locale === 'ru' ? 'Адрес' : 'العنوان'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{t('address')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <Phone size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Telefon' : locale === 'en' ? 'Phone' : locale === 'ru' ? 'Телефон' : 'الهاتف'}
                    </p>
                    <a
                      href={`tel:${t('phone').replace(/\s/g, '')}`}
                      className="mt-1 block text-sm text-silver transition-colors hover:text-gold"
                    >
                      {t('phone')}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                  <Clock size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {locale === 'tr' ? 'Çalışma Saatleri' : locale === 'en' ? 'Working Hours' : locale === 'ru' ? 'Часы работы' : 'ساعات العمل'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{t('workingHours')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('servicesTitle')}
              </h2>
              <ul className="space-y-4">
                {services.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-base text-silver">{t(`service${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Istanbul */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('whyIstanbulTitle')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('whyIstanbulText')}
              </p>
            </div>
          </section>

          {/* Districts served */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.districtsTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{extra.districtsIntro}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gold" />
                    <h3 className="font-heading text-base font-semibold text-cream">{extra.europeLabel}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-silver">{extra.europeDistricts}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold">{extra.europeNote}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gold" />
                    <h3 className="font-heading text-base font-semibold text-cream">{extra.asiaLabel}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-silver">{extra.asiaDistricts}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold">{extra.asiaNote}</p>
                </div>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
              >
                <MapPin size={14} />
                {extra.directionsLabel}
              </a>
            </div>
          </section>

          {/* Why local supplier */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.localWhyTitle}
              </h2>
              <div className="space-y-6">
                {extra.localWhyItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="mt-1 flex-shrink-0 text-gold" />
                    <div>
                      <h3 className="font-heading text-base font-semibold text-cream">{item.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.faqTitle}
              </h2>
              <div className="space-y-6">
                {extra.faqs.map((f, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                    <h3 className="font-heading text-base font-semibold text-cream">{f.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related resources */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-14 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 font-heading text-xl font-bold text-cream md:text-2xl">
                {extra.relatedTitle}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/matbaa-malzemeleri"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {extra.relatedPillar}
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/ofset-baski-malzemeleri"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {extra.relatedOffset}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gold px-6 py-14 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  {t('ctaTitle')}
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  {t('ctaText')}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+902126376249"
                  className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream"
                >
                  {t('ctaButton')}
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  {locale === 'tr' ? 'İletişim Formu' : locale === 'en' ? 'Contact Form' : locale === 'ru' ? 'Форма связи' : 'نموذج الاتصال'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
