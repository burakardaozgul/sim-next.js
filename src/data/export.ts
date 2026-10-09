/**
 * EN ihracat sayfaları (brief H / 08 §3):
 *   /ihracat → /en/printing-supplies-turkey (ihracat hub'ı)
 *   /ofset-murekkep-ihracati → /en/offset-ink-supplier-turkey
 * EN birincil dil; TR/RU/AR tam yapıda, yoğunlaştırılmış. Olgular organization.ts'ten; RFQ formu /api/contact'a gider.
 */
import { ORGANIZATION, yearsSinceFounding, formatThousands, formatTelephone } from '@/data/organization';
import type { PillarLocale } from '@/data/pillar-matbaa-malzemeleri';
import type { routing } from '@/i18n/routing';
import type { RfqLabels } from '@/components/forms/RfqForm';

type L<T = string> = Record<PillarLocale, T>;
type StaticPagePath = Exclude<keyof typeof routing.pathnames, `${string}[${string}]`>;

export type ExportTarget = { type: 'product'; slug: string } | { type: 'static'; path: StaticPagePath };

export interface ExportGroup {
  key: string;
  target: ExportTarget;
  name: L;
  text: L;
}

export interface ExportHubContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  shortAnswer: { title: string; text: string };
  range: { title: string; intro: string; viewLabel: string };
  whyTurkey: { title: string; intro: string; items: { name: string; text: string }[] };
  markets: { title: string; text: string; regions: { name: string; text: string }[] };
  terms: { title: string; intro: string; headers: [string, string]; rows: { label: string; value: string }[] };
  compliance: { title: string; intro: string; items: { name: string; text: string }[] };
  support: { title: string; text: string; steps: string[] };
  sectors: { title: string; intro: string; items: { name: string; text: string }[] };
  rfq: RfqLabels;
  faq: { title: string; items: { q: string; a: string }[] };
  related: { title: string; links: { path: StaticPagePath; label: string }[] };
  cta: { title: string; text: string; whatsapp: string; phone: string };
}

export interface OffsetInkExportContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  shortAnswer: { title: string; text: string };
  maker: { title: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  types: { title: string; intro: string; headers: [string, string, string, string]; rows: { type: string; brand: string; use: string; packaging: string }[] };
  specs: { title: string; intro: string; headers: [string, string, string]; rows: { property: string; why: string; where: string }[] };
  process: { title: string; intro: string; steps: { name: string; text: string }[] };
  logistics: { title: string; text: string; items: { name: string; text: string }[] };
  rfq: RfqLabels;
  faq: { title: string; items: { q: string; a: string }[] };
  related: { title: string; links: { path: StaticPagePath; label: string }[] };
  cta: { title: string; text: string; whatsapp: string; phone: string };
}

const YEARS = yearsSinceFounding();
const F = ORGANIZATION.facts;
const CAP = { tr: formatThousands(F.customColorCapacityKgPerMonth, 'tr'), en: formatThousands(F.customColorCapacityKgPerMonth, 'en'), ru: formatThousands(F.customColorCapacityKgPerMonth, 'ru'), ar: formatThousands(F.customColorCapacityKgPerMonth, 'ar') };
const PHONE = formatTelephone();
const DE = { tr: String(F.deltaEMax).replace('.', ','), en: String(F.deltaEMax) };
const SAKATA_SINCE = ORGANIZATION.brands.find((b) => b.name === 'SAKATA INX')?.since ?? '';

export const EXPORT_HERO_IMAGE = '/images/matbaa-malzemeleri/sakata-inx-ecopure-cmyk-ofset-murekkep.webp';
export const INK_EXPORT_HERO_IMAGE = '/images/matbaa-malzemeleri/eva-color-new-p871-gold-metalik-murekkep.webp';

export const RFQ_INCOTERMS = ['EXW', 'FOB', 'CIF', 'CFR', 'DAP'] as const;
export const RFQ_COUNTRIES = [
  'Germany', 'United Kingdom', 'Netherlands', 'Italy', 'Poland', 'France', 'Spain', 'Bulgaria', 'Romania', 'Serbia', 'Greece',
  'United Arab Emirates', 'Saudi Arabia', 'Egypt', 'Iraq', 'Jordan', 'Lebanon', 'Qatar', 'Kuwait',
  'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Georgia', 'Russia', 'Ukraine',
  'Algeria', 'Morocco', 'Tunisia', 'Libya', 'Nigeria', 'Kenya',
  'United States', 'Canada', 'India', 'Pakistan', 'Other',
] as const;
export const RFQ_PRODUCT_GROUPS: { value: string; label: L }[] = [
  { value: 'offset-cmyk', label: { tr: 'Ofset CMYK mürekkep', en: 'Offset CMYK inks', ru: 'Офсетные краски CMYK', ar: 'أحبار أوفست CMYK' } },
  { value: 'pantone-custom', label: { tr: 'PANTONE / özel renk', en: 'PANTONE / custom colour inks', ru: 'PANTONE / цвета на заказ', ar: 'PANTONE / ألوان خاصة' } },
  { value: 'metallic', label: { tr: 'Metalik mürekkep', en: 'Metallic inks', ru: 'Металлик-краски', ar: 'أحبار معدنية' } },
  { value: 'fluorescent', label: { tr: 'Floresan mürekkep', en: 'Fluorescent inks', ru: 'Флуоресцентные краски', ar: 'أحبار فلورية' } },
  { value: 'uv', label: { tr: 'UV / LED-UV mürekkep', en: 'UV / LED-UV inks', ru: 'УФ / LED-UV краски', ar: 'أحبار UV / LED-UV' } },
  { value: 'blankets', label: { tr: 'Baskı blanketleri', en: 'Printing blankets', ru: 'Офсетные полотна', ar: 'بطانيات الطباعة' } },
  { value: 'chemicals', label: { tr: 'Baskı kimyasalları', en: 'Pressroom chemicals', ru: 'Печатная химия', ar: 'كيماويات الطباعة' } },
  { value: 'varnish', label: { tr: 'Dispersiyon lak', en: 'Dispersion varnishes', ru: 'Дисперсионные лаки', ar: 'ورنيشات التشتت' } },
  { value: 'mixed', label: { tr: 'Karma sipariş (birden fazla grup)', en: 'Mixed order (several groups)', ru: 'Смешанный заказ', ar: 'طلب مختلط' } },
];

export const EXPORT_PRODUCT_RANGE: ExportGroup[] = [
  { key: 'offset', target: { type: 'product', slug: 'sakata-inx-cmyk-murekkepler' }, name: { tr: 'Ofset CMYK mürekkepler', en: 'Offset CMYK inks', ru: 'Офсетные краски CMYK', ar: 'أحبار أوفست CMYK' }, text: { tr: `SAKATA INX tabaka ofset setleri (Türkiye distribütörü, ${SAKATA_SINCE}'den beri); ISO 2846-1.`, en: `SAKATA INX sheetfed sets (Turkish distributor since ${SAKATA_SINCE}); ISO 2846-1; 1 kg and 2.5 kg cans.`, ru: `Листовые наборы SAKATA INX (дистрибьютор с ${SAKATA_SINCE}); ISO 2846-1.`, ar: `أطقم SAKATA INX للأوفست الورقي (موزع منذ ${SAKATA_SINCE})؛ ISO 2846-1.` } },
  { key: 'pantone', target: { type: 'product', slug: 'sakata-inx-pantone-murekkepler' }, name: { tr: 'PANTONE ve özel renkler', en: 'PANTONE and custom colours', ru: 'PANTONE и цвета на заказ', ar: 'PANTONE والألوان الخاصة' }, text: { tr: `Stok PANTONE serisi; laboratuvarda Delta E < ${DE.tr} hedefli özel renk, minimum ${F.customColorMinimumKg} kg.`, en: `PANTONE series from stock; custom colours matched remotely from L*a*b* to a Delta E below ${DE.en}, minimum ${F.customColorMinimumKg} kg.`, ru: `Серия PANTONE со склада; цвета на заказ с Delta E ниже ${DE.tr}, минимум ${F.customColorMinimumKg} кг.`, ar: `سلسلة PANTONE من المخزون؛ ألوان خاصة بهدف Delta E أقل من ${DE.en}، حد أدنى ${F.customColorMinimumKg} كجم.` } },
  { key: 'metallic', target: { type: 'product', slug: 'eva-color-gold-metalik-murekkepler' }, name: { tr: 'Metalik mürekkepler', en: 'Metallic inks', ru: 'Металлик-краски', ar: 'أحبار معدنية' }, text: { tr: 'EVA COLOR Gold ve Silver (SIM üretimi), PANTONE 871–877; SCHLENK pigmentleri.', en: 'EVA COLOR Gold and Silver, made by SIM in Istanbul, PANTONE 871–877 references; SCHLENK pigments.', ru: 'EVA COLOR Gold и Silver (производство SIM), PANTONE 871–877; пигменты SCHLENK.', ar: 'EVA COLOR Gold وSilver (إنتاج SIM)، مراجع PANTONE 871–877؛ صبغات SCHLENK.' } },
  { key: 'fluorescent', target: { type: 'product', slug: 'eva-color-fluorescent-murekkepler' }, name: { tr: 'Floresan mürekkepler', en: 'Fluorescent inks', ru: 'Флуоресцентные краски', ar: 'أحبار فلورية' }, text: { tr: 'EVA COLOR Floresan serisi, PANTONE 801–814 referansları.', en: 'EVA COLOR Fluorescent series to PANTONE 801–814 references, made by SIM.', ru: 'Серия EVA COLOR Fluorescent, PANTONE 801–814.', ar: 'سلسلة EVA COLOR الفلورية، مراجع PANTONE 801–814.' } },
  { key: 'uv', target: { type: 'product', slug: 'zeller-gmelin-uv-offset-murekkepleri' }, name: { tr: 'UV ve LED-UV mürekkepler', en: 'UV and LED-UV inks', ru: 'УФ и LED-UV краски', ar: 'أحبار UV وLED-UV' }, text: { tr: 'Zeller+Gmelin UV ofset serileri; düşük migrasyonlu seçenekler.', en: 'Zeller+Gmelin UV offset series (Turkish distributor); low-migration grades for food packaging.', ru: 'УФ-серии Zeller+Gmelin; низкомиграционные марки.', ar: 'سلاسل Zeller+Gmelin UV؛ درجات منخفضة الهجرة.' } },
  { key: 'blankets', target: { type: 'product', slug: 'vector-baski-blanketleri' }, name: { tr: 'Baskı blanketleri', en: 'Printing blankets', ru: 'Офсетные полотна', ar: 'بطانيات الطباعة' }, text: { tr: 'VECTOR blanketleri (SIM markası), makineye göre kesim, konvansiyonel ve UV uyumlu.', en: 'VECTOR blankets (SIM brand) cut to press size, with or without bars, conventional and UV-compatible.', ru: 'Полотна VECTOR (бренд SIM), нарезка под машину, обычные и УФ-совместимые.', ar: 'بطانيات VECTOR (علامة SIM) مقصوصة حسب الماكينة، تقليدية ومتوافقة مع UV.' } },
  { key: 'chemicals', target: { type: 'static', path: '/ofset-baski-malzemeleri' }, name: { tr: 'Baskı kimyasalları', en: 'Pressroom chemicals', ru: 'Печатная химия', ar: 'كيماويات الطباعة' }, text: { tr: 'Nemlendirme katkıları, yıkama solventleri, kalıp temizleyici, kurutucu, toz; SDS ile.', en: 'Fountain additives, blanket and roller washes, plate cleaners, driers, powder; SDS and transport classification supplied.', ru: 'Добавки в увлажнение, смывки, очистители форм, сиккативы, порошок; с SDS.', ar: 'إضافات الترطيب ومذيبات الغسيل ومنظفات الألواح والمجففات والبودرة؛ مع SDS.' } },
  { key: 'varnish', target: { type: 'product', slug: 'hi-tech-coatings-dispersiyon-lak' }, name: { tr: 'Dispersiyon laklar', en: 'Dispersion varnishes', ru: 'Дисперсионные лаки', ar: 'ورنيشات التشتت' }, text: { tr: 'Hi-Tech Coatings su bazlı laklar: parlak, mat, soft-touch, blister, yapıştırılabilir; 20 kg bidon ve IBC.', en: 'Hi-Tech Coatings water-based varnishes (Turkish distributor): gloss, matte, soft-touch, blister, glueable; 20 kg drums and IBCs.', ru: 'Водные лаки Hi-Tech Coatings: глянец, мат, soft-touch, блистер; канистры 20 кг и IBC.', ar: 'ورنيشات Hi-Tech Coatings المائية: لامعة ومطفية وناعمة وبليستر؛ براميل 20 كجم وIBC.' } },
];

const RFQ_EN: RfqLabels = { title: 'Request a quotation (RFQ)', intro: 'Tell us your country, product group, quantity and preferred Incoterm; we reply within one working day with prices, lead time and documents.', name: 'Contact name', email: 'E-mail', company: 'Company', phone: 'Phone / WhatsApp', country: 'Country', productGroup: 'Product group', quantity: 'Quantity', quantityHint: 'e.g. 500 kg CMYK + 50 kg PANTONE', incoterm: 'Incoterm', message: 'Details (press, substrate, references, target colours)', consent: 'I consent to the processing of my data for this enquiry as described in the', consentLink: 'privacy notice', submit: 'Send RFQ', sending: 'Sending…', success: 'Your RFQ has been received. We will reply within one working day.', error: 'Something went wrong. Please try again or e-mail us directly.', select: 'Select…' };
const RFQ_TR: RfqLabels = { title: 'Teklif talebi (RFQ)', intro: 'Ülke, ürün grubu, miktar ve tercih ettiğiniz Incoterm bilgisini yazın; bir iş günü içinde fiyat, teslim süresi ve belgelerle dönüş yapalım.', name: 'Ad Soyad', email: 'E-posta', company: 'Firma', phone: 'Telefon / WhatsApp', country: 'Ülke', productGroup: 'Ürün grubu', quantity: 'Miktar', quantityHint: 'ör. 500 kg CMYK + 50 kg PANTONE', incoterm: 'Incoterm', message: 'Ayrıntılar (makine, kâğıt, referans, hedef renkler)', consent: 'Kişisel verilerimin bu talep kapsamında işlenmesini kabul ediyorum:', consentLink: 'Gizlilik ve KVKK Aydınlatma Metni', submit: 'Teklif talebi gönder', sending: 'Gönderiliyor…', success: 'Talebiniz alındı; bir iş günü içinde dönüş yapacağız.', error: 'Bir hata oluştu, lütfen tekrar deneyin veya e-posta gönderin.', select: 'Seçin…' };
const RFQ_RU: RfqLabels = { title: 'Запрос коммерческого предложения (RFQ)', intro: 'Укажите страну, группу продукции, количество и предпочтительный Incoterm — ответим в течение рабочего дня с ценами, сроками и документами.', name: 'Контактное лицо', email: 'E-mail', company: 'Компания', phone: 'Телефон / WhatsApp', country: 'Страна', productGroup: 'Группа продукции', quantity: 'Количество', quantityHint: 'напр. 500 кг CMYK + 50 кг PANTONE', incoterm: 'Incoterm', message: 'Детали (машина, материал, референсы, целевые цвета)', consent: 'Я согласен на обработку моих данных для этого запроса согласно', consentLink: 'уведомлению о конфиденциальности', submit: 'Отправить запрос', sending: 'Отправка…', success: 'Запрос получен. Ответим в течение рабочего дня.', error: 'Произошла ошибка. Повторите попытку или напишите нам по e-mail.', select: 'Выберите…' };
const RFQ_AR: RfqLabels = { title: 'طلب عرض سعر (RFQ)', intro: 'اذكر الدولة ومجموعة المنتج والكمية وشرط Incoterm المفضل؛ نرد خلال يوم عمل بالأسعار ومدة التسليم والوثائق.', name: 'اسم جهة الاتصال', email: 'البريد الإلكتروني', company: 'الشركة', phone: 'الهاتف / واتساب', country: 'الدولة', productGroup: 'مجموعة المنتج', quantity: 'الكمية', quantityHint: 'مثال: 500 كجم CMYK + 50 كجم PANTONE', incoterm: 'Incoterm', message: 'التفاصيل (الماكينة، السطح، المراجع، الألوان المستهدفة)', consent: 'أوافق على معالجة بياناتي لهذا الطلب وفق', consentLink: 'إشعار الخصوصية', submit: 'إرسال الطلب', sending: 'جارٍ الإرسال…', success: 'تم استلام طلبك. سنرد خلال يوم عمل.', error: 'حدث خطأ. حاول مجدداً أو راسلنا عبر البريد.', select: 'اختر…' };

/* ------------------------------------------------------------------ */
/*  İhracat hub'ı — EN (birincil)                                        */
/* ------------------------------------------------------------------ */
const HUB_EN: ExportHubContent = {
  meta: {
    title: 'Printing Supplies from Turkey | Exporter & Manufacturer',
    description: 'Source printing supplies from Turkey: offset and PANTONE inks, metallic, UV, blankets, chemicals, varnish. Maker and distributor since 1983, EXW/FOB/CIF, RFQ.',
    keywords: ['printing supplies turkey', 'printing supplies istanbul', 'printing consumables turkey', 'printing supplies exporter turkey', 'printing supplies wholesale turkey', 'offset ink export turkey', 'printing materials supplier turkey', 'ink supplier turkey'],
  },
  pageName: 'Export from Turkey',
  hero: {
    eyebrow: `Exporting printing supplies for ${YEARS} years · Istanbul, Turkey`,
    h1: 'Printing Supplies from Turkey: Manufacturer and Exporter for Printers Worldwide',
    lead: `SIM Printing Supplies has supplied the printing industry since 1983 and ships from Istanbul to printers, converters and distributors abroad. We manufacture EVA COLOR metallic, fluorescent and custom colour inks and VECTOR blankets, and distribute SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK in Turkey, so one consolidated shipment can carry Japanese, German, Dutch and Turkish-made supplies with English documentation on EXW, FOB or CIF terms.`,
  },
  shortAnswer: {
    title: 'Short answer',
    text: `Yes, you can source printing supplies from Turkey through SIM: eight product groups (offset CMYK and PANTONE inks, metallic and fluorescent inks, UV inks, blankets, pressroom chemicals and dispersion varnishes), no minimum order on stock items, ${F.customColorMinimumKg} kg minimum for custom colours, quotations on EXW, FOB or CIF terms, English TDS/SDS and certificates with every offer, and road, sea or air freight from Istanbul. Send an RFQ below and we reply within one working day.`,
  },
  range: {
    title: 'Product range for export',
    intro: 'Eight product groups, each with a product page carrying specifications, applications and FAQs. Items from different brands can be consolidated into one shipment. Stock series ship as they are sold in Turkey; export-specific needs such as English labels, particular can sizes or a private-label metallic range are agreed in the quotation.',
    viewLabel: 'View product',
  },
  whyTurkey: {
    title: 'Why source printing supplies from Turkey',
    intro: 'Turkey combines a large domestic printing and packaging industry with a location between Europe, the Middle East, the Caucasus and North Africa. For a buyer that means short transit times, a supplier used to European standards and a manufacturer that can formulate rather than only resell.',
    items: [
      { name: 'Location and transit times', text: 'Istanbul connects by road to the Balkans and Central Europe, by sea from Ambarlı Port to the Mediterranean, the Black Sea and the Gulf, and by air from Istanbul Airport. Road freight to much of Europe and the Middle East is a matter of days rather than weeks, and smaller mixed orders travel economically by groupage.' },
      { name: 'EU–Turkey Customs Union', text: 'Industrial goods move between Turkey and the European Union under the Customs Union; we issue the A.TR movement certificate for EU-bound shipments and certificates of origin for other destinations, which simplifies customs clearance for European buyers.' },
      { name: 'Manufacturer plus distributor', text: 'EVA COLOR inks and VECTOR blankets are made in our Istanbul plant, so brand colours, metallic shades and blanket sizes are produced to order; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK are stocked under official distributorship, so proven imported series ship from stock.' },
      { name: 'European standards, documented', text: 'Inks formulated to ISO 2846-1, ICC support targeting ISO 12647-2, EuPIA-compliant products and low-migration options referencing EU 1935/2004 and the Swiss Ordinance; TDS, SDS and compliance statements are supplied in English before the first order.' },
      { name: 'A 24/7 laboratory that matches colour remotely', text: `Send a PANTONE code, a printed sample or an L*a*b* reading; the laboratory formulates to a Delta E below ${DE.en}, ships an approved sample before production and archives the recipe so a repeat order years later receives the same colour.` },
      { name: 'Competitive total cost', text: 'Turkish production costs, no minimum on stock items, consolidated mixed shipments and short lead times lower the landed cost per kilogram compared with buying each brand separately from its home market.' },
      { name: 'One counterpart for the whole pressroom', text: 'Inks, blankets, chemicals and varnishes come from one supplier and are selected to work together, so compatibility problems between brands (swelling, toning, set-off) are avoided and a single technical contact answers for the whole system. For distributors this also means one price list, one document set and one shipment plan to manage.' },
    ],
  },
  markets: {
    title: 'Where we ship',
    text: `Regular shipments go to ${F.exportRegions.en}; we also serve European buyers and receive enquiries from North America and South Asia. Service is available in English, Russian and Arabic as well as Turkish, which matters for technical questions on press.`,
    regions: [
      { name: 'Europe', text: 'Germany, the United Kingdom, the Netherlands, Italy, Poland and the Balkans (Bulgaria, Romania, Serbia, Greece) — road or sea freight, A.TR for EU destinations.' },
      { name: 'Middle East and Gulf', text: 'United Arab Emirates, Saudi Arabia, Egypt, Iraq, Jordan, Qatar, Kuwait — sea freight from Ambarlı or air cargo; Arabic-speaking support.' },
      { name: 'Caucasus and Central Asia', text: 'Azerbaijan, Georgia, Kazakhstan, Uzbekistan — road freight via the Caucasus corridor; Russian-speaking support.' },
      { name: 'North Africa', text: 'Algeria, Morocco, Tunisia, Libya — sea freight from Istanbul; French and Arabic documentation on request.' },
      { name: 'Other markets', text: 'North America, South Asia and Sub-Saharan Africa on request; we quote CIF or CFR to the nearest port and advise on import documentation per country.' },
    ],
  },
  terms: {
    title: 'Commercial terms: Incoterms, MOQ, payment, lead times',
    intro: 'Quotations state the Incoterm, packaging units, lead time and the documents included. The table summarises our standard terms; project-specific terms are agreed in the quotation. A typical first export order runs as follows: you send the RFQ, we quote within one working day, evaluation samples ship by courier, you confirm the order against a pro-forma invoice, goods leave the warehouse within the stated lead time with the document set, and our technical team follows up after delivery.',
    headers: ['Item', 'Standard terms'],
    rows: [
      { label: 'Incoterms', value: 'EXW Istanbul, FOB Ambarlı/Istanbul, CFR/CIF destination port, DAP by road for Europe and the Caucasus' },
      { label: 'Minimum order', value: `None for stock items (single can or blanket); custom colours from ${F.customColorMinimumKg} kg; metallic and fluorescent production from one batch` },
      { label: 'Packaging', value: '1 kg and 2.5 kg cans in cartons, 20 kg drums and IBCs for varnish and chemicals; blankets rolled or flat; palletised and stretch-wrapped for sea and road' },
      { label: 'Lead time', value: `Stock items leave the warehouse within 1–2 working days of order confirmation; custom colours ${F.customColorLeadTimeDays} working days after sample approval; production batches agreed per order` },
      { label: 'Payment', value: 'Prepayment or bank transfer for first orders; terms for established accounts agreed in the quotation' },
      { label: 'Documents', value: 'Commercial invoice, packing list, certificate of origin or A.TR, TDS and SDS in English, certificate of analysis on request, transport classification for sea and air freight' },
      { label: 'Samples', value: 'Evaluation samples and colour-matched approval samples shipped before production' },
    ],
  },
  compliance: {
    title: 'Compliance and documentation',
    intro: 'Every claim on this page is backed by a document you can request before ordering.',
    items: [
      { name: 'ISO 2846-1', text: 'Sheetfed offset process inks formulated to the ISO 2846-1 colour and transparency standard; stated on the TDS.' },
      { name: 'ISO 12647-2 / ICC', text: 'ICC profile support and press standardisation targeting FOGRA and GRACoL characterisations.' },
      { name: 'EuPIA', text: 'Inks and varnishes compliant with the guidelines of the European Printing Ink Association; compliance statement on request.' },
      { name: 'Low migration', text: 'Low-migration ink and varnish options for food, toy and cosmetics packaging referencing EU 1935/2004, 10/2011 and the Swiss Ordinance; migration compliance certificates per product.' },
      { name: 'Partner certifications', text: 'Partners such as SAKATA INX and Zeller+Gmelin hold ISO 9001 and ISO 14001; official distributorship documents available.' },
      { name: 'Safety and transport', text: 'SDS in English for every product; UN transport classification and packaging for sea and air freight where applicable.' },
    ],
  },
  support: {
    title: 'Technical support for international customers',
    text: 'Distance is not a barrier to colour accuracy or troubleshooting. Our technical team works with your press data and samples, and the laboratory matches colour from measurements rather than from a physical visit. When a problem appears on press after delivery (drying, emulsification, toning, adhesion on a new substrate), we ask for the TDS batch number, a printed sample and the press settings and respond with a diagnosis and a corrective recommendation, usually within the same working day.',
    steps: [
      'You send a PANTONE code, a printed sample by courier or an L*a*b* reading with illuminant and paper type.',
      `The laboratory formulates to a Delta E below ${DE.en}, prints a proof on the target paper and ships the approved sample with a measurement report.`,
      'Production starts on your written approval; the recipe and spectral data are archived for repeat orders.',
      'TDS, SDS and press settings (tack, viscosity, recommended density) accompany the shipment; questions are answered by e-mail, phone or video call in English, Russian or Arabic.',
    ],
  },
  sectors: {
    title: 'Who buys from us',
    intro: 'Our export customers are printers and converters who need consistent colour and documented compliance, and distributors looking for a manufacturer partner. Packaging for export is prepared to the destination: cans in cartons on EUR or industrial pallets, drums and IBCs strapped and labelled with batch numbers, and product labels in English with hazard pictograms where the SDS requires them.',
    items: [
      { name: 'Folding carton and packaging printers', text: 'Low-migration inks and varnishes, metallic effects, brand colours matched to PANTONE.' },
      { name: 'Label printers', text: 'UV and LED-UV inks for film and paper labels, fluorescent and metallic spot colours.' },
      { name: 'Commercial and publishing printers', text: 'ISO 2846-1 process sets, PANTONE series, fast-setting inks for perfecting presses.' },
      { name: 'Distributors and ink traders', text: 'EVA COLOR metallic and fluorescent inks and VECTOR blankets under a manufacturer relationship, with private-label options discussed per market.' },
    ],
  },
  rfq: RFQ_EN,
  faq: {
    title: 'Sourcing printing supplies from Turkey: FAQ',
    items: [
      { q: 'Do you export printing supplies from Turkey?', a: `Yes. We ship from Istanbul to ${F.exportRegions.en} and to European and other markets on request, by road, sea and air. Quotations are given on EXW, FOB, CFR/CIF or DAP terms with English documentation.` },
      { q: 'Is there a minimum order quantity for export?', a: `There is no minimum on stock items; a mixed order of several groups can be consolidated into one shipment. Custom colours start at ${F.customColorMinimumKg} kg, and metallic or fluorescent production is planned per batch. We advise on economical packaging and pallet quantities for your destination.` },
      { q: 'Which documents do you provide with an export shipment?', a: 'Commercial invoice, packing list, certificate of origin or A.TR movement certificate for EU destinations, TDS and SDS in English, certificate of analysis on request, EuPIA and low-migration statements where relevant, and transport classification for dangerous goods by sea or air.' },
      { q: 'Can you match our brand colour without a visit?', a: `Yes. Send a PANTONE code, a printed sample or an L*a*b* reading with the illuminant and paper type. The laboratory formulates to a Delta E below ${DE.en}, prints a proof on the target paper and ships an approved sample with a measurement report before production.` },
      { q: 'Are you a manufacturer or a distributor?', a: 'Both. EVA COLOR metallic, fluorescent and custom colour inks and VECTOR printing blankets are manufactured in our Istanbul plant; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK are supplied under official Turkish distributorship from stock.' },
      { q: 'How long does delivery take?', a: `Stock items leave the warehouse within 1–2 working days of order confirmation and custom colours ${F.customColorLeadTimeDays} working days after sample approval. Transit depends on the destination and mode: road freight to the Balkans and Central Europe in days, sea freight to the Gulf and North Africa by schedule, air cargo for urgent or sample shipments.` },
      { q: 'Which payment terms do you accept?', a: 'First orders are placed against prepayment or bank transfer; terms for established accounts are agreed in the quotation. Prices are quoted in EUR or USD on the agreed Incoterm.' },
      { q: 'Can you supply private-label or distributor arrangements?', a: 'For EVA COLOR metallic and fluorescent inks and VECTOR blankets we discuss distributor and private-label arrangements per market, including minimum annual volumes, documentation and technical training. Contact us with your market and volume to start the conversation.' },
    ],
  },
  related: {
    title: 'Related pages',
    links: [
      { path: '/ofset-murekkep-ihracati', label: 'Offset ink supplier and manufacturer in Turkey' },
      { path: '/matbaa-murekkepleri', label: 'Printing inks hub' },
      { path: '/matbaa-malzemeleri', label: 'Printing materials guide' },
      { path: '/ozel-renk-uretimi', label: 'Custom colour production' },
      { path: '/hakkimizda', label: 'About SIM' },
      { path: '/urunler', label: 'Product catalogue' },
    ],
  },
  cta: { title: 'Ready to source from Turkey?', text: 'Send the RFQ above or message us; we reply within one working day with prices, lead time and documents.', whatsapp: 'WhatsApp Business', phone: PHONE },
};

/* ------------------------------------------------------------------ */
/*  İhracat hub'ı — TR (yoğun)                                           */
/* ------------------------------------------------------------------ */
const HUB_TR: ExportHubContent = {
  meta: {
    title: 'İhracat: Türkiye\'den Matbaa Malzemesi Tedariki | SIM',
    description: 'SIM, 1983\'ten beri İstanbul\'dan matbaa malzemesi ihraç eder: ofset ve PANTONE mürekkep, metalik, UV, blanket, kimyasal, lak. EXW/FOB/CIF teklif, İngilizce belge, RFQ.',
    keywords: ['matbaa malzemesi ihracatı', 'mürekkep ihracatı', 'ofset mürekkep ihracat', 'Türkiye matbaa malzemeleri ihracatçısı', 'printing supplies turkey'],
  },
  pageName: 'İhracat',
  hero: {
    eyebrow: `${YEARS} yıldır matbaa sektörüne tedarik · İstanbul`,
    h1: 'İhracat: Türkiye\'den Dünya Matbaalarına Baskı Malzemesi',
    lead: `SIM Baskı Malzemeleri, İstanbul'dan yurt dışındaki matbaa, ambalaj üreticisi ve distribütörlere sevkiyat yapar. EVA COLOR mürekkep ve VECTOR blanket üreticisi; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK Türkiye distribütörü. Tek konsolide sevkiyatla Japon, Alman, Hollanda ve Türk yapımı ürünler, İngilizce belgeler, EXW/FOB/CIF teklif.`,
  },
  shortAnswer: {
    title: 'Kısa cevap',
    text: `SIM üzerinden Türkiye'den matbaa malzemesi tedarik edilebilir: sekiz ürün grubu, stok ürünlerde minimum sipariş yok, özel renkte ${F.customColorMinimumKg} kg, EXW/FOB/CIF teklif, her teklifle İngilizce TDS/SDS ve sertifikalar, İstanbul'dan kara, deniz veya hava yolu. Aşağıdaki RFQ formunu doldurun; bir iş günü içinde dönüş yapıyoruz.`,
  },
  range: { title: 'İhracat ürün gamı', intro: 'Sekiz ürün grubu; her birinin teknik özellik, uygulama ve SSS içeren ürün sayfası vardır. Farklı markaların ürünleri tek sevkiyatta birleştirilir.', viewLabel: 'Ürünü incele' },
  whyTurkey: {
    title: 'Neden Türkiye\'den tedarik?',
    intro: 'Türkiye, büyük bir iç matbaa ve ambalaj sanayisini Avrupa, Orta Doğu, Kafkasya ve Kuzey Afrika arasındaki konumuyla birleştirir: kısa transit süreleri, Avrupa standartlarına alışık tedarikçi ve yalnızca satan değil üreten bir ortak.',
    items: [
      { name: 'Konum ve transit süresi', text: 'Balkanlar ve Orta Avrupa\'ya kara yolu, Ambarlı Limanı\'ndan Akdeniz, Karadeniz ve Körfez\'e deniz yolu, İstanbul Havalimanı\'ndan hava kargo; küçük karma siparişler grupaj ile ekonomik taşınır.' },
      { name: 'AB–Türkiye Gümrük Birliği', text: 'Sanayi ürünleri Gümrük Birliği kapsamında hareket eder; AB sevkiyatlarında A.TR dolaşım belgesi, diğer ülkelerde menşe şahadetnamesi düzenlenir.' },
      { name: 'Üretici + distribütör', text: 'EVA COLOR ve VECTOR İstanbul\'da üretilir; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK resmi distribütörlükle stokta tutulur.' },
      { name: 'Belgeli Avrupa standartları', text: 'ISO 2846-1 mürekkepler, ISO 12647-2 hedefli ICC desteği, EuPIA uyumu, AB 1935/2004 ve Swiss Ordinance referanslı düşük migrasyon seçenekleri; TDS, SDS ve uyum beyanları ilk siparişten önce İngilizce paylaşılır.' },
      { name: 'Uzaktan renk eşleme', text: `PANTONE kodu, numune veya L*a*b* değeri yeterli; laboratuvar Delta E < ${DE.tr} hedefler, onaylı numuneyi üretimden önce gönderir, reçeteyi arşivler.` },
      { name: 'Rekabetçi toplam maliyet', text: 'Türkiye üretim maliyetleri, stokta minimum sipariş olmaması, konsolide karma sevkiyat ve kısa teslim süresi kilogram başına varış maliyetini düşürür.' },
    ],
  },
  markets: {
    title: 'Sevkiyat yaptığımız pazarlar',
    text: `Düzenli sevkiyatlar ${F.exportRegions.tr} bölgelerine; Avrupa'daki alıcılara hizmet veriyor, Kuzey Amerika ve Güney Asya'dan talep alıyoruz. Türkçe dışında İngilizce, Rusça ve Arapça hizmet.`,
    regions: [
      { name: 'Avrupa', text: 'Almanya, İngiltere, Hollanda, İtalya, Polonya ve Balkanlar — kara veya deniz yolu, AB için A.TR.' },
      { name: 'Orta Doğu ve Körfez', text: 'BAE, Suudi Arabistan, Mısır, Irak, Ürdün, Katar, Kuveyt — deniz veya hava kargo; Arapça destek.' },
      { name: 'Kafkasya ve Orta Asya', text: 'Azerbaycan, Gürcistan, Kazakistan, Özbekistan — kara yolu; Rusça destek.' },
      { name: 'Kuzey Afrika', text: 'Cezayir, Fas, Tunus, Libya — deniz yolu; talep üzerine Fransızca ve Arapça belge.' },
    ],
  },
  terms: {
    title: 'Ticari koşullar: Incoterms, MOQ, ödeme, teslim',
    intro: 'Teklifte Incoterm, ambalaj birimi, teslim süresi ve dahil belgeler yazılır; projeye özel koşullar teklifte belirlenir.',
    headers: ['Kalem', 'Standart koşul'],
    rows: [
      { label: 'Incoterms', value: 'EXW İstanbul, FOB Ambarlı/İstanbul, CFR/CIF varış limanı, Avrupa ve Kafkasya için kara yolu DAP' },
      { label: 'Minimum sipariş', value: `Stok ürünlerde yok; özel renk ${F.customColorMinimumKg} kg; metalik ve floresan üretimi parti bazında` },
      { label: 'Ambalaj', value: '1 ve 2,5 kg kutu (kolide), 20 kg bidon ve IBC; blanketler rulo veya düz; paletli ve streçli' },
      { label: 'Teslim süresi', value: `Stok ürünler sipariş onayından 1–2 iş günü içinde çıkar; özel renk numune onayından sonra ${F.customColorLeadTimeDays} iş günü` },
      { label: 'Ödeme', value: 'İlk siparişte peşin veya havale; düzenli hesaplarda koşullar teklifte belirlenir' },
      { label: 'Belgeler', value: 'Ticari fatura, çeki listesi, menşe şahadetnamesi veya A.TR, İngilizce TDS/SDS, talep üzerine analiz sertifikası, taşıma sınıflandırması' },
      { label: 'Numune', value: 'Değerlendirme numunesi ve onaylı renk numunesi üretimden önce gönderilir' },
    ],
  },
  compliance: {
    title: 'Uygunluk ve belgeler',
    intro: 'Bu sayfadaki her iddianın sipariş öncesi istenebilecek bir belgesi vardır.',
    items: [
      { name: 'ISO 2846-1', text: 'Tabaka ofset proses mürekkepleri ISO 2846-1 renk ve saydamlık standardına göre formüle edilir.' },
      { name: 'ISO 12647-2 / ICC', text: 'FOGRA ve GRACoL hedefli ICC profil desteği ve baskı standardizasyonu.' },
      { name: 'EuPIA', text: 'Avrupa Baskı Mürekkepleri Birliği yönergelerine uygun ürünler; uyum beyanı talep üzerine.' },
      { name: 'Düşük migrasyon', text: 'Gıda, oyuncak ve kozmetik ambalajı için AB 1935/2004, 10/2011 ve Swiss Ordinance referanslı seçenekler; ürün bazında migrasyon uyum sertifikası.' },
      { name: 'Partner sertifikaları', text: 'SAKATA INX ve Zeller+Gmelin ISO 9001 ve ISO 14001 sertifikalıdır; resmi distribütörlük belgeleri mevcuttur.' },
      { name: 'Güvenlik ve taşıma', text: 'Her ürün için İngilizce SDS; deniz ve hava için UN taşıma sınıflandırması ve ambalajı.' },
    ],
  },
  support: {
    title: 'Yurt dışı müşterilere teknik destek',
    text: 'Mesafe renk doğruluğu ve sorun gidermeye engel değildir; laboratuvar rengi ziyaretle değil ölçümle eşler.',
    steps: ['PANTONE kodu, kargoyla baskılı numune veya ışık kaynağı ve kâğıt tipiyle L*a*b* değeri gönderirsiniz.', `Laboratuvar Delta E < ${DE.tr} hedefiyle formüle eder, hedef kâğıtta prova basar, onaylı numuneyi ölçüm raporuyla gönderir.`, 'Yazılı onayla üretim başlar; reçete ve spektral veri tekrar sipariş için arşivlenir.', 'TDS, SDS ve makine ayarları sevkiyatla gelir; sorular e-posta, telefon veya görüntülü görüşmeyle İngilizce, Rusça veya Arapça yanıtlanır.'],
  },
  sectors: {
    title: 'Kimler satın alıyor?',
    intro: 'Tutarlı renk ve belgeli uygunluk isteyen matbaalar ile üretici ortak arayan distribütörler.',
    items: [
      { name: 'Karton ambalaj matbaaları', text: 'Düşük migrasyonlu mürekkep ve lak, metalik efekt, PANTONE marka renkleri.' },
      { name: 'Etiket matbaaları', text: 'Film ve kâğıt etiket için UV/LED-UV, floresan ve metalik spot renkler.' },
      { name: 'Ticari ve yayın matbaaları', text: 'ISO 2846-1 proses setleri, PANTONE serisi, perfektör için hızlı set mürekkep.' },
      { name: 'Distribütörler', text: 'EVA COLOR ve VECTOR için üretici ilişkisi; pazar bazında özel etiket seçenekleri.' },
    ],
  },
  rfq: RFQ_TR,
  faq: {
    title: 'İhracat hakkında sık sorulanlar',
    items: [
      { q: 'Yurt dışına hangi ürünleri ihraç ediyorsunuz?', a: 'Sekiz ürün grubunun tamamını: ofset CMYK ve PANTONE mürekkepler, metalik ve floresan mürekkepler, UV mürekkepler, baskı blanketleri, baskı kimyasalları ve dispersiyon laklar; farklı markalar tek sevkiyatta birleştirilir.' },
      { q: 'İhracatta minimum sipariş var mı?', a: `Stok ürünlerde yok; özel renklerde ${F.customColorMinimumKg} kg; metalik ve floresan üretimi parti bazında planlanır.` },
      { q: 'Hangi belgeleri veriyorsunuz?', a: 'Ticari fatura, çeki listesi, menşe şahadetnamesi veya A.TR, İngilizce TDS/SDS, talep üzerine analiz sertifikası, EuPIA ve düşük migrasyon beyanları, tehlikeli madde taşıma sınıflandırması.' },
      { q: 'Marka rengimizi ziyaret olmadan eşleyebilir misiniz?', a: `Evet; PANTONE kodu, numune veya L*a*b* değeri yeterlidir. Laboratuvar Delta E < ${DE.tr} hedefler ve onaylı numuneyi ölçüm raporuyla üretimden önce gönderir.` },
      { q: 'Teslimat ne kadar sürer?', a: `Stok ürünler 1–2 iş günü içinde çıkar; özel renk numune onayından sonra ${F.customColorLeadTimeDays} iş günü. Transit süresi ülkeye ve taşıma moduna bağlıdır.` },
    ],
  },
  related: { title: 'İlgili sayfalar', links: [ { path: '/ofset-murekkep-ihracati', label: 'Ofset mürekkep ihracatı' }, { path: '/matbaa-murekkepleri', label: 'Matbaa mürekkepleri' }, { path: '/matbaa-malzemeleri', label: 'Matbaa malzemeleri rehberi' }, { path: '/ozel-renk-uretimi', label: 'Özel renk üretimi' }, { path: '/hakkimizda', label: 'Hakkımızda' }, { path: '/urunler', label: 'Ürünler' } ] },
  cta: { title: 'Yurt dışına tedarik için konuşalım', text: 'RFQ formunu gönderin veya yazın; bir iş günü içinde fiyat, teslim süresi ve belgelerle dönüş yapalım.', whatsapp: 'WhatsApp', phone: PHONE },
};

/* ------------------------------------------------------------------ */
/*  İhracat hub'ı — RU / AR                                              */
/* ------------------------------------------------------------------ */
const HUB_RU: ExportHubContent = {
  meta: { title: 'Полиграфические материалы из Турции | Экспорт, производитель', description: 'Поставки полиграфических материалов из Турции: офсетные и PANTONE краски, металлик, УФ, полотна, химия, лаки. Производитель и дистрибьютор с 1983 г., EXW/FOB/CIF, запрос цены.', keywords: ['полиграфические материалы из Турции', 'офсетные краски Турция экспорт', 'поставщик печатных материалов Турция', 'краски из Турции'] },
  pageName: 'Экспорт из Турции',
  hero: { eyebrow: `Экспорт полиграфических материалов ${YEARS} лет · Стамбул`, h1: 'Полиграфические материалы из Турции: производитель и экспортёр для типографий', lead: 'SIM поставляет материалы с 1983 года и отгружает из Стамбула типографиям, упаковочным предприятиям и дистрибьюторам за рубежом. Мы производим краски EVA COLOR и полотна VECTOR и распространяем SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK в Турции: одна консолидированная отгрузка с документацией на английском на условиях EXW, FOB или CIF.' },
  shortAnswer: { title: 'Коротко', text: `Да, полиграфические материалы можно закупать в Турции через SIM: восемь групп продукции, без минимума на складские позиции, цвета на заказ от ${F.customColorMinimumKg} кг, предложения EXW/FOB/CIF, TDS/SDS и сертификаты на английском, доставка авто, морем или авиа из Стамбула. Отправьте запрос ниже — ответим в течение рабочего дня.` },
  range: { title: 'Ассортимент для экспорта', intro: 'Восемь групп продукции; позиции разных брендов объединяются в одну отгрузку.', viewLabel: 'Смотреть продукт' },
  whyTurkey: { title: 'Почему закупать в Турции', intro: 'Турция сочетает крупную полиграфическую отрасль с расположением между Европой, Ближним Востоком, Кавказом и Северной Африкой.', items: [
    { name: 'Расположение и сроки', text: 'Автодоставка на Балканы и в Центральную Европу, морем из порта Амбарлы, авиа из аэропорта Стамбула; небольшие смешанные заказы — сборным грузом.' },
    { name: 'Таможенный союз ЕС–Турция', text: 'Для отправок в ЕС оформляем A.TR, для остальных направлений — сертификат происхождения.' },
    { name: 'Производитель плюс дистрибьютор', text: 'EVA COLOR и VECTOR производятся в Стамбуле; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK — на складе по официальной дистрибуции.' },
    { name: 'Европейские стандарты с документами', text: 'ISO 2846-1, ICC по ISO 12647-2, EuPIA, низкомиграционные варианты по EU 1935/2004 и Swiss Ordinance; TDS, SDS и декларации на английском до первого заказа.' },
    { name: 'Удалённый подбор цвета', text: `Код PANTONE, образец или L*a*b* — лаборатория формулирует с Delta E ниже ${DE.tr}, высылает утверждённый образец и архивирует рецептуру.` },
  ] },
  markets: { title: 'Куда поставляем', text: 'Регулярные отгрузки на Ближний Восток, в Центральную Азию и на Балканы; обслуживание на русском, английском и арабском языках.', regions: [
    { name: 'Европа и Балканы', text: 'Германия, Великобритания, Нидерланды, Италия, Польша, Болгария, Румыния, Сербия — авто или море, A.TR для ЕС.' },
    { name: 'Ближний Восток и Персидский залив', text: 'ОАЭ, Саудовская Аравия, Египет, Ирак, Иордания, Катар, Кувейт — море или авиа.' },
    { name: 'Кавказ и Центральная Азия', text: 'Азербайджан, Грузия, Казахстан, Узбекистан — автодоставка через Кавказский коридор; поддержка на русском.' },
    { name: 'Северная Африка', text: 'Алжир, Марокко, Тунис, Ливия — морем из Стамбула.' },
  ] },
  terms: { title: 'Коммерческие условия', intro: 'В предложении указываются Incoterm, упаковка, срок и комплект документов.', headers: ['Позиция', 'Стандартные условия'], rows: [
    { label: 'Incoterms', value: 'EXW Стамбул, FOB Амбарлы, CFR/CIF порт назначения, DAP автотранспортом' },
    { label: 'Минимальный заказ', value: `Нет для склада; цвета на заказ от ${F.customColorMinimumKg} кг` },
    { label: 'Упаковка', value: 'Банки 1 и 2,5 кг в коробках, канистры 20 кг и IBC; полотна в рулонах; паллеты в стрейч-плёнке' },
    { label: 'Срок', value: `Складские позиции — 1–2 рабочих дня после подтверждения; цвета на заказ — ${F.customColorLeadTimeDays} рабочих дня после утверждения образца` },
    { label: 'Оплата', value: 'Предоплата или банковский перевод для первых заказов; условия для постоянных клиентов — в предложении' },
    { label: 'Документы', value: 'Инвойс, упаковочный лист, сертификат происхождения или A.TR, TDS и SDS на английском, сертификат анализа по запросу' },
  ] },
  compliance: { title: 'Соответствие и документы', intro: 'Каждое утверждение подтверждается документом по запросу.', items: [
    { name: 'ISO 2846-1', text: 'Триадные краски по стандарту цвета и прозрачности.' },
    { name: 'ISO 12647-2 / ICC', text: 'Поддержка ICC-профилей и стандартизация печати.' },
    { name: 'EuPIA', text: 'Продукты по рекомендациям Европейской ассоциации производителей красок.' },
    { name: 'Низкая миграция', text: 'Варианты для пищевой упаковки по EU 1935/2004, 10/2011 и Swiss Ordinance с сертификатами.' },
    { name: 'Сертификаты партнёров', text: 'SAKATA INX и Zeller+Gmelin — ISO 9001 и ISO 14001; дистрибьюторские документы.' },
  ] },
  support: { title: 'Техподдержка зарубежных клиентов', text: 'Цвет подбирается по измерениям, а не по визиту.', steps: ['Вы отправляете код PANTONE, оттиск курьером или значение L*a*b*.', `Лаборатория формулирует с Delta E ниже ${DE.tr}, печатает пробу и высылает утверждённый образец с протоколом измерений.`, 'Производство начинается после письменного утверждения; рецептура архивируется.', 'TDS, SDS и настройки машины приходят с отгрузкой; вопросы — по e-mail, телефону или видеосвязи на русском.'] },
  sectors: { title: 'Кто у нас покупает', intro: 'Типографии, которым нужны стабильный цвет и документы, и дистрибьюторы, ищущие производителя.', items: [
    { name: 'Упаковочные типографии', text: 'Низкомиграционные краски и лаки, металлик, фирменные цвета PANTONE.' },
    { name: 'Этикеточные типографии', text: 'УФ и LED-UV краски, флуоресцентные и металлик плашечные цвета.' },
    { name: 'Коммерческие и издательские типографии', text: 'Триадные наборы ISO 2846-1, серия PANTONE, быстрозакрепляющиеся краски.' },
    { name: 'Дистрибьюторы', text: 'EVA COLOR и VECTOR по дистрибьюторской модели; частная марка обсуждается по рынкам.' },
  ] },
  rfq: RFQ_RU,
  faq: { title: 'Вопросы об экспорте', items: [
    { q: 'Экспортируете ли вы полиграфические материалы из Турции?', a: 'Да — на Ближний Восток, в Центральную Азию, на Балканы и в другие страны по запросу, авто, морем и авиа, на условиях EXW, FOB, CFR/CIF или DAP с документами на английском.' },
    { q: 'Есть ли минимальный заказ на экспорт?', a: `Нет для складских позиций; цвета на заказ от ${F.customColorMinimumKg} кг; смешанный заказ объединяется в одну отгрузку.` },
    { q: 'Какие документы вы предоставляете?', a: 'Инвойс, упаковочный лист, сертификат происхождения или A.TR, TDS и SDS на английском, сертификат анализа по запросу, декларации EuPIA и низкой миграции, транспортную классификацию.' },
    { q: 'Можете ли подобрать наш фирменный цвет без визита?', a: `Да: по коду PANTONE, образцу или L*a*b* лаборатория формулирует с Delta E ниже ${DE.tr} и высылает утверждённый образец до производства.` },
    { q: 'Сколько занимает доставка?', a: `Складские позиции отгружаются за 1–2 рабочих дня, цвета на заказ — через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца; транзит зависит от направления и вида транспорта.` },
  ] },
  related: { title: 'Связанные страницы', links: [ { path: '/ofset-murekkep-ihracati', label: 'Офсетные краски из Турции' }, { path: '/matbaa-murekkepleri', label: 'Печатные краски' }, { path: '/matbaa-malzemeleri', label: 'Полиграфические материалы' }, { path: '/ozel-renk-uretimi', label: 'Цвета на заказ' }, { path: '/hakkimizda', label: 'О компании' }, { path: '/urunler', label: 'Продукция' } ] },
  cta: { title: 'Готовы закупать в Турции?', text: 'Отправьте запрос или напишите нам — ответим в течение рабочего дня.', whatsapp: 'WhatsApp', phone: PHONE },
};

const HUB_AR: ExportHubContent = {
  meta: { title: 'مواد الطباعة من تركيا | مصدّر ومصنّع', description: 'توريد مواد الطباعة من تركيا: أحبار أوفست وPANTONE، معدنية وUV، بطانيات وكيماويات وورنيش. مصنّع وموزّع منذ 1983، EXW/FOB/CIF، طلب عرض سعر.', keywords: ['مواد الطباعة من تركيا', 'أحبار أوفست تركيا تصدير', 'مورد مستلزمات الطباعة تركيا', 'أحبار من تركيا'] },
  pageName: 'التصدير من تركيا',
  hero: { eyebrow: `تصدير مواد الطباعة منذ ${YEARS} عاماً · إسطنبول`, h1: 'مواد الطباعة من تركيا: مصنّع ومصدّر للمطابع حول العالم', lead: 'تزوّد SIM قطاع الطباعة منذ 1983 وتشحن من إسطنبول إلى المطابع ومصانع التغليف والموزعين في الخارج. نصنّع أحبار EVA COLOR وبطانيات VECTOR ونوزّع SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK في تركيا؛ شحنة واحدة موحدة بوثائق إنجليزية وبشروط EXW أو FOB أو CIF.' },
  shortAnswer: { title: 'الإجابة المختصرة', text: `نعم، يمكن توريد مواد الطباعة من تركيا عبر SIM: ثماني مجموعات منتجات، لا حد أدنى للمخزون، الألوان الخاصة من ${F.customColorMinimumKg} كجم، عروض EXW/FOB/CIF، TDS/SDS وشهادات بالإنجليزية، وشحن براً أو بحراً أو جواً من إسطنبول. أرسل طلب عرض السعر أدناه ونرد خلال يوم عمل.` },
  range: { title: 'تشكيلة التصدير', intro: 'ثماني مجموعات منتجات؛ تُجمع أصناف العلامات المختلفة في شحنة واحدة.', viewLabel: 'عرض المنتج' },
  whyTurkey: { title: 'لماذا التوريد من تركيا', intro: 'تجمع تركيا بين صناعة طباعة كبيرة وموقع بين أوروبا والشرق الأوسط والقوقاز وشمال أفريقيا.', items: [
    { name: 'الموقع ومدة العبور', text: 'شحن بري إلى البلقان وأوروبا الوسطى، وبحري من ميناء أمبارلي، وجوي من مطار إسطنبول؛ الطلبات الصغيرة المختلطة بالشحن المجمّع.' },
    { name: 'الاتحاد الجمركي بين الاتحاد الأوروبي وتركيا', text: 'نصدر شهادة A.TR لشحنات الاتحاد الأوروبي وشهادة المنشأ لبقية الوجهات.' },
    { name: 'مصنّع وموزّع معاً', text: 'EVA COLOR وVECTOR تُصنعان في إسطنبول؛ SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK في المخزون بتوزيع رسمي.' },
    { name: 'معايير أوروبية موثقة', text: 'ISO 2846-1، ICC وفق ISO 12647-2، EuPIA، خيارات منخفضة الهجرة وفق EU 1935/2004 وSwiss Ordinance؛ TDS وSDS وإقرارات بالإنجليزية قبل أول طلب.' },
    { name: 'مطابقة الألوان عن بُعد', text: `رمز PANTONE أو عينة أو L*a*b*؛ يصوغ المختبر بهدف Delta E أقل من ${DE.en} ويرسل عينة معتمدة ويؤرشف الوصفة.` },
  ] },
  markets: { title: 'إلى أين نشحن', text: 'شحنات منتظمة إلى الشرق الأوسط وآسيا الوسطى والبلقان؛ خدمة بالعربية والإنجليزية والروسية.', regions: [
    { name: 'الشرق الأوسط والخليج', text: 'الإمارات والسعودية ومصر والعراق والأردن وقطر والكويت — شحن بحري من أمبارلي أو جوي؛ دعم بالعربية.' },
    { name: 'أوروبا والبلقان', text: 'ألمانيا وبريطانيا وهولندا وإيطاليا وبولندا وبلغاريا ورومانيا وصربيا — براً أو بحراً، A.TR للاتحاد الأوروبي.' },
    { name: 'القوقاز وآسيا الوسطى', text: 'أذربيجان وجورجيا وكازاخستان وأوزبكستان — شحن بري.' },
    { name: 'شمال أفريقيا', text: 'الجزائر والمغرب وتونس وليبيا — شحن بحري من إسطنبول؛ وثائق بالفرنسية والعربية عند الطلب.' },
  ] },
  terms: { title: 'الشروط التجارية', intro: 'يحدد العرض شرط Incoterm ووحدات التعبئة ومدة التسليم والوثائق.', headers: ['البند', 'الشروط القياسية'], rows: [
    { label: 'Incoterms', value: 'EXW إسطنبول، FOB أمبارلي، CFR/CIF ميناء الوصول، DAP براً' },
    { label: 'الحد الأدنى', value: `لا يوجد للمخزون؛ الألوان الخاصة من ${F.customColorMinimumKg} كجم` },
    { label: 'التعبئة', value: 'عبوات 1 و2.5 كجم في كراتين، براميل 20 كجم وIBC؛ البطانيات ملفوفة؛ منصات مغلفة' },
    { label: 'مدة التسليم', value: `المخزون خلال 1–2 يوم عمل من التأكيد؛ الألوان الخاصة ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة` },
    { label: 'الدفع', value: 'دفعة مسبقة أو تحويل بنكي للطلبات الأولى؛ شروط للحسابات المنتظمة في العرض' },
    { label: 'الوثائق', value: 'فاتورة تجارية، قائمة تعبئة، شهادة منشأ أو A.TR، TDS وSDS بالإنجليزية، شهادة تحليل عند الطلب' },
  ] },
  compliance: { title: 'المطابقة والوثائق', intro: 'لكل ادعاء وثيقة يمكن طلبها قبل الطلب.', items: [
    { name: 'ISO 2846-1', text: 'أحبار رباعية وفق معيار اللون والشفافية.' },
    { name: 'ISO 12647-2 / ICC', text: 'دعم ملفات ICC وتوحيد الطباعة.' },
    { name: 'EuPIA', text: 'منتجات وفق إرشادات الرابطة الأوروبية لأحبار الطباعة.' },
    { name: 'الهجرة المنخفضة', text: 'خيارات لتغليف الأغذية وفق EU 1935/2004 و10/2011 وSwiss Ordinance مع شهادات.' },
    { name: 'شهادات الشركاء', text: 'SAKATA INX وZeller+Gmelin حاصلتان على ISO 9001 وISO 14001؛ وثائق التوزيع متاحة.' },
  ] },
  support: { title: 'الدعم الفني للعملاء الدوليين', text: 'يُطابَق اللون بالقياس لا بالزيارة.', steps: ['ترسل رمز PANTONE أو عينة مطبوعة بالبريد السريع أو قيمة L*a*b*.', `يصوغ المختبر بهدف Delta E أقل من ${DE.en} ويطبع بروفة ويرسل عينة معتمدة مع تقرير قياس.`, 'يبدأ الإنتاج بعد الموافقة الكتابية؛ تُؤرشف الوصفة.', 'تصل TDS وSDS وإعدادات الماكينة مع الشحنة؛ الأسئلة بالبريد أو الهاتف أو الفيديو بالعربية.'] },
  sectors: { title: 'من يشتري منا', intro: 'مطابع تحتاج ثبات اللون والوثائق، وموزعون يبحثون عن شريك مصنّع.', items: [
    { name: 'مطابع التغليف', text: 'أحبار وورنيشات منخفضة الهجرة، تأثيرات معدنية، ألوان PANTONE.' },
    { name: 'مطابع الملصقات', text: 'أحبار UV وLED-UV، ألوان فلورية ومعدنية.' },
    { name: 'المطابع التجارية والنشر', text: 'أطقم ISO 2846-1، سلسلة PANTONE، أحبار سريعة الجفاف.' },
    { name: 'الموزعون', text: 'EVA COLOR وVECTOR بنموذج توزيع؛ علامة خاصة حسب السوق.' },
  ] },
  rfq: RFQ_AR,
  faq: { title: 'أسئلة شائعة عن التصدير', items: [
    { q: 'هل تصدّرون مواد الطباعة من تركيا؟', a: 'نعم — إلى الشرق الأوسط وآسيا الوسطى والبلقان وأسواق أخرى عند الطلب، براً وبحراً وجواً، بشروط EXW أو FOB أو CFR/CIF أو DAP مع وثائق بالإنجليزية.' },
    { q: 'هل يوجد حد أدنى للطلب في التصدير؟', a: `لا يوجد للمخزون؛ الألوان الخاصة من ${F.customColorMinimumKg} كجم؛ يُجمع الطلب المختلط في شحنة واحدة.` },
    { q: 'ما الوثائق التي توفرونها؟', a: 'فاتورة تجارية، قائمة تعبئة، شهادة منشأ أو A.TR، TDS وSDS بالإنجليزية، شهادة تحليل عند الطلب، إقرارات EuPIA والهجرة المنخفضة، التصنيف للنقل.' },
    { q: 'هل يمكنكم مطابقة لون علامتنا دون زيارة؟', a: `نعم: برمز PANTONE أو عينة أو L*a*b* يصوغ المختبر بهدف Delta E أقل من ${DE.en} ويرسل عينة معتمدة قبل الإنتاج.` },
    { q: 'كم تستغرق عملية التسليم؟', a: `المخزون خلال 1–2 يوم عمل؛ الألوان الخاصة ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة؛ يعتمد العبور على الوجهة ووسيلة النقل.` },
  ] },
  related: { title: 'صفحات ذات صلة', links: [ { path: '/ofset-murekkep-ihracati', label: 'أحبار الأوفست من تركيا' }, { path: '/matbaa-murekkepleri', label: 'أحبار الطباعة' }, { path: '/matbaa-malzemeleri', label: 'دليل مواد الطباعة' }, { path: '/ozel-renk-uretimi', label: 'الألوان الخاصة' }, { path: '/hakkimizda', label: 'من نحن' }, { path: '/urunler', label: 'المنتجات' } ] },
  cta: { title: 'جاهز للتوريد من تركيا؟', text: 'أرسل طلب عرض السعر أو راسلنا؛ نرد خلال يوم عمل.', whatsapp: 'واتساب', phone: PHONE },
};

/* ------------------------------------------------------------------ */
/*  Ofset mürekkep ihracatı — EN (birincil)                              */
/* ------------------------------------------------------------------ */
const INK_EN: OffsetInkExportContent = {
  meta: {
    title: 'Offset Ink Supplier & Manufacturer in Turkey | SIM',
    description: 'Offset ink supplier and manufacturer in Turkey: EVA COLOR inks made in Istanbul; SAKATA INX, Zeller+Gmelin and SCHLENK distributor. Export, samples, RFQ.',
    keywords: ['offset ink supplier turkey', 'offset ink manufacturer turkey', 'offset ink suppliers', 'offset ink export turkey', 'sheetfed offset ink turkey', 'metallic ink manufacturer turkey', 'pantone ink supplier turkey', 'uv offset ink turkey'],
  },
  pageName: 'Offset Ink Supplier in Turkey',
  hero: {
    eyebrow: `Ink manufacturer and distributor in Istanbul for ${YEARS} years`,
    h1: 'Offset Ink Supplier and Manufacturer in Turkey',
    lead: `SIM Printing Supplies manufactures EVA COLOR metallic, fluorescent and custom colour offset inks in Istanbul and distributes SAKATA INX (CMYK and PANTONE), Zeller+Gmelin (UV and LED-UV) and SCHLENK (metallic pigments) in Turkey. International printers and distributors buy from one supplier: proven imported series from stock, manufacturer flexibility for brand colours and effects, English documentation and a ${F.labAvailability} laboratory that matches colour remotely.`,
  },
  shortAnswer: {
    title: 'Short answer',
    text: `Looking for an offset ink supplier in Turkey? SIM is both manufacturer and distributor: EVA COLOR inks are made in our Istanbul plant (${CAP.en} kg monthly custom colour capacity), SAKATA INX, Zeller+Gmelin and SCHLENK ship from stock under official distributorship. Inks are formulated to ISO 2846-1, documented with English TDS/SDS and EuPIA or low-migration statements, matched to a Delta E below ${DE.en} from a PANTONE code or L*a*b* reading, and quoted on EXW, FOB or CIF terms with samples before production.`,
  },
  maker: {
    title: 'Manufacturer and distributor: what each role gives you',
    paragraphs: [
      `As a manufacturer, SIM produces the EVA COLOR range in Istanbul: metallic gold and silver inks on SCHLENK bronze and aluminium pigments (PANTONE 871–877 references), fluorescent inks (PANTONE 801–814) and custom colours formulated in a ${F.labAvailability} laboratory with spectrophotometric control, recipe archive and ${CAP.en} kg monthly capacity. Manufacturing means brand colours, metallic shades and packaging units are produced to your order rather than selected from a catalogue, and that private-label or distributor arrangements can be discussed per market.`,
      `As a distributor, SIM is the official Turkish partner of SAKATA INX (Japan, since ${SAKATA_SINCE}) for CMYK and PANTONE sheetfed offset inks, of Zeller+Gmelin (Germany) for UV and LED-UV inks and of SCHLENK (Germany) for metallic pigments; Hi-Tech Coatings (Netherlands) dispersion varnishes complete the offer. Standard series are stocked in our Beylikdüzü warehouse, so an export order can combine Japanese process inks, German UV inks and Turkish-made EVA COLOR metallics in one consolidated shipment with one set of documents.`,
      'Quality control is the same for both roles. Every manufactured batch is checked against the reference sample for L*a*b*, gloss and opacity and released with a batch number and production date on the label; distributed series are stored in a temperature-controlled warehouse, rotated by production date and shipped with the manufacturer TDS of that batch. For export customers we keep a retained sample of each custom colour batch so a claim can be investigated against physical evidence, and the measurement report travels with the shipment.',
    ],
    facts: [
      { label: 'Manufactured in Istanbul', value: 'EVA COLOR metallic, fluorescent, custom colour inks' },
      { label: 'Distributed for Turkey', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK, Hi-Tech Coatings` },
      { label: 'Laboratory', value: `${F.labAvailability}, ${CAP.en} kg per month, Delta E below ${DE.en}` },
      { label: 'Founded', value: `${F.foundingYear}, Istanbul, Turkey` },
    ],
  },
  types: {
    title: 'Offset ink types we export',
    intro: 'The table lists the ink types, the brand behind each and typical packaging. Product pages carry specifications and FAQs; the printing inks hub explains how to choose.',
    headers: ['Ink type', 'Brand', 'Typical application', 'Packaging'],
    rows: [
      { type: 'Conventional sheetfed CMYK', brand: 'SAKATA INX', use: 'Commercial print, books, catalogues, folding cartons on coated and uncoated paper', packaging: '1 kg and 2.5 kg cans; cartons of 12 or 6' },
      { type: 'PANTONE base colours and series', brand: 'SAKATA INX', use: 'Brand colours, fifth-unit spot colours', packaging: '1 kg cans' },
      { type: 'Custom colours (laboratory)', brand: 'EVA COLOR', use: `Corporate colours matched from PANTONE code, sample or L*a*b*; minimum ${F.customColorMinimumKg} kg`, packaging: '1 kg, 2.5 kg cans; larger on request' },
      { type: 'Metallic gold and silver', brand: 'EVA COLOR / SCHLENK', use: 'Luxury packaging, labels, covers; PANTONE 871–877', packaging: '1 kg and 1.5 kg cans' },
      { type: 'Fluorescent (neon)', brand: 'EVA COLOR', use: 'Promotional print, labels; PANTONE 801–814', packaging: '1 kg cans' },
      { type: 'UV and LED-UV', brand: 'Zeller+Gmelin', use: 'Plastics, metallised board, labels, fast turnaround; low-migration grades', packaging: '2.5 kg cans' },
    ],
  },
  specs: {
    title: 'What the technical data sheet tells you',
    intro: 'Rather than quoting generic numbers, we supply the manufacturer TDS for every series before you order. These are the properties to compare between suppliers and where to find them.',
    headers: ['Property', 'Why it matters', 'Where it is stated'],
    rows: [
      { property: 'Colour standard (ISO 2846-1)', why: 'Proof-to-press match in FOGRA/GRACoL workflows; repeatable colour on repeat orders', where: 'TDS; our compliance statement' },
      { property: 'Lightfastness (Blue Wool scale)', why: 'Fading on shelf or outdoors; critical for labels and packaging', where: 'TDS per colour' },
      { property: 'Tack and viscosity', why: 'Press speed, picking, dot gain; must suit the press and dampening system', where: 'TDS; press settings sheet' },
      { property: 'Setting and drying time', why: 'Backing-up, varnishing and cutting windows; set-off risk', where: 'TDS; our recommendation per paper' },
      { property: 'Rub resistance', why: 'Transport and handling of packaging and covers', where: 'TDS; rub test on request' },
      { property: 'Migration and food-contact status', why: 'Food, toy and cosmetics packaging regulation (EU 1935/2004, Swiss Ordinance)', where: 'EuPIA statement; migration certificate per product' },
      { property: 'Shelf life and storage', why: 'Stock planning at the destination; skinning and settling', where: 'TDS; SDS for safety and transport class' },
    ],
  },
  process: {
    title: 'Samples and colour matching for export customers: six steps',
    intro: 'Most export orders start with a sample. The process is designed to work without a visit and to produce an approved physical reference before any production, so that the first full shipment matches what you tested on your own press. Typical timeline from enquiry to first shipment of stock series is one to two weeks including courier samples; custom colours add the laboratory and approval steps.',
    steps: [
      { name: '1. Enquiry', text: 'Send the RFQ with press type, substrate, ink types, quantities and destination; we reply within one working day with prices, lead time and document list.' },
      { name: '2. Evaluation samples', text: 'Stock series are sent as evaluation samples by courier; you run them on your press and compare against your current ink.' },
      { name: '3. Colour reference', text: 'For custom colours you send a PANTONE code with paper type, a printed sample or an L*a*b* reading with illuminant; the laboratory verifies and measures the reference.' },
      { name: '4. Formulation and proof', text: `The laboratory formulates to a Delta E below ${DE.en}, prints a proof on the target paper and ships the approved sample with a measurement report.` },
      { name: '5. Written approval and production', text: `Production starts on your written approval; stock items ship within 1–2 working days, custom colours ${F.customColorLeadTimeDays} working days after approval. Recipes are archived.` },
      { name: '6. Shipment and support', text: 'Palletised shipment with invoice, packing list, origin or A.TR, TDS/SDS and press settings; technical support by e-mail, phone or video call after delivery.' },
    ],
  },
  logistics: {
    title: 'Export logistics and packaging',
    text: 'Inks ship from our Beylikdüzü warehouse, minutes from Ambarlı Port and an hour from Istanbul Airport. Mixed orders are consolidated on pallets; dangerous-goods classification is provided where applicable (UV inks and some chemicals). Cans are packed in cartons of 6 or 12, drums and IBCs are strapped to pallets, and every outer carton carries the product name, batch number and production date so goods-in at your warehouse can be checked against the packing list without opening the cartons. Temperature during transit matters for ink: we avoid shipping in uninsulated containers during extreme heat or frost and advise on arrival storage.',
    items: [
      { name: 'Road (DAP)', text: 'Balkans, Central Europe, Caucasus; groupage for small mixed orders.' },
      { name: 'Sea (FOB/CFR/CIF)', text: 'Gulf, North Africa, Mediterranean; palletised, stretch-wrapped, with transport classification.' },
      { name: 'Air', text: 'Samples and urgent orders; packaging and documents per IATA requirements.' },
      { name: 'Documents', text: 'Commercial invoice, packing list, certificate of origin or A.TR, TDS/SDS in English, certificate of analysis on request.' },
    ],
  },
  rfq: RFQ_EN,
  faq: {
    title: 'Offset ink supply from Turkey: FAQ',
    items: [
      { q: 'Are you an offset ink manufacturer or a distributor?', a: `Both. EVA COLOR metallic, fluorescent and custom colour inks are manufactured in our Istanbul plant with ${CAP.en} kg monthly custom colour capacity; SAKATA INX, Zeller+Gmelin and SCHLENK are supplied from stock under official Turkish distributorship.` },
      { q: 'Which offset ink brands do you export from Turkey?', a: 'EVA COLOR (our own, made in Istanbul), SAKATA INX CMYK and PANTONE inks, Zeller+Gmelin UV and LED-UV inks and SCHLENK metallic inks and pigments, plus Hi-Tech Coatings dispersion varnishes; items from different brands ship in one consolidated order.' },
      { q: 'What is the minimum order for export?', a: `No minimum on stock items; custom colours from ${F.customColorMinimumKg} kg; metallic and fluorescent production is planned per batch. We advise on carton and pallet quantities for your destination.` },
      { q: 'Can you match our PANTONE or brand colour remotely?', a: `Yes. From a PANTONE code with paper type, a printed sample or an L*a*b* reading the laboratory formulates to a Delta E below ${DE.en}, prints a proof on the target paper and ships an approved sample with a measurement report before production.` },
      { q: 'Which documents and certificates come with the inks?', a: 'English TDS and SDS for every series, ISO 2846-1 statement for process inks, EuPIA compliance and low-migration certificates where relevant, certificate of analysis on request, commercial invoice, packing list and certificate of origin or A.TR.' },
      { q: 'How fast can you deliver and on which terms?', a: `Stock items leave the warehouse within 1–2 working days, custom colours ${F.customColorLeadTimeDays} working days after sample approval. Quotations on EXW, FOB, CFR/CIF or DAP; prepayment or bank transfer for first orders.` },
      { q: 'Do you offer private-label metallic or fluorescent inks for distributors?', a: 'For EVA COLOR metallic and fluorescent inks we discuss distributor and private-label arrangements per market: minimum annual volume, label design in your language, documentation under your brand where regulation allows, and technical training for your sales team. Send your market, target volume and ink types in the RFQ and we will propose a structure.' },
    ],
  },
  related: { title: 'Related pages', links: [ { path: '/ihracat', label: 'Export hub: printing supplies from Turkey' }, { path: '/matbaa-murekkepleri', label: 'Printing inks hub' }, { path: '/ozel-renk-uretimi', label: 'Custom colour production' }, { path: '/urunler', label: 'Product catalogue' }, { path: '/hakkimizda', label: 'About SIM' } ] },
  cta: { title: 'Request an offset ink quotation', text: 'Send the RFQ with your ink types and quantities; we reply within one working day with prices, samples plan and documents.', whatsapp: 'WhatsApp Business', phone: PHONE },
};

/* ------------------------------------------------------------------ */
/*  Ofset mürekkep ihracatı — TR (yoğun)                                 */
/* ------------------------------------------------------------------ */
const INK_TR: OffsetInkExportContent = {
  meta: { title: 'Ofset Mürekkep İhracatı: Türkiye\'den Üretici ve Tedarikçi', description: 'Türkiye\'den ofset mürekkep ihracatı: İstanbul\'da üretilen EVA COLOR metalik, floresan ve özel renk mürekkepleri; SAKATA INX, Zeller+Gmelin, SCHLENK distribütörlüğü. Numune, belge, RFQ.', keywords: ['ofset mürekkep ihracatı', 'mürekkep üreticisi türkiye', 'ofset mürekkep tedarikçisi', 'offset ink supplier turkey'] },
  pageName: 'Ofset Mürekkep İhracatı',
  hero: { eyebrow: `${YEARS} yıldır İstanbul'da mürekkep üreticisi ve distribütörü`, h1: 'Ofset Mürekkep İhracatı: Türkiye\'den Üretici ve Tedarikçi', lead: `SIM, EVA COLOR metalik, floresan ve özel renk mürekkeplerini İstanbul'da üretir; SAKATA INX (CMYK, PANTONE), Zeller+Gmelin (UV, LED-UV) ve SCHLENK (metalik pigment) Türkiye distribütörüdür. Yurt dışındaki matbaalar ve distribütörler tek tedarikçiden stoktaki ithal serileri ve üretici esnekliğini birlikte alır; İngilizce belgeler ve ${F.labAvailability} laboratuvarla uzaktan renk eşleme.` },
  shortAnswer: { title: 'Kısa cevap', text: `SIM hem üretici hem distribütördür: EVA COLOR İstanbul'da üretilir (aylık ${CAP.tr} kg özel renk kapasitesi), SAKATA INX, Zeller+Gmelin ve SCHLENK resmi distribütörlükle stoktan sevk edilir. Mürekkepler ISO 2846-1'e göre formüle edilir, İngilizce TDS/SDS ve EuPIA veya düşük migrasyon beyanlarıyla belgelenir, PANTONE kodu veya L*a*b* değerinden Delta E < ${DE.tr} hedefiyle eşlenir, EXW/FOB/CIF teklif ve üretim öncesi numune ile sunulur.` },
  maker: { title: 'Üretici ve distribütör: her rol ne sağlar?', paragraphs: [
    `Üretici olarak EVA COLOR serisini İstanbul'da üretiyoruz: SCHLENK bronz ve alüminyum pigmentli metalik altın ve gümüş (PANTONE 871–877), floresan (PANTONE 801–814) ve ${F.labAvailability} laboratuvarda spektrofotometrik kontrol, reçete arşivi ve aylık ${CAP.tr} kg kapasiteyle özel renkler. Üretim; marka renklerinin, metalik tonların ve ambalaj birimlerinin katalogdan seçilmek yerine siparişe göre yapılması ve pazar bazında özel etiket veya distribütörlük görüşülebilmesi demektir.`,
    `Distribütör olarak SAKATA INX (Japonya, ${SAKATA_SINCE}'den beri) CMYK ve PANTONE, Zeller+Gmelin (Almanya) UV ve LED-UV, SCHLENK (Almanya) metalik pigment ve Hi-Tech Coatings (Hollanda) dispersiyon laklarının resmi Türkiye distribütörüyüz; standart seriler Beylikdüzü deposunda stoklanır ve tek sevkiyatta tek belge setiyle birleştirilir.`,
  ], facts: [ { label: 'İstanbul\'da üretim', value: 'EVA COLOR metalik, floresan, özel renk' }, { label: 'Türkiye distribütörlüğü', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK, Hi-Tech Coatings` }, { label: 'Laboratuvar', value: `${F.labAvailability}, aylık ${CAP.tr} kg, Delta E < ${DE.tr}` }, { label: 'Kuruluş', value: `${F.foundingYear}, İstanbul` } ] },
  types: { title: 'İhraç ettiğimiz ofset mürekkep türleri', intro: 'Tablo tür, marka, tipik uygulama ve ambalajı özetler; teknik özellikler ürün sayfalarında, seçim rehberi mürekkep hub\'ında.', headers: ['Mürekkep türü', 'Marka', 'Tipik uygulama', 'Ambalaj'], rows: [
    { type: 'Konvansiyonel tabaka CMYK', brand: 'SAKATA INX', use: 'Ticari baskı, kitap, katalog, karton ambalaj', packaging: '1 ve 2,5 kg kutu' },
    { type: 'PANTONE temel renkler ve seriler', brand: 'SAKATA INX', use: 'Marka renkleri, 5. ünite spot renk', packaging: '1 kg kutu' },
    { type: 'Özel renkler (laboratuvar)', brand: 'EVA COLOR', use: `PANTONE kodu, numune veya L*a*b*; minimum ${F.customColorMinimumKg} kg`, packaging: '1 ve 2,5 kg kutu' },
    { type: 'Metalik altın ve gümüş', brand: 'EVA COLOR / SCHLENK', use: 'Lüks ambalaj, etiket, kapak; PANTONE 871–877', packaging: '1 ve 1,5 kg kutu' },
    { type: 'Floresan', brand: 'EVA COLOR', use: 'Promosyon, etiket; PANTONE 801–814', packaging: '1 kg kutu' },
    { type: 'UV ve LED-UV', brand: 'Zeller+Gmelin', use: 'Plastik, metalize karton, etiket; düşük migrasyonlu seriler', packaging: '2,5 kg kutu' },
  ] },
  specs: { title: 'Teknik veri sayfası ne söyler?', intro: 'Genel rakamlar yerine her seri için üretici TDS\'si sipariş öncesi paylaşılır; karşılaştırılacak özellikler ve nerede bulunduğu:', headers: ['Özellik', 'Neden önemli', 'Nerede belirtilir'], rows: [
    { property: 'Renk standardı (ISO 2846-1)', why: 'Prova–baskı eşleşmesi, tekrar siparişte aynı renk', where: 'TDS; uyum beyanı' },
    { property: 'Işık haslığı (Blue Wool)', why: 'Rafta veya dış mekânda solma', where: 'Renk bazında TDS' },
    { property: 'Tack ve viskozite', why: 'Makine hızı, yırtılma, dot gain', where: 'TDS; makine ayar sayfası' },
    { property: 'Set ve kuruma süresi', why: 'Arka yüz, lak ve kesim pencereleri; set-off', where: 'TDS; kâğıda göre öneri' },
    { property: 'Sürtünme direnci', why: 'Ambalaj ve kapak taşıması', where: 'TDS; talep üzerine test' },
    { property: 'Migrasyon ve gıda teması', why: 'AB 1935/2004, Swiss Ordinance', where: 'EuPIA beyanı; migrasyon sertifikası' },
    { property: 'Raf ömrü ve depolama', why: 'Varış noktasında stok planı', where: 'TDS; SDS' },
  ] },
  process: { title: 'Yurt dışı müşteriler için numune ve renk eşleme: altı adım', intro: 'Süreç ziyaret gerektirmez ve üretimden önce onaylı fiziksel referans üretir.', steps: [
    { name: '1. Talep', text: 'RFQ ile makine, kâğıt, mürekkep türleri, miktar ve varış ülkesi; bir iş günü içinde fiyat, teslim süresi ve belge listesi.' },
    { name: '2. Değerlendirme numunesi', text: 'Stok seriler kargoyla numune olarak gönderilir; kendi makinenizde mevcut mürekkebinizle karşılaştırırsınız.' },
    { name: '3. Renk referansı', text: 'Özel renk için kâğıt tipiyle PANTONE kodu, baskılı numune veya ışık kaynağıyla L*a*b* değeri; laboratuvar referansı doğrular ve ölçer.' },
    { name: '4. Formülasyon ve prova', text: `Delta E < ${DE.tr} hedefiyle formül, hedef kâğıtta prova, onaylı numune ve ölçüm raporu.` },
    { name: '5. Yazılı onay ve üretim', text: `Onayla üretim; stok ürünler 1–2 iş günü, özel renk ${F.customColorLeadTimeDays} iş günü. Reçeteler arşivlenir.` },
    { name: '6. Sevkiyat ve destek', text: 'Paletli sevkiyat, fatura, çeki listesi, menşe veya A.TR, TDS/SDS, makine ayarları; teslimat sonrası e-posta, telefon veya görüntülü destek.' },
  ] },
  logistics: { title: 'İhracat lojistiği ve ambalaj', text: 'Mürekkepler Ambarlı Limanı\'na dakikalar, İstanbul Havalimanı\'na bir saat mesafedeki Beylikdüzü deposundan çıkar; karma siparişler palete konsolide edilir, gerektiğinde tehlikeli madde sınıflandırması verilir.', items: [
    { name: 'Kara (DAP)', text: 'Balkanlar, Orta Avrupa, Kafkasya; küçük siparişlerde grupaj.' },
    { name: 'Deniz (FOB/CFR/CIF)', text: 'Körfez, Kuzey Afrika, Akdeniz; paletli, streçli, taşıma sınıflandırmalı.' },
    { name: 'Hava', text: 'Numune ve acil siparişler; IATA gereklerine uygun ambalaj ve belge.' },
    { name: 'Belgeler', text: 'Ticari fatura, çeki listesi, menşe veya A.TR, İngilizce TDS/SDS, talep üzerine analiz sertifikası.' },
  ] },
  rfq: RFQ_TR,
  faq: { title: 'Ofset mürekkep ihracatı: sık sorulanlar', items: [
    { q: 'Üretici misiniz, distribütör mü?', a: `Her ikisi: EVA COLOR İstanbul'da üretilir (aylık ${CAP.tr} kg özel renk kapasitesi); SAKATA INX, Zeller+Gmelin ve SCHLENK resmi distribütörlükle stoktan sevk edilir.` },
    { q: 'Hangi mürekkep markalarını ihraç ediyorsunuz?', a: 'EVA COLOR (kendi üretimimiz), SAKATA INX CMYK ve PANTONE, Zeller+Gmelin UV ve LED-UV, SCHLENK metalik mürekkep ve pigmentleri, Hi-Tech Coatings dispersiyon laklar; farklı markalar tek sevkiyatta.' },
    { q: 'İhracatta minimum sipariş nedir?', a: `Stok ürünlerde yok; özel renklerde ${F.customColorMinimumKg} kg; metalik ve floresan üretimi parti bazında.` },
    { q: 'Marka rengimizi uzaktan eşleyebilir misiniz?', a: `Evet; PANTONE kodu, numune veya L*a*b* değerinden Delta E < ${DE.tr} hedefiyle formüle edilir, hedef kâğıtta prova basılır, onaylı numune ölçüm raporuyla üretimden önce gönderilir.` },
  ] },
  related: { title: 'İlgili sayfalar', links: [ { path: '/ihracat', label: 'İhracat hub\'ı' }, { path: '/matbaa-murekkepleri', label: 'Matbaa mürekkepleri' }, { path: '/ozel-renk-uretimi', label: 'Özel renk üretimi' }, { path: '/urunler', label: 'Ürünler' }, { path: '/hakkimizda', label: 'Hakkımızda' } ] },
  cta: { title: 'Ofset mürekkep için teklif isteyin', text: 'Mürekkep türleri ve miktarlarla RFQ gönderin; bir iş günü içinde fiyat, numune planı ve belgelerle dönüş yapalım.', whatsapp: 'WhatsApp', phone: PHONE },
};

/* ------------------------------------------------------------------ */
/*  Ofset mürekkep ihracatı — RU / AR                                    */
/* ------------------------------------------------------------------ */
const INK_RU: OffsetInkExportContent = {
  meta: { title: 'Поставщик и производитель офсетных красок в Турции | SIM', description: 'Офсетные краски из Турции: EVA COLOR металлик, флуоресцентные и заказные краски производства Стамбула; дистрибьютор SAKATA INX, Zeller+Gmelin, SCHLENK. Экспорт, образцы, запрос цены.', keywords: ['офсетные краски Турция', 'производитель офсетных красок Турция', 'поставщик офсетных красок', 'металлик краски Турция'] },
  pageName: 'Офсетные краски из Турции',
  hero: { eyebrow: `Производитель и дистрибьютор красок в Стамбуле ${YEARS} лет`, h1: 'Поставщик и производитель офсетных красок в Турции', lead: `SIM производит краски EVA COLOR (металлик, флуоресцентные, цвета на заказ) в Стамбуле и распространяет SAKATA INX (CMYK, PANTONE), Zeller+Gmelin (УФ, LED-UV) и SCHLENK (металлик-пигменты) в Турции. Зарубежные типографии и дистрибьюторы получают от одного поставщика складские импортные серии и гибкость производителя, документацию на английском и лабораторию ${F.labAvailability} с удалённым подбором цвета.` },
  shortAnswer: { title: 'Коротко', text: `SIM — и производитель, и дистрибьютор: EVA COLOR выпускается в Стамбуле (мощность ${CAP.ru} кг в месяц), SAKATA INX, Zeller+Gmelin и SCHLENK отгружаются со склада по официальной дистрибуции. Краски по ISO 2846-1, с TDS/SDS на английском и декларациями EuPIA или низкой миграции, подбор по коду PANTONE или L*a*b* с Delta E ниже ${DE.tr}, предложения EXW/FOB/CIF и образцы до производства.` },
  maker: { title: 'Производитель и дистрибьютор', paragraphs: [
    `Как производитель SIM выпускает серию EVA COLOR в Стамбуле: металлик золото и серебро на пигментах SCHLENK (PANTONE 871–877), флуоресцентные (PANTONE 801–814) и цвета на заказ из лаборатории ${F.labAvailability} с архивом рецептур и мощностью ${CAP.ru} кг в месяц. Это означает производство фирменных цветов и упаковки под заказ и возможность дистрибьюторских или частных марок по рынкам.`,
    `Как дистрибьютор SIM — официальный партнёр SAKATA INX (Япония, с ${SAKATA_SINCE}), Zeller+Gmelin (Германия), SCHLENK (Германия) и Hi-Tech Coatings (Нидерланды) в Турции; стандартные серии на складе в Бейликдюзю объединяются в одну отгрузку с одним комплектом документов.`,
  ], facts: [ { label: 'Производство в Стамбуле', value: 'EVA COLOR металлик, флуоресцентные, на заказ' }, { label: 'Дистрибуция', value: `SAKATA INX (${SAKATA_SINCE}), Zeller+Gmelin, SCHLENK, Hi-Tech Coatings` }, { label: 'Лаборатория', value: `${F.labAvailability}, ${CAP.ru} кг в месяц, Delta E ниже ${DE.tr}` }, { label: 'Основание', value: `${F.foundingYear}, Стамбул` } ] },
  types: { title: 'Экспортируемые типы офсетных красок', intro: 'Тип, бренд, применение и упаковка; характеристики — на страницах продуктов.', headers: ['Тип', 'Бренд', 'Применение', 'Упаковка'], rows: [
    { type: 'Конвенциональные листовые CMYK', brand: 'SAKATA INX', use: 'Коммерческая печать, книги, каталоги, картонная упаковка', packaging: 'Банки 1 и 2,5 кг' },
    { type: 'PANTONE базовые цвета и серии', brand: 'SAKATA INX', use: 'Фирменные цвета, плашечная печать', packaging: 'Банки 1 кг' },
    { type: 'Цвета на заказ', brand: 'EVA COLOR', use: `По коду PANTONE, образцу или L*a*b*; минимум ${F.customColorMinimumKg} кг`, packaging: 'Банки 1 и 2,5 кг' },
    { type: 'Металлик золото и серебро', brand: 'EVA COLOR / SCHLENK', use: 'Премиальная упаковка, этикетки; PANTONE 871–877', packaging: 'Банки 1 и 1,5 кг' },
    { type: 'Флуоресцентные', brand: 'EVA COLOR', use: 'Промо-печать, этикетки; PANTONE 801–814', packaging: 'Банки 1 кг' },
    { type: 'УФ и LED-UV', brand: 'Zeller+Gmelin', use: 'Пластики, металлизированный картон, этикетки; низкомиграционные марки', packaging: 'Банки 2,5 кг' },
  ] },
  specs: { title: 'Что говорит технический паспорт', intro: 'Вместо общих цифр — TDS производителя для каждой серии до заказа.', headers: ['Свойство', 'Почему важно', 'Где указано'], rows: [
    { property: 'Цветовой стандарт (ISO 2846-1)', why: 'Совпадение пробы и тиража, повторяемость', where: 'TDS; декларация' },
    { property: 'Светостойкость (Blue Wool)', why: 'Выцветание на полке и на улице', where: 'TDS по цветам' },
    { property: 'Липкость и вязкость', why: 'Скорость машины, выщипывание, растискивание', where: 'TDS; лист настроек' },
    { property: 'Время закрепления и сушки', why: 'Окна для оборота, лакирования и резки', where: 'TDS; рекомендация по бумаге' },
    { property: 'Стойкость к истиранию', why: 'Транспортировка упаковки', where: 'TDS; тест по запросу' },
    { property: 'Миграция и пищевой контакт', why: 'EU 1935/2004, Swiss Ordinance', where: 'Декларация EuPIA; сертификат миграции' },
  ] },
  process: { title: 'Образцы и подбор цвета для экспорта: шесть шагов', intro: 'Процесс не требует визита и даёт утверждённый физический эталон до производства.', steps: [
    { name: '1. Запрос', text: 'RFQ с типом машины, материалом, типами красок, количеством и страной; ответ в течение рабочего дня.' },
    { name: '2. Оценочные образцы', text: 'Складские серии отправляются курьером для теста на вашей машине.' },
    { name: '3. Цветовой эталон', text: 'Код PANTONE с типом бумаги, оттиск или L*a*b*; лаборатория проверяет и измеряет.' },
    { name: '4. Формулирование и проба', text: `Delta E ниже ${DE.tr}, проба на целевой бумаге, утверждённый образец с протоколом.` },
    { name: '5. Утверждение и производство', text: `Складские позиции — 1–2 рабочих дня, цвета на заказ — ${F.customColorLeadTimeDays} рабочих дня; рецептуры архивируются.` },
    { name: '6. Отгрузка и поддержка', text: 'Паллеты, инвойс, упаковочный лист, происхождение или A.TR, TDS/SDS, настройки; поддержка после поставки.' },
  ] },
  logistics: { title: 'Экспортная логистика и упаковка', text: 'Отгрузка со склада в Бейликдюзю рядом с портом Амбарлы и в часе от аэропорта Стамбула; смешанные заказы консолидируются на паллетах.', items: [ { name: 'Авто (DAP)', text: 'Балканы, Центральная Европа, Кавказ; сборные грузы.' }, { name: 'Море (FOB/CFR/CIF)', text: 'Персидский залив, Северная Африка, Средиземноморье.' }, { name: 'Авиа', text: 'Образцы и срочные заказы по требованиям IATA.' }, { name: 'Документы', text: 'Инвойс, упаковочный лист, происхождение или A.TR, TDS/SDS на английском.' } ] },
  rfq: RFQ_RU,
  faq: { title: 'Офсетные краски из Турции: вопросы', items: [
    { q: 'Вы производитель или дистрибьютор?', a: `И то и другое: EVA COLOR производится в Стамбуле (мощность ${CAP.ru} кг в месяц); SAKATA INX, Zeller+Gmelin и SCHLENK — со склада по официальной дистрибуции.` },
    { q: 'Какие бренды вы экспортируете?', a: 'EVA COLOR, SAKATA INX CMYK и PANTONE, Zeller+Gmelin UV и LED-UV, SCHLENK металлик, Hi-Tech Coatings лаки — в одной отгрузке.' },
    { q: 'Какой минимальный заказ?', a: `Нет для склада; цвета на заказ от ${F.customColorMinimumKg} кг.` },
    { q: 'Можете ли подобрать наш цвет удалённо?', a: `Да: по коду PANTONE, образцу или L*a*b* — Delta E ниже ${DE.tr}, проба на целевой бумаге, утверждённый образец до производства.` },
  ] },
  related: { title: 'Связанные страницы', links: [ { path: '/ihracat', label: 'Экспорт из Турции' }, { path: '/matbaa-murekkepleri', label: 'Печатные краски' }, { path: '/ozel-renk-uretimi', label: 'Цвета на заказ' }, { path: '/urunler', label: 'Продукция' }, { path: '/hakkimizda', label: 'О компании' } ] },
  cta: { title: 'Запросить цену на офсетные краски', text: 'Отправьте RFQ с типами красок и количеством — ответим в течение рабочего дня.', whatsapp: 'WhatsApp', phone: PHONE },
};

const INK_AR: OffsetInkExportContent = {
  meta: { title: 'مورّد ومصنّع أحبار الأوفست في تركيا | SIM', description: 'أحبار أوفست من تركيا: EVA COLOR معدنية وفلورية وألوان خاصة مصنوعة في إسطنبول؛ موزّع SAKATA INX وZeller+Gmelin وSCHLENK. تصدير، عينات، طلب عرض سعر.', keywords: ['مورد أحبار أوفست تركيا', 'مصنع أحبار أوفست تركيا', 'أحبار أوفست للتصدير', 'أحبار معدنية تركيا'] },
  pageName: 'أحبار الأوفست من تركيا',
  hero: { eyebrow: `مصنّع وموزّع للأحبار في إسطنبول منذ ${YEARS} عاماً`, h1: 'مورّد ومصنّع أحبار الأوفست في تركيا', lead: `تصنّع SIM أحبار EVA COLOR (معدنية وفلورية وألوان خاصة) في إسطنبول وتوزّع SAKATA INX (CMYK وPANTONE) وZeller+Gmelin (UV وLED-UV) وSCHLENK (صبغات معدنية) في تركيا. يحصل المطابع والموزعون في الخارج من مورّد واحد على السلاسل المستوردة من المخزون ومرونة المصنّع ووثائق بالإنجليزية ومختبر ${F.labAvailability} يطابق الألوان عن بُعد.` },
  shortAnswer: { title: 'الإجابة المختصرة', text: `SIM مصنّع وموزّع معاً: تُصنع EVA COLOR في إسطنبول (طاقة ${CAP.ar} كجم شهرياً)، وتُشحن SAKATA INX وZeller+Gmelin وSCHLENK من المخزون بتوزيع رسمي. الأحبار مصاغة وفق ISO 2846-1، موثقة بـ TDS/SDS بالإنجليزية وإقرارات EuPIA أو الهجرة المنخفضة، مطابقة من رمز PANTONE أو L*a*b* بهدف Delta E أقل من ${DE.en}، بعروض EXW/FOB/CIF وعينات قبل الإنتاج.` },
  maker: { title: 'مصنّع وموزّع: ما يقدمه كل دور', paragraphs: [
    `كمصنّع تنتج SIM سلسلة EVA COLOR في إسطنبول: معدني ذهبي وفضي بصبغات SCHLENK (PANTONE 871–877)، فلوري (PANTONE 801–814)، وألوان خاصة من مختبر ${F.labAvailability} بأرشيف وصفات وطاقة ${CAP.ar} كجم شهرياً. يعني التصنيع إنتاج ألوان العلامات والعبوات حسب الطلب وإمكانية ترتيبات التوزيع أو العلامة الخاصة حسب السوق.`,
    `كموزّع، SIM هي الشريك التركي الرسمي لـ SAKATA INX (اليابان، منذ ${SAKATA_SINCE}) وZeller+Gmelin (ألمانيا) وSCHLENK (ألمانيا) وHi-Tech Coatings (هولندا)؛ تُخزَّن السلاسل القياسية في بيليكدوزو وتُجمع في شحنة واحدة بمجموعة وثائق واحدة.`,
  ], facts: [ { label: 'التصنيع في إسطنبول', value: 'EVA COLOR معدنية، فلورية، ألوان خاصة' }, { label: 'التوزيع', value: `SAKATA INX (${SAKATA_SINCE})، Zeller+Gmelin، SCHLENK، Hi-Tech Coatings` }, { label: 'المختبر', value: `${F.labAvailability}، ${CAP.ar} كجم شهرياً، Delta E أقل من ${DE.en}` }, { label: 'التأسيس', value: `${F.foundingYear}، إسطنبول` } ] },
  types: { title: 'أنواع أحبار الأوفست التي نصدّرها', intro: 'النوع والعلامة والتطبيق والتعبئة؛ المواصفات في صفحات المنتجات.', headers: ['نوع الحبر', 'العلامة', 'التطبيق', 'التعبئة'], rows: [
    { type: 'CMYK ورقي تقليدي', brand: 'SAKATA INX', use: 'الطباعة التجارية والكتب والكتالوجات وعلب الكرتون', packaging: 'عبوات 1 و2.5 كجم' },
    { type: 'ألوان PANTONE الأساسية والسلاسل', brand: 'SAKATA INX', use: 'ألوان العلامات والطباعة الخاصة', packaging: 'عبوات 1 كجم' },
    { type: 'ألوان خاصة (مختبر)', brand: 'EVA COLOR', use: `من رمز PANTONE أو عينة أو L*a*b*؛ حد أدنى ${F.customColorMinimumKg} كجم`, packaging: 'عبوات 1 و2.5 كجم' },
    { type: 'معدني ذهبي وفضي', brand: 'EVA COLOR / SCHLENK', use: 'التغليف الفاخر والملصقات؛ PANTONE 871–877', packaging: 'عبوات 1 و1.5 كجم' },
    { type: 'فلوري', brand: 'EVA COLOR', use: 'الترويج والملصقات؛ PANTONE 801–814', packaging: 'عبوات 1 كجم' },
    { type: 'UV وLED-UV', brand: 'Zeller+Gmelin', use: 'البلاستيك والكرتون المعدني والملصقات؛ درجات منخفضة الهجرة', packaging: 'عبوات 2.5 كجم' },
  ] },
  specs: { title: 'ماذا تخبرك نشرة البيانات الفنية', intro: 'بدل الأرقام العامة نوفر TDS المصنّع لكل سلسلة قبل الطلب.', headers: ['الخاصية', 'لماذا تهم', 'أين تُذكر'], rows: [
    { property: 'معيار اللون (ISO 2846-1)', why: 'مطابقة البروفة للطباعة وتكرار اللون', where: 'TDS؛ إقرار المطابقة' },
    { property: 'الثبات الضوئي (Blue Wool)', why: 'البهتان على الرف أو في الخارج', where: 'TDS لكل لون' },
    { property: 'اللزوجة واللصوقية', why: 'سرعة الماكينة والتقشير وتضخم النقطة', where: 'TDS؛ ورقة الإعدادات' },
    { property: 'زمن الثبات والجفاف', why: 'نوافذ الطباعة الخلفية والتلميع والقص', where: 'TDS؛ توصية حسب الورق' },
    { property: 'مقاومة الاحتكاك', why: 'نقل العبوات والأغلفة', where: 'TDS؛ اختبار عند الطلب' },
    { property: 'الهجرة وملامسة الأغذية', why: 'EU 1935/2004 وSwiss Ordinance', where: 'إقرار EuPIA؛ شهادة هجرة' },
  ] },
  process: { title: 'العينات ومطابقة الألوان للتصدير: ست خطوات', intro: 'لا تتطلب العملية زيارة وتنتج مرجعاً مادياً معتمداً قبل الإنتاج.', steps: [
    { name: '1. الطلب', text: 'RFQ بنوع الماكينة والسطح وأنواع الأحبار والكميات والوجهة؛ رد خلال يوم عمل.' },
    { name: '2. عينات التقييم', text: 'تُرسل سلاسل المخزون بالبريد السريع لتجربتها على ماكينتك.' },
    { name: '3. مرجع اللون', text: 'رمز PANTONE مع نوع الورق أو عينة مطبوعة أو L*a*b*؛ يتحقق المختبر ويقيس.' },
    { name: '4. الصياغة والبروفة', text: `Delta E أقل من ${DE.en}، بروفة على الورق المستهدف، عينة معتمدة مع تقرير قياس.` },
    { name: '5. الموافقة والإنتاج', text: `المخزون خلال 1–2 يوم عمل، الألوان الخاصة ${F.customColorLeadTimeDays} أيام عمل؛ تُؤرشف الوصفات.` },
    { name: '6. الشحن والدعم', text: 'منصات، فاتورة، قائمة تعبئة، منشأ أو A.TR، TDS/SDS، إعدادات؛ دعم بعد التسليم.' },
  ] },
  logistics: { title: 'لوجستيات التصدير والتعبئة', text: 'تُشحن الأحبار من مستودع بيليكدوزو القريب من ميناء أمبارلي وعلى بعد ساعة من مطار إسطنبول؛ تُجمع الطلبات المختلطة على منصات.', items: [ { name: 'براً (DAP)', text: 'البلقان وأوروبا الوسطى والقوقاز؛ شحن مجمّع للطلبات الصغيرة.' }, { name: 'بحراً (FOB/CFR/CIF)', text: 'الخليج وشمال أفريقيا والمتوسط.' }, { name: 'جواً', text: 'العينات والطلبات العاجلة وفق متطلبات IATA.' }, { name: 'الوثائق', text: 'فاتورة تجارية، قائمة تعبئة، منشأ أو A.TR، TDS/SDS بالإنجليزية.' } ] },
  rfq: RFQ_AR,
  faq: { title: 'أحبار الأوفست من تركيا: أسئلة شائعة', items: [
    { q: 'هل أنتم مصنّع أم موزّع؟', a: `كلاهما: تُصنع EVA COLOR في إسطنبول (طاقة ${CAP.ar} كجم شهرياً)؛ وتُشحن SAKATA INX وZeller+Gmelin وSCHLENK من المخزون بتوزيع رسمي.` },
    { q: 'ما العلامات التي تصدّرونها؟', a: 'EVA COLOR وSAKATA INX CMYK وPANTONE وZeller+Gmelin UV وLED-UV وSCHLENK المعدنية وورنيشات Hi-Tech Coatings — في شحنة واحدة.' },
    { q: 'ما الحد الأدنى للطلب؟', a: `لا يوجد للمخزون؛ الألوان الخاصة من ${F.customColorMinimumKg} كجم.` },
    { q: 'هل يمكنكم مطابقة لوننا عن بُعد؟', a: `نعم: من رمز PANTONE أو عينة أو L*a*b* بهدف Delta E أقل من ${DE.en}، بروفة على الورق المستهدف، وعينة معتمدة قبل الإنتاج.` },
  ] },
  related: { title: 'صفحات ذات صلة', links: [ { path: '/ihracat', label: 'التصدير من تركيا' }, { path: '/matbaa-murekkepleri', label: 'أحبار الطباعة' }, { path: '/ozel-renk-uretimi', label: 'الألوان الخاصة' }, { path: '/urunler', label: 'المنتجات' }, { path: '/hakkimizda', label: 'من نحن' } ] },
  cta: { title: 'اطلب عرض سعر لأحبار الأوفست', text: 'أرسل RFQ بأنواع الأحبار والكميات؛ نرد خلال يوم عمل.', whatsapp: 'واتساب', phone: PHONE },
};

export const EXPORT_HUB: Record<PillarLocale, ExportHubContent> = { tr: HUB_TR, en: HUB_EN, ru: HUB_RU, ar: HUB_AR };
export const OFFSET_INK_EXPORT: Record<PillarLocale, OffsetInkExportContent> = { tr: INK_TR, en: INK_EN, ru: INK_RU, ar: INK_AR };

export function getExportHub(locale: string): ExportHubContent {
  return EXPORT_HUB[(locale as PillarLocale) in EXPORT_HUB ? (locale as PillarLocale) : 'en'];
}
export function getOffsetInkExport(locale: string): OffsetInkExportContent {
  return OFFSET_INK_EXPORT[(locale as PillarLocale) in OFFSET_INK_EXPORT ? (locale as PillarLocale) : 'en'];
}
export function rfqProductGroups(locale: string): { value: string; label: string }[] {
  const l = (locale as PillarLocale) in EXPORT_HUB ? (locale as PillarLocale) : 'en';
  return RFQ_PRODUCT_GROUPS.map((g) => ({ value: g.value, label: g.label[l] }));
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
}

export function exportWordCount(page: 'hub' | 'ink', locale: string): number {
  const l = (locale as PillarLocale) in EXPORT_HUB ? (locale as PillarLocale) : 'en';
  const out: string[] = [];
  const src = page === 'hub' ? EXPORT_HUB[l] : OFFSET_INK_EXPORT[l];
  const { meta, rfq, ...body } = src as unknown as { meta: unknown; rfq: unknown; [k: string]: unknown };
  void meta; void rfq;
  collectStrings(body, out);
  if (page === 'hub') for (const g of EXPORT_PRODUCT_RANGE) out.push(g.name[l], g.text[l]);
  return out.join(' ').split(/\s+/).filter(Boolean).length;
}
