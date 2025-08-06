class LoginModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  /**
   * Fills the login form and clicks the login button.
   * @param {string} username 
   * @param {string} password 
   */
  async loginUser(username, password) {
    await this.usernameInput.waitFor();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginModal };