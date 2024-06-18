const { When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../../project-browse-path/page-objects/home.page');
const { SeoCartPage } = require('../page-objects/pages/seo-cart.page');

const homePage = new HomePage();
const seoCartPage = new SeoCartPage();

When('Customer navigates to Cart page', async function () {
  await homePage.navigateToCartPageFromHeader();
});

Then('Verify the Canonical url in the cart page {string}', async function (cartPageUrl) {
  await seoCartPage.verifyCanonicalUrl(cartPageUrl);
});

Then('Verify the OG url in the cart page {string}', async function (cartPageUrl) {
  await seoCartPage.verifyOgUrl(cartPageUrl);
});

Then('Verify the Meta Robots tag {string} in the cart page', async function (metaRobots) {
  await seoCartPage.verifyRobots(metaRobots);
});

Then('Verify the h1 tag displayed in the cart page', async function () {
  await seoCartPage.verifySeoHeader1Tag();
});
