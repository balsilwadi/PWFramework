const { When, Then } = require('@cucumber/cucumber');
const { PaymentPage } = require('../../page-objects/pages/checkout/payment.page');
const { ReviewPage } = require('../../page-objects/pages/checkout/review.page');
const { ShippingPage } = require('../../page-objects/pages/checkout/shipping.page');
const env = require('../../../support/env/env');

const paymentPage = new PaymentPage();
const reviewPage = new ReviewPage();
const shippingPage = new ShippingPage();

/**
 * @module: REVIEW PAGE
 * @description: Shipping page steps
 * */
/**
// new
Then('review page should display {string} details', async function (cardType) {
  await reviewPage.verifyPaymentInfo(this.shippingItemInfo);
});
*/

Then('review page should be displayed with the correct details', async function () {
  await reviewPage.verifyOrderDetails(this.orderDetailsInfo);
});

Then('Review Page add availability data for {string} item', async function (itemType) {
  await reviewPage.addAvailabilityMessageInReviewPage(this.orderDetailsInfo, itemType);
});

Then('Review Page verify availability data for {string} item', async function (itemType) {
  await reviewPage.verifyAvailabilityMessageInReviewPage(this.orderDetailsInfo, itemType);
});

When('customer places order from review page', async function () {
  this.orderInfo = await reviewPage.getReviewOrderSummaryJSON();
  await reviewPage.clickPlaceOrder();
});

Then('Customer is able to place order from review page', async function () {
  this.orderInfo = await reviewPage.getReviewOrderSummaryJSON();
  await reviewPage.clickPlaceOrder();
});

Then('Customer is able to place order from review page for international billing', async function () {
  this.orderInfo = await reviewPage.getReviewOrderSummaryJSON();
  this.orderInfo.isInternationalBillingAddress = true;
  await reviewPage.clickPlaceOrder();
});

Then('validate gift options info of review page', async function () {
  await reviewPage.verifyGiftOptionsInfo();
});
Then('Validate Contact info in Review page', async function () {
  await reviewPage.verifyContactInfo();
});

Then('Verify Payment info of Review page', async function () {
  // await reviewPage.VerifyPaymentInfo();
  await reviewPage.VerifyPaymentInfoNew();
});

// new
Then('review page should display {string} details', async function (cardType) {
  const cardList = [];
  cardList.push(cardType);
  await reviewPage.verifyCardUsed(cardList);
});

// new
Then('review page should display multiple cards {string} and {string} and amount used', async function (cardType1, cardType2) {
  const cardList = [];
  cardList.push(cardType1);
  cardList.push(cardType2);
  await reviewPage.verifyCardUsed(cardList);
});

Then('Validate Billing Address info with checkout page on Review page', async function () {
  await reviewPage.verifyBillingInfo();
});

Then('order summary should be updated with zero tax for APO shipments', async function () {
  await reviewPage.apoSpecificValidations();
});

Then('Click on Place Order button on Review page', async function () {
  await reviewPage.clickPlaceOrder();
});

Then('review page should display {string} and Reward details', async function (cardType) {
  const cardList = [];
  cardList.push(cardType);
  await reviewPage.verifyCardUsed(cardList);
  this.rewardInfo = await paymentPage.getRewardInfo();
  await reviewPage.verifyRewardUsed(this.rewardInfo.card);
});

Then('review page should display {string} and Multiple Reward details', async function (cardType) {
  const cardList = [];
  cardList.push(cardType);
  await reviewPage.verifyCardUsed(cardList);
  this.rewardInfo = await paymentPage.getRewardInfo();
  await reviewPage.verifyMultipleRewardUsed(this.rewardInfo.rewardsList);
});

Then('Verify Payment details in Review Page', async function () {
  this.cardInfo = await paymentPage.getTenderInfo();
  await reviewPage.verifyCardInfo(this.cardInfo);
});

Then('review page should display {string} and Gift, TenderCode, Reward details', async function (cardType) {
  const cardList = [];
  cardList.push(cardType);
  await reviewPage.verifyCardUsed(cardList);
  this.rewardInfo = await paymentPage.getRewardInfo();
  await reviewPage.verifyRewardUsed(this.rewardInfo.card);
});

Then('review page should display Gift message entered', async function () {
  await reviewPage.verfiyGiftMessage();
});

Then('review page should display the Gift box details opted', async function () {
  this.orderInfo = await reviewPage.getReviewOrderSummaryJSON();
  await reviewPage.verifyGiftBoxDetails(this.orderInfo);
});

Then('verify express summary on review page', async function () {
  await reviewPage.expressUserReviewValidation();
});

Then('Verify shop card details on Review page', async function () {
  const shopCardInfo = await paymentPage.getShopCardInfo();
  await reviewPage.verifyShopCard(shopCardInfo);
});

Then('Verify multiple recipient addresses in Review Page', async function () {
  const mulipleShipAddress = await shippingPage.getMulipleShipAddress();
  await reviewPage.verifyMultipleRecipientAddress(mulipleShipAddress);
});

Then('Registry Item label should display in the Review page', async function () {
  if (env.EXEC_SITE.includes('crateus')) await reviewPage.verifyThankYouMsgSection();
  await reviewPage.verifyRegistryItemLabel();
});

Then('Thank you manager section is displayed with correct details', async function () {
  await reviewPage.verifyThankYouMsgSection();
  await reviewPage.verifyThankyouManagerAddressDetails();
});

Then('Review Page should be updated with selected custom option', async function () {
  // await reviewPage.verifyCustomOptionOnReviewPage(this.selectedOptionCategory, this.selectedOption);
  await reviewPage.verifyCustomOptionOnReviewPage(this.itemsInfo);
});
