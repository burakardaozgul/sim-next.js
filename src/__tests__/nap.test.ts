import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ORGANIZATION } from '@/data/organization';

const locales = ['tr', 'en', 'ru', 'ar'];

describe('NAP consistency (name, address, phone) across visible text and schema', () => {
  it('every locale shows the schema postal code in the visible contact address', () => {
    for (const l of locales) {
      const m = JSON.parse(readFileSync(join(__dirname, '..', '..', 'messages', `${l}.json`), 'utf8'));
      expect(m.contact.address, l).toContain(ORGANIZATION.address.postalCode);
      expect(m.contact.address, l).not.toContain('34000');
    }
  });
  it('schema telephone is E.164', () => {
    expect(ORGANIZATION.telephone).toMatch(/^\+90\d{10}$/);
  });
});
