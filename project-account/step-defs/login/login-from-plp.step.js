const { When, Then } = require('@cucumber/cucumber');
const LoginFromPLP = require('../../page-objects/pages/login/login-from.plp.page');

Then('Customer navigates to PLP', async function () {
  this.pageObject = LoginFromPLP;
  this.setData('currentURL', await this.pageObject.storeThePlpUrl());
});

When('Customer clicks on Favorites icon in PLP', async function () {
  await this.pageObject.clickOnFavoriteInPLP();
});

When('Customer should stay on the PLP', async function () {
  this.pageObject = LoginFromPLP;
  await this.pageObject.verifyCustomerStaysOnPLP(this.data.currentURL);
});
