import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

// Puts the caret at the very end of the document through the editor's own command API (Tiptap keeps
// its instance on the editor element). Neither a click (depends on pixel positions while the layout is
// still shifting) nor setting the browser selection (WebKit hands it to ProseMirror late) was reliable:
// in both cases the caret occasionally stayed at the start of the document.
async function placeCaretAtEnd(page: Page) {
  const editor = page.locator('.ProseMirror');
  await expect(editor.locator('p').last()).toHaveText('Willkommen in diesem HTML-WYSIWYG-Editor');
  await page.evaluate(() => {
    const element = document.querySelector('.ProseMirror') as (HTMLElement & { editor?: { commands: { focus: (position: 'end') => boolean } } }) | null;
    if (!element?.editor) {
      throw new Error('Tiptap editor instance not found on the editor element');
    }
    element.editor.commands.focus('end');
  });
  await expect(editor).toBeFocused();
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
