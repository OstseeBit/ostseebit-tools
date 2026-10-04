import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

const toolsDirectory = fileURLToPath(new URL('./tools/', import.meta.url));
const routes = readdirSync(toolsDirectory, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map((entry) => {
    const source = readFileSync(`${toolsDirectory}/${entry.name}/index.ts`, 'utf8');
    const path = source.match(/path: '(\/[^']+)'/u)?.[1];
    if (!path) {
      throw new Error(`Missing smoke-test route for ${entry.name}`);
    }
    return path;
  });

if (routes.length < 86 || new Set(routes).size !== routes.length) {
  throw new Error('Tool route coverage is incomplete or duplicated');
}

for (const route of ['/', '/about', ...routes]) {
  test(`loads ${route} without runtime errors`, async ({ page }) => {
    test.setTimeout(120000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator('#app')).not.toBeEmpty({ timeout: 30000 });
    if (route !== '/' && route !== '/about') {
      await expect(page.locator('.tool-header h1')).toBeVisible({ timeout: 30000 });
      await expect(page.locator('.tool-content > *').first()).toBeVisible({ timeout: 30000 });
    }
    // Readiness is the rendered application; background PWA caching may stay active.
    await expect(page.locator('vite-error-overlay')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
