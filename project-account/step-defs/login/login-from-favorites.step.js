const { When, Then } = require('@cucumber/cucumber');
const LoginFromFavorites = require('../../page-objects/pages/login/login-from.favorites.page');

When('Customer hover the Favorites menu and click on Sign in link', async function () {
  this.pageObject = LoginFromFavorites;
  await this.pageObject.launchSigninPopupFromFavorites();
});

Then('Customer should navigate to Favorites page', async function () {
  this.pageObject = LoginFromFavorites;
  await this.pageObject.verifyFavoritePageDisplayed();
});
