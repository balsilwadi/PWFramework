const { Given, When, Then } = require('@cucumber/cucumber');

const { CartPage } = require('../../project-checkout/page-objects/pages/cart/cart.page');
const { CommonUtils } = require('../../support/utils/common-utils');
const { HeaderCartIconHelper } = require('../helpers/header-cart-icon-helper');
const { HomePage } = require('../page-objects/home.page');
const { LogInPage } = require('../../project-account/page-objects/pages/login/login.page');

const cartPage = new CartPage();
const common = new CommonUtils();
const headerCartIconHelper = new HeaderCartIconHelper();
const homePage = new HomePage();
const loginPage = new LogInPage();

const { assertIsFunction } = require('../../helpers/function');

const _ISMOBILE = common.verifyIsMobile();

When('the customer hovers over cart icon', async function () {
  await headerCartIconHelper.hoverCartIcon(_ISMOBILE);
});

Given('the customer has previously added skus: {string}, {string} to their cart', { timeout: 500 * 1000 }, async function (sku1, sku2) {
  this.pageObject = loginPage;

  assertIsFunction(this.pageObject?.openSignInPopUp);
  await loginPage.openSignInPopUp();

  assertIsFunction(this.pageObject?.enterCredential);
  await loginPage.enterCredential('Favorites');

  assertIsFunction(this.pageObject?.clickOnSignInButton);
  await loginPage.clickOnSignInButton();

  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.navigateToCartPage);
  await cartPage.navigateToCartPage();
  const cartItemCount = await cartPage.checkCartHasItems();

  if (cartItemCount > 0) {
    assertIsFunction(this.pageObject?.cleanupCartByRemovingAllItems);
    await cartPage.cleanupCartByRemovingAllItems();
  }

  this.pageObject = homePage;
  assertIsFunction(this.pageObject?.addItemToCart);
  await homePage.addItemToCart(sku1);
  await homePage.addItemToCart(sku2);

  this.pageObject = loginPage;
  assertIsFunction(this.pageObject?.signOutFromHeader);
  await loginPage.signOutFromHeader();
});

Then('cart should show previously added skus: {string}, {string} after user hovers over cart icon again', async function (sku1, sku2) {
  const skus = [sku1, sku2];
  await headerCartIconHelper.verifyListOfItems(_ISMOBILE, skus);
});

Given('the cart should not have any items in the cart', async function () {
  await headerCartIconHelper.verifyGuestView();
});

Given('cart flyout should show Guest View', async function () {
  await headerCartIconHelper.verifyGuestView();
});

When('the customer adds {string} to cart while not logged in', async function (sku) {
  this.pageObject = homePage;
  assertIsFunction(this.pageObject?.addItemToCart);
  await homePage.addItemToCart(sku);
});

When('customer adds {string} to cart with selected quantity of {string}', async function (sku, quantity) {
  this.pageObject = homePage;
  assertIsFunction(this.pageObject?.addItemToCart);
  const quantityAdjuster = { quantityAdjusterMethod: 'increase', quantity };

  await homePage.addItemToCart(sku, false, quantityAdjuster);
});

Then('cart should show newly added sku: {string} after user hovers over cart icon again', async function (sku) {
  const skus = [sku];
  await headerCartIconHelper.verifyListOfItems(_ISMOBILE, skus);
});

Then(
  'cart should show newly added sku: {string} along with previously added skus: {string}, {string} after user hovers over cart icon again',
  async function (sku1, sku2, sku3) {
    const skus = [sku1, sku2, sku3];
    await headerCartIconHelper.verifyListOfItems(_ISMOBILE, skus);
  }
);

Then('the customer should see newly added skus: {string}, {string}, {string} after user hovers over cart icon again', async function (sku1, sku2, sku3) {
  const skus = [sku1, sku2, sku3];
  await headerCartIconHelper.verifyListOfItems(_ISMOBILE, skus);
});

Then('cart should show newly added sku: {string} with quantity: {string} after user hovers over cart icon again', async function (sku, quantity) {
  const skus = [sku];
  await headerCartIconHelper.verifyListOfItems(_ISMOBILE, skus, quantity);
});
