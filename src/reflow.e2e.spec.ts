import { expect, test } from '@playwright/test';

// WCAG 1.4.10 Reflow: Bei 320 CSS-Pixel Breite darf eine Seite nicht seitlich scrollen müssen.
// Der Test öffnet jedes Werkzeug von der Startseite aus und prüft den Hauptbereich und die Seite.
test('alle Werkzeuge passen bei 320 px Breite ohne seitliches Scrollen', async ({ page }) => {
  test.setTimeout(900_000);
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await expect(page.locator('.tile').first()).toBeVisible({ timeout: 30000 });

  const paths = await page.locator('.tile-link').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
  expect(paths.length).toBeGreaterThan(50);

  const tooWide: string[] = [];
  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('.tool-header h1')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('.tool-content > *').first()).toBeVisible({ timeout: 30000 });
    const fits = await page.evaluate(() => {
      const main = document.getElementById('main-content');
      return document.documentElement.scrollWidth <= window.innerWidth + 1 && (main?.scrollWidth ?? 0) <= (main?.clientWidth ?? 0) + 1;
    });
    if (!fits) {
      tooWide.push(path);
    }
  }
  expect(tooWide).toEqual([]);
});
