# SIM Baski Malzemeleri - Web Projesi Context

## Proje Ozeti

SIM Baski Malzemeleri icin gelistirilen kurumsal B2B web sitesi. 1983'ten beri matbaa sektörunde faaliyet gosteren sirketin offset murekkep, metalik yaldiz, UV murekkep, ozel renk uretimi ve baski kimyasallari urunlerini tanitan, 4 dilde hizmet veren modern bir web uygulamasi.

**Canli URL:** https://www.simlimited.net
**Repository:** https://github.com/burakardaozgul/SIM.git
**Deploy:** AWS Amplify (SSR)

---

## Teknoloji Stack

| Katman | Teknoloji | Versiyon |
|--------|-----------|----------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Dil | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| i18n | next-intl | 4.8.3 |
| CMS | Sanity | 5.13.0 |
| Animasyon | Framer Motion | 12.35.0 |
| Form | React Hook Form + Zod | 7.71.2 / 4.3.6 |
| E-posta | Resend | 6.9.3 |
| Ikonlar | Lucide React | 0.577.0 |
| Deploy | AWS Amplify | standalone output |

---

## Dizin Yapisi

```
sim-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (metadataBase)
│   │   ├── globals.css                   # Tailwind v4 theme config
│   │   ├── robots.ts                     # Search engine directives
│   │   ├── opengraph-image.tsx           # Dynamic OG image generation
│   │   ├── sitemap.xml/
│   │   │   └── route.ts                  # XML sitemap API route
│   │   ├── [locale]/
│   │   │   ├── layout.tsx                # Locale layout (fonts, SEO, JSON-LD)
│   │   │   ├── page.tsx                  # Ana sayfa
│   │   │   ├── urunler/
│   │   │   │   ├── page.tsx              # Urunler listesi (server)
│   │   │   │   ├── ProductsPageClient.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx          # Urun detay (server + JSON-LD)
│   │   │   │       └── ProductDetailClient.tsx
│   │   │   ├── hakkimizda/
│   │   │   │   ├── page.tsx
│   │   │   │   └── AboutPageClient.tsx
│   │   │   ├── iletisim/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ContactPageClient.tsx
│   │   │   ├── temsilcilikler/
│   │   │   │   ├── page.tsx
│   │   │   │   └── BrandsPageClient.tsx
│   │   │   ├── ozel-renk-uretimi/
│   │   │   │   └── page.tsx              # Server component (no client split)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── gizlilik-politikasi/
│   │   │   │   ├── page.tsx
│   │   │   │   └── PrivacyPageClient.tsx
│   │   │   └── kullanim-kosullari/
│   │   │       ├── page.tsx
│   │   │       └── TermsPageClient.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts          # Iletisim formu API (Resend)
│   │   └── studio/
│   │       └── [[...tool]]/page.tsx      # Sanity Studio
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx            # Tam ekran carousel (Framer Motion)
│   │   │   ├── ProductsSection.tsx       # Urun kartlari slider
│   │   │   ├── ProcessSection.tsx        # 4 adimli uretim sureci
│   │   │   ├── AboutSection.tsx          # Sirket tanitimi + istatistikler
│   │   │   ├── BrandsSection.tsx         # Marka logolari grid
│   │   │   ├── BlogSection.tsx           # Son blog yazilari
│   │   │   └── CTABanner.tsx             # Teklif al CTA
│   │   ├── layout/
│   │   │   ├── VerticalNav.tsx           # Sabit yan menu (260px) + mobil hamburger
│   │   │   ├── Footer.tsx                # 4 kolonlu footer
│   │   │   ├── MobileBottomNav.tsx       # Mobil sabit alt menu (lg:hidden)
│   │   │   ├── CookieConsent.tsx         # KVKK uyumlu cerez bildirimi
│   │   │   └── ScrollToTop.tsx           # Yukari git butonu
│   │   └── ui/
│   │       └── FadeInSection.tsx         # Scroll-triggered fade-in wrapper
│   ├── data/
│   │   └── products.ts                   # 11 urun (hardcoded, cok dilli)
│   ├── i18n/
│   │   ├── config.ts                     # Locale tanimlari (tr, en, ru, ar)
│   │   ├── routing.ts                    # Localized pathname mappings
│   │   ├── navigation.ts                 # i18n-aware Link, usePathname, useRouter
│   │   └── request.ts                    # next-intl server config
│   ├── lib/
│   │   ├── seo.ts                        # SEO utility fonksiyonlari
│   │   └── sanity/
│   │       ├── client.ts                 # Sanity client + image URL builder
│   │       └── queries.ts               # GROQ sorgulari
│   └── middleware.ts                     # next-intl middleware
├── sanity/
│   ├── schemaTypes/index.ts
│   └── schemas/                          # Sanity CMS schemalari
│       ├── localizedString.ts
│       ├── localizedText.ts
│       ├── localizedSlug.ts
│       ├── product.ts
│       ├── productCategory.ts
│       ├── brand.ts
│       ├── post.ts
│       └── faq.ts
├── messages/
│   ├── tr.json                           # Turkce (ana dil, ~319 satir)
│   ├── en.json                           # Ingilizce (~255 satir)
│   ├── ru.json                           # Rusca (~220 satir)
│   └── ar.json                           # Arapca RTL (~220 satir)
├── public/
│   ├── og-image.jpg                      # Fallback OG resmi
│   └── logos/                            # Marka logolari (PNG)
├── amplify.yml                           # AWS Amplify build config
├── .env.example                          # Ornek environment degiskenleri
└── context.md                            # Bu dosya
```

---

## Cok Dilli Yapi (i18n)

### Desteklenen Diller
- **tr** (Turkce) - Varsayilan, URL prefix'siz (`/urunler`)
- **en** (Ingilizce) - `/en/products`
- **ru** (Rusca) - `/ru/produkty`
- **ar** (Arapca) - `/ar/products` (RTL destekli)

### Locale Prefix Stratejisi
`localePrefix: 'as-needed'` — Turkce icin prefix yok, diger diller icin prefix var.
`localeDetection: false` — Tarayici dil algilamasi kapali, sadece kullanici secimi gecerli.

### Localized Pathnames
Tum sayfa URL'leri dile gore degisiyor:

| Sayfa | TR | EN | RU |
|-------|-----|-----|-----|
| Urunler | `/urunler` | `/en/products` | `/ru/produkty` |
| Hakkimizda | `/hakkimizda` | `/en/about` | `/ru/o-nas` |
| Iletisim | `/iletisim` | `/en/contact` | `/ru/kontakty` |
| Temsilcilikler | `/temsilcilikler` | `/en/brands` | `/ru/brendy` |
| Ozel Renk | `/ozel-renk-uretimi` | `/en/custom-color-production` | `/ru/proizvodstvo-tsvetov` |
| Gizlilik | `/gizlilik-politikasi` | `/en/privacy-policy` | `/ru/politika-konfidentsialnosti` |
| Kosullar | `/kullanim-kosullari` | `/en/terms-of-use` | `/ru/usloviya-ispolzovaniya` |
| Blog | `/blog` | `/en/blog` | `/ru/blog` |

### Link Kullanimi
**ONEMLI:** Tum dahili linkler `@/i18n/navigation`'dan import edilen `Link` kullanmali. Asla `next/link` kullanilmamali, aksi halde dil gecisleri bozulur.

```tsx
// DOGRU
import { Link, usePathname, useRouter } from '@/i18n/navigation';

// YANLIS — locale bilgisi kaybolur
import Link from 'next/link';
```

### Dil Degistirme
VerticalNav'da `router.replace(pathname, { locale: loc })` ile yapilir. `Link` ile degil, `button` + `useRouter` ile.

### Ceviri Dosyasi Yapisi (messages/*.json)
```
nav, hero, products, process, stats, about, brands, blog, cta,
footer, brandsPage, aboutPage, contact, cookie, privacyPage, termsPage
```

---

## Tasarim Sistemi

### Renk Paleti
```css
--color-ink-900: #080C14     /* Ana koyu arka plan */
--color-ink-800: #0D1425     /* Ikincil arka plan */
--color-ink-700: #151E30     /* Kart arka planlari */
--color-gold:    #C4922A     /* Birincil marka rengi */
--color-gold-light: #E5B84A  /* Hover durumlari */
--color-cream:   #F5EDD8     /* Birincil metin rengi */
--color-silver:  #9BA8B4     /* Ikincil metin rengi */
```

### Tipografi
| Font | Degisken | Kullanim |
|------|----------|----------|
| Cormorant Garamond | `font-display` | Hero basliklar (serif) |
| Syne | `font-heading` | Section basliklar |
| DM Sans | `font-body` | Govde metni |
| Noto Sans Arabic | `font-arabic` | Arapca icerik (RTL) |

### Layout Kaliplari
- **Yan menu:** `fixed w-[260px]` (desktop), hamburger (mobil)
- **Icerik alani:** `lg:ml-[260px]` ile offset
- **Container:** `mx-auto max-w-7xl px-6 lg:px-10`
- **Section boslugu:** `py-16 lg:py-24`
- **Border:** `border-white/[0.06]`

### Mobil Bottom Nav
- 4 buton: Ana Sayfa, Urunler, Yol Tarifi (Google Maps), Hemen Ara (tel:)
- `lg:hidden` — sadece mobilde gorunur
- `fixed bottom-0` ile sabit konumlu
- Footer'da `h-20 bg-ink-900 lg:hidden` spacer mevcut

---

## Sayfa Mimari Kaliplari

### Server/Client Ayirma (Split Pattern)
`'use client'` directive kullanan sayfalarda SEO icin server component wrapper kullanilir:

```
page.tsx (Server)           → generateMetadata() + import Client
  └── *PageClient.tsx (Client) → useTranslations(), interaktif UI
```

Bu pattern su sayfalarda uygulanir:
- urunler, hakkimizda, iletisim, temsilcilikler, gizlilik-politikasi, kullanim-kosullari

Dogrudan server component olan sayfalar (split yok):
- Ana sayfa (`/`), ozel-renk-uretimi, blog, blog/[slug]

### SEO Metadata
Her sayfada `generateMetadata()` fonksiyonu var:
- `createPageMetadata()` utility'si kullanilir (`src/lib/seo.ts`)
- 4 dilde title + description
- Canonical + hreflang alternates
- OpenGraph + Twitter Card
- Sayfa-ozel keywords

### JSON-LD Structured Data
- **Organization** — locale layout'ta (`layout.tsx`)
- **LocalBusiness** — locale layout'ta (adres, koordinat, calisma saatleri)
- **Product** — urun detay sayfalarinda (`urunler/[slug]/page.tsx`)

---

## Urun Veri Yapisi

Urunler su an `src/data/products.ts` dosyasinda hardcoded:

```typescript
interface Product {
  slug: string;                          // URL-friendly ID
  image: string;                         // Ana gorsel URL
  gallery: string[];                     // Ek gorseller
  category: string;                      // offset | metallic | uv | pantone | custom | blanket | chemicals
  name: Record<string, string>;          // { tr, en, ru, ar }
  description: Record<string, string>;   // { tr, en, ru, ar }
  features?: Record<string, string[]>;   // Ozellik listesi (opsiyonel)
}
```

**11 urun mevcut:** EVA COLOR Fluorescent, EVA COLOR Gold Metalik, SAKATA INX CMYK, Ozel Renkler, ST-DOT Blanket, EVA COLOR Silver Metalik, ZELLER+GMELIN UV, SAKATA INX PANTONE, HI-TECH COATINGS Lak, SCHLENK Metalik, MASTER Anti Set-Off Powder

---

## Sanity CMS Entegrasyonu

### Schemalar
- **product** — Urun (localizedString, localizedSlug, specs, images, PDF)
- **productCategory** — Urun kategorisi
- **brand** — Marka (logo, website, description)
- **post** — Blog yazisi (localizedString, block content, coverImage)
- **faq** — Sikca Sorulan Sorular

### GROQ Sorgulari (`src/lib/sanity/queries.ts`)
- `featuredProductsQuery` — One cikan 6 urun
- `allProductsQuery` — Tum urunler
- `productBySlugQuery` — Tek urun detay
- `latestPostsQuery` — Son 3 blog yazisi
- `postBySlugQuery` — Tek blog yazisi
- `allBrandsQuery` — Tum markalar
- `allFaqsQuery` — Tum SSS'ler

### Sanity Studio
`/studio` path'inde Sanity Studio erisimi mevcut (`src/app/studio/[[...tool]]/page.tsx`).

---

## API Route'lar

### POST /api/contact
Iletisim formu gonderimleri. Resend ile email gonderir.
- **Zorunlu alanlar:** name, email, message
- **Opsiyonel:** phone, company, subject
- **Alici:** info@simlimited.net
- **Resend lazy-init:** API key yoksa build patlamaz (dynamic import)

### GET /sitemap.xml
Manuel XML sitemap. Tum sayfalar + tum urunler x 4 dil = ~80 URL.
Localized pathname'ler ve hreflang alternates dahil.

### GET /robots.txt
Next.js built-in `robots.ts` ile olusturulur. `/api/` ve `/_next/` disallow.

---

## Environment Degiskenleri

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<sanity_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<sanity_api_token>
RESEND_API_KEY=<resend_api_key>
NEXT_PUBLIC_SITE_URL=https://www.simlimited.net
```

**Not:** `.env.local` dosyasi `.gitignore`'da. `.env.example` sablonu repo'da mevcut.

---

## Deploy (AWS Amplify)

### Build Config (`amplify.yml`)
```yaml
- Node.js 20 (nvm install 20)
- npm ci
- npm run build
- output: standalone (next.config.ts)
```

### Onemli Notlar
- Amplify'da environment variable'lar console'dan eklenmeli
- `RESEND_API_KEY` bos olsa bile build basarili olur (lazy-init)
- `output: 'standalone'` Amplify SSR icin gerekli

---

## Bilinen Kisitlamalar ve Notlar

1. **Urunler hardcoded:** Sanity CMS schemalari hazir ama urunler `src/data/products.ts`'de. Sanity'ye gecis yapilabilir.
2. **Blog icerigi:** Placeholder durumunda. Sanity'den cekilecek sekilde altyapi hazir.
3. **Gorseller:** Urun ve hero gorselleri `www.simlimited.net` WordPress sitesinden yukleniyor (`next/image` remotePatterns ile).
4. **Middleware uyarisi:** Next.js 16'da `middleware` convention deprecated, `proxy` kullanilmasi oneriliyor. next-intl guncellemesi bekleniyor.
5. **Arapca pathnames:** AR locale icin Ingilizce slug'lar kullaniliyor (URL-safe).
