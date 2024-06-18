const { expect } = require('@playwright/test');
// eslint-disable-next-line import/no-restricted-paths
const { ProductPage } = require('./product.page');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const pdpTestData = require('../../datafiles/testdata');

const testReport = new ReportUtils();
let strPdpSummary;

class ProductMTOPage extends ProductPage {
  constructor() {
    super();
    this.lblProductSummary = '//*[@id="summary-custom-product"][1]';
    this.lblMtoMessageOnPdp = '//div[@class="zip-code-message"]';
    this.btnAddToRegistry = '//button[@value="addToRegistry"]';
    this.lblMtoTerms = '//div[@class="terms"]';
    this.lblMtoPopupTitle = '//h2[@class="title"]';
    this.lblMtoPopupTitle = '//h2[@class="title"]';
    this.imgMtoProduct = '//img[@class="product-image"]';
    this.btnMtoDecline = '//button/span[contains(text(),"Decline")]';
    this.btnMtoAddToCart = '//button[@data-id="addToCartButton"]';
    this.lblMtoProductSummary = '//div[@id="popup-content"]//div[@id="summary-custom-product"]';
    this.btnMtoClose = '//button[@id="popup-close"]';
  }

  async validateMtoProductPage() {
    const strMtoMessage = await page.locator(this.lblMtoMessageOnPdp).innerText();
    if (strMtoMessage.includes('This item is made just for you')) {
      testReport.log(this.pageName, `MTO message is as expected${strMtoMessage}`);
    } else {
      testReport.log(this.pageName, 'MTO message mismatch');
    }
    // if (!env.EXEC_SITE.includes('can')) {
    //   await expect(await page.locator(this.btnAddToRegistry)).toBeDisabled();
    //   testReport.log(this.pageName, 'Add to Registry is disabled');
    // }
    strPdpSummary = await page.locator(this.lblProductSummary).innerText();
  }

  async validateMtoPopup() {
    await page.waitForLoadState('domcontentloaded');
    const strMtoPopupTitle = await page.locator(this.lblMtoPopupTitle).innerText();
    const strMtoPopupTerms = await page.locator(this.lblMtoTerms).innerText();
    //page.locator(this.lblMtoPopupTitle);
    if (env.EXEC_SITE.includes('cb2')) await expect(strMtoPopupTitle).toEqual('CONFIRM YOUR SELECTION');
    else expect(strMtoPopupTitle).toEqual('Confirm Your Selection');
    testReport.log(this.pageName, `Double Dare Popup Title is present as ${strMtoPopupTitle}`);
    await page.locator(this.imgMtoProduct).toBeVisible;
    testReport.log(this.pageName, 'MTO Product Image is Present');
    //page.locator(this.lblMtoTerms);
    if (env.EXEC_SITE.includes('cb2')) {
      expect(strMtoPopupTerms.trim()).toEqual(pdpTestData.productPageInfo.mtoCB2Terms);
    } else {
      expect(strMtoPopupTerms.trim()).toEqual(pdpTestData.productPageInfo.mtoTerms);
    }
    testReport.log(this.pageName, `MTO terms and Condition is Present as ${strMtoPopupTerms}`);
    await page.locator(this.btnMtoAddToCart).toBeVisible;
    await page.locator(this.btnMtoDecline).toBeVisible;
    await page.locator(this.btnMtoClose).toBeVisible;
    testReport.log(this.pageName, 'MTO Confirmation Popup Action buttons are present');
  }

  async mtoDeclineValidation() {
    await page.locator(this.btnMtoDecline).click();
    testReport.log(this.pageName, 'Double Dare Popup Closed by Clicking Decline button');
  }

  async mtoAcceptValidation() {
    await page.locator(this.btnMtoAddToCart).click();
    testReport.log(this.pageName, 'Add to cart clicked on Double Dare Popup');
    // await page.waitForLoadState('networkidle', { timeout: 60000 });
  }

  async getMTOSummaryText() {
    await page.waitForLoadState();
    const strMtoSummary = await page.locator(this.lblMtoProductSummary).innerText();
    await expect(strMtoSummary).toEqual(strPdpSummary);
    testReport.log(this.pageName, 'Summary Test is matching between PDP and Double Dare Popup');
  }
}

module.exports = new ProductMTOPage();
