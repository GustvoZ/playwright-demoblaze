const { test, expect } = require('@playwright/test');

const { HomePage } =  require('../pages/HomePage');


test.describe('Category Navigation and API Interception', () => {

  const categories = [
    { name: 'All', endpoint: '**/entries' },
    { name: 'Phones', endpoint: '**/bycat' },
    { name: 'Laptops', endpoint: '**/bycat' },
    { name: 'Monitors', endpoint: '**/bycat' }
  ];

  for (const category of categories) {

    test(`should correctly filter products for category: ${category.name}`, async ({ page }) => {
      
      console.log(`--- Iniciando teste para a categoria: ${category.name} ---`);
      
      // Instancia o Page Object
      const homePage = new HomePage(page);
      await homePage.navigate();

      // Observa o endpoint dinâmico da nossa lista.
      const responsePromise = page.waitForResponse(category.endpoint);

      // Usando o metodo flexivel de categoria.
      await homePage.selectCategory(category.name);

      // Capta e processo a resposta
      const response = await responsePromise;
      const responseJson = await response.json();
      const itemsFromApi = responseJson.Items;
      
      console.log(`API respondeu com ${itemsFromApi.length} produto(s).`);
      expect(itemsFromApi.length).toBeGreaterThan(0);

      // Verifica a UI
      const productsOnPage = page.locator('#tbodyid .card');
      await expect(productsOnPage).toHaveCount(itemsFromApi.length);
      console.log(`Verificação da UI: ${await productsOnPage.count()} produto(s) renderizado(s) na página.`);
      
      console.log('--- Teste finalizado com sucesso ---');
    });
  }

});