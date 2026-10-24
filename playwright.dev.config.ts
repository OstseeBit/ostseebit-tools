import { defineConfig } from '@playwright/test';
import base from './playwright.config.ts';

export default defineConfig({
  ...base,
  outputDir: './test-results/development',
  // This suite starts a cold Vite dev server (--force) and compiles every route on first request, so
  // the first attempt of a test occasionally runs into a slow compile on a busy CI runner (seen once
  // as an empty page on a Windows runner). The retries stay: a test that fails on every attempt still
  // fails the run. Only "passed on retry" is no longer treated as a failure here; the production
  // suite in playwright.config.ts stays strict.
  failOnFlakyTests: false,
  use: { ...base.use, baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'corepack pnpm dev --host 127.0.0.1 --port 5173 --strictPort --force',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
