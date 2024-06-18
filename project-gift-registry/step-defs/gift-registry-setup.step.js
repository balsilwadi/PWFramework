const { Given, Then, When } = require('@cucumber/cucumber');
const { GiftRegistry } = require('../page-objects/pages/gift-registry-setup.page');

const giftRegistry = new GiftRegistry();

/**
 * @module: GIFT REGISTRY SETUP page
 * @description: Navigates directly to the form.
 * */

Given('the customer is on the Gift Registry Setup page', async function () {
  await giftRegistry.goToGiftRegistrySetup();
});
Then('Gift Registry form page should show', async function () {
  await giftRegistry.validateGiftRegistrySetupPage();
});
When('the customer fills out the Gift Registry setup with {string}', async function (email) {
  await giftRegistry.fillOutGiftRegistrySetupAndAuth(email);
});
Then('the customer submits the Gift Registry setup with {string}, {string}', async function (email, password) {
  await giftRegistry.submitGiftRegistrySetupAndAuth(email, password);
});
Then('the customer submits the Gift Registry setup with {string}, {string} and expects existing account', async function (email, password) {
  await giftRegistry.submitGiftRegistrySetupAndAuth(email, password, true);
});
Then('the customer submits the Gift Registry setup with {string}, {string} and does not expect existing account', async function (email, password) {
  await giftRegistry.submitGiftRegistrySetupAndAuth(email, password, false);
});
When('the customer fills out the Gift Registry Contact form', async function () {
  await giftRegistry.fillOutGiftRegistryContactForm(true);
});
Then('the Gift Registry Location form loads with same address', async function () {
  await giftRegistry.verifyLocationAddressesMatch();
});
When('the customer fills out the Gift Registry Location form', async function () {
  await giftRegistry.fillOutGiftRegistryLocationForm();
});
When('the customer fills out the Gift Registry Preferences form', async function () {
  await giftRegistry.fillOutGiftRegistryPreferencesForm();
});
Then('the New Gift Registry page loads', async function () {
  await giftRegistry.validateNewGiftRegistryPage();
});
Then('go to Registrant Page', async function () {
  await giftRegistry.goToRegistrantPageTesting();
});
Then('go to Edit Page', async function () {
  await giftRegistry.gotoEditPage();
});
Then('verify the Edit Gift Registry page loads correctly', async function () {
  await giftRegistry.verifyContactInfoMatch();
  await giftRegistry.verifyLocationAddressesMatch();
  await giftRegistry.verifyRegistryPreferencesMatch();
});
