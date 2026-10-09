import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Amplify Hosting, konsoldaki ortam değişkenlerini yalnızca build aşamasına verir.
// SSR çalışma zamanında (iletişim formu: SMTP + Turnstile doğrulaması) okunabilmeleri için
// build komutları içinde .env.production dosyasına yazılmaları gerekir
// (https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html).
const amplify = readFileSync(join(__dirname, '..', '..', 'amplify.yml'), 'utf8');
const buildCommands = amplify.slice(amplify.indexOf('build:'), amplify.indexOf('postBuild:'));

const RUNTIME_SERVER_VARS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'TURNSTILE_SECRET_KEY'];

describe('amplify.yml runtime env (SSR)', () => {
  it('writes server-side runtime variables to .env.production before the build', () => {
    expect(buildCommands).toContain('.env.production');
    const writeAt = buildCommands.indexOf('.env.production');
    const buildAt = buildCommands.indexOf('npm run build');
    expect(buildAt).toBeGreaterThan(-1);
    expect(writeAt).toBeGreaterThan(-1);
    expect(writeAt).toBeLessThan(buildAt);
  });

  it.each(RUNTIME_SERVER_VARS)('covers %s', (name) => {
    expect(buildCommands).toContain(name);
  });

  it('never exposes NEXT_PUBLIC_/secret values through next.config env inlining', () => {
    const nextConfig = readFileSync(join(__dirname, '..', '..', 'next.config.ts'), 'utf8');
    expect(nextConfig).not.toMatch(/^\s*env:\s*\{/m);
  });
});
