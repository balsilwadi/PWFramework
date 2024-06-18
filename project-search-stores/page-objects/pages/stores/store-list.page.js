/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class StoreListPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : verifyBreadcrumbIsDisplayed
   * @Description : This method is used to breadcrumb is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyBreadcrumbIsDisplayed() {
    testReport.log(this.pageName, 'Verify the breadcrumbs are displayed in the page');
    let count;
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.storesPage.lnkStoresBreadcrumbMobile, { waitFor: 'visible' });
      count = await page.locator(el.storesPage.lnkStoresBreadcrumbMobile).count();
    } else {
      await page.waitForSelector(el.storesPage.lnkBreadcrumbs, { waitFor: 'visible' });
      count = await page.locator(el.storesPage.lnkBreadcrumbList).count();
    }
    if (count === 3 || count === 1) {
      testReport.log(this.pageName, 'Breadcrumbs are displayed in the page');
    } else {
      throw new Error('Breadcrumbs are not displayed in the page !!');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickAndVerifyHomeBreadcrumb
   * @Description : This method is used to click on the Home breadcrumb and verify the navigation is successfull
   * @params : None
   * @returns : None
   * */
  async clickAndVerifyHomeBreadcrumb() {
    if (env.EXEC_SITE.includes('crate')) {
      if (!common.verifyIsMobile()) {
        testReport.log(this.pageName, 'Click on the Home breadcrumb');
        await page.click(el.storesPage.lnkHomeBreadcrumb);
        const currentUrl = page.url();
        if (currentUrl.includes(env.BASE_URL)) {
          testReport.log(this.pageName, `Successfully navigated to home page url : ${currentUrl}`);
        } else {
          throw new Error('Home page is not loaded after clicking the Home breadcrumb from Store list page!!');
        }
      }
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickAndVerifyStoresBreadcrumb
   * @Description : This method is used to click on the Stores breadcrumb and verify the navigation is successfull
   * @params : None
   * @returns : None
   * */
  async clickAndVerifyStoresBreadcrumb() {
    // if(!common.verifyIsMobile()){
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Click on the Stores breadcrumb');
    await page.click(el.storesPage.lnkStoresBreadcrumb);
    await page.waitForLoadState('load');
    const currentUrl = page.url();
    const expectedUrl = env.BASE_URL + env.STORE_LOCATOR_PAGE_URL;
    if (currentUrl.includes(expectedUrl)) {
      testReport.log(this.pageName, `Successfully navigated to Store Locator page : ${currentUrl}`);
    } else {
      throw new Error('Store locator page is not loaded after clicking the Stores breadcrumb from Store list page!!');
    }
    // }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyHeader1Tag
   * @Description : This method is used to verify the header 1 tag is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyHeader1Tag() {
    testReport.log(this.pageName, 'Verify the header is displayed in the page');
    await page.waitForSelector(el.storesPage.lblH1, { waitFor: 'visible' });
    expect(await page.textContent(el.storesPage.lblH1)).not.toBeNull();
    testReport.log(this.pageName, 'Header is displayed in the page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyViewByListBox
   * @Description : This method is used to verify the View by list dropdown
   * @params : None
   * @returns : None
   * */
  async verifyViewByListBox() {
    testReport.log(this.pageName, 'Verify the label View by List is displayed');
    expect(await page.textContent(el.storesPage.lblViewByList)).not.toBeNull();
    testReport.log(this.pageName, 'The label View by List is displayed');
    testReport.log(this.pageName, 'Verify the default store displayed in the box');
    await page.waitForSelector(el.storesPage.cmbStores, { waitFor: 'visible' });
    const defaultStore = await page.textContent(el.storesPage.cmbStores);
    if (env.EXEC_SITE.includes('us')) {
      expect(defaultStore).toEqual('U.S. Stores');
      testReport.log(this.pageName, `The default store displayed should be U.S. Stores and is : ${defaultStore}`);
    } else {
      expect(defaultStore).toEqual('Canada Stores');
      testReport.log(this.pageName, `The default store displayed should be Canada Stores and is : ${defaultStore}`);
    }
    testReport.log(this.pageName, 'Click on the dropdown');
    await page.click(el.storesPage.cmbDownArrowClick);
    testReport.log(this.pageName, 'Verify the Store list displayed in the dropdown box');
    expect(await page.locator(el.storesPage.cmbOptions).count()).toBeGreaterThan(0);
    const arrStoreOptions = env.STORE_OPTIONS.split(',');
    testReport.log(this.pageName, 'The store list displayed in the dropdown are: ');
    for (let i = 0; i < arrStoreOptions.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await expect(page.locator(el.storesPage.cmbStores).nth(i + 1)).toHaveText(arrStoreOptions[i]);
      testReport.log(this.pageName, arrStoreOptions[i]);
    }
    await page.click(el.storesPage.cmbDownArrowClick); // to collapse the dropdown
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyStoresByStateIsDisplayed
   * @Description : This method is used to verify the list of state displayed and its corresponding stores
   * @params : None
   * @returns : None
   * */
  async verifyStoresByStateIsDisplayed() {
    testReport.log(this.pageName, 'Verify the Stores by state header is displayed');
    expect(await page.textContent(el.storesPage.lblStoreByStateHeader)).not.toBeNull();
    testReport.log(this.pageName, 'Stores by state header is displayed');
    testReport.log(this.pageName, 'Verify the Stores by state List is displayed');
    expect(await page.locator(el.storesPage.lnkStateList).count()).toBeGreaterThan(0);
    testReport.log(this.pageName, 'Stores by state List is displayed in the page');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTheState
   * @Description : This method is used to click on the specific store
   * @params : None
   * @returns : None
   * */
  async clickOnTheState(usStateName, caStateName) {
    testReport.log(this.pageName, 'Click on the state name');
    if (env.EXEC_SITE.includes('us')) {
      await page.locator(`${el.storesPage.lnkStateList}/a[text()='${usStateName} ']`).click();
    } else {
      await page.locator(`${el.storesPage.lnkStateList}/a[text()='${caStateName} ']`).click();
    }
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Clicked on the state successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyStoresByStateIsDisplayed
   * @Description : This method is used to verify the list of state displayed and its corresponding stores
   * @params : None
   * @returns : None
   * */
  async verifyStateSpecificStoresDisplayed() {
    testReport.log(this.pageName, 'Verify the stores displayed for the selected state');
    expect(await page.locator(el.storesPage.storeInfoContainer).count()).toBeGreaterThan(0);
    testReport.log(this.pageName, 'State specific stores are displayed in the page');
    // retail store page store list validation is pending
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewStoreDetailsFromStoreListPage
   * @Description : This method is used to click on the View Store Details button from the store list by state page
   * @params : None
   * @returns : None
   * */
  async clickOnViewStoreDetailsFromStoreListPage() {
    testReport.log(this.pageName, 'Click on the View Store details button');
    if (common.verifyIsMobile()) {
      await page.click(el.storesPage.lnkPlusIcon);
    }
    await page.locator(el.storesPage.btnViewStoreDetails).nth(0).click();
    testReport.log(this.pageName, 'Clicked on the View Store Details button successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnStateBreadcrumb
   * @Description : This method is used to Click on the State breadcrumb from the store details page
   * @params : None
   * @returns : None
   * */
  async clickOnStateBreadcrumb(usstatename) {
    testReport.log(this.pageName, 'Click on the State breadcrumb from the store details page');
    if (env.EXEC_SITE.includes('crate')) {
      if (common.verifyIsMobile()) {
        await page.click(`${el.storesPage.lnkStateBreadcrumbMobile + usstatename}"]`);
      } else {
        await page.click(`${el.storesPage.lnkStateBreadcrumb + usstatename}"]`);
      }
    }
    testReport.log(this.pageName, 'Clicked on the View Store Details button successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewUpcomingEvents
   * @Description : This method is used to click on the View Upcoming Events button
   * @params : None
   * @returns : None
   * */
  async clickOnViewUpcomingEvents() {
    testReport.log(this.pageName, 'Click on the View Upcoming Events button');
    if (common.verifyIsMobile()) {
      await page.click(el.storesPage.lnkPlusIcon);
    }
    await page.click(el.storesPage.btnViewUpcomingEvents);
    testReport.log(this.pageName, 'Clicked on the View Upcoming Events button successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyUpcomingStoreEventsIsDisplayed
   * @Description : This method is used to verify the Upcoming coming store events is displayed
   * @params : None
   * @returns : None
   * */
  async verifyUpcomingStoreEventsIsDisplayed() {
    testReport.log(this.pageName, 'Verify Upcoming Store events is displayed in the store details page');
    await page.click(el.storesPage.lblUpcomingStoreEvents);
    testReport.log(this.pageName, 'Upcoming Store events is displayed in the store details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySeoCopy
   * @Description : This method is used to verify the SEO copy is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifySeoCopy() {
    // this condition needs to be removed once SEO copy is configured for other brands
    if (env.EXEC_SITE.includes('crateus')) {
      testReport.log(this.pageName, 'Verify the SEO copy is displayed in the page');
      expect(await page.textContent(el.storesPage.lblSeoCopyHeader)).not.toBeNull();
      expect(await page.textContent(el.storesPage.lblSeoCopy)).not.toBeNull();
      testReport.log(this.pageName, 'The Seo header and copy is displayed in the page');
    }
  }
}

module.exports = { StoreListPage };
