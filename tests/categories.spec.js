const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Category Filtering and API Validation', () => {

  const categories = [
    { name: 'Phones', endpoint: '**/bycat', apiKeyword: 'phone' },
    { name: 'Laptops', endpoint: '**/bycat', apiKeyword: 'notebook' },
    { name: 'Monitors', endpoint: '**/bycat', apiKeyword: 'monitor' }
  ];

  for (const category of categories) {

    test(`should correctly filter products for category: ${category.name}`, async ({ page }) => {
      console.log(`--- Iniciando teste para a categoria: ${category.name} ---`);
      
      const homePage = new HomePage(page);
      await homePage.navigate();

      const responsePromise = page.waitForResponse(category.endpoint);

      await homePage.selectCategory(category.name);

      const response = await responsePromise;
      const responseJson = await response.json();
      const itemsFromApi = responseJson.Items;
      
      console.log(`API respondeu com ${itemsFromApi.length} produto(s).`);

      const requestBody = await response.request().postDataJSON();
      expect(requestBody.cat).toEqual(category.apiKeyword);
      expect(itemsFromApi.length).toBeGreaterThan(0);

      const productsOnPageCount = await homePage.getProductCount();
      expect(productsOnPageCount).toEqual(itemsFromApi.length);
      console.log(`Verificação da UI: ${productsOnPageCount} produto(s) renderizado(s) na página.`);
      
      console.log('--- Teste finalizado com sucesso ---');
    });
  }
});