const { Then } = require('@cucumber/cucumber');
const { SeoGeneratedPage } = require('../page-objects/pages/seo-generated.page');

const seoGeneratedPage = new SeoGeneratedPage();

Then('Verify the Canonical url in the generated page {string}', async function (collectionPageUrl) {
  await seoGeneratedPage.verifyCanonicalUrl(collectionPageUrl);
});

Then('Verify the OG url in the generated page {string}', async function (collectionPageUrl) {
  await seoGeneratedPage.verifyOgUrl(collectionPageUrl);
});

Then('Verify the Meta Robots tag {string} in the generated page', async function (metaRobots) {
  await seoGeneratedPage.verifyRobots(metaRobots);
});

Then('Verify the h1 tag displayed in the generated page', async function () {
  await seoGeneratedPage.verifySeoHeader1Tag();
});
