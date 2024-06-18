const { When, Then } = require('@cucumber/cucumber');
const { SeoSPDPPage } = require('../page-objects/pages/seo-product-detail.page');
const { SeoSearchPage } = require('../page-objects/pages/seo-search.page');

const seoSearchPage = new SeoSearchPage();
const seoSPDPPage = new SeoSPDPPage();

When('Customer navigates to a final sale PDP', async function () {
  await seoSearchPage.navigateToSalePDP();
});

Then('Verify the Meta Description tag contains {string} {string}', async function (saleMessageCrate, saleMessageCB2) {
  await seoSPDPPage.verifySaleMetaDescription(saleMessageCrate, saleMessageCB2);
});

Then('Verify the OG Description tag contians {string} {string}', async function (saleMessageCrate, saleMessageCB2) {
  await seoSPDPPage.verifySaleOgDescription(saleMessageCrate, saleMessageCB2);
});
