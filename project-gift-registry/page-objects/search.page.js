const { expect } = require('@playwright/test');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

class SearchPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Gift Registry Search';
  }

  goto = async () => {
    await page.goto('/gift-registry/guest/find-registry');
  };

  verify = async () => {
    const locator = page.getByRole('heading', { name: this.pageH1, level: 1 });
    await expect(locator).toBeVisible();
  };

  setFirstName = async (firstName) => {
    await page.locator('input[name="Firstname"]').fill(firstName);
  };

  setLastName = async (lastName) => {
    await page.locator('input[name="Lastname"]').fill(lastName);
  };

  clickSearch = async () => {
    await page.locator('.manage-registry-form button').click();
  };

  verifyFirstName = async () => {
    const locator = page.getByTestId('search-registry-first-name-error-message');
    await expect(locator).toBeVisible();
  };

  verifyLastName = async () => {
    const locator = page.getByTestId('search-registry-last-name-error-message');
    await expect(locator).toBeVisible();
  };
}

module.exports = new SearchPage();
