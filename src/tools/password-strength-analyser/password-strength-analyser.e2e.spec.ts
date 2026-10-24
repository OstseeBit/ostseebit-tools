import { expect, test } from '@playwright/test';

test.describe('Tool - Password strength analyser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/password-strength-analyser');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Passwortstärken-Analysator - OstseeBit Tools');
  });

  test('Computes the brute force attack time of a password', async ({ page }) => {
    await page.getByTestId('password-input').fill('ABCabc123!@#');

    const crackDuration = await page.getByTestId('crack-duration').textContent();

    expect(crackDuration).toEqual('15,091 Jahrtausende, 3 Jahrhunderte');
  });
});
