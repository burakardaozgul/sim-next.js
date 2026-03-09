import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createPageMetadata } from '@/lib/seo';
import VerticalNav from '@/components/layout/VerticalNav';
import HeroSlider from '@/components/home/HeroSlider';
import ProductsSection from '@/components/home/ProductsSection';
import FadeInSection from '@/components/ui/FadeInSection';

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
    title: 'SIM Baskı Malzemeleri | Matbaa Malzemeleri, Ofset Mürekkep & Baskı Kimyasalları',
    description:
      'SIM Baskı Malzemeleri - Türkiye\'nin lider matbaa malzemeleri tedarikçisi. Ofset mürekkep, metalik yaldız mürekkep, UV mürekkep, PANTONE mürekkep, özel renk üretimi, offset blanket ve dispersiyon lak. 1983\'ten beri baskı sektöründe.',
  },
  en: {
    title: 'SIM Printing Supplies | Offset Ink, Printing Materials & Chemicals',
    description:
      'SIM Printing Supplies - Turkey\'s leading printing materials supplier. Offset ink, metallic ink, UV ink, PANTONE ink, custom color production, offset blankets, and dispersion varnish. In the printing industry since 1983.',
  },
  ru: {
    title: 'SIM Печатные Материалы | Офсетные Краски и Полиграфические Материалы',
    description:
      'SIM Печатные Материалы - ведущий поставщик полиграфических материалов в Турции. Офсетные краски, металлические краски, УФ-краски, производство специальных цветов и полиграфическая химия.',
  },
  ar: {
    title: 'SIM مستلزمات الطباعة | أحبار الأوفست ومواد الطباعة',
    description:
      'SIM مستلزمات الطباعة - المورد الرائد لمواد الطباعة في تركيا. أحبار الأوفست، أحبار معدنية، أحبار UV، إنتاج ألوان مخصصة وكيماويات الطباعة.',
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

export default function HomePage() {
  return (
    <main className="flex min-h-screen">
      {/* Vertical Navigation */}
      <VerticalNav />

      {/* Main Content - offset by nav width on desktop */}
      <div className="w-full overflow-x-hidden lg:ml-[260px]">
        <HeroSlider />
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
          <BlogSection />
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
