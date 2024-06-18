const { When, Then } = require('@cucumber/cucumber');
const { SeoFreeShippingPage } = require('../page-objects/pages/seo-free-shipping.page');

const seoFreeShippingPage = new SeoFreeShippingPage();

Then('Verify free shipping item is present in the page', async function () {
  await seoFreeShippingPage.verifyFreeShippingItems();
});

When('Customer selects free shipping item', async function () {
  await seoFreeShippingPage.selectFirstFreeShippingItem();
});

Then('Customer should navigate to free shipping item page', async function () {
  await seoFreeShippingPage.verifyPDPIsLoaded();
});

Then('Verify the Canonical url in the free shipping page', async function () {
  await seoFreeShippingPage.verifyCanonicalUrl();
});

Then('Verify the OG url in the free shipping page', async function () {
  await seoFreeShippingPage.verifyOgUrl();
});

Then('Verify the OG Type tag in the free shipping page', async function () {
  await seoFreeShippingPage.verifyOgType();
});

Then('Verify the h1 tag displayed in the free shipping page', async function () {
  await seoFreeShippingPage.verifySeoHeader1Tag();
});
