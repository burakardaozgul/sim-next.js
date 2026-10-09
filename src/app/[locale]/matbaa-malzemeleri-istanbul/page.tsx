import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, MapPin, Phone, Clock, CheckCircle2, Truck, Warehouse } from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { PILLAR_IMAGES } from '@/data/pillar-matbaa-malzemeleri';
import { getIstanbulContent, istanbulDistrictRows, ISTANBUL_MAP_EMBED, ISTANBUL_DIRECTIONS } from '@/data/istanbul';
import { localPageJsonLd, breadcrumbJsonLd, faqPageJsonLd, jsonLdScriptProps } from '@/lib/schema';

const PATH = '/matbaa-malzemeleri-istanbul' as const;
const HOME_NAMES: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
const PILLAR_NAMES: Record<string, string> = { tr: 'Matbaa Malzemeleri', en: 'Printing Materials', ru: 'Полиграфические материалы', ar: 'مواد الطباعة' };
const HERO_IMAGE = PILLAR_IMAGES[0];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getIstanbulContent(locale);
  return createPageMetadata({ locale, path: PATH, title: c.meta.title, description: c.meta.description, keywords: c.meta.keywords, ogImage: HERO_IMAGE.src });
}

const sectionCls = 'border-t border-white/[0.06] px-6 py-16 lg:px-10 lg:py-24';
const h2Cls = 'font-heading text-2xl font-bold text-cream md:text-3xl';
const pCls = 'mt-4 text-base leading-relaxed text-silver';
const thCls = 'px-5 py-4 text-start font-heading font-semibold text-gold';

export default async function IstanbulPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getIstanbulContent(locale);
  const rows = istanbulDistrictRows(locale);
  const heroAlt = HERO_IMAGE.alt[locale as keyof typeof HERO_IMAGE.alt] || HERO_IMAGE.alt.tr;

  const jsonLd = [
    localPageJsonLd(locale, PATH, c.hero.h1, c.meta.description),
    breadcrumbJsonLd(locale, [
      { name: HOME_NAMES[locale] || HOME_NAMES.tr, path: '/' },
      { name: PILLAR_NAMES[locale] || PILLAR_NAMES.tr, path: '/matbaa-malzemeleri' },
      { name: c.pageName, path: PATH },
    ]),
    faqPageJsonLd(locale, c.faq.items),
  ];

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
                  <a href={`tel:${ORGANIZATION.telephone}`} className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light">
                    <Phone size={14} />
                    {c.location.phone}
                  </a>
                  <a href={ISTANBUL_DIRECTIONS} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:border-gold hover:text-gold">
                    <MapPin size={14} />
                    {c.location.directionsLabel}
                  </a>
                </div>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                <Image src={HERO_IMAGE.src} alt={heroAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </section>

          {/* Intro + pillar link */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-4xl">
              <h2 className={h2Cls}>{c.intro.title}</h2>
              <p className={pCls}>{c.intro.text}</p>
              <p className={pCls}>
                {c.intro.pillarText}{' '}
                <Link href="/matbaa-malzemeleri" className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                  {c.intro.pillarLink}
                </Link>
              </p>
            </div>
          </section>

          {/* Location card + map */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.location.title}</h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_3fr]">
                <address className="not-italic">
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="text-sm leading-relaxed text-silver">{c.location.address}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                      <a href={`tel:${ORGANIZATION.telephone}`} className="text-sm text-cream hover:text-gold">{c.location.phone}</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="text-sm text-silver"><span className="text-cream">{c.location.hoursLabel}: </span>{c.location.hours}</span>
                    </li>
                  </ul>
                  <a href={ISTANBUL_DIRECTIONS} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:gap-3">
                    {c.location.directionsLabel}
                    <ArrowRight size={14} />
                  </a>
                </address>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800">
                  <iframe
                    src={ISTANBUL_MAP_EMBED}
                    title={c.location.mapTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-72 w-full lg:h-full lg:min-h-[320px]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Districts table */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.districts.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.districts.intro}</p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-900">
                      {c.districts.headers.map((h) => <th key={h} className={thCls}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.name} className="border-b border-white/[0.04] last:border-0">
                        <th scope="row" className="px-5 py-3 text-start font-medium text-cream">{r.name}</th>
                        <td className="px-5 py-3 text-silver">{r.side}</td>
                        <td className="px-5 py-3 text-silver">{r.delivery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`${pCls} max-w-3xl text-sm`}>{c.districts.regionsText}</p>
            </div>
          </section>

          {/* Transport + pickup */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.06] bg-ink-800 p-6 lg:p-8">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10"><Truck size={20} className="text-gold" /></div>
                <h2 className="font-heading text-xl font-bold text-cream">{c.transport.title}</h2>
                <p className={pCls}>{c.transport.text}</p>
              </div>
              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 lg:p-8">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10"><Warehouse size={20} className="text-gold" /></div>
                <h2 className="font-heading text-xl font-bold text-cream">{c.pickup.title}</h2>
                <p className={pCls}>{c.pickup.text}</p>
              </div>
            </div>
          </section>

          {/* Stock */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.stock.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.stock.intro}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.stock.items.map((s) => (
                  <li key={s.name} className="rounded-xl border border-white/[0.06] bg-ink-900 p-5">
                    <h3 className="font-heading text-sm font-semibold text-cream">{s.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-silver">{s.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Services + why */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div>
                <h2 className={h2Cls}>{c.services.title}</h2>
                <ul className="mt-6 space-y-4">
                  {c.services.items.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="text-base text-silver">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={h2Cls}>{c.why.title}</h2>
                <ol className="mt-6 space-y-4">
                  {c.why.items.map((w, i) => (
                    <li key={w.name} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-bold text-gold">{i + 1}</span>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-cream">{w.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-silver">{w.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* FAQ */}
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

          {/* Related */}
          <section className={`${sectionCls} bg-ink-900 !py-14`}>
            <div className="mx-auto max-w-6xl">
              <h2 className="font-heading text-xl font-bold text-cream md:text-2xl">{c.related.title}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {([
                  ['/matbaa-malzemeleri', c.related.pillar],
                  ['/ofset-baski-malzemeleri', c.related.offset],
                  ['/ozel-renk-uretimi', c.related.custom],
                  ['/iletisim', c.related.contact],
                ] as const).map(([href, label]) => (
                  <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold/40 hover:bg-gold/10">
                    {label}
                    <ArrowRight size={13} />
                  </Link>
                ))}
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
                <a href={`tel:${ORGANIZATION.telephone}`} className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream">
                  <Phone size={14} />
                  {c.cta.button}
                </a>
                <Link href="/iletisim" className="inline-flex items-center gap-2 border-2 border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10">
                  {c.related.contact}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
