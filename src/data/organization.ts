/**
 * Kurum kimliği — TEK KAYNAK (NAP: ad, adres, telefon; kuruluş; saatler; sosyal profiller).
 * Şema (JSON-LD), footer/iletişim metinleri, llms.txt ve GBP bu değerlerle aynı olmalıdır.
 * Değişiklik gerekirse yalnızca burada yapılır.
 */
export const BASE_URL = 'https://www.simlimited.net';

export const ORGANIZATION = {
  id: `${BASE_URL}/#organization`,
  localBusinessId: `${BASE_URL}/#localbusiness`,
  websiteId: `${BASE_URL}/#website`,
  name: 'SIM Baskı Malzemeleri',
  alternateName: 'SIM Limited',
  legalName: 'SİM Baskı Malzemeleri San. Tic. Ltd. Şti.',
  foundingDate: '1983',
  url: BASE_URL,
  logo: `${BASE_URL}/images/sim-baski-malzemeleri.webp`,
  /** E.164 — görünür metinlerde "+90 212 637 62 49" biçimi kullanılır */
  telephone: '+902126376249',
  email: 'info@simlimited.net',
  address: {
    streetAddress: 'Yakuplu Mah. 194. Sk. No:1 D:176',
    addressLocality: 'Beylikdüzü',
    addressRegion: 'İstanbul',
    postalCode: '34524',
    addressCountry: 'TR',
  },
  geo: { latitude: 40.9835, longitude: 28.6285 },
  /** İletişim sayfasındaki yayınlanan saatlerle aynı (Pzt–Cmt 08:30–18:00) */
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:30',
    closes: '18:00',
  },
  /** Doğrulanmış kurumsal profiller (entity / E-E-A-T). GBP ve Wikidata kayıtları açılınca eklenir. */
  sameAs: [
    'https://www.facebook.com/simlimited.net/',
    'https://www.linkedin.com/company/sim-bask%C4%B1-malzemeleri/',
    'https://yandex.com.tr/maps/org/sim_baski_malzemeleri_san/59607491695/',
  ],
  availableLanguage: ['Turkish', 'English', 'Russian', 'Arabic'],
  /** Sayısal olgular — sitede geçen her rakam buradan türetilir (pillar, Hakkımızda, SSS, llms). */
  facts: {
    foundingYear: 1983,
    /** Özel renk üretim kapasitesi (kg/ay) */
    customColorCapacityKgPerMonth: 15000,
    /** Özel renk laboratuvarı çalışma düzeni */
    labAvailability: '24/7',
    /** Özel renk üretiminde hedeflenen azami Delta E */
    deltaEMax: 1.5,
    /** Özel renk minimum sipariş (kg); stok ürünlerde minimum yok */
    customColorMinimumKg: 5,
    /** İstanbul içi aynı gün teslimat için sipariş saati */
    sameDayCutoff: '12:00',
    /** Türkiye geneli stok teslimat (iş günü) */
    domesticLeadTimeDays: '1–2',
    /** Özel renk teslimi, numune onayından sonra (iş günü) */
    customColorLeadTimeDays: '1–3',
    /** İhracat yapılan ana bölgeler */
    exportRegions: { tr: 'Orta Doğu, Orta Asya ve Balkanlar', en: 'the Middle East, Central Asia and the Balkans' },
  },
  /** Konumlanma cümlesi — şema description, llms.txt, GBP ve Hakkımızda ile aynı olgular */
  positioning: {
    tr: "SIM Baskı Malzemeleri — 1983'ten beri Türkiye matbaa sektörünün mürekkep ve baskı malzemesi referansı: EVA COLOR ve VECTOR üreticisi; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK Türkiye distribütörü; İstanbul'da 24/7 özel renk laboratuvarı.",
    en: "SIM Printing Supplies — Turkey's printing ink and supplies reference since 1983: manufacturer of EVA COLOR inks and VECTOR blankets; Turkish distributor of SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK; 24/7 custom colour laboratory in Istanbul.",
  },
  /**
   * Hizmet alanları (İstanbul ilçeleri) — yerel sayfa teslimat tablosu ve LocalBusiness.areaServed aynı listeden üretilir.
   * delivery: sameDay = stok ürünlerde aynı gün (12:00'ye kadar sipariş) · sameOrNext = aynı gün veya ertesi iş günü (planlı sevkiyat)
   */
  serviceAreas: [
    { name: 'Beylikdüzü', area: 'Yakuplu, Gürpınar', side: 'europe', delivery: 'sameDay' },
    { name: 'Esenyurt', side: 'europe', delivery: 'sameDay' },
    { name: 'Avcılar', side: 'europe', delivery: 'sameDay' },
    { name: 'Büyükçekmece', side: 'europe', delivery: 'sameDay' },
    { name: 'Başakşehir', area: 'İkitelli OSB', side: 'europe', delivery: 'sameDay' },
    { name: 'Bağcılar', area: 'Güneşli', side: 'europe', delivery: 'sameDay' },
    { name: 'Küçükçekmece', area: 'Sefaköy', side: 'europe', delivery: 'sameDay' },
    { name: 'Bayrampaşa', area: 'Matbaacılar Sitesi', side: 'europe', delivery: 'sameDay' },
    { name: 'Zeytinburnu', area: 'Topkapı', side: 'europe', delivery: 'sameDay' },
    { name: 'Bahçelievler', side: 'europe', delivery: 'sameDay' },
    { name: 'Gaziosmanpaşa', side: 'europe', delivery: 'sameDay' },
    { name: 'Eyüpsultan', side: 'europe', delivery: 'sameDay' },
    { name: 'Ümraniye', area: 'Dudullu OSB', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Ataşehir', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Maltepe', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Kartal', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Pendik', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Tuzla', side: 'asia', delivery: 'sameOrNext' },
    { name: 'Sancaktepe', side: 'asia', delivery: 'sameOrNext' },
  ],
  /** Marka matrisi (tek kaynak): rol = own (üretici) | distributor */
  brands: [
    { name: 'EVA COLOR', country: 'TR', role: 'own', products: 'metallic, fluorescent and custom offset inks' },
    { name: 'VECTOR', country: 'TR', role: 'own', products: 'offset printing blankets' },
    { name: 'SAKATA INX', country: 'JP', role: 'distributor', products: 'CMYK and PANTONE offset inks', since: '2002' },
    { name: 'Zeller+Gmelin', country: 'DE', role: 'distributor', products: 'UV offset inks' },
    { name: 'Hi-Tech Coatings', country: 'NL', role: 'distributor', products: 'water-based dispersion varnishes' },
    { name: 'SCHLENK', country: 'DE', role: 'distributor', products: 'metallic inks and pigments' },
  ],
} as const;

/** E.164 → görünür biçim: +90 212 637 62 49 */
export function formatTelephone(e164: string = ORGANIZATION.telephone): string {
  const d = e164.replace('+90', '');
  return `+90 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

/** Tek satır posta adresi (footer, iletişim, llms) */
export function formatAddress(): string {
  const a = ORGANIZATION.address;
  return `${a.streetAddress}, ${a.postalCode} ${a.addressLocality}/${a.addressRegion}`;
}

/** Kuruluştan bu yana geçen yıl (build zamanında hesaplanır; yıllık yeniden build ile güncellenir). */
export function yearsSinceFounding(now: Date = new Date()): number {
  return now.getFullYear() - ORGANIZATION.facts.foundingYear;
}

/** 15000 → "15.000" (TR) | "15,000" (EN) */
export function formatThousands(n: number, locale: 'tr' | 'en' | 'ru' | 'ar' = 'tr'): string {
  const sep = locale === 'tr' ? '.' : locale === 'ru' ? ' ' : ',';
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

const DAY_NAMES = {
  tr: { Monday: 'Pazartesi', Tuesday: 'Salı', Wednesday: 'Çarşamba', Thursday: 'Perşembe', Friday: 'Cuma', Saturday: 'Cumartesi', Sunday: 'Pazar' },
  en: { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' },
  ru: { Monday: 'Понедельник', Tuesday: 'Вторник', Wednesday: 'Среда', Thursday: 'Четверг', Friday: 'Пятница', Saturday: 'Суббота', Sunday: 'Воскресенье' },
  ar: { Monday: 'الإثنين', Tuesday: 'الثلاثاء', Wednesday: 'الأربعاء', Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت', Sunday: 'الأحد' },
} as const;

/** "Pazartesi–Cumartesi 08:30–18:00" — tek kaynak openingHours'tan, görünür metinler için */
export function formatOpeningHours(locale: 'tr' | 'en' | 'ru' | 'ar' = 'tr'): string {
  const names = DAY_NAMES[locale] ?? DAY_NAMES.tr;
  const days = ORGANIZATION.openingHours.dayOfWeek;
  const first = names[days[0] as keyof typeof names];
  const last = names[days[days.length - 1] as keyof typeof names];
  return `${first}–${last} ${ORGANIZATION.openingHours.opens}–${ORGANIZATION.openingHours.closes}`;
}
