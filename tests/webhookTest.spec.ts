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
      await page.getByLabel('Master Data').getByRole('link', { name: '' }).nth(4).click();
      const page1 = await page1Promise;
      await page1.locator('a').filter({ hasText: 'Create Webhook' }).click();
      await page1.locator('div').filter({ hasText: /^Name:$/ }).getByRole('textbox').click();
      await page1.locator('div').filter({ hasText: /^Name:$/ }).getByRole('textbox').fill('Webhook_Test');
      await page1.getByRole('textbox', { name: 'Enter url or paste url' }).click();
      await page1.getByRole('textbox', { name: 'Enter url or paste url' }).fill('http://localhost:8080/aiv/');
      await page1.getByRole('button', { name: 'dropdown trigger' }).click();
      await page1.getByRole('button', { name: 'dropdown trigger' }).click();
      await page1.getByRole('textbox', { name: 'Key' }).click();
      await page1.getByRole('textbox', { name: 'Key' }).fill('Employees');
      await page1.getByRole('textbox', { name: 'Value' }).click();
      await page1.getByRole('textbox', { name: 'Value' }).fill('xyz123');
      await page1.getByRole('button', { name: '' }).click();
      await page1.getByRole('tab', { name: 'Headers' }).locator('a').click();
      await page1.getByRole('textbox', { name: 'Key' }).click();
      await page1.getByRole('textbox', { name: 'Key' }).fill('Content-type');
      await page1.getByRole('textbox', { name: 'Value' }).click();
      await page1.getByRole('textbox', { name: 'Value' }).fill('application/json');
      await page1.getByRole('button', { name: '+' }).click();
      await page1.getByRole('textbox', { name: 'Key' }).nth(1).click();
      await page1.getByRole('textbox', { name: 'Key' }).nth(1).fill('APi');
      await page1.getByRole('textbox', { name: 'Value' }).nth(1).click();
      await page1.getByRole('textbox', { name: 'Value' }).nth(1).fill('HIJVVJNUHBGVTRUILO%^&(&&*88');
      await page1.getByRole('tab', { name: 'Body' }).locator('a').click();
      await page1.locator('p-radiobutton').filter({ hasText: 'raw' }).locator('div').nth(2).click();
      await page1.locator('p-dropdown').filter({ hasText: 'JSON' }).getByLabel('dropdown trigger').click();
      await page1.locator('p-dropdown').filter({ hasText: 'JSONTextJSONXMLHTML' }).getByLabel('dropdown trigger').click();
      await page1.locator('.view-line').click();
      await page1.getByRole('textbox', { name: 'Editor content;Press Alt+F1' }).fill('{"reportName":"Employees"}');
      await page1.getByRole('button', { name: 'Save' }).click();
            
      await page.waitForTimeout(5000);

    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});