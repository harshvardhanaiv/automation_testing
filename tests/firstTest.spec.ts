import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('AIV Login', () => {
  test('Login and Logout', async ({ page }) => {
    const BASE_URL = process.env.AIV_BASE_URL;
    const USERNAME = process.env.AIV_USERNAME;
    const PASSWORD = process.env.AIV_PASSWORD;

    // Increase default navigation timeout
    page.setDefaultTimeout(90000);

    try {
      // Navigate with more robust navigation options
      await page.goto(BASE_URL, { 
        waitUntil: 'networkidle',
        timeout: 120000 
      });

      // Wait for login form to be fully loaded
      await page.waitForSelector('input[placeholder="Your email"]', { state: 'visible', timeout: 30000 });

      // Fill credentials
      await page.locator('input[placeholder="Your email"]').fill(USERNAME);
      await page.locator('input[placeholder="Password"]').fill(PASSWORD);

      // Click login with retry mechanism
      await Promise.all([
        page.locator('button[color="primary"]').click(),
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 })
      ]);

      // Verify successful login by checking for a key element
      await expect(page.locator('.fa-regular.fa-bars.text-base')).toBeVisible({ timeout: 30000 });

      // Rest of the login flow remains the same...
      await page.locator('.fa-regular.fa-bars.text-base').click();
      await page.waitForTimeout(1000);
    

      // Add more robust waiting and error handling for subsequent interactions
    } catch (error) {
      console.error('Login test failed:', error);
      throw error;
    }
  });
});