const { When, Then } = require('@cucumber/cucumber');
const familyPage = require('../../page-objects/pages/family/family.page');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { assertIsFunction } = require('../../../helpers/function');

const testReport = new ReportUtils();

When('Customer opens MPDP page {string}', async function (sku) {
  testReport.log(sku);
  await familyPage.navigateToFamilyPage(sku);
});

Then('they see line items', async function () {
  this.pageObject = familyPage;
  assertIsFunction(this.pageObject?.validateAddAlltoCartPresent);
  await this.pageObject.validateAddAlltoCartPresent();
});

Then('Verify title for each line item', async function () {
  assertIsFunction(this.pageObject?.validateLineItemTitles);
  await this.pageObject.validateLineItemTitles();
});

Then('Verify price change for each line item', async function () {
  assertIsFunction(this.pageObject?.validatePriceLineItem);
  await this.pageObject.validatePriceLineItem();
});

Then('Verify SOR updates for line items', async function () {
  assertIsFunction(this.pageObject?.validateGroupers);
  await this.pageObject.validateGroupers();
});

Then('compare price and sku with PDP for line items', async function () {
  assertIsFunction(this.pageObject?.validateSku);
  await this.pageObject.validateSku();
});
