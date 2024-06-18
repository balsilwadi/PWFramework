const { When, Then } = require('@cucumber/cucumber');
const LoginFromPDP = require('../../page-objects/pages/login/login-from.pdp.page');

Then('Customer should navigate to PDP', async function () {
  this.pageObject = LoginFromPDP;
  await this.pageObject.verifyPDPDisplays();
});

When('Customer clicks on the Favorites icon', async function () {
  await this.pageObject.clickOnFavorites();
});

When('Customer clicks on Sign in link in Favorites', async function () {
  this.pageObject = LoginFromPDP;
  await this.pageObject.clickOnSigninLink();
});

Then('Customer should stay on the PDP', async function () {
  await this.pageObject.verifyPDPDisplays();
});
