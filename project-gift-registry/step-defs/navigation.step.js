const { Given, When } = require('@cucumber/cucumber');
const HomePage = require('../page-objects/home.page');
const OneClickRegistryListPage = require('../page-objects/one-click-registry-list.page');

const { assertIsFunction } = require('../../helpers/function');

Given('the customer is on the registry home page', async function () {
  this.pageObject = HomePage;
  await HomePage.goto();
  await HomePage.verify();
});

When('the customer navigates to one click registry page', async function () {
  this.pageObject = OneClickRegistryListPage;
  assertIsFunction(this.pageObject?.goto);
  await this.pageObject.goto();
});

When('they open a first registry bundle', async function () {
  assertIsFunction(this.pageObject?.clickOnFirstBundle);
  await this.pageObject.clickOnFirstBundle();
});
