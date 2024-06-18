const { When, Then } = require('@cucumber/cucumber');
const { SeoGeneratedPage } = require('../../page-objects/pages/search/seo-generated.page');
const env = require('../../../support/env/env');
const { CommonUtils } = require('../../../support/utils/common-utils');

const seoGeneratedPage = new SeoGeneratedPage();
const common = new CommonUtils();

When('Customer is navigated to SEO Generated Homepage', async function () {
  await seoGeneratedPage.navigateToSeoGeneratedHomePage();
  await common.forcedWait(this.pageName, 10000);
});

When('Customer click on the  SEO Generated page {string} link', async function (gpLinkHomePage) {
  await seoGeneratedPage.clickOnGPLinkAndVerify(gpLinkHomePage);
});

When('Customer click on the {string}, {string} Crate SEO Generated page', async function (seoPageLinkUS, seoPageLinkCA) {
  if (env.EXEC_SITE === 'crateus') {
    await seoGeneratedPage.clickOnSEOPageLink(seoPageLinkUS);
  } else if (env.EXEC_SITE === 'cratecan') {
    await seoGeneratedPage.clickOnSEOPageLink(seoPageLinkCA);
  } else {
    throw new Error('This feature is applicable for Crate US and CA');
  }
});

When('Customer click on the {string}, {string} CB2 SEO Generated page', async function (seoPageLinkUS, seoPageLinkCA) {
  if (env.EXEC_SITE === 'cb2us') {
    await seoGeneratedPage.clickOnSEOPageLink(seoPageLinkUS);
  } else if (env.EXEC_SITE === 'cb2can') {
    await seoGeneratedPage.clickOnSEOPageLink(seoPageLinkCA);
  } else {
    throw new Error('This feature is applicable for CB2 US and CA');
  }
});

Then('Verify all the components are displayed in the SEO Generated page', async function () {
  await seoGeneratedPage.verifyFilterIsDisplayed();
  if (!common.verifyIsMobile()) {
    await seoGeneratedPage.verifyProductCountIsDisplayed();
  }
  await seoGeneratedPage.verifySortByDropdownIsDisplayed();
  await seoGeneratedPage.verifyRelatedCategoriesSectionIsDisplayed();
  await seoGeneratedPage.verifySEOCopyIsDisplayed();
});

When('Customer click on Sort by dropdown', async function () {
  await common.forcedWait(this.pageName, 10000);
  await seoGeneratedPage.clickOnSortByDropdown();
  await common.forcedWait(this.pageName, 10000);
});

When('Select Price Low to High option', async function () {
  await seoGeneratedPage.selectPriceLowToHigh();
});

Then('Verify the Price displayed is sorted from Low to High', async function () {
  await seoGeneratedPage.verifyPriceIsSortedFromLowToHigh();
});

When('Select Price High to Low option', async function () {
  await seoGeneratedPage.selectPriceHighToLow();
});

Then('Verify the Price displayed is sorted from High to Low', async function () {
  await seoGeneratedPage.verifyPriceIsSortedFromHighToLow();
});

When('Select Top Rated option', async function () {
  await seoGeneratedPage.selectTopRated();
});

Then('Verify the products are displayed based on the highest rating', async function () {
  await seoGeneratedPage.verifyRatingIsDisplayedFromHighToLow();
});

When('Select New option', async function () {
  await seoGeneratedPage.selectNewOption();
});

Then('Verify the products are displayed based on the New Arrival', async function () {
  await seoGeneratedPage.verifyNewOption();
});
