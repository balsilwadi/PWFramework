const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/checkout-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ReviewPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : clickPlaceOrder,verifyContactInfo
   * @Description : To click on Place Order
   * @params : None
   * @returns : None
   * */

  async clickPlaceOrder() {
    // making sure that the page is loaded and clicking on Place order button
    await Promise.all([page.waitForNavigation(), page.customClick(repoCommonElements.reviewPage.btnReviewPlaceOrder, 'btnReviewPlaceOrder')]);
    testReport.log(this.pageName, 'Clicked on PLACE ORDER to submit the order details');
  }

  /**
   * @function_Name : verifyOrderSummaryLinks
   * @Description : To verify if Terms Of Use link, Privacy Policy link are present and proper text is displayed
   * @params : None
   * @returns : None
   * */

  async verifyOrderSummaryLinks() {
    await expect(page.locator(repoCommonElements.reviewPage.lnkTermsOfUse)).toBeVisible();
    expect(page.locator(repoCommonElements.reviewPage.lnkTermsOfUse).getAttribute('href')).not.toBeNull(); // making sure that Terms Of Use link is not empty
    await expect(page.locator(repoCommonElements.reviewPage.lnkPrivacyPolicy)).toBeVisible();
    expect(page.locator(repoCommonElements.reviewPage.lnkPrivacyPolicy).getAttribute('href')).not.toBeNull(); // making sure that Privacy Policy link is not empty
    const policyUpdateText = await page.innerText(repoCommonElements.reviewPage.txtPolicyUpdate);
    expect(policyUpdateText).toContain('By placing your order, you are agreeing to our ');
    testReport.log(this.pageName, `Policy Update Text Displayed:: ${policyUpdateText}`);
  }
}

module.exports = { ReviewPage };
