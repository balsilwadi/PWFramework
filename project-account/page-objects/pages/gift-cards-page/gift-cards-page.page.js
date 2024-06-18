const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

class GiftCardsPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'GiftCardsPage';
    this.btnPurchaseEGiftCard = '.button.button-md.button-primary.btn-block.hidden-xs';
    this.btnPurchaseEGiftCardMob = '.button.button-md.button-primary.btn-block.visible-xs';
    this.btnPurchaseEGiftCardCA = "button[type='submit']";
    this.msgeGiftCardByEmailH2 = "div[class='gift-card gift-card-intro col-xs-11 col-md-6 col-sm-6'] h2";
    this.msgeGiftCardByEmail = "ul[class='hidden-xs gift-card-ul col-md-11']";
    this.msgeGiftCardByMailH2 = "div[class='gift-card col-xs-11 col-md-5 col-sm-4'] h2";
    this.txteGiftCardVendorUS = '.cashStarNote.hidden-xs';
    this.txtGiftCardMsg = '.personal-message';
    this.txteGiftCardVendorCA = '#ButtonDescription';
    this.txtCheckGiftCardBalanceMsg = "div[class='gift-card-balance gift-card col-xs-11 col-md-12 col-sm-12'] h2";
    this.lblCardNumberRequired = "label[for='giftCardNumber']";
    this.lblPinNumberRequired = "label[for='pinNumber']";
    this.lblCheckCheckboxRequired = '#captcha-label';
    this.lnkFAQ = "//a[normalize-space()='Gift Card / eGift Card FAQs']";
    this.txtGiftCardAmount = '#Amount';
    this.btnAddToCart = "//button[normalize-space()='Add to Cart']";
    this.msgItemAdded = '.m-conf-item-count';
    this.msgItemAddedMob = '.btn.btn-success.btn-gift-card.btn-block';
    this.txtTotal = "[data-testid='total-price']";
    this.txtGiftCardSKU = "[data-testid='item-sku']";
    this.btnCheckBalace = '.button.button-md.button-primary.btn-block.btn-chk-balance';
  }

  /**
   * @function : verifyGiftPageIsLoaded
   * @Description : Verify if content for Gift Cards page is loaded
   * @Params: None
   * @Returns: none
   */

  async verifyGiftPageIsLoaded() {
    await page.waitForLoadState('load');
    expect(page.url()).toContain(`${env.BASE_URL}/gift-cards/`);
    await expect(page.locator(this.txtCheckGiftCardBalanceMsg)).toContainText(td.giftCards.checkGiftCardBalanceMsg);
    await expect(page.locator(this.lblCardNumberRequired)).toHaveText(td.giftCards.cardNumberRequired, { ignoreCase: true });
    await expect(page.locator(this.lblPinNumberRequired)).toContainText(td.giftCards.pinNumberRequired);
    await expect(page.locator(this.lblCheckCheckboxRequired)).toContainText(td.giftCards.checkCheckboxRequired);
    await expect(page.locator(this.btnCheckBalace)).toBeEnabled();
    if (env.EXEC_SITE.endsWith('us')) {
      // await expect(page.locator(this.msgeGiftCardByEmail)).toContainText(td.giftCards.eGiftCardByEmail);
      await expect(page.locator(this.msgeGiftCardByEmailH2)).toContainText(td.giftCards.eGiftCardByEmailH2);
      await expect(page.locator(this.msgeGiftCardByMailH2)).toContainText(td.giftCards.eGiftCardByMailH2);
      await expect(page.locator(this.txteGiftCardVendorUS)).toContainText(td.giftCards.eGiftCardVendorUS);
      await expect(page.locator(this.txtGiftCardMsg)).toContainText(td.giftCards.giftCardMsg);
    } else {
      await expect(page.locator(this.txteGiftCardVendorCA)).toContainText(td.giftCards.eGiftCardVendorCA);
    }
    testReport.log(this.pageName, 'Gift Cards page is loaded');
  }

  /**
   * @function : verifyVendorPageLoaded
   * @Description : Click on Send eGift Card button and verify Vendor's page
   * @Params: None
   * @Returns: none
   */

  async verifyVendorPageLoaded() {
    await page.waitForLoadState('load');
    if (env.EXEC_SITE.endsWith('us')) {
      if (common.verifyIsMobile()) {
        await page.locator(this.btnPurchaseEGiftCardMob).click();
        await expect(page).toHaveURL(new RegExp(env.ACNT_GIFTCARDSVENDOR));
        await page.goBack();
      } else {
        const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(this.btnPurchaseEGiftCard).click()]);
        await expect(newPage).toHaveURL(new RegExp(env.ACNT_GIFTCARDSVENDOR));
        testReport.log(this.pageName, 'Clicked on Send eGift Card button');
        await newPage.close();
      }
    } else {
      const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(this.btnPurchaseEGiftCardCA).click()]);
      await expect(newPage).toHaveURL(new RegExp(env.ACNT_GIFTCARDSVENDOR));
      testReport.log(this.pageName, 'Clicked on Send eGift Card button');
      await newPage.close();
    }
    testReport.log(this.pageName, 'eGift Card Vendor page was closed');
  }

  /**
   * @function : verifyeGiftCrardsFAQpage
   * @Description : Verify eGiftCards FAQ link takes to eGiftCrards FAQ page
   * @Params: None
   * @Returns: none
   */

  async verifyeGiftCrardsFAQpage() {
    await page.waitForLoadState('load');
    await page.locator(this.lnkFAQ).click();
    await expect(page).toHaveURL(new RegExp(env.ACNT_EGIFTCARDSFAQ));
    testReport.log(this.pageName, 'Clicked on eGift Card FAQ link');
    await page.goBack();
    testReport.log(this.pageName, 'Navigated back to Gift Cards page');
  }

  /**
   * @function : addGiftCardToCart
   * @Description : Verify adding Gift Card to Cart
   * @Params: None
   * @Returns: none
   */

  async addGiftCardToCart() {
    await page.waitForLoadState('load');
    if (env.EXEC_SITE.endsWith('us')) {
      await page.locator(this.txtGiftCardAmount).fill('50');
      await page.locator(this.btnAddToCart).click();
      if (common.verifyIsMobile()) {
        await expect(page.locator(this.msgItemAddedMob)).toBeVisible({ timeout: 30000 });
      } else {
        await expect(page.locator(this.msgItemAdded)).toBeVisible({ timeout: 30000 });
      }
      testReport.log(this.pageName, 'Added Gift Card to Cart');
    }
  }

  /**
   * @function : verifyGiftCardAdded
   * @Description : Verify adding Gift Card to Cart
   * @Params: None
   * @Returns: none
   */

  async verifyGiftCardToCart() {
    if (env.EXEC_SITE.endsWith('us')) {
      await page.goto(`${env.BASE_URL}/checkout/cart`, { timeout: 60000 });
      await expect(page.locator(this.txtTotal)).toHaveText(td.giftCards.amount);
      await expect(page.locator(this.txtGiftCardSKU)).toHaveText('SKU 999055');
    }
    testReport.log(this.pageName, '');
  }
}

module.exports = new GiftCardsPage();
