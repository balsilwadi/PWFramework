const { When, Then } = require('@cucumber/cucumber');
const { FavoritesPage } = require('../../page-objects/pages/account-page/favorites.page');
const { ProductPage } = require('../../../project-browse-product/page-objects/pages/product/product.page');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const env = require('../../../support/env/env');

const accountPage = new AccountPage();
const favoritesPage = new FavoritesPage();
const productPage = new ProductPage();

When('Customer search and add to My Favourite list', { timeout: 4 * 60000 }, async function () {
  await accountPage.navigateToPDP(env.ACNT_FAVORITE_SKU);
  await favoritesPage.clickOnFavorites();
  await productPage.clickMyFavoritesList();
  await productPage.clickViewFavorites();
});

When('Customer signout from favorites page', async function () {
  await favoritesPage.signOutFavoritePage();
});

When('Customer removes the items from favorites', async function () {
  await favoritesPage.removeItems();
});

Then('Favorites page should display without items', async function () {
  await favoritesPage.validateEmptyFavoritesPage();
});

Then('Customer views favorites page with items', async function () {
  await favoritesPage.validateFavoritesPage();
});

When('Customer navigates to My Account page', async function () {
  await favoritesPage.navigatesToMyAccountPage();
});
