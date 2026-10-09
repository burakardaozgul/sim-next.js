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
} as const;
