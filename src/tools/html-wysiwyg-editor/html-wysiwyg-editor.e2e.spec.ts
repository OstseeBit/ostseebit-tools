import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

// Puts the caret behind the last character of the last paragraph. The position is set through the
// document selection instead of a click, because a click depends on pixel positions and the layout is
// still shifting while the development server finishes loading styles (the caret then ended up at the
// very start of the document in CI).
async function placeCaretAtEnd(page: Page) {
  const editor = page.locator('.ProseMirror');
  await expect(editor.locator('p').last()).toHaveText('Willkommen in diesem HTML-WYSIWYG-Editor');
  await editor.focus();
  await page.evaluate(() => {
    const paragraphs = document.querySelectorAll('.ProseMirror p');
    const selection = globalThis.getSelection();
    selection?.selectAllChildren(paragraphs[paragraphs.length - 1]);
    selection?.collapseToEnd();
  });
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
    await placeCaretAtEnd(page);
    await page.keyboard.press('Enter');
    await page.keyboard.type('Zweiter Absatz');
    await expect(page.getByTestId('area-content')).toContainText('<p>Zweiter Absatz</p>');
  });

  test('Does not append an empty paragraph after a code block', async ({ page }) => {
    await placeCaretAtEnd(page);
    // The markdown input rule ``` + space turns the new paragraph into a code block.
    await page.keyboard.press('Enter');
    await page.keyboard.type('``` x');
    const output = page.getByTestId('area-content');
    await expect(output).toContainText('<pre><code>x</code></pre>');
    expect(await output.innerText()).not.toMatch(/<p><\/p>\s*$/);
  });
});
