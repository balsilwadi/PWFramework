/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();

class Typeahead {
  /**
   * @author: kepperson
   * @function_Name : clickSearchBox
   * @Description : click search box
   * @params : None
   * @returns : None
   * */
  async clickSearchBox() {
    testReport.log(this.pageName, `Clicking search box`);
    await page.waitForSelector(el.typeahead.txtSearchInputBox, { waitFor: 'visible' });
    await page.locator(el.typeahead.txtSearchInputBox).click();
    testReport.log(this.pageName, `Clicked search box`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : enterWordInSearch
   * @Description : enter word into search bar without searching
   * @params : keyword
   * @returns : None
   * */
  async enterWordInSearch(keyword) {
    testReport.log(this.pageName, `Entering ${keyword} into searchbar`);
    await page.waitForSelector(el.typeahead.txtSearchInputBox, { waitFor: 'visible' });
    await page.locator(el.typeahead.txtSearchInputBox).click();
    await page.fill(el.typeahead.txtSearchInputBox, '', { delay: 100 });
    await page.fill(el.typeahead.txtSearchInputBox, keyword, { delay: 100 });
    testReport.log(this.pageName, `Entered ${keyword} into Searchbar`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateTypeaheadDropdownContent
   * @Description : Validating that the type ahead dropdown content contains the search word
   * @params : keyword
   * @returns : None
   * */
  async validateTypeaheadDropdownContent(keyword) {
    testReport.log(this.pageName, `Checking Search Suggestion content to contain ${keyword}`);
    const searchSuggestionsCount = await page.locator(el.typeahead.lnkSearchSuggestions).count();
    for (let i = 0; i < searchSuggestionsCount; i++) {
      // eslint-disable-next-line no-await-in-loop
      const resultElement = await page.locator(el.typeahead.lnkSearchSuggestions).nth(i).textContent();
      expect(resultElement.toLowerCase()).toContain(keyword);
    }
    testReport.log(this.pageName, `Search Suggestion content contains ${keyword}`);

    // if (!common.verifyIsMobile()) {
    //   testReport.log(this.pageName, 'Checking Product Suggenstion content to contain ' + keyword);
    // const prodcutSuggestionsCount = await page.locator(el.typeahead.lnkProductSuggestions).count();
    // for (let i = 0; i < prodcutSuggestionsCount; i++) {
    //   const resultElement = await page.locator(el.typeahead.lnkProductSuggestions).nth(i).textContent();
    //   expect(await resultElement.toLowerCase()).toContain(keyword)
    // }
    // testReport.log(this.pageName, 'Product Suggenstion content contains ' + keyword);
    // }
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateTypeaheadDropdown
   * @Description : Validating that the type ahead dropdown is displayed after word is inserted into the search bar
   * @params : None
   * @returns : None
   * */
  async validateTypeaheadDropdown() {
    testReport.log(this.pageName, 'Searching for typeahead dropdown');
    await page.waitForSelector(el.typeahead.lblTypeaheadDropdown, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Typeahead dropdown is displayed');

    testReport.log(this.pageName, 'Searching for 1 to 6 search suggestions in the dropdown');
    await page.waitForSelector('[data-group="Search Suggestions"] li', { waitFor: 'visible' });
    const searchSuggestionsCount = await page.locator(el.typeahead.lnkSearchSuggestions).count();
    expect(searchSuggestionsCount).toBeGreaterThan(0);
    expect(searchSuggestionsCount).toBeLessThanOrEqual(6);
    testReport.log(this.pageName, '1 to 6 search suggestions are displayed');

    if (!common.verifyIsMobile()) {
      testReport.log(this.pageName, 'Searching for 1 to 6 Product suggestions in the dropdown');
      const productSuggestionsCount = await page.locator(el.typeahead.lnkSearchSuggestions).count();
      expect(searchSuggestionsCount).toBeGreaterThan(0);
      expect(productSuggestionsCount).toBeLessThanOrEqual(6);
      testReport.log(this.pageName, '1 to 6 search product are displayed');
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateRecentSearches
   * @Description : validating recent searches apears in the typeahead dropdown after searching for product
   * @params : expectedlbl, expectedRecentSearches
   * @returns : None
   * */
  async validateRecentSearches(expectedRecentSearches) {
    await page.click(el.typeahead.txtSearchInputBox);

    testReport.log(this.pageName, 'Verifying recent searches dropdown is displayed');
    await page.waitForSelector(el.typeahead.lblTypeaheadDropdown, { waitFor: 'visible' });
    await page.waitForLoadState('load');
    const recentSearchesHeader = await page.textContent(el.typeahead.lblRecentsearchesHeader);

    expect(recentSearchesHeader.toLowerCase()).toBe(td.typeaheadDropdown.recentSearchesHeader);
    testReport.log(this.pageName, 'Recent searches dropdown is displayed');

    testReport.log(this.pageName, `Verifying ${expectedRecentSearches} is displayed in recent searches dropdown`);
    const recentSearchesBtn = await page.textContent(el.typeahead.lnkRecentSearches);
    expect(recentSearchesBtn.toLowerCase()).toBe(expectedRecentSearches);

    testReport.log(this.pageName, `Verifying ${expectedRecentSearches} is displayed in recent searches dropdown`);
    const clearSearchHistorybtn = await page.textContent(el.typeahead.lnkClearSearchHistory);
    expect(clearSearchHistorybtn.toLowerCase()).toBe(td.typeaheadDropdown.clearbtn);

    testReport.log('Clearing search history');
    await page.click(el.typeahead.lnkClearSearchHistory);
    const tad = await page.locator(el.typeahead.lnkSearchSuggestions).count();
    expect(tad === 0).toBeTruthy();
    testReport.log('Search history was successfully cleared');
  }

  /**
   * @author: kepperson
   * @function_Name : validateRecentlyViewedShown
   * @Description : validating recently viewed products are shown
   * @params : None
   * @returns : None
   * */
  async validateRecentlyViewedShown() {
    testReport.log(this.pageName, `Verifying recently viewed products are visible`);
    await expect(page.locator(el.typeahead.lblRecentlyViewed)).toBeVisible();
    testReport.log(this.pageName, `Verified recently viewed products are visible`);
  }

  /**
   * @author: kepperson
   * @function_Name : validateRecentlyViewedNotShown
   * @Description : validating recently viewed products are not shown
   * @params : None
   * @returns : None
   * */
  async validateRecentlyViewedNotShown() {
    testReport.log(this.pageName, `Verifying recently viewed products are not visible`);
    await expect(page.locator(el.typeahead.lblRecentlyViewed)).toBeHidden();
    testReport.log(this.pageName, `Verified recently viewed products are not visible`);
  }

  /**
   * @author: kepperson
   * @function_Name : validateRecentlyViewedProductClickable
   * @Description : validating recently viewed product is displayed and clickable
   * @params : None
   * @returns : None
   * */
  async validateRecentlyViewedProductClickable() {
    testReport.log(this.pageName, 'Validating that recently viewed product is displayed and clickable');
    await expect(page.locator(el.typeahead.lnkRecentlyViewed)).toBeVisible();
    await expect(page.locator(el.typeahead.lnkRecentlyViewed)).toBeEnabled();
    testReport.log(this.pageName, 'Recently viewed product is displayed and clickable');
  }
}
module.exports = { Typeahead };
