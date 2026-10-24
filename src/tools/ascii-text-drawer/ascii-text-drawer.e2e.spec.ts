import { expect, test } from '@playwright/test';

test('renders ASCII art with external font services unavailable', async ({ page, baseURL }) => {
  const externalRequests: string[] = [];
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== new URL(baseURL!).origin) {
      externalRequests.push(url.origin);
      await route.abort();
      return;
    }
    await route.continue();
  });
  await page.goto('/ascii-text-drawer');
  const output = page.getByTestId('area-content');
  await expect(output).toContainText('_');
  const before = await output.textContent();
  await page.getByPlaceholder('Dein zu zeichnender Text').fill('Hello');
  await expect(output).not.toHaveText(before!);
  await expect(output).toContainText('_');
  await expect(page.getByText('Die aktuellen Einstellungen führten zu einem Fehler.')).toBeHidden();
  expect(externalRequests).toEqual([]);
});
