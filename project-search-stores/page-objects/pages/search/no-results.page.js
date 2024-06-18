const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const el = require('../../elements/elements');
const env = require('../../../../support/env/env');
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();

class NoResults {
  pageName = this.constructor.name;

  /**
   * @author: balsilwadi
   * @function_Name : clickNoSearchResultsButtons
   * @Description : method that takes in a button and clicks that button on the no search results page
   * @params : None
   * @returns : None
   * */
  async clickNoSearchResultsButtons(button) {
    switch (button) {
      case 'Try a new search': {
        testReport.log(this.pageName, 'Clicking Try a new search Button');
        await page.click(el.searchNoResultsPage.btnTrySearch);
        testReport.log(this.pageName, 'Try a new search has been clicked');
        break;
      }
      case 'Find a gift registry': {
        if (!env.BASE_URL.includes('cb2.ca')) {
          testReport.log(this.pageName, 'Clicking Gift Registry Button');
          await page.locator(el.searchNoResultsPage.btnGiftRegistry).click();
          await page.waitForLoadState('load');
          testReport.log(this.pageName, 'Gift Registry has been clicked');
        }
        break;
      }
      case 'Shop new arrivals': {
        testReport.log(this.pageName, 'Clicking Shop New Arrivals');
        await page.click(el.searchNoResultsPage.btnShopNew);
        await page.waitForLoadState('load');
        testReport.log(this.pageName, 'Shop New Arrivals has been clicked');
        break;
      }
      case 'Chat with us': {
        testReport.log(this.pageName, 'Clicking Lets Chat Button');
        await common.forcedWait(this.pageName, 5000);
        await page.click(el.searchNoResultsPage.btnLetsChat);
        testReport.log(this.pageName, 'Lets Chat has been clicked');
        break;
      }
      default:
        throw new Error('Please use Try a new search|Find a gift registry|Shop new arrivals|Chat with us');
    }
  }

  /**
   * @author: kepperson
   * @function_Name : validateResultsMessage
   * @Description : Validating search results message is displayed when a search term is entered that returns no results
   * @params : searchTerm
   * @returns : None
   * */
  async validateResultsMessage(searchTerm) {
    const message = `We found 0 results for your search${searchTerm}.`;
    testReport.log(this.pageName, 'Validating that search results message is displaying');
    const actual = await page.locator(el.searchNoResultsPage.txtResultsMessage).nth(0).textContent();
    expect(actual.trim()).toBe(message);
    testReport.log(this.pageName, 'Search results message is displaying');
  }

  /**
   * @author: kepperson
   * @function_Name : verifyChatWindow
   * @Description :  verify chat window is visible
   * @params : none
   * @returns : None
   * */
  async verifyChatWindow() {
    await expect(page.locator(el.searchNoResultsPage.lblChatContainer)).toBeVisible();
    testReport.log(this.pageName, 'Verified chat window container');
    await page.locator('div[aria-label="close"]').click();
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyChatButton
   * @Description :  verify chat button is visible
   * @params : none
   * @returns : None
   * */
  async verifyChatButton() {
    testReport.log(this.pageName, 'Verifing chat button is displayed');
    await expect(page.locator(el.searchNoResultsPage.btnLetsChat)).toBeVisible();
    testReport.log(this.pageName, 'Verified chat button is displayed');
  }

  /**
   * @author: kepperson
   * @function_Name : validateRecentlyViewedShown
   * @Description : validating recently viewed products are shown
   * @params : None
   * @returns : None
   * */
  async validateRecentlyViewedShown() {
    if (env.BRAND !== 'CB2' && !(await page.url().includes('/stores'))) {
      testReport.log(this.pageName, `Verifying recently viewed products are visible`);
      const recentlyViewedLocator = common.verifyIsMobile() ? el.searchNoResultsPage.lblRecentlyViewedMobile : el.searchNoResultsPage.lblRecentlyViewedDesktop;
      await expect(page.locator(recentlyViewedLocator)).toBeVisible();
      testReport.log(this.pageName, `Verified recently viewed products are visible`);
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateSearchBarIsSelected
   * @Description : validating Search bar is selected after clicking try a new search on No results page
   * @params : None
   * @returns : None
   * */
  async validateSearchBarIsSelected() {
    testReport.log(this.pageName, `Verifying SearchBar is selected`);
    await expect(page.locator(el.typeahead.lblTypeaheadDropdown)).toBeVisible();
    await page.click(el.typeahead.lnkRecentSearches);
    testReport.log(this.pageName, `Verified that SearchBar is selected`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateNewArrivals
   * @Description : validating after clicking Shop New Arrivals, customer should be on the /new page
   * @params : None
   * @returns : None
   * */
  async validateNewArrivals() {
    testReport.log(this.pageName, `Verifying Customer is on New Arrivals page`);
    let expectedUrl;
    if (env.BRAND === 'Crate') {
      expectedUrl = '/whats-new/new-arrivals-by-category/1';
    } else {
      expectedUrl = '/new';
    }
    expect(page.url({ timeout: 1000 })).toContain(expectedUrl);
    testReport.log(this.pageName, `Customer is on New Arrivals page`);
  }
}
module.exports = { NoResults };
