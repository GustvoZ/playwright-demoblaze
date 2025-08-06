const { expect } = require('@playwright/test');


class CartPage {
  constructor(page) {
    this.page = page;
    this.productRows = page.locator('#tbodyid tr.success');
    this.totalPriceLabel = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  /**
   * Navigates directly to the cart page.
   */
  async navigate() {
    await this.page.goto('https://www.demoblaze.com/cart.html');
  }

  /**
   * Returns the locator for a specific product in the cart by its name.
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  getProductRowByName(productName) {
    return this.productRows.filter({ hasText: productName });
  }

  /**
   * Waits until the specified number of products are loaded in the cart.
   * @param {number} expectedCount
   */
  async waitForNumberOfProducts(expectedCount) {
    await expect(this.productRows).toHaveCount(expectedCount, { timeout: 10000 });
  }

  /**
   * Gets the total price from the cart page.
   * @returns {Promise<number>}
   */
  async getTotalPrice() {
    const totalText = await this.totalPriceLabel.textContent();
    return Number(totalText);
  }

  /**
   * Clicks the 'Place Order' button to open the purchase modal.
   */
  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { CartPage };