const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

class CookiePreference extends PageObject {
  constructor() {
    super();
    this.pageName = 'CookirPreferencePage';
    this.lnkCookieSetting = 'button[class*=ot-sdk-show]';
    this.pupCookieSetting = 'div[class=ot-btn-container]';
    this.lblPopupHeader = '.ot-pc-header .ot-title-cntr h2';
    this.imgLogo = '.ot-pc-header .ot-pc-logo';
    this.mnuOption1 = '.ot-cat-grp li:nth-of-type(1)';
    this.mnuOption2 = '.ot-cat-grp li:nth-of-type(2)';
    this.mnuOption3 = '.ot-cat-grp li:nth-of-type(3)';
    this.mnuOption4 = '.ot-cat-grp li:nth-of-type(4)';
    this.mnuTitle1 = '//div[contains(@class,"ot-tab-desc")]/div[1]//h4';
    this.mnuTitle2 = '//div[contains(@class,"ot-tab-desc")]/div[2]//h4';
    this.mnuTitle3 = '//div[contains(@class,"ot-tab-desc")]/div[3]//h4';
    this.mnuTitle4 = '//div[contains(@class,"ot-tab-desc")]/div[4]//h4';
    this.mnuDesc1 = '//div[contains(@class,"ot-tab-desc")]/div[1]/p';
    this.mnuDesc2 = '//div[contains(@class,"ot-tab-desc")]/div[2]/p';
    this.mnuDesc3 = '//div[contains(@class,"ot-tab-desc")]/div[3]/p';
    this.mnuDesc4 = '//div[contains(@class,"ot-tab-desc")]/div[4]/p';
    this.btnConfirmChanges = 'button[class*=save-preference]';
    this.btnRejectAll = 'button[class*=ot-pc-refuse-all-handler]';
    this.btnAcceptAll = 'button[id=accept-recommended-btn-handler]';
  }

  /**
   * @function : clickOnCookieSetting
   * @Description : click on cookie preference settings and verify whether the popup is launching
   * @Params: None
   * @Returns: none
   */

  async clickOnCookieSetting() {
    await page.locator(this.lnkCookieSetting).click();
    await expect(page.locator(this.pupCookieSetting)).toBeVisible({ timeout: 10000 });
    testReport.log(this.pageName, 'Cookie settings popup is displayed');
  }

  /**
   * @function : verifyCookieSettingContent()
   * @Description : verify the content of the cookie setting popup
   * @Params: None
   * @Returns: none
   */

  async verifyCookieSettingContent() {
    // verify the content of cookie settings popup
    await expect(page.locator(this.imgLogo)).toBeVisible();
    await expect(page.locator(this.lblPopupHeader)).toHaveText(td.cookieSetting.headerTitle);
    await expect(page.locator(`${this.mnuOption1} h3`)).toHaveText(td.cookieSetting.mnuOption1);
    await expect(page.locator(`${this.mnuOption2} h3`)).toHaveText(td.cookieSetting.mnuOption2);
    await expect(page.locator(`${this.mnuOption3} h3`)).toHaveText(td.cookieSetting.mnuOption3);
    await expect(page.locator(`${this.mnuOption4} h3`)).toHaveText(td.cookieSetting.mnuOption4);
    if (!common.verifyIsMobile()) {
      await page.locator(this.mnuOption1).click();
      await expect(page.locator(this.mnuTitle1)).toHaveText(td.cookieSetting.mnuOption1);
      await expect(page.locator(this.mnuDesc1)).toBeVisible();
      await page.locator(this.mnuOption2).click();
      await expect(page.locator(this.mnuTitle2)).toHaveText(td.cookieSetting.mnuOption2);
      await expect(page.locator(this.mnuDesc2)).toBeVisible();
      await page.locator(this.mnuOption3).click();
      await expect(page.locator(this.mnuTitle3)).toHaveText(td.cookieSetting.mnuOption3);
      await expect(page.locator(this.mnuDesc3)).toBeVisible();
      await page.locator(this.mnuOption4).click();
      await expect(page.locator(this.mnuTitle4)).toHaveText(td.cookieSetting.mnuOption4);
      await expect(page.locator(this.mnuDesc4)).toBeVisible();
    }
    testReport.log(this.pageName, 'Cookie settings popup content is matched as expected');
    // Click on confirm changes button
    await expect(page.locator(this.btnConfirmChanges)).toHaveText(td.cookieSetting.btnConfirmChanges);
    await page.locator(this.btnConfirmChanges).click();
    await expect(page.locator(this.pupCookieSetting)).toBeHidden();
    testReport.log(this.page, 'Confirm changes button is working as expected');
    this.clickOnCookieSetting();
  }

  /**
   * @function : verifyRejectAllButton()
   * @Description : verify the content of the cookie setting popup
   * @Params: None
   * @Returns: none
   */

  async verifyRejectAllButton() {
    await expect(page.locator(this.btnRejectAll)).toHaveText(td.cookieSetting.btnRejectAll);
    await page.locator(this.btnRejectAll).click();
    await expect(page.locator(this.pupCookieSetting)).toBeHidden();
    testReport.log(this.page, 'Confirm changes button is working as expected');
    this.clickOnCookieSetting();
  }

  /**
   * @function : verifyAcceptlButton()
   * @Description : verify the content of the cookie setting popup
   * @Params: None
   * @Returns: none
   */

  async verifyAcceptButton() {
    await expect(page.locator(this.btnAcceptAll)).toHaveText(td.cookieSetting.btnAcceptAll);
    await page.locator(this.btnAcceptAll).click();
    await expect(page.locator(this.pupCookieSetting)).toBeHidden();
    testReport.log(this.page, 'Confirm changes button is working as expected');
    this.clickOnCookieSetting();
  }
}

module.exports = new CookiePreference();
