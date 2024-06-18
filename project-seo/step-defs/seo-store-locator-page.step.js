const { When, Then } = require('@cucumber/cucumber');
const { SeoStoreLocatorPage } = require('../page-objects/pages/seo-store-locator.page');

const seoStoreLocatorPage = new SeoStoreLocatorPage();

When('The customer navigate to Store Locator page', async function () {
  await seoStoreLocatorPage.navigateToStoreLocatorPage();
});

Then('Verify the Canonical url in the Store Locator page {string}', async function (storeUrl) {
  await seoStoreLocatorPage.verifyCanonicalUrl(storeUrl);
});

Then('Verify the OG url in the Store Locator page {string}', async function (storeUrl) {
  await seoStoreLocatorPage.verifyOgUrl(storeUrl);
});

Then('Verify the h1 tag displayed in the Store Locator page', async function () {
  await seoStoreLocatorPage.verifySeoHeader1Tag();
});
