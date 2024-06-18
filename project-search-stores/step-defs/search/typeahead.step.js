const { When, Then } = require('@cucumber/cucumber');
const { Typeahead } = require('../../page-objects/pages/search/typeahead.page');
const { SearchPLP } = require('../../page-objects/pages/search/search.page');
const { CommonUtils } = require('../../../support/utils/common-utils');

const common = new CommonUtils();
const typeaheadPage = new Typeahead();
const searchPage = new SearchPLP();

When('Customer navigates to {string}', async function (url) {
  await page.goto((await global.baseURL) + url);
  if (url === '/search') await common.forcedWait(this.pageName, 10000);
});

When('Customer clicks search box', async function () {
  await typeaheadPage.clickSearchBox();
});

When('Customer enters {string} in searchBar', async function (keyword) {
  await typeaheadPage.enterWordInSearch(keyword);
});

Then('The typeahead dropdown should be displayed', async function () {
  await typeaheadPage.validateTypeaheadDropdown();
});

Then('The typeahead content should contain {string}', async function (keyword) {
  await typeaheadPage.validateTypeaheadDropdownContent(keyword);
});

When('Customer searches for {string}', async function (keyword) {
  await page.reload();
  await searchPage.searchWithKeyword(keyword);
  // page.waitForTimeout(5000);
});

When('Customer navigates to HomePage', async function () {
  await page.goto(await global.baseURL);
});

Then('Custormer should be able to see the recent searches dropdown with {string} displayed', async function (keyword) {
  await typeaheadPage.validateRecentSearches(keyword);
});

Then('Recently viewed products should be displayed in typeahead', async function () {
  await typeaheadPage.validateRecentlyViewedShown();
});

Then('Recently viewed products should not be displayed in typeahead', async function () {
  await typeaheadPage.validateRecentlyViewedNotShown();
});

Then('Recently viewed product should be clickable', async function () {
  await typeaheadPage.validateRecentlyViewedProductClickable();
});
