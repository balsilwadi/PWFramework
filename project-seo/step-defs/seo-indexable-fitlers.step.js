const { When, Then } = require('@cucumber/cucumber');
const { SeoIndexableFiltersPage } = require('../page-objects/pages/seo-indexable-filters.page');
const env = require('../../support/env/env');

const seoIndexableFiltersPage = new SeoIndexableFiltersPage();

When('Customer is navigated to an Indexable Filters page {string} {string}', async function (crateURL, cb2URL) {
  const url = env.BASE_URL.includes('crate') ? crateURL : cb2URL;
  await page.goto(`${env.BASE_URL}${url}`);
});
Then('Verify the Canonical url in the Indexable Filters page {string} {string}', async function (crateURL, cb2URL) {
  const url = env.BASE_URL.includes('crate') ? crateURL : cb2URL;
  await seoIndexableFiltersPage.verifyCanonicalUrl(url);
});

Then('Verify the Meta Robots tag {string} in the Indexable Filters page', async function (robots) {
  await seoIndexableFiltersPage.verifyRobots(robots);
});
Then('Verify the OG url in the Indexable Filters page {string} {string}', async function (crateURL, cb2URL) {
  const url = env.BASE_URL.includes('crate') ? crateURL : cb2URL;
  await seoIndexableFiltersPage.verifyOgUrl(url);
});

Then('Verify the h1 tag displayed in the Indexable Filters', async function () {
  await seoIndexableFiltersPage.verifySeoHeader1Tag();
});
