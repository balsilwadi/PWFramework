const { Given, Then } = require('@cucumber/cucumber');
const { assertIsFunction } = require('../../helpers/function');

Given('they have entered {string} as the first name', async function (firstName) {
  assertIsFunction(this.pageObject?.setFirstName);
  await this.pageObject.setFirstName(firstName);
});

Given('they have entered {string} as the last name', async function (lastName) {
  assertIsFunction(this.pageObject?.setLastName);
  await this.pageObject.setLastName(lastName);
});

Then('the first name error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyFirstName);
  await this.pageObject.verifyFirstName();
});

Then('the last name error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyLastName);
  await this.pageObject.verifyLastName();
});
