import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('AIV Login and Create MySQL', () => {
  test('Login, Navigate, and Create MySQL', async ({ page }, testInfo) => {
    // Increased timeout for the entire test
    testInfo.setTimeout(120000);

    const BASE_URL = process.env.AIV_BASE_URL;
    const USERNAME = process.env.AIV_USERNAME;
    const PASSWORD = process.env.AIV_PASSWORD;
    // const DEMO_USERNAME = process.env.AIV_DEMO_USERNAME; // Not used, so commented out
    // const DEMO_PASSWORD = process.env.AIV_DEMO_PASSWORD; // Not used, so commented out

    // Increase default navigation timeout
    page.setDefaultTimeout(90000);

    try {
      // Navigate with more robust navigation options
      await page.goto(BASE_URL, {
        waitUntil: 'networkidle',
        timeout: 120000
      });

      // Wait for login form to be fully loaded
      await page.waitForSelector('input[placeholder="Your email"]', { state: 'visible', timeout: 30000 });

      // Fill credentials
      await page.locator('input[placeholder="Your email"]').fill(USERNAME);
      await page.locator('input[placeholder="Password"]').fill(PASSWORD);

      // Click login with retry mechanism
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
        page.locator('button[color="primary"]').click(),
      ]);

      // Verify successful login by checking for a key element
      await expect(page.locator('.fa-regular.fa-bars.text-base')).toBeVisible({ timeout: 30000 });

      // Rest of the login flow remains the same...
      await page.locator('.fa-regular.fa-bars.text-base').click();

      // Click on the second element
      await page.locator('.mat-expansion-indicator.ng-tns-c75-12.ng-trigger.ng-trigger-indicatorRotate.ng-star-inserted').click();
    
      const page1Promise = page.waitForEvent('popup');
      await page.getByLabel('Master Data').getByRole('link', { name: '' }).nth(3).click();
      const page1 = await page1Promise;  
      await page.waitForTimeout(5000);
      await page1.locator('a').filter({ hasText: 'Create' }).click();
      await page1.locator('input[name="name"]').click();
      await page1.locator('input[name="name"]').fill('clone-Parameter_testing');
      await page1.locator('input[name="displayName"]').click();
      await page1.locator('input[name="displayName"]').fill('category');
      await page1.locator('p-dropdown').filter({ hasText: 'String' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'label_String' }).click();
      await page1.locator('p-dropdown').filter({ hasText: 'Custom' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'custom' }).click();
      await page1.locator('p-dropdown').filter({ hasText: 'Text Box' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'label_text_box' }).click();
      await page1.locator('input[name="defaultValue"]').click();
      await page1.locator('input[name="defaultValue"]').fill('Metal');
      await page1.locator('p-checkbox').filter({ hasText: 'Required' }).locator('div').nth(2).click();
      await page1.getByRole('button', { name: 'Submit' }).click();
      await page1.getByRole('row', { name: 'Select row is template cell column header Name TextBox custom' }).locator('span').first().click();
  await page1.getByRole('listitem').filter({ hasText: 'Clone' }).click();
  await page1.getByText('Privilege', { exact: true }).click();
  await page1.locator('p-checkbox div').nth(2).click();
  await page1.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
  await page1.getByRole('button', { name: 'Clone' }).click();
  await page1.locator('tr:nth-child(3) > td > .e-checkbox-wrapper > .e-frame').click();
  await page1.locator('a').filter({ hasText: 'Delete' }).click();
  await page1.getByRole('button', { name: 'Delete' }).click();

} catch (error) {
  console.error('Login test failed:', error);
  throw error;
    }
  });
});