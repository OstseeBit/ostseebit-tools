import { expect, test } from '@playwright/test';

test('rejects hostile shared samples and recovers after editing', async ({ page }) => {
  await page.goto('/regex-tester?regex=a%7B100000000%7D');
  const sample = page.getByTestId('regex-sample');
  await expect(sample).toContainText(/safety limit|timed out/);
  await page.getByPlaceholder('Put the regex to test').fill('hello');
  await expect(sample).toHaveText('hello');
});
