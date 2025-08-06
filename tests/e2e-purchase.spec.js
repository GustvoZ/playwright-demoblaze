const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { PlaceOrderModal } = require('../pages/PlaceOrderModal');

test.describe('Full E2E Purchase Flow', () => {

  const productsToAdd = [
    { name: 'Samsung galaxy s6', id: '1', price: 360 },
    { name: 'Sony vaio i7', id: '9', price: 790 }
  ];

  test('should add multiple items, validate total price, and complete purchase', async ({ page }) => {
    console.log('--- Iniciando teste E2E de compra múltipla ---');
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const placeOrderModal = new PlaceOrderModal(page);
    
    for (const product of productsToAdd) {
      console.log(`Adicionando o produto: ${product.name}`);
      await homePage.navigate();
      await homePage.selectProduct(product.name);


      page.once('dialog', dialog => dialog.accept());
      
      await Promise.all([
      page.waitForEvent('dialog'),
      productPage.addToCart()   
  ]);
    }

    console.log('Validando o carrinho e o total...');
    await cartPage.navigate();
    await cartPage.waitForNumberOfProducts(productsToAdd.length);

    const totalFromUI = await cartPage.getTotalPrice();
    const expectedTotal = productsToAdd.reduce((sum, product) => sum + product.price, 0);
    expect(totalFromUI).toEqual(expectedTotal);

    console.log('Iniciando o processo de checkout...');
    await cartPage.placeOrder();
    await expect(placeOrderModal.modal).toBeVisible();

    const orderDetails = {
      name: 'Gustavo QA', country: 'Brazil', city: 'Curitiba',
      card: '1234567890123456', month: '12', year: '2028'
    };
    await placeOrderModal.fillOrderDetails(orderDetails);
    await placeOrderModal.purchase();

    await expect(placeOrderModal.successMessage).toBeVisible();
    
    console.log('--- Teste E2E finalizado com sucesso ---');
  });
});