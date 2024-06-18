const { When, Then } = require('@cucumber/cucumber');
const { SeoTheFramePage } = require('../page-objects/pages/seo-the-frame.page');

const seoTheFramePage = new SeoTheFramePage();

When('Customer navigates to the Frame page {string}', async function (framePageUrl) {
  await seoTheFramePage.navigateToTheFramePage(framePageUrl);
});

Then('Verify the Canonical url in the page {string}', async function (framePageUrl) {
  await seoTheFramePage.verifyCanonicalUrl(framePageUrl);
});

Then('Verify the OG url in the page {string}', async function (framePageUrl) {
  await seoTheFramePage.verifyOgUrl(framePageUrl);
});

Then('Verify the OG Type tag {string} in the Frame page', async function (ogType) {
  await seoTheFramePage.verifyOgType(ogType);
});
