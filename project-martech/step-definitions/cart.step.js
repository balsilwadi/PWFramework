const { When } = require('@cucumber/cucumber');
const { CartPage } = require('../page-objects/pages/cart.page');
const { ShippingPage } = require('../page-objects/pages/shipping.page');
const { PaymentPage } = require('../page-objects/pages/payment.page');
const { ReviewPage } = require('../page-objects/pages/review.page');
const env = require('../../support/env/env');

const cartPage = new CartPage();
const shippingPage = new ShippingPage();
const paymentPage = new PaymentPage();
const reviewPage = new ReviewPage();

When('they click on checkout Now button and place order', async function () {
  if (env.EXEC_SITE.includes('can')) {
    await cartPage.clickCheckoutNow();
    await shippingPage.proceedToPayment();
    await paymentPage.proceedToReview();
    await reviewPage.clickPlaceOrder();
  } else {
    await cartPage.clickCheckoutNow();
    await paymentPage.proceedToReview();
    await reviewPage.clickPlaceOrder();
  }
});

When('they increase the quantity of an item in the cart', async function () {
  await cartPage.increaseQtyOfItem(1);
});

When('they click on the Save For Later button', async function () {
  await cartPage.clickSaveForLater(1);
});

When('they click on the Move To Cart button', async function () {
  await cartPage.clickMoveToCart();
});

When('they click on the Checkout Now button', async function () {
  await cartPage.clickCheckoutNow();
});
