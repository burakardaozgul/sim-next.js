import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      // next-intl's middleware imports 'next/server' without an extension; Node ESM needs the .js file
      { find: /^next\/server$/, replacement: 'next/server.js' },
    ],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
    // Inline next-intl so the alias above applies to its own 'next/server' import
    server: { deps: { inline: ['next-intl'] } },
  },
});
