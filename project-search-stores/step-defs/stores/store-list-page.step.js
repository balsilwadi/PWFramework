const { When, Then } = require('@cucumber/cucumber');
const { StoreListPage } = require('../../page-objects/pages/stores/store-list.page');
const { StoreLandingPage } = require('../../page-objects/pages/stores/store-landing.page');

const env = require('../../../support/env/env');

const storeListPage = new StoreListPage();
const storeLandingPage = new StoreLandingPage();

Then('Verify the breadcrumb is displayed in the page', async function () {
  await storeListPage.verifyBreadcrumbIsDisplayed();
});

When('Customer click and verify the breadcrumb navigations', async function () {
  await storeListPage.clickAndVerifyHomeBreadcrumb();
  await storeLandingPage.navigateToStoreLandingPage();
  await storeLandingPage.clickOnViewAllStoresAndFacilities();
  await storeListPage.clickAndVerifyStoresBreadcrumb();
  await storeLandingPage.clickOnViewAllStoresAndFacilities();
});

Then('Header is displayed in the page', async function () {
  await storeListPage.verifyHeader1Tag();
});

Then('Verify the view by list dropdown is displayed', async function () {
  await storeListPage.verifyViewByListBox();
});

Then('Verify Stores by state is displayed', async function () {
  await storeListPage.verifyStoresByStateIsDisplayed();
});

Then('Verify SEO copy is displayed in the page', async function () {
  await storeListPage.verifySeoCopy();
});

When('Customer click on the state {string}, {string}', async function (usstateName, castatename) {
  await storeListPage.clickOnTheState(usstateName, castatename);
});

Then('Verify state specific stores are displayed', async function () {
  await storeListPage.verifyStateSpecificStoresDisplayed();
});

When('Customer click on Store details and Upcoming Events button {string}', async function (usstateName) {
  await storeListPage.clickOnViewStoreDetailsFromStoreListPage();
  if (env.EXEC_SITE.includes('crateus')) {
    await storeListPage.clickOnStateBreadcrumb(usstateName);
    await storeListPage.clickOnViewUpcomingEvents();
  } else if (env.EXEC_SITE.includes('cratecan')) {
    await page.goBack();
    await storeListPage.clickOnViewUpcomingEvents();
  }
});

Then('Verify the Upcoming Store events in store details page', async function () {
  await storeListPage.verifyUpcomingStoreEventsIsDisplayed();
});
