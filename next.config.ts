import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      // WordPress portfolio-item → Ürün detay sayfaları
      {
        source: '/portfolio-item/eva-color-silver-metalik-murekkepler-yaldiz-murekkepler',
        destination: '/urunler/eva-color-silver-metalik-murekkepler',
        permanent: true,
      },
      {
        source: '/portfolio-item/cmyk-renkler',
        destination: '/urunler/sakata-inx-cmyk-murekkepler',
        permanent: true,
      },
      {
        source: '/portfolio-item/ozel-renkler',
        destination: '/urunler/ozel-renkler',
        permanent: true,
      },
      {
        source: '/portfolio-item/yaldiz-metalik-renkler',
        destination: '/urunler/eva-color-gold-metalik-murekkepler',
        permanent: true,
      },
      {
        source: '/portfolio-item/floresan-fluorescent-renkler',
        destination: '/urunler/eva-color-fluorescent-murekkepler',
        permanent: true,
      },
      // WordPress portfolio-category → İlgili ürün sayfaları
      {
        source: '/portfolio-category/su-bazli-laklar',
        destination: '/urunler/hi-tech-coatings-dispersiyon-lak',
        permanent: true,
      },
      {
        source: '/portfolio-category/offset-blanketleri',
        destination: '/urunler/vector-baski-blanketleri',
        permanent: true,
      },
      {
        source: '/portfolio-category/hi-tech',
        destination: '/urunler/hi-tech-coatings-dispersiyon-lak',
        permanent: true,
      },
      // WordPress portfolio-tag → İlgili ürün sayfaları
      {
        source: '/portfolio-tag/yaldiz-renkler',
        destination: '/urunler/eva-color-gold-metalik-murekkepler',
        permanent: true,
      },
      {
        source: '/portfolio-tag/cmyk-renkler',
        destination: '/urunler/sakata-inx-cmyk-murekkepler',
        permanent: true,
      },
      {
        source: '/portfolio-tag/ofset-murekkepleri',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/portfolio-tag/ozel-renk-uretimi',
        destination: '/ozel-renk-uretimi',
        permanent: true,
      },
      {
        source: '/portfolio-tag/zeller-gmelin',
        destination: '/urunler/zeller-gmelin-uv-offset-murekkepleri',
        permanent: true,
      },
      // Eski sayfa URL'leri
      {
        source: '/urunlerimiz',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/gallery-four-columns-wide',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/tds-fluorescent-inks/:path*',
        destination: '/urunler/eva-color-fluorescent-murekkepler',
        permanent: true,
      },
      // Eşleşmeyen portfolio URL'leri için genel yönlendirme
      {
        source: '/portfolio-item/:slug',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/portfolio-category/:slug',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/portfolio-tag/:slug',
        destination: '/urunler',
        permanent: true,
      },
      // WordPress sistem URL'leri
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-register.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
