const { When, Then } = require('@cucumber/cucumber');
const RegistryConfirmation = require('../project-gift-registry/helpers/registry-confirmation-modal');
const { ProductPage } = require('../project-browse-product/page-objects/pages/product/product.page');
const familyPage = require('../project-browse-product/page-objects/pages/family/family.page');

const { assertIsFunction } = require('../helpers/function');
const RegistrantListPage = require('../project-gift-registry/page-objects/registrant-list.page');
const { ReportUtils } = require('../support/utils/report-utils');

const reporter = new ReportUtils();

const productPage = new ProductPage();

When('that a customer navigates to the PDP', async function () {
  this.pageObject = productPage;
  await this.pageObject.navigateToProductPage(this.data.sku);
  this.subObject = RegistryConfirmation;
});

When('that a customer navigates to the family sku page', async function () {
  this.pageObject = familyPage;
  await this.pageObject.navigateToFamilyPage(this.data.sku);
  this.subObject = RegistryConfirmation;
});

When('they add the product to their registry', async function () {
  const sku = [await this.pageObject.addProductToRegistry()];
  this.setData('sku', sku);
});

Then('they should see an add-to-registry confirmation', async function () {
  assertIsFunction(this.subObject?.verifyAddtoRegistryConfirmation);
  await this.subObject.verifyAddtoRegistryConfirmation();
});

When('the customer selects {string}', async function (selectButton) {
  reporter.log(selectButton);
  await this.subObject.clickViewYourRegistry();
  this.pageObject = RegistrantListPage;
});

Then('they add the first product from the {string} carousel', async function (carouselName) {
  reporter.log(`The product was added from the ${carouselName} carousel`);
  const sku = await this.subObject.readSkuFromCarousel();
  assertIsFunction(this.subObject?.clickAddButton);
  await this.subObject.clickAddButton();
  const skuArrayValues = this.data.sku;
  skuArrayValues.push(sku);
});
Then('they should see {string} as a confirmation message', async function (confirmationMsg) {
  reporter.log(`The customer see ${confirmationMsg} as confirmation message`);
  assertIsFunction(this.subObject?.verifyItemAddedMessage);
  await this.subObject.verifyItemAddedMessage();
});
