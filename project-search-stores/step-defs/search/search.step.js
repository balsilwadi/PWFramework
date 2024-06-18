/* eslint-disable playwright/no-wait-for-selector */
const { Given, When, Then } = require('@cucumber/cucumber');
const { SearchPLP } = require('../../page-objects/pages/search/search.page');
const el = require('../../page-objects/elements/elements');
const { CommonUtils } = require('../../../support/utils/common-utils');
const env = require('../../../support/env/env');
const { DigitalDataLayer } = require('../../../project-martech/page-objects/pages/digital-data.page');

const searchPage = new SearchPLP();
const common = new CommonUtils();
const ddlPage = new DigitalDataLayer();

Then('Customer search for SKU {string}', async function (skuNum) {
  this.pageObject = searchPage;
  await this.pageObject.searchItem(skuNum);
});

When('Customer searches for Keyword {string}', async function (expectedSearchterm) {
  this.pageObject = searchPage;
  await this.pageObject.searchWithKeyword(expectedSearchterm);
  await common.forcedWait(this.pageName, 5000);
});

Then('Customer should be navigated to {string} Search PLP', async function (expectedSearchterm) {
  await searchPage.verifyHeaderTag(expectedSearchterm);
  //  await searchPage.verifyExpectedUrl();
  // await searchPage.clickOnFirstProductFromSearchPLP();
  // await searchPage.clickOnBrowserBackButton();
});

When('Customer click on the Filter button', async function () {
  await searchPage.clickOnFilterButton();
});

Then('Filter drawers should be displayed', async function () {
  await searchPage.filterDrawersIsDisplayed();
});

When('Customer selects Type filter', async function () {
  await searchPage.clickOnTypeFilter();
  await searchPage.clickOnTypeFacet();
});

Then('Verify the Type filter is selected', async function () {
  await searchPage.verifyTypeFilter();
});

When('Customer selects Color filter', async function () {
  await searchPage.clickOnColorFilter();
  await searchPage.clickOnColorFacet();
});

Then('Verify the Color filter is selected', async function () {
  await searchPage.verifyColorFilter();
});

When('Customer selects Price filter', async function () {
  await searchPage.clickOnPriceFilter();
  await searchPage.clickOnPriceFacet();
});

Then('Verify the Price filter is selected', async function () {
  await searchPage.verifyPriceFilter();
});

When('Customer selects Material filter', async function () {
  await searchPage.clickOnMaterialFilter();
  await searchPage.clickOnMaterialFacet();
});

Then('Verify the Material filter is selected', async function () {
  await searchPage.verifyMaterialFilter();
});

When('Customer selects Responsible Design filter', async function () {
  await searchPage.clickOnResponsibleDesignFilter();
  await searchPage.clickOnResponsibleDesignFacet();
});

Then('Verify the Responsible Design filter is selected', async function () {
  await searchPage.verifyResponsibleDesignFilter();
});

When('Customer enters Min Price {string}', async function (minPrice) {
  await searchPage.clickOnPriceFilter();
  await searchPage.enterMinPrice(minPrice);
});

When('Customer enters Max Price {string}', async function (maxPrice) {
  await searchPage.enterMaxPrice(maxPrice);
});

When('Customer enters Min Price {string} greater than Max Price {string}', async function (maxPrice, minPrice) {
  await searchPage.enterMinPriceGreaterthanMaxPrice(maxPrice, minPrice);
});

When('Customer enters Min and Max Price as empty value', async function () {
  await searchPage.enterMinPriceMaxPriceEmpty();
});

When('Verify the error message is displayed', async function () {
  if (!common.verifyIsMobile) await searchPage.VerifyErrorMsgDisplayed();
});

When('Customer enters Min {string} and Max {string} Price Range', async function (minPrice, maxPrice) {
  await searchPage.enterMinAndMaxPriceRange(minPrice, maxPrice);
});

Then('Customer click on Price Range button', async function () {
  await searchPage.clickOnPriceRangeButton();
});

Then('Verify the Price Range filter is selected', async function () {
  await searchPage.verifyPriceRangeFilter();
});

When('Customer enters Min Width {string}', async function (minWidth) {
  await searchPage.clickOnWidthFilter();
  await searchPage.enterMinWidth(minWidth);
});

When('Customer enters Max Width {string}', async function (maxWidth) {
  await searchPage.enterMaxWidth(maxWidth);
});

When('Customer enters Min Width {string} greater than Max Width {string}', async function (maxWidth, minWidth) {
  await searchPage.enterMinWidthGreaterthanMaxWidth(maxWidth, minWidth);
});

When('Customer enters Min and Max Width as empty value', async function () {
  await searchPage.enterMinWidthMaxWidthEmpty();
});

When('Customer enters Min {string} and Max {string} Width Range', async function (minWidth, maxWidth) {
  await searchPage.enterMinAndMaxWidthRange(minWidth, maxWidth);
});

Then('Customer click on Width Range button', async function () {
  await searchPage.clickOnWidthRangeButton();
});

Then('Verify the Width Range filter is selected', async function () {
  await searchPage.verifyWidthRangeFilter();
});

Then('Click on Filter Apply button', async function () {
  await searchPage.clickOnFilterApplyButton();
});

When('Customer click on Clear All link', async function () {
  await searchPage.clickOnTopFilterClearAllLink();
});

Then('All the filter selections should be cleared', async function () {
  await searchPage.clearAllLinkIsNotDisplayed();
});

When('Customer navigates to Related searches', async function () {
  await searchPage.verifyRelatedSearchesSection();
  await searchPage.clickOnRelatedSearches();
});

Then('The corresponding related search page should be loaded', async function () {
  await searchPage.verifyRelatedSearchPLP();
  await searchPage.clickOnBrowserBackButton();
});

When('Customer navigates to Related Categories', async function () {
  await searchPage.verifyRelatedCategoriesIsDisplayed();
  await searchPage.clickOnTheRelatedCategory();
});

Then('The corresponding related categories page should be loaded', async function () {
  await searchPage.verifyTheRelatedCategoryPage();
});

Given('The customer clicks on Crate & Kids home page', async function () {
  if (env.EXEC_SITE.includes('crate')) {
    await page.goto(`${env.BASE_URL}/kids`);
  } else {
    throw new Error('This feature is not applicable for CB2 US and CA');
  }
});

Then('Verify only first 12 products are displayed in Partial Search page', async function () {
  await searchPage.verifyInitialProductCountInPartialSearchPage();
});

When('Customer clicks on View More Products button', async function () {
  await searchPage.clickOnViewMoreProductsButton();
});

Then('Verify the product count displayed in Partial Search page after clicking the View More Products button', async function () {
  await searchPage.verifyProductCount();
});

Then('Customer should be navigated to {string}', async function (expectedUrl) {
  // await page.waitForTimeout(5000);
  await common.forcedWait(this.pageName, 5000);
  await searchPage.verifyExpectedUrl(expectedUrl);
});

Then('Customer should verify the h1 tag displayed in the page as {string}', async function (expectedHeader) {
  await searchPage.verifyHeader1(expectedHeader);
});

Then('validate DDL Page Viewed Event {string}', async function (page) {
  if (page === 'Search') await ddlPage.validateDdlWithEventName('Page Viewed', 'SEARCH-PAGE');
  else if (page === 'PartialSearch') await ddlPage.validateDdlWithEventName('Page Viewed', 'PARTIAL-SEARCH-PAGE');
  else if (page === 'NoSearch') await ddlPage.validateDdlWithEventName('Page Viewed', 'NO-SEARCH-PAGE');
});

let orgProductCount;
Then('Customer should be able to see the product count', async function () {
  orgProductCount = await searchPage.getProductCount();
});

Then('Customer should be able to see the View All and FBA buttons on the page', async function () {
  await searchPage.verifyViewAllAvailabilityIsDisplayed();
  await searchPage.verifyReadyToShipAvailabilityIsDisplayed();
  // await searchPage.verifyShipsWithin4WeeksIsDisplayed();
  // await searchPage.verifyInitialPageLoad();
});

When('Customer clicks on Ready to Ship availability filter {string}', async function (button) {
  await searchPage.clickOnReadyToShipAvailabilityFilter(button);
});

Then('Verify zipcode location is displayed', async function () {
  await searchPage.verifyZipcodeLocationIsDisplayed();
});
Then('Verify the pageurl contains the availability attribute {string}', async function (button) {
  await searchPage.verifyPageUrlAfterAvailabilityFilterOn(button);
});
Then('Customer should see Product Count decrease', async function () {
  await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  const currentProductCount = await searchPage.getProductCount();
  await searchPage.validateProductCountDecreased(orgProductCount, currentProductCount);
});

When('Customer clicks on View All filter', async function () {
  await searchPage.clickOnViewAllFilter();
});

Then('Customer should see Product Count return', async function () {
  await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  const currentProductCount = await searchPage.getProductCount();
  await searchPage.validateProductCountReturned(orgProductCount, currentProductCount);
});

When('Customer enters a valid zipcode {string}', async function (zipcode) {
  await searchPage.enterZipcodeInFBA(zipcode);
});

Then('Customer enters an invalid zipcode {string}', async function (zipcode) {
  await searchPage.enterZipcodeInFBA(zipcode);
});

Then('Customer should see the error message {string}', async function (error) {
  await searchPage.validateFBAError(error);
});

Then('Customer should be able to see The original product count', async function () {
  const currentProductCount = await searchPage.getProductCount();
  await searchPage.validateProductCountReturned(orgProductCount, currentProductCount);
});

Then('Customer should be able to see the sortBy dropdown button', async function () {
  await searchPage.validateSortByIsDisplayed();
});

Then('Customer should be able to see the sortBy option on {string}', async function (sortByOption) {
  await searchPage.validateSelectedSortBy(sortByOption);
});

When('Customer clicks on the sortBy dropdown button', async function () {
  await searchPage.clickOnSortByButton();
});
Then('Cusomer should be able to see all sortBy options displayed and clickable', async function () {
  await searchPage.validatingSortByDropdown();
});
When('Select Best Selling option', async function () {
  await searchPage.selectBestSellingOption();
});
Then('Verify the products are displayed based on the Best Selling', async function () {
  await searchPage.verifyBestSellingOption();
});
When('Select new option', async function () {
  await searchPage.selectNewOption();
});

Then('Recently viewed products should be displayed on Search PLP', async function () {
  await searchPage.validateRecentlyViewedShown();
});

Then('Verify the Responsible Design and Type filters are selected', async function () {
  await searchPage.verifyResponsibleDesignFilter();
});

When('Customer selects a product on the search page', async function () {
  await searchPage.clickOnFirstProductFromSearchPLP();
  await searchPage.clickOnBrowserBackButton();
});

let readyToShipProductCount;
let shipsWithin4Weeks;
Then('Customer should be able to see product count order as viewAll > shipsWithin4Weeks > readyToShip', async function () {
  await searchPage.clickOnReadyToShipAvailabilityFilter('ReadyToShip');
  await common.forcedWait(this.pageName, 5000);
  readyToShipProductCount = await searchPage.getProductCount();

  await searchPage.clickOnReadyToShipAvailabilityFilter('ShipsWithin4Weeks');
  await common.forcedWait(this.pageName, 5000);
  shipsWithin4Weeks = await searchPage.getProductCount();

  await searchPage.validateAvailabilityFilterProductCount(orgProductCount, readyToShipProductCount, shipsWithin4Weeks);
});

// Then('verify Free Shipping text in Search results page', async function () {
//   awai;
// });
