/**
 * Hakkımızda / E-E-A-T içeriği — /hakkimizda · /en/about · /ru/o-nas · /ar/about (brief G).
 * Zaman çizelgesi şirketin kendi yayımladığı tarihçeden (1983 kâğıt/karton → 1998 ofset → 2001 EFI → 2002 SAKATA/Hi-Tech/Fujikura
 * → 2008 DEERS → 2024 Acoma) alınmıştır; "bugün" satırı organization.ts marka matrisini yansıtır. Sayısal olgular ORGANIZATION.facts'tan.
 * ABOUT_PEOPLE ve ABOUT_CREDENTIALS kullanıcı varlıkları gelene kadar boştur; doluysa bölümler ve Person/hasCredential şemaları otomatik çıkar.
 */
import { ORGANIZATION, yearsSinceFounding, formatThousands } from '@/data/organization';
import { PILLAR_CONTENT, type PillarLocale } from '@/data/pillar-matbaa-malzemeleri';
import type { routing } from '@/i18n/routing';

type L<T = string> = Record<PillarLocale, T>;
type StaticPagePath = Exclude<keyof typeof routing.pathnames, `${string}[${string}]`>;

export interface AboutPerson {
  name: string;
  jobTitle: L;
  bio: L;
  image?: string;
  linkedin?: string;
  /** Şirkette başlangıç yılı */
  since?: string;
}

export interface AboutCredential {
  name: L;
  issuer?: string;
  year?: string;
  url?: string;
}

export interface AboutImage {
  src: string;
  alt: L;
}

export interface AboutContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  intro: string[];
  history: { title: string; intro: string; timelineTitle: string };
  numbers: { title: string; items: { value: string; label: string }[] };
  activities: { title: string; intro: string; items: { name: string; text: string; href: StaticPagePath; linkLabel: string }[] };
  brands: { title: string; intro: string; headers: [string, string, string, string]; linkLabel: string };
  standards: { title: string; intro: string; items: { name: string; text: string }[]; credentialsTitle: string };
  team: { title: string; intro: string; roles: { name: string; text: string }[]; peopleTitle: string; cta: string };
  exportSection: { title: string; text: string };
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  values: { title: string; items: { name: string; text: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string; button: string };
}

const YEARS = yearsSinceFounding();
const F = ORGANIZATION.facts;
const CAP = {
  tr: formatThousands(F.customColorCapacityKgPerMonth, 'tr'),
  en: formatThousands(F.customColorCapacityKgPerMonth, 'en'),
  ru: formatThousands(F.customColorCapacityKgPerMonth, 'ru'),
  ar: formatThousands(F.customColorCapacityKgPerMonth, 'ar'),
};
const OWN = ORGANIZATION.brands.filter((b) => b.role === 'own').length;
const DIST = ORGANIZATION.brands.filter((b) => b.role === 'distributor').length;
const CITY = `${ORGANIZATION.address.addressLocality}/${ORGANIZATION.address.addressRegion}`;

/** Kullanıcı varlıkları gelince doldurulur (ad, unvan, kısa özgeçmiş, fotoğraf, LinkedIn). */
export const ABOUT_PEOPLE: AboutPerson[] = [];

/** Kendi ve partner sertifikaları (PDF/URL) gelince doldurulur. */
export const ABOUT_CREDENTIALS: AboutCredential[] = [];

export const ABOUT_IMAGES: AboutImage[] = [
  { src: '/images/DSC08042-500x600.webp', alt: { tr: 'SIM Baskı Malzemeleri üretim ve dolum alanı, İstanbul', en: 'SIM Printing Supplies production and filling area in Istanbul', ru: 'Производственный участок SIM в Стамбуле', ar: 'منطقة الإنتاج والتعبئة لدى SIM في إسطنبول' } },
  { src: '/images/matbaa-malzemeleri/sim-ozel-renk-laboratuvari-murekkep-karisimi.webp', alt: { tr: 'Özel renk laboratuvarında karıştırıcıda hazırlanan ofset mürekkep', en: 'Offset ink being mixed in the custom colour laboratory', ru: 'Смешивание офсетной краски в лаборатории цвета', ar: 'خلط حبر الأوفست في مختبر الألوان الخاصة' } },
  { src: '/images/matbaa-malzemeleri/pantone-metallics-solid-coated-renk-kartelasi.webp', alt: { tr: 'PANTONE Metallics kartelası ile renk eşleştirme çalışması', en: 'Colour matching with the PANTONE Metallics guide', ru: 'Подбор цвета по вееру PANTONE Metallics', ar: 'مطابقة الألوان باستخدام دليل PANTONE Metallics' } },
  { src: '/images/sim-baski-malzemeleri-ve-matbaa-malzemeleri-Ozel-renk-uretimi2.webp', alt: { tr: 'Gıda ambalajı mürekkep testleri ve kalite kontrol', en: 'Food packaging ink tests and quality control', ru: 'Тестирование красок для пищевой упаковки', ar: 'اختبارات أحبار تغليف الأغذية ومراقبة الجودة' } },
];

/** Şirketin kendi tarihçesi (yıllar şirket metninden; "Bugün" satırı marka matrisinden). */
export const ABOUT_TIMELINE: { year: string; text: L }[] = [
  { year: '1983', text: {
    tr: "İstanbul'da kâğıt, karton ve baskı malzemeleri tedariki amacıyla Sim Baskı Malzemeleri kuruldu.",
    en: 'Sim Printing Supplies is founded in Istanbul to supply paper, board and printing materials.',
    ru: 'В Стамбуле основана компания Sim для поставок бумаги, картона и полиграфических материалов.',
    ar: 'تأسست شركة Sim في إسطنبول لتوريد الورق والكرتون ومواد الطباعة.',
  } },
  { year: '1998', text: {
    tr: 'Faaliyet odağı ofset baskı mürekkepleri, baskı üstü laklar, ofset blanketleri ve ofset kimyasallarına yöneldi.',
    en: 'Focus shifts to offset inks, overprint varnishes, offset blankets and pressroom chemicals.',
    ru: 'Фокус смещается на офсетные краски, лаки, офсетные полотна и печатную химию.',
    ar: 'يتحول التركيز إلى أحبار الأوفست والورنيشات والبطانيات وكيماويات الطباعة.',
  } },
  { year: '2001', text: {
    tr: "İtalyan Samor Grubu'na bağlı EFI ofset baskı kalıplarının Türkiye temsilciliği üstlenildi.",
    en: 'Turkish representation of EFI offset plates (Samor Group, Italy).',
    ru: 'Представительство офсетных пластин EFI (группа Samor, Италия) в Турции.',
    ar: 'تمثيل ألواح الأوفست EFI (مجموعة Samor الإيطالية) في تركيا.',
  } },
  { year: '2002', text: {
    tr: 'SAKATA INX ofset mürekkepleri, Hi-Tech Coatings su bazlı ve UV lakları ile Fujikura ofset blanketlerinin Türkiye temsilcilikleri başladı.',
    en: 'Turkish representation of SAKATA INX offset inks, Hi-Tech Coatings water-based and UV varnishes and Fujikura offset blankets begins.',
    ru: 'Начало представительства SAKATA INX, лаков Hi-Tech Coatings и офсетных полотен Fujikura в Турции.',
    ar: 'بدء تمثيل أحبار SAKATA INX وورنيشات Hi-Tech Coatings وبطانيات Fujikura في تركيا.',
  } },
  { year: '2008', text: {
    tr: 'Güney Kore DEERS (DAIHAN) mürekkeplerinin Türkiye temsilciliği eklendi.',
    en: 'Turkish representation of DEERS (DAIHAN) inks from South Korea is added.',
    ru: 'Добавлено представительство красок DEERS (DAIHAN, Южная Корея).',
    ar: 'إضافة تمثيل أحبار DEERS (DAIHAN) الكورية الجنوبية.',
  } },
  { year: '2024', text: {
    tr: 'İtalyan Acoma markasının seçili ürün gruplarında Türkiye temsilciliği üstlenildi.',
    en: 'Turkish representation of selected product groups of Acoma (Italy).',
    ru: 'Представительство отдельных групп продукции итальянской марки Acoma.',
    ar: 'تمثيل مجموعات منتجات مختارة من علامة Acoma الإيطالية في تركيا.',
  } },
  { year: 'Bugün', text: {
    tr: `Aylık ${CAP.tr} kg kapasiteli, ${F.labAvailability} çalışan özel renk laboratuvarı; tescilli EVA COLOR (metalik, floresan, özel renk) ve VECTOR (blanket) markaları; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK distribütörlükleri; dört dilde hizmet ve ihracat.`,
    en: `A ${F.labAvailability} custom colour laboratory with ${CAP.en} kg monthly capacity; registered EVA COLOR (metallic, fluorescent, custom) and VECTOR (blanket) brands; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK distributorships; service in four languages and export.`,
    ru: `Лаборатория цвета ${F.labAvailability} мощностью ${CAP.ru} кг в месяц; собственные бренды EVA COLOR и VECTOR; дистрибуция SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK; обслуживание на четырёх языках и экспорт.`,
    ar: `مختبر ألوان يعمل ${F.labAvailability} بطاقة ${CAP.ar} كجم شهرياً؛ علامتا EVA COLOR وVECTOR المسجلتان؛ توزيع SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK؛ خدمة بأربع لغات وتصدير.`,
  } },
];

const TR: AboutContent = {
  meta: {
    title: "Hakkımızda | 1983'ten Beri Matbaa Malzemeleri Tedarikçisi",
    description: "SIM Baskı Malzemeleri, 1983'ten beri İstanbul'dan matbaa malzemeleri tedarik eder: EVA COLOR ve VECTOR üreticisi, SAKATA INX ve Zeller+Gmelin distribütörü.",
    keywords: ['SIM Baskı Malzemeleri', 'hakkımızda', 'matbaa malzemeleri tedarikçisi', 'EVA COLOR', 'VECTOR blanket', 'SAKATA INX Türkiye distribütörü', 'Zeller+Gmelin Türkiye', '1983'],
  },
  pageName: 'Hakkımızda',
  hero: {
    eyebrow: 'Hakkımızda',
    h1: "SIM Baskı Malzemeleri: 1983'ten Beri Matbaa Sektörünün Tedarikçisi",
    lead: ORGANIZATION.positioning.tr,
  },
  intro: [
    `SIM Baskı Malzemeleri, ${F.foundingYear} yılında İstanbul'da kuruldu ve ${YEARS} yıldır aynı sektöre hizmet veriyor. Bugün ${CITY}'daki merkez depo ve laboratuvarımızdan Türkiye'nin her yerine ve ihracat pazarlarına ofset mürekkep, PANTONE ve özel renk, metalik ve floresan mürekkep, UV mürekkep, baskı blanketi, baskı kimyasalı ve dispersiyon lak tedarik ediyoruz.`,
    'Üç kimliği bir arada taşıyoruz: EVA COLOR mürekkepleri ve VECTOR blanketleriyle üreticiyiz; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK için Türkiye distribütörüyüz; özel renk laboratuvarımız ve saha ekibimizle teknik çözüm ortağıyız. Bu sayfa kim olduğumuzu, neyi nasıl yaptığımızı ve hangi olgularla kanıtladığımızı anlatır.',
  ],
  history: {
    title: 'Tarihçemiz',
    intro: 'Kâğıt ve karton tedarikiyle başlayan yolculuk, 1998\'den itibaren ofset sarf malzemelerine, 2000\'li yıllarda uluslararası temsilciliklere ve bugün kendi üretimimize uzandı. Aşağıdaki kilometre taşları şirket kayıtlarımızdandır.',
    timelineTitle: 'Kilometre taşları',
  },
  numbers: {
    title: 'Rakamlarla SIM',
    items: [
      { value: `${YEARS} yıl`, label: `${F.foundingYear}'ten beri kesintisiz hizmet` },
      { value: `${CAP.tr} kg`, label: 'Aylık özel renk üretim kapasitesi' },
      { value: F.labAvailability, label: 'Özel renk laboratuvarı' },
      { value: `${OWN}`, label: 'Kendi marka: EVA COLOR mürekkep, VECTOR blanket' },
      { value: `${DIST}`, label: 'Uluslararası distribütörlük: SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK' },
      { value: '4 dil', label: 'Türkçe, İngilizce, Rusça, Arapça' },
    ],
  },
  activities: {
    title: 'Ne yapıyoruz?',
    intro: 'Üretim, distribütörlük ve laboratuvar hizmetini aynı çatı altında topluyoruz; müşterilerimiz için bu, tek muhatap ve birbiriyle uyumlu bir malzeme sistemi anlamına gelir.',
    items: [
      { name: 'Üretim', text: `EVA COLOR markasıyla metalik, floresan ve özel renk ofset mürekkepleri; VECTOR markasıyla ofset baskı blanketleri. Üretim İstanbul'da, aylık ${CAP.tr} kg özel renk kapasitesiyle.`, href: '/urunler', linkLabel: 'Ürünler' },
      { name: 'Distribütörlük', text: 'SAKATA INX (Japonya) CMYK ve PANTONE mürekkepleri, Zeller+Gmelin (Almanya) UV mürekkepleri, Hi-Tech Coatings (Hollanda) dispersiyon lakları ve SCHLENK (Almanya) metalik pigmentleri için resmi Türkiye distribütörlüğü.', href: '/temsilcilikler', linkLabel: 'Temsilciliklerimiz' },
      { name: 'Laboratuvar ve teknik destek', text: `${F.labAvailability} çalışan renk laboratuvarında spektrofotometrik ölçümle Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefli özel renk formülasyonu; makine başında ayar, kuruma ve renk problemlerinde saha desteği; ICC profil ve standart danışmanlığı.`, href: '/ozel-renk-uretimi', linkLabel: 'Özel renk üretimi' },
    ],
  },
  brands: {
    title: 'Markalarımız',
    intro: 'İki kendi markamız ve dört uluslararası distribütörlüğümüz. Her marka için resmi Türkiye distribütörlük belgesi talep üzerine paylaşılır.',
    headers: ['Marka', 'Ülke', 'Rol', 'Ürün grubu'],
    linkLabel: 'Tüm temsilcilikler',
  },
  standards: {
    title: 'Standartlar ve belgeler',
    intro: 'Kalite iddiası, kontrol edilebilir standartlara dayanır. Çalıştığımız standartlar ve sunduğumuz belgeler:',
    items: [
      { name: 'ISO 2846-1', text: 'Tedarik ettiğimiz tabaka ofset mürekkepleri ISO 2846-1 renk ve saydamlık standardına uygun formüle edilir.' },
      { name: 'ISO 12647-2 ve ICC profilleri', text: 'FOGRA/GRACoL hedefli baskı standardizasyonu için ICC profil oluşturma ve makine kalibrasyon desteği.' },
      { name: 'EuPIA', text: 'Mürekkep ve lak tedarikinde Avrupa Baskı Mürekkepleri Birliği (EuPIA) yönergelerine uygun ürünler.' },
      { name: 'Düşük migrasyon', text: 'Gıda ambalajı için Swiss Ordinance ve Nestlé rehberiyle uyumlu düşük migrasyonlu mürekkep ve lak seçenekleri.' },
      { name: 'Partner sertifikaları', text: 'SAKATA INX ve Zeller+Gmelin gibi iş ortaklarımız ISO 9001 ve ISO 14001 sertifikalıdır.' },
      { name: 'TDS ve SDS', text: 'Her ürün için güncel teknik veri sayfası ve güvenlik bilgi formu Türkçe ve İngilizce olarak talep üzerine verilir.' },
      { name: 'Distribütörlük belgeleri', text: 'Temsil ettiğimiz her marka için resmi Türkiye distribütörlük sözleşmesi mevcuttur; orijinal ürün güvencesidir.' },
    ],
    credentialsTitle: 'Sertifikalarımız',
  },
  team: {
    title: 'Ekibimiz',
    intro: `${YEARS} yıllık deneyim, isimsiz bir kurum hafızası değil; laboratuvar, teknik satış, lojistik ve dış ticaret ekiplerimizin günlük işidir. Teknik yazılarımız "SIM Teknik Ekip" imzasıyla bu ekiplerin saha deneyiminden yazılır.`,
    roles: [
      { name: 'Renk laboratuvarı', text: 'PANTONE ve özel renk formülasyonu, spektrofotometrik ölçüm, reçete arşivi ve lot tutarlılığı kontrolü.' },
      { name: 'Teknik satış ve saha desteği', text: 'Makine başında ayar, kuruma ve emülsifikasyon problemlerinde müdahale, ürün seçimi ve deneme baskıları.' },
      { name: 'Lojistik ve depo', text: `${CITY} merkez depodan İstanbul içi aynı gün, Türkiye geneli ${F.domesticLeadTimeDays} iş günü teslimat; stok takibi.` },
      { name: 'Dış ticaret', text: `${F.exportRegions.tr} başta olmak üzere ihracat; İngilizce TDS/SDS, menşe ve gümrük belgeleri.` },
    ],
    peopleTitle: 'Uzmanlarımız',
    cta: 'Teknik ekibimize sorun',
  },
  exportSection: {
    title: 'İhracat ve uluslararası iş birlikleri',
    text: `Japonya, Almanya ve Hollanda merkezli üreticilerle kurduğumuz uzun vadeli distribütörlükler ithalat ağımızı; kendi üretimimiz ve ${F.exportRegions.tr} pazarlarına yaptığımız düzenli sevkiyatlar ihracat kimliğimizi oluşturur. Yurt dışı müşterilerimize İngilizce teknik belge, EXW/FOB/CIF teklif ve kara, deniz, hava yolu lojistik desteği sağlıyoruz.`,
  },
  mission: {
    title: 'Misyonumuz',
    text: 'Matbaa sektörüne güvenilir tedarik, ileri teknoloji ürünler ve teknik uzmanlıkla desteklenen sürdürülebilir çözümler sunarak müşterilerimizin baskı kalitesini geliştirmek.',
  },
  vision: {
    title: 'Vizyonumuz',
    text: 'Bölgesinde referans gösterilen, uluslararası ölçekte güvenilir bir çözüm ortağı olmak.',
  },
  values: {
    title: 'Değerlerimiz',
    items: [
      { name: 'Güvenilirlik', text: 'Verdiğimiz teslim tarihi, renk ve belge taahhütlerini tutarız; stok ve lot takibini müşterimizin yerine biz yaparız.' },
      { name: 'Teknik dürüstlük', text: 'Bir ürünün işe uygun olmadığını söyleriz; satış değil, doğru malzeme sistemi önerir, numune ve TDS ile kanıtlarız.' },
      { name: 'Çevre ve güvenlik', text: 'Düşük VOC, su bazlı ve düşük migrasyonlu seçenekleri önceliklendirir; SDS ve depolama kurallarını paylaşırız.' },
      { name: 'Süreklilik', text: `${F.foundingYear}'ten beri aynı sektör, aynı adres: müşterilerimizle on yıllara yayılan iş ortaklıkları kurarız.` },
      { name: 'Erişilebilirlik', text: 'Dört dilde hizmet, telefon ve WhatsApp ile hızlı yanıt, makine başında destek.' },
    ],
  },
  faq: {
    title: 'SIM hakkında sık sorulan sorular',
    items: [
      { q: 'SIM Baskı Malzemeleri ne zaman ve nerede kuruldu?', a: `${F.foundingYear} yılında İstanbul'da kuruldu; bugün ${CITY} adresindeki merkez depo ve laboratuvardan hizmet veriyor. ${YEARS} yıldır kesintisiz olarak matbaa sektörüne mürekkep, blanket, kimyasal ve lak tedarik ediyoruz.` },
      { q: 'Üretici misiniz, distribütör mü?', a: 'Her ikisi. EVA COLOR metalik, floresan ve özel renk mürekkepleri ile VECTOR baskı blanketleri kendi markalarımızdır ve İstanbul\'da üretilir. SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK için ise resmi Türkiye distribütörüyüz; distribütörlük belgeleri talep üzerine paylaşılır.' },
      { q: 'Özel renk laboratuvarınız nasıl çalışır?', a: `Laboratuvar ${F.labAvailability} çalışır; PANTONE kodu, baskılı örnek veya L*a*b* değerinden spektrofotometreyle Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefli formül hazırlar. Numune onayından sonra ${F.customColorLeadTimeDays} iş günü içinde teslim eder; reçeteler saklanır. Aylık kapasite ${CAP.tr} kg, minimum sipariş ${F.customColorMinimumKg} kg.` },
      { q: 'Hangi belgeleri ve standartları sağlıyorsunuz?', a: 'Her ürün için TDS ve SDS (Türkçe/İngilizce), ISO 2846-1 uyumlu mürekkepler, ISO 12647-2 hedefli ICC profil desteği, gıda ambalajı için düşük migrasyon beyanları ve her marka için resmi distribütörlük belgesi sağlıyoruz.' },
      { q: 'Yurt dışına satış yapıyor musunuz, hangi dillerde hizmet veriyorsunuz?', a: `Evet; ${F.exportRegions.tr} başta olmak üzere kara, deniz ve hava yoluyla ihracat yapıyoruz. Türkçe, İngilizce, Rusça ve Arapça hizmet veriyoruz; İngilizce TDS/SDS, menşe ve gümrük belgeleri teklifle birlikte hazırlanır.` },
    ],
  },
  cta: {
    title: 'Teknik ekibimizle konuşun',
    text: 'Makineniz, kağıdınız ve işiniz için doğru malzeme sistemini birlikte belirleyelim; numune ve TDS ile başlayalım.',
    button: 'İletişime geçin',
  },
};

const EN: AboutContent = {
  meta: {
    title: 'About SIM | Printing Supplies Supplier in Turkey Since 1983',
    description: 'SIM Printing Supplies has supplied printing materials from Istanbul since 1983: maker of EVA COLOR inks and VECTOR blankets, Turkish distributor of SAKATA INX.',
    keywords: ['SIM Printing Supplies', 'about', 'printing supplies supplier Turkey', 'EVA COLOR', 'VECTOR blankets', 'SAKATA INX distributor Turkey', 'Zeller+Gmelin Turkey', 'since 1983'],
  },
  pageName: 'About Us',
  hero: {
    eyebrow: 'About us',
    h1: "SIM Printing Supplies: Turkey's Printing Materials Supplier Since 1983",
    lead: ORGANIZATION.positioning.en,
  },
  intro: [
    `SIM Printing Supplies was founded in Istanbul in ${F.foundingYear} and has served the same industry for ${YEARS} years. From our central warehouse and laboratory in ${CITY}, Istanbul, we supply offset inks, PANTONE and custom colours, metallic and fluorescent inks, UV inks, printing blankets, pressroom chemicals and dispersion varnishes across Turkey and to export markets.`,
    'We carry three identities at once: a manufacturer with EVA COLOR inks and VECTOR blankets; the Turkish distributor of SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK; and a technical partner through our custom colour laboratory and field team. This page explains who we are, what we do and the facts that back it up.',
  ],
  history: {
    title: 'Our history',
    intro: 'A journey that began with paper and board supply moved to offset consumables in 1998, to international representations in the 2000s and to our own manufacturing today. The milestones below come from company records.',
    timelineTitle: 'Milestones',
  },
  numbers: {
    title: 'SIM in numbers',
    items: [
      { value: `${YEARS} years`, label: `Uninterrupted service since ${F.foundingYear}` },
      { value: `${CAP.en} kg`, label: 'Monthly custom colour capacity' },
      { value: F.labAvailability, label: 'Custom colour laboratory' },
      { value: `${OWN}`, label: 'Own brands: EVA COLOR inks, VECTOR blankets' },
      { value: `${DIST}`, label: 'Distributorships: SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK' },
      { value: '4 languages', label: 'Turkish, English, Russian, Arabic' },
    ],
  },
  activities: {
    title: 'What we do',
    intro: 'Manufacturing, distribution and laboratory service under one roof: for customers this means a single counterpart and a matched material system.',
    items: [
      { name: 'Manufacturing', text: `Metallic, fluorescent and custom colour offset inks under the EVA COLOR brand; offset printing blankets under VECTOR. Made in Istanbul with ${CAP.en} kg monthly custom colour capacity.`, href: '/urunler', linkLabel: 'Products' },
      { name: 'Distribution', text: 'Official Turkish distributor of SAKATA INX (Japan) CMYK and PANTONE inks, Zeller+Gmelin (Germany) UV inks, Hi-Tech Coatings (Netherlands) dispersion varnishes and SCHLENK (Germany) metallic pigments.', href: '/temsilcilikler', linkLabel: 'Our brands' },
      { name: 'Laboratory and technical support', text: `Custom colour formulation to a Delta E below ${F.deltaEMax} in a ${F.labAvailability} laboratory; press-side support for setting, drying and colour issues; ICC profile and standards consulting.`, href: '/ozel-renk-uretimi', linkLabel: 'Custom colour production' },
    ],
  },
  brands: {
    title: 'Our brands',
    intro: 'Two own brands and four international distributorships. Official Turkish distributorship documents are available on request.',
    headers: ['Brand', 'Country', 'Role', 'Product group'],
    linkLabel: 'All brands',
  },
  standards: {
    title: 'Standards and documents',
    intro: 'A quality claim rests on verifiable standards. The standards we work to and the documents we provide:',
    items: [
      { name: 'ISO 2846-1', text: 'The sheetfed offset inks we supply are formulated to the ISO 2846-1 colour and transparency standard.' },
      { name: 'ISO 12647-2 and ICC profiles', text: 'ICC profile creation and press calibration support for FOGRA/GRACoL-based standardisation.' },
      { name: 'EuPIA', text: 'Inks and varnishes compliant with the guidelines of the European Printing Ink Association.' },
      { name: 'Low migration', text: 'Low-migration ink and varnish options for food packaging in line with the Swiss Ordinance and Nestlé guidance.' },
      { name: 'Partner certifications', text: 'Partners such as SAKATA INX and Zeller+Gmelin hold ISO 9001 and ISO 14001 certification.' },
      { name: 'TDS and SDS', text: 'Current technical and safety data sheets for every product, in English and Turkish, on request.' },
      { name: 'Distributorship documents', text: 'An official Turkish distributorship agreement exists for every brand we represent — your guarantee of genuine product.' },
    ],
    credentialsTitle: 'Our certificates',
  },
  team: {
    title: 'Our team',
    intro: `${YEARS} years of experience is not an anonymous institutional memory; it is the daily work of our laboratory, technical sales, logistics and export teams. Our technical articles are written from that field experience under the "SIM Technical Team" byline.`,
    roles: [
      { name: 'Colour laboratory', text: 'PANTONE and custom colour formulation, spectrophotometric measurement, recipe archive and lot consistency control.' },
      { name: 'Technical sales and field support', text: 'Press-side setting, intervention on drying and emulsification problems, product selection and press trials.' },
      { name: 'Logistics and warehouse', text: `Same-day delivery in Istanbul and ${F.domesticLeadTimeDays} working days across Turkey from the ${CITY} warehouse; stock monitoring.` },
      { name: 'Export', text: `Shipments to ${F.exportRegions.en}; English TDS/SDS, certificates of origin and customs documentation.` },
    ],
    peopleTitle: 'Our experts',
    cta: 'Ask our technical team',
  },
  exportSection: {
    title: 'Export and international partnerships',
    text: `Long-term distributorships with manufacturers in Japan, Germany and the Netherlands form our import network; our own production and regular shipments to ${F.exportRegions.en} form our export identity. International customers receive English technical documentation, EXW/FOB/CIF quotations and road, sea and air freight support.`,
  },
  mission: {
    title: 'Our mission',
    text: 'To improve our customers\' print quality with reliable supply, advanced products and sustainable solutions backed by technical expertise.',
  },
  vision: {
    title: 'Our vision',
    text: 'To be the reference partner in our region and a trusted solution partner on an international scale.',
  },
  values: {
    title: 'Our values',
    items: [
      { name: 'Reliability', text: 'We keep our delivery, colour and documentation commitments and track stock and lots on our customers\' behalf.' },
      { name: 'Technical honesty', text: 'We say when a product is not right for the job; we recommend a material system, not a sale, and prove it with samples and TDS.' },
      { name: 'Environment and safety', text: 'We prioritise low-VOC, water-based and low-migration options and share SDS and storage rules.' },
      { name: 'Continuity', text: `Same industry, same address since ${F.foundingYear}: we build partnerships with customers that span decades.` },
      { name: 'Accessibility', text: 'Service in four languages, fast response by phone and WhatsApp, support at the press.' },
    ],
  },
  faq: {
    title: 'Frequently asked questions about SIM',
    items: [
      { q: 'When and where was SIM Printing Supplies founded?', a: `In ${F.foundingYear} in Istanbul; today we operate from our central warehouse and laboratory in ${CITY}. For ${YEARS} years we have supplied inks, blankets, chemicals and varnishes to the printing industry without interruption.` },
      { q: 'Are you a manufacturer or a distributor?', a: 'Both. EVA COLOR metallic, fluorescent and custom colour inks and VECTOR printing blankets are our own brands, made in Istanbul. For SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK we are the official Turkish distributor; distributorship documents are available on request.' },
      { q: 'How does your custom colour laboratory work?', a: `The laboratory runs ${F.labAvailability}; from a PANTONE code, a printed sample or an L*a*b* reading it formulates the colour with a spectrophotometer to a Delta E below ${F.deltaEMax}. Delivery is ${F.customColorLeadTimeDays} working days after sample approval and recipes are archived. Monthly capacity is ${CAP.en} kg, minimum order ${F.customColorMinimumKg} kg.` },
      { q: 'Which documents and standards do you provide?', a: 'TDS and SDS for every product (English/Turkish), ISO 2846-1 inks, ICC profile support targeting ISO 12647-2, low-migration statements for food packaging and an official distributorship document for every brand.' },
      { q: 'Do you export, and in which languages do you work?', a: `Yes; we export mainly to ${F.exportRegions.en} by road, sea and air. We work in Turkish, English, Russian and Arabic; English TDS/SDS, certificates of origin and customs documents are prepared with the quotation.` },
    ],
  },
  cta: {
    title: 'Talk to our technical team',
    text: 'Let us define the right material system for your press, substrate and job — starting with samples and TDS.',
    button: 'Contact us',
  },
};

const RU: AboutContent = {
  meta: {
    title: 'О компании SIM | Поставщик из Турции с 1983 года',
    description: 'SIM поставляет полиграфические материалы из Стамбула с 1983 года: производитель красок EVA COLOR и полотен VECTOR, дистрибьютор SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK в Турции.',
    keywords: ['SIM', 'о компании', 'поставщик полиграфических материалов Турция', 'EVA COLOR', 'VECTOR', 'SAKATA INX Турция', 'с 1983 года'],
  },
  pageName: 'О нас',
  hero: { eyebrow: 'О компании', h1: 'SIM: поставщик полиграфических материалов из Турции с 1983 года', lead: 'SIM Printing Supplies — поставщик красок и полиграфических материалов из Турции с 1983 года: производитель красок EVA COLOR и полотен VECTOR; дистрибьютор SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK в Турции; лаборатория цвета 24/7 в Стамбуле.' },
  intro: [
    `Компания SIM основана в Стамбуле в ${F.foundingYear} году и ${YEARS} лет работает в одной отрасли. Со склада и из лаборатории в районе ${ORGANIZATION.address.addressLocality} мы поставляем офсетные краски, PANTONE и цвета на заказ, металлик и флуоресцентные краски, УФ-краски, офсетные полотна, печатную химию и дисперсионные лаки по всей Турции и на экспорт.`,
    'Мы одновременно производитель (EVA COLOR, VECTOR), дистрибьютор (SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK) и технический партнёр с лабораторией цвета и выездной командой.',
  ],
  history: { title: 'История', intro: 'От поставок бумаги и картона — к офсетным расходным материалам в 1998 году, международным представительствам в 2000-х и собственному производству сегодня.', timelineTitle: 'Вехи' },
  numbers: {
    title: 'SIM в цифрах',
    items: [
      { value: `${YEARS} лет`, label: `Непрерывная работа с ${F.foundingYear} года` },
      { value: `${CAP.ru} кг`, label: 'Месячная мощность производства цветов на заказ' },
      { value: F.labAvailability, label: 'Лаборатория цвета' },
      { value: `${OWN}`, label: 'Собственные бренды: EVA COLOR, VECTOR' },
      { value: `${DIST}`, label: 'Дистрибуции: SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings, SCHLENK' },
      { value: '4 языка', label: 'Турецкий, английский, русский, арабский' },
    ],
  },
  activities: {
    title: 'Чем мы занимаемся',
    intro: 'Производство, дистрибуция и лаборатория под одной крышей — один контрагент и согласованная система материалов.',
    items: [
      { name: 'Производство', text: `Металлик, флуоресцентные и заказные офсетные краски EVA COLOR; офсетные полотна VECTOR. Производство в Стамбуле, мощность ${CAP.ru} кг в месяц.`, href: '/urunler', linkLabel: 'Продукция' },
      { name: 'Дистрибуция', text: 'Официальный дистрибьютор SAKATA INX (Япония), Zeller+Gmelin (Германия), Hi-Tech Coatings (Нидерланды) и SCHLENK (Германия) в Турции.', href: '/temsilcilikler', linkLabel: 'Наши бренды' },
      { name: 'Лаборатория и техподдержка', text: `Формулирование цветов с Delta E ниже ${String(F.deltaEMax).replace('.', ',')} в лаборатории ${F.labAvailability}; поддержка у машины; ICC-профили и стандарты.`, href: '/ozel-renk-uretimi', linkLabel: 'Цвета на заказ' },
    ],
  },
  brands: { title: 'Наши бренды', intro: 'Два собственных бренда и четыре международных дистрибуции. Документы — по запросу.', headers: ['Бренд', 'Страна', 'Роль', 'Группа продукции'], linkLabel: 'Все бренды' },
  standards: {
    title: 'Стандарты и документы',
    intro: 'Качество подтверждается проверяемыми стандартами и документами:',
    items: [
      { name: 'ISO 2846-1', text: 'Листовые офсетные краски соответствуют стандарту цвета и прозрачности ISO 2846-1.' },
      { name: 'ISO 12647-2 и ICC', text: 'Создание ICC-профилей и калибровка машин для стандартизации по FOGRA/GRACoL.' },
      { name: 'EuPIA', text: 'Краски и лаки, соответствующие рекомендациям Европейской ассоциации производителей красок.' },
      { name: 'Низкая миграция', text: 'Варианты для пищевой упаковки в соответствии со Swiss Ordinance и рекомендациями Nestlé.' },
      { name: 'Сертификаты партнёров', text: 'SAKATA INX и Zeller+Gmelin сертифицированы по ISO 9001 и ISO 14001.' },
      { name: 'TDS и SDS', text: 'Актуальные технические паспорта и паспорта безопасности на английском и турецком по запросу.' },
    ],
    credentialsTitle: 'Наши сертификаты',
  },
  team: {
    title: 'Команда',
    intro: `${YEARS} лет опыта — это ежедневная работа лаборатории, технических продаж, логистики и экспорта. Технические статьи публикуются под подписью «Техническая команда SIM».`,
    roles: [
      { name: 'Лаборатория цвета', text: 'Формулирование PANTONE и заказных цветов, спектрофотометрия, архив рецептур.' },
      { name: 'Технические продажи и поддержка', text: 'Настройка у машины, решение проблем сушки и эмульгирования, пробная печать.' },
      { name: 'Логистика и склад', text: `Доставка в тот же день по Стамбулу и за ${F.domesticLeadTimeDays} рабочих дня по Турции.` },
      { name: 'Экспорт', text: 'Поставки на Ближний Восток, в Центральную Азию и на Балканы; документы на английском.' },
    ],
    peopleTitle: 'Наши специалисты',
    cta: 'Задать вопрос техническим специалистам',
  },
  exportSection: { title: 'Экспорт и международное сотрудничество', text: 'Долгосрочные дистрибуции с производителями из Японии, Германии и Нидерландов формируют нашу импортную сеть; собственное производство и регулярные отгрузки на Ближний Восток, в Центральную Азию и на Балканы — экспортную. Зарубежным клиентам: документация на английском, предложения EXW/FOB/CIF, авто-, морская и авиадоставка.' },
  mission: { title: 'Миссия', text: 'Повышать качество печати наших клиентов благодаря надёжным поставкам, передовым продуктам и устойчивым решениям, подкреплённым технической экспертизой.' },
  vision: { title: 'Видение', text: 'Быть эталонным партнёром в своём регионе и надёжным партнёром в международном масштабе.' },
  values: {
    title: 'Ценности',
    items: [
      { name: 'Надёжность', text: 'Мы выполняем обязательства по срокам, цвету и документам и отслеживаем запасы за клиента.' },
      { name: 'Техническая честность', text: 'Мы говорим, если продукт не подходит; рекомендуем систему материалов и подтверждаем образцами и TDS.' },
      { name: 'Экология и безопасность', text: 'Приоритет низко-VOC, водным и низкомиграционным решениям; SDS и правила хранения.' },
      { name: 'Постоянство', text: `Одна отрасль, один адрес с ${F.foundingYear} года: партнёрства на десятилетия.` },
    ],
  },
  faq: {
    title: 'Вопросы о компании SIM',
    items: [
      { q: 'Когда и где основана SIM?', a: `В ${F.foundingYear} году в Стамбуле; сегодня — склад и лаборатория в районе ${ORGANIZATION.address.addressLocality}. ${YEARS} лет непрерывных поставок красок, полотен, химии и лаков.` },
      { q: 'Вы производитель или дистрибьютор?', a: 'И то и другое: EVA COLOR и VECTOR — собственные бренды, производство в Стамбуле; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings и SCHLENK — официальная дистрибуция в Турции.' },
      { q: 'Как работает лаборатория цвета?', a: `Лаборатория работает ${F.labAvailability}: по коду PANTONE, оттиску или L*a*b* формулирует цвет с Delta E ниже ${String(F.deltaEMax).replace('.', ',')}; отгрузка через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца; мощность ${CAP.ru} кг в месяц, минимум ${F.customColorMinimumKg} кг.` },
      { q: 'Какие документы и стандарты вы предоставляете?', a: 'TDS и SDS для каждого продукта, краски ISO 2846-1, поддержка ICC-профилей по ISO 12647-2, заявления о низкой миграции и дистрибьюторские документы по каждому бренду.' },
      { q: 'Экспортируете ли вы и на каких языках работаете?', a: 'Да: Ближний Восток, Центральная Азия, Балканы — авто, морем и авиа. Работаем на турецком, английском, русском и арабском языках.' },
    ],
  },
  cta: { title: 'Поговорите с нашими специалистами', text: 'Подберём систему материалов под вашу машину, материал и задачу — начнём с образцов и TDS.', button: 'Связаться' },
};

const AR: AboutContent = {
  meta: {
    title: 'عن SIM | مورّد مستلزمات الطباعة في تركيا منذ 1983',
    description: 'توفر SIM مواد الطباعة من إسطنبول منذ 1983: مصنّع أحبار EVA COLOR وبطانيات VECTOR، والموزّع التركي لـ SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK.',
    keywords: ['SIM', 'من نحن', 'مورد مواد الطباعة تركيا', 'EVA COLOR', 'VECTOR', 'موزع SAKATA INX تركيا', 'منذ 1983'],
  },
  pageName: 'من نحن',
  hero: { eyebrow: 'من نحن', h1: 'SIM: مورّد مواد الطباعة في تركيا منذ 1983', lead: 'SIM مستلزمات الطباعة — مرجع تركيا لأحبار ومواد الطباعة منذ 1983: مصنّع أحبار EVA COLOR وبطانيات VECTOR؛ الموزّع التركي لـ SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK؛ مختبر ألوان خاصة يعمل 24/7 في إسطنبول.' },
  intro: [
    `تأسست SIM في إسطنبول عام ${F.foundingYear} وتعمل في القطاع نفسه منذ ${YEARS} عاماً. من مستودعنا ومختبرنا في ${ORGANIZATION.address.addressLocality} نوفر أحبار الأوفست وPANTONE والألوان الخاصة والأحبار المعدنية والفلورية وUV وبطانيات الطباعة وكيماويات الطباعة وورنيشات التشتت في تركيا وأسواق التصدير.`,
    'نحمل ثلاث هويات معاً: مصنّع (EVA COLOR وVECTOR)، وموزّع (SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK)، وشريك فني بمختبر ألوان وفريق ميداني.',
  ],
  history: { title: 'تاريخنا', intro: 'رحلة بدأت بتوريد الورق والكرتون، ثم مستهلكات الأوفست عام 1998، فالوكالات الدولية في الألفينيات، وصولاً إلى إنتاجنا الخاص اليوم.', timelineTitle: 'المحطات' },
  numbers: {
    title: 'SIM بالأرقام',
    items: [
      { value: `${YEARS} عاماً`, label: `خدمة متواصلة منذ ${F.foundingYear}` },
      { value: `${CAP.ar} كجم`, label: 'الطاقة الشهرية لإنتاج الألوان الخاصة' },
      { value: F.labAvailability, label: 'مختبر الألوان الخاصة' },
      { value: `${OWN}`, label: 'علامتان خاصتان: EVA COLOR وVECTOR' },
      { value: `${DIST}`, label: 'وكالات توزيع: SAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK' },
      { value: '4 لغات', label: 'التركية والإنجليزية والروسية والعربية' },
    ],
  },
  activities: {
    title: 'ماذا نفعل',
    intro: 'التصنيع والتوزيع والمختبر تحت سقف واحد: جهة اتصال واحدة ومنظومة مواد متوافقة.',
    items: [
      { name: 'التصنيع', text: `أحبار أوفست معدنية وفلورية وألوان خاصة بعلامة EVA COLOR؛ بطانيات أوفست بعلامة VECTOR. إنتاج في إسطنبول بطاقة ${CAP.ar} كجم شهرياً.`, href: '/urunler', linkLabel: 'المنتجات' },
      { name: 'التوزيع', text: 'الموزّع الرسمي في تركيا لـ SAKATA INX (اليابان) وZeller+Gmelin (ألمانيا) وHi-Tech Coatings (هولندا) وSCHLENK (ألمانيا).', href: '/temsilcilikler', linkLabel: 'علاماتنا' },
      { name: 'المختبر والدعم الفني', text: `صياغة ألوان بهدف Delta E أقل من ${F.deltaEMax} في مختبر يعمل ${F.labAvailability}؛ دعم عند الماكينة؛ ملفات ICC والمعايير.`, href: '/ozel-renk-uretimi', linkLabel: 'إنتاج الألوان الخاصة' },
    ],
  },
  brands: { title: 'علاماتنا', intro: 'علامتان خاصتان وأربع وكالات توزيع دولية. الوثائق متاحة عند الطلب.', headers: ['العلامة', 'الدولة', 'الدور', 'مجموعة المنتجات'], linkLabel: 'جميع العلامات' },
  standards: {
    title: 'المعايير والوثائق',
    intro: 'تستند الجودة إلى معايير ووثائق قابلة للتحقق:',
    items: [
      { name: 'ISO 2846-1', text: 'أحبار الأوفست الورقي مطابقة لمعيار اللون والشفافية ISO 2846-1.' },
      { name: 'ISO 12647-2 وICC', text: 'إنشاء ملفات ICC ومعايرة الماكينات للتوحيد وفق FOGRA/GRACoL.' },
      { name: 'EuPIA', text: 'أحبار وورنيشات متوافقة مع إرشادات الرابطة الأوروبية لأحبار الطباعة.' },
      { name: 'الهجرة المنخفضة', text: 'خيارات لتغليف الأغذية متوافقة مع Swiss Ordinance وإرشادات Nestlé.' },
      { name: 'شهادات الشركاء', text: 'SAKATA INX وZeller+Gmelin حاصلتان على ISO 9001 وISO 14001.' },
      { name: 'TDS وSDS', text: 'نشرات فنية ونشرات سلامة محدثة بالإنجليزية والتركية عند الطلب.' },
    ],
    credentialsTitle: 'شهاداتنا',
  },
  team: {
    title: 'فريقنا',
    intro: `${YEARS} عاماً من الخبرة هي العمل اليومي لفرق المختبر والمبيعات الفنية واللوجستيات والتصدير. تُكتب مقالاتنا الفنية بتوقيع «فريق SIM الفني».`,
    roles: [
      { name: 'مختبر الألوان', text: 'صياغة ألوان PANTONE والخاصة، القياس الطيفي، أرشيف الوصفات.' },
      { name: 'المبيعات الفنية والدعم الميداني', text: 'الضبط عند الماكينة، حل مشكلات الجفاف والاستحلاب، تجارب الطباعة.' },
      { name: 'اللوجستيات والمستودع', text: `توصيل في اليوم نفسه داخل إسطنبول وخلال ${F.domesticLeadTimeDays} أيام عمل في تركيا.` },
      { name: 'التصدير', text: 'شحنات إلى الشرق الأوسط وآسيا الوسطى والبلقان؛ وثائق بالإنجليزية.' },
    ],
    peopleTitle: 'خبراؤنا',
    cta: 'اسأل فريقنا الفني',
  },
  exportSection: { title: 'التصدير والشراكات الدولية', text: 'تشكّل وكالات التوزيع طويلة الأمد مع مصنّعين من اليابان وألمانيا وهولندا شبكة استيرادنا، ويشكّل إنتاجنا الخاص وشحناتنا المنتظمة إلى الشرق الأوسط وآسيا الوسطى والبلقان هويتنا التصديرية. نوفر للعملاء الدوليين وثائق بالإنجليزية وعروض EXW/FOB/CIF ودعماً لوجستياً براً وبحراً وجواً.' },
  mission: { title: 'رسالتنا', text: 'تحسين جودة طباعة عملائنا عبر توريد موثوق ومنتجات متقدمة وحلول مستدامة مدعومة بالخبرة الفنية.' },
  vision: { title: 'رؤيتنا', text: 'أن نكون الشريك المرجعي في منطقتنا وشريك حلول موثوقاً على المستوى الدولي.' },
  values: {
    title: 'قيمنا',
    items: [
      { name: 'الموثوقية', text: 'نلتزم بمواعيد التسليم واللون والوثائق ونتابع المخزون والدفعات نيابة عن عملائنا.' },
      { name: 'الأمانة الفنية', text: 'نقول إن كان المنتج غير مناسب؛ نوصي بمنظومة مواد لا بصفقة بيع، ونثبت ذلك بالعينات وTDS.' },
      { name: 'البيئة والسلامة', text: 'نعطي الأولوية للخيارات منخفضة VOC والمائية ومنخفضة الهجرة، ونشارك SDS وقواعد التخزين.' },
      { name: 'الاستمرارية', text: `القطاع نفسه والعنوان نفسه منذ ${F.foundingYear}: شراكات تمتد لعقود.` },
    ],
  },
  faq: {
    title: 'أسئلة شائعة عن SIM',
    items: [
      { q: 'متى وأين تأسست SIM؟', a: `عام ${F.foundingYear} في إسطنبول؛ واليوم نعمل من مستودعنا ومختبرنا في ${ORGANIZATION.address.addressLocality}. ${YEARS} عاماً من توريد الأحبار والبطانيات والكيماويات والورنيشات دون انقطاع.` },
      { q: 'هل أنتم مصنّع أم موزّع؟', a: 'كلاهما: EVA COLOR وVECTOR علامتانا الخاصتان المصنّعتان في إسطنبول؛ وSAKATA INX وZeller+Gmelin وHi-Tech Coatings وSCHLENK نوزعها رسمياً في تركيا.' },
      { q: 'كيف يعمل مختبر الألوان الخاصة؟', a: `يعمل المختبر ${F.labAvailability}: من رمز PANTONE أو عينة أو قيمة L*a*b* يصوغ اللون بهدف Delta E أقل من ${F.deltaEMax}؛ التسليم خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة؛ الطاقة ${CAP.ar} كجم شهرياً والحد الأدنى ${F.customColorMinimumKg} كجم.` },
      { q: 'ما الوثائق والمعايير التي توفرونها؟', a: 'TDS وSDS لكل منتج، أحبار ISO 2846-1، دعم ملفات ICC وفق ISO 12647-2، إقرارات الهجرة المنخفضة، ووثيقة توزيع رسمية لكل علامة.' },
      { q: 'هل تصدّرون وبأي لغات تعملون؟', a: 'نعم: الشرق الأوسط وآسيا الوسطى والبلقان براً وبحراً وجواً. نعمل بالتركية والإنجليزية والروسية والعربية.' },
    ],
  },
  cta: { title: 'تحدث مع فريقنا الفني', text: 'لنحدد معاً منظومة المواد المناسبة لماكينتك وسطحك وعملك — بدءاً بالعينات وTDS.', button: 'تواصل معنا' },
};

export const ABOUT_CONTENT: Record<PillarLocale, AboutContent> = { tr: TR, en: EN, ru: RU, ar: AR };

export function getAboutContent(locale: string): AboutContent {
  return ABOUT_CONTENT[(locale as PillarLocale) in ABOUT_CONTENT ? (locale as PillarLocale) : 'tr'];
}

/** Marka tablosu satırları: organization.ts matrisi + pillar modülündeki yerelleştirilmiş ürün/rol metinleri (tek kaynak). */
export function aboutBrandRows(locale: string) {
  const l = (locale as PillarLocale) in PILLAR_CONTENT ? (locale as PillarLocale) : 'tr';
  const rows = PILLAR_CONTENT[l].brandRows;
  return ORGANIZATION.brands.map((b) => ({
    name: b.name,
    country: b.country,
    role: rows[b.name]?.role ?? PILLAR_CONTENT[l].brands.roles[b.role],
    products: rows[b.name]?.products ?? b.products,
  }));
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
}

export function aboutWordCount(locale: string): number {
  const l = (locale as PillarLocale) in ABOUT_CONTENT ? (locale as PillarLocale) : 'tr';
  const out: string[] = [];
  const { meta, ...body } = ABOUT_CONTENT[l];
  void meta;
  collectStrings(body, out);
  for (const t of ABOUT_TIMELINE) out.push(t.text[l]);
  return out.join(' ').split(/\s+/).filter(Boolean).length;
}
