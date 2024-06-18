const { When, Then } = require('@cucumber/cucumber');
const { SeoStoreListStatePage } = require('../page-objects/pages/seo-store-list-state.page');
// const env = require('../../support/env/env');

const seoStoreListStatePage = new SeoStoreListStatePage();

When('The customer click on the View All Stores & Facilities link', async function () {
  await seoStoreListStatePage.navigateToStoreListStatePage();
});

When('The customer click on the state name {string},{string}', async function (stateNameUS, stateNameCA) {
  await seoStoreListStatePage.clickOnTheStateName(stateNameUS, stateNameCA);
});

When('The customer click on the state name {string}', async function (stateNameUS) {
  await seoStoreListStatePage.clickOnTheStateName(stateNameUS);
});

When('The customer click on the View Store Details button {string}, {string}', async function (crateStoreName, cb2StoreName) {
  // if (env.EXEC_SITE === 'cratecan') {
  //   await seoStoreListStatePage.clickOnViewStoreDetailsButton(crateStoreName);
  // } else if (env.EXEC_SITE === 'cb2can') {
  //   await seoStoreListStatePage.clickOnViewStoreDetailsButton(cb2StoreName);
  // }
  await seoStoreListStatePage.clickOnViewStoreDetailsButton(crateStoreName, cb2StoreName);
});

When('The customer click on the View Store Details button', async function () {
  await seoStoreListStatePage.clickOnUSViewStoreDetailsButton();
});

Then('Verify the Canonical url in the store list page {string},{string}', async function (usStoreUrl, caStoreUrl) {
  await seoStoreListStatePage.verifyCanonicalUrl(usStoreUrl, caStoreUrl);
});

Then('Verify the OG url in the store list page {string},{string}', async function (storeUrl, caPageUrl) {
  await seoStoreListStatePage.verifyOgUrl(storeUrl, caPageUrl);
});

Then('Verify the h1 tag displayed in the store list page', async function () {
  await seoStoreListStatePage.verifySeoHeader1Tag();
});
