export interface GlossaryTerm {
  term: Record<string, string>;
  definition: Record<string, string>;
}

export const glossaryTerms: GlossaryTerm[] = [
  // ── Color ──────────────────────────────────────────────────────────────────
  {
    term: { tr: 'CMYK', en: 'CMYK', ru: 'CMYK', ar: 'CMYK' },
    definition: {
      tr: 'Cyan (camgöbeği), Magenta (macenta), Yellow (sarı) ve Key/Black (siyah) renklerinden oluşan dört renkli baskı sistemi. Ofset baskıda standart renk modeli.',
      en: 'Four-color printing system consisting of Cyan, Magenta, Yellow, and Key/Black. The standard color model in offset printing.',
      ru: 'Четырёхцветная система печати: Cyan, Magenta, Yellow, Key/Black. Стандартная цветовая модель в офсетной печати.',
      ar: 'نظام الطباعة بأربعة ألوان: السماوي والأرجواني والأصفر والأسود. النموذج اللوني القياسي في الطباعة الأوفست.',
    },
  },
  {
    term: { tr: 'RGB', en: 'RGB', ru: 'RGB', ar: 'RGB' },
    definition: {
      tr: 'Red (kırmızı), Green (yeşil) ve Blue (mavi) ışık karışımına dayalı renk modeli. Ekran ve monitörlerde kullanılır; baskıya geçmeden önce CMYK\'ye dönüştürülür.',
      en: 'Color model based on mixing Red, Green, and Blue light. Used in screens and monitors; must be converted to CMYK before printing.',
      ru: 'Цветовая модель на основе смешения красного, зелёного и синего света. Используется на экранах; перед печатью конвертируется в CMYK.',
      ar: 'نموذج لوني يعتمد على خلط الضوء الأحمر والأخضر والأزرق. يُستخدم في الشاشات ويتحول إلى CMYK قبل الطباعة.',
    },
  },
  {
    term: { tr: 'PANTONE Rengi', en: 'PANTONE Color', ru: 'Цвет PANTONE', ar: 'لون بانتون' },
    definition: {
      tr: 'Pantone Matching System (PMS) tarafından tanımlanan standart nokta renkler. Her renk benzersiz bir kod taşır ve baskıda tutarlı renk üretimini sağlar.',
      en: 'Standardized spot colors defined by the Pantone Matching System (PMS). Each color carries a unique code ensuring consistent color reproduction in print.',
      ru: 'Стандартизированные плашечные цвета системы Pantone Matching System (PMS). Каждый цвет имеет уникальный код, обеспечивающий стабильное воспроизведение при печати.',
      ar: 'ألوان بقعية معيارية تحددها Pantone Matching System. يحمل كل لون رمزاً فريداً يضمن إعادة إنتاج لوني متسق في الطباعة.',
    },
  },
  {
    term: { tr: 'Spot Renk (Nokta Renk)', en: 'Spot Color', ru: 'Плашечный цвет', ar: 'اللون البقعي' },
    definition: {
      tr: 'CMYK karışımı yerine tek bir mürekkep rengiyle basılan özel renk. Daha yüksek renk doğruluğu ve parlak efektler sağlar.',
      en: 'A custom color printed with a single premixed ink instead of CMYK halftone dots. Provides higher color accuracy and vibrant effects.',
      ru: 'Специальный цвет, печатаемый одной заранее смешанной краской вместо CMYK-растра. Обеспечивает высокую точность цвета и яркие эффекты.',
      ar: 'لون مخصص يُطبع بحبر واحد جاهز بدلاً من نقاط CMYK النصفية. يوفر دقة لونية أعلى وتأثيرات زاهية.',
    },
  },
  {
    term: { tr: 'Delta E (ΔE)', en: 'Delta E (ΔE)', ru: 'Delta E (ΔE)', ar: 'دلتا إي (ΔE)' },
    definition: {
      tr: 'İki renk arasındaki algısal farkı ölçen birim. ΔE < 2 insan gözüyle ayırt edilemeyen fark anlamına gelir; baskı kalitesi değerlendirmesinde kritik öneme sahiptir.',
      en: 'Unit measuring the perceptual difference between two colors. ΔE < 2 indicates a difference indistinguishable by the human eye; critical for print quality assessment.',
      ru: 'Единица измерения воспринимаемого различия между двумя цветами. ΔE < 2 — разница, неразличимая человеческим глазом; критична для оценки качества печати.',
      ar: 'وحدة قياس الفرق الإدراكي بين لونين. ΔE < 2 يعني فرقاً لا يميزه العين البشرية؛ أساسي لتقييم جودة الطباعة.',
    },
  },
  {
    term: { tr: 'L*a*b* Renk Uzayı', en: 'L*a*b* Color Space', ru: 'Цветовое пространство L*a*b*', ar: 'فضاء اللون L*a*b*' },
    definition: {
      tr: 'CIE tarafından tanımlanan, insan göz algısına dayalı renk uzayı. L* parlaklık, a* yeşil-kırmızı ve b* mavi-sarı eksenlerini temsil eder. Renk ölçümlerinde evrensel referans standardıdır.',
      en: 'CIE-defined color space based on human visual perception. L* represents lightness, a* green-red, and b* blue-yellow axes. Universal reference standard for color measurement.',
      ru: 'Цветовое пространство CIE, основанное на восприятии человеческого зрения. L* — светлота, a* — зелёно-красная ось, b* — сине-жёлтая. Универсальный стандарт для измерения цвета.',
      ar: 'فضاء لوني معرّف من CIE يعتمد على الإدراك البصري البشري. L* هو الإضاءة، a* المحور الأخضر-الأحمر، b* المحور الأزرق-الأصفر.',
    },
  },
  {
    term: { tr: 'Renk Yönetimi', en: 'Color Management', ru: 'Управление цветом', ar: 'إدارة الألوان' },
    definition: {
      tr: 'Rengin farklı cihazlar (monitör, tarayıcı, baskı makinesi) arasında tutarlı biçimde yeniden üretilmesini sağlayan sistem ve süreçler bütünü.',
      en: 'The system and processes ensuring consistent color reproduction across different devices such as monitors, scanners, and printing presses.',
      ru: 'Система и процессы, обеспечивающие стабильное воспроизведение цвета на разных устройствах: мониторах, сканерах и печатных машинах.',
      ar: 'منظومة عمليات تضمن إعادة إنتاج الألوان باتساق عبر أجهزة مختلفة كالشاشات والماسحات والمطابع.',
    },
  },
  {
    term: { tr: 'ICC Profil', en: 'ICC Profile', ru: 'ICC-профиль', ar: 'ملف ICC' },
    definition: {
      tr: 'International Color Consortium standardında bir cihazın renk özelliklerini tanımlayan dosya. Renk dönüşümlerinde kullanılır ve baskıda doğru renk üretimini sağlar.',
      en: 'A file in International Color Consortium format that characterizes a device\'s color properties. Used in color conversions to ensure accurate color reproduction in print.',
      ru: 'Файл стандарта International Color Consortium, описывающий цветовые характеристики устройства. Используется при конвертации цветов для точного воспроизведения при печати.',
      ar: 'ملف بصيغة International Color Consortium يصف خصائص لون الجهاز. يُستخدم في تحويلات الألوان لضمان دقة الطباعة.',
    },
  },
  {
    term: { tr: 'Densitometre', en: 'Densitometer', ru: 'Денситометр', ar: 'مقياس الكثافة' },
    definition: {
      tr: 'Baskı yüzeyindeki mürekkep yoğunluğunu ölçen cihaz. Baskı kalitesinin kontrol edilmesinde ve standart mürekkep değerlerinin korunmasında kullanılır.',
      en: 'A device that measures ink density on a printed surface. Used for quality control and maintaining standard ink values.',
      ru: 'Прибор для измерения оптической плотности краски на печатной поверхности. Используется для контроля качества и поддержания стандартных значений краски.',
      ar: 'جهاز يقيس كثافة الحبر على السطح المطبوع. يُستخدم في مراقبة الجودة والحفاظ على قيم الحبر المعيارية.',
    },
  },
  {
    term: { tr: 'Spektrofotometre', en: 'Spectrophotometer', ru: 'Спектрофотометр', ar: 'مطياف ضوئي' },
    definition: {
      tr: 'Işığın dalga boylarını analiz ederek rengi nesnel olarak ölçen hassas cihaz. ICC profil oluşturma ve baskı kalibrasyon süreçlerinde kullanılır.',
      en: 'A precision instrument that objectively measures color by analyzing light wavelengths. Used in ICC profile creation and press calibration.',
      ru: 'Прецизионный прибор для объективного измерения цвета путём анализа длин волн света. Применяется при создании ICC-профилей и калибровке машин.',
      ar: 'جهاز دقيق يقيس اللون موضوعياً بتحليل الأطوال الموجية للضوء. يُستخدم في إنشاء ملفات ICC ومعايرة المطابع.',
    },
  },
  {
    term: { tr: 'Color Gamut (Renk Yelpazesi)', en: 'Color Gamut', ru: 'Цветовой охват', ar: 'مدى اللون' },
    definition: {
      tr: 'Bir renk üretim sisteminin (monitör, yazıcı vb.) üretebileceği renklerin toplam aralığı. CMYK offset baskının gamut\'u RGB ekrandan daha dardır.',
      en: 'The total range of colors a reproduction system (monitor, printer, etc.) can produce. CMYK offset printing gamut is narrower than an RGB screen.',
      ru: 'Полный диапазон цветов, которые может воспроизвести система (монитор, принтер и т. д.). Охват офсетной CMYK-печати уже, чем у RGB-экрана.',
      ar: 'المدى الكامل للألوان التي يستطيع نظام الإنتاج إنشاؤها. مدى الطباعة الأوفست CMYK أضيق من مدى شاشة RGB.',
    },
  },
  // ── Printing Process ────────────────────────────────────────────────────────
  {
    term: { tr: 'Ofset Baskı', en: 'Offset Printing', ru: 'Офсетная печать', ar: 'الطباعة الأوفست' },
    definition: {
      tr: 'Mürekkebin baskı plakasından kauçuk blanket\'e, oradan kâğıda aktarıldığı dolaylı baskı yöntemi. Yüksek baskı kalitesi ve hızı ile ticari baskının temelidir.',
      en: 'An indirect printing method where ink is transferred from a plate to a rubber blanket and then to paper. The foundation of commercial printing due to its high quality and speed.',
      ru: 'Косвенный способ печати, при котором краска переносится с пластины на резиновое полотно, а затем на бумагу. Основа коммерческой печати благодаря высокому качеству и скорости.',
      ar: 'طريقة طباعة غير مباشرة تُنقل فيها الحبر من اللوحة إلى البطانية المطاطية ثم إلى الورق. أساس الطباعة التجارية لجودتها وسرعتها.',
    },
  },
  {
    term: { tr: 'Tabaka Ofset', en: 'Sheetfed Offset', ru: 'Листовой офсет', ar: 'أوفست الصفائح' },
    definition: {
      tr: 'Baskının tek tek tabakalar (levhalar) halinde yapıldığı ofset baskı türü. Kısa-orta baskı adedinde ve yüksek kalite gerektiren işlerde tercih edilir.',
      en: 'A type of offset printing where individual sheets of paper are fed through the press. Preferred for short to medium print runs requiring high quality.',
      ru: 'Вид офсетной печати, при котором бумага подаётся отдельными листами. Предпочтителен для коротких и средних тиражей, требующих высокого качества.',
      ar: 'نوع من الطباعة الأوفست تُغذّى فيه ورقة واحدة في كل مرة. يُفضَّل للتشغيلات القصيرة والمتوسطة التي تتطلب جودة عالية.',
    },
  },
  {
    term: { tr: 'Web Ofset', en: 'Web Offset', ru: 'Рулонный офсет', ar: 'أوفست الرول' },
    definition: {
      tr: 'Kâğıdın rulo halinde beslendiği yüksek hızlı ofset baskı yöntemi. Gazete, dergi ve katalog gibi yüksek baskı adedi gerektiren işlerde kullanılır.',
      en: 'A high-speed offset printing method where paper is fed from a continuous roll (web). Used for high-volume jobs like newspapers, magazines, and catalogs.',
      ru: 'Высокоскоростной метод офсетной печати с подачей бумаги с рулона. Применяется для больших тиражей — газет, журналов, каталогов.',
      ar: 'طريقة طباعة أوفست عالية السرعة تُغذَّى فيها الورقة من لفافة مستمرة. تُستخدم للطباعة الكبيرة كالصحف والمجلات والكتالوجات.',
    },
  },
  {
    term: { tr: 'UV Baskı', en: 'UV Printing', ru: 'УФ-печать', ar: 'الطباعة فوق البنفسجية' },
    definition: {
      tr: 'Mürekkebin ultraviyole ışık ile anında kürlenerek (sertleşerek) kuruduğu baskı teknolojisi. Yüksek parlaklık, güçlü solma direnci ve hızlı üretim sağlar.',
      en: 'A printing technology where ink cures (dries) instantly under ultraviolet light. Provides high gloss, strong fade resistance, and fast production.',
      ru: 'Технология печати, при которой краска мгновенно отверждается под ультрафиолетовым излучением. Обеспечивает высокий глянец, стойкость к выцветанию и быстрое производство.',
      ar: 'تقنية طباعة يتصلب فيها الحبر فوراً تحت الأشعة فوق البنفسجية. توفر لمعاناً عالياً ومقاومة قوية للبهتان وإنتاجاً سريعاً.',
    },
  },
  {
    term: { tr: 'Flekso Baskı', en: 'Flexography', ru: 'Флексография', ar: 'الطباعة الفلكسوغرافية' },
    definition: {
      tr: 'Esnek kauçuk veya polimer baskı plakası kullanan yüksek hızlı rotasyon baskı yöntemi. Ambalaj, etiket ve oluklu mukavva baskısında yaygın olarak kullanılır.',
      en: 'A high-speed rotary printing method using flexible rubber or polymer plates. Widely used for packaging, labels, and corrugated cardboard.',
      ru: 'Высокоскоростной ротационный способ печати с гибкими резиновыми или полимерными пластинами. Широко применяется для упаковки, этикеток и гофрокартона.',
      ar: 'طريقة طباعة دوّارة عالية السرعة تستخدم لوحات مرنة من المطاط أو البوليمر. تُستخدم على نطاق واسع للتغليف والملصقات والكرتون المموج.',
    },
  },
  {
    term: { tr: 'Serigrafi (İpek Baskı)', en: 'Screen Printing (Serigraphy)', ru: 'Шелкография (трафаретная печать)', ar: 'الطباعة بالشاشة الحريرية' },
    definition: {
      tr: 'Mürekkebin bir şablon (ipek veya sentetik örgü) üzerinden baskı yüzeyine aktarıldığı baskı yöntemi. Tekstil, plastik, cam ve metal gibi çeşitli yüzeylere uygulanabilir.',
      en: 'A printing method where ink is pushed through a stencil (silk or synthetic mesh) onto the substrate. Applicable to textiles, plastics, glass, and metal.',
      ru: 'Метод печати, при котором краска продавливается через трафарет (шёлковая или синтетическая сетка) на поверхность. Применяется на текстиле, пластике, стекле и металле.',
      ar: 'طريقة طباعة تُدفع فيها الحبر عبر شابلون (شبكة حريرية أو اصطناعية) على الركيزة. تُطبَّق على المنسوجات والبلاستيك والزجاج والمعدن.',
    },
  },
  {
    term: { tr: 'Dijital Baskı', en: 'Digital Printing', ru: 'Цифровая печать', ar: 'الطباعة الرقمية' },
    definition: {
      tr: 'Baskı plakası gerektirmeden dijital dosyadan doğrudan baskı yapılan yöntem. Kısa ve değişken veri baskılarında idealdir; inkjet ve lazer teknolojileri kullanılır.',
      en: 'A printing method where output is produced directly from a digital file without the need for printing plates. Ideal for short runs and variable data; uses inkjet or laser technology.',
      ru: 'Способ печати, при котором изображение воспроизводится непосредственно из цифрового файла без пластин. Идеален для малых тиражей и переменных данных; применяется струйная или лазерная технология.',
      ar: 'طريقة طباعة تُنتج فيها المخرجات مباشرة من ملف رقمي دون الحاجة إلى لوحات طباعة. مثالية للتشغيلات القصيرة والبيانات المتغيرة.',
    },
  },
  {
    term: { tr: 'Letterpress (Yüksek Baskı)', en: 'Letterpress', ru: 'Высокая печать (леттерпресс)', ar: 'الطباعة الحرفية (ليترپريس)' },
    definition: {
      tr: 'Mürekkebin kabartmalı yüzeyden kâğıda doğrudan aktarıldığı en eski baskı tekniklerinden biri. Günümüzde lüks davetiye ve sanatsal baskılarda tercih edilmektedir.',
      en: 'One of the oldest printing techniques, where ink is transferred directly from a raised surface to paper. Today preferred for luxury invitations and artistic prints.',
      ru: 'Один из старейших методов печати: краска переносится непосредственно с рельефной поверхности на бумагу. Сегодня используется для роскошных приглашений и художественной печати.',
      ar: 'من أقدم تقنيات الطباعة حيث تُنقل الحبر مباشرة من سطح بارز إلى الورق. تُفضَّل اليوم للدعوات الفاخرة والمطبوعات الفنية.',
    },
  },
  // ── Inks ────────────────────────────────────────────────────────────────────
  {
    term: { tr: 'Mürekkep Viskozitesi', en: 'Ink Viscosity', ru: 'Вязкость краски', ar: 'لزوجة الحبر' },
    definition: {
      tr: 'Mürekkebin akışkanlık direncini ifade eden özellik. Ofset mürekkeplerde viskozite, baskı makinesi hızına ve ortam sıcaklığına göre ayarlanır; çok yüksek veya çok düşük viskozite baskı sorunlarına yol açar.',
      en: 'The property expressing a fluid\'s resistance to flow. In offset inks, viscosity is adjusted according to press speed and ambient temperature; too high or too low causes printing defects.',
      ru: 'Свойство, характеризующее сопротивление жидкости течению. В офсетных красках вязкость регулируется в зависимости от скорости машины и температуры; слишком высокая или низкая вязкость приводит к дефектам.',
      ar: 'الخاصية التي تعبّر عن مقاومة السائل للتدفق. في أحبار الأوفست تُضبط اللزوجة وفق سرعة الماكينة ودرجة الحرارة المحيطة.',
    },
  },
  {
    term: { tr: 'Tack (Yapışkanlık)', en: 'Tack', ru: 'Тэк (липкость)', ar: 'الالتصاق (تاك)' },
    definition: {
      tr: 'Mürekkebin baskı silindirleri ve blanket arasında gerilirken gösterdiği yapışma direnci. Yüksek tack kâğıt yüzey kopmalarına (picking) neden olabilirken, düşük tack kötü renk aktarımına yol açar.',
      en: 'The adhesive resistance an ink exhibits as it splits between printing cylinders and blanket. High tack can cause paper picking; low tack leads to poor ink transfer.',
      ru: 'Адгезионное сопротивление краски при расщеплении между цилиндрами и полотном. Высокий тэк вызывает вырыв ворса; низкий — плохой перенос краски.',
      ar: 'مقاومة لصق الحبر عند انقسامه بين أسطوانات الطباعة والبطانية. الالتصاق العالي قد يُسبب نتف الورق؛ والمنخفض يؤدي إلى ضعف نقل الحبر.',
    },
  },
  {
    term: { tr: 'Set-Off (Karşı Sayfa Kirliği)', en: 'Set-Off', ru: 'Отмарывание', ar: 'تلوث الصفحة العكسية' },
    definition: {
      tr: 'Henüz kurumamış mürekkebin, üstüne gelen sonraki tabakaya bulaşması. Anti-setoff pudra ve uygun istif mesafesi ile önlenir.',
      en: 'The transfer of wet ink from a freshly printed sheet to the back of the next sheet in the pile. Prevented with anti-set-off spray powder and proper stacking.',
      ru: 'Перенос сырой краски с только что напечатанного листа на оборотную сторону следующего. Предотвращается противоотмарочным спреем и правильным штабелированием.',
      ar: 'انتقال الحبر الرطب من ورقة مطبوعة حديثاً إلى ظهر الورقة التالية في الرزمة. يُمنع بمسحوق الرش المانع للتلوث والتكديس السليم.',
    },
  },
  {
    term: { tr: 'Mürekkep Kuruması', en: 'Ink Drying', ru: 'Высыхание краски', ar: 'جفاف الحبر' },
    definition: {
      tr: 'Ofset mürekkeplerinde kuruma oksidatif polimerizasyon, absorbsiyon ve buharlaşma mekanizmalarıyla gerçekleşir. Kuruma hızı mürekkep formülasyonuna, kâğıt türüne ve ortam koşullarına bağlıdır.',
      en: 'In offset inks, drying occurs through oxidative polymerization, absorption, and evaporation. Drying speed depends on ink formulation, paper type, and environmental conditions.',
      ru: 'В офсетных красках высыхание происходит путём окислительной полимеризации, впитывания и испарения. Скорость зависит от рецептуры краски, вида бумаги и условий окружающей среды.',
      ar: 'في أحبار الأوفست يحدث الجفاف عبر البلمرة التأكسدية والامتصاص والتبخر. تعتمد سرعته على تركيبة الحبر ونوع الورق والظروف البيئية.',
    },
  },
  {
    term: { tr: 'Emülsiyon (Mürekkep-Su)', en: 'Ink Emulsification', ru: 'Эмульгирование краски', ar: 'استحلاب الحبر' },
    definition: {
      tr: 'Ofset baskıda mürekkebin ıslak su formu solüsyonunu belirli ölçüde bünyesine alması. Kontrol dışı emülsiyon baskı kalitesini düşürür; ideal emülsiyon oranı %15-26 arasındadır.',
      en: 'The partial uptake of fountain solution water into offset ink during printing. Uncontrolled emulsification degrades print quality; the ideal emulsification rate is 15–26%.',
      ru: 'Частичное поглощение водного раствора увлажнения офсетной краской в процессе печати. Неконтролируемое эмульгирование снижает качество; оптимальный уровень — 15–26%.',
      ar: 'الامتصاص الجزئي لمحلول الترطيب المائي في حبر الأوفست أثناء الطباعة. الاستحلاب غير المسيطر عليه يُدهور الجودة؛ النسبة المثالية 15-26%.',
    },
  },
  {
    term: { tr: 'Fount Solution (Islak Form Solüsyonu)', en: 'Fountain Solution', ru: 'Увлажняющий раствор', ar: 'محلول التنديف' },
    definition: {
      tr: 'Ofset baskıda baskı dışı alanlara mürekkep gelmesini önlemek için kullanılan su bazlı solüsyon. pH ve iletkenlik değerleri düzenli kontrol edilmelidir.',
      en: 'A water-based solution in offset printing that prevents ink from adhering to non-image areas. pH and conductivity values must be regularly monitored.',
      ru: 'Водный раствор в офсетной печати, предотвращающий попадание краски на незапечатываемые участки. Значения pH и проводимости требуют регулярного контроля.',
      ar: 'محلول مائي في الطباعة الأوفست يمنع التصاق الحبر بالمناطق غير المطبوعة. يجب مراقبة قيم الحموضة والتوصيلية بانتظام.',
    },
  },
  {
    term: { tr: 'Mürekkep-Su Dengesi', en: 'Ink-Water Balance', ru: 'Баланс краска-вода', ar: 'توازن الحبر والماء' },
    definition: {
      tr: 'Ofset baskıda mürekkep ve fount solution miktarları arasındaki kritik denge. Bu dengenin bozulması toning, karşılaşma veya yıkama gibi baskı hatalarına yol açar.',
      en: 'The critical balance between ink and fountain solution quantities in offset printing. Disruption leads to defects such as toning, scumming, or washout.',
      ru: 'Критический баланс между количествами краски и увлажняющего раствора в офсетной печати. Нарушение вызывает дефекты: зажиривание, тенение или отмывание.',
      ar: 'التوازن الحرج بين كميتَي الحبر ومحلول الترطيب في الطباعة الأوفست. يؤدي اختلاله إلى عيوب مثل التلوث والتكنيه أو الغسيل.',
    },
  },
  {
    term: { tr: 'Mürekkep Filmi', en: 'Ink Film', ru: 'Плёнка краски', ar: 'طبقة الحبر' },
    definition: {
      tr: 'Baskı sırasında kâğıt veya başka bir yüzey üzerinde oluşan mürekkep tabakasının kalınlığı. Ofset baskıda genellikle 0,5–3 mikron arasındadır; kalınlık renk yoğunluğunu doğrudan etkiler.',
      en: 'The thickness of the ink layer formed on paper or another substrate during printing. In offset, typically 0.5–3 microns; thickness directly affects color density.',
      ru: 'Толщина слоя краски, формируемого на бумаге или другой подложке при печати. В офсете обычно 0,5–3 мкм; толщина напрямую влияет на оптическую плотность.',
      ar: 'سماكة طبقة الحبر المتشكّلة على الورق أو ركيزة أخرى أثناء الطباعة. في الأوفست تتراوح عادةً بين 0.5 و3 ميكرون، وتؤثر مباشرة في كثافة اللون.',
    },
  },
  // ── Materials ───────────────────────────────────────────────────────────────
  {
    term: { tr: 'Blanket (Kauçuk Örtü)', en: 'Blanket (Offset Blanket)', ru: 'Офсетное полотно', ar: 'بطانية الأوفست' },
    definition: {
      tr: 'Ofset baskıda mürekkebi baskı plakasından alıp kâğıda aktaran kauçuk kaplı silindir örtüsü. Kalitesi ve doluluk seviyesi baskı kalitesini doğrudan etkiler.',
      en: 'The rubber-coated cylinder covering in offset printing that transfers ink from the plate to the paper. Its quality and compressibility directly affect print quality.',
      ru: 'Резиновое покрытие цилиндра в офсетной печати, переносящее краску с пластины на бумагу. Качество и сжимаемость напрямую влияют на качество печати.',
      ar: 'غطاء الأسطوانة المطاطي في الطباعة الأوفست الذي ينقل الحبر من اللوحة إلى الورق. جودته وقابليته للانضغاط تؤثران مباشرة في جودة الطباعة.',
    },
  },
  {
    term: { tr: 'Aniloks Merdane', en: 'Anilox Roller', ru: 'Анилоксовый вал', ar: 'بكرة الأنيلوكس' },
    definition: {
      tr: 'Flekso ve serigrafi baskıda kullanılan, yüzeyi sabit geometrik hücrelerle kaplı hassas mürekkep aktarım merdanesi. Hücre hacmi, aktarılan mürekkep miktarını belirler.',
      en: 'A precision ink transfer roller used in flexo and screen printing, coated with fixed geometric cells. Cell volume determines the amount of ink transferred.',
      ru: 'Прецизионный передаточный вал во флексографии и трафаретной печати, покрытый фиксированными геометрическими ячейками. Объём ячеек определяет количество переносимой краски.',
      ar: 'بكرة نقل حبر دقيقة في الطباعة الفلكسوغرافية والشاشة الحريرية، مُغطّاة بخلايا هندسية ثابتة. حجم الخلية يحدد كمية الحبر المنقولة.',
    },
  },
  {
    term: { tr: 'Baskı Plakası', en: 'Printing Plate', ru: 'Печатная форма', ar: 'لوحة الطباعة' },
    definition: {
      tr: 'Baskı görüntüsünü taşıyan, genellikle alüminyum veya polimer malzemeden üretilen yüzey. Ofset baskıda CTP (Computer to Plate) teknolojisiyle üretilir.',
      en: 'A surface carrying the print image, typically made from aluminum or polymer. In offset printing produced using CTP (Computer to Plate) technology.',
      ru: 'Поверхность, несущая печатное изображение, как правило из алюминия или полимера. В офсетной печати изготавливается методом CTP (Computer to Plate).',
      ar: 'السطح الحامل لصورة الطباعة، مصنوع عادةً من الألومنيوم أو البوليمر. في الطباعة الأوفست يُنتج بتقنية CTP.',
    },
  },
  {
    term: { tr: 'Kâğıt Gramajı (GSM)', en: 'Paper Weight (GSM)', ru: 'Грамматура бумаги (г/м²)', ar: 'وزن الورق (جم/م²)' },
    definition: {
      tr: 'Bir metrekare kâğıdın gram cinsinden ağırlığı. Yaygın kullanım: 80 g/m² ofis kâğıdı, 115-170 g/m² kuşe dergi kâğıdı, 250-350 g/m² karton.',
      en: 'The weight in grams of one square metre of paper. Common uses: 80 g/m² office paper, 115–170 g/m² coated magazine paper, 250–350 g/m² cardboard.',
      ru: 'Масса в граммах одного квадратного метра бумаги. Типичные значения: 80 г/м² офисная бумага, 115–170 г/м² мелованная журнальная, 250–350 г/м² картон.',
      ar: 'وزن متر مربع واحد من الورق بالجرام. الاستخدامات الشائعة: 80 جم/م² ورق مكتبي، 115-170 جم/م² ورق مجلات مطلي، 250-350 جم/م² كرتون.',
    },
  },
  {
    term: { tr: 'Kuşe Kâğıt', en: 'Coated Paper', ru: 'Мелованная бумага', ar: 'الورق المطلي' },
    definition: {
      tr: 'Yüzeyi kil, kalsiyum karbonat veya benzeri maddelerle kaplanmış kâğıt türü. Pürüzsüz yüzeyi sayesinde yüksek çözünürlüklü baskı ve canlı renkler sağlar.',
      en: 'Paper coated with clay, calcium carbonate, or similar materials on its surface. The smooth surface enables high-resolution printing and vivid colors.',
      ru: 'Бумага с покрытием из каолина, карбоната кальция или аналогичных материалов. Гладкая поверхность обеспечивает высококачественную печать и яркие цвета.',
      ar: 'ورق مُغطَّى بطبقة من الطين أو كربونات الكالسيوم أو مواد مماثلة. يتيح سطحه الأملس طباعة عالية الدقة وألواناً زاهية.',
    },
  },
  // ── Quality ──────────────────────────────────────────────────────────────────
  {
    term: { tr: 'Nokta Kazanımı (Dot Gain)', en: 'Dot Gain', ru: 'Растискивание (Dot Gain)', ar: 'تمدد النقطة (دوت غين)' },
    definition: {
      tr: 'Baskı sırasında mürekkep noktalarının tasarımdaki hedef boyuttan daha büyük baskılması durumu. %10-20 dot gain normaldir; profiller bu değeri telafi edecek şekilde hazırlanır.',
      en: 'The condition where ink dots print larger than intended in the design. 10–20% dot gain is normal; ICC profiles are prepared to compensate for this value.',
      ru: 'Состояние, при котором растровые точки печатаются крупнее заданного размера. 10–20% растискивания — норма; ICC-профили готовятся с учётом этой компенсации.',
      ar: 'حالة تُطبع فيها نقاط الحبر أكبر من الحجم المستهدف في التصميم. 10-20% تمدد طبيعي؛ تُعدّ ملفات ICC للتعويض عن هذه القيمة.',
    },
  },
  {
    term: { tr: 'Trapping', en: 'Trapping', ru: 'Треппинг', ar: 'التداخل اللوني (ترابينج)' },
    definition: {
      tr: 'Baskı sırasında renk uyumsuzluklarını (pasör hatalarını) gizlemek için bitişik renk alanlarını biraz örtüştürme tekniği. Choke (küçültme) ve spread (büyütme) olarak iki türü vardır.',
      en: 'A technique of slightly overlapping adjacent color areas to hide misregistration during printing. Two types: choke (shrinking) and spread (expanding).',
      ru: 'Техника небольшого перекрытия смежных цветовых областей для скрытия несовмещения при печати. Два вида: choke (сжатие) и spread (расширение).',
      ar: 'تقنية تداخل طفيف بين مناطق الألوان المتجاورة لإخفاء سوء التطابق أثناء الطباعة. نوعان: choke (تقليص) وspread (توسيع).',
    },
  },
  {
    term: { tr: 'Pasör (Registration)', en: 'Registration', ru: 'Приводка (регистр)', ar: 'التطابق (ريجستريشن)' },
    definition: {
      tr: 'Çok renkli baskıda her renk tabakasının diğerleriyle tam olarak örtüşmesi. Pasör hatası renk saçılmalarına ve keskin olmayan baskılara yol açar.',
      en: 'In multicolor printing, the precise alignment of each color layer with the others. Registration errors cause color fringing and blurry prints.',
      ru: 'В многоцветной печати — точное совмещение каждого красочного слоя с остальными. Ошибки приводки вызывают цветовую окантовку и нечёткость.',
      ar: 'في الطباعة متعددة الألوان، التوافق الدقيق لكل طبقة لونية مع الأخريات. أخطاء التطابق تُسبب هالات لونية وطباعة ضبابية.',
    },
  },
  {
    term: { tr: 'GRACoL', en: 'GRACoL', ru: 'GRACoL', ar: 'GRACoL' },
    definition: {
      tr: 'General Requirements for Applications in Commercial Offset Lithography. ABD kaynaklı ticari ofset baskı standardı; kâğıt ve mürekkep değerlerini tanımlar.',
      en: 'General Requirements for Applications in Commercial Offset Lithography. A US-based commercial offset printing standard defining paper and ink values.',
      ru: 'Общие требования для коммерческой офсетной литографии. Американский стандарт коммерческой офсетной печати, определяющий параметры бумаги и краски.',
      ar: 'المتطلبات العامة لتطبيقات الطباعة الأوفست التجارية. معيار طباعة أوفست تجاري أمريكي يحدد قيم الورق والحبر.',
    },
  },
  {
    term: { tr: 'FOGRA', en: 'FOGRA', ru: 'FOGRA', ar: 'فوجرا' },
    definition: {
      tr: 'Almanya merkezli Grafik Teknoloji Araştırma Enstitüsü. Avrupa\'da ofset baskı standartlarını (FOGRA39, FOGRA51 vb.) belirleyen ve ICC profil karakterizasyon verisi yayımlayan kuruluş.',
      en: 'Germany-based Graphic Technology Research Institute. The organization that defines European offset printing standards (FOGRA39, FOGRA51, etc.) and publishes ICC profile characterization data.',
      ru: 'Немецкий исследовательский институт графических технологий. Организация, устанавливающая европейские стандарты офсетной печати (FOGRA39, FOGRA51 и др.) и публикующая данные ICC-профилей.',
      ar: 'معهد أبحاث التكنولوجيا الجرافيكية الألماني. يحدد معايير الطباعة الأوفست الأوروبية (FOGRA39 وFOGRA51 وغيرها) وينشر بيانات توصيف ملفات ICC.',
    },
  },
  {
    term: { tr: 'Baskı Standardizasyonu', en: 'Print Standardization', ru: 'Стандартизация печати', ar: 'توحيد معايير الطباعة' },
    definition: {
      tr: 'Baskı sürecini tutarlı ve ölçülebilir kılmak için tanımlı parametrelere (mürekkep yoğunluğu, dot gain, beyaz nokta vb.) bağlı kalınması. ISO 12647 serisi temel standarttır.',
      en: 'Adhering to defined parameters (ink density, dot gain, white point, etc.) to make the print process consistent and measurable. ISO 12647 series is the foundational standard.',
      ru: 'Соблюдение определённых параметров (оптическая плотность, растискивание, белая точка и т. д.) для обеспечения стабильного и измеримого процесса печати. Основа — серия ISO 12647.',
      ar: 'الالتزام بمعاملات محددة (كثافة الحبر وتمدد النقطة والنقطة البيضاء) لجعل عملية الطباعة متسقة وقابلة للقياس. المعيار الأساسي هو ISO 12647.',
    },
  },
  {
    term: { tr: 'Renk Tutarlılığı', en: 'Color Consistency', ru: 'Стабильность цвета', ar: 'اتساق الألوان' },
    definition: {
      tr: 'Aynı baskı işinin farklı zamanlarda, farklı makinelerde veya farklı tesislerde aynı renk sonuçlarını üretme kapasitesi. Delta E ölçümleri ile doğrulanır.',
      en: 'The capacity to produce the same color results for the same job at different times, on different machines, or at different facilities. Verified through Delta E measurements.',
      ru: 'Способность воспроизводить одинаковые цветовые результаты для одного задания в разное время, на разных машинах или в разных цехах. Проверяется измерением Delta E.',
      ar: 'قدرة إنتاج نتائج لونية متطابقة لنفس المهمة في أوقات أو آلات أو منشآت مختلفة. يُتحقق منها بقياسات Delta E.',
    },
  },
  {
    term: { tr: 'Kalibrasyon', en: 'Calibration', ru: 'Калибровка', ar: 'المعايرة' },
    definition: {
      tr: 'Baskı makinesini, monitörü veya diğer cihazları bilinen bir referans duruma getirme işlemi. Düzenli kalibrasyon renk tutarlılığı ve baskı kalitesini korumak için zorunludur.',
      en: 'The process of bringing a press, monitor, or other device to a known reference state. Regular calibration is essential for maintaining color consistency and print quality.',
      ru: 'Процесс приведения машины, монитора или другого устройства к известному эталонному состоянию. Регулярная калибровка необходима для стабильности цвета и качества печати.',
      ar: 'عملية إعادة الماكينة أو الشاشة أو الجهاز إلى حالة مرجعية معروفة. المعايرة المنتظمة ضرورية للحفاظ على اتساق الألوان وجودة الطباعة.',
    },
  },
  // ── Pre-press ────────────────────────────────────────────────────────────────
  {
    term: { tr: 'Prepress (Baskı Öncesi)', en: 'Prepress', ru: 'Допечатная подготовка', ar: 'ما قبل الطباعة (پريپريس)' },
    definition: {
      tr: 'Baskı makinesine plaka gitmeden önce gerçekleştirilen tüm tasarım, renk ayrımı, impo düzeni ve kontrol süreçleri. CTP ve RIP bu aşamanın temel teknolojileridir.',
      en: 'All design, color separation, imposition, and proofing processes that take place before the plate goes to the press. CTP and RIP are the key technologies of this stage.',
      ru: 'Все процессы дизайна, цветоделения, спуска полос и контроля, выполняемые до отправки пластины на машину. Ключевые технологии этапа — CTP и RIP.',
      ar: 'جميع عمليات التصميم وفصل الألوان والفرز والتدقيق قبل إرسال اللوحة إلى الماكينة. CTP وRIP هما التقنيتان الرئيسيتان لهذه المرحلة.',
    },
  },
  {
    term: { tr: 'CTP (Computer to Plate)', en: 'CTP (Computer to Plate)', ru: 'CTP (Computer to Plate)', ar: 'CTP (كمبيوتر إلى لوحة)' },
    definition: {
      tr: 'Dijital dosyadan baskı plakasını doğrudan lazerle yazan teknoloji. Film aşamasını ortadan kaldırır, daha keskin plaka ve hızlı baskı süreci sağlar.',
      en: 'Technology that directly writes the printing plate from a digital file using a laser. Eliminates the film stage, providing sharper plates and a faster press process.',
      ru: 'Технология, записывающая лазером печатную форму напрямую из цифрового файла. Устраняет плёночный этап, обеспечивая более чёткие пластины и быстрый процесс.',
      ar: 'تقنية تكتب لوحة الطباعة مباشرةً من ملف رقمي بالليزر. تُلغي مرحلة الفيلم وتوفر لوحات أكثر حدة وعملية طباعة أسرع.',
    },
  },
  {
    term: { tr: 'RIP (Raster Image Processor)', en: 'RIP (Raster Image Processor)', ru: 'RIP (растровый процессор)', ar: 'RIP (معالج الصورة النقطية)' },
    definition: {
      tr: 'Vektör ve piksel tabanlı dijital dosyaları baskı aygıtı için nokta (raster) veriye dönüştüren yazılım veya donanım. Renk yönetimi ve tarama (screening) de RIP bünyesinde gerçekleşir.',
      en: 'Software or hardware that converts vector and pixel-based digital files into raster (dot) data for the output device. Color management and screening also occur within the RIP.',
      ru: 'Программный или аппаратный растровый процессор, преобразующий цифровые файлы в растровые данные для устройства вывода. Управление цветом и растрирование также выполняются в RIP.',
      ar: 'برنامج أو جهاز يحوّل الملفات الرقمية إلى بيانات نقطية لجهاز الإخراج. إدارة الألوان والتنقيط تجريان أيضاً داخل RIP.',
    },
  },
  {
    term: { tr: 'Overprint', en: 'Overprint', ru: 'Наложение (оверпринт)', ar: 'الطباعة فوق (أوفرپرينت)' },
    definition: {
      tr: 'Bir renk katmanının altındaki renk katmanını silmek yerine üstüne baskı yapması. Siyah metinlerde genellikle uygulanır; renk karışımlarına dikkat edilmelidir.',
      en: 'A setting where one color layer prints on top of another rather than knocking it out. Typically applied to black text; color mixing must be carefully considered.',
      ru: 'Настройка, при которой один цветовой слой печатается поверх другого, не удаляя его. Обычно применяется для чёрного текста; необходимо учитывать смешение цветов.',
      ar: 'إعداد يطبع فيه طبقة لونية فوق أخرى بدلاً من إزالتها. يُطبَّق عادةً على النصوص السوداء مع مراعاة خلط الألوان.',
    },
  },
  {
    term: { tr: 'Choke ve Spread', en: 'Choke and Spread', ru: 'Choke и Spread', ar: 'تقليص وتوسيع (تشوك وسبريد)' },
    definition: {
      tr: 'Trapping yöntemleri: Spread (büyütme) açık nesneyi koyu arka plana karşı büyütür; Choke (küçültme) arka planı nesne içine doğru büyütür. Her ikisi pasör hatalarını gizler.',
      en: 'Trapping methods: Spread enlarges a light object against a dark background; Choke grows the background into the object. Both hide registration errors.',
      ru: 'Методы треппинга: Spread расширяет светлый объект на тёмном фоне; Choke расширяет фон в объект. Оба скрывают ошибки приводки.',
      ar: 'طرق الترابينج: Spread يوسّع كائناً فاتحاً على خلفية داكنة؛ Choke يوسّع الخلفية داخل الكائن. كلاهما يخفي أخطاء التطابق.',
    },
  },
  {
    term: { tr: 'Moiré', en: 'Moiré', ru: 'Муар', ar: 'موارية (موريه)' },
    definition: {
      tr: 'Yarı ton tarama açılarının yanlış ayarlanması sonucu baskıda beliren istenmeyen desen veya ızgara efekti. Doğru tarama açıları (C:15°, M:75°, Y:90°, K:45°) ile önlenir.',
      en: 'An unwanted pattern or grid effect appearing in print due to incorrect halftone screen angles. Prevented with correct screen angles (C:15°, M:75°, Y:90°, K:45°).',
      ru: 'Нежелательный узор или решётчатый эффект, возникающий при неправильных углах растра. Предотвращается правильными углами растрирования (C:15°, M:75°, Y:90°, K:45°).',
      ar: 'نمط غير مرغوب أو تأثير شبكي يظهر في الطباعة بسبب زوايا النصف النقطي الخاطئة. يُمنع بالزوايا الصحيحة (C:15° M:75° Y:90° K:45°).',
    },
  },
  {
    term: { tr: 'Rozet (Rosette)', en: 'Rosette', ru: 'Розетка (rosette)', ar: 'الوردية (روزيت)' },
    definition: {
      tr: 'CMYK tarama noktalarının düzgün açılarda birleşmesiyle oluşan çiçek benzeri mikro desen. Doğru tarama açılarıyla kaçınılmaz olan bu desen yüksek kaliteli baskının göstergesidir.',
      en: 'The flower-like micro pattern formed by CMYK halftone dots merging at correct angles. An unavoidable feature of correct screen angles, it is a sign of quality printing.',
      ru: 'Цветочный микроузор, образующийся при совмещении CMYK-растровых точек под правильными углами. Неизбежный результат корректного растрирования — признак качественной печати.',
      ar: 'النمط الدقيق الشبيه بالزهرة الناتج عن تلاقي نقاط نصف CMYK بزوايا صحيحة. سمة حتمية للطباعة الجيدة.',
    },
  },
  {
    term: { tr: 'Halftone (Yarı Ton)', en: 'Halftone', ru: 'Растр (полутон)', ar: 'نصف النبرة (هالفتون)' },
    definition: {
      tr: 'Sürekli ton görüntülerin farklı büyüklüklerde noktalar kullanılarak simüle edilme yöntemi. Baskı makineleri tam ton üretmediğinden halftone tekniği renk geçişlerini mümkün kılar.',
      en: 'The method of simulating continuous-tone images using dots of varying sizes. Since printing presses cannot produce true continuous tones, halftone makes color gradations possible.',
      ru: 'Метод имитации полутоновых изображений с помощью точек разного размера. Так как машины не воспроизводят непрерывный тон, растр обеспечивает цветовые переходы.',
      ar: 'طريقة محاكاة الصور ذات التدرج المستمر باستخدام نقاط بأحجام متفاوتة. إذ لا تنتج الآلات تدرجاً مستمراً حقيقياً، يُتيح النصف النقطي الانتقالات اللونية.',
    },
  },
  {
    term: { tr: 'AM Tarama (Amplitüd Modülasyonlu)', en: 'AM Screening', ru: 'AM-растрирование', ar: 'التنقيط AM' },
    definition: {
      tr: 'Noktaların sabit aralıklarla dizildiği, boyutlarının (amplitüdünün) renk yoğunluğuna göre değiştiği geleneksel halftone tarama yöntemi.',
      en: 'The traditional halftone screening method where dots are arranged at fixed intervals and their size (amplitude) varies according to color density.',
      ru: 'Традиционный метод растрирования, при котором точки расположены с фиксированным шагом, а их размер (амплитуда) изменяется в зависимости от оптической плотности.',
      ar: 'طريقة التنقيط الكلاسيكية حيث تُرتَّب النقاط بمسافات ثابتة ويتغير حجمها (السعة) وفق كثافة اللون.',
    },
  },
  {
    term: { tr: 'FM Tarama (Frekans Modülasyonlu)', en: 'FM Screening (Stochastic)', ru: 'FM-растрирование (стохастическое)', ar: 'التنقيط FM (العشوائي)' },
    definition: {
      tr: 'Noktaların boyutlarının sabit kaldığı ancak rastgele (stokastik) yerleştirildiği tarama yöntemi. Moiré oluşumunu engeller ve çok ince detaylar için uygundur.',
      en: 'A screening method where dot sizes remain constant but are placed randomly (stochastically). Eliminates moiré and is suited for very fine detail reproduction.',
      ru: 'Метод растрирования, при котором размер точек постоянен, но расположение случайное (стохастическое). Устраняет муар и подходит для воспроизведения мелких деталей.',
      ar: 'طريقة تنقيط تبقى فيها أحجام النقاط ثابتة لكنها تُوضَع بشكل عشوائي. تلغي الموارية ومناسبة لاستنساخ التفاصيل الدقيقة جداً.',
    },
  },
  // ── Finishing ────────────────────────────────────────────────────────────────
  {
    term: { tr: 'Vernik', en: 'Varnish', ru: 'Лак', ar: 'الورنيش' },
    definition: {
      tr: 'Baskılı yüzeyi korumak ve estetik görünümü geliştirmek için uygulanan saydam kaplama. Dispersiyon, UV ve ıslak ofset vernik türleri bulunmaktadır.',
      en: 'A transparent coating applied to a printed surface to protect it and enhance its aesthetic appearance. Types include dispersion, UV, and wet offset varnish.',
      ru: 'Прозрачное покрытие, наносимое на печатную поверхность для защиты и улучшения внешнего вида. Виды: дисперсионный, УФ и офсетный лак.',
      ar: 'طلاء شفاف يُوضَع على السطح المطبوع لحمايته وتحسين مظهره. الأنواع: تشتتي وUV وورنيش أوفست رطب.',
    },
  },
  {
    term: { tr: 'Dispersiyon Vernik (Lak)', en: 'Dispersion Varnish', ru: 'Дисперсионный лак', ar: 'الورنيش التشتتي' },
    definition: {
      tr: 'Su bazlı polimer dispersiyonu içeren, baskı makinesinin laklama ünitesinde ya da ayrı bir kaplama makinesinde uygulanan vernik türü. Hızlı kuruma ve çevre dostu özellik sunar.',
      en: 'A water-based polymer dispersion varnish applied in the press\'s coating unit or a separate coater. Offers fast drying and an eco-friendly profile.',
      ru: 'Лак на основе водной полимерной дисперсии, наносимый в лакировальной секции машины или отдельном устройстве. Обеспечивает быстрое высыхание и экологичность.',
      ar: 'ورنيش بوليمر مائي التشتت يُطبَّق في وحدة الطلاء بالماكينة أو آلة طلاء منفصلة. يوفر جفافاً سريعاً وخصائص صديقة للبيئة.',
    },
  },
  {
    term: { tr: 'UV Vernik', en: 'UV Varnish', ru: 'УФ-лак', ar: 'ورنيش UV' },
    definition: {
      tr: 'Ultraviyole ışıkla anında kürlenen yüksek parlaklıkta vernik. Baskı yüzeyini mekanik hasara ve neme karşı güçlü biçimde korur; mat veya parlak yüzey seçeneği sunar.',
      en: 'A high-gloss varnish that cures instantly under ultraviolet light. Strongly protects the printed surface against mechanical damage and moisture; available in matte or gloss.',
      ru: 'Высокоглянцевый лак, мгновенно отверждающийся под UV-излучением. Надёжно защищает поверхность от механических повреждений и влаги; доступен в матовом и глянцевом исполнении.',
      ar: 'ورنيش عالي اللمعان يتصلّب فوراً تحت الأشعة فوق البنفسجية. يحمي السطح المطبوع بقوة من التلف الميكانيكي والرطوبة؛ متاح بخيار مطفأ ولامع.',
    },
  },
  {
    term: { tr: 'Laminasyon', en: 'Lamination', ru: 'Ламинирование', ar: 'التلميع (لامينيشن)' },
    definition: {
      tr: 'Baskılı kâğıt veya kartonu ince bir plastik film tabakasıyla kaplama işlemi. Mat, parlak veya soft-touch yüzey seçenekleri mevcuttur; dayanıklılık ve estetik katkı sağlar.',
      en: 'The process of bonding a thin plastic film to printed paper or board. Available in matte, gloss, or soft-touch finishes; adds durability and visual appeal.',
      ru: 'Нанесение тонкой пластиковой плёнки на печатную бумагу или картон. Доступны матовая, глянцевая и soft-touch отделки; повышает прочность и эстетику.',
      ar: 'عملية ربط طبقة بلاستيكية رفيعة بالورق أو الكرتون المطبوع. متاحة بتشطيبات مطفأة ولامعة وناعمة (soft-touch)؛ تُضيف متانة وجمالاً.',
    },
  },
  {
    term: { tr: 'Sıcak Yaldız (Hot Foil Stamping)', en: 'Hot Foil Stamping', ru: 'Горячее тиснение фольгой', ar: 'ختم الرقائق الساخنة' },
    definition: {
      tr: 'Isı ve basınç yardımıyla metalik veya holografik folyanın baskı yüzeyine aktarıldığı bitirme tekniği. Lüks ambalaj, davetiye ve etiketlerde altın-gümüş parlaklık efekti sağlar.',
      en: 'A finishing technique where metallic or holographic foil is transferred to the printed surface using heat and pressure. Provides gold or silver brilliance on luxury packaging, invitations, and labels.',
      ru: 'Отделочная техника, при которой металлическая или голографическая фольга переносится на поверхность с помощью тепла и давления. Создаёт золотой или серебряный блеск на люкс-упаковке, приглашениях и этикетках.',
      ar: 'تقنية تشطيب تُنقل فيها رقائق معدنية أو هولوغرافية إلى السطح المطبوع بالحرارة والضغط. توفر بريقاً ذهبياً أو فضياً على التغليف الفاخر والدعوات والملصقات.',
    },
  },
  {
    term: { tr: 'Kabartma (Embossing)', en: 'Embossing', ru: 'Тиснение (эмбоссинг)', ar: 'النقش البارز (إمبوسينج)' },
    definition: {
      tr: 'Kâğıt veya kartonun belirli alanlarını kalıp yardımıyla üç boyutlu olarak kabartan bitirme tekniği. Debossing ise tam tersi yönde baskı yapar.',
      en: 'A finishing technique that creates a three-dimensional raised area on paper or board using a die. Debossing works in the opposite direction, creating a recessed effect.',
      ru: 'Отделочная техника, создающая трёхмерный рельеф на бумаге или картоне с помощью штампа. Дебоссинг действует в обратном направлении, создавая углублённый эффект.',
      ar: 'تقنية تشطيب تُنشئ منطقة بارزة ثلاثية الأبعاد على الورق أو الكرتون باستخدام قالب. الدبوسينج يعمل في الاتجاه المعاكس خالقاً تأثيراً غائراً.',
    },
  },
  // ── Additional terms to reach 50+ ──────────────────────────────────────────
  {
    term: { tr: 'İmpo (Baskı Düzeni)', en: 'Imposition', ru: 'Спуск полос (импозиция)', ar: 'ترتيب الصفحات (إمبوزيشن)' },
    definition: {
      tr: 'Baskı tabakasının her iki yüzünde sayfa sıralarını ve yönlerini doğru biçimde düzenleyerek katlandığında kitap veya broşür haline gelmesini sağlayan prepress işlemi.',
      en: 'A prepress operation that correctly arranges page sequences and orientations on both sides of the print sheet so that when folded it forms a book or brochure.',
      ru: 'Допечатная операция, правильно расставляющая страницы на обеих сторонах листа так, чтобы при фальцовке получилась книга или брошюра.',
      ar: 'عملية ما قبل الطباعة ترتّب فيها الصفحات وتوجهاتها بشكل صحيح على وجهَي الورقة لتُشكّل كتاباً أو كتيباً عند طيّها.',
    },
  },
  {
    term: { tr: 'Renk Ayrımı (Color Separation)', en: 'Color Separation', ru: 'Цветоделение', ar: 'فصل الألوان' },
    definition: {
      tr: 'Renkli görüntünün CMYK bileşenlerine veya özel renklere ayrıştırılması. Her kanal ayrı bir baskı plakasına karşılık gelir.',
      en: 'The process of splitting a color image into CMYK components or special colors. Each channel corresponds to a separate printing plate.',
      ru: 'Разложение цветного изображения на CMYK-компоненты или специальные цвета. Каждый канал соответствует отдельной печатной форме.',
      ar: 'تقسيم الصورة الملوّنة إلى مكونات CMYK أو ألوان خاصة. كل قناة تقابل لوحة طباعة منفصلة.',
    },
  },
  {
    term: { tr: 'Proof (Baskı Özeti)', en: 'Proof', ru: 'Пруф (цветопроба)', ar: 'بروف (دليل الطباعة)' },
    definition: {
      tr: 'Baskıya geçmeden önce müşteri onayı için hazırlanan renk ve içerik doğrulama kopyası. Soft proof dijital ortamda, hard proof ise fiziksel olarak üretilir.',
      en: 'A color and content verification copy prepared for client approval before going to press. Soft proof is digital; hard proof is physically produced.',
      ru: 'Копия для цветового и содержательного контроля, подготавливаемая для утверждения клиентом перед печатью. Мягкая цветопроба — цифровая; твёрдая — физическая.',
      ar: 'نسخة للتحقق من الألوان والمحتوى تُعدّ لموافقة العميل قبل الطباعة. البروف الناعم رقمي؛ والصلب مادي.',
    },
  },
  {
    term: { tr: 'Taşma (Bleed)', en: 'Bleed', ru: 'Вылет (блид)', ar: 'المسافة الزائدة (بليد)' },
    definition: {
      tr: 'Kesim payını karşılamak için tasarım elemanlarının sayfa kenarlarının ötesine taşırılması. Standart taşma miktarı 3-5 mm\'dir.',
      en: 'Extending design elements beyond the page edge to account for cutting tolerance. Standard bleed is 3–5 mm.',
      ru: 'Выход элементов дизайна за край страницы для компенсации допусков при резке. Стандартный вылет — 3–5 мм.',
      ar: 'امتداد عناصر التصميم خارج حافة الصفحة لتعويض تفاوتات القطع. المسافة المعيارية 3-5 ملم.',
    },
  },
  {
    term: { tr: 'Güvenli Alan (Safe Zone)', en: 'Safe Zone', ru: 'Безопасная зона', ar: 'المنطقة الآمنة' },
    definition: {
      tr: 'Sayfa kenarından belirli bir mesafede tutulan, önemli içeriklerin (metin, logo) kesim sırasında zarar görmemesi için kullanılan iç bölge. Genellikle 3-5 mm kenar boşluğu önerilir.',
      en: 'An inner zone kept at a defined distance from the page edge to ensure critical content (text, logo) is not damaged during trimming. Typically 3–5 mm margin is recommended.',
      ru: 'Внутренняя зона на заданном расстоянии от края страницы, обеспечивающая сохранность важного содержимого при обрезке. Рекомендуется отступ 3–5 мм.',
      ar: 'منطقة داخلية على مسافة محددة من حافة الصفحة تضمن عدم تلف المحتوى الحيوي (النصوص والشعارات) أثناء القطع. يُوصى عادةً بهامش 3-5 ملم.',
    },
  },
  {
    term: { tr: 'Çift Taraflı Baskı (Duplex)', en: 'Duplex Printing', ru: 'Двусторонняя печать', ar: 'الطباعة المزدوجة (دوبلكس)' },
    definition: {
      tr: 'Kâğıdın her iki yüzüne baskı yapılması. Tabaka ofset makinelerinde ön-arka baskı ayrı pasajlarda yapılırken, perfektör baskı makineleri tek geçişte iki yüzü basar.',
      en: 'Printing on both sides of the sheet. In sheetfed presses, front and back are printed in separate passes; perfector presses print both sides in a single pass.',
      ru: 'Печать на обеих сторонах листа. В листовых машинах лицо и оборот печатаются в разных прогонах; перфекторные машины запечатывают обе стороны за один прогон.',
      ar: 'الطباعة على وجهَي الورقة. في مطابع الصفائح يُطبع الوجه والظهر في مرورَين منفصلَين؛ بينما تطبع آلات البيرفكتور كلا الوجهين في مرور واحد.',
    },
  },
  {
    term: { tr: 'Pantone Köprüsü (Pantone Bridge)', en: 'Pantone Bridge', ru: 'Pantone Bridge', ar: 'جسر بانتون' },
    definition: {
      tr: 'Pantone spot renklerin CMYK karşılıklarını ve ekranda nasıl göründüklerini gösteren referans rehberi. Tasarımcı ile matbaaların ortak dil kullanmasını sağlar.',
      en: 'A reference guide showing the CMYK equivalents of Pantone spot colors and how they appear on screen. Enables designers and printers to use a common language.',
      ru: 'Справочное руководство, показывающее CMYK-эквиваленты плашечных цветов Pantone и их отображение на экране. Обеспечивает общий язык между дизайнером и типографией.',
      ar: 'دليل مرجعي يُظهر مكافئات CMYK لألوان بانتون البقعية وكيف تبدو على الشاشة. يُتيح لغةً مشتركة بين المصممين والمطابع.',
    },
  },
  {
    term: { tr: 'İnce Film Transferi (Thin Ink Film)', en: 'Thin Ink Film Transfer', ru: 'Перенос тонкой краски', ar: 'نقل طبقة الحبر الرفيعة' },
    definition: {
      tr: 'Ofset baskıda mürekkebin baskı sistemleri arasındaki ince film transferi sürecinin hassas kontrolü. Renk tutarlılığı için kritik olan bu süreç mürekkep merdane sistemiyle yönetilir.',
      en: 'The precise control of the thin ink film transfer process between the printing units in offset. Managed by the ink roller train, this process is critical for color consistency.',
      ru: 'Точный контроль переноса тонкой красочной плёнки между секциями офсетной машины. Управляется системой красочных валов; критически важен для стабильности цвета.',
      ar: 'التحكم الدقيق في عملية نقل طبقة الحبر الرفيقة بين وحدات الطباعة الأوفست. تُدار بمنظومة بكرات الحبر وهي حيوية لاتساق الألوان.',
    },
  },
  {
    term: { tr: 'Baskı Makinesi Hızı (Baskı Sürati)', en: 'Press Speed', ru: 'Скорость печатной машины', ar: 'سرعة الماكينة' },
    definition: {
      tr: 'Baskı makinesinin saatte bastığı tabaka veya metre sayısı. Daha yüksek hız daha kısa iş teslim süresi anlamına gelirken, mürekkep kuruması ve renk dengesi için dikkat gerektirir.',
      en: 'The number of sheets or meters a press prints per hour. Higher speed means shorter turnaround, but requires careful attention to ink drying and color balance.',
      ru: 'Количество листов или метров, которые печатная машина производит в час. Более высокая скорость сокращает сроки, но требует внимания к высыханию краски и цветовому балансу.',
      ar: 'عدد الصفائح أو الأمتار التي تطبعها الماكينة في الساعة. السرعة الأعلى تعني تسليماً أسرع لكنها تستدعي الانتباه لجفاف الحبر وتوازن الألوان.',
    },
  },
  {
    term: { tr: 'Mürekkep Merdane Sistemi', en: 'Ink Roller Train', ru: 'Красочная система (система валиков)', ar: 'منظومة بكرات الحبر' },
    definition: {
      tr: 'Ofset baskı makinesinde mürekkebi mürekkep haznesinden baskı plakasına eşit biçimde dağıtan seri merdaneler sistemi. Dağıtım merdaneleri, form merdaneleri ve aktarma merdanelerinden oluşur.',
      en: 'The series of rollers in an offset press that evenly distributes ink from the ink fountain to the printing plate. Comprises distribution, form, and transfer rollers.',
      ru: 'Система валов в офсетной машине, равномерно распределяющих краску от красочного ящика до печатной формы. Включает раскатные, накатные и передаточные валы.',
      ar: 'سلسلة بكرات في ماكينة الأوفست توزّع الحبر بالتساوي من حوض الحبر إلى لوحة الطباعة. تتألف من بكرات التوزيع والنقل والتطبيق.',
    },
  },
  {
    term: { tr: 'Islak Üstüne Islak Baskı (Wet-on-Wet)', en: 'Wet-on-Wet Printing', ru: 'Печать «мокрое на мокрое»', ar: 'طباعة رطب على رطب' },
    definition: {
      tr: 'Önceki renk katmanının kuruması beklenmeksizin bir sonraki rengin hemen üstüne basılması. Çok renkli ofset makinelerinde standart uygulamadır; mürekkep tack sıralaması önem taşır.',
      en: 'Printing the next color immediately on top of a still-wet previous color layer without waiting for it to dry. Standard practice in multicolor presses; ink tack sequence is crucial.',
      ru: 'Нанесение следующего цвета поверх ещё не высохшего предыдущего слоя без ожидания. Стандарт на многосекционных машинах; последовательность тэка красок имеет ключевое значение.',
      ar: 'طباعة اللون التالي فوق طبقة اللون السابق الرطبة فوراً دون انتظار الجفاف. الممارسة المعيارية في مطابع الألوان المتعددة؛ ترتيب الالتصاق حيوي.',
    },
  },
  {
    term: { tr: 'Rulo Kesiği (Web Break)', en: 'Web Break', ru: 'Обрыв полотна', ar: 'انكسار الرول' },
    definition: {
      tr: 'Web ofset baskıda kâğıt rulosunun yüksek hız veya gerilim nedeniyle kopması. Büyük materyel kayıplarına ve makine duruşuna yol açar.',
      en: 'The tearing of the paper web in web offset printing due to high speed or tension. Causes significant material loss and press downtime.',
      ru: 'Разрыв бумажного полотна на рулонной офсетной машине из-за высокой скорости или натяжения. Приводит к значительным потерям материала и простою машины.',
      ar: 'تمزق لفة الورق في الطباعة الأوفست الدوّارة بسبب السرعة العالية أو الشد. يُسبب خسائر فادحة في المواد وتوقف الماكينة.',
    },
  },
  {
    term: { tr: 'Mürekkep Dağıtımı (Ink Distribution)', en: 'Ink Distribution', ru: 'Распределение краски', ar: 'توزيع الحبر' },
    definition: {
      tr: 'Mürekkebin baskı sistemi boyunca homojen biçimde yayılması. Düzensiz dağılım renk farklılıklarına (density variation) ve bantlanma etkisine (banding) yol açar.',
      en: 'The homogeneous spreading of ink throughout the printing system. Uneven distribution leads to color variations (density variation) and banding effects.',
      ru: 'Равномерное распределение краски по всей красочной системе. Неравномерное распределение вызывает перепады плотности и полошение.',
      ar: 'الانتشار المتجانس للحبر عبر منظومة الطباعة. يؤدي التوزيع غير المنتظم إلى تفاوتات كثافة اللون وتأثيرات التخطيط.',
    },
  },
  {
    term: { tr: 'Renk Profili Atama (Profile Assignment)', en: 'Profile Assignment', ru: 'Назначение профиля', ar: 'تعيين الملف الشخصي للألوان' },
    definition: {
      tr: 'Bir görüntüye kaynak ICC profili atanması; görüntünün renk uzayının tanımlanmasını sağlar. Yanlış profil ataması renk kaymalarına ve baskı hatalarına yol açar.',
      en: 'Assigning a source ICC profile to an image, defining the color space the image is in. Incorrect assignment leads to color shifts and printing errors.',
      ru: 'Присвоение исходного ICC-профиля изображению, определяющее его цветовое пространство. Неправильное назначение вызывает цветовые сдвиги и ошибки при печати.',
      ar: 'تعيين ملف ICC المصدر للصورة لتحديد فضائها اللوني. التعيين الخاطئ يؤدي إلى انجراف لوني وأخطاء في الطباعة.',
    },
  },
  {
    term: { tr: 'Toplam Mürekkep Sınırı (TAC/TIL)', en: 'Total Area Coverage (TAC/TIL)', ru: 'Суммарное красочное покрытие (TAC)', ar: 'إجمالي تغطية الحبر (TAC)' },
    definition: {
      tr: 'CMYK değerlerinin toplamının belirli bir üst sınırda tutulması. Ofset baskıda genellikle 300-320% ile sınırlandırılır; aşım halinde mürekkep kuruması ve set-off sorunları oluşur.',
      en: 'Keeping the sum of CMYK values within a defined upper limit. In offset, typically capped at 300–320%; exceeding this causes ink drying and set-off problems.',
      ru: 'Ограничение суммы CMYK-значений заданным верхним пределом. В офсете обычно не более 300–320%; превышение вызывает проблемы с высыханием и отмарыванием.',
      ar: 'الحفاظ على مجموع قيم CMYK ضمن حد أقصى محدد. في الأوفست تُحدَّد عادةً بـ 300-320%؛ تجاوزها يُسبب مشاكل جفاف وتلوث الصفحة.',
    },
  },
  {
    term: { tr: 'Renk Sıcaklığı', en: 'Color Temperature', ru: 'Цветовая температура', ar: 'درجة حرارة اللون' },
    definition: {
      tr: 'Işık kaynağının rengini Kelvin (K) cinsinden ifade eden ölçü. Baskı onayı için standart görme kabini ışığı D50 (5000K) veya D65 (6500K) olmalıdır.',
      en: 'A measure expressing the color of a light source in Kelvin (K). For print approval, standard viewing booth light must be D50 (5000K) or D65 (6500K).',
      ru: 'Характеристика цвета источника света, выраженная в Кельвинах (K). Для оценки оттиска стандартный свет смотрового кабина — D50 (5000K) или D65 (6500K).',
      ar: 'مقياس يعبّر عن لون مصدر الضوء بالكلفن (K). لموافقة الطباعة يجب أن يكون ضوء كابينة الرؤية المعيارية D50 (5000K) أو D65 (6500K).',
    },
  },
  {
    term: { tr: 'Dijital Renk Özeti (Soft Proof)', en: 'Soft Proof', ru: 'Мягкая цветопроба', ar: 'البروف الرقمي (سوفت پروف)' },
    definition: {
      tr: 'Baskı sonucunu kâğıt üzerinde basmak yerine kalibre edilmiş bir monitörde simüle eden dijital önizleme yöntemi. Maliyet ve zaman tasarrufu sağlar.',
      en: 'A digital preview method that simulates the press result on a calibrated monitor instead of printing on paper. Saves cost and time.',
      ru: 'Метод цифрового предварительного просмотра, имитирующий результат печати на калиброванном мониторе вместо вывода на бумагу. Экономит время и деньги.',
      ar: 'طريقة معاينة رقمية تحاكي نتيجة الطباعة على شاشة معايَرة بدلاً من الطباعة على ورق. توفر التكلفة والوقت.',
    },
  },
];
