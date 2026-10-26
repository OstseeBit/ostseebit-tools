import { expect, test } from '@playwright/test';

test.describe('Startseite - Filter, Schnellzugriff und Kacheln', () => {
  test('lists the tools in one section per category', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Werkzeuge' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(9);
    await expect(page.getByRole('heading', { level: 2, name: 'Sicherheit & Krypto' })).toBeVisible();
    await expect(page.locator('.tile', { hasText: 'Token-Generator' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Alle/ })).toHaveAttribute('aria-pressed', 'true');
  });

  test('the category filter narrows the list and is kept in the address', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('filter-sec').click();
    await expect(page).toHaveURL(/\?category=sec$/);
    await expect(page.getByTestId('filter-sec')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(1);
    await expect(page.locator('.tile', { hasText: 'Token-Generator' })).toBeVisible();
    await expect(page.locator('.tile', { hasText: 'Datum-Uhrzeit-Konverter' })).toHaveCount(0);

    await page.getByRole('button', { name: /^Alle/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(9);
  });

  test('a filter link opens the filtered overview directly', async ({ page }) => {
    await page.goto('/?category=ops');
    await expect(page.getByTestId('filter-ops')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: 'Admin & DevOps' })).toBeVisible();
  });

  test('the whole tile opens the tool', async ({ page }) => {
    await page.goto('/');
    await page.locator('.tile', { hasText: 'Token-Generator' }).click({ position: { x: 20, y: 20 } });
    await expect(page).toHaveURL(/\/token-generator$/);
  });

  test('a favourite appears in the quick access row and in the rail', async ({ page }) => {
    await page.goto('/');
    const tile = page.locator('.tile', { hasText: 'Token-Generator' });
    await tile.getByRole('button', { name: 'Zu Favoriten hinzufügen' }).click();
    await expect(tile.getByRole('button', { name: 'Aus Favoriten entfernen' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.quick').getByRole('link', { name: 'Token-Generator' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Werkzeuge' }).getByRole('link', { name: 'Token-Generator' })).toBeVisible();

    await tile.getByRole('button', { name: 'Aus Favoriten entfernen' }).click();
    await expect(page.locator('.quick')).toHaveCount(0);
  });

  test('the flyout can open the filtered overview and closes itself', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await nav.getByRole('button', { name: 'Admin & DevOps: Werkzeuge anzeigen' }).click();
    await nav.getByRole('link', { name: 'Alle in der Übersicht zeigen' }).click();
    await expect(page).toHaveURL(/\?category=ops$/);
    await expect(nav.getByRole('region')).toHaveCount(0);
  });
});
