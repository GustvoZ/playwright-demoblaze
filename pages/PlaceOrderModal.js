class PlaceOrderModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#orderModal');
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.cardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.successMessage = page.locator('h2', { hasText: 'Thank you for your purchase!' });
  }

  /**
   * Fills the purchase form with the provided details.
   * @param {object} orderDetails - Ex: { name: 'John Doe', country: 'USA', ... }
   */
  async fillOrderDetails(orderDetails) {
    await this.nameInput.fill(orderDetails.name);
    await this.countryInput.fill(orderDetails.country);
    await this.cityInput.fill(orderDetails.city);
    await this.cardInput.fill(orderDetails.card);
    await this.monthInput.fill(orderDetails.month);
    await this.yearInput.fill(orderDetails.year);
  }

  async purchase() {
    await this.purchaseButton.click();
  }
}

module.exports = { PlaceOrderModal };