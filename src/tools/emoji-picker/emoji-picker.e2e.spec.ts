import { expect, test } from '@playwright/test';

test('loads more emojis and searches the complete collection', async ({ page }) => {
  await page.goto('/emoji-picker');
  const more = page.getByRole('button', { name: /^Show more/ }).first();
  const before = await more.textContent();
  await more.click();
  await expect(more).not.toHaveText(before!);
  await page.getByPlaceholder('Search emojis (e.g. \'smile\')...').fill('grinning face');
  await expect(page.getByText('Search result', { exact: true })).toBeVisible();
  await expect(page.getByText('Grinning face', { exact: true })).toBeVisible();
});
