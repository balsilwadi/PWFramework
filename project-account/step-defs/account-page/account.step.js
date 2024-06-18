const { When } = require('@cucumber/cucumber');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
// const { SearchPLP } = require('../../../project-search-stores/page-objects/pages/search/search.page');

const accountPage = new AccountPage();
// const searchPage = new SearchPLP();

When('Customer navigates to Account Settings page', async function () {
  await accountPage.navigateToAccountSettings();
});
When('Customer goes to My Account page', async function () {
  await accountPage.goToMyAccount();
});
When('Customer navigate to favorite page from account left navigation', async function () {
  await accountPage.navigateToMyFavoritesPage();
});
When('Customer sign out from account page', async function () {
  await accountPage.clickOnSignOut();
});
When('Customer navigates to My Design Packages page', async function () {
  await accountPage.navigateToDesignServicesPage();
});
/* When('Customer clicks on the back button in the browser', async function () {
  await searchPage.clickOnBrowserBackButton();
}); */
When('Customer proceeds to catalog preference page', async function () {
  await accountPage.navigateToCatalogPreferencePage();
});
