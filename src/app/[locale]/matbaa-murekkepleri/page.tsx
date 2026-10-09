import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createPageMetadata, getCanonicalUrl } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import InlineText from '@/components/ui/InlineText';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { getProductBySlug, getProductSlug } from '@/data/products';
import { getBlogPostBySlug, getBlogSlug } from '@/data/blog';
import { ORGANIZATION } from '@/data/organization';
import { PILLAR_IMAGES } from '@/data/pillar-matbaa-malzemeleri';
import { getHubContent, INK_TYPES, HUB_RELATED_POSTS, HUB_RELATED_LINKS, HUB_HERO_IMAGE } from '@/data/murekkep-hub';
import { localizeInlineLinks } from '@/lib/inline-links-localize';
import { localizedProductPath } from '@/lib/paths';
import { webPageJsonLd, breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd, jsonLdScriptProps } from '@/lib/schema';

const PATH = '/matbaa-murekkepleri' as const;
const HOME_NAMES: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
const PILLAR_NAMES: Record<string, string> = { tr: 'Matbaa Malzemeleri', en: 'Printing Materials', ru: 'Полиграфические материалы', ar: 'مواد الطباعة' };

function alt(src: string, locale: string): string {
  const img = PILLAR_IMAGES.find((i) => i.src === src);
  return img ? img.alt[locale as keyof typeof img.alt] || img.alt.tr : '';
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getHubContent(locale);
  return createPageMetadata({ locale, path: PATH, title: c.meta.title, description: c.meta.description, keywords: c.meta.keywords, ogImage: HUB_HERO_IMAGE });
}

const sectionCls = 'border-t border-white/[0.06] px-6 py-16 lg:px-10 lg:py-24';
const h2Cls = 'font-heading text-2xl font-bold text-cream md:text-3xl';
const pCls = 'mt-4 text-base leading-relaxed text-silver';
const thCls = 'px-5 py-4 text-start font-heading font-semibold text-gold';
const tdCls = 'px-5 py-4 align-top text-silver';

export default async function InkHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getHubContent(locale);
  const l = locale as keyof (typeof INK_TYPES)[number]['name'];
  const t = (text: string) => localizeInlineLinks(text, locale);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const jsonLd = [
    webPageJsonLd(locale, PATH, { name: c.hero.h1, description: c.meta.description, image: HUB_HERO_IMAGE }),
    breadcrumbJsonLd(locale, [
      { name: HOME_NAMES[locale] || HOME_NAMES.tr, path: '/' },
      { name: PILLAR_NAMES[locale] || PILLAR_NAMES.tr, path: '/matbaa-malzemeleri' },
      { name: c.pageName, path: PATH },
    ]),
    itemListJsonLd(locale, c.types.title, INK_TYPES.map((it) => ({ name: it.name[l] || it.name.tr, url: `${getCanonicalUrl(locale, PATH)}#${it.key}` }))),
    faqPageJsonLd(locale, c.faq.items),
  ];
  const relatedPosts = HUB_RELATED_POSTS.map((s) => getBlogPostBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {jsonLd.map((data, i) => (
        <script key={i} {...jsonLdScriptProps(data)} />
      ))}
      <main className="flex min-h-screen">
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">
          {/* Hero */}
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.hero.eyebrow}</p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">{c.hero.h1}</h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver">{c.hero.lead}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/iletisim" className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light">
                    {c.cta.button}
                    <ArrowRight size={14} />
                  </Link>
                  <a href={`#${INK_TYPES[0].key}`} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:text-gold">
                    {c.types.title}
                  </a>
                </div>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                <Image src={HUB_HERO_IMAGE} alt={alt(HUB_HERO_IMAGE, locale)} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </section>

          {/* Short answer + key facts */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 lg:p-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.shortAnswer.title}</p>
                <p className="text-base leading-relaxed text-cream">{c.shortAnswer.text}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
                <table className="w-full text-sm">
                  <caption className="bg-ink-900 px-5 py-3 text-start font-heading text-sm font-semibold uppercase tracking-wider text-gold">{c.keyFacts.title}</caption>
                  <tbody>
                    {c.keyFacts.rows.map((row) => (
                      <tr key={row.label} className="border-t border-white/[0.04]">
                        <th scope="row" className="w-36 px-5 py-3 text-start align-top font-medium text-cream">{row.label}</th>
                        <td className="px-5 py-3 text-silver">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* What is ink */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-4xl">
              <h2 className={h2Cls}>{c.what.title}</h2>
              {c.what.paragraphs.map((p, i) => (
                <p key={i} className={pCls}><InlineText text={t(p)} /></p>
              ))}
            </div>
          </section>

          {/* Ink types */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.types.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.types.intro}</p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {INK_TYPES.map((it, i) => (
                  <li key={it.key}>
                    <a href={`#${it.key}`} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-900 p-4 transition-all hover:border-gold/40">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-xs font-bold text-gold">{i + 1}</span>
                      <span>
                        <span className="block font-heading text-sm font-semibold text-cream">{it.name[l] || it.name.tr}</span>
                        <span className="mt-1 block text-xs text-silver">{it.summary[l] || it.summary.tr}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-12 space-y-16">
                {INK_TYPES.map((it, i) => {
                  const product = getProductBySlug(it.productSlug);
                  const href = localizedProductPath(it.productSlug, locale);
                  return (
                    <article key={it.key} id={it.key} className="scroll-mt-28 grid items-start gap-8 lg:grid-cols-[2fr_3fr]">
                      <div className={`relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <Image src={it.image} alt={alt(it.image, locale)} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-cream md:text-2xl"><span className="mr-2">{it.icon}</span>{it.name[l] || it.name.tr}</h3>
                        {(it.body[l] || it.body.tr).map((p, j) => (
                          <p key={j} className={pCls}><InlineText text={t(p)} /></p>
                        ))}
                        <p className="mt-4 rounded-xl border border-white/[0.06] bg-ink-900 p-4 text-sm leading-relaxed text-silver">
                          <span className="font-semibold text-cream">{c.types.whenLabel}: </span>{it.whenToUse[l] || it.whenToUse.tr}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="text-xs uppercase tracking-wider text-silver">{c.types.brandsLabel}: <span className="text-cream">{it.brands.join(' · ')}</span></span>
                          {product && (
                            <Link href={{ pathname: '/urunler/[slug]' as const, params: { slug: getProductSlug(product, locale) } }} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:gap-2">
                              {c.types.viewLabel}
                              <ArrowRight size={12} />
                            </Link>
                          )}
                          {!product && <a href={href} className="text-xs text-gold">{c.types.viewLabel}</a>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Brand × type matrix */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.matrix.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.matrix.intro}</p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-800">
                      {c.matrix.headers.map((h) => <th key={h} className={thCls}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {c.matrix.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-white/[0.04] last:border-0">
                        {row.map((cell, j) => j === 0 ? <th key={j} scope="row" className="px-5 py-4 text-start font-medium text-cream">{cell}</th> : <td key={j} className={tdCls}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`${pCls} max-w-3xl text-sm`}>{c.matrix.note}</p>
            </div>
          </section>

          {/* Selection table */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.selection.title}</h2>
              <p className={`${pCls} max-w-3xl`}><InlineText text={t(c.selection.intro)} /></p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-900">
                      {c.selection.headers.map((h) => <th key={h} className={thCls}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {c.selection.rows.map((r) => (
                      <tr key={r.criterion} className="border-b border-white/[0.04] last:border-0">
                        <th scope="row" className="px-5 py-4 text-start align-top font-medium text-cream">{r.criterion}</th>
                        <td className={tdCls}>{r.options}</td>
                        <td className={tdCls}>{r.advice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Maker + distributor */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <h2 className={h2Cls}>{c.maker.title}</h2>
                {c.maker.paragraphs.map((p, i) => (
                  <p key={i} className={pCls}><InlineText text={t(p)} /></p>
                ))}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {c.maker.facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-4">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-silver">{f.label}</p>
                      <p className="mt-1 text-sm text-cream">{f.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Price + support */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.price.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.price.intro}</p>
              <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.price.factors.map((f, i) => (
                  <li key={f.name} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-ink-900 p-5">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">{i + 1}</span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-cream">{f.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-6 lg:p-8">
                <h2 className="font-heading text-xl font-bold text-cream">{c.support.title}</h2>
                <p className={pCls}>{c.support.text}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-4xl">
              <h2 className={`${h2Cls} mb-10`}>{c.faq.title}</h2>
              <dl className="space-y-5">
                {c.faq.items.map((f) => (
                  <div key={f.q} className="rounded-xl border border-white/[0.06] bg-ink-800 p-6">
                    <dt className="font-heading text-base font-semibold text-cream">{f.q}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-silver">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Related */}
          <section className={`${sectionCls} bg-ink-800 !py-14`}>
            <div className="mx-auto max-w-6xl">
              <h2 className="font-heading text-xl font-bold text-cream md:text-2xl">{c.related.title}</h2>
              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.related.postsTitle}</h3>
                  <ul className="mt-3 space-y-2">
                    {relatedPosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={{ pathname: '/blog/[slug]' as const, params: { slug: getBlogSlug(post, locale) } }} className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-gold">
                          <ArrowRight size={12} className="flex-shrink-0 text-gold" />
                          {post.title[locale] || post.title.tr}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.related.linksTitle}</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {HUB_RELATED_LINKS.map((lk) => (
                      <Link key={lk.path} href={lk.path} className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10">
                        {lk.label[l] || lk.label.tr}
                        <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gold px-6 py-14 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{c.cta.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-white/80">{c.cta.text}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/iletisim" className="inline-flex items-center gap-2 border-2 border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10">
                  {c.cta.button}
                  <ArrowRight size={14} />
                </Link>
                {whatsapp && (
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border-2 border-white/60 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10">
                    WhatsApp
                  </a>
                )}
                <a href={`tel:${ORGANIZATION.telephone}`} className="inline-flex items-center gap-2 border-2 border-white/60 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10">
                  <Phone size={14} />
                  {c.cta.phone}
                </a>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
