import { expect, test } from '@playwright/test';

test('opens a precached tool offline and still generates tokens', async ({ page, context }) => {
  test.setTimeout(120000);
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.goto('/token-generator');
  await expect(page.locator('.tool-header h1')).toHaveText('Token-Generator');
  const token = page.getByPlaceholder('Der Token ...');
  await expect(token).toHaveValue(/^.{64}$/u);
  const initialToken = await token.inputValue();
  await page.getByRole('button', { name: 'Aktualisieren' }).click();
  await expect(token).not.toHaveValue(initialToken);
});

// Heavy, rarely used chunks (figlet fonts, Monaco and its worker, the MAC vendor database) are not part of
// the install-time precache; the service worker caches them on first use. This proves that works offline.
test('caches heavy tool chunks on first use and serves them offline afterwards', async ({ page, context }) => {
  test.setTimeout(180000);
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  // First visit, online: the chunks are fetched and stored by the runtime cache.
  await page.goto('/ascii-text-drawer');
  await expect(page.getByTestId('area-content')).toContainText('_');
  await page.goto('/text-diff');
  await expect(page.locator('.monaco-diff-editor')).toBeVisible();

  const cachedUrls = () => page.evaluate(async () => {
    const cache = await caches.open('heavy-tool-assets');
    return (await cache.keys()).map(request => new URL(request.url).pathname);
  });
  await expect.poll(async () => (await cachedUrls()).some(url => url.includes('/figlet-fonts/'))).toBe(true);
  await expect.poll(async () => (await cachedUrls()).some(url => url.includes('/c-diff-editor-'))).toBe(true);
  await expect.poll(async () => (await cachedUrls()).some(url => url.includes('/editor.worker-'))).toBe(true);

  // Second visit, offline: everything comes from the caches.
  await context.setOffline(true);
  await page.goto('/ascii-text-drawer');
  await expect(page.getByTestId('area-content')).toContainText('_');
  await page.goto('/text-diff');
  await expect(page.locator('.monaco-diff-editor')).toBeVisible();
});
