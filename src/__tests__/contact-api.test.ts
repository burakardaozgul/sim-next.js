import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const sendMail = vi.fn();
vi.mock('nodemailer', () => ({ default: { createTransport: () => ({ sendMail }) } }));

const { POST } = await import('@/app/api/contact/route');

function req(body: Record<string, unknown>, ip = '203.0.113.' + Math.floor(Math.random() * 250)) {
  return new Request('https://www.simlimited.net/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}
const valid = { name: 'Test Kullanıcı', email: 'test@example.com', message: 'Merhaba, teklif istiyorum.', consent: true };

describe('contact API hardening', () => {
  beforeEach(() => {
    sendMail.mockReset();
    process.env.SMTP_HOST = 'smtp.test';
    process.env.SMTP_USER = 'u';
    process.env.SMTP_PASS = 'p';
    delete process.env.TURNSTILE_SECRET_KEY;
  });
  afterEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it('rejects submissions without KVKK consent', async () => {
    const res = await POST(req({ ...valid, consent: false }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('accepts a valid consented submission', async () => {
    sendMail.mockResolvedValue({});
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('requires a Turnstile token when the secret is configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    const res = await POST(req(valid));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('never leaks internal error details to the client', async () => {
    sendMail.mockRejectedValue(new Error('SMTP connection refused at 10.0.0.1'));
    const res = await POST(req(valid));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(JSON.stringify(json)).not.toContain('10.0.0.1');
    expect(json).not.toHaveProperty('debug');
  });

  it('keeps the honeypot behaviour (silent success)', async () => {
    const res = await POST(req({ ...valid, _honey: 'bot' }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

describe('secrets and transport configuration', () => {
  it('next.config.ts does not inline SMTP secrets into the client/build env', () => {
    const src = readFileSync(join(__dirname, '..', '..', 'next.config.ts'), 'utf8');
    expect(src).not.toMatch(/SMTP_PASS/);
  });
  it('the mail transport verifies TLS certificates', () => {
    const src = readFileSync(join(__dirname, '..', 'app', 'api', 'contact', 'route.ts'), 'utf8');
    expect(src).not.toMatch(/rejectUnauthorized:\s*false/);
  });
});
