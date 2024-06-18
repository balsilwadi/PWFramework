const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoHomePage {
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
   * @function_Name : verifyOgSiteName
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgSiteName(ogSiteName) {
    testReport.log(this.pageName, 'Verify Open graph site name of the page');
    const actualSiteName = page.locator(el.seoMetaTags.seoOgSiteName);
    await expect(actualSiteName).toHaveAttribute('content', ogSiteName);
    testReport.log(this.pageName, `Og Site Name matched!! and the Og Site Name is : ${actualSiteName}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyWebsiteSchema
   * @Description : This method is used to verify the Website schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyWebsiteSchema() {
    testReport.log(this.pageName, 'Verify Website Schema of the page');
    const actualWebsiteSchema = await page.locator(el.seoSchemaTags.seoWebsiteSchema).nth(0).textContent();
    expect(actualWebsiteSchema).not.toBeNull();
    expect(actualWebsiteSchema).toContain('"@type":"WebSite"');
    testReport.log(this.pageName, `Website Schema is not empty!! and the Website Schema value is : ${actualWebsiteSchema}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySearchActionSchema
   * @Description : This method is used to verify the Search action schema of the page
   * @params : None
   * @returns : None
   * */
  async verifySearchActionSchema() {
    testReport.log(this.pageName, 'Verify Search Action Schema of the page');
    const actualSearchActionSchema = await page.locator(el.seoHomePage.seoSearchActionSchema).nth(1).textContent();
    expect(actualSearchActionSchema).toContain('"@type": "SearchAction"');
    testReport.log(this.pageName, `Search Schema is not empty!! and the Search Schema value is : ${actualSearchActionSchema}`);
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
    const actualHeader1Tag = await page.locator(el.seoHomePage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoHomePage };
