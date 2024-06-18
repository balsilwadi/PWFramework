const { Given, When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../../../project-browse-path/page-objects/home.page');
const { ProductPage } = require('../../page-objects/pages/product/product.page');
const { UiFeature } = require('../../../project-browse-path/page-objects/ui-feature.page');
const { assertIsFunction } = require('../../../helpers/function');

const { ProductBrowseUtils } = require('../../../project-browse/utils/product-browse-data-utils');

const uipage = new UiFeature();
const homePage = new HomePage();
const productPage = new ProductPage();
const productBrowseUtils = new ProductBrowseUtils();
let productSku;

When('Customer search for PDP {string}', async function (sku) {
  await productPage.navigateToPDPPage(sku);
});

When('User verifies the Save Offer window and closing the window', async function () {
  await uipage.switchToOfferSaveWindow();
});

When('they see logo on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.verifyLogo);
  await this.pageObject.verifyLogo();
});

When('Customer opens PDP page {string}', async function (sku) {
  this.pageObject = productPage;
  assertIsFunction(this.pageObject?.navigateToProductPage);
  await this.pageObject.navigateToProductPage(sku);
});

Then('Verify the loaded Product page for SKU {string}', { timeout: 2 * 80000 }, async function (sku) {
  assertIsFunction(this.pageObject?.validateProductPage);
  await this.pageObject.validateProductPage(sku);
});

Then('they see Add to cart Container on Product Deatil Page', async function () {
  assertIsFunction(this.pageObject?.validateAddtoCartPresent);
  await this.pageObject.validateAddtoCartPresent();
});

Then('Click on Quickship link', async function () {
  await productPage.clickQuickShip();
});

Then('Customer Verify Drawers', async function () {
  await productPage.clickDrawer();
});

Then('Verify summary details under Hero Image', async function () {
  await productPage.getProductSummaryText();
});

Then('Verify Carousels', async function () {
  await productPage.verifyCarousels();
});

When('they Click On Add to Cart on Product Detail Page', async function () {
  this.pageObject = productPage;
  await this.pageObject.clickMtoAddToCart();
});

Then('they see {string} drawer on Product Deatil Page', async function (drawer) {
  this.pageObject = productPage;
  assertIsFunction(this.pageObject?.verifyDrawer);
  await this.pageObject.verifyDrawer(drawer);
});

Then('they see {string} carousel on Product Deatil Page', async function (carousel) {
  assertIsFunction(this.pageObject?.verifyCarousel);
  await this.pageObject.verifyCarousel(carousel);
});

Then('they Click on CHECKOUT NOW button', async function () {
  assertIsFunction(this.pageObject?.clickCheckout);
  await this.pageObject.clickCheckout();
});
Then('Search for Second SKU and Verify the loaded Product Page {string}', async function (sku) {
  await homePage.searchItem(sku);
  await productPage.validateProductPage(sku);
});

Then('Click on ADD TO CART and CHECKOUT NOW', async function () {
  await productPage.clickAddToCart();
  await productPage.clickCheckoutNow();
});

When('Customer Click on Personalized', async function () {
  await productPage.clickPersonalized();
});

Then('Customer Enters text', async function () {
  await productPage.enterText();
});

Then('Customer changes font style to {string}', async function (strFontName) {
  await productPage.selectFont(strFontName);
});

Then('Customer clicks {string} thread color', async function (strThreadColor) {
  await productPage.selectThread(strThreadColor);
});

Then('Customer clicks Accept button on monogram pop up', async function () {
  await productPage.clickAcceptMonogram();
});

Given('the Product Detail Page with {string} sku is retrieved', async function (productType) {
  const skuData = await productBrowseUtils.getSkuData();
  productSku = skuData[productType];
  this.setData('sku', productSku);
});

Then('they see the product detail page', { timeout: 2 * 80000 }, async function () {
  await productPage.validateProductPage(productSku);
});

Then('they see the family product detail page', { timeout: 2 * 80000 }, async function () {
  await productPage.validateProductPage(`f${productSku}`);
});

Then('they see {string} Carousel', async function (carouselType) {
  assertIsFunction(this.pageObject?.verifyCarousel);
  await this.pageObject.verifyCarousel(carouselType);
});

Then('they click on Add To Cart button on {string} Carousel', async function (carousel) {
  assertIsFunction(this.pageObject?.clickCarouselAddtoCart);
  await this.pageObject.clickCarouselAddtoCart(carousel);
});

Then('they change {string} zipcode', async function (zipcode) {
  assertIsFunction(this.pageObject?.changeZip);
  await this.pageObject.changeZip(zipcode);
});

Then('they see store pickup on product detail page', async function () {
  assertIsFunction(this.pageObject?.verifyStorePickupDisplay);
  await this.pageObject.verifyStorePickupDisplay();
});

Then('they click on store pickup radio button', async function () {
  assertIsFunction(this.pageObject?.clickStorePickup);
  await this.pageObject.clickStorePickup();
});

Then('they verify pagetype', async function () {
  assertIsFunction(this.pageObject?.verifyPageType);
  await this.pageObject.verifyPageType();
});

Then('they see vendor drop ship link on Product Detail Page', async function () {
  assertIsFunction(this.pageObject?.vendordropshipPresent);
  await this.pageObject.vendordropshipPresent();
});

Then('they verify vendor drop ship link', async function () {
  assertIsFunction(this.pageObject?.verifyVDSlink);
  await this.pageObject.verifyVDSlink();
});
