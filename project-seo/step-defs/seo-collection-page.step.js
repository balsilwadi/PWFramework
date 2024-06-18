const { When, Then } = require('@cucumber/cucumber');
const { SeoCollectionPage } = require('../page-objects/pages/seo-collection.page');

const seoCollectionPage = new SeoCollectionPage();

When('The customer navigate to {string} Collection page', async function (collectionPageUrl) {
  await seoCollectionPage.navigateToCollectionPage(collectionPageUrl);
});

Then('Verify the Canonical url in the collection page {string}', async function (collectionPageUrl) {
  await seoCollectionPage.verifyCanonicalUrl(collectionPageUrl);
});

Then('Verify the OG url in the collection page {string}', async function (collectionPageUrl) {
  await seoCollectionPage.verifyOgUrl(collectionPageUrl);
});

Then('Verify the Breadcrumb schema tag displayed in the Collection page', async function () {
  await seoCollectionPage.verifyBreadcrumbSchema();
});

Then('Verify the Organization schema tag displayed in the Collection page', async function () {
  await seoCollectionPage.verifyOrganizationSchema();
});

Then('Verify the Organization schema tag displayed in the Single Collection page', async function () {
  await seoCollectionPage.verifyOrganizationSchemaSingleCollection();
});

Then('Verify the h1 tag displayed in the Collection page', async function () {
  await seoCollectionPage.verifySeoHeader1Tag();
});
