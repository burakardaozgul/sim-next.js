# SIM Baskı Malzemeleri — SEO İyileştirme Paketi Tasarım Dokümanı

**Tarih:** 2026-04-14  
**Kapsam:** 4 dil (TR, EN, RU, AR) — Google Search + AI Search optimizasyonu  
**Yaklaşım:** 4 fazlı aşamalı uygulama, her faz sonunda commit + test

---

## Bağlam

SEO audit sonuçlarına göre simlimited.net'in teknik altyapısı güçlü (hreflang, JSON-LD, sitemap) ama içerik ve yapısal SEO'da kritik eksiklikler var:
- Google'da ~6 sayfa indexli (130+ URL'ye rağmen)
- Test edilen 7 ticari sorguda sıralama yok
- Ana anahtar kelimelere yönelik dedike landing page yok
- İç bağlantı stratejisi eksik
- FAQ yetersiz (6 soru)
- EN ana sayfada H1 eksik

---

## Faz 1 — Acil Düzeltmeler

### 1.1 EN Ana Sayfa H1 Düzeltmesi
- **Dosya:** `src/app/[locale]/page.tsx` veya `src/components/home/HeroSlider.tsx`
- **Sorun:** EN locale'de H1 tag'i render edilmiyor
- **Çözüm:** Diğer dillerdeki H1 pattern'ini takip ederek EN'de de H1 oluştur

### 1.2 Blog Listing H1 Keyword-Rich
- **Dosya:** `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`
- **Mevcut:** "Blog" (genel, SEO değersiz)
- **Yeni değerler:**
  - TR: "Matbaa ve Baskı Sektörü Rehberi"
  - EN: "Printing Industry Insights & Guides"
  - RU: "Руководство по полиграфической отрасли"
  - AR: "دليل صناعة الطباعة والمواد"

### 1.3 Blog Listing CollectionPage Schema
- **Dosya:** `src/app/[locale]/blog/page.tsx`
- **Ekleme:** CollectionPage JSON-LD + blog post'ları ItemList olarak
- **Yapı:** Mevcut Organization/LocalBusiness schema'nın yanına ek script tag

### 1.4 FAQ Genişletme (6 → 18 soru)
- **Dosya:** `src/app/[locale]/sss/page.tsx` veya ilgili veri kaynağı
- **4 kategori x ~4-5 soru = 18 soru, 4 dilde:**
  - Ürün teknik (mürekkep türleri, farkları, kullanım alanları)
  - Sipariş/ticari (minimum miktar, teslimat, fiyat, ödeme)
  - Teknik destek (renk eşleştirme, ICC profil, uygulama desteği)
  - Firma/güven (sertifikalar, distribütörlük, deneyim)
- **Not:** FAQPage schema zaten dinamik, soru sayısı artınca otomatik genişleyecek

---

## Faz 2 — Landing Page'ler

### 2.1 `/matbaa-malzemeleri` Pillar Page
- **Route:** `src/app/[locale]/matbaa-malzemeleri/page.tsx`
- **i18n routing ekleme:** `src/i18n/routing.ts`
  - TR: `/matbaa-malzemeleri`
  - EN: `/printing-materials`
  - RU: `/poligraficheskie-materialy`
  - AR: `/mawad-altibaa`
- **İçerik (~2000 kelime/dil):**
  - Matbaa malzemeleri nedir? (tanım, kapsamlı giriş)
  - Ürün kategorileri (mürekkep, blanket, kimyasal — ürün sayfalarına iç link)
  - Neden SIM? (40+ yıl deneyim, distribütörlükler)
  - Sektör istatistikleri ve trendler
  - CTA (iletişim/teklif al)
- **Schema:** BreadcrumbList + WebPage
- **Metadata:** Locale-specific title/description/keywords
- **Çeviriler:** `messages/*.json` dosyalarına ekleme
- **Sitemap:** `src/app/sitemap.ts` ve `src/app/sitemap.xml/route.ts`'e ekleme

### 2.2 `/matbaa-malzemeleri-istanbul` Yerel SEO Sayfası
- **Route:** `src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx`
- **i18n routing:**
  - TR: `/matbaa-malzemeleri-istanbul`
  - EN: `/printing-materials-istanbul`
  - RU: `/tipografskie-materialy-stambul`
  - AR: `/mawad-altibaa-istanbul`
- **İçerik (~1500 kelime/dil):**
  - İstanbul'da matbaa malzemeleri tedariki
  - SIM'in Beylikdüzü lokasyonu, hizmet bölgesi
  - Yerel avantajlar (hızlı teslimat, yerinde teknik destek)
  - Neden İstanbul? (Türkiye'nin baskı merkezi)
  - Adres, iletişim, çalışma saatleri
  - CTA
- **Schema:** LocalBusiness (güçlendirilmiş) + BreadcrumbList
- **Sitemap'e ekleme**

---

## Faz 3 — İç Bağlantı & Yapısal

### 3.1 Blog↔Ürün Cross-Linking
- **`src/data/blog.ts` değişikliği:**
  - Her BlogPost'a `relatedProducts: string[]` alanı ekle (ürün slug'ları)
- **`src/data/products.ts` değişikliği:**
  - Her Product'a `relatedBlogPosts: string[]` alanı ekle (blog slug'ları)
- **`src/app/[locale]/blog/[slug]/page.tsx` değişikliği:**
  - Yazı sonunda "İlgili Ürünler" bölümü render et (ürün kartları)
- **`src/app/[locale]/urunler/[slug]/page.tsx` değişikliği:**
  - Sayfa sonunda "İlgili Yazılar" bölümü render et (blog kartları)
- **Çeviriler:** Section başlıkları messages JSON'larına

### 3.2 Blog Yazılarına Inline FAQ
- **`src/data/blog.ts` değişikliği:**
  - Her BlogPost'a `faq: Array<{q: Record<Locale, string>, a: Record<Locale, string>}>` ekle
  - Her post için 3-4 ilgili soru/cevap
- **`src/app/[locale]/blog/[slug]/page.tsx` değişikliği:**
  - İçerik sonunda FAQ bölümü render et (accordion veya liste)
  - Blog post JSON-LD'ye FAQPage schema entegre et (mevcut Article schema'nın yanına)

### 3.3 OG Image Locale-Aware
- **`src/app/opengraph-image.tsx` değişikliği:**
  - Hardcoded Türkçe metin yerine locale parametresi al
  - Brand name ve tagline'ı locale'e göre değiştir
- **Blog/ürün OG image'ları:** Metadata'da zaten post.image/product.image kullanılıyor — doğrula

---

## Faz 4 — Yeni İçerik Sayfaları

### 4.1 Matbaa Terimleri Sözlüğü
- **Veri:** `src/data/glossary.ts`
  - ~50-60 terim, her biri: `term: Record<Locale, string>`, `definition: Record<Locale, string>`
  - Alfabetik sıralı
- **Route:** `src/app/[locale]/matbaa-terimleri-sozlugu/page.tsx`
- **i18n routing:**
  - TR: `/matbaa-terimleri-sozlugu`
  - EN: `/printing-glossary`
  - RU: `/glossarij-poligrafii`
  - AR: `/mustalahaat-altibaa`
- **Tasarım:** Alfabetik navigasyon + terim kartları/liste
- **Schema:** DefinedTermSet JSON-LD
- **Metadata:** Locale-specific title/description/keywords
- **Sitemap'e ekleme**

---

## Etkilenen Dosyalar Özeti

| Dosya | Faz | Değişiklik |
|-------|-----|------------|
| `src/components/home/HeroSlider.tsx` (veya page.tsx) | 1 | EN H1 düzeltme |
| `messages/tr.json` | 1,2,3,4 | Blog H1, çeviriler |
| `messages/en.json` | 1,2,3,4 | Blog H1, çeviriler |
| `messages/ru.json` | 1,2,3,4 | Blog H1, çeviriler |
| `messages/ar.json` | 1,2,3,4 | Blog H1, çeviriler |
| `src/app/[locale]/blog/page.tsx` | 1 | CollectionPage schema |
| `src/app/[locale]/sss/page.tsx` | 1 | FAQ genişletme |
| `src/i18n/routing.ts` | 2,4 | Yeni route'lar |
| `src/app/[locale]/matbaa-malzemeleri/page.tsx` | 2 | Yeni sayfa |
| `src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx` | 2 | Yeni sayfa |
| `src/data/blog.ts` | 3 | relatedProducts, faq |
| `src/data/products.ts` | 3 | relatedBlogPosts |
| `src/app/[locale]/blog/[slug]/page.tsx` | 3 | İlgili ürünler, inline FAQ |
| `src/app/[locale]/urunler/[slug]/page.tsx` | 3 | İlgili yazılar |
| `src/app/opengraph-image.tsx` | 3 | Locale-aware |
| `src/data/glossary.ts` | 4 | Yeni veri dosyası |
| `src/app/[locale]/matbaa-terimleri-sozlugu/page.tsx` | 4 | Yeni sayfa |
| `src/app/sitemap.ts` | 2,4 | Yeni URL'ler |
| `src/app/sitemap.xml/route.ts` | 2,4 | Yeni URL'ler |
| `src/lib/seo.ts` | 2,4 | Yeni sayfa metadata yardımcıları |

---

## Başarı Kriterleri

1. Tüm yeni sayfalar 4 dilde doğru render ediliyor
2. Hreflang/canonical etiketleri yeni sayfalar için doğru
3. JSON-LD schema'lar Google Rich Results Test'ten geçiyor
4. Sitemap tüm yeni URL'leri içeriyor
5. `npm run build` hatasız tamamlanıyor
6. Mevcut sayfalarda regresyon yok
