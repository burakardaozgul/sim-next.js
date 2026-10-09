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

function collectAll(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectAll(full, out);
    else if (entry.endsWith('.tsx')) out.push(full);
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
    // Pages/layouts plus server components (files without 'use client') under src/components
    const componentsDir = join(__dirname, '..', 'components');
    const serverComponents = collectAll(componentsDir).filter((f) => !/^['"]use client['"]/.test(readFileSync(f, 'utf8')));
    const offenders: string[] = [];
    const HEADER_BASED = /\b(getTranslations|getMessages|getFormatter|getLocale|getNow|getTimeZone)\(\s*(\)|['"]|\{(?![^}]*\blocale\b))/;
    for (const f of [...files, ...serverComponents]) {
      const src = readFileSync(f, 'utf8');
      const m = src.match(HEADER_BASED);
      if (m) offenders.push(`${f.split('/src/')[1]}: ${m[0]}`);
    }
    expect(offenders).toEqual([]);
  });

  it('the locale layout validates the locale before seeding it for static rendering', () => {
    const src = readFileSync(join(LOCALE_APP_DIR, 'layout.tsx'), 'utf8');
    const body = src.slice(src.indexOf('export default async function'));
    expect(body.indexOf('notFound()')).toBeGreaterThan(-1);
    expect(body.indexOf('notFound()')).toBeLessThan(body.indexOf('setRequestLocale('));
  });
});
