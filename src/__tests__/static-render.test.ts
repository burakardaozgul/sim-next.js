import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LOCALE_APP_DIR = join(__dirname, '..', 'app', '[locale]');

function collectRouteFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectRouteFiles(full, out);
    else if (entry === 'page.tsx' || entry === 'layout.tsx') out.push(full);
  }
  return out;
}

const files = collectRouteFiles(LOCALE_APP_DIR);
const rel = (f: string) => f.slice(LOCALE_APP_DIR.length + 1);

describe('static rendering of [locale] routes (next-intl)', () => {
  it('finds the locale route files', () => {
    expect(files.length).toBeGreaterThanOrEqual(17);
  });

  it('every page and layout calls setRequestLocale(locale) so next-intl does not force dynamic rendering', () => {
    const missing = files.filter((f) => !readFileSync(f, 'utf8').includes('setRequestLocale('));
    expect(missing.map(rel)).toEqual([]);
  });

  it('server translation helpers always receive the locale explicitly (no header-based locale lookup)', () => {
    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      if (/getTranslations\(\s*['"]/.test(src)) offenders.push(`${rel(f)}: getTranslations('…')`);
      if (/getMessages\(\s*\)/.test(src)) offenders.push(`${rel(f)}: getMessages()`);
    }
    expect(offenders).toEqual([]);
  });
});
