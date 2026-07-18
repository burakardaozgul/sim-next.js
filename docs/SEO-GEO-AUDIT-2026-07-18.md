# SİM Limited (simlimited.net) — Tam SEO & GEO Audit
**Tarih:** 18 Temmuz 2026 · **Kapsam:** Kod tabanı + canlı site + Google indeksi + AI görünürlüğü
**Hedef kelimeler:** Baskı Malzemeleri · Matbaa Malzemeleri · Ofset Baskı Malzemeleri · Matbaa Malzemeleri İstanbul

---

## Hızlı Özet

Site teknik olarak sektör rakiplerinin (Aysan, Türev, Ceska, İstanbul Kağıt) **çok üzerinde**: Lighthouse SEO 100, Best Practices 100, LCP 790 ms, CLS 0.00, doğru hreflang + x-default, zengin JSON-LD (FAQPage, Product, Article, DefinedTermSet), 4 dilde tam lokalizasyon, AI botlarına açık robots.txt ve llms.txt. **Ancak tek bir mimari hata — GeoIP tabanlı dil sunumu — tüm bu altyapının Google nezdindeki değerini baltalıyor:** ABD'den tarayan Googlebot, Türkçe canonical URL'lerde İngilizce içerik görüyor. Kanıt: Google indeksinde kök URL İngilizce başlıkla ("SIM Printing Supplies…") ve prefix'siz İngilizce URL'ler (`/products/...`, `/blog/custom-color-matching`) indekste. İkinci büyük eksik: **yerel varlık** — Google Business Profile yok/zayıf, Yandex Maps kaydında 0 yorum; "matbaa malzemeleri istanbul" için ilk sayfada rakipler var, SİM yok.

---

## 🔴 Kritik Sorunlar (Önce Bunlar)

### 1. GeoIP dil sunumu — Googlebot'a kök URL'de İngilizce içerik gidiyor
- **Neden:** `src/middleware.ts:19-27` `CloudFront-Viewer-Country` başlığına göre `defaultLocale`'i dinamik değiştiriyor; `src/lib/geo-locale.ts:38` eşleşmeyen her ülke için `'en'` döndürüyor. `localePrefix: 'as-needed'` ile birleşince, ABD'den gelen Googlebot **prefix'siz (TR-canonical) URL'lerde İngilizce sayfa** alıyor.
- **Kanıt:**
  - `site:simlimited.net` → kök URL Google'da **"SIM Printing Supplies | Offset Ink & Printing Materials"** başlığıyla indekste.
  - `https://www.simlimited.net/blog/custom-color-matching` ve `/products/eva-color-silver-metallic-inks` gibi **prefix'siz İngilizce URL'ler** indekste (bunlar canonical yapıda hiç var olmamalı).
  - hreflang/canonical/sitemap kök URL'yi `tr` + `x-default` ilan ediyor → içerik-etiket çelişkisi. Google bunu tutarsız sinyal olarak görür; TR kelime alaka düzeyi ("matbaa malzemeleri" vb.) ana sayfada eriyor.
- **Çözüm:** Prefix'siz URL'ler **her zaman ve herkese Türkçe** dönmeli. Middleware'de geo'ya göre `defaultLocale` değiştirme kaldırılmalı (sabit `tr`). Yabancı ziyaretçi deneyimi için: (a) client-side "Continue in English?" öneri banner'ı, veya (b) yalnızca ilk ziyarette 302 ile `/en`'e yönlendirme (aynı URL'de içerik değiştirmek yok — Google bunu cloaking'e yakın değerlendirir; Googlebot ağırlıklı ABD IP'lerinden tarar).
- Fix yayına alındıktan sonra GSC'de ana sayfa + indekslenen prefix'siz EN URL'ler için yeniden tarama isteyin.

### 2. Mükerrer blog yazısı: `baski-kimyasallari-rehberi`
- Hem `src/data/blog.ts` (tarih 2026-07-14) hem `src/data/new-posts.ts`'de (tarih 2026-05-20) var; **RU/AR slug'ları farklı** → sitemap'te mükerrer `<url>` bloğu, RU'da birbirine yakın iki sayfa, çelişen alternates. Birini silin (new-posts.ts'dekini).

### 3. Ölü ve hatalı ikinci sitemap kaynağı
- `src/app/sitemap.ts` ile `src/app/sitemap.xml/route.ts` aynı yolu üretiyor; canlıda route.ts kazanıyor (XSL'li, doğru olan). `sitemap.ts` **hem ölü kod hem hatalı** (ürün/blog alternates'te tüm dillere TR slug, x-default yok, öncelikler çelişiyor). **Silin.**
- Ayrıca route.ts'de `lastmod` her istekte `new Date()` — tüm URL'ler "şimdi" görünüyor; Google bu sinyali yok sayar. Gerçek içerik tarihlerini kullanın.

### 4. Product schema: `offers.price` yok, `brand` yanlış
- `src/app/[locale]/urunler/[slug]/page.tsx:112-139`: `offers.priceSpecification` yalnızca `priceCurrency` içeriyor (fiyat yok → Rich Results uyarısı); `brand` tedarikçi (SIM) olarak yazılmış, ürünün gerçek markası olmalı (EVA COLOR, SAKATA INX, VECTOR, Zeller+Gmelin…). B2B'de fiyat verilmeyecekse `offers` yerine `offers: { "@type": "AggregateOffer" }`siz sade Product + `brand` düzeltmesi, ya da `priceSpecification`'ı kaldırıp "fiyat için iletişim" modeliyle uyumlu şema kullanın. SEO-PLAN'da planlanan `aggregateRating` da hâlâ eksik.

### 5. Yerel varlık (Local SEO) boşluğu — "Matbaa Malzemeleri İstanbul" bu yüzden kayıp
- **Google Business Profile** doğrulanmış görünmüyor; Yandex Maps kaydı var ama **0 yorum**. "matbaa malzemeleri istanbul" aramasında Aysan (Bağcılar), Ceska, İstanbul Kağıt, Türev ilk sayfada — SİM yok.
- **NAP tutarsızlığı:** posta kodu `layout.tsx` ve `iletisim`'de **34000**, istanbul landing'de **34524** (doğrusu Yakuplu/Beylikdüzü için 34524). Tek değere sabitleyin; GBP/Yandex/dizinlerde birebir aynı adres-telefon formatını kullanın.
- Aksiyon: GBP açın/doğrulayın (kategori: "Matbaa malzemeleri mağazası/tedarikçisi"), fotoğraf + ürün kataloğu + hizmet bölgesi ekleyin, aktif müşterilerden düzenli Google yorumu isteyin (ayda 2-3 yeterli), GBP web sitesi alanına `/matbaa-malzemeleri-istanbul` verin.

### 6. non-www → www yönlendirmesi 302 (geçici)
- `https://simlimited.net/` → `302` → `https://www.simlimited.net/`. Amplify domain ayarından **301**'e çevirin (link equity aktarımı için).

---

## 🟡 Uyarılar (Yakında Ele Alın)

1. **Title şablon tekrarı:** Landing sayfa başlıkları `"... | SIM"` + layout şablonu `"| SIM Baskı Malzemeleri"` → `"Matbaa Malzemeleri: Kapsamlı Rehber ve Ürünler | SIM | SIM Baskı Malzemeleri"` (76 karakter, SERP'te kesiliyor). Sayfa başlıklarından `"| SIM"` ekini kaldırın. (`src/app/[locale]/matbaa-malzemeleri/page.tsx:13` ve benzerleri)
2. **Meta description uzunlukları:** Blog yazıları excerpt'i meta description olarak kullanıyor (~700 karakter!); ürün sayfaları ~290. 150-160 karakterlik ayrı meta metinleri yazın (blog için `excerpt`'ten bağımsız bir `metaDescription` alanı).
3. **İki hedef kelimenin özel sayfası yok:** "Baskı Malzemeleri" ve "Ofset Baskı Malzemeleri" için ayrı landing yok; ana sayfa + `/matbaa-malzemeleri` bölüşüyor. `/ofset-baski-malzemeleri` pillar sayfası açın (ürün kategorilerine, blanket/kimyasal/mürekkep detaylarına iç link); "baskı malzemeleri"ni `/matbaa-malzemeleri` sayfasının ikincil hedefi yapın (cannibalization'ı önlemek için başlıklarda net ayrım).
4. **Landing sayfalar ince:** `/matbaa-malzemeleri` ~300-500 kelime, `/matbaa-malzemeleri-istanbul` ~550-600. Rakipleri geçmek için 1.200-1.800 kelimeye çıkarın: seçim kriterleri, karşılaştırma tabloları, sektörel SSS blokları (+FAQPage schema), müşteri senaryoları, İstanbul sayfasına ilçe/teslimat detayı ve yol tarifi + harita embed.
5. **E-E-A-T zayıf:** 26 yazının tümü "SIM Teknik Ekip"; Article schema'da `author` Organization. En az 1-2 gerçek uzman isim (ör. renk laboratuvarı sorumlusu) + kısa özgeçmişli yazar sayfası + `author: Person` yapın.
6. **Blog ana navigasyonda yok (desktop sidebar):** Ana Sayfa/Ürünler/Özel Renk/Temsilcilikler/Hakkımızda/İletişim var; Blog, SSS ve Sözlük yalnız footer'da. Hem iç link akışı hem keşfedilebilirlik için sidebar'a ekleyin.
7. **Boş alt metinler:** `BlogPostClient.tsx:269` galeri görselleri `alt=""`. İçerik görseli oldukları için açıklayıcı alt yazın.
8. **Görsel dosya adları:** `HIP09900.webp`, `DSC07958.webp` gibi kamera adları — yeni görsellerde `ofset-murekkep-uretim-hatti.webp` formatına geçin.
9. **llms.txt güncel değil:** 25 blog yazısının yalnız 13'ü listeleniyor; bir tarih yanlış. Build sırasında `blog.ts`'den otomatik üretin.
10. **`sameAs` yok:** Organization JSON-LD'ye Facebook, LinkedIn, Instagram, Yandex Maps ve (açılınca) GBP URL'lerini ekleyin — entity doğrulama için kritik.
11. **Eski WordPress URL'leri hâlâ indekste** (`/urunlerimiz/`, `/portfolio-item/...`): 308'ler doğru çalışıyor; geo fix'i sonrası GSC'de temizlenmesini izleyin, gerekirse "Kaldırma" aracı.
12. **Erişilebilirlik (Lighthouse 92):** Gold zemin üstü beyaz buton metni ve `text-silver/50` footer metinleri kontrast testinden kalıyor; gövde içi linkler yalnız renkle ayrışıyor (alt çizgi ekleyin).
13. **Mobil UX:** Çerez banner'ı mobil ekranın ~%30'unu kaplıyor; slider başlıkları mobilde ellipsis ile kesiliyor ("DAIHAN UV & LED-UV…"). Banner'ı kompaktlaştırın, slide başlıklarını mobil için kısaltın.
14. **CrUX verisi yok** (trafik eşiği altında) — GSC ve Bing Webmaster Tools kurulumu/doğrulaması yapın (aşağıda).

---

## 🟢 İyi Çalışanlar (Koruyun)

- **Performans:** LCP 790 ms, CLS 0.00, TTFB 390 ms (mobil, 4x CPU throttle) — rakiplerin çok üstünde.
- **Lighthouse:** SEO 100, Best Practices 100.
- **hreflang mimarisi:** 4 dil + x-default, dil bazlı slug'lar (`/blog/baski-kimyasallari-rehberi` ↔ `/ru/blog/khimikaty-dlya-pechati-rukovodstvo`) — nadir görülen doğrulukta.
- **JSON-LD kapsamı:** Organization, LocalBusiness (geo+saat), FAQPage (18 soru), Product, Article, BreadcrumbList, DefinedTermSet (73 terim), ItemList, ContactPage.
- **İçerik varlıkları:** 25 özgün teknik blog yazısı (4 dilde tam çeviri!), 73 terimlik sözlük, 18 soruluk SSS — sektörde benzersiz topical authority temeli.
- **AI hazırlığı:** robots.txt tüm AI botlarına açık (GPTBot, ClaudeBot, PerplexityBot…), llms.txt + llms-full.txt canlı.
- **Teknik hijyen:** HSTS preload, güvenlik başlıkları, 1 yıl immutable cache, AVIF/WebP, WordPress'ten kusursuz 301 haritası, temiz URL'ler.
- **Estetik:** Premium dark+gold kimlik, güçlü tipografi (Cormorant/Syne/DM Sans), yüksek kalite fotoğraf — B2B'de ayırt edici, marka güveni veriyor.

---

## Top 5 Öncelikli Aksiyon (ROI sırasıyla)

1. **Geo-middleware'i düzeltin** (kritik #1): prefix'siz URL'ler daima TR; yabancılara banner/302. Ardından GSC'de yeniden tarama. → TR sıralamalarının önündeki en büyük engel kalkar.
2. **Google Business Profile + yorum motoru + NAP tutarlılığı** (kritik #5-6): "matbaa malzemeleri istanbul" için tek başına en etkili hamle.
3. **Teknik temizlik paketi** (tek PR): `sitemap.ts` sil, blog dupe'unu kaldır, gerçek lastmod, title'lardan "| SIM" eki, meta description kısaltmaları, Product schema brand/offers, sameAs, boş alt'lar, posta kodu.
4. **İçerik büyütme:** İki landing'i 1.500+ kelimeye çıkar + FAQPage schema; `/ofset-baski-malzemeleri` pillar sayfası aç; Blog'u ana nav'a al.
5. **Otorite + AI görünürlüğü:** Bing WMT + IndexNow, sektör PR'ı (matbaahaber.com vb.), dizin kayıtları, llms.txt otomasyonu, yazar E-E-A-T.

---

## Anahtar Kelime & İçerik Fırsatları

| Kelime | Mevcut durum | Aksiyon |
|---|---|---|
| matbaa malzemeleri | `/matbaa-malzemeleri` var ama ince | Sayfayı pillar'a büyüt; ana sayfadan güçlü iç link |
| matbaa malzemeleri istanbul | Sayfa var, GBP yok | GBP + yorumlar + sayfaya ilçe/teslimat içeriği + harita |
| ofset baskı malzemeleri | **Özel sayfa yok** | `/ofset-baski-malzemeleri` pillar sayfası (mürekkep+blanket+kimyasal+kalıp ekosistemi) |
| baskı malzemeleri | Ana sayfa dolaylı hedefliyor | `/matbaa-malzemeleri` ikincil hedef; H2/metin içinde geçir |
| Uzun kuyruk (mevcut güç) | "ofset baskı malzemeleri mürekkep tedarikçisi türkiye" #1 | Blog stratejisine devam: "ofset mürekkep fiyatları", "matbaa malzemeleri toptan", "yaldız mürekkep çeşitleri", marka karşılaştırmaları |

**İçerik boşlukları:** fiyat/tedarik rehberleri (B2B arama niyeti), marka karşılaştırma tabloları (SAKATA vs alternatifler), uygulama bazlı sayfalar (ambalaj matbaası için / etiket matbaası için), vaka çalışmaları (renk eşleştirme başarıları — hem SEO hem GEO için alıntılanabilir).

---

## GEO (AI Görünürlüğü) Planı

**Zaten iyi:** AI botlarına açık robots, llms.txt/llms-full.txt, FAQ+sözlük formatı, alıntılanabilir veriler ("1983'ten beri", "15.000 kg/ay kapasite", "24/7 renk laboratuvarı").

**Yapılacaklar:**
1. **Bing Webmaster Tools + IndexNow:** ChatGPT/Copilot aramaları Bing indeksini kullanır — Bing'de doğrulama + sitemap gönderimi + IndexNow entegrasyonu (Amplify'da basit bir API çağrısı) AI aramalarındaki görünürlüğün ön koşulu.
2. **Entity inşası:** Organization şemasına `sameAs`; Wikidata kaydı (kuruluş yılı, merkez, markalar); LinkedIn şirket sayfasını güncel tutun; EMIS/Volza gibi kayıtlarla tutarlı unvan ("SİM Baskı Malzemeleri San. ve Tic. Ltd. Şti.").
3. **Alıntılanabilirlik:** Blog yazılarına net istatistik/tanım blokları (AI'lar tablo ve madde listelerini alıntılar); her ürün sayfasına 3-5 soruluk Q&A; "Türkiye baskı sektörü" gibi veri içerikli yazılar (zaten başlamış — sürdürün).
4. **llms.txt otomasyonu:** build'de `blog.ts` + `products.ts`'den üretim; her deploy'da güncel.
5. **Marka bahsi genişletme:** matbaahaber.com ve sektör yayınlarında haber/PR (Türev'in yaptığı gibi), tedarikçi dizinleri, fuar listelemeleri — AI modelleri markayı bağımsız kaynaklarda gördükçe önerir.
6. **Ölçüm:** Ayda bir ChatGPT/Perplexity/Gemini'de "İstanbul'da matbaa malzemeleri tedarikçisi önerir misin?" tarzı 5-6 sorguyu elle test edip kaydedin.

---

*Denetim: kod tabanı taraması (tüm page.tsx/metadata/schema), canlı HTTP testleri (curl, farklı geo/UA senaryoları), Lighthouse + performans izi (Chrome DevTools), Google indeks kontrolü, rakip karşılaştırması (aysanmat.com, turevmat.com).*
