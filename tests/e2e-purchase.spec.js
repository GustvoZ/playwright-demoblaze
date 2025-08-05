const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
// Vamos precisar de mais Page Objects na refatoração

test.describe('Full E2E Purchase Flow', () => {

  // 1. DEFINIR OS PRODUTOS
  const productsToAdd = [
    { name: 'Samsung galaxy s6', id: '1', price: 360 },
    { name: 'Sony vaio i7', id: '9', price: 790 }
  ];


  test('should add multiple items, validate API requests, check total price, and complete purchase', async ({ page }) => {
    console.log('--- Iniciando teste E2E de compra múltipla ---');
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    // Adiciona itens para esperar na api
    for (const product of productsToAdd) {
      console.log(`Adicionando o produto: ${product.name}`);
      
      // Configura para obesrvar a API /addtocart
      // Usando page.route() para ter acesso à (request)
      await page.route('**/addtocart', async route => {
        const request = route.request();
        const requestBody = await request.postDataJSON();
        
        console.log(`API /addtocart chamada com o corpo: ${JSON.stringify(requestBody)}`);
        // verificacao da api: O ID no corpo da requisição é o esperado?
        expect(requestBody.prod_id).toEqual(Number(product.id));
        
        // Deixa a requisição continuar normalmente para o servidor
        await route.continue();
      });

      // Navega e adiciona os produtos
      await homePage.navigate();
      await homePage.productName(product.name);
      await productPage.addToCart();

      // Remove a rota para não interferir na próxima iteração do loop (para que ele não intercepte chamadas futuras desnecessariamente.)
      await page.unroute('**/addtocart');
    }

    // Valida o carrinho
    console.log('Navegando para o carrinho para validar o total...');
    await page.goto('https://www.demoblaze.com/cart.html');
    
    // Espera a tabela do carrinho carregar com os dois itens
    await page.locator('.success').nth(1).waitFor();

    const totalFromUI = await page.locator('#totalp').textContent();
    console.log(`Total exibido na UI: ${totalFromUI}`);

    // Calcula o total esperado somando os preços dos produtos
    const expectedTotal = productsToAdd.reduce((sum, product) => sum + product.price, 0);
    console.log(`Total esperado (calculado): ${expectedTotal}`);
    
    // Verificao do valor total: O total da UI é igual à nossa soma?
    // Usando Number() para converter o texto da UI em número
    expect(Number(totalFromUI)).toEqual(expectedTotal);

    // Finalizacao da compra
    console.log('Iniciando o processo de checkout...');
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Preenche o formulário no modal
    await page.locator('#name').fill('Gustavo QA');
    await page.locator('#country').fill('Brazil');
    await page.locator('#city').fill('Curitiba');
    await page.locator('#card').fill('1234567890123456');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2028');

    await page.getByRole('button', { name: 'Purchase' }).click();

    // Final: A mensagem de sucesso apareceu?
    await expect(page.locator('h2', { hasText: 'Thank you for your purchase!' })).toBeVisible();
    
    console.log('--- Teste E2E finalizado com sucesso ---');
  });
});