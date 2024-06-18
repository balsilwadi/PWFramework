const { When, Then } = require('@cucumber/cucumber');
const OrderTrackingPage = require('../../page-objects/pages/order-tracking/order-tracking.page');

Then('Customer should see sign in section in order tracking page', async function () {
  await this.pageObject.verifySignInArea();
});
Then('Customer should see {string} account email prepopulated in order tracking page', async function (scenario) {
  await this.pageObject.verifyPrePopulatedEmail(scenario);
});
When('Customer enter the password of {string} account', async function (scenario) {
  await this.pageObject.enterPassword(scenario);
});
When('Customer Sign in to account from order tracking page', async function () {
  await this.pageObject.clickOnSignInButton();
});

When('Customer clicks on track orders from header', async function () {
  this.pageObject = OrderTrackingPage;
  await this.pageObject.goto();
});

Then('Order tracking page displayed with create account option', async function () {
  await this.pageObject.verifyCreateAccountArea();
});

When('Customer clicks on create account button from order tracking page', async function () {
  await this.pageObject.clickOnCreateAccountButton();
});
