/**
 * İstanbul yerel sayfası içeriği — /matbaa-malzemeleri-istanbul (brief F).
 * Yerel niyet: "İstanbul matbaa malzemeleri", "matbaa en yakın", Beylikdüzü, aynı gün teslimat. Genel kelime pillar'a bırakılır.
 * NAP ve hizmet alanları organization.ts'ten türetilir (LocalBusiness şemasıyla aynı kaynak).
 */
import { ORGANIZATION, formatOpeningHours, formatAddress, formatTelephone } from '@/data/organization';
import type { PillarLocale } from '@/data/pillar-matbaa-malzemeleri';

type L<T = string> = Record<PillarLocale, T>;

export interface IstanbulContent {
  meta: { title: string; description: string; keywords: string[] };
  pageName: string;
  hero: { eyebrow: string; h1: string; lead: string };
  intro: { title: string; text: string; pillarText: string; pillarLink: string };
  location: { title: string; address: string; phone: string; hours: string; hoursLabel: string; directionsLabel: string; mapTitle: string };
  districts: { title: string; intro: string; headers: [string, string, string]; sideLabels: { europe: string; asia: string }; deliveryLabels: { sameDay: string; sameOrNext: string }; regionsText: string };
  transport: { title: string; text: string };
  pickup: { title: string; text: string };
  stock: { title: string; intro: string; items: { name: string; text: string }[] };
  services: { title: string; items: string[] };
  why: { title: string; items: { name: string; text: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  related: { title: string; pillar: string; offset: string; custom: string; contact: string };
  cta: { title: string; text: string; button: string };
}

const F = ORGANIZATION.facts;
const ADDR = formatAddress();
const PHONE = formatTelephone();
const HOURS = { tr: formatOpeningHours('tr'), en: formatOpeningHours('en'), ru: formatOpeningHours('ru'), ar: formatOpeningHours('ar') };
const EU = ORGANIZATION.serviceAreas.filter((d) => d.side === 'europe').map((d) => d.name).join(', ');
const ASIA = ORGANIZATION.serviceAreas.filter((d) => d.side === 'asia').map((d) => d.name).join(', ');

export const ISTANBUL_MAP_EMBED = `https://www.google.com/maps?q=${ORGANIZATION.geo.latitude},${ORGANIZATION.geo.longitude}&z=15&output=embed`;
export const ISTANBUL_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${ORGANIZATION.geo.latitude},${ORGANIZATION.geo.longitude}`;

const TR: IstanbulContent = {
  meta: {
    title: 'İstanbul Matbaa Malzemeleri Tedarikçisi | Beylikdüzü Depo',
    description: `İstanbul'daki matbaalara Beylikdüzü depomuzdan aynı gün teslimat: ofset ve PANTONE mürekkep, metalik, UV, blanket, kimyasal, lak. Depodan elden teslim ve yerinde teknik destek.`,
    keywords: ['matbaa malzemeleri istanbul', 'istanbul matbaa malzemeleri', 'matbaa en yakın', 'beylikdüzü matbaa malzemeleri', 'ofset mürekkep istanbul', 'matbaa tedarikçisi istanbul', 'baskı malzemeleri istanbul', 'matbaa malzemeleri beylikdüzü', 'esenyurt matbaa malzemeleri', 'bayrampaşa matbaacılar sitesi mürekkep'],
  },
  pageName: "İstanbul'da Matbaa Malzemeleri",
  hero: {
    eyebrow: "Beylikdüzü · Yakuplu · İstanbul'un tüm matbaa bölgeleri",
    h1: "İstanbul Matbaa Malzemeleri Tedarikçisi: Beylikdüzü'nden Aynı Gün Teslimat",
    lead: `${F.foundingYear}'ten beri İstanbul'da: Beylikdüzü Yakuplu'daki merkez depo ve ${F.labAvailability} özel renk laboratuvarımızdan Avrupa Yakası'na stok ürünlerde aynı gün (${F.sameDayCutoff}'ye kadar sipariş), Anadolu Yakası'na aynı gün veya ertesi iş günü teslimat. Depodan elden teslim, makine başında teknik destek ve numune onayını laboratuvarda birlikte yapma imkânı.`,
  },
  intro: {
    title: 'İstanbul matbaa sektörüne en yakın tedarikçi',
    text: "İstanbul, Türkiye matbaa ve ambalaj üretiminin merkezi: Topkapı ve Bayrampaşa'daki geleneksel matbaa siteleri, Bağcılar–Güneşli ticari baskı kümesi, İkitelli ve Beylikdüzü'ndeki ambalaj tesisleri, Anadolu Yakası'nda Dudullu ve Tuzla organize sanayi bölgeleri. Bu yoğunlukta tedarikçinin yakınlığı bir konfor değil, üretim sürekliliğidir: baskı ortasında biten mürekkep, hasar gören blanket veya acil bir PANTONE tonu için kargo beklemek vardiya kaybıdır. SIM, kendi sevkiyat ağı ve şehir içindeki laboratuvarıyla bu boşluğu kapatır.",
    pillarText: 'Tüm ürün gruplarını, seçim kriterlerini ve fiyatları etkileyen faktörleri kapsamlı rehberimizde bulabilirsiniz:',
    pillarLink: 'Matbaa Malzemeleri Rehberi',
  },
  location: {
    title: 'Depo, laboratuvar ve iletişim',
    address: ADDR,
    phone: PHONE,
    hours: HOURS.tr,
    hoursLabel: 'Çalışma saatleri',
    directionsLabel: 'Yol tarifi al',
    mapTitle: 'SIM Baskı Malzemeleri Beylikdüzü depo ve laboratuvar konumu',
  },
  districts: {
    title: "İlçe ilçe teslimat süreleri",
    intro: `Stok ürünlerde (CMYK ve PANTONE setleri, metalik ve floresan seriler, UV mürekkep, blanket, kimyasal ve lak) sevkiyat Beylikdüzü'den kendi araçlarımızla yapılır. Avrupa Yakası'nda ${F.sameDayCutoff}'ye kadar verilen siparişler aynı gün, Anadolu Yakası siparişleri aynı gün veya ertesi iş günü planlı rotayla teslim edilir. Özel renkler numune onayından sonra ${F.customColorLeadTimeDays} iş günü içinde hazırlanır ve aynı ağla ulaştırılır.`,
    headers: ['İlçe / bölge', 'Yaka', 'Stok ürün teslimat'],
    sideLabels: { europe: 'Avrupa', asia: 'Anadolu' },
    deliveryLabels: { sameDay: `Aynı gün (${F.sameDayCutoff}'ye kadar sipariş)`, sameOrNext: 'Aynı gün veya ertesi iş günü (planlı sevkiyat)' },
    regionsText: `Avrupa Yakası: ${EU}. Anadolu Yakası: ${ASIA}. Listede olmayan ilçeler (Silivri, Çatalca, Arnavutköy, Şile, Beykoz gibi) için teslimat planını telefonla teyit ediyoruz; genellikle ertesi iş günü planlı rotaya alınır. İstanbul dışına Türkiye geneli ${F.domesticLeadTimeDays} iş günü içinde kargo ile ulaşıyor, düzenli müşteriler için haftalık sevkiyat günü belirliyoruz. Matbaacılar Sitesi, İkitelli OSB ve Dudullu OSB gibi yoğun bölgelerde aynı gün birden fazla tur yapılır.`,
  },
  transport: {
    title: 'Ulaşım: E-5, TEM ve Ambarlı',
    text: "Depomuz Beylikdüzü Yakuplu'da, E-5 (D-100) Beylikdüzü–Yakuplu çıkışına ve TEM Esenyurt–Hadımköy bağlantısına birkaç dakika mesafededir; Ambarlı Limanı'na komşu olmamız ithal ürünlerin gümrükten depoya aynı gün aktarılmasını sağlar. Avrupa Yakası'ndaki matbaa bölgelerine E-5 üzerinden 20–45 dakikada, Anadolu Yakası'na TEM ve Kuzey Marmara Otoyolu üzerinden planlı rotayla ulaşılır. Metrobüs Beylikdüzü durağı ve E-5 bağlantısı, elden teslim için gelen müşterilerimizin de kolayca ulaşmasını sağlar; depo önünde araç park alanı mevcuttur, forklift ile bidon ve palet yüklemesi yapılır.",
  },
  pickup: {
    title: 'Depodan elden teslim',
    text: `Acil işlerde en hızlı yol elden teslimdir: ${HOURS.tr} saatleri arasında Beylikdüzü depomuzdan ürünlerinizi teslim alabilir, sipariş öncesinde ürünleri ve ambalajları yerinde inceleyebilirsiniz. Gelmeden önce telefonla stok teyidi almanızı ve ürünün ayrılmasını istemenizi öneririz; laboratuvar numunelerini de aynı ziyarette teslim alabilirsiniz. Elden teslimde fatura ve irsaliye anında düzenlenir; kurumsal müşteriler için cari hesap çalışması mümkündür.`,
  },
  stock: {
    title: "İstanbul deposunda sürekli stokta tutulan ürünler",
    intro: 'Aşağıdaki gruplar Beylikdüzü deposunda düzenli stoklanır; makineniz ve kâğıdınıza göre doğru seriyi telefonla teyit edebilirsiniz. Stokta olmayan özel ürünler için tedarik süresini sipariş anında bildiriyor, kritik kalemler için müşteriye özel stok anlaşması yapıyoruz.',
    items: [
      { name: 'Ofset CMYK ve PANTONE mürekkepler', text: 'SAKATA INX tabaka ofset setleri ve PANTONE temel renkleri; 1 ve 2,5 kg kutular.' },
      { name: 'Metalik ve floresan mürekkepler', text: 'EVA COLOR Gold, Silver ve floresan serileri (PANTONE 871–877, 801–814 referansları); SCHLENK pigmentleri.' },
      { name: 'UV ofset mürekkepleri', text: 'Zeller+Gmelin UV ve LED-UV serileri; gıda ambalajı için düşük migrasyonlu seçenekler.' },
      { name: 'Baskı blanketleri', text: 'VECTOR blanketleri makineye göre kesilmiş, çubuklu veya çubuksuz; konvansiyonel ve UV uyumlu tipler.' },
      { name: 'Baskı kimyasalları', text: 'Nemlendirme katkıları ve IPA alternatifleri, blanket ve merdane yıkama solventleri, kalıp temizleyici, kurutucu, toz.' },
      { name: 'Dispersiyon laklar', text: 'Hi-Tech Coatings parlak, mat, soft-touch, blister ve yapıştırılabilir laklar; 20 kg bidon ve IBC.' },
    ],
  },
  services: {
    title: "İstanbul'a sunduğumuz hizmetler",
    items: [
      `Stok ürünlerde aynı gün teslimat (${F.sameDayCutoff}'ye kadar verilen siparişler)`,
      'Makine başında teknik destek: renk, kuruma ve emülsifikasyon problemleri, mürekkep ayarı',
      `${F.labAvailability} özel renk laboratuvarı: PANTONE ve kurumsal renk formülasyonu, Delta E < ${String(F.deltaEMax).replace('.', ',')} hedefi`,
      'ICC profil oluşturma ve ISO 12647-2 hedefli baskı standardizasyonu',
      'Depodan elden teslim, numune ve TDS/SDS paylaşımı, stok danışmanlığı',
    ],
  },
  why: {
    title: 'Neden İstanbul içinden bir tedarikçi?',
    items: [
      { name: 'Saatler içinde teslimat', text: 'Baskı ortasında biten mürekkep veya hasar gören blanket için kargo beklemek üretim kaybıdır. Şehir içi araç ağımız stok ürünleri aynı gün ulaştırır.' },
      { name: 'Laboratuvara fiziksel yakınlık', text: 'Özel renk çalışmasında numunenizi elden getirip reçete onayını laboratuvarda birlikte yapabilirsiniz; ıslak numune ile ölçülen değer arasındaki fark aynı gün kapanır.' },
      { name: 'Yerinde teknik servis', text: 'Renk tutmama, emülsifikasyon veya kuruma problemi yaşadığınızda teknik ekibimiz İstanbul içinde aynı gün makinenizin başında olur.' },
      { name: 'Tek muhatap, uyumlu sistem', text: 'Mürekkep, blanket ve kimyasalı aynı depodan, birbiriyle uyumlu olarak alırsınız; uyumsuzluk kaynaklı şişme, tonlama ve set-off problemleri ortadan kalkar.' },
    ],
  },
  faq: {
    title: "İstanbul'da matbaa malzemesi tedariki: sık sorulanlar",
    items: [
      { q: "İstanbul'da matbaa malzemeleri deponuz nerede?", a: `Depomuz, satış ofisimiz ve renk laboratuvarımız ${ADDR} adresindedir; E-5 Beylikdüzü–Yakuplu çıkışına ve TEM bağlantısına yakındır. Avrupa Yakası'ndaki matbaa bölgelerine aynı gün, Anadolu Yakası'na planlı rotayla ulaşırız.` },
      { q: 'Hangi ilçelere aynı gün teslimat yapıyorsunuz?', a: `Stok ürünlerde Avrupa Yakası'nda ${EU} ilçelerine ${F.sameDayCutoff}'ye kadar verilen siparişlerde aynı gün teslimat yapıyoruz. Anadolu Yakası (${ASIA}) sevkiyatları aynı gün veya ertesi iş günü planlanır.` },
      { q: 'Acil mürekkep ihtiyacında en hızlı çözüm nedir?', a: `Mesai saatleri içinde iletilen acil taleplerde stok ürünler İstanbul içinde genellikle aynı gün teslim edilir. En hızlı seçenek depodan elden teslimdir: telefonla ürünü ayırtın, ${HOURS.tr} arasında Beylikdüzü'den teslim alın.` },
      { q: 'Depodan elden teslim alabilir miyim, ürünleri görebilir miyim?', a: `Evet. ${HOURS.tr} arasında Beylikdüzü depomuzdan elden teslim alabilir, sipariş öncesi ürünleri ve ambalajları yerinde inceleyebilirsiniz. Laboratuvar numunelerinizi de aynı ziyarette teslim alırsınız.` },
      { q: 'Özel renk için İstanbul içinde ne kadar sürede teslim alırım?', a: `Laboratuvar ${F.labAvailability} çalışır; PANTONE kodu, baskılı numune veya L*a*b* değeri yeterlidir. Numune onayından sonra üretim ${F.customColorLeadTimeDays} iş günü sürer ve aynı sevkiyat ağıyla teslim edilir; minimum özel renk siparişi ${F.customColorMinimumKg} kg'dır.` },
      { q: "İstanbul dışından sipariş verebilir miyim?", a: `Evet. Türkiye genelindeki matbaalara stok ürünlerde ${F.domesticLeadTimeDays} iş günü içinde kargo ile sevkiyat yapıyoruz; düzenli müşteriler için haftalık sevkiyat planı oluşturuyoruz. İhracat siparişleri için İngilizce belge ve lojistik desteği sağlıyoruz.` },
    ],
  },
  related: { title: 'İlgili kaynaklar', pillar: 'Matbaa Malzemeleri Rehberi', offset: 'Ofset Baskı Malzemeleri Rehberi', custom: 'Özel Renk Üretimi', contact: 'İletişim ve teklif' },
  cta: {
    title: "İstanbul'da matbaa malzemesi için bizi arayın",
    text: 'Stok teyidi, aynı gün sevkiyat ve makine başında teknik destek için satış ekibimizle konuşun.',
    button: 'Hemen ara',
  },
};

const EN: IstanbulContent = {
  meta: {
    title: 'Printing Supplies in Istanbul | Same-Day from Beylikdüzü',
    description: 'Same-day delivery to printers across Istanbul from our Beylikdüzü warehouse: offset and PANTONE inks, metallic, UV, blankets, chemicals and varnish. Warehouse pickup and press-side support.',
    keywords: ['printing materials Istanbul', 'printing supplies Istanbul', 'offset ink Istanbul', 'printing supplier Istanbul', 'Beylikdüzü printing supplies', 'printing supplies near me Istanbul'],
  },
  pageName: 'Printing Materials in Istanbul',
  hero: {
    eyebrow: "Beylikdüzü · Yakuplu · all of Istanbul's printing districts",
    h1: 'Printing Supplies Supplier in Istanbul: Same-Day Delivery from Beylikdüzü',
    lead: `In Istanbul since ${F.foundingYear}: from our central warehouse and ${F.labAvailability} custom colour laboratory in Beylikdüzü Yakuplu we deliver stock items the same day on the European side (orders by ${F.sameDayCutoff}) and the same or next working day on the Asian side. Warehouse pickup, press-side technical support and sample approval together at the laboratory.`,
  },
  intro: {
    title: "The closest supplier to Istanbul's printing industry",
    text: "Istanbul is the centre of Turkish printing and packaging: the traditional printers' complexes of Topkapı and Bayrampaşa, the commercial print cluster of Bağcılar–Güneşli, packaging plants in İkitelli and Beylikdüzü, and the Dudullu and Tuzla industrial zones on the Asian side. At this density a nearby supplier is not a convenience but production continuity: waiting for a courier when ink runs out mid-run, a blanket is damaged or an urgent PANTONE shade is needed costs a shift. SIM closes that gap with its own delivery fleet and an in-city laboratory.",
    pillarText: 'All product groups, selection criteria and the factors behind pricing are covered in our complete guide:',
    pillarLink: 'Printing Materials Guide',
  },
  location: {
    title: 'Warehouse, laboratory and contact',
    address: ADDR,
    phone: PHONE,
    hours: HOURS.en,
    hoursLabel: 'Working hours',
    directionsLabel: 'Get directions',
    mapTitle: 'SIM Printing Supplies Beylikdüzü warehouse and laboratory location',
  },
  districts: {
    title: 'Delivery times district by district',
    intro: `Stock items (CMYK and PANTONE sets, metallic and fluorescent series, UV ink, blankets, chemicals and varnish) ship from Beylikdüzü in our own vehicles. Orders placed by ${F.sameDayCutoff} are delivered the same day on the European side; Asian-side orders go out the same or next working day on a planned route. Custom colours are ready ${F.customColorLeadTimeDays} working days after sample approval and travel on the same network.`,
    headers: ['District / area', 'Side', 'Stock item delivery'],
    sideLabels: { europe: 'European', asia: 'Asian' },
    deliveryLabels: { sameDay: `Same day (order by ${F.sameDayCutoff})`, sameOrNext: 'Same or next working day (planned route)' },
    regionsText: `European side: ${EU}. Asian side: ${ASIA}. For districts not listed we confirm the delivery plan by phone; outside Istanbul we ship across Turkey within ${F.domesticLeadTimeDays} working days and export by road, sea or air.`,
  },
  transport: {
    title: 'Access: E-5, TEM and Ambarlı',
    text: 'Our warehouse in Beylikdüzü Yakuplu is minutes from the E-5 (D-100) Beylikdüzü–Yakuplu exit and the TEM Esenyurt–Hadımköy connection; being next to Ambarlı Port lets imported products move from customs to the warehouse the same day. European-side printing districts are reached in 20–45 minutes via the E-5, the Asian side via the TEM and the Northern Marmara Motorway on a planned route. The Beylikdüzü Metrobüs stop and the E-5 connection make pickup visits easy as well. For export, Ambarlı Port handles sea freight and Istanbul Airport is about an hour away for air cargo.',
  },
  pickup: {
    title: 'Warehouse pickup',
    text: `For urgent jobs the fastest route is pickup: collect your products from the Beylikdüzü warehouse ${HOURS.en}, and inspect products and packaging before ordering. Call ahead to confirm stock and have the item set aside; laboratory samples can be collected on the same visit.`,
  },
  stock: {
    title: 'Permanently stocked in the Istanbul warehouse',
    intro: 'The groups below are kept in regular stock; confirm the right series for your press and paper by phone.',
    items: [
      { name: 'Offset CMYK and PANTONE inks', text: 'SAKATA INX sheetfed sets and PANTONE base colours; 1 kg and 2.5 kg cans.' },
      { name: 'Metallic and fluorescent inks', text: 'EVA COLOR Gold, Silver and fluorescent series (PANTONE 871–877, 801–814 references); SCHLENK pigments.' },
      { name: 'UV offset inks', text: 'Zeller+Gmelin UV and LED-UV series; low-migration options for food packaging.' },
      { name: 'Printing blankets', text: 'VECTOR blankets cut to press size, with or without bars; conventional and UV-compatible grades.' },
      { name: 'Pressroom chemicals', text: 'Fountain additives and IPA replacements, blanket and roller washes, plate cleaner, driers, powder.' },
      { name: 'Dispersion varnishes', text: 'Hi-Tech Coatings gloss, matte, soft-touch, blister and glueable varnishes; 20 kg drums and IBCs.' },
    ],
  },
  services: {
    title: 'Services for Istanbul',
    items: [
      `Same-day delivery of stock items (orders by ${F.sameDayCutoff})`,
      'Press-side technical support: colour, drying and emulsification problems, ink settings',
      `${F.labAvailability} custom colour laboratory: PANTONE and brand colour formulation, Delta E below ${F.deltaEMax}`,
      'ICC profile creation and ISO 12647-2 print standardisation',
      'Warehouse pickup, samples and TDS/SDS, stock consulting',
    ],
  },
  why: {
    title: 'Why a supplier based in Istanbul?',
    items: [
      { name: 'Delivery within hours', text: 'Waiting for a courier when ink runs out mid-run or a blanket is damaged means lost production. Our in-city fleet delivers stock items the same day.' },
      { name: 'Physical proximity to the laboratory', text: 'For custom colour work you can bring your sample in person and approve the recipe together at the laboratory; the gap between wet sample and measured value closes the same day.' },
      { name: 'On-site technical service', text: 'For colour, emulsification or drying problems our technical team is at your press the same day anywhere in Istanbul.' },
      { name: 'One counterpart, a matched system', text: 'Ink, blanket and chemicals come from the same warehouse, matched to each other; swelling, toning and set-off caused by incompatibility disappear.' },
    ],
  },
  faq: {
    title: 'Printing material supply in Istanbul: FAQ',
    items: [
      { q: 'Where is your printing materials warehouse in Istanbul?', a: `Our warehouse, sales office and colour laboratory are at ${ADDR}, close to the E-5 Beylikdüzü–Yakuplu exit and the TEM connection. We reach European-side printing districts the same day and the Asian side on a planned route.` },
      { q: 'Which districts get same-day delivery?', a: `For stock items we deliver the same day to ${EU} on the European side for orders placed by ${F.sameDayCutoff}. Asian-side deliveries (${ASIA}) are scheduled the same or next working day.` },
      { q: 'What is the fastest option in an ink emergency?', a: `Urgent requests received during working hours are usually delivered within the same day in Istanbul. The fastest option is pickup: call to reserve the product and collect it in Beylikdüzü ${HOURS.en}.` },
      { q: 'Can I pick up from the warehouse and see the products?', a: `Yes. Pickup is available ${HOURS.en} from the Beylikdüzü warehouse, and you can inspect products and packaging before ordering. Laboratory samples can be collected on the same visit.` },
      { q: 'How fast can I get a custom colour within Istanbul?', a: `The laboratory runs ${F.labAvailability}; a PANTONE code, printed sample or L*a*b* value is enough. Production takes ${F.customColorLeadTimeDays} working days after sample approval and ships on the same network; the minimum custom order is ${F.customColorMinimumKg} kg.` },
      { q: 'Can I order from outside Istanbul or from abroad?', a: `Yes. We ship stock items to printers across Turkey within ${F.domesticLeadTimeDays} working days and set up weekly schedules for regular customers. Export orders receive English documentation and road, sea or air freight support.` },
    ],
  },
  related: { title: 'Related resources', pillar: 'Printing Materials Guide', offset: 'Offset Printing Supplies Guide', custom: 'Custom Colour Production', contact: 'Contact and quotation' },
  cta: {
    title: 'Call us for printing materials in Istanbul',
    text: 'Talk to our sales team for stock confirmation, same-day dispatch and press-side technical support.',
    button: 'Call now',
  },
};

const RU: IstanbulContent = {
  meta: {
    title: 'Полиграфические материалы в Стамбуле | Доставка в тот же день',
    description: 'Доставка типографиям Стамбула в тот же день со склада в Бейликдюзю: офсетные и PANTONE краски, металлик, УФ, полотна, химия и лаки. Самовывоз и поддержка у машины.',
    keywords: ['полиграфические материалы Стамбул', 'офсетные краски Стамбул', 'поставщик печатных материалов Стамбул', 'Бейликдюзю типография'],
  },
  pageName: 'Полиграфические материалы в Стамбуле',
  hero: {
    eyebrow: 'Бейликдюзю · Якуплу · все полиграфические районы Стамбула',
    h1: 'Поставщик полиграфических материалов в Стамбуле: доставка в тот же день из Бейликдюзю',
    lead: `В Стамбуле с ${F.foundingYear} года: со склада и лаборатории цвета ${F.labAvailability} в Бейликдюзю (Якуплу) складские позиции доставляются в тот же день по европейской стороне (заказ до ${F.sameDayCutoff}) и в тот же или на следующий рабочий день по азиатской. Самовывоз, поддержка у машины и утверждение образца в лаборатории.`,
  },
  intro: {
    title: 'Ближайший поставщик для полиграфии Стамбула',
    text: 'Стамбул — центр турецкой полиграфии и упаковки: типографские комплексы Топкапы и Байрампаши, кластер коммерческой печати Багджилар–Гюнешли, упаковочные предприятия Икителли и Бейликдюзю, промзоны Дудуллу и Тузла на азиатской стороне. При такой плотности близость поставщика — это непрерывность производства: ожидание курьера, когда краска закончилась посреди тиража, стоит смены. SIM закрывает этот разрыв собственным транспортом и городской лабораторией.',
    pillarText: 'Все группы продукции, критерии выбора и факторы цены — в нашем полном руководстве:',
    pillarLink: 'Руководство по полиграфическим материалам',
  },
  location: { title: 'Склад, лаборатория и контакты', address: ADDR, phone: PHONE, hours: HOURS.ru, hoursLabel: 'Часы работы', directionsLabel: 'Построить маршрут', mapTitle: 'Склад и лаборатория SIM в Бейликдюзю' },
  districts: {
    title: 'Сроки доставки по районам',
    intro: `Складские позиции (наборы CMYK и PANTONE, металлик и флуоресцентные серии, УФ-краски, полотна, химия, лаки) отгружаются из Бейликдюзю нашим транспортом. Заказы до ${F.sameDayCutoff} — в тот же день по европейской стороне; азиатская сторона — в тот же или на следующий рабочий день. Цвета на заказ готовы через ${F.customColorLeadTimeDays} рабочих дня после утверждения образца.`,
    headers: ['Район', 'Сторона', 'Доставка складских позиций'],
    sideLabels: { europe: 'Европейская', asia: 'Азиатская' },
    deliveryLabels: { sameDay: `В тот же день (заказ до ${F.sameDayCutoff})`, sameOrNext: 'В тот же или на следующий рабочий день' },
    regionsText: `Европейская сторона: ${EU}. Азиатская сторона: ${ASIA}. По Турции — ${F.domesticLeadTimeDays} рабочих дня, экспорт авто, морем и авиа.`,
  },
  transport: { title: 'Как добраться: E-5, TEM и Амбарлы', text: 'Склад в Бейликдюзю (Якуплу) находится в нескольких минутах от съезда E-5 Бейликдюзю–Якуплу и развязки TEM Эсеньюрт–Хадымкёй; соседство с портом Амбарлы позволяет перемещать импорт с таможни на склад в тот же день. До полиграфических районов европейской стороны — 20–45 минут по E-5, до азиатской — по TEM и Северной Мраморной автомагистрали. Остановка метробуса Бейликдюзю удобна для самовывоза.' },
  pickup: { title: 'Самовывоз со склада', text: `Для срочных работ самый быстрый путь — самовывоз: ${HOURS.ru} со склада в Бейликдюзю, с возможностью осмотреть продукцию и упаковку перед заказом. Позвоните заранее, чтобы подтвердить наличие и зарезервировать товар; образцы из лаборатории можно забрать в тот же визит.` },
  stock: {
    title: 'Постоянно на складе в Стамбуле',
    intro: 'Указанные группы поддерживаются в наличии; подходящую серию для вашей машины и бумаги подтвердите по телефону.',
    items: [
      { name: 'Офсетные CMYK и PANTONE краски', text: 'Листовые наборы SAKATA INX и базовые цвета PANTONE; банки 1 и 2,5 кг.' },
      { name: 'Металлик и флуоресцентные краски', text: 'Серии EVA COLOR Gold, Silver и флуоресцентные (PANTONE 871–877, 801–814); пигменты SCHLENK.' },
      { name: 'УФ-офсетные краски', text: 'Серии Zeller+Gmelin UV и LED-UV; низкомиграционные варианты для пищевой упаковки.' },
      { name: 'Офсетные полотна', text: 'Полотна VECTOR, нарезанные под машину, с планками или без; обычные и УФ-совместимые.' },
      { name: 'Печатная химия', text: 'Добавки в увлажнение и заменители ИПС, смывки, очистители форм, сиккативы, порошок.' },
      { name: 'Дисперсионные лаки', text: 'Hi-Tech Coatings глянцевые, матовые, soft-touch, блистерные и склеиваемые; канистры 20 кг и IBC.' },
    ],
  },
  services: { title: 'Услуги для Стамбула', items: [`Доставка складских позиций в тот же день (заказ до ${F.sameDayCutoff})`, 'Техподдержка у машины: цвет, сушка, эмульгирование, настройка краски', `Лаборатория цвета ${F.labAvailability}: PANTONE и фирменные цвета, Delta E ниже ${String(F.deltaEMax).replace('.', ',')}`, 'ICC-профили и стандартизация печати по ISO 12647-2', 'Самовывоз, образцы и TDS/SDS, консультации по запасам'] },
  why: {
    title: 'Почему поставщик из Стамбула?',
    items: [
      { name: 'Доставка за часы', text: 'Ждать курьера, когда краска закончилась посреди тиража, — значит терять производство. Городской транспорт доставляет складские позиции в тот же день.' },
      { name: 'Близость к лаборатории', text: 'Образец можно привезти лично и утвердить рецептуру в лаборатории; разница между «мокрым» образцом и измеренным значением закрывается в тот же день.' },
      { name: 'Выездной сервис', text: 'При проблемах с цветом, эмульгированием или сушкой техническая команда в тот же день у вашей машины в любой точке Стамбула.' },
      { name: 'Один контрагент, согласованная система', text: 'Краска, полотно и химия с одного склада, совместимые друг с другом; исчезают набухание, тонирование и отмарывание из-за несовместимости.' },
    ],
  },
  faq: {
    title: 'Поставки в Стамбуле: вопросы и ответы',
    items: [
      { q: 'Где находится ваш склад в Стамбуле?', a: `Склад, офис продаж и лаборатория цвета — по адресу ${ADDR}, рядом со съездом E-5 Бейликдюзю–Якуплу и развязкой TEM.` },
      { q: 'В какие районы доставка в тот же день?', a: `Складские позиции — в тот же день по европейской стороне (${EU}) при заказе до ${F.sameDayCutoff}; азиатская сторона (${ASIA}) — в тот же или на следующий рабочий день.` },
      { q: 'Как быстро получить краску в экстренном случае?', a: `Срочные заявки в рабочие часы обычно выполняются в тот же день. Самый быстрый вариант — самовывоз: зарезервируйте товар по телефону и заберите в Бейликдюзю ${HOURS.ru}.` },
      { q: 'Возможен ли самовывоз со склада?', a: `Да, ${HOURS.ru} со склада в Бейликдюзю; перед заказом можно осмотреть продукцию. Рекомендуем подтвердить наличие по телефону.` },
      { q: 'Как быстро готов цвет на заказ в Стамбуле?', a: `Лаборатория работает ${F.labAvailability}; достаточно кода PANTONE, оттиска или L*a*b*. Производство — ${F.customColorLeadTimeDays} рабочих дня после утверждения образца; минимальный заказ ${F.customColorMinimumKg} кг.` },
      { q: 'Можно ли заказать из другого города или из-за рубежа?', a: `Да: по Турции — ${F.domesticLeadTimeDays} рабочих дня; экспорт с документацией на английском, авто, морем и авиа.` },
    ],
  },
  related: { title: 'Связанные ресурсы', pillar: 'Руководство по полиграфическим материалам', offset: 'Материалы для офсетной печати', custom: 'Цвета на заказ', contact: 'Контакты и запрос цены' },
  cta: { title: 'Позвоните нам: полиграфические материалы в Стамбуле', text: 'Подтверждение наличия, отгрузка в тот же день и поддержка у машины — свяжитесь с отделом продаж.', button: 'Позвонить' },
};

const AR: IstanbulContent = {
  meta: {
    title: 'مواد الطباعة في إسطنبول | تسليم في اليوم نفسه من بيليكدوزو',
    description: 'تسليم في اليوم نفسه للمطابع في إسطنبول من مستودعنا في بيليكدوزو: أحبار أوفست وPANTONE، معدنية وUV، بطانيات وكيماويات وورنيش. استلام من المستودع ودعم عند الماكينة.',
    keywords: ['مواد الطباعة إسطنبول', 'أحبار أوفست إسطنبول', 'مورد مواد طباعة إسطنبول', 'بيليكدوزو طباعة', 'مستلزمات طباعة إسطنبول'],
  },
  pageName: 'مواد الطباعة في إسطنبول',
  hero: {
    eyebrow: 'بيليكدوزو · ياكوبلو · جميع مناطق الطباعة في إسطنبول',
    h1: 'مورّد مواد الطباعة في إسطنبول: تسليم في اليوم نفسه من بيليكدوزو',
    lead: `في إسطنبول منذ ${F.foundingYear}: من مستودعنا المركزي ومختبر الألوان العامل ${F.labAvailability} في بيليكدوزو ياكوبلو نسلّم منتجات المخزون في اليوم نفسه في الجانب الأوروبي (الطلب قبل ${F.sameDayCutoff}) وفي اليوم نفسه أو يوم العمل التالي في الجانب الآسيوي. استلام من المستودع، دعم فني عند الماكينة، واعتماد العينة معاً في المختبر.`,
  },
  intro: {
    title: 'أقرب مورّد لقطاع الطباعة في إسطنبول',
    text: 'إسطنبول مركز الطباعة والتغليف في تركيا: مجمعات المطابع التقليدية في توبكابي وبايرام باشا، وتجمع الطباعة التجارية في باجيلار–غونشلي، ومصانع التغليف في إكيتيلي وبيليكدوزو، والمناطق الصناعية في دودوللو وتوزلا على الجانب الآسيوي. عند هذه الكثافة يكون قرب المورّد استمرارية إنتاج لا رفاهية: انتظار شركة الشحن عند نفاد الحبر في منتصف التيراج يكلف وردية كاملة. تسد SIM هذه الفجوة بأسطولها الخاص ومختبرها داخل المدينة.',
    pillarText: 'جميع مجموعات المنتجات ومعايير الاختيار وعوامل التسعير في دليلنا الشامل:',
    pillarLink: 'دليل مواد الطباعة',
  },
  location: { title: 'المستودع والمختبر والتواصل', address: ADDR, phone: PHONE, hours: HOURS.ar, hoursLabel: 'ساعات العمل', directionsLabel: 'احصل على الاتجاهات', mapTitle: 'موقع مستودع ومختبر SIM في بيليكدوزو' },
  districts: {
    title: 'مدد التسليم حسب المنطقة',
    intro: `تُشحن منتجات المخزون (أطقم CMYK وPANTONE، السلاسل المعدنية والفلورية، أحبار UV، البطانيات، الكيماويات والورنيش) من بيليكدوزو بمركباتنا. الطلبات قبل ${F.sameDayCutoff} تُسلَّم في اليوم نفسه في الجانب الأوروبي؛ وطلبات الجانب الآسيوي في اليوم نفسه أو يوم العمل التالي. تجهز الألوان الخاصة خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة.`,
    headers: ['المنطقة', 'الجانب', 'تسليم منتجات المخزون'],
    sideLabels: { europe: 'الأوروبي', asia: 'الآسيوي' },
    deliveryLabels: { sameDay: `اليوم نفسه (الطلب قبل ${F.sameDayCutoff})`, sameOrNext: 'اليوم نفسه أو يوم العمل التالي (مسار مجدول)' },
    regionsText: `الجانب الأوروبي: ${EU}. الجانب الآسيوي: ${ASIA}. في عموم تركيا خلال ${F.domesticLeadTimeDays} أيام عمل، والتصدير براً وبحراً وجواً.`,
  },
  transport: { title: 'الوصول: E-5 وTEM وأمبارلي', text: 'يقع مستودعنا في بيليكدوزو ياكوبلو على بعد دقائق من مخرج E-5 بيليكدوزو–ياكوبلو ووصلة TEM إسنيورت–هاديمكوي؛ ويتيح جوارنا لميناء أمبارلي نقل الواردات من الجمارك إلى المستودع في اليوم نفسه. تُبلغ مناطق الطباعة في الجانب الأوروبي خلال 20–45 دقيقة عبر E-5، والجانب الآسيوي عبر TEM وطريق مرمرة الشمالي بمسار مجدول. ومحطة المتروبوس بيليكدوزو تسهّل زيارات الاستلام.' },
  pickup: { title: 'الاستلام من المستودع', text: `للأعمال العاجلة الطريق الأسرع هو الاستلام: ${HOURS.ar} من مستودع بيليكدوزو، مع إمكانية معاينة المنتجات والعبوات قبل الطلب. اتصل مسبقاً لتأكيد المخزون وحجز المنتج؛ ويمكن استلام عينات المختبر في الزيارة نفسها.` },
  stock: {
    title: 'متوفر دائماً في مستودع إسطنبول',
    intro: 'تُخزَّن المجموعات التالية بانتظام؛ أكّد السلسلة المناسبة لماكينتك وورقك هاتفياً.',
    items: [
      { name: 'أحبار أوفست CMYK وPANTONE', text: 'أطقم SAKATA INX للأوفست الورقي وألوان PANTONE الأساسية؛ عبوات 1 و2.5 كجم.' },
      { name: 'أحبار معدنية وفلورية', text: 'سلاسل EVA COLOR الذهبية والفضية والفلورية (مراجع PANTONE 871–877 و801–814)؛ صبغات SCHLENK.' },
      { name: 'أحبار أوفست UV', text: 'سلاسل Zeller+Gmelin UV وLED-UV؛ خيارات منخفضة الهجرة لتغليف الأغذية.' },
      { name: 'بطانيات الطباعة', text: 'بطانيات VECTOR مقصوصة حسب الماكينة بقضبان أو بدونها؛ أنواع تقليدية ومتوافقة مع UV.' },
      { name: 'كيماويات الطباعة', text: 'إضافات الترطيب وبدائل الكحول، مذيبات غسيل البطانيات والأسطوانات، منظفات الألواح، المجففات، البودرة.' },
      { name: 'ورنيشات التشتت', text: 'Hi-Tech Coatings لامعة ومطفية وناعمة الملمس وبليستر وقابلة للصق؛ براميل 20 كجم وIBC.' },
    ],
  },
  services: { title: 'خدماتنا في إسطنبول', items: [`تسليم منتجات المخزون في اليوم نفسه (الطلب قبل ${F.sameDayCutoff})`, 'دعم فني عند الماكينة: اللون والجفاف والاستحلاب وضبط الحبر', `مختبر ألوان ${F.labAvailability}: صياغة PANTONE وألوان العلامة، Delta E أقل من ${F.deltaEMax}`, 'إنشاء ملفات ICC وتوحيد الطباعة وفق ISO 12647-2', 'استلام من المستودع، عينات وTDS/SDS، استشارات المخزون'] },
  why: {
    title: 'لماذا مورّد من داخل إسطنبول؟',
    items: [
      { name: 'تسليم خلال ساعات', text: 'انتظار شركة الشحن عند نفاد الحبر أو تلف البطانية خسارة إنتاج. أسطولنا داخل المدينة يوصل منتجات المخزون في اليوم نفسه.' },
      { name: 'قرب فعلي من المختبر', text: 'يمكنك إحضار عينتك بنفسك واعتماد الوصفة في المختبر؛ فيُغلق الفارق بين العينة الرطبة والقيمة المقاسة في اليوم نفسه.' },
      { name: 'خدمة فنية ميدانية', text: 'عند مشكلات اللون أو الاستحلاب أو الجفاف يكون فريقنا الفني عند ماكينتك في اليوم نفسه في أي نقطة من إسطنبول.' },
      { name: 'جهة واحدة ومنظومة متوافقة', text: 'الحبر والبطانية والكيماويات من المستودع نفسه ومتوافقة معاً؛ فتختفي مشكلات الانتفاخ والتلوين والطبع الناتجة عن عدم التوافق.' },
    ],
  },
  faq: {
    title: 'توريد مواد الطباعة في إسطنبول: الأسئلة الشائعة',
    items: [
      { q: 'أين يقع مستودعكم في إسطنبول؟', a: `يقع مستودعنا ومكتب المبيعات ومختبر الألوان في ${ADDR}، قرب مخرج E-5 بيليكدوزو–ياكوبلو ووصلة TEM.` },
      { q: 'ما المناطق التي تشملها خدمة التسليم في اليوم نفسه؟', a: `لمنتجات المخزون نسلّم في اليوم نفسه إلى ${EU} في الجانب الأوروبي للطلبات قبل ${F.sameDayCutoff}؛ وتُجدول شحنات الجانب الآسيوي (${ASIA}) لليوم نفسه أو يوم العمل التالي.` },
      { q: 'ما الحل الأسرع عند الحاجة العاجلة للحبر؟', a: `تُسلَّم الطلبات العاجلة خلال ساعات العمل عادة في اليوم نفسه. والخيار الأسرع هو الاستلام: احجز المنتج هاتفياً واستلمه من بيليكدوزو ${HOURS.ar}.` },
      { q: 'هل يمكن الاستلام من المستودع ومعاينة المنتجات؟', a: `نعم، ${HOURS.ar} من مستودع بيليكدوزو، مع معاينة المنتجات قبل الطلب. ننصح بتأكيد المخزون هاتفياً.` },
      { q: 'كم يستغرق اللون الخاص داخل إسطنبول؟', a: `يعمل المختبر ${F.labAvailability}؛ يكفي رمز PANTONE أو عينة أو قيمة L*a*b*. الإنتاج خلال ${F.customColorLeadTimeDays} أيام عمل بعد اعتماد العينة؛ والحد الأدنى ${F.customColorMinimumKg} كجم.` },
      { q: 'هل يمكن الطلب من خارج إسطنبول أو من الخارج؟', a: `نعم: في تركيا خلال ${F.domesticLeadTimeDays} أيام عمل؛ والتصدير مع وثائق بالإنجليزية براً وبحراً وجواً.` },
    ],
  },
  related: { title: 'موارد ذات صلة', pillar: 'دليل مواد الطباعة', offset: 'دليل مستلزمات طباعة الأوفست', custom: 'إنتاج الألوان الخاصة', contact: 'التواصل وعرض السعر' },
  cta: { title: 'اتصل بنا لمواد الطباعة في إسطنبول', text: 'لتأكيد المخزون والشحن في اليوم نفسه والدعم الفني عند الماكينة تواصل مع فريق المبيعات.', button: 'اتصل الآن' },
};

export const ISTANBUL_CONTENT: Record<PillarLocale, IstanbulContent> = { tr: TR, en: EN, ru: RU, ar: AR };

export function getIstanbulContent(locale: string): IstanbulContent {
  return ISTANBUL_CONTENT[(locale as PillarLocale) in ISTANBUL_CONTENT ? (locale as PillarLocale) : 'tr'];
}

/** Teslimat tablosu satırları — organization.ts serviceAreas'tan (LocalBusiness.areaServed ile aynı liste) */
export function istanbulDistrictRows(locale: string) {
  const c = getIstanbulContent(locale);
  return ORGANIZATION.serviceAreas.map((d) => ({
    name: 'area' in d && d.area ? `${d.name} (${d.area})` : d.name,
    side: c.districts.sideLabels[d.side],
    delivery: c.districts.deliveryLabels[d.delivery],
  }));
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value as Record<string, unknown>).forEach((v) => collectStrings(v, out));
}

export function istanbulWordCount(locale: string): number {
  const out: string[] = [];
  const { meta, ...body } = getIstanbulContent(locale);
  void meta;
  collectStrings(body, out);
  for (const r of istanbulDistrictRows(locale)) out.push(r.name, r.side, r.delivery);
  return out.join(' ').split(/\s+/).filter(Boolean).length;
}
