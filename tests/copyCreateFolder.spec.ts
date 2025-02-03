import * as dotenv from 'dotenv';
dotenv.config();
import { test } from '@playwright/test';

test('Login and Perform Alert Actions with Delays', async ({ page }) => {
    // Set a longer timeout for the test
    test.setTimeout(600000); // 10 minutes

    // Validate required environment variables
    const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;
    if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
        throw new Error('One or more environment variables are missing in the .env file');
    }

    // Step 1: Navigate to the application URL
    console.log("Navigating to application URL...");
    await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(5000); // Wait to ensure the page fully loads

    // Step 2: Perform login
    console.log("Logging in...");
    await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
    await page.waitForTimeout(2000); // Wait after entering the username
    await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
    await page.waitForTimeout(2000); // Wait after entering the password
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(5000); // Wait for the dashboard to load after login

    // Step 3: Navigate to Alerts
    console.log("Navigating to Alerts...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(2000); // Wait after opening the menu
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.waitForTimeout(2000); // Wait after clicking on the Request menu
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(4000); // Wait for the Alerts page to load

    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('Tests');
    await page.waitForTimeout(2000); // Wait for search results to load
    await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
    await page.waitForTimeout(2000); // Wait after selecting a row

    // Click on "Copy" and wait for the modal to open
    console.log("Clicking 'Copy'...");
    await page.locator('a').filter({ hasText: 'Copy' }).click();
    await page.waitForTimeout(2000); // Wait before filling the name

    // Wait for the Create Folder modal to be visible
    console.log("Waiting for the Create Folder modal...");
    await page.locator('#mat-mdc-dialog-1').waitFor({ state: 'visible' });

    // Fill in the name field
    console.log("Filling in name...");
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('Copy_Testing');
    await page.waitForTimeout(2000); // Wait after filling in the name

    // Click the Create Folder button inside the modal
    console.log("Clicking 'Create Folder'...");
    await page.locator('#mat-mdc-dialog-1').getByRole('button', { name: 'Create Folder' }).click();

    // Wait for the folder to be created and visible
    await page.getByRole('treeitem', { name: ' Copy_Test', exact: true }).getByRole('listitem').click();

    // Click on "Copy" again
    console.log("Clicking 'Copy'...");
    await page.getByRole('button', { name: 'Copy' }).click();
});
