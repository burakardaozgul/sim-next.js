import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

const BLOG_SLUGS = [
  'ofset-murekkep-secimi',
  'metalik-murekkep-uretimi',
  'ozel-renk-eslestirme',
];

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title,
    description: `SIM Baskı Malzemeleri blog - ${title}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="font-display text-4xl font-bold">Blog: {slug}</h1>
    </main>
  );
}
