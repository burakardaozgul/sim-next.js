import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import RfqForm from '@/components/forms/RfqForm';
import { ArrowRight, CheckCircle2, Globe, Phone } from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { PILLAR_IMAGES } from '@/data/pillar-matbaa-malzemeleri';
import { getExportHub, EXPORT_PRODUCT_RANGE, EXPORT_HERO_IMAGE, RFQ_COUNTRIES, RFQ_INCOTERMS, rfqProductGroups } from '@/data/export';
import { localizedProductPath, localizedStaticPath } from '@/lib/paths';
import { webPageJsonLd, breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd, jsonLdScriptProps } from '@/lib/schema';
import { getCanonicalUrl } from '@/lib/seo';

const PATH = '/ihracat' as const;
const HOME_NAMES: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getExportHub(locale);
  return createPageMetadata({ locale, path: PATH, title: c.meta.title, description: c.meta.description, keywords: c.meta.keywords, ogImage: EXPORT_HERO_IMAGE });
}

const sectionCls = 'border-t border-white/[0.06] px-6 py-16 lg:px-10 lg:py-24';
const h2Cls = 'font-heading text-2xl font-bold text-cream md:text-3xl';
const pCls = 'mt-4 text-base leading-relaxed text-silver';

export default async function ExportHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getExportHub(locale);
  const l = locale as keyof (typeof EXPORT_PRODUCT_RANGE)[number]['name'];
  const heroAlt = PILLAR_IMAGES.find((i) => i.src === EXPORT_HERO_IMAGE)?.alt[l] ?? 'SIM printing supplies';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const jsonLd = [
    webPageJsonLd(locale, PATH, { name: c.hero.h1, description: c.meta.description, image: EXPORT_HERO_IMAGE }),
    breadcrumbJsonLd(locale, [{ name: HOME_NAMES[locale] || HOME_NAMES.tr, path: '/' }, { name: c.pageName, path: PATH }]),
    itemListJsonLd(locale, c.range.title, EXPORT_PRODUCT_RANGE.map((g) => ({ name: g.name[l] || g.name.en, url: `${getCanonicalUrl(locale, PATH)}#${g.key}` }))),
    faqPageJsonLd(locale, c.faq.items),
  ];

  return (
    <>
      {jsonLd.map((d, i) => <script key={i} {...jsonLdScriptProps(d)} />)}
      <main className="flex min-h-screen">
        <VerticalNav />
        <div className="w-full lg:ml-[260px]">
          <section className="bg-ink-900 px-6 pb-12 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.hero.eyebrow}</p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-cream md:text-5xl">{c.hero.h1}</h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-silver">{c.hero.lead}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#rfq" className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light">{c.rfq.submit}<ArrowRight size={14} /></a>
                  {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:text-gold">{c.cta.whatsapp}</a>}
                </div>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                <Image src={EXPORT_HERO_IMAGE} alt={heroAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-4xl rounded-2xl border border-gold/20 bg-gold/5 p-6 lg:p-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.shortAnswer.title}</p>
              <p className="text-base leading-relaxed text-cream">{c.shortAnswer.text}</p>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.range.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.range.intro}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {EXPORT_PRODUCT_RANGE.map((g) => {
                  const href = g.target.type === 'product' ? localizedProductPath(g.target.slug, locale) : localizedStaticPath(g.target.path, locale);
                  return (
                    <li key={g.key} id={g.key} className="flex flex-col rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                      <h3 className="font-heading text-base font-semibold text-cream">{g.name[l] || g.name.en}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">{g.text[l] || g.text.en}</p>
                      <a href={href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:gap-2">{c.range.viewLabel}<ArrowRight size={12} /></a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.whyTurkey.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.whyTurkey.intro}</p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.whyTurkey.items.map((it) => (
                  <li key={it.name} className="rounded-xl border border-white/[0.06] bg-ink-900 p-5">
                    <h3 className="font-heading text-base font-semibold text-cream">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-3"><Globe size={22} className="text-gold" /><h2 className={h2Cls}>{c.markets.title}</h2></div>
              <p className={`${pCls} max-w-3xl`}>{c.markets.text}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {c.markets.regions.map((r) => (
                  <li key={r.name} className="rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">{r.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.terms.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.terms.intro}</p>
              <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.06]">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/[0.06] bg-ink-900">{c.terms.headers.map((h) => <th key={h} className="px-5 py-4 text-start font-heading font-semibold text-gold">{h}</th>)}</tr></thead>
                  <tbody>
                    {c.terms.rows.map((r) => (
                      <tr key={r.label} className="border-b border-white/[0.04] last:border-0">
                        <th scope="row" className="w-44 px-5 py-4 text-start align-top font-medium text-cream">{r.label}</th>
                        <td className="px-5 py-4 text-silver">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div>
                <h2 className={h2Cls}>{c.compliance.title}</h2>
                <p className={pCls}>{c.compliance.intro}</p>
                <ul className="mt-6 space-y-4">
                  {c.compliance.items.map((it) => (
                    <li key={it.name} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-gold" />
                      <div><h3 className="font-heading text-sm font-semibold text-cream">{it.name}</h3><p className="mt-1 text-sm leading-relaxed text-silver">{it.text}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={h2Cls}>{c.support.title}</h2>
                <p className={pCls}>{c.support.text}</p>
                <ol className="mt-6 space-y-4">
                  {c.support.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">{i + 1}</span>
                      <p className="text-sm leading-relaxed text-silver">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.sectors.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.sectors.intro}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.sectors.items.map((it) => (
                  <li key={it.name} className="rounded-xl border border-white/[0.06] bg-ink-900 p-5">
                    <h3 className="font-heading text-sm font-semibold text-cream">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="rfq" className={`${sectionCls} scroll-mt-24 bg-ink-900`}>
            <div className="mx-auto max-w-4xl">
              <RfqForm labels={c.rfq} productGroups={rfqProductGroups(locale)} incoterms={RFQ_INCOTERMS} countries={RFQ_COUNTRIES} source="export-hub" />
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-4xl">
              <h2 className={`${h2Cls} mb-10`}>{c.faq.title}</h2>
              <dl className="space-y-5">
                {c.faq.items.map((f) => (
                  <div key={f.q} className="rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                    <dt className="font-heading text-base font-semibold text-cream">{f.q}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-silver">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-900 !py-14`}>
            <div className="mx-auto max-w-6xl">
              <h2 className="font-heading text-xl font-bold text-cream md:text-2xl">{c.related.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {c.related.links.map((lk) => (
                  <Link key={lk.path} href={lk.path} className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10">{lk.label}<ArrowRight size={13} /></Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gold px-6 py-14 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{c.cta.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-white/80">{c.cta.text}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#rfq" className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream">{c.rfq.submit}</a>
                <a href={`tel:${ORGANIZATION.telephone}`} className="inline-flex items-center gap-2 border-2 border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"><Phone size={14} />{c.cta.phone}</a>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
