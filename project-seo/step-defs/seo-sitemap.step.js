const { When, Then } = require('@cucumber/cucumber');
const { SeoSitemapPage } = require('../page-objects/pages/seo-sitemap.page');

const seoSitemapPage = new SeoSitemapPage();

When('Customer navigates to sitemap txt page', async function () {
  await seoSitemapPage.navigateToSitemapXml();
});

Then('Verify the sitemap xml is displayed and has content', async function () {
  await seoSitemapPage.verifySitemapXML();
});
