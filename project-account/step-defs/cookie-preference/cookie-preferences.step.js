const { When, Then } = require('@cucumber/cucumber');
const CookiePreference = require('../../page-objects/pages/cookie-preference/cookie-preference.page');

When('Customer clicks on the Cookie Settings', async function () {
  this.pageObject = CookiePreference;
  await this.pageObject.clickOnCookieSetting();
});

Then('Verifies the content of the popup', async function () {
  await this.pageObject.verifyCookieSettingContent();
});

When('Customer clicks on Reject All Cookies button', async function () {
  await this.pageObject.verifyRejectAllButton();
});

When('Clicks on Accept All Cookies button', async function () {
  await this.pageObject.verifyAcceptButton();
});
