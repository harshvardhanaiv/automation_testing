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

//     // Search for alerts
//     console.log("Searching for 'Tests' alert...");
//     const searchBox = await page.getByRole('textbox', { name: 'Search' });
//     await searchBox.click();
//     await searchBox.fill('Tests');
//     await page.waitForTimeout(4000);

//     // Click the first alert row
//     console.log("Clicking first alert row...");
//     const alertRow = await page.getByRole('row', { name: 'Select row is template cell column header is template cell column header File Name alert Admin is template cell column header Last Updated is template cell column header Options', exact: true });
//     await alertRow.locator('span').first().click();
//     await page.waitForTimeout(4000);

//     // Copy the alert
//     console.log("Clicking Copy button...");
//     await page.locator('a').filter({ hasText: 'Copy' }).click();
//     await page.waitForTimeout(3000);

//     // Fill the new alert name
//     console.log("Filling in the new alert name...");
//     const alertNameInput = await page.locator('input[name="name"]');
//     await alertNameInput.click();
//     await alertNameInput.fill('Copy_Testing');
//     await page.waitForTimeout(3000);

//     // Create Folder for the alert
//     console.log("Creating Folder for the alert...");
//     const createFolderButton = await page.getByRole('button', { name: 'Create Folder' });
//     await createFolderButton.click();
//     await page.waitForTimeout(3000);

//     // Define the folder name input and submit button
//     const folderNameInput = await page.locator('#mat-mdc-dialog-1').getByRole('textbox');
//     await folderNameInput.fill('Copy_testing');

//     // Find the folder creation submit button and click it
//     const createFolderSubmitButton = await page.locator('#mat-mdc-dialog-1').getByRole('button', { name: 'Create Folder' });
//     await createFolderSubmitButton.click();
//     await page.waitForTimeout(3000);

//     // Confirm the copy action
//     console.log("Confirming Copy...");
//     await page.getByRole('button', { name: 'Copy' }).click();
//     await page.waitForTimeout(3000);

//     console.log("Test Completed!");
// });
// import * as dotenv from 'dotenv';
// dotenv.config();
// import { test } from '@playwright/test';

// test('Login and Perform Alert Actions with Delays', async ({ page }) => {
//     // Set a longer timeout for the test
//     test.setTimeout(600000); // 10 minutes

//     // Validate required environment variables
//     const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;
//     if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
//         throw new Error('One or more environment variables are missing in the .env file');
//     }

//     // Step 1: Navigate to the application URL
//     console.log("Navigating to application URL...");
//     await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
//     await page.waitForTimeout(5000); // Wait to ensure the page fully loads

//     // Step 2: Perform login
//     console.log("Logging in...");
//     await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
//     await page.waitForTimeout(2000); // Wait after entering the username
//     await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
//     await page.waitForTimeout(2000); // Wait after entering the password
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForTimeout(5000); // Wait for the dashboard to load after login

//     // Step 3: Navigate to Alerts
//     console.log("Navigating to Alerts...");
//     await page.getByRole('button', { name: '' }).click();
//     await page.waitForTimeout(2000); // Wait after opening the menu
//     await page.getByRole('button', { name: ' Request ' }).click();
//     await page.waitForTimeout(2000); // Wait after clicking on the Request menu
//     await page.getByRole('link', { name: ' Alerts' }).click();
//     await page.waitForTimeout(4000); // Wait for the Alerts page to load

//     await page.getByRole('textbox', { name: 'Search' }).click();
//     await page.getByRole('textbox', { name: 'Search' }).fill('Tests');
//     await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
//     await page.locator('a').filter({ hasText: 'Copy' }).click();
//     await page.locator('input[name="name"]').click();
//     await page.locator('input[name="name"]').fill('Copy_Testing');
//     await page.locator('app-tree-common-modal p-scrollpanel div').filter({ hasText: 'Root' }).nth(2).click();
//     await page.getByRole('button', { name: 'Copy' }).click();
//     await page.getByRole('button', { name: 'Create Folder' }).click();
//     await page.locator('#mat-mdc-dialog-1').getByRole('textbox').fill('Testing');
//     await page.locator('#mat-mdc-dialog-1').getByRole('button', { name: 'Create Folder' }).click();
//     await page.getByRole('button', { name: 'Copy' }).click();

//     console.log("Test Completed Successfully!");
// });

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

    // Fill in the name field
    console.log("Filling in name...");
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill('Copy_Testing');
    await page.waitForTimeout(2000); // Wait after filling in the name

    // Wait for the modal with the "Root" text to appear
    console.log("Selecting 'Root' in modal...");
    await page.locator('app-tree-common-modal p-scrollpanel div').filter({ hasText: 'Root' }).nth(2).click();
    await page.waitForTimeout(2000); // Wait for the selection to register

    // Click on "Copy" again
    console.log("Clicking 'Copy'...");
    await page.getByRole('button', { name: 'Copy' }).click();
    await page.waitForTimeout(3000); // Wait for the copy action to complete

    // // Open "Create Folder" dialog and wait for the dialog to appear
    // console.log("Clicking 'Create Folder'...");
    // await page.getByRole('button', { name: 'Create Folder' }).click();
    // await page.waitForTimeout(2000); // Wait for the folder dialog to appear

    // // Fill in the folder name and click "Create Folder"
    // console.log("Filling in folder name...");
    // await page.locator('#mat-mdc-dialog-1').getByRole('textbox').fill('Testing');
    // await page.waitForTimeout(2000); // Wait after entering the folder name

    // console.log("Clicking 'Create Folder'...");
    // await page.locator('#mat-mdc-dialog-1').getByRole('button', { name: 'Create Folder' }).click();
    // await page.waitForTimeout(3000); // Wait for folder creation to complete

    // // Final copy action
    // console.log("Clicking 'Copy' again...");
    // await page.getByRole('button', { name: 'Copy' }).click();
    // await page.waitForTimeout(2000); // Wait for the final copy action to complete

    console.log("Test Completed Successfully!");
});
