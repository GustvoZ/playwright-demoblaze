import { test, expect } from '@playwright/test';

const { HomePage } =  require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Shopping Cart Functionality', () => {

  test('should display a confirmation alert when adding an item to the cart', async ({ page }) => {
    console.log('--- Iniciando teste: Adicionar item e validar alerta de confirmação ---');

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    page.on('dialog', async dialog => {
      console.log(`Diálogo capturado. Mensagem: "${dialog.message()}"`);
        expect(dialog.message()).toEqual('Product added.');
      
      console.log('Aceitando o diálogo...');
      await dialog.accept();
    });

    await homePage.navigate();
    await homePage.productName('Samsung galaxy s6');
    await productPage.addToCart();

    console.log('--- Teste finalizado com sucesso ---');
  });


});