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


      // --- New Steps for Dataset Creation ---
      const page3Promise = page.waitForEvent('popup');
      await page.getByLabel('Master Data').getByRole('link', { name: '' }).nth(1).click();
      const page3 = await page3Promise;
      await page3.locator('a').filter({ hasText: 'Create Dataset' }).click();
      await page3.getByText('AIV_DATASOURCE').click();
      await page3.getByRole('button', { name: 'toggle Tables' }).click();
      await page3.getByRole('button', { name: 'toggle raw_materials' }).click();
      
      await page3.locator('pre').nth(1).click();
      await page3.locator('codemirror').filter({ hasText: 'xxxxxxxxxx1 1' }).getByRole('textbox').fill('select `material_id` AS "material_id",`material_name` AS "material_name",`category` AS "category",`unit_of_measure` AS "unit_of_measure",`current_stock` AS "current_stock",`min_stock_level` AS "min_stock_level",`max_stock_level` AS "max_stock_level",`last_purchase_price` AS "last_purchase_price",`status` AS "status" From raw_materials');
     
      await page3.locator('mat-dialog-content').getByRole('button', { name: 'Create', exact: true }).click();
      
      await page3.locator('#mat-mdc-dialog-1 div').filter({ hasText: /^Name$/ }).click();
      await page3.locator('#mat-mdc-dialog-1 input[name="name"]').click();
      await page3.locator('#mat-mdc-dialog-1 input[name="name"]').fill('category');
      await page3.locator('p-dropdown').filter({ hasText: 'INTEGER' }).getByLabel('dropdown trigger').click();
      await page3.getByRole('option', { name: 'CHAR', exact: true }).click();
      await page3.getByRole('button', { name: 'Submit' }).click();
      
      await page3.getByRole('button', { name: 'dropdown trigger' }).click();
      await page3.getByRole('option', { name: 'category' }).click();
      await page3.locator('codemirror').filter({ hasText: 'xxxxxxxxxx1 1' }).getByRole('textbox').fill(' as d where category in ({{category}})');
    
      await page3.getByRole('listitem').filter({ hasText: 'Output Columns' }).locator('span').first().click();
      await page3.getByRole('listitem').filter({ hasText: 'Preview' }).locator('span').first().click();
      await page3.getByText('ParameterscategorySubmitCancel').click();
      await page3.locator('input.p-inputtext.p-component.p-element.ais_tbox.ng-untouched.ng-pristine.ng-valid').fill('Metal');
      await page3.getByRole('button', { name: 'Submit' }).click();
      await page3.getByRole('textbox', { name: 'Dataset Name' }).click();
      await page3.getByRole('textbox', { name: 'Dataset Name' }).fill('Metals');
      await page3.getByRole('button', { name: 'Create' }).click();
      await page3.getByRole('link', { name: '' }).click();
    
} catch (error) {
  console.error('Login test failed:', error);
  throw error;
    }
  });
});