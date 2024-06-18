const repoCommonElements = require('../elements/browse-path-elements');
const { CommonUtils } = require('../../../support/utils/common-utils');

const common = new CommonUtils();
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class HomePage {
  pageName = this.constructor.name;

  /**
   * @function_Name : navigateToWebsite,validateTitle
   * @Description : To navigate to url provided and validate title of the page
   * @params : url
   * @returns : None
   * */

  async navigateToWebsite(url) {
    await page.goto(url);
    testReport.log(this.pageName, `URL Loaded: ${url}`);
    testReport.log(this.pageName, `Current page title: ${await page.title()}`);
    if (await page.isVisible(repoCommonElements.signInInterruptor.dlgPopupWindow))
      // click on close button on 'Save 10%' popup and log the report
      await page.customClick(repoCommonElements.signInInterruptor.lnkPopupWindowclose, 'lnkPopupWindowclose');
    // validating current page title
    await this.validateTitle();
  }

  // method to validate current page title
  async validateTitle() {
    if ((await page.title()) === 'Crate&Barrel QA IdentityServer') {
      await this.identityAuthLogin();
    }
  }

  /**
   * @function_Name : identityAuthLogin
   * @Description : To authenticate login
   * @params : None
   * @returns : None
   * */

  async identityAuthLogin() {
    // fill user id and password in text box and log the report
    await page.customSet(repoCommonElements.homePage.txtIdentityAuthUsrname, await common.readSecureProperties('idServerLogin'), 'txtIdentityAuthUsrname');
    await page.customSet(repoCommonElements.homePage.txtIdentityAuthPwd, await common.readSecureProperties('idServerPwd'), 'txtIdentityAuthPwd');
    // logs the message in cucumber reporter
    testReport.log(this.pageName, `Crate&Barrel QA IdentityServer Authentication Needed. Should be a TEST ENV. Page Title ->  ${await page.title()}`);
    // click signin button
    await page.customClick(repoCommonElements.homePage.btnIdentityAuthSignInButton, 'btnIdentityAuthSignInButton');
  }

  /**
   * @function_Name : searchItem
   * @Description : To search an item through Name or Sku
   * @params : item(Sku or Product)
   * @returns : None
   * */

  async searchItem(item) {
    // item: SKU or name of product (ex: Coffee, Glass etc)
    // waits until the web page is loaded
    await page.waitForLoadState();
    await page.customWait(repoCommonElements.homePage.txtSearchTxtBox, 'txtSearchTxtBox'); // waits until the element is found
    await page.customSet(repoCommonElements.homePage.txtSearchTxtBox, item, 'txtSearchTxtBox'); // fill the item in search box
    await page.customWait(repoCommonElements.homePage.btnSearchButton, 'btnSearchButton'); // waits until the element is found
    await page.customClick(repoCommonElements.homePage.btnSearchButton, 'btnSearchButton'); // click on search button
    await this.validateTitle();
  }
}

module.exports = { HomePage };
