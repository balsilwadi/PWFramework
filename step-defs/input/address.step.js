const { Given, Then } = require('@cucumber/cucumber');
const { assertIsFunction } = require('../../helpers/function');

Given('they entered {string} as the address1', async function (address1) {
  assertIsFunction(this.pageObject?.setAddress1);
  await this.pageObject.setAddress1(address1);
});

Given('they entered {string} as the address2', async function (address2) {
  assertIsFunction(this.pageObject?.setAddress2);
  await this.pageObject.setAddress2(address2);
});

Given('they entered {string} as the city', async function (city) {
  assertIsFunction(this.pageObject?.setCity);
  await this.pageObject.setCity(city);
});

Given('they entered {string} as the state', async function (state) {
  assertIsFunction(this.pageObject?.setState);
  await this.pageObject.setState(state);
});

Given('they entered {string} as the zip code', async function (zipCode) {
  assertIsFunction(this.pageObject?.setZipCode);
  await this.pageObject.setZipCode(zipCode);
});

Then('the address1 error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyErrorAddress1);
  await this.pageObject.verifyErrorAddress1();
});

Then('the address2 error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyErrorAddress2);
  await this.pageObject.verifyErrorAddress2();
});

Then('the city error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyErrorCity);
  await this.pageObject.verifyErrorCity();
});

Then('the state error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyErrorState);
  await this.pageObject.verifyErrorState();
});

Then('the zip code error message is visible', async function () {
  assertIsFunction(this.pageObject?.verifyErrorZipCode);
  await this.pageObject.verifyErrorZipCode();
});
