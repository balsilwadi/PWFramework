const { When, Then } = require('@cucumber/cucumber');
const { SeoGiftCardPage } = require('../page-objects/pages/seo-gift-card.page');

const seoGiftCardPage = new SeoGiftCardPage();

When('The customer navigate to Gift Card page', async function () {
  await seoGiftCardPage.navigateToGiftCardPage();
});

Then('Verify the canonical url in the gift card page {string}', async function (giftCardUrl) {
  await seoGiftCardPage.verifyCanonicalUrl(giftCardUrl);
});

Then('Verify the OG url in the gift card page {string}', async function (giftCardUrl) {
  await seoGiftCardPage.verifyOgUrl(giftCardUrl);
});

Then('Verify the h1 tag displayed in the Gift Card page', async function () {
  await seoGiftCardPage.verifySeoHeader1Tag();
});
