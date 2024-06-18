const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoTheFramePage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToTheFramePage
   * @Description : This method is used to navigate to the Frame page
   * @params : None
   * @returns : None
   * */
  async navigateToTheFramePage(framePageUrl) {
    const currentUrl = page.url();
    let homeUrl = new URL(currentUrl);
    homeUrl = homeUrl.hostname;
    await page.goto(`https://${homeUrl}${framePageUrl}`);
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(framePageUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + framePageUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(framePageUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + framePageUrl);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgType
   * @Description : This method is used to verify the open graph Type of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgType(ogType) {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    const actualOgType = page.locator(el.seoMetaTags.seoOgType);
    await expect(actualOgType).toHaveAttribute('content', ogType);
    testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
  }
}

module.exports = { SeoTheFramePage };
