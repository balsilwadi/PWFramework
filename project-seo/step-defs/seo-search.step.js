const { Then } = require('@cucumber/cucumber');
const { SeoSearchPage } = require('../page-objects/pages/seo-search.page');

const seoSearchPage = new SeoSearchPage();

Then('Verify the Canonical url in the search page {string}', async function (spCategoryURL) {
  await seoSearchPage.verifyCanonicalUrl(spCategoryURL);
});

Then('Verify the OG url in the search page {string}', async function (spCategoryURL) {
  await seoSearchPage.verifyOgUrl(spCategoryURL);
});

Then('Verify the Meta Robots tag in the search page', async function () {
  await seoSearchPage.verifyRobots();
});

Then('Verify the h1 tag displayed in the Search page', async function () {
  await seoSearchPage.verifySeoHeader1Tag();
});
