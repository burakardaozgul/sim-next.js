# SEO İyileştirme Paketi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical SEO issues and add keyword-targeted landing pages to improve simlimited.net rankings for matbaa malzemeleri, baskı malzemeleri, and Istanbul-local queries in 4 languages (TR, EN, RU, AR).

**Architecture:** 4-phase incremental approach. Each phase produces a working build and git commit. Phase 1 fixes existing pages (H1, schema, FAQ), Phase 2 adds new landing pages with i18n routing, Phase 3 adds cross-linking and structural improvements, Phase 4 adds a glossary reference page.

**Tech Stack:** Next.js 16 (App Router, SSG), next-intl 4.8.3, TypeScript 5, Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-04-14-seo-improvements-design.md`

---

## Phase 1 — Urgent Fixes

### Task 1: Add Server-Side H1 to Homepage

The homepage H1 is inside `HeroSlider.tsx` which is a `'use client'` component. Search engine crawlers often cannot see client-rendered H1 tags. The fix: add a visually-hidden, SEO-focused H1 in the server-rendered page component, and change the HeroSlider's motion.h1 to motion.p (since the real H1 is now in the server component).

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/components/home/HeroSlider.tsx:126-134`
- Modify: `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`

- [ ] **Step 1: Add SEO H1 translation keys to all message files**

In each messages JSON, add a `"seoH1"` key inside the `"hero"` object:
- TR: `"seoH1": "Matbaa Malzemeleri & Ofset Mürekkep Tedarikçisi | İstanbul"`
- EN: `"seoH1": "Printing Materials & Offset Ink Supplier | Istanbul, Turkey"`
- RU: `"seoH1": "Типографские материалы и офсетные краски | Стамбул, Турция"`
- AR: `"seoH1": "مواد الطباعة وأحبار الأوفست | إسطنبول، تركيا"`

- [ ] **Step 2: Add server-rendered H1 in page.tsx**

In `src/app/[locale]/page.tsx`, import `getTranslations` from `next-intl/server` and use it in the async HomePage component. Add `<h1 className="sr-only">{t('seoH1')}</h1>` before `<HeroSlider />` in the return.

- [ ] **Step 3: Change HeroSlider H1 to decorative element**

In `src/components/home/HeroSlider.tsx` line 126, change `<motion.h1` to `<motion.p` with `role="heading" aria-level={2}`. Update the closing tag on line ~134 accordingly.

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Build completes without errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/page.tsx src/components/home/HeroSlider.tsx messages/
git commit -m "fix(seo): add server-rendered H1 to homepage for all locales"
```

---

### Task 2: Update Blog Listing H1 to Keyword-Rich

**Files:**
- Modify: `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`
- Modify: `src/app/[locale]/blog/page.tsx`

- [ ] **Step 1: Update blog title in message files**

Change the `blog.title` key in each messages JSON:
- TR: `"title": "Matbaa ve Baskı Sektörü Rehberi"`
- EN: `"title": "Printing Industry Insights & Guides"`
- RU: `"title": "Руководство по полиграфической отрасли"`
- AR: `"title": "دليل صناعة الطباعة والمواد"`

- [ ] **Step 2: Update META titles in blog/page.tsx to match**

Update the META object in `src/app/[locale]/blog/page.tsx` (lines 5-26) with matching titles and improved descriptions. Also expand keywords array to include `'matbaa rehberi'` and `'baskı malzemeleri blog'`.

- [ ] **Step 3: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 4: Commit**

```bash
git add messages/ src/app/[locale]/blog/page.tsx
git commit -m "fix(seo): update blog listing H1 to keyword-rich titles"
```

---

### Task 3: Add CollectionPage Schema to Blog Listing

**Files:**
- Modify: `src/app/[locale]/blog/page.tsx`

- [ ] **Step 1: Convert BlogPage to async server component with JSON-LD**

Replace `src/app/[locale]/blog/page.tsx` — convert `BlogPage` to an async component that accepts `params`, builds CollectionPage + BreadcrumbList JSON-LD using `blogPosts` data, and renders both schema script tags before `<BlogPageClient />`. Use the same JSON-LD script tag pattern as `blog/[slug]/page.tsx` (the `JSON.stringify` approach already used throughout the codebase).

CollectionPage schema should include: `@type: CollectionPage`, `name`, `description`, `url`, `inLanguage`, `isPartOf` WebSite, and `mainEntity` as an ItemList with blog post entries.

- [ ] **Step 2: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/blog/page.tsx
git commit -m "feat(seo): add CollectionPage + BreadcrumbList schema to blog listing"
```

---

### Task 4: Expand FAQ from 6 to 18 Questions

**Files:**
- Modify: `src/app/[locale]/sss/page.tsx` (faqData object, lines 51-84)

- [ ] **Step 1: Replace faqData with expanded 18-question version**

Replace the `faqData` object with 18 questions per language across 4 categories:
- **Product technical** (5 items): ink types supplied, offset vs UV ink difference, metallic ink paper compatibility, PANTONE matching, blanket lifespan
- **Order/commercial** (4 items): minimum order, delivery time, payment terms, international delivery
- **Technical support** (4 items): on-site support, ICC profiles, color consistency, drying issues
- **Company/trust** (5 items): brands represented, industry experience, quality certifications, distributorship certificates, ink samples

Each question must be in all 4 languages (TR, EN, RU, AR). Keep existing 6 questions and add 12 new ones.

- [ ] **Step 2: Build and verify**

Run: `npm run build` — Expected: success. FAQPage schema auto-expands.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/sss/page.tsx
git commit -m "feat(seo): expand FAQ from 6 to 18 questions in all 4 languages"
```

---

## Phase 1 Checkpoint

Run: `npm run build` — full build must succeed with no errors.

---

## Phase 2 — Landing Pages

### Task 5: Add i18n Routing for New Pages

**Files:**
- Modify: `src/i18n/routing.ts`
- Modify: `src/lib/seo.ts` (PATH_TRANSLATIONS)
- Modify: `src/app/sitemap.ts` (staticPages)

- [ ] **Step 1: Add routes to routing.ts pathnames object**

Add to `pathnames` in `src/i18n/routing.ts`:
```typescript
'/matbaa-malzemeleri': {
  tr: '/matbaa-malzemeleri',
  en: '/printing-materials',
  ru: '/poligraficheskie-materialy',
  ar: '/mawad-altibaa',
},
'/matbaa-malzemeleri-istanbul': {
  tr: '/matbaa-malzemeleri-istanbul',
  en: '/printing-materials-istanbul',
  ru: '/tipografskie-materialy-stambul',
  ar: '/mawad-altibaa-istanbul',
},
```

- [ ] **Step 2: Add path translations to seo.ts**

Add matching entries to `PATH_TRANSLATIONS` in `src/lib/seo.ts`.

- [ ] **Step 3: Add to sitemap.ts staticPages array**

Add both pages with `changeFrequency: 'weekly'`, priority 0.9 and 0.8 respectively.

- [ ] **Step 4: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/routing.ts src/lib/seo.ts src/app/sitemap.ts
git commit -m "feat(seo): register new landing page routes in i18n and sitemap"
```

---

### Task 6: Create Matbaa Malzemeleri Pillar Page

**Files:**
- Create: `src/app/[locale]/matbaa-malzemeleri/page.tsx`
- Modify: `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`

- [ ] **Step 1: Add `matbaaMalzemeleri` translation namespace to all message files**

Add ~25 translation keys per language covering: title, subtitle, description, section headings, product category names/descriptions (6 categories), 6 reasons/strengths, CTA text.

- [ ] **Step 2: Create pillar page component**

Create `src/app/[locale]/matbaa-malzemeleri/page.tsx` as an async server component with:
- `generateMetadata()` returning locale-specific title/description/keywords targeting "matbaa malzemeleri"
- WebPage + BreadcrumbList JSON-LD schemas
- Layout: VerticalNav + Footer wrapper (matching existing pages)
- Sections: Hero (H1 + subtitle + description), "What are printing materials?", Product categories grid (6 cards linking to `/urunler/[slug]`), "Why SIM?" reasons list, CTA banner linking to `/iletisim`
- All text from translations via `getTranslations({ locale, namespace: 'matbaaMalzemeleri' })`

- [ ] **Step 3: Build and verify**

Run: `npm run build` — Expected: success, new page generates for all 4 locales.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/matbaa-malzemeleri/ messages/
git commit -m "feat(seo): add matbaa-malzemeleri pillar landing page"
```

---

### Task 7: Create Istanbul Local SEO Page

**Files:**
- Create: `src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx`
- Modify: `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`

- [ ] **Step 1: Add `istanbulSeo` translation namespace to all message files**

Add ~20 translation keys per language covering: title, subtitle, intro, location details (address, phone, hours), 5 services list items, why Istanbul section, CTA.

- [ ] **Step 2: Create Istanbul local SEO page**

Create `src/app/[locale]/matbaa-malzemeleri-istanbul/page.tsx` as async server component with:
- `generateMetadata()` targeting "matbaa malzemeleri istanbul" and equivalents
- Enhanced LocalBusiness JSON-LD with geo coordinates (40.9835, 28.6285), opening hours, service area
- BreadcrumbList JSON-LD
- Layout: VerticalNav + Footer
- Sections: Hero, Intro, Location info with address/phone/hours, Services list, Why Istanbul, CTA

- [ ] **Step 3: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/matbaa-malzemeleri-istanbul/ messages/
git commit -m "feat(seo): add Istanbul local SEO landing page"
```

---

## Phase 2 Checkpoint

Run: `npm run build` — full build must succeed.

---

## Phase 3 — Internal Linking & Structural

### Task 8: Add Cross-Linking Data to Blog and Products

**Files:**
- Modify: `src/data/blog.ts`
- Modify: `src/data/products.ts`

- [ ] **Step 1: Add `relatedProducts?: string[]` to BlogPost interface and populate each post**

Map blog topics to relevant product slugs logically (e.g., ICC profil post → SAKATA INX CMYK slug).

- [ ] **Step 2: Add `relatedBlogPosts?: string[]` to Product interface and populate each product**

Map products to 1-3 relevant blog post slugs.

- [ ] **Step 3: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/data/blog.ts src/data/products.ts
git commit -m "feat(seo): add cross-linking data between blog posts and products"
```

---

### Task 9: Render Related Products on Blog Detail Page

**Files:**
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`
- Modify: `src/app/[locale]/blog/[slug]/BlogPostClient.tsx`
- Modify: `messages/tr.json`, `messages/en.json`, `messages/ru.json`, `messages/ar.json`

- [ ] **Step 1: Add "Related Products" translation key to blog section**

- [ ] **Step 2: Import products data and pass filtered related products to BlogPostClient**

- [ ] **Step 3: Render related product cards in BlogPostClient after blog content**

- [ ] **Step 4: Build and verify, then commit**

```bash
git commit -m "feat(seo): render related products on blog detail pages"
```

---

### Task 10: Render Related Blog Posts on Product Detail Page

**Files:**
- Modify: `src/app/[locale]/urunler/[slug]/page.tsx`
- Modify: Product detail client component
- Modify: `messages/*.json`

- [ ] **Step 1: Add "Related Articles" translation key**

- [ ] **Step 2: Import blog data and pass filtered related posts to client component**

- [ ] **Step 3: Render related blog cards after product content**

- [ ] **Step 4: Build and verify, then commit**

```bash
git commit -m "feat(seo): render related blog articles on product pages"
```

---

### Task 11: Add Inline FAQ with Schema to Blog Posts

**Files:**
- Modify: `src/data/blog.ts`
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`
- Modify: Blog post client component

- [ ] **Step 1: Add `faq?: Array<{ q: Record<string, string>; a: Record<string, string> }>` to BlogPost interface**

- [ ] **Step 2: Add 3-4 topic-relevant FAQ items to each blog post in all 4 languages**

- [ ] **Step 3: Add conditional FAQPage JSON-LD in blog post page.tsx**

If `post.faq` has items, generate FAQPage schema alongside the existing Article schema.

- [ ] **Step 4: Render FAQ section in BlogPostClient (expandable list before related products)**

- [ ] **Step 5: Build and verify, then commit**

```bash
git commit -m "feat(seo): add inline FAQ with FAQPage schema to blog posts"
```

---

## Phase 3 Checkpoint

Run: `npm run build` — full build must succeed.

---

## Phase 4 — Glossary Page

### Task 12: Create Glossary Data and Page

**Files:**
- Create: `src/data/glossary.ts`
- Create: `src/app/[locale]/matbaa-terimleri-sozlugu/page.tsx`
- Modify: `src/i18n/routing.ts`, `src/lib/seo.ts`, `src/app/sitemap.ts`
- Modify: `messages/*.json`

- [ ] **Step 1: Add glossary routing, path translations, and sitemap entry**

Same pattern as Task 5. Routes:
- TR: `/matbaa-terimleri-sozlugu`
- EN: `/printing-glossary`
- RU: `/glossarij-poligrafii`
- AR: `/mustalahaat-altibaa`

- [ ] **Step 2: Create glossary data file**

Create `src/data/glossary.ts` with 50+ printing terms. Each term: `{ term: Record<string, string>; definition: Record<string, string> }`. Cover: CMYK, offset, blanket, dot gain, ICC, PANTONE, trapping, registration, densitometre, spektrofotometre, GRACoL, FOGRA, prepress, Delta E, vernik, dispersiyon, UV cure, viskozite, emülsiyon, fount solution, tack, misting, setoff, drying, paper grain, GSM, etc.

- [ ] **Step 3: Add glossary messages to JSON files**

Add `glossary` namespace with: title, subtitle, searchPlaceholder, noResults, letterNav labels.

- [ ] **Step 4: Create glossary page component**

Async server component with:
- DefinedTermSet JSON-LD schema
- BreadcrumbList JSON-LD
- `generateMetadata()` with glossary-specific keywords
- Alphabetical letter navigation
- Term cards with definitions
- VerticalNav + Footer layout

- [ ] **Step 5: Build and verify**

Run: `npm run build` — Expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/data/glossary.ts src/app/[locale]/matbaa-terimleri-sozlugu/ src/i18n/routing.ts src/lib/seo.ts src/app/sitemap.ts messages/
git commit -m "feat(seo): add printing glossary page with 50+ terms in 4 languages"
```

---

## Final Verification

- [ ] Run `npm run build` — full clean build must succeed
- [ ] Verify sitemap includes all new URLs
- [ ] Spot-check JSON-LD on dev server for: homepage, blog listing, a blog post, FAQ, pillar page, istanbul page, glossary
- [ ] Verify hreflang alternates work for all new pages
- [ ] Check no regressions on existing pages

---

*Plan covers all items from spec: `docs/superpowers/specs/2026-04-14-seo-improvements-design.md`*
