const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');
const { CommonUtils } = require('../../../support/utils/common-utils');

const testReport = new ReportUtils();
const commonUtils = new CommonUtils();

class SeoFreeShippingPage {
  pageName = this.constructor.name;

  async verifyFreeShippingItems() {
    testReport.log(this.pageName, 'Verify Free shipping items present in the page');
    await page.waitForLoadState('load');
    const itemCount = await page.locator(el.seoFreeShipping.lblFreeShipping).count();
    if (itemCount > 0) {
      testReport.log(this.pageName, `There are ${itemCount} Free shipping items in the page`);
    } else {
      throw new Error(`There are no Free Shipping items in the page ${itemCount}`);
    }
  }

  async selectFirstFreeShippingItem() {
    testReport.log(this.pageName, 'Select first free shipping item from the page');
    // await page.waitForLoadState('load');
    await commonUtils.forcedWait(5000);
    const itemCount = await page.locator(el.seoFreeShipping.lblFreeShipping).count();
    if (itemCount > 0) {
      await expect(page.locator(el.seoFreeShipping.lnkFreeShippingItem)).toBeVisible();
      await page.locator(el.seoFreeShipping.lnkFreeShippingItem).scrollIntoViewIfNeeded();
      // eslint-disable-next-line playwright/no-force-option
      await page.locator(el.seoFreeShipping.lnkFreeShippingItem).click({ force: true });
      await page.waitForLoadState('load');
    } else {
      throw new Error('Could not select free shipping item! Please check!!');
    }
  }

  async verifyPDPIsLoaded() {
    testReport.log(this.pageName, 'Verify PDP is loaded');
    await expect(page.locator(el.seoFreeShipping.breadcrumbContainer)).toBeVisible();
    await page.waitForLoadState('load');
    // await expect(await page.locator(el.seoFreeShipping.lblShipsFree).nth(0)).toBeVisible();
    testReport.log(this.pageName, 'PDP is loaded successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl() {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRobots
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyRobots(metaRobots) {
    testReport.log(this.pageName, 'Verify the Meta robots tag of the page');
    const actualRobotsTag = page.locator(el.seoMetaTags.seoMetaRobots);
    await expect(actualRobotsTag).toHaveAttribute('content', metaRobots);
    testReport.log(this.pageName, `Robots tag matched!! and the Robots tag is : ${actualRobotsTag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl() {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
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
    const actualOgType = page.locator(el.seoMetaTags.seoOgType);
    await expect(actualOgType).toHaveAttribute('content', 'product');
    testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
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
    const actualHeader1Tag = await page.locator(el.seoHeaderTag.seoHeader1Tag).nth(0).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoFreeShippingPage };
