import { test, expect } from '@playwright/test';
import path from 'path'; // Node.js module for handling paths

test('test file upload from assets folder', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:8080/aiv/');

  // Login steps
  await page.getByRole('textbox', { name: 'Your email' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for the page to load before continuing
  await page.waitForTimeout(2000);

  // Navigate to the upload section
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: ' Request ' }).click();
  await page.getByRole('link', { name: ' Alerts' }).click();

  // Wait for upload link to appear and click it
  await page.locator('a').filter({ hasText: 'Upload' }).click();

  // Click on the upload button (ensure it matches the right selector)
  await page.getByRole('button', { name: '' }).click();
  
  // Correct file path using path.resolve()
  const filePath = path.resolve(__dirname, '..', 'assets', 'Table Widget .pdf');
  console.log('File path:', filePath); // Log the file path for debugging

  // Set input files using the correct locator and ensure the file is set correctly
  const inputFileLocator = page.locator('input[type="file"]');
  await inputFileLocator.setInputFiles(filePath);

  // Click on the button related to creating new (or any other appropriate action)
  await page.locator('div').filter({ hasText: /^Create newReplace Default$/ }).locator('span').first().click();

  // Fill the textboxes as required
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Table Widget');
  await page.getByText('Privilege', { exact: true }).click();
  await page.locator('#mat-mdc-dialog-0 svg').click();
  await page.locator('div').filter({ hasText: /^Users$/ }).locator('span').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Demo');
  await page.getByText('Private').click();
  await page.getByRole('option', { name: 'label_internal' }).click();
  await page.getByRole('gridcell', { name: 'Select row' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();

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

  console.log("File uploaded successfully and logged out.");

});

