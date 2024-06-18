const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoStoreDetailsPage {
  pageName = this.constructor.name;

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
   * @function_Name : verifyOgSiteName
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgSiteName(siteName) {
    testReport.log(this.pageName, 'Verify Open graph site name of the page');
    const actualSiteName = await page.locator(el.seoMetaTags.seoOgSiteName).getAttribute('content');
    if (env.EXEC_SITE.includes('cb2')) {
      expect(actualSiteName).toContain(siteName);
    } else {
      expect(actualSiteName).toContain(env.SEO_OG_SITENAME);
    }
    testReport.log(this.pageName, `Og Site Name matched!! and the Og Site Name is : ${actualSiteName}`);
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
    testReport.log(this.pageName, `Og URL matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgType
   * @Description : This method is used to verify the open graph Type of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgType(type) {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    const actualOgType = await page.locator(el.seoMetaTags.seoOgType).getAttribute('content');
    if (env.EXEC_SITE === 'cb2can') {
      expect(actualOgType).toEqual(type);
    } else {
      expect(actualOgType).toEqual('localstore');
    }
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
    const actualHeader1Tag = await page.locator(el.seoStoreLocatorPage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoStoreDetailsPage };
