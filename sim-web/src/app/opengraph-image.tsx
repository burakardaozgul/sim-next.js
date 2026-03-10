import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SIM Baskı Malzemeleri - Matbaa Malzemeleri & Ofset Mürekkep';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f14 0%, #141c24 50%, #0a0f14 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #c4922a, transparent)',
          }}
        />

        {/* Company name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#f5f0e8',
            letterSpacing: '-1px',
            marginBottom: '8px',
          }}
        >
          SIM
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#c4922a',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          Baskı Malzemeleri
        </div>

        {/* Divider */}
        <div
          style={{
            width: '80px',
            height: '2px',
            background: '#c4922a',
            marginBottom: '40px',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#9ba8b4',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.6,
          }}
        >
          Matbaa Malzemeleri & Ofset Mürekkep Tedarikçisi
        </div>

        {/* Bottom keywords */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '24px',
            fontSize: 14,
            color: '#9ba8b4',
            opacity: 0.6,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          <span>Ofset Mürekkep</span>
          <span style={{ color: '#c4922a' }}>|</span>
          <span>Metalik Yaldız</span>
          <span style={{ color: '#c4922a' }}>|</span>
          <span>UV Mürekkep</span>
          <span style={{ color: '#c4922a' }}>|</span>
          <span>Özel Renk Üretimi</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
