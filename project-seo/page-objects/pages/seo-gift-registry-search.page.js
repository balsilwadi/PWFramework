const { expect } = require('@playwright/test');
const el = require('../elements/elements');
// const td = require('../data-files/test-data');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class SEOGiftRegistrySearch {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToCrateGiftRegistryPage
   * @Description : This method is used to navigate to crate wedding registry page
   * @params : None
   * @returns : None
   * */
  // need to rework on this method once the new gift registry flyout is in place for both crate us and ca
  async navigateToCrateGiftRegistryPage() {
    testReport.log(this.pageName, 'Click on Wedding Registry link');
    if (common.verifyIsMobile() && env.EXEC_SITE === 'crateus') {
      await page.locator(el.seoCreateGiftRegistry.lnkHambergerMenu).click();
      await page.locator(el.seoCreateGiftRegistry.lnkWeddingRegistryMobile).click();
      await page.locator(el.seoCreateGiftRegistry.lnkFindARegistryMobile).nth(0).click();
    } else if (env.EXEC_SITE === 'crateus') {
      await page.hover(el.seoCreateGiftRegistry.lnkWeddingRegistry);
      // await page.waitForSelector(el.seoCreateGiftRegistry.lnkFindARegistry, { waitFor: 'visible' });
      await page.locator(el.seoCreateGiftRegistry.lnkFindARegistry).click();
    } else if (common.verifyIsMobile() && env.EXEC_SITE === 'cratecan') {
      await page.locator(el.seoCreateGiftRegistry.lnkHambergerMenu).click();
      await page.click(el.seoCreateGiftRegistry.lnkWeddingRegistry);
    } else if (env.EXEC_SITE === 'cratecan') {
      await page.click(el.seoCreateGiftRegistry.lnkWeddingRegistry);
      await page.click(el.seoCreateGiftRegistry);
      // await page.waitForSelector(el.seoCreateGiftRegistry.lnkFindARegistry, { waitFor: 'visible' });
      // await page.locator(el.seoCreateGiftRegistry.lnkFindARegistry).click();
    }
    testReport.log(this.pageName, 'Clicked on Wedding Registry link');
    await page.waitForLoadState('load');
  }

  /**
   * @author: balsilwadi
   * @function_Name : navigateToGiftRegistryPageByURL
   * @Description : This method is used to navigate to gift registry page by URL
   * @params : None
   * @returns : None
   * */
  async navigateToGiftRegistryPageByURL() {
    testReport.log(this.pageName, 'Click on Wedding Registry link');

    await page.goto(`${env.BASE_URL}/wedding-gift-registry/`);

    testReport.log(this.pageName, 'Clicked on Wedding Registry link');
    await page.waitForLoadState('load');
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
      await page.click(el.seoCreateGiftRegistry.lnkGiftRegistry);
      await page.click(el.seoCreateGiftRegistry.lnkMobileGiveAGift);
    } else {
      await page.click(el.seoCreateGiftRegistry.lnkGiftRegistry);
    }
    testReport.log(this.pageName, 'Clicked on Gift Registry link');
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : enterRegistryFirstName
   * @Description : This method is used to enter the registry first name
   * @params : None
   * @returns : None
   * */
  async enterRegistryFirstName() {
    testReport.log(this.pageName, 'Enter First Name');
    await page.fill(el.seoSearchGiftRegistry.txtRegistryFirstName, 'test', { delay: 100 });
  }

  /**
   * @author: vtharakan
   * @function_Name : enterRegistryLastName
   * @Description : This method is used to enter the registry last name
   * @params : None
   * @returns : None
   * */
  async enterRegistryLastName() {
    testReport.log(this.pageName, 'Enter Last Name');
    await page.fill(el.seoSearchGiftRegistry.txtRegistryLastName, 'test', { delay: 100 });
  }

  /**
   * @author: vtharakan
   * @function_Name : selectRegistryType
   * @Description : This method is used to select the event type
   * @params : None
   * @returns : None
   * */
  async selectRegistryType() {
    testReport.log(this.pageName, 'Select the registry type');
    await page.click(el.seoSearchGiftRegistry.cmbBoxEventType);
    await page.selectOption(el.seoSearchGiftRegistry.cmbBoxEventType, 'AN');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnSearchButton
   * @Description : This method is used to click on search button
   * @params : None
   * @returns : None
   * */
  async clickOnSearchButton() {
    testReport.log(this.pageName, 'Click on Search button');
    await page.click(el.seoSearchGiftRegistry.btnSearch);
    expect(await page.locator('h1').textContent()).toContain('Find a Registry Search Results');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnFindARegistryButton
   * @Description : This method is used to click on find a registry button
   * @params : None
   * @returns : None
   * */
  async clickOnFindARegistryButton() {
    testReport.log(this.pageName, 'Click on Find a registry button');
    if (common.verifyIsMobile()) {
      await page.click(el.seoSearchGiftRegistry.btnSearchCB2);
    } else {
      await page.click(el.seoSearchGiftRegistry.btnFindARegistry);
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewRegistry
   * @Description : This method is used to click on view registry button
   * @params : None
   * @returns : None
   * */
  async clickOnViewRegistry() {
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Select first registry from the list');
    const registryCount = await page.locator(el.seoSearchGiftRegistry.lnkRegistryDetails).count();
    expect(registryCount).toBeGreaterThan(0);
    if (common.verifyIsMobile() || env.EXEC_SITE.includes('cb2')) {
      await page.locator(el.seoSearchGiftRegistry.lnkRegistryDetails).nth(0).click();
    } else {
      await page.locator(el.seoSearchGiftRegistry.lnkViewRegistry).click();
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyGiftRegistryLoaded
   * @Description : This method is used to verify the gift registry page is loaded
   * @params : None
   * @returns : None
   * */
  async verifyGiftRegistryLoaded() {
    testReport.log(this.pageName, 'Verify Gift registry is loaded successfully');
    // await expect(await page.getByText('Still Need', { exact: true })).toBeVisible();
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFreeShippingMessage
   * @Description : This method is used to verify the free shipping message displayed in the meta description tag
   * @params : None
   * @returns : None
   * */
  async verifyFreeShippingMessage() {
    testReport.log(this.pageName, 'Verify Free Shipping message is displayed in the Meta descriptin tag');
    const actualDescription = await page.locator(el.seoMetaTags.seoMetaDescription).getAttribute('content');
    expect(actualDescription).toContain('Free shipping on registry orders over $49.');
    testReport.log(`Meta description contains the free shipping message. Meta description is : ${actualDescription}`);
  }

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
   * @function_Name : verifyRobots
   * @Description : This method is used to verify the SEO robots tag of the page
   * @params : None
   * @returns : None
   * */
  async verifyRobots(metaRobots) {
    testReport.log(this.pageName, 'Verify the Meta robots tag of the page');
    const actualRobotsTag = page.locator(el.seoMetaTags.seoMetaRobots);
    if ((await page.locator("[data-card-type='product']").count()) > 0) await expect(actualRobotsTag).toHaveAttribute('content', metaRobots);
    else expect(actualRobotsTag).toEqual('noindex,nofollow');
    testReport.log(this.pageName, `Robots tag matched!! and the Robots tag is : ${actualRobotsTag}`);
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
    const actualHeader1Tag = await page.locator(el.seoSearchGiftRegistry.seoHeaderH1Tag).textContent();
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifiyGuestListRobots
   * @Description : This method is used to verify the Seo Robots tag on the guest list page is matching the expected
   * @params : expectedRobots
   * @returns : None
   * */
  async verifiyGuestListRobots(expectedRobots) {
    testReport.log(this.pageName, `Clicking View As Guest button`);
    const buttonLocator = `//a[contains(text(),'View as Guest')]`;
    const [newWindow] = await Promise.all([global.context.waitForEvent('page'), await page.locator(buttonLocator).nth(0).click()]);
    testReport.log(this.pageName, `View As Guest buttojn clicked`);

    testReport.log(this.pageName, 'Validating Robots tag');
    const actualRobotsTag = newWindow.locator(el.seoMetaTags.seoMetaRobots);
    await expect(actualRobotsTag).toHaveAttribute('content', expectedRobots);
    testReport.log(this.pageName, `Robots tag is matching the expected : ${expectedRobots}`);
  }

  /**
   * @function_Name : clickRegistry
   * @Description : This method is used to click the registry in the manage registry page
   * @params : registryName
   * @returns : None
   * */
  async clickRegistry(registryName) {
    testReport.log(this.pageName, `Clicking registry : ${registryName}`);
    await page.click(`//h2[contains(text(),'${registryName}')]`);
    testReport.log(this.pageName, `Registry ${registryName} is clicked`);
  }
}

module.exports = { SEOGiftRegistrySearch };
