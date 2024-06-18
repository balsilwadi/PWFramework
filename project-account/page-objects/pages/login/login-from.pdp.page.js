const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();

class LoginFromPDP extends PageObject {
  constructor() {
    super();
    this.pageName = 'LoginFromPDP';
    this.btnFavorites = 'ul li:nth-of-type(1) button[class*="button-add-to-favorite button"]';
    // this.btnFavorites = 'div.add-to-favorites-wrapper button';
    // this.mdlFavorites = '[data-id="popup-container"]';
    this.mdlFavorites = '#dsModal';
    this.lnkLogin = '#dsModalContent button';
  }

  /**
   * @author: krisna
   * @function_Name : verifyPDPDisplays
   * @Description : verify whether the customer is in pdp or not
   * @params : none
   * @returns : None
   * */
  async verifyPDPDisplays() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/search/);
    testReport.log(this.pageName, 'Customer is on PDP');
  }

  /**
   * @author: krishna
   * @function_Name : clickOnFavorites
   * @Description : click on the favorites icon displayed in the first item
   * @params : none
   * @returns : None
   * */
  async clickOnFavorites() {
    await page.locator(this.btnFavorites).click();
    await page.waitForLoadState('load');
    // verify favorits model is displaying
    await expect(page.locator(this.mdlFavorites)).toBeVisible();
    testReport.log(this.pageName, 'Favorites modal is visible');
  }

  /**
   * @author: krishna
   * @function_Name : clickOnSigninLink
   * @Description : click on the favorites icon displayed in the first item
   * @params : none
   * @returns : None
   * */
  async clickOnSigninLink() {
    await page.locator(this.lnkLogin).nth(2).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Clicked on Signin link in favorites');
  }
}
module.exports = new LoginFromPDP();
