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
  await expect(page.locator('.tool-header h1')).toHaveText('Token generator');
  const token = page.getByPlaceholder('The token...');
  await expect(token).toHaveValue(/^.{64}$/u);
  const initialToken = await token.inputValue();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await expect(token).not.toHaveValue(initialToken);
});
