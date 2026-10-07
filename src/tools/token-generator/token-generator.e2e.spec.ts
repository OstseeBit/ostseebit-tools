import { expect, test } from '@playwright/test';

test.describe('Tool - Token generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/token-generator');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Token-Generator - OstseeBit Tools');
  });

  test('New token on refresh', async ({ page }) => {
    const initialToken = await page.getByPlaceholder('Der Token ...').inputValue();
    await page.getByRole('button', { name: 'Aktualisieren' }).click();
    const newToken = await page.getByPlaceholder('Der Token ...').inputValue();

    expect(newToken).not.toEqual(initialToken);
  });
});
