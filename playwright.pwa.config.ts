import { defineConfig } from '@playwright/test';
import base from './playwright.config.ts';

export default defineConfig({
  ...base,
  testIgnore: [],
  testMatch: '**/pwa.e2e.spec.ts',
  outputDir: './test-results/pwa',
  projects: base.projects?.filter(project => project.name === 'chromium'),
  use: { ...base.use, serviceWorkers: 'allow' },
});
