const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const testReport = new ReportUtils();

class AcntCartPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'AcntCartPage';
  }

  /**
   * @author: sreerag
   * @function_Name : verifyCartLoginPopUpIsDisplayed
   * @Description : checks login popup in cart is displayed
   * @params : none
   * @returns : None
   * */
  async verifyCartLoginPopUpIsDisplayed() {
    await expect(page.locator(el.cartPage.popupCartLogIn)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.cartPage.hdrPopUpSignInForm)).toHaveText('Sign In', { ignoreCase: true });
    testReport.log(this.pageName, 'Login Popup displayed');
  }

  /**
   * @author: sreerag
   * @function_Name : validateCartLoginPopup
   * @Description : verify contents in cart login popup
   * @params : none
   * @returns : None
   * */
  async validateCartLoginPopup() {
    await expect(page.locator(el.cartPage.lnkResetPassword)).toContainText('Reset password');
    await expect(page.locator(el.cartPage.lblEmail)).toContainText('Email');
    await expect(page.locator(el.cartPage.txtEmail)).toBeVisible();
    await expect(page.locator(el.loginPage.lblPassword)).toContainText('Password');
    await expect(page.locator(el.cartPage.txtPassword)).toBeVisible();
    await expect(page.locator(el.cartPage.btnSignIn)).toHaveAttribute('value', 'Sign In');
    await expect(page.locator(el.cartPage.btnSignInWithApple), 'Sign in with Apple').toBeVisible();
    await expect(page.locator(el.cartPage.btnSignInWithGoogle), 'Sign in with Google').toBeVisible();
    await expect(page.locator(el.cartPage.lnkTermsOfUse), 'Terms of Use').toBeVisible();
    await expect(page.locator(el.cartPage.lnkPrivacyPolicy), 'Privacy Policy').toBeVisible();
    await expect(page.locator(el.cartPage.msgAgreement)).toBeVisible();
    testReport.log(this.pageName, 'Cart login popup form verified');
  }

  /**
   * @author: sreerag
   * @function_Name : launchCartLoginPopup
   * @Description : launch login popup from cart link/button
   * @params : none
   * @returns : None
   * */
  async launchCartLoginPopup() {
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    if (common.verifyIsMobile() === false) {
      await expect(page.locator(el.cartPage.msgCartSignIn)).toHaveText(env.CART_SIGNIN_MSG);
      await page.locator(el.cartPage.lnkCartSignIn).click();
    } else {
      await page.locator(el.cartPage.btnCartSignInMobile).click();
    }
    testReport.log(this.pageName, 'Clicked on Sign in link');
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnSignInButton
   * @Description : click on sign in button in cart login popup
   * @params : none
   * @returns : None
   * */
  async clickOnSignInButton() {
    let isCartPage = false;
    if (await page.locator(el.cartPage.mdlChkFlyout).isVisible()) isCartPage = true;
    if (!isCartPage) await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await page.locator(el.loginPage.btnSignIn).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    testReport.log(this.pageName, 'clicked on SignIn button');
    expect(page.url({ timeout: 60000 })).toContain(env.BASE_URL);
  }

  /**
   * @author: krishna
   * @function_Name : enterCredentialsInFlyoutModal
   * @Description : enter credentials in checkout flyout modal in cart page
   * @params : none
   * @returns : None
   * */
  async enterCredentialsInFlyoutModal(email, password) {
    await expect(page.locator(el.loginPage.txtEmail)).toBeVisible({ timeout: 30000 });
    await page.fill(el.loginPage.txtEmail, email, { delay: 100 });
    await page.fill(el.loginPage.txtPassword, password, { delay: 100 });
    testReport.log(this.pageName, `Email : ${email} and Password : 'NOT REAL DATA' entered`);
  }

  /**
   * @author: Krishna
   * @function_Name : verifySigninIsSuccessful
   * @Description : verify signin is sucessful
   * @params : none
   * @returns : None
   * */
  async verifySigninIsSuccessful() {
    await page.waitForLoadState();
    if (common.verifyIsMobile()) await page.click(el.homePage.svgAccountIcon);
    else await page.hover(el.homePage.svgAccountIcon);
    await expect(page.locator(el.homePage.lnkMyAccount)).toBeVisible({ timeout: 30000 });
    if (common.verifyIsMobile()) await page.click(el.homePage.btnFlyoutCloseMobile);
    testReport.log(this.pageName, 'Login is successful');
  }

  /**
   * @author: krishna
   * @function_Name : verifyCartPage
   * @Description : verify customer is still remains in the cart page
   * @params : none
   * @returns : None
   * */
  async verifyCartPage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/cart/);
    testReport.log(this.pageName, 'Customer still remains in the cart page as expected');
  }
}

module.exports = new AcntCartPage();
