import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Automatische Prüfung mit axe-core gegen WCAG 2.x A/AA (inklusive Kontrast). Sie ersetzt keine Prüfung
// mit Tastatur und Screenreader, fängt aber grobe Mängel wie fehlende Beschriftungen und zu geringen
// Kontrast zuverlässig ab.
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// Axe misst Farben so, wie sie gerade gezeichnet werden. Mitten in einer Ein- oder Überblendung (zum Beispiel
// beim Öffnen der Suche) wären sie verfälscht. Darum: zwei Bilder abwarten, damit Vue-Übergänge wirklich
// gestartet sind, dann das Ende aller endlichen Animationen, und das nötigenfalls mehrmals.
async function waitForAnimations(page: Page) {
  await page.evaluate(async () => {
    const nextFrame = () => new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    for (let round = 0; round < 20; round++) {
      await nextFrame();
      await nextFrame();
      const running = document.getAnimations().filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity);
      if (running.length === 0) {
        return;
      }
      await Promise.allSettled(running.map(animation => animation.finished));
    }
  });
}

async function violationsOf(page: Page) {
  await waitForAnimations(page);
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  return results.violations.map(({ id, impact, nodes }) =>
    `${id} (${impact}): ${nodes.length}x, z. B. ${nodes[0].html.slice(0, 200)} ${nodes[0].any[0]?.message ?? ''}`,
  );
}

async function openAndSettle(page: Page, path: string) {
  await page.goto(path);
  if (path === '/' || path.startsWith('/?') || path === '/about' || path === '/diese-seite-gibt-es-nicht') {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 30000 });
  }
  else {
    await expect(page.locator('.tool-header h1')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('.tool-content > *').first()).toBeVisible({ timeout: 30000 });
  }
}

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
