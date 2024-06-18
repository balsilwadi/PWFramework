const { When, Then } = require('@cucumber/cucumber');
const { CartPage } = require('../../page-objects/pages/cart/cart.page');
const { CartFlyout } = require('../../page-objects/pages/cart/cart.flyout');
const { CheckoutPage } = require('../../page-objects/pages/common/checkout.page');
const { PaymentPage } = require('../../page-objects/pages/checkout/payment.page');
const { CommonUtils } = require('../../../support/utils/common-utils');

const { assertIsFunction } = require('../../../helpers/function');
const { getSkuFromEnvFile, getZipCode } = require('../../helpers/cart-helper');

const elements = require('../../page-objects/elements/elements');

const cartPage = new CartPage();
const cartFlyout = new CartFlyout();
const checkoutPage = new CheckoutPage();
const commonUtils = new CommonUtils();
const paymentPage = new PaymentPage();

/**
 * @module: CART PAGE
 * @description: Cart page steps
 * */

When('customer removes {string} from cart', async function (sku) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickRemoveFromCart);
  const newSku = getSkuFromEnvFile(sku);
  const isSuccess = await this.pageObject.clickRemoveFromCart(newSku);
  let removedItem;
  if (isSuccess) {
    const otherItems = [];
    this.itemsInfo?.forEach(function (item) {
      const itemObj = JSON.parse(item);
      if (itemObj.skuNum === newSku) {
        removedItem = itemObj;
      } else {
        otherItems.push(itemObj);
      }
    });
    this.itemsInfo = otherItems;
    this.removedItem = removedItem;
  }
});

// LOADED CART PAGE VALIDATION
When('customer is shown the cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.cartPageBasicVerification);
  await this.pageObject.cartPageBasicVerification();
});

Then('cart page should be displayed with added item details', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartProductDetails);
  await this.pageObject.verifyCartProductDetails(this.itemsInfo);
});

Then('cart page add availability data', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartPageIsLoaded);
  await this.pageObject.verifyCartPageIsLoaded();
  await this.pageObject.addAvailabilityInfoInCart();
});

Then('cart page verify availability data', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartPageIsLoaded);
  await this.pageObject.verifyCartPageIsLoaded();
  await this.pageObject.verifyAvailabilityInfoInCart();
});

When('customer navigate back to cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.navigateBackToCart);
  await this.pageObject.navigateBackToCart();
});

// AVAILABILITY MESSAGE
Then('cart page should display same availability as seen in PDP for {string}', { timeout: 2 * 80000 }, async function (itemType) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyAvailability);
  await this.pageObject.verifyAvailability(this.itemsInfo, itemType);
});

Then('additional charges message should be displayed', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyAdditionalChargesMsgForOversizedItems);
  await this.pageObject.verifyAdditionalChargesMsgForOversizedItems(this.itemsInfo);
});

Then('MTO message should be displayed', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyMTOMessaging);
  await this.pageObject.verifyMTOMessaging();
});

Then('long distance label should be shown on cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyLongDistanceLabelInCart);
  await this.pageObject.verifyLongDistanceLabelInCart();
});

When('customer adds {string} to Save For Later', async function (sku1) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.VerifySignedIn);
  const isSignedIn = await this.pageObject.VerifySignedIn();
  await this.pageObject.validateNoSaveForLater(isSignedIn);
  await this.pageObject.validatesaveForLater(sku1);
  if (isSignedIn === true) {
    await this.pageObject.signedInContentSaveForLater();
  } else {
    await this.pageObject.guestContentSaveForLater();
  }
  await this.pageObject.getCartCount();
  await this.pageObject.getFavouritesCount();
});

Then('save For Later list should be updated', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifysaveForLaterProductDetails);
  await this.pageObject.verifysaveForLaterProductDetails(this.itemsInfo);
  await this.pageObject.getSaveForLaterCount();
  await this.pageObject.validateMoveToCart();
  await this.pageObject.verifySaveForLaterCount();
  await this.pageObject.verifyCartCount();
  await this.pageObject.verifyFavouritesCount();
});

Then('corresponding item should be removed', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartItemRemoved);
  await this.pageObject.verifyCartItemRemoved(this.removedItem, this.itemsInfo.length);
  // reset saved removedItem after verification
  this.removedItem = null;
});

Then('cart header and total should be updated', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartHeaderCount);
  await this.pageObject.verifyCartHeaderCount(this.itemsInfo);
});

Then('customer updates his zipcode to {string} in Cart', async function (zipCode) {
  let updatedZipCode;
  updatedZipCode = getZipCode(zipCode);
  if (updatedZipCode === '') {
    updatedZipCode = zipCode;
  }
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.launchZipCodePopUp);
  await this.pageObject.launchZipCodePopUp();
  await this.pageObject.enterZipCode(updatedZipCode);
  await this.pageObject.submitZipCode(updatedZipCode);
});

When('customer clicks plus icon to increment quantity for item {string}', async function (sku) {
  const newSku = await getSkuFromEnvFile(sku);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickIncrementCartItemQuantity);
  await this.pageObject.clickIncrementCartItemQuantity(newSku);
});

When('customer clicks minus icon to decrement quantity for item {string}', async function (sku) {
  const newSku = await getSkuFromEnvFile(sku);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickDecrementCartItemQuantity);
  await this.pageObject.clickDecrementCartItemQuantity(newSku);
});

Then('cart item {string} should have quantity of {string}', async function (sku, itemQuantity) {
  const newSku = await getSkuFromEnvFile(sku);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartItemQuantity);
  await this.pageObject.verifyCartItemQuantity(newSku, itemQuantity);
});

Then('verify item total updated correctly after update', async function () {
  const itemTotal = await cartPage.calculateItemTotal();
  await cartPage.assertItemTotal(itemTotal);
});

// PROCEED TO CHECKOUT STEPS
When('logged in customer proceeds to checkout', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.getOrderDetailsInfo);
  this.orderDetailsInfo = await this.pageObject.getOrderDetailsInfo(this.orderDetailsInfo);
  await this.pageObject.clickCheckoutNow();
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.findCurrentCheckoutPage);
  const currentPage = await this.pageObject.findCurrentCheckoutPage('checkoutLogin');

  if (currentPage !== 'shippingPage') {
    await this.pageObject.forceNavigationToShipping();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }
});

Then('proceed to checkout as a guest user with {string} in cart', async function (cartItemsType) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.getOrderDetailsInfo);
  this.orderDetailsInfo = await this.pageObject.getOrderDetailsInfo(this.orderDetailsInfo);
  await this.pageObject.clickCheckoutNow();
  if (cartItemsType === 'OVERSIZED_ITEMS') {
    await this.pageObject.verifyAndContinueThroughOversizedPopup();
  } else if (cartItemsType === 'CPU_ITEMS') {
    await this.pageObject.handleOversizeItemPopup();
  }
  await this.pageObject.clickGuestCheckout();
});

When('customer proceeds to checkout as a express user', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.getOrderDetailsInfo);
  this.orderDetailsInfo = await this.pageObject.getOrderDetailsInfo(this.orderDetailsInfo);
  await this.pageObject.clickCheckoutNow();
});

Then('pay with PayPal from cart and proceed to checkout as a guest user', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.getOrderDetailsInfo);
  this.orderDetailsInfo = await this.pageObject.getOrderDetailsInfo(this.orderDetailsInfo);
  this.orderDetailsInfo = await checkoutPage.setPayPalAuthorizationOrigin(this.orderDetailsInfo, 'cartPage');
  await this.pageObject.clickOnPayPal();
});

When('customer logging in from flyout and proceeds to checkout as a returning user', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.getOrderDetailsInfo);
  this.orderDetailsInfo = await this.pageObject.getOrderDetailsInfo(this.orderDetailsInfo);
  await this.pageObject.clickCheckoutNow();
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  await cartFlyout.returningCustomerSignIn();
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

  this.pageObject = checkoutPage;
  assertIsFunction(this.pageObject?.findCurrentCheckoutPage);
  const currentPage = await this.pageObject.findCurrentCheckoutPage('checkoutLogin');
  if (currentPage !== 'shippingPage') {
    await this.pageObject.forceNavigationToShipping();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }
});

// CART LINKS
Then('shipping method should be updated to {string} in cart', async function (shippingMethod) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyItemLevelShippingMethod);
  await this.pageObject.verifyItemLevelShippingMethod(shippingMethod);
});

When('customer launches shipping popup', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickOnShippingDeliveryPopUpLink);
  await this.pageObject.clickOnShippingDeliveryPopUpLink();
});

Then('shipping details corresponding to {string} should be displayed', async function (shippingMethod) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyShippingDetails);
  await this.pageObject.verifyShippingDetails(shippingMethod);
});

Then('delivery details corresponding to {string} should be displayed', async function (deliveryMethod) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyDeliveryDetails);
  await this.pageObject.verifyDeliveryDetails(deliveryMethod);
});

Then('non removable trade program discount should be applied with DTP related tooltip', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyPromoDiscountApplied);
  await this.pageObject.verifyPromoDiscountApplied();
  await this.pageObject.verifyRemovePromoIsDisabled();
});

Then('BFT label should be shown on cart page', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyBasicFreightLabelInCart);
  await this.pageObject.verifyBasicFreightLabelInCart();
});

// BOPS BOSS CPU RELATED
When('customer selects free pickup', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickFreePickup);
  await this.pageObject.clickFreePickup();
});

When('customer selects {string} warehouse for pickup', async function (selectionCriteria) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickSelectUpdateWarehouseLink);
  await this.pageObject.clickSelectUpdateWarehouseLink();
  assertIsFunction(this.pageObject?.selectLocationFromPopup);
  this.pickupLocation = await this.pageObject.selectLocationFromPopup(selectionCriteria);
});

When('storegrid should contain correct warehouse', async function (dataTable) {
  await commonUtils.clickUsingElementHandle('[data-testid=pickup-radio-btn]');
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyWarehouseDisplayedInStoreGrid);
  await this.pageObject.verifyWarehouseDisplayedInStoreGrid(dataTable);
});

// JIRA FIX
When('cart should accept all customer zipcodes from below list', { timeout: 30 * 60000 }, async function (dataTable) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyZipcodeAcceptedInCart);
  await this.pageObject.verifyZipcodeAcceptedInCart(dataTable);
});

Then('verify pickup button is not displayed for {string}', async function (skuType) {
  const sku = getSkuFromEnvFile(skuType);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyPickUpButtonNotDisplayed);
  await this.pageObject.verifyPickUpButtonNotDisplayed(sku);
});

Then('verify {string} for pickup of {string} in cart page with {string} availability', async function (pickType, skuType, availability) {
  const sku = getSkuFromEnvFile(skuType);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.validateStorePickupMessage);
  if (pickType === 'Store_PickUp_Message') {
    await this.pageObject.validateStorePickupMessage(sku);
    await this.pageObject.ValidateStorePickupAvailabilityMessage(sku, availability, this.pickupLocation);
  } else {
    await this.pageObject.validateWarehousePickupMessage(sku);
    await this.pageObject.ValidateWarehousePickupAvailabilityMessage(sku, availability, this.pickupLocation);
  }
});

Then('verify {string} for pickup of {string} in cart page when {string} selected', async function (pickType, skuType, selectedLocation) {
  const sku = getSkuFromEnvFile(skuType);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.validateWarehousePickupMessageWhenStoreSelected);
  if (selectedLocation === 'Store') {
    await this.pageObject.validateWarehousePickupMessageWhenStoreSelected(sku);
  } else if (selectedLocation === 'Warehouse') {
    await this.pageObject.validateStorePickupMessageWhenWarehouseSelected(sku);
  }
});

When('customer choose {string} for {string} in {string} with {string} availability', async function (fulfillmentType, skuType, zipCode, availability) {
  const sku = getSkuFromEnvFile(skuType);
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.openPickupLocationPopup);
  await this.pageObject.openPickupLocationPopup(sku);
  if (fulfillmentType === 'Store') this.pickupLocation = await this.pageObject.selectStore(availability);
  else this.pickupLocation = await this.pageObject.selectLocationFromPopup(availability);
  // await this.pageObject.selectPickupLocation(sku);
});

// AVAILABILITY MSGS
Then('arrives date in cart page should be {string}', async function (expectedStandardDateRange) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.assertSkuArrivesByMsg);
  const eleSkuArrivesByMsg = page.locator(elements.cartPage.lblArrivesByMessage);
  const decodedImage = await commonUtils.captureElementSnapshot(eleSkuArrivesByMsg);
  this.attach(decodedImage, 'image/png');

  await this.pageObject.assertSkuArrivesByMsg(eleSkuArrivesByMsg, expectedStandardDateRange);
});

When('customer click on arrives by message', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickOnArrivalMessage);
  await this.pageObject.clickOnArrivalMessage();
});

// CAROUSALS RELATED
When('customer add {string} item from cart carousel to cart', async function (itemPlace) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyProductCarouselIsDisplayed);
  await this.pageObject.verifyProductCarouselIsDisplayed();
  const carouselItem = JSON.stringify(await this.pageObject.addCarouselProductToCart(itemPlace));
  const carouselItemInfo = [];
  carouselItemInfo.push(carouselItem);
  this.carouselItemsInfo = carouselItemInfo;
});

Then('verify add item from cart carousel toast is displayed', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.VerifyToastIsDisplayed);
  await this.pageObject.VerifyToastIsDisplayed(this.carouselItemsInfo);
});

Then('cart list should be updated', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartCountOnAddingItemFromProductCarousel);
  await this.pageObject.verifyCartCountOnAddingItemFromProductCarousel(this.carouselItemsInfo);
  await this.pageObject.verifyAddedItemFromProductCarousel(this.carouselItemsInfo);
});

When('customer clicks view button in add item from cart carousel toast', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.clickOnViewButtonCarouselToast);
  await this.pageObject.clickOnViewButtonCarouselToast();
});

Then('page scrolls to corresponding item in cart', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyAddedItemIsInViewPort);
  await this.pageObject.verifyAddedItemIsInViewPort(this.carouselItemsInfo);
});

Then('verify carousel toast getting closed on clicking close button', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.closeCarouselToast);
  await this.pageObject.closeCarouselToast();
});

When('Customer sees the custom order messaging for cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCustomOrderMessagingOnCartPage);
  await cartPage.verifyCustomOrderMessagingOnCartPage(this.itemsInfo);
});

// REWARDS RELATED
Then('verify applied reward in cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.VerifyRewards);
  await this.pageObject.VerifyRewards();
  this.rewardInfoDetails = await paymentPage.getRewardInfo();
  await this.pageObject.verifyAppliedRewards(this.rewardInfoDetails.card);
});

// ORDER SUMMARY
Then('cart items and summary should be updated', { timeout: 2 * 80000 }, async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartOrderSummary);
  await this.pageObject.verifyCartOrderSummary(false);
  await this.pageObject.validatePromoCodeOption();
  await this.pageObject.verifyAgreementNotes();
  await this.pageObject.verifyCartStaticContents();
  await this.pageObject.validateCartBannerMessage(this.orderDetailsInfo);
});

Then('verify cart summary', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyCartOrderSummary);
  await this.pageObject.verifyCartOrderSummary(false);
});

Then('cart summary should contain message regarding where tax exemption can be applied', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyTaxExemptionCanBeAppliedMessage);
  await this.pageObject.verifyTaxExemptionCanBeAppliedMessage();
});

When('merchandise total is between {string} and {string}', async function (startRange, endRange) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.updateQuantity);
  await this.pageObject.updateQuantity(startRange, endRange);
});

Then('{string} charge should be displayed in cart summary', async function (standardShipCharge) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyShippingCharge);
  await this.pageObject.verifyShippingCharge(standardShipCharge);
  let formattedStandardShipCharge = commonUtils.parseFloatFromCurrency(standardShipCharge);
  formattedStandardShipCharge = formattedStandardShipCharge.toFixed(2);
  this.expectedShippingCharge = formattedStandardShipCharge;
});

Then('verifies whether there is no tax and shipping charges added', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyShippingAndTax);
  await this.pageObject.verifyShippingAndTax();
});

// ALTERNATE PAYMENT
Then('alternate payment options should be hidden in cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyAltPaymentsHidden);
  await this.pageObject.verifyAltPaymentsHidden();
});

// PROMO RELATED
When('customer apply {string} in cart page', async function (promo) {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.validatePromoCodeOption);
  await this.pageObject.validatePromoCodeOption();
  this.appliedPromoCode = await this.pageObject.applyPromoCode(promo);
});

Then('invalid promo code error message should display in cart page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.validateInvalidPromoCodeMessage);
  await this.pageObject.validateInvalidPromoCodeMessage(this.appliedPromoCode);
});

Then('verify free shipping message', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyFreeshippingMessage);
  await this.pageObject.verifyFreeshippingMessage();
});

Then('verify shipping discount not applied in cart summary', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyShippingDiscountIsNotAppliedInCart);
  await this.pageObject.verifyShippingDiscountIsNotAppliedInCart();
});

Then('verify shipping discount applied in cart summary', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyShippingDiscountIsAppliedInCart);
  await this.pageObject.verifyShippingDiscountIsAppliedInCart();
});

Then('verify free shipping message not displayed', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyFreeShippingMessageNotDisplayed);
  await this.pageObject.verifyFreeShippingMessageNotDisplayed();
});

Then('verify Free Shipping text in Search results page', async function () {
  this.pageObject = cartPage;
  assertIsFunction(this.pageObject?.verifyFreeShippingTextInSearchResultsPage);
  await this.pageObject.verifyFreeShippingTextInSearchResultsPage();
});
