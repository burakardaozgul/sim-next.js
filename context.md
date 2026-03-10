# SIM Baskı Malzemeleri - Proje Context

> Bu dosya projenin mimarisini, yapısını ve önemli detaylarını özetler.
> Her yeni oturumda bu dosyayı okuyarak projeye hızlıca hakim olunabilir.

---

## Genel Bakış

**Proje:** SIM Baskı Malzemeleri - B2B Kurumsal Web Sitesi
**Domain:** www.simlimited.net
**Sektör:** Matbaa / Baskı Malzemeleri (Mürekkep, Blanket, Kimyasal)

## Tech Stack

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| Next.js | 16.1.6 | App Router, SSG, Standalone output |
| React | 19.2.3 | UI |
| TypeScript | 5 | Tip güvenliği |
| Tailwind CSS | 4 | Styling (PostCSS plugin) |
| next-intl | 4.8.3 | 4 dil desteği (TR, EN, RU, AR) |
| Framer Motion | 12.35.0 | Animasyonlar |
| Lucide React | 0.577.0 | İkonlar |
| Nodemailer | 8.0.2 | İletişim formu e-posta |
| AWS Amplify | - | Deployment (Node 20) |

---

## Dizin Yapısı

```
src/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── robots.ts                     # SEO robots config
│   ├── globals.css                   # Tailwind theme + custom CSS
│   ├── [locale]/                     # Dil bazlı routing
│   │   ├── layout.tsx                # Locale layout (fontlar, metadata, JSON-LD)
│   │   ├── page.tsx                  # Ana sayfa (Hero slider)
│   │   ├── blog/page.tsx             # Blog listesi
│   │   ├── blog/[slug]/page.tsx      # Blog detay
│   │   ├── urunler/page.tsx          # Ürün listesi
│   │   ├── urunler/[slug]/page.tsx   # Ürün detay
│   │   ├── ozel-renk-uretimi/       # Özel renk üretimi
│   │   ├── temsilcilikler/           # Markalar/Temsilcilikler
│   │   ├── hakkimizda/              # Hakkımızda
│   │   ├── iletisim/                # İletişim
│   │   ├── sss/                     # Sıkça Sorulan Sorular
│   │   ├── gizlilik-politikasi/     # Gizlilik politikası
│   │   └── kullanim-kosullari/      # Kullanım koşulları
│   └── api/contact/route.ts          # İletişim formu API
│
├── components/
│   ├── ui/
│   │   └── FadeInSection.tsx         # Scroll animasyonu wrapper
│   ├── home/
│   │   ├── HeroSlider.tsx            # Ana sayfa slider (6sn auto-play)
│   │   ├── ProductsSection.tsx       # Öne çıkan ürünler
│   │   ├── ProcessSection.tsx        # Süreç/iş akışı
│   │   ├── AboutSection.tsx          # Hakkımızda bölümü
│   │   ├── ServicesSection.tsx       # Hizmetler
│   │   ├── BlogSection.tsx           # Son blog yazıları
│   │   ├── BrandsSection.tsx         # Partner markalar
│   │   └── CTABanner.tsx             # CTA banneri
│   └── layout/
│       ├── VerticalNav.tsx           # Sabit dikey sidebar navigasyon (260px)
│       ├── Footer.tsx                # Footer
│       ├── MobileBottomNav.tsx       # Mobil alt navigasyon
│       ├── ScrollToTop.tsx           # Yukarı kaydır butonu
│       └── CookieConsent.tsx         # Çerez onay banneri
│
├── data/
│   ├── products.ts                   # 11+ ürün (çok dilli, kategori, galeri)
│   └── blog.ts                       # 7+ blog yazısı (content blokları, çok dilli)
│
├── i18n/
│   ├── config.ts                     # Dil ayarları (tr, en, ru, ar)
│   ├── routing.ts                    # Pathname çevirileri
│   ├── request.ts                    # Server-side i18n handler
│   └── navigation.ts                # Navigation helpers
│
├── lib/
│   ├── blur.ts                       # Blur data URL'leri (lazy loading)
│   └── seo.ts                        # SEO metadata yardımcıları
│
└── middleware.ts                      # i18n routing middleware

messages/                              # Çeviri dosyaları
├── tr.json (~25KB)
├── en.json (~23KB)
├── ru.json (~36KB)
└── ar.json (~29KB)

public/
├── images/                           # Ürün ve içerik görselleri (WebP)
├── logos/                            # Marka logoları
└── slider/                           # Hero slider görselleri
```

---

## Routing Yapısı (i18n)

- **Varsayılan dil:** Türkçe (prefix yok)
- **Diğer diller:** /en, /ru, /ar prefix ile
- **Arapça:** RTL (dir="rtl") desteği

| TR (varsayılan) | EN | RU | AR |
|---|---|---|---|
| / | /en | /ru | /ar |
| /urunler | /en/products | /ru/produkty | /ar/products |
| /urunler/[slug] | /en/products/[slug] | /ru/produkty/[slug] | /ar/products/[slug] |
| /ozel-renk-uretimi | /en/custom-color-production | /ru/proizvodstvo-tsvetov | /ar/custom-color-production |
| /temsilcilikler | /en/brands | /ru/brendy | /ar/brands |
| /hakkimizda | /en/about | /ru/o-nas | /ar/about |
| /iletisim | /en/contact | /ru/kontakty | /ar/contact |
| /blog | /blog | /blog | /blog |
| /blog/[slug] | /blog/[slug] | /blog/[slug] | /blog/[slug] |
| /sss | /en/faq | /ru/voprosy | /ar/faq |
| /gizlilik-politikasi | /en/privacy-policy | /ru/politika-konfidentsialnosti | /ar/privacy-policy |
| /kullanim-kosullari | /en/terms-of-use | /ru/usloviya-ispolzovaniya | /ar/terms-of-use |

---

## Tasarım Sistemi

### Renkler
| İsim | Değer | Kullanım |
|------|-------|----------|
| ink (900) | #080C14 | Ana koyu arkaplan |
| ink-800 | #0F1620 | Koyu arkaplan varyant |
| ink-700 | #1A2332 | Kart arkaplanları |
| ink-600 | #243044 | Kenarlıklar |
| gold | #C4922A | Ana vurgu rengi (CTA, aktif) |
| gold-light | #E5B84A | Açık altın |
| gold-pale | #F0D080 | Soluk altın |
| cream | #F5EDD8 | Açık metin |
| warm-cream | #FAF7F2 | Sıcak arkaplan |
| silver | #9BA8B4 | İkincil metin |

### Fontlar
| Font | Değişken | Kullanım |
|------|----------|----------|
| Cormorant Garamond | --font-display | Display başlıklar (serif) |
| Syne | --font-heading | Alt başlıklar (sans-serif) |
| DM Sans | --font-body | Gövde metin (sans-serif) |
| Noto Sans Arabic | --font-arabic | Arapça içerik |

### Tasarım Notları
- **Dark theme** (koyu arkaplan + açık metin)
- Sabit 260px sol sidebar navigasyon (desktop), hamburger menü (mobil)
- Mobil alt navigasyon barı
- Altın vurgu rengi CTA ve interaktif elemanlar için
- Framer Motion animasyonları (slider, fade-in)

---

## Veri Modelleri

### Product (`data/products.ts`)
```typescript
{
  slug: string;
  image: string;
  gallery: string[];
  category: string; // offset, metallic, uv, pantone, custom, blanket, chemicals
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  features?: Record<Locale, string[]>;
}
```

### BlogPost (`data/blog.ts`)
```typescript
{
  slug: string;
  image: string;
  gallery: string[];
  date: string;
  author: string;
  readTime: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: Record<Locale, ContentBlock[]>;
  keywords: string[];
}

// ContentBlock türleri: intro, heading, paragraph, image, highlight
```

---

## API

### POST /api/contact
- **Amaç:** İletişim formu gönderimi
- **SMTP:** mail.simlimited.net:465 (TLS)
- **Spam koruması:** Honeypot alanı
- **Girdi doğrulama:** name (maks 200), email, message (maks 5000)
- **XSS koruması:** HTML escaping

---

## SEO & Performans

- JSON-LD yapılandırılmış veri (Organization, LocalBusiness, BreadcrumbList, Product)
- Open Graph + hreflang etiketleri
- Blur placeholder ile lazy image loading
- WebP/AVIF görsel optimizasyonu
- 1 yıl cache headerları (statik dosyalar)
- SSG ile `generateStaticParams()` (ürünler, blog)
- Standalone output modu

---

## Deployment

- **Platform:** AWS Amplify
- **Node:** v20
- **Build:** `npm run build` → .next dizini
- **Cache:** node_modules + .next/cache
- **Domain:** www.simlimited.net

---

## Önemli Dosya Yolları (Hızlı Referans)

| Dosya | Açıklama |
|-------|----------|
| `src/app/[locale]/layout.tsx` | Ana locale layout (fontlar, metadata, providers) |
| `src/app/[locale]/page.tsx` | Ana sayfa |
| `src/components/layout/VerticalNav.tsx` | Ana navigasyon |
| `src/components/layout/Footer.tsx` | Footer |
| `src/components/home/HeroSlider.tsx` | Ana sayfa slider |
| `src/data/products.ts` | Tüm ürün verileri |
| `src/data/blog.ts` | Tüm blog verileri |
| `src/i18n/routing.ts` | Dil yönlendirme kuralları |
| `src/app/globals.css` | Tema renkleri ve global stiller |
| `messages/tr.json` | Türkçe çeviriler |
| `next.config.ts` | Next.js yapılandırması |
| `amplify.yml` | AWS Amplify build ayarları |

---

*Son güncelleme: 2026-03-10*
