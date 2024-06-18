const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');
const el = require('../../elements/elements');

const testReport = new ReportUtils();
const common = new CommonUtils();

class LoginFromFavorites extends PageObject {
  constructor() {
    super();
    this.pageName = 'LoginFromFavorites';
    this.btnFavorites = 'a[class*="header-favorites-link"]';
    this.btnSignin = 'button[class*="sign-in-btn"]';
    this.lnkSigninFavorites = '#favorites-sign-in-button';
  }

  /**
   * @author: krisna
   * @function_Name : launchSigninPopupFromFavorites
   * @Description : desktop - hover favorites icon and click on signin button, mobile - navigate to favorites page
   * @params : none
   * @returns : None
   * */
  async launchSigninPopupFromFavorites() {
    if (common.verifyIsMobile()) {
      await page.locator(el.homePage.btnAccountIconMobile).click();
      await page.locator(el.homePage.lnkFavoritesMobile).click();
      await page.waitForLoadState('load', { timeout: 60000 });
      testReport.log(this.pageName, 'Navigated to favorites page');
      await page.locator(this.lnkSigninFavorites).first().click();
      await expect(page.locator(el.loginPage.txtEmail)).toBeVisible({ timeout: 60000 });
      testReport.log(this.pageName, 'Signin popup is visible');
    } else {
      await page.hover(this.btnFavorites);
      await page.locator(this.btnSignin).click();
      await expect(page.locator(el.loginPage.txtEmail)).toBeVisible({ timeout: 60000 });
      testReport.log(this.pageName, 'Signin popup is visible');
    }
  }

  /**
   * @author: krisna
   * @function_Name : verifyFavoritePageDisplayed
   * @Description : verify whether the customer is landed on the favorites page
   * @params : none
   * @returns : None
   * */
  async verifyFavoritePageDisplayed() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/favorites/);
    testReport.log(this.pageName, 'Customer is on Favorites page');
  }
}
module.exports = new LoginFromFavorites();
