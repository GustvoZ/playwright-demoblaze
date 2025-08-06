const { test, expect } = require('@playwright/test');

const { HomePage } = require('../pages/HomePage');
const { NavbarComponent } = require('../pages/NavbarComponent');
const { VideoModal } = require('../pages/VideoModal');
const { SignUpModal } = require('../pages/SignUpModal');
const { LoginModal } = require('../pages/LoginModal');

test.describe('Authentication and General Modals', () => {

  test('should open, display, and close the "About us" modal', async ({ page }) => {
    console.log('--- Iniciando teste do modal "About us" ---');
    
    const homePage = new HomePage(page);
    const navbar = new NavbarComponent(page);
    const videoModal = new VideoModal(page);

    await homePage.navigate();
    await navbar.openAboutUsModal();

    await expect(videoModal.modal).toBeVisible();
    await expect(videoModal.modalTitle).toHaveText('About us');

    await videoModal.closeModal();
    await expect(videoModal.modal).toBeHidden();
    
    console.log('--- Teste do modal "About us" finalizado com sucesso ---');
  });

  test('should sign up a new user successfully', async ({ page }) => {
    console.log('--- Iniciando teste de Sign up ---');

    const homePage = new HomePage(page);
    const navbar = new NavbarComponent(page);
    const signUpModal = new SignUpModal(page);
    const username = `testuser${Date.now()}`;
    const password = 'password123';

    page.on('dialog', async dialog => {
      expect(dialog.message()).toEqual('Sign up successful.');
      await dialog.accept();
    });
    
    await homePage.navigate();
    await navbar.openSignUpModal();
    await expect(signUpModal.modal).toBeVisible();
    await signUpModal.signUpNewUser(username, password);

    console.log('--- Teste de Sign up finalizado ---');
  });

  test('should log in an existing user successfully', async ({ page }) => {
    console.log('--- Iniciando teste de Log in ---');
    
    const homePage = new HomePage(page);
    const navbar = new NavbarComponent(page);
    const loginModal = new LoginModal(page);
    const username = 'test';
    const password = 'test';

    await homePage.navigate();
    await navbar.openLoginModal();
    await expect(loginModal.modal).toBeVisible();
    await loginModal.loginUser(username, password);

    await expect(navbar.welcomeMessage).toBeVisible();
    await expect(navbar.welcomeMessage).toHaveText(`Welcome ${username}`);
    
    console.log('--- Teste de Log in finalizado ---');
  });
});