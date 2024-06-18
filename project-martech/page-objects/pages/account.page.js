const repoCommonElements = require('../elements/account-elements');
const testData = require('../datafiles/test-data');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();

class CreateAccountPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : clickCreateNewAccount ,completeCreateAccountForm ,clickCreateAccount
   * @Description : To Create New Account By Clicking create new account and filling the form
   * @params : None
   * @returns : None
   * */

  async clickCreateNewAccount() {
    await page.customClick(repoCommonElements.createAccountPage.btnCreateAccount, 'btnCreateAccount');
    testReport.log(this.pageName, 'Clicked on CREATE ACCOUNT button');
  }

  // verify the content on create account page
  async completeCreateAccountForm() {
    // Getting random email
    const randomEmail = common.generateNewEmail();

    // filling the first name, last name, phone, email, password details to create a new account
    await page.customSet(repoCommonElements.createAccountPage.txtFirstName, testData.createNewAccount.fName, 'txtFirstName');
    await page.customSet(repoCommonElements.createAccountPage.txtLastName, testData.createNewAccount.lName, 'txtLastName');
    await page.customSet(repoCommonElements.createAccountPage.txtPhone, testData.createNewAccount.phone, 'txtPhone');
    await page.customSet(repoCommonElements.createAccountPage.txtEmail, randomEmail, 'txtEmail'); // entering random email every time
    await page.customSet(repoCommonElements.createAccountPage.txtPassword, testData.createNewAccount.password, 'txtPassword');
  }

  // Click on create new account button
  async clickCreateAccount() {
    page.customClick(repoCommonElements.createAccountPage.btnCrtAccount, 'btnCrtAccount');
    testReport.log(this.pageName, 'Clicked on Create Account button and finish account creation');
  }

  /**
   * @function_Name : clickOnLogout
   * @Description : To Click on logout
   * @params : None
   * @returns : None
   * */

  async clickOnLogout() {
    await page.customClick(repoCommonElements.myAccountPage.lnkMyAcntLogout, 'lnkMyAcntLogout');
    testReport.log(this.pageName, 'Logout was successful');
  }
}

module.exports = { CreateAccountPage };
