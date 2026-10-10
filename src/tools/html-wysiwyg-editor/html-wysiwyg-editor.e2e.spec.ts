import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

// A click on the right edge of the (block-wide) paragraph puts the caret behind its last character.
async function clickAtEndOfLastParagraph(page: Page) {
  const paragraph = page.locator('.ProseMirror p').last();
  const box = await paragraph.boundingBox();
  await paragraph.click({ position: { x: (box?.width ?? 2) - 2, y: (box?.height ?? 2) / 2 } });
  await expect(page.locator('.ProseMirror')).toBeFocused();
}

test.describe('Tool - HTML WYSIWYG editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/html-wysiwyg-editor');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('HTML-WYSIWYG-Editor - OstseeBit Tools');
  });

  test('Shows the default content and mirrors it as formatted HTML', async ({ page }) => {
    const editor = page.locator('.ProseMirror');
    await expect(editor.getByRole('heading', { level: 1 })).toHaveText('Hallo!');
    await expect(page.getByTestId('area-content')).toContainText('<h1>Hallo!</h1>');
  });

  test('Toolbar formatting is written to the HTML output', async ({ page }) => {
    const editor = page.locator('.ProseMirror');
    await editor.click();
    await expect(editor).toBeFocused();
    await page.keyboard.press('ControlOrMeta+A');
    // First toolbar button is "bold", the second "italic".
    await page.locator('.editor-header button').first().click();
    await expect(page.getByTestId('area-content')).toContainText('<strong>Hallo!</strong>');
  });

  test('Typed text ends up in the HTML output', async ({ page }) => {
    await clickAtEndOfLastParagraph(page);
    await page.keyboard.press('Enter');
    await page.keyboard.type('Zweiter Absatz');
    await expect(page.getByTestId('area-content')).toContainText('<p>Zweiter Absatz</p>');
  });

  test('Does not append an empty paragraph after a code block', async ({ page }) => {
    await clickAtEndOfLastParagraph(page);
    // The markdown input rule ``` + space turns the new paragraph into a code block.
    await page.keyboard.press('Enter');
    await page.keyboard.type('``` x');
    const output = page.getByTestId('area-content');
    await expect(output).toContainText('<pre><code>x</code></pre>');
    expect(await output.innerText()).not.toMatch(/<p><\/p>\s*$/);
  });
});
