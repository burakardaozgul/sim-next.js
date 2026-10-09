import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('i18n routing config', () => {
  it('disables next-intl alternate Link headers (HTML hreflang with localized slugs is the single source)', () => {
    expect(routing.alternateLinks).toBe(false);
  });

  it('does not set a locale cookie on every response (keeps HTML cacheable at the CDN)', () => {
    expect(routing.localeCookie).toBe(false);
  });
});
