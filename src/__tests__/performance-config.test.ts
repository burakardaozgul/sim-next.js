import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..', '..');
const layout = readFileSync(join(root, 'src/app/[locale]/layout.tsx'), 'utf8');
const nextConfig = readFileSync(join(root, 'next.config.ts'), 'utf8');
const css = readFileSync(join(root, 'src/app/globals.css'), 'utf8');
const home = readFileSync(join(root, 'src/app/[locale]/page.tsx'), 'utf8');
const nav = readFileSync(join(root, 'src/components/layout/VerticalNav.tsx'), 'utf8');
const mobileNav = readFileSync(join(root, 'src/components/layout/MobileBottomNav.tsx'), 'utf8');

function fontBlock(name: string): string {
  const i = layout.indexOf(`${name}({`);
  return layout.slice(i, layout.indexOf('});', i));
}

describe('fonts (PR-8)', () => {
  it('heading font covers Turkish characters (latin-ext)', () => {
    expect(fontBlock('Syne')).toMatch(/subsets:\s*\[[^\]]*'latin-ext'/);
  });
  it('display serif loads at most two weights, no italic, and is not preloaded on every page', () => {
    const b = fontBlock('Cormorant_Garamond');
    expect(b).not.toMatch(/'italic'/);
    expect((b.match(/weight:\s*\[([^\]]*)\]/)?.[1].split(',').length ?? 99)).toBeLessThanOrEqual(2);
    expect(b).toMatch(/preload:\s*false/);
  });
  it('Arabic font is not preloaded on non-Arabic pages', () => {
    expect(fontBlock('Noto_Sans_Arabic')).toMatch(/preload:\s*false/);
  });
});

describe('images (PR-8)', () => {
  it('next/image has an explicit deviceSizes list (no 3840px variants for a 1200px layout)', () => {
    expect(nextConfig).toMatch(/deviceSizes:\s*\[/);
    expect(nextConfig).not.toMatch(/3840/);
  });
});

describe('content visible without JavaScript (PR-8)', () => {
  it('fade-in sections are only hidden when JS is present (html.js scope)', () => {
    expect(css).toMatch(/\.js\s+\.fade-in-section\s*\{[^}]*opacity:\s*0/);
    expect(css).not.toMatch(/(^|\n)\.fade-in-section\s*\{[^}]*opacity:\s*0/);
  });
  it('the layout flags JS availability on <html>', () => {
    expect(layout).toMatch(/classList\.add\('js'\)/);
  });
  it('home page H1 is visible (rendered in the hero, not screen-reader only)', () => {
    const hero = readFileSync(join(root, 'src/components/home/HeroSlider.tsx'), 'utf8');
    expect(home).not.toMatch(/<h1[^>]*sr-only/);
    expect(hero).toMatch(/<motion\.h1|<h1/);
    expect(home).toMatch(/<HeroSlider heading=/);
  });
});

describe('navigation links the pillar page (PR-9 / C7)', () => {
  it('vertical nav has the printing-materials pillar', () => {
    expect(nav).toMatch(/href:\s*'\/matbaa-malzemeleri'/);
  });
  it('mobile bottom bar links the pillar', () => {
    expect(mobileNav).toMatch(/href="\/matbaa-malzemeleri"/);
  });
});
