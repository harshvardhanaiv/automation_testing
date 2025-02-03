import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

test('Login and Create Alert Test with Longer Delays', async ({ page }) => {
  // Set a longer timeout for the test
  test.setTimeout(600000); // 10 minutes

  // Check if required environment variables are defined
  const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;
  if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
    throw new Error('One or more environment variables are missing in the .env file');
  }

  // Navigate to the application URL
  console.log('Navigating to application URL...');
  await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(5000); // Longer delay for observation

  // Perform login
  console.log('Filling in email...');
  await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
  await page.waitForTimeout(4000); // Longer delay to observe typing email

  console.log('Filling in password...');
  await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
  await page.waitForTimeout(4000); // Longer delay to observe typing password

  console.log('Clicking login button...');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(6000); // Longer delay for page loading

  // Navigate through menus and access Alerts
  console.log('Opening menu...');
  await page.getByRole('button', { name: '' }).click();
  await page.waitForTimeout(4000); // Delay for observing menu click

  // Navigate through the application
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Documents ' }).click();
  await page.getByRole('link', { name: ' Reports' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Cus');

  // Select the row containing 'Customers details'
  console.log('Selecting the row containing "Customers details"...');
  const customerRow = await page.locator('tr').filter({ hasText: 'Customers detailsPath :: /' }).locator('span').first();
  await customerRow.click(); // Single click to select the checkbox

  // Perform double-click to open the dialog box
  console.log('Double-clicking to open the dialog box...');
  await customerRow.dblclick(); // Double click to open the dialog box

  // Optionally wait for the dialog box to appear
//   await page.waitForSelector('dialog-selector'); // Replace 'dialog-selector' with the actual selector for the dialog box

await page.getByText('Parameter', { exact: true }).click();
await page.waitForTimeout(2000);

await page.locator('[id="rp_Customer\\ Name"]').click();
await page.waitForTimeout(2000);

await page.locator('[id="rp_Customer\\ Name"]').fill('112');
await page.waitForTimeout(2000);

await page.getByRole('tab', { name: 'Schedule' }).locator('a').click();
await page.waitForTimeout(2000);

await page.getByText('Time').click();
await page.waitForTimeout(2000);

await page.getByRole('option', { name: 'scheduler_Time' }).click();
await page.waitForTimeout(2000);

await page.locator('.p-radiobutton-icon').first().click();
await page.waitForTimeout(2000);

await page.locator('.p-radiobutton-icon').first().click();
await page.waitForTimeout(2000);

await page.locator('p-dropdown').filter({ hasText: '1' }).getByLabel('dropdown trigger').click();
await page.waitForTimeout(2000);

await page.getByRole('option', { name: '2' }).click();
await page.waitForTimeout(2000);

await page.locator('p-dropdown').filter({ hasText: 'mins' }).getByLabel('dropdown trigger').click();
await page.waitForTimeout(2000);

await page.getByText('10 mins').click();
await page.waitForTimeout(2000);
await page.getByText('Output').click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).press('ArrowRight');
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).fill('Customer Details');
await page.waitForTimeout(2000);

await page.locator('p-dropdown').filter({ hasText: 'Select Suffix' }).getByLabel('dropdown trigger').click();
await page.waitForTimeout(2000);

await page.getByText('yyyyddMM', { exact: true }).click();
await page.waitForTimeout(2000);

await page.getByText('rptdocument').click();
await page.waitForTimeout(2000);

await page.getByRole('option', { name: 'pdf' }).click();
await page.waitForTimeout(2000);

await page.getByRole('button', { name: '' }).click();
await page.waitForTimeout(2000);

await page.getByText('Templates', { exact: true }).click();
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(2000);


});
