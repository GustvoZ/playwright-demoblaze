const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async addToCart() {
    await this.addToCartButton.click()
  }


}

module.exports = { ProductPage }; 