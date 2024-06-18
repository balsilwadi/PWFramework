const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoIndexableFiltersPage {
  pageName = this.constructor.name;

  /**
   * @author: balsilwadi
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(url) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + url);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: balsilwadi
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
   * @author: balsilwadi
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(url) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + url);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifySeoHeader1Tag
   * @Description : This method is used to verify the Seo Header1 tag in the page
   * @params : None
   * @returns : None
   * */
  async verifySeoHeader1Tag() {
    testReport.log(this.pageName, 'Verify Header 1 tag is displayed in the page');
    const actualHeader1Tag = await page.locator(el.seoGeneratedPage.lblSeoPageTitle).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoIndexableFiltersPage };
