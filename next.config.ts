import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  // SMTP ayarları yalnızca sunucu tarafında process.env ile okunur (build çıktısına gömülmez).
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
      // Yazım hatalı blog slug'ı (murakkep → mürekkep)
      {
        source: '/blog/flekso-baski-murakkepleri-rehberi',
        destination: '/blog/flekso-baski-murekkepleri-rehberi',
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
      // WordPress sistem URL'leri (/wp-admin, /wp-content, /wp-login.php …) artık
      // ana sayfaya yönlendirilmiyor: alakasız hedefe 308 Google için yumuşak 404 sayılır,
      // gerçek 404 doğru sinyaldir.
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
      // Statik render nedeniyle nonce kullanılamıyor; inline JSON-LD/GTM için 'unsafe-inline' zorunlu.
      // İzinli üçüncü taraflar: GTM/GA4, Cloudflare Turnstile, Google Maps embed.
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://challenges.cloudflare.com https://www.google.com https://www.gstatic.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://challenges.cloudflare.com",
          "frame-src https://www.google.com https://maps.google.com https://challenges.cloudflare.com https://www.googletagmanager.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
          'upgrade-insecure-requests',
        ].join('; '),
      },
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
    ];
  },
};

export default withNextIntl(nextConfig);
