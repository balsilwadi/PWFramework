const { When, Then } = require('@cucumber/cucumber');
const { SeoSupercategoryPage } = require('../page-objects/pages/seo-super-category.page');
const env = require('../../support/env/env');
const { SearchPLP } = require('../../project-search-stores/page-objects/pages/search/search.page');

const seoSupercategoryPage = new SeoSupercategoryPage();
const searchPage = new SearchPLP();

Then('Verify the Canonical url in the super category page {string}', async function (superCategoryUrl) {
  await seoSupercategoryPage.verifyCanonicalUrl(superCategoryUrl);
});

Then('Verify the OG url in the super category page {string}', async function (superCategoryUrl) {
  await seoSupercategoryPage.verifyOgUrl(superCategoryUrl);
});

Then('Verify the h1 tag displayed in the Supercategory page', async function () {
  await seoSupercategoryPage.verifySeoHeader1Tag();
});

Then('verify related categories', async function () {
  await seoSupercategoryPage.verifyRelatedCategories();
  await seoSupercategoryPage.clickOnRelatedCategories({ timeout: 10000 });
});

Then('verify PDP related categories', async function () {
  await seoSupercategoryPage.verifyPDPRelatedCategories();
  await seoSupercategoryPage.clickOnRelatedCategories({ timeout: 10000 });
});

Then('verify PLP related categories', async function () {
  await seoSupercategoryPage.verifyPLPRelatedCategories();
  await seoSupercategoryPage.clickOnRelatedCategories({ timeout: 10000 });
});

Then('verify SEO copy', async function () {
  await seoSupercategoryPage.verifySeoCopy();
});

// When('Customer navigates to {string} supercategory page', async function (superCat) {
//   await seoSupercategoryPage.navigateToSuperCategory(superCat);
// });

When('customer search for SKU {string}, {string}', async function (crateSKU, cb2SKU) {
  if (env.EXEC_SITE.includes('crate')) {
    await searchPage.searchItem(crateSKU);
  } else {
    await searchPage.searchItem(cb2SKU);
  }
});
