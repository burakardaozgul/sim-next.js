import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';

const BASE_URL = 'https://www.simlimited.net';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface PageDef {
  trPath: string;
  enPath: string;
  ruPath: string;
  arPath: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

const staticPages: PageDef[] = [
  { trPath: '', enPath: '/en', ruPath: '/ru', arPath: '/ar', changeFrequency: 'weekly', priority: 1.0 },
  { trPath: '/urunler', enPath: '/en/products', ruPath: '/ru/produkty', arPath: '/ar/products', changeFrequency: 'weekly', priority: 0.9 },
  { trPath: '/ozel-renk-uretimi', enPath: '/en/custom-color-production', ruPath: '/ru/proizvodstvo-tsvetov', arPath: '/ar/custom-color-production', changeFrequency: 'monthly', priority: 0.8 },
  { trPath: '/temsilcilikler', enPath: '/en/brands', ruPath: '/ru/brendy', arPath: '/ar/brands', changeFrequency: 'monthly', priority: 0.7 },
  { trPath: '/hakkimizda', enPath: '/en/about', ruPath: '/ru/o-nas', arPath: '/ar/about', changeFrequency: 'monthly', priority: 0.6 },
  { trPath: '/iletisim', enPath: '/en/contact', ruPath: '/ru/kontakty', arPath: '/ar/contact', changeFrequency: 'monthly', priority: 0.6 },
  { trPath: '/blog', enPath: '/en/blog', ruPath: '/ru/blog', arPath: '/ar/blog', changeFrequency: 'weekly', priority: 0.7 },
  { trPath: '/sss', enPath: '/en/faq', ruPath: '/ru/voprosy', arPath: '/ar/faq', changeFrequency: 'monthly', priority: 0.5 },
  { trPath: '/gizlilik-politikasi', enPath: '/en/privacy-policy', ruPath: '/ru/politika-konfidentsialnosti', arPath: '/ar/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { trPath: '/kullanim-kosullari', enPath: '/en/terms-of-use', ruPath: '/ru/usloviya-ispolzovaniya', arPath: '/ar/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages with alternates
  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}${page.trPath}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          tr: `${BASE_URL}${page.trPath}`,
          en: `${BASE_URL}${page.enPath}`,
          ru: `${BASE_URL}${page.ruPath}`,
          ar: `${BASE_URL}${page.arPath}`,
        },
      },
    });
  }

  // Product detail pages
  for (const product of products) {
    const slug = product.slug;
    entries.push({
      url: `${BASE_URL}/urunler/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${BASE_URL}/urunler/${slug}`,
          en: `${BASE_URL}/en/products/${slug}`,
          ru: `${BASE_URL}/ru/produkty/${slug}`,
          ar: `${BASE_URL}/ar/products/${slug}`,
        },
      },
    });
  }

  // Blog post pages
  for (const post of blogPosts) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${BASE_URL}/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
          ru: `${BASE_URL}/ru/blog/${post.slug}`,
          ar: `${BASE_URL}/ar/blog/${post.slug}`,
        },
      },
    });
  }

  return entries;
}
