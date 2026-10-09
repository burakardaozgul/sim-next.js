#!/usr/bin/env node
/**
 * Yayın sonrası sitemap'teki URL'leri IndexNow'a bildirir (Bing/Yandex indeksi → ChatGPT/Copilot kaynağı).
 * Yalnızca INDEXNOW_PING=1 iken çalışır. Anahtar: INDEXNOW_KEY veya public/<32 hex>.txt dosyası.
 */
import { readdirSync, readFileSync } from 'node:fs';

if (process.env.INDEXNOW_PING !== '1') { console.log('indexnow: INDEXNOW_PING!=1, skipped'); process.exit(0); }
const BASE = process.env.SITE_URL || 'https://www.simlimited.net';
const keyFile = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
const key = process.env.INDEXNOW_KEY || (keyFile ? readFileSync(`public/${keyFile}`, 'utf8').trim() : null);
if (!key) { console.error('indexnow: no key'); process.exit(1); }
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const body = { host: new URL(BASE).host, key, keyLocation: `${BASE}/${key}.txt`, urlList: urls.slice(0, 10000) };
const res = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
console.log(`indexnow: ${urls.length} urls → HTTP ${res.status}`);
