import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {

    test('should load the homepage and see the site title', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    const pageTitle = page.locator('#nava');

    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText('PRODUCT STORE');
  });


});





