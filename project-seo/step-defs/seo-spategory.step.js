const { Then } = require('@cucumber/cucumber');
const { SeoSpategoryPage } = require('../page-objects/pages/seo-spategory.page');

const seoSpategoryPage = new SeoSpategoryPage();

Then('Verify the Canonical url in the spategory page {string}', async function (spCategoryURL) {
  await seoSpategoryPage.verifyCanonicalUrl(spCategoryURL);
});

Then('Verify the OG url in the spategory page {string}', async function (spCategoryURL) {
  await seoSpategoryPage.verifyOgUrl(spCategoryURL);
});

Then('Verify the h1 tag displayed in the spategory page', async function () {
  await seoSpategoryPage.verifySeoHeader1Tag();
});
