import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { createPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2, Factory, Globe, FlaskConical, Handshake } from 'lucide-react';
import { ORGANIZATION } from '@/data/organization';
import { getAboutContent, aboutBrandRows, ABOUT_TIMELINE, ABOUT_PEOPLE, ABOUT_CREDENTIALS, ABOUT_IMAGES } from '@/data/about';
import { aboutPageJsonLd, breadcrumbJsonLd, faqPageJsonLd, personJsonLd, jsonLdScriptProps } from '@/lib/schema';

const PATH = '/hakkimizda' as const;
const HOME_NAMES: Record<string, string> = { tr: 'Ana Sayfa', en: 'Home', ru: 'Главная', ar: 'الرئيسية' };
const ACTIVITY_ICONS = [Factory, Handshake, FlaskConical];

function alt(src: string, locale: string): string {
  const img = ABOUT_IMAGES.find((i) => i.src === src);
  return img ? img.alt[locale as keyof typeof img.alt] || img.alt.tr : '';
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = getAboutContent(locale);
  return createPageMetadata({ locale, path: PATH, title: c.meta.title, description: c.meta.description, keywords: c.meta.keywords, ogImage: ABOUT_IMAGES[0].src });
}

const sectionCls = 'border-t border-white/[0.06] px-6 py-16 lg:px-10 lg:py-24';
const h2Cls = 'font-heading text-2xl font-bold text-cream md:text-3xl';
const pCls = 'mt-4 text-base leading-relaxed text-silver';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getAboutContent(locale);
  const l = locale as keyof (typeof ABOUT_TIMELINE)[number]['text'];
  const brandRows = aboutBrandRows(locale);
  const todayLabel: Record<string, string> = { tr: 'Bugün', en: 'Today', ru: 'Сегодня', ar: 'اليوم' };

  const jsonLd: unknown[] = [
    aboutPageJsonLd(locale, { name: c.hero.h1, description: c.meta.description }),
    breadcrumbJsonLd(locale, [
      { name: HOME_NAMES[locale] || HOME_NAMES.tr, path: '/' },
      { name: c.pageName, path: PATH },
    ]),
    faqPageJsonLd(locale, c.faq.items),
  ];
  if (ABOUT_PEOPLE.length) jsonLd.push({ '@context': 'https://schema.org', '@graph': ABOUT_PEOPLE.map((p) => personJsonLd(p, locale)) });

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
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/90">{c.hero.lead}</p>
                {c.intro.map((p, i) => (
                  <p key={i} className={`${pCls} max-w-2xl`}>{p}</p>
                ))}
              </div>
              <div className="relative aspect-[5/6] overflow-hidden rounded-2xl border border-white/[0.06]">
                <Image src={ABOUT_IMAGES[0].src} alt={alt(ABOUT_IMAGES[0].src, locale)} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </section>

          {/* Numbers */}
          <section className="border-y border-white/[0.06] bg-ink-800 px-6 py-10 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <h2 className="sr-only">{c.numbers.title}</h2>
              <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                {c.numbers.items.map((n) => (
                  <div key={n.label} className="flex flex-col text-center">
                    <dt className="order-2 mt-2 text-xs font-medium uppercase tracking-wider text-silver">{n.label}</dt>
                    <dd className="font-heading text-2xl font-bold text-gold md:text-3xl">{n.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* History + timeline */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
                <div>
                  <h2 className={h2Cls}>{c.history.title}</h2>
                  <p className={pCls}>{c.history.intro}</p>
                  <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                    <Image src={ABOUT_IMAGES[1].src} alt={alt(ABOUT_IMAGES[1].src, locale)} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.history.timelineTitle}</h3>
                  <ol className="mt-6 space-y-6 border-s border-gold/30 ps-6">
                    {ABOUT_TIMELINE.map((t) => (
                      <li key={t.year} className="relative">
                        <span className="absolute -start-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                        <p className="font-heading text-sm font-bold text-gold">{/^\d{4}$/.test(t.year) ? t.year : todayLabel[locale] || todayLabel.tr}</p>
                        <p className="mt-1 text-sm leading-relaxed text-silver">{t.text[l] || t.text.tr}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Activities */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.activities.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.activities.intro}</p>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {c.activities.items.map((a, i) => {
                  const Icon = ACTIVITY_ICONS[i] ?? Factory;
                  return (
                    <article key={a.name} className="flex flex-col rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10"><Icon size={22} className="text-gold" /></div>
                      <h3 className="font-heading text-lg font-semibold text-cream">{a.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">{a.text}</p>
                      <Link href={a.href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:gap-2">
                        {a.linkLabel}
                        <ArrowRight size={12} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Brands */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.brands.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.brands.intro}</p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-ink-800">
                      {c.brands.headers.map((h) => <th key={h} className="px-5 py-4 text-start font-heading font-semibold text-gold">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {brandRows.map((b) => (
                      <tr key={b.name} className="border-b border-white/[0.04] last:border-0">
                        <th scope="row" className="px-5 py-4 text-start font-medium text-cream">{b.name}</th>
                        <td className="px-5 py-4 text-silver">{b.country}</td>
                        <td className="px-5 py-4 text-silver">{b.role}</td>
                        <td className="px-5 py-4 text-silver">{b.products}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/temsilcilikler" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:gap-3">
                {c.brands.linkLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Standards + credentials */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <h2 className={h2Cls}>{c.standards.title}</h2>
              <p className={`${pCls} max-w-3xl`}>{c.standards.intro}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.standards.items.map((s) => (
                  <li key={s.name} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-900 p-5">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-gold" />
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-cream">{s.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {ABOUT_CREDENTIALS.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.standards.credentialsTitle}</h3>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {ABOUT_CREDENTIALS.map((cr) => (
                      <li key={cr.name.tr} className="rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-sm text-cream">
                        {cr.url ? <a href={cr.url} target="_blank" rel="noopener">{cr.name[l] || cr.name.tr}</a> : cr.name[l] || cr.name.tr}
                        {cr.year ? <span className="text-silver"> · {cr.year}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Team */}
          <section className={`${sectionCls} bg-ink-900`}>
            <div className="mx-auto max-w-6xl">
              <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
                <div>
                  <h2 className={h2Cls}>{c.team.title}</h2>
                  <p className={pCls}>{c.team.intro}</p>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {c.team.roles.map((r) => (
                      <li key={r.name} className="rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                        <h3 className="font-heading text-sm font-semibold text-cream">{r.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-silver">{r.text}</p>
                      </li>
                    ))}
                  </ul>
                  {ABOUT_PEOPLE.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold">{c.team.peopleTitle}</h3>
                      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {ABOUT_PEOPLE.map((p) => (
                          <li key={p.name} className="flex gap-4 rounded-xl border border-white/[0.06] bg-ink-800 p-5">
                            {p.image ? (
                              <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"><Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" /></span>
                            ) : (
                              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-heading text-lg font-bold text-gold">{p.name.slice(0, 1)}</span>
                            )}
                            <div>
                              <p className="font-heading text-base font-semibold text-cream">{p.name}</p>
                              <p className="text-xs uppercase tracking-wider text-gold">{p.jobTitle[l] || p.jobTitle.tr}</p>
                              {p.bio[l] || p.bio.tr ? <p className="mt-2 text-sm leading-relaxed text-silver">{p.bio[l] || p.bio.tr}</p> : null}
                              {p.linkedin ? <a href={p.linkedin} target="_blank" rel="noopener" className="mt-2 inline-block text-xs text-gold underline underline-offset-4">LinkedIn</a> : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link href="/iletisim" className="mt-8 inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light">
                    {c.team.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/[0.06]">
                    <Image src={ABOUT_IMAGES[2].src} alt={alt(ABOUT_IMAGES[2].src, locale)} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                  </div>
                  <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10"><Globe size={20} className="text-gold" /></div>
                    <h3 className="font-heading text-lg font-semibold text-cream">{c.exportSection.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{c.exportSection.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission, vision, values */}
          <section className={`${sectionCls} bg-ink-800`}>
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-white/[0.06] bg-ink-900 p-8">
                  <h2 className="font-heading text-xl font-bold text-cream">{c.mission.title}</h2>
                  <p className={pCls}>{c.mission.text}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-ink-900 p-8">
                  <h2 className="font-heading text-xl font-bold text-cream">{c.vision.title}</h2>
                  <p className={pCls}>{c.vision.text}</p>
                </div>
              </div>
              <h2 className={`${h2Cls} mt-14`}>{c.values.title}</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.values.items.map((v) => (
                  <li key={v.name} className="rounded-xl border border-white/[0.06] bg-ink-900 p-6">
                    <h3 className="font-heading text-base font-semibold text-cream">{v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{v.text}</p>
                  </li>
                ))}
              </ul>
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

          {/* CTA */}
          <section className="bg-gold px-6 py-14 lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{c.cta.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-white/80">{c.cta.text}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`tel:${ORGANIZATION.telephone}`} className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-cream">
                  {c.cta.button}
                </a>
                <Link href="/iletisim" className="inline-flex items-center gap-2 border-2 border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10">
                  {c.team.cta}
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
