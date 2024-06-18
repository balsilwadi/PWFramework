const { Given, Then, When } = require('@cucumber/cucumber');

const { CommonUtils } = require('../../support/utils/common-utils');
const { HeaderFavoritesIconHelper } = require('../helpers/header-favorites-icon-helper');

const { FavoritesPage } = require('../../project-account/page-objects/pages/account-page/favorites.page');
const { LogInPage } = require('../../project-account/page-objects/pages/login/login.page');
const { AccountPage } = require('../../project-account/page-objects/pages/account-page/account.page');
const { PLPpage } = require('../page-objects/plp.page');

const accountPage = new AccountPage();
const common = new CommonUtils();
const favoritesPage = new FavoritesPage();
const headerFavoritesIconHelper = new HeaderFavoritesIconHelper();
const loginPage = new LogInPage();
const plpPage = new PLPpage();

const { assertIsFunction } = require('../../helpers/function');

Given('Customer has previously favorited Skus: {string}, {string}', async function (sku1, sku2) {
  this.pageObject = plpPage;
  assertIsFunction(this.pageObject?.navigateToPlpAndFavoriteProduct);
  await plpPage.navigateToPlpAndFavoriteProduct(sku1);
  await plpPage.navigateToPlpAndFavoriteProduct(sku2);

  this.pageObject = loginPage;
  assertIsFunction(this.pageObject?.signOutFromHeader);
  await loginPage.signOutFromHeader();
});

When('Customer hover over favorite Icon in header', async function () {
  await headerFavoritesIconHelper.hoverFavoritesIcon(common.verifyIsMobile());
});

Then('favorite count in header should be {string}', async function (count) {
  await headerFavoritesIconHelper.verifyFavoritesGuestModeCount(count);
});

// actually And
Then('menu should be present in guest mode in the favorite header dropdown', async function () {
  await headerFavoritesIconHelper.verifyFavoritesGuestMode();
});

// actually And
Then('the signin button should be present in the favorite header dropdown', async function () {
  await headerFavoritesIconHelper.verifySignInButtonIsPresent();
});

When('Customer clicks in sign in button', async function () {
  await headerFavoritesIconHelper.clickSignUpButton();
});

Then('signin popup should open', async function () {
  await headerFavoritesIconHelper.verifySignModelIsPresent();
});

When('Customer favorites {string} on browse plp page', async function (sku) {
  this.pageObject = plpPage;
  assertIsFunction(this.pageObject?.navigateToPlpAndFavoriteProduct);
  await plpPage.navigateToPlpAndFavoriteProduct(sku);
});

Then('Customer should see Skus: {string}, {string}, {string} as favorites in browse page header favorites', async function (sku1, sku2, sku3) {
  await headerFavoritesIconHelper.verifyListOfFavoritesInHeader([...sku1, sku2, sku3]);
});

Then('Customer should see Skus: {string} as favorites in browse page header favorites', async function (sku) {
  await headerFavoritesIconHelper.verifyListOfFavoritesInHeader([...sku]);
});

When('Customer deletes {string} from favorites in browse page header favorites', async function (sku) {
  await page.waitForLoadState('domcontentloaded');

  this.pageObject = accountPage;
  assertIsFunction(this.pageObject?.navigateToMyFavoritesPage);
  await accountPage.navigateToMyFavoritesPage();

  await page.waitForLoadState('domcontentloaded');

  this.pageObject = favoritesPage;
  assertIsFunction(this.pageObject?.removeSkuFromFavorites);
  await favoritesPage.removeSkuFromFavorites(sku);
});
