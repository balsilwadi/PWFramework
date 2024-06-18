const { Given, Then, When } = require('@cucumber/cucumber');
const FilterRegistryPage = require('../page-objects/filter-registry.page');
const env = require('../../support/env/env');

Given('the customer navigates to the registry', async function () {
  this.pageObject = FilterRegistryPage;
  await this.pageObject.goto(env.SORT_REGISTRY_ID);
});

When('the customer selects {string} random category', async function (number) {
  await this.pageObject.selectRandomCategory(number);
});

Then('the customer should see {string} accordion', async function (number) {
  await this.pageObject.validateSelectedCategory(number);
});

When('the customer selects {string} random price', async function (number) {
  await this.pageObject.selectRandomPrice(number);
});

Then('the customer should see filtered items according to price', async function () {
  await this.pageObject.validateSelectedPrices();
});
