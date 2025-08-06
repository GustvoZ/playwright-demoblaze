class HomePage {
  constructor(page) {
    this.page = page;
    
    // Locators do Navbar (para autenticação, etc.)
    this.signUpLink = page.locator('#signin2');
    this.logInLink = page.locator('#login2');
    this.welcomeMessage = page.locator('#nameofuser');
    
    // Locators para elementos do corpo da Home Page
    this.pageTitle = page.locator('#nava');
    this.carouselItems = page.locator('.carousel-item');
    this.productList = page.locator('#tbodyid .card');
  }

  /**
   * Navigates to the homepage.
   */
  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  // --- MÉTODOS DE AUTENTICAÇÃO (do Navbar) ---

  async openSignUpModal() {
    await this.signUpLink.click();
  }

  async openLoginModal() {
    await this.logInLink.click();
  }

  // --- MÉTODOS DE INTERAÇÃO COM PRODUTOS E CATEGORIAS ---

  /**
   * Clicks on a product link from the homepage grid by its exact name.
   * @param {string} productName
   */
  async selectProduct(productName) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  /**
   * Clicks on a category link by name.
   * @param {string} categoryName
   */
  async selectCategory(categoryName) {
    if (categoryName.toLowerCase() === 'all') {
      await this.navigate();
      return;
    }
    await this.page.getByRole('link', { name: categoryName }).click();
  }

  /**
   * Returns the number of products currently visible on the page.
   * @returns {Promise<number>}
   */
  async getProductCount() {
    await this.productList.first().waitFor();
    return this.productList.count();
  }

  // --- MÉTODOS DO CARROSSEL ---

  /**
   * Gets the count of carousel items.
   * @returns {Promise<number>}
   */
  async getCarouselItemsCount() {
    return this.carouselItems.count();
  }

  /**
   * Gets the image sources from all carousel items.
   * @returns {Promise<string[]>}
   */
  async getCarouselImageSources() {
    const sources = [];
    for (const item of await this.carouselItems.all()) {
      const image = item.locator('img');
      const src = await image.getAttribute('src');
      if (src) {
        sources.push(src.split('/').pop());
      }
    }
    return sources;
  }
}

module.exports = { HomePage };