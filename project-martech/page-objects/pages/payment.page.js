const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/checkout-elements');
const py = require('../datafiles/payments-test-data.json');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class PaymentPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : selectCreditCardAsPaymentMethod,populateCreditCardForm
   * @Description : To select credit card as payment and populate the details(card num,expiry date and cvv)
   * @params : fCardName
   * @returns : None
   * */

  async selectCreditCardAsPaymentMethod() {
    await page.customWait(repoCommonElements.paymentPage.btnPymtSelectCC, 'btnPymtSelectCC');
    await page.customClick(repoCommonElements.paymentPage.btnPymtSelectCC, 'btnPymtSelectCC');
    testReport.log(this.pageName, 'Selected CreditCards as payment mode');
  }

  // Fill up the payments form with card num, expiry date and cvv
  async populateCreditCardForm(fCardName) {
    // fCardName = first card name
    testReport.log(this.pageName, `Populate CreditCard Information for ${fCardName}`);

    // If card selected is visa then executes this block
    if (fCardName === 'Visa') {
      await page.customWait(repoCommonElements.paymentPage.txtPymtCCNum, 'txtPymtCCNum');
      // fill credit card num
      await page.customSet(repoCommonElements.paymentPage.txtPymtCCNum, py.VisaCardsInfo[0].CardNo, 'txtPymtCCNum');
      await page.customWait(repoCommonElements.paymentPage.txtPymtVisa, 'txtPymtVisa');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtVisa)).toBeVisible(); // assert fails if visa card num is not found
      // fill expiry date
      await page.customSet(repoCommonElements.paymentPage.txtPymtExpiry, py.VisaCardsInfo[0].CardExpiry, 'txtPymtExpiry');
      // fill CVV
      await page.customSet(repoCommonElements.paymentPage.txtPymtCVV, py.VisaCardsInfo[0].CardCVV, 'txtPymtCVV');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtCVV3Code)).toBeVisible(); // assert fails if card img not present beside CVV field
    }
    // If card selected is Master then executes this block
    else if (fCardName === 'MasterCard') {
      await page.customWait(repoCommonElements.paymentPage.txtPymtCCNum, 'txtPymtCCNum');
      // fill credit card num
      await page.customSet(repoCommonElements.paymentPage.txtPymtCCNum, py.MasterCardsInfo[0].CardNo, 'txtPymtCCNum');
      await page.customWait(repoCommonElements.paymentPage.txtPymtMasterCard, 'txtPymtMasterCard');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtMasterCard)).toBeVisible(); // assert fails if Master card num is not found
      // fill expiry date
      await page.customSet(repoCommonElements.paymentPage.txtPymtExpiry, py.MasterCardsInfo[0].CardExpiry, 'txtPymtExpiry');
      // fill CVV
      await page.customSet(repoCommonElements.paymentPage.txtPymtCVV, py.MasterCardsInfo[0].CardCVV, 'txtPymtCVV');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtCVV3Code)).toBeVisible(); // assert fails if card img not present beside CVV field
    }
    // If card selected is American Express then executes this block
    else if (fCardName === 'AmericanExpress') {
      await page.customWait(repoCommonElements.paymentPage.txtPymtCCNum, 'txtPymtCCNum');
      // fill credit card num
      await page.customSet(repoCommonElements.paymentPage.txtPymtCCNum, py.AmexCardsInfo[0].CardNo, 'txtPymtCCNum');
      await page.customWait(repoCommonElements.paymentPage.txtPymtAmericanExpress, 'txtPymtAmericanExpress');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtAmericanExpress)).toBeVisible(); // assert fails if American Express card num is not found
      // fill expiry date
      await page.customSet(repoCommonElements.paymentPage.txtPymtExpiry, py.AmexCardsInfo[0].CardExpiry, 'txtPymtExpiry');
      // fill CVV
      await page.customSet(repoCommonElements.paymentPage.txtPymtCVV, py.AmexCardsInfo[0].CardCVV, 'txtPymtCVV');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtCVV4Code)).toBeVisible(); // assert fails if card img not present beside CVV field
    }
    // If card selected is PLCC then executes this block
    else if (fCardName === 'PLCC') {
      // plastic labelled credit card
      await page.customWait(repoCommonElements.paymentPage.txtPymtCCNum, 'txtPymtCCNum');
      // fill credit card num
      await page.customSet(repoCommonElements.paymentPage.txtPymtCCNum, py.PLCCCardsInfo[0].CardNo, 'txtPymtCCNum');
      await page.customWait(repoCommonElements.paymentPage.txtPymtAmericanExpress, 'txtPymtAmericanExpress');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtAmericanExpress)).toBeVisible(); // assert fails if PLC card num is not found
      // fill expiry date
      await page.customSet(repoCommonElements.paymentPage.txtPymtExpiry, py.PLCCCardsInfo[0].CardExpiry, 'txtPymtExpiry');
      // fill CVV
      await page.customSet(repoCommonElements.paymentPage.txtPymtCVV, py.PLCCCardsInfo[0].CardCVV, 'txtPymtCVV');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtCVV4Code)).toBeVisible(); // assert fails if card img not present beside CVV field
    }
    // If card selected is CC then executes this block
    else if (fCardName === 'CC') {
      // Crate & Barrel Credit card
      await page.customWait(repoCommonElements.paymentPage.txtPymtCCNum, 'txtPymtCCNum');
      // fill credit card num
      await page.customSet(repoCommonElements.paymentPage.txtPymtCCNum, py.CBCardsInfo[0].CardNo, 'txtPymtCCNum');
      await page.customWait(repoCommonElements.paymentPage.txtPymtAmericanExpress, 'txtPymtAmericanExpress');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtAmericanExpress)).toBeVisible(); // assert fails if CC num is not found
      // fill expiry date
      await page.customSet(repoCommonElements.paymentPage.txtPymtExpiry, py.CBCardsInfo[0].CardExpiry, 'txtPymtExpiry');
      // fill CVV
      await page.customSet(repoCommonElements.paymentPage.txtPymtCVV, py.CBCardsInfo[0].CardCVV, 'txtPymtCVV');
      await expect(page.locator(repoCommonElements.paymentPage.txtPymtCVV4Code)).toBeVisible(); // assert fails if card img not present beside CVV field
    }
  }

  /**
   * @function_Name : applyNewCreditCard
   * @Description : To Apply on new Credit Card
   * @params : None
   * @returns : None
   * */

  async applyNewCreditCard() {
    await page.customWait(repoCommonElements.paymentPage.btnPymtAddCC, 'btnPymtAddCC');
    await page.customClick(repoCommonElements.paymentPage.btnPymtAddCC, 'btnPymtAddCC');
    testReport.log(this.pageName, 'Clicked to ADD a new CreditCard Information');
  }

  /**
   * @function_Name : proceedToReview
   * @Description : To proceed for review and place order
   * @params : None
   * @returns : None
   * */

  async proceedToReview() {
    await page.customWait(repoCommonElements.paymentPage.btnPymtProceedToReview, 'btnPymtProceedToReview');
    await page.customClick(repoCommonElements.paymentPage.btnPymtProceedToReview, 'btnPymtProceedToReview');
    testReport.log(this.pageName, 'Clicked on Review And Place Order button');
  }
}

module.exports = { PaymentPage };
