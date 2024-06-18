const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const elements = require('../../elements/elements');
const testData = require('../../datafiles/testdata');
const { timeout } = require('../../../../configs/config');

const testReport = new ReportUtils();

class CartFlyout {
  pageName = this.constructor.name;
  /**
   * @author: asoman
   * @function_Name : returningCustomerSignIn
   * @Description : SignIn from cart flyout for a returning user
   * @params : None
   * @returns : None
   * */

  async returningCustomerSignIn() {
    // get returning user credentials
    const returningUserEmail = testData.returningUser.email;
    const returningUserPwd = testData.returningUser.password;

    await expect(page.locator(elements.cartFlyOut.txtReturningUserEmail)).toBeVisible({ timeout });

    await page.fill(elements.cartFlyOut.txtReturningUserEmail, returningUserEmail);
    testReport.log(this.pageName, `Entering Returning User email - ${returningUserEmail}`);

    await page.fill(elements.cartFlyOut.txtReturningUserPassword, returningUserPwd);
    testReport.log(this.pageName, `Entering Returning User password - ${returningUserPwd}`);

    await page.click(elements.cartFlyOut.btnSignInForReturningUser);
    await expect(page.locator(elements.cartFlyOut.lblCheckoutTitle)).toBeVisible({ timeout });

    testReport.log(this.pageName, 'Returning User Logged in');
    await page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { CartFlyout };
