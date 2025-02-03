import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

test('Login and Share Alert Test', async ({ page }) => {
    // Load environment variables
    const {
        AIV_BASE_URL,
        AIV_USERNAME,
        AIV_PASSWORD,
        DEMO_USERNAME,
        DEMO_PASSWORD
    } = process.env;

    // Validate environment variables
    if (!AIV_BASE_URL || !AIV_USERNAME || !AIV_PASSWORD || !DEMO_USERNAME || !DEMO_PASSWORD) {
        throw new Error('One or more environment variables are missing in the .env file');
    }

    // Function for login
    const login = async (username, password) => {
        console.log("Filling in email...");
        await page.getByRole('textbox', { name: 'Your email' }).fill(username);
        console.log("Filling in password...");
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        console.log("Clicking login button...");
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForTimeout(5000); // Wait for the dashboard to load
    };

    // Admin login
    console.log("Logging in as admin...");
    await page.goto(AIV_BASE_URL, { waitUntil: 'load' });
    await login(AIV_USERNAME, AIV_PASSWORD);

    // Navigate through menus
    console.log("Navigating through menus...");
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(3000);

    // Select and share the alert
    console.log("Selecting an alert to share...");
    await page.locator('tr').filter({ hasText: 'TestsPath :: /alertAdmin2025-' }).locator('span').first().click();
    await page.locator('a').filter({ hasText: /^Share$/ }).click();
    await page.waitForTimeout(2000);

    console.log("Selecting user to share with...");
    await page.locator('div').filter({ hasText: /^Users$/ }).locator('span').click();
    await page.getByRole('textbox', { name: 'Search' }).fill('Demo');
    await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'label_public' }).click();
    await page.getByRole('button', { name: 'Share' }).click();
    await page.waitForTimeout(2000);

    // Admin logout
    console.log("Logging out as admin...");
    await page.getByRole('link', { name: 'AdminProfile-Image' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);

    // Demo login
    console.log("Logging in as demo...");
    await login(DEMO_USERNAME, DEMO_PASSWORD);
  
    // Navigate to Alerts as Demo
    console.log("Navigating to Alerts as Demo...");
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: ' Request ' }).click();
    await page.getByRole('link', { name: ' Alerts' }).click();
    await page.waitForTimeout(1000);
  
    console.log("Test completed.");
});


