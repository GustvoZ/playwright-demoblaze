const { test, expect } = require('@playwright/test');

const { HomePage } = require('../pages/HomePage');

test.describe('Homepage Carousel Functionality', () => {


  test('should have 3 slides and each slide must have a valid image source', async ({ page }) => {
    console.log('--- Iniciando teste de integridade estrutural do carrossel ---');
    

    const homePage = new HomePage(page);
    await homePage.navigate();

    console.log('Verificando a contagem de slides...');
    const itemCount = await homePage.getCarouselItemsCount();
    expect(itemCount).toBe(3);
    console.log(`Contagem de ${itemCount} slides confirmada.`);

    console.log('Verificando a integridade de cada slide...');
    const imageSources = await homePage.getCarouselImageSources();

    for (const imageSrc of imageSources) {
      expect(imageSrc).not.toBeNull();
      expect(imageSrc.length).toBeGreaterThan(0);
      expect(imageSrc).toMatch(/\.(jpg|png|jpeg|gif)$/i);

      console.log(`Slide OK. Imagem encontrada: ${imageSrc}`);
    }
    
    console.log('--- Teste de integridade do carrossel finalizado com sucesso ---');
  });

});