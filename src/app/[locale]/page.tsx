import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createPageMetadata } from '@/lib/seo';
import VerticalNav from '@/components/layout/VerticalNav';
import HeroSlider from '@/components/home/HeroSlider';
import ProductsSection from '@/components/home/ProductsSection';
import FadeInSection from '@/components/ui/FadeInSection';
import { blogPosts, toBlogSummary } from '@/data/blog';

const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'));
const AboutSection = dynamic(() => import('@/components/home/AboutSection'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const BlogSection = dynamic(() => import('@/components/home/BlogSection'));
const BrandsSection = dynamic(() => import('@/components/home/BrandsSection'));
const CTABanner = dynamic(() => import('@/components/home/CTABanner'));
const Footer = dynamic(() => import('@/components/layout/Footer'));
const ScrollToTop = dynamic(() => import('@/components/layout/ScrollToTop'));

const seoData: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'SIM Baskı Malzemeleri | Ofset Mürekkep & Matbaa Malzemeleri',
    description:
      'Türkiye\'nin lider matbaa tedarikçisi. Ofset, metalik, UV, PANTONE mürekkep, özel renk üretimi, offset blanket ve dispersiyon lak. 1983\'ten beri sektörde.',
  },
  en: {
    title: 'SIM Printing Supplies | Offset Ink & Printing Materials',
    description:
      'Turkey\'s leading printing materials supplier. Offset, metallic, UV, PANTONE ink, custom color production, blankets and varnish. Since 1983.',
  },
  ru: {
    title: 'SIM Печатные Материалы | Офсетные Краски и Полиграфия',
    description:
      'Ведущий поставщик полиграфических материалов в Турции. Офсетные, металлические, УФ-краски, производство спеццветов. С 1983 года.',
  },
  ar: {
    title: 'SIM مستلزمات الطباعة | أحبار الأوفست ومواد الطباعة',
    description:
      'المورد الرائد لمواد الطباعة في تركيا. أحبار أوفست، معدنية، UV، إنتاج ألوان مخصصة وكيماويات الطباعة. منذ 1983.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const data = seoData[locale] || seoData.tr;

  return createPageMetadata({
    locale,
    path: '/',
    title: data.title,
    description: data.description,
    absoluteTitle: true,
    keywords: [
      'ofset mürekkep',
      'metalik yaldız mürekkep',
      'UV mürekkep',
      'PANTONE mürekkep',
      'özel renk üretimi',
      'offset blanket',
      'dispersiyon lak',
      'baskı kimyasalları',
      'matbaa mürekkebi',
      'matbaa malzemeleri istanbul',
      'baskı malzemeleri tedarikçisi',
      'SAKATA INX Türkiye',
      'EVA COLOR',
    ],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <main className="flex min-h-screen">
      {/* Vertical Navigation */}
      <VerticalNav />

      {/* Main Content - offset by nav width on desktop */}
      <div className="w-full overflow-x-hidden lg:ml-[260px]">
        <HeroSlider heading={t('seoH1')} />
        <FadeInSection>
          <ProductsSection />
        </FadeInSection>
        <FadeInSection>
          <ProcessSection />
        </FadeInSection>
        <FadeInSection>
          <AboutSection />
        </FadeInSection>
        <FadeInSection>
          <ServicesSection />
        </FadeInSection>
        <FadeInSection>
          <BlogSection posts={blogPosts.slice(0, 3).map(toBlogSummary)} />
        </FadeInSection>
        <FadeInSection>
          <BrandsSection />
        </FadeInSection>
        <FadeInSection>
          <CTABanner />
        </FadeInSection>
        <Footer />
      </div>
      <ScrollToTop />
    </main>
  );
}
