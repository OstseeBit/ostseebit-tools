import { expect, test } from '@playwright/test';
import { openAndSettle, violationsOf } from './a11y.helpers';

// Axe über alle Werkzeuge (Grundzustand, ohne Eingaben), in einem Durchlauf je Farbschema.
// Der Test sammelt die Verstöße aller Werkzeuge, damit ein Lauf die ganze Liste zeigt.
for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`Barrierefreiheit (axe) aller Werkzeuge, ${colorScheme}`, () => {
    test.use({ colorScheme });

    test('kein Werkzeug hat im Grundzustand Verstöße', async ({ page }) => {
      test.setTimeout(900_000);
      await page.goto('/');
      await expect(page.locator('.tile').first()).toBeVisible({ timeout: 30000 });
      const paths = await page.locator('.tile-link').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
      expect(paths.length).toBeGreaterThan(50);

      const found: string[] = [];
      for (const path of paths) {
        await openAndSettle(page, path);
        for (const violation of await violationsOf(page)) {
          found.push(`${path}: ${violation}`);
        }
      }
      expect(found).toEqual([]);
    });
  });
}
