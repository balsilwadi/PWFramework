const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoStoreLocatorPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToStoreLocatorPage
   * @Description : This method is used to navigate to the Store Locator page
   * @params : None
   * @returns : None
   * */
  async navigateToStoreLocatorPage() {
    testReport.log(this.pageName, 'Navigate to Store Locator page');
    const currentUrl = page.url();
    let homeUrl = new URL(currentUrl);
    homeUrl = homeUrl.hostname;
    await page.goto(`https://${homeUrl}/stores/`, { timeout: 60000 });
    testReport.log(this.pageName, 'Successfully navigated to Store Locator page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(storeUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + storeUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(storeUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + storeUrl);
    testReport.log(this.pageName, `Og URL matched!! and the Og Url is : ${actualOgUrl}`);
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
    if (env.EXEC_SITE.includes('cratecan')) {
      actualHeader1Tag = await page.locator(el.seoStoreLocatorPage.seoHeader2Tag).textContent();
    } else {
      actualHeader1Tag = await page.locator(el.seoStoreLocatorPage.seoHeader1Tag).textContent();
    }
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoStoreLocatorPage };
