import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import RfqForm from '@/components/forms/RfqForm';
import { ArrowRight, CheckCircle2, Phone, Truck } from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { PILLAR_IMAGES } from '@/data/pillar-matbaa-malzemeleri';
import { getOffsetInkExport, INK_EXPORT_HERO_IMAGE, RFQ_COUNTRIES, RFQ_INCOTERMS, rfqProductGroups } from '@/data/export';
import { webPageJsonLd, breadcrumbJsonLd, faqPageJsonLd, jsonLdScriptProps } from '@/lib/schema';

const PATH = '/ofset-murekkep-ihracati' as const;
const HOME_NAMES: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
const HUB_NAMES: Record<string, string> = { tr: 'İhracat', en: 'Export from Turkey', ru: 'Экспорт из Турции', ar: 'التصدير من تركيا' };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getOffsetInkExport(locale);
  return createPageMetadata({ locale, path: PATH, title: c.meta.title, description: c.meta.description, keywords: c.meta.keywords, ogImage: INK_EXPORT_HERO_IMAGE });
}

const sectionCls = 'border-t border-white/[0.06] px-6 py-16 lg:px-10 lg:py-24';
const h2Cls = 'font-heading text-2xl font-bold text-cream md:text-3xl';
const pCls = 'mt-4 text-base leading-relaxed text-silver';
const thCls = 'px-5 py-4 text-start font-heading font-semibold text-gold';
const tdCls = 'px-5 py-4 align-top text-silver';

export default async function OffsetInkExportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getOffsetInkExport(locale);
  const heroAlt = PILLAR_IMAGES.find((i) => i.src === INK_EXPORT_HERO_IMAGE)?.alt[locale as 'tr' | 'en' | 'ru' | 'ar'] ?? 'EVA COLOR metallic ink';
  const jsonLd = [
    webPageJsonLd(locale, PATH, { name: c.hero.h1, description: c.meta.description, image: INK_EXPORT_HERO_IMAGE }),
    breadcrumbJsonLd(locale, [{ name: HOME_NAMES[locale] || HOME_NAMES.tr, path: '/' }, { name: HUB_NAMES[locale] || HUB_NAMES.tr, path: '/ihracat' }, { name: c.pageName, path: PATH }]),
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
                <a href="#rfq" className="mt-8 inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light">{c.rfq.submit}<ArrowRight size={14} /></a>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                <Image src={INK_EXPORT_HERO_IMAGE} alt={heroAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <h2 className={h2Cls}>{c.maker.title}</h2>
                {c.maker.paragraphs.map((p, i) => <p key={i} className={pCls}>{p}</p>)}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {c.maker.facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-800 p-4">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-gold" />
                    <div><p className="text-xs uppercase tracking-wider text-silver">{f.label}</p><p className="mt-1 text-sm text-cream">{f.value}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {([['types', c.types.title, c.types.intro, c.types.headers, c.types.rows.map((r) => [r.type, r.brand, r.use, r.packaging])], ['specs', c.specs.title, c.specs.intro, c.specs.headers, c.specs.rows.map((r) => [r.property, r.why, r.where])]] as const).map(([key, title, intro, headers, rows], idx) => (
            <section key={key} className={`${sectionCls} ${idx % 2 === 0 ? 'bg-ink-800' : 'bg-ink-900'}`}>
              <div className="mx-auto max-w-6xl">
                <h2 className={h2Cls}>{title}</h2>
                <p className={`${pCls} max-w-3xl`}>{intro}</p>
                <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead><tr className="border-b border-white/[0.06] bg-ink-900">{headers.map((h) => <th key={h} className={thCls}>{h}</th>)}</tr></thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row[0]} className="border-b border-white/[0.04] last:border-0">
                          {row.map((cell, j) => j === 0 ? <th key={j} scope="row" className="px-5 py-4 text-start align-top font-medium text-cream">{cell}</th> : <td key={j} className={tdCls}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}

          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-4xl">
              <h2 className={h2Cls}>{c.process.title}</h2>
              <p className={pCls}>{c.process.intro}</p>
              <ol className="mt-8 space-y-4">
                {c.process.steps.map((s, i) => (
                  <li key={s.name} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">{i + 1}</span>
                    <div><h3 className="font-heading text-base font-semibold text-cream">{s.name}</h3><p className="mt-1 text-sm leading-relaxed text-silver">{s.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-3"><Truck size={22} className="text-gold" /><h2 className={h2Cls}>{c.logistics.title}</h2></div>
              <p className={`${pCls} max-w-3xl`}>{c.logistics.text}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.logistics.items.map((it) => (
                  <li key={it.name} className="rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                    <h3 className="font-heading text-sm font-semibold text-cream">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="rfq" className={`${sectionCls} scroll-mt-24 bg-ink-800`}>
            <div className="mx-auto max-w-4xl">
              <RfqForm labels={c.rfq} productGroups={rfqProductGroups(locale)} incoterms={RFQ_INCOTERMS} countries={RFQ_COUNTRIES} source="offset-ink-export" />
            </div>
          </section>

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

          <section className={`${sectionCls} bg-ink-800 !py-14`}>
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
