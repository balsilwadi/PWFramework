const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
const env = require('../../../../support/env/env');

class CreateAccountPage extends PageObject {
  pageName = this.constructor.name;

  /**
   * @function : CB_ClickonCreateNewAccount
   * @Description : Click on create new button in the sign in page
   * @Params: None
   * @Returns: none
   */

  async clickonCreateNewAccount() {
    // click on create account button
    await expect(page.locator(el.loginPage.btnCreateAccount)).toBeVisible({ timeout: 30000 });
    await page.click(el.loginPage.btnCreateAccount);
    testReport.log(this.pageName, 'Clicked on Create New Account');
  }

  /**
   * @function : CB_VerifyandCompletetheCreateAccountForm
   * @Description : Verify the create account page fields, adding the values on input fields and click on Create Account. Update the newly created account in json file
   * @Params: None
   * @Returns: none
   */

  async verifyandCompletetheCreateAccountForm() {
    // enter the details to create a new account
    await page.waitForLoadState('load');
    await page.fill(el.createAccountPage.txtFirstName, td.createnewaccount.fName);
    await page.fill(el.createAccountPage.txtLastName, td.createnewaccount.lName);
    await page.fill(el.createAccountPage.txtPhone, td.createnewaccount.phone);
  }

  async enterNewEmailandPwd(newEmail) {
    await page.fill(el.createAccountPage.txtEmail, newEmail);
    await page.fill(el.createAccountPage.txtPassword, td.createnewaccount.password);
    testReport.log(this.pageName, 'Entered values on create account field');
    // Click on create new account button
    await page.click(el.createAccountPage.btnCreateAccount);
    testReport.log(this.pageName, 'Clicked on Create Account');
  }
  /**
   * @function : CB_ValidateMyAccountPage
   * @Description : validate whether the email address on the account page is matching as expected
   * @Params: None
   * @Returns: none
   */

  async validateAccountPage(newEmail, saveAccount = false) {
    // Verify whether user is logged in successfully
    await page.waitForLoadState('load', { timeout: 90000 });
    const strSalutation = (await page.innerText(el.accountPage.lblUsername)).toLowerCase();
    expect(strSalutation).toContain(`Hi, `.toLowerCase());
    if (saveAccount) common.addNewAccountToJSON(newEmail, td.createnewaccount.password, 'no', env.EXEC_ENV);
    testReport.log(this.pageName, 'Verified user name in the MyAccount page');
  }

  async validateEmail(newEmail) {
    await expect(page.locator(el.accountPage.lblAccountSettingsEmail)).toHaveText(newEmail);
    testReport.log(this.pageName, 'Verified email address in the MyAccount page');
  }

  /**
   * @function : CB_ValidateCustomerNameinTopBanner
   * @Description : validate the customer name in the top banner
   * @Params: None
   * @Returns: none
   */

  async validateCustomerNameinTopBanner() {
    // Verify whether user is logged in successfully
    if (env.EXEC_SITE.includes('cb2')) {
      if (common.verifyIsMobile()) {
        await page.locator(el.homePage.btnAccountIconMobile).click();
        await page.click(el.homePage.btnFlyoutCloseMobile);
      } else await page.hover(el.homePage.btnAccountIcon);
      await expect(page.locator(el.homePage.lblHeaderLoginNameCB2)).toHaveText(`Hi, ${td.createnewaccount.fName}`, { ignoreCase: true });
    } else {
      await expect(page.locator(el.homePage.lblAcntName)).toHaveText(`Hi, ${td.createnewaccount.fName}`, { ignoreCase: true });
    }
    testReport.log(this.pageName, 'Verified user name in the top banner');
  }

  /**
   * @function : verifySigninPageAfterLogout
   * @Description : Verify sign in page is displaying after logout
   * @Params: None
   * @Returns: none
   */

  async verifySigninPageAfterLogout() {
    await page.waitForLoadState('load');
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.loginPage.hdrSignInForm)).toHaveText(td.loginPage.login_header, 'ignoreCase:true');
    testReport.log(this.pageName, 'Signin page displayed after the logout');
  }

  /**
   * @function : verifyAddNewPayment
   * @Description : Validate the fields on add new payment screen
   * @Params: None
   * @Returns: none
   */
  async verifyAddNewPayment() {
    const strPaymentButton = page.locator(el.accountPage.lnkAddNewPayment);
    // strPaymentButton = strPaymentButton.replace('\n', '');
    await expect(strPaymentButton).toHaveText(td.myaccountpage_payment.addnewpayment, { ignoreCase: true });
    testReport.log(this.pageName, 'Verified the Add new payment button in the Payment page');
  }

  /**
   * @function : verifyPaymentmodal
   * @Description : Validate the fields on add new cc modal
   * @Params: None
   * @Returns: none
   */

  async verifyPaymentmodal() {
    // verify the payment modal appears
    await expect(page.locator(el.addPayment.mdlAddPayment)).toBeAttached({ timeout: 30000 });
    // await page.waitForSelector(el.addPayment.mdlAddPayment, { state: 'attached', timeout: 60000 });
    await expect(page.locator(el.addPayment.mdlAddPayment)).toBeVisible();
    // verify the content on the modal
    await expect(page.locator(el.addPayment.lblAddPaymentHeader)).toHaveText(td.myaccountpage_payment.addnewpayment_header);
    await expect(page.locator(el.addPayment.lblAddPaymentCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_ccnum);
    await expect(page.locator(el.addPayment.lblAddPaymentExpDate)).toHaveText(td.myaccountpage_payment.addnewpayment_expiry);
    await expect(page.locator(el.addPayment.lblAddPaymentSecCode)).toHaveText(td.myaccountpage_payment.addnewpayment_seccode);
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toHaveText(td.myaccountpage_payment.addnewpayment_primary);
    await expect(page.locator(el.addPayment.btnAddPaymentCancel)).toContainText(td.myaccountpage_payment.addnewpayment_cancel, { ignoreCase: true });
    await expect(page.locator(el.addPayment.btnAddPayment)).toContainText(td.myaccountpage_payment.addnewpayment_submit, { ignoreCase: true });
    await expect(page.locator(el.addPayment.chkAddPaymentPrimary)).toBeVisible();
    testReport.log(this.pageName, 'Verified the content on payment modal');
  }

  /**
   * @function : verifyAddingVisaCC
   * @Description : Verify the fields on adding payment modal and add a visa cc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingVisaCC() {
    // click on Add New payment link
    await page.evaluate(() => {
      document.querySelector('button[class*="add-card-btn"]').click();
    });
    await this.verifyPaymentmodal();
    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.visa);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.ccExpiry);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.ccCvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'Visa CC is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible();
    await expect(page.locator(el.addPayment.imgAddPaymentVisa)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentVisa)).toBeVisible();

    await expect(page.locator(el.addPayment.imgAddPaymentVisa)).toHaveText(td.myaccountpage_payment.addnewpayment_visa);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_visaccnum);
    const strExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // strExpiryDate = strExpiryDate.replace('\n', '');
    await expect(strExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_exp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'Visa CC is set to primary');
  }

  /**
   * @function : verifyAddingMasterCC
   * @Description : Verify the fields on adding payment modal and add a master cc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingMasterCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);
    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.master);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.ccExpiry);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.ccCvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'Master card is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible();
    await expect(page.locator(el.addPayment.imgAddPaymentMaster)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentMaster)).toBeVisible();
    await expect(page.locator(el.addPayment.imgAddPaymentMaster)).toHaveText(td.myaccountpage_payment.addnewpayment_master);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_masterccnum);
    const strExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // strExpiryDate = strExpiryDate.replace('\n', '');
    await expect(strExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_exp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'Master card is set to primary');
  }

  /**
   * @function : verifyAddingDisscoverCC
   * @Description : Verify the fields on adding payment modal and add a discover cc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingDiscoverCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);

    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.discover);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.ccExpiry);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.ccCvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'Discover is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentDiscover)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentDiscover)).toHaveText(td.myaccountpage_payment.addnewpayment_discover);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_discoverccnum);
    const strExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // strExpiryDate = strExpiryDate.replace('\n', '');
    await expect(strExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_exp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'Discover card is set to primary');
  }

  /**
   * @function : verifyAddingAmexCC
   * @Description : Verify the fields on adding payment modal and add an amex cc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingAmexCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);

    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.amex);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.ccExpiry);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.amexcvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'Amex card is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentAmex)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(el.addPayment.imgAddPaymentAmex)).toHaveText(td.myaccountpage_payment.addnewpayment_amex);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_amexccnum);
    const strExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // strExpiryDate = strExpiryDate.replace('\n', '');
    await expect(strExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_exp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'Amex card is set to primary');
  }

  /**
   * @function : verifyAddingPLCC
   * @Description : Verify the fields on adding payment modal and add a plcc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingPLCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);

    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.plcc);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.cbccexp);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.cbcccvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'PLCC is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentPLCC)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentPLCC)).toHaveText(td.myaccountpage_payment.addnewpayment_plcc);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_plccnum);
    const StrExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // StrExpiryDate = StrExpiryDate.replace('\n', '');
    await expect(StrExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_cbccexp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'PLCC is set to primary');
  }

  /**
   * @function : verifyAddingCBCC
   * @Description : Verify the fields on adding payment modal and add a cbcc, set it as primary
   * @Params: None
   * @Returns: none
   */

  async verifyAddingCBCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);

    // Enter the content on the modal
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.cbcc);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.cbccexp);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.cbcccvv);
    // make it primary
    await page.click(el.addPayment.chkAddPaymentPrimary);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'CBCC is added successfully');
    // verify whether the card is added as primary
    await expect(page.locator(el.addPayment.lblAddPaymentPrimary)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.addPayment.imgAddPaymentCBCC)).toBeVisible({ timeout: 12000 });
    await expect(page.locator(el.addPayment.imgAddPaymentCBCC)).toHaveText(td.myaccountpage_payment.addnewpayment_cbcc);
    await expect(page.locator(el.addPayment.lblAddedCCNum)).toHaveText(td.myaccountpage_payment.addnewpayment_cbccnum);
    const StrExpiryDate = page.locator(el.addPayment.lblAddedExp);
    // StrExpiryDate = StrExpiryDate.replace('\n', '');
    await expect(StrExpiryDate).toHaveText(td.myaccountpage_payment.addnewpayment_cbccexp);
    await expect(page.locator(el.addPayment.lblAddedPaymentDefault)).toHaveText(td.myaccountpage_payment.addnewpayment_default);
    await expect(page.locator(el.addPayment.svgAddedPaymentDel)).toBeVisible();
    await expect(page.locator(el.addPayment.svgAddPaymentDefault)).toBeVisible();
    testReport.log(this.pageName, 'CBCC is set to primary');
  }

  /**
   * @function : loginToaNewAccount
   * @Description : Verify logging into an account which is already not used for adding billing / shipping address
   * @Params: None
   * @Returns: none
   */

  async loginToaNewAccount(newEmail) {
    await this.clickonCreateNewAccount();
    await page.waitForLoadState('load');
    await this.verifyandCompletetheCreateAccountForm();
    await this.enterNewEmailandPwd(newEmail);
    await this.validateAccountPage(newEmail, false);
  }

  /**
   * @function : loginToExistingAccount
   * @Description : login with the eligible account
   * @Params: None
   * @Returns: none
   */
  async loginToExistingAccount(userCredential) {
    const arrayLogin = userCredential.split('|');
    await page.fill(el.loginPage.txtEmail, arrayLogin[0].trim(), { delay: 100 });
    await page.fill(el.loginPage.txtPassword, arrayLogin[1].trim(), { delay: 100 });
  }
  /**
   * @function : deleteCreditCard
   * @Description : Verify deleting the primary credit card from the account page
   * @Params: None
   * @Returns: none
   */

  async deleteCreditCard() {
    // verify if the primary cc exists
    const intCardsCount = await page.locator(el.addPayment.btnDeleteCC).count();
    for (let i = 1; i <= intCardsCount; i++) {
      // eslint-disable-next-line no-await-in-loop
      await page.click(`${el.addPayment.btnDeleteCC}[1]`, { delay: 1500 });
      // eslint-disable-next-line no-await-in-loop
      if (common.verifyIsMobile()) await page.click(el.addPayment.btnCCDeleteConfirmMobile, { delay: 1500 });
      // eslint-disable-next-line no-await-in-loop
      else await page.click(el.addPayment.btnCCDeleteConfirm, { delay: 1500 });
      testReport.log(`Deleted CC# ${i}`);
    }
    // await page.waitForTimeout(3000);
    await expect(page.locator(el.addPayment.btnDeleteCC)).toBeHidden();
    testReport.log('Payments Page', "Deleted all CC's successfully");
  }

  /**
   * @function : addMultipleCBCC
   * @Description : Verify adding multiple CBCC
   * @Params: None
   * @Returns: none
   */

  async addMultipleCBCC() {
    // click on Add New payment link
    await page.click(el.addPayment.btnAddNewCard);

    // Add the first CBCC
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.cbcc2);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.cbccexp2);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.cbcccvv2);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    testReport.log(this.pageName, 'First CBCC is added successfully');
    // verify whether the card is added
    await expect(page.locator(el.addPayment.btnDeleteCC)).toBeVisible({ timeout: 30000 });

    // Add the second CBCC
    await page.click(el.addPayment.btnAddNewCard);
    await page.fill(el.addPayment.txtAddPaymentCCNum, td.billingInfo.cbcc3);
    await page.fill(el.addPayment.txtAddPaymentExpDate, td.billingInfo.cbccexp3);
    await page.fill(el.addPayment.txtAddPaymentSecCode, td.billingInfo.cbcccvv3);

    if (common.verifyIsMobile()) await page.click(el.addPayment.btnAddPaymentMobile);
    else await page.click(el.addPayment.btnAddPayment);
    await expect(page.locator(el.addPayment.btnDeleteCC)).toHaveCount(2, { timeout: 30000 });
    testReport.log(this.pageName, 'Second CBCC is added successfully');
  }

  /**
   * @function : deletePaymentCards
   * @Description : Verify deleting cards if exists
   * @Params: None
   * @Returns: none
   */

  async deletePaymentCards() {
    await expect(page.locator(el.addPayment.btnAddNewCard)).toBeVisible({ timeout: 30000 });
    try {
      const intCardsCount = await page.locator(el.addPayment.btnDeleteCC).count();
      if (intCardsCount > 0) await this.deleteCreditCard();
    } catch (err) {
      testReport.log('Payments Page', 'Previously no cards added in the account');
    }
  }

  /**
   * @function : verifyEmailInAccountSettings
   * @Description : Verify deleting cards if exists
   * @Params: None
   * @Returns: none
   */

  async verifyEmailInAccountSettings(customerEmail) {
    await expect(page.locator(el.accountSettingsPage.lblCurrentEmail)).toHaveText(customerEmail, { timeout: 30000 });
    testReport.log(this.pageName, 'Customer is still logged in after completing checkout');
  }
}
module.exports = { CreateAccountPage };
