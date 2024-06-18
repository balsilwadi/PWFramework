const { When, Then } = require('@cucumber/cucumber');
const { SeoPLPPage } = require('../page-objects/pages/seo-product-listing.page');
const { SeoSPDPPage } = require('../page-objects/pages/seo-product-detail.page');
const env = require('../../support/env/env');

const seoSPDPPage = new SeoSPDPPage();
const seoPlpPage = new SeoPLPPage();

Then('Verify the Meta tags in the {string} PLP page', async function (expectedCatType) {
  await seoPlpPage.verifyMetaDescription();
  await seoPlpPage.verifyCanonicalUrl(expectedCatType);
  await seoPlpPage.verifyRobots(expectedCatType);
  await seoPlpPage.verifyOgSiteName(expectedCatType);
  await seoPlpPage.verifyOgImage();
  await seoPlpPage.verifyOgUrl(expectedCatType);
  await seoPlpPage.verifyOgTitle();
  await seoPlpPage.verifyOgType(expectedCatType);
  await seoPlpPage.verifyOgDescription();
  await seoPlpPage.verifyFbAdmins(expectedCatType);
});

Then('Verify the title of the PLP page', async function () {
  await seoPlpPage.verifyPageTitle();
});

Then('Verify the Website schema tag displayed in the PLP page', async function () {
  await seoPlpPage.verifyWebsiteSchema();
});

Then('Verify the Organization schema tag displayed in the PLP page', async function () {
  await seoPlpPage.verifyOrganizationSchema();
});

Then('Verify the h1 tag displayed in the PLP page', async function () {
  await seoPlpPage.verifySeoHeader1Tag();
});

Then('Verify the external links displayed in the PLP page', async function () {
  await seoPlpPage.verifyExternalLinkCount();
});

Then('Verify the internal links displayed in the PLP page', async function () {
  await seoPlpPage.verifyInternalLinkCount();
});

Then('Verify FAQPage schema displayed in the PLP page', async function () {
  await seoPlpPage.verifyFAQPageSchema();
});

Then('Verify the Canonical url in the product listing page {string} {string}', async function (crateURL, cb2URL) {
  if (env.BRAND.includes('Crate')) await seoSPDPPage.verifyCanonicalUrl(crateURL);
  else await seoSPDPPage.verifyCanonicalUrl(cb2URL);
});

Then('Verify the OG url in the product listing page {string} {string}', async function (crateURL, cb2URL) {
  if (env.BRAND.includes('Crate')) await seoSPDPPage.verifyOgUrl(crateURL);
  else await seoSPDPPage.verifyOgUrl(cb2URL);
});

When('Customer navigates to {string} {string}', async function (crateURL, cb2URL) {
  if (env.BRAND.includes('Crate')) await page.goto((await global.baseURL) + crateURL);
  else await page.goto((await global.baseURL) + cb2URL);
});
