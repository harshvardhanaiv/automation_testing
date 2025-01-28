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
      await page.locator('input[placeholder="Your email"]').fill(USERNAME, { timeout: 10000 });
      await page.waitForTimeout(1000); // Pause after filling username
      await page.locator('input[placeholder="Password"]').fill(PASSWORD, { timeout: 10000 });
      await page.waitForTimeout(1000); // Pause after filling password

      // Click login with retry mechanism
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }), // Increased timeout
        page.locator('button[color="primary"]').click({ timeout: 10000 }),
      ]);
      await page.waitForTimeout(1000); // Pause after login click and navigation

      // Verify successful login by checking for a key element
      await expect(page.locator('.fa-regular.fa-bars.text-base')).toBeVisible({ timeout: 30000 });
      await page.waitForTimeout(1000); // Pause after verifying login

      // Rest of the login flow remains the same...
      await page.locator('.fa-regular.fa-bars.text-base').click({ timeout: 10000 });
      await page.waitForTimeout(1000); // Pause after clicking the bars icon

      // Click on the second element
      await page.locator('.mat-expansion-indicator.ng-tns-c75-12.ng-trigger.ng-trigger-indicatorRotate.ng-star-inserted').click({ timeout: 10000 });
      await page.waitForTimeout(1000);  // Pause after clicking the expansion indicator

      // Add more robust waiting and error handling for subsequent interactions
      // Navigate to Datasource Mapping
      await page.getByRole('link', { name: ' Datasource Mapping' }).click({ timeout: 10000 });
      await page.waitForTimeout(1000);

      await page.waitForTimeout(30000);

      // Click the dropdown trigger
      await page.getByRole('button', { name: 'dropdown trigger' }).click({ timeout: 10000 });
      await page.waitForTimeout(1000);

      // Use getByRole('option') to select the dropdown option
      await page.getByRole('option', { name: 'AIV_testing' }).click({ timeout: 10000 });
      await page.locator('input[name="dbName"]').click({ timeout: 10000 });
      await page.locator('input[name="dbName"]').fill('AIV_TESTMAPPING', { timeout: 10000 });
      await page.getByRole('row', { name: 'Select row Demo' }).locator('span').first().click({ timeout: 10000 });
      await page.getByRole('button', { name: 'Configure' }).click({ timeout: 10000 });

      // Logout and Login Flow
      await page.getByRole('link', { name: 'AdminProfile-Image' }).click({ timeout: 10000 });
      await page.locator('#mat-menu-panel-0').getByText('Logout').click({ timeout: 10000 });
      await page.getByRole('textbox', { name: 'Your email' }).click({ timeout: 10000 });
      await page.getByRole('textbox', { name: 'Your email' }).fill(DEMO_USERNAME, { timeout: 10000 });
      await page.getByRole('textbox', { name: 'Password' }).click({ timeout: 10000 });
      await page.getByRole('textbox', { name: 'Password' }).fill(DEMO_PASSWORD, { timeout: 10000 });
      await page.getByRole('textbox', { name: 'Password' }).press('Enter', { timeout: 10000 });

      // Wait for the spinner to be hidden
      await page.waitForSelector('.ais_spinner_wrap', { state: 'hidden', timeout: 15000 });

      // New code for Datasource and Dataset creation
      await page.getByRole('button', { name: '' }).click({ timeout: 10000 });
      await page.getByRole('button', { name: ' Master Data ' }).click({ timeout: 10000 });
      await page.getByRole('link', { name: ' Datasource' }).click({ timeout: 10000 });
      await page.locator('a').filter({ hasText: 'Create Dataset' }).click({ timeout: 10000 });
      await page.getByRole('button', { name: '' }).click({ timeout: 10000 });
      await page.getByRole('link', { name: ' Datasource' }).click({ timeout: 10000 });
      await page.locator('tr').filter({ hasText: 'AIV_testing jdbcmysql0aitest' }).locator('span').first().click({ timeout: 10000 });
      await page.locator('a').filter({ hasText: 'Create Dataset' }).click({ timeout: 10000 });
      await page.getByText('AIV_TESTMAPPING').click({ timeout: 10000 });
      await page.getByRole('button', { name: 'toggle Tables' }).click({ timeout: 10000 });
      await page.getByRole('button', { name: 'toggle customers' }).click({ timeout: 10000 });

      // Click on the company_name element
      await page.getByText('company_name').click({ timeout: 10000 });

      await page.waitForTimeout(30000);

    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});