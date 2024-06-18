const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoGiftCardPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToGiftCardPage
   * @Description : This method is used to navigate to the gift card page
   * @params : None
   * @returns : None
   * */
  async navigateToGiftCardPage() {
    await page.goto(`${env.BASE_URL}/gift-cards/`, { timeout: 60000 });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(giftCardUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + giftCardUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(giftCardUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + giftCardUrl);
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
    const actualHeader1Tag = await page.locator(el.seoGiftCardPage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoGiftCardPage };
