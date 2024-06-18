const { When, Then } = require('@cucumber/cucumber');

const { FooterPage } = require('../page-objects/footer.page');

const footerPage = new FooterPage();

When('customer navigates to footer', async function () {
  await footerPage.navigateToFooter();
});

Then('customer verifies Contact us', async function () {
  await footerPage.verifyContactUs();
});

Then('customer verifies Crate and Barrel Credit Card', async function () {
  await footerPage.verifyCBCreditCard();
});

Then('customer verifies Order Tracking & Schedule Delivery', async function () {
  await footerPage.verifyOrderTrackingScheduledDelivery();
});

Then('customer verifies WeddingRegistry image', async function () {
  await footerPage.verifyWeddingRegistry();
});

Then('customer verifies OurCompany options', async function () {
  await footerPage.verifyOurCompanyOptions();
});

Then('customer verifies Resources options', async function () {
  await footerPage.verifyResourcesOptions();
});

Then('customer verifies ShoppingApp options', async function () {
  await footerPage.verifyShoppingApp();
});

Then('customer verifies SocialMedia options', async function () {
  await footerPage.verifySocialMedia();
});

Then('customer verifies footer line options', async function () {
  await footerPage.verifyFooterMeta();
});
