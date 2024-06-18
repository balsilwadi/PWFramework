const { When, Then } = require('@cucumber/cucumber');
const { CartPage } = require('../../page-objects/pages/cart/cart.page');
const { CheckoutPage } = require('../../page-objects/pages/common/checkout.page');
const { PaymentPage } = require('../../page-objects/pages/checkout/payment.page');

const paymentPage = new PaymentPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

/**
 * @module: PAYMENT PAGE
 * @description: Payment page steps
 * */

Then('Click on proceed to Review button', async function () {
  await cartPage.proceedToReview();
});

Then('payment page should be displayed with the details', async function () {
  // insert code here
});

Then('Payment page should have a default Promo code applied', async function () {
  await paymentPage.verifyPromoDiscountApplied();
  await paymentPage.verifyRemovePromoIsDisabled();
});

When('Select alternate payment {string} and proceed to Review page', { timeout: 2 * 200000 }, async function (paymentType) {
  await paymentPage.selectPayPalAsPaymentMethod(paymentType);
  this.orderDetailsInfo = await checkoutPage.setPayPalAuthorizationOrigin(this.orderDetailsInfo, 'paymentPage');
  this.paymentType = 'PayPal';
});

// new step
When('customer selects multiple creditcards {string} and {string} from saved payment', async function (cardType1, cardType2) {
  await paymentPage.clickPayWith2CreditCards();
  await paymentPage.selectMultipleCreditCards(cardType1, cardType2);
});
// new step
When('customer selects {string} from saved payment', async function (cardType) {
  await paymentPage.checkIfCardNeedsToBeVerified();
  const blnIsRequestedCardMatcheswithSelectedCard = await paymentPage.isRequestedCardMatcheswithSelectedCard(cardType);
  let selectedCardFromSavedPayment;
  if (!blnIsRequestedCardMatcheswithSelectedCard) {
    const isAdded = await paymentPage.newCreditCardForm(cardType);
    if (!isAdded) {
      await paymentPage.clickOnChangeCard();
      selectedCardFromSavedPayment = await paymentPage.selectCardFromSavedPayment(cardType);
    }
  } else {
    selectedCardFromSavedPayment = 'requestedIsDefault';
  }
  this.selectedCardFromSavedPayment = selectedCardFromSavedPayment;
});

// new step
Then('enter {string} payment details and proceed to review page', async function (cardType) {
  await paymentPage.enterPaymentAndProceedToReview(cardType);
});

When('customer enters {string} payment details and proceeds to review page', async function (cardType) {
  await paymentPage.enterPaymentAndProceedToReview(cardType);
});

Then('Navigates back to Home page from Checkout process', async function () {
  await checkoutPage.clickLogoFromCheckout();
});

// new step
Then('Verify {string} credit card exists on Payment page', async function (cardType) {
  await paymentPage.verifyCreditCardSaved(cardType);
});

// new step
When('payment Information should reflect the {string} payment', async function (cardType) {
  await paymentPage.verifySelectedCreditCard(cardType, this.selectedCardFromSavedPayment);
  await paymentPage.verifyBillingAddress();
});

When('payment Information should reflect the {string} card type', async function (cardType) {
  await paymentPage.verifySelectedCreditCard(cardType, this.selectedCardFromSavedPayment);
});

// new step
Then('Payment page shows information for {string} card type', async function (cardType) {
  await paymentPage.verifySelectedCreditCard(cardType, this.selectedCardFromSavedPayment);
  await paymentPage.verifyBillingAddress();
  // await checkoutPage.verifyOrderSummary(this);
});

When('payment Information should reflect the {string} and {string} payment', async function (cardType1, cardType2) {
  const cardList = cardType1 + cardType2;
  await paymentPage.verifySelectedCreditCard(cardList, this.selectedCardFromSavedPayment);
  await paymentPage.verifyBillingAddress();
});

// new step
When('Payment Information should be updated with the {string} payment', async function (paymentType) {
  await paymentPage.isPayPalUsedAsPaymentMethod(paymentType);
  this.paymentType = paymentType;
  await paymentPage.verifyPayPalBillingAddrress();
});

When('Click on Pay with 2 credit cards link on checkout page', async function () {
  await paymentPage.clickPayWith2CreditCards();
});

When('Enter 2 credit cards details on checkout page', async function () {
  await paymentPage.selectCreditCardAsPaymentMethod();
});

Then('Select Multiple Creditcards from saved payments', async function () {
  await paymentPage.selectSavedPayment('multipleCards');
});

// new
Then('enter amount for the additional card selected', { timeout: 2 * 200000 }, async function () {
  await paymentPage.populateMultipleCreditCardAmt('1.93');
});

Then('Enter payment card details under payment page and Click on Apply New Card link {string}', { timeout: 2 * 200000 }, async function (cardType) {
  await paymentPage.populateCreditCardForm(cardType);
  await paymentPage.applyNewCreditCard();
});

When('enter {string} details on payment page', async function (giftCardType) {
  const appliedGiftCard = await paymentPage.applyGiftCard(giftCardType);
  this.appliedGiftCard = appliedGiftCard;
});

Then('verify {string} details on payment page', { timeout: 2 * 200000 }, async function (giftCardType) {
  await paymentPage.verifyGiftCardOption(giftCardType, this.appliedGiftCard);
});

When('Apply TenderCode and GiftCard', async function () {
  await paymentPage.applyTenderCode(true);
  await paymentPage.applyGiftCard(true);
});

Then('Verify promo code details on Payment page', async function () {
  await paymentPage.applyPromoCode(true);
});

Then('Verify tender code details on Payment page', async function () {
  await paymentPage.applyTenderCode(true);
});

Then('Verify Billing Address on Payment Billing page', async function () {
  await paymentPage.verifyBillingAddress();
});

// new
When('customer proceeds to review page', async function () {
  await paymentPage.verifyBillingAddress();
  this.orderDetailsInfo = await paymentPage.getPaymentInfo(this.orderDetailsInfo, this.paymentType);
  await paymentPage.proceedToReview(this.orderDetailsInfo);
  await paymentPage.verifyPlccPopup();
});

When('customer proceeds to review page after entering {string} billing address', async function (billingAddressType) {
  const billingAddressAsString = Object.values(this.billingAddressData).join(' ').replace('billing address', '');
  let isBillingAddressInternational = false;
  if (billingAddressType === 'DOMESTIC') {
    isBillingAddressInternational = true;
  }
  this.orderDetailsInfo = await paymentPage.getPaymentInfo(this.orderDetailsInfo, this.paymentType, billingAddressAsString, isBillingAddressInternational);
  const newAddressEnteredFlag = true;
  await paymentPage.proceedToReview(this.orderDetailsInfo, newAddressEnteredFlag);
  await paymentPage.verifyPlccPopup();
});

Then('Enter {string} payment details changecard and proceed to Review page', async function (cardType) {
  await paymentPage.selectCreditCardAsPaymentMethod();
  await paymentPage.clickOnChangeCard();
  await paymentPage.clickOnApplyNewCard();
  await paymentPage.populateCreditCardForm(cardType);
  await paymentPage.applyNewCreditCard();
  await paymentPage.verifyRewards();
});

Then('apply reward for CBCC card', async function () {
  await paymentPage.verifyRewards();
  await paymentPage.applyReward();
});

Then('apply multiple rewards for cbcc cards', { timeout: 2 * 200000 }, async function () {
  await paymentPage.verifyRewards();
  await paymentPage.applyMultipleRewards();
});

Then('Payment page should be displayed with DTP details', async function () {
  if (this.isDtpExemptionApplied === true) {
    await paymentPage.verifyTaxExemptionFieldsDisplayed();
  }
  await paymentPage.verifyAltPaymentsHidden();
});

When('Customer clicks Tax Exemption Checkbox', async function () {
  await paymentPage.clickTaxExemptionCheckbox();
  this.isDtpExemptionApplied = true;
  await paymentPage.waitForLoadingComplete();
});

Then('verify tax exemption is disabled', async function () {
  await paymentPage.verifyTaxExemptionIsDisabled();
});

When('customer enters a billing address', async function () {
  await paymentPage.enterBillingAddress();
});

When('customer enters {string} billing address', async function (addressType) {
  this.billingAddressData = await paymentPage.enterBillingAddress(addressType);
});

Then('Payment page shows custom order messaging', async function () {
  await paymentPage.verifyCustomOrderMessaging();
});
