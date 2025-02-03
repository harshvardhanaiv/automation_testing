import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

test('Login and Create Alert Test', async ({ page }) => {
    // Load environment variables
    const { AIV_BASE_URL, AIV_USERNAME, AIV_PASSWORD } = process.env;

    // Validate environment variables
    if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD) {
        throw new Error('One or more environment variables are missing in the .env file');
    }

    // Navigate to the application URL
    console.log("Navigating to application URL...");
    await page.goto(AIV_BASE_URL, { waitUntil: 'load' });

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
    await page.getByRole('textbox', { name: 'Search' }).fill('Testing_Alert');
    await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
    await page.locator('a').filter({ hasText: 'Delete' }).click();
    await page.getByRole('checkbox', { name: 'All versions' }).check();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(2000);
});

