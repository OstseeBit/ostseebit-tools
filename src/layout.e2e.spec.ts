import { expect, test } from '@playwright/test';

test.describe('Layout - sidebar and footer', () => {
  test('the sidebar is open and every category is collapsed on the start page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await expect(nav).toBeVisible();
    // The category headers are visible, their tools are not.
    await expect(nav.getByText('Krypto', { exact: true })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeHidden();
    await expect(nav.getByRole('link', { name: 'Datum-Uhrzeit-Konverter' })).toBeHidden();
  });

  test('opening a tool expands only the category that contains it', async ({ page }) => {
    await page.goto('/token-generator');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Datum-Uhrzeit-Konverter' })).toBeHidden();
  });

  test('a category can be opened by clicking its header', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await nav.getByText('Krypto', { exact: true }).click();
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeVisible();
  });

  test('the footer shows the version as date and links "Über" in the theme colour', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('.footer');
    await expect(footer.getByTestId('build-version')).toHaveText(/^Version \d{4}-\d{2}-\d{2}/);
    await expect(footer).not.toContainText('v0.1.0');

    const color = (name: string) => footer.getByRole('link', { name, exact: true }).evaluate(element => getComputedStyle(element).color);
    expect(await color('Über')).toBe(await color('OstseeBit'));
  });
});
