const { Given, When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../../../project-browse-path/page-objects/home.page');
const { ProductPage } = require('../../../project-browse-product/page-objects/pages/product/product.page');
const { CheckoutPage } = require('../../page-objects/pages/common/checkout.page');
const { CartPage } = require('../../page-objects/pages/cart/cart.page');
const { SearchPLP } = require('../../../project-search-stores/page-objects/pages/search/search.page');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { LogInPage } = require('../../../project-account/page-objects/pages/login/login.page');

const { assertIsFunction } = require('../../../helpers/function');
const { getAccountEmail, getSkuFromEnvFile } = require('../../helpers/cart-helper');
const testData = require('../../page-objects/datafiles/testdata');
const env = require('../../../support/env/env');

const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();
const cartPage = new CartPage();
const searchPage = new SearchPLP();
const commonUtils = new CommonUtils();
const loginPage = new LogInPage();

/**
 * @module: HOME PAGE
 * @description: Home page steps
 * */

Given('the customer is on the home page', async function () {
  this.pageObject = homePage;
  this.itemsInfo = [];
  assertIsFunction(this.pageObject?.goto);
  await this.pageObject.goto();
  this.orderDetailsInfo = cartPage.orderDetailsObject();
});

Given('the customer is on the home page for availability verification', async function () {
  this.pageObject = homePage;
  assertIsFunction(this.pageObject?.gotoLocalVerifier);
  await this.pageObject.gotoLocalVerifier();
});

/**
 * @module: COMMON FUNCTION
 * @description: Add to cart an item or list of items
 * */

Then('they login using {string} and {string} and empties cart', async function (returningUserEmail, returningUserPwd) {
  this.pageObject = loginPage;
  assertIsFunction(this.pageObject?.openSignInPopUp);
  await loginPage.openSignInPopUp();
  let updatedUserEmail = returningUserEmail;
  let updatedUserPassword = returningUserPwd;
  if (returningUserEmail === 'DEFAULT_EMAIL') {
    updatedUserEmail = env.DEFAULT_RETURNING_USR_EMAIL;
    updatedUserPassword = env.DEFAULT_RETURNING_USR_PWD;
    this.orderDetailsInfo = cartPage.orderDetailsObject('returningUsr');
  } else if (returningUserEmail === 'EXPRESS_CHK_ELIG_ACCNT_EMAIL') {
    updatedUserEmail = env.EXPRESS_CHK_ELIG_ACCNT_EMAIL;
    updatedUserPassword = env.EXPRESS_CHK_ELIG_ACCNT_PWD;
    this.orderDetailsInfo = cartPage.orderDetailsObject('expressUsr');
  } else if (returningUserEmail === 'DTP_USER') {
    updatedUserEmail = env.DTP_RETURNING_USR_EMAIL;
    updatedUserPassword = env.DTP_RETURNING_USR_PWD;
    cartPage.orderDetailsObject('dtpUsr');
  } else if (returningUserEmail.includes('ACCOUNT')) {
    updatedUserEmail = getAccountEmail(returningUserEmail);
    updatedUserPassword = env.DEFAULT_RETURNING_USR_PWD;
    this.orderDetailsInfo = cartPage.orderDetailsObject('returningUsr');
  } else if (returningUserEmail === 'DTP_INVALIDTAXEXEMPT_ACCNT') {
    updatedUserEmail = env.DTP_INVALIDTAXEXEMPT_ACCNT_EMAIL;
    updatedUserPassword = env.DTP_INVALIDTAXEXEMPT_ACCNT_PWD;
    cartPage.orderDetailsObject('dtpUsr');
  }

  assertIsFunction(this.pageObject?.enterCredentials);
  await loginPage.enterCredentials(updatedUserEmail, updatedUserPassword);
  assertIsFunction(this.pageObject?.clickOnSignInButton);
  await loginPage.clickOnSignInButton();
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.navigateToCartPage);
  await cartPage.navigateToCartPage();
  assertIsFunction(this.pageObject?.checkCartHasItems);
  const cartItemCount = await cartPage.checkCartHasItems();

  if (cartItemCount > 0) {
    assertIsFunction(this.pageObject?.cleanupCartByRemovingAllItems);
    await cartPage.cleanupCartByRemovingAllItems();
  }
});

When('customer adds {string} to cart as {string}', async function (skuType, fulfillmentType) {
  const skuValue = getSkuFromEnvFile(skuType);
  const skuArray = skuValue.split(', ');
  const itemInfo = this.itemsInfo;

  await skuArray.reduce(async (previousPromise, skuNum) => {
    await previousPromise;
    let item = {};
    let itemType;
    item.skuType = skuType;
    item.fulfillmentType = fulfillmentType;
    item.skuNum = skuNum;
    this.pageObject = homePage;
    if (global.skipSearch) {
      await this.pageObject.launchPDP(testData.skuInfo[skuNum].urlpath);
    } else {
      assertIsFunction(this.pageObject?.searchItem);
      await this.pageObject.searchItem(skuNum);
    }

    this.pageObject = productPage;
    if (fulfillmentType === 'Pickup') {
      assertIsFunction(this.pageObject?.clickStorePickup);
      await this.pageObject.clickStorePickup(skuType);
      item = JSON.stringify(await this.pageObject.validateProductPage(item));
      itemType = await this.pageObject.clickAddToCart();
      await this.pageObject.clickCheckoutNow(itemType);
    } else if (skuType.includes('MTO')) {
      item = JSON.stringify(await this.pageObject.validateProductPage(item));
      itemType = await this.pageObject.clickAddToCart();
    } else if (skuType.includes('MONOGRAM')) {
      await productPage.personalizeItem();
      item = JSON.stringify(await productPage.validateProductPage(item));
      itemType = await this.pageObject.clickAddToCart();
      await productPage.clickAcceptMonogram();
      await cartPage.verifyCartPageIsLoaded();
    } else if (skuType.includes('CUSTOM')) {
      const itemdata = await productPage.validateProductPage(item);
      const selectedOptionCategory = await cartPage.clickToExpandFabricSelectionOnPDP();
      await cartPage.verifyFabricCustomOptionsExpanded();
      const selectedOption = await cartPage.selectFabricOptionOnPDP();
      itemdata.selectedOptionCategory = selectedOptionCategory;
      itemdata.selectedOption = selectedOption;
      item = JSON.stringify(itemdata);
      await productPage.clickAddToCart();
      await cartPage.customOrderAcceptTerms();
    } else if (skuType.includes('GIFTCARD')) {
      this.pageObject = cartPage;
      await this.pageObject.loadGiftCardPage();
      await this.pageObject.enterGiftCardDenomination();
      const arrivesByDate = commonUtils.generateDateRange();
      item = await this.pageObject.getGiftCardInfo(arrivesByDate);
      await this.pageObject.addGiftCardToCart();
    } else if (skuType.includes('HANDY')) {
      const handyCharge = await this.pageObject.checkHandyInstallation();
      const itemData = await this.pageObject.validateProductPage(item);
      itemData.handyCharge = handyCharge;
      item = JSON.stringify(itemData);
      await this.pageObject.clickAddToCart();
      await this.pageObject.clickCheckoutNow();
    } else {
      if (skuType.includes('FREE_SHIP')) {
        this.pageObject = productPage;
        await productPage.verifyFreeShipLink();
        await productPage.verifyFreeShippingPopup(this);
      }
      item = JSON.stringify(await this.pageObject.validateProductPage(item));
      itemType = await this.pageObject.clickAddToCart();
      await this.pageObject.clickCheckoutNow(itemType);
    }

    itemInfo.push(item);
    this.searchSku = skuNum;
  }, Promise.resolve());

  this.itemsInfo = itemInfo;
});

Then('customer adds a giftcard type {string} to cart', async function (giftCardType) {
  const itemInfo = [];
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.setTimeMachineCookie);
  await this.pageObject.loadGiftCardPage();
  await this.pageObject.selectGiftCardType(giftCardType);
  await this.pageObject.enterGiftCardDenomination();
  const arrivesByDate = commonUtils.generateDateRange();
  const giftCardObj = await this.pageObject.getGiftCardInfo(arrivesByDate);
  await this.pageObject.addGiftCardToCart();
  itemInfo.push(giftCardObj);
  this.itemsInfo = itemInfo;
});

// Availabiltity refactor

When('customer adds {string} to cart as {string} and {string} availability data', async function (skuType, fulfillmentType, stepType) {
  const newSku = getSkuFromEnvFile(skuType);
  const skuArray = newSku.split(',');
  const itemInfo = [];
  let item;
  let itemType;

  await skuArray.reduce(async (previousPromise, skuNum) => {
    await previousPromise;

    this.pageObject = homePage;
    if (global.skipSearch) {
      assertIsFunction(this.pageObject?.launchPDP);
      if (stepType === 'ADD') {
        await this.pageObject.launchPDP(testData.skuInfo[skuNum].urlpath);
      } else if (stepType === 'VERIFY') {
        await this.pageObject.launchPDPAvailability(testData.skuInfo[skuNum].urlpath);
      }
    } else {
      this.pageObject = searchPage;
      assertIsFunction(this.pageObject?.searchItem);
      await this.pageObject.searchItem(skuNum);
    }

    this.pageObject = productPage;
    if (stepType === 'ADD') {
      await this.pageObject.addProductPageAvailability();
    } else if (stepType === 'VERIFY') {
      await this.pageObject.verifyProductPageAvailability();
    }
    if (fulfillmentType === 'Pickup') {
      if (stepType === 'ADD') {
        await this.pageObject.addStorePickupAvailability();
      } else if (stepType === 'VERIFY') {
        await this.pageObject.verifyStorePickupAvailability();
      }
      await this.pageObject.clickStorePickup(skuType);
    }
    item = JSON.stringify(await this.pageObject.validateProductPage(skuNum));
    itemType = await this.pageObject.clickAddToCart();
    await this.pageObject.clickCheckoutNow(itemType);
    itemInfo.push(item);
  }, Promise.resolve());

  this.itemsInfo = itemInfo;
});

/**
 * @module: COMMON CHECKOUT FUNCTIONS
 * @description: Shipping page steps
 * */

Then('order summary should be displayed correctly', { timeout: 2 * 280000 }, async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyOrderSummary);
  await this.pageObject.verifyOrderSummary();
});

Then('verify the ships from vendor link and popup', async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyVDSShippingPopup);
  await this.pageObject.verifyVDSShippingPopup(this);
  // await this.pageObject.verifyFreeShippingPopup(this);
});

Then('customer sets timemachine cookie for {string} {string} plus 10 minutes', async function (dateString, timeString) {
  this.pageObject = checkoutPage;
  let date = dateString;
  let time = timeString;
  if (dateString.includes('FreeShippingDateAfterStartDate')) {
    date = env.FREE_SHIPPING_DATE_AFTER_START_DATE;
    time = env.FREE_SHIPPING_TIME_AFTER_START_TIME;
  } else if (dateString.includes('FreeShippingDateBeforeEndDate')) {
    date = env.FREE_SHIPPING_DATE_BEFORE_END_DATE;
    time = env.FREE_SHIPPING_TIME_BEFORE_END_TIME;
  }
  assertIsFunction(this.pageObject?.setTimeMachineCookie);
  this.fakeTime = await this.pageObject.setTimeMachineCookie(date, time);
});

Then('verify monogram details in {string} Page', async function (pageName) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyMonogramDetails);
  const iteminfo = await this.pageObject.verifyMonogramDetails(pageName, this.itemsInfo);

  if (iteminfo) {
    this.itemsInfo[0] = JSON.stringify(iteminfo);
  }
});

// GIFTCARD LANDING PAGE RELATED
Then('the customer loads giftcard landing page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.loadGiftCardPage);
  await this.pageObject.loadGiftCardPage();
});

Then('the new giftcard type {string} should be displayed', async function (giftCardType) {
  this.pageObject = cartPage;
  const screenshot = await this.pageObject.validateListedGiftCards(giftCardType, true);
  const decodedImage = Buffer.from(screenshot, 'base64');
  this.attach(decodedImage, 'image/png');
});

Then('the old giftcard type {string} shouldnt be displayed', async function (giftCardType) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.validateListedGiftCards);
  await cartPage.validateListedGiftCards(giftCardType, false);
});

Then('visually compare the {string} product image displayed in {string}', async function (skuIdentifier, pageName) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.compareProductImages);
  const screenshot = await this.pageObject.compareProductImages(skuIdentifier, pageName);
  const decodedImage = Buffer.from(screenshot, 'base64');
  this.attach(decodedImage, 'image/png');
});

// FREE SHIPPING

Then('verify free shipping link and popup', async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyFreeShippingPopup);
  await this.pageObject.verifyFreeShippingPopup(this);
});

Then('verify shipping discount applied in order summary', async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyShippingDiscountApplied);
  await this.pageObject.verifyShippingDiscountApplied();
});

Then('verify shipping discount not applied in order summary', async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyShippingDiscountIsNotApplied);
  await this.pageObject.verifyShippingDiscountIsNotApplied();
});

Then('verify free shipping link not displayed', async function () {
  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.verifyFreeShippingLinkNotDisplayed);
  await this.pageObject.verifyFreeShippingLinkNotDisplayed();
});
