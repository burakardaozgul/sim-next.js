import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('robots.txt', () => {
  const rules = robots().rules;
  const list = Array.isArray(rules) ? rules : [rules];
  const general = list.find((r) => r.userAgent === '*');

  it('does not block /_next/ for the general crawler group (Googlebot needs JS, CSS and /_next/image)', () => {
    const disallow = ([] as string[]).concat(general?.disallow ?? []);
    expect(disallow).not.toContain('/_next/');
  });

  it('still blocks /api/ for the general crawler group', () => {
    const disallow = ([] as string[]).concat(general?.disallow ?? []);
    expect(disallow).toContain('/api/');
  });
});
