const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/checkout-elements');
const testData = require('../datafiles/test-data');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ShippingPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : enterShippingAddress
   * @Description : To fill the shipping address details like first name, last name, address, zipcode, city & phone num
   * @params : None
   * @returns : None
   * */

  async enterShippingAddress() {
    await page.waitForNavigation();
    await page.customWait(repoCommonElements.shippingPage.lblShippingContainer, 'lblShippingContainer'); // Waiting till Shipping address form is visible
    await page.customSet(repoCommonElements.shippingPage.txtShipAdFrstName, testData.shippingInfo.firstName, 'txtShipAdFrstName'); // fill first name
    await page.customSet(repoCommonElements.shippingPage.txtShipAdLastName, testData.shippingInfo.lastName, 'txtShipAdLastName'); // fill last name
    await page.customSet(repoCommonElements.shippingPage.txtShipAd1, testData.shippingInfo.address1, 'txtShipAd1'); // fill address
    await page.customSet(repoCommonElements.shippingPage.txtShipAdZip, testData.shippingInfo.zipCode, 'txtShipAdZip'); // fill zipcode
    await page.customSet(repoCommonElements.shippingPage.txtShipAdCity, testData.shippingInfo.city, 'txtShipAdCity'); // fill city
    await page.customSelectByValue(repoCommonElements.shippingPage.txtShipAdState, testData.shippingInfo.state, 'txtShipAdState'); // select city
    await page.customSet(repoCommonElements.shippingPage.txtShipAdPhone, testData.shippingInfo.phoneNumber, 'txtShipAdPhone'); // fill phone number
    testReport.log(this.pageName, `Populated shipping address form with: ${JSON.stringify(testData.shippingInfo)}`);
  }

  /**
   * @function_Name : verifyShipTo
   * @Description : To verify if ship to address is present
   * @params : None
   * @returns : None
   * */

  async verifyShipTo() {
    await expect(page.locator(repoCommonElements.shippingPage.txtShipToAd)).toBeVisible();
    testReport.log(this.pageName, 'ShipTo address is present');
  }

  /**
   * @function_Name : enterEmailReceipt
   * @Description : To enter email id in shipping page to get personalised updates
   * @params : None
   * @returns : None
   * */

  async enterEmailReceipt() {
    await page.customWait(repoCommonElements.shippingPage.btnShipPgEmail, 'btnShipPgEmail');
    await page.customSet(repoCommonElements.shippingPage.btnShipPgEmail, testData.shippingInfo.email, 'btnShipPgEmail');
    testReport.log(this.pageName, `Entered Receipient Email -> ${testData.shippingInfo.email}`);
  }

  /**
   * @function_Name : proceedToShipping
   * @Description : To click on Proceed to Shipping button
   * @params : None
   * @returns : None
   * */

  async proceedToShipping() {
    await page.customClick(repoCommonElements.shippingPage.btnShippingNext, 'btnShippingNext');
    testReport.log(this.pageName, 'Clicked on NEXT button on Shipping page');
  }

  /**
   * @function_Name : proceedToPayment
   * @Description : To click on Proceed to Payment button
   * @params : None
   * @returns : None
   * */

  async proceedToPayment() {
    await page.customClick(repoCommonElements.shippingPage.btnPaymentsNext, 'btnPaymentsNext');
    testReport.log(this.pageName, 'Clicked on PROCEED TO PAYMENT button');
  }
}

module.exports = { ShippingPage };
