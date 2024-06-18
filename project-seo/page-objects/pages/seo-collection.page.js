const { expect } = require('@playwright/test');
const el = require('../elements/elements');
// const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

// const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoCollectionPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToCollectionPage
   * @Description : This method is used to navigate to the Collections page
   * @params : None
   * @returns : None
   * */
  async navigateToCollectionPage(collectionPageUrl) {
    const currentUrl = page.url();
    let homeUrl = new URL(currentUrl);
    homeUrl = homeUrl.hostname;
    await page.goto(`https://${homeUrl}${collectionPageUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : expectedCatType
   * @returns : None
   * */
  async verifyCanonicalUrl(collectionPageUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + collectionPageUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(collectionPageUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + collectionPageUrl);
    testReport.log(this.pageName, `Og Url matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOrganizationSchema
   * @Description : This method is used to verify the Organization schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyOrganizationSchema() {
    testReport.log(this.pageName, 'Verify Organization Schema of the page');
    const actualOrganizationSchema = await page.locator(el.seoSchemaTags.seoOrganizationSchema).textContent();

    expect(actualOrganizationSchema).not.toBeNull();
    expect(actualOrganizationSchema).toContain('"@type":"Organization"');
    testReport.log(this.pageName, `Organization Schema is not empty!! and the Organization Schema value is : ${actualOrganizationSchema}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOrganizationSchemaSingleCollection
   * @Description : This method is used to verify the Organization schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyOrganizationSchemaSingleCollection() {
    testReport.log(this.pageName, 'Verify Organization Schema of the page');
    const actualOrganizationSchema = await page.locator(el.seoCollectionPage.seoOrganizationSchemaSCMobile).nth(0).textContent();
    expect(actualOrganizationSchema).not.toBeNull();
    expect(actualOrganizationSchema).toContain('"@type":"Organization"');
    testReport.log(this.pageName, `Organization Schema is not empty!! and the Organization Schema value is : ${actualOrganizationSchema}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyBreadcrumbSchema
   * @Description : This method is used to verify the Breadcrumb schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyBreadcrumbSchema() {
    testReport.log(this.pageName, 'Verify Breadcrumb Schema of the page');
    const actualBreadcrumbSchema = await page.locator(el.seoSchemaTags.seoBreadcrumbSchema).textContent();
    expect(actualBreadcrumbSchema).not.toBeNull();
    expect(actualBreadcrumbSchema).toContain('"@type":"BreadcrumbList"');
    testReport.log(this.pageName, `Breadcrumb Schema is not empty!! and the Breadcrumb Schema value is : ${actualBreadcrumbSchema}`);
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
    const actualHeader1Tag = await page.locator(el.seoHeaderTag.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoCollectionPage };
