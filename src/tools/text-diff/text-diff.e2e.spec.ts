import { expect, test } from '@playwright/test';

test('computes text differences in a background worker', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('console', (message) => {
    if (message.text().includes('Could not create web worker')) {
      failures.push(message.text());
    }
  });
  const workerPromise = page.waitForEvent('worker', worker => worker.url().includes('editor.worker'));
  await page.goto('/text-diff');
  const worker = await workerPromise;
  expect(worker.url()).toContain('editor.worker');
  await expect(page.locator('.monaco-diff-editor')).toBeVisible();
  await expect(page.locator('.char-insert').first()).toBeVisible();
  expect(failures).toEqual([]);
});
