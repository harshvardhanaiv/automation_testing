import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('AIV Login and Create MySQL', () => {
  test('Login, Navigate, and Create MySQL', async ({ page }, testInfo) => {
    testInfo.setTimeout(120000); // Set timeout for this specific test to 2 minutes

    const BASE_URL = process.env.AIV_BASE_URL;
    const USERNAME = process.env.AIV_USERNAME;
    const PASSWORD = process.env.AIV_PASSWORD;

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

      // Click on the new element with the provided complex selector
      await page.locator('body > app-root:nth-child(1) > mat-sidenav-container:nth-child(3) > mat-sidenav-content:nth-child(2) > app-header:nth-child(1) > mat-sidenav:nth-child(2) > div:nth-child(1) > mat-accordion:nth-child(2) > mat-expansion-panel:nth-child(5) > div:nth-child(2) > div:nth-child(1) > mat-accordion:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(2)')
        .waitFor({ state: 'visible', timeout: 30000 }); // Wait for up to 30 seconds
      await page.waitForTimeout(1000); // Pause after waiting for the element
      await page.locator('body > app-root:nth-child(1) > mat-sidenav-container:nth-child(3) > mat-sidenav-content:nth-child(2) > app-header:nth-child(1) > mat-sidenav:nth-child(2) > div:nth-child(1) > mat-accordion:nth-child(2) > mat-expansion-panel:nth-child(5) > div:nth-child(2) > div:nth-child(1) > mat-accordion:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(2)')
        .click();
      await page.waitForTimeout(1000); // Pause after clicking the complex selector

      // Pause for 10 seconds
      await page.waitForTimeout(10000);
      await page.waitForTimeout(1000); // Pause after the 10-second pause

      // **ADD THE NEW ACTIONS HERE**
      await page.locator('a').filter({ hasText: /^Create$/ }).click();
      await page.waitForTimeout(1000); // Pause after clicking Create
      await page.getByRole('textbox', { name: 'Search' }).click();
      await page.waitForTimeout(1000); // Pause after clicking search textbox
      await page.getByRole('textbox', { name: 'Search' }).fill('mysql');
      await page.waitForTimeout(1000); // Pause after filling search textbox
      await page.getByRole('link', { name: 'MySQL MySQL ' }).click();
      await page.waitForTimeout(1000); // Pause after clicking MySQL link

      // **NEW ACTIONS FOR FILLING MYSQL FORM**
      await page.locator('input[name="name"]').click();
      await page.waitForTimeout(1000);
      await page.locator('input[name="name"]').fill('AIV1');
      await page.waitForTimeout(1000);
      await page.locator('input[name="url"]').click();
      await page.waitForTimeout(1000);
      await page.locator('input[name="url"]').click();
      await page.waitForTimeout(1000);
      await page.locator('input[name="url"]').press('ControlOrMeta+a');
      await page.waitForTimeout(1000);
      await page.locator('input[name="url"]').fill('jdbc:mysql://80.241.217.90:3306/aiagents_inventory');
      await page.waitForTimeout(1000);
      await page.locator('input[name="username"]').click();
      await page.waitForTimeout(1000);
      await page.locator('input[name="username"]').fill('aitest');
      await page.waitForTimeout(1000);
      await page.locator('input[name="password"]').click();
      await page.waitForTimeout(1000);
      await page.locator('input[name="password"]').fill('password$01^&');
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'Test Connection' }).click();
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'Ok' }).click();
      await page.waitForTimeout(1000);

      // **ADDITIONAL ACTIONS AFTER CONNECTION TEST**
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(1000);

      // **ADD DELETE ACTIONS HERE**
      await page.locator('tr').filter({ hasText: 'AIV1 jdbcmysql0aitest' }).locator('span').first().click();
      await page.locator('a').filter({ hasText: 'Delete' }).click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.waitForTimeout(1000);

      // Add more robust waiting and error handling for subsequent interactions
    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});