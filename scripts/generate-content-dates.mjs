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
    '/iletisim': ['src/app/[locale]/iletisim', 'src/data/organization.ts'],
  '/blog': ['src/data/blog.ts', 'src/data/new-posts.ts'],
  '/sss': ['src/data/faq.ts'],
  '/matbaa-malzemeleri': ['src/app/[locale]/matbaa-malzemeleri', 'src/data/pillar-matbaa-malzemeleri.ts'],
  '/matbaa-malzemeleri-istanbul': ['src/app/[locale]/matbaa-malzemeleri-istanbul', 'src/data/istanbul.ts'],
  '/matbaa-murekkepleri': ['src/app/[locale]/matbaa-murekkepleri', 'src/data/murekkep-hub.ts'],
  '/ihracat': ['src/app/[locale]/ihracat', 'src/data/export.ts'],
  '/ofset-murekkep-ihracati': ['src/app/[locale]/ofset-murekkep-ihracati', 'src/data/export.ts'],
  '/hakkimizda': ['src/app/[locale]/hakkimizda', 'src/data/about.ts'],
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
// Sığ klonda (depth 1) her dosyanın "son commit"i HEAD olur → anlamsız lastmod; committed dosya korunur.
let shallow = false;
try {
  shallow = execSync('git rev-parse --is-shallow-repository', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() === 'true';
} catch {
  shallow = false;
}
const hasGit = !shallow && gitDate(['package.json']) !== null;

const pages = {};
for (const [path, files] of Object.entries(PAGES)) {
  pages[path] = (hasGit && gitDate(files)) || previous.pages?.[path] || today;
}
const products = (hasGit && gitDate(['src/data/products.ts'])) || previous.products || today;
const site = Object.values(pages).concat(products).sort().at(-1);

const next = { source: hasGit ? 'git' : previous.source || 'fallback', site, products, pages };
const serialized = JSON.stringify(next, null, 2) + '\n';
// Değişiklik yoksa yazma (her build'de kirli dosya oluşmasın)
if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== serialized) writeFileSync(OUT, serialized);
console.log(`content-dates: ${hasGit ? 'git' : shallow ? 'shallow→fallback' : 'fallback'} → ${OUT} (site ${site}, products ${products})`);
