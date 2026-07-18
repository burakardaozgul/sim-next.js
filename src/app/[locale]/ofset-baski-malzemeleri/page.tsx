import type { Metadata } from 'next';
import { createPageMetadata, BRAND_NAMES } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const BASE_URL = 'https://www.simlimited.net';

const LOCALE_PAGE_PATHS: Record<string, string> = {
  tr: '/ofset-baski-malzemeleri',
  en: '/offset-printing-supplies',
  ru: '/materialy-ofsetnoj-pechati',
  ar: '/mawad-tibaat-offset',
};

const HOME_NAMES: Record<string, string> = {
  tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية',
};

interface PillarCategory {
  icon: string;
  slug: string;
  name: string;
  desc: string;
}

interface PillarContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  breadcrumbName: string;
  subtitle: string;
  title: string;
  intro: string;
  howTitle: string;
  howText1: string;
  howText2: string;
  categoriesTitle: string;
  categories: PillarCategory[];
  viewLabel: string;
  criteriaTitle: string;
  criteriaIntro: string;
  criteria: { name: string; text: string }[];
  compareTitle: string;
  compareIntro: string;
  compareHeaders: [string, string, string];
  compareRows: { label: string; conv: string; uv: string }[];
  whyTitle: string;
  whyItems: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  relatedTitle: string;
  relatedPillar: string;
  relatedGlossary: string;
  relatedBlogLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

const CONTENT: Record<string, PillarContent> = {
  /* ---------------------------------------------------------------- */
  tr: {
    metaTitle: 'Ofset Baskı Malzemeleri: Mürekkep, Blanket ve Kimyasal Rehberi',
    metaDescription:
      "Ofset baskı malzemelerinde 40 yılı aşkın tedarikçi: CMYK ve PANTONE mürekkepler, UV mürekkep, baskı blanketi, kimyasallar ve laklar. İstanbul'dan hızlı teslimat.",
    keywords: [
      'ofset baskı malzemeleri', 'ofset mürekkep', 'ofset baskı mürekkepleri',
      'baskı blanketi', 'ofset kimyasalları', 'UV ofset mürekkep',
      'tabaka ofset mürekkep', 'ofset baskı sarf malzemeleri',
    ],
    breadcrumbName: 'Ofset Baskı Malzemeleri',
    subtitle: 'Mürekkepten Blankete Eksiksiz Tedarik',
    title: 'Ofset Baskı Malzemeleri',
    intro:
      'Ofset baskı kalitesi, makinenin olduğu kadar kullanılan malzemelerin de eseridir. CMYK ve PANTONE mürekkeplerden baskı blanketlerine, nemlendirme kimyasallarından dispersiyon laklara kadar her bileşen; renk tutarlılığını, kuruma süresini ve fire oranını doğrudan belirler. SIM Baskı Malzemeleri, 1983\'ten beri Türkiye\'deki matbaalara dünya markalarının ofset baskı malzemelerini tek çatı altında sunar.',
    howTitle: 'Ofset Baskı Nasıl Çalışır, Malzeme Neden Bu Kadar Kritik?',
    howText1:
      'Ofset baskı; mürekkebin kalıptan doğrudan kağıda değil, önce kauçuk bir blankete, oradan da baskı yüzeyine aktarıldığı dolaylı bir baskı tekniğidir. Su ile mürekkebin birbirini itmesi prensibiyle çalışan bu sistemde dört ana unsur sürekli etkileşim hâlindedir: kalıp, mürekkep, nemlendirme solüsyonu ve blanket.',
    howText2:
      'Bu dört unsurdan herhangi birinde kalitesiz ya da birbiriyle uyumsuz malzeme kullanmak; tonlama farkları, emülsifikasyon, geç kuruma, set-off ve mekanik arızalar olarak baskıya yansır. Bu yüzden ofset baskı malzemeleri tek tek değil, birbiriyle uyumlu bir sistem olarak seçilmelidir. Aşağıdaki kategoriler bu sistemin yapı taşlarıdır.',
    categoriesTitle: 'Temel Ofset Baskı Malzemeleri',
    categories: [
      {
        icon: '🖨',
        slug: 'sakata-inx-cmyk-murekkepler',
        name: 'Ofset Mürekkepleri (CMYK)',
        desc: 'Japon SAKATA INX üretimi tabaka ofset mürekkepleri; yüksek pigment konsantrasyonu, sararmayan parlaklık ve baskıdan baskıya tutarlı tekrarlanabilirlik sunar. Standart CMYK setleri stoktan teslim edilir.',
      },
      {
        icon: '🎨',
        slug: 'sakata-inx-pantone-murekkepler',
        name: 'PANTONE & Özel Renkler',
        desc: 'PANTONE kartelasına birebir uyumlu hazır spot renkler ve 7/24 çalışan laboratuvarımızda L-a-b değerinden formüle edilen özel renk üretimi. 5 kg\'dan başlayan sipariş miktarıyla.',
      },
      {
        icon: '💡',
        slug: 'zeller-gmelin-uv-offset-murekkepleri',
        name: 'UV & LED-UV Mürekkepler',
        desc: 'Zeller+Gmelin (Almanya) UV ofset mürekkepleri UV lamba altında saniyeler içinde kürlenir; plastik, folyo gibi emici olmayan yüzeylerde dahi anında kuruma ve yüksek kimyasal dayanım sağlar.',
      },
      {
        icon: '✨',
        slug: 'eva-color-gold-metalik-murekkepler',
        name: 'Metalik & Yaldız Mürekkepler',
        desc: 'Kendi üretimimiz EVA COLOR gold ve silver serileri, PANTONE 871-877 referans tonlarında üretilir. SCHLENK pigment teknolojisiyle lüks ambalaj ve etikette yüksek parlaklık.',
      },
      {
        icon: '🔧',
        slug: 'vector-baski-blanketleri',
        name: 'Baskı Blanketleri',
        desc: 'VECTOR blanketleri; keskin nokta transferi, düşük dot gain ve uzun ömürlü boyutsal stabilite ile tabaka ve web ofset makinelerinde güvenle kullanılır.',
      },
      {
        icon: '🧪',
        slug: 'hi-tech-coatings-dispersiyon-lak',
        name: 'Baskı Kimyasalları & Laklar',
        desc: 'Nemlendirme solüsyonu katkıları, IPA azaltıcılar, blanket ve merdane yıkama maddeleri ile Hi-Tech Coatings su bazlı dispersiyon laklar (mat, parlak, soft-touch, bariyer).',
      },
    ],
    viewLabel: 'İncele',
    criteriaTitle: 'Doğru Ofset Baskı Malzemesi Seçimi: 7 Kriter',
    criteriaIntro:
      'Yanlış malzeme seçimi; fire, tekrar baskı ve makine duruşu olarak geri döner. Satın alma kararından önce şu yedi kriteri değerlendirin:',
    criteria: [
      { name: 'Kağıt ve karton uyumu', text: 'Kuşe, 1. hamur ve karton yüzeyler farklı mürekkep emilimi gösterir; mürekkep serisi baskı yapılacak yüzeye göre seçilmelidir.' },
      { name: 'Kuruma hızı ve set-off riski', text: 'Yüksek tirajlı işlerde yavaş kuruyan mürekkep, istifte arkaya geçme (set-off) yapar. Kuruma süresi, iş temposuyla uyumlu olmalıdır.' },
      { name: 'Renk standardı uyumluluğu', text: 'ISO 12647-2 / Fogra hedefleriyle çalışan matbaalarda mürekkebin standart yoğunluk ve ton değerlerini karşılaması şarttır.' },
      { name: 'Baskı sonrası işlemler', text: 'Üzerine lak, laminasyon veya selefon uygulanacak işlerde mürekkebin bu işlemlerle kimyasal uyumu önceden doğrulanmalıdır.' },
      { name: 'Gıda ambalajı uygunluğu', text: 'Gıdayla temas eden ambalajlarda düşük migrasyonlu (low-migration) mürekkep ve lak kullanımı yasal zorunluluktur.' },
      { name: 'Tiraj ve makine hızı', text: 'Yüksek hızlı makinelerde mürekkebin reolojisi ve blanketin toparlanma özelliği performansı doğrudan etkiler.' },
      { name: 'Tedarikçi desteği ve stok sürekliliği', text: 'Renk tutmadığında saha desteği verebilen, kritik malzemeyi stoktan aynı gün gönderebilen tedarikçi, üretim güvenliğinizdir.' },
    ],
    compareTitle: 'Konvansiyonel mi, UV Ofset mi?',
    compareIntro:
      'İki teknolojinin malzeme ekosistemi birbirinden farklıdır. Doğru tercih; iş tipine, yüzeye ve yatırım planına bağlıdır:',
    compareHeaders: ['Kriter', 'Konvansiyonel Ofset', 'UV / LED-UV Ofset'],
    compareRows: [
      { label: 'Kuruma süresi', conv: 'Saatler (oksidasyon + emilim)', uv: 'Saniyeler (UV kürleme)' },
      { label: 'Baskı yüzeyleri', conv: 'Emici kağıt ve karton', uv: 'Kağıt + plastik, folyo, metalize yüzeyler' },
      { label: 'Anında işlem', conv: 'Kuruma beklenir', uv: 'Baskıdan çıkar çıkmaz kesim/katlama' },
      { label: 'Enerji ve yatırım', conv: 'Standart makine, düşük yatırım', uv: 'UV/LED lamba yatırımı gerekir' },
      { label: 'Parlaklık ve dayanım', conv: 'İyi (lak ile artırılır)', uv: 'Çok yüksek kimyasal ve fiziksel dayanım' },
      { label: 'Tipik kullanım', conv: 'Dergi, katalog, kitap, broşür', uv: 'Etiket, lüks ambalaj, plastik kart' },
    ],
    whyTitle: 'Ofset Baskı Malzemelerinde SIM Farkı',
    whyItems: [
      '1983\'ten beri yalnızca baskı malzemeleri: 40 yılı aşkın sektör uzmanlığı',
      'SAKATA INX, Zeller+Gmelin, SCHLENK, Hi-Tech Coatings distribütörlükleri tek çatı altında',
      'Kendi markalarımız EVA COLOR mürekkep ve VECTOR blanket ile üretici fiyatı',
      'Aylık 15.000 kg kapasiteli, 7/24 çalışan özel renk üretim laboratuvarı',
      'İstanbul Beylikdüzü merkezden aynı gün sevkiyat, Türkiye geneline hızlı teslimat',
      'Renk ve baskı problemlerinde yerinde teknik destek',
    ],
    faqTitle: 'Ofset Baskı Malzemeleri Hakkında Sık Sorulanlar',
    faqs: [
      {
        q: 'Ofset baskı malzemeleri nelerdir?',
        a: 'Temel ofset baskı malzemeleri beş grupta toplanır: ofset mürekkepleri (CMYK, PANTONE, metalik, floresan, UV), baskı blanketleri, baskı kalıpları, baskı kimyasalları (nemlendirme solüsyonu, yıkama maddeleri, katkılar) ve baskı sonrası laklar/kaplamalar. Bunlara ek olarak pudra, merdane ve temizlik sarf malzemeleri de üretimin parçasıdır.',
      },
      {
        q: 'Ofset mürekkebi ile dijital baskı toneri arasındaki fark nedir?',
        a: 'Ofset mürekkebi pigment, bağlayıcı ve katkılardan oluşan macun kıvamında bir malzemedir ve fiziksel olarak kağıda transfer edilir; dijital toner ise elektrostatik yükle aktarılan kuru ya da sıvı partiküllerdir. Ofset mürekkebi yüksek tirajda birim maliyeti düşürür ve PANTONE spot renk hassasiyeti sunar.',
      },
      {
        q: 'UV mürekkep hangi işlerde tercih edilmelidir?',
        a: 'Emici olmayan yüzeyler (plastik, folyo, metalize karton), anında işlem gerektiren yüksek tempolu işler, yüksek kimyasal/fiziksel dayanım istenen etiket ve lüks ambalaj uygulamaları UV ya da LED-UV mürekkep gerektirir.',
      },
      {
        q: 'Baskı blanketi ne zaman değiştirilmelidir?',
        a: 'Nokta keskinliğinde belirgin kayıp, yüzeyde camlaşma, ezilme veya kalıcı çökme (smash) görüldüğünde blanket değiştirilmelidir. Düzenli yıkama ve doğru altlık (packing) kullanımı blanket ömrünü belirgin şekilde uzatır.',
      },
      {
        q: 'Minimum sipariş miktarı ve teslimat süresi nedir?',
        a: 'Standart stok ürünlerde minimum sipariş kısıtı yoktur; İstanbul içinde aynı gün, Türkiye genelinde 1-3 iş günü içinde teslimat yapılır. Özel renk üretiminde minimum miktar 5 kg\'dır.',
      },
      {
        q: 'Özel bir PANTONE rengini ürettirebilir miyim?',
        a: 'Evet. 7/24 çalışan renk laboratuvarımızda PANTONE numarasından, fiziksel numuneden veya dijital L-a-b değerinden yola çıkarak konvansiyonel ve UV sistemler için özel renk üretiyoruz. Onaylı reçeteler saklanır ve tekrar siparişlerde birebir aynı renk teslim edilir.',
      },
    ],
    relatedTitle: 'İlgili Kaynaklar',
    relatedPillar: 'Matbaa Malzemeleri Rehberi',
    relatedGlossary: 'Matbaa Terimleri Sözlüğü',
    relatedBlogLabel: 'Teknik Blog Yazıları',
    ctaTitle: 'Ofset baskı malzemesi mi arıyorsunuz?',
    ctaText: 'İşinize uygun mürekkep, blanket ve kimyasal seçimi için teknik ekibimizle görüşün.',
    ctaButton: 'Teklif Alın',
  },

  /* ---------------------------------------------------------------- */
  en: {
    metaTitle: 'Offset Printing Supplies: Ink, Blanket & Chemicals Guide',
    metaDescription:
      'Offset printing supplies from a 40+ year supplier: CMYK and PANTONE inks, UV inks, printing blankets, pressroom chemicals and varnishes. Fast delivery from Istanbul.',
    keywords: [
      'offset printing supplies', 'offset ink', 'offset printing materials',
      'printing blanket', 'pressroom chemicals', 'UV offset ink',
      'sheetfed offset ink', 'offset consumables',
    ],
    breadcrumbName: 'Offset Printing Supplies',
    subtitle: 'Complete Supply from Ink to Blanket',
    title: 'Offset Printing Supplies',
    intro:
      'Offset print quality is shaped as much by the materials as by the press itself. From CMYK and PANTONE inks to printing blankets, from fountain chemistry to dispersion varnishes, every component directly determines colour consistency, drying time and waste rates. Since 1983, SIM has supplied Turkish printers with world-brand offset printing materials under one roof.',
    howTitle: 'How Offset Printing Works — and Why Materials Matter',
    howText1:
      'Offset is an indirect printing technique: ink travels from the plate to a rubber blanket and only then onto the substrate. The process relies on water and ink repelling each other, with four elements in constant interaction: plate, ink, fountain solution and blanket.',
    howText2:
      'Using a poor-quality or incompatible material in any of these four elements shows up on the sheet as tonal variation, emulsification, slow drying, set-off and mechanical faults. Offset supplies should therefore be chosen as a compatible system, not as isolated items. The categories below are the building blocks of that system.',
    categoriesTitle: 'Core Offset Printing Supplies',
    categories: [
      {
        icon: '🖨',
        slug: 'sakata-inx-cmyk-murekkepler',
        name: 'Offset Inks (CMYK)',
        desc: 'Japanese-made SAKATA INX sheetfed offset inks deliver high pigment concentration, non-yellowing gloss and consistent run-to-run repeatability. Standard CMYK sets ship from stock.',
      },
      {
        icon: '🎨',
        slug: 'sakata-inx-pantone-murekkepler',
        name: 'PANTONE & Custom Colours',
        desc: 'Ready spot colours matched to the PANTONE guide, plus custom colours formulated from L-a-b values in our 24/7 colour laboratory. Orders from 5 kg.',
      },
      {
        icon: '💡',
        slug: 'zeller-gmelin-uv-offset-murekkepleri',
        name: 'UV & LED-UV Inks',
        desc: 'Zeller+Gmelin (Germany) UV offset inks cure in seconds under UV lamps, giving instant drying and high chemical resistance even on non-absorbent surfaces such as plastics and foils.',
      },
      {
        icon: '✨',
        slug: 'eva-color-gold-metalik-murekkepler',
        name: 'Metallic & Gold Inks',
        desc: 'Our own EVA COLOR gold and silver series are produced in PANTONE 871-877 reference shades, using SCHLENK pigment technology for high brilliance in luxury packaging and labels.',
      },
      {
        icon: '🔧',
        slug: 'vector-baski-blanketleri',
        name: 'Printing Blankets',
        desc: 'VECTOR blankets provide sharp dot transfer, low dot gain and long-term dimensional stability for both sheetfed and web offset presses.',
      },
      {
        icon: '🧪',
        slug: 'hi-tech-coatings-dispersiyon-lak',
        name: 'Pressroom Chemicals & Varnishes',
        desc: 'Fountain solution additives, IPA reducers, blanket and roller washes, plus Hi-Tech Coatings water-based dispersion varnishes (matte, gloss, soft-touch, barrier).',
      },
    ],
    viewLabel: 'View',
    criteriaTitle: 'Choosing the Right Offset Supplies: 7 Criteria',
    criteriaIntro:
      'The wrong material choice comes back as waste, reprints and press downtime. Evaluate these seven criteria before purchasing:',
    criteria: [
      { name: 'Paper and board compatibility', text: 'Coated, uncoated and board surfaces absorb ink differently; the ink series must match the substrate.' },
      { name: 'Drying speed and set-off risk', text: 'On long runs, slow-drying ink causes set-off in the pile. Drying time must match your production tempo.' },
      { name: 'Colour standard compliance', text: 'Printers working to ISO 12647-2 / Fogra targets need inks that hit standard density and tone values.' },
      { name: 'Post-press processes', text: 'For jobs that will be varnished, laminated or foiled, chemical compatibility of the ink must be verified in advance.' },
      { name: 'Food packaging compliance', text: 'Low-migration inks and coatings are a legal requirement for food-contact packaging.' },
      { name: 'Run length and press speed', text: 'On high-speed presses, ink rheology and blanket recovery directly affect performance.' },
      { name: 'Supplier support and stock continuity', text: 'A supplier who can provide on-site colour support and ship critical materials same-day is your production insurance.' },
    ],
    compareTitle: 'Conventional or UV Offset?',
    compareIntro:
      'The two technologies use different material ecosystems. The right choice depends on job type, substrate and investment plans:',
    compareHeaders: ['Criterion', 'Conventional Offset', 'UV / LED-UV Offset'],
    compareRows: [
      { label: 'Drying time', conv: 'Hours (oxidation + absorption)', uv: 'Seconds (UV curing)' },
      { label: 'Substrates', conv: 'Absorbent paper and board', uv: 'Paper + plastics, foils, metallised stock' },
      { label: 'Immediate finishing', conv: 'Must wait for drying', uv: 'Cut/fold straight off the press' },
      { label: 'Energy and investment', conv: 'Standard press, lower investment', uv: 'Requires UV/LED lamp investment' },
      { label: 'Gloss and resistance', conv: 'Good (enhanced with varnish)', uv: 'Very high chemical and physical resistance' },
      { label: 'Typical use', conv: 'Magazines, catalogues, books, brochures', uv: 'Labels, luxury packaging, plastic cards' },
    ],
    whyTitle: 'The SIM Difference in Offset Supplies',
    whyItems: [
      'Printing materials only, since 1983: over 40 years of sector expertise',
      'SAKATA INX, Zeller+Gmelin, SCHLENK and Hi-Tech Coatings distributorships under one roof',
      'Manufacturer pricing with our own EVA COLOR inks and VECTOR blankets',
      '24/7 custom colour laboratory with 15,000 kg monthly capacity',
      'Same-day dispatch from Istanbul Beylikdüzü, fast delivery across Turkey',
      'On-site technical support for colour and print problems',
    ],
    faqTitle: 'Offset Printing Supplies — FAQ',
    faqs: [
      {
        q: 'What are offset printing supplies?',
        a: 'Core offset supplies fall into five groups: offset inks (CMYK, PANTONE, metallic, fluorescent, UV), printing blankets, printing plates, pressroom chemicals (fountain solution, washes, additives) and post-press varnishes/coatings. Spray powder, rollers and cleaning consumables complete the pressroom.',
      },
      {
        q: 'What is the difference between offset ink and digital toner?',
        a: 'Offset ink is a paste of pigment, binder and additives transferred physically to the sheet; digital toner consists of dry or liquid particles transferred electrostatically. Offset ink lowers unit cost on long runs and offers precise PANTONE spot-colour matching.',
      },
      {
        q: 'When should UV ink be preferred?',
        a: 'Non-absorbent substrates (plastics, foils, metallised board), fast-turnaround work requiring immediate finishing, and label or luxury-packaging jobs demanding high chemical and physical resistance call for UV or LED-UV inks.',
      },
      {
        q: 'When should a printing blanket be replaced?',
        a: 'Replace the blanket when you see a clear loss of dot sharpness, surface glazing, or a permanent smash. Regular washing and correct packing significantly extend blanket life.',
      },
      {
        q: 'What are the minimum order quantity and delivery times?',
        a: 'Standard stock items have no minimum order; delivery is same-day within Istanbul and 1-3 business days across Turkey. Custom colour production starts from 5 kg.',
      },
      {
        q: 'Can you produce a custom PANTONE colour for me?',
        a: 'Yes. Our 24/7 colour laboratory formulates custom colours for conventional and UV systems from a PANTONE number, a physical sample or digital L-a-b values. Approved recipes are stored so repeat orders match exactly.',
      },
    ],
    relatedTitle: 'Related Resources',
    relatedPillar: 'Printing Materials Guide',
    relatedGlossary: 'Printing Glossary',
    relatedBlogLabel: 'Technical Blog Articles',
    ctaTitle: 'Looking for offset printing supplies?',
    ctaText: 'Talk to our technical team to choose the right ink, blanket and chemistry for your work.',
    ctaButton: 'Get a Quote',
  },

  /* ---------------------------------------------------------------- */
  ru: {
    metaTitle: 'Материалы для офсетной печати: краски, полотна, химия',
    metaDescription:
      'Материалы для офсетной печати от поставщика с 40-летним опытом: краски CMYK и PANTONE, УФ-краски, офсетные полотна, химия и лаки. Быстрая доставка из Стамбула.',
    keywords: [
      'материалы для офсетной печати', 'офсетные краски', 'офсетные полотна',
      'химия для офсетной печати', 'УФ-краски', 'листовые офсетные краски',
    ],
    breadcrumbName: 'Материалы для офсетной печати',
    subtitle: 'Полное снабжение: от краски до полотна',
    title: 'Материалы для офсетной печати',
    intro:
      'Качество офсетной печати определяется не только машиной, но и материалами. От красок CMYK и PANTONE до офсетных полотен, от увлажняющей химии до дисперсионных лаков — каждый компонент напрямую влияет на стабильность цвета, время высыхания и уровень брака. С 1983 года SIM поставляет турецким типографиям офсетные материалы мировых брендов из одних рук.',
    howTitle: 'Как работает офсетная печать и почему материалы так важны',
    howText1:
      'Офсет — это непрямой способ печати: краска переходит с формы сначала на резиновое полотно и лишь затем на запечатываемый материал. Процесс основан на взаимном отталкивании воды и краски, при этом четыре элемента находятся в постоянном взаимодействии: форма, краска, увлажняющий раствор и полотно.',
    howText2:
      'Некачественный или несовместимый материал в любом из этих четырёх элементов проявляется на оттиске как разнотон, эмульгирование, медленное высыхание, отмарывание и механические сбои. Поэтому материалы для офсета следует подбирать как совместимую систему, а не по отдельности. Категории ниже — строительные блоки этой системы.',
    categoriesTitle: 'Основные материалы для офсетной печати',
    categories: [
      {
        icon: '🖨',
        slug: 'sakata-inx-cmyk-murekkepler',
        name: 'Офсетные краски (CMYK)',
        desc: 'Листовые офсетные краски японского производства SAKATA INX: высокая концентрация пигмента, нежелтеющий глянец и стабильная повторяемость от тиража к тиражу. Стандартные комплекты CMYK — со склада.',
      },
      {
        icon: '🎨',
        slug: 'sakata-inx-pantone-murekkepler',
        name: 'PANTONE и спеццвета',
        desc: 'Готовые смесевые цвета по каталогу PANTONE и производство спеццветов по значениям L-a-b в нашей круглосуточной лаборатории. Заказы от 5 кг.',
      },
      {
        icon: '💡',
        slug: 'zeller-gmelin-uv-offset-murekkepleri',
        name: 'УФ и LED-UV краски',
        desc: 'УФ-краски Zeller+Gmelin (Германия) отверждаются за секунды под УФ-лампой, обеспечивая мгновенное высыхание и высокую химическую стойкость даже на невпитывающих поверхностях.',
      },
      {
        icon: '✨',
        slug: 'eva-color-gold-metalik-murekkepler',
        name: 'Металлические краски',
        desc: 'Наши серии EVA COLOR gold и silver выпускаются в эталонных оттенках PANTONE 871-877 с пигментами SCHLENK — высокий блеск для премиальной упаковки и этикетки.',
      },
      {
        icon: '🔧',
        slug: 'vector-baski-blanketleri',
        name: 'Офсетные полотна',
        desc: 'Полотна VECTOR обеспечивают чёткую передачу точки, низкое растискивание и долговременную стабильность размеров на листовых и рулонных машинах.',
      },
      {
        icon: '🧪',
        slug: 'hi-tech-coatings-dispersiyon-lak',
        name: 'Химия и лаки',
        desc: 'Добавки в увлажняющий раствор, средства для смывки полотен и валов, а также водно-дисперсионные лаки Hi-Tech Coatings (матовый, глянцевый, soft-touch, барьерный).',
      },
    ],
    viewLabel: 'Смотреть',
    criteriaTitle: 'Выбор материалов для офсета: 7 критериев',
    criteriaIntro:
      'Неверный выбор материала оборачивается браком, перепечаткой и простоем машины. Перед покупкой оцените семь критериев:',
    criteria: [
      { name: 'Совместимость с бумагой и картоном', text: 'Мелованные, немелованные и картонные поверхности по-разному впитывают краску; серия краски должна соответствовать материалу.' },
      { name: 'Скорость высыхания и риск отмарывания', text: 'На больших тиражах медленно сохнущая краска отмарывает в стопе. Время высыхания должно соответствовать темпу производства.' },
      { name: 'Соответствие цветовым стандартам', text: 'Типографиям, работающим по ISO 12647-2 / Fogra, нужны краски, выдерживающие стандартные значения плотности и тона.' },
      { name: 'Послепечатная обработка', text: 'Для работ под лак, ламинацию или фольгу химическую совместимость краски нужно проверить заранее.' },
      { name: 'Пригодность для пищевой упаковки', text: 'Для упаковки, контактирующей с пищей, применение низкомиграционных красок и лаков — законодательное требование.' },
      { name: 'Тираж и скорость машины', text: 'На скоростных машинах реология краски и упругость полотна напрямую влияют на результат.' },
      { name: 'Поддержка поставщика и наличие на складе', text: 'Поставщик, способный выехать на производство и отгрузить критичный материал в тот же день, — это ваша страховка.' },
    ],
    compareTitle: 'Традиционный или УФ-офсет?',
    compareIntro:
      'У двух технологий разные экосистемы материалов. Правильный выбор зависит от типа работ, материала и инвестиционных планов:',
    compareHeaders: ['Критерий', 'Традиционный офсет', 'УФ / LED-UV офсет'],
    compareRows: [
      { label: 'Время высыхания', conv: 'Часы (окисление + впитывание)', uv: 'Секунды (УФ-отверждение)' },
      { label: 'Запечатываемые материалы', conv: 'Впитывающие бумага и картон', uv: 'Бумага + пластик, фольга, металлизация' },
      { label: 'Немедленная отделка', conv: 'Нужно ждать высыхания', uv: 'Резка/фальцовка сразу после печати' },
      { label: 'Энергия и инвестиции', conv: 'Стандартная машина, ниже вложения', uv: 'Требуются УФ/LED-лампы' },
      { label: 'Блеск и стойкость', conv: 'Хорошие (усиливаются лаком)', uv: 'Очень высокая хим. и физ. стойкость' },
      { label: 'Типичное применение', conv: 'Журналы, каталоги, книги, буклеты', uv: 'Этикетка, премиум-упаковка, пластиковые карты' },
    ],
    whyTitle: 'Преимущества SIM в материалах для офсета',
    whyItems: [
      'Только материалы для печати с 1983 года: более 40 лет отраслевого опыта',
      'Дистрибуция SAKATA INX, Zeller+Gmelin, SCHLENK и Hi-Tech Coatings из одних рук',
      'Цены производителя на собственные бренды: краски EVA COLOR и полотна VECTOR',
      'Круглосуточная лаборатория спеццветов мощностью 15 000 кг в месяц',
      'Отгрузка в день заказа со склада в Стамбуле, быстрая доставка по всей Турции',
      'Выездная техническая поддержка по цвету и печати',
    ],
    faqTitle: 'Материалы для офсетной печати — вопросы и ответы',
    faqs: [
      {
        q: 'Что относится к материалам для офсетной печати?',
        a: 'Основные материалы делятся на пять групп: офсетные краски (CMYK, PANTONE, металлические, флуоресцентные, УФ), офсетные полотна, печатные формы, химия (увлажняющий раствор, смывки, добавки) и послепечатные лаки/покрытия. Дополняют их противоотмарочный порошок, валы и чистящие средства.',
      },
      {
        q: 'Чем офсетная краска отличается от тонера цифровой печати?',
        a: 'Офсетная краска — пастообразный материал из пигмента, связующего и добавок, переносимый на лист физически; тонер — сухие или жидкие частицы, переносимые электростатически. Офсетная краска снижает себестоимость на больших тиражах и обеспечивает точное попадание в цвета PANTONE.',
      },
      {
        q: 'Когда стоит выбирать УФ-краски?',
        a: 'Невпитывающие материалы (пластик, фольга, металлизированный картон), срочные работы с немедленной отделкой, а также этикетка и премиальная упаковка с высокими требованиями к стойкости требуют УФ или LED-UV красок.',
      },
      {
        q: 'Когда нужно менять офсетное полотно?',
        a: 'Полотно меняют при заметной потере чёткости точки, остекленении поверхности или необратимой деформации (smash). Регулярная смывка и правильная поддекельная подкладка существенно продлевают срок службы.',
      },
      {
        q: 'Каковы минимальный заказ и сроки поставки?',
        a: 'Для складских позиций минимального заказа нет; доставка по Стамбулу — в тот же день, по Турции — 1-3 рабочих дня. Производство спеццвета — от 5 кг.',
      },
      {
        q: 'Можно ли заказать изготовление цвета PANTONE?',
        a: 'Да. Наша круглосуточная лаборатория изготавливает спеццвета для традиционных и УФ-систем по номеру PANTONE, физическому образцу или цифровым значениям L-a-b. Утверждённые рецептуры сохраняются, повторные заказы совпадают идеально.',
      },
    ],
    relatedTitle: 'Связанные ресурсы',
    relatedPillar: 'Руководство по полиграфическим материалам',
    relatedGlossary: 'Глоссарий полиграфии',
    relatedBlogLabel: 'Технические статьи блога',
    ctaTitle: 'Ищете материалы для офсетной печати?',
    ctaText: 'Свяжитесь с нашей технической командой для подбора красок, полотен и химии под ваши задачи.',
    ctaButton: 'Получить предложение',
  },

  /* ---------------------------------------------------------------- */
  ar: {
    metaTitle: 'مستلزمات طباعة الأوفست: دليل الأحبار والبطانيات والكيماويات',
    metaDescription:
      'مستلزمات طباعة الأوفست من مورد بخبرة تتجاوز 40 عاماً: أحبار CMYK وPANTONE وأحبار UV وبطانيات الطباعة والكيماويات والورنيش. توصيل سريع من إسطنبول.',
    keywords: [
      'مستلزمات طباعة الأوفست', 'أحبار الأوفست', 'مواد طباعة الأوفست',
      'بطانيات الطباعة', 'كيماويات الطباعة', 'أحبار UV',
    ],
    breadcrumbName: 'مستلزمات طباعة الأوفست',
    subtitle: 'توريد متكامل من الحبر إلى البطانية',
    title: 'مستلزمات طباعة الأوفست',
    intro:
      'جودة طباعة الأوفست ليست نتاج الماكينة وحدها، بل المواد المستخدمة أيضاً. من أحبار CMYK وPANTONE إلى بطانيات الطباعة، ومن كيماويات الترطيب إلى الورنيش الدسبرسي — كل مكوّن يحدد مباشرة ثبات اللون وزمن الجفاف ونسبة الهدر. منذ عام 1983 تزوّد SIM المطابع بمستلزمات طباعة الأوفست من علامات عالمية تحت سقف واحد.',
    howTitle: 'كيف تعمل طباعة الأوفست، ولماذا المواد بهذه الأهمية؟',
    howText1:
      'الأوفست تقنية طباعة غير مباشرة: ينتقل الحبر من اللوح (البليت) إلى بطانية مطاطية أولاً، ثم إلى سطح الطباعة. تعتمد العملية على تنافر الماء والحبر، مع أربعة عناصر في تفاعل مستمر: اللوح، الحبر، محلول الترطيب، والبطانية.',
    howText2:
      'استخدام مادة رديئة أو غير متوافقة في أي من هذه العناصر الأربعة يظهر على المطبوع كتفاوت في الدرجات، واستحلاب، وبطء جفاف، وانتقال حبر (set-off) وأعطال ميكانيكية. لذلك يجب اختيار مستلزمات الأوفست كمنظومة متوافقة، لا كقطع منفصلة. الفئات أدناه هي لبنات هذه المنظومة.',
    categoriesTitle: 'مستلزمات طباعة الأوفست الأساسية',
    categories: [
      {
        icon: '🖨',
        slug: 'sakata-inx-cmyk-murekkepler',
        name: 'أحبار الأوفست (CMYK)',
        desc: 'أحبار أوفست يابانية الصنع من SAKATA INX: تركيز صبغي عالٍ، ولمعان لا يصفرّ، وقابلية تكرار ثابتة من تيراج إلى آخر. أطقم CMYK القياسية تُسلَّم من المخزون.',
      },
      {
        icon: '🎨',
        slug: 'sakata-inx-pantone-murekkepler',
        name: 'ألوان PANTONE والألوان الخاصة',
        desc: 'ألوان خاصة جاهزة مطابقة لدليل PANTONE، وإنتاج ألوان مخصصة من قيم L-a-b في مختبرنا العامل على مدار الساعة. طلبات تبدأ من 5 كجم.',
      },
      {
        icon: '💡',
        slug: 'zeller-gmelin-uv-offset-murekkepleri',
        name: 'أحبار UV و LED-UV',
        desc: 'أحبار UV من Zeller+Gmelin الألمانية تتصلب خلال ثوانٍ تحت مصابيح UV، فتوفر جفافاً فورياً ومقاومة كيميائية عالية حتى على الأسطح غير الماصة كالبلاستيك والرقائق.',
      },
      {
        icon: '✨',
        slug: 'eva-color-gold-metalik-murekkepler',
        name: 'الأحبار المعدنية والذهبية',
        desc: 'سلسلتا EVA COLOR الذهبية والفضية من إنتاجنا بدرجات PANTONE 871-877 المرجعية، بتقنية صبغات SCHLENK للمعان عالٍ في العبوات والملصقات الفاخرة.',
      },
      {
        icon: '🔧',
        slug: 'vector-baski-blanketleri',
        name: 'بطانيات الطباعة',
        desc: 'بطانيات VECTOR توفر نقل نقطة حاداً، وزيادة نقطية منخفضة، وثبات أبعاد طويل الأمد لماكينات الأوفست الورقية والدوّارة.',
      },
      {
        icon: '🧪',
        slug: 'hi-tech-coatings-dispersiyon-lak',
        name: 'كيماويات الطباعة والورنيش',
        desc: 'إضافات محلول الترطيب، ومخفضات IPA، ومواد غسيل البطانيات والأسطوانات، وورنيش Hi-Tech Coatings المائي (مطفي، لامع، سوفت-تاتش، حاجز).',
      },
    ],
    viewLabel: 'عرض',
    criteriaTitle: 'اختيار مستلزمات الأوفست الصحيحة: 7 معايير',
    criteriaIntro:
      'الاختيار الخاطئ للمواد يرتد عليك هدراً وإعادة طباعة وتوقفاً للماكينة. قيّم هذه المعايير السبعة قبل الشراء:',
    criteria: [
      { name: 'توافق الورق والكرتون', text: 'الأسطح المطلية وغير المطلية والكرتون تمتص الحبر بشكل مختلف؛ يجب اختيار سلسلة الحبر وفق سطح الطباعة.' },
      { name: 'سرعة الجفاف وخطر انتقال الحبر', text: 'في التيراجات الكبيرة يسبب الحبر بطيء الجفاف انتقالاً في الرصّة. يجب أن يوافق زمن الجفاف إيقاع الإنتاج.' },
      { name: 'مطابقة معايير اللون', text: 'المطابع العاملة وفق ISO 12647-2 / Fogra تحتاج أحباراً تحقق قيم الكثافة والدرجة القياسية.' },
      { name: 'عمليات ما بعد الطباعة', text: 'للأعمال التي ستُطلى بالورنيش أو التغليف الحراري يجب التحقق مسبقاً من التوافق الكيميائي للحبر.' },
      { name: 'ملاءمة عبوات الأغذية', text: 'استخدام أحبار وورنيش منخفض الهجرة إلزامي قانوناً في العبوات الملامسة للغذاء.' },
      { name: 'حجم التيراج وسرعة الماكينة', text: 'في الماكينات عالية السرعة تؤثر ريولوجيا الحبر ومرونة البطانية مباشرة في الأداء.' },
      { name: 'دعم المورد واستمرارية المخزون', text: 'المورد القادر على الدعم الفني الميداني وشحن المواد الحرجة في اليوم نفسه هو ضمان استمرار إنتاجك.' },
    ],
    compareTitle: 'أوفست تقليدي أم UV؟',
    compareIntro:
      'لكل تقنية منظومة مواد مختلفة. الاختيار الصحيح يعتمد على نوع العمل والسطح وخطة الاستثمار:',
    compareHeaders: ['المعيار', 'الأوفست التقليدي', 'أوفست UV / LED-UV'],
    compareRows: [
      { label: 'زمن الجفاف', conv: 'ساعات (أكسدة + امتصاص)', uv: 'ثوانٍ (تصلب UV)' },
      { label: 'أسطح الطباعة', conv: 'ورق وكرتون ماصّان', uv: 'ورق + بلاستيك ورقائق وأسطح ممعدنة' },
      { label: 'التشطيب الفوري', conv: 'يتطلب انتظار الجفاف', uv: 'قص/طي فور خروج المطبوع' },
      { label: 'الطاقة والاستثمار', conv: 'ماكينة قياسية واستثمار أقل', uv: 'يتطلب استثمار مصابيح UV/LED' },
      { label: 'اللمعان والمقاومة', conv: 'جيدة (تُعزز بالورنيش)', uv: 'مقاومة كيميائية وفيزيائية عالية جداً' },
      { label: 'الاستخدام النموذجي', conv: 'مجلات وكتالوجات وكتب ومطويات', uv: 'ملصقات وعبوات فاخرة وبطاقات بلاستيكية' },
    ],
    whyTitle: 'ما يميز SIM في مستلزمات الأوفست',
    whyItems: [
      'مستلزمات الطباعة فقط منذ 1983: خبرة قطاعية تتجاوز 40 عاماً',
      'توكيلات SAKATA INX وZeller+Gmelin وSCHLENK وHi-Tech Coatings تحت سقف واحد',
      'أسعار المصنّع بعلامتينا الخاصتين: أحبار EVA COLOR وبطانيات VECTOR',
      'مختبر ألوان خاصة يعمل 24/7 بطاقة 15,000 كجم شهرياً',
      'شحن في اليوم نفسه من إسطنبول بيليك دوزو وتوصيل سريع لكل تركيا',
      'دعم فني ميداني لمشكلات اللون والطباعة',
    ],
    faqTitle: 'الأسئلة الشائعة حول مستلزمات طباعة الأوفست',
    faqs: [
      {
        q: 'ما هي مستلزمات طباعة الأوفست؟',
        a: 'تنقسم المستلزمات الأساسية إلى خمس مجموعات: أحبار الأوفست (CMYK وPANTONE ومعدنية وفلورية وUV)، بطانيات الطباعة، ألواح الطباعة، كيماويات الطباعة (محلول الترطيب ومواد الغسيل والإضافات)، وورنيش وطلاءات ما بعد الطباعة. وتكتمل بالبودرة والأسطوانات ومواد التنظيف.',
      },
      {
        q: 'ما الفرق بين حبر الأوفست وتونر الطباعة الرقمية؟',
        a: 'حبر الأوفست مادة معجونية من صبغة ورابط وإضافات تُنقل فيزيائياً إلى الورق؛ أما التونر فجزيئات جافة أو سائلة تُنقل كهروستاتيكياً. يخفض حبر الأوفست تكلفة الوحدة في التيراجات الكبيرة ويوفر مطابقة دقيقة لألوان PANTONE.',
      },
      {
        q: 'متى يُفضَّل استخدام أحبار UV؟',
        a: 'الأسطح غير الماصة (البلاستيك والرقائق والكرتون الممعدن)، والأعمال العاجلة التي تتطلب تشطيباً فورياً، وتطبيقات الملصقات والعبوات الفاخرة ذات متطلبات المقاومة العالية تستدعي أحبار UV أو LED-UV.',
      },
      {
        q: 'متى يجب استبدال بطانية الطباعة؟',
        a: 'تُستبدل البطانية عند فقدان واضح لحدة النقطة، أو تزجّج السطح، أو حدوث انبعاج دائم (smash). الغسيل المنتظم والحشوة الصحيحة يطيلان عمر البطانية بشكل ملموس.',
      },
      {
        q: 'ما الحد الأدنى للطلب ومدة التسليم؟',
        a: 'لا حد أدنى لمنتجات المخزون القياسية؛ التسليم في اليوم نفسه داخل إسطنبول وخلال 1-3 أيام عمل في عموم تركيا. إنتاج الألوان الخاصة يبدأ من 5 كجم.',
      },
      {
        q: 'هل يمكنكم إنتاج لون PANTONE خاص لي؟',
        a: 'نعم. يعمل مختبر الألوان لدينا على مدار الساعة لإنتاج ألوان خاصة للأنظمة التقليدية وUV انطلاقاً من رقم PANTONE أو عينة فعلية أو قيم L-a-b الرقمية. تُحفظ الوصفات المعتمدة فتُطابق الطلبات المتكررة تماماً.',
      },
    ],
    relatedTitle: 'مصادر ذات صلة',
    relatedPillar: 'دليل مواد الطباعة',
    relatedGlossary: 'قاموس مصطلحات الطباعة',
    relatedBlogLabel: 'مقالات تقنية من المدونة',
    ctaTitle: 'هل تبحث عن مستلزمات طباعة الأوفست؟',
    ctaText: 'تواصل مع فريقنا الفني لاختيار الحبر والبطانية والكيماويات المناسبة لعملك.',
    ctaButton: 'اطلب عرض سعر',
  },
};

/** Pillar sayfasından beslenen teknik blog yazıları */
const RELATED_BLOG_SLUGS = [
  'ofset-murekkep-secimi',
  'uv-murekkep-teknolojisi',
  'baski-blanket-secimi-ve-bakimi',
  'baski-kimyasallari-rehberi',
] as const;

const RELATED_BLOG_TITLES: Record<string, Record<string, string>> = {
  'ofset-murekkep-secimi': {
    tr: 'Doğru Ofset Mürekkep Seçimi: 7 Temel Kriter',
    en: '7 Key Criteria for Choosing the Right Offset Ink',
    ru: 'Как выбрать офсетную краску: 7 критериев',
    ar: '7 معايير لاختيار حبر الأوفست الصحيح',
  },
  'uv-murekkep-teknolojisi': {
    tr: 'UV Mürekkep Teknolojisi: Hızlı Kuruma, Yüksek Kalite',
    en: 'UV Ink Technology: Fast Curing, High Quality',
    ru: 'Технология УФ-красок: быстрое отверждение',
    ar: 'تقنية أحبار UV: جفاف سريع وجودة عالية',
  },
  'baski-blanket-secimi-ve-bakimi': {
    tr: 'Baskı Blanketi Seçimi ve Bakım Rehberi',
    en: 'Printing Blankets: Selection & Maintenance Guide',
    ru: 'Офсетные полотна: выбор и обслуживание',
    ar: 'بطانيات الطباعة: دليل الاختيار والصيانة',
  },
  'baski-kimyasallari-rehberi': {
    tr: 'Baskı Kimyasalları: Matbaacı İçin Kapsamlı Rehber',
    en: 'Printing Chemicals: A Comprehensive Guide',
    ru: 'Химия для печати: подробное руководство',
    ar: 'كيماويات الطباعة: دليل شامل',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.tr;

  return createPageMetadata({
    locale,
    path: '/ofset-baski-malzemeleri',
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
  });
}

export default async function OfsetBaskiMalzemeleriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.tr;

  const localePath = LOCALE_PAGE_PATHS[locale] || LOCALE_PAGE_PATHS.tr;
  const pageUrl = locale === 'tr' ? `${BASE_URL}${localePath}` : `${BASE_URL}/${locale}${localePath}`;
  const homeUrl = locale === 'tr' ? BASE_URL : `${BASE_URL}/${locale}`;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: c.title,
    description: c.metaDescription,
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
        name: c.breadcrumbName,
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="flex min-h-screen">
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">

          {/* Hero */}
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                {c.subtitle}
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
                {c.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver">
                {c.intro}
              </p>
            </div>
          </section>

          {/* How offset works */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.howTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{c.howText1}</p>
              <p className="mt-4 text-base leading-relaxed text-silver">{c.howText2}</p>
            </div>
          </section>

          {/* Categories */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.categoriesTitle}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={{ pathname: '/urunler/[slug]' as const, params: { slug: cat.slug } }}
                    className="group flex flex-col rounded-xl border border-white/[0.06] bg-ink-800 p-6 transition-all hover:border-gold/40 hover:bg-ink-700"
                  >
                    <span className="mb-3 text-3xl">{cat.icon}</span>
                    <h3 className="font-heading text-lg font-semibold text-cream">{cat.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">{cat.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all group-hover:gap-2">
                      {c.viewLabel}
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Selection criteria */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.criteriaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{c.criteriaIntro}</p>
              <ol className="mt-8 space-y-5">
                {c.criteria.map((item, i) => (
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

          {/* Conventional vs UV comparison */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.compareTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-silver">{c.compareIntro}</p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[560px] text-start text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-800">
                      {c.compareHeaders.map((h) => (
                        <th key={h} className="px-5 py-4 text-start font-heading font-semibold text-gold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.compareRows.map((row) => (
                      <tr key={row.label} className="border-b border-white/[0.04] last:border-0">
                        <td className="px-5 py-4 font-medium text-cream">{row.label}</td>
                        <td className="px-5 py-4 text-silver">{row.conv}</td>
                        <td className="px-5 py-4 text-silver">{row.uv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Why SIM */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.whyTitle}
              </h2>
              <ul className="space-y-4">
                {c.whyItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                    <span className="text-base text-silver">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-white/[0.06] bg-ink-900 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 font-heading text-2xl font-bold text-cream md:text-3xl">
                {c.faqTitle}
              </h2>
              <div className="space-y-6">
                {c.faqs.map((f, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.06] bg-ink-800 p-6">
                    <h3 className="font-heading text-base font-semibold text-cream">{f.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related resources */}
          <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-heading text-xl font-bold text-cream md:text-2xl">
                {c.relatedTitle}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/matbaa-malzemeleri"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {c.relatedPillar}
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/matbaa-terimleri-sozlugu"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  {c.relatedGlossary}
                  <ArrowRight size={13} />
                </Link>
              </div>
              <p className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gold/60">
                {c.relatedBlogLabel}
              </p>
              <ul className="space-y-2">
                {RELATED_BLOG_SLUGS.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={{ pathname: '/blog/[slug]' as const, params: { slug } }}
                      className="group inline-flex items-center gap-2 text-sm text-silver underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold/40"
                    >
                      {RELATED_BLOG_TITLES[slug][locale] || RELATED_BLOG_TITLES[slug].tr}
                      <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gold px-6 py-14 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
                  {c.ctaTitle}
                </h2>
                <p className="mt-2 text-sm text-ink/80">{c.ctaText}</p>
              </div>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 border-2 border-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all hover:bg-ink/10"
              >
                {c.ctaButton}
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
