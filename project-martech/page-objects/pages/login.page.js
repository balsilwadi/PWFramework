const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/account-elements');
const repoCommonElementsHome = require('../elements/browse-path-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class MarLogInPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : verifyLogInForm
   * @Description : To verify if Login form has all the links and fields
   * @params : None
   * @returns : None
   * */

  async verifyLogInForm() {
    await page.customWait(repoCommonElements.loginPage.lblSignInForm, 'lblSignInForm');
    await expect(page.locator(repoCommonElements.loginPage.lblSignInForm)).toContainText('Sign In');
    await expect(page.locator(repoCommonElements.loginPage.lnkResetPassword)).toContainText('Reset password');
    await expect(page.locator(repoCommonElements.loginPage.lblEmail)).toContainText('Email');
    await expect(page.locator(repoCommonElements.loginPage.txtEmail)).toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.lblPwd)).toContainText('Password');
    await expect(page.locator(repoCommonElements.loginPage.txtPwd)).toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.btnSignIn)).toHaveAttribute('value', 'Sign In');
    await expect(page.locator(repoCommonElements.loginPage.btnSignInWithApple), 'Sign in with Apple').toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.btnSignInWithGoogle), 'Sign in with Google').toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.lnkTermsOfUse), 'Terms of Use').toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.lnkPrivacyPolicy), 'Privacy Policy').toBeVisible();
    testReport.log(this.pageName, 'LogIn Form Verified');
  }

  /**
   * @function_Name : verifyCreateAccountSection
   * @Description : To verify Account creation section
   * @params : None
   * @returns : None
   * */

  async verifyCreateAccountSection() {
    await page.customWait(repoCommonElements.loginPage.txtCreateAccount, 'txtCreateAccount');
    await expect(page.locator(repoCommonElements.loginPage.txtCreateAccount)).toContainText('Create an Account');
    testReport.log(this.pageName, await page.innerText(repoCommonElements.loginPage.txtAccountList1));
    await expect(page.locator(repoCommonElements.loginPage.txtAccountList1)).toContainText('Save payment to view in-store purchases');
    await expect(page.locator(repoCommonElements.loginPage.txtAccountList2)).toContainText('Redeem Rewards');
    await expect(page.locator(repoCommonElements.loginPage.txtAccountList3)).toContainText('Speedy checkout');
    await expect(page.locator(repoCommonElements.loginPage.txtAccountList4)).toContainText('Easily track orders and view order history');
    await expect(page.locator(repoCommonElements.loginPage.txtAccountList5)).toContainText('Create a Registry');
    await expect(page.locator(repoCommonElements.loginPage.btnCreateAccountButton), 'Create Account').toBeVisible();
    await expect(page.locator(repoCommonElements.loginPage.lnkTrackOrder), 'Track/Schedule Order').toBeVisible();
    testReport.log(this.pageName, 'Create Account Section Verified');
  }

  /**
   * @function_Name : navigateToLoginPage,loginWithOkta
   * @Description : To navigate to login page and click sign in after populating email Id and password
   * @params : username, password
   * @returns : None
   * */

  async navigateToLoginPage() {
    await page.customClick(repoCommonElements.loginPage.lnkSignIn, 'lnkSignIn');
    testReport.log(this.pageName, 'Navigated to Login Page');
  }

  // populate email Id and password on login page and click sign in button
  async loginWithOkta(username, password) {
    await page.customSet(repoCommonElements.loginPage.txtEmail, username, 'txtEmail'); // fill email field
    await page.customSet(repoCommonElements.loginPage.txtPwd, password, 'txtPwd'); // fill password field
    await page.customClick(repoCommonElements.loginPage.btnSignIn, 'btnSignIn'); // click on sign in button
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    testReport.log(this.pageName, 'Login is successful');
  }

  /**
   * @function_Name : enterCredentials
   * @Description : to enter login credentials that coming from feature file to the signin form
   * @params : email -> from feature file Password -> from feature file
   * @returns : None
   * */
  async enterCredentials(email, password) {
    await page.customSet(repoCommonElements.loginPage.txtEmail, email, 'txtEmail'); // fill email field
    await page.customSet(repoCommonElements.loginPage.txtPwd, password, 'txtPwd'); // fill password field
    testReport.log(this.pageName, `Email : ${email} and Password : ${password} entered`);
  }

  /**
   * @function_Name : clickCrateLogo
   * @Description : To Click on Crate&Barrel logo
   * @params : None
   * @returns : None
   * */

  async clickCrateLogo() {
    await page.customWait(repoCommonElementsHome.homePage.txtCbLogo, 'txtCbLogo');
    await page.customClick(repoCommonElementsHome.homePage.txtCbLogo, 'txtCbLogo');
    testReport.log(this.pageName, 'Clicked on Crate&Barrel logo');
  }
}
module.exports = { MarLogInPage };
