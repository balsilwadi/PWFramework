const { When, Then } = require('@cucumber/cucumber');
const { assertIsFunction } = require('../../helpers/function');

const { Page } = require('../../project-shared/page/page');
const { PLPpage } = require('../page-objects/plp.page');
const PLPAddToRegistry = require('../../project-gift-registry/page-objects/plp-add-to-registry.component');

const plpPage = new PLPpage();
const page = new Page();

// method obsolete/doesn't work
When('customer clicks on {string} SubCategory from Header', async function (categoryItem) {
  await plpPage.primaryNavigation(categoryItem);
});

Then('customer should be landed on PLP page with url {string} and headerTitle {string}', async function (url, headerTitle) {
  await plpPage.plpLandingPage(url, headerTitle);
});

Then('the customer should be landed on {string} PLP page with url {string} and headerTitle {string}', async function (plpType, url, headerTitle) {
  await plpPage.verifyPlpPageType(plpType);
  await plpPage.plpLandingPage(url, headerTitle);
});

Then('the customer should be landed on {string} PLP page', async function (plpType) {
  await plpPage.verifyPlpPageType(plpType);
});

When('customer click on {string} button', async function (plpAvailabilityFilter) {
  await plpPage.plpFilter(plpAvailabilityFilter);
});

Then('customer should see the default store', async function () {
  await plpPage.verifyZipcodeSection();
});

When('customer should be able to set the store for {string}', async function (zipCode) {
  await plpPage.updateZipcode(zipCode);
});

When('the customer navigates to category page', async function () {
  this.pageObject = plpPage;
  await page.navigateToUrl(this.data.categoryUri);
});

When('the customer navigates to wide plp page', async function () {
  this.pageObject = plpPage;
  await page.navigateToUrl(this.data.widePlpUri);
});

When('the customer navigates to wide collection plp page', async function () {
  this.pageObject = plpPage;
  await page.navigateToUrl(this.data.wideCollectionPlpUri);
});

When('they add the first item to registry', async function () {
  this.subObject = PLPAddToRegistry;
  assertIsFunction(this.subObject?.readSku);
  const sku = [await this.subObject.readSku()];
  this.setData('sku', sku);
  assertIsFunction(this.subObject?.addProductToRegistry);
  await this.subObject.addProductToRegistry();
});

When('they add the first item to registry from SEO page', async function () {
  this.subObject = PLPAddToRegistry;
  assertIsFunction(this.subObject?.readSkuFromSEO);
  const sku = [await this.subObject.readSkuFromSEO()];
  this.setData('sku', sku);
  assertIsFunction(this.subObject?.addProductToRegistryfromSEO);
  await this.subObject.addProductToRegistryfromSEO();
});

Then('customer should be land on PLP page with Zip {string}', async function (zipCode) {
  await plpPage.pageAfterZipcodeUpdate(zipCode);
});
When('customer clicks any item on PLP', async function () {
  await plpPage.navigateToPDP();
});

Then('customer should land in PDP page with ShipIt as {string}', async function (zipCode) {
  await plpPage.compareZipcode(zipCode);
  await plpPage.validateBreadCrumb();
});

Then('customer should able to set the store for {string} for Pickup', async function (zipCode) {
  await plpPage.setStorefromPopup(zipCode);
});

Then('customer should be land on PICKUP PLP page with FREE CURBSIDE PICKUP AT STORE as {string}', async function (storeName) {
  await plpPage.compareStoreNamePLP(storeName);
});

When('customer should land in PDP page with FREE CURBSIDE PICKUP AT STORE as {string}', async function (storeName) {
  await plpPage.compareStoreNamePDP(storeName);
});

When('customer navigates to SPCategory page from {string} category', async function (categoryItem) {
  await plpPage.spCategoryNavigation(categoryItem);
});

Then('customer should be landed on SPCategory page with url {string} and headerTitle {string}', async function (spCategoryURL, spCategoryHeaderTitle) {
  await plpPage.spcategoryLandingPage(spCategoryURL, spCategoryHeaderTitle);
});

When('customer clicks on product card with name {string}', async function (productCard) {
  await plpPage.clickOnProductCardOnSpategoryPage(productCard);
});

Then('customer should able to verify spcategory headerTitle', async function () {
  await plpPage.verifySpcategoryPage();
});

// actually And
Then('customer should be able to verify subway carousel items on spCategoryItem: {string}', async function (spCategoryItem) {
  plpPage.verifySubwayCarousel(spCategoryItem);
});

Then('customer verifies shopAll products', async function () {
  await plpPage.verifySpcategoryShopall();
});

When(
  'customer clicks on {string} SuperCategory and {string} SubCategory and navigates to {string} Category',
  async function (superCategoryItem, subCategoryItem, categoryItem) {
    await plpPage.primaryNavigation(superCategoryItem, subCategoryItem, categoryItem);
  }
);

When('the customer clicks on {string} SuperCategory and navigates to {string} Category', async function (superCategoryItem, categoryItem) {
  await plpPage.primaryNavigationFromMegaMenu(superCategoryItem, categoryItem);
});

When(
  'customer clicks on {string} SuperCategory and {string} SubCategory and navigates to {string} SPCategory',
  async function (superCategoryItem, subCategoryItem, spCategoryItem) {
    await plpPage.spCategoryNavigation(superCategoryItem, subCategoryItem, spCategoryItem);
  }
);

When('customer clicks on {string} SuperCategory and navigates to {string} SPCategory', async function (superCategoryItem, spCategoryItem) {
  this.pageObject = plpPage;
  await plpPage.spCategoryNavigationFromMegaMenu(superCategoryItem, spCategoryItem);
});

When('customer clicks on {string} SuperCategory', async function (superCategoryItem) {
  await plpPage.superCategoryNavigation(superCategoryItem);
});
