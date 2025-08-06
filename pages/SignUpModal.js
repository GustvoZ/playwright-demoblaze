
class SignUpModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  /**
   * Fills the sign-up form and clicks the sign-up button.
   * @param {string} username 
   * @param {string} password 
   */
  async signUpNewUser(username, password) {
    await this.usernameInput.waitFor();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }
}

module.exports = { SignUpModal };