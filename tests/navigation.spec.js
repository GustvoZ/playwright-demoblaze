import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {

    test('should load the homepage and see the site title', async ({ page }) => {
    // 1. Ação: Navegar para a página
    await page.goto('https://www.demoblaze.com/');

    // 2. Verificação: Garantir que o título/logo "PRODUCT STORE" está visível
    const pageTitle = page.locator('#nava'); // O logo tem o ID 'nava'

    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText('PRODUCT STORE');
  });


});





