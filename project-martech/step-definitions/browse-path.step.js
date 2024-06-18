const { When, Then } = require('@cucumber/cucumber');
const { ProductPage } = require('../page-objects/pages/pdp.page');
const { CartPage } = require('../page-objects/pages/cart.page');
const { ConfirmationPage } = require('../page-objects/pages/confirmation.page');
const { DigitalDataLayer } = require('../page-objects/pages/digital-data.page');
const { LogInPage } = require('../../project-account/page-objects/pages/login/login.page');
const { MarLogInPage } = require('../page-objects/pages/login.page');
const { SearchPLP } = require('../../project-search-stores/page-objects/pages/search/search.page');
const { CommonUtils } = require('../../support/utils/common-utils');
const repoCommonElements = require('../page-objects/elements/browse-path-elements');
const env = require('../../support/env/env');

const productPage = new ProductPage();
const cartPage = new CartPage();
const confirmationPage = new ConfirmationPage();
const loginPage = new LogInPage();
const loginPageMar = new MarLogInPage();
const searchPage = new SearchPLP();
const common = new CommonUtils();
const ddlPage = new DigitalDataLayer();

Then('validate digitalData events on {string}', async function (keyHeader) {
  await ddlPage.validateDdlOnPageLoad(keyHeader);
});

Then('validate {string} event on {string}', async function (eventName, keyHeader) {
  await ddlPage.validateDdlWithEventName(eventName, keyHeader);
});

Then('validate {string} event', async function (eventName) {
  await ddlPage.validateDdlWithEventName(eventName);
});

When('customer search for a product {string}', async function (searchTerm) {
  const productName = {
    searchTermPLP: env.MAR_SEARCH_TERM_PLP,
    searchTermSearch: env.MAR_SEARCH_TERM_SEARCH
  }[searchTerm];
  await searchPage.searchWithKeyword(productName);
  await common.forcedWait(5000);
});

When('customer search for a SKU {string}', async function (skuNum) {
  const sku = {
    coreSku: env.MAR_ORDER_CONF_CORE_SKU,
    kidsSku: env.MAR_ORDER_CONF_KIDS_SKU
  }[skuNum];
  await searchPage.searchWithKeyword(sku);
  await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
  if (await page.locator(repoCommonElements.homePage.txtFoundZeroResults).isVisible()) {
    throw new Error(`Found 0 results for the ${skuNum} "${sku}"`);
  }
});

Then('verify product details on the PDP page', async function () {
  await productPage.validateProductPage();
});

When('they add item to the cart from the PDP', async function () {
  await productPage.clickAddToCart(1);
  await productPage.clickCheckoutNow();
});

Then('validate the confirmation page for the thank you message and order details', async function () {
  await confirmationPage.verifyConfirmationMsg();
  await confirmationPage.verifyOrderDetails();
  await confirmationPage.compareOrderId();
});

When('they navigate to the Spategory page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_SPATEGORY_URL}`);
});

When('they navigate to the Supercategory page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_SUPERCATEGORY_URL}`);
});

When('they login to the application', async function () {
  await loginPage.navigateToLoginPage();
  await loginPageMar.enterCredentials(env.MAR_EMAIL, env.MAR_PASSWORD);
  await loginPage.clickOnSignInButton();
});

When('lands on the home page', async function () {
  await page.goto(env.BASE_URL);
});

When('they login with {string} and empty cart', async function (email) {
  const emailId = {
    singleItemEmail: env.MAR_SINGLE_ITEM_EMAIL,
    multipleItemEmail: env.MAR_MULTIPLE_ITEM_EMAIL
  }[email];
  await loginPage.openSignInPopUp();
  await loginPage.enterCredentials(emailId, env.MAR_PASSWORD);
  await loginPage.clickOnSignInButton();
  await cartPage.navigateToCartPage();
  const cartItemCount = await cartPage.checkCartHasItems();
  if (cartItemCount > 0) {
    await cartPage.emptyCart();
  }
});
