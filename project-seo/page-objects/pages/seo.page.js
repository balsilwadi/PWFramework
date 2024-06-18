const { expect } = require('@playwright/test');
const el = require('../elements/elements');
// const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

// const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoPage {
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
    const actualDescription = await page.locator(el.seoMetaTags.seoMetaDescription).getAttribute('content');
    expect(actualDescription).not.toBeNull();
    testReport.log(this.pageName, `Meta description matched!! and the description is : ${actualDescription}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRobots
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyRobots() {
    testReport.log(this.pageName, 'Verify the Meta robots tag of the page');
    const actualRobotsTag = page.locator(el.seoMetaTags.seoMetaRobots);
    await expect(actualRobotsTag).toHaveAttribute('content', env.SEO_META_ROBOTS);
    testReport.log(this.pageName, `Robots tag matched!! and the Robots tag is : ${actualRobotsTag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgSiteName
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgSiteName() {
    testReport.log(this.pageName, 'Verify Open graph site name of the page');
    const actualSiteName = await page.locator(el.seoMetaTags.seoOgSiteName).getAttribute('content');
    expect(actualSiteName).toContain(env.SEO_OG_SITENAME);
    testReport.log(this.pageName, `Og Site Name matched!! and the Og Site Name is : ${actualSiteName}`);
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
    const actualOgImageTag = await page.locator(el.seoMetaTags.seoOgImage).getAttribute('content');
    expect(actualOgImageTag).not.toBeNull();
    testReport.log(this.pageName, `Og image url is not empty!! and the Og Image is : ${actualOgImageTag}`);
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
    const actualOgTitle = await page.locator(el.seoMetaTags.seoOgTitle).getAttribute('content');
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
  async verifyOgType() {
    testReport.log(this.pageName, 'Verify Open graph Type of the page');
    const actualOgType = page.locator(el.seoMetaTags.seoOgType);
    await expect(actualOgType).toHaveAttribute('content', env.SEO_OG_TYPE);
    testReport.log(this.pageName, `Og Type matched!! and the Og Type is : ${actualOgType}`);
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
    const actualOgDescription = await page.locator(el.seoMetaTags.seoOgDescription).getAttribute('content');
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
  async verifyFbAdmins() {
    testReport.log(this.pageName, 'Verify Fb Admins of the page');
    const actualFbAdmins = page.locator(el.seoMetaTags.seoFbAdmins);
    await expect(actualFbAdmins).toHaveAttribute('content', env.SEO_FB_ADMINS);
    testReport.log(this.pageName, `Fb Admins matched!! and the Fb Admin value is : ${actualFbAdmins}`);
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
    const actualWebsiteSchema = await page.locator(el.seoSchemaTags.seoWebsiteSchema).textContent();
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
    const actualOrganizationSchema = await page.locator(el.seoSchemaTags.seoOrganizationSchema).textContent();

    expect(actualOrganizationSchema).not.toBeNull();
    expect(actualOrganizationSchema).toContain('"@type":"Organization"');
    testReport.log(this.pageName, `Organization Schema is not empty!! and the Organization Schema value is : ${actualOrganizationSchema}`);
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
    const externalLinksCount = await page.locator(el.seoExternalInternalLinksTags.lnkExternalLinkCount).count();
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
    const internalLinksCount = await page.locator(el.seoExternalInternalLinksTags.lnkInternalLinkCount).count();
    expect(internalLinksCount).toBeGreaterThanOrEqual(0);
    testReport.log(this.pageName, `Internal links are present in the page. Internal links count : ${internalLinksCount}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyProductCollectionSchema
   * @Description : This method is used to verify the ProductCollection schema of the page
   * @params : None
   * @returns : None
   * */
  async verifyProductCollectionSchema() {
    testReport.log(this.pageName, 'Verify ProductCollection Schema of the page');
    const actualProductCollectionSchema = await page.locator(el.seoSchemaTags.seoProductCollectionSchema).textContent();
    expect(actualProductCollectionSchema).not.toBeNull();
    expect(actualProductCollectionSchema).toContain('"@type":"ProductCollection"');
    testReport.log(this.pageName, `ProductCollection Schema is not empty!! and the Organization Schema value is : ${actualProductCollectionSchema}`);
  }
}

module.exports = { SeoPage };
