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

  test('favourites can be reordered with buttons instead of dragging', async ({ page }) => {
    await page.goto('/');
    for (const name of ['Token-Generator', 'Text hashen']) {
      await page.locator('.tile', { hasText: name }).getByRole('button', { name: 'Zu Favoriten hinzufügen' }).click();
    }
    const chips = page.locator('.quick .chips a');
    await expect(chips).toHaveText([/Token-Generator/, /Text hashen/]);

    await page.getByRole('button', { name: 'Reihenfolge ändern' }).click();
    await page.getByRole('button', { name: 'Text hashen nach vorn' }).click();
    await expect(chips).toHaveText([/Text hashen/, /Token-Generator/]);
    // Der Fokus bleibt beim verschobenen Eintrag, und die Position wird angesagt.
    await expect(page.getByRole('button', { name: 'Text hashen nach vorn' })).toBeDisabled();
    await expect(page.getByRole('status').filter({ hasText: 'Position 1 von 2' })).toBeVisible();

    await page.getByRole('button', { name: 'Fertig' }).click();
    await expect(page.getByRole('button', { name: 'Text hashen nach vorn' })).toHaveCount(0);
    // Die Reihenfolge gilt auch in der Icon-Leiste.
    await expect(page.getByRole('navigation', { name: 'Werkzeuge' }).locator('.favs a').first()).toHaveAttribute('aria-label', 'Text hashen');
  });

  test('the filter result is announced', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('filter-sec').click();
    await expect(page.getByRole('status').filter({ hasText: 'Sicherheit & Krypto: 12 Werkzeuge' })).toBeAttached();
  });

  test('the search says so when nothing matches', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.tile').first()).toBeVisible();
    await page.keyboard.press('Control+k');
    await page.getByPlaceholder(/Tippen, um ein Tool/).fill('zzzzqqqq');
    await expect(page.getByRole('status').filter({ hasText: 'Keine Treffer gefunden' })).toBeVisible();
  });

  test('a tool that cannot be loaded shows a message instead of an empty page', async ({ page }) => {
    // Simuliert eine neue Version oder fehlende Verbindung: die Datei des Werkzeugs lässt sich nicht laden.
    await page.route(/token-generator(\.vue|-[\w-]+\.js)/, route => route.abort());
    await page.goto('/');
    await expect(page.locator('.tile').first()).toBeVisible();
    await page.locator('.tile', { hasText: 'Token-Generator' }).click({ position: { x: 20, y: 20 } });
    // Erst wird einmal neu geladen, danach erscheint die Meldung.
    await expect(page.getByText('Das Werkzeug konnte nicht geladen werden', { exact: false })).toBeVisible({ timeout: 30000 });
  });
});
