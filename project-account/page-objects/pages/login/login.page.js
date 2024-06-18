const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const credentialsFile = require('../../data-files/login-credentials.json');
const env = require('../../../../support/env/env');
const { timeout } = require('../../../../configs/config');

const common = new CommonUtils();
const testReport = new ReportUtils();
const mr = 'Manage Registry Page';

class LogInPage extends PageObject {
  pageName = this.constructor.name;

  /**
   * @author: sreerag
   * @function_Name : verifyLoginPageDisplayed
   * @Description : Verify login page is displayed and have Sign in Header
   * @params : none
   * @returns : None
   * */
  async verifyLoginPageDisplayed() {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.loginPage.hdrSignInForm)).toHaveText('Sign In', { ignoreCase: true });
    testReport.log(this.pageName, 'Login page displayed');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyLogInForm
   * @Description : Verify login form is displayed in login page
   * @params : none
   * @returns : None
   * */
  async verifyLogInForm() {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.loginPage.hdrSignInForm)).toHaveText('Sign In', { ignoreCase: true });
    await expect(page.locator(el.loginPage.lnkResetPassword)).toContainText('Reset password');
    await expect(page.locator(el.loginPage.lblEmail)).toContainText('Email');
    await expect(page.locator(el.loginPage.txtEmail)).toBeVisible();
    await expect(page.locator(el.loginPage.lblPassword)).toContainText('Password');
    await expect(page.locator(el.loginPage.txtPassword)).toBeVisible();
    await expect(page.locator(el.loginPage.btnSignIn)).toHaveAttribute('value', 'Sign In');
    await expect(page.locator(el.loginPage.btnSignInWithApple), 'Sign in with Apple').toBeVisible();
    await expect(page.locator(el.loginPage.btnSignInWithGoogle), 'Sign in with Google').toBeVisible();
    await expect(page.locator(el.loginPage.lnkTermsOfUse), 'Terms of Use').toBeVisible();
    await expect(page.locator(el.loginPage.lnkPrivacyPolicy), 'Privacy Policy').toBeVisible();
    testReport.log(this.pageName, 'Login Form verified');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyCreateAccountSection
   * @Description : Verify Create account section with Create account button is displayed in login page
   * @params : none
   * @returns : None
   * */
  async verifyCreateAccountSection() {
    await expect(page.locator(el.loginPage.hdrCreateAccount)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.loginPage.hdrCreateAccount)).toContainText('Create an Account');
    if (env.EXEC_SITE.startsWith('cb2')) {
      if (env.EXEC_SITE.endsWith('us')) {
        await expect(page.locator(el.loginPage.msgAccountList1)).toContainText(td.loginPage.cb2SavePaymentAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList2)).toContainText(td.loginPage.cb2RedeemRewardsAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList3)).toContainText(td.loginPage.cb2SpeedyCheckoutAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList4)).toContainText(td.loginPage.cb2TrackOrdersAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList5)).toContainText(td.loginPage.cb2CreateRegistryAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList6)).toContainText(td.loginPage.cb2DesignPackageAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList7)).toContainText(td.loginPage.cb2FavoritesListAccountMsg);
      } else {
        await expect(page.locator(el.loginPage.msgAccountList1)).toContainText(td.loginPage.cb2SavePaymentAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList2)).toContainText(td.loginPage.cb2SpeedyCheckoutAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList3)).toContainText(td.loginPage.cb2TrackOrdersAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList4)).toContainText(td.loginPage.cb2FavoritesListAccountMsg);
        await expect(page.locator(el.loginPage.msgAccountList5)).toContainText(td.loginPage.cb2DesignPackageAccountMsg);
      }
    } else if (env.EXEC_SITE.endsWith('us')) {
      await expect(page.locator(el.loginPage.msgAccountList1)).toContainText(td.loginPage.savePaymentAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList2)).toContainText(td.loginPage.redeemRewardsAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList3)).toContainText(td.loginPage.speedyCheckoutAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList4)).toContainText(td.loginPage.trackOrdersAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList5)).toContainText(td.loginPage.createRegistryAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList6)).toContainText(td.loginPage.designPackageAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList7)).toContainText(td.loginPage.favoritesListAccountMsg);
    } else {
      await expect(page.locator(el.loginPage.msgAccountList1)).toContainText(td.loginPage.savePaymentAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList2)).toContainText(td.loginPage.speedyCheckoutAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList3)).toContainText(td.loginPage.trackOrdersAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList4)).toContainText(td.loginPage.designPackageAccountMsg);
      await expect(page.locator(el.loginPage.msgAccountList5)).toContainText(td.loginPage.favoritesListAccountMsg);
    }
    await expect(page.locator(el.loginPage.btnCreateAccount), 'Create Account').toBeVisible();
    await expect(page.locator(el.loginPage.lnkTrackOrder), 'Track/Schedule Order').toBeVisible();
    testReport.log(this.pageName, 'Create Account section verified');
  }

  /**
   * @author: sreerag
   * @function_Name : enterCredentials
   * @Description : to enter login credentials that coming from feature file to the signin form
   * @params : email -> from feature file Password -> from feature file
   * @returns : None
   * */
  async enterCredentials(email, password) {
    let isCartPage = false;
    try {
      await expect(page.locator(el.cartPage.mdlChkFlyout)).toBeVisible({ timeout: 30000 });
      isCartPage = true;
      await expect(page.locator(el.loginPage.txtEmail)).toBeVisible({ timeout: 30000 });
    } catch (err) {
      testReport.log(this.pageName, 'Not a cart page');
    }
    if (!isCartPage) await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await page.fill(el.loginPage.txtEmail, email, { delay: 100 });
    await page.fill(el.loginPage.txtPassword, password, { delay: 100 });
    testReport.log(this.pageName, `Email : ${email} and Password : 'NOT REAL DATA' entered`);
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnSignInButton
   * @Description : click on sign in button in login page and check account page is dispayed
   * @params : none
   * @returns : None
   * */
  async clickOnSignInButton() {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await page.locator(el.loginPage.btnSignIn).click();
    await page.waitForLoadState('load', { timeout: 120000 });
    testReport.log(this.pageName, 'clicked on SignIn button');
    expect(page.url({ timeout: 90000 })).toContain(env.BASE_URL);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(4000);
    if (env.EXEC_SITE.includes('crate')) {
      // await expect(page.locator(el.loginPage.lblAcntGreeting)).toBeAttached({ timeout: 90000 });
      await expect(page.locator(el.homePage.lblAcntGreeting)).toContainText('Hi,', { timeout: 90000 });
    } else {
      // await expect(page.locator(el.loginPage.lblAcntGreetinCB2)).toBeAttached({ timeout: 90000 });
      await expect(page.locator(el.homePage.lblAcntGreetinCB2)).toContainText('Hi,', { timeout: 90000 });
    }
    testReport.log(this.pageName, 'Login is successful');
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnResetPasswordLink
   * @Description : click on reset password link in login page
   * @params : none
   * @returns : None
   * */
  async clickOnResetPasswordLink() {
    await expect(page.locator(el.loginPage.lnkResetPassword)).toContainText('Reset password', { timeout: 60000 });
    // await page.locator(el.loginPage.lnkResetPassword).click();
    await page.evaluate(() => {
      document.querySelector('#forgot-password').click();
    });
    testReport.log(this.pageName, 'Clicked on reset password link');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyResetPasswordPopup
   * @Description : Verify reset password popup is displayed with the contents
   * @params : none
   * @returns : None
   * */
  async verifyResetPasswordPopup() {
    await expect(page.locator(el.loginPage.hdrResetPasswordPopup)).toHaveText('Reset Password', { ignoreCase: true });
    await expect(page.locator(el.loginPage.msgResetPasswordPopup)).toHaveText(td.loginPage.resetPasswordPopup_MSG);
    await expect(page.locator(el.loginPage.lblEmailResetPasswordPopup)).toHaveText('Email required');
    await expect(page.locator(el.loginPage.txtEmailResetPasswordPopup)).toBeVisible();
    await expect(page.locator(el.loginPage.btnCancelResetPasswordPopup), 'Cancel').toBeVisible();
    await expect(page.locator(el.loginPage.btnSubmitResetPasswordPopup), 'Submit').toBeVisible();
    await expect(page.locator(el.loginPage.btnCloseResetPasswordPopup)).toBeVisible();
    testReport.log(this.pageName, 'Verified Reset Password Popup');
  }

  /**
   * @author: sreerag
   * @function_Name : enterEmailInResetPasswordPopup
   * @Description : Enter email coming from the feature file to the email text box in reset password popup
   * @params : email from feature file
   * @returns : None
   * */
  async enterEmailInResetPasswordPopup(email) {
    await page.fill(el.loginPage.txtEmailResetPasswordPopup, email, { delay: 100 });
    testReport.log(this.pageName, 'Entered email in Reset Password Popup');
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnResetPasswordPopupSubmitButton
   * @Description :  clicks on submit button in reset password popup
   * @params : none
   * @returns : None
   * */
  async clickOnResetPasswordPopupSubmitButton() {
    await page.locator(el.loginPage.btnSubmitResetPasswordPopup).click();
    testReport.log(this.pageName, 'Clicked on reset password submit button');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyResetPasswordPopupSuccessMsg
   * @Description :  verify success message is displayed after resetting password in the reset password popup
   * @params : none
   * @returns : None
   * */
  async verifyResetPasswordPopupSuccessMsg() {
    await expect(page.locator(el.loginPage.msgSuccessResetPasswordPopup)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.loginPage.hdrResetPasswordPopup)).toHaveText('Reset Password');
    await expect(page.locator(el.loginPage.msgSuccessResetPasswordPopup)).toHaveText(td.loginPage.resetPasswordSuccess_MSG);
    await expect(page.locator(el.loginPage.btnCloseResetPasswordPopup)).toBeVisible();
    testReport.log(this.pageName, 'verified reset password success message');
  }

  /**
   * @author: sreerag
   * @function_Name : closeResetPasswordPopup
   * @Description :  clicks on close button in reset password popup link
   * @params : none
   * @returns : None
   * */
  async closeResetPasswordPopup() {
    await page.locator(el.loginPage.btnCloseResetPasswordPopup).click();
    testReport.log(this.pageName, 'Clicked on reset password popup close button');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyResetPasswordPopupIsClosed
   * @Description :  verify reset password popup is closed in login page
   * @params : none
   * @returns : None
   * */
  async verifyResetPasswordPopupIsClosed() {
    await expect(page.locator(el.loginPage.hdrResetPasswordPopup)).toBeHidden();
    testReport.log(this.pageName, 'Reset Password Popup Closed');
  }

  async verifyManageRegistryPage() {
    await page.waitForLoadState();
    await expect(page.locator(el.manageRegistry.lblHeader)).toBeVisible();
    testReport.log(mr, 'Manage Registry page is displayed');
    await expect(page.locator(el.manageRegistry.lblHeader)).toHaveText(td.manageRegistry.header);
    testReport.log(mr, 'Manage Registry page header is matched');
    // expect(await page.locator(el.MANAGEMYREGISTRY.REGISTRY_CTN)).not.toHaveCount(0);
    if ((await page.locator(el.manageRegistry.cntRegistry).count()) > 0) testReport.log(mr, 'Registry list displayed');
  }

  /**
   * @author: sreerag
   * @function_Name : enterUpdatedCredential
   * @Description :  enter updated login credentials in login form
   * @params : none
   * @returns : None
   * */
  async enterUpdatedCredential() {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await page.fill(el.loginPage.txtEmail, td.accountSettingsPage.updatedEmail, { delay: 100 });
    await page.fill(el.loginPage.txtPassword, td.accountSettingsPage.updatedPassword, { delay: 100 });
    testReport.log(this.pageName, `Email : ${td.accountSettingsPage.updatedEmail} and Password : ${td.accountSettingsPage.updatedPassword} entered`);
  }

  /**
   * @author: sreerag
   * @function_Name : enterCredential
   * @Description :  fetch credentials from loginCredentials.json file based on scenario from feature file and enter those credentials in login form
   * @params : Scenario
   * @returns : None
   * */
  async enterCredential(scenario) {
    if (scenario === 'New') {
      await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
      await page.fill(el.loginPage.txtEmail, common.generateNewEmail());
      await page.fill(el.loginPage.txtPassword, td.createnewaccount.password);
      testReport.log(this.pageName, 'Email and password of new account entered');
    } else {
      const filter = credentialsFile.filter((element) => element.Type === scenario);
      if (filter.length === 1) {
        await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout });
        await page.fill(el.loginPage.txtEmail, filter[0].Email, { delay: 100 });
        await page.fill(el.loginPage.txtPassword, filter[0].Password, { delay: 100 });
        testReport.log(this.pageName, 'Email and password entered');
      } else if (filter.lenght === 0) {
        testReport.log(this.pageName, 'Invalid Scenario');
      } else {
        testReport.log(this.pageName, 'Duplicate scenario exists in Login Crededntials file');
      }
    }
  }

  /**
   * @author: sreerag
   * @function_Name : validateErrorMessage
   * @Description :  validate error message in loginpage when customer enters invalid login credentials
   * @params : none
   * @returns : None
   * */
  async validateErrorMessage() {
    try {
      await expect(page.locator(el.loginPage.msgLoginError)).toHaveText(td.loginPage.loginErrorMsg);
      testReport.log(this.pageName, 'Invalid Login credentials Entered');
    } catch (error) {
      await expect(page.locator(el.loginPage.msgLoginError)).toHaveText(td.loginPage.loginErrorExceeded);
      testReport.log(this.pageName, 'Invalid Login credentials Entered');
    }
  }

  /**
   * @author: sreerag
   * @function_Name : navigateToLogInPage
   * @Description :  navigate to login page using url
   * @params : none
   * @returns : None
   * */
  async navigateToLoginPage() {
    const currentUrl = page.url();
    let homeUrl = new URL(currentUrl);
    homeUrl = homeUrl.hostname;
    await page.goto(`https://${homeUrl}/account/login`);
  }

  /**
   * @author: sreerag
   * @function_Name : openSignInPopUp
   * @Description :  to open sign in popup from header by clicking on account icon in header
   * @params : none
   * @returns : None
   * */
  async openSignInPopUp() {
    if (common.verifyIsMobile()) {
      await page.locator(el.homePage.btnAccountIconMobile).click();
      await page.locator(el.homePage.btnAccountMobile).click();
    } else {
      await page.locator(el.homePage.btnAccountIconMobile).click();
    }
  }

  async navigateToCreateAccountPage() {
    await expect(page.locator(el.loginPage.btnCreateAccount)).toBeVisible({ timeout: 30000 });
    await page.click(el.loginPage.btnCreateAccount);
    testReport.log(this.pageName, 'Clicked on Sign in link');
  }

  /**
   * @author: viktoriia
   * @function_Name : signOutFromHeader
   * @Description :  sign Out From Header
   * @params : none
   * @returns : None
   * */
  async signOutFromHeader() {
    if (common.verifyIsMobile()) {
      await page.locator(el.homePage.btnAccountIcon).click();
      await page.locator(el.homePage.lnkSignOut).click();
    } else {
      await page.hover(el.homePage.lnkAcntHeader);
      // await expect(page.locator(el.homePage.lnkSignOut)).toBeVisible({ timeout: 30000 });
      await page.locator(el.homePage.lnkSignOut).click();
      if (env.EXEC_SITE.startsWith('crate')) await expect(page.locator('//a[text()="Orders"]')).toBeVisible({ timeout: 30000 });
      else await expect(page.locator('p.header-account-greeting')).toBeHidden({ timeout: 30000 });
    }
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: sreerag
   * @function_Name : clickSignInButto
   * @Description :  Click on sign in button in login page/popup
   * @params : none
   * @returns : None
   * */
  async clickSignInButton() {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await page.locator(el.loginPage.btnSignIn).click();
    testReport.log(this.pageName, 'clicked on SignIn button');
  }

  /**
   * @author: krishna
   * @function_Name : navigateToHomePageFromCartPage
   * @Description :  Click on sign in button in login page/popup
   * @params : none
   * @returns : None
   * */
  async navigateToHomePageFromCartPage() {
    await page.locator(el.chkOutPage.lnkChkPage).click();
    await page.waitForLoadState('load', { timeout: 120000 });
    testReport.log(this.pageName, 'Navigated to Home Page');
  }

  /**
   * @author: krishna
   * @function_Name : verifySSOFromSigninPopup
   * @Description :  launch all the brands and verify sso is working as expected
   * @params : none
   * @returns : None
   * */
  async verifySSOFromSigninPopup() {
    const arraybrands = ['crateus', 'cratecan', 'cb2us', 'cb2can'];

    // launch Crate US
    if (!(env.EXEC_SITE === arraybrands[0])) {
      await global.context.addCookies([
        {
          name: 'EmailOptInAlreadyViewedCount',
          value: '3',
          url: 'https://qa-www.crateandbarrel.com/',
          secure: true
        }
      ]);

      const newPage1 = await global.context.newPage();
      await newPage1.goto('https://qa-www.crateandbarrel.com/');
      testReport.log('New Tab', 'Launching Crate US');
      await newPage1.waitForLoadState('load');

      // open signin popup
      if (common.verifyIsMobile()) {
        await newPage1.locator(el.homePage.btnAccountIconMobile).click();
        await newPage1.locator(el.homePage.btnAccountMobile).click();
      } else {
        await newPage1.locator(el.homePage.btnAccountIconMobile).click();
      }
      testReport.log('Signin Popup', 'Clicked on Signin popup');
      await newPage1.waitForLoadState('load');

      // verify sso is completed and account page is displayed
      await expect(await newPage1).toHaveURL(/account/, { timeout: 90000 });

      // verify the email address
      if (common.verifyIsMobile()) await newPage1.locator(el.accountPage.lnkAccountSettingsMobile).click();
      else await newPage1.locator(el.accountPage.lnkAccountSettings).click();
      await newPage1.waitForLoadState('load');
      await expect(newPage1.locator(el.accountPage.lblAccountSettingsEmail)).toContainText('pwssotest@cb.com');
      testReport.log('Account Page', `SSO PASSED: ${arraybrands[0]}`);
    }

    // launch Crate CAN
    if (!(env.EXEC_SITE === arraybrands[1])) {
      await global.context.addCookies([
        {
          name: 'EmailOptInAlreadyViewedCount',
          value: '3',
          url: 'https://qa-www.crateandbarrel.ca/',
          secure: true
        }
      ]);

      await global.context.addCookies([
        {
          name: 'HideGeoLocationPopup',
          value: '1',
          url: 'https://qa-www.crateandbarrel.ca',
          secure: true
        }
      ]);

      const newPage2 = await global.context.newPage();
      await newPage2.goto('https://qa-www.crateandbarrel.ca');
      testReport.log('New Tab', 'Launching Crate CAN');
      await newPage2.waitForLoadState('load', { timeout: 90000 });

      // open signin popup
      if (common.verifyIsMobile()) {
        await newPage2.locator(el.homePage.btnAccountIconMobile).click();
        await newPage2.locator(el.homePage.btnAccountMobile).click();
      } else {
        await newPage2.locator(el.homePage.btnAccountIconMobile).click();
      }

      testReport.log('Signin Popup', 'Clicked on Signin popup');
      await newPage2.waitForLoadState('load');

      // verify sso is completed and account page is displayed
      await expect(await newPage2).toHaveURL(/account/, { timeout: 90000 });

      // await expect(newPage2).toHaveURL(/account/);

      // verify the email address
      if (common.verifyIsMobile()) await newPage2.locator(el.accountPage.lnkAccountSettingsMobile).click();
      else await newPage2.locator(el.accountPage.lnkAccountSettings).click();
      await newPage2.waitForLoadState('load');
      await expect(newPage2.locator(el.accountPage.lblAccountSettingsEmail)).toContainText('pwssotest@cb.com');
      testReport.log('Account Page', `SSO PASSED: ${arraybrands[1]}`);
    }

    // launch CB2 US
    if (!(env.EXEC_SITE === arraybrands[2])) {
      await global.context.addCookies([
        {
          name: 'EmailOptInAlreadyViewedCount',
          value: '3',
          url: 'https://qa-www.cb2.com/',
          secure: true
        }
      ]);

      const newPage3 = await global.context.newPage();
      await newPage3.goto('https://qa-www.cb2.com/');
      testReport.log('New Tab', 'Launching CB2 US');
      await newPage3.waitForLoadState('load');

      // open signin popup
      if (common.verifyIsMobile()) {
        await newPage3.locator(el.homePage.btnAccountIconMobile).click();
        await newPage3.locator(el.homePage.btnAccountMobile).click();
      } else {
        await newPage3.locator(el.homePage.btnAccountIconMobile).click();
      }
      testReport.log('Signin Popup', 'Clicked on Signin popup');
      await newPage3.waitForLoadState('load');

      // verify sso is completed and account page is displayed
      await expect(await newPage3).toHaveURL(/account/, { timeout: 90000 });

      // verify the email address
      if (common.verifyIsMobile()) await newPage3.locator(el.accountPage.lnkAccountSettingsMobile).click();
      else await newPage3.locator(el.accountPage.lnkAccountSettings).click();
      await newPage3.waitForLoadState('load');
      await expect(newPage3.locator(el.accountPage.lblAccountSettingsEmail)).toContainText('pwssotest@cb.com');
      testReport.log('Account Page', `SSO PASSED: ${arraybrands[2]}`);
    }

    // launch CB2 CAN
    if (!(env.EXEC_SITE === arraybrands[3])) {
      await global.context.addCookies([
        {
          name: 'EmailOptInAlreadyViewedCount',
          value: '3',
          url: 'https://qa-www.cb2.ca/',
          secure: true
        }
      ]);

      await global.context.addCookies([
        {
          name: 'HideGeoLocationPopup',
          value: '1',
          url: 'https://qa-www.cb2.ca',
          secure: true
        }
      ]);

      const newPage4 = await global.context.newPage();
      await newPage4.goto('https://qa-www.cb2.ca/');
      testReport.log('New Tab', 'Launching CB2 CAN');
      await newPage4.waitForLoadState('load');

      // open signin popup
      if (common.verifyIsMobile()) {
        await newPage4.locator(el.homePage.btnAccountIconMobile).click();
        await newPage4.locator(el.homePage.btnAccountMobile).click();
      } else {
        await newPage4.locator(el.homePage.btnAccountIconMobile).click();
      }
      testReport.log('Signin Popup', 'Clicked on Signin popup');
      await newPage4.waitForLoadState('load');

      // verify sso is completed and account page is displayed
      await expect(await newPage4).toHaveURL(/account/, { timeout: 90000 });

      // verify the email address
      if (common.verifyIsMobile()) await newPage4.locator(el.accountPage.lnkAccountSettingsMobile).click();
      else await newPage4.locator(el.accountPage.lnkAccountSettings).click();
      await newPage4.waitForLoadState('load');
      await expect(newPage4.locator(el.accountPage.lblAccountSettingsEmail)).toContainText('pwssotest@cb.com');
      testReport.log('Account Page', `SSO PASSED: ${arraybrands[3]}`);
    }
  }

  /**
   * @author: krishna
   * @function_Name : reloadThePage
   * @Description :  Reload the page and wait until the page completed loading
   * @params : none
   * @returns : None
   * */
  async reloadThePage() {
    await page.reload();
    await page.waitForLoadState('load');
  }

  /**
   * @author: krisna
   * @function_Name : verifyAccountPage
   * @Description : verify whether the customer is landed on the account page
   * @params : none
   * @returns : None
   * */
  async verifyAccountPage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/account/);
    testReport.log(this.pageName, 'Customer is on Account page');
  }
}

module.exports = { LogInPage };
