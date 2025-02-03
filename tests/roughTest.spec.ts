import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

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
  await page.waitForTimeout(4000);

  console.log('Filling in password...');
  await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
  await page.waitForTimeout(4000);

  console.log('Clicking login button...');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(6000); // Allow time for login process

  // Navigate through menus and access Alerts
  console.log('Opening menu...');
  await page.getByRole('button', { name: '' }).click();
  await page.waitForTimeout(4000);

  console.log('Navigating to Reports...');
  await page.getByRole('button', { name: ' Documents ' }).click();
  await page.getByRole('link', { name: ' Reports' }).click();
  await page.waitForTimeout(3000);

  // Search for Customers details
  console.log('Searching for "Customers details"...');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Cus');
  await page.waitForTimeout(3000);

  // Select the row containing 'Customers details'
  console.log('Selecting "Customers details"...');
  const customerRow = page.locator('tr').filter({ hasText: 'Customers detailsPath :: /' }).locator('span').first();
  await customerRow.click(); // Click checkbox
  await page.waitForTimeout(2000);

  console.log('Double-clicking to open the dialog box...');
  await customerRow.dblclick(); // Open dialog box
  await page.waitForTimeout(2000);

  // Set report parameters
  console.log('Setting report parameters...');
  await page.getByText('Parameter', { exact: true }).click();
  await page.waitForTimeout(2000);

  await page.locator('[id="rp_Customer\\ Name"]').click();
  await page.waitForTimeout(2000);

  await page.locator('[id="rp_Customer\\ Name"]').fill('112');
  await page.waitForTimeout(2000);

  // Schedule Report
  console.log('Opening Schedule tab...');
  await page.getByRole('tab', { name: 'Schedule' }).locator('a').click();
  await page.waitForTimeout(2000);

  await page.getByText('Time').click();
  await page.waitForTimeout(2000);

  await page.locator('div:nth-child(2) > .p-element > .p-radiobutton > .p-radiobutton-box').first().click();
await page.waitForTimeout(2000);

await page.locator('p-calendar').getByRole('button').click();
await page.waitForTimeout(2000);

await page.getByText('30', { exact: true }).nth(1).click();
await page.waitForTimeout(2000);

await page.getByText('1', { exact: true }).click();
await page.waitForTimeout(2000);

await page.getByRole('option', { name: '1' }).click();
await page.waitForTimeout(2000);

await page.getByText('mins').click();
await page.waitForTimeout(2000);

await page.getByLabel('5 mins', { exact: true }).getByText('mins').click();
await page.waitForTimeout(2000);

await page.locator('#pr_id_10_label').click();
await page.waitForTimeout(2000);

await page.getByLabel('Admin', { exact: true }).getByText('Admin').click();
await page.waitForTimeout(2000);

await page.locator('.p-checkbox-box').first().click();
await page.waitForTimeout(2000);

await page.locator('div').filter({ hasText: /^Users$/ }).locator('span').click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Search' }).click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Search' }).fill('Demo');
await page.waitForTimeout(2000);

await page.getByText('Private').click();
await page.waitForTimeout(2000);

await page.getByRole('option', { name: 'label_internal' }).click();
await page.waitForTimeout(2000);

await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
await page.waitForTimeout(2000);

await page.getByText('Output', { exact: true }).click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).click();
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).press('ControlOrMeta+a');
await page.waitForTimeout(2000);

await page.getByRole('textbox', { name: 'Enter Name' }).fill('Once Customer Details');
await page.waitForTimeout(2000);

await page.getByText('Select Suffix').click();
await page.waitForTimeout(2000);

await page.getByText('yyyyddMM', { exact: true }).click();
await page.waitForTimeout(2000);

await page.locator('#pr_id_5_label').click();
await page.waitForTimeout(1000);

await page.getByLabel('docx').getByText('docx').click();
await page.waitForTimeout(1000);

await page.getByRole('button', { name: '' }).click();
await page.waitForTimeout(1000);

await page.getByText('Report', { exact: true }).click();
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(1000);

await page.locator('p-checkbox').filter({ hasText: 'Delivery Path' }).locator('div').nth(2).click();
await page.waitForTimeout(1000);

await page.locator('div').filter({ hasText: /^Delivery PathReplace Default$/ }).getByRole('button').click();
await page.waitForTimeout(1000);

await page.getByRole('treeitem', { name: ' docx', exact: true }).locator('label').click();
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForTimeout(1000);

await page.locator('p-checkbox').filter({ hasText: 'Replace Default' }).locator('div').nth(2).click();
await page.waitForTimeout(1000);

const page1Promise = page.waitForEvent('popup');
await page.waitForTimeout(2000);

const downloadPromise = page.waitForEvent('download');
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Run', exact: true }).click();
await page.waitForTimeout(2000);

const page1 = await page1Promise;
await page.waitForTimeout(2000);

const download = await downloadPromise;
await page.waitForTimeout(2000);

// await page.getByRole('gridcell', { name: 'Select row ' }).locator('span').first().click();
//   await page.getByRole('button', { name: '' }).click();
//   await page.getByRole('button', { name: ' Documents ' }).click();
//   await page.getByRole('button', { name: ' Request ' }).click();
//   await page.getByRole('link', { name: ' Requests' }).click();
//   await page.getByRole('gridcell', { name: 'Once', exact: true }).click();

// await page.getByRole('button', { name: '' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('button', { name: ' Documents ' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('button', { name: ' Request ' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('link', { name: ' Requests' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('link', { name: ' Schedule' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('link', { name: ' Waiting For Event' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('link', { name: 'Running' }).click();
// await page.waitForTimeout(2000);

// await page.getByRole('link', { name: 'Completed' }).click();
// await page.waitForTimeout(2000);

// console.log("Test completed successfully!");

});
