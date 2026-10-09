/**
 * Pillar sayfası içeriği — /matbaa-malzemeleri (TR) · /en/printing-materials · /ru/… · /ar/…
 * "#1 sayfası" (marketing/seo-geo/11-Icerik-Backlog.md, brief A). Tüm sayısal olgular organization.ts'ten türetilir.
 * Metinlerde "[etiket](/urunler/<tr-slug>)", "[etiket](/blog/<tr-slug>)", "[etiket](/yol)" satır içi link sözdizimi
 * kullanılır; sayfa dili ve slug'ı sunucuda otomatik çevrilir (localizeInlineLinks).
 */
import { ORGANIZATION, yearsSinceFounding, formatThousands, formatTelephone } from '@/data/organization';
import type { routing } from '@/i18n/routing';

export type PillarLocale = 'tr' | 'en' | 'ru' | 'ar';
type L<T = string> = Record<PillarLocale, T>;
type StaticPath = keyof typeof routing.pathnames;
/** Dinamik desen içermeyen statik yollar (Link href için parametresiz) */
type StaticPagePath = Exclude<StaticPath, `${string}[${string}]`>;

export interface PillarImage {
  src: string;
  alt: L;
}

export type PillarTarget =
  | { type: 'product'; slug: string }
  | { type: 'blog'; slug: string }
  | { type: 'static'; path: StaticPath };

export interface PillarCategory {
  key: string;
  icon: string;
  /** PILLAR_IMAGES içinden bir src */
  image: string;
  target: PillarTarget;
  /** organization.ts marka matrisindeki adlar (kimyasallar gibi markasız gruplar boş olabilir) */
  brands: string[];
  name: L;
  summary: L;
  whenToUse: L;
  body: L<string[]>;
}

export interface PillarContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  shortAnswer: { title: string; text: string };
  keyFacts: { title: string; rows: { label: string; value: string }[] };
  what: { title: string; paragraphs: string[]; listTitle: string };
  categories: { title: string; intro: string; viewLabel: string; whenLabel: string; brandsLabel: string };
  criteria: { title: string; intro: string; headers: [string, string, string]; rows: { name: string; why: string; check: string }[] };
  paper: { title: string; intro: string; headers: [string, string, string]; rows: { surface: string; ink: string; note: string }[] };
  price: { title: string; intro: string; factors: { name: string; text: string }[]; ctaText: string; ctaButton: string };
  supply: { title: string; intro: string; steps: { name: string; text: string }[]; outro: string };
  brands: { title: string; intro: string; headers: [string, string, string, string]; roles: { own: string; distributor: string } };
  brandRows: Record<string, { products: string; role: string }>;
  why: { title: string; intro: string; facts: { label: string; value: string }[]; timeline: { year: string; text: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  related: { title: string; postsTitle: string; linksTitle: string };
  cta: { title: string; text: string; button: string; whatsapp: string; phone: string };
}

const YEARS = yearsSinceFounding();
const F = ORGANIZATION.facts;
const CAP = { tr: formatThousands(F.customColorCapacityKgPerMonth, 'tr'), en: formatThousands(F.customColorCapacityKgPerMonth, 'en'), ru: formatThousands(F.customColorCapacityKgPerMonth, 'ru'), ar: formatThousands(F.customColorCapacityKgPerMonth, 'ar') };
const PHONE = formatTelephone();
const CITY = `${ORGANIZATION.address.addressLocality}/${ORGANIZATION.address.addressRegion}`;
const SAKATA_SINCE = ORGANIZATION.brands.find((b) => b.name === 'SAKATA INX')?.since ?? '';

/* ------------------------------------------------------------------ */
/*  Görseller (gerçek ürün/laboratuvar çekimleri, açıklayıcı dosya adı) */
/* ------------------------------------------------------------------ */
const IMG = {
  lab: '/images/matbaa-malzemeleri/sim-ozel-renk-laboratuvari-murekkep-karisimi.webp',
  cmyk: '/images/matbaa-malzemeleri/sakata-inx-ecopure-cmyk-ofset-murekkep.webp',
  pantone: '/images/matbaa-malzemeleri/sakata-inx-ecopure-pantone-021-orange-spot-murekkep.webp',
  gold: '/images/matbaa-malzemeleri/eva-color-new-p871-gold-metalik-murekkep.webp',
  fluo: '/images/matbaa-malzemeleri/eva-color-802-green-floresan-murekkep.webp',
  uv: '/images/matbaa-malzemeleri/zeller-gmelin-uvalux-process-magenta-uv-murekkep.webp',
  blanket: '/images/matbaa-malzemeleri/vector-ofset-baski-blanketi.webp',
  chem: '/images/matbaa-malzemeleri/baski-kimyasali-20-kg-bidon.webp',
  varnish: '/images/matbaa-malzemeleri/hi-tech-coatings-hi-coat-velvet-touch-dispersiyon-lak.webp',
  fan: '/images/matbaa-malzemeleri/pantone-metallics-solid-coated-renk-kartelasi.webp',
} as const;

export const PILLAR_IMAGES: PillarImage[] = [
  { src: IMG.lab, alt: { tr: 'SIM özel renk laboratuvarında karıştırıcıda hazırlanan ofset mürekkep', en: 'Offset ink being mixed in the SIM custom colour laboratory in Istanbul', ru: 'Смешивание офсетной краски в лаборатории SIM в Стамбуле', ar: 'خلط حبر الأوفست في مختبر الألوان الخاصة لدى SIM في إسطنبول' } },
  { src: IMG.cmyk, alt: { tr: 'SAKATA INX Ecopure Magenta ve Yellow tabaka ofset mürekkep kutuları (2,5 kg)', en: 'SAKATA INX Ecopure Magenta and Yellow sheetfed offset ink cans (2.5 kg)', ru: 'Банки офсетной краски SAKATA INX Ecopure Magenta и Yellow (2,5 кг)', ar: 'عبوات حبر أوفست SAKATA INX Ecopure ماجنتا وأصفر (2.5 كجم)' } },
  { src: IMG.pantone, alt: { tr: 'SAKATA INX Ecopure PANTONE 021 Orange spot renk ofset mürekkebi', en: 'SAKATA INX Ecopure PANTONE 021 Orange spot colour offset ink', ru: 'Офсетная краска SAKATA INX Ecopure PANTONE 021 Orange', ar: 'حبر أوفست SAKATA INX Ecopure بلون PANTONE 021 برتقالي' } },
  { src: IMG.gold, alt: { tr: 'EVA COLOR NEW P.871 ve P.872 Gold metalik ofset mürekkep kutuları (1,5 kg)', en: 'EVA COLOR NEW P.871 and P.872 Gold metallic offset ink cans (1.5 kg)', ru: 'Металлик-краски EVA COLOR NEW P.871 и P.872 Gold (1,5 кг)', ar: 'عبوات حبر أوفست معدني EVA COLOR NEW P.871 وP.872 ذهبي (1.5 كجم)' } },
  { src: IMG.fluo, alt: { tr: 'EVA COLOR 802 Green floresan ofset mürekkep serisi (1 kg kutu)', en: 'EVA COLOR 802 Green fluorescent offset ink series (1 kg cans)', ru: 'Флуоресцентная офсетная краска EVA COLOR 802 Green (1 кг)', ar: 'سلسلة حبر الأوفست الفلوري EVA COLOR 802 أخضر (عبوة 1 كجم)' } },
  { src: IMG.uv, alt: { tr: 'Zeller+Gmelin UVALUX Process Magenta UV ofset mürekkebi (2,5 kg)', en: 'Zeller+Gmelin UVALUX Process Magenta UV offset ink (2.5 kg)', ru: 'УФ-офсетная краска Zeller+Gmelin UVALUX Process Magenta (2,5 кг)', ar: 'حبر أوفست UV من Zeller+Gmelin UVALUX ماجنتا (2.5 كجم)' } },
  { src: IMG.blanket, alt: { tr: 'VECTOR ofset baskı blanketleri, kesilmiş ve kullanıma hazır', en: 'VECTOR offset printing blankets, cut and ready for the press', ru: 'Офсетные полотна VECTOR, нарезанные и готовые к установке', ar: 'بطانيات طباعة أوفست VECTOR مقصوصة وجاهزة للتركيب' } },
  { src: IMG.chem, alt: { tr: '20 kg bidonda baskı kimyasalı, tehlike etiketli', en: '20 kg drum of printing chemical with hazard labelling', ru: 'Канистра 20 кг с печатной химией и маркировкой', ar: 'عبوة 20 كجم من كيماويات الطباعة بملصق السلامة' } },
  { src: IMG.varnish, alt: { tr: 'Hi-Tech Coatings Hi-Coat Velvet Touch su bazlı dispersiyon lak etiketi', en: 'Hi-Tech Coatings Hi-Coat Velvet Touch water-based dispersion varnish label', ru: 'Этикетка водного дисперсионного лака Hi-Tech Coatings Hi-Coat Velvet Touch', ar: 'ملصق ورنيش التشتت المائي Hi-Coat Velvet Touch من Hi-Tech Coatings' } },
  { src: IMG.fan, alt: { tr: 'PANTONE Metallics Solid Coated renk kartelası ile renk seçimi', en: 'Colour selection with the PANTONE Metallics Solid Coated guide', ru: 'Подбор цвета по вееру PANTONE Metallics Solid Coated', ar: 'اختيار اللون باستخدام دليل PANTONE Metallics Solid Coated' } },
];

export const PILLAR_RELATED_POSTS = [
  'ofset-murekkep-secimi',
  'baski-blanket-secimi-ve-bakimi',
  'baski-kimyasallari-rehberi',
  'uv-murekkep-teknolojisi',
  'yaldiz-baski-teknikleri-altin-gumus',
  'pantone-renk-sistemi-rehberi',
] as const;

export const PILLAR_RELATED_LINKS: { path: StaticPagePath; label: L }[] = [
  { path: '/matbaa-murekkepleri', label: { tr: 'Matbaa Mürekkepleri Rehberi', en: 'Printing Inks Hub', ru: 'Печатные краски', ar: 'أحبار الطباعة' } },
  { path: '/ofset-baski-malzemeleri', label: { tr: 'Ofset Baskı Malzemeleri Rehberi', en: 'Offset Printing Supplies Guide', ru: 'Материалы для офсетной печати', ar: 'دليل مستلزمات طباعة الأوفست' } },
  { path: '/matbaa-malzemeleri-istanbul', label: { tr: 'İstanbul Teslimat ve Depo', en: 'Istanbul Delivery & Warehouse', ru: 'Доставка по Стамбулу', ar: 'التوصيل والمستودع في إسطنبول' } },
  { path: '/ozel-renk-uretimi', label: { tr: 'Özel Renk Üretimi', en: 'Custom Colour Production', ru: 'Производство цветов на заказ', ar: 'إنتاج الألوان الخاصة' } },
  { path: '/urunler', label: { tr: 'Ürün Kataloğu', en: 'Product Catalogue', ru: 'Каталог продукции', ar: 'كتالوج المنتجات' } },
  { path: '/matbaa-terimleri-sozlugu', label: { tr: 'Matbaa Terimleri Sözlüğü', en: 'Printing Glossary', ru: 'Словарь полиграфических терминов', ar: 'مسرد مصطلحات الطباعة' } },
  { path: '/sss', label: { tr: 'Sık Sorulan Sorular', en: 'FAQ', ru: 'Вопросы и ответы', ar: 'الأسئلة الشائعة' } },
];

/* ------------------------------------------------------------------ */
/*  Sekiz ürün grubu                                                    */
/* ------------------------------------------------------------------ */
export const PILLAR_CATEGORIES: PillarCategory[] = [
  {
    key: 'offset',
    icon: '🖨',
    image: IMG.cmyk,
    target: { type: 'product', slug: 'sakata-inx-cmyk-murekkepler' },
    brands: ['SAKATA INX'],
    name: { tr: 'Ofset mürekkepleri (CMYK)', en: 'Offset inks (CMYK)', ru: 'Офсетные краски (CMYK)', ar: 'أحبار الأوفست (CMYK)' },
    summary: {
      tr: 'Tabaka ve web ofset için ISO 2846-1 uyumlu dört renk setleri; en çok tüketilen matbaa malzemesi.',
      en: 'ISO 2846-1 process colour sets for sheetfed and web offset; the highest-volume consumable in any print shop.',
      ru: 'Триадные наборы по ISO 2846-1 для листового и рулонного офсета; самый расходуемый материал типографии.',
      ar: 'أطقم ألوان رباعية مطابقة لـ ISO 2846-1 للأوفست الورقي واللفائفي؛ أكثر المستهلكات استخداماً.',
    },
    whenToUse: {
      tr: 'Ticari matbaa işleri, dergi, katalog, broşür, kitap ve karton ambalaj gibi kuşe ve 1. hamur kağıda yapılan tüm konvansiyonel tabaka ofset baskılarında. Kaplı olmayan plastik ve metal yüzeyler için UV mürekkep grubuna bakın.',
      en: 'All conventional sheetfed work on coated and uncoated paper: commercial print, magazines, catalogues, brochures, books and folding cartons. For non-absorbent plastics and metallised board, see UV inks.',
      ru: 'Вся конвенциональная листовая печать на мелованной и офсетной бумаге: коммерческая полиграфия, журналы, каталоги, книги, картонная упаковка.',
      ar: 'جميع أعمال الأوفست الورقي التقليدي على الورق المصقول وغير المصقول: الطباعة التجارية والمجلات والكتالوجات والكتب وعلب الكرتون.',
    },
    body: {
      tr: [
        'Ofset mürekkepleri, tabaka ve web ofset makinelerinde kalıptan blankete, blanketten kağıda aktarılan macun kıvamında pigment–bağlayıcı–kurutucu sistemleridir. Bir matbaanın en çok tükettiği malzeme olduğu için renk doğruluğu, kuruma hızı ve baskı stabilitesi üretim verimini doğrudan belirler. Dört renk (Cyan, Magenta, Yellow, Black) setleri ISO 2846-1 renk standardına göre formüle edilir; böylece FOGRA veya GRACoL profilleriyle çalışan prepress akışında ekranda görülen renk baskıda tekrarlanabilir.',
        `SIM, [SAKATA INX CMYK tabaka ofset mürekkeplerinin](/urunler/sakata-inx-cmyk-murekkepler) Türkiye distribütörüdür (${SAKATA_SINCE}'den beri). Yüksek pigment konsantrasyonu daha ince mürekkep filmiyle hedef dansiteye ulaşmayı, dengeli tack değeri ise yırtılma ve tozlanma olmadan hızlı baskıyı sağlar. Standart CMYK setleri Beylikdüzü depomuzda stoktan sevk edilir; hızlı set-off direnci ve düşük VOC seçenekleri için satış ekibimiz baskı koşullarınıza göre doğru seriyi önerir.`,
      ],
      en: [
        'Offset inks are paste inks (pigment, vehicle, driers) transferred from plate to blanket to paper on sheetfed and web presses. Because they are the highest-volume consumable in a print shop, colour accuracy, setting speed and press stability translate directly into productivity. Process sets (Cyan, Magenta, Yellow, Black) are formulated to ISO 2846-1 so that a FOGRA- or GRACoL-based prepress workflow reproduces on press what the operator saw on screen.',
        `SIM is the Turkish distributor of [SAKATA INX sheetfed CMYK inks](/urunler/sakata-inx-cmyk-murekkepler) (since ${SAKATA_SINCE}). High pigment loading reaches target density with a thinner film; balanced tack allows fast running without picking or linting. Standard sets ship from stock in our Istanbul warehouse; fast-setting and low-VOC options are selected with your press conditions in mind. Export orders are packed for sea, road or air freight with full technical documentation.`,
      ],
      ru: [
        'Офсетные краски — пастообразные системы «пигмент–связующее–сиккатив», переносимые с формы на полотно и далее на бумагу. Это самый расходуемый материал типографии, поэтому точность цвета, скорость закрепления и стабильность печати напрямую влияют на производительность. Триадные наборы формулируются по ISO 2846-1.',
        `SIM — дистрибьютор листовых красок [SAKATA INX CMYK](/urunler/sakata-inx-cmyk-murekkepler) в Турции (с ${SAKATA_SINCE} г.). Высокая концентрация пигмента и сбалансированная липкость обеспечивают быструю печать без выщипывания. Стандартные наборы отгружаются со склада в Стамбуле; экспортные заказы комплектуются технической документацией.`,
      ],
      ar: [
        'أحبار الأوفست أنظمة معجونية من الصبغة والرابط والمجففات تُنقل من اللوح إلى البطانية ثم إلى الورق. ولأنها أكثر المستهلكات استخداماً في المطبعة، تؤثر دقة اللون وسرعة الجفاف واستقرار الطباعة مباشرة في الإنتاجية. تُصاغ الأطقم الرباعية وفق المعيار ISO 2846-1.',
        `SIM هي الموزع التركي لأحبار [SAKATA INX CMYK للأوفست الورقي](/urunler/sakata-inx-cmyk-murekkepler) منذ ${SAKATA_SINCE}. يضمن تركيز الصبغة العالي الوصول إلى الكثافة المستهدفة بطبقة أرق، وتوازن اللزوجة طباعة سريعة دون تقشير. تُشحن الأطقم القياسية من مستودعنا في إسطنبول، وتُجهَّز طلبات التصدير مع الوثائق الفنية الكاملة.`,
      ],
    },
  },
  {
    key: 'pantone',
    icon: '🎨',
    image: IMG.pantone,
    target: { type: 'product', slug: 'sakata-inx-pantone-murekkepler' },
    brands: ['SAKATA INX', 'EVA COLOR'],
    name: { tr: 'PANTONE ve özel renk mürekkepleri', en: 'PANTONE and custom colour inks', ru: 'Краски PANTONE и цвета на заказ', ar: 'أحبار PANTONE والألوان الخاصة' },
    summary: {
      tr: 'Stoktan PANTONE serileri ve 24/7 laboratuvarda Delta E < 1,5 hedefiyle üretilen özel renkler.',
      en: 'PANTONE series from stock plus custom colours formulated in our 24/7 lab to a Delta E below 1.5.',
      ru: 'Серии PANTONE со склада и цвета на заказ из лаборатории 24/7 с целевым Delta E < 1,5.',
      ar: 'سلاسل PANTONE من المخزون وألوان خاصة تُنتج في مختبرنا على مدار الساعة بهدف Delta E أقل من 1.5.',
    },
    whenToUse: {
      tr: 'Logo ve kurumsal renkler, ambalaj marka renkleri, metalik ve pastel tonlar, CMYK gamutu dışındaki turuncu, yeşil ve mor tonlar ile 5. ve 6. ünite baskılarında.',
      en: 'Logo and brand colours, packaging brand tones, pastels and colours outside the CMYK gamut (oranges, greens, purples), and fifth/sixth-unit printing.',
      ru: 'Фирменные цвета логотипов и упаковки, пастельные тона и цвета вне охвата CMYK, печать на 5-й и 6-й секциях.',
      ar: 'ألوان الشعارات والهوية، ألوان العلامات على العبوات، الدرجات الباستيلية والألوان خارج نطاق CMYK، والطباعة بالوحدتين الخامسة والسادسة.',
    },
    body: {
      tr: [
        'PANTONE (PMS) mürekkepleri, dört renk tramıyla elde edilemeyen kurumsal kimlik renklerinin tek geçişte, dolgun ve tutarlı basılmasını sağlar. PANTONE Formula Guide\'daki her referans, temel renklerin belirli oranlarda karıştırılmasıyla üretilir; renk doğruluğu spektrofotometreyle ölçülen Delta E değeriyle kanıtlanır. Kuşe (Coated) ve 1. hamur (Uncoated) referansları aynı mürekkeple farklı görünür; bu yüzden hedef kağıt baştan belirlenmelidir.',
        `SIM\'de iki yol vardır: stoktan [SAKATA INX PANTONE serisi](/urunler/sakata-inx-pantone-murekkepler) ve İstanbul\'daki ${F.labAvailability} laboratuvarımızda üretilen [özel renkler](/urunler/ozel-renkler). Özel renk için bir PANTONE kodu, bir baskı örneği veya L*a*b* değeri yeterlidir; formül Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefiyle hazırlanır ve numune onayından sonra ${F.customColorLeadTimeDays} iş günü içinde teslim edilir. Minimum özel renk siparişi ${F.customColorMinimumKg} kg\'dır; aylık ${CAP.tr} kg kapasite büyük ambalaj serilerinde bile lot tutarlılığı sağlar. Reçeteler saklanır; tekrar siparişte aynı renk aynı formülle üretilir.`,
      ],
      en: [
        'PANTONE (PMS) inks print brand colours that four-colour screening cannot reach: solid, consistent and in one pass. Every reference in the PANTONE Formula Guide is a defined mix of base colours, and accuracy is proven with a spectrophotometer as a Delta E value. Coated and Uncoated references look different with the same ink, so the target substrate must be fixed before formulation.',
        `SIM offers two routes: [SAKATA INX PANTONE series](/urunler/sakata-inx-pantone-murekkepler) from stock, and [custom colours](/urunler/ozel-renkler) produced in our ${F.labAvailability} laboratory in Istanbul. A PANTONE code, a printed sample or an L*a*b* reading is enough; formulations target Delta E below ${F.deltaEMax} and ship ${F.customColorLeadTimeDays} working days after sample approval. Minimum custom order is ${F.customColorMinimumKg} kg and monthly capacity of ${CAP.en} kg keeps lot-to-lot consistency on long packaging runs. Recipes are archived, so a repeat order abroad receives exactly the same colour.`,
      ],
      ru: [
        'Краски PANTONE печатают фирменные цвета, недостижимые триадой, — плотно, стабильно и за один прогон. Точность подтверждается спектрофотометром (Delta E).',
        `SIM предлагает [серии SAKATA INX PANTONE](/urunler/sakata-inx-pantone-murekkepler) со склада и [цвета на заказ](/urunler/ozel-renkler) из лаборатории ${F.labAvailability} в Стамбуле: достаточно кода PANTONE, оттиска или значения L*a*b*. Целевой Delta E — ниже ${String(F.deltaEMax).replace('.', ',')}, отгрузка через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца, минимальный заказ ${F.customColorMinimumKg} кг, мощность ${CAP.ru} кг в месяц. Рецептуры сохраняются для повторных заказов.`,
      ],
      ar: [
        'تطبع أحبار PANTONE ألوان الهوية التي لا تصل إليها الطباعة الرباعية بكثافة وثبات وفي مرور واحد. تُثبت الدقة بقياس Delta E بجهاز المطياف.',
        `تقدم SIM مسارين: [سلسلة SAKATA INX PANTONE](/urunler/sakata-inx-pantone-murekkepler) من المخزون، و[الألوان الخاصة](/urunler/ozel-renkler) المنتجة في مختبرنا العامل ${F.labAvailability} في إسطنبول. يكفي رمز PANTONE أو عينة مطبوعة أو قيمة L*a*b*؛ الهدف Delta E أقل من ${F.deltaEMax} والتسليم خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة، بحد أدنى ${F.customColorMinimumKg} كجم وطاقة شهرية ${CAP.ar} كجم. تُحفظ الوصفات لإعادة الطلب بالدقة نفسها.`,
      ],
    },
  },
  {
    key: 'metallic',
    icon: '✨',
    image: IMG.gold,
    target: { type: 'product', slug: 'eva-color-gold-metalik-murekkepler' },
    brands: ['EVA COLOR', 'SCHLENK'],
    name: { tr: 'Metalik ve yaldız mürekkepler', en: 'Metallic and gold inks', ru: 'Металлик-краски (золото и серебро)', ar: 'الأحبار المعدنية والذهبية' },
    summary: {
      tr: 'EVA COLOR Gold ve Silver serileri (SIM üretimi) ve SCHLENK pigmentleri ile tek geçişte metalik efekt.',
      en: 'EVA COLOR Gold and Silver (made by SIM) and SCHLENK pigments: a metallic finish in a single pass.',
      ru: 'EVA COLOR Gold и Silver (производство SIM) и пигменты SCHLENK: металлический эффект за один прогон.',
      ar: 'سلسلتا EVA COLOR Gold وSilver (إنتاج SIM) وصبغات SCHLENK: تأثير معدني في مرور واحد.',
    },
    whenToUse: {
      tr: 'Lüks ambalaj, kozmetik ve içecek etiketleri, davetiye, sertifika, kitap kapağı ve kurumsal işlerde altın/gümüş vurgu için; yaldız folyo maliyetinin yüksek kaldığı orta tirajlarda ekonomik alternatif olarak.',
      en: 'Luxury packaging, cosmetics and beverage labels, invitations, certificates, book covers and corporate print; an economical alternative to hot-foil on medium runs.',
      ru: 'Премиальная упаковка, этикетки косметики и напитков, приглашения, сертификаты, обложки; экономичная альтернатива горячему тиснению на средних тиражах.',
      ar: 'العبوات الفاخرة وملصقات مستحضرات التجميل والمشروبات والدعوات والشهادات وأغلفة الكتب؛ بديل اقتصادي عن الفويل الحراري في الكميات المتوسطة.',
    },
    body: {
      tr: [
        'Metalik mürekkepler, bronz (altın tonları) veya alüminyum (gümüş) pigment plakacıklarının mürekkep filmi içinde yatay dizilmesiyle ışığı aynasal yansıtır; parlaklık 60° gloss ölçümüyle (GU) değerlendirilir. Sıcak yaldız folyodan farkı, ofset makinesinde ek ünite veya kalıp olmadan, tek geçişte metalik efekt vermesidir. Bronz pigmentin bakır–çinko oranı altının tonunu belirler: yüksek bakır kırmızımsı sıcak altın, yüksek çinko açık ve soğuk altın verir.',
        '[EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) ve [EVA COLOR Silver](/urunler/eva-color-silver-metalik-murekkepler) serileri SIM\'in kendi üretimidir; PANTONE 871–877 metalik referanslarını karşılayan hazır tonlar ve iş başına özel karışımlar sunar. Pigment tarafında Alman [SCHLENK metalik pigment ve mürekkeplerinin](/urunler/schlenk-metalik-murekkepler) distribütörüyüz. En iyi sonuç parlak kuşe kağıtta alınır; mat ve emici yüzeylerde parlaklık düşer, bu durumda astar (primer) veya daha yüksek pigment oranı önerilir. Metalik baskının dispersiyon lak ile korunması sürtünme direncini artırır.',
      ],
      en: [
        'Metallic inks reflect light specularly because bronze (gold shades) or aluminium (silver) platelets align flat inside the ink film; brilliance is measured as 60° gloss (GU). Unlike hot-foil stamping, the effect is achieved on the offset press in one pass without an extra unit or die. The copper-to-zinc ratio of the bronze pigment sets the gold tone: more copper gives a warm, reddish gold; more zinc a pale, cool gold.',
        '[EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) and [EVA COLOR Silver](/urunler/eva-color-silver-metalik-murekkepler) are manufactured by SIM in Istanbul, with ready shades matching PANTONE 871–877 and job-specific mixes. On the pigment side we distribute [SCHLENK metallic pigments and inks](/urunler/schlenk-metalik-murekkepler) from Germany. Best results come on gloss-coated stock; on matte or absorbent surfaces a primer or a higher pigment load is recommended, and a dispersion varnish on top improves rub resistance. As a manufacturer we supply export customers with TDS, SDS and samples before the first order.',
      ],
      ru: [
        'Металлик-краски отражают свет зеркально благодаря бронзовым (золото) или алюминиевым (серебро) пластинчатым пигментам; эффект достигается на офсетной машине за один прогон, без тиснения фольгой.',
        'Серии [EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) и [EVA COLOR Silver](/urunler/eva-color-silver-metalik-murekkepler) производит SIM в Стамбуле (оттенки PANTONE 871–877 и смеси под заказ); пигменты и краски [SCHLENK](/urunler/schlenk-metalik-murekkepler) мы поставляем как дистрибьютор. Лучший результат — на глянцевой мелованной бумаге; защитный дисперсионный лак повышает стойкость к истиранию.',
      ],
      ar: [
        'تعكس الأحبار المعدنية الضوء انعكاساً مرآوياً بفضل صفائح البرونز (الذهبي) أو الألومنيوم (الفضي)؛ ويتحقق التأثير على ماكينة الأوفست في مرور واحد دون فويل حراري.',
        'سلسلتا [EVA COLOR Gold](/urunler/eva-color-gold-metalik-murekkepler) و[EVA COLOR Silver](/urunler/eva-color-silver-metalik-murekkepler) من إنتاج SIM في إسطنبول بدرجات تطابق PANTONE 871–877 وخلطات حسب الطلب؛ كما نوزع صبغات وأحبار [SCHLENK](/urunler/schlenk-metalik-murekkepler) الألمانية. أفضل النتائج على الورق المصقول اللامع، ويحسّن ورنيش التشتت فوق الطباعة مقاومة الاحتكاك.',
      ],
    },
  },
  {
    key: 'fluorescent',
    icon: '🟢',
    image: IMG.fluo,
    target: { type: 'product', slug: 'eva-color-fluorescent-murekkepler' },
    brands: ['EVA COLOR'],
    name: { tr: 'Floresan (neon) mürekkepler', en: 'Fluorescent (neon) inks', ru: 'Флуоресцентные (неоновые) краски', ar: 'الأحبار الفلورية (النيون)' },
    summary: {
      tr: 'PANTONE 801–807 neon referanslarını karşılayan EVA COLOR Floresan serisi, SIM üretimi.',
      en: 'EVA COLOR Fluorescent series made by SIM, matching PANTONE 801–807 neon references.',
      ru: 'Серия EVA COLOR Fluorescent производства SIM, соответствует PANTONE 801–807.',
      ar: 'سلسلة EVA COLOR الفلورية من إنتاج SIM، مطابقة لمراجع PANTONE 801–807.',
    },
    whenToUse: {
      tr: 'Promosyon ve kampanya baskıları, etiketler, dikkat çekmesi gereken uyarı ve fiyat etiketleri, gençlik ürünleri ambalajları ve etkinlik materyallerinde.',
      en: 'Promotional and campaign print, labels, warning and price tags that must stand out, youth-oriented packaging and event materials.',
      ru: 'Промо-печать, этикетки, ценники и предупреждающие знаки, молодёжная упаковка, материалы мероприятий.',
      ar: 'المطبوعات الترويجية والحملات والملصقات وبطاقات الأسعار والتحذير اللافتة وعبوات منتجات الشباب ومواد الفعاليات.',
    },
    body: {
      tr: [
        'Floresan (neon) mürekkepler, UV ve görünür ışığı emip daha uzun dalga boyunda geri yayan pigmentler içerir; bu yüzden standart renklerden belirgin biçimde daha canlı görünür. Pigment yapısı gereği film kalınlığına duyarlıdır: tam dolgu için genellikle çift geçiş veya yüksek mürekkep filmi gerekir ve ışık haslığı konvansiyonel pigmentlerden düşüktür. Beyaz, parlak kuşe kağıt ve düşük nem dengesi en canlı sonucu verir; sarı veya gri tonlu kağıtlarda neon etkisi belirgin biçimde söner. Floresan mürekkepler konvansiyonel CMYK ile aynı makinede, ayrı bir ünitede veya özel renk ünitesinde basılır.',
        '[EVA COLOR Floresan serisi](/urunler/eva-color-fluorescent-murekkepler) SIM üretimidir; PANTONE 801–807 neon referanslarını karşılar ve özel neon tonlar laboratuvarımızda formüle edilir. Raf ömrü ve depolama koşulları TDS\'de belirtilir; dış mekânda kullanılacak işlerde UV koruyucu lak ile kombinasyon, uzun süreli raf ürünlerinde ise ışık haslığı testi önerilir. Raf ömrü boyunca kutunun ağzının kapalı tutulması ve ilk açılışta karıştırılması pigment çökmesini önler. Uygulama ayrıntıları için [floresan mürekkep uygulama rehberine](/blog/floresan-murekkepler-uygulama-rehberi) bakın.',
      ],
      en: [
        'Fluorescent (neon) inks contain pigments that absorb UV and visible light and re-emit it at longer wavelengths, which is why they look far more vivid than standard colours. They are sensitive to film thickness: full coverage often needs a double hit or a heavier film, and lightfastness is lower than with conventional pigments. White gloss-coated paper and a stable, low-moisture pressroom give the brightest result.',
        'The [EVA COLOR Fluorescent series](/urunler/eva-color-fluorescent-murekkepler) is manufactured by SIM and matches PANTONE 801–807 references; custom neon shades are formulated in our laboratory. Shelf life and storage are stated on the TDS; for outdoor use we recommend a UV-protective varnish, and for long shelf-life products a lightfastness test. Export orders are supplied with the same documentation and samples as domestic ones.',
      ],
      ru: [
        'Флуоресцентные краски поглощают УФ и видимый свет и переизлучают его, поэтому выглядят значительно ярче обычных. Они чувствительны к толщине красочного слоя, а светостойкость ниже, чем у стандартных пигментов.',
        'Серию [EVA COLOR Fluorescent](/urunler/eva-color-fluorescent-murekkepler) производит SIM; она соответствует PANTONE 801–807, а особые неоновые оттенки формулируются в нашей лаборатории. Для наружного применения рекомендуется УФ-защитный лак.',
      ],
      ar: [
        'تحتوي الأحبار الفلورية على صبغات تمتص الأشعة فوق البنفسجية والضوء المرئي وتعيد إصداره، لذلك تبدو أكثر حيوية بكثير من الألوان العادية. وهي حساسة لسماكة الطبقة، وثباتها الضوئي أقل من الصبغات التقليدية.',
        'سلسلة [EVA COLOR الفلورية](/urunler/eva-color-fluorescent-murekkepler) من إنتاج SIM وتطابق مراجع PANTONE 801–807، وتُصاغ درجات النيون الخاصة في مختبرنا. للاستخدام الخارجي يُنصح بورنيش حماية من الأشعة فوق البنفسجية.',
      ],
    },
  },
  {
    key: 'uv',
    icon: '💡',
    image: IMG.uv,
    target: { type: 'product', slug: 'zeller-gmelin-uv-offset-murekkepleri' },
    brands: ['Zeller+Gmelin'],
    name: { tr: 'UV ofset mürekkepleri', en: 'UV offset inks', ru: 'УФ-офсетные краски', ar: 'أحبار الأوفست UV' },
    summary: {
      tr: 'Saniyeler içinde kürlenen, emici olmayan yüzeylere yapışan Zeller+Gmelin UV ve LED-UV serileri.',
      en: 'Zeller+Gmelin UV and LED-UV series: cured in seconds, strong adhesion on non-absorbent substrates.',
      ru: 'Серии Zeller+Gmelin UV и LED-UV: отверждение за секунды, адгезия к невпитывающим материалам.',
      ar: 'سلاسل Zeller+Gmelin UV وLED-UV: تجف في ثوانٍ وتلتصق بالأسطح غير الماصة.',
    },
    whenToUse: {
      tr: 'Plastik ve metalize ambalaj, etiket, kart ve lüks kutu baskılarında; aynı gün teslim gerektiren hızlı işlerde; konvansiyonel mürekkebin kuruma veya set-off sorunu yarattığı emici olmayan yüzeylerde.',
      en: 'Plastic and metallised packaging, labels, cards and luxury boxes; same-day jobs; any non-absorbent substrate where conventional ink would set-off or dry too slowly.',
      ru: 'Пластиковая и металлизированная упаковка, этикетки, карты, премиальные коробки; срочные заказы; невпитывающие материалы.',
      ar: 'العبوات البلاستيكية والمعدنية والملصقات والبطاقات والعلب الفاخرة؛ الأعمال العاجلة؛ الأسطح غير الماصة.',
    },
    body: {
      tr: [
        'UV mürekkepler, UV ışığı altında fotobaşlatıcıların tetiklediği polimerizasyonla saniyeler içinde kürlenir; kuruma süresi beklemeden kesim, selefon ve sevkiyata geçilebilir. Emici olmayan yüzeylere (PVC, PP, PET, metalize karton, sentetik kağıt) üstün yapışma ve yüksek sürtünme direnci sağlar. LED-UV versiyonları daha düşük enerji tüketimi ve ısısız kürleme sunduğu için ısıya duyarlı malzemelerde de kullanılabilir. Buna karşılık UV mürekkepler konvansiyonel mürekkeplerle karıştırılamaz, ayrı yıkama kimyasalı ister ve kürlenme derecesi düzenli olarak (sürtünme ve çözücü testiyle) kontrol edilmelidir.',
        'SIM, Alman [Zeller+Gmelin UV ofset mürekkeplerinin](/urunler/zeller-gmelin-uv-offset-murekkepleri) Türkiye distribütörüdür. Seri seçimi kürleme ünitesinin tipine (klasik UV, LED-UV, H-UV) ve yüzeye göre yapılır; gıda ambalajı için düşük migrasyonlu seçenekler mevcuttur. UV sisteme geçişte merdane ve blanket uyumu (EPDM) kontrol edilmelidir; teknik ekibimiz makine başında kürleme testi ve ayar desteği verir. Lamba yaşlanması kürlenmeyi düşürdüğü için lamba saati takibi ve periyodik ölçüm önerilir. Teknoloji ayrıntıları [UV mürekkep teknolojisi](/blog/uv-murekkep-teknolojisi) yazımızda.',
      ],
      en: [
        'UV inks cure in seconds through photoinitiated polymerisation under UV lamps, so cutting, lamination and dispatch can follow immediately. They adhere to non-absorbent substrates (PVC, PP, PET, metallised board, synthetic paper) and offer high rub resistance. LED-UV versions cure without heat and with lower energy use, which also suits heat-sensitive materials.',
        'SIM is the Turkish distributor of [Zeller+Gmelin UV offset inks](/urunler/zeller-gmelin-uv-offset-murekkepleri) from Germany. The series is chosen by curing system (conventional UV, LED-UV, H-UV) and substrate; low-migration grades are available for food packaging. When converting a press to UV, roller and blanket compatibility (EPDM) must be checked; our technicians run curing tests at the press. International buyers receive the manufacturer TDS/SDS and curing recommendations with every quotation.',
      ],
      ru: [
        'УФ-краски отверждаются за секунды под УФ-лампами, после чего можно сразу резать, ламинировать и отгружать. Они обеспечивают адгезию к невпитывающим материалам (ПВХ, ПП, ПЭТ, металлизированный картон) и высокую стойкость к истиранию.',
        'SIM — дистрибьютор [УФ-офсетных красок Zeller+Gmelin](/urunler/zeller-gmelin-uv-offset-murekkepleri) в Турции. Серия подбирается по типу сушки (UV, LED-UV, H-UV) и материалу; для пищевой упаковки есть низкомиграционные марки.',
      ],
      ar: [
        'تجف أحبار UV في ثوانٍ عبر البلمرة تحت مصابيح الأشعة فوق البنفسجية، فيمكن القص والتغليف والشحن فوراً. تلتصق بالأسطح غير الماصة (PVC وPP وPET والكرتون المعدني) وتوفر مقاومة عالية للاحتكاك.',
        'SIM هي الموزع التركي لأحبار [Zeller+Gmelin UV للأوفست](/urunler/zeller-gmelin-uv-offset-murekkepleri) الألمانية. تُختار السلسلة وفق نظام التجفيف (UV أو LED-UV أو H-UV) والسطح، وتتوفر درجات منخفضة الهجرة لتغليف الأغذية.',
      ],
    },
  },
  {
    key: 'blanket',
    icon: '🔧',
    image: IMG.blanket,
    target: { type: 'product', slug: 'vector-baski-blanketleri' },
    brands: ['VECTOR'],
    name: { tr: 'Baskı blanketleri', en: 'Printing blankets', ru: 'Офсетные полотна', ar: 'بطانيات الطباعة' },
    summary: {
      tr: 'VECTOR (SIM markası) sıkıştırılabilir blanketler; makineye göre kesim, konvansiyonel ve UV uyumlu tipler.',
      en: 'VECTOR (SIM brand) compressible blankets, cut to press size, conventional and UV-compatible grades.',
      ru: 'Компрессионные полотна VECTOR (бренд SIM), нарезка под машину, марки для обычных и УФ-красок.',
      ar: 'بطانيات VECTOR القابلة للانضغاط (علامة SIM)، مقصوصة حسب الماكينة، بأنواع للأحبار التقليدية وUV.',
    },
    whenToUse: {
      tr: 'Her ofset makinesinde periyodik değişimde; yeni makine kurulumunda; UV veya hibrit mürekkebe geçişte uyumlu blanket tipine geçiş gerektiğinde.',
      en: 'Scheduled replacement on every offset press, new press installations, and conversions to UV or hybrid inks that require a compatible blanket grade.',
      ru: 'Плановая замена на любой офсетной машине, запуск новых машин, переход на УФ или гибридные краски.',
      ar: 'الاستبدال الدوري في كل ماكينة أوفست، وتركيب الماكينات الجديدة، والتحول إلى الأحبار UV أو الهجينة.',
    },
    body: {
      tr: [
        'Blanket, mürekkebi kalıptan alıp kağıda aktaran kauçuk–kumaş kompozit yüzeydir; dot gain, nokta keskinliği ve kağıt beslemesi doğrudan blanket kalitesine bağlıdır. Sıkıştırılabilir (compressible) katman baskı basıncındaki dalgalanmaları emer; yüzey sertliği (Shore) ve pürüzlülük mürekkep transferini belirler. Yıpranmış blanket; ton farkı, çift basma ve artan fire olarak işe yansır. Kalınlık toleransı, kumaş katman sayısı ve yüzey taşlama kalitesi, makineye göre doğru tipin seçilmesinde belirleyici parametrelerdir.',
        '[VECTOR baskı blanketleri](/urunler/vector-baski-blanketleri) SIM\'in kendi markasıdır; tabaka ve web ofset makinelerine ölçüye göre kesilir, çubuklu (bar) veya çubuksuz teslim edilir. Konvansiyonel ve UV/hibrit mürekkep uyumlu tipler stoktadır. Baskı koşullarına bağlı olarak 500.000–2.000.000 baskı ömrü beklenir; düzenli yıkama ve doğru gerginlik ömrü uzatır. Blanketle birlikte kalibre edilmiş alt tabaka (packing) kullanımı baskı basıncını standart tutar. Değişim aralığını baskı sayısına göre planlamak, kalite düşüşünü beklemekten daha ucuzdur. Seçim ve bakım ayrıntıları [blanket seçimi ve bakımı](/blog/baski-blanket-secimi-ve-bakimi) rehberimizde.',
      ],
      en: [
        'The blanket is the rubber–fabric composite that takes ink from the plate and lays it on the paper; dot gain, dot sharpness and sheet transport depend directly on its quality. The compressible layer absorbs pressure fluctuations, while surface hardness (Shore) and roughness govern ink transfer. A worn blanket shows up as tonal drift, doubling and rising waste.',
        '[VECTOR printing blankets](/urunler/vector-baski-blanketleri) are SIM\'s own brand, cut to size for sheetfed and web presses and supplied with or without bars. Grades for conventional and UV/hybrid inks are held in stock. Depending on press conditions a blanket lasts 500,000–2,000,000 impressions; regular washing and correct tension extend its life, and calibrated packing keeps printing pressure standard. For export customers we cut to the exact press specification and ship rolled, with bar fitting on request.',
      ],
      ru: [
        'Полотно — резинотканевый композит, переносящий краску с формы на бумагу; от его качества зависят растискивание, чёткость точки и подача листа. Изношенное полотно даёт тоновый сдвиг, двоение и рост брака.',
        '[Офсетные полотна VECTOR](/urunler/vector-baski-blanketleri) — собственный бренд SIM: нарезка под листовые и рулонные машины, с планками или без, марки для обычных и УФ/гибридных красок. Ресурс — 500 000–2 000 000 оттисков в зависимости от условий печати.',
      ],
      ar: [
        'البطانية مركّب من المطاط والقماش ينقل الحبر من اللوح إلى الورق؛ وتعتمد زيادة النقطة وحدّتها وانسياب الورق مباشرة على جودتها. تظهر البطانية المتآكلة على شكل انحراف لوني وطباعة مزدوجة وهدر متزايد.',
        '[بطانيات VECTOR](/urunler/vector-baski-blanketleri) علامة SIM الخاصة: تُقص حسب مقاس الماكينات الورقية واللفائفية وتُسلَّم بقضبان أو بدونها، بأنواع للأحبار التقليدية وUV/الهجينة. يتراوح عمرها بين 500,000 و2,000,000 طبعة حسب ظروف الطباعة.',
      ],
    },
  },
  {
    key: 'chemicals',
    icon: '🧪',
    image: IMG.chem,
    target: { type: 'blog', slug: 'baski-kimyasallari-rehberi' },
    brands: [],
    name: { tr: 'Baskı kimyasalları', en: 'Printing chemicals', ru: 'Печатная химия', ar: 'كيماويات الطباعة' },
    summary: {
      tr: 'Nemlendirme katkıları, yıkama solventleri, kalıp temizleyiciler, kurutucu ve anti-skin katkıları, toz.',
      en: 'Fountain additives, wash solvents, plate cleaners, driers and anti-skinning agents, anti set-off powder.',
      ru: 'Добавки в увлажнение, смывки, очистители форм, сиккативы, противоотмарочный порошок.',
      ar: 'إضافات الترطيب، مذيبات الغسيل، منظفات الألواح، المجففات ومضادات القشرة، بودرة منع الطبع.',
    },
    whenToUse: {
      tr: 'Her vardiyada rutin sarf olarak; renk tutmama, emülsifikasyon, kalıp körlenmesi ve kuruma problemlerinde ilk kontrol noktası olarak.',
      en: 'Routine consumption every shift, and the first thing to check when colour drifts, ink emulsifies, plates blind or drying slows down.',
      ru: 'Ежедневное потребление и первая точка проверки при уходе цвета, эмульгировании, засаливании форм и медленной сушке.',
      ar: 'استهلاك روتيني في كل وردية، وأول نقطة فحص عند انحراف اللون أو الاستحلاب أو انسداد الألواح أو بطء الجفاف.',
    },
    body: {
      tr: [
        'Baskı kimyasalları ofset prosesinin görünmeyen yarısıdır: nemlendirme (fount) solüsyonu katkıları ve IPA alternatifleri, blanket ve merdane yıkama solventleri, kalıp temizleyici ve koruyucular, kurutucu ve anti-skin katkıları, anti set-off tozu ve mürekkep katkıları. Su–mürekkep dengesi bozulduğunda emülsifikasyon, tonlama ve geç kuruma başlar; doğru kimyasal seçimi fire oranını doğrudan düşürür. Nemlendirme solüsyonunda pH (genellikle 4,8–5,5) ve iletkenlik takibi, her vardiyada yapılması gereken en ucuz kalite kontrolüdür.',
        'SIM, mürekkep ve blanketle uyumlu kimyasal setini tek elden sunar; ürün grubunun tamamı ve seçim kriterleri [Baskı Kimyasalları Rehberi](/blog/baski-kimyasallari-rehberi) yazımızda, güncel ürünler [ürün kataloğunda](/urunler) yer alır. Her kimyasal için SDS (güvenlik bilgi formu) ve kullanım oranı tablosu teslimatla birlikte verilir; düşük VOC ve IPA\'sız solüsyon geçişlerinde teknik ekibimiz pH ve iletkenlik ölçümüyle makine başında destek olur. Kimyasallar mürekkep ve blanketle aynı tedarikçiden alındığında uyumsuzluk kaynaklı şişme ve merdane sertleşmesi riski ortadan kalkar.',
      ],
      en: [
        'Printing chemicals are the invisible half of the offset process: fountain solution additives and IPA replacements, blanket and roller washes, plate cleaners and gums, driers and anti-skinning agents, anti set-off powder and ink additives. When the ink–water balance drifts, emulsification, toning and slow drying follow; the right chemistry directly lowers waste.',
        'SIM supplies the complete chemical set matched to the inks and blankets it sells; the full product group and selection rules are in our [printing chemicals guide](/blog/baski-kimyasallari-rehberi) and current items in the [product catalogue](/urunler). Every chemical ships with its SDS and a dosage table, and our technicians support IPA-free and low-VOC conversions with pH and conductivity measurements at the press. For export we provide SDS in English and transport classification for sea and air freight.',
      ],
      ru: [
        'Печатная химия — невидимая половина офсета: добавки в увлажняющий раствор и заменители ИПС, смывки для полотен и валов, очистители форм, сиккативы, противоотмарочный порошок. Нарушение баланса «краска–вода» ведёт к эмульгированию и браку.',
        'SIM поставляет полный набор химии, совместимый с красками и полотнами; подробности — в [руководстве по печатной химии](/blog/baski-kimyasallari-rehberi) и [каталоге](/urunler). К каждому продукту прилагаются SDS и таблица дозировки.',
      ],
      ar: [
        'كيماويات الطباعة هي النصف الخفي من عملية الأوفست: إضافات محلول الترطيب وبدائل الكحول، مذيبات غسيل البطانيات والأسطوانات، منظفات الألواح، المجففات، وبودرة منع الطبع. يؤدي اختلال توازن الحبر والماء إلى الاستحلاب والهدر.',
        'توفر SIM مجموعة الكيماويات الكاملة المتوافقة مع الأحبار والبطانيات؛ التفاصيل في [دليل كيماويات الطباعة](/blog/baski-kimyasallari-rehberi) و[كتالوج المنتجات](/urunler). تُرفق مع كل منتج نشرة السلامة SDS وجدول الجرعات.',
      ],
    },
  },
  {
    key: 'varnish',
    icon: '🧴',
    image: IMG.varnish,
    target: { type: 'product', slug: 'hi-tech-coatings-dispersiyon-lak' },
    brands: ['Hi-Tech Coatings'],
    name: { tr: 'Dispersiyon lak ve kaplamalar', en: 'Dispersion varnishes and coatings', ru: 'Дисперсионные лаки и покрытия', ar: 'ورنيشات التشتت والطلاءات' },
    summary: {
      tr: 'Hi-Tech Coatings su bazlı laklar: parlak, mat, soft-touch, blister ve yapıştırılabilir tipler.',
      en: 'Hi-Tech Coatings water-based varnishes: gloss, matte, soft-touch, blister and glueable grades.',
      ru: 'Водные лаки Hi-Tech Coatings: глянцевые, матовые, soft-touch, блистерные и склеиваемые.',
      ar: 'ورنيشات Hi-Tech Coatings المائية: لامعة ومطفية وناعمة الملمس وبليستر وقابلة للصق.',
    },
    whenToUse: {
      tr: 'Karton ambalaj, kutu, etiket, dergi kapağı ve broşürlerde koruma ve efekt için; metalik ve floresan baskıların üstünde haslık artırmak için.',
      en: 'Protection and finish on folding cartons, boxes, labels, magazine covers and brochures; over metallic and fluorescent print to improve durability.',
      ru: 'Защита и отделка картонной упаковки, коробок, этикеток, обложек; поверх металлик- и флуоресцентной печати.',
      ar: 'الحماية واللمسة النهائية لعلب الكرتون والملصقات وأغلفة المجلات والكتيبات؛ وفوق الطباعة المعدنية والفلورية لزيادة المتانة.',
    },
    body: {
      tr: [
        'Dispersiyon lak, su bazlı akrilik bir kaplamadır; baskı makinesinin lak ünitesinden in-line uygulanır ve IR ile saniyeler içinde kurur. Baskıyı sürtünmeye karşı korur, parlak, mat veya soft-touch efekt verir ve kutu katlama hatlarında çatlamayı azaltır. Selefon ve UV laka göre daha ekonomik, geri dönüşüme uygun ve gıda ambalajı için düşük kokulu bir seçenektir. Parlaklık, kuruma hızı ve yapışma; lak film ağırlığına, kağıdın emiciliğine ve IR kurutucunun sıcaklığına göre ayarlanır.',
        'SIM, Hollandalı [Hi-Tech Coatings su bazlı dispersiyon laklarının](/urunler/hi-tech-coatings-dispersiyon-lak) Türkiye distribütörüdür: parlak, mat, soft-touch (Velvet Touch), blister ve yapıştırılabilir (glueable) tipler ile metalik baskı için özel koruyucu laklar. Lak seçimi kağıt gramajı, sonraki işlem (kesim, yapıştırma, selefon) ve istenen parlaklık (GU) değerine göre yapılır; 20 kg bidon ve IBC ambalajlarında stoktan teslim edilir. Lak ünitesi olmayan makineler için mürekkep ünitesinden basılabilen baskı lakları da portföyde yer alır.',
      ],
      en: [
        'A dispersion varnish is a water-based acrylic coating applied in-line from the press coater and dried by IR in seconds. It protects the print against rubbing, adds a gloss, matte or soft-touch finish and reduces cracking on carton fold lines. Compared with lamination or UV varnish it is more economical, recyclable and low-odour for food packaging.',
        'SIM is the Turkish distributor of [Hi-Tech Coatings water-based dispersion varnishes](/urunler/hi-tech-coatings-dispersiyon-lak) from the Netherlands: gloss, matte, soft-touch (Velvet Touch), blister and glueable grades plus protective varnishes for metallic print. Selection depends on board weight, downstream processes (die-cutting, gluing, lamination) and the target gloss level (GU). Stock is held in 20 kg drums and IBCs, and export shipments include the manufacturer\'s TDS and food-contact statements where applicable.',
      ],
      ru: [
        'Дисперсионный лак — водный акриловый состав, наносимый в линию лаковой секцией и высыхающий под ИК за секунды. Он защищает оттиск от истирания, даёт глянцевый, матовый или soft-touch эффект и снижает растрескивание на сгибах.',
        'SIM — дистрибьютор [водных дисперсионных лаков Hi-Tech Coatings](/urunler/hi-tech-coatings-dispersiyon-lak) (Нидерланды): глянец, мат, soft-touch, блистер, склеиваемые, а также защитные лаки для металлик-печати. Поставка со склада в канистрах 20 кг и IBC.',
      ],
      ar: [
        'ورنيش التشتت طلاء أكريليكي مائي يُطبّق في الخط من وحدة الطلاء ويجف بالأشعة تحت الحمراء في ثوانٍ. يحمي المطبوع من الاحتكاك ويمنح لمسة لامعة أو مطفية أو ناعمة ويقلل التشقق عند خطوط الطي.',
        'SIM هي الموزع التركي لـ[ورنيشات التشتت المائية Hi-Tech Coatings](/urunler/hi-tech-coatings-dispersiyon-lak) الهولندية: لامعة ومطفية وناعمة الملمس وبليستر وقابلة للصق، إضافة إلى ورنيشات حماية للطباعة المعدنية. تتوفر من المخزون في عبوات 20 كجم وIBC.',
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — TR                                                   */
/* ------------------------------------------------------------------ */
const TR: PillarContent = {
  meta: {
    title: 'Matbaa Malzemeleri | Mürekkep, Blanket, Kimyasal Tedarikçisi',
    description:
      `Matbaa malzemeleri tedarikçisi SIM (1983): ofset ve PANTONE mürekkep, metalik, UV, blanket, kimyasal ve lak. İstanbul'da aynı gün teslimat; teklif alın.`,
    keywords: [
      'matbaa malzemeleri', 'matbaa malzemesi', 'matbaa sarf malzemeleri', 'matbaa baskı malzemeleri',
      'matbaa malzemeleri fiyatları', 'matbaa malzemeleri toptan', 'matbaa malzemeleri tedarikçisi',
      'ofset mürekkep', 'PANTONE mürekkep', 'metalik mürekkep', 'UV mürekkep', 'baskı blanketi', 'baskı kimyasalları', 'dispersiyon lak',
    ],
  },
  pageName: 'Matbaa Malzemeleri',
  hero: {
    eyebrow: `${YEARS} yıldır Türkiye matbaa sektörünün tedarikçisi`,
    h1: `Matbaa Malzemeleri: Türkiye'nin 1983'ten Beri Tedarikçisi`,
    lead:
      `Ofset ve PANTONE mürekkeplerden metalik, floresan ve UV serilerine; baskı blanketlerinden kimyasal ve laklara kadar bir matbaanın ihtiyaç duyduğu her sarf malzemesi tek çatı altında. Kendi markalarımız EVA COLOR ve VECTOR ile distribütörlüğünü yaptığımız SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK ürünlerini ${CITY}'daki depomuzdan Türkiye'nin her yerine ve ihracat pazarlarına ulaştırıyoruz.`,
  },
  shortAnswer: {
    title: 'Kısa cevap',
    text:
      `Matbaa malzemeleri, baskı üretiminde tüketilen sarf ürünlerinin tamamıdır: ofset, PANTONE, metalik, floresan ve UV mürekkepler; baskı blanketleri; nemlendirme ve yıkama kimyasalları; dispersiyon laklar. SIM Baskı Malzemeleri bu sekiz ürün grubunu 1983'ten beri İstanbul'dan tedarik eder: stok ürünlerde İstanbul içi aynı gün, Türkiye geneli ${F.domesticLeadTimeDays} iş günü teslimat; özel renkler ${F.labAvailability} çalışan laboratuvarda üretilir.`,
  },
  keyFacts: {
    title: 'Temel bilgiler',
    rows: [
      { label: 'Ürün grupları', value: 'Ofset (CMYK), PANTONE/özel renk, metalik, floresan, UV mürekkepler; blanket; baskı kimyasalları; dispersiyon lak' },
      { label: 'Markalar', value: 'EVA COLOR ve VECTOR (üretici) · SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK (Türkiye distribütörü)' },
      { label: 'Uygulama alanları', value: 'Tabaka ve web ofset, UV ofset, karton ambalaj, etiket, ticari baskı, kitap ve dergi' },
      { label: 'Teslimat', value: `İstanbul içi stok ürünlerde aynı gün (${F.sameDayCutoff}'ye kadar sipariş) · Türkiye geneli ${F.domesticLeadTimeDays} iş günü · ihracat: kara, deniz, hava` },
      { label: 'Minimum sipariş', value: `Stok ürünlerde yok (tek kutu) · özel renk üretiminde ${F.customColorMinimumKg} kg` },
      { label: 'Belgeler', value: 'Talep üzerine TDS ve SDS; ISO 2846-1 uyumlu mürekkepler; gıda ambalajı için düşük migrasyonlu seçenekler' },
      { label: 'Laboratuvar', value: `${F.labAvailability} özel renk laboratuvarı, aylık ${CAP.tr} kg kapasite, Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefi` },
      { label: 'Kuruluş ve konum', value: `${F.foundingYear}, ${CITY} (merkez depo ve laboratuvar)` },
    ],
  },
  what: {
    title: 'Matbaa malzemeleri nelerdir?',
    paragraphs: [
      'Matbaa malzemeleri, bir baskı işinin kağıt dışında tükettiği her şeyi kapsayan sarf malzemesi grubudur: kalıptan kağıda renk taşıyan mürekkepler, mürekkebi aktaran blanketler, su–mürekkep dengesini ve makine temizliğini sağlayan kimyasallar ve baskıyı koruyup efekt veren laklar. Makine ve kağıt bir kez seçilir; malzemeler ise her vardiyada tüketilir ve her işte yeniden seçilir. Bu yüzden baskı kalitesinin, fire oranının ve birim maliyetin asıl belirleyicisi malzemelerdir.',
      'Bu malzemeler birbirinden bağımsız değildir. Mürekkebin tack değeri blanketin yüzeyiyle, kurutucu katkısı nemlendirme solüsyonunun pH\'ıyla, lak seçimi mürekkebin kuruma hızıyla etkileşir. Tek bir kalemde yapılan yanlış tercih, görünüşte başka bir yerde ortaya çıkan problemler (tonlama, set-off, çift basma, geç kuruma) üretir. Doğru yaklaşım, malzemeleri birbirine uyumlu bir sistem olarak seçmek ve aynı tedarikçiden teknik destekle almaktır.',
      `Bu rehber sekiz ürün grubunu, seçim kriterlerini, kağıt–mürekkep uyumunu, fiyatı belirleyen faktörleri ve tedarik sürecini tek sayfada toplar. SIM Baskı Malzemeleri bu ürünleri ${YEARS} yıldır Türkiye matbaa sektörüne sağlıyor; ürün sayfalarına ve ilgili rehber yazılara bölümlerden ulaşabilirsiniz.`,
    ],
    listTitle: 'Sekiz ana ürün grubu',
  },
  categories: {
    title: 'Matbaa malzemeleri: 8 ürün grubu',
    intro:
      'Her grup için ne olduğunu, ne zaman kullanıldığını ve SIM\'de hangi markaların bulunduğunu özetledik. Ürün sayfalarında teknik özellikler, kullanım alanları ve sık sorulan sorular yer alır.',
    viewLabel: 'Ürünü incele',
    whenLabel: 'Ne zaman kullanılır',
    brandsLabel: 'SIM\'de markalar',
  },
  criteria: {
    title: 'Doğru malzeme seçimi: 7 kriter',
    intro:
      'Satın alma kararı fiyat listesinden değil, baskı koşullarından başlar. Aşağıdaki yedi kriter, teklif istemeden önce netleştirilmesi gereken bilgileri ve tedarikçiden istenecek belgeleri sıralar.',
    headers: ['Kriter', 'Neden önemli', 'Ne kontrol edilir'],
    rows: [
      { name: '1. Baskı tekniği ve makine', why: 'Tabaka ofset, web ofset, UV/LED-UV veya hibrit sistemler farklı mürekkep, blanket ve kimyasal ister.', check: 'Makine modeli, ünite sayısı, kurutma/kürleme tipi, merdane ve blanket malzemesi.' },
      { name: '2. Kağıt ve yüzey', why: 'Kuşe, 1. hamur, karton, metalize veya plastik yüzeylerde kuruma mekanizması ve yapışma değişir.', check: 'Gramaj, kaplama, emicilik, pürüzlülük; yüzey için TDS\'de önerilen seri.' },
      { name: '3. Renk standardı', why: 'ISO 2846-1 ve ISO 12647-2 (FOGRA/GRACoL) uyumu, prova–baskı eşleşmesini ve tekrar siparişte tutarlılığı garanti eder.', check: 'Mürekkebin standart beyanı, Delta E hedefi, PANTONE referansı ve kağıt tipi (C/U).' },
      { name: '4. Kuruma ve son işlem', why: 'Selefon, lak, kesim ve yapıştırma; mürekkebin kuruma süresi ve lak uyumuyla sınırlıdır.', check: 'Set-off direnci, kuruma süresi, lak/selefon uyumluluğu, sürtünme testi.' },
      { name: '5. Mevzuat ve güvenlik', why: 'Gıda ambalajı, oyuncak ve kozmetik işlerinde düşük migrasyon ve belge zorunluluğu vardır.', check: 'SDS, düşük migrasyon beyanı (Swiss Ordinance / Nestlé rehberi), EuPIA uyumu.' },
      { name: '6. Tedarik sürekliliği', why: 'Kritik kalemde stok kesintisi üretimi durdurur; lot değişimi renk farkı yaratabilir.', check: 'Stok politikası, teslim süresi, lot takibi, reçete arşivi.' },
      { name: '7. Teknik destek ve belge', why: 'Problemler makine başında çözülür; TDS/SDS ve numune olmadan karar vermek risklidir.', check: 'Saha desteği, numune politikası, TDS/SDS erişimi, ölçüm (spektrofotometre, pH, iletkenlik).' },
    ],
  },
  paper: {
    title: 'Kağıt ve yüzey türüne göre mürekkep uyumu',
    intro:
      'Aynı mürekkep farklı yüzeylerde farklı davranır: emici kağıtlarda penetrasyonla, kaplı ve plastik yüzeylerde oksidasyon veya UV kürleme ile kurur. Tablo, yüzeye göre önerilen mürekkep grubunu ve dikkat noktalarını özetler.',
    headers: ['Yüzey', 'Önerilen mürekkep', 'Not'],
    rows: [
      { surface: 'Parlak kuşe kağıt', ink: 'Konvansiyonel CMYK, PANTONE, metalik', note: 'Metalik ve floresanın en parlak göründüğü yüzey; set-off için toz veya lak.' },
      { surface: 'Mat kuşe kağıt', ink: 'Konvansiyonel CMYK, PANTONE', note: 'Sürtünme izi riski; koruyucu mat lak önerilir. Metalik parlaklık düşer.' },
      { surface: '1. hamur (ofset) kağıt', ink: 'Hızlı set-off dirençli CMYK, Uncoated PANTONE', note: 'Yüksek emicilik dansiteyi düşürür; Uncoated referans kullanılır.' },
      { surface: 'Kraft ve geri dönüştürülmüş', ink: 'Yüksek pigmentli CMYK, opak beyaz altlık', note: 'Kağıt rengi tonu kaydırır; prova zorunlu.' },
      { surface: 'Karton (ambalaj)', ink: 'Konvansiyonel veya UV CMYK + dispersiyon lak', note: 'Katlama hatlarında çatlamaya karşı esnek lak; gıda temasında düşük migrasyon.' },
      { surface: 'Metalize karton, PP, PET, PVC', ink: 'UV / LED-UV mürekkep', note: 'Konvansiyonel mürekkep kurumaz; yapışma testi ve EPDM blanket.' },
      { surface: 'Etiket (kuşe etiket, PE/PP film)', ink: 'UV veya düşük migrasyonlu konvansiyonel', note: 'Sürtünme ve su direnci için UV lak veya selefon.' },
    ],
  },
  price: {
    title: 'Matbaa malzemeleri fiyatlarını etkileyen 6 faktör',
    intro:
      'Matbaa malzemeleri fiyatları tek bir liste rakamı değildir; aynı ürün grubunda hammadde, marka, ambalaj ve teknik gereksinime göre geniş bir aralık oluşur. Teklifin neden değiştiğini bilmek, doğru karşılaştırma yapmayı sağlar.',
    factors: [
      { name: 'Pigment ve hammadde', text: 'Metalik mürekkeplerde bronz/alüminyum pigment, floresanda özel pigmentler, UV\'de fotobaşlatıcılar maliyeti CMYK\'ya göre katlar. Pigment oranı yükseldikçe kilogram fiyatı artar ama tüketim düşer.' },
      { name: 'Marka ve menşe', text: 'Japon, Alman ve Hollanda menşeli distribütörlük ürünleriyle SIM üretimi EVA COLOR ve VECTOR arasında fiyat–performans dengesi farklıdır; ikisi de aynı belgelerle sunulur.' },
      { name: 'Ambalaj ve miktar', text: '1 kg, 2,5 kg kutu, 20 kg bidon ve IBC ambalajlarda birim fiyat düşer. Toptan ve düzenli siparişlerde yıllık anlaşma fiyatı uygulanır.' },
      { name: 'Özel renk formülasyonu', text: `Laboratuvar süresi, numune ve reçete geliştirme maliyeti; minimum ${F.customColorMinimumKg} kg. Tekrar siparişlerde reçete hazır olduğu için süre ve maliyet düşer.` },
      { name: 'Teknik gereksinim', text: 'Düşük migrasyon, LED-UV, hızlı kuruma, yüksek sürtünme direnci gibi özellikler formülasyonu ve belge yükünü artırır.' },
      { name: 'Teslimat ve lojistik', text: `İstanbul içi aynı gün teslimat stok ürünlerde dahildir; il dışı kargo ve ihracatta Incoterms (EXW, FOB, CIF) teklifi belirler.` },
    ],
    ctaText: 'Makine, kağıt ve iş bilgilerinizi paylaşın; aynı iş günü içinde ürün önerisi ve fiyat teklifi gönderelim.',
    ctaButton: 'Teklif isteyin',
  },
  supply: {
    title: 'Tedarik süreci ve teslimat',
    intro:
      `Sipariş, ${CITY}'daki merkez depo ve laboratuvardan yönetilir. Stok ürünler aynı gün hazırlanır; özel renkler laboratuvar akışına girer. Süreç altı adımda ilerler:`,
    steps: [
      { name: 'İhtiyaç analizi', text: 'Makine, kağıt, iş tipi ve hedef renk standardı alınır; mevcut malzemelerle uyum kontrol edilir.' },
      { name: 'Numune ve belge', text: 'Yeni ürünlerde numune, TDS ve SDS paylaşılır; gerekirse makine başında deneme baskısı yapılır.' },
      { name: 'Teklif ve onay', text: 'Ambalaj, miktar ve teslim koşuluna göre teklif; düzenli müşterilerde vadeli çalışma seçenekleri.' },
      { name: 'Hazırlık', text: `Stoktan sevk veya ${F.labAvailability} laboratuvarda özel renk üretimi (numune onayından sonra ${F.customColorLeadTimeDays} iş günü).` },
      { name: 'Teslimat', text: `İstanbul içinde ${F.sameDayCutoff}'ye kadar verilen stok siparişleri aynı gün; Türkiye geneli ${F.domesticLeadTimeDays} iş günü; ihracatta kara, deniz veya hava kargo ile gümrük belgeleri eşliğinde.` },
      { name: 'Saha desteği ve takip', text: 'İlk kullanımda ayar desteği, sonrasında stok takibi ve periyodik teknik ziyaret.' },
    ],
    outro:
      `İhracat: ${F.exportRegions.tr} başta olmak üzere yurt dışına düzenli sevkiyat yapıyoruz; İngilizce TDS/SDS, menşe ve analiz belgeleri teklifle birlikte hazırlanır.`,
  },
  brands: {
    title: 'Markalarımız: üretici ve distribütör',
    intro:
      'SIM iki kendi markası ve dört uluslararası distribütörlükle çalışır. Bu matris, hangi ürün grubunu hangi markayla karşıladığımızı gösterir; tüm markalar için resmi Türkiye distribütörlük belgeleri talep üzerine paylaşılır.',
    headers: ['Marka', 'Ülke', 'Rol', 'Ürün grubu'],
    roles: { own: 'Kendi markamız (üretici)', distributor: 'Türkiye distribütörü' },
  },
  brandRows: {
    'EVA COLOR': { role: 'Kendi markamız (üretici)', products: 'Metalik, floresan ve özel renk ofset mürekkepleri' },
    VECTOR: { role: 'Kendi markamız (üretici)', products: 'Ofset baskı blanketleri' },
    'SAKATA INX': { role: `Türkiye distribütörü (${SAKATA_SINCE}'den beri)`, products: 'CMYK ve PANTONE tabaka ofset mürekkepleri' },
    'Zeller+Gmelin': { role: 'Türkiye distribütörü', products: 'UV ve LED-UV ofset mürekkepleri' },
    'Hi-Tech Coatings': { role: 'Türkiye distribütörü', products: 'Su bazlı dispersiyon laklar ve kaplamalar' },
    SCHLENK: { role: 'Türkiye distribütörü', products: 'Metalik pigmentler ve metalik mürekkepler' },
  },
  why: {
    title: `Neden ${F.foundingYear}'ten beri SIM?`,
    intro:
      `SIM Baskı Malzemeleri ${F.foundingYear}'te İstanbul'da kuruldu; ${YEARS} yıldır aynı sektöre, aynı adresten hizmet veriyor. Aşağıdaki olgular bir slogan değil, sipariş sürecinde kontrol edebileceğiniz somut taahhütlerdir.`,
    facts: [
      { label: 'Kuruluş', value: `${F.foundingYear} — ${YEARS} yıllık kesintisiz tedarik` },
      { label: 'Üretim', value: 'EVA COLOR mürekkep ve VECTOR blanket: iki kendi markası' },
      { label: 'Distribütörlük', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, Hi-Tech Coatings, SCHLENK` },
      { label: 'Laboratuvar', value: `${F.labAvailability} özel renk laboratuvarı, aylık ${CAP.tr} kg kapasite` },
      { label: 'Renk güvencesi', value: `Spektrofotometrik ölçüm, Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefi, ISO 2846-1 uyumlu mürekkepler` },
      { label: 'Lojistik', value: `${CITY} merkez depo; İstanbul'da aynı gün, Türkiye'de ${F.domesticLeadTimeDays} iş günü` },
      { label: 'Dil ve pazar', value: `Türkçe, İngilizce, Rusça ve Arapça hizmet; ${F.exportRegions.tr} pazarlarına ihracat` },
    ],
    timeline: [
      { year: String(F.foundingYear), text: 'SIM Baskı Malzemeleri İstanbul\'da kâğıt, karton ve baskı malzemeleri tedariki için kuruldu.' },
      { year: '1998', text: 'Odak ofset baskı mürekkepleri, baskı üstü laklar, blanketler ve ofset kimyasallarına kaydı.' },
      { year: SAKATA_SINCE, text: 'SAKATA INX (Japonya) Türkiye distribütörlüğü; CMYK ve PANTONE serileri stoğa girdi.' },
      { year: 'Sonrası', text: 'EVA COLOR metalik ve floresan mürekkep üretimi, VECTOR blanket markası; Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK distribütörlükleri.' },
      { year: 'Bugün', text: `${F.labAvailability} özel renk laboratuvarı, dört dilde hizmet, Türkiye geneli dağıtım ve ihracat.` },
    ],
  },
  faq: {
    title: 'Matbaa malzemeleri hakkında sık sorulan sorular',
    items: [
      { q: 'Matbaa malzemeleri nelerdir?', a: 'Matbaa malzemeleri, baskı üretiminde kağıt dışında tüketilen sarf ürünleridir: ofset (CMYK), PANTONE ve özel renk, metalik, floresan ve UV mürekkepler; baskı blanketleri; nemlendirme, yıkama ve kalıp kimyasalları; dispersiyon lak ve kaplamalar. Bu sekiz grup birbirine uyumlu bir sistem olarak seçildiğinde renk tutarlılığı artar ve fire düşer.' },
      { q: 'Ofset baskı için hangi temel malzemeler gerekir?', a: 'Bir tabaka ofset makinesi için en az şunlar gerekir: ISO 2846-1 uyumlu CMYK mürekkep seti, kurumsal renkler için PANTONE veya özel renk mürekkepleri, makineye göre kesilmiş blanket ve alt tabaka, nemlendirme solüsyonu katkısı, blanket ve merdane yıkama solventi, kalıp temizleyici, anti set-off tozu ve işe göre dispersiyon lak. SIM bu setin tamamını stoktan sağlar.' },
      { q: 'Matbaa malzemeleri fiyatları neye göre belirlenir?', a: 'Fiyatı altı faktör belirler: pigment ve hammadde (metalik, floresan, UV daha yüksek), marka ve menşe, ambalaj ve miktar (bidon ve toptan siparişlerde düşer), özel renk formülasyonu, düşük migrasyon gibi teknik gereksinimler ve teslimat koşulu (İstanbul içi, il dışı, ihracat Incoterms). Makine, kağıt ve iş bilgisiyle aynı gün içinde net teklif veriyoruz.' },
      { q: 'Minimum sipariş miktarı var mı?', a: `Stok ürünlerde minimum sipariş yoktur; tek kutu mürekkep veya tek blanket sipariş edebilirsiniz. Laboratuvarda üretilen özel renklerde minimum ${F.customColorMinimumKg} kg uygulanır; bu miktar formülasyon maliyetini ve lot tutarlılığını dengeler. Toptan ve düzenli siparişlerde yıllık anlaşma fiyatları sunuyoruz.` },
      { q: 'İstanbul dışına ve yurt dışına teslimat yapıyor musunuz?', a: `Evet. İstanbul içinde ${F.sameDayCutoff}'ye kadar verilen stok siparişleri aynı gün teslim edilir; Türkiye'nin diğer illerine ${F.domesticLeadTimeDays} iş günü içinde kargo ile ulaşır. ${F.exportRegions.tr} başta olmak üzere yurt dışına kara, deniz ve hava yoluyla ihracat yapıyor; gümrük, menşe ve analiz belgelerini biz hazırlıyoruz.` },
      { q: 'Hangi markaların Türkiye distribütörüsünüz?', a: `SAKATA INX (Japonya, ${SAKATA_SINCE}'den beri; CMYK ve PANTONE mürekkepler), Zeller+Gmelin (Almanya; UV mürekkepler), Hi-Tech Coatings (Hollanda; dispersiyon laklar) ve SCHLENK (Almanya; metalik pigmentler) markalarının resmi Türkiye distribütörüyüz. EVA COLOR metalik, floresan ve özel renk mürekkepleri ile VECTOR blanketler ise kendi markalarımızdır.` },
      { q: 'PANTONE veya kurumsal bir rengi üretebilir misiniz, ne kadar sürer?', a: `Evet. PANTONE kodu, baskılı örnek veya L*a*b* değeri yeterlidir; laboratuvarımız rengi spektrofotometreyle Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefiyle formüle eder. Numune onayından sonra teslim ${F.customColorLeadTimeDays} iş günüdür; reçete saklandığı için tekrar siparişler daha hızlı çıkar. Laboratuvar ${F.labAvailability} çalışır ve aylık ${CAP.tr} kg kapasiteye sahiptir.` },
      { q: 'Mürekkep ve kimyasallar nasıl depolanmalı, raf ömrü ne kadar?', a: 'Her ürünün raf ömrü ve depolama koşulu TDS\'de belirtilir; genel kural kapalı orijinal ambalajda, doğrudan güneş ışığından uzak, serin ve kuru ortamda saklamaktır. Açılmış mürekkep kutusunda yüzeyin kabuk bağlamaması için anti-skin sprey veya kapak altı folyo kullanılır. Kimyasallar için SDS\'deki uyumsuzluk ve havalandırma kuralları geçerlidir.' },
      { q: 'TDS, SDS belgelerini ve numune alabilir miyim?', a: 'Evet. Tüm ürünler için güncel teknik veri sayfası (TDS) ve güvenlik bilgi formu (SDS) talep üzerine Türkçe ve İngilizce paylaşılır. Yeni bir ürünü denemek veya özel renk üretimi öncesinde renk doğruluğunu görmek isteyen müşterilerimize değerlendirme numunesi gönderiyoruz; gerektiğinde teknik ekibimiz makine başında deneme baskısına eşlik eder.' },
      { q: `SIM'i ${F.foundingYear}'ten beri farklı kılan nedir?`, a: `${YEARS} yıldır aynı sektörde, aynı adresten hizmet veriyoruz: iki kendi markamız (EVA COLOR, VECTOR), dört uluslararası distribütörlük, ${F.labAvailability} çalışan özel renk laboratuvarı ve makine başında teknik destek. Ürünleri tek tek değil, birbiriyle uyumlu bir sistem olarak öneriyor; her teslimatı belge, numune ve saha desteğiyle tamamlıyoruz.` },
    ],
  },
  related: {
    title: 'İlgili kaynaklar',
    postsTitle: 'Rehber yazılar',
    linksTitle: 'Sayfalar',
  },
  cta: {
    title: 'Matbaa malzemeleri için teklif alın',
    text: 'Makinenizi, kağıdınızı ve işinizi yazın; doğru ürün grubunu ve fiyatı aynı iş günü içinde iletelim.',
    button: 'Teklif formu',
    whatsapp: 'WhatsApp ile yazın',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — EN (ihracat dili)                                    */
/* ------------------------------------------------------------------ */
const EN: PillarContent = {
  meta: {
    title: 'Printing Materials & Supplies Supplier in Turkey, Est. 1983',
    description:
      `Printing materials supplier in Istanbul, Turkey since 1983: offset and PANTONE inks, metallic, UV, blankets, chemicals, varnish. Export-ready, MOQ-free stock.`,
    keywords: [
      'printing materials', 'printing supplies Turkey', 'printing materials supplier Turkey', 'offset ink supplier Turkey',
      'printing supplies Istanbul', 'offset printing supplies', 'PANTONE ink Turkey', 'metallic ink manufacturer Turkey',
      'UV offset ink Turkey', 'printing blanket supplier', 'printing chemicals', 'dispersion varnish',
    ],
  },
  pageName: 'Printing Materials',
  hero: {
    eyebrow: `Supplying the Turkish printing industry for ${YEARS} years`,
    h1: `Printing Materials & Supplies: Turkey's Supplier Since 1983`,
    lead:
      `Every consumable a print shop needs under one roof: offset and PANTONE inks, metallic, fluorescent and UV series, printing blankets, pressroom chemicals and dispersion varnishes. We manufacture EVA COLOR inks and VECTOR blankets in Istanbul and distribute SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK in Turkey, shipping from our ${CITY} warehouse across Turkey and to export markets.`,
  },
  shortAnswer: {
    title: 'Short answer',
    text:
      `Printing materials are the consumables used in print production other than paper: offset, PANTONE, metallic, fluorescent and UV inks; printing blankets; fountain and wash chemicals; dispersion varnishes. SIM Printing Supplies has supplied these eight product groups from Istanbul since 1983, with stock shipped the same day in Istanbul, within ${F.domesticLeadTimeDays} working days across Turkey, and by road, sea or air to export customers.`,
  },
  keyFacts: {
    title: 'Key facts',
    rows: [
      { label: 'Product groups', value: 'Offset (CMYK), PANTONE/custom, metallic, fluorescent and UV inks; blankets; pressroom chemicals; dispersion varnish' },
      { label: 'Brands', value: 'EVA COLOR and VECTOR (manufacturer) · SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK (distributor for Turkey)' },
      { label: 'Applications', value: 'Sheetfed and web offset, UV offset, folding cartons, labels, commercial print, books and magazines' },
      { label: 'Lead time', value: `Same day in Istanbul for stock (orders by ${F.sameDayCutoff}) · ${F.domesticLeadTimeDays} working days across Turkey · export by road, sea or air` },
      { label: 'MOQ', value: `None for stock items (single can) · ${F.customColorMinimumKg} kg for custom colours` },
      { label: 'Documents', value: 'TDS and SDS in English on request; ISO 2846-1 inks; low-migration options for food packaging' },
      { label: 'Laboratory', value: `${F.labAvailability} custom colour lab, ${CAP.en} kg monthly capacity, Delta E below ${F.deltaEMax}` },
      { label: 'Founded / location', value: `${F.foundingYear}, ${CITY}, Turkey (central warehouse and laboratory)` },
    ],
  },
  what: {
    title: 'What are printing materials?',
    paragraphs: [
      'Printing materials are the consumable group that a print job uses up apart from paper: inks that carry colour from plate to sheet, blankets that transfer it, chemicals that keep the ink–water balance and the press clean, and varnishes that protect and finish the print. A press and a paper are chosen once; materials are consumed every shift and re-selected for every job, which makes them the real driver of print quality, waste and unit cost.',
      'These materials are not independent. Ink tack interacts with blanket surface, driers with fountain solution pH, varnish choice with ink setting speed. A wrong decision in one item produces problems that appear somewhere else (toning, set-off, doubling, slow drying). The right approach is to select materials as a matched system and to buy them from one supplier with technical support.',
      `This guide collects the eight product groups, selection criteria, paper–ink compatibility, the factors behind pricing and the supply process on one page. SIM has supplied these materials to the Turkish printing industry for ${YEARS} years and exports the same range with English documentation; product pages and in-depth articles are linked from each section.`,
    ],
    listTitle: 'The eight product groups',
  },
  categories: {
    title: 'Printing materials: 8 product groups',
    intro:
      'For each group we summarise what it is, when it is used and which brands SIM holds. Product pages carry specifications, applications and FAQs.',
    viewLabel: 'View product',
    whenLabel: 'When to use',
    brandsLabel: 'Brands at SIM',
  },
  criteria: {
    title: 'Choosing the right material: 7 criteria',
    intro:
      'A purchase decision starts with press conditions, not with a price list. The seven criteria below list what to clarify before requesting a quotation and which documents to ask the supplier for.',
    headers: ['Criterion', 'Why it matters', 'What to check'],
    rows: [
      { name: '1. Printing process and press', why: 'Sheetfed, web, UV/LED-UV or hybrid systems need different inks, blankets and chemicals.', check: 'Press model, number of units, drying/curing type, roller and blanket material.' },
      { name: '2. Paper and substrate', why: 'Coated, uncoated, board, metallised or plastic surfaces change drying mechanism and adhesion.', check: 'Grammage, coating, absorbency, roughness; series recommended for the substrate in the TDS.' },
      { name: '3. Colour standard', why: 'ISO 2846-1 and ISO 12647-2 (FOGRA/GRACoL) compliance guarantees proof-to-press match and repeat-order consistency.', check: 'Standard declaration, Delta E target, PANTONE reference and paper type (C/U).' },
      { name: '4. Drying and finishing', why: 'Lamination, varnishing, die-cutting and gluing are limited by setting time and varnish compatibility.', check: 'Set-off resistance, drying time, varnish/lamination compatibility, rub test.' },
      { name: '5. Regulation and safety', why: 'Food packaging, toys and cosmetics require low migration and documentation.', check: 'SDS, low-migration statement (Swiss Ordinance / Nestlé guidance), EuPIA compliance.' },
      { name: '6. Supply continuity', why: 'A stock-out on a critical item stops production; lot changes can shift colour.', check: 'Stock policy, lead time, lot tracking, recipe archive.' },
      { name: '7. Technical support and documents', why: 'Problems are solved at the press; deciding without TDS/SDS and samples is risky.', check: 'On-site support, sample policy, TDS/SDS access, measurement (spectrophotometer, pH, conductivity).' },
    ],
  },
  paper: {
    title: 'Ink compatibility by paper and substrate',
    intro:
      'The same ink behaves differently on different surfaces: it dries by penetration on absorbent paper and by oxidation or UV curing on coated and plastic surfaces. The table summarises the recommended ink group and watch-points per substrate.',
    headers: ['Substrate', 'Recommended ink', 'Note'],
    rows: [
      { surface: 'Gloss-coated paper', ink: 'Conventional CMYK, PANTONE, metallic', note: 'Brightest surface for metallic and fluorescent; powder or varnish against set-off.' },
      { surface: 'Matte-coated paper', ink: 'Conventional CMYK, PANTONE', note: 'Rub-mark risk; protective matte varnish recommended. Metallic brilliance drops.' },
      { surface: 'Uncoated (offset) paper', ink: 'Fast-setting CMYK, Uncoated PANTONE', note: 'High absorbency lowers density; use Uncoated references.' },
      { surface: 'Kraft and recycled', ink: 'High-pigment CMYK, opaque white underprint', note: 'Paper shade shifts colour; proofing is mandatory.' },
      { surface: 'Folding carton board', ink: 'Conventional or UV CMYK + dispersion varnish', note: 'Flexible varnish against cracking on folds; low migration for food contact.' },
      { surface: 'Metallised board, PP, PET, PVC', ink: 'UV / LED-UV ink', note: 'Conventional ink will not dry; adhesion test and EPDM blanket.' },
      { surface: 'Labels (coated label stock, PE/PP film)', ink: 'UV or low-migration conventional', note: 'UV varnish or lamination for rub and water resistance.' },
    ],
  },
  price: {
    title: '6 factors behind printing material prices',
    intro:
      'Printing material prices are not a single list figure; within one product group, raw material, brand, packaging and technical requirements create a wide range. Knowing why a quotation changes makes comparison between suppliers fair.',
    factors: [
      { name: 'Pigment and raw material', text: 'Bronze/aluminium pigments in metallics, special pigments in fluorescents and photoinitiators in UV inks multiply cost against CMYK. Higher pigment loading raises the price per kilogram but lowers consumption.' },
      { name: 'Brand and origin', text: 'Distributed products from Japan, Germany and the Netherlands and SIM-made EVA COLOR and VECTOR sit at different price–performance points; both come with the same documentation.' },
      { name: 'Packaging and quantity', text: '1 kg and 2.5 kg cans, 20 kg drums and IBCs lower the unit price. Wholesale and recurring orders qualify for annual contract pricing.' },
      { name: 'Custom colour formulation', text: `Laboratory time, sampling and recipe development; minimum ${F.customColorMinimumKg} kg. Repeat orders are faster and cheaper because the recipe is archived.` },
      { name: 'Technical requirements', text: 'Low migration, LED-UV, fast setting or high rub resistance add formulation work and documentation.' },
      { name: 'Delivery and logistics', text: 'Same-day delivery in Istanbul is included for stock; domestic freight and export Incoterms (EXW, FOB, CIF) define the final quotation.' },
    ],
    ctaText: 'Send us your press, substrate and job details; we reply with a product recommendation and a quotation within one working day.',
    ctaButton: 'Request a quotation',
  },
  supply: {
    title: 'Supply process and delivery',
    intro:
      `Orders are handled from the central warehouse and laboratory in ${CITY}, Istanbul. Stock items are prepared the same day; custom colours enter the laboratory schedule. The process has six steps:`,
    steps: [
      { name: 'Needs analysis', text: 'Press, substrate, job type and target colour standard are recorded; compatibility with current materials is checked.' },
      { name: 'Samples and documents', text: 'For new products we share samples, TDS and SDS; a press trial is arranged where needed.' },
      { name: 'Quotation and approval', text: 'Quotation by packaging, quantity and delivery term; credit terms for established customers.' },
      { name: 'Preparation', text: `Dispatch from stock or custom colour production in the ${F.labAvailability} laboratory (${F.customColorLeadTimeDays} working days after sample approval).` },
      { name: 'Delivery', text: `Same day in Istanbul for stock orders placed by ${F.sameDayCutoff}; ${F.domesticLeadTimeDays} working days across Turkey; export by road, sea or air with customs documentation.` },
      { name: 'On-site support and follow-up', text: 'Press-side setting support on first use, then stock monitoring and periodic technical visits.' },
    ],
    outro:
      `Export: we ship regularly to ${F.exportRegions.en}; English TDS/SDS, certificates of origin and analysis are prepared with the quotation, and MOQ-free stock items can be consolidated into one shipment.`,
  },
  brands: {
    title: 'Our brands: manufacturer and distributor',
    intro:
      'SIM works with two own brands and four international distributorships. The matrix shows which product group is covered by which brand; official Turkish distributorship documents are available on request.',
    headers: ['Brand', 'Country', 'Role', 'Product group'],
    roles: { own: 'Own brand (manufacturer)', distributor: 'Distributor for Turkey' },
  },
  brandRows: {
    'EVA COLOR': { role: 'Own brand (manufacturer)', products: 'Metallic, fluorescent and custom colour offset inks' },
    VECTOR: { role: 'Own brand (manufacturer)', products: 'Offset printing blankets' },
    'SAKATA INX': { role: `Distributor for Turkey (since ${SAKATA_SINCE})`, products: 'CMYK and PANTONE sheetfed offset inks' },
    'Zeller+Gmelin': { role: 'Distributor for Turkey', products: 'UV and LED-UV offset inks' },
    'Hi-Tech Coatings': { role: 'Distributor for Turkey', products: 'Water-based dispersion varnishes and coatings' },
    SCHLENK: { role: 'Distributor for Turkey', products: 'Metallic pigments and metallic inks' },
  },
  why: {
    title: `Why SIM since ${F.foundingYear}?`,
    intro:
      `SIM Printing Supplies was founded in Istanbul in ${F.foundingYear} and has served the same industry from the same address for ${YEARS} years. The facts below are not a slogan but commitments you can verify during the order process.`,
    facts: [
      { label: 'Founded', value: `${F.foundingYear} — ${YEARS} years of uninterrupted supply` },
      { label: 'Manufacturing', value: 'EVA COLOR inks and VECTOR blankets: two own brands made in Istanbul' },
      { label: 'Distributorships', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, Hi-Tech Coatings, SCHLENK` },
      { label: 'Laboratory', value: `${F.labAvailability} custom colour laboratory, ${CAP.en} kg monthly capacity` },
      { label: 'Colour assurance', value: `Spectrophotometric measurement, Delta E below ${F.deltaEMax}, ISO 2846-1 inks` },
      { label: 'Logistics', value: `Central warehouse in ${CITY}; same day in Istanbul, ${F.domesticLeadTimeDays} working days in Turkey, export worldwide` },
      { label: 'Languages and markets', value: `Turkish, English, Russian and Arabic service; exports to ${F.exportRegions.en}` },
    ],
    timeline: [
      { year: String(F.foundingYear), text: 'SIM Printing Supplies is founded in Istanbul to supply paper, board and printing materials.' },
      { year: '1998', text: 'Focus moves to offset inks, overprint varnishes, blankets and pressroom chemicals.' },
      { year: SAKATA_SINCE, text: 'Turkish distributorship for SAKATA INX (Japan); CMYK and PANTONE series enter stock.' },
      { year: 'Later', text: 'EVA COLOR metallic and fluorescent ink production, the VECTOR blanket brand; Zeller+Gmelin, Hi-Tech Coatings and SCHLENK distributorships.' },
      { year: 'Today', text: `${F.labAvailability} custom colour laboratory, service in four languages, nationwide distribution and export.` },
    ],
  },
  faq: {
    title: 'Printing materials: frequently asked questions',
    items: [
      { q: 'What are printing materials?', a: 'Printing materials are the consumables used in print production apart from paper: offset (CMYK), PANTONE and custom colour, metallic, fluorescent and UV inks; printing blankets; fountain, wash and plate chemicals; dispersion varnishes and coatings. Selected as a matched system, these eight groups improve colour consistency and reduce waste.' },
      { q: 'Which basic materials does an offset press need?', a: 'At minimum: an ISO 2846-1 CMYK ink set, PANTONE or custom inks for brand colours, blankets and packing cut to the press, a fountain solution additive, blanket and roller wash, plate cleaner, anti set-off powder and, depending on the job, a dispersion varnish. SIM supplies the complete set from stock in Istanbul.' },
      { q: 'How are printing material prices determined?', a: 'Six factors: pigment and raw material (metallic, fluorescent and UV cost more), brand and origin, packaging and quantity (drums and wholesale lower the unit price), custom colour formulation, technical requirements such as low migration, and delivery terms (Istanbul, domestic freight, export Incoterms). With press, substrate and job details we quote within one working day.' },
      { q: 'Is there a minimum order quantity?', a: `There is no MOQ on stock items: a single can of ink or a single blanket can be ordered. Custom colours produced in the laboratory have a ${F.customColorMinimumKg} kg minimum, which balances formulation cost and lot consistency. Wholesale and recurring orders qualify for annual contract pricing, and export orders can combine several items in one shipment.` },
      { q: 'Do you export, and to which countries?', a: `Yes. We ship regularly to ${F.exportRegions.en} and to other markets on request, by road (TIR), sea and air freight. Quotations are given on EXW, FOB or CIF terms; we prepare English TDS/SDS, certificates of origin and analysis, and customs documentation. Within Turkey, stock orders placed by ${F.sameDayCutoff} are delivered the same day in Istanbul and within ${F.domesticLeadTimeDays} working days elsewhere.` },
      { q: 'Which brands do you distribute in Turkey?', a: `We are the official Turkish distributor of SAKATA INX (Japan, since ${SAKATA_SINCE}; CMYK and PANTONE inks), Zeller+Gmelin (Germany; UV inks), Hi-Tech Coatings (Netherlands; dispersion varnishes) and SCHLENK (Germany; metallic pigments). EVA COLOR metallic, fluorescent and custom colour inks and VECTOR blankets are our own brands, manufactured in Istanbul.` },
      { q: 'Can you match a PANTONE or brand colour, and how long does it take?', a: `Yes. A PANTONE code, a printed sample or an L*a*b* reading is enough; our laboratory formulates the colour with a spectrophotometer to a Delta E below ${F.deltaEMax}. Delivery is ${F.customColorLeadTimeDays} working days after sample approval, and repeat orders are faster because the recipe is archived. The laboratory runs ${F.labAvailability} with a monthly capacity of ${CAP.en} kg.` },
      { q: 'How should inks and chemicals be stored, and what is their shelf life?', a: 'Shelf life and storage conditions are stated on each TDS; the general rule is sealed original packaging, away from direct sunlight, in a cool and dry place. For opened ink cans an anti-skinning spray or a foil under the lid prevents skin formation. For chemicals, the incompatibility and ventilation rules in the SDS apply; transport classification is provided for sea and air freight.' },
      { q: 'Can I get TDS, SDS documents and samples before ordering?', a: 'Yes. Current technical data sheets (TDS) and safety data sheets (SDS) are available in English and Turkish on request for every product. Customers who want to test a new product or verify colour accuracy before a custom production receive evaluation samples, and our technical team can accompany a press trial where needed.' },
      { q: `What makes SIM different since ${F.foundingYear}?`, a: `${YEARS} years in the same industry from the same address: two own brands (EVA COLOR, VECTOR), four international distributorships, a ${F.labAvailability} custom colour laboratory and technical support at the press. We recommend materials as a matched system rather than item by item, and complete every delivery with documentation, samples and field support, in Turkey and for export customers.` },
    ],
  },
  related: {
    title: 'Related resources',
    postsTitle: 'In-depth articles',
    linksTitle: 'Pages',
  },
  cta: {
    title: 'Request a quotation for printing materials',
    text: 'Tell us your press, substrate and job; we reply with the right product group and a quotation within one working day, in English.',
    button: 'Quotation form',
    whatsapp: 'Message on WhatsApp',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — RU (destek dili; tüm bölümler, yoğunlaştırılmış)      */
/* ------------------------------------------------------------------ */
const RU: PillarContent = {
  meta: {
    title: 'Полиграфические материалы — поставщик из Турции с 1983 г.',
    description:
      `Поставщик полиграфических материалов из Стамбула с 1983 г.: офсетные и PANTONE краски, металлик, УФ, полотна, химия, лаки. Экспорт, без MOQ.`,
    keywords: ['полиграфические материалы', 'офсетные краски Турция', 'поставщик полиграфических материалов', 'краски PANTONE', 'металлические краски', 'УФ-краски', 'офсетные полотна', 'печатная химия', 'дисперсионный лак'],
  },
  pageName: 'Полиграфические материалы',
  hero: {
    eyebrow: `${YEARS} лет поставок для полиграфии Турции`,
    h1: `Полиграфические материалы: поставщик из Турции с 1983 года`,
    lead:
      `Все расходные материалы типографии под одной крышей: офсетные и PANTONE краски, металлик, флуоресцентные и УФ-серии, офсетные полотна, печатная химия и дисперсионные лаки. Мы производим краски EVA COLOR и полотна VECTOR в Стамбуле и являемся дистрибьютором SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK в Турции; отгрузка со склада в районе ${ORGANIZATION.address.addressLocality} по всей Турции и на экспорт.`,
  },
  shortAnswer: {
    title: 'Коротко',
    text:
      `Полиграфические материалы — это расходные материалы печатного производства, кроме бумаги: офсетные, PANTONE, металлик, флуоресцентные и УФ-краски; офсетные полотна; увлажняющая и смывочная химия; дисперсионные лаки. SIM поставляет эти восемь групп из Стамбула с 1983 года: складские позиции — в тот же день по Стамбулу, ${F.domesticLeadTimeDays} рабочих дня по Турции, экспорт автотранспортом, морем и авиа.`,
  },
  keyFacts: {
    title: 'Основные данные',
    rows: [
      { label: 'Группы продукции', value: 'Офсет (CMYK), PANTONE/на заказ, металлик, флуоресцентные, УФ-краски; полотна; печатная химия; дисперсионный лак' },
      { label: 'Бренды', value: 'EVA COLOR и VECTOR (производитель) · SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK (дистрибьютор в Турции)' },
      { label: 'Применение', value: 'Листовой и рулонный офсет, УФ-офсет, картонная упаковка, этикетки, коммерческая печать' },
      { label: 'Сроки', value: `В тот же день по Стамбулу (заказ до ${F.sameDayCutoff}) · ${F.domesticLeadTimeDays} рабочих дня по Турции · экспорт авто/море/авиа` },
      { label: 'MOQ', value: `Нет для складских позиций · ${F.customColorMinimumKg} кг для цветов на заказ` },
      { label: 'Документы', value: 'TDS и SDS на английском по запросу; краски по ISO 2846-1; низкомиграционные варианты для пищевой упаковки' },
      { label: 'Лаборатория', value: `Лаборатория ${F.labAvailability}, ${CAP.ru} кг в месяц, Delta E ниже ${String(F.deltaEMax).replace('.', ',')}` },
    ],
  },
  what: {
    title: 'Что такое полиграфические материалы?',
    paragraphs: [
      'Полиграфические материалы — это всё, что печатный заказ расходует помимо бумаги: краски, переносящие цвет с формы на лист, полотна, передающие краску, химия, поддерживающая баланс «краска–вода» и чистоту машины, и лаки, защищающие оттиск. Машина и бумага выбираются один раз; материалы расходуются каждую смену, поэтому именно они определяют качество печати, брак и себестоимость.',
      'Эти материалы взаимозависимы: липкость краски связана с поверхностью полотна, сиккативы — с pH увлажнения, выбор лака — со скоростью закрепления краски. Поэтому материалы следует подбирать как согласованную систему и покупать у одного поставщика с технической поддержкой.',
      `Это руководство объединяет восемь групп продукции, критерии выбора, совместимость с бумагой, факторы цены и процесс поставки. SIM поставляет эти материалы ${YEARS} лет и экспортирует тот же ассортимент с документацией на английском языке.`,
    ],
    listTitle: 'Восемь групп продукции',
  },
  categories: {
    title: 'Полиграфические материалы: 8 групп',
    intro: 'Для каждой группы — что это, когда применяется и какие бренды есть у SIM. На страницах продуктов — характеристики, применение и вопросы-ответы.',
    viewLabel: 'Смотреть продукт',
    whenLabel: 'Когда применять',
    brandsLabel: 'Бренды у SIM',
  },
  criteria: {
    title: 'Правильный выбор материала: 7 критериев',
    intro: 'Решение о покупке начинается с условий печати, а не с прайс-листа. Семь критериев ниже — что уточнить перед запросом и какие документы требовать от поставщика.',
    headers: ['Критерий', 'Почему важно', 'Что проверить'],
    rows: [
      { name: '1. Способ печати и машина', why: 'Листовой, рулонный, УФ/LED-UV и гибридные системы требуют разных красок, полотен и химии.', check: 'Модель машины, число секций, тип сушки, материал валов и полотен.' },
      { name: '2. Бумага и материал', why: 'Мелованная, офсетная, картон, металлизированные и пластиковые поверхности меняют механизм сушки и адгезию.', check: 'Плотность, покрытие, впитываемость; серия, рекомендованная в TDS.' },
      { name: '3. Цветовой стандарт', why: 'Соответствие ISO 2846-1 и ISO 12647-2 гарантирует совпадение с пробой и повторяемость заказов.', check: 'Декларация стандарта, целевой Delta E, референс PANTONE и тип бумаги (C/U).' },
      { name: '4. Сушка и отделка', why: 'Ламинация, лакирование, вырубка и склейка ограничены временем закрепления и совместимостью лака.', check: 'Стойкость к отмарыванию, время сушки, совместимость с лаком, тест на истирание.' },
      { name: '5. Регулирование и безопасность', why: 'Пищевая упаковка, игрушки и косметика требуют низкой миграции и документов.', check: 'SDS, заявление о низкой миграции (Swiss Ordinance / Nestlé), соответствие EuPIA.' },
      { name: '6. Непрерывность поставок', why: 'Отсутствие критической позиции останавливает производство; смена партии может сдвинуть цвет.', check: 'Складская политика, срок поставки, прослеживаемость партий, архив рецептур.' },
      { name: '7. Техподдержка и документы', why: 'Проблемы решаются у машины; решение без TDS/SDS и образцов рискованно.', check: 'Выезд специалиста, образцы, доступ к TDS/SDS, измерения (спектрофотометр, pH).' },
    ],
  },
  paper: {
    title: 'Совместимость краски с бумагой и материалом',
    intro: 'Одна и та же краска ведёт себя по-разному: на впитывающей бумаге сохнет впитыванием, на мелованных и пластиковых поверхностях — окислением или УФ-отверждением.',
    headers: ['Материал', 'Рекомендуемая краска', 'Примечание'],
    rows: [
      { surface: 'Глянцевая мелованная бумага', ink: 'Обычные CMYK, PANTONE, металлик', note: 'Самая яркая поверхность для металлика и флуоресцентных красок.' },
      { surface: 'Матовая мелованная бумага', ink: 'Обычные CMYK, PANTONE', note: 'Риск следов истирания; рекомендуется защитный матовый лак.' },
      { surface: 'Офсетная бумага', ink: 'Быстрозакрепляющиеся CMYK, PANTONE Uncoated', note: 'Высокая впитываемость снижает плотность.' },
      { surface: 'Крафт и вторичная бумага', ink: 'Высокопигментные CMYK, кроющие белила', note: 'Оттенок бумаги смещает цвет; цветопроба обязательна.' },
      { surface: 'Картон для упаковки', ink: 'Обычные или УФ CMYK + дисперсионный лак', note: 'Эластичный лак против растрескивания на сгибах; низкая миграция для пищевого контакта.' },
      { surface: 'Металлизированный картон, PP, PET, PVC', ink: 'УФ / LED-UV краски', note: 'Обычная краска не сохнет; тест адгезии и полотно EPDM.' },
    ],
  },
  price: {
    title: '6 факторов цены полиграфических материалов',
    intro: 'Цена — не одна цифра в прайс-листе: внутри одной группы сырьё, бренд, упаковка и технические требования создают широкий диапазон.',
    factors: [
      { name: 'Пигмент и сырьё', text: 'Бронзовые и алюминиевые пигменты, флуоресцентные пигменты и фотоинициаторы УФ-красок дороже триадных.' },
      { name: 'Бренд и происхождение', text: 'Дистрибьюторские продукты из Японии, Германии и Нидерландов и собственные EVA COLOR и VECTOR — разные точки цена–качество.' },
      { name: 'Упаковка и объём', text: 'Банки 1 и 2,5 кг, канистры 20 кг и IBC снижают цену за единицу; для регулярных заказов — годовые контракты.' },
      { name: 'Цвет на заказ', text: `Лабораторное время и разработка рецептуры; минимум ${F.customColorMinimumKg} кг. Повторные заказы быстрее и дешевле.` },
      { name: 'Технические требования', text: 'Низкая миграция, LED-UV, быстрое закрепление и высокая стойкость к истиранию добавляют работы и документации.' },
      { name: 'Доставка и логистика', text: 'Доставка по Стамбулу включена для склада; внутренние перевозки и экспортные Incoterms (EXW, FOB, CIF) определяют итоговую цену.' },
    ],
    ctaText: 'Сообщите машину, материал и задачу — мы ответим рекомендацией и ценой в течение одного рабочего дня.',
    ctaButton: 'Запросить цену',
  },
  supply: {
    title: 'Процесс поставки и доставка',
    intro: `Заказы обрабатываются из центрального склада и лаборатории в Стамбуле (${ORGANIZATION.address.addressLocality}). Процесс состоит из шести шагов:`,
    steps: [
      { name: 'Анализ потребности', text: 'Машина, материал, тип заказа и целевой цветовой стандарт; проверка совместимости с текущими материалами.' },
      { name: 'Образцы и документы', text: 'Для новых продуктов — образцы, TDS и SDS; при необходимости пробная печать.' },
      { name: 'Предложение и подтверждение', text: 'Цена по упаковке, объёму и условиям поставки.' },
      { name: 'Подготовка', text: `Отгрузка со склада или производство цвета в лаборатории ${F.labAvailability} (${F.customColorLeadTimeDays} рабочих дня после утверждения образца).` },
      { name: 'Доставка', text: `В тот же день по Стамбулу, ${F.domesticLeadTimeDays} рабочих дня по Турции; экспорт авто, морем или авиа с таможенными документами.` },
      { name: 'Поддержка', text: 'Настройка при первом использовании, контроль запасов, периодические технические визиты.' },
    ],
    outro: 'Экспорт: регулярные отгрузки на Ближний Восток, в Центральную Азию и на Балканы; TDS/SDS на английском, сертификаты происхождения и анализа готовятся вместе с предложением.',
  },
  brands: {
    title: 'Наши бренды: производитель и дистрибьютор',
    intro: 'Два собственных бренда и четыре международных дистрибуции. Официальные дистрибьюторские документы — по запросу.',
    headers: ['Бренд', 'Страна', 'Роль', 'Группа продукции'],
    roles: { own: 'Собственный бренд (производитель)', distributor: 'Дистрибьютор в Турции' },
  },
  brandRows: {
    'EVA COLOR': { role: 'Собственный бренд (производитель)', products: 'Металлик, флуоресцентные и заказные офсетные краски' },
    VECTOR: { role: 'Собственный бренд (производитель)', products: 'Офсетные полотна' },
    'SAKATA INX': { role: `Дистрибьютор в Турции (с ${SAKATA_SINCE} г.)`, products: 'Листовые офсетные краски CMYK и PANTONE' },
    'Zeller+Gmelin': { role: 'Дистрибьютор в Турции', products: 'УФ и LED-UV офсетные краски' },
    'Hi-Tech Coatings': { role: 'Дистрибьютор в Турции', products: 'Водные дисперсионные лаки и покрытия' },
    SCHLENK: { role: 'Дистрибьютор в Турции', products: 'Металлические пигменты и краски' },
  },
  why: {
    title: `Почему SIM с ${F.foundingYear} года?`,
    intro: `SIM основана в Стамбуле в ${F.foundingYear} году и ${YEARS} лет работает в той же отрасли по тому же адресу. Факты ниже можно проверить в процессе заказа.`,
    facts: [
      { label: 'Основание', value: `${F.foundingYear} — ${YEARS} лет непрерывных поставок` },
      { label: 'Производство', value: 'Краски EVA COLOR и полотна VECTOR — два собственных бренда' },
      { label: 'Дистрибуция', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, Hi-Tech Coatings, SCHLENK` },
      { label: 'Лаборатория', value: `Лаборатория ${F.labAvailability}, ${CAP.ru} кг в месяц` },
      { label: 'Гарантия цвета', value: `Спектрофотометрия, Delta E ниже ${String(F.deltaEMax).replace('.', ',')}, краски ISO 2846-1` },
      { label: 'Языки и рынки', value: 'Турецкий, английский, русский, арабский; экспорт на Ближний Восток, в Центральную Азию и на Балканы' },
    ],
    timeline: [
      { year: String(F.foundingYear), text: 'Основание SIM в Стамбуле для поставок бумаги, картона и полиграфических материалов.' },
      { year: '1998', text: 'Фокус смещается на офсетные краски, лаки, полотна и печатную химию.' },
      { year: SAKATA_SINCE, text: 'Дистрибуция SAKATA INX (Япония) в Турции; серии CMYK и PANTONE на складе.' },
      { year: 'Сегодня', text: `Производство EVA COLOR и VECTOR, лаборатория ${F.labAvailability}, обслуживание на четырёх языках, экспорт.` },
    ],
  },
  faq: {
    title: 'Вопросы и ответы о полиграфических материалах',
    items: [
      { q: 'Что такое полиграфические материалы?', a: 'Это расходные материалы печатного производства, кроме бумаги: офсетные (CMYK), PANTONE и заказные, металлик, флуоресцентные и УФ-краски; офсетные полотна; увлажняющая, смывочная и формная химия; дисперсионные лаки. Подобранные как система, они повышают стабильность цвета и снижают брак.' },
      { q: 'Есть ли минимальный заказ?', a: `Для складских позиций — нет: можно заказать одну банку краски или одно полотно. Для цветов на заказ минимум ${F.customColorMinimumKg} кг. Для регулярных заказов действуют годовые контрактные цены, экспортные заказы объединяются в одну отгрузку.` },
      { q: 'Экспортируете ли вы и в какие страны?', a: 'Да. Регулярные отгрузки на Ближний Восток, в Центральную Азию и на Балканы, а также в другие страны по запросу — автотранспортом, морем и авиа. Предложения на условиях EXW, FOB или CIF; готовим TDS/SDS на английском, сертификаты происхождения и таможенные документы.' },
      { q: 'Дистрибьютором каких брендов вы являетесь?', a: `SAKATA INX (Япония, с ${SAKATA_SINCE} г.), Zeller+Gmelin (Германия, УФ-краски), Hi-Tech Coatings (Нидерланды, дисперсионные лаки) и SCHLENK (Германия, металлические пигменты). EVA COLOR и VECTOR — собственные бренды, производство в Стамбуле.` },
      { q: 'Можете ли вы подобрать цвет PANTONE или фирменный цвет?', a: `Да. Достаточно кода PANTONE, оттиска или значения L*a*b*; лаборатория формулирует цвет с целевым Delta E ниже ${String(F.deltaEMax).replace('.', ',')}. Отгрузка через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца; рецептуры сохраняются для повторных заказов.` },
      { q: 'Можно ли получить TDS, SDS и образцы до заказа?', a: 'Да. Актуальные технические паспорта (TDS) и паспорта безопасности (SDS) предоставляются на английском и турецком языках по запросу. Для тестирования нового продукта или проверки цвета перед заказом отправляем оценочные образцы.' },
      { q: `Чем SIM отличается с ${F.foundingYear} года?`, a: `${YEARS} лет в одной отрасли по одному адресу: два собственных бренда, четыре международных дистрибуции, лаборатория ${F.labAvailability} и техническая поддержка у машины. Мы рекомендуем материалы как согласованную систему и сопровождаем каждую поставку документами и образцами.` },
    ],
  },
  related: { title: 'Связанные материалы', postsTitle: 'Статьи', linksTitle: 'Страницы' },
  cta: {
    title: 'Запросить цену на полиграфические материалы',
    text: 'Сообщите машину, материал и задачу — ответим рекомендацией и ценой в течение одного рабочего дня, на русском или английском.',
    button: 'Форма запроса',
    whatsapp: 'Написать в WhatsApp',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Sayfa içeriği — AR (destek dili; tüm bölümler, yoğunlaştırılmış)      */
/* ------------------------------------------------------------------ */
const AR: PillarContent = {
  meta: {
    title: 'مواد الطباعة — مورّد من تركيا منذ 1983',
    description:
      `مورّد مواد الطباعة من إسطنبول منذ 1983: أحبار أوفست وPANTONE، أحبار معدنية وUV، بطانيات، كيماويات وورنيش. تصدير بدون حد أدنى للطلب.`,
    keywords: ['مواد الطباعة', 'مستلزمات الطباعة تركيا', 'مورد مواد الطباعة', 'أحبار الأوفست', 'أحبار بانتون', 'أحبار معدنية', 'أحبار UV', 'بطانيات الطباعة', 'كيماويات الطباعة', 'ورنيش التشتت'],
  },
  pageName: 'مواد الطباعة',
  hero: {
    eyebrow: `${YEARS} عاماً من التوريد لقطاع الطباعة في تركيا`,
    h1: `مواد الطباعة: مورّد تركيا منذ 1983`,
    lead:
      `كل ما تحتاجه المطبعة تحت سقف واحد: أحبار الأوفست وPANTONE، السلاسل المعدنية والفلورية وUV، بطانيات الطباعة، كيماويات غرفة الطباعة وورنيشات التشتت. نصنّع أحبار EVA COLOR وبطانيات VECTOR في إسطنبول ونوزّع SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK في تركيا، ونشحن من مستودعنا في ${ORGANIZATION.address.addressLocality} إلى جميع أنحاء تركيا وأسواق التصدير.`,
  },
  shortAnswer: {
    title: 'الإجابة المختصرة',
    text:
      `مواد الطباعة هي المستهلكات المستخدمة في الإنتاج الطباعي عدا الورق: أحبار الأوفست وPANTONE والمعدنية والفلورية وUV؛ بطانيات الطباعة؛ كيماويات الترطيب والغسيل؛ ورنيشات التشتت. توفر SIM هذه المجموعات الثماني من إسطنبول منذ 1983: المخزون يُسلَّم في اليوم نفسه داخل إسطنبول، وخلال ${F.domesticLeadTimeDays} أيام عمل في تركيا، وبراً وبحراً وجواً لعملاء التصدير.`,
  },
  keyFacts: {
    title: 'معلومات أساسية',
    rows: [
      { label: 'مجموعات المنتجات', value: 'أوفست (CMYK)، PANTONE/خاصة، معدنية، فلورية، أحبار UV؛ بطانيات؛ كيماويات الطباعة؛ ورنيش التشتت' },
      { label: 'العلامات', value: 'EVA COLOR وVECTOR (مصنّع) · SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK (موزّع في تركيا)' },
      { label: 'التطبيقات', value: 'الأوفست الورقي واللفائفي، أوفست UV، علب الكرتون، الملصقات، الطباعة التجارية' },
      { label: 'مدة التسليم', value: `اليوم نفسه في إسطنبول للمخزون (الطلب قبل ${F.sameDayCutoff}) · ${F.domesticLeadTimeDays} أيام عمل في تركيا · تصدير براً وبحراً وجواً` },
      { label: 'الحد الأدنى للطلب', value: `لا يوجد للمخزون · ${F.customColorMinimumKg} كجم للألوان الخاصة` },
      { label: 'الوثائق', value: 'TDS وSDS بالإنجليزية عند الطلب؛ أحبار مطابقة لـ ISO 2846-1؛ خيارات منخفضة الهجرة لتغليف الأغذية' },
      { label: 'المختبر', value: `مختبر ألوان ${F.labAvailability}، طاقة ${CAP.ar} كجم شهرياً، Delta E أقل من ${F.deltaEMax}` },
    ],
  },
  what: {
    title: 'ما هي مواد الطباعة؟',
    paragraphs: [
      'مواد الطباعة هي كل ما يستهلكه العمل الطباعي عدا الورق: الأحبار التي تحمل اللون من اللوح إلى الورقة، والبطانيات التي تنقله، والكيماويات التي تحفظ توازن الحبر والماء ونظافة الماكينة، والورنيشات التي تحمي المطبوع. تُختار الماكينة والورق مرة واحدة، أما المواد فتُستهلك في كل وردية، لذا فهي المحدد الحقيقي لجودة الطباعة والهدر والتكلفة.',
      'هذه المواد مترابطة: لزوجة الحبر تتفاعل مع سطح البطانية، والمجففات مع حموضة محلول الترطيب، واختيار الورنيش مع سرعة جفاف الحبر. لذلك يجب اختيار المواد كمنظومة متوافقة وشراؤها من مورّد واحد يقدم الدعم الفني.',
      `يجمع هذا الدليل المجموعات الثماني ومعايير الاختيار وتوافق الورق مع الحبر وعوامل السعر وعملية التوريد في صفحة واحدة. تزوّد SIM هذه المواد منذ ${YEARS} عاماً وتصدّر التشكيلة نفسها مع وثائق بالإنجليزية.`,
    ],
    listTitle: 'مجموعات المنتجات الثماني',
  },
  categories: {
    title: 'مواد الطباعة: 8 مجموعات',
    intro: 'لكل مجموعة نلخّص ماهيتها ومتى تُستخدم وأي العلامات تتوفر لدى SIM. تحمل صفحات المنتجات المواصفات والتطبيقات والأسئلة الشائعة.',
    viewLabel: 'عرض المنتج',
    whenLabel: 'متى تُستخدم',
    brandsLabel: 'العلامات لدى SIM',
  },
  criteria: {
    title: 'اختيار المادة الصحيحة: 7 معايير',
    intro: 'يبدأ قرار الشراء من ظروف الطباعة لا من قائمة الأسعار. المعايير السبعة أدناه تحدد ما يجب توضيحه قبل طلب عرض السعر والوثائق المطلوبة من المورّد.',
    headers: ['المعيار', 'لماذا يهم', 'ما يجب التحقق منه'],
    rows: [
      { name: '1. تقنية الطباعة والماكينة', why: 'تتطلب أنظمة الأوفست الورقي واللفائفي وUV/LED-UV والهجينة أحباراً وبطانيات وكيماويات مختلفة.', check: 'طراز الماكينة، عدد الوحدات، نوع التجفيف، مادة الأسطوانات والبطانيات.' },
      { name: '2. الورق والسطح', why: 'يتغير آلية الجفاف والالتصاق بين الورق المصقول وغير المصقول والكرتون والأسطح المعدنية والبلاستيكية.', check: 'الوزن، الطلاء، الامتصاصية؛ السلسلة الموصى بها في TDS.' },
      { name: '3. معيار اللون', why: 'يضمن التوافق مع ISO 2846-1 وISO 12647-2 مطابقة البروفة للطباعة وثبات الطلبات المتكررة.', check: 'إقرار المعيار، هدف Delta E، مرجع PANTONE ونوع الورق (C/U).' },
      { name: '4. الجفاف والتشطيب', why: 'يتقيد التغليف والتلميع والقص واللصق بزمن الجفاف وتوافق الورنيش.', check: 'مقاومة الطبع، زمن الجفاف، توافق الورنيش، اختبار الاحتكاك.' },
      { name: '5. اللوائح والسلامة', why: 'يتطلب تغليف الأغذية والألعاب ومستحضرات التجميل هجرة منخفضة ووثائق.', check: 'SDS، إقرار الهجرة المنخفضة (Swiss Ordinance / Nestlé)، توافق EuPIA.' },
      { name: '6. استمرارية التوريد', why: 'يوقف نفاد مادة حرجة الإنتاج، وقد يغيّر تبدّل الدفعة اللون.', check: 'سياسة المخزون، مدة التسليم، تتبع الدفعات، أرشيف الوصفات.' },
      { name: '7. الدعم الفني والوثائق', why: 'تُحل المشكلات عند الماكينة؛ القرار دون TDS/SDS وعينات محفوف بالمخاطر.', check: 'الدعم الميداني، العينات، الوصول إلى TDS/SDS، القياس (المطياف، pH).' },
    ],
  },
  paper: {
    title: 'توافق الحبر حسب الورق والسطح',
    intro: 'يتصرف الحبر نفسه بشكل مختلف على الأسطح المختلفة: يجف بالامتصاص على الورق الماص وبالأكسدة أو بالأشعة فوق البنفسجية على الأسطح المصقولة والبلاستيكية.',
    headers: ['السطح', 'الحبر الموصى به', 'ملاحظة'],
    rows: [
      { surface: 'ورق مصقول لامع', ink: 'CMYK تقليدي، PANTONE، معدني', note: 'أكثر الأسطح سطوعاً للأحبار المعدنية والفلورية.' },
      { surface: 'ورق مصقول مطفي', ink: 'CMYK تقليدي، PANTONE', note: 'خطر آثار الاحتكاك؛ يُنصح بورنيش مطفي واقٍ.' },
      { surface: 'ورق أوفست غير مصقول', ink: 'CMYK سريع الجفاف، PANTONE Uncoated', note: 'الامتصاص العالي يخفض الكثافة.' },
      { surface: 'كرافت وورق معاد التدوير', ink: 'CMYK عالي الصبغة، أبيض معتم تحتي', note: 'لون الورق يحرف الدرجة؛ البروفة إلزامية.' },
      { surface: 'كرتون العلب', ink: 'CMYK تقليدي أو UV + ورنيش تشتت', note: 'ورنيش مرن ضد التشقق عند الطي؛ هجرة منخفضة لملامسة الأغذية.' },
      { surface: 'كرتون معدني، PP، PET، PVC', ink: 'حبر UV / LED-UV', note: 'الحبر التقليدي لا يجف؛ اختبار التصاق وبطانية EPDM.' },
    ],
  },
  price: {
    title: '6 عوامل تحدد أسعار مواد الطباعة',
    intro: 'السعر ليس رقماً واحداً في القائمة؛ فداخل المجموعة الواحدة تصنع المادة الخام والعلامة والعبوة والمتطلبات الفنية نطاقاً واسعاً.',
    factors: [
      { name: 'الصبغة والمادة الخام', text: 'صبغات البرونز والألومنيوم في المعدنية، والصبغات الخاصة في الفلورية، والمبادرات الضوئية في UV أعلى كلفة من CMYK.' },
      { name: 'العلامة والمنشأ', text: 'المنتجات الموزعة من اليابان وألمانيا وهولندا والعلامتان الخاصتان EVA COLOR وVECTOR عند نقاط مختلفة من السعر والأداء.' },
      { name: 'العبوة والكمية', text: 'عبوات 1 و2.5 كجم وبراميل 20 كجم وحاويات IBC تخفض سعر الوحدة؛ أسعار تعاقدية سنوية للطلبات المنتظمة.' },
      { name: 'صياغة اللون الخاص', text: `وقت المختبر وتطوير الوصفة؛ حد أدنى ${F.customColorMinimumKg} كجم. الطلبات المتكررة أسرع وأقل كلفة.` },
      { name: 'المتطلبات الفنية', text: 'الهجرة المنخفضة وLED-UV والجفاف السريع ومقاومة الاحتكاك العالية تضيف عملاً ووثائق.' },
      { name: 'التسليم واللوجستيات', text: 'التوصيل في إسطنبول مشمول للمخزون؛ الشحن الداخلي وشروط التصدير (EXW وFOB وCIF) تحدد السعر النهائي.' },
    ],
    ctaText: 'أرسل لنا تفاصيل الماكينة والسطح والعمل؛ نرد بتوصية المنتج وعرض السعر خلال يوم عمل واحد.',
    ctaButton: 'اطلب عرض سعر',
  },
  supply: {
    title: 'عملية التوريد والتسليم',
    intro: `تُدار الطلبات من المستودع المركزي والمختبر في إسطنبول (${ORGANIZATION.address.addressLocality}). تتم العملية في ست خطوات:`,
    steps: [
      { name: 'تحليل الاحتياج', text: 'الماكينة والسطح ونوع العمل ومعيار اللون المستهدف؛ التحقق من التوافق مع المواد الحالية.' },
      { name: 'العينات والوثائق', text: 'للمنتجات الجديدة: عينات وTDS وSDS، وتجربة طباعة عند الحاجة.' },
      { name: 'عرض السعر والموافقة', text: 'السعر حسب العبوة والكمية وشروط التسليم.' },
      { name: 'التحضير', text: `الشحن من المخزون أو إنتاج اللون في مختبر ${F.labAvailability} (${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة).` },
      { name: 'التسليم', text: `اليوم نفسه في إسطنبول، ${F.domesticLeadTimeDays} أيام عمل في تركيا؛ تصدير براً أو بحراً أو جواً مع الوثائق الجمركية.` },
      { name: 'الدعم والمتابعة', text: 'ضبط عند الاستخدام الأول، ثم متابعة المخزون وزيارات فنية دورية.' },
    ],
    outro: 'التصدير: شحنات منتظمة إلى الشرق الأوسط وآسيا الوسطى والبلقان؛ تُعدّ TDS/SDS بالإنجليزية وشهادات المنشأ والتحليل مع عرض السعر.',
  },
  brands: {
    title: 'علاماتنا: مصنّع وموزّع',
    intro: 'علامتان خاصتان وأربع وكالات توزيع دولية. وثائق التوزيع الرسمية متاحة عند الطلب.',
    headers: ['العلامة', 'الدولة', 'الدور', 'مجموعة المنتجات'],
    roles: { own: 'علامة خاصة (مصنّع)', distributor: 'موزّع في تركيا' },
  },
  brandRows: {
    'EVA COLOR': { role: 'علامة خاصة (مصنّع)', products: 'أحبار أوفست معدنية وفلورية وألوان خاصة' },
    VECTOR: { role: 'علامة خاصة (مصنّع)', products: 'بطانيات طباعة الأوفست' },
    'SAKATA INX': { role: `موزّع في تركيا (منذ ${SAKATA_SINCE})`, products: 'أحبار أوفست ورقي CMYK وPANTONE' },
    'Zeller+Gmelin': { role: 'موزّع في تركيا', products: 'أحبار أوفست UV وLED-UV' },
    'Hi-Tech Coatings': { role: 'موزّع في تركيا', products: 'ورنيشات وطلاءات تشتت مائية' },
    SCHLENK: { role: 'موزّع في تركيا', products: 'صبغات وأحبار معدنية' },
  },
  why: {
    title: `لماذا SIM منذ ${F.foundingYear}؟`,
    intro: `تأسست SIM في إسطنبول عام ${F.foundingYear} وتخدم القطاع نفسه من العنوان نفسه منذ ${YEARS} عاماً. الحقائق أدناه يمكن التحقق منها أثناء الطلب.`,
    facts: [
      { label: 'التأسيس', value: `${F.foundingYear} — ${YEARS} عاماً من التوريد المتواصل` },
      { label: 'التصنيع', value: 'أحبار EVA COLOR وبطانيات VECTOR: علامتان خاصتان' },
      { label: 'التوزيع', value: `SAKATA INX (${SAKATA_SINCE})، Zeller+Gmelin، Hi-Tech Coatings، SCHLENK` },
      { label: 'المختبر', value: `مختبر ألوان ${F.labAvailability}، ${CAP.ar} كجم شهرياً` },
      { label: 'ضمان اللون', value: `قياس طيفي، Delta E أقل من ${F.deltaEMax}، أحبار ISO 2846-1` },
      { label: 'اللغات والأسواق', value: 'التركية والإنجليزية والروسية والعربية؛ تصدير إلى الشرق الأوسط وآسيا الوسطى والبلقان' },
    ],
    timeline: [
      { year: String(F.foundingYear), text: 'تأسيس SIM في إسطنبول لتوريد الورق والكرتون ومواد الطباعة.' },
      { year: '1998', text: 'يتحول التركيز إلى أحبار الأوفست والورنيشات والبطانيات وكيماويات الطباعة.' },
      { year: SAKATA_SINCE, text: 'وكالة توزيع SAKATA INX (اليابان) في تركيا؛ سلاسل CMYK وPANTONE في المخزون.' },
      { year: 'اليوم', text: `إنتاج EVA COLOR وVECTOR، مختبر ${F.labAvailability}، خدمة بأربع لغات، تصدير.` },
    ],
  },
  faq: {
    title: 'أسئلة شائعة عن مواد الطباعة',
    items: [
      { q: 'ما هي مواد الطباعة؟', a: 'هي المستهلكات المستخدمة في الإنتاج الطباعي عدا الورق: أحبار الأوفست (CMYK) وPANTONE والخاصة والمعدنية والفلورية وUV؛ بطانيات الطباعة؛ كيماويات الترطيب والغسيل والألواح؛ ورنيشات التشتت. عند اختيارها كمنظومة متوافقة ترفع ثبات اللون وتقلل الهدر.' },
      { q: 'هل يوجد حد أدنى للطلب؟', a: `لا يوجد للمخزون: يمكن طلب عبوة حبر واحدة أو بطانية واحدة. للألوان الخاصة المنتجة في المختبر حد أدنى ${F.customColorMinimumKg} كجم. تتوفر أسعار تعاقدية سنوية للطلبات المنتظمة، ويمكن جمع عدة أصناف في شحنة تصدير واحدة.` },
      { q: 'هل تصدّرون وإلى أي الدول؟', a: 'نعم. شحنات منتظمة إلى الشرق الأوسط وآسيا الوسطى والبلقان وإلى أسواق أخرى عند الطلب، براً وبحراً وجواً. عروض الأسعار بشروط EXW أو FOB أو CIF؛ نعدّ TDS/SDS بالإنجليزية وشهادات المنشأ والوثائق الجمركية.' },
      { q: 'ما العلامات التي توزعونها في تركيا؟', a: `نحن الموزع الرسمي في تركيا لـ SAKATA INX (اليابان، منذ ${SAKATA_SINCE})، وZeller+Gmelin (ألمانيا، أحبار UV)، وHi-Tech Coatings (هولندا، ورنيشات التشتت)، وSCHLENK (ألمانيا، صبغات معدنية). أما EVA COLOR وVECTOR فعلامتانا الخاصتان المصنّعتان في إسطنبول.` },
      { q: 'هل يمكنكم مطابقة لون PANTONE أو لون العلامة التجارية؟', a: `نعم. يكفي رمز PANTONE أو عينة مطبوعة أو قيمة L*a*b*؛ يصوغ مختبرنا اللون بالمطياف بهدف Delta E أقل من ${F.deltaEMax}. التسليم خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة، وتُحفظ الوصفة للطلبات المتكررة.` },
      { q: 'هل يمكنني الحصول على TDS وSDS وعينات قبل الطلب؟', a: 'نعم. تتوفر نشرات البيانات الفنية (TDS) ونشرات السلامة (SDS) المحدثة بالإنجليزية والتركية عند الطلب لكل منتج. نرسل عينات تقييم للعملاء الراغبين في تجربة منتج جديد أو التحقق من دقة اللون قبل الإنتاج.' },
      { q: `ما الذي يميز SIM منذ ${F.foundingYear}؟`, a: `${YEARS} عاماً في القطاع نفسه من العنوان نفسه: علامتان خاصتان، أربع وكالات توزيع دولية، مختبر ألوان ${F.labAvailability} ودعم فني عند الماكينة. نوصي بالمواد كمنظومة متوافقة ونرفق كل تسليم بالوثائق والعينات.` },
    ],
  },
  related: { title: 'موارد ذات صلة', postsTitle: 'مقالات', linksTitle: 'صفحات' },
  cta: {
    title: 'اطلب عرض سعر لمواد الطباعة',
    text: 'أخبرنا بالماكينة والسطح والعمل؛ نرد بمجموعة المنتج المناسبة وعرض السعر خلال يوم عمل واحد بالعربية أو الإنجليزية.',
    button: 'نموذج عرض السعر',
    whatsapp: 'راسلنا عبر واتساب',
    phone: PHONE,
  },
};

/* ------------------------------------------------------------------ */
/*  Dışa aktarım ve yardımcılar                                          */
/* ------------------------------------------------------------------ */
export const PILLAR_CONTENT: Record<PillarLocale, PillarContent> = { tr: TR, en: EN, ru: RU, ar: AR };

export function getPillarContent(locale: string): PillarContent {
  return PILLAR_CONTENT[(locale as PillarLocale) in PILLAR_CONTENT ? (locale as PillarLocale) : 'tr'];
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
}

/** Sayfa gövdesinin düz metni (içerik + kategoriler), link sözdizimi etiketleriyle. */
export function pillarText(locale: string): string {
  const l = (locale as PillarLocale) in PILLAR_CONTENT ? (locale as PillarLocale) : 'tr';
  const out: string[] = [];
  const { meta, ...body } = PILLAR_CONTENT[l];
  void meta;
  collectStrings(body, out);
  for (const c of PILLAR_CATEGORIES) collectStrings({ name: c.name[l], summary: c.summary[l], whenToUse: c.whenToUse[l], body: c.body[l] }, out);
  return out.join(' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}

export function pillarWordCount(locale: string): number {
  return pillarText(locale).split(/\s+/).filter(Boolean).length;
}
