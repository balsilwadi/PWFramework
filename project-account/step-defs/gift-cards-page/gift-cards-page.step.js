const { When, Then } = require('@cucumber/cucumber');
const { CartPage } = require('../../../project-checkout/page-objects/pages/cart/cart.page');
const GiftCards = require('../../page-objects/pages/gift-cards-page/gift-cards-page.page');

const cartPage = new CartPage();

When('Customer navigates to gift cards page', async function () {
  await cartPage.loadGiftCardPage();
});

Then('gift cards page should be loaded', async function () {
  await GiftCards.verifyGiftPageIsLoaded();
});

Then('eGift card button takes to Vendor page', async function () {
  await GiftCards.verifyVendorPageLoaded();
});

When('Customer adds gift card to the cart', async function () {
  await GiftCards.addGiftCardToCart();
});

Then('gift card should be added', async function () {
  await GiftCards.verifyGiftCardToCart();
});

Then('Gift Card FAQs link should navigate to FAQ page', async function () {
  await GiftCards.verifyeGiftCrardsFAQpage();
});
