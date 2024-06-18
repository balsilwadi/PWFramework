const { When, Then } = require('@cucumber/cucumber');
const { MonogramPage } = require('../../page-objects/pages/product/monogramming.page');

const { assertIsFunction } = require('../../../helpers/function');

Then('They see STYLE grouper on Product Detail Page', async function () {
  this.pageObject = new MonogramPage();
  assertIsFunction(this.pageObject?.verifyStyleGrouper);
  await this.pageObject.verifyStyleGrouper();
});

When('They click "Personalized" in STYLE grouper on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.clickPersonalized);
  await this.pageObject.clickPersonalized();
});

Then('Verify price is updated with Monogramming fees', async function () {
  assertIsFunction(this.pageObject?.personalizedPrice);
  await this.pageObject.personalizedPrice();
});

When('They select font {string} and enter text on Product Detail Page', async function (font) {
  assertIsFunction(this.pageObject?.selectFont);
  await this.pageObject.selectFont(font);
});

When('They select thread on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.selectThread);
  await this.pageObject.selectThread();
});

Then('They see Add to cart Container on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.validateAddtoCartisPresent);
  await this.pageObject.validateAddtoCartisPresent();
});

When('They Click On Add to Cart on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.clickMonogramAddToCart);
  await this.pageObject.clickMonogramAddToCart();
});

Then('Monogramming Double Dare popup should appear on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.validateMonogrammingPopup);
  await this.pageObject.validateMonogrammingPopup();
});

When('They click on Decline button on Double Dare popup', async function () {
  assertIsFunction(this.pageObject?.mtoDeclineValidation);
  await this.pageObject.mtoDeclineValidation();
});

When('They click on Accept button on Double Dare popup', async function () {
  assertIsFunction(this.pageObject?.mtoAcceptValidation);
  await this.pageObject.mtoAcceptValidation();
});
