const { When, Then } = require('@cucumber/cucumber');
const { PaymentPage } = require('../../page-objects/pages/checkout/payment.page');
const { ConfirmationPage } = require('../../page-objects/pages/checkout/confirmation.page');
const { CheckoutPage } = require('../../page-objects/pages/common/checkout.page');
const { ShippingPage } = require('../../page-objects/pages/checkout/shipping.page');

const paymentPage = new PaymentPage();
const confirmationPage = new ConfirmationPage();
const checkoutPage = new CheckoutPage();
const shippingPage = new ShippingPage();

/**
 * @module: CONFIRMATION PAGE
 * @description: Shipping page steps
 * */

Then('Verify Thank you message on Confirmation page', async function () {
  await checkoutPage.closeSurveyPopupIfShown();
  await confirmationPage.verifyConfirmationMsg();
});

Then('Validate order details on Confirmation page', async function () {
  await confirmationPage.verifyOrderDetails();
});

When('Click on Print Receipt link on Confirmation page', async function () {
  await confirmationPage.clickOnPrintReceiptLink();
});

Then('Handle the Print dialog by clicking on Cancel button', async function () {
  await confirmationPage.handlePrintDlg();
});

When('Click on View Order details link on Confirmation page', async function () {
  await confirmationPage.clickOnViewOrderDetailsLink();
});

// new
Then('customer should be taken to confirmation page', async function () {
  await checkoutPage.closeSurveyPopupIfShown();
  await confirmationPage.verifyOrderConfirmationDetails(this.orderInfo);
});

// new
Then('confirmation page should be displayed with detailed order information', async function () {
  await confirmationPage.validateRecipientDetails(this.orderInfo);
});

Then('Confirmation page add availability data', async function () {
  await confirmationPage.addAvailabilityMessageInConfirmationPage(this.orderInfo);
});

Then('Confirmation page verify availability data', async function () {
  await confirmationPage.verifyAvailabilityMessageInConfirmationPage(this.orderInfo);
});

// new
Then('confirmation order summary should be displayed correctly', async function () {
  await confirmationPage.verifyReviewOrderSummary(this.orderInfo);
});

// new
Then('Confirmation Order summary should be displayed with Gift box charge', async function () {
  await confirmationPage.verifyConfirmationGiftBoxOrderSummary(this.orderInfo);
});

Then('confirmation page should be displayed with detailed rewards and order information', async function () {
  this.rewardInfoDetails = await paymentPage.getRewardInfo();
  await confirmationPage.verifyRewardUsed(this.rewardInfo.card);
  await confirmationPage.validateRecipientDetails(this.orderInfo);
});

Then('Confirmation page should be displayed with detailed multiple rewards and order information', async function () {
  this.rewardInfoDetails = await paymentPage.getRewardInfo();
  await confirmationPage.verifyMultipleRewardUsed(this.rewardInfo.rewardsList);
  await confirmationPage.validateRecipientDetails(this.orderInfo);
});

Then('Verify shop card details on Confirmation page', async function () {
  const shopCardInfo = await paymentPage.getShopCardInfo();
  await confirmationPage.verifyShopCard(shopCardInfo);
});

Then('Verify multiple recipient addresses in Confirmation Page', async function () {
  const mulipleShipAddress = await shippingPage.getMulipleShipAddress();
  await shippingPage.verifyMultipleRecipientAddress(mulipleShipAddress);
});

Then('Registry Item label should display in the confirmation page', async function () {
  await confirmationPage.verifyRegistryItemLabel();
});

Then('verify ACA address in the confirmation page', async function () {
  await confirmationPage.verifyAutoCorrectionAddress();
});

Then('Confirmation page shows custom order messaging', async function () {
  // await confirmationPage.verifyCustomOrderMessaging(this.selectedOptionCategory, this.selectedOption);
  await confirmationPage.verifyCustomOrderMessaging(this.itemsInfo);
});
