import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('AIV Login and Create MySQL', () => {
  test('Login, Navigate, and Create MySQL', async ({ page }) => {
    const BASE_URL = process.env.AIV_BASE_URL;
    const USERNAME = process.env.AIV_USERNAME;
    const PASSWORD = process.env.AIV_PASSWORD;

    page.setDefaultTimeout(90000);

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForSelector('input[placeholder="Your email"]', { state: 'visible' });
      await page.locator('input[placeholder="Your email"]').fill(USERNAME);
      await page.locator('input[placeholder="Password"]').fill(PASSWORD);

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.locator('button[color="primary"]').click(),
      ]);

      await expect(page.locator('.fa-regular.fa-bars.text-base')).toBeVisible();
      await page.locator('.fa-regular.fa-bars.text-base').click();
      await page.locator('.mat-expansion-indicator.ng-tns-c75-12.ng-trigger.ng-trigger-indicatorRotate.ng-star-inserted').click();

      const page1Promise = page.waitForEvent('popup');
      await page.getByLabel('Master Data').getByRole('link', { name: '' }).nth(3).click();
      const page1 = await page1Promise;
      await page1.waitForLoadState('load'); // Ensure the popup is fully loaded
      await page1.waitForTimeout(1000);
      await page1.locator('a').filter({ hasText: 'Create' }).click();

      // Wait for the input field to be visible and enabled before clicking
      await page1.waitForSelector('input[name="name"]', { state: 'visible' });
      await page1.locator('input[name="name"]').click();
      await page1.locator('input[name="name"]').fill('Parameter5_Testing');
      await page1.locator('input[name="displayName"]').click();
      await page1.locator('input[name="displayName"]').fill('category');
      await page1.locator('p-dropdown').filter({ hasText: 'String' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'label_String' }).click();
      await page1.locator('p-dropdown').filter({ hasText: 'Custom' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'custom' }).click();
      await page1.locator('p-dropdown').filter({ hasText: 'Text Box' }).getByLabel('dropdown trigger').click();
      await page1.getByRole('option', { name: 'fromB_Is_Multiselect' }).click();
      await page1.locator('input[name="defaultValue"]').click();
      await page1.locator('input[name="defaultValue"]').fill('Metal');
      await page1.locator('p-checkbox').filter({ hasText: 'Required' }).locator('div').nth(2).click();
      await page1.locator('div').filter({ hasText: /^Dynamic$/ }).locator('div').nth(2).click();
      await page1.locator('app-get-data-api').getByRole('button', { name: 'dropdown trigger' }).click();
      await page1.getByRole('textbox', { name: 'Search by name or type' }).fill('meta');
      await page1.getByRole('option', { name: 'Metal', exact: true }).locator('div').click();
      await page1.locator('div').filter({ hasText: /^Display TextNone$/ }).getByLabel('dropdown trigger').click();
      await page1.getByRole('textbox').nth(4).fill('ca');
      await page1.getByText('category').click();
      await page1.locator('div').filter({ hasText: /^ValueNone$/ }).getByLabel('dropdown trigger').click();
      await page1.getByRole('textbox').nth(4).fill('ca');
      await page1.locator('#pr_id_8_list').getByText('category').click();
      await page1.getByRole('button', { name: 'Submit' }).click();
      await page1.getByRole('button', { name: '' }).click();
      await page1.getByRole('button', { name: ' Master Data ' }).click();
      const page2Promise = page1.waitForEvent('popup');
      await page1.getByRole('listitem').filter({ hasText: 'Datasets' }).locator('span').nth(1).click();
      const page2 = await page2Promise;
      await page2.locator('a').filter({ hasText: 'Create Dataset' }).click();
      await page2.getByText('AIV_DATASOURCE').click();
      await page2.getByRole('button', { name: 'toggle Tables' }).click();
      await page2.getByRole('treeitem', { name: 'toggle raw_materials  raw_materials', exact: true }).locator('label').click();
      await page2.locator('pre').nth(1).click();
      await page2.locator('codemirror').filter({ hasText: 'xxxxxxxxxx1 1' }).getByRole('textbox').fill('select `material_id` AS "material_id",`material_name` AS "material_name",`category` AS "category",`unit_of_measure` AS "unit_of_measure",`current_stock` AS "current_stock",`min_stock_level` AS "min_stock_level",`max_stock_level` AS "max_stock_level",`last_purchase_price` AS "last_purchase_price",`status` AS "status" From raw_materials as d where category in ({{category}})');
      await page2.getByRole('button', { name: 'dropdown trigger' }).click();
      await page2.getByRole('option', { name: 'category' }).click();
      await page2.getByRole('button', { name: 'Parameter' }).click();
      await page2.getByRole('combobox', { name: 'None' }).locator('span').click();
      await page2.getByRole('option', { name: 'Parameter5_Testing' }).click();
      await page2.getByRole('listitem').filter({ hasText: 'Output Columns' }).locator('span').first().click();
      await page2.getByRole('listitem').filter({ hasText: 'Preview' }).locator('span').first().click();
      await page2.locator('.cdk-drag.aiv5_custom_modal_div.dataset_parameter.aiv_dsparam_grp_modal');
      await page2.locator('p-multiselect div').nth(4).click();
      await page2.getByRole('textbox').nth(1).fill('el');
      await page2.getByRole('listitem', { name: 'Electrical' }).locator('div').nth(1).click();
      await page2.locator('p-multiselect div').nth(4).click();
      await page2.locator('span[translate="common_Submit"]').click();
      await page2.getByRole('textbox', { name: 'Dataset Name' }).click();
      await page2.getByRole('textbox', { name: 'Dataset Name' }).fill('Category_Metal3');
      await page2.getByRole('button', { name: 'Create' }).click();
      await page2.getByRole('link', { name: '' }).click();

    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});
