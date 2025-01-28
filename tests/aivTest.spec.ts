// import * as dotenv from 'dotenv';
// dotenv.config();
// import { test } from '@playwright/test';

// test('Login and Create Alert Test with Longer Delays', async ({ page }) => {
//     // Set a longer timeout for the test
//     test.setTimeout(600000); // 10 minutes

//     // Check if required environment variables are defined
//     const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;
//     if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
//         throw new Error('One or more environment variables are missing in the .env file');
//     }

//     // Navigate to the application URL
//     console.log("Navigating to application URL...");
//     await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
//     await page.waitForTimeout(5000); // Longer delay for observation

//     // Perform login
//     console.log("Filling in email...");
//     await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
//     await page.waitForTimeout(4000); // Longer delay to observe typing email

//     console.log("Filling in password...");
//     await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
//     await page.waitForTimeout(4000); // Longer delay to observe typing password

//     console.log("Clicking login button...");
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForTimeout(6000); // Longer delay for page loading

//     // Navigate through menus and access Alerts
//     console.log("Opening menu...");
//     await page.getByRole('button', { name: '' }).click();
//     await page.waitForTimeout(4000); // Delay for observing menu click

//     console.log("Accessing Requests menu...");
//     await page.getByRole('button', { name: ' Request ' }).click();
//     await page.waitForTimeout(4000);

//     console.log("Navigating to Alerts...");
//     await page.getByRole('link', { name: ' Alerts' }).click();
//     await page.waitForTimeout(4000);

//     console.log("Clicking Create Alert...");
//     await page.locator('a').filter({ hasText: 'Create' }).click();
//     await page.waitForTimeout(5000);

//     // Fill in alert details
//     console.log("Filling in alert name...");
//     await page.locator('input[name="name"]').fill('Testing Dataset');
//     await page.waitForTimeout(4000);

//     console.log("Filling in alert description...");
//     await page.locator('input[name="description"]').fill('Sales Dataset');
//     await page.waitForTimeout(4000);

//     console.log("Selecting Dataset checkbox...");
//     await page.locator('p-checkbox').filter({ hasText: 'Dataset' }).locator('div').nth(2).click();
//     await page.waitForTimeout(4000);

//     // Wait for the search textbox to be visible
//     console.log("Waiting for page load...");
//     await page.waitForLoadState('load'); // Ensure page has fully loaded

//     console.log("Waiting for search textbox...");
//     await page.waitForSelector('input[placeholder="Search by name or type pipeline | cd | ds | stash"]', {
//         state: 'visible',
//         timeout: 20000 // Increased timeout to ensure the element loads
//     });

//     console.log("Clicking search textbox...");
//     await page.getByRole('textbox', { name: 'Search by name or type' }).click();

//     // Fill the search input with 'sales'
//     console.log("Filling search with 'sales'...");
//     await page.getByRole('textbox', { name: 'Search by name or type' }).fill('sales');
//     await page.waitForTimeout(3000); // Wait for search suggestions to appear

//     // Wait for the search results to appear
//     console.log("Waiting for search results...");
//     await page.waitForSelector('text=Sales.cds', { state: 'visible', timeout: 10000 });

//     // Selecting the 'Sales.cds' dataset
//     console.log("Selecting Sales dataset...");
//     await page.locator('text=Sales.cds').click();
//     await page.waitForTimeout(5000); // Wait after selecting dataset

//     console.log("Test Completed!");
// });

import * as dotenv from 'dotenv';
dotenv.config();
import { test } from '@playwright/test';

test('Login and Create Alert Test with Longer Delays', async ({ page }) => {
    // Set a longer timeout for the test
    test.setTimeout(600000); // 10 minutes

    // Check if required environment variables are defined
    const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;
    if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
        throw new Error('One or more environment variables are missing in the .env file');
    }

    // Navigate to the application URL
    console.log("Navigating to application URL...");
    await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(5000); // Longer delay for observation

    // Perform login
    console.log("Filling in email...");
    await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
    await page.waitForTimeout(4000); // Longer delay to observe typing email

    console.log("Filling in password...");
    await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
    await page.waitForTimeout(4000); // Longer delay to observe typing password

    console.log("Clicking login button...");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(6000); // Longer delay for page loading

    // Navigate through menus and access Alerts
    console.log("Opening menu...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(4000); // Delay for observing menu click

    console.log("Accessing Requests menu...");
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.waitForTimeout(4000);

    console.log("Navigating to Alerts...");
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(4000);
  await page.locator('a').filter({ hasText: 'Create' }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Creating Alert');
  await page.locator('input[name="description"]').click();
  await page.locator('input[name="description"]').fill('Sales Dataset');
  await page.locator('p-checkbox').filter({ hasText: 'Dataset' }).locator('div').nth(2).click();
  await page.locator('#mat-mdc-dialog-0 div').filter({ hasText: /^empty$/ }).click();
  await page.getByRole('textbox', { name: 'Search by name or type' }).click();
  await page.getByRole('textbox', { name: 'Search by name or type' }).fill('sales');
  await page.getByLabel('Sales', { exact: true }).getByText('Sales.cds').click();
  await page.locator('#querybuilder_group0_rule0').getByLabel('', { exact: true }).dblclick();
  await page.getByRole('option', { name: 'country', exact: true }).click();
  await page.getByRole('combobox', { name: 'Starts With' }).dblclick();
  await page.getByRole('option', { name: 'Equal', exact: true }).dblclick();
  await page.getByRole('textbox', { name: 'Enter Value' }).click();
  await page.getByRole('textbox', { name: 'Enter Value' }).fill('USA');
  await page.locator('p-checkbox').filter({ hasText: 'Success' }).locator('div').nth(2).dblclick();
  await page.locator('p-checkbox').filter({ hasText: 'Success' }).locator('div').nth(2).click();

});