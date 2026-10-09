import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import proxy from '@/proxy';

describe('default-locale prefix redirects', () => {
  it('redirects /tr/<path> to the unprefixed URL with a permanent 308', () => {
    const res = proxy(new NextRequest('https://www.simlimited.net/tr/urunler'));
    expect(res.status).toBe(308);
    expect(new URL(res.headers.get('location')!).pathname).toBe('/urunler');
  });

  it('redirects bare /tr to / with a permanent 308', () => {
    const res = proxy(new NextRequest('https://www.simlimited.net/tr'));
    expect(res.status).toBe(308);
    expect(new URL(res.headers.get('location')!).pathname).toBe('/');
  });
});

describe('home page locale-preference redirect', () => {
  it('redirects a user with a stored non-default preference and marks the response as cookie-dependent (Vary: Cookie)', () => {
    const res = proxy(
      new NextRequest('https://www.simlimited.net/', {
        headers: { cookie: 'USER_LOCALE_PREFERENCE=en' },
      }),
    );
    expect(res.status).toBe(302);
    expect(new URL(res.headers.get('location')!).pathname).toBe('/en');
    expect(res.headers.get('vary') ?? '').toMatch(/cookie/i);
    expect(res.headers.get('cache-control') ?? '').toMatch(/no-store/);
  });

  it('serves the home page normally (no redirect) when no preference cookie is present', () => {
    const res = proxy(new NextRequest('https://www.simlimited.net/'));
    expect(res.status).toBe(200);
  });
});
