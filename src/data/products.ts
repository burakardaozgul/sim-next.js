export interface Product {
  slug: string;
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
    image: 'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09900.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09900.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09901.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Gold-Aile.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Gold-Aile.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09898.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/05/HIP09899.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Pantone876-Gold.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Pantone875-Gold.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Pantone874-Gold.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2022/05/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/05/sim-baski-ve-matbaa-malzemeleri-rgb-renk-ve-rgb-murekkep.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
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
    slug: 'st-dot-offset-blanketleri',
    image: 'https://www.simlimited.net/wp-content/uploads/2022/09/blanket2.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/09/blanket2.jpg',
      'https://www.simlimited.net/wp-content/uploads/2022/09/Blanket.jpg',
    ],
    category: 'blanket',
    name: {
      tr: 'ST-DOT Offset Blanketleri',
      en: 'ST-DOT Offset Blankets',
      ru: 'ST-DOT Офсетные полотна',
      ar: 'بطانيات ST-DOT للأوفست',
    },
    description: {
      tr: 'Alman teknolojisi ile üretilen ST-DOT Offset Blanketleri, yüksek hassasiyet ve dayanıklılık sunar. Karmaşık tasarımların ve canlı renklerin kusursuz baskısı için pürüzsüz ve doğru baskı transferi sağlar.',
      en: 'Manufactured with German technology, ST-DOT Offset Blankets offer high precision and durability. They provide smooth and accurate print transfer for flawless printing of complex designs and vibrant colors.',
      ru: 'Офсетные полотна ST-DOT, произведённые по немецкой технологии, обеспечивают высокую точность и долговечность. Гладкий и точный перенос печати для безупречных сложных дизайнов.',
      ar: 'تُصنع بطانيات ST-DOT بالتقنية الألمانية وتوفر دقة عالية ومتانة. تضمن نقل طباعة سلسًا ودقيقًا للتصاميم المعقدة والألوان النابضة.',
    },
    features: {
      tr: ['Alman teknolojisi ile üretim', 'Yüksek hassasiyet', 'Üstün dayanıklılık', 'Doğru baskı transferi', 'Canlı renk aktarımı'],
      en: ['German technology manufacturing', 'High precision', 'Enhanced durability', 'Accurate print transfer', 'Vibrant color reproduction'],
      ru: ['Немецкая технология', 'Высокая точность', 'Повышенная долговечность', 'Точный перенос печати', 'Яркое воспроизведение цветов'],
      ar: ['تصنيع بتقنية ألمانية', 'دقة عالية', 'متانة محسنة', 'نقل طباعة دقيق', 'إعادة إنتاج ألوان نابضة'],
    },
  },
  {
    slug: 'eva-color-silver-metalik-murekkepler',
    image: 'https://www.simlimited.net/wp-content/uploads/2022/09/HIP08190.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2022/09/HIP08190.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09894.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09894.jpg',
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09892.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2023/10/sakata2.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2023/10/sakata2.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09924.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09924.jpg',
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP099222.jpg',
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
    image: 'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09896.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09896.jpg',
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09897.jpg',
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
  {
    slug: 'master-anti-set-off-powder',
    image: 'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09914.jpg',
    gallery: [
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09914.jpg',
      'https://www.simlimited.net/wp-content/uploads/2023/10/HIP09915.jpg',
    ],
    category: 'chemicals',
    name: {
      tr: 'MASTER Anti Set-Off Powder',
      en: 'MASTER Anti Set-Off Powder',
      ru: 'MASTER Противоотмарочный порошок',
      ar: 'مسحوق MASTER المضاد للتلطيخ',
    },
    description: {
      tr: 'Master Anti Set-Off Powder, mürekkep transferini (set-off) önlemek için tasarlanmış premium sprey tozudur. Kolay uygulama ile temiz ve keskin baskı sonuçları sağlar. İnce kağıttan kalın kartona kadar tüm malzemelerle uyumludur.',
      en: 'Master Anti Set-Off Powder is a premium spray powder designed to prevent ink set-off. It delivers clean, sharp print results with easy application. Compatible with all materials from thin paper to heavy cardstock.',
      ru: 'Master Anti Set-Off Powder — премиальный распылительный порошок для предотвращения отмарывания краски. Обеспечивает чистые и чёткие результаты печати.',
      ar: 'مسحوق Master Anti Set-Off مصمم لمنع انتقال الحبر. يوفر نتائج طباعة نظيفة وحادة مع سهولة التطبيق.',
    },
    features: {
      tr: ['Mürekkep transferini önler', 'Temiz ve keskin baskı', 'Kolay uygulama', 'İnce kağıtlarla uyumlu', 'Kalın kartonlarla uyumlu'],
      en: ['Prevents ink set-off', 'Clean and sharp prints', 'Easy application', 'Compatible with thin paper', 'Compatible with heavy cardstock'],
      ru: ['Предотвращает отмарывание', 'Чистая и чёткая печать', 'Лёгкое нанесение', 'Совместимость с тонкой бумагой', 'Совместимость с плотным картоном'],
      ar: ['يمنع انتقال الحبر', 'طباعة نظيفة وحادة', 'تطبيق سهل', 'متوافق مع الورق الرقيق', 'متوافق مع الورق المقوى'],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
