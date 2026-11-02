import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

// Automatische Prüfung mit axe-core gegen WCAG 2.x A/AA (inklusive Kontrast). Sie ersetzt keine Prüfung
// mit Tastatur und Screenreader, fängt aber grobe Mängel wie fehlende Beschriftungen und zu geringen
// Kontrast zuverlässig ab.
export const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// Axe misst Farben so, wie sie gerade gezeichnet werden. Mitten in einer Ein- oder Überblendung (zum Beispiel
// beim Öffnen der Suche) wären sie verfälscht. Darum: zwei Bilder abwarten, damit Vue-Übergänge wirklich
// gestartet sind, dann das Ende aller endlichen Animationen, und das nötigenfalls mehrmals.
export async function waitForAnimations(page: Page) {
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

export async function violationsOf(page: Page) {
  await waitForAnimations(page);
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  return results.violations.map(({ id, impact, nodes }) =>
    `${id} (${impact}): ${nodes.length}x, z. B. ${nodes[0].html.slice(0, 200)} ${nodes[0].any[0]?.message ?? ''}`,
  );
}

export async function openAndSettle(page: Page, path: string) {
  await page.goto(path);
  if (path === '/' || path.startsWith('/?') || path === '/about' || path === '/diese-seite-gibt-es-nicht') {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 30000 });
  }
  else {
    await expect(page.locator('.tool-header h1')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('.tool-content > *').first()).toBeVisible({ timeout: 30000 });
  }
}
