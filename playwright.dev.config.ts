import { defineConfig } from '@playwright/test';
import base from './playwright.config.ts';

export default defineConfig({
  ...base,
  outputDir: './test-results/development',
  use: { ...base.use, baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'corepack pnpm dev --host 127.0.0.1 --port 5173 --strictPort --force',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
