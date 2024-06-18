const { When, Then } = require('@cucumber/cucumber');
const CommunicationPreferenceGuestPage = require('../../page-objects/pages/comm-pref/communication-preferences-guest.page');
const { CommonUtils } = require('../../../support/utils/common-utils');

const common = new CommonUtils();

When('Customer navigates to communication preferences page', async function () {
  this.pageObject = CommunicationPreferenceGuestPage;
  await this.pageObject.navigatesToCommPrefPage();
});
Then('Text and Email drawer should display', async function () {
  await this.pageObject.verifyEmailandTextDrawer();
});
Then('Customer should opt in for sms on all brands as guest user', async function () {
  await this.pageObject.optInForSMS();
});
Then('Customer should opt in for email on all brands as guest user', async function () {
  await this.pageObject.optInForEmail(common.generateNewEmail());
});
Then('Customer should unsubscribe all from email as guest user', async function () {
  await this.pageObject.unsubscribeAll();
});
