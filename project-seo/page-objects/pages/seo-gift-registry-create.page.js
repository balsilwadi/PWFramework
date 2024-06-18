const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const td = require('../data-files/test-data');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoGRCreatePage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToCrateGiftRegistryPage
   * @Description : This method is used to navigate to crate wedding registry page
   * @params : None
   * @returns : None
   * */
  async navigateToCrateGiftRegistryPage() {
    testReport.log(this.pageName, 'Click on Wedding Registry link');
    if (common.verifyIsMobile()) {
      await page.locator(el.seoCreateGiftRegistry.lnkHambergerMenu).click();
      const scroll = page.locator(el.seoCreateGiftRegistry.lnkWeddingRegistryMob);
      await scroll.scrollIntoViewIfNeeded();
      await page.click(el.seoCreateGiftRegistry.lnkWeddingRegistryMob);
      testReport.log(this.pageName, 'Clicked on Wedding Registry link');
      await page.click(el.seoCreateGiftRegistry.lnkGetStarted);
      await page.waitForLoadState('load');
      testReport.log(this.pageName, 'Clicked on Get Started link');
      await page.locator(el.seoCreateGiftRegistry.btnCreateMyRegistry).click();
    } else {
      await page.hover(el.seoCreateGiftRegistry.lnkWeddingRegistry);
      testReport.log(this.pageName, 'Hovered on Wedding Registry link');
      testReport.log(this.pageName, 'Click on Create My Registry button');
      await page.locator(el.seoCreateGiftRegistry.btnCreateARegistry).nth(1).click();
    }
    await page.waitForLoadState('load');
    const currentUrl = page.url();
    expect(currentUrl).toContain('/gift-registry/create/step1');
    testReport.log(this.pageName, 'Successfully navigated to Create Step 1 Gift registry page');
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToCB2GiftRegistryPage
   * @Description : This method is used to navigate to cb2 gift registry page
   * @params : None
   * @returns : None
   * */
  async navigateToCB2GiftRegistryPage() {
    testReport.log(this.pageName, 'Click on Gift Registry link');
    if (common.verifyIsMobile()) {
      await page.locator(el.seoCreateGiftRegistry.lnkHambergerMenu).click();
    }
    await page.click(el.seoCreateGiftRegistry.lnkGiftRegistry);
    testReport.log(this.pageName, 'Clicked on Gift Registry link');
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Click on Create A Registry button');
    if (common.verifyIsMobile()) {
      // await page.waitForSelector(el.seoCreateGiftRegistry.btnCB2MobileCreateARegistry, { waitFor: 'visible' });
      await page.locator(el.seoCreateGiftRegistry.btnCB2MobileCreateARegistry).click();
    } else {
      // await page.waitForSelector(el.seoCreateGiftRegistry.btnCB2CreateARegistry, { waitFor: 'visible' });
      await page.locator(el.seoCreateGiftRegistry.btnCB2CreateARegistry).click();
    }
    await page.waitForLoadState('load');
    const currentUrl = page.url();
    expect(currentUrl).toContain('/gift-registry/create/step1');
    testReport.log(this.pageName, 'Successfully navigated to Create Step 1 Gift registry page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(grPageUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + grPageUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
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

    const expectedMetaRobots = env.EXEC_SITE === 'cb2us' ? 'index,follow' : env.SEO_META_ROBOTS;

    await expect(actualRobotsTag).toHaveAttribute('content', expectedMetaRobots);

    testReport.log(this.pageName, `Robots tag matched!! and the Robots tag is : ${actualRobotsTag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(ogUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + ogUrl);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
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
    const actualHeader1Tag = await page.locator(el.seoCreateGiftRegistry.seoHeader1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : enterUserDetails
   * @Description : This method is used to enter the required fields in Create Gift Registry step1 page
   * @params : None
   * @returns : None
   * */
  async enterUserDetails() {
    testReport.log(this.pageName, 'Enter required fields in Gift Registry Create page');
    await page.click(el.seoCreateGiftRegistry.txtFirstName);
    await page.fill(el.seoCreateGiftRegistry.txtFirstName, td.createGiftRegistry.firstName);
    await page.click(el.seoCreateGiftRegistry.txtLastName);
    await page.fill(el.seoCreateGiftRegistry.txtLastName, td.createGiftRegistry.lastName);
    await page.locator(el.seoCreateGiftRegistry.cmbEventType).selectOption(td.createGiftRegistry.eventType);
    await page.click(el.seoCreateGiftRegistry.txtEmail);
    await page.fill(el.seoCreateGiftRegistry.txtEmail, common.generateNewEmail(), { delay: 100 });
    testReport.log(this.pageName, 'Entered values on Git Registry create page');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnContinueButton
   * @Description : This method is used to click on the continue button
   * @params : None
   * @returns : None
   * */
  async clickOnContinueButton() {
    testReport.log(this.pageName, 'Click on Continue button');
    await page.click(el.seoCreateGiftRegistry.btnContinue);
    testReport.log(this.pageName, 'Clicked on Continue button');
    // await page.waitForSelector(el.seoCreateGiftRegistry.lblH1, { waitFor: 'visible' });
    const currentUrl = page.url();
    expect(currentUrl).toContain('/gift-registry/Create/Step2');
    testReport.log(this.pageName, 'Successfully navigated to Create Step 2 Gift registry page');
  }
}

module.exports = { SeoGRCreatePage };
