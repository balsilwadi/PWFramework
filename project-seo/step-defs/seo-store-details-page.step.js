const { Then } = require('@cucumber/cucumber');
const { SeoStoreDetailsPage } = require('../page-objects/pages/seo-store-details.page');

const seoStoreDetailsPage = new SeoStoreDetailsPage();

Then('Verify the Canonical url in the store details page', async function () {
  await seoStoreDetailsPage.verifyCanonicalUrl();
});

Then('Verify the OG SiteName tag {string} in the store details page', async function (siteName) {
  await seoStoreDetailsPage.verifyOgSiteName(siteName);
});

Then('Verify the OG url in the store details page', async function () {
  await seoStoreDetailsPage.verifyOgUrl();
});

Then('Verify the OG Type tag {string} in the store details page', async function (type) {
  await seoStoreDetailsPage.verifyOgType(type);
});

Then('Verify the h1 tag displayed in the Store Details page', async function () {
  await seoStoreDetailsPage.verifySeoHeader1Tag();
});
