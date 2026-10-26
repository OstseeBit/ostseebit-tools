import { expect, test } from '@playwright/test';

const securityButton = 'Sicherheit & Krypto: Werkzeuge anzeigen';

test.describe('Layout - Kopfleiste, Icon-Leiste und Statusleiste', () => {
  test('the rail lists the categories and no category flyout is open on the start page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await expect(nav).toBeVisible();
    // Every category has a button, their tools are not shown until a category is opened.
    await expect(nav.getByRole('button', { name: securityButton })).toBeVisible();
    await expect(nav.getByRole('button', { name: securityButton })).toHaveAttribute('aria-expanded', 'false');
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeHidden();
    await expect(nav.getByRole('link', { name: 'Datum-Uhrzeit-Konverter' })).toBeHidden();
  });

  test('opening a tool marks only the category that contains it', async ({ page }) => {
    await page.goto('/token-generator');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await expect(nav.getByRole('button', { name: securityButton })).toHaveAttribute('aria-current', 'true');
    await expect(nav.getByRole('button', { name: 'Rechner & Einheiten: Werkzeuge anzeigen' })).not.toHaveAttribute('aria-current', 'true');
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeHidden();
  });

  test('a category can be opened by its button and closed with Escape', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    const button = nav.getByRole('button', { name: securityButton });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeVisible();
    // Focus moves into the flyout and returns to the button when it is closed.
    await expect(nav.getByRole('region').getByRole('link').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('choosing a tool in the flyout opens it and closes the flyout', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await nav.getByRole('button', { name: securityButton }).click();
    await nav.getByRole('link', { name: 'Token-Generator' }).click();
    await expect(page).toHaveURL(/\/token-generator$/);
    await expect(nav.getByRole('link', { name: 'Token-Generator' })).toBeHidden();
  });

  test('on a phone the rail sits below the content as a tab bar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Werkzeuge' });
    await expect(nav).toBeVisible();
    const box = await nav.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThan(600);
    expect(box!.height).toBeLessThan(80);
    // The page does not scroll sideways.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
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
