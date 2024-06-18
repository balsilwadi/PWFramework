const { Given, When, Then } = require('@cucumber/cucumber');
const { CartPage } = require('../../page-objects/pages/cart/cart.page');
const { ShippingPage } = require('../../page-objects/pages/checkout/shipping.page');
const { CheckoutPage } = require('../../page-objects/pages/common/checkout.page');
const { ReviewPage } = require('../../page-objects/pages/checkout/review.page');
const { SharedRegistryPage } = require('../../../project-gift-registry/page-objects/shared-registry.page');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { ConfirmationPage } = require('../../page-objects/pages/checkout/confirmation.page');

const env = require('../../../support/env/env');

const testReport = new ReportUtils();
const sharedRegistryPage = new SharedRegistryPage();
const cartPage = new CartPage();
const shippingPage = new ShippingPage();
const reviewPage = new ReviewPage();
const checkoutPage = new CheckoutPage();
const confirmationPage = new ConfirmationPage();

When('the customer navigates to the shared registry link, {string}', async function (sharedRegistryLink) {
  const link = await cartPage.getSharedRegistryUrlFromEnv(sharedRegistryLink);
  await page.goto(link);
});

Given('the customer has navigated to the shared registry link, {string}', async function (sharedRegistryLink) {
  const link = await cartPage.getSharedRegistryUrlFromEnv(sharedRegistryLink);
  await page.goto(link);
});

When('the customer adds a registry gift card to cart in the amount of {string}', async function (giftCardValue) {
  await sharedRegistryPage.handlePopUp();
  await sharedRegistryPage.addGiftCardToCart(giftCardValue);
});

Then('the new {string} giftcard for wedding registry should be displayed', async function (giftCardType) {
  await sharedRegistryPage.validateGiftCardImage(giftCardType);
});
When('the customer adds first item to cart', async function () {
  await sharedRegistryPage.addFirstItemToCart();
});

Then('click on CHECKOUT NOW button in gift registry flyout', async function () {
  await sharedRegistryPage.clickCheckoutNow();
  await cartPage.verifyCartPageIsLoaded();
});

When('the customer navigates to the cart page', async function () {
  await page.goto(`${env.BASE_URL}/checkout/cart`);
});

Then('the gift card cart item should show a view registry link', async function () {
  await cartPage.verifyGiftRegistryViewRegistryLink();
});

Then('the registry item in the cart should show a view registry link', async function () {
  await cartPage.verifyGiftRegistryViewRegistryLink();
});

Then('select pickup option and choose the store', async function () {
  await cartPage.selectStorePickup();
});

Then('Registry Item label should display in the shipping page', async function () {
  await shippingPage.verifyRegistryItemLabel();
});

When('the customer closes the popup if showing', async function () {
  try {
    const popupCloseBtn = page.locator('#popup-close');
    await popupCloseBtn.click();
  } catch (e) {
    testReport.log(this.pageName, `Error locating popup close button, moving on: ${e}`);
  }
});

Then('the ship to registrant message should be visible on the Shipping page', async function () {
  await shippingPage.verifyShipToRegistrantMessage();
});

When('the customer shipping to a gift registrant address proceeds to the Payment page', async function () {
  await shippingPage.proceedToPayment();
});

When('the customer shipping to a gift registrant address proceeds to the Review page', async function () {
  await reviewPage.proceedToReviewPageAndValidate();
});

Then('the ship to registrant message should be visible on the Review page', async function () {
  await reviewPage.verifyShipToRegistrantMessage();
});

When('the customer buying gift registry items places an order from the Review page', async function () {
  await reviewPage.clickPlaceOrder();
});

Then('the ship to registrant message should be visible on the Confirmation page', async function () {
  await checkoutPage.closeSurveyPopupIfShown();
  await confirmationPage.verifyShipToRegistrantMessage();
});

When('the customer adds second item to cart', async function () {
  await sharedRegistryPage.addSecondItemToCart();
});

When('the customer closes the gift registry checkout flyout', async function () {
  await sharedRegistryPage.closeChkoutFlyout();
});

When('the customer opts to ship to customers address', async function () {
  await shippingPage.clickOnGRShipToNewAddress();
  this.shipToAddress = await shippingPage.enterShippingAddress();
});
