const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
const env = require('../../../../support/env/env');

class ConfrmPageCreateAccount extends PageObject {
  pageName = this.constructor.name;

  /**
   * @function : enterNewEmailAddressinShippingPage
   * @Description : Generate a new email address and enter in the email address field in shipping page
   * @Params: None
   * @Returns: none
   */

  async enterNewEmailAddressinShippingPage(newEmail) {
    await expect(page.locator(el.shippingpage.txtReceiptEmail)).toBeVisible({ timeout: 10000 });
    await page.fill(el.shippingpage.txtReceiptEmail, newEmail, { delay: 100 });
    testReport.log(this.pageName, `Entered Receipient Email -> ${newEmail}`);
  }

  /**
   * @function : verifyCreateNewAccountFields
   * @Description : Verify the create new account fields on the confirmation page
   * @Params: None
   * @Returns: none
   */

  async verifyCreateNewAccountFields(newEmail) {
    await expect(page.locator(el.confirmationPage.lblCreateAccount)).toHaveText(td.confirmationPage.createAccount);
    const accountDesc = common.replaceAll(await page.innerText(el.confirmationPage.lblCreateAccountDesc), '\n', '');
    expect(accountDesc).toEqual(td.confirmationPage.createAccountDesc);
    await expect(page.locator(el.confirmationPage.lblEmailHeader)).toHaveText(td.confirmationPage.emailHeader);
    await expect(page.locator(el.confirmationPage.lblEmailAddress)).toHaveText(newEmail);
    await expect(page.locator(el.confirmationPage.lblPassword)).toHaveText(td.confirmationPage.password);
    await page.locator(el.confirmationPage.txtPassword).click({ delay: 5000 });
    const passwordReq = common.replaceAll(await page.innerText(el.confirmationPage.lblPasswordReq), '\n', '');
    expect(passwordReq).toEqual(td.confirmationPage.passwordReq);
    await expect(page.locator(el.confirmationPage.lblDividerText)).toHaveText(td.confirmationPage.dividerText);
    await expect(page.locator(el.confirmationPage.btnCreateAccount)).toBeVisible();
    await expect(page.locator(el.confirmationPage.btnAppleSignin)).toBeVisible();
    await expect(page.locator(el.confirmationPage.btnGoogleSignin)).toBeVisible();
    testReport.log(this.pageName, 'Create account fields are displaying as expected in order confirmation page');
  }

  /**
   * @function : createAccount
   * @Description : Enter the password and create the account
   * @Params: None
   * @Returns: none
   */

  async createAccount(newPassword) {
    await page.fill(el.confirmationPage.txtPassword, newPassword, { delay: 500 });
    const passwordReqSuccess = common.replaceAll(await page.innerText(el.confirmationPage.lblPasswordReq), '\n', '');
    expect(passwordReqSuccess).toEqual(td.confirmationPage.passwordReqSuccess);
    await page.locator(el.confirmationPage.btnCreateAccount).click({ delay: 1000 });
    await page.waitForLoadState('load', { timeout: 90000 });
    const successMsg = common.replaceAll(await page.innerText(el.confirmationPage.lblCreateAcntSuccess), '\n', ' ');
    expect(successMsg).toEqual(env.ACNT_CONFRM_CRTACNT_SUCCESS);
    testReport.log(this.pageName, 'Account created successfully');
  }

  /**
   * @function : completeTheSignin
   * @Description : Click on success message in the confirmation page and sign in to the account
   * @Params: None
   * @Returns: none
   */

  async completeTheSignin() {
    if (env.EXEC_SITE.includes('crate')) await page.locator(el.confirmationPage.lnkLogin).click();
    else await page.goto(`${env.BASE_URL}/account/login/`);

    await page.waitForLoadState('load');

    // Verify login page is displaying
    await expect(page.locator(el.loginPage.txtEmail)).toBeVisible();
  }

  /**
   * @function : verifyTheAccountDetails
   * @Description : navigate to the account settings page and verify the email address
   * @Params: None
   * @Returns: none
   */

  async verifyTheAccountDetails(newEmail) {
    await expect(page.locator(el.accountPage.lblAccountSettingsEmail)).toHaveText(newEmail);
    testReport.log('Account Page', 'Verified email address in the MyAccount page');
  }

  /**
   * @function : clickOnAppleSigninButton
   * @Description : navigate to the apple sign in page
   * @Params: None
   * @Returns: none
   */

  async clickOnAppleSigninButton() {
    await expect(page.locator(el.confirmationPage.btnAppleSignin)).toBeVisible({ timeout: 10000 });
    await page.locator(el.confirmationPage.btnAppleSignin).click();
    await page.waitForLoadState('load', { timeout: 120000 });
    testReport.log(this.pageName, 'Click on Apple Sign in button');
  }

  /**
   * @function : verifyApplySigninPage
   * @Description : verify apple sign in page is displayed
   * @Params: None
   * @Returns: none
   */

  async verifyApplySigninPage() {
    await expect(page).toHaveURL(/appleid.apple.com/, { timeout: 120000 });
    testReport.log('Apple Sign in page', 'Apple sign in page is displayed');
  }

  /**
   * @function : clickOnGoogleSigninButton
   * @Description : navigate to google signin page
   * @Params: None
   * @Returns: none
   */

  async clickOnGoogleSigninButton() {
    await expect(page.locator(el.confirmationPage.btnGoogleSignin)).toBeVisible({ timeout: 30000 });
    await page.locator(el.confirmationPage.btnGoogleSignin).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Click on Google Sign in button');
  }

  /**
   * @function : verifyGoogleSigninPage
   * @Description : verify google sign in page is displayed
   * @Params: None
   * @Returns: none
   */

  async verifyGoogleSigninPage() {
    await expect(page).toHaveURL(/accounts.google.com/, { timeout: 30000 });
    testReport.log('Google Sign in page', 'Google sign in page is displayed');
  }

  /**
   * @function : completeSignin
   * @Description : verify completing signin from confirmation page
   * @Params: Email will be validated in the confirmation page
   * @Returns: none
   */

  async completeSignin(email) {
    await expect(page.locator(el.confirmationPage.lblLoginHeader)).toHaveText(td.confirmationPage.loginHeader);
    await expect(page.locator(el.confirmationPage.lblLoginDesc)).toHaveText(env.ACNT_SIGNIN_DESC_CONFRM_PAGE);
    await expect(page.locator(el.confirmationPage.lblEmail)).toHaveText(td.confirmationPage.emailHeader);
    await expect(page.locator(el.confirmationPage.lblUserEmail)).toHaveValue(email);
    await expect(page.locator(el.confirmationPage.lblPass)).toHaveText(td.confirmationPage.passwordLabel);
    await expect(page.locator(el.confirmationPage.btnAppleSignin)).toBeVisible();
    await expect(page.locator(el.confirmationPage.btnGoogleSignin)).toBeVisible();
    // const temp = common.replaceAll(await page.innerText(el.confirmationPage.lblAgreement1), '\n', '');
    // expect(temp).toMatch(td.confirmationPage.agreement1);
    await expect(page.locator(el.confirmationPage.lblAgreement2)).toHaveText(td.confirmationPage.agreement2);
    testReport.log(this.pageName, 'Signin to account fields are displaying as expected');
    const password = 'Password@123';
    await page.fill(el.confirmationPage.txtPassword, password);
    await page.locator(el.confirmationPage.btnSignin).click();
    testReport.log(this.pageName, 'Signin is successful');
    await page.waitForLoadState('load', { timeout: 60000 });
  }
}

module.exports = { ConfrmPageCreateAccount };
