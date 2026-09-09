import { test, expect } from '@playwright/test';

// Page Object Model for Login Page
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(stepName, url) {
    await test.step(stepName, async () => {
      await this.page.goto(url);
    });
  }

  async enterUsername(stepName, username) {
    await test.step(stepName, async () => {
      await this.page.getByLabel('Username').or(this.page.getByPlaceholder('Username')).first().fill(username);
    });
  }

  async enterPassword(stepName, password) {
    await test.step(stepName, async () => {
      await this.page.getByLabel('Password').or(
        this.page.getByPlaceholder('Password')
      ).first().fill(password);
    });
  }

  async clickLogin(stepName) {
    await test.step(stepName, async () => {
      await this.page.getByRole('button', { name: 'Login' }).click();
    });
  }
}

test.describe('Login Functionality', () => {
  test('TC-001: Login succeeds with valid credentials', async ({ page }) => {
    const username = 'tomsmith';
    const password = 'SuperSecretPassword!';
    const loginUrl = `https://the-internet.herokuapp.com/login`;

    const loginPage = new LoginPage(page);

    await loginPage.goto('Navigate to login page', loginUrl);
    await loginPage.enterUsername('Enter valid username in the username field', username);
    await loginPage.enterPassword('Enter valid password in the password field', password);
    await loginPage.clickLogin('Click the login button');

    await test.step('Verify successful login and redirection to authenticated area', async () => {
      await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    });
  });
});