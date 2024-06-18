const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/checkout-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ConfirmationPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : verifyConfirmationMsg
   * @Description : To verify if "Thank you" message is displayed
   * @params : None
   * @returns : None
   * */

  async verifyConfirmationMsg() {
    await page.customWait(repoCommonElements.confirmationPage.txtConfOrderDetailsExtract, 'txtConfOrderDetailsExtract');
    // Verify Confirmation Message
    testReport.log(this.pageName, 'Order Confirmation Page is displayed');
    expect(await page.locator(repoCommonElements.confirmationPage.txtConfMsg).textContent()).toContain('Thank you for shopping with us!');
    testReport.log(this.pageName, "Assert -> 'Thank you for shopping with us!' is displayed");
  }

  /**
   * @function_Name : verifyOrderDetails
   * @Description : To verify order details(order number,date,order detail and email ) in confirmation page
   * @params : None
   * @returns : None
   * */

  async verifyOrderDetails() {
    // Displaying order number and checking if it is a String
    const orderNo = await page.innerText(repoCommonElements.confirmationPage.txtOrderNum);
    testReport.log(this.pageName, `Order Confirmation Number -> ${orderNo}`);
    expect(typeof orderNo).toEqual('string');

    // Displaying order date and checking if it is a String
    const orderDate = await page.innerText(repoCommonElements.confirmationPage.txtOrderDate);
    testReport.log(this.pageName, `Order Date -> ${orderDate}`);
    expect(typeof orderDate).toEqual('string');

    // Displaying order total and checking if it is a String
    const OrderTotal = await page.innerText(repoCommonElements.confirmationPage.txtOrderTotal);
    testReport.log(this.pageName, `Order Total -> ${OrderTotal}`);
    expect(typeof OrderTotal).toEqual('string');

    // Displaying email and checking if it is a String
    const email = await page.innerText(repoCommonElements.confirmationPage.txtAcctEmail);
    testReport.log(this.pageName, `Email Id -> ${email}`);
    expect(typeof email).toEqual('string');
  }

  /**
   * @function_Name : compareOrderId
   * @Description : To compare UI order_id and DDL order_id
   * @params : None
   * @returns : None
   * */

  async compareOrderId() {
    const uiOrderId = page.locator(repoCommonElements.confirmationPage.txtOrderNum); // UI order id
    const ddlOrderId = await page.evaluate('window.digitalData.event[0].attributes.order_id'); // DDL order id
    await expect(uiOrderId).toHaveText(ddlOrderId);
    testReport.log(this.pageName, `UI Order Id '${await uiOrderId.innerText()}' matches with the DDL Order Id '${ddlOrderId}'`);
  }
}

module.exports = { ConfirmationPage };
