import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ISTANBUL_CONTENT } from '@/data/istanbul';

const root = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

describe('EN landing H1 revisions (08 §3): supplier intent + export section', () => {
  it('offset supplies page EN: title/H1 say "Supplier in Turkey" and an Export section links to the EN pillar', () => {
    const src = read('src/app/[locale]/ofset-baski-malzemeleri/page.tsx');
    expect(src).toMatch(/metaTitle: 'Offset Printing Supplies Supplier in Turkey[^']*'/);
    const m = src.match(/metaTitle: '(Offset Printing Supplies Supplier in Turkey[^']*)'/);
    expect(m![1].length).toBeLessThanOrEqual(60);
    expect(src).toMatch(/title: 'Offset Printing Supplies Supplier in Turkey'/);
    expect(src).toMatch(/exportTitle: 'Export[^']*'/);
    expect(src).toMatch(/exportText:\s*'[^']{400,}'/);
    expect(src).toMatch(/exportText[\s\S]*?<Link[\s\S]*?href="\/matbaa-malzemeleri"/);
  });
  it('home EN H1 carries supplies + Turkey', () => {
    const en = JSON.parse(read('messages/en.json'));
    expect(en.hero.seoH1).toMatch(/Printing Supplies/);
    expect(en.hero.seoH1).toMatch(/Turkey/);
  });
  it('Istanbul EN H1 says "Printing Supplies Supplier in Istanbul" and transport mentions port + airport for export', () => {
    expect(ISTANBUL_CONTENT.en.hero.h1).toMatch(/^Printing Supplies Supplier in Istanbul/);
    expect(ISTANBUL_CONTENT.en.transport.text).toMatch(/Ambarlı/);
    expect(ISTANBUL_CONTENT.en.transport.text).toMatch(/airport/i);
  });
});
