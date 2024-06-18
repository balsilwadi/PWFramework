const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class MyRegistriesPage extends PageObject {
  constructor() {
    super();
    this.lnkMyRegistries =
      "//div[@class='left-nav-items']//a[contains(text(),'my registries')] | //div[@class='left-nav-items']//a[contains(text(),'My Registries')]";
    this.lblFname = "label[for='gr-firstName']";
    this.lblLname = "label[for='gr-lastName']";
    this.lblEventType = "label[for='gr-registryType']";
    this.txtFname = '#gr-firstName';
    this.txtLname = '#gr-lastName';
    this.txtEmail = '#gr-email';
    this.txtFullName = '.registry-name';
    this.btnRegistry = '.jsRegistry';
  }

  /**
   * @author: viktoriia
   * @function_Name : navigateToMyRegistries
   * @Description : Customer navigates to "My Registries" left nav menu
   * @params : None
   * @returns : None
   */
  async navigateToMyRegistries() {
    await page.waitForLoadState('load');
    await page.locator(this.lnkMyRegistries).click();
  }

  /**
   * @author: viktoriia
   * @function_Name : verifyMyRegistriesHomePage
   * @Description : Customer verifies "My Registries" page
   * @params : None
   * @returns : None
   */
  async verifyMyRegistriesHomePage() {
    await page.waitForLoadState('load');
    expect(page.url()).toContain(env.ACTIVE_GIFT_REGISTRY_PAGE_URL);
    await page.locator(el.registryPage.lnkCreateRegistry).click();
    await page.waitForLoadState('load');

    expect(page.url()).toContain(env.NO_GIFT_REGISTRY_PAGE_URL);
    await expect(page.locator(this.lblFname)).toHaveText(td.myRegistriesPage.lblFName);
    await expect(page.locator(this.lblLname)).toHaveText(td.myRegistriesPage.lblLName);
    await expect(page.locator(this.lblEventType)).toHaveText(td.myRegistriesPage.lblEventType);
    await expect(page.locator(this.txtEmail)).not.toBeEmpty();
    await expect(page.locator(this.txtFname)).not.toBeEmpty();
    await expect(page.locator(this.txtLname)).not.toBeEmpty();

    testReport.log(this.pageName, 'Verified registry page without active registries');
  }

  /**
   * @author: viktoriia
   * @function_Name : verifyMyRegistriesHomePage
   * @Description : Customer verifies "My Registries" page
   * @params : None
   * @returns : None
   */
  async verifyMyActiveRegistries() {
    await page.waitForLoadState('load', { timeout: 60000 });

    expect(page.url()).toContain(env.ACTIVE_GIFT_REGISTRY_PAGE_URL, { timeout: 10000 });
    //
    if (env.EXEC_SITE.endsWith('us')) {
      // Registrant name should be same in TD
      await expect(page.locator(this.txtFullName)).toHaveText(td.myRegistriesPage.registrantFullName, { ignoreCase: true });
      await expect(page.locator(this.btnRegistry)).toBeEnabled();
      await page.locator(this.btnRegistry).click();
      await page.waitForLoadState('load', { timeout: 60000 });
      expect(page.url()).toContain(env.ACNT_ACTIVE_REGISTRY_NUMBER);
    } else {
      await page.waitForLoadState('load');
      await common.proceedToCanadaFromGlobalPopup();
      expect(page.url()).toContain(env.ACTIVE_GIFT_REGISTRY_PAGE_URL);
    }
    testReport.log(this.pageName, 'Verified active registry page');
  }
}

// module.exports = { MyRegistriesPage };
module.exports = new MyRegistriesPage();
