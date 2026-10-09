#!/usr/bin/env node
/**
 * Sitemap <lastmod> için içerik tarihlerini git geçmişinden üretir → src/data/content-dates.json
 * `npm run build` öncesi (prebuild) çalışır. Git yoksa mevcut dosya korunur (yoksa bugünün tarihi).
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = 'src/data/content-dates.json';
const today = new Date().toISOString().slice(0, 10);

/** Statik rota → içeriğini belirleyen dosyalar (en yeni commit tarihi alınır) */
const PAGES = {
  '/': ['src/app/[locale]/page.tsx', 'src/components/home'],
  '/urunler': ['src/app/[locale]/urunler/page.tsx', 'src/data/products.ts'],
  '/ozel-renk-uretimi': ['src/app/[locale]/ozel-renk-uretimi', 'messages/tr.json'],
  '/temsilcilikler': ['src/app/[locale]/temsilcilikler'],
  '/hakkimizda': ['src/app/[locale]/hakkimizda', 'messages/tr.json'],
  '/iletisim': ['src/app/[locale]/iletisim', 'src/data/organization.ts'],
  '/blog': ['src/data/blog.ts', 'src/data/new-posts.ts'],
  '/sss': ['src/data/faq.ts'],
  '/matbaa-malzemeleri': ['src/app/[locale]/matbaa-malzemeleri'],
  '/matbaa-malzemeleri-istanbul': ['src/app/[locale]/matbaa-malzemeleri-istanbul'],
  '/ofset-baski-malzemeleri': ['src/app/[locale]/ofset-baski-malzemeleri'],
  '/matbaa-terimleri-sozlugu': ['src/data/glossary.ts', 'src/app/[locale]/matbaa-terimleri-sozlugu'],
};

function gitDate(paths) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${paths.map((p) => JSON.stringify(p)).join(' ')}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { pages: {} };
const hasGit = gitDate(['package.json']) !== null;

const pages = {};
for (const [path, files] of Object.entries(PAGES)) {
  pages[path] = (hasGit && gitDate(files)) || previous.pages?.[path] || today;
}
const products = (hasGit && gitDate(['src/data/products.ts'])) || previous.products || today;
const site = Object.values(pages).concat(products).sort().at(-1);

const next = { generatedAt: today, source: hasGit ? 'git' : previous.source || 'fallback', site, products, pages };
writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n');
console.log(`content-dates: ${hasGit ? 'git' : 'fallback'} → ${OUT} (site ${site}, products ${products})`);
