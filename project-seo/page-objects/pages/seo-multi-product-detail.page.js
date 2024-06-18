const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoMPDPPage {
  pageName = this.constructor.name;

  /**
   * @author: balsilwadi
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : expectedCatType
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

  /**
   * @author: balsilwadi
   * @function_Name : verifyBreadcrumbSchema
   * @Description : This method is used to verify the Breadcrumb schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyBreadcrumbSchema() {
    testReport.log(this.pageName, 'Verify Breadcrumb Schema of the page');
    const actualBreadcrumbSchema = await page.locator(el.seoMpdpPage.seoBreadcrumbSchema).textContent();
    expect(actualBreadcrumbSchema).not.toBeNull();
    expect(actualBreadcrumbSchema).toContain('"@type":"BreadcrumbList"');
    testReport.log(this.pageName, `Breadcrumb Schema is not empty!! and the Breadcrumb Schema value is : ${actualBreadcrumbSchema}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyProductSchema
   * @Description : This method is used to verify the Product schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyProductSchema() {
    testReport.log(this.pageName, 'Verify Product Schema of the page');
    const actualProductSchema = await page.locator(el.seoMpdpPage.seoProductSchema).textContent();
    expect(actualProductSchema).not.toBeNull();
    expect(actualProductSchema).toContain('"@type":"Product"');
    testReport.log(this.pageName, `Product Schema is not empty!! and the Product Schema value is : ${actualProductSchema}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyImageGallerySchema
   * @Description : This method is used to verify the ImageGallery schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyImageGallerySchema() {
    testReport.log(this.pageName, 'Verify ImageGallery Schema of the page');
    const actualImageGallerySchema = await page.locator(el.seoMpdpPage.seoImageGallerySchema).textContent();
    expect(actualImageGallerySchema).not.toBeNull();
    expect(actualImageGallerySchema).toContain('"@type":"ImageGallery"');
    testReport.log(this.pageName, `ImageGallery Schema is not empty!! and the ImageGallery Schema value is : ${actualImageGallerySchema}`);
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
    const actualHeader1Tag = await page.locator(el.seoMpdpPage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }
}

module.exports = { SeoMPDPPage };
