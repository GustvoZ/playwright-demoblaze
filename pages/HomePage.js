const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('#nava');
        this.carouselItems = page.locator('.carousel-item');

    }

    /**
     * Navigates to the homepage.
     */
     async navigate() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    /**
    * Clicks on a product link from the homepage grid.
    * @param {string} productName The exact name of the product link to click.
    */
    async productName(productName) {
        await this.page.getByRole('link', { name: productName }).click();
    }


    /**
   * Clicks on a category link. If the category is 'All', it does nothing.
   * @param {string} categoryName - The name of the category ('All', 'Phones', 'Laptops', 'Monitors').
   * npx playwright test -g "Phones" - npx playwright test --grep "@sorting" - npx playwright test -g "category|sorting"
   */
    async selectCategory(categoryName) {
        // O 'All' é o estado padrão, então não precisa clicar em nada.
        if (categoryName.toLowerCase() === 'all') {
            console.log('Verificando a categoria "All" (padrão), nenhum clique necessário.');
            return; // A palavra 'return' aqui faz a função parar e sair.
        }
        // Para as outras categorias, nós clicamos no link.
        console.log(`Clicando na categoria: ${categoryName}...`);
        await this.page.getByRole('link', { name: categoryName }).click();
    }

    /**
     * Returns the number of slides found in the carousel.
     * @returns {Promise<number>}
     */
    async getCarouselItemsCount() {
        return this.carouselItems.count();
    }

    /**
     * Extracts the 'src' attribute from the image of each carousel slide.
     * @returns {Promise<string[]>} An array with the image source filenames.
     */
    async getCarouselImageSources() {
        const sources = [];
        for (const item of await this.carouselItems.all()) {
            const image = item.locator('img');
            const src = await image.getAttribute('src');
            // Apenas adicionamos o nome do arquivo, e não o caminho completo
            if (src) {
                sources.push(src.split('/').pop());
            }
        }
        return sources;
    }

}

module.exports = { HomePage };