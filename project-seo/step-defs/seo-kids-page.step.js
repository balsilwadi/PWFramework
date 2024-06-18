const { When, Then } = require('@cucumber/cucumber');
const { SearchPLP } = require('../../project-search-stores/page-objects/pages/search/search.page');
const { SeoKidsPages } = require('../page-objects/pages/seo-kids.page');

const seoKidsPage = new SeoKidsPages();
const searchPage = new SearchPLP();

When('customer navigates to {string} supercategory page', async function (supercategory) {
  await seoKidsPage.navigateToKidsSupercategoryPage(supercategory);
});

Then('Verify kids page title', async function () {
  await seoKidsPage.verifyPageTitle();
});

When('customer navigates to {string} spategory page', async function (spategory) {
  await seoKidsPage.navigateToKidsSpategoryPage(spategory);
});

When('customer navigates to {string} plp page', async function (plp) {
  await seoKidsPage.navigateToKidsPLPPage(plp);
});

When('customer navigates to pdp page', async function () {
  await searchPage.clickOnFirstProductFromSearchPLP();
});
