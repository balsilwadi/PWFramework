const { Given, When, Then } = require('@cucumber/cucumber');
const SMSOnlyIntPage = require('../../page-objects/pages/interrupter/sms-only-interrupter.page');

When('Customer navigates to home page', async function () {
  this.pageObject = SMSOnlyIntPage;
  await this.pageObject.navigateToHomePage();
});
Then('SMS only interrupter should display', async function () {
  await this.pageObject.verifySMSOnlyInterrupter();
});
Then('Customer should able to submit the SMS only interrupter', async function () {
  await this.pageObject.SubmitSMSOnlyInterrupter();
});
Given('Launch the Home Page', async function () {
  this.pageObject = SMSOnlyIntPage;
  await this.pageObject.launchTestsite();
});
