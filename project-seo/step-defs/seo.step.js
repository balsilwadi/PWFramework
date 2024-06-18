const { Then } = require('@cucumber/cucumber');
const { SeoPage } = require('../page-objects/pages/seo.page');

const seoPage = new SeoPage();

Then('Verify the title of the page', async function () {
  await seoPage.verifyPageTitle();
});

Then('Verify the Meta Description tag in the page', async function () {
  await seoPage.verifyMetaDescription();
});

Then('Verify the Meta Robots tag in the page', async function () {
  await seoPage.verifyRobots();
});

Then('Verify the OG SiteName tag in the page', async function () {
  await seoPage.verifyOgSiteName();
});

Then('Verify the OG Image tag in the page', async function () {
  await seoPage.verifyOgImage();
});

Then('Verify the OG Title tag in the page', async function () {
  await seoPage.verifyOgTitle();
});

Then('Verify the OG Type tag in the page', async function () {
  await seoPage.verifyOgType();
});

Then('Verify the OG Description in the page', async function () {
  await seoPage.verifyOgDescription();
});

Then('Verify the FB Admins tag in the page', async function () {
  await seoPage.verifyFbAdmins();
});

Then('Verify the Website schema tag displayed in the page', async function () {
  await seoPage.verifyWebsiteSchema();
});

Then('Verify the Organization schema tag displayed in the page', async function () {
  await seoPage.verifyOrganizationSchema();
});

Then('Verify the Product Collection schema tag displayed in the page', async function () {
  await seoPage.verifyProductCollectionSchema();
});

Then('Verify the external links displayed in the page', async function () {
  await seoPage.verifyExternalLinkCount();
});

Then('Verify the internal links displayed in the page', async function () {
  await seoPage.verifyInternalLinkCount();
});
