const { Given, Then } = require('@cucumber/cucumber');
const RegistrantListPage = require('../page-objects/registrant-list.page');
const RegistryDataHelper = require('../helpers/registry-data');
const { assertIsFunction } = require('../../helpers/function');
const { User } = require('../../setup/entity/user');
const PLPAddToRegistry = require('../page-objects/plp-add-to-registry.component');

Then('the customer adds the item to their registry', async function () {
  // if (!context.page) Assert.Fail("You must have a page context")
  // if (typeof context.page.addItemToRegistry !== "function")
  // Assert.Fail('addItemToRegistry is not a function for this context');
  // context.page.addItemToRegistry();
});

Given('registry with no product is found', async function () {
  this.pageObject = RegistrantListPage;
  const objEmptyRegistry = await RegistryDataHelper.getEmptyRegistryData();
  const user = new User();
  user.email = objEmptyRegistry.user;
  user.password = objEmptyRegistry.password;
  this.user = user;
  this.setData('registryId', objEmptyRegistry.registryId);
});

Given('the customer navigates to registrant list page', async function () {
  this.pageObject = RegistrantListPage;
  const { registryId } = this.data;
  await this.pageObject.goto(registryId);
});

Given('they should be on the registrant list page', async function () {
  await this.pageObject.goto(this.data.registryId);
  await RegistryDataHelper.cleanUpTheRegistry();
});

Then('the page should be valid', async function () {
  assertIsFunction(this.pageObject?.verifyPage);
  await this.pageObject.verifyPage();
});

Then('the item should be listed in their registry', async function () {
  assertIsFunction(this.pageObject?.verifySkuInList);
  await this.pageObject.verifySkuInList(this.data.sku);
  await this.pageObject.validateWantsCount(this.data.sku, 1);
});

Then('they add the first item to registry from bundle', async function () {
  assertIsFunction(this.pageObject?.addFirstProductfromBundle);
  const sku = [await this.pageObject.addFirstProductfromBundle()];
  this.setData('sku', sku);
  this.subObject = PLPAddToRegistry;
});

Then('they add all item to registry from bundle', async function () {
  assertIsFunction(this.pageObject?.allProductfromBundle);
  const sku = await this.pageObject.allProductfromBundle();
  this.setData('sku', sku);
  this.subObject = PLPAddToRegistry;
});
