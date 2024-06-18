const { When, Then } = require('@cucumber/cucumber');
const { SeoLandingPage } = require('../page-objects/pages/seo-landing.page');

const seoLandingPage = new SeoLandingPage();

When('The customer navigate to {string} Landing page', async function (landingPageUrl) {
  await seoLandingPage.navigateToLandingPage(landingPageUrl);
});

Then('Verify the Canonical url in the landing page {string}', async function (landingPageUrl) {
  await seoLandingPage.verifyCanonicalUrl(landingPageUrl);
});

Then('Verify the OG url in the landing page {string}', async function (landingPageUrl) {
  await seoLandingPage.verifyOgUrl(landingPageUrl);
});

Then('Verify the OG Type tag in the landing page', async function () {
  await seoLandingPage.verifyOgType();
});

Then('Verify the h1 tag displayed in the Landing page', async function () {
  await seoLandingPage.verifySeoHeader1Tag();
});
