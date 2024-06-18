const { When, Then } = require('@cucumber/cucumber');
const { SEOGiftRegistrySearch } = require('../page-objects/pages/seo-gift-registry-search.page');
const env = require('../../support/env/env');
// const { CommonUtils } = require('../../support/utils/common-utils');

// const common = new CommonUtils();
const seoGiftRegistrySearch = new SEOGiftRegistrySearch();

When('customer navigates to gift registry page', async function () {
  await seoGiftRegistrySearch.navigateToGiftRegistryPageByURL();
  // if (env.EXEC_SITE.includes('crate')) {
  //   await seoGiftRegistrySearch.navigateToCrateGiftRegistryPage();
  // } else if (env.EXEC_SITE === 'cb2us') {
  //   await seoGiftRegistrySearch.navigateToCB2GiftRegistryPage();
  // }
});

Then('enter firstname, lastname, event type and click on search button', async function () {
  await seoGiftRegistrySearch.enterRegistryFirstName();
  await seoGiftRegistrySearch.enterRegistryLastName();
  if (env.EXEC_SITE.includes('crate')) {
    await seoGiftRegistrySearch.clickOnSearchButton();
  } else {
    await seoGiftRegistrySearch.clickOnFindARegistryButton();
  }
});

When('customer selects first regisrty from the search results', async function () {
  await seoGiftRegistrySearch.clickOnViewRegistry();
});

Then('verify gift regisrty is loaded', async function () {
  await seoGiftRegistrySearch.verifyGiftRegistryLoaded();
});

Then('verify the free shipping message displayed in the meta description', async function () {
  await seoGiftRegistrySearch.verifyFreeShippingMessage();
});

Then('Verify the Canonical url in the registry page', async function () {
  await seoGiftRegistrySearch.verifyCanonicalUrl();
});

Then('Verify the Meta Robots tag {string} in the registry page', async function (metaRobots) {
  await seoGiftRegistrySearch.verifyRobots(metaRobots);
});

Then('Verify the OG url in the registry page', async function () {
  await seoGiftRegistrySearch.verifyOgUrl();
});

Then('Verify the h1 tag displayed in the registry page', async function () {
  await seoGiftRegistrySearch;
});

Then('Verify the meta robots is {string}', async function (expectedRobots) {
  await seoGiftRegistrySearch.verifiyGuestListRobots(expectedRobots);
});

When('Customer clicks on registry {string}', async function (registryName) {
  await seoGiftRegistrySearch.clickRegistry(registryName);
});

Then('Customer clicks on the view as guest button', async function () {
  await seoGiftRegistrySearch.clickViewAsGuest();
});
