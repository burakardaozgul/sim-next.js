import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const BASE_URL = 'https://www.simlimited.net';

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  tr: {
    title: "Matbaa Malzemeleri: Kapsamlı Rehber ve Ürünler",
    description:
      "Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, baskı blanket ve kimyasallarında Türkiye'nin güvenilir tedarikçisi. 1983'ten beri sektörde.",
    keywords: [
      'matbaa malzemeleri', 'ofset mürekkep', 'yaldız mürekkep', 'UV mürekkep',
      'baskı blanket', 'baskı kimyasalları', 'PANTONE mürekkep', 'metalik mürekkep',
      'matbaa malzemeleri tedarikçisi', 'baskı malzemeleri türkiye',
    ],
  },
  en: {
    title: 'Printing Materials: Comprehensive Guide & Products',
    description:
      "Turkey's trusted supplier for offset ink, metallic gold ink, UV ink, printing blankets and chemicals. In the industry since 1983.",
    keywords: [
      'printing materials', 'offset ink', 'metallic ink', 'UV ink',
      'printing blanket', 'printing chemicals', 'PANTONE ink', 'gold ink',
      'printing materials supplier', 'printing supplies Turkey',
    ],
  },
  ru: {
    title: 'Полиграфические Материалы: Полное Руководство',
    description:
      'Надёжный поставщик офсетных красок, металлических красок, УФ-красок, офсетных полотен и химикатов в Турции. В отрасли с 1983 года.',
    keywords: [
      'полиграфические материалы', 'офсетные краски', 'металлические краски',
      'УФ-краски', 'офсетные полотна', 'полиграфическая химия', 'краски PANTONE',
    ],
  },
  ar: {
    title: 'مواد الطباعة: دليل شامل ومنتجات',
    description:
      'المورد الموثوق لأحبار الأوفست والأحبار المعدنية وأحبار UV وبطانيات الطباعة والكيماويات في تركيا. في الصناعة منذ 1983.',
    keywords: [
      'مواد الطباعة', 'أحبار الأوفست', 'أحبار معدنية', 'أحبار UV',
      'بطانيات الطباعة', 'كيماويات الطباعة', 'أحبار بانتون',
    ],
  },
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

const PAGE_NAMES: Record<string, string> = {
  tr: 'Matbaa Malzemeleri', en: 'Printing Materials',
  ru: 'Полиграфические Материалы', ar: 'مواد الطباعة',
};

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/matbaa-malzemeleri',
  en: '/printing-materials',
  ru: '/poligraficheskie-materialy',
  ar: '/mawad-altibaa',
};

const CATEGORY_KEYS = ['Offset', 'Metalic', 'UV', 'Pantone', 'Blanket', 'Chemicals'] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

const CATEGORY_SLUGS: Record<CategoryKey, string> = {
  Offset: 'sakata-inx-cmyk-murekkepler',
  Metalic: 'eva-color-gold-metalik-murekkepler',
  UV: 'zeller-gmelin-uv-offset-murekkepleri',
  Pantone: 'sakata-inx-pantone-murekkepler',
  Blanket: 'vector-baski-blanketleri',
  Chemicals: 'hi-tech-coatings-dispersiyon-lak',
};

const CATEGORY_ICONS: Record<CategoryKey, string> = {
  Offset: '🖨',
  Metalic: '✨',
  UV: '💡',
  Pantone: '🎨',
  Blanket: '🔧',
  Chemicals: '🧪',
};

const VIEW_LABELS: Record<string, string> = {
  tr: 'İncele', en: 'View', ru: 'Смотреть', ar: 'عرض',
};

/* ------------------------------------------------------------------ */
/*  Derin içerik bölümleri (pillar genişletmesi)                       */
/* ------------------------------------------------------------------ */
interface ExtraContent {
  buyTitle: string;
  buyIntro: string;
  buyItems: { name: string; text: string }[];
  paperTitle: string;
  paperIntro: string;
  paperHeaders: [string, string, string];
  paperRows: { surface: string; ink: string; note: string }[];
  processTitle: string;
  processText1: string;
  processText2: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  relatedTitle: string;
  relatedOffset: string;
  relatedIstanbul: string;
  relatedGlossary: string;
}

const EXTRA: Record<string, ExtraContent> = {
  tr: {
    buyTitle: 'Matbaa Malzemesi Satın Alırken Nelere Dikkat Edilmeli?',
    buyIntro:
      'Matbaa malzemeleri; mürekkepten blankete, kimyasaldan laka kadar üretim kalitesini doğrudan belirleyen sarf ürünleridir. Yanlış tedarik kararı, malzeme bedelinin çok üzerinde fire ve zaman kaybı doğurur. Satın alma öncesi şu beş noktayı kontrol edin:',
    buyItems: [
      { name: 'Orijinallik ve teknik dokümantasyon', text: 'Her ürünün güncel TDS (teknik veri sayfası) ve SDS (güvenlik bilgi formu) belgeleri tedarikçiden istenmelidir. Menşei belirsiz mürekkep, renk standardını tutturamaz.' },
      { name: 'Stok sürekliliği', text: 'Devam eden bir işin ortasında malzemenin bitmesi üretimi durdurur. Tedarikçinizin kritik kalemleri düzenli stokta tuttuğundan emin olun.' },
      { name: 'Renk üretim altyapısı', text: 'PANTONE ve özel renk ihtiyacında tedarikçinin kendi renk laboratuvarı olması; hem hız hem reçete tutarlılığı sağlar.' },
      { name: 'Teknik saha desteği', text: 'Renk tutmama, kuruma ve emülsifikasyon problemlerinde telefonla değil makinenin başında destek verebilen tedarikçi tercih edilmelidir.' },
      { name: 'Raf ömrü ve depolama koşulları', text: 'Mürekkep ve kimyasallar sıcaklığa duyarlıdır. Sevkiyat ve depolama zincirini doğru yöneten tedarikçi, ürünün ilk günkü performansını garanti eder.' },
    ],
    paperTitle: 'Kağıt Türüne Göre Mürekkep Uyumu',
    paperIntro:
      'Aynı mürekkep her yüzeyde aynı sonucu vermez. Baskı yüzeyine göre doğru seri seçimi, kuruma ve parlaklık problemlerinin çoğunu baştan önler:',
    paperHeaders: ['Baskı Yüzeyi', 'Önerilen Mürekkep', 'Dikkat Edilecek Nokta'],
    paperRows: [
      { surface: 'Kuşe kağıt (mat/parlak)', ink: 'Standart tabaka ofset serisi', note: 'Yüksek parlaklık için baskı sonrası dispersiyon lak' },
      { surface: '1. hamur / ofset kağıdı', ink: 'Hızlı kuruyan (quick-set) seriler', note: 'Emici yüzeyde yoğunluk kaybına karşı yoğunluk takibi' },
      { surface: 'Kraft ve karton', ink: 'Yüksek pigmentli ambalaj serileri', note: 'Katlama çatlağına karşı esnek lak seçimi' },
      { surface: 'Plastik, folyo, metalize', ink: 'UV / LED-UV mürekkepler', note: 'Yüzey gerilimi (dyne) kontrolü ve korona ihtiyacı' },
      { surface: 'Gıda ambalajı', ink: 'Düşük migrasyonlu seriler', note: 'EU 10/2011 ve İsviçre Yönetmeliği uyumu' },
    ],
    processTitle: 'SIM ile Tedarik Süreci Nasıl İşler?',
    processText1:
      'Talebiniz geldiğinde önce işin teknik gereksinimlerini netleştiririz: baskı yüzeyi, tiraj, makine tipi ve baskı sonrası işlemler. Standart ürünlerde teklif aynı gün iletilir; özel renk taleplerinde laboratuvarımız numune veya L-a-b değeri üzerinden reçete hazırlar ve onayınıza sunar.',
    processText2:
      'Onay sonrası İstanbul içi sevkiyatlar aynı gün, Anadolu sevkiyatları 1-3 iş günü içinde teslim edilir. Teslimatla iş bitmez: renk, kuruma veya emülsifikasyon problemi yaşarsanız teknik ekibimiz makinenizin başında sorunu çözer. Onaylı özel renk reçeteleriniz arşivlenir; tekrar siparişlerde birebir aynı renk üretilir.',
    faqTitle: 'Matbaa Malzemeleri Hakkında Sık Sorulanlar',
    faqs: [
      {
        q: 'Matbaa malzemeleri nelerdir?',
        a: 'Matbaa malzemeleri; ofset mürekkepleri (CMYK, PANTONE, metalik, floresan, UV), baskı blanketleri, baskı kimyasalları (nemlendirme solüsyonu, yıkama maddeleri), dispersiyon laklar ve yardımcı sarf ürünlerini (pudra, temizlik malzemeleri) kapsayan geniş bir ürün grubudur.',
      },
      {
        q: 'Matbaa malzemelerini nereden almalıyım?',
        a: 'Doğrudan üretici veya yetkili distribütörden alım; orijinallik, güncel ürün ve teknik destek garantisi sağlar. SIM, SAKATA INX, Zeller+Gmelin, SCHLENK ve Hi-Tech Coatings markalarının Türkiye distribütörü, EVA COLOR ve VECTOR markalarının üreticisidir.',
      },
      {
        q: 'Toptan matbaa malzemesi fiyatları neye göre belirlenir?',
        a: 'Fiyatı; hammadde (pigment, bağlayıcı) maliyeti, sipariş miktarı, ambalaj boyutu (1 kg kutu / 200 kg varil) ve döviz kuru belirler. Düzenli alımlarda sözleşmeli fiyat sabitlemesi mümkündür. Net fiyat için teklif isteyin.',
      },
      {
        q: 'Sipariş ettiğim mürekkebin rengi kataloğa uymadı, ne yapmalıyım?',
        a: 'Önce baskı koşulları kontrol edilir: mürekkep film kalınlığı, kağıt tonu ve nemlendirme ayarı renk sapmasının en sık üç nedenidir. Sorun malzemeden kaynaklanıyorsa teknik ekibimiz yerinde ölçüm yapar ve ürün spektral değerlere göre düzeltilir ya da değiştirilir.',
      },
      {
        q: 'Türkiye geneline gönderim yapıyor musunuz?',
        a: 'Evet. İstanbul içinde aynı gün, Türkiye genelinde anlaşmalı lojistik ağıyla 1-3 iş günü içinde teslimat yapıyoruz. Düzenli müşterilerimiz için haftalık sevkiyat planları da oluşturuyoruz.',
      },
    ],
    relatedTitle: 'İlgili Kaynaklar',
    relatedOffset: 'Ofset Baskı Malzemeleri Rehberi',
    relatedIstanbul: "İstanbul'da Matbaa Malzemeleri",
    relatedGlossary: 'Matbaa Terimleri Sözlüğü',
  },
  en: {
    buyTitle: 'What to Check When Buying Printing Materials',
    buyIntro:
      'Printing materials — from ink to blankets, chemicals to varnish — directly determine production quality. A wrong sourcing decision costs far more in waste and downtime than the material itself. Check these five points before purchasing:',
    buyItems: [
      { name: 'Authenticity and technical documentation', text: 'Request up-to-date TDS (technical data sheets) and SDS (safety data sheets) for every product. Ink of unclear origin cannot hold colour standards.' },
      { name: 'Stock continuity', text: 'Running out of material mid-job stops production. Make sure your supplier keeps critical items in regular stock.' },
      { name: 'Colour production infrastructure', text: 'For PANTONE and custom colours, a supplier with its own colour laboratory means both speed and recipe consistency.' },
      { name: 'On-site technical support', text: 'For colour, drying and emulsification problems, prefer a supplier who supports you at the press — not just over the phone.' },
      { name: 'Shelf life and storage conditions', text: 'Inks and chemicals are temperature-sensitive. A supplier who manages the shipping and storage chain properly guarantees day-one performance.' },
    ],
    paperTitle: 'Ink Compatibility by Paper Type',
    paperIntro:
      'The same ink does not perform identically on every surface. Choosing the right series for the substrate prevents most drying and gloss problems up front:',
    paperHeaders: ['Substrate', 'Recommended Ink', 'Watch Out For'],
    paperRows: [
      { surface: 'Coated paper (matte/gloss)', ink: 'Standard sheetfed offset series', note: 'Dispersion varnish after printing for high gloss' },
      { surface: 'Uncoated / offset paper', ink: 'Quick-set series', note: 'Density monitoring against loss on absorbent stock' },
      { surface: 'Kraft and board', ink: 'High-pigment packaging series', note: 'Flexible varnish choice against fold cracking' },
      { surface: 'Plastics, foil, metallised', ink: 'UV / LED-UV inks', note: 'Surface tension (dyne) check and corona need' },
      { surface: 'Food packaging', ink: 'Low-migration series', note: 'EU 10/2011 and Swiss Ordinance compliance' },
    ],
    processTitle: 'How Does the Supply Process Work with SIM?',
    processText1:
      'When your request arrives, we first clarify the technical requirements: substrate, run length, press type and post-press processes. For standard products, a quote is sent the same day; for custom colours, our laboratory prepares a recipe from your sample or L-a-b values and submits it for approval.',
    processText2:
      'After approval, Istanbul deliveries ship the same day and Anatolia deliveries arrive within 1-3 business days. The job does not end at delivery: if you experience colour, drying or emulsification problems, our technical team solves them at your press. Approved custom-colour recipes are archived, so repeat orders match exactly.',
    faqTitle: 'Printing Materials — FAQ',
    faqs: [
      {
        q: 'What are printing materials?',
        a: 'Printing materials cover a broad product group: offset inks (CMYK, PANTONE, metallic, fluorescent, UV), printing blankets, pressroom chemicals (fountain solution, washes), dispersion varnishes and auxiliary consumables such as spray powder and cleaning agents.',
      },
      {
        q: 'Where should I buy printing materials?',
        a: 'Buying from the manufacturer or an authorised distributor guarantees authenticity, fresh product and technical support. SIM is the Turkish distributor of SAKATA INX, Zeller+Gmelin, SCHLENK and Hi-Tech Coatings, and the manufacturer of EVA COLOR and VECTOR.',
      },
      {
        q: 'What determines wholesale printing material prices?',
        a: 'Price is driven by raw-material (pigment, binder) costs, order quantity, packaging size (1 kg tin / 200 kg drum) and exchange rates. Contract pricing is available for regular purchases. Request a quote for exact pricing.',
      },
      {
        q: 'The ink I ordered does not match the guide — what should I do?',
        a: 'Press conditions are checked first: ink film thickness, paper shade and dampening settings are the three most common causes of colour deviation. If the material is at fault, our technical team measures on-site and the product is corrected or replaced against spectral values.',
      },
      {
        q: 'Do you deliver across Turkey?',
        a: 'Yes. Same-day delivery within Istanbul, and 1-3 business days across Turkey via our logistics partners. We also set up weekly delivery schedules for regular customers.',
      },
    ],
    relatedTitle: 'Related Resources',
    relatedOffset: 'Offset Printing Supplies Guide',
    relatedIstanbul: 'Printing Materials in Istanbul',
    relatedGlossary: 'Printing Glossary',
  },
  ru: {
    buyTitle: 'На что обратить внимание при покупке полиграфических материалов',
    buyIntro:
      'Полиграфические материалы — от краски до полотен, от химии до лака — напрямую определяют качество продукции. Ошибка в снабжении обходится дороже самого материала: браком и простоем. Проверьте пять пунктов перед покупкой:',
    buyItems: [
      { name: 'Подлинность и техдокументация', text: 'Запрашивайте актуальные TDS (технические данные) и SDS (паспорта безопасности) на каждый продукт. Краска неясного происхождения не выдержит цветовой стандарт.' },
      { name: 'Постоянство складских запасов', text: 'Закончившийся посреди тиража материал останавливает производство. Убедитесь, что поставщик постоянно держит критичные позиции на складе.' },
      { name: 'Инфраструктура производства цвета', text: 'Для PANTONE и спеццветов собственная лаборатория поставщика — это скорость и стабильность рецептур.' },
      { name: 'Выездная техподдержка', text: 'При проблемах с цветом, высыханием и эмульгированием выбирайте поставщика, который помогает у машины, а не только по телефону.' },
      { name: 'Срок годности и условия хранения', text: 'Краски и химия чувствительны к температуре. Поставщик, правильно выстроивший цепочку доставки и хранения, гарантирует свежесть продукта.' },
    ],
    paperTitle: 'Совместимость красок с типами бумаги',
    paperIntro:
      'Одна и та же краска ведёт себя по-разному на разных поверхностях. Правильный выбор серии под материал заранее снимает большинство проблем с высыханием и глянцем:',
    paperHeaders: ['Материал', 'Рекомендуемая краска', 'На что обратить внимание'],
    paperRows: [
      { surface: 'Мелованная бумага', ink: 'Стандартная листовая серия', note: 'Дисперсионный лак для высокого глянца' },
      { surface: 'Немелованная / офсетная бумага', ink: 'Быстрозакрепляющиеся серии (quick-set)', note: 'Контроль плотности на впитывающей поверхности' },
      { surface: 'Крафт и картон', ink: 'Высокопигментные упаковочные серии', note: 'Эластичный лак против трещин на сгибах' },
      { surface: 'Пластик, фольга, металлизация', ink: 'УФ / LED-UV краски', note: 'Контроль поверхностного натяжения (дин), корона' },
      { surface: 'Пищевая упаковка', ink: 'Низкомиграционные серии', note: 'Соответствие EU 10/2011 и швейцарскому регламенту' },
    ],
    processTitle: 'Как устроен процесс поставки с SIM?',
    processText1:
      'Получив запрос, мы сначала уточняем технические требования: материал, тираж, тип машины и послепечатную обработку. По складским продуктам предложение отправляется в тот же день; по спеццветам лаборатория готовит рецептуру по образцу или значениям L-a-b и согласует её с вами.',
    processText2:
      'После согласования доставка по Стамбулу — в тот же день, по Анатолии — 1-3 рабочих дня. Поставкой дело не заканчивается: при проблемах с цветом, высыханием или эмульгированием наша техническая команда решает их у вашей машины. Утверждённые рецептуры спеццветов архивируются — повторные заказы совпадают идеально.',
    faqTitle: 'Полиграфические материалы — вопросы и ответы',
    faqs: [
      {
        q: 'Что относится к полиграфическим материалам?',
        a: 'Это широкая группа продуктов: офсетные краски (CMYK, PANTONE, металлические, флуоресцентные, УФ), офсетные полотна, химия (увлажняющий раствор, смывки), дисперсионные лаки и вспомогательные расходники — противоотмарочный порошок, чистящие средства.',
      },
      {
        q: 'Где покупать полиграфические материалы?',
        a: 'Покупка у производителя или официального дистрибьютора гарантирует подлинность, свежесть продукта и техподдержку. SIM — дистрибьютор SAKATA INX, Zeller+Gmelin, SCHLENK и Hi-Tech Coatings в Турции и производитель EVA COLOR и VECTOR.',
      },
      {
        q: 'От чего зависят оптовые цены на материалы?',
        a: 'Цену определяют стоимость сырья (пигменты, связующие), объём заказа, тип упаковки (банка 1 кг / бочка 200 кг) и валютный курс. Для регулярных закупок возможна контрактная фиксация цен. Запросите коммерческое предложение.',
      },
      {
        q: 'Цвет заказанной краски не совпал с каталогом — что делать?',
        a: 'Сначала проверяются условия печати: толщина красочного слоя, оттенок бумаги и настройка увлажнения — три самые частые причины отклонения. Если виноват материал, наша команда делает замеры на месте, и продукт корректируется или заменяется по спектральным значениям.',
      },
      {
        q: 'Доставляете ли вы по всей Турции?',
        a: 'Да. По Стамбулу — в день заказа, по Турции — за 1-3 рабочих дня через партнёрскую логистику. Для постоянных клиентов настраиваем еженедельные графики поставок.',
      },
    ],
    relatedTitle: 'Связанные ресурсы',
    relatedOffset: 'Руководство по материалам для офсетной печати',
    relatedIstanbul: 'Полиграфические материалы в Стамбуле',
    relatedGlossary: 'Глоссарий полиграфии',
  },
  ar: {
    buyTitle: 'ما الذي يجب التحقق منه عند شراء مواد الطباعة؟',
    buyIntro:
      'مواد الطباعة — من الحبر إلى البطانيات، ومن الكيماويات إلى الورنيش — تحدد جودة الإنتاج مباشرة. قرار التوريد الخاطئ يكلّف هدراً وتوقفاً يفوق ثمن المادة بكثير. تحقق من هذه النقاط الخمس قبل الشراء:',
    buyItems: [
      { name: 'الأصالة والوثائق الفنية', text: 'اطلب من المورد نشرات TDS الفنية وSDS الخاصة بالسلامة محدثةً لكل منتج. الحبر مجهول المنشأ لا يحقق معايير اللون.' },
      { name: 'استمرارية المخزون', text: 'نفاد المادة في منتصف العمل يوقف الإنتاج. تأكد من أن موردك يحتفظ بالأصناف الحرجة في مخزون دائم.' },
      { name: 'بنية إنتاج الألوان', text: 'في احتياجات PANTONE والألوان الخاصة، امتلاك المورد مختبر ألوان خاصاً به يعني السرعة وثبات الوصفات معاً.' },
      { name: 'الدعم الفني الميداني', text: 'في مشكلات اللون والجفاف والاستحلاب، اختر مورداً يدعمك عند الماكينة لا عبر الهاتف فقط.' },
      { name: 'مدة الصلاحية وظروف التخزين', text: 'الأحبار والكيماويات حساسة للحرارة. المورد الذي يدير سلسلة الشحن والتخزين بشكل صحيح يضمن أداء المنتج كما في يومه الأول.' },
    ],
    paperTitle: 'توافق الحبر حسب نوع الورق',
    paperIntro:
      'الحبر نفسه لا يعطي النتيجة نفسها على كل سطح. اختيار السلسلة الصحيحة وفق سطح الطباعة يمنع معظم مشكلات الجفاف واللمعان من البداية:',
    paperHeaders: ['سطح الطباعة', 'الحبر الموصى به', 'نقطة الانتباه'],
    paperRows: [
      { surface: 'ورق مطلي (مطفي/لامع)', ink: 'سلسلة الأوفست القياسية', note: 'ورنيش دسبرسي بعد الطباعة للمعان العالي' },
      { surface: 'ورق غير مطلي / أوفست', ink: 'سلاسل سريعة التثبيت (quick-set)', note: 'مراقبة الكثافة على السطح الماص' },
      { surface: 'كرافت وكرتون', ink: 'سلاسل التغليف عالية الصبغة', note: 'ورنيش مرن ضد تشقق الطي' },
      { surface: 'بلاستيك ورقائق وممعدن', ink: 'أحبار UV / LED-UV', note: 'فحص التوتر السطحي (dyne) والحاجة للكورونا' },
      { surface: 'عبوات الأغذية', ink: 'سلاسل منخفضة الهجرة', note: 'التوافق مع EU 10/2011 واللائحة السويسرية' },
    ],
    processTitle: 'كيف تسير عملية التوريد مع SIM؟',
    processText1:
      'عند وصول طلبك نوضح أولاً المتطلبات الفنية: سطح الطباعة، حجم التيراج، نوع الماكينة وعمليات ما بعد الطباعة. في المنتجات القياسية يُرسل العرض في اليوم نفسه؛ وفي طلبات الألوان الخاصة يُعِدّ مختبرنا الوصفة من العينة أو قيم L-a-b ويعرضها لموافقتك.',
    processText2:
      'بعد الموافقة، تُسلَّم شحنات إسطنبول في اليوم نفسه وشحنات الأناضول خلال 1-3 أيام عمل. ولا ينتهي العمل بالتسليم: إذا واجهت مشكلة لون أو جفاف أو استحلاب يحلها فريقنا الفني عند ماكينتك. تُؤرشف وصفات ألوانك الخاصة المعتمدة، فتُنتَج الطلبات المتكررة بمطابقة تامة.',
    faqTitle: 'الأسئلة الشائعة حول مواد الطباعة',
    faqs: [
      {
        q: 'ما هي مواد الطباعة؟',
        a: 'مواد الطباعة مجموعة واسعة تشمل: أحبار الأوفست (CMYK وPANTONE ومعدنية وفلورية وUV)، بطانيات الطباعة، كيماويات الطباعة (محلول الترطيب ومواد الغسيل)، الورنيش الدسبرسي، والمواد المساعدة كالبودرة ومواد التنظيف.',
      },
      {
        q: 'من أين أشتري مواد الطباعة؟',
        a: 'الشراء من المصنّع أو الموزع المعتمد يضمن الأصالة وحداثة المنتج والدعم الفني. SIM هي الموزع التركي لعلامات SAKATA INX وZeller+Gmelin وSCHLENK وHi-Tech Coatings، والمصنّع لعلامتي EVA COLOR وVECTOR.',
      },
      {
        q: 'كيف تتحدد أسعار مواد الطباعة بالجملة؟',
        a: 'يحدد السعرَ تكلفةُ المواد الخام (الصبغات والروابط)، وكمية الطلب، وحجم العبوة (علبة 1 كجم / برميل 200 كجم)، وسعر الصرف. التثبيت التعاقدي للأسعار متاح للمشتريات المنتظمة. اطلب عرض سعر للتسعير الدقيق.',
      },
      {
        q: 'لون الحبر الذي طلبته لا يطابق الدليل — ماذا أفعل؟',
        a: 'تُفحص ظروف الطباعة أولاً: سماكة طبقة الحبر ودرجة الورق وضبط الترطيب هي الأسباب الثلاثة الأكثر شيوعاً لانحراف اللون. وإذا كانت المادة هي السبب، يقيس فريقنا الفني في الموقع ويُصحَّح المنتج أو يُستبدل وفق القيم الطيفية.',
      },
      {
        q: 'هل توصلون إلى جميع أنحاء تركيا؟',
        a: 'نعم. التسليم في اليوم نفسه داخل إسطنبول، وخلال 1-3 أيام عمل في عموم تركيا عبر شبكة لوجستية متعاقدة. كما نُعِدّ جداول شحن أسبوعية لعملائنا المنتظمين.',
      },
    ],
    relatedTitle: 'مصادر ذات صلة',
    relatedOffset: 'دليل مستلزمات طباعة الأوفست',
    relatedIstanbul: 'مواد الطباعة في إسطنبول',
    relatedGlossary: 'قاموس مصطلحات الطباعة',
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
    path: '/matbaa-malzemeleri',
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  });
}

export default async function MatbaaMalzemeleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'matbaaMalzemeleri' });

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('description'),
    url: pageUrl,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAMES[locale] || BRAND_NAMES.tr,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
      },
    },
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
        name: PAGE_NAMES[locale] || PAGE_NAMES.tr,
        item: pageUrl,
      },
    ],
  };

  const extra = EXTRA[locale] || EXTRA.tr;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: extra.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const jsonLdWebPage = JSON.stringify(webPageJsonLd);
  const jsonLdBreadcrumb = JSON.stringify(breadcrumbJsonLd);
  const jsonLdFaq = JSON.stringify(faqJsonLd);
  const reasons = [1, 2, 3, 4, 5, 6] as const;
  const viewLabel = VIEW_LABELS[locale] || VIEW_LABELS.tr;

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdWebPage }} />
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
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver">
                {t('description')}
              </p>
            </div>
          </section>

          {/* Section 1 — What are printing materials */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section1Title')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">
                {t('section1Text')}
              </p>
            </div>
          </section>

          {/* Section 2 — Product categories */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section2Title')}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORY_KEYS.map((catKey) => (
                  <Link
                    key={catKey}
                    href={{ pathname: '/urunler/[slug]' as const, params: { slug: CATEGORY_SLUGS[catKey] } }}
                    className="group flex flex-col rounded-xl border border-white/[0.06] bg-ink-800 p-6 transition-all hover:border-gold/40 hover:bg-ink-700"
                  >
                    <span className="mb-3 text-3xl">{CATEGORY_ICONS[catKey]}</span>
                    <h3 className="font-heading text-lg font-semibold text-cream">
                      {t(`category${catKey}`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">
                      {t(`category${catKey}Desc`)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all group-hover:gap-2">
                      {viewLabel}
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 — Why SIM */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {t('section3Title')}
              </h2>
              <ul className="space-y-4">
                {reasons.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-base text-silver">{t(`reason${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Buying criteria */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.buyTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{extra.buyIntro}</p>
              <ol className="mt-8 space-y-5">
                {extra.buyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-cream">{item.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Paper compatibility table */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.paperTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{extra.paperIntro}</p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-900">
                      {extra.paperHeaders.map((h) => (
                        <th key={h} className="px-5 py-4 text-start font-heading font-semibold text-gold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {extra.paperRows.map((row) => (
                      <tr key={row.surface} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-5 py-4 font-medium text-cream">{row.surface}</td>
                        <td className="px-5 py-4 text-silver">{row.ink}</td>
                        <td className="px-5 py-4 text-silver">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Supply process */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {extra.processTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{extra.processText1}</p>
              <p className="mt-4 text-base leading-relaxed text-silver">{extra.processText2}</p>
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
                  href="/ofset-baski-malzemeleri"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {extra.relatedOffset}
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/matbaa-malzemeleri-istanbul"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {extra.relatedIstanbul}
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/matbaa-terimleri-sozlugu"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {extra.relatedGlossary}
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
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 border-2 border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                {t('ctaButton')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
