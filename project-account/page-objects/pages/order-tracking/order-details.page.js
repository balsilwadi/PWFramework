const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

const env = require('../../../../support/env/env');

class OrderDetailsPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'OrderTrackingPage';
    this.lblFreeSwatch = 'div.order-item-details>h4';
    this.lblSwatchSKU = 'ul.order-item-list li:nth-of-type(1)';
    this.lblSwatchQty = 'ul.order-item-list li:nth-of-type(2)';
    this.lblSwatchFabric = 'ul.order-item-list li:nth-of-type(3)';

    this.pageName = 'OrderDetailsPage';
    this.txtPersonalizationText = '.personalization-text';
    this.txtPersonalizationFont = '.personalization-font';
    this.txtPersonalizationColor = '.personalization-color';
    this.txtPersonalizationMessage = '.personalization-message';
    this.txtMonogrammingFee = "//span[normalize-space()='Monogramming Fee:']";

    this.txtRegistryAddressName = "//div[normalize-space()='KOZINAKA KAKA']";
    this.txtRegistryAddressNameCB2CA = "(//div[normalize-space()='KOZINAKA KAKA'])[1]";
    this.txtRegistryAddressHiden = '.shipping-address-message.gift-registry';
    this.txtGiftMsgH1 = "//h3[normalize-space()='Gift Message']";
    this.txtGiftMsg = "(//div[contains(@class,'order-information')])[1]";
    this.txtGift = "//span[normalize-space()='Gift']";
    this.txtRegistryName = "//span[normalize-space()='kozinaka kaka']";
    this.icnGift = "//div[@data-testid='order-tracking-address-gift-icon']//*[name()='svg']";
    this.icnRegistry = "//div[@data-testid='order-tracking-address-registry-icon']//*[name()='svg']";
  }

  /**
   * @function : clickOnTrackOrder
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async clickOnTrackOrder() {
    if (common.verifyIsMobile()) {
      await page.locator(el.homePage.btnAccountIcon).click();
      await page.locator(el.homePage.lnkTrackOrder).click();
    } else {
      await page.hover(el.homePage.lnkAcntHeader);
      await page.locator(el.homePage.lnkTrackOrder).click();
    }
    testReport.log(this.pageName, `Navigated to Track Orders/Schedule Delivery`);
  }

  /**
   * @function : enter Order number and email
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async fillOrderNumberAndEmail() {
    await page.fill(el.orderTrackingPage.txtEmail, td.orderDetails.email, { timeout: 60000 });
    await page.fill(el.orderTrackingPage.txtOrderNum, env.MONOGRAMMED_ORDER, { timeout: 60000 });
    await page.locator(el.orderTrackingPage.btnViewOrder).click();
    testReport.log(this.pageName, `Entered order details`);
  }

  /**
   * @function : verify monogrammed order details
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async verifyMonogrammedOrderDetail() {
    await expect(page.locator(this.txtPersonalizationText)).toHaveText(`Personalization: ${env.PERS_TEXT}`);
    await expect(page.locator(this.txtPersonalizationFont)).toHaveText(`Font: ${env.PERS_FONT}`);
    await expect(page.locator(this.txtPersonalizationColor)).toHaveText(`Thread Color: ${env.PERS_COLOR}`);
    await expect(page.locator(this.txtPersonalizationMessage)).toHaveText(env.PERS_MESSAGE);
    await expect(page.locator(this.txtMonogrammingFee)).toHaveText(`${env.MONOGRAMMING_FEE_TXT}: `);
    testReport.log(this.pageName, `Verified monogrammed order details`);
  }

  /**
   * @function : enter GR Order number and email
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async fillGROrderNumberAndEmail() {
    await page.fill(el.orderTrackingPage.txtEmail, td.orderDetails.email, { timeout: 60000 });
    await page.fill(el.orderTrackingPage.txtOrderNum, env.GR_ORDER, { timeout: 60000 });
    await page.locator(el.orderTrackingPage.btnViewOrder).click();
    testReport.log(this.pageName, `Entered order details`);
  }

  /**
   * @function : verify gift registry order details
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async verifyGROrderDetail() {
    if (env.EXEC_SITE.includes('cb2ca')) {
      await expect(page.locator(this.txtRegistryAddressName).first()).toHaveText(td.orderDetails.txtRegistryAddressName);
      await expect(page.locator(this.txtRegistryAddressHiden).first()).toHaveText(td.orderDetails.txtRegistryAddressHiden);
      await expect(page.locator(this.txtGiftMsgH1).first()).toHaveText(td.orderDetails.txtGiftMsgH1, { ignoreCase: true });
      await expect(page.locator(this.txtGiftMsg).first()).toContainText(td.orderDetails.txtGiftMsg);
      await expect(page.locator(this.txtGift).first()).toHaveText(td.orderDetails.txtGift);
      await expect(page.locator(this.txtRegistryName).first()).toHaveText(td.orderDetails.txtRegistryName);
      await expect(page.locator(this.icnGift).first()).toBeVisible();
      await expect(page.locator(this.icnRegistry).first()).toBeVisible();
    } else {
      await expect(page.locator(this.txtRegistryAddressName)).toHaveText(td.orderDetails.txtRegistryAddressName);
      await expect(page.locator(this.txtRegistryAddressHiden)).toHaveText(td.orderDetails.txtRegistryAddressHiden);
      await expect(page.locator(this.txtGiftMsgH1)).toHaveText(td.orderDetails.txtGiftMsgH1, { ignoreCase: true });
      await expect(page.locator(this.txtGiftMsg)).toContainText(td.orderDetails.txtGiftMsg);
      await expect(page.locator(this.txtGift)).toHaveText(td.orderDetails.txtGift);
      await expect(page.locator(this.txtRegistryName)).toHaveText(td.orderDetails.txtRegistryName);
      await expect(page.locator(this.icnGift)).toBeVisible();
      await expect(page.locator(this.icnRegistry)).toBeVisible();
    }
    testReport.log(this.pageName, `Verified GR order details`);
  }

  /**
   * @function : enter GR Order number and email
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */
  async fillSwatchOrderNumberAndEmail() {
    await page.fill(el.orderTrackingPage.txtEmail, td.orderDetails.email, { timeout: 60000 });
    await page.fill(el.orderTrackingPage.txtOrderNum, env.ACNT_SWATCH_ORDER, { timeout: 60000 });
    await page.locator(el.orderTrackingPage.btnViewOrder).click();
    testReport.log(this.pageName, `Entered order details`);
  }

  /**
   * @author: krishna
   * @function_Name : verifySwatchOrderDetails
   * @Description : Customer verifies whether quantity and fabric is displayed, merchandise cost is set to $0
   * @params : None
   * @returns : None
   */
  async verifySwatchOrderDetails() {
    await page.waitForLoadState('load', { timeout: 60000 });
    // verify the quantity and fabric and amout is set to 0.00
    await expect(page.locator(this.lblFreeSwatch)).toHaveText(td.orderTrackingPage.freeSwatch);
    await expect(page.locator(this.lblSwatchSKU)).toHaveText(env.ACNT_SWATCH_SKU);
    await expect(page.locator(this.lblSwatchQty)).toHaveText(td.orderTrackingPage.swatchQty);
    await expect(page.locator(this.lblSwatchFabric)).toHaveText(td.orderTrackingPage.swatchFabric + env.ACNT_SWATCH_FABRIC);
    await expect(page.locator(el.orderDetails.lblMerchandiseAmount)).toHaveText(env.ACNT_SWATCH_AMT);
    await expect(page.locator(el.orderDetails.lblShippingAmount)).toHaveText(env.ACNT_SWATCH_AMT);
    await expect(page.locator(el.orderDetails.lblTax)).toHaveText(env.ACNT_SWATCH_AMT);
    if (common.verifyIsMobile()) await expect(page.locator(el.orderDetails.lblOrderTotalMobile)).toHaveText(env.ACNT_SWATCH_AMT);
    else await expect(page.locator(el.orderDetails.lblOrderTotal)).toHaveText(env.ACNT_SWATCH_AMT);
    testReport.log(this.pageName, 'Swatch order details are displaying as expected');
  }
}

module.exports = new OrderDetailsPage();
