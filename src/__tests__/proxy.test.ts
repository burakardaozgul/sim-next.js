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
