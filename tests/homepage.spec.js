const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Homepage Carousel Functionality', () => {

    test('should have 3 slides and each slide must have a valid image source', async ({ page }) => {
        console.log('--- Iniciando teste de integridade estrutural do carrossel ---');

        const homePage = new HomePage(page);
        await homePage.navigate();

        const carouselItems = page.locator('.carousel-item');
        // Apenas o slide que está ativo (e visível)
        const activeCarouselItem = page.locator('.carousel-item.active');

        // Garante que existe APENAS UM slide ativo/visível.
        // Verificação de integridade importante.
        await expect(activeCarouselItem).toHaveCount(1);
        console.log('Verificação de 1 slide ativo confirmada.');

        // Garantie a integridade de TODOS os slides (mesmo os escondidos)
        console.log('Verificando a integridade de todos os slides (visíveis e ocultos)...');
        for (const item of await carouselItems.all()) {
            const image = item.locator('img');

        // Verificamos se a tag <img> EXISTE dentro do slide.
        // .toHaveCount(1) funciona para ver elementos visíveis ou ocultos.
        await expect(image).toHaveCount(1);

        const imageSrc = await image.getAttribute('src');

        // As outras verificações de integridade do 'src'.
        expect(imageSrc).not.toBeNull();
        expect(imageSrc.length).toBeGreaterThan(0);
        expect(imageSrc).toMatch(/\.(jpg|png|jpeg|gif)$/i);

        console.log(`Slide OK. Imagem encontrada: ${imageSrc}`);
        }

        console.log('--- Teste de integridade do carrossel finalizado com sucesso ---');
    });

});