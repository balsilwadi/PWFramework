const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const env = require('../../../../support/env/env');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();

class OrderDetailsPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'OrderDetailsPage';
  }

  /**
   * @author: krishna
   * @function_Name : VerifyLoginFields
   * @Description : Verify login fields and greeting msg is displaying in the order details page
   * @params : none
   * @returns : None
   * */

  async VerifyLoginFields() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(el.orderDetails.lblGreetingMsg)).toHaveText(`${td.orderTrackingPage.greeting + env.ACNT_ORDER_NAME}!`, {
      ignoreCase: true
    });
    await expect(page.locator(el.orderDetails.lblPromotionTxt)).toHaveText(env.ACNT_ORDER_MSG, { ignoreCase: true });
    await expect(page.locator(el.orderDetails.lnkResetPassword)).toBeVisible();
    await expect(page.locator(el.loginPage.lblEmail)).toHaveText(td.orderTrackingPage.emailLbl);
    await expect(page.locator(el.loginPage.lblPassword)).toHaveText(td.orderTrackingPage.password);
    await expect(page.locator(el.orderDetails.lblPrivacyPolicy)).toBeVisible();
    testReport.log(this.pageName, 'Login fields are displaying as expected');
  }

  /**
   * @author: krishna
   * @function_Name : LoginToAccount
   * @Description : Enter password and click on Sign in
   * @params : none
   * @returns : None
   * */
  async LoginToAccount() {
    await page.fill(el.loginPage.txtPassword, td.orderTrackingPage.acntPassword);
    await page.locator(el.loginPage.btnSignIn).click();
    testReport.log(this.pageName, 'Entered the password and clicked on Sign in');
  }
}

module.exports = new OrderDetailsPage();
