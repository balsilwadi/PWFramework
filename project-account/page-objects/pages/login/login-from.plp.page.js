const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class LoginFromPLP extends PageObject {
  constructor() {
    super();
    this.pageName = 'LoginFromPLP';
    this.lnkFirstProduct = 'ul[class*=card-deck] li:nth-of-type(1) a[class=product-link]';
    this.btnFavroite = 'button[class*=add-to-favorite]';
  }

  /**
   * @author: krisna
   * @function_Name : storeThePlpUrl
   * @Description : verify whether the customer is in pdp or not
   * @params : none
   * @returns : None
   * */
  async storeThePlpUrl() {
    await page.goto(env.ACNT_PLP);
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Customer is on PLP');
    return page.url();
  }

  /**
   * @author: krisna
   * @function_Name : clickOnFavoriteInPLP
   * @Description : verify whether the customer is in pdp or not
   * @params : none
   * @returns : None
   * */
  async clickOnFavoriteInPLP() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await page.locator(this.btnFavroite).click();
    testReport.log(this.pageName, 'Clicked on Favorite icon in PLP');
  }

  /**
   * @author: krisna
   * @function_Name : verifyCustomerStaysOnPLP
   * @Description : verify whether the customer is in pdp or not
   * @params : none
   * @returns : None
   * */
  async verifyCustomerStaysOnPLP(currentURL) {
    await page.waitForLoadState('load', { timeout: 60000 });
    expect(page.url()).toEqual(currentURL);
    testReport.log(this.pageName, 'Logged in successfully and customer stays on PLP as expected');
  }
}

module.exports = new LoginFromPLP();
