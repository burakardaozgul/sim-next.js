'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getBlurDataURL } from '@/lib/blur';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import { blogPosts, type BlogPost, type ContentBlock, getBlogSlug } from '@/data/blog';
import {
  ChevronLeft,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Quote,
  Share2,
  ChevronRight,
  Home,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

/* ─── Reading Progress Bar ─── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const article = document.getElementById('blog-article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop;
      const pct = Math.min(
        Math.max(scrolled / (articleHeight - window.innerHeight), 0),
        1
      );
      setProgress(pct * 100);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent lg:left-[260px]">
      <div
        className="h-full bg-gradient-to-r from-gold to-gold-light transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Share Button ─── */
function ShareButton({ title, label }: { title: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-xs text-silver transition-all hover:border-gold/30 hover:text-gold"
      aria-label="Share"
    >
      <Share2 size={14} />
      {copied ? '✓' : label}
    </button>
  );
}

/* ─── Table of Contents ─── */
function TableOfContents({
  headings,
  tocLabel,
}: {
  headings: { id: string; text: string }[];
  tocLabel: string;
}) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
          {tocLabel}
        </p>
        <ul className="space-y-1 border-l border-white/[0.06]">
          {headings.map(({ id, text }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block border-l-2 py-1.5 pl-4 text-xs leading-snug transition-all ${
                  activeId === id
                    ? 'border-gold text-cream'
                    : 'border-transparent text-silver/60 hover:border-white/20 hover:text-silver'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── Pre-process content blocks to add heading numbers ─── */
interface ProcessedBlock extends ContentBlock {
  headingNumber?: number;
  headingId?: string;
}

function processBlocks(blocks: ContentBlock[]): ProcessedBlock[] {
  let headingCount = 0;
  return blocks.map((block) => {
    if (block.type === 'heading') {
      headingCount += 1;
      return {
        ...block,
        headingNumber: headingCount,
        headingId: `section-${headingCount}`,
      };
    }
    return block;
  });
}

/* ─── Content Block Component ─── */
function BlockRenderer({ block, index }: { block: ProcessedBlock; index: number }) {
  switch (block.type) {
    case 'intro':
      return (
        <p className="text-lg leading-[1.85] text-cream/90 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-gold md:text-xl md:leading-[1.85]">
          {block.text}
        </p>
      );

    case 'heading': {
      // Strip leading number prefix (e.g. "1. " or "7. ") from text since we use decorative numbering
      const headingText = (block.text || '').replace(/^\d+\.\s*/, '');
      return (
        <h2
          id={block.headingId}
          className="mt-10 scroll-mt-24 font-heading text-xl font-bold tracking-tight text-cream md:text-2xl"
        >
          <span className="mr-3 inline-block font-display text-2xl text-gold/40 md:text-3xl">
            {String(block.headingNumber ?? index).padStart(2, '0')}
          </span>
          {headingText}
        </h2>
      );
    }

    case 'paragraph':
      return (
        <p className="text-[15px] leading-[1.9] text-silver/90">
          {block.text}
        </p>
      );

    case 'image':
      return (
        <figure className="my-4 -mx-2 md:-mx-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/[0.06]">
            <Image
              src={block.src!}
              alt={block.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              placeholder="blur"
              blurDataURL={getBlurDataURL(block.src!)}
            />
          </div>
          {block.alt && (
            <figcaption className="mt-3 text-center text-[11px] tracking-wide text-silver/50">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );

    case 'highlight':
      return (
        <div className="relative my-8 overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-ink-800 to-ink-700/50 px-7 py-6 md:px-9 md:py-8">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold/[0.04]" />
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gold/[0.03]" />
          <Quote size={32} className="absolute right-6 top-6 text-gold/10" />
          <p className="relative text-sm font-medium leading-[1.85] text-cream/90 md:text-base md:leading-[1.85]">
            {block.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

/* ─── Gallery Component ─── */
function PostGallery({
  images,
  galleryLabel,
}: {
  images: string[];
  galleryLabel: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="my-10">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
        {galleryLabel}
      </p>
      <div
        className={`grid gap-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/[0.06]"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 360px"
              placeholder="blur"
              blurDataURL={getBlurDataURL(src)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function BlogPostClient({ post }: { post: BlogPost }) {
  const tCta = useTranslations('cta');
  const tBlog = useTranslations('blog');
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const title = post.title[locale] || post.title.tr;
  const rawContent = post.content[locale] || post.content.tr;
  const readTime = post.readTime[locale] || post.readTime.tr;

  // Pre-process blocks with heading numbers (pure, no mutation)
  const processedBlocks = useMemo(() => processBlocks(rawContent), [rawContent]);

  // Extract headings for TOC
  const headings = useMemo(
    () =>
      processedBlocks
        .filter((b): b is ProcessedBlock & { headingId: string } => b.type === 'heading' && !!b.headingId)
        .map((b) => ({ id: b.headingId, text: (b.text || '').replace(/^\d+\.\s*/, '') })),
    [processedBlocks]
  );

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const tocLabel =
    locale === 'tr'
      ? 'İçindekiler'
      : locale === 'ru'
        ? 'Содержание'
        : locale === 'ar'
          ? 'المحتويات'
          : 'Contents';

  const galleryLabel =
    locale === 'tr'
      ? 'Galeri'
      : locale === 'ru'
        ? 'Галерея'
        : locale === 'ar'
          ? 'معرض الصور'
          : 'Gallery';

  const relatedLabel =
    locale === 'tr'
      ? 'İlgili Yazılar'
      : locale === 'ru'
        ? 'Похожие статьи'
        : locale === 'ar'
          ? 'مقالات ذات صلة'
          : 'Related Articles';

  const shareLabel =
    locale === 'tr'
      ? 'Paylaş'
      : locale === 'ru'
        ? 'Поделиться'
        : locale === 'ar'
          ? 'مشاركة'
          : 'Share';

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <ReadingProgress />

      <div className="w-full overflow-x-hidden lg:ml-[260px]">
        {/* ─── Hero ─── */}
        <section className="relative bg-ink-900">
          <div className="relative aspect-21/9 max-h-[520px] w-full overflow-hidden md:aspect-2.5/1">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              placeholder="blur"
              blurDataURL={getBlurDataURL(post.image)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/40 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-10 lg:px-10 lg:pb-14">
              {/* Breadcrumbs */}
              <nav className="mb-5 flex items-center gap-1.5 text-[11px] text-silver/60">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 transition-colors hover:text-gold"
                >
                  <Home size={11} />
                  {tNav('home')}
                </Link>
                <ChevronRight size={10} className="text-silver/30" />
                <Link
                  href="/blog"
                  className="transition-colors hover:text-gold"
                >
                  Blog
                </Link>
                <ChevronRight size={10} className="text-silver/30" />
                <span className="max-w-[200px] text-cream/50 line-clamp-1">
                  {title}
                </span>
              </nav>

              {/* Title */}
              <h1 className="font-heading text-3xl font-bold leading-[1.15] tracking-tight text-cream md:text-4xl lg:text-[2.75rem]">
                {title}
              </h1>

              {/* Meta Row */}
              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-silver/70">
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10">
                    <Calendar size={12} className="text-gold" />
                  </span>
                  {new Date(post.date).toLocaleDateString(
                    locale === 'tr' ? 'tr-TR' : locale,
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10">
                    <User size={12} className="text-gold" />
                  </span>
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10">
                    <Clock size={12} className="text-gold" />
                  </span>
                  {readTime}
                </span>
                <div className="ml-auto hidden md:block">
                  <ShareButton title={title} label={shareLabel} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Back link (mobile) ─── */}
        <div className="bg-ink-900 px-6 pt-6 lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs text-silver transition-colors hover:text-gold"
          >
            <ChevronLeft size={14} />
            Blog
          </Link>
        </div>

        {/* ─── Content Area ─── */}
        <div id="blog-article" className="bg-ink-900 px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex gap-12">
              {/* Article Content */}
              <article className="min-w-0 max-w-3xl flex-1 space-y-5">
                {processedBlocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} index={i} />
                ))}

                {/* Gallery */}
                <PostGallery
                  images={post.gallery}
                  galleryLabel={galleryLabel}
                />

                {/* Divider */}
                <div className="!mt-12 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-silver/30">
                    SIM
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                </div>

                {/* Mobile share */}
                <div className="!mt-6 flex justify-center md:hidden">
                  <ShareButton title={title} label={shareLabel} />
                </div>

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                  <section className="!mt-10" aria-labelledby="faq-heading">
                    <h2
                      id="faq-heading"
                      className="mb-6 font-heading text-xl font-bold tracking-tight text-cream md:text-2xl"
                    >
                      {locale === 'tr'
                        ? 'Sıkça Sorulan Sorular'
                        : locale === 'ru'
                          ? 'Часто задаваемые вопросы'
                          : locale === 'ar'
                            ? 'الأسئلة الشائعة'
                            : 'Frequently Asked Questions'}
                    </h2>
                    <dl className="space-y-5">
                      {post.faq.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-white/[0.06] bg-ink-800/50 px-6 py-5"
                        >
                          <dt className="text-sm font-semibold leading-snug text-cream">
                            {item.q[locale] || item.q.tr}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-silver/80">
                            {item.a[locale] || item.a.tr}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}

                {/* CTA */}
                <div className="!mt-10 overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-ink-800 via-ink-800 to-ink-700/30">
                  <div className="relative p-8 md:p-10">
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold/[0.03]" />
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold/[0.03]" />
                    <div className="relative">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
                        SIM Baskı Malzemeleri
                      </p>
                      <h3 className="font-heading text-xl font-bold text-cream md:text-2xl">
                        {tCta('title')}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-silver/70">
                        {tCta('subtitle')}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                          href="/iletisim"
                          className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-gold/30"
                        >
                          {tCta('quote')}
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                        <a
                          href={`tel:${tFooter('phone')}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-7 py-3 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:border-gold/20 hover:text-gold"
                        >
                          {tCta('call')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar — Table of Contents */}
              <aside className="hidden w-52 flex-shrink-0 xl:block">
                <TableOfContents headings={headings} tocLabel={tocLabel} />
              </aside>
            </div>
          </div>
        </div>

        {/* ─── Related Posts ─── */}
        {related.length > 0 && (
          <section className="border-t border-white/[0.04] bg-ink-800/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
                    Blog
                  </p>
                  <h2 className="font-heading text-2xl font-bold text-cream md:text-3xl">
                    {relatedLabel}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="group hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light sm:inline-flex"
                >
                  {tBlog('viewAll')}
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={{
                      pathname: '/blog/[slug]',
                      params: { slug: getBlogSlug(rp, locale) },
                    }}
                    className="group overflow-hidden rounded-2xl border border-white/[0.04] bg-ink-900/80 transition-all duration-300 hover:border-gold/15 hover:shadow-xl hover:shadow-black/20"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.title[locale] || rp.title.tr}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL(rp.image)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-[11px] text-gold/70">
                        <Calendar size={11} />
                        {new Date(rp.date).toLocaleDateString(
                          locale === 'tr' ? 'tr-TR' : locale,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                        <span className="text-silver/30">&middot;</span>
                        <span className="text-silver/50">
                          {rp.readTime[locale] || rp.readTime.tr}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-semibold leading-snug text-cream line-clamp-2 md:text-lg">
                        {rp.title[locale] || rp.title.tr}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-silver/60 line-clamp-2">
                        {rp.excerpt[locale] || rp.excerpt.tr}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold/70 transition-colors group-hover:text-gold">
                        {tBlog('readMore')}
                        <ArrowRight
                          size={11}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile link to all */}
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold"
                >
                  {tBlog('viewAll')}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </main>
  );
}
