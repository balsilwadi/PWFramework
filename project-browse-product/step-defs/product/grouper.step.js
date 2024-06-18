const { Then } = require('@cucumber/cucumber');
const { assertIsFunction } = require('../../../helpers/function');

const grouperPage = require('../../page-objects/pages/product/grouper.page');

Then('they see groupers', async function () {
  this.pageObject = grouperPage;
  assertIsFunction(this.pageObject?.verifyGroupersPage);
  await this.pageObject.verifyGroupersPage();
});

Then('they verify groupers', async function () {
  // this.pageObject = grouperPage;
  assertIsFunction(this.pageObject?.verifyGroupers);
  await this.pageObject.verifyGroupers();
});

Then('they Clicks on {string} Size', async function (size) {
  assertIsFunction(this.pageObject?.verifySizeGrouper);
  await this.pageObject.verifySizeGrouper(size);
});

Then('they Clicks on {string} Color', async function (color) {
  this.pageObject = grouperPage;
  assertIsFunction(this.pageObject?.verifyColorGrouper);
  await this.pageObject.verifyColorGrouper(color);
});

Then('they Clicks on {string} Type', async function (type) {
  assertIsFunction(this.pageObject?.verifyTypeGrouper);
  await this.pageObject.verifyTypeGrouper(type);
});
Then('they Clicks on {string} Quantity', async function (quantity) {
  assertIsFunction(this.pageObject?.verifyQtyGrouper);
  await this.pageObject.verifyQtyGrouper(quantity);
});
