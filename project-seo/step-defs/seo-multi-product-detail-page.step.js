const { When, Then } = require('@cucumber/cucumber');
const { SeoMPDPPage } = require('../page-objects/pages/seo-multi-product-detail.page');

const seoMPDPPage = new SeoMPDPPage();

When('Customer navigates to MPDP {string}', async function (url) {
  await page.goto(global.baseURL + url);
});

Then('Verify the Canonical url in the multi product detail page {string}', async function (url) {
  await seoMPDPPage.verifyCanonicalUrl(url);
});

Then('Verify the OG url in the multi product detail page {string}', async function (url) {
  await seoMPDPPage.verifyOgUrl(url);
});

Then('Verify the OG Type {string} tag in the multi product detail page', async function (ogType) {
  await seoMPDPPage.verifyOgType(ogType);
});

When('Verify the breadcrumb schema tag displayed in the multi product detail page', async function () {
  await seoMPDPPage.verifyBreadcrumbSchema();
});

When('Verify the product schema tag displayed in the multi product detail page', async function () {
  await seoMPDPPage.verifyProductSchema();
});

When('Verify the imageGallery schema tag displayed in the multi product detail page', async function () {
  await seoMPDPPage.verifyImageGallerySchema();
});

Then('Verify the h1 tag displayed in the multi product detail page', async function () {
  await seoMPDPPage.verifySeoHeader1Tag();
});
