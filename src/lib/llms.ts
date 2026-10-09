import { ORGANIZATION, BASE_URL } from '@/data/organization';
import { routing } from '@/i18n/routing';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { glossaryTerms } from '@/data/glossary';
import { faqData } from '@/data/faq';
import { localizedStaticPath, localizedProductPath, localizedBlogPath } from '@/lib/paths';

const abs = (path: string) => `${BASE_URL}${path === '/' ? '' : path}`;
type StaticKey = keyof typeof routing.pathnames;

const PAGES: Array<{ path: StaticKey; title: string; desc: string }> = [
  { path: '/matbaa-malzemeleri', title: 'Printing Materials Guide (pillar)', desc: 'Categories, buying criteria, paper–ink compatibility and the supply process.' },
  { path: '/ofset-baski-malzemeleri', title: 'Offset Printing Supplies Guide (pillar)', desc: 'Offset inks, blankets, pressroom chemicals and varnishes; conventional vs UV comparison; FAQ.' },
  { path: '/matbaa-malzemeleri-istanbul', title: 'Printing Materials in Istanbul', desc: 'Districts served, same-day delivery, warehouse pickup in Beylikdüzü.' },
  { path: '/matbaa-terimleri-sozlugu', title: `Printing Glossary (${glossaryTerms.length} terms)`, desc: 'Printing terms defined in Turkish, English, Russian and Arabic.' },
  { path: '/ozel-renk-uretimi', title: 'Custom Colour Production', desc: '24/7 colour matching laboratory, L*a*b* digital formulation, 15,000 kg monthly capacity.' },
  { path: '/temsilcilikler', title: 'Our Brands', desc: 'Manufacturer and distributor relationships.' },
  { path: '/hakkimizda', title: 'About Us', desc: 'Company history since 1983, mission and expertise.' },
  { path: '/sss', title: 'FAQ', desc: `${faqData.tr.length} frequently asked questions about inks, custom colours, delivery and technical support.` },
  { path: '/iletisim', title: 'Contact', desc: 'Address, phone, email, quote requests.' },
];

function urls(path: string, kind: 'static' | 'product' | 'blog'): string {
  const fn = kind === 'static' ? (l: string) => localizedStaticPath(path as StaticKey, l) : kind === 'product' ? (l: string) => localizedProductPath(path, l) : (l: string) => localizedBlogPath(path, l);
  return routing.locales.map((l) => `${l.toUpperCase()}: ${abs(fn(l))}`).join(' · ');
}

function header(): string {
  const a = ORGANIZATION.address;
  return `# ${ORGANIZATION.name}

> ${ORGANIZATION.positioning.en}

${ORGANIZATION.positioning.tr}

Legal name: ${ORGANIZATION.legalName}
Founded: ${ORGANIZATION.foundingDate}
Website: ${BASE_URL} (TR) · ${BASE_URL}/en (EN) · ${BASE_URL}/ru (RU) · ${BASE_URL}/ar (AR)
Address: ${a.streetAddress}, ${a.postalCode} ${a.addressLocality}/${a.addressRegion}, Türkiye
Phone: +90 212 637 62 49
Email: ${ORGANIZATION.email}
Opening hours: ${ORGANIZATION.openingHours.dayOfWeek[0]}–${ORGANIZATION.openingHours.dayOfWeek.at(-1)} ${ORGANIZATION.openingHours.opens}–${ORGANIZATION.openingHours.closes}
Profiles: ${ORGANIZATION.sameAs.join(' · ')}

## Brands
${ORGANIZATION.brands.map((b) => `- ${b.name} (${b.country}) — ${b.role === 'own' ? 'own brand, manufactured by SIM' : 'distributor for Turkey' + ('since' in b && b.since ? ` since ${b.since}` : '')}: ${b.products}`).join('\n')}
`;
}

export function buildLlmsTxt(): string {
  const lines: string[] = [header()];
  lines.push('## Products');
  for (const p of products) lines.push(`- ${p.name.en}: ${p.description.en}\n  ${urls(p.slug, 'product')}`);
  lines.push('\n## Pages');
  for (const pg of PAGES) lines.push(`- ${pg.title}: ${pg.desc}\n  ${urls(pg.path, 'static')}`);
  lines.push('\n## Blog articles (newest first)');
  for (const post of blogPosts) lines.push(`- ${post.title.en} (${post.date}): ${post.excerpt.en}\n  ${urls(post.slug, 'blog')}`);
  lines.push(`\nFull text version: ${BASE_URL}/llms-full.txt`);
  return lines.join('\n') + '\n';
}

export function buildLlmsFullTxt(): string {
  const lines: string[] = [header()];
  lines.push('## Products / Ürünler');
  for (const p of products) {
    lines.push(`### ${p.name.en} / ${p.name.tr}\n${p.description.en}\n${p.description.tr}\n${urls(p.slug, 'product')}`);
  }
  lines.push('\n## Pages / Sayfalar');
  for (const pg of PAGES) lines.push(`- ${pg.title}: ${pg.desc}\n  ${urls(pg.path, 'static')}`);
  lines.push('\n## Blog articles / Blog yazıları');
  for (const post of blogPosts) {
    lines.push(`### ${post.title.en}\nTR: ${post.title.tr}\nPublished: ${post.date}${post.updated ? ` · Updated: ${post.updated}` : ''}\n${post.excerpt.en}\n${urls(post.slug, 'blog')}`);
    if (post.faq?.length) {
      for (const f of post.faq) lines.push(`- Q: ${f.q.en}\n  A: ${f.a.en}`);
    }
  }
  lines.push('\n## FAQ / Sıkça Sorulan Sorular');
  for (const f of faqData.en) lines.push(`- Q: ${f.q}\n  A: ${f.a}`);
  lines.push('\n## Glossary / Sözlük');
  for (const t of glossaryTerms) lines.push(`- ${t.term.en} (TR: ${t.term.tr}): ${t.definition.en}`);
  return lines.join('\n') + '\n';
}
