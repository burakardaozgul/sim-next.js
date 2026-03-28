export interface Product {
  slug: string;
  slugs: Record<string, string>;
  image: string;
  gallery: string[];
  category: string;
  name: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, string[]>;
}

export const products: Product[] = [
  {
    slug: 'eva-color-fluorescent-murekkepler',
    slugs: { tr: 'eva-color-fluorescent-murekkepler', en: 'eva-color-fluorescent-inks', ru: 'eva-color-fluorescentnye-kraski', ar: 'eva-color-fluorescent-inks' },
    image: '/images/HIP09900.webp',
    gallery: [
      '/images/HIP09900.webp',
      '/images/HIP09901.webp',
    ],
    category: 'offset',
    name: {
      tr: 'EVA COLOR Fluorescent Mürekkepler',
      en: 'EVA COLOR Fluorescent Inks',
      ru: 'EVA COLOR Флуоресцентные краски',
      ar: 'أحبار EVA COLOR الفلورية',
    },
    description: {
      tr: 'EVA COLOR markamız altında üretilen floresan mürekkep serisi, ofset baskıda canlı ve dikkat çekici renkler sunar. Yüksek baskı kalitesi ve mürekkep performansı ile sektörün ihtiyaçlarına çözüm sağlar.',
      en: 'Our EVA COLOR fluorescent ink series delivers vibrant, eye-catching colors in offset printing. With high print quality and ink performance, it meets the demands of the printing industry.',
      ru: 'Серия флуоресцентных красок EVA COLOR обеспечивает яркие и привлекательные цвета в офсетной печати. Высокое качество печати и производительность чернил отвечают требованиям полиграфической отрасли.',
      ar: 'توفر سلسلة الأحبار الفلورية EVA COLOR ألوانًا نابضة بالحياة وملفتة للنظر في الطباعة الأوفست. بجودة طباعة عالية وأداء حبر متميز.',
    },
  },
  {
    slug: 'eva-color-gold-metalik-murekkepler',
    slugs: { tr: 'eva-color-gold-metalik-murekkepler', en: 'eva-color-gold-metallic-inks', ru: 'eva-color-zolotye-metallicheskie-kraski', ar: 'eva-color-gold-metallic-inks' },
    image: '/images/NEW-Gold-Aile.webp',
    gallery: [
      '/images/NEW-Gold-Aile.webp',
      '/images/HIP09898.webp',
      '/images/HIP09899.webp',
      '/images/NEW-Pantone876-Gold.webp',
      '/images/NEW-Pantone875-Gold.webp',
      '/images/NEW-Pantone874-Gold.webp',
    ],
    category: 'metallic',
    name: {
      tr: 'EVA COLOR Gold Metalik Mürekkepler / Yaldız Mürekkepler',
      en: 'EVA COLOR Gold Metallic Inks',
      ru: 'EVA COLOR Золотые металлические краски',
      ar: 'أحبار EVA COLOR المعدنية الذهبية',
    },
    description: {
      tr: 'EVA COLOR Gold metalik/yaldız mürekkep serisi, ofset baskıda üstün parlaklık ve renk derinliği sunar. PANTONE 873-876 referans tonlarında üretilen serimiz, ambalaj ve etiket baskılarında fark yaratır.',
      en: 'The EVA COLOR Gold metallic ink series offers superior brilliance and color depth in offset printing. Produced in PANTONE 873-876 reference shades, our series makes a difference in packaging and label printing.',
      ru: 'Серия золотых металлических красок EVA COLOR обеспечивает превосходный блеск и глубину цвета в офсетной печати. Производится в оттенках PANTONE 873-876.',
      ar: 'توفر سلسلة الأحبار المعدنية الذهبية EVA COLOR لمعانًا فائقًا وعمقًا في الألوان في الطباعة الأوفست. تُنتج بدرجات PANTONE 873-876.',
    },
  },
  {
    slug: 'sakata-inx-cmyk-murekkepler',
    slugs: { tr: 'sakata-inx-cmyk-murekkepler', en: 'sakata-inx-cmyk-inks', ru: 'sakata-inx-cmyk-kraski', ar: 'sakata-inx-cmyk-inks' },
    image: '/images/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.webp',
    gallery: [
      '/images/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.webp',
    ],
    category: 'offset',
    name: {
      tr: 'SAKATA INX CMYK Renkler / CMYK Mürekkepler',
      en: 'SAKATA INX CMYK Colors / CMYK Inks',
      ru: 'SAKATA INX CMYK Цвета / CMYK Краски',
      ar: 'ألوان SAKATA INX CMYK / أحبار CMYK',
    },
    description: {
      tr: '2002 yılından bu yana Sakata Inx\'in Türkiye distribütörüyüz. Japonya merkezli Sakata Inx, yüksek kaliteli ofset mürekkep üretiminde sektör lideridir. CMYK renk serisi; broşür, ambalaj, etiket ve promosyon baskılarında canlı renkler, keskin detaylar ve tutarlı tekrarlanabilirlik sunar.',
      en: 'We have been the Turkish distributor of Sakata Inx since 2002. Japan-based Sakata Inx is a sector leader in high-quality offset ink production. The CMYK series delivers vibrant colors, sharp details, and consistent repeatability for brochures, packaging, labels, and promotional prints.',
      ru: 'Мы являемся дистрибьютором Sakata Inx в Турции с 2002 года. Японская компания Sakata Inx — лидер в производстве высококачественных офсетных красок. Серия CMYK обеспечивает яркие цвета и стабильную воспроизводимость.',
      ar: 'نحن الموزع التركي لشركة Sakata Inx منذ 2002. تعتبر Sakata Inx اليابانية رائدة في إنتاج أحبار الأوفست عالية الجودة. تقدم سلسلة CMYK ألوانًا نابضة بالحياة وتفاصيل حادة.',
    },
    features: {
      tr: ['2002\'den beri Türkiye distribütörü', 'Canlı renkler ve keskin detaylar', 'Tutarlı tekrarlanabilirlik', 'Broşür, ambalaj, etiket ve promosyon baskıları'],
      en: ['Turkish distributor since 2002', 'Vibrant colors and sharp details', 'Consistent repeatability', 'Brochures, packaging, labels, and promotional prints'],
      ru: ['Дистрибьютор в Турции с 2002 г.', 'Яркие цвета и чёткие детали', 'Стабильная воспроизводимость', 'Брошюры, упаковка, этикетки'],
      ar: ['موزع في تركيا منذ 2002', 'ألوان نابضة بالحياة وتفاصيل حادة', 'قابلية تكرار ثابتة', 'كتيبات، تغليف، ملصقات'],
    },
  },
  {
    slug: 'ozel-renkler',
    slugs: { tr: 'ozel-renkler', en: 'custom-colors', ru: 'spetsialnye-tsveta', ar: 'custom-colors' },
    image: '/images/DSC08151.webp',
    gallery: [
      '/images/DSC08151.webp',
    ],
    category: 'custom',
    name: {
      tr: 'Özel Renkler',
      en: 'Custom Colors',
      ru: 'Специальные цвета',
      ar: 'ألوان مخصصة',
    },
    description: {
      tr: '7/24 hizmet veren özel renk üretim laboratuvarımız ile UV ve konvansiyonel mürekkepler için istediğiniz rengi üretiyoruz. Doğa numunesi, katalog veya dijital LAB değerlerinden renk eşleştirme yapılmaktadır.',
      en: 'With our 24/7 custom color production laboratory, we produce the color you need for UV and conventional inks. Color matching is available from nature samples, catalogs, or digital LAB values.',
      ru: 'С нашей лабораторией производства специальных цветов, работающей 24/7, мы производим нужный вам цвет для УФ и обычных красок. Подбор цвета по образцам, каталогам или цифровым значениям LAB.',
      ar: 'بمختبر إنتاج الألوان المخصصة الذي يعمل على مدار الساعة، ننتج اللون الذي تحتاجه لأحبار الأشعة فوق البنفسجية والتقليدية.',
    },
    features: {
      tr: ['7/24 özel renk üretim laboratuvarı', 'UV mürekkep üretimi', 'Konvansiyonel mürekkep üretimi', 'Doğa numunesinden renk eşleştirme', 'Katalogdan renk eşleştirme', 'Dijital LAB değerleri ile formülasyon'],
      en: ['24/7 custom color production lab', 'UV ink production', 'Conventional ink production', 'Color matching from nature samples', 'Color matching from catalogs', 'Digital LAB value formulation'],
      ru: ['Лаборатория 24/7', 'Производство УФ-красок', 'Производство обычных красок', 'Подбор по образцам', 'Подбор по каталогам', 'Формулировка по LAB-значениям'],
      ar: ['مختبر إنتاج 24/7', 'إنتاج أحبار UV', 'إنتاج أحبار تقليدية', 'مطابقة من عينات طبيعية', 'مطابقة من كتالوجات', 'صياغة بقيم LAB رقمية'],
    },
  },
  {
    slug: 'vector-baski-blanketleri',
    slugs: { tr: 'vector-baski-blanketleri', en: 'vector-printing-blankets', ru: 'vector-pechatnye-polotna', ar: 'vector-printing-blankets' },
    image: '/images/blanket2.webp',
    gallery: [
      '/images/blanket2.webp',
      '/images/Blanket.webp',
    ],
    category: 'blanket',
    name: {
      tr: 'VECTOR Baskı Blanketleri',
      en: 'VECTOR Printing Blankets',
      ru: 'VECTOR Печатные полотна',
      ar: 'بطانيات الطباعة VECTOR',
    },
    description: {
      tr: 'VECTOR, modern baskı endüstrisinin yüksek performans gereksinimlerini karşılamak üzere tasarlanmış ofset baskı blanketleri sunar. Gelişmiş kauçuk bileşenleri ve hassas üretim teknolojileri ile üretilen VECTOR blanketleri; mükemmel mürekkep transferi, yüksek nokta keskinliği ve uzun süreli boyutsal stabilite sağlar. Yüksek hızlı baskı koşullarında dahi güvenilir ve tutarlı performans sunacak şekilde tasarlanmıştır. Dayanıklılık, baskı kalitesi ve üretim verimliliği odağında geliştirilen VECTOR ürünleri, matbaaların üretim süreçlerinde maksimum verimlilik ve istikrarlı baskı sonuçları elde etmesine katkı sağlar.',
      en: 'VECTOR offers offset printing blankets designed to meet the high-performance demands of the modern printing industry. Manufactured with advanced rubber compounds and precision production technologies, VECTOR blankets deliver excellent ink transfer, high dot sharpness, and long-term dimensional stability. Designed for reliable and consistent performance even under high-speed printing conditions. Developed with a focus on durability, print quality, and production efficiency, VECTOR products help printing houses achieve maximum efficiency and consistent print results.',
      ru: 'VECTOR предлагает офсетные печатные полотна, разработанные для удовлетворения высоких требований современной полиграфической индустрии. Произведённые с использованием передовых резиновых компонентов и прецизионных технологий, полотна VECTOR обеспечивают превосходный перенос краски, высокую резкость растровой точки и долгосрочную размерную стабильность. Разработаны для надёжной и стабильной работы даже в условиях высокоскоростной печати.',
      ar: 'تقدم VECTOR بطانيات طباعة أوفست مصممة لتلبية متطلبات الأداء العالي في صناعة الطباعة الحديثة. تتميز بطانيات VECTOR المصنعة بمركبات مطاطية متقدمة وتقنيات إنتاج دقيقة بنقل حبر ممتاز ووضوح نقطي عالٍ واستقرار أبعاد طويل الأمد. مصممة لأداء موثوق ومتسق حتى في ظروف الطباعة عالية السرعة.',
    },
    features: {
      tr: ['Mükemmel mürekkep transferi', 'Yüksek nokta keskinliği', 'Uzun süreli boyutsal stabilite', 'Yüksek hızlı baskıda güvenilir performans', 'Maksimum üretim verimliliği'],
      en: ['Excellent ink transfer', 'High dot sharpness', 'Long-term dimensional stability', 'Reliable high-speed performance', 'Maximum production efficiency'],
      ru: ['Превосходный перенос краски', 'Высокая резкость точки', 'Долгосрочная размерная стабильность', 'Надёжная высокоскоростная печать', 'Максимальная производственная эффективность'],
      ar: ['نقل حبر ممتاز', 'وضوح نقطي عالٍ', 'استقرار أبعاد طويل الأمد', 'أداء موثوق عالي السرعة', 'كفاءة إنتاج قصوى'],
    },
  },
  {
    slug: 'eva-color-silver-metalik-murekkepler',
    slugs: { tr: 'eva-color-silver-metalik-murekkepler', en: 'eva-color-silver-metallic-inks', ru: 'eva-color-serebryanye-metallicheskie-kraski', ar: 'eva-color-silver-metallic-inks' },
    image: '/images/HIP08190.webp',
    gallery: [
      '/images/HIP08190.webp',
    ],
    category: 'metallic',
    name: {
      tr: 'EVA COLOR Silver Metalik Mürekkepler / Yaldız Mürekkepler',
      en: 'EVA COLOR Silver Metallic Inks',
      ru: 'EVA COLOR Серебряные металлические краски',
      ar: 'أحبار EVA COLOR المعدنية الفضية',
    },
    description: {
      tr: 'EVA COLOR Silver metalik/yaldız mürekkep serisi, gümüş tonlarında üstün parlaklık ve kaplama gücü sunar. Ambalaj, etiket ve lüks baskı uygulamalarında yüksek performans sağlar.',
      en: 'The EVA COLOR Silver metallic ink series offers superior brilliance and coverage in silver tones. It delivers high performance in packaging, label, and luxury print applications.',
      ru: 'Серия серебряных металлических красок EVA COLOR обеспечивает превосходный блеск и укрывистость в серебряных тонах. Высокая эффективность в упаковке и этикетке.',
      ar: 'توفر سلسلة الأحبار المعدنية الفضية EVA COLOR لمعانًا فائقًا وتغطية في الدرجات الفضية.',
    },
  },
  {
    slug: 'zeller-gmelin-uv-offset-murekkepleri',
    slugs: { tr: 'zeller-gmelin-uv-offset-murekkepleri', en: 'zeller-gmelin-uv-offset-inks', ru: 'zeller-gmelin-uf-ofsetnye-kraski', ar: 'zeller-gmelin-uv-offset-inks' },
    image: '/images/HIP09894.webp',
    gallery: [
      '/images/HIP09894.webp',
      '/images/HIP09892.webp',
    ],
    category: 'uv',
    name: {
      tr: 'ZELLER+GMELIN UV Offset Mürekkepleri',
      en: 'ZELLER+GMELIN UV Offset Inks',
      ru: 'ZELLER+GMELIN УФ Офсетные краски',
      ar: 'أحبار ZELLER+GMELIN للأوفست فوق البنفسجي',
    },
    description: {
      tr: 'Alman üretici Zeller+Gmelin, yüksek kaliteli UV ofset mürekkep üretiminde dünya lideridir. Geniş ürün yelpazesi ile sektörün farklı ihtiyaçlarına ileri teknoloji çözümler sunar. Canlı renkler ve üstün performansı ile dünya genelinde tercih edilmektedir.',
      en: 'German manufacturer Zeller+Gmelin is a world leader in high-quality UV offset ink production. Their comprehensive product range provides advanced technology solutions for diverse industry needs.',
      ru: 'Немецкий производитель Zeller+Gmelin — мировой лидер в производстве высококачественных УФ-офсетных красок. Широкий ассортимент продукции предлагает передовые технологические решения.',
      ar: 'الشركة الألمانية Zeller+Gmelin رائدة عالميًا في إنتاج أحبار الأوفست فوق البنفسجية عالية الجودة.',
    },
  },
  {
    slug: 'sakata-inx-pantone-murekkepler',
    slugs: { tr: 'sakata-inx-pantone-murekkepler', en: 'sakata-inx-pantone-inks', ru: 'sakata-inx-pantone-kraski', ar: 'sakata-inx-pantone-inks' },
    image: '/images/sakata2.webp',
    gallery: [
      '/images/sakata2.webp',
    ],
    category: 'pantone',
    name: {
      tr: 'SAKATA INX PANTONE Renkler / PANTONE Mürekkepler',
      en: 'SAKATA INX PANTONE Colors / PANTONE Inks',
      ru: 'SAKATA INX PANTONE Цвета / PANTONE Краски',
      ar: 'ألوان SAKATA INX PANTONE / أحبار PANTONE',
    },
    description: {
      tr: 'Sakata Inx PANTONE renk serisi, uluslararası renk standartlarına uygun formülasyonlarla üretilir. Broşür, ambalaj, etiket ve promosyon baskılarında canlı renkler ve keskin detaylar sunar. Kapsamlı renk paleti ile özel renk üretimi de mevcuttur.',
      en: 'The Sakata Inx PANTONE color series is produced with formulations meeting international color standards. It delivers vibrant colors and sharp details for brochures, packaging, labels, and promotional prints.',
      ru: 'Серия цветов PANTONE от Sakata Inx производится по формулам, соответствующим международным стандартам. Яркие цвета и чёткие детали для брошюр, упаковки и этикеток.',
      ar: 'تُنتج سلسلة ألوان PANTONE من Sakata Inx بتركيبات تلبي المعايير الدولية للألوان.',
    },
    features: {
      tr: ['Uluslararası PANTONE standartlarına uygun', 'Canlı renkler ve keskin detaylar', 'Tutarlı tekrarlanabilirlik', 'Broşür, ambalaj ve etiket baskıları', 'Özel renk üretimi imkanı'],
      en: ['Compliant with international PANTONE standards', 'Vibrant colors and sharp details', 'Consistent repeatability', 'Brochures, packaging, and label prints', 'Custom color production available'],
      ru: ['Соответствие стандартам PANTONE', 'Яркие цвета и чёткие детали', 'Стабильная воспроизводимость', 'Брошюры, упаковка и этикетки', 'Производство специальных цветов'],
      ar: ['متوافق مع معايير PANTONE الدولية', 'ألوان نابضة بالحياة وتفاصيل حادة', 'قابلية تكرار ثابتة', 'كتيبات وتغليف وملصقات', 'إنتاج ألوان مخصصة متاح'],
    },
  },
  {
    slug: 'hi-tech-coatings-dispersiyon-lak',
    slugs: { tr: 'hi-tech-coatings-dispersiyon-lak', en: 'hi-tech-coatings-water-based-varnish', ru: 'hi-tech-coatings-dispersionnyj-lak', ar: 'hi-tech-coatings-water-based-varnish' },
    image: '/images/HIP09924.webp',
    gallery: [
      '/images/HIP09924.webp',
      '/images/HIP099222.webp',
    ],
    category: 'chemicals',
    name: {
      tr: 'HI-TECH COATINGS Dispersiyon / Su Bazlı Lak',
      en: 'HI-TECH COATINGS Dispersion / Water-Based Varnish',
      ru: 'HI-TECH COATINGS Дисперсионный / Водный лак',
      ar: 'HI-TECH COATINGS ورنيش مائي',
    },
    description: {
      tr: 'Hi-Tech Coatings\'in Türkiye temsilcisi olarak yüksek kaliteli su bazlı dispersiyon lakları sunuyoruz. Baskı görünümünü ve kalitesini artıran ürünlerimiz, üstün sürtünme direnci ile baskı deformasyonunu önler. Soft Touch, Primer ve Bariyer kaplama seçenekleri mevcuttur.',
      en: 'As the Turkish representative of Hi-Tech Coatings, we offer high-quality water-based dispersion varnishes. Our products enhance print appearance and prevent deformation with superior friction resistance. Soft Touch, Primer, and Barrier coating options are available.',
      ru: 'Как представитель Hi-Tech Coatings в Турции, мы предлагаем высококачественные водные дисперсионные лаки. Наши продукты улучшают внешний вид печати. Доступны покрытия Soft Touch, Primer и Barrier.',
      ar: 'بصفتنا ممثل Hi-Tech Coatings في تركيا، نقدم ورنيشات مائية عالية الجودة. تعزز منتجاتنا مظهر الطباعة وتمنع التشوه.',
    },
    features: {
      tr: ['Baskı görünümünü artırır', 'Üstün sürtünme direnci', 'Soft Touch kaplama', 'Primer kaplama', 'Bariyer kaplama'],
      en: ['Enhances print appearance', 'Superior friction resistance', 'Soft Touch coating', 'Primer coating', 'Barrier coating'],
      ru: ['Улучшает внешний вид', 'Высокая стойкость к трению', 'Покрытие Soft Touch', 'Покрытие Primer', 'Покрытие Barrier'],
      ar: ['يعزز مظهر الطباعة', 'مقاومة احتكاك فائقة', 'طلاء Soft Touch', 'طلاء Primer', 'طلاء Barrier'],
    },
  },
  {
    slug: 'schlenk-metalik-murekkepler',
    slugs: { tr: 'schlenk-metalik-murekkepler', en: 'schlenk-metallic-inks', ru: 'schlenk-metallicheskie-kraski', ar: 'schlenk-metallic-inks' },
    image: '/images/HIP09896.webp',
    gallery: [
      '/images/HIP09896.webp',
      '/images/HIP09897.webp',
    ],
    category: 'metallic',
    name: {
      tr: 'SCHLENK Metalik Mürekkepler / Yaldız Mürekkepler',
      en: 'SCHLENK Metallic Inks',
      ru: 'SCHLENK Металлические краски',
      ar: 'أحبار SCHLENK المعدنية',
    },
    description: {
      tr: 'SCHLENK metalik/yaldız mürekkep serisi, Alman mühendisliğinin hassasiyeti ile üretilir. Yüksek parlaklık, üstün kaplama gücü ve tutarlı renk kalitesi ile metalik baskı uygulamalarında tercih edilen markadır.',
      en: 'The SCHLENK metallic ink series is produced with the precision of German engineering. It is the preferred brand for metallic printing applications with high brilliance, superior coverage, and consistent color quality.',
      ru: 'Серия металлических красок SCHLENK производится с точностью немецкой инженерии. Высокий блеск, превосходная укрывистость и стабильное качество цвета.',
      ar: 'تُنتج سلسلة أحبار SCHLENK المعدنية بدقة الهندسة الألمانية. لمعان عالٍ وتغطية فائقة وجودة لون ثابتة.',
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(
    (p) => p.slug === slug || Object.values(p.slugs).includes(slug),
  );
}

export function getProductSlug(product: Product, locale: string): string {
  return product.slugs[locale] || product.slug;
}

export function getAllProductSlugs(): string[] {
  const slugs = new Set<string>();
  for (const p of products) {
    slugs.add(p.slug);
    for (const s of Object.values(p.slugs)) slugs.add(s);
  }
  return [...slugs];
}
