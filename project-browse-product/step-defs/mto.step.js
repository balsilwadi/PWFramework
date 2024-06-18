const { When, Then } = require('@cucumber/cucumber');
const { ProductPage } = require('../page-objects/pages/product/product.page');
const productMTOPage = require('../page-objects/pages/product/product.mto.page');
const { assertIsFunction } = require('../../helpers/function');

const productPage = new ProductPage();

Then('Customer should see the product Detail page {string}', async function (sku) {
  assertIsFunction(this.pageObject?.validateProductPage);
  await this.pageObject.validateProductPage(sku);
  await productPage.getSummaryText();
});

Then('they see availability as MTO', async function () {
  this.pageObject = productMTOPage;
  assertIsFunction(this.pageObject?.validateMtoProductPage);
  await this.pageObject.validateMtoProductPage();
});

When('Customer click on MTO Add to Cart', async function () {
  assertIsFunction(this.pageObject?.clickMtoAddToCart);
  await this.pageObject.clickMtoAddToCart();
});

Then('Double Dare popup should appear on Product Detail Page', async function () {
  this.pageObject = productMTOPage;
  assertIsFunction(this.pageObject?.validateMtoPopup);
  await this.pageObject.validateMtoPopup();
});

Then('Verify SummaryText on Double dare popup', async function () {
  assertIsFunction(this.pageObject?.getMTOSummaryText);
  await this.pageObject.getMTOSummaryText();
});

When('they click on Decline button on Double Dare popup', async function () {
  await this.pageObject.mtoDeclineValidation();
  await this.pageObject.validateMtoProductPage();
});

When('they click Accept terms button on Double Dare popup', async function () {
  await this.pageObject.mtoAcceptValidation();
});
