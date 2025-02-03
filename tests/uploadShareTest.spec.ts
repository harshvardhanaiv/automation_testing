import * as dotenv from 'dotenv';
dotenv.config();
import { test } from '@playwright/test';
import * as path from 'path'; // Importing path

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
    await page.waitForTimeout(4000); // Wait to observe typing email

    console.log("Filling in password...");
    await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
    await page.waitForTimeout(4000); // Wait to observe typing password

    console.log("Clicking login button...");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(6000); // Wait for page loading

    // Navigate through menus and access Alerts
    console.log("Opening menu...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(4000); // Wait to observe menu click

    console.log("Accessing Requests menu...");
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.waitForTimeout(4000);

    console.log("Navigating to Alerts...");
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(4000);

    // Wait for upload link to appear and click it
    console.log("Clicking upload link...");
    await page.locator('a').filter({ hasText: 'Upload' }).click();
    await page.waitForTimeout(4000);

    // Click on the upload button (ensure it matches the right selector)
    console.log("Clicking upload button...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(4000);

    // Correct file path using path.resolve()
    const filePath = path.resolve(__dirname, '..', 'assets', 'Table Widget .png');
    console.log('File path:', filePath); // Log the file path for debugging

    // Upload the file
    console.log("Uploading file...");
    await page.setInputFiles('input[type="file"]', filePath);
    await page.waitForTimeout(5000); // Wait for file upload to complete

    // Set input files using the correct locator and ensure the file is set correctly
    const inputFileLocator = page.locator('input[type="file"]');
    await inputFileLocator.setInputFiles(filePath);
    await page.waitForTimeout(5000);

    // Click on the button related to creating new (or any other appropriate action)
    console.log("Creating new alert...");
    await page.locator('div').filter({ hasText: /^Create newReplace Default$/ }).locator('span').first().click();
    await page.waitForTimeout(4000);

    // Fill the textboxes as required
    console.log("Filling details...");
    await page.getByRole('textbox').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('textbox').nth(1).fill('Table Widget Image');
    await page.waitForTimeout(2000);
    await page.getByText('Privilege', { exact: true }).click();
    await page.waitForTimeout(2000);
    await page.locator('#mat-mdc-dialog-0 svg').click();
    await page.waitForTimeout(2000);
    await page.locator('div').filter({ hasText: /^Users$/ }).locator('span').click();
    await page.waitForTimeout(2000);

    // Continue with other actions and add delays as needed
    console.log("Finalizing alert creation...");
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('Demo');
    await page.waitForTimeout(2000);
    await page.getByText('Private').click();
    await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
    await page.getByRole('option', { name: 'label_internal' }).click();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.waitForTimeout(4000);

    // Logout and verify
    console.log("Logging out...");
    await page.getByRole('link', { name: 'AdminProfile-Image' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();
    await page.waitForTimeout(4000);

    // Additional login and navigation for demonstration purposes
    console.log("Logging in with demo credentials...");
    await page.getByRole('textbox', { name: 'Your email' }).click();
    await page.getByRole('textbox', { name: 'Your email' }).fill(process.env.DEMO_USERNAME || 'Demo');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.DEMO_PASSWORD || 'password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(4000);

    console.log("Navigating to Alerts as Demo user...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'DemoProfile-Image' }).click();
    await page.locator('#mat-menu-panel-0').getByText('Logout').click();

    console.log("File uploaded successfully and logged out.");

     // Perform login
     console.log("Filling in email...");
     await page.getByRole('textbox', { name: 'Your email' }).fill(AIV_USERNAME);
 
     console.log("Filling in password...");
     await page.getByRole('textbox', { name: 'Password' }).fill(AIV_PASSWORD);
 
     console.log("Clicking login button...");
     await page.getByRole('button', { name: 'Login' }).click();
 
     // Wait for the dashboard or next step
     await page.waitForTimeout(5000);
 
     // Proceed with the rest of the test...
     console.log("Navigating through menus...");
     await page.getByRole('button', { name: '' }).click();
     await page.getByRole('button', { name: ' Request ' }).click();
     await page.getByRole('link', { name: ' Alerts' }).click();
     await page.getByRole('textbox', { name: 'Search' }).click();
     await page.getByRole('textbox', { name: 'Search' }).fill('Table Widget');
     await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
     await page.locator('a').filter({ hasText: 'Delete' }).click();
     await page.getByRole('checkbox', { name: 'All versions' }).check();
     await page.waitForTimeout(2000);
     await page.getByRole('button', { name: 'Delete' }).click();
     await page.waitForTimeout(2000);

});
