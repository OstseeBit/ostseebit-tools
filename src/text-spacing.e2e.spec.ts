import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { openAndSettle } from './a11y.helpers';

// WCAG 1.4.12 Textabstand: Mit den Werten aus dem Kriterium darf nichts abgeschnitten werden und
// nichts verloren gehen. Der Test setzt sie auf alle Elemente und sucht Text, der in einem Kasten mit
// fester Höhe oder verstecktem Überlauf nicht mehr Platz findet.
const spacingCss = `
  * {
    line-height: 1.5 !important;
    letter-spacing: 0.12em !important;
    word-spacing: 0.16em !important;
  }
  p { margin-bottom: 2em !important; }
`;

async function clippedElements(page: Page) {
  return page.evaluate(() => {
    const clipped: string[] = [];
    for (const element of document.body.querySelectorAll<HTMLElement>('*')) {
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || !element.textContent?.trim() || element.closest('.sr-only')) {
        continue;
      }
      // Nur Elemente, die ihren Überlauf wirklich abschneiden (und nicht scrollbar machen).
      const hidesX = style.overflowX === 'hidden' || style.overflowX === 'clip';
      const hidesY = style.overflowY === 'hidden' || style.overflowY === 'clip';
      if (!hidesX && !hidesY) {
        continue;
      }
      // Reine Textzeilen mit "text-overflow: ellipsis" sind eine bewusste Kürzung und haben ein Tooltip/Titel.
      if (style.textOverflow === 'ellipsis') {
        continue;
      }
      const overflowsY = hidesY && element.scrollHeight > element.clientHeight + 1;
      const overflowsX = hidesX && element.scrollWidth > element.clientWidth + 1;
      if (overflowsX || overflowsY) {
        clipped.push(`${element.tagName.toLowerCase()}.${element.className.toString().slice(0, 60)}: "${element.textContent.trim().slice(0, 40)}"`);
      }
    }
    return clipped;
  });
}

const pagesToCheck = ['/', '/?category=sec', '/about', '/token-generator', '/hash-text', '/chmod-calculator', '/crontab-generator'];

for (const path of pagesToCheck) {
  test(`${path}: Text wird mit größeren Textabständen nicht abgeschnitten`, async ({ page }) => {
    await openAndSettle(page, path);
    await page.addStyleTag({ content: spacingCss });
    await page.evaluate(() => document.fonts.ready);
    expect(await clippedElements(page)).toEqual([]);
  });
}

test('die Kopfleiste, die Icon-Leiste und die Statusleiste halten größere Textabstände aus', async ({ page }) => {
  await openAndSettle(page, '/');
  await page.addStyleTag({ content: spacingCss });
  for (const selector of ['header', 'nav[aria-label="Werkzeuge"]', 'footer']) {
    const box = page.locator(selector).first();
    const fits = await box.evaluate(element => element.scrollWidth <= element.clientWidth + 1 && element.scrollHeight <= element.clientHeight + 1);
    expect(fits, `${selector} schneidet Inhalt ab`).toBe(true);
  }
});

// 200 % Zoom auf einem 1280 x 800 Bildschirm entspricht 640 x 400 CSS-Pixeln.
test.describe('200 % Zoom (640 x 400 CSS-Pixel)', () => {
  test.use({ viewport: { width: 640, height: 400 } });

  for (const path of ['/', '/token-generator', '/about']) {
    test(`${path}: kein seitliches Scrollen und Inhalt erreichbar`, async ({ page }) => {
      await openAndSettle(page, path);
      const fits = await page.evaluate(() => {
        const main = document.getElementById('main-content');
        return document.documentElement.scrollWidth <= window.innerWidth + 1 && (main?.scrollWidth ?? 0) <= (main?.clientWidth ?? 0) + 1;
      });
      expect(fits).toBe(true);
      // Der Hauptbereich scrollt selbst, damit der Inhalt trotz der kleinen Höhe erreichbar bleibt.
      const reachable = await page.evaluate(() => {
        const main = document.getElementById('main-content')!;
        main.scrollTop = main.scrollHeight;
        return main.scrollTop > 0 || main.scrollHeight <= main.clientHeight;
      });
      expect(reachable).toBe(true);
    });
  }
});
