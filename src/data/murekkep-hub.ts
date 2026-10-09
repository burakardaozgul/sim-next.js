/**
 * Mürekkep hub'ı — /matbaa-murekkepleri · /en/printing-inks · /ru/pechatnye-kraski · /ar/ahbar-altibaa (brief B).
 * Hedef: "matbaa mürekkepleri", "matbaa mürekkebi", "ofset mürekkep", "matbaa boyası"; EN: "printing inks (supplier) Turkey".
 * Olgular organization.ts'ten; satır içi linkler sunucuda yerelleştirilir.
 */
import { ORGANIZATION, yearsSinceFounding, formatThousands, formatTelephone } from '@/data/organization';
import type { PillarLocale } from '@/data/pillar-matbaa-malzemeleri';
import type { routing } from '@/i18n/routing';

type L<T = string> = Record<PillarLocale, T>;
type StaticPagePath = Exclude<keyof typeof routing.pathnames, `${string}[${string}]`>;

export interface InkType {
  key: string;
  icon: string;
  image: string;
  productSlug: string;
  brands: string[];
  name: L;
  summary: L;
  whenToUse: L;
  body: L<string[]>;
}

export interface HubContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  shortAnswer: { title: string; text: string };
  keyFacts: { title: string; rows: { label: string; value: string }[] };
  what: { title: string; paragraphs: string[] };
  types: { title: string; intro: string; viewLabel: string; whenLabel: string; brandsLabel: string };
  matrix: { title: string; intro: string; headers: string[]; brands: string[]; rows: string[][]; note: string };
  selection: { title: string; intro: string; headers: [string, string, string]; rows: { criterion: string; options: string; advice: string }[] };
  maker: { title: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  price: { title: string; intro: string; factors: { name: string; text: string }[] };
  support: { title: string; text: string };
  faq: { title: string; items: { q: string; a: string }[] };
  related: { title: string; postsTitle: string; linksTitle: string };
  cta: { title: string; text: string; button: string; phone: string };
}

const YEARS = yearsSinceFounding();
const F = ORGANIZATION.facts;
const CAP = { tr: formatThousands(F.customColorCapacityKgPerMonth, 'tr'), en: formatThousands(F.customColorCapacityKgPerMonth, 'en'), ru: formatThousands(F.customColorCapacityKgPerMonth, 'ru'), ar: formatThousands(F.customColorCapacityKgPerMonth, 'ar') };
const PHONE = formatTelephone();
const DE = { tr: String(F.deltaEMax).replace('.', ','), en: String(F.deltaEMax) };
const SAKATA_SINCE = ORGANIZATION.brands.find((b) => b.name === 'SAKATA INX')?.since ?? '';

const IMG = {
  cmyk: '/images/matbaa-malzemeleri/sakata-inx-ecopure-cmyk-ofset-murekkep.webp',
  uv: '/images/matbaa-malzemeleri/zeller-gmelin-uvalux-process-magenta-uv-murekkep.webp',
  gold: '/images/matbaa-malzemeleri/eva-color-new-p871-gold-metalik-murekkep.webp',
  fluo: '/images/matbaa-malzemeleri/eva-color-802-green-floresan-murekkep.webp',
  pantone: '/images/matbaa-malzemeleri/sakata-inx-ecopure-pantone-021-orange-spot-murekkep.webp',
  lab: '/images/matbaa-malzemeleri/sim-ozel-renk-laboratuvari-murekkep-karisimi.webp',
} as const;

export const HUB_HERO_IMAGE = IMG.lab;

export const HUB_RELATED_POSTS = [
  'ofset-murekkep-secimi',
  'ofset-baskida-murekkep-kuruma-sorunlari',
  'ofset-baskida-su-dengesi-ayari',
  'baskida-dot-gain-kontrolu',
  'icc-profil-ofset-baskida-renk-yonetimi',
  'pantone-renk-sistemi-rehberi',
  'yaldiz-baski-teknikleri-altin-gumus',
  'floresan-murekkepler-uygulama-rehberi',
  'uv-murekkep-teknolojisi',
  'gida-ambalajinda-guvenli-baski-murekkeleri',
] as const;

export const HUB_RELATED_LINKS: { path: StaticPagePath; label: L }[] = [
  { path: '/matbaa-malzemeleri', label: { tr: 'Matbaa Malzemeleri Rehberi', en: 'Printing Materials Guide', ru: 'Руководство по полиграфическим материалам', ar: 'دليل مواد الطباعة' } },
  { path: '/ofset-baski-malzemeleri', label: { tr: 'Ofset Baskı Malzemeleri', en: 'Offset Printing Supplies', ru: 'Материалы для офсетной печати', ar: 'مستلزمات طباعة الأوفست' } },
  { path: '/ozel-renk-uretimi', label: { tr: 'Özel Renk Üretimi', en: 'Custom Colour Production', ru: 'Цвета на заказ', ar: 'إنتاج الألوان الخاصة' } },
  { path: '/urunler', label: { tr: 'Ürün Kataloğu', en: 'Product Catalogue', ru: 'Каталог продукции', ar: 'كتالوج المنتجات' } },
  { path: '/matbaa-malzemeleri-istanbul', label: { tr: 'İstanbul Teslimat', en: 'Istanbul Delivery', ru: 'Доставка по Стамбулу', ar: 'التوصيل في إسطنبول' } },
  { path: '/temsilcilikler', label: { tr: 'Temsilciliklerimiz', en: 'Our Brands', ru: 'Наши бренды', ar: 'علاماتنا' } },
];

/* ------------------------------------------------------------------ */
/*  Altı mürekkep türü                                                   */
/* ------------------------------------------------------------------ */
export const INK_TYPES: InkType[] = [
  {
    key: 'conventional', icon: '🖨', image: IMG.cmyk, productSlug: 'sakata-inx-cmyk-murekkepler', brands: ['SAKATA INX'],
    name: { tr: 'Konvansiyonel tabaka ofset mürekkepleri (CMYK)', en: 'Conventional sheetfed offset inks (CMYK)', ru: 'Конвенциональные листовые офсетные краски (CMYK)', ar: 'أحبار الأوفست الورقي التقليدية (CMYK)' },
    summary: { tr: 'Kuşe ve 1. hamur kâğıda oksidatif kuruyan dört renk setleri; ISO 2846-1.', en: 'Oxidative-drying process sets for coated and uncoated paper; ISO 2846-1.', ru: 'Триадные наборы окислительной сушки для мелованной и офсетной бумаги; ISO 2846-1.', ar: 'أطقم رباعية تجف بالأكسدة للورق المصقول وغير المصقول؛ ISO 2846-1.' },
    whenToUse: { tr: 'Ticari baskı, dergi, katalog, kitap, broşür ve karton ambalaj gibi kâğıt ve karton işlerinde; en yüksek hacimli ve en ekonomik mürekkep grubu.', en: 'Commercial print, magazines, catalogues, books, brochures and folding cartons on paper and board; the highest-volume and most economical group.', ru: 'Коммерческая печать, журналы, каталоги, книги, картонная упаковка на бумаге и картоне; самая массовая и экономичная группа.', ar: 'الطباعة التجارية والمجلات والكتالوجات والكتب وعلب الكرتون على الورق والكرتون؛ المجموعة الأكثر استهلاكاً والأوفر.' },
    body: {
      tr: [
        'Konvansiyonel ofset mürekkebi; pigment, bitkisel veya mineral yağ bazlı vernik, reçine ve kurutuculardan oluşur. Kâğıda temas ettiğinde önce çözücü kısmı emilerek set olur, ardından oksidasyonla sertleşir; bu yüzden kâğıdın emiciliği ve nemlendirme solüsyonunun pH değeri kuruma hızını doğrudan belirler. Dört renk setleri ISO 2846-1 renk standardına göre formüle edilir ve FOGRA/GRACoL hedefli iş akışlarında prova ile baskı örtüşür. Kurutucu oranı ve kâğıt nemi kuruma süresini saatler ölçeğinde değiştirir; istif yüksekliği ve toz miktarı buna göre ayarlanır.',
        `SIM, ${SAKATA_SINCE}'den beri Japon [SAKATA INX tabaka ofset mürekkeplerinin](/urunler/sakata-inx-cmyk-murekkepler) Türkiye distribütörüdür: yüksek pigment konsantrasyonu daha ince filmle hedef dansiteye ulaştırır, dengeli tack hızlı makinelerde yırtılmayı önler, hızlı set versiyonları perfektör ve lak işlerinde set-off riskini düşürür. Standart setler İstanbul deposundan stoktan sevk edilir. Seçim kriterleri için [ofset mürekkep seçimi](/blog/ofset-murekkep-secimi) yazımıza bakın.`,
      ],
      en: [
        'A conventional offset ink consists of pigment, a vegetable- or mineral-oil based varnish, resins and driers. On contact with paper the solvent fraction is absorbed and the ink sets, then it hardens by oxidation; paper absorbency and fountain solution pH therefore govern drying speed. Process sets are formulated to ISO 2846-1 so that FOGRA/GRACoL workflows match proof to press.',
        `SIM has been the Turkish distributor of Japanese [SAKATA INX sheetfed offset inks](/urunler/sakata-inx-cmyk-murekkepler) since ${SAKATA_SINCE}: high pigment loading reaches target density with a thinner film, balanced tack prevents picking on fast presses, and fast-setting versions lower set-off risk on perfecting and varnished jobs. Standard sets ship from stock in Istanbul, with English TDS/SDS for export orders.`,
      ],
      ru: ['Конвенциональная офсетная краска состоит из пигмента, связующего на растительных или минеральных маслах, смол и сиккативов; закрепляется впитыванием и окислением, поэтому впитываемость бумаги и pH увлажнения определяют скорость сушки. Триада формулируется по ISO 2846-1.', `SIM — дистрибьютор листовых красок [SAKATA INX](/urunler/sakata-inx-cmyk-murekkepler) в Турции с ${SAKATA_SINCE} г.: высокая концентрация пигмента, сбалансированная липкость, быстрозакрепляющиеся версии. Стандартные наборы отгружаются со склада в Стамбуле.`],
      ar: ['يتكون حبر الأوفست التقليدي من صبغة ورابط بزيوت نباتية أو معدنية وراتنجات ومجففات؛ يثبت بالامتصاص ثم يتصلب بالأكسدة، لذا تحدد امتصاصية الورق وحموضة محلول الترطيب سرعة الجفاف. تُصاغ الأطقم الرباعية وفق ISO 2846-1.', `SIM هي الموزع التركي لأحبار [SAKATA INX](/urunler/sakata-inx-cmyk-murekkepler) منذ ${SAKATA_SINCE}: تركيز صبغة عالٍ ولزوجة متوازنة ونسخ سريعة الجفاف. تُشحن الأطقم القياسية من مخزون إسطنبول مع وثائق بالإنجليزية للتصدير.`],
    },
  },
  {
    key: 'uv', icon: '💡', image: IMG.uv, productSlug: 'zeller-gmelin-uv-offset-murekkepleri', brands: ['Zeller+Gmelin'],
    name: { tr: 'UV ve LED-UV ofset mürekkepleri', en: 'UV and LED-UV offset inks', ru: 'УФ и LED-UV офсетные краски', ar: 'أحبار الأوفست UV وLED-UV' },
    summary: { tr: 'UV ışığıyla saniyeler içinde kürlenen, emici olmayan yüzeylere yapışan mürekkepler.', en: 'Cured in seconds under UV light; adhere to non-absorbent substrates.', ru: 'Отверждаются за секунды под УФ; адгезия к невпитывающим материалам.', ar: 'تجف في ثوانٍ تحت الأشعة فوق البنفسجية وتلتصق بالأسطح غير الماصة.' },
    whenToUse: { tr: 'Plastik, metalize karton ve sentetik kâğıt baskılarında; etiket ve lüks ambalajda; aynı gün teslim gerektiren işlerde; LED-UV ile ısıya duyarlı malzemelerde.', en: 'Plastics, metallised board and synthetic paper; labels and luxury packaging; same-day jobs; heat-sensitive substrates with LED-UV.', ru: 'Пластики, металлизированный картон, синтетическая бумага; этикетки и премиальная упаковка; срочные работы; LED-UV для термочувствительных материалов.', ar: 'البلاستيك والكرتون المعدني والورق الصناعي؛ الملصقات والتغليف الفاخر؛ الأعمال العاجلة؛ المواد الحساسة للحرارة مع LED-UV.' },
    body: {
      tr: [
        'UV mürekkepler çözücü içermez; fotobaşlatıcılar UV lamba altında polimerizasyonu tetikler ve mürekkep saniyeler içinde kürlenir. Kuruma beklemeden kesim, selefon ve sevkiyata geçilebilir; PVC, PP, PET ve metalize yüzeylerde konvansiyonel mürekkebin kuruyamadığı yerde yapışma sağlar. LED-UV versiyonları ısısız kürleme ve düşük enerji tüketimiyle standart makinelere de uyarlanabilir. UV mürekkep konvansiyonelle karıştırılamaz, ayrı yıkama kimyasalı ister ve kürlenme derecesi sürtünme ve çözücü testiyle düzenli kontrol edilmelidir.',
        'SIM, Alman [Zeller+Gmelin UV ofset mürekkeplerinin](/urunler/zeller-gmelin-uv-offset-murekkepleri) Türkiye distribütörüdür; seri seçimi kürleme ünitesi (klasik UV, LED-UV, H-UV) ve yüzeye göre yapılır, gıda ambalajı için düşük migrasyonlu seçenekler vardır. UV sisteme geçişte EPDM blanket ve UV uyumlu merdane gerekir; ekibimiz makine başında kürleme testi yapar. Teknoloji ayrıntıları [UV mürekkep teknolojisi](/blog/uv-murekkep-teknolojisi) yazımızda.',
      ],
      en: [
        'UV inks contain no solvent; photoinitiators trigger polymerisation under the UV lamp and the ink cures in seconds. Cutting, lamination and dispatch can follow immediately, and the ink adheres to PVC, PP, PET and metallised surfaces where conventional ink cannot dry. LED-UV versions cure without heat and with lower energy use.',
        'SIM is the Turkish distributor of German [Zeller+Gmelin UV offset inks](/urunler/zeller-gmelin-uv-offset-murekkepleri); the series is chosen by curing unit (conventional UV, LED-UV, H-UV) and substrate, with low-migration grades for food packaging. Converting a press to UV requires an EPDM blanket and UV-compatible rollers; our team runs curing tests at the press. See [UV ink technology](/blog/uv-murekkep-teknolojisi).',
      ],
      ru: ['УФ-краски не содержат растворителей; фотоинициаторы запускают полимеризацию под УФ-лампой, и краска отверждается за секунды. Адгезия к ПВХ, ПП, ПЭТ и металлизированным поверхностям; LED-UV — без нагрева.', 'SIM — дистрибьютор [УФ-красок Zeller+Gmelin](/urunler/zeller-gmelin-uv-offset-murekkepleri) в Турции; серия подбирается по сушке и материалу, есть низкомиграционные марки для пищевой упаковки.'],
      ar: ['لا تحتوي أحبار UV على مذيبات؛ تطلق المبادرات الضوئية البلمرة تحت مصباح UV فيجف الحبر في ثوانٍ، ويلتصق بـ PVC وPP وPET والأسطح المعدنية. وتجف نسخ LED-UV دون حرارة.', 'SIM هي الموزع التركي لأحبار [Zeller+Gmelin UV](/urunler/zeller-gmelin-uv-offset-murekkepleri)؛ تُختار السلسلة وفق نظام التجفيف والسطح، مع درجات منخفضة الهجرة لتغليف الأغذية.'],
    },
  },
  {
    key: 'metallic', icon: '✨', image: IMG.gold, productSlug: 'eva-color-gold-metalik-murekkepler', brands: ['EVA COLOR', 'SCHLENK'],
    name: { tr: 'Metalik ve yaldız mürekkepler', en: 'Metallic and gold inks', ru: 'Металлик-краски (золото, серебро)', ar: 'الأحبار المعدنية والذهبية' },
    summary: { tr: 'Bronz ve alüminyum pigmentle tek geçişte altın/gümüş efekt; EVA COLOR üretimi, SCHLENK pigmenti.', en: 'Gold/silver effect in one pass with bronze and aluminium pigments; made by EVA COLOR, SCHLENK pigments.', ru: 'Золото/серебро за один прогон на бронзовых и алюминиевых пигментах; производство EVA COLOR, пигменты SCHLENK.', ar: 'تأثير ذهبي/فضي في مرور واحد بصبغات البرونز والألومنيوم؛ إنتاج EVA COLOR وصبغات SCHLENK.' },
    whenToUse: { tr: 'Lüks ambalaj, içecek ve kozmetik etiketleri, davetiye, sertifika ve kapaklarda; orta tirajda sıcak yaldızın ekonomik alternatifi olarak; tramlı ve ince detaylı metalik işlerde.', en: 'Luxury packaging, beverage and cosmetics labels, invitations, certificates and covers; the economical alternative to hot-foil on medium runs.', ru: 'Премиальная упаковка, этикетки напитков и косметики, приглашения, обложки; альтернатива горячему тиснению на средних тиражах.', ar: 'التغليف الفاخر وملصقات المشروبات ومستحضرات التجميل والدعوات والشهادات والأغلفة؛ بديل اقتصادي عن الفويل الحراري.' },
    body: {
      tr: [
        'Metalik mürekkepte bronz (altın) veya alüminyum (gümüş) plakacıklar mürekkep filmi içinde yatay dizilip ışığı aynasal yansıtır; parlaklık 60° gloss (GU) ile ölçülür ve parlak kuşede 85–95 GU\'ya ulaşır. Bakır–çinko oranı altının sıcaklığını belirler; PANTONE 871–877 referansları en yaygın hedeflerdir. En iyi sonuç parlak kuşe kâğıtta, yeterli film kalınlığında ve koruyucu dispersiyon lakla alınır; mat ve emici yüzeylerde astar ya da yüksek pigmentli seri önerilir.',
        '[EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) ve [Silver](/urunler/eva-color-silver-metalik-murekkepler) serileri SIM\'in kendi üretimidir; pigmentte Alman [SCHLENK](/urunler/schlenk-metalik-murekkepler) distribütörlüğü. Üretim ve baskı ipuçları [metalik mürekkep üretimi](/blog/metalik-murekkep-uretimi) ve [yaldız baskı teknikleri](/blog/yaldiz-baski-teknikleri-altin-gumus) yazılarında.',
      ],
      en: [
        'In a metallic ink, bronze (gold) or aluminium (silver) platelets align flat in the film and reflect light specularly; brilliance is measured as 60° gloss and reaches 85–95 GU on gloss-coated paper. The copper–zinc ratio sets the warmth of the gold; PANTONE 871–877 are the usual targets.',
        'The [EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) and [Silver](/urunler/eva-color-silver-metalik-murekkepler) series are manufactured by SIM in Istanbul, with [SCHLENK](/urunler/schlenk-metalik-murekkepler) pigments distributed from Germany. Production and press tips are in [metallic ink production](/blog/metalik-murekkep-uretimi) and [metallic printing techniques](/blog/yaldiz-baski-teknikleri-altin-gumus).',
      ],
      ru: ['Бронзовые (золото) или алюминиевые (серебро) пластинки отражают свет зеркально; блеск измеряется как 60° gloss и достигает 85–95 GU на глянцевой бумаге. Целевые оттенки — PANTONE 871–877.', 'Серии [EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) и [Silver](/urunler/eva-color-silver-metalik-murekkepler) производит SIM; пигменты [SCHLENK](/urunler/schlenk-metalik-murekkepler) — дистрибуция из Германии.'],
      ar: ['تصطف صفائح البرونز (الذهبي) أو الألومنيوم (الفضي) أفقياً وتعكس الضوء مرآوياً؛ يُقاس اللمعان عند 60° ويبلغ 85–95 GU على الورق المصقول. المراجع المعتادة PANTONE 871–877.', 'سلسلتا [EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) و[Silver](/urunler/eva-color-silver-metalik-murekkepler) من إنتاج SIM؛ وصبغات [SCHLENK](/urunler/schlenk-metalik-murekkepler) بالتوزيع من ألمانيا.'],
    },
  },
  {
    key: 'fluorescent', icon: '🟢', image: IMG.fluo, productSlug: 'eva-color-fluorescent-murekkepler', brands: ['EVA COLOR'],
    name: { tr: 'Floresan (neon) mürekkepler', en: 'Fluorescent (neon) inks', ru: 'Флуоресцентные (неоновые) краски', ar: 'الأحبار الفلورية (النيون)' },
    summary: { tr: 'PANTONE 801–814 neon referansları; SIM üretimi EVA COLOR Floresan serisi.', en: 'PANTONE 801–814 neon references; EVA COLOR Fluorescent series made by SIM.', ru: 'Референсы PANTONE 801–814; серия EVA COLOR Fluorescent производства SIM.', ar: 'مراجع PANTONE 801–814؛ سلسلة EVA COLOR الفلورية من إنتاج SIM.' },
    whenToUse: { tr: 'Promosyon ve kampanya baskıları, dikkat çekmesi gereken etiket ve fiyat kartları, gençlik ürünü ambalajları ve etkinlik materyallerinde; uzun raf ömrü istenen işlerde ışık haslığı testi yapılmalıdır.', en: 'Promotional print, labels and price tags that must stand out, youth-oriented packaging and event materials.', ru: 'Промо-печать, этикетки и ценники, молодёжная упаковка, материалы мероприятий.', ar: 'المطبوعات الترويجية والملصقات وبطاقات الأسعار اللافتة وعبوات منتجات الشباب ومواد الفعاليات.' },
    body: {
      tr: [
        'Floresan pigmentler UV ve görünür ışığı emip daha uzun dalga boyunda geri yaydığı için standart renklerden belirgin biçimde canlı görünür. Film kalınlığına duyarlıdır (çift geçiş veya kalın film gerekebilir), ışık haslığı düşüktür; beyaz parlak kuşe en canlı sonucu verir. Dış mekân işlerinde UV koruyucu lak önerilir. Floresan mürekkep genellikle ayrı bir ünitede veya özel renk ünitesinde basılır; standart CMYK ile aynı makinede çalışabilir, ancak yıkama sonrası kalıntı kontrolü gerekir.',
        '[EVA COLOR Floresan serisi](/urunler/eva-color-fluorescent-murekkepler) SIM üretimidir, PANTONE 801–814 referanslarını karşılar; özel neon tonları laboratuvarda formüle edilir. Uygulama ayrıntıları [floresan mürekkep rehberinde](/blog/floresan-murekkepler-uygulama-rehberi).',
      ],
      en: [
        'Fluorescent pigments absorb UV and visible light and re-emit it at longer wavelengths, so they look far more vivid than standard colours. They are sensitive to film thickness (a double hit may be needed) and have lower lightfastness; white gloss-coated paper gives the brightest result, and a UV-protective varnish is recommended outdoors.',
        'The [EVA COLOR Fluorescent series](/urunler/eva-color-fluorescent-murekkepler) is manufactured by SIM to PANTONE 801–814 references; custom neon shades are formulated in the laboratory. Application details are in the [fluorescent ink guide](/blog/floresan-murekkepler-uygulama-rehberi).',
      ],
      ru: ['Флуоресцентные пигменты переизлучают свет и выглядят гораздо ярче обычных; чувствительны к толщине слоя, светостойкость ниже; для улицы нужен УФ-защитный лак.', 'Серию [EVA COLOR Fluorescent](/urunler/eva-color-fluorescent-murekkepler) производит SIM по PANTONE 801–814; особые оттенки формулируются в лаборатории.'],
      ar: ['تعيد الصبغات الفلورية إصدار الضوء فتبدو أكثر حيوية بكثير؛ حساسة لسماكة الطبقة وثباتها الضوئي أقل؛ يُنصح بورنيش واقٍ للاستخدام الخارجي.', 'سلسلة [EVA COLOR الفلورية](/urunler/eva-color-fluorescent-murekkepler) من إنتاج SIM وفق PANTONE 801–814؛ وتُصاغ درجات النيون الخاصة في المختبر.'],
    },
  },
  {
    key: 'pantone', icon: '🎨', image: IMG.pantone, productSlug: 'sakata-inx-pantone-murekkepler', brands: ['SAKATA INX', 'EVA COLOR'],
    name: { tr: 'PANTONE ve özel renk mürekkepleri', en: 'PANTONE and custom colour inks', ru: 'Краски PANTONE и цвета на заказ', ar: 'أحبار PANTONE والألوان الخاصة' },
    summary: { tr: 'Stoktan PANTONE serileri ve 24/7 laboratuvarda Delta E < 1,5 hedefli özel renkler.', en: 'PANTONE series from stock and custom colours from the 24/7 lab at Delta E below 1.5.', ru: 'Серии PANTONE со склада и цвета на заказ из лаборатории 24/7 с Delta E < 1,5.', ar: 'سلاسل PANTONE من المخزون وألوان خاصة من مختبر 24/7 بهدف Delta E أقل من 1.5.' },
    whenToUse: { tr: 'Logo ve kurumsal renkler, ambalaj marka renkleri, CMYK gamutu dışındaki canlı tonlar ve 5./6. ünite baskılarında.', en: 'Logo and brand colours, packaging brand tones, vivid shades outside the CMYK gamut and fifth/sixth-unit printing.', ru: 'Фирменные цвета логотипов и упаковки, яркие оттенки вне охвата CMYK, печать на 5-й и 6-й секциях.', ar: 'ألوان الشعارات والهوية وألوان العلامات على العبوات والدرجات خارج نطاق CMYK والطباعة بالوحدتين الخامسة والسادسة.' },
    body: {
      tr: [
        'PANTONE mürekkepleri, dört renk tramıyla elde edilemeyen kurumsal renkleri tek geçişte ve tutarlı basar; her referans temel renklerin belirli oranlarda karışımıdır ve kâğıt tipine göre (C/U) farklı görünür. Doğruluk spektrofotometreyle ölçülen Delta E ile kanıtlanır. Kuşe (C) ve 1. hamur (U) referansları aynı mürekkeple farklı göründüğünden hedef kâğıt formülasyondan önce belirlenir.',
        `Stoktan [SAKATA INX PANTONE serisi](/urunler/sakata-inx-pantone-murekkepler); stokta olmayan veya kurumsal bir renk için ${F.labAvailability} çalışan laboratuvarımızda [özel renk üretimi](/urunler/ozel-renkler): PANTONE kodu, numune veya L*a*b* değeri yeterlidir, hedef Delta E < ${DE.tr}, numune onayından sonra ${F.customColorLeadTimeDays} iş günü, minimum ${F.customColorMinimumKg} kg, aylık ${CAP.tr} kg kapasite. Süreç [özel renk eşleştirme](/blog/ozel-renk-eslestirme) yazısında.`,
      ],
      en: [
        'PANTONE inks print brand colours that four-colour screening cannot reach, in one pass and consistently; each reference is a defined mix of base colours and looks different by paper type (C/U). Accuracy is proven as a spectrophotometer-measured Delta E.',
        `[SAKATA INX PANTONE series](/urunler/sakata-inx-pantone-murekkepler) from stock; for shades not in stock or a brand colour, [custom colour production](/urunler/ozel-renkler) in our ${F.labAvailability} laboratory: a PANTONE code, sample or L*a*b* value is enough, target Delta E below ${DE.en}, ${F.customColorLeadTimeDays} working days after sample approval, minimum ${F.customColorMinimumKg} kg, ${CAP.en} kg monthly capacity. Recipes are archived for repeat export orders. The process is described in [custom colour matching](/blog/ozel-renk-eslestirme).`,
      ],
      ru: ['Краски PANTONE печатают фирменные цвета за один прогон; каждый референс — заданная смесь базовых цветов, выглядящая по-разному на бумаге C/U. Точность подтверждается Delta E.', `[Серия SAKATA INX PANTONE](/urunler/sakata-inx-pantone-murekkepler) со склада; [цвета на заказ](/urunler/ozel-renkler) из лаборатории ${F.labAvailability}: Delta E ниже ${DE.tr}, ${F.customColorLeadTimeDays} рабочих дня после утверждения образца, минимум ${F.customColorMinimumKg} кг.`],
      ar: ['تطبع أحبار PANTONE ألوان الهوية في مرور واحد وبثبات؛ وكل مرجع خلطة محددة من الألوان الأساسية تبدو مختلفة حسب نوع الورق (C/U). تُثبت الدقة بقياس Delta E.', `[سلسلة SAKATA INX PANTONE](/urunler/sakata-inx-pantone-murekkepler) من المخزون؛ و[الألوان الخاصة](/urunler/ozel-renkler) من مختبرنا العامل ${F.labAvailability}: Delta E أقل من ${DE.en}، ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة، حد أدنى ${F.customColorMinimumKg} كجم.`],
    },
  },
  {
    key: 'lowmigration', icon: '🍽', image: IMG.uv, productSlug: 'zeller-gmelin-uv-offset-murekkepleri', brands: ['Zeller+Gmelin', 'SAKATA INX'],
    name: { tr: 'Düşük migrasyonlu (gıda ambalajı) mürekkepler', en: 'Low-migration (food packaging) inks', ru: 'Низкомиграционные краски (пищевая упаковка)', ar: 'أحبار منخفضة الهجرة (تغليف الأغذية)' },
    summary: { tr: 'Gıda, oyuncak ve kozmetik ambalajı için migrasyon sınırlarına uygun UV ve konvansiyonel seriler.', en: 'UV and conventional series meeting migration limits for food, toy and cosmetics packaging.', ru: 'УФ и конвенциональные серии, отвечающие пределам миграции для пищевой упаковки.', ar: 'سلاسل UV وتقليدية تستوفي حدود الهجرة لتغليف الأغذية والألعاب ومستحضرات التجميل.' },
    whenToUse: { tr: 'Birincil ve ikincil gıda ambalajı, çay–kahve–şekerleme kutuları, ilaç ve kozmetik kutuları; AB 1935/2004 kapsamındaki tüm işlerde ve müşterinin migrasyon belgesi istediği her ambalaj projesinde.', en: 'Primary and secondary food packaging, tea, coffee and confectionery cartons, pharma and cosmetics boxes; every job under EU 1935/2004.', ru: 'Первичная и вторичная пищевая упаковка, коробки чая, кофе и кондитерских изделий, фарма и косметика; работы под EU 1935/2004.', ar: 'التغليف الغذائي الأولي والثانوي وعلب الشاي والقهوة والحلويات وعلب الأدوية ومستحضرات التجميل؛ كل الأعمال ضمن EU 1935/2004.' },
    body: {
      tr: [
        'Düşük migrasyonlu mürekkepler, bileşenlerinin ambalaj üzerinden gıdaya geçişini (migrasyon) AB 1935/2004, 10/2011 ve Swiss Ordinance sınırları içinde tutacak şekilde formüle edilir; EuPIA uyum beyanı ve migrasyon uyum sertifikası ile belgelenir. Yalnızca mürekkep değil, lak ve yapıştırıcı da düşük migrasyonlu olmalıdır. Uygulamada fonksiyonel bariyer, kuruma derecesi ve ambalaj yapısı birlikte değerlendirilir; nihai uygunluk ambalaj üreticisinin migrasyon testiyle doğrulanır.',
        'SIM, Zeller+Gmelin düşük migrasyonlu UV serilerini ve SAKATA INX\'in gıda ambalajına uygun konvansiyonel seçeneklerini belgeleriyle sunar; teknik ekibimiz ambalaj yapısına göre doğru kombinasyonu önerir. Mevzuat ve test çerçevesi [gıda ambalajında güvenli mürekkepler](/blog/gida-ambalajinda-guvenli-baski-murekkeleri) yazımızda.',
      ],
      en: [
        'Low-migration inks are formulated so that their components do not migrate through the packaging into food beyond the limits of EU 1935/2004, 10/2011 and the Swiss Ordinance; they are documented with an EuPIA compliance statement and a migration certificate. Varnish and adhesive must be low-migration as well, not only the ink.',
        'SIM supplies Zeller+Gmelin low-migration UV series and SAKATA INX conventional options suitable for food packaging, with documentation in English; our technical team recommends the right combination for the packaging structure. The regulatory and test framework is in [safe inks for food packaging](/blog/gida-ambalajinda-guvenli-baski-murekkeleri).',
      ],
      ru: ['Низкомиграционные краски формулируются так, чтобы их компоненты не переходили в продукт сверх пределов EU 1935/2004, 10/2011 и Swiss Ordinance; подтверждаются декларацией EuPIA и сертификатом миграции. Лак и клей также должны быть низкомиграционными.', 'SIM поставляет низкомиграционные УФ-серии Zeller+Gmelin и подходящие конвенциональные варианты SAKATA INX с документацией на английском.'],
      ar: ['تُصاغ الأحبار منخفضة الهجرة بحيث لا تهاجر مكوناتها إلى الغذاء بما يتجاوز حدود EU 1935/2004 و10/2011 وSwiss Ordinance؛ وتُوثَّق بإقرار EuPIA وشهادة هجرة. ويجب أن يكون الورنيش واللاصق منخفضي الهجرة أيضاً.', 'توفر SIM سلاسل Zeller+Gmelin UV منخفضة الهجرة وخيارات SAKATA INX التقليدية المناسبة لتغليف الأغذية مع وثائق بالإنجليزية.'],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — TR                                                   */
/* ------------------------------------------------------------------ */
const TR: HubContent = {
  meta: {
    title: 'Matbaa Mürekkepleri: Ofset, UV, Metalik, PANTONE | Üretici',
    description: 'Matbaa mürekkepleri: ofset, UV, metalik, floresan, PANTONE ve düşük migrasyonlu türler, marka matrisi, seçim tablosu, fiyatlar. SIM üretici ve distribütör.',
    keywords: ['matbaa mürekkepleri', 'matbaa mürekkebi', 'ofset mürekkep', 'ofset mürekkepleri', 'matbaa boyası', 'mürekkep fiyatları', 'mürekkep üreticileri', 'UV mürekkep', 'metalik mürekkep', 'PANTONE mürekkep', 'matbaa mürekkep tedarikçisi'],
  },
  pageName: 'Matbaa Mürekkepleri',
  hero: {
    eyebrow: `${YEARS} yıldır mürekkep üreticisi ve distribütörü`,
    h1: 'Matbaa Mürekkepleri: Türleri, Seçimi ve Tedariki',
    lead: 'Konvansiyonel tabaka ofsetten UV ve LED-UV\'ye, metalik ve floresandan PANTONE ve düşük migrasyonlu serilere kadar matbaa mürekkeplerinin tamamı tek sayfada: hangi tür hangi işe uyar, hangi marka hangi türü üretir, seçimde neye bakılır, fiyatı ne belirler. SIM Baskı Malzemeleri EVA COLOR markasıyla üretici, SAKATA INX, Zeller+Gmelin ve SCHLENK için Türkiye distribütörüdür.',
  },
  shortAnswer: {
    title: 'Kısa cevap',
    text: `Matbaa mürekkepleri (halk dilinde matbaa boyası), kalıptan kâğıda renk taşıyan pigmentli sistemlerdir ve altı ana türe ayrılır: konvansiyonel tabaka ofset (CMYK), UV/LED-UV, metalik, floresan, PANTONE/özel renk ve düşük migrasyonlu gıda ambalajı mürekkepleri. Seçimi baskı sistemi, kâğıt ve son işlem belirler. SIM, EVA COLOR metalik ve floresan mürekkeplerini İstanbul'da üretir; SAKATA INX, Zeller+Gmelin ve SCHLENK'in Türkiye distribütörüdür; özel renkleri ${F.labAvailability} laboratuvarda Delta E < ${DE.tr} hedefiyle formüle eder.`,
  },
  keyFacts: {
    title: 'Temel bilgiler',
    rows: [
      { label: 'Mürekkep türleri', value: 'Konvansiyonel ofset (CMYK), UV/LED-UV, metalik, floresan, PANTONE/özel renk, düşük migrasyon' },
      { label: 'Markalar', value: `SAKATA INX (Japonya, ${SAKATA_SINCE}'den beri), Zeller+Gmelin (Almanya), SCHLENK (Almanya) distribütörlüğü · EVA COLOR (SIM üretimi)` },
      { label: 'Standartlar', value: 'ISO 2846-1 uyumlu CMYK; ISO 12647-2 hedefli ICC desteği; EuPIA; gıda ambalajı için düşük migrasyon beyanı' },
      { label: 'Özel renk', value: `${F.labAvailability} laboratuvar, Delta E < ${DE.tr}, numune onayından sonra ${F.customColorLeadTimeDays} iş günü, minimum ${F.customColorMinimumKg} kg, aylık ${CAP.tr} kg` },
      { label: 'Teslimat', value: `İstanbul içi stok ürünlerde aynı gün (${F.sameDayCutoff}'ye kadar), Türkiye geneli ${F.domesticLeadTimeDays} iş günü, ihracat kara/deniz/hava` },
      { label: 'Belgeler', value: 'TDS ve SDS (TR/EN) talep üzerine; distribütörlük belgeleri; ölçüm raporu' },
    ],
  },
  what: {
    title: 'Matbaa mürekkebi nedir, nasıl çalışır?',
    paragraphs: [
      'Matbaa mürekkebi; renk veren pigment, pigmenti taşıyan ve yüzeye bağlayan vernik–reçine sistemi (bağlayıcı), kurumayı sağlayan kurutucu ya da fotobaşlatıcılar ve akışı ayarlayan katkılardan oluşan macun kıvamında bir malzemedir. Ofset baskıda su ile mürekkebin birbirini itmesi ilkesiyle çalışır: kalıbın görüntü alanı mürekkebi, görüntüsüz alanı nemlendirme suyunu alır; mürekkep blankete, oradan kâğıda geçer. Bu yüzden mürekkebin tack (yapışkanlık), viskozite ve su toleransı değerleri makineyle, kâğıtla ve kimyasalla uyumlu olmak zorundadır.',
      'Kuruma mekanizması türleri ayırır. Konvansiyonel mürekkep kâğıda emilerek set olur ve oksidasyonla sertleşir; UV mürekkep çözücü içermez, UV ışığında saniyeler içinde kürlenir; metalik ve floresan mürekkepler özel pigmentler taşır ve film kalınlığına duyarlıdır; PANTONE ve özel renkler temel renklerin ölçülü karışımıdır; düşük migrasyonlu seriler gıda ambalajı mevzuatına göre formüle edilir. "Matbaa boyası" ifadesi günlük dilde aynı ürün grubunu anlatır; teknik belgelerde "mürekkep" kullanılır.',
      `Doğru mürekkep, en pahalı ya da en ucuz olan değil, baskı sistemi, kâğıt, son işlem ve mevzuat gereksinimiyle uyumlu olandır. Bu rehber altı türü, marka × tür matrisini, seçim tablosunu ve fiyat faktörlerini bir araya getirir; mürekkebin blanket, kimyasal ve lakla ilişkisi için [matbaa malzemeleri rehberine](/matbaa-malzemeleri) bakın. SIM bu mürekkepleri ${YEARS} yıldır Türkiye matbaa sektörüne sağlıyor.`,
    ],
  },
  types: {
    title: 'Matbaa mürekkebi türleri',
    intro: 'Her tür için ne olduğunu, ne zaman kullanıldığını ve SIM\'de hangi markanın bulunduğunu özetledik; ürün sayfalarında teknik özellikler ve SSS yer alır.',
    viewLabel: 'Ürünü incele',
    whenLabel: 'Ne zaman kullanılır',
    brandsLabel: 'SIM\'de markalar',
  },
  matrix: {
    title: 'Marka × mürekkep türü matrisi',
    intro: 'Hangi markayı hangi tür için stokluyor veya üretiyoruz? Matris, teklif istemeden önce doğru marka–tür eşleşmesini gösterir.',
    headers: ['Marka', 'CMYK ofset', 'UV / LED-UV', 'Metalik', 'Floresan', 'PANTONE / özel', 'Düşük migrasyon'],
    brands: ['SAKATA INX', 'Zeller+Gmelin', 'SCHLENK', 'EVA COLOR'],
    rows: [
      ['SAKATA INX', '✓ Stok', '–', '–', '–', '✓ Stok serisi', '✓ Uygun seriler'],
      ['Zeller+Gmelin', '–', '✓ Stok', '–', '–', '✓ UV özel renk', '✓ LM-UV serisi'],
      ['SCHLENK', '–', '–', '✓ Pigment ve mürekkep', '–', '–', '–'],
      ['EVA COLOR', '–', '✓ UV metalik (talep üzerine)', '✓ Üretim (Gold, Silver)', '✓ Üretim', '✓ Laboratuvar üretimi', '–'],
    ],
    note: 'SAKATA INX: Japonya, CMYK ve PANTONE tabaka ofset. Zeller+Gmelin: Almanya, UV ve LED-UV. SCHLENK: Almanya, metalik pigment. EVA COLOR: SIM üretimi, İstanbul. Tüm distribütörlükler için resmi belge talep üzerine paylaşılır.',
  },
  selection: {
    title: 'Mürekkep seçim rehberi: karar tablosu',
    intro: 'Seçim baskı koşullarından başlar. Aşağıdaki tablo her kriter için seçenekleri ve önerimizi sıralar; ayrıntılı yedi kriter [ofset mürekkep seçimi](/blog/ofset-murekkep-secimi) yazısında.',
    headers: ['Kriter', 'Seçenekler', 'Öneri'],
    rows: [
      { criterion: 'Kâğıt / yüzey', options: 'Kuşe, 1. hamur, karton, metalize, plastik', advice: 'Kâğıt ve karton: konvansiyonel; metalize ve plastik: UV/LED-UV; mat kâğıtta metalik parlaklık düşer' },
      { criterion: 'Baskı makinesi', options: 'Konvansiyonel, UV, LED-UV, hibrit; tabaka / web', advice: 'Kürleme ünitesi yoksa UV seçilmez; hibrit makinede ayrı merdane ve blanket seti' },
      { criterion: 'Kuruma süresi', options: 'Standart, hızlı set, anında (UV)', advice: 'Aynı gün son işlem: hızlı set veya UV; perfektörde set-off dirençli seri' },
      { criterion: 'Renk hedefi', options: 'CMYK (FOGRA/GRACoL), PANTONE, kurumsal özel renk', advice: 'Marka rengi: spot mürekkep; CMYK simülasyonu yalnızca geniş toleranslı işlerde' },
      { criterion: 'Parlaklık ve efekt', options: 'Standart, metalik, floresan, lak', advice: 'Metalik için parlak kuşe + koruyucu lak; floresan için beyaz parlak kuşe' },
      { criterion: 'Haslık', options: 'Sürtünme, ışık, kimyasal', advice: 'Ambalaj ve etikette sürtünme testi; dış mekânda ışık haslığı; kozmetikte kimyasal direnç' },
      { criterion: 'Mevzuat', options: 'Gıda, oyuncak, kozmetik', advice: 'Düşük migrasyonlu seri + EuPIA beyanı + migrasyon sertifikası; lak ve yapıştırıcı da uyumlu' },
      { criterion: 'Tiraj ve maliyet', options: 'Kısa, orta, uzun', advice: 'Kilogram fiyatı değil bin tabaka başına tüketim; uzun tirajda lot tutarlılığı ve stok anlaşması' },
    ],
  },
  maker: {
    title: 'Üretici mi, distribütör mü? SIM ikisi de',
    paragraphs: [
      `İki yapı birbirini tamamlar. Üretici olarak EVA COLOR metalik, floresan ve özel renk ofset mürekkeplerini İstanbul'daki tesisimizde üretiyoruz: ${F.labAvailability} çalışan laboratuvar, aylık ${CAP.tr} kg özel renk kapasitesi, reçete arşivi ve spektrofotometrik kontrol. Distribütör olarak SAKATA INX (CMYK ve PANTONE), Zeller+Gmelin (UV) ve SCHLENK (metalik pigment) için resmi Türkiye distribütörüyüz; bu markaların standart serileri Beylikdüzü deposunda stokta tutulur.`,
      'Müşteri için anlamı şudur: standart işler için ithal markaların kanıtlanmış serileri stoktan aynı gün, kurumsal renk ve efekt işleri için üreticinin esnekliğiyle laboratuvardan birkaç gün içinde; her iki durumda da aynı teknik ekip makine başında. Hangi markaların hangi türü kapsadığını yukarıdaki matris, şirket tarihçesini ve belgeleri [Hakkımızda](/hakkimizda) sayfası anlatır.',
    ],
    facts: [
      { label: 'Üretim', value: 'EVA COLOR metalik, floresan, özel renk' },
      { label: 'Distribütörlük', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK` },
      { label: 'Laboratuvar', value: `${F.labAvailability}, aylık ${CAP.tr} kg, Delta E < ${DE.tr}` },
      { label: 'Kuruluş', value: `${F.foundingYear}, İstanbul` },
    ],
  },
  price: {
    title: 'Matbaa mürekkebi fiyatlarını etkileyen faktörler',
    intro: 'Mürekkep fiyatları tek bir liste rakamı değildir; aynı tür içinde hammadde, marka, ambalaj ve teknik gereksinim geniş bir aralık oluşturur. Teklifi karşılaştırırken kilogram fiyatı yerine bin tabaka başına maliyet esas alınmalıdır.',
    factors: [
      { name: 'Pigment ve hammadde', text: 'Metalik bronz/alüminyum, floresan pigment ve UV fotobaşlatıcılar maliyeti CMYK\'ya göre katlar; yüksek pigment oranı kilogram fiyatını artırır ama tüketimi düşürür.' },
      { name: 'Tür ve kuruma sistemi', text: 'UV ve LED-UV seriler konvansiyonelden pahalıdır; karşılığında kuruma beklemesi ve toz tüketimi ortadan kalkar.' },
      { name: 'Marka ve menşe', text: 'Japon, Alman ithal seriler ile SIM üretimi EVA COLOR farklı fiyat–performans noktalarındadır; ikisi de aynı belgelerle sunulur.' },
      { name: 'Ambalaj ve miktar', text: '1 kg, 2,5 kg kutu ve 20 kg bidonda birim fiyat düşer; düzenli siparişlerde yıllık anlaşma fiyatı.' },
      { name: 'Özel renk formülasyonu', text: `Laboratuvar süresi ve numune; minimum ${F.customColorMinimumKg} kg; tekrar siparişte reçete hazır olduğu için maliyet düşer.` },
      { name: 'Mevzuat ve belge', text: 'Düşük migrasyon, sertifika ve test raporları formülasyon ve belge yükünü artırır.' },
    ],
  },
  support: {
    title: 'Teknik destek ve renk eşleme',
    text: `Mürekkep seçimi makine başında doğrulanır: teknik ekibimiz deneme baskısına eşlik eder, dansite ve dot gain ölçer, su–mürekkep dengesini ve kurumayı kontrol eder. Renk eşlemede PANTONE kodu, baskılı numune veya L*a*b* değeri yeterlidir; laboratuvar spektrofotometreyle Delta E < ${DE.tr} hedefler ve reçeteyi arşivler. Kuruma, emülsifikasyon ve tonlama problemlerinde telefonla uzaktan tanı, gerektiğinde İstanbul içinde aynı gün saha ziyareti yapılır. TDS ve SDS belgeleri Türkçe ve İngilizce paylaşılır.`,
  },
  faq: {
    title: 'Matbaa mürekkepleri hakkında sık sorulan sorular',
    items: [
      { q: 'Matbaa mürekkebi kaç çeşittir?', a: 'Altı ana tür vardır: konvansiyonel tabaka ofset (CMYK), UV ve LED-UV, metalik/yaldız, floresan, PANTONE ve özel renk, düşük migrasyonlu gıda ambalajı mürekkepleri. Web ofset (heatset/coldset) ve flekso mürekkepleri ayrı baskı sistemlerine aittir; bu sayfa tabaka ofset mürekkeplerini kapsar.' },
      { q: 'Matbaa boyası ile matbaa mürekkebi aynı şey mi?', a: 'Evet; "matbaa boyası" günlük dilde, "matbaa mürekkebi" teknik belgelerde kullanılır. Her ikisi de kalıptan kâğıda renk taşıyan pigmentli ofset mürekkebini anlatır. Duvar veya metal boyasıyla karıştırılmamalıdır; kimyası ve kuruma mekanizması tamamen farklıdır.' },
      { q: 'Ofset mürekkebi ile UV mürekkep arasındaki fark nedir?', a: 'Konvansiyonel ofset mürekkebi kâğıda emilerek set olur ve oksidasyonla saatler içinde kurur; UV mürekkep çözücü içermez, UV lamba altında saniyeler içinde kürlenir ve plastik, metalize karton gibi emici olmayan yüzeylere yapışır. UV sistem ayrı blanket, merdane ve yıkama kimyasalı ister; ikisi karıştırılamaz.' },
      { q: 'Hangi marka matbaa mürekkebi iyidir?', a: 'İyi marka, işinize uyan türü belgeleriyle (TDS, SDS, ISO 2846-1 beyanı) sunan ve lot tutarlılığı sağlayandır. SIM\'de CMYK ve PANTONE için SAKATA INX, UV için Zeller+Gmelin, metalik pigment için SCHLENK, metalik ve floresan üretimi için EVA COLOR bulunur; marka × tür matrisi hangi markanın neyi kapsadığını gösterir.' },
      { q: 'Matbaa mürekkebi fiyatları nasıl belirlenir?', a: 'Pigment ve hammadde, tür ve kuruma sistemi, marka ve menşe, ambalaj ve miktar, özel renk formülasyonu ile mevzuat belgeleri fiyatı belirler. Doğru karşılaştırma kilogram fiyatıyla değil, bin tabaka başına mürekkep tüketimi ve fire ile yapılır; makine, kâğıt ve iş bilgisiyle aynı gün teklif veriyoruz.' },
      { q: 'PANTONE rengini CMYK ile basabilir miyim?', a: 'Gamut içindeki renkler yaklaşık olarak basılabilir, ancak canlı turuncu, yeşil, mor, pastel ve metalik tonlarda Delta E 2–5 kalır ve her baskıda değişebilir. Marka renkleri için spot PANTONE veya laboratuvarda üretilen özel renk mürekkebi önerilir.' },
      { q: 'Özel renk mürekkebi ne kadar sürede hazırlanır, minimum miktar nedir?', a: `Laboratuvar ${F.labAvailability} çalışır; PANTONE kodu, numune veya L*a*b* değeriyle formül hazırlanır, numune onayından sonra ${F.customColorLeadTimeDays} iş günü içinde teslim edilir. Minimum özel renk siparişi ${F.customColorMinimumKg} kg, aylık kapasite ${CAP.tr} kg; reçeteler arşivlenir.` },
      { q: 'Gıda ambalajı için hangi mürekkep gerekir?', a: 'Düşük migrasyonlu (LM) UV veya konvansiyonel mürekkep; AB 1935/2004 ve 10/2011 ile Swiss Ordinance çerçevesinde EuPIA uyum beyanı ve migrasyon uyum sertifikası gerekir. Lak ve yapıştırıcı da düşük migrasyonlu olmalı, uygulama test raporuyla doğrulanmalıdır.' },
      { q: 'Mürekkep nasıl depolanmalı, raf ömrü ne kadar?', a: 'Kapalı orijinal kutuda, doğrudan güneş ışığından uzak, serin ve kuru ortamda; açılmış kutuda anti-skin sprey veya kapak altı folyo kabuklanmayı önler. Raf ömrü ürüne göre TDS\'de belirtilir; metalik mürekkeplerde kutu sıkı kapatılmalı, gümüşte demir içeren aletlerden kaçınılmalıdır.' },
      { q: 'Matbaa mürekkebini nereden alabilirim, teslimat ne kadar sürer?', a: `SIM Beylikdüzü deposundan İstanbul içinde stok ürünlerde ${F.sameDayCutoff}'ye kadar verilen siparişlerde aynı gün, Türkiye geneli ${F.domesticLeadTimeDays} iş günü içinde teslimat yapıyoruz; depodan elden teslim de mümkündür. İhracat siparişleri İngilizce TDS/SDS ile kara, deniz veya hava yoluyla gönderilir.` },
    ],
  },
  related: { title: 'İlgili kaynaklar', postsTitle: 'Mürekkep yazıları', linksTitle: 'Sayfalar' },
  cta: {
    title: 'Matbaa mürekkebi için teklif alın',
    text: 'Makinenizi, kâğıdınızı ve işinizi yazın; doğru türü ve markayı aynı iş günü içinde önerelim, numune ve TDS ile başlayalım.',
    button: 'Teklif isteyin',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — EN (ihracat dili)                                    */
/* ------------------------------------------------------------------ */
const EN: HubContent = {
  meta: {
    title: 'Printing Inks Supplier in Turkey | Offset, UV, Metallic',
    description: 'Printing inks from Turkey: CMYK, UV, metallic, fluorescent, PANTONE and low-migration inks, brand matrix, selection table, prices. SIM, maker and distributor.',
    keywords: ['printing inks', 'printing ink supplier Turkey', 'printing inks Turkey', 'offset ink supplier Turkey', 'offset inks', 'UV offset ink', 'metallic ink manufacturer Turkey', 'PANTONE ink supplier', 'low migration ink', 'ink exporter Turkey'],
  },
  pageName: 'Printing Inks',
  hero: {
    eyebrow: `Ink manufacturer and distributor for ${YEARS} years`,
    h1: 'Printing Inks from Turkey: Types, Selection and Supply',
    lead: 'Every printing ink a sheetfed offset shop uses on one page: conventional CMYK, UV and LED-UV, metallic and fluorescent, PANTONE and custom colours, low-migration series for food packaging. Which type suits which job, which brand makes which type, what to check when selecting and what drives the price. SIM Printing Supplies manufactures the EVA COLOR range in Istanbul and distributes SAKATA INX, Zeller+Gmelin and SCHLENK in Turkey, exporting with English documentation.',
  },
  shortAnswer: {
    title: 'Short answer',
    text: `Printing inks are pigmented systems that carry colour from plate to paper and fall into six main types: conventional sheetfed offset (CMYK), UV/LED-UV, metallic, fluorescent, PANTONE/custom colour and low-migration inks for food packaging. Printing system, substrate and finishing decide the choice. SIM manufactures EVA COLOR metallic and fluorescent inks in Istanbul, is the Turkish distributor of SAKATA INX, Zeller+Gmelin and SCHLENK, and formulates custom colours in a ${F.labAvailability} laboratory to a Delta E below ${DE.en}, shipping across Turkey and to export markets.`,
  },
  keyFacts: {
    title: 'Key facts',
    rows: [
      { label: 'Ink types', value: 'Conventional offset (CMYK), UV/LED-UV, metallic, fluorescent, PANTONE/custom, low migration' },
      { label: 'Brands', value: `SAKATA INX (Japan, since ${SAKATA_SINCE}), Zeller+Gmelin (Germany), SCHLENK (Germany) distributorships · EVA COLOR (made by SIM)` },
      { label: 'Standards', value: 'ISO 2846-1 CMYK; ICC support targeting ISO 12647-2; EuPIA; low-migration statements for food packaging' },
      { label: 'Custom colour', value: `${F.labAvailability} laboratory, Delta E below ${DE.en}, ${F.customColorLeadTimeDays} working days after sample approval, minimum ${F.customColorMinimumKg} kg, ${CAP.en} kg per month` },
      { label: 'Lead time', value: `Same day in Istanbul for stock (orders by ${F.sameDayCutoff}), ${F.domesticLeadTimeDays} working days across Turkey, export by road, sea or air (EXW, FOB, CIF)` },
      { label: 'Documents', value: 'TDS and SDS in English on request; distributorship documents; measurement report' },
    ],
  },
  what: {
    title: 'What is a printing ink and how does it work?',
    paragraphs: [
      'A printing ink is a paste made of pigment (the colour), a varnish–resin vehicle that carries the pigment and binds it to the surface, driers or photoinitiators that make it dry, and additives that tune its flow. Offset printing relies on ink and water repelling each other: the image area of the plate accepts ink, the non-image area accepts fountain solution; the ink moves to the blanket and from there to the paper. Tack, viscosity and water tolerance therefore have to match the press, the paper and the chemistry.',
      'The drying mechanism separates the types. Conventional ink sets by absorption into the paper and hardens by oxidation; UV ink contains no solvent and cures in seconds under UV light; metallic and fluorescent inks carry special pigments and are sensitive to film thickness; PANTONE and custom colours are measured mixes of base colours; low-migration series are formulated to food-packaging regulation.',
      `The right ink is neither the most expensive nor the cheapest but the one matched to the printing system, substrate, finishing and regulatory requirement. This hub brings together the six types, the brand × type matrix, a selection table and the price factors; for how ink relates to blankets, chemicals and varnish see the [printing materials guide](/matbaa-malzemeleri). SIM has supplied these inks to the Turkish printing industry for ${YEARS} years and exports the same range.`,
    ],
  },
  types: {
    title: 'Types of printing ink',
    intro: 'For each type we summarise what it is, when it is used and which brand SIM holds; product pages carry specifications and FAQs.',
    viewLabel: 'View product',
    whenLabel: 'When to use',
    brandsLabel: 'Brands at SIM',
  },
  matrix: {
    title: 'Brand × ink type matrix',
    intro: 'Which brand do we stock or manufacture for which type? The matrix shows the right brand–type pairing before you request a quotation.',
    headers: ['Brand', 'CMYK offset', 'UV / LED-UV', 'Metallic', 'Fluorescent', 'PANTONE / custom', 'Low migration'],
    brands: ['SAKATA INX', 'Zeller+Gmelin', 'SCHLENK', 'EVA COLOR'],
    rows: [
      ['SAKATA INX', '✓ Stock', '–', '–', '–', '✓ Stock series', '✓ Suitable series'],
      ['Zeller+Gmelin', '–', '✓ Stock', '–', '–', '✓ UV custom colour', '✓ LM-UV series'],
      ['SCHLENK', '–', '–', '✓ Pigments and inks', '–', '–', '–'],
      ['EVA COLOR', '–', '✓ UV metallic (on request)', '✓ Manufactured (Gold, Silver)', '✓ Manufactured', '✓ Laboratory production', '–'],
    ],
    note: 'SAKATA INX: Japan, CMYK and PANTONE sheetfed offset. Zeller+Gmelin: Germany, UV and LED-UV. SCHLENK: Germany, metallic pigments. EVA COLOR: manufactured by SIM in Istanbul. Official distributorship documents for every brand on request.',
  },
  selection: {
    title: 'Ink selection guide: decision table',
    intro: 'Selection starts with press conditions. The table lists the options and our recommendation per criterion; the seven criteria in detail are in [offset ink selection](/blog/ofset-murekkep-secimi).',
    headers: ['Criterion', 'Options', 'Recommendation'],
    rows: [
      { criterion: 'Paper / substrate', options: 'Coated, uncoated, board, metallised, plastic', advice: 'Paper and board: conventional; metallised and plastic: UV/LED-UV; metallic brilliance drops on matte stock' },
      { criterion: 'Press', options: 'Conventional, UV, LED-UV, hybrid; sheetfed / web', advice: 'No curing unit, no UV; on a hybrid press a separate roller and blanket set' },
      { criterion: 'Drying time', options: 'Standard, fast-setting, instant (UV)', advice: 'Same-day finishing: fast-setting or UV; set-off resistant series on perfectors' },
      { criterion: 'Colour target', options: 'CMYK (FOGRA/GRACoL), PANTONE, brand custom colour', advice: 'Brand colour: spot ink; CMYK simulation only on wide-tolerance jobs' },
      { criterion: 'Gloss and effect', options: 'Standard, metallic, fluorescent, varnish', advice: 'Gloss-coated plus protective varnish for metallics; white gloss-coated for fluorescents' },
      { criterion: 'Fastness', options: 'Rub, light, chemical', advice: 'Rub test on packaging and labels; lightfastness outdoors; chemical resistance in cosmetics' },
      { criterion: 'Regulation', options: 'Food, toys, cosmetics', advice: 'Low-migration series + EuPIA statement + migration certificate; varnish and adhesive compliant too' },
      { criterion: 'Run length and cost', options: 'Short, medium, long', advice: 'Consumption per thousand sheets, not price per kilogram; lot consistency and a stock agreement on long runs' },
    ],
  },
  maker: {
    title: 'Manufacturer or distributor? SIM is both',
    paragraphs: [
      `The two roles complement each other. As a manufacturer we produce EVA COLOR metallic, fluorescent and custom colour offset inks at our plant in Istanbul: a ${F.labAvailability} laboratory, ${CAP.en} kg monthly custom colour capacity, a recipe archive and spectrophotometric control. As a distributor we are the official Turkish partner of SAKATA INX (CMYK and PANTONE), Zeller+Gmelin (UV) and SCHLENK (metallic pigments); the standard series of these brands are stocked in our Beylikdüzü warehouse.`,
      'For a customer this means proven imported series from stock the same day for standard work, and a manufacturer\'s flexibility for brand colours and effects within days from the laboratory, with the same technical team at the press in both cases. For export customers it means one supplier for Japanese, German and Turkish-made inks in one consolidated shipment with English documentation. The matrix above shows which brand covers which type; the company history and documents are on the [About](/hakkimizda) page.',
    ],
    facts: [
      { label: 'Manufacturing', value: 'EVA COLOR metallic, fluorescent, custom colour' },
      { label: 'Distributorships', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK` },
      { label: 'Laboratory', value: `${F.labAvailability}, ${CAP.en} kg per month, Delta E below ${DE.en}` },
      { label: 'Founded', value: `${F.foundingYear}, Istanbul` },
    ],
  },
  price: {
    title: 'What drives printing ink prices',
    intro: 'Ink prices are not a single list figure; within one type, raw material, brand, packaging and technical requirement create a wide range. Compare quotations on cost per thousand sheets, not price per kilogram.',
    factors: [
      { name: 'Pigment and raw material', text: 'Metallic bronze/aluminium, fluorescent pigments and UV photoinitiators multiply cost against CMYK; higher pigment loading raises the price per kilogram but lowers consumption.' },
      { name: 'Type and drying system', text: 'UV and LED-UV series cost more than conventional; in return drying wait and powder consumption disappear.' },
      { name: 'Brand and origin', text: 'Japanese and German imported series and SIM-made EVA COLOR sit at different price–performance points; both come with the same documentation.' },
      { name: 'Packaging and quantity', text: '1 kg and 2.5 kg cans and 20 kg drums lower the unit price; annual contract pricing for recurring orders.' },
      { name: 'Custom colour formulation', text: `Laboratory time and sampling; minimum ${F.customColorMinimumKg} kg; repeat orders cost less because the recipe is archived.` },
      { name: 'Regulation and documents', text: 'Low migration, certificates and test reports add formulation and documentation work.' },
      { name: 'Export logistics', text: 'Incoterms (EXW, FOB, CIF), consolidation of several items into one shipment and transport classification for sea or air freight define the landed cost.' },
    ],
  },
  support: {
    title: 'Technical support and colour matching',
    text: `Ink selection is confirmed at the press: our technicians accompany the trial, measure density and dot gain and check ink–water balance and drying. For colour matching a PANTONE code, a printed sample or an L*a*b* value is enough; the laboratory targets a Delta E below ${DE.en} with a spectrophotometer and archives the recipe. For international customers we match remotely from L*a*b* readings and ship an approved sample before production. TDS and SDS are supplied in English and Turkish.`,
  },
  faq: {
    title: 'Printing inks: frequently asked questions',
    items: [
      { q: 'How many types of printing ink are there?', a: 'Six main types: conventional sheetfed offset (CMYK), UV and LED-UV, metallic, fluorescent, PANTONE and custom colour, and low-migration inks for food packaging. Web offset (heatset/coldset) and flexo inks belong to other printing systems; this page covers sheetfed offset inks.' },
      { q: 'What is the difference between offset ink and UV ink?', a: 'Conventional offset ink sets by absorption into the paper and dries by oxidation within hours; UV ink contains no solvent, cures in seconds under a UV lamp and adheres to non-absorbent surfaces such as plastics and metallised board. A UV system needs its own blanket, rollers and wash chemicals; the two cannot be mixed.' },
      { q: 'Which printing ink brand is good?', a: 'A good brand supplies the type your job needs with documents (TDS, SDS, ISO 2846-1 statement) and guarantees lot consistency. At SIM: SAKATA INX for CMYK and PANTONE, Zeller+Gmelin for UV, SCHLENK for metallic pigments, EVA COLOR for metallic and fluorescent manufacturing; the brand × type matrix shows which brand covers what.' },
      { q: 'How are printing ink prices determined?', a: 'Pigment and raw material, type and drying system, brand and origin, packaging and quantity, custom colour formulation, regulatory documents and, for export, Incoterms and freight. Compare on consumption and waste per thousand sheets rather than price per kilogram; we quote within one working day from press, paper and job details.' },
      { q: 'Can a PANTONE colour be printed with CMYK?', a: 'In-gamut colours can be approximated, but vivid orange, green, purple, pastel and metallic shades stay at Delta E 2–5 and may vary from run to run. For brand colours a spot PANTONE ink or a laboratory-made custom colour is recommended.' },
      { q: 'How fast is a custom colour ink and what is the minimum?', a: `The laboratory runs ${F.labAvailability}; the formula is built from a PANTONE code, sample or L*a*b* value and delivered ${F.customColorLeadTimeDays} working days after sample approval. Minimum custom order ${F.customColorMinimumKg} kg, monthly capacity ${CAP.en} kg; recipes are archived for repeat orders.` },
      { q: 'Which ink is needed for food packaging?', a: 'A low-migration (LM) UV or conventional ink with an EuPIA compliance statement and a migration certificate under EU 1935/2004, 10/2011 and the Swiss Ordinance. Varnish and adhesive must be low-migration as well, verified with a test report for the application.' },
      { q: 'How should ink be stored and what is its shelf life?', a: 'In sealed original packaging, away from direct sunlight, in a cool and dry place; in an opened can an anti-skinning spray or a foil under the lid prevents skinning. Shelf life is stated per product on the TDS; metallic cans must be closed tightly and silver inks kept away from iron tools.' },
      { q: 'Do you export printing inks, and on what terms?', a: `Yes. We ship to ${F.exportRegions.en} and other markets on request, by road, sea and air, on EXW, FOB or CIF terms. English TDS/SDS, certificates of origin and analysis and transport classification are prepared with the quotation; several items can be consolidated into one shipment.` },
      { q: 'How fast is delivery within Turkey?', a: `From the Beylikdüzü warehouse, stock items ordered by ${F.sameDayCutoff} are delivered the same day in Istanbul and within ${F.domesticLeadTimeDays} working days across Turkey; warehouse pickup is also available.` },
    ],
  },
  related: { title: 'Related resources', postsTitle: 'Ink articles', linksTitle: 'Pages' },
  cta: {
    title: 'Request a quotation for printing inks',
    text: 'Tell us your press, paper and job; we recommend the right type and brand within one working day and start with samples and TDS, in English.',
    button: 'Request a quotation',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — RU / AR (destek dili, yoğunlaştırılmış)               */
/* ------------------------------------------------------------------ */
const RU: HubContent = {
  meta: {
    title: 'Печатные краски из Турции | Офсет, УФ, металлик, PANTONE',
    description: 'Печатные краски из Турции: офсетные CMYK, УФ/LED-UV, металлик, флуоресцентные, PANTONE и низкомиграционные; матрица брендов, таблица выбора, факторы цены. Производитель и дистрибьютор SIM.',
    keywords: ['печатные краски', 'офсетные краски Турция', 'поставщик печатных красок Турция', 'УФ-краски', 'металлик краски', 'краски PANTONE'],
  },
  pageName: 'Печатные краски',
  hero: { eyebrow: `Производитель и дистрибьютор красок ${YEARS} лет`, h1: 'Печатные краски из Турции: типы, выбор и поставка', lead: 'Все краски листового офсета на одной странице: конвенциональные CMYK, УФ и LED-UV, металлик и флуоресцентные, PANTONE и цвета на заказ, низкомиграционные серии. SIM производит EVA COLOR в Стамбуле и является дистрибьютором SAKATA INX, Zeller+Gmelin и SCHLENK в Турции; экспорт с документацией на английском.' },
  shortAnswer: { title: 'Коротко', text: `Печатные краски — пигментированные системы, переносящие цвет с формы на бумагу; шесть основных типов: конвенциональные офсетные (CMYK), УФ/LED-UV, металлик, флуоресцентные, PANTONE/на заказ и низкомиграционные для пищевой упаковки. Выбор определяют печатная система, материал и отделка. SIM производит EVA COLOR, распространяет SAKATA INX, Zeller+Gmelin и SCHLENK и формулирует цвета на заказ в лаборатории ${F.labAvailability} с Delta E ниже ${DE.tr}.` },
  keyFacts: { title: 'Основные данные', rows: [
    { label: 'Типы', value: 'Офсет (CMYK), УФ/LED-UV, металлик, флуоресцентные, PANTONE/на заказ, низкая миграция' },
    { label: 'Бренды', value: `SAKATA INX (Япония, с ${SAKATA_SINCE}), Zeller+Gmelin (Германия), SCHLENK (Германия) · EVA COLOR (производство SIM)` },
    { label: 'Стандарты', value: 'ISO 2846-1; ICC по ISO 12647-2; EuPIA; декларации низкой миграции' },
    { label: 'Цвет на заказ', value: `Лаборатория ${F.labAvailability}, Delta E ниже ${DE.tr}, ${F.customColorLeadTimeDays} рабочих дня, минимум ${F.customColorMinimumKg} кг, ${CAP.ru} кг в месяц` },
    { label: 'Сроки', value: `В тот же день по Стамбулу, ${F.domesticLeadTimeDays} рабочих дня по Турции, экспорт авто/море/авиа (EXW, FOB, CIF)` },
    { label: 'Документы', value: 'TDS и SDS на английском; дистрибьюторские документы; протокол измерений' },
  ] },
  what: { title: 'Что такое печатная краска и как она работает?', paragraphs: [
    'Печатная краска — паста из пигмента, связующего (лак и смолы), сиккативов или фотоинициаторов и добавок. Офсет основан на взаимном отталкивании краски и воды: печатающие элементы формы принимают краску, пробельные — увлажняющий раствор; краска переходит на полотно и затем на бумагу. Липкость, вязкость и водостойкость должны соответствовать машине, бумаге и химии.',
    'Типы различаются механизмом сушки: конвенциональная краска впитывается и окисляется; УФ отверждается за секунды; металлик и флуоресцентные несут особые пигменты; PANTONE и цвета на заказ — отмеренные смеси базовых цветов; низкомиграционные серии формулируются под требования пищевой упаковки.',
    `Правильная краска — не самая дорогая и не самая дешёвая, а подходящая к печатной системе, материалу, отделке и регулированию. О связи краски с полотнами, химией и лаками — в [руководстве по полиграфическим материалам](/matbaa-malzemeleri). SIM поставляет эти краски ${YEARS} лет.`,
  ] },
  types: { title: 'Типы печатных красок', intro: 'Для каждого типа — что это, когда применяется и какой бренд есть у SIM.', viewLabel: 'Смотреть продукт', whenLabel: 'Когда применять', brandsLabel: 'Бренды у SIM' },
  matrix: { title: 'Матрица «бренд × тип краски»', intro: 'Какой бренд мы держим на складе или производим для какого типа.', headers: ['Бренд', 'CMYK офсет', 'УФ / LED-UV', 'Металлик', 'Флуоресцентные', 'PANTONE / на заказ', 'Низкая миграция'], brands: ['SAKATA INX', 'Zeller+Gmelin', 'SCHLENK', 'EVA COLOR'], rows: [
    ['SAKATA INX', '✓ Склад', '–', '–', '–', '✓ Складская серия', '✓ Подходящие серии'],
    ['Zeller+Gmelin', '–', '✓ Склад', '–', '–', '✓ УФ цвета на заказ', '✓ Серия LM-UV'],
    ['SCHLENK', '–', '–', '✓ Пигменты и краски', '–', '–', '–'],
    ['EVA COLOR', '–', '✓ УФ металлик (по запросу)', '✓ Производство (Gold, Silver)', '✓ Производство', '✓ Лаборатория', '–'],
  ], note: 'SAKATA INX: Япония. Zeller+Gmelin: Германия. SCHLENK: Германия. EVA COLOR: производство SIM в Стамбуле. Дистрибьюторские документы по запросу.' },
  selection: { title: 'Выбор краски: таблица решений', intro: 'Выбор начинается с условий печати; подробнее — в статье [выбор офсетной краски](/blog/ofset-murekkep-secimi).', headers: ['Критерий', 'Варианты', 'Рекомендация'], rows: [
    { criterion: 'Бумага / материал', options: 'Мелованная, офсетная, картон, металлизированный, пластик', advice: 'Бумага и картон — конвенциональная; металлизированный и пластик — УФ/LED-UV' },
    { criterion: 'Машина', options: 'Конвенциональная, УФ, LED-UV, гибрид', advice: 'Без сушки — не УФ; на гибриде отдельный набор валов и полотен' },
    { criterion: 'Время сушки', options: 'Стандарт, быстрое закрепление, мгновенно (УФ)', advice: 'Отделка в тот же день — быстрое закрепление или УФ' },
    { criterion: 'Цветовая цель', options: 'CMYK, PANTONE, фирменный цвет', advice: 'Фирменный цвет — плашечная краска' },
    { criterion: 'Эффект', options: 'Стандарт, металлик, флуоресцент, лак', advice: 'Для металлика — глянцевая бумага и защитный лак' },
    { criterion: 'Стойкость', options: 'Истирание, свет, химия', advice: 'Тест на истирание для упаковки; светостойкость для улицы' },
    { criterion: 'Регулирование', options: 'Пищевая, игрушки, косметика', advice: 'Низкомиграционная серия + декларация EuPIA + сертификат миграции' },
  ] },
  maker: { title: 'Производитель или дистрибьютор? SIM — и то и другое', paragraphs: [
    `Как производитель мы выпускаем краски EVA COLOR (металлик, флуоресцентные, цвета на заказ) в Стамбуле: лаборатория ${F.labAvailability}, мощность ${CAP.ru} кг в месяц, архив рецептур. Как дистрибьютор — официальный партнёр SAKATA INX, Zeller+Gmelin и SCHLENK в Турции; стандартные серии на складе в Бейликдюзю.`,
    'Для клиента это один поставщик японских, немецких и турецких красок в одной консолидированной отгрузке с документацией на английском. История компании — на странице [О компании](/hakkimizda).',
  ], facts: [
    { label: 'Производство', value: 'EVA COLOR металлик, флуоресцентные, на заказ' },
    { label: 'Дистрибуция', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK` },
    { label: 'Лаборатория', value: `${F.labAvailability}, ${CAP.ru} кг в месяц, Delta E ниже ${DE.tr}` },
    { label: 'Основание', value: `${F.foundingYear}, Стамбул` },
  ] },
  price: { title: 'Что определяет цену печатной краски', intro: 'Сравнивайте предложения по стоимости на тысячу листов, а не по цене за килограмм.', factors: [
    { name: 'Пигмент и сырьё', text: 'Металлик, флуоресцентные пигменты и фотоинициаторы дороже триадных; высокая концентрация пигмента снижает расход.' },
    { name: 'Тип и сушка', text: 'УФ и LED-UV дороже конвенциональных, но без ожидания сушки и порошка.' },
    { name: 'Бренд и происхождение', text: 'Импортные серии и EVA COLOR — разные точки цена–качество с одинаковой документацией.' },
    { name: 'Упаковка и объём', text: 'Банки 1 и 2,5 кг, канистры 20 кг; годовые контракты.' },
    { name: 'Цвет на заказ', text: `Лабораторное время; минимум ${F.customColorMinimumKg} кг; повторные заказы дешевле.` },
    { name: 'Экспортная логистика', text: 'Incoterms (EXW, FOB, CIF), консолидация, транспортная классификация.' },
  ] },
  support: { title: 'Техподдержка и подбор цвета', text: `Выбор подтверждается у машины: измеряем плотность и растискивание, проверяем баланс и сушку. Для подбора цвета достаточно кода PANTONE, оттиска или L*a*b*; лаборатория целится в Delta E ниже ${DE.tr} и архивирует рецептуру; зарубежным клиентам подбираем цвет удалённо по L*a*b* и высылаем утверждённый образец.` },
  faq: { title: 'Вопросы о печатных красках', items: [
    { q: 'Сколько типов печатных красок существует?', a: 'Шесть основных: конвенциональные офсетные (CMYK), УФ и LED-UV, металлик, флуоресцентные, PANTONE и цвета на заказ, низкомиграционные для пищевой упаковки. Краски для рулонного офсета и флексо относятся к другим системам.' },
    { q: 'В чём разница между офсетной и УФ-краской?', a: 'Конвенциональная краска впитывается и окисляется часами; УФ не содержит растворителей, отверждается за секунды и держится на пластике и металлизированном картоне. УФ-системе нужны свои полотна, валы и смывки.' },
    { q: 'Какой бренд краски хороший?', a: 'Тот, который поставляет нужный тип с документами (TDS, SDS, ISO 2846-1) и гарантирует стабильность партий. У SIM: SAKATA INX для CMYK и PANTONE, Zeller+Gmelin для УФ, SCHLENK для металлик-пигментов, EVA COLOR собственного производства.' },
    { q: 'Как быстро готов цвет на заказ и какой минимум?', a: `Лаборатория работает ${F.labAvailability}; отгрузка через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца; минимум ${F.customColorMinimumKg} кг; рецептуры архивируются.` },
    { q: 'Какая краска нужна для пищевой упаковки?', a: 'Низкомиграционная УФ или конвенциональная с декларацией EuPIA и сертификатом миграции по EU 1935/2004, 10/2011 и Swiss Ordinance; лак и клей также должны быть низкомиграционными.' },
    { q: 'Экспортируете ли вы краски и на каких условиях?', a: `Да: ${F.exportRegions.en.replace('the Middle East, Central Asia and the Balkans', 'Ближний Восток, Центральная Азия, Балканы')} и другие рынки, авто, морем и авиа, EXW/FOB/CIF; документация на английском, консолидация нескольких позиций в одну отгрузку.` },
  ] },
  related: { title: 'Связанные материалы', postsTitle: 'Статьи о красках', linksTitle: 'Страницы' },
  cta: { title: 'Запросить цену на печатные краски', text: 'Сообщите машину, бумагу и задачу — подберём тип и бренд в течение рабочего дня, начнём с образцов и TDS.', button: 'Запросить цену', phone: PHONE },
};

const AR: HubContent = {
  meta: {
    title: 'أحبار الطباعة من تركيا | أوفست، UV، معدني، PANTONE',
    description: 'أحبار الطباعة من تركيا: أوفست CMYK وUV/LED-UV ومعدنية وفلورية وPANTONE ومنخفضة الهجرة؛ مصفوفة العلامات، جدول الاختيار، عوامل السعر. المصنّع والموزّع SIM.',
    keywords: ['أحبار الطباعة', 'أحبار أوفست تركيا', 'مورد أحبار الطباعة تركيا', 'أحبار UV', 'أحبار معدنية', 'أحبار PANTONE'],
  },
  pageName: 'أحبار الطباعة',
  hero: { eyebrow: `مصنّع وموزّع للأحبار منذ ${YEARS} عاماً`, h1: 'أحبار الطباعة من تركيا: الأنواع والاختيار والتوريد', lead: 'كل أحبار الأوفست الورقي في صفحة واحدة: CMYK التقليدية، UV وLED-UV، المعدنية والفلورية، PANTONE والألوان الخاصة، والسلاسل منخفضة الهجرة. تصنّع SIM أحبار EVA COLOR في إسطنبول وتوزّع SAKATA INX وZeller+Gmelin وSCHLENK في تركيا، وتصدّر مع وثائق بالإنجليزية.' },
  shortAnswer: { title: 'الإجابة المختصرة', text: `أحبار الطباعة أنظمة مصبوغة تنقل اللون من اللوح إلى الورق وتنقسم إلى ستة أنواع رئيسية: الأوفست التقليدي (CMYK)، UV/LED-UV، المعدنية، الفلورية، PANTONE/الخاصة، ومنخفضة الهجرة لتغليف الأغذية. يحدد الاختيارَ نظامُ الطباعة والسطح والتشطيب. تصنّع SIM أحبار EVA COLOR وتوزّع SAKATA INX وZeller+Gmelin وSCHLENK وتصوغ الألوان الخاصة في مختبر ${F.labAvailability} بهدف Delta E أقل من ${DE.en}.` },
  keyFacts: { title: 'معلومات أساسية', rows: [
    { label: 'الأنواع', value: 'أوفست (CMYK)، UV/LED-UV، معدنية، فلورية، PANTONE/خاصة، منخفضة الهجرة' },
    { label: 'العلامات', value: `SAKATA INX (اليابان، منذ ${SAKATA_SINCE})، Zeller+Gmelin (ألمانيا)، SCHLENK (ألمانيا) · EVA COLOR (إنتاج SIM)` },
    { label: 'المعايير', value: 'ISO 2846-1؛ ICC وفق ISO 12647-2؛ EuPIA؛ إقرارات الهجرة المنخفضة' },
    { label: 'اللون الخاص', value: `مختبر ${F.labAvailability}، Delta E أقل من ${DE.en}، ${F.customColorLeadTimeDays} أيام عمل، حد أدنى ${F.customColorMinimumKg} كجم، ${CAP.ar} كجم شهرياً` },
    { label: 'التسليم', value: `اليوم نفسه في إسطنبول، ${F.domesticLeadTimeDays} أيام عمل في تركيا، تصدير براً/بحراً/جواً (EXW، FOB، CIF)` },
    { label: 'الوثائق', value: 'TDS وSDS بالإنجليزية؛ وثائق التوزيع؛ تقرير القياس' },
  ] },
  what: { title: 'ما هو حبر الطباعة وكيف يعمل؟', paragraphs: [
    'حبر الطباعة معجون من الصبغة والرابط (ورنيش وراتنجات) والمجففات أو المبادرات الضوئية والإضافات. يقوم الأوفست على تنافر الحبر والماء: تقبل مناطق الصورة الحبر وتقبل المناطق الفارغة محلول الترطيب؛ ينتقل الحبر إلى البطانية ثم إلى الورق. لذا يجب أن تتوافق اللزوجة واللصوقية وتحمّل الماء مع الماكينة والورق والكيماويات.',
    'تفرّق آلية الجفاف بين الأنواع: يثبت الحبر التقليدي بالامتصاص ويتصلب بالأكسدة؛ ويجف حبر UV في ثوانٍ؛ وتحمل الأحبار المعدنية والفلورية صبغات خاصة؛ وPANTONE والألوان الخاصة خلطات موزونة من الألوان الأساسية؛ وتُصاغ السلاسل منخفضة الهجرة وفق لوائح تغليف الأغذية.',
    `الحبر الصحيح ليس الأغلى ولا الأرخص بل المتوافق مع نظام الطباعة والسطح والتشطيب واللوائح. لعلاقة الحبر بالبطانيات والكيماويات والورنيش انظر [دليل مواد الطباعة](/matbaa-malzemeleri). توفر SIM هذه الأحبار منذ ${YEARS} عاماً.`,
  ] },
  types: { title: 'أنواع أحبار الطباعة', intro: 'لكل نوع: ماهيته ومتى يُستخدم وأي علامة تتوفر لدى SIM.', viewLabel: 'عرض المنتج', whenLabel: 'متى يُستخدم', brandsLabel: 'العلامات لدى SIM' },
  matrix: { title: 'مصفوفة العلامة × نوع الحبر', intro: 'أي علامة نخزّن أو نصنّع لأي نوع.', headers: ['العلامة', 'أوفست CMYK', 'UV / LED-UV', 'معدني', 'فلوري', 'PANTONE / خاص', 'منخفض الهجرة'], brands: ['SAKATA INX', 'Zeller+Gmelin', 'SCHLENK', 'EVA COLOR'], rows: [
    ['SAKATA INX', '✓ مخزون', '–', '–', '–', '✓ سلسلة مخزون', '✓ سلاسل مناسبة'],
    ['Zeller+Gmelin', '–', '✓ مخزون', '–', '–', '✓ لون خاص UV', '✓ سلسلة LM-UV'],
    ['SCHLENK', '–', '–', '✓ صبغات وأحبار', '–', '–', '–'],
    ['EVA COLOR', '–', '✓ معدني UV (عند الطلب)', '✓ إنتاج (Gold، Silver)', '✓ إنتاج', '✓ إنتاج المختبر', '–'],
  ], note: 'SAKATA INX: اليابان. Zeller+Gmelin: ألمانيا. SCHLENK: ألمانيا. EVA COLOR: إنتاج SIM في إسطنبول. وثائق التوزيع عند الطلب.' },
  selection: { title: 'دليل اختيار الحبر: جدول القرار', intro: 'يبدأ الاختيار من ظروف الطباعة؛ التفاصيل في مقال [اختيار حبر الأوفست](/blog/ofset-murekkep-secimi).', headers: ['المعيار', 'الخيارات', 'التوصية'], rows: [
    { criterion: 'الورق / السطح', options: 'مصقول، غير مصقول، كرتون، معدني، بلاستيك', advice: 'الورق والكرتون: تقليدي؛ المعدني والبلاستيك: UV/LED-UV' },
    { criterion: 'الماكينة', options: 'تقليدية، UV، LED-UV، هجينة', advice: 'بلا وحدة تجفيف لا UV؛ في الهجينة طقم أسطوانات وبطانيات منفصل' },
    { criterion: 'زمن الجفاف', options: 'قياسي، سريع، فوري (UV)', advice: 'تشطيب في اليوم نفسه: سريع الجفاف أو UV' },
    { criterion: 'هدف اللون', options: 'CMYK، PANTONE، لون العلامة', advice: 'لون العلامة: حبر خاص' },
    { criterion: 'التأثير', options: 'قياسي، معدني، فلوري، ورنيش', advice: 'للمعدني ورق مصقول لامع وورنيش واقٍ' },
    { criterion: 'الثبات', options: 'احتكاك، ضوء، كيماويات', advice: 'اختبار احتكاك للتغليف؛ ثبات ضوئي للخارج' },
    { criterion: 'اللوائح', options: 'أغذية، ألعاب، تجميل', advice: 'سلسلة منخفضة الهجرة + إقرار EuPIA + شهادة هجرة' },
  ] },
  maker: { title: 'مصنّع أم موزّع؟ SIM كلاهما', paragraphs: [
    `كمصنّع ننتج أحبار EVA COLOR (معدنية وفلورية وألوان خاصة) في إسطنبول: مختبر ${F.labAvailability}، طاقة ${CAP.ar} كجم شهرياً، أرشيف وصفات. وكموزّع نحن الشريك الرسمي لـ SAKATA INX وZeller+Gmelin وSCHLENK في تركيا؛ السلاسل القياسية في مخزون بيليكدوزو.`,
    'للعميل هذا يعني مورّداً واحداً لأحبار يابانية وألمانية وتركية في شحنة واحدة موحدة مع وثائق بالإنجليزية. تاريخ الشركة في صفحة [من نحن](/hakkimizda).',
  ], facts: [
    { label: 'التصنيع', value: 'EVA COLOR معدنية، فلورية، ألوان خاصة' },
    { label: 'التوزيع', value: `SAKATA INX (${SAKATA_SINCE})، Zeller+Gmelin، SCHLENK` },
    { label: 'المختبر', value: `${F.labAvailability}، ${CAP.ar} كجم شهرياً، Delta E أقل من ${DE.en}` },
    { label: 'التأسيس', value: `${F.foundingYear}، إسطنبول` },
  ] },
  price: { title: 'ما الذي يحدد أسعار أحبار الطباعة', intro: 'قارن العروض على أساس التكلفة لكل ألف ورقة لا سعر الكيلوغرام.', factors: [
    { name: 'الصبغة والمادة الخام', text: 'الصبغات المعدنية والفلورية والمبادرات الضوئية أغلى من CMYK؛ وتركيز الصبغة العالي يقلل الاستهلاك.' },
    { name: 'النوع ونظام الجفاف', text: 'UV وLED-UV أغلى من التقليدي لكن دون انتظار جفاف أو بودرة.' },
    { name: 'العلامة والمنشأ', text: 'السلاسل المستوردة وEVA COLOR عند نقاط مختلفة من السعر والأداء بالوثائق نفسها.' },
    { name: 'العبوة والكمية', text: 'عبوات 1 و2.5 كجم وبراميل 20 كجم؛ عقود سنوية.' },
    { name: 'اللون الخاص', text: `وقت المختبر؛ حد أدنى ${F.customColorMinimumKg} كجم؛ الطلبات المتكررة أرخص.` },
    { name: 'لوجستيات التصدير', text: 'شروط Incoterms (EXW، FOB، CIF)، توحيد الشحنات، التصنيف للنقل.' },
  ] },
  support: { title: 'الدعم الفني ومطابقة الألوان', text: `يُؤكَّد الاختيار عند الماكينة: نقيس الكثافة وتضخم النقطة ونتحقق من التوازن والجفاف. لمطابقة اللون يكفي رمز PANTONE أو عينة أو قيمة L*a*b*؛ يستهدف المختبر Delta E أقل من ${DE.en} ويؤرشف الوصفة؛ وللعملاء الدوليين نطابق عن بُعد من قيم L*a*b* ونرسل عينة معتمدة.` },
  faq: { title: 'أسئلة شائعة عن أحبار الطباعة', items: [
    { q: 'كم نوعاً لأحبار الطباعة؟', a: 'ستة أنواع رئيسية: الأوفست التقليدي (CMYK)، UV وLED-UV، المعدنية، الفلورية، PANTONE والخاصة، ومنخفضة الهجرة لتغليف الأغذية. أحبار الأوفست اللفائفي والفلكسو تخص أنظمة أخرى.' },
    { q: 'ما الفرق بين حبر الأوفست وحبر UV؟', a: 'يثبت الحبر التقليدي بالامتصاص ويجف بالأكسدة خلال ساعات؛ ولا يحتوي حبر UV على مذيبات ويجف في ثوانٍ ويلتصق بالبلاستيك والكرتون المعدني. يحتاج نظام UV إلى بطانيات وأسطوانات ومذيبات خاصة به.' },
    { q: 'أي علامة أحبار جيدة؟', a: 'التي توفر النوع المطلوب مع الوثائق (TDS وSDS وISO 2846-1) وتضمن ثبات الدفعات. لدى SIM: SAKATA INX لـ CMYK وPANTONE، Zeller+Gmelin لـ UV، SCHLENK للصبغات المعدنية، وEVA COLOR من إنتاجنا.' },
    { q: 'كم يستغرق اللون الخاص وما الحد الأدنى؟', a: `يعمل المختبر ${F.labAvailability}؛ التسليم خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة؛ الحد الأدنى ${F.customColorMinimumKg} كجم؛ تُؤرشف الوصفات.` },
    { q: 'أي حبر يلزم لتغليف الأغذية؟', a: 'حبر UV أو تقليدي منخفض الهجرة مع إقرار EuPIA وشهادة هجرة وفق EU 1935/2004 و10/2011 وSwiss Ordinance؛ ويجب أن يكون الورنيش واللاصق منخفضي الهجرة أيضاً.' },
    { q: 'هل تصدّرون الأحبار وبأي شروط؟', a: 'نعم: الشرق الأوسط وآسيا الوسطى والبلقان وأسواق أخرى، براً وبحراً وجواً، بشروط EXW/FOB/CIF؛ وثائق بالإنجليزية وتوحيد عدة أصناف في شحنة واحدة.' },
  ] },
  related: { title: 'موارد ذات صلة', postsTitle: 'مقالات الأحبار', linksTitle: 'صفحات' },
  cta: { title: 'اطلب عرض سعر لأحبار الطباعة', text: 'أخبرنا بالماكينة والورق والعمل؛ نوصي بالنوع والعلامة خلال يوم عمل ونبدأ بالعينات وTDS.', button: 'اطلب عرض سعر', phone: PHONE },
};

export const HUB_CONTENT: Record<PillarLocale, HubContent> = { tr: TR, en: EN, ru: RU, ar: AR };

export function getHubContent(locale: string): HubContent {
  return HUB_CONTENT[(locale as PillarLocale) in HUB_CONTENT ? (locale as PillarLocale) : 'tr'];
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
}

export function hubText(locale: string): string {
  const l = (locale as PillarLocale) in HUB_CONTENT ? (locale as PillarLocale) : 'tr';
  const out: string[] = [];
  const { meta, ...body } = HUB_CONTENT[l];
  void meta;
  collectStrings(body, out);
  for (const t of INK_TYPES) collectStrings({ name: t.name[l], summary: t.summary[l], whenToUse: t.whenToUse[l], body: t.body[l] }, out);
  return out.join(' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}

export function hubWordCount(locale: string): number {
  return hubText(locale).split(/\s+/).filter(Boolean).length;
}
