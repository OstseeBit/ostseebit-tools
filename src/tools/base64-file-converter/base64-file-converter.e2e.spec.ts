import { Buffer } from 'node:buffer';
import { expect, test } from '@playwright/test';

test('downloads decoded file bytes with the selected filename', async ({ page }) => {
  await page.goto('/base64-file-converter');
  await page.getByPlaceholder('Füge hier deinen Base64-Dateistring ein ...').fill('SGVsbG8=');
  await page.getByPlaceholder('Download-Dateiname').fill('hello');
  await page.getByPlaceholder('Erweiterung', { exact: true }).fill('txt');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Datei herunterladen', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('hello.txt');
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  expect(Buffer.concat(chunks).toString('utf8')).toBe('Hello');
});
