import * as dotenv from 'dotenv';
dotenv.config();
import { test } from '@playwright/test';

test('Login Test with Longer Delays', async ({ page }) => {
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
});
