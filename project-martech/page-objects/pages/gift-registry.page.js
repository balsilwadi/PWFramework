const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/gift-registry-elements');
const env = require('../../../support/env/env');
const testData = require('../datafiles/test-data');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { CommonUtils } = require('../../../support/utils/common-utils');

const testReport = new ReportUtils();
const common = new CommonUtils();

class RegistryPage {
  pageName = this.constructor.name;

  constructor() {
    const country = env.COUNTRY;
    if (country === 'US') this.testFile = testData.CreateNewRegistryUS;
    else this.testFile = testData.CreateNewRegistryCA;
  }

  /**
   * @function_Name : viewExistingRegistry
   * @Description : To View existing list of registry
   * @params : None
   * @returns : None
   * */

  async viewExistingRegistry() {
    if (env.BRAND === 'Crate') {
      // click on Wedding Registry at Super Category level
      await page.customClick(repoCommonElements.registryPage.lnkWeddingRegistry, 'lnkWeddingRegistry');
      testReport.log(this.pageName, 'Clicked on Wedding Registry in home page');
      // click on Manage My Registry
      await page.customClick(repoCommonElements.registryPage.lnkManageMyReg, 'lnkManageMyReg');
      testReport.log(this.pageName, 'Clicked on Manage My Registry link');
    } else {
      // click on Wedding Registry at Super Category level
      await page.customClick(repoCommonElements.registryPage.lnkWeddingRegistry, 'lnkWeddingRegistry');
      testReport.log(this.pageName, 'Clicked on Wedding Registry in home page');
      // click on
      await page.customClick(repoCommonElements.registryPage.lnkManageMyRegCB2, 'lnkManageMyRegCB2');
      testReport.log(this.pageName, 'Clicked on Manage My Registry link');
      // click on Manage My Registry
      await page.customClick(repoCommonElements.registryPage.lnkViewRegistry, 'lnkViewRegistry');
      testReport.log(this.pageName, 'Clicked on view registry link');
    }
  }

  /**
   * @function_Name : clickCreateRegistry
   * @Description : To Create My Registry inside Wedding Registry
   * @params : None
   * @returns : None
   * */

  async clickCreateRegistry() {
    // click on Wedding Registry at Super Category level
    await page.customClick(repoCommonElements.registryPage.lnkWeddingRegistry, 'lnkWeddingRegistry');
    testReport.log(this.pageName, 'Clicked on Wedding Registry in home page');
    // click on Create My Registry button
    if (env.BRAND === 'Crate') {
      await page.customClick(repoCommonElements.registryPage.btnCreateMyRegistryCB, 'btnCreateMyRegistryCB');
    } else {
      await page.customClick(repoCommonElements.registryPage.btnCreateMyRegistryCB2, 'btnCreateMyRegistryCB2');
    }
    testReport.log(this.pageName, 'Clicked on "Create My Registry" button');
  }

  /**
   * @function_Name : registryLoginWithNewEmail
   * @Description : To Select Registry type and Login with new email
   * @params : None
   * @returns : None
   * */

  async registryLoginWithNewEmail() {
    await page.customSet(repoCommonElements.registryPage.txtFirstName, this.testFile.fName, 'txtFirstName'); // Fill first name
    await page.customSet(repoCommonElements.registryPage.txtLastName, this.testFile.lName, 'txtLastName'); // Fill last name
    await page.customSet(repoCommonElements.registryPage.txtPhoneNum, this.testFile.phone, 'txtPhoneNum'); // Fill phone number
    await page.customSelectByValue(repoCommonElements.registryPage.txtEventType, this.testFile.eventType, 'txtEventType'); // select 'Wedding' option from event type dropdown

    // Generating random Email
    const randomEmail = common.generateNewEmail();
    await page.customSet(repoCommonElements.registryPage.txtEmail, randomEmail, 'txtEmail'); // Fill email
    testReport.log(this.pageName, 'Populated the login sheet with First name, Last name, Phone number, Event type and Random email ID');

    // click on Continue button
    await page.customClick(repoCommonElements.registryPage.btnContinue, 'btnContinue');
    testReport.log(this.pageName, 'Clicked on Continue button');
  }

  /**
   * @function_Name : createAccountAndContinue
   * @Description : To fill password and create new account
   * @params : None
   * @returns : None
   * */

  async createAccountAndContinue() {
    await page.customSet(repoCommonElements.registryPage.txtCreatePwd, this.testFile.Password, 'txtCreatePwd'); // Fill password
    await page.customClick(repoCommonElements.registryPage.btnCreateAcntContinue, 'btnCreateAcntContinue'); // click create account and continue button
    await page.customWait(repoCommonElements.registryPage.lblContInfoContainer, 'lblContInfoContainer');
  }

  /**
   * @function_Name : fillContactInfo
   * @Description : To fill contact information page
   * @params : None
   * @returns : None
   * */

  async fillContactInfo() {
    const tomorrowDate = await page.evaluate(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    await page.customSet(repoCommonElements.registryPage.txtEventDate, tomorrowDate, 'txtEventDate'); // fill event date
    await page.customSet(repoCommonElements.registryPage.txtStreetAd, this.testFile.streetAd, 'txtStreetAd'); // fill street
    await page.customSet(repoCommonElements.registryPage.txtZipcode, this.testFile.zipCode, 'txtZipcode'); // fill zipcode
    await page.customSet(repoCommonElements.registryPage.txtCity, this.testFile.city, 'txtCity'); // fill city
    await page.customSelectByValue(repoCommonElements.registryPage.txtState, this.testFile.state, 'txtState'); // select state
    await page.customClick(repoCommonElements.registryPage.btnStepContinue, 'btnStepContinue'); // click continue button
    testReport.log(this.pageName, 'Clicked on continue button on Contact Information page');

    testReport.log(this.pageName, 'Validating AVS popup');
    await expect(page.locator(repoCommonElements.registryPage.btnKeepAd)).toBeHidden({ timeout: global.small_wait });
    await page.customWait(repoCommonElements.registryPage.lblLocPrefContainer, 'lblLocPrefContainer');
  }

  /**
   * @function_Name : clickLocPrefContinue
   * @Description : To click continue button on Location Preference page
   * @params : None
   * @returns : None
   * */

  async clickLocPrefContinue() {
    await page.customClick(repoCommonElements.registryPage.btnStepContinue, 'btnStepContinue');
    testReport.log(this.pageName, 'Clicked on continue button on Local Preferences page');
    if (await page.locator(repoCommonElements.registryPage.btnKeepAd).isVisible()) {
      await page.customClick(repoCommonElements.registryPage.btnKeepAd, 'btnKeepAd'); // click keep address as entered button
    }
    await page.customWait(repoCommonElements.registryPage.txtRegPrefTitle, 'txtRegPrefTitle');
  }

  /**
   * @function_Name : clickHeaderLogo
   * @Description : To click brand logo
   * @params : None
   * @returns : None
   * */

  async clickHeaderLogo() {
    await page.customClick(repoCommonElements.registryPage.btnHeaderLogo, 'btnHeaderLogo');
    testReport.log(this.pageName, 'clicked on brand logo to abandon form');
  }

  /**
   * @function_Name : clickNevermind
   * @Description : To click 'NeverMind, Let's Continue' button
   * @params : None
   * @returns : None
   * */

  async clickNevermind() {
    await page.customClick(repoCommonElements.registryPage.btnNevermind, 'btnNevermind');
    testReport.log(this.pageName, 'closed form abandon popup');
  }

  /**
   * @function_Name : optin
   * @Description : To select email/sms subscription
   * @params : None
   * @returns : None
   * */

  async optinPreferences() {
    if (env.COUNTRY === 'US') {
      await page.customCheck(repoCommonElements.registryPage.lblSmsOptin, 'lblSmsOptin');
      testReport.log(this.pageName, 'signed up for SMS text messages');
    } else {
      await page.customCheck(repoCommonElements.registryPage.lblEmailOptin, 'lblEmailOptin');
      testReport.log(this.pageName, 'signed up for registry emails');
      await page.customCheck(repoCommonElements.registryPage.lblSmsOptin, 'lblSmsOptin');
      testReport.log(this.pageName, 'signed up for SMS text messages');
    }
  }

  async optinEmail() {
    await page.customCheck(repoCommonElements.registryPage.lblEmailOptin, 'lblEmailOptin');
    testReport.log(this.pageName, 'signed up for registry emails');
  }

  /**
   * @function_Name : clickCreateRegistry
   * @Description : To click on Create My Registry button
   * @params : None
   * @returns : None
   * */

  async clickCreateMyRegistry() {
    await page.customClick(repoCommonElements.registryPage.btnStepContinue, 'btnStepContinue');
    await page.customWait(repoCommonElements.registryPage.txtRegInfoContainer, 'txtRegInfoContainer');
    testReport.log(this.pageName, 'New registry created successfully');
  }
}

module.exports = { RegistryPage };
