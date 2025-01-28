import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('AIV Login and Create MySQL', () => {
  test('Login, Navigate, and Create MySQL', async ({ page }, testInfo) => {
    testInfo.setTimeout(120000); // Set timeout for this specific test to 2 minutes

    const BASE_URL = process.env.AIV_BASE_URL;
    const USERNAME = process.env.AIV_USERNAME;
    const PASSWORD = process.env.AIV_PASSWORD;
    const DEMO_USERNAME = process.env.AIV_DEMO_USERNAME;
    const DEMO_PASSWORD = process.env.AIV_DEMO_PASSWORD;
    const ADMIN_USERNAME = process.env.AIV_ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.AIV_ADMIN_PASSWORD;

    // Increase default navigation timeout
    page.setDefaultTimeout(90000);

    try {
      // Navigate with more robust navigation options
      await page.goto(BASE_URL, {
        waitUntil: 'networkidle',
        timeout: 120000
      });
      await page.waitForTimeout(1000); // Pause after navigation

      // Wait for login form to be fully loaded
      await page.waitForSelector('input[placeholder="Your email"]', { state: 'visible', timeout: 30000 });
      await page.waitForTimeout(1000); // Pause after waiting for selector

      // Fill credentials
      await page.locator('input[placeholder="Your email"]').fill(USERNAME);
      await page.waitForTimeout(1000); // Pause after filling username
      await page.locator('input[placeholder="Password"]').fill(PASSWORD);
      await page.waitForTimeout(1000); // Pause after filling password

      // Click login with retry mechanism
      await Promise.all([  
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }), // Increased timeout
        page.locator('button[color="primary"]').click(),
      ]);
      await page.waitForTimeout(1000); // Pause after login click and navigation

      // Verify successful login by checking for a key element
      await expect(page.locator('.fa-regular.fa-bars.text-base')).toBeVisible({ timeout: 30000 });
      await page.waitForTimeout(1000); // Pause after verifying login

      // Rest of the login flow remains the same...
      await page.locator('.fa-regular.fa-bars.text-base').click();
      await page.waitForTimeout(1000); // Pause after clicking the bars icon

      // Click on the second element
      await page.locator('.mat-expansion-indicator.ng-tns-c75-12.ng-trigger.ng-trigger-indicatorRotate.ng-star-inserted').click();
      await page.waitForTimeout(1000);  // Pause after clicking the expansion indicator

      await page.waitForTimeout(10000); // Pause after clicking the complex selector

      // --- PREVIOUSLY ADDED CODE BLOCK START ---
      const page1Promise = page.waitForEvent('popup');
      await page.getByLabel('Master Data').getByRole('link', { name: '' }).nth(1).click();
      const page1 = await page1Promise;
      await page1.locator('a').filter({ hasText: /^Create$/ }).click();
      await page1.getByRole('textbox').fill('AIV DATASET');
      await page1.getByRole('button', { name: 'Create Folder' }).click();
      // --- PREVIOUSLY ADDED CODE BLOCK END ---
      await page.waitForTimeout(10000);

      // --- NEWLY ADDED CODE BLOCK START ---
      await page1.getByRole('row', { name: 'Select row is template cell column header is template cell column header File Name folder Admin is template cell column header Last Updated is template cell column header Options', exact: true }).locator('span').first().click();
      await page1.locator('a').filter({ hasText: 'Copy' }).click();
      await page1.getByRole('button', { name: 'Copy' }).click();
      await page1.locator('tr').filter({ hasText: 'Copy_AIV DATASETPath :: /' }).locator('span').first().click();
      await page1.getByRole('listitem').filter({ hasText: 'Move' }).click();
      await page1.getByRole('treeitem', { name: ' AIV DATASET', exact: true }).getByRole('listitem').click();
      await page1.getByRole('button', { name: 'Move' }).click();
      await page1.getByRole('row', { name: 'Select row is template cell column header is template cell column header File Name folder Admin is template cell column header Last Updated is template cell column header Options', exact: true }).locator('label').nth(1).click();
      await page1.getByRole('navigation').locator('a').filter({ hasText: 'DATASETS' }).click();

      await page.waitForTimeout(10000);

      // --- NEWLY ADDED CODE BLOCK 2 START ---
      await page1.locator('a').filter({ hasText: /^Share$/ }).click();
      await page1.getByRole('gridcell', { name: 'Demo' }).click();
      await page1.getByRole('button', { name: 'dropdown trigger' }).click();
      await page1.getByRole('option', { name: 'label_internal' }).click();
      await page1.getByRole('button', { name: 'Share' }).click();
      // --- NEWLY ADDED CODE BLOCK 2 END ---

      await page.waitForTimeout(10000);

      // --- NEWLY ADDED CODE BLOCK 3 START ---
      await page1.getByRole('link', { name: 'AdminProfile-Image' }).click();
      await page1.locator('#mat-menu-panel-2').getByText('Logout').click();
      await page1.getByRole('textbox', { name: 'Your email' }).click();
      await page1.getByRole('textbox', { name: 'Your email' }).fill(DEMO_USERNAME);
      await page1.getByRole('textbox', { name: 'Password' }).click();
      await page1.getByRole('textbox', { name: 'Password' }).fill(DEMO_PASSWORD);
      await page1.getByRole('button', { name: 'Login' }).click();
      await page1.getByRole('button', { name: '' }).click();
      await page1.getByRole('button', { name: ' Master Data ' }).click();
      await page1.getByRole('link', { name: ' Datasets' }).click();

      await page.waitForTimeout(10000);
      // --- NEWLY ADDED CODE BLOCK 4 END ---

      // --- ADDED CODE BLOCK START ---
      await page1.getByRole('row', { name: 'Select row is template cell column header is template cell column header File Name folder Admin is template cell column header Last Updated is template cell column header Options', exact: true }).locator('span').first().click();
      await page1.locator('a').filter({ hasText: 'Copy' }).click();
      await page1.locator('a').filter({ hasText: 'Move' }).click();
      await page1.locator('a').filter({ hasText: 'Delete' }).click();
      await page1.getByRole('link', { name: 'DemoProfile-Image' }).click();
      await page1.locator('#mat-menu-panel-0').getByText('Logout').click();
      await page1.getByRole('textbox', { name: 'Your email' }).click();
      await page1.getByRole('textbox', { name: 'Your email' }).fill(ADMIN_USERNAME);
      await page1.getByRole('textbox', { name: 'Password' }).click();
      await page1.getByRole('textbox', { name: 'Password' }).fill(ADMIN_PASSWORD);
      await page1.getByRole('button', { name: 'Login' }).click();
      await page1.getByRole('button', { name: '' }).click();
      await page1.getByRole('button', { name: ' Master Data ' }).click();
      await page1.getByRole('link', { name: ' Datasets' }).click();
      await page1.getByRole('row', { name: 'Select row is template cell column header is template cell column header File Name folder Admin is template cell column header Last Updated is template cell column header Options', exact: true }).locator('span').first().click();
      await page1.locator('a').filter({ hasText: 'Delete' }).click();
      await page1.getByRole('button', { name: 'Delete' }).click();
      // --- ADDED CODE BLOCK END ---

      await page.waitForTimeout(10000);

    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});