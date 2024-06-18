const { Then } = require('@cucumber/cucumber');
const { SeoHomePage } = require('../page-objects/pages/seo-home.page');
const env = require('../../support/env/env');

const seoHomePage = new SeoHomePage();

Then('Verify the Canonical url in the home page', async function () {
  await seoHomePage.verifyCanonicalUrl();
});

Then('Verify the OG url in the home page', async function () {
  await seoHomePage.verifyOgUrl();
});

Then(
  'Verify the OG SiteName tag {string},{string},{string},{string} in the home page',
  async function (ogSiteNameCrateUS, ogSiteNameCB2US, ogSiteNameCrateCA, ogSiteNameCB2CA) {
    switch (env.EXEC_SITE) {
      case 'crateus':
        await seoHomePage.verifyOgSiteName(ogSiteNameCrateUS);
        break;
      case 'cratecan':
        await seoHomePage.verifyOgSiteName(ogSiteNameCrateCA);
        break;
      case 'cb2us':
        await seoHomePage.verifyOgSiteName(ogSiteNameCB2US);
        break;
      case 'cb2can':
        await seoHomePage.verifyOgSiteName(ogSiteNameCB2CA);
        break;
      // no default
    }
  }
);

Then('Verify the Website schema tag displayed in the home page', async function () {
  await seoHomePage.verifyWebsiteSchema();
});

Then('Verify the Search Action schema tag displayed in the home page', async function () {
  await seoHomePage.verifySearchActionSchema();
});

Then('Verify the h1 tag displayed in the Home page', async function () {
  await seoHomePage.verifySeoHeader1Tag();
});
