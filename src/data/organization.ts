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
  /** Konumlanma cümlesi — şema description, llms.txt, GBP ve Hakkımızda ile aynı olgular */
  positioning: {
    tr: "SIM Baskı Malzemeleri — 1983'ten beri Türkiye matbaa sektörünün mürekkep ve baskı malzemesi referansı: EVA COLOR ve VECTOR üreticisi; SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings ve SCHLENK Türkiye distribütörü; İstanbul'da 24/7 özel renk laboratuvarı.",
    en: "SIM Printing Supplies — Turkey's printing ink and supplies reference since 1983: manufacturer of EVA COLOR inks and VECTOR blankets; Turkish distributor of SAKATA INX, Zeller+Gmelin, Hi-Tech Coatings and SCHLENK; 24/7 custom colour laboratory in Istanbul.",
  },
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
