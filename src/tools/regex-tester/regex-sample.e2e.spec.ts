import { expect, test } from '@playwright/test';

test('rejects hostile shared samples and recovers after editing', async ({ page }) => {
  await page.goto('/regex-tester?regex=a%7B100000000%7D');
  const sample = page.getByTestId('regex-sample');
  await expect(sample).toContainText(/Sicherheitsgrenze|zu lange/);
  await page.getByPlaceholder('Gib den zu testenden regulären Ausdruck ein').fill('hello');
  await expect(sample).toHaveText('hello');
});
