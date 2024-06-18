const { When, Then } = require('@cucumber/cucumber');
const OrderDetailsPage = require('../../page-objects/pages/login/order-tracking-details-login.page');

Then('the account login fields should display', async function () {
  this.pageObject = OrderDetailsPage;
  await this.pageObject.VerifyLoginFields();
});
When('Customer logs in to the account', async function () {
  await this.pageObject.LoginToAccount();
});
