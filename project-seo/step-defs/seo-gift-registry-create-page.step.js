const { When, Then } = require('@cucumber/cucumber');
const { SeoGRCreatePage } = require('../page-objects/pages/seo-gift-registry-create.page');
const env = require('../../support/env/env');

const seoGRCreatePage = new SeoGRCreatePage();

When('Customer navigates to Create Step1 Gift Registry page', async function () {
  if (env.EXEC_SITE === 'crateus') {
    await seoGRCreatePage.navigateToCrateGiftRegistryPage();
  } else if (env.EXEC_SITE === 'cb2us') {
    await seoGRCreatePage.navigateToCB2GiftRegistryPage();
  }
});

Then('Verify the canonical url in the gift registry page {string}', async function (grPageUrl) {
  await seoGRCreatePage.verifyCanonicalUrl(grPageUrl);
});

Then('Verify the Meta Robots tag in the gift registry page', async function () {
  await seoGRCreatePage.verifyRobots();
});

Then('Verify the OG url in the gift registry page {string}', async function (ogurl) {
  await seoGRCreatePage.verifyOgUrl(ogurl);
});

Then('Verify the h1 tag displayed in the GR page', async function () {
  await seoGRCreatePage.verifySeoHeader1Tag();
});

Then('Enter first name, last name, event type and email', async function () {
  await seoGRCreatePage.enterUserDetails();
});

When('Customer click on Continue button', async function () {
  await seoGRCreatePage.clickOnContinueButton();
});
