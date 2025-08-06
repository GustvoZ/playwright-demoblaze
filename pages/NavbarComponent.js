class NavbarComponent {
  constructor(page) {
    this.page = page;
    this.aboutUsLink = page.getByRole('link', { name: 'About us' });
    this.signUpLink = page.locator('#signin2');
    this.logInLink = page.locator('#login2');
    this.cartLink = page.locator('#cartur');
    this.welcomeMessage = page.locator('#nameofuser');
  }

  async openAboutUsModal() {
    await this.aboutUsLink.click();
  }

  async openSignUpModal() {
    await this.signUpLink.click();
  }

  async openLoginModal() {
    await this.logInLink.click();
  }
}

module.exports = { NavbarComponent };