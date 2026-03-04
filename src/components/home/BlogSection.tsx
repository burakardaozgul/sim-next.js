'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react';

const BLOG_POSTS = [
  {
    slug: 'ofset-murekkep-secimi',
    category: { tr: 'Rehber', en: 'Guide', ru: 'Руководство', ar: 'دليل' },
    image: 'https://www.simlimited.net/wp-content/uploads/2022/05/DSC07958.jpg',
    date: '2025-02-15',
    title: {
      tr: 'Ofset Mürekkep Seçimi: Dikkat Edilmesi Gerekenler',
      en: 'Choosing Offset Inks: Key Considerations',
      ru: 'Выбор офсетных красок: ключевые аспекты',
      ar: 'اختيار أحبار الأوفست: اعتبارات رئيسية',
    },
    excerpt: {
      tr: 'Baskı kalitesini doğrudan etkileyen mürekkep seçiminde dikkat edilmesi gereken kritik faktörler ve uzman önerileri.',
      en: 'Critical factors and expert recommendations for ink selection that directly affects print quality.',
      ru: 'Критические факторы и рекомендации экспертов по выбору красок, влияющих на качество печати.',
      ar: 'عوامل حاسمة وتوصيات الخبراء لاختيار الحبر الذي يؤثر مباشرة على جودة الطباعة.',
    },
  },
  {
    slug: 'metalik-murekkep-uretimi',
    category: { tr: 'Teknik', en: 'Technical', ru: 'Техническая', ar: 'تقني' },
    image: 'https://www.simlimited.net/wp-content/uploads/2022/09/NEW-Gold-Aile.jpg',
    date: '2025-01-20',
    title: {
      tr: 'Metalik Mürekkep Üretim Süreci ve Kalite Kontrol',
      en: 'Metallic Ink Production Process and Quality Control',
      ru: 'Процесс производства металлических красок и контроль качества',
      ar: 'عملية إنتاج الأحبار المعدنية ومراقبة الجودة',
    },
    excerpt: {
      tr: 'Yaldız mürekkep üretiminde kullanılan teknolojiler, kalite kontrol süreçleri ve sektördeki son gelişmeler.',
      en: 'Technologies used in metallic ink production, quality control processes, and latest industry developments.',
      ru: 'Технологии производства металлических красок, процессы контроля качества и последние отраслевые разработки.',
      ar: 'التقنيات المستخدمة في إنتاج الأحبار المعدنية وعمليات مراقبة الجودة وآخر التطورات في الصناعة.',
    },
  },
  {
    slug: 'ozel-renk-eslestirme',
    category: { tr: 'Üretim', en: 'Production', ru: 'Производство', ar: 'إنتاج' },
    image: 'https://www.simlimited.net/wp-content/uploads/2022/05/DSC08151.jpg',
    date: '2024-12-10',
    title: {
      tr: 'Özel Renk Eşleştirme: LAB Değerleri ile Mükemmel Sonuç',
      en: 'Custom Color Matching: Perfect Results with LAB Values',
      ru: 'Подбор специальных цветов: идеальные результаты с LAB-значениями',
      ar: 'مطابقة الألوان المخصصة: نتائج مثالية بقيم LAB',
    },
    excerpt: {
      tr: 'Dijital LAB değerleri kullanarak özel renk üretiminde nasıl mükemmel sonuçlar elde edilir? Uzman rehberi.',
      en: 'How to achieve perfect results in custom color production using digital LAB values? Expert guide.',
      ru: 'Как добиться идеальных результатов в производстве специальных цветов с использованием цифровых значений LAB?',
      ar: 'كيف تحقق نتائج مثالية في إنتاج الألوان المخصصة باستخدام قيم LAB الرقمية؟',
    },
  },
];

export default function BlogSection() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="border-t border-white/[0.06] bg-ink-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('title')}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
              {t('subtitle')}
            </h2>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver transition-all hover:border-gold/30 hover:text-gold"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver transition-all hover:border-gold/30 hover:text-gold"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Blog Cards Slider */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-6 flex gap-6 overflow-x-auto px-6 snap-x snap-mandatory lg:-mx-0 lg:px-0"
        >
          {BLOG_POSTS.map((post) => {
            const title = post.title[locale as keyof typeof post.title] || post.title.tr;
            const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.tr;
            const category = post.category[locale as keyof typeof post.category] || post.category.tr;

            return (
              <article
                key={post.slug}
                className="group flex-shrink-0 snap-start"
                style={{ width: 'calc(33.333% - 16px)', minWidth: '300px' }}
              >
                <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900 transition-all duration-300 hover:border-gold/20">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                      {category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-1.5 text-xs text-silver/60">
                      <Clock size={12} />
                      <time>{new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar-SA' : locale === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h3 className="mb-2 text-base font-semibold leading-snug text-cream transition-colors group-hover:text-gold">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-silver/70">
                      {excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      {t('readMore')}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            {t('viewAll')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
