const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const seoPlp = require('../data-files/seo-product-listing-page.json');

const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoPLPPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : verifyPageTitle
   * @Description : This method is used to verify the SEO title of the page
   * @params : None
   * @returns : None
   * */
  async verifyPageTitle() {
    testReport.log(this.pageName, 'Verify the SEO page title');
    const actualPageTitle = await page.title();
    expect(actualPageTitle).not.toBeNull();
    testReport.log(this.pageName, `Verified the page title and the title is : ${actualPageTitle}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMetaDescription
   * @Description : This method is used to verify the SEO Meta description of the page
   * @params : None
   * @returns : None
   * */
  async verifyMetaDescription() {
    testReport.log(this.pageName, 'Verify the Meta Description of the page');
    const actualDescription = await page.locator(el.seoPlpPage.seoMetaDescription).getAttribute('content');
    expect(actualDescription).not.toBeNull();
    testReport.log(this.pageName, `Meta description is not empty!! and the description is : ${actualDescription}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : expectedCatType
   * @returns : None
   * */
  async verifyCanonicalUrl(expectedCatType) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualCanonicalUrl = await page.locator(el.seoPlpPage.seoCanonicalLink).getAttribute('href');
      expect(actualCanonicalUrl).toContain(spategoryName[0].canonical);
      testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
    } else if (spategoryName.length === 0) {
      throw new Error('Expected data is missing in the JSON file!!');
    } else {
      throw new Error('Invalid / Duplicate Spategory exist in the file!!');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRobots
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyRobots(expectedCatType) {
    testReport.log(this.pageName, 'Verify the Meta robots tag of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualRobotsTag = page.locator(el.seoPlpPage.seoMetaRobots);
      await expect(actualRobotsTag).toHaveAttribute('content', spategoryName[0].robots);
      testReport.log(this.pageName, `Meta robots tag matched!! and the Meta robots tag is : ${actualRobotsTag}`);
    } else if (spategoryName.lenght === 0) {
      testReport.log(this.pageName, 'Expected data is missing in the JSON file!!');
    } else {
      testReport.log(this.pageName, 'Invalid / Duplicate Spategory exist in the file');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgSiteName
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgSiteName(expectedCatType) {
    testReport.log(this.pageName, 'Verify Open graph site name of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualOgSiteName = page.locator(el.seoPlpPage.seoOgSiteName);
      await expect(actualOgSiteName).toHaveAttribute('content', spategoryName[0].ogSiteName);
      testReport.log(this.pageName, `OgSiteName matched!! and the Og Site Name is : ${actualOgSiteName}`);
    } else if (spategoryName.length === 0) {
      testReport.log(this.pageName, 'Expected data is missing in the JSON file!!');
    } else {
      testReport.log(this.pageName, 'Invalid / Duplicate Spategory exist in the file');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgImage
   * @Description : This method is used to verify the open graph image of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgImage() {
    testReport.log(this.pageName, 'Verify Open graph image of the page is displayed');
    const actualOgImageTag = await page.locator(el.seoPlpPage.seoOgImage).getAttribute('content');
    expect(actualOgImageTag).not.toBeNull();
    testReport.log(this.pageName, `Og image url is not empty!! and the Og Image is : ${actualOgImageTag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(expectedCatType) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualOgUrl = await page.locator(el.seoPlpPage.seoOgUrl).getAttribute('content');
      expect(actualOgUrl).toContain(spategoryName[0].ogUrl);
      testReport.log(this.pageName, `Og Url matched!! and the Og Url is : ${actualOgUrl}`);
    } else if (spategoryName.length === 0) {
      testReport.log(this.pageName, 'Expected data is missing in the JSON file!!');
    } else {
      testReport.log(this.pageName, 'Invalid / Duplicate Spategory exist in the file');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgTitle
   * @Description : This method is used to verify the open graph Title of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgTitle() {
    testReport.log(this.pageName, 'Verify Open graph Title of the page');
    const actualOgTitle = await page.locator(el.seoPlpPage.seoOgTitle).getAttribute('content');
    expect(actualOgTitle).not.toBeNull();
    testReport.log(this.pageName, `Og Title matched!! and the Og Title is : ${actualOgTitle}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgType
   * @Description : This method is used to verify the open graph Type of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgType(expectedCatType) {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualOgType = page.locator(el.seoPlpPage.seoOgType);
      await expect(actualOgType).toHaveAttribute('content', spategoryName[0].ogType);
      testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
    } else if (spategoryName.length === 0) {
      testReport.log(this.pageName, 'Expected data is missing in the JSON file!!');
    } else {
      testReport.log(this.pageName, 'Invalid / Duplicate Spategory exist in the file');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgDescription
   * @Description : This method is used to verify the open graph Description of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgDescription() {
    testReport.log(this.pageName, 'Verify Open graph Description of the page');
    const actualOgDescription = await page.locator(el.seoPlpPage.seoOgDescription).getAttribute('content');
    expect(actualOgDescription).not.toBeNull();
    testReport.log(this.pageName, `Og Description matched!! and the Og Description is : ${actualOgDescription}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFbAdmins
   * @Description : This method is used to verify the Fb Admins of the page
   * @params : None
   * @returns : None
   * */
  async verifyFbAdmins(expectedCatType) {
    testReport.log(this.pageName, 'Verify Fb Admins of the page');
    const spategoryName = seoPlp.filter((element) => element.catType === expectedCatType);
    if (spategoryName.length === 1) {
      const actualFbAdmins = page.locator(el.seoPlpPage.seoFbAdmins);
      await expect(actualFbAdmins).toHaveAttribute('content', spategoryName[0].fbAdmins);
      testReport.log(this.pageName, `Fb Admins matched!! and the Fb Admin is : ${actualFbAdmins}`);
    } else if (spategoryName.length === 0) {
      testReport.log(this.pageName, 'Expected data is missing in the JSON file!!');
    } else {
      testReport.log(this.pageName, 'Invalid / Duplicate Spategory exist in the file');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFAQSchema
   * @Description : This method is used to verify the FAQPage schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyFAQPageSchema() {
    testReport.log(this.pageName, 'Verify FAQPage Schema of the page');
    const expectedFAQPageSchema = '"@type": "FAQPage"';
    const actualFAQPageSchema = await page.locator(el.seoPlpPage.seoFaqSchema).textContent();
    expect(actualFAQPageSchema).not.toBeNull();
    expect(actualFAQPageSchema).toContain(expectedFAQPageSchema);
    testReport.log(this.pageName, `FAQPage Schema is not empty!! and the FAQPage Schema value is : ${actualFAQPageSchema}`);
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
    const actualWebsiteSchema = await page.locator(el.seoPlpPage.seoWebsiteSchema).nth(1).textContent();
    expect(actualWebsiteSchema).not.toBeNull();
    expect(actualWebsiteSchema).toContain('"@type":"WebSite"');
    testReport.log(this.pageName, `Website Schema is not empty!! and the Website Schema value is : ${actualWebsiteSchema}`);
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
    let actualOrganizationSchema;
    if (common.verifyIsMobile()) {
      actualOrganizationSchema = await page.locator(el.seoPlpPage.seoOrganizationSchemaMobile).nth(0).textContent();
    } else {
      actualOrganizationSchema = await page.locator(el.seoPlpPage.seoOrganizationSchema).textContent();
    }
    expect(actualOrganizationSchema).not.toBeNull();
    expect(actualOrganizationSchema).toContain('"@type":"Organization"');
    testReport.log(this.pageName, `Organization Schema is not empty!! and the Organization Schema value is : ${actualOrganizationSchema}`);
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
    const actualHeader1Tag = await page.locator(el.seoPlpPage.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyExternalLinkCount
   * @Description : This method is used to verify the external link count in the page
   * @params : None
   * @returns : None
   * */
  async verifyExternalLinkCount() {
    testReport.log(this.pageName, 'Verify the External link count');
    const externalLinksCount = await page.locator(el.seoPlpPage.lnkExternalLinkCount).count();
    expect(externalLinksCount).toBeGreaterThan(0);
    testReport.log(this.pageName, `External links are present in the page. External links count : ${externalLinksCount}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyInternalLinkCount
   * @Description : This method is used to verify the internal link count in the page
   * @params : None
   * @returns : None
   * */
  async verifyInternalLinkCount() {
    testReport.log(this.pageName, 'Verify the Internal link count');
    const internalLinksCount = await page.locator(el.seoPlpPage.lnkInternalLinkCount).count();
    expect(internalLinksCount).toBeGreaterThan(0);
    testReport.log(this.pageName, `Internal links are present in the page. Internal links count : ${internalLinksCount}`);
  }
}

module.exports = { SeoPLPPage };
