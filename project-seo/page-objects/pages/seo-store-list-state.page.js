const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const globalData = require('../../../support/global-data-object/global-data-object');
const env = require('../../../support/env/env');
const { CommonUtils } = require('../../../support/utils/common-utils');

const testReport = new ReportUtils();
const common = new CommonUtils();

class SeoStoreListStatePage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToStoreListStatePage
   * @Description : This method is used to navigate to the Store List state page
   * @params : None
   * @returns : None
   * */
  async navigateToStoreListStatePage() {
    if (env.EXEC_SITE.includes('crate')) {
      testReport.log(this.pageName, 'Click on the link View All Stores & Facilities');
      await page.locator(el.StoreListStatePage.lnkViewAllStoresAndFacilities).click();
    } else if (env.EXEC_SITE === 'cb2us') {
      testReport.log(this.pageName, 'Click on the link View Stores By State');
      await page.locator(el.StoreListStatePage.lnkViewStoresByState).click();
    }
    await page.waitForLoadState('load');
    await common.forcedWait(10000);
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTheStateName
   * @Description : This method is used to click on the state name
   * @params : stateName
   * @returns : None
   * */
  async clickOnTheStateName(stateNameUS, stateNameCA) {
    if (env.EXEC_SITE.includes('us')) {
      testReport.log(this.pageName, `Click on the State Name ${stateNameUS}`);
      await page.locator(`${`${el.StoreListStatePage.lnkStateName + stateNameUS} ")]`}`).click();
      await page.waitForLoadState('load');
    } else if (env.EXEC_SITE === 'cratecan') {
      testReport.log(this.pageName, `Click on the State Name ${stateNameCA}`);
      await page.locator(`${`${el.StoreListStatePage.lnkStateName + stateNameCA} ")]`}`).click();
      await page.waitForLoadState('load');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewStoreDetailsButton
   * @Description : This method is used to click on View Store details button
   * @params : storeName
   * @returns : None
   * */
  async clickOnViewStoreDetailsButton(crateStoreName, cb2StoreName) {
    testReport.log(this.pageName, 'Click on the View Store details button ');
    if (common.verifyIsMobile()) {
      if (env.EXEC_SITE === 'cratecan') {
        await page.click(`${el.StoreDetailsPage.lnkStoreName + crateStoreName}"]`);
        await page.locator(`${el.StoreDetailsPage.lnkStoreName + crateStoreName}"]${el.StoreDetailsPage.btnViewStoreDetail}`).click();
      } else if (env.EXEC_SITE === 'cb2can') {
        await page.locator(`${el.StoreDetailsPage.lnkCb2StoreName + cb2StoreName}"]`).click();
      }
    }
    if (!common.verifyIsMobile()) {
      if (env.EXEC_SITE === 'cratecan') {
        await page.click(`${el.StoreDetailsPage.lnkStoreName + crateStoreName}"]`);
        await page.locator(`${el.StoreDetailsPage.lnkStoreName + crateStoreName}"]${el.StoreDetailsPage.btnViewStoreDetail}`).click();
      } else if (env.EXEC_SITE === 'cb2can') {
        await page.locator(`${el.StoreDetailsPage.lnkCb2StoreName + cb2StoreName}"]`).click();
      }
      await page.waitForLoadState('load');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewStoreDetailsButton
   * @Description : This method is used to click on View Store details button
   * @params : storeName
   * @returns : None
   * */
  async clickOnUSViewStoreDetailsButton() {
    testReport.log(this.pageName, 'Click on the View Store details button ');
    if (common.verifyIsMobile() && (env.EXEC_SITE === 'crateus' || env.EXEC_SITE === 'cb2us')) {
      await page.locator(el.StoreListStatePage.lnkStoreInfoContainer).nth(0).click();
    }
    if (env.EXEC_SITE === 'crateus' || env.EXEC_SITE === 'cb2us') {
      await page.locator(el.StoreDetailsPage.btnViewStoreDetails).nth(0).click();
    }
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : pageUrl
   * @returns : None
   * */
  async verifyCanonicalUrl(usStoreUrl, caStoreUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    if (env.EXEC_SITE.includes('us')) {
      expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + usStoreUrl);
    } else {
      expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + caStoreUrl);
    }
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : pageUrl
   * @returns : None
   * */
  async verifyOgUrl(usStoreUrl, caStoreUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    if (env.EXEC_SITE.includes('us')) {
      expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + usStoreUrl);
    } else {
      expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + caStoreUrl);
    }
    testReport.log(this.pageName, `Og URL matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgType
   * @Description : This method is used to verify the open graph Type of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgType() {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    let ogType = false;
    ogType = await page.locator(el.seoMetaTags.seoOgType).isVisible();
    if (ogType === true) {
      const actualOgType = page.locator(el.seoStoreLocatorPage.seoOgType);
      await expect(actualOgType).toHaveAttribute('content', env.SEO_OG_TYPE);
      testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
    } else {
      testReport.log(this.pageName, 'There is no og type defined in the page');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySeoHeader1Tag
   * @Description : This method is used to verify the Seo Header1 tag in the page
   * @params : None
   * @returns : None
   * */
  async verifySeoHeader1Tag() {
    testReport.log(this.pageName, 'Verify Header 1 tag is displayed in the page');
    let actualHeader1Tag;
    if (globalData.execSite.includes('crate_canada')) {
      actualHeader1Tag = await page.locator(el.seoStoreLocatorPage.seoHeader2Tag).textContent();
    } else {
      actualHeader1Tag = await page.locator(el.seoStoreLocatorPage.seoHeader1Tag).textContent();
    }
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoStoreListStatePage };
