const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('General Modals Functionality', () => {

  test('should open, display, and close the "About us" modal', async ({ page }) => {
    console.log('--- Iniciando teste do modal "About us" ---');
    
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Clica no link "About us" para abrir o modal.
    // Inspeciona, para ver se esta está no navbar.
    console.log('Clicando em "About us"...');
    await page.getByRole('link', { name: 'About us' }).click();

    // Verifica se o modal deve estar visível.
    // O modal tem o ID 'videoModal'.
    const aboutUsModal = page.locator('#videoModal');
    await expect(aboutUsModal).toBeVisible();
    console.log('Modal está visível.');
    
    // Veriifica se o título do modal deve ser "About us".
    const modalTitle = aboutUsModal.locator('.modal-title');
    await expect(modalTitle).toHaveText('About us');
    console.log('Título do modal verificado.');

    // Clica no botão "Close" para fechar o modal.
    const closeButton = aboutUsModal.locator('.modal-footer').getByRole('button', { name: 'Close' });
    console.log('Clicando para fechar o modal...');
    await closeButton.click();

    // Verifica se o modal deve esta oculto após o fechamento.
    // .toBeHidden() é o oposto de .toBeVisible().
    await expect(aboutUsModal).toBeHidden();
    console.log('Modal foi fechado com sucesso.');

    console.log('--- Teste do modal "About us" finalizado com sucesso ---');
  });

});