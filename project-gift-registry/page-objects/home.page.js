const { expect } = require('@playwright/test');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

class HomePage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Wedding Gift Registry';
  }

  goto = async () => {
    await page.goto('/wedding-gift-registry');
  };

  verify = async () => {
    const locator = page.getByRole('heading', { name: this.pageH1, level: 1 });
    await expect(locator).toBeVisible();
  };

  setFirstName = async (firstName) => {
    await page.locator('input[name="firstname"]').fill(firstName);
  };

  setLastName = async (lastName) => {
    await page.locator('input[name="lastname"]').fill(lastName);
  };

  clickSearch = async () => {
    await page.locator('#gr-form-section button').click();
  };

  verifyFirstName = async () => {
    const locator = page.locator('#FirstNameError');
    await expect(locator).toBeVisible();
  };

  verifyLastName = async () => {
    const locator = page.locator('#LastNameError');
    await expect(locator).toBeVisible();
  };
}

module.exports = new HomePage();
