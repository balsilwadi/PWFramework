const { Then } = require('@cucumber/cucumber');
const { SeoSPDPPage } = require('../page-objects/pages/seo-product-detail.page');

const seoSPDPPage = new SeoSPDPPage();

Then('Verify the Canonical url in the product detail page {string}', async function (url) {
  await seoSPDPPage.verifyCanonicalUrl(url);
});

Then('Verify the OG url in the product detail page {string}', async function (url) {
  await seoSPDPPage.verifyOgUrl(url);
});

Then('Verify the OG Type {string} tag in the product detail page', async function (ogType) {
  await seoSPDPPage.verifyOgType(ogType);
});

Then('Verify the h1 tag displayed in the product detail page', async function () {
  await seoSPDPPage.verifySeoHeader1Tag();
});

Then('Verify the OG Alt Img in the page', async function () {
  await seoSPDPPage.verifyOgAltImg();
});

Then('Verify the Meta Author in the page', async function () {
  await seoSPDPPage.verifyMetaAuthor();
});

Then('Verify the Meta Language in the page', async function () {
  await seoSPDPPage.verifyMetaLanguage();
});

Then('Verify the Meta Twitter tags in the page', async function () {
  await seoSPDPPage.verifyMetaTwitter();
});

Then('Verify the Product schema tag is displayed in the page', async function () {
  await seoSPDPPage.verifyProductSchema();
});
