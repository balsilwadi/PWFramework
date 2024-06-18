const { When, Then } = require('@cucumber/cucumber');
const CommunicationPreferencePage = require('../../page-objects/pages/comm-pref/communication-preferences.page');

When('Clicks on Preferences link', async function () {
  this.pageObject = CommunicationPreferencePage;
  await this.pageObject.clickOnPreferencesLink();
  await this.pageObject.clickOnEmailandTextLink();
});
Then('Communication preferences page should display', async function () {
  await this.pageObject.verifyCommPrefPage();
});
Then('Logged in user Text and Email drawer should display', async function () {
  await this.pageObject.verifyEmailandTextDrawer();
});
Then('Customer should opt in for sms on all brands', async function () {
  await this.pageObject.optInForSMS();
});
Then('Customer should opt in for email on all brands', async function () {
  await this.pageObject.optInForEmail();
});
Then('Email opt in should successful', async function () {
  await this.pageObject.verifyEmailOptIn(this.data.newEmail);
});
Then('Customer should unsubscribe all from email', async function () {
  this.pageObject = CommunicationPreferencePage;
  await this.pageObject.unsubscribeAll();
});
