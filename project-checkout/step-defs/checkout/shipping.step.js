const { When, Then, Given } = require('@cucumber/cucumber');
const { ShippingPage } = require('../../page-objects/pages/checkout/shipping.page');
const { PaymentPage } = require('../../page-objects/pages/checkout/payment.page');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { CommonUtils } = require('../../../support/utils/common-utils');

const env = require('../../../support/env/env');

const testReport = new ReportUtils();
const shippingPage = new ShippingPage();
const paymentPage = new PaymentPage();
const commonUtils = new CommonUtils();

/**
 * @module: SHIPPING PAGE
 * @description: Shipping page steps
 * */

Given('Customer is on the shipping page', async function () {
  await shippingPage.verifyShippingPageLoad();
});

Then('shipping page should be loaded with {string} sku details for returning user', async function (itemType) {
  await shippingPage.verifyShippingRecipientDetails(this.orderDetailsInfo);
  await shippingPage.verifyShippingMethodDetails('Ship', itemType, 'regular');
  await shippingPage.verifyReceiptEmail();
});

Then('shipping page should be updated with {string} sku details', async function (itemType) {
  await shippingPage.verifyShipTo(this.shipToAddress);
  await shippingPage.verifyShippingRecipientDetails(this.orderDetailsInfo);
  await shippingPage.verifyShippingMethodDetails('Ship', itemType, 'regular');
  await shippingPage.enterEmailReceipt();
});

Then('Shipping page add availability messages for {string} sku details by {string} for {string} address', async function (itemType, shipmentType, addressType) {
  await shippingPage.addShippingMethodAvilabilityMessages(shipmentType, itemType, addressType);
  // await shippingPage.enterEmailReceipt();
});

Then(
  'Shipping page verify availability messages for {string} sku details by {string} for {string} address',
  async function (itemType, shipmentType, addressType) {
    await shippingPage.verifyShippingMethodAvilabilityMessages(shipmentType, itemType, addressType);
    // await shippingPage.enterEmailReceipt();
  }
);

Then('{string} Personalized availability details in Shipping Page', async function (actionType) {
  await shippingPage.verifyPersonalizedDetailsForAvailability(actionType);
});

Then('shipping page should be updated with {string} sku details for {string}', async function (itemType, addressType) {
  await shippingPage.verifyShipTo(this.shipToAddress);
  await shippingPage.verifyShippingMethodDetails('Ship', itemType, addressType);
  await shippingPage.enterEmailReceipt();
});

Then('enter email address {string}', async function (email) {
  await shippingPage.enterEmailReceipt(email);
});

Then('Shipping page should display long-distance shipping rate', async function () {
  await shippingPage.verifyLongDistanceShippingRate();
});

Then('Shipping page should be updated for {string} shipments', async function (addressType) {
  await shippingPage.verifyShipTo(this.shipToAddress);
  await shippingPage.verifyShippingMethodDetails('Ship', 'PARCEL', addressType);
  await shippingPage.enterEmailReceipt();
});

Then('add {string} shipping information and click on next button', async function (addressType) {
  this.shipToAddress = await shippingPage.enterShippingAddress(addressType);
  await shippingPage.clickShipAddressNext();
});

When('the customer clicks on the Shipping Address Next button', async function () {
  await shippingPage.clickShipAddressNext();
});

Then('customer selects notification preferences from shipping page', async function () {
  if (global.isSmsOptInEnabledForFT) {
    await shippingPage.verifyNotificationTextMessagingDetails();
  } else {
    await shippingPage.selectNotificationPreferences();
  }
});

Then('customer selects post transaction delivery from shipping page', async function () {
  await shippingPage.selectPostTranTripSelection();
});

Then('shipping page should be loaded with gifting details', async function () {
  await shippingPage.verifyGiftMessageDetails();
});

Then('Customer opts for GiftBoxing for items in shipping page', async function () {
  await shippingPage.selectGiftBox(true);
});

Then('customer selects shipmode {string} from shipping page', async function (shipMode) {
  const newShipMode = shipMode === 'DEFAULT_SHIPMODE' ? env.DEFAULT_SHIPMODE : shipMode;
  await shippingPage.selectShipMode(newShipMode);
});

When('customer enters shipping information for {string} and clicks Next button', { timeout: 2 * 100000 }, async function (type) {
  this.shipToAddress = await shippingPage.enterShippingAddress(type);
  await shippingPage.clickShipAddressNext();
});

When('Customer clicks use as billing checkbox', async function () {
  await shippingPage.clickUseAsBilling();
});

Then('add shipping information and click on next button', { timeout: 2 * 100000 }, async function () {
  this.shipToAddress = await shippingPage.enterShippingAddress();
  await shippingPage.clickShipAddressNext();
});

Then('add pickup information and click on Next button', { timeout: 2 * 100000 }, async function () {
  await shippingPage.verifyPickupNotificationMsg();
  await shippingPage.verifyBopsSection();
  await shippingPage.fillBopsPickupContactForm();
  // await shippingPage.enterPickupInfo();
  await shippingPage.enterEmailReceipt();
  await shippingPage.verifyNotificationTextMessagingDetails();
  this.orderDetailsInfo = await shippingPage.getOrderDetailsInfo(this.orderDetailsInfo);
  testReport.log(this.pageName, `this.orderDetailsInfo-->${JSON.stringify(this.orderDetailsInfo)}`);
  await shippingPage.proceedToPayment();
});

Then('Add billing information in payment page and Proceed', { timeout: 2 * 100000 }, async function () {
  this.shipToAddress = await shippingPage.enterShippingAddress();
  this.orderDetailsInfo = await paymentPage.getPaymentInfo(this.orderDetailsInfo);
  await paymentPage.submitBillingAddressForm();
  await shippingPage.handleAvsPopup();
});

When(
  'Add shipping information with opt-in to use as billing set to {string} and clicks on "Next" button',
  { timeout: 2 * 100000 },
  async function (isUseAsBilling) {
    this.shipToAddress = await shippingPage.enterShippingAddress();
    if (isUseAsBilling === 'FALSE') await shippingPage.clickUseAsBilling();
    await shippingPage.clickShipAddressNext();
  }
);

Then('verify {string} validation error displays as a popup in shipping', { timeout: 2 * 100000 }, async function (type) {
  this.shipToAddress = await shippingPage.enterShippingAddress(type);
  this.shipToAddress = await shippingPage.clickShipAddressNextAVS(this.shipToAddress);
  await shippingPage.verifyShipTo(this.shipToAddress);
  await shippingPage.enterEmailReceipt();
});

Then('verify {string} validation error popup in billing address', { timeout: 2 * 100000 }, async function (type) {
  this.shipToAddress = await shippingPage.updateBillingAddressforAVS(type);
  await shippingPage.clickShipAddressNextAVS();
});

Then('Verify Ship To address on Checkout page', async function () {
  await shippingPage.verifyShipTo();
  // await shippingPage.selectShipMode('Standard')
});

Then('customer adds gift message in shipping page', { timeout: 2 * 280000 }, async function () {
  await shippingPage.verifyGiftMessageDetails();
  await shippingPage.enterGiftMessage(true);
});

Then('Customer opts Gift Box for {string} items', async function (selectionType) {
  await shippingPage.selectGiftBoxWithGivenSelectionType(selectionType);
});

When('Enter Receipt email and Verify reward dollar amount on checkout page', async function () {
  await shippingPage.enterEmailReceipt();
});

When('the customer enters a receipt email address', async function () {
  await shippingPage.enterEmailReceipt();
});

When('customer proceeds to payment page', async function () {
  this.orderDetailsInfo = await shippingPage.getOrderDetailsInfo(this.orderDetailsInfo);
  await testReport.log(this.pageName, `this.orderDetailsInfo-->${this.orderDetailsInfo}`);
  await shippingPage.proceedToPayment();
});

Then('Shipping page should display BFT shipping rate', async function () {
  await shippingPage.verifyBasicFreightShippingRate();
});

Then('Choose the ship to multiple addresses', async function () {
  await shippingPage.selectMutipleAddress();
  await shippingPage.clickShipAddressNext();
});

Then('choose the ship to multiple addresses and select ship to registrants address', async function () {
  await shippingPage.selectMutipleAddress();
  await shippingPage.clickShipAddressNext();
});

Then('Enter giftbox option and add message for multiple recipient', async function () {
  await shippingPage.enterMultipleGiftMessage();
});

Then('Verify multiple recipient addresses', async function () {
  const mulipleShipAddress = await shippingPage.getMulipleShipAddress();
  await shippingPage.verifyMultipleRecipientAddress(mulipleShipAddress);
});

Then('verify pickup location warehouse displayed', async function () {
  await shippingPage.verifyRecipientPickupInfo(this.pickupLocation);
});

Then('shipping page should be loaded with Warehouse Pickup details', async function () {
  await shippingPage.verifyShippingMethodDetails('Pickup', 'FURNITURE', 'regular');
  await shippingPage.enterEmailReceipt();
  if (global.isSmsOptInEnabledForFT) {
    await shippingPage.verifyNotificationTextMessagingDetails();
  } else {
    await shippingPage.selectNotificationPreferences();
  }
});

Then('customer opts schedule pickup later', async function () {
  const fulfillmentType = 'Pickup';
  await shippingPage.scheduleTripCalendarDate(fulfillmentType, false);
});

Then('Verify AK shipping address changes in the shipping page', async function () {
  await shippingPage.verifyShipToAK();
});

Then('verify the Shipping charge displayed for {string} shipmode', async function (shipMode) {
  let shippingCharge;
  switch (shipMode) {
    case 'Standard':
      await shippingPage.verifyShippingCharge('Standard', this.expectedShippingCharge);
      break;
    case 'Premium':
      shippingCharge = parseFloat(this.expectedShippingCharge) + parseFloat(env.SHIP_SURCHARGE_PREMIUM);
      await shippingPage.verifyShippingCharge('Premium', shippingCharge);
      break;
    case 'Express':
      shippingCharge = parseFloat(this.expectedShippingCharge) + parseFloat(env.SHIP_SURCHARGE_EXPRESS);
      await shippingPage.verifyShippingCharge('Express', shippingCharge);
      break;
    default:
      await testReport.log(`Invalid shipmode`);
  }
});

Then('shipping charge in order summary should be updated for {string}', async function (selectedShipmode) {
  let expectedShipCharge = 0.0;
  if (selectedShipmode === 'Premium') {
    expectedShipCharge = parseFloat(this.expectedShippingCharge) + parseFloat(env.SHIP_SURCHARGE_PREMIUM);
  } else if (selectedShipmode === 'Express') {
    expectedShipCharge = parseFloat(this.expectedShippingCharge) + parseFloat(env.SHIP_SURCHARGE_EXPRESS);
  }
  await shippingPage.verifyShippingChargeInShippingPageOrderSummary(expectedShipCharge);
});

When('the customer clicks on add new address and enter the address', async function () {
  await shippingPage.clickOnAddNewAddress();
  this.shipToAddress = await shippingPage.enterShippingAddress();
  await shippingPage.clickShipAddressNext();
});

When('verify and add new address in the shipping page', async function () {
  const result = await shippingPage.enterShippingAddress();
  if (result) {
    this.shipToAddress = result;
    await shippingPage.clickShipAddressNextAVS();
  }
});

Then('shipping page should be updated with selected custom option', async function () {
  // await shippingPage.verifyShipTo(this.shipToAddress);
  // await shippingPage.verifyCustomOptionOnShippingPage(this.selectedOptionCategory, this.selectedOption);
  await shippingPage.verifyCustomOptionOnShippingPage(this.itemsInfo);
  await shippingPage.verifyShipTo(this.shipToAddress);
  await shippingPage.enterEmailReceipt();
});

Then('arrives date for {string} in shipping page should be {string}', async function (shipMode, expectedStandardDateRange) {
  const actualShipModArrivesText = await shippingPage.getShipModArrivesText(shipMode);
  await shippingPage.assertShipModArrivesText(expectedStandardDateRange, actualShipModArrivesText);
  const eleStrshipmentArrivesBy = page.locator(`li:has-text("${shipMode}")`);
  const decodedImage = await commonUtils.captureElementSnapshot(eleStrshipmentArrivesBy);
  this.attach(decodedImage, 'image/png');
});
