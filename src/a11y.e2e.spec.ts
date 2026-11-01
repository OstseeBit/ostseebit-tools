import { expect, test } from '@playwright/test';
import { openAndSettle, violationsOf } from './a11y.helpers';

const pages = [
  '/',
  '/?category=sec',
  '/about',
  '/diese-seite-gibt-es-nicht',
  '/token-generator',
  '/hash-text',
  '/base64-string-converter',
  '/http-status-codes',
  '/ipv4-subnet-calculator',
  // eine Auswahl weiterer Werkzeuge mit unterschiedlichen Bausteinen (Schalter, Schieber, Tabellen, Editoren)
  '/lorem-ipsum-generator',
  '/list-converter',
  '/crontab-generator',
  '/json-diff',
  '/text-diff',
  '/jwt-parser',
  '/qrcode-generator',
  '/regex-tester',
  '/uuid-generator',
  '/color-converter',
  '/html-wysiwyg-editor',
  '/otp-generator',
];

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`Barrierefreiheit (axe), ${colorScheme}`, () => {
    test.use({ colorScheme });

    for (const path of pages) {
      test(`${path} hat keine Verstöße`, async ({ page }) => {
        await openAndSettle(page, path);
        expect(await violationsOf(page)).toEqual([]);
      });
    }

    test('die geöffnete Suche hat keine Verstöße', async ({ page }) => {
      await openAndSettle(page, '/');
      await page.keyboard.press('Control+k');
      await page.getByPlaceholder(/Tippen, um ein Tool/).fill('hash');
      await expect(page.getByRole('option').first()).toBeVisible();
      expect(await violationsOf(page)).toEqual([]);
    });

    test('die Favoriten-Sortierung hat keine Verstöße', async ({ page }) => {
      await openAndSettle(page, '/');
      for (const name of ['Token-Generator', 'Text hashen']) {
        await page.locator('.tile', { hasText: name }).getByRole('button', { name: 'Zu Favoriten hinzufügen' }).click();
      }
      await page.getByRole('button', { name: 'Reihenfolge ändern' }).click();
      await expect(page.getByRole('button', { name: 'Text hashen nach vorn' })).toBeVisible();
      expect(await violationsOf(page)).toEqual([]);
    });

    test('das offene Flyout hat keine Verstöße', async ({ page }) => {
      await openAndSettle(page, '/');
      const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
      await nav.getByRole('button', { name: 'Sicherheit & Krypto: Werkzeuge anzeigen' }).click();
      await expect(nav.getByRole('region')).toBeVisible();
      expect(await violationsOf(page)).toEqual([]);
    });
  });
}

test('die Handy-Ansicht hat keine Verstöße', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await openAndSettle(page, '/');
  expect(await violationsOf(page)).toEqual([]);
});
