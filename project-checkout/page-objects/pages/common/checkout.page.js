const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { EnvironmentUtils } = require('../../../../support/utils/env-utils');

const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const elements = require('../../elements/elements');
const env = require('../../../../support/env/env');
// const { DBConnUtils } = require('../../../../support/utils/dbconn-utils');
// const sqlData = require('../../datafiles/dbsqls');
const testReport = new ReportUtils();
const commonUtils = new CommonUtils();
const envUtils = new EnvironmentUtils();
const { timeout } = require('../../../../configs/config');

class CheckoutPage extends PageObject {
  constructor() {
    super();
    this.isMobile = commonUtils.verifyIsMobile();
    this.pageName = 'CheckoutPage';
    this.lnkEditCart = '[class*="button-edit-cart"]';
    this.pageTitle = '[class*="page-title"]';
  }

  /**
   * @author: asoman
   * @function_Name : clickViewDetails
   * @Description : for mobile rendered page click on the view details link to expand order summary
   * @params : None
   * @returns : None
   * */
  async clickViewDetails() {
    if (await page.getByText('View details').isVisible()) {
      testReport.log('OrderSummary', 'Click on VIEW DETAILS to open order summary for Mobile rendered page');
      await page.getByText('View details').click();
      await expect(page.locator('.reveal-content-container.expanded')).toBeVisible({ timeout });
    }
  }

  /**
   * @author: asoman
   * @function_Name : clickHideDetails
   * @Description : for mobile rendered page click on the hide details link to collapse order summary
   * @params : None
   * @returns : None
   * */
  async clickHideDetails() {
    if (await page.getByText('Hide details').isVisible()) {
      testReport.log('OrderSummary', 'Click on HIDE DETAILS to close order summary for Mobile rendered page');
      await page.getByText('Hide details').click();
    }
  }

  async clickLogoFromCheckout() {
    await page.locator(elements.paymentPage.btnCheckoutHeader).click();
  }

  /**
   * @author: asoman
   * @function_Name : getMerchTotalFromOrderSummary
   * @Description : get the merchandise total value from order summary
   * @params : None
   * @returns : None
   * */
  async getMerchTotalFromOrderSummary() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let merchandiseAmt = await orderSummaryEle.locator('li', { hasText: 'Merchandise:' }).textContent();
    merchandiseAmt = merchandiseAmt.replace('Merchandise: ', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `MerchandiseTotal displayed in order summary: ${merchandiseAmt}`);
    return merchandiseAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getShippingHandlingAmtFromOrderSummary
   * @Description : get the shipping charges value from order summary
   * @params : None
   * @returns : None
   * */
  async getShippingHandlingAmtFromOrderSummary() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let shippingHandlingAmt = await orderSummaryEle.locator('li', { hasText: 'Shipping & Handling:' }).textContent();
    shippingHandlingAmt = shippingHandlingAmt.replace('Shipping & Handling: ', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `ShippingHandlingAmt displayed in order summary: ${shippingHandlingAmt}`);
    return shippingHandlingAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getShippingDiscountAmtFromOrderSummary
   * @Description : get the shipping discount amount value from order summary
   * @params : None
   * @returns : None
   * */
  async getShippingDiscountAmtFromOrderSummary(blnIsShipDiscountApplied) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let shippingDiscountAmt = '$0.00';
    if (blnIsShipDiscountApplied) {
      shippingDiscountAmt = await orderSummaryEle.locator('li', { hasText: 'Shipping Discount:' }).textContent();
    }
    shippingDiscountAmt = shippingDiscountAmt.replace('Shipping Discount:', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `ShippingDiscountAmt displayed in order summary: ${shippingDiscountAmt}`);
    return shippingDiscountAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getMerchandiseDiscountAmtFromOrderSummary
   * @Description : get the merchandise discount total value from order summary
   * @params : None
   * @returns : None
   * */
  async getMerchandiseDiscountAmtFromOrderSummary(blnIsMerchDiscountApplied) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let merchandiseDiscountAmt = '$0.00';
    if (blnIsMerchDiscountApplied) {
      merchandiseDiscountAmt = await orderSummaryEle.locator('li', { hasText: 'Merchandise Discount:' }).textContent();
    }
    merchandiseDiscountAmt = merchandiseDiscountAmt.replace('Merchandise Discount:', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `MerchandiseDiscountAmt displayed in order summary: ${merchandiseDiscountAmt}`);
    return merchandiseDiscountAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getTaxTotalFromOrderSummary
   * @Description : get the tax total value from order summary
   * @params : None
   * @returns : None
   * */
  async getTaxTotalFromOrderSummary() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let taxAmt = await orderSummaryEle.locator('li', { hasText: 'Tax:' }).textContent();
    taxAmt = taxAmt.replace('Tax: ', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `TaxAmt displayed in order summary: ${taxAmt}`);
    return taxAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getOrderTotalFromOrderSummary
   * @Description : get the order total value from order summary
   * @params : None
   * @returns : None
   * */
  async getOrderTotalFromOrderSummary() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let orderTotalAmt = await orderSummaryEle.locator('li', { hasText: 'Order Total:' }).textContent();
    orderTotalAmt = orderTotalAmt.replace('Order Total: ', '').replace('$', '').replace('CAD ', '').replace(/,/g, '');
    orderTotalAmt = parseFloat(orderTotalAmt).toFixed(2);
    testReport.log('OrderSummary', `OrderTotalAmt displayed in order summary: ${orderTotalAmt}`);
    return orderTotalAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getOrderTotalFromOrderSummary
   * @Description : get the order total value from order summary
   * @params : None
   * @returns : None
   * */
  async getEstimateOrderTotalFromOrderSummary() {
    // const orderSummaryEle = await page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let orderTotalAmt = await page.locator('[data-testid="order-summary-est-total"]').textContent();
    orderTotalAmt = orderTotalAmt.replace('Est. Order Total: ', '').replace('$', '').replace('CAD ', '').replace(/,/g, '');
    orderTotalAmt = parseFloat(orderTotalAmt).toFixed(2);
    testReport.log('OrderSummary', `Estimated OrderTotalAmt displayed in order summary: ${orderTotalAmt}`);
    return orderTotalAmt;
  }

  async getMerchTotalFromCartOrderSummary() {
    // const orderSummaryEle = await page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let orderTotalAmt = await page.locator('[data-testid="total-amt"]').textContent();
    orderTotalAmt = orderTotalAmt.replace('Merchandise: ', '').replace('$', '').replace('CAD ', '').replace(/,/g, '');
    orderTotalAmt = parseFloat(orderTotalAmt).toFixed(2);
    testReport.log('OrderSummary', `Merchandise OrderTotalAmt displayed in cart order summary: ${orderTotalAmt}`);
    return orderTotalAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getGiftBoxTotalFromOrderSummary
   * @Description : get the giftbox charges from order summary
   * @params : None
   * @returns : None
   * */
  async getGiftBoxTotalFromOrderSummary(blnIsGiftBoxApplied) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let giftBoxAmt = '$0.00';
    if (blnIsGiftBoxApplied) {
      giftBoxAmt = await orderSummaryEle.locator('li', { hasText: 'Gift Box:' }).textContent();
    }
    giftBoxAmt = giftBoxAmt.replace('Gift Box: ', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `GiftBoxAmt displayed in order summary: ${giftBoxAmt}`);
    return giftBoxAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getGiftCardTotalFromOrderSummary
   * @Description : get the giftcard paid amount value from order summary
   * @params : None
   * @returns : None
   * */
  async getGiftCardTotalFromOrderSummary(blnIsGiftCardApplied) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let giftCardAmt = '$0.00';
    if (blnIsGiftCardApplied) {
      giftCardAmt = await orderSummaryEle.locator('li', { hasText: 'Gift Card:' }).textContent();
    }
    giftCardAmt = giftCardAmt.replace('Gift Card: ', '').replace('$', '').replace('CAD ', '');
    giftCardAmt = giftCardAmt === 'APPLIED' ? '0' : giftCardAmt;
    testReport.log('OrderSummary', `GiftCardAmt displayed in order summary: ${giftCardAmt}`);

    return giftCardAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getRewardsTotalFromOrderSummary
   * @Description : get the rewards total value from order summary
   * @params : None
   * @returns : None
   * */
  async getRewardsTotalFromOrderSummary(blnIsRewardsApplied) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let rewardsAmt = '$0.00';
    if (blnIsRewardsApplied) {
      rewardsAmt = await orderSummaryEle.locator('li', { hasText: 'Reward Certificates:' }).textContent();
    }
    rewardsAmt = rewardsAmt.replace('Reward Certificates: ', '').replace('$', '').replace('CAD ', '');
    testReport.log('OrderSummary', `RewardsAmt displayed in order summary: ${rewardsAmt}`);
    return rewardsAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getRemainingTotalAmtFromOrderSummary
   * @Description : get the remaining total value from order summary
   * @params : None
   * @returns : None
   * */
  async getRemainingTotalAmtFromOrderSummary(blnIsRemainingAmountDisplayed) {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    let remainingTotalAmt = '$0.00';
    if (blnIsRemainingAmountDisplayed) {
      remainingTotalAmt = await orderSummaryEle.locator('li', { hasText: 'Remaining Total:' }).textContent();
    }
    remainingTotalAmt = remainingTotalAmt.replace('Remaining Total: ', '').replace('$', '').replace('CAD ', '').replace(/,/g, '');
    testReport.log('OrderSummary', `RemainingTotalAmt displayed in order summary: ${remainingTotalAmt}`);
    return remainingTotalAmt;
  }

  /**
   * @author: asoman
   * @function_Name : getRewardsRolloverMsgFromOrderSummary
   * @Description : assert the rewards message displayed in order summary
   * @params : None
   * @returns : None
   * */
  async getRewardsRolloverMsgFromOrderSummary(blnIsRewardsApplied) {
    if (blnIsRewardsApplied) {
      const rewardContent = await page.innerText(elements.reviewPage.rewardInfo);
      expect(rewardContent).toContain("Rewards don't roll over. To get the full benefit, spend your additional");
      testReport.log('OrderSummary', `Reward message displayed in order summary: ${rewardContent}`);
    }
  }

  /**
   * @author: asoman
   * @function_Name : verifyOrderSummary
   * @Description : validate order summary elements and prices
   * @params : None
   * @returns : None
   * */
  async verifyOrderSummary() {
    testReport.log('OrderSummary', `isMobile: ${this.isMobile}`);
    if (this.isMobile) {
      const linkText = await page.locator('.reveal-content-toggle.button-transparent').textContent();
      testReport.log('OrderSummary', linkText);
      if (linkText.includes('View details')) {
        testReport.log('OrderSummary', `Clicking on 'View Details in collapsed order summary`);
        await this.clickViewDetails();
      }
    }

    testReport.log('OrderSummary', 'Validating Order Summary Elements');
    await page.waitForLoadState();

    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    const merchandiseAmt = await this.getMerchTotalFromOrderSummary();
    const shippingHandlingAmt = await this.getShippingHandlingAmtFromOrderSummary();

    const blnIsShipDiscountApplied = await this.verifyShippingDiscountApplied();
    const shippingDiscountAmt = await this.getShippingDiscountAmtFromOrderSummary(blnIsShipDiscountApplied);

    let blnIsMerchDiscountApplied = false;
    const merchDiscountElementCount = await orderSummaryEle.locator('li.merchandise-discount').count();
    if (merchDiscountElementCount > 0) {
      blnIsMerchDiscountApplied = true;
    }
    const merchandiseDiscountAmt = await this.getMerchandiseDiscountAmtFromOrderSummary(blnIsMerchDiscountApplied);

    const taxAmt = await this.getTaxTotalFromOrderSummary();
    const orderTotalAmt = await this.getOrderTotalFromOrderSummary();

    const blnIsGiftBoxApplied = await this.verifyGiftBoxChargeApplied();
    const giftBoxAmt = await this.getGiftBoxTotalFromOrderSummary(blnIsGiftBoxApplied);

    const blnIsGiftCardApplied = await orderSummaryEle.locator('li', { hasText: 'Gift Card:' }).isVisible();
    const giftCardAmt = await this.getGiftCardTotalFromOrderSummary(blnIsGiftCardApplied);

    const blnIsRewardsApplied = await orderSummaryEle.locator('li', { hasText: 'Reward Certificates:' }).isVisible();
    const rewardsAmt = await this.getRewardsTotalFromOrderSummary(blnIsRewardsApplied);

    let calculatedOrderTotal =
      commonUtils.removeCommasFromCurrencyValue(merchandiseAmt) +
      commonUtils.removeCommasFromCurrencyValue(shippingHandlingAmt) +
      commonUtils.removeCommasFromCurrencyValue(merchandiseDiscountAmt) +
      commonUtils.removeCommasFromCurrencyValue(taxAmt) +
      commonUtils.removeCommasFromCurrencyValue(giftBoxAmt) +
      commonUtils.removeCommasFromCurrencyValue(shippingDiscountAmt);

    calculatedOrderTotal = parseFloat(calculatedOrderTotal).toLocaleString('en-US', { maximumFractionDigits: 2 });
    calculatedOrderTotal = parseFloat(commonUtils.removeCommasFromCurrencyValue(calculatedOrderTotal)).toFixed(2);
    testReport.log('OrderSummary', `calculatedOrderTotal: ${calculatedOrderTotal}`);

    const alternatePayment = parseFloat(commonUtils.removeCommasFromCurrencyValue(giftCardAmt)) + parseFloat(rewardsAmt);
    testReport.log('OrderSummary', `alternatePayment: ${alternatePayment}`);

    expect(orderTotalAmt).toContain(calculatedOrderTotal);

    const blnIsRemainingAmountDisplayed = await orderSummaryEle.locator('li', { hasText: 'Remaining Total:' }).isVisible();
    testReport.log('OrderSummary', `RemainingTotalAmt displayed: ${blnIsRemainingAmountDisplayed}`);

    if (blnIsRemainingAmountDisplayed) {
      const remainingTotalAmt = await this.getRemainingTotalAmtFromOrderSummary(blnIsRemainingAmountDisplayed);
      const eResult = parseFloat(orderTotalAmt) + parseFloat(alternatePayment);
      expect(parseFloat(remainingTotalAmt)).toEqual(parseFloat(eResult.toFixed(2)));
    }
    const isrewardContent = await page.locator(elements.reviewPage.rewardInfo).isVisible();
    testReport.log('OrderSummary', `RewardsContent displayed: ${isrewardContent}`);

    if (isrewardContent) {
      const rewardContent = await page.innerText(elements.reviewPage.rewardInfo);
      expect(rewardContent).toContain("Rewards don't roll over. To get the full benefit, spend your additional");
    }

    // TODO Determine where scenarioState is defined and how to change this logic. Currently it's breaking tests.
    // if(scenarioState && scenarioState.isDtpExemptionApplied){
    //   if(env.COUNTRY == "US"){
    //     expect(parseFloat(taxAmt)).toEqual(0.0);
    //     testReport.log(this.pageName, 'Confirmed Tax is 0 for US Sites');
    //   }
    //   else{
    //     testReport.log(this.pageName, 'Skipping 0 Tax check as country is not US');
    //   }
    // }
  }

  /**
   * @author: asoman
   * @function_Name : findCurrentCheckoutPage
   * @Description : to find current checkout page
   * @params : intiatedPage
   * @returns : None
   * */
  async findCurrentCheckoutPage(intiatedPage) {
    await expect(page.locator(elements.checkoutPage.lstCheckoutNavigationListByDataTestId)).toBeVisible({ timeout });
    const currentPageUrl = page.url();
    let currentPage = '';
    testReport.log(this.pageName, `From ${intiatedPage}, landed in checkout page: ${currentPageUrl}`);

    if (intiatedPage === 'checkoutLogin') {
      if (currentPageUrl.includes('shipping')) {
        currentPage = 'shippingPage';
        testReport.log(this.pageName, 'Confirmed no checkout pages bypassed');
      } else if (currentPageUrl.includes('payment')) {
        currentPage = 'paymentPage';
        testReport.log(this.pageName, `Checkout shipping page bypassed and ${currentPage} loaded`);
      } else if (currentPageUrl.includes('review')) {
        currentPage = 'reviewPage';
        testReport.log(this.pageName, `Checkout shipping and payment pages bypassed  and ${currentPage} loaded ~ express checkout scenario`);
      }
    }
    return currentPage;
  }

  /**
   * @author: asoman
   * @function_Name : forceNavigationToShipping
   * @Description : to navigate to shipping tab
   * @params : None
   * @returns : None
   * */
  async forceNavigationToShipping() {
    await expect(page.locator(elements.checkoutPage.lblCheckoutNavigationList)).toBeVisible({ timeout });
    await page.getByTestId(elements.checkoutPage.txtNavigationShippingGifting).click();
    testReport.log(this.pageName, 'Click on shipping and gifting link displayed in checkout breadcrumb');
  }

  /**
   * @author: asoman
   * @function_Name : closeSurveyPopupIfShown
   * @Description : to close survey popup if it appears
   * @params : None
   * @returns : None
   * */
  async closeSurveyPopupIfShown() {
    testReport.log(this.pageName, 'Close survey popup if shown');
    page.setDefaultNavigationTimeout(60000);
    await page.waitForLoadState('domcontentloaded');
    if (envUtils.site().includes('cb2')) {
      if (commonUtils.verifyIsMobile()) {
        testReport.log(this.pageName, 'Attempt closing referal and medalia popup for CB2 Mobile');
        await this.closeReferalPopup();
        await this.closeMedaliaPopup();
      } else {
        testReport.log(this.pageName, 'Attempt closing referal and medalia popup for CB2 Desktop');
        await this.closeMedaliaPopup();
        await this.closeReferalPopup();
      }
    } else {
      testReport.log(this.pageName, 'Attempt closing referal and medalia popup for Crate Desktop');
      await this.closeMedaliaPopup();
    }
  }

  /**
   * @author: sreerag
   * @function_Name : closeMedaliaPopup
   * @Description : close medalia popup
   * @params : None
   * @returns : None
   * */

  async closeMedaliaPopup() {
    testReport.log(this.pageName, 'Inside closing medalia popup');
    page.setDefaultNavigationTimeout(180000);
    const medaliaFrameLocator = page
      .frameLocator(elements.checkoutPage.frmFeedbackSurvey)
      .nth(0)
      .locator(elements.checkoutPage.btnCloseMedaliaPopup, { timeout: 50000 });
    try {
      await testReport.log(this.pageName, 'Checking whether medalia locator visible');
      await medaliaFrameLocator.waitFor({ state: 'visible', timeout: 18000 });
      if (await medaliaFrameLocator.isVisible({ timeout: 50000 })) {
        await testReport.log(this.pageName, 'MedaliaFrameLocator is visible. trying to close');
        await expect(medaliaFrameLocator).toBeVisible({ timeout: 50000 }); // wait up to 10 second
        const medaliaFrame = page.frameLocator(elements.checkoutPage.frmFeedbackSurvey).nth(0);
        await medaliaFrame.locator(elements.checkoutPage.btnCloseMedaliaPopup).click();
      }
    } catch (error) {
      await testReport.log(this.pageName, `Error. Medalia popup not dislayed`);
    }
  }

  /**
   * @author: sreerag
   * @function_Name : closeReferalPopup
   * @Description : close medalia popup
   * @params : None
   * @returns : None
   * */

  async closeReferalPopup() {
    const offerFrameLocator = page
      .frameLocator(elements.checkoutPage.frmReferalProgram, { timeout: 50000 })
      .locator(elements.checkoutPage.btnCloseReferalPopup, { timeout: 50000 });
    try {
      await offerFrameLocator.waitFor({ state: 'visible' });
    } catch (error) {
      await testReport.log(this.pageName, `Offer frame not dislayed`);
    }
    if (await offerFrameLocator.isVisible({ timeout: 50000 })) {
      testReport.log(this.pageName, 'offerFrameLocator is visible. trying to close');
      await expect(offerFrameLocator).toBeVisible({ timeout }); // wait up to 10 second
      const offerFrame = page.frameLocator(elements.checkoutPage.frmReferalProgram);
      await offerFrame.locator(elements.checkoutPage.btnCloseReferalPopup).click();
    }
  }

  /**
   * @author: amariappan
   * @function_Name : verifyFreeShippingPopup
   * @Description : check the content of free shipping popup and close popup
   * @params : None
   * @returns : None
   * */

  async verifyFreeShippingPopup(iWorldObj) {
    // Verifies Ships Free Popup
    const freeShipLinkCount = await page.getByRole('button', { name: /Ships Free/i }).count();
    const freeShipLink = env.FREE_SHIP_LINK;
    if (freeShipLinkCount > 0) {
      await page.getByRole('button', { name: /Ships Free/i }).click();
      testReport.log(this.pageName, 'Clicked on "Ships Free" Link');
    } else {
      await page.getByRole('button', { name: freeShipLink }).click();
      testReport.log(this.pageName, 'Clicked on "Free Shipping Eligible" Link');
    }
    await expect(page.locator(elements.cartPage.divPopupContainer)).toBeVisible({ timeout });
    const popupText = await page.innerText(elements.cartPage.divPopupContainer);

    if (iWorldObj.skuType === 'SKU_VENDOR_DROPSHIP') {
      expect(popupText).toContain(env.VDS_FREE_SHIPPING_MSG);
    } else {
      await testReport.log(this.pageName, `Item type is ${iWorldObj.skuType}`);
      if (env.FREE_SHIPPING_FLAG === 'true') {
        await testReport.log(this.pageName, `Free shipping enabled`);
        let freeShippingPopupContent;
        if (env.BRAND === 'Crate') {
          await expect(page.locator(elements.freeShippingPopup.hdrFreeShippingPopup)).toContainText(env.FREE_SHIPPING_POPUP_HEADER);
          const freeShippingPopupSubHeading = env.FREE_SHIPPING_POPUP_SUB_HEADER.replace('THRESHOLD', env.FREE_SHIPPING_THRESHOLD);
          await expect(page.locator(elements.freeShippingPopup.hdrSubFreeShippingPopup)).toContainText(freeShippingPopupSubHeading);
          freeShippingPopupContent = await this.replaceParameter();
          await expect(page.locator(elements.freeShippingPopup.msgFreeShippingPopup)).toContainText(freeShippingPopupContent);
        } else {
          await testReport.log(`Fake time :`, iWorldObj.fakeTime);
          const eTime = new Date(`${env.FREE_SHIPPING_END_DATE} 11:59 AM`);
          const timeDifference = eTime - iWorldObj.fakeTime;
          await testReport.log(`Fake Time : `, iWorldObj.fakeTime);
          await testReport.log(`End Time = `, eTime);
          if (timeDifference < 8640000) {
            // Checking the last day of promotion
            const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', 'today');
            await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
          } else if (timeDifference > 8640000 && timeDifference < 172800000) {
            // checking day before last day of promotion
            const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', 'tomorrow');
            await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
          } else {
            const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', env.FREE_SHIPPING_END_DATE.slice(0, -3));
            await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
          }
          const freeShippingPopupSubHeading = env.FREE_SHIPPING_POPUP_SUB_HEADER.replace('THRESHOLD', env.FREE_SHIPPING_THRESHOLD);
          await expect(page.locator(elements.freeShippingPopup.hdrCB2SubFreeShippingPopup)).toContainText(freeShippingPopupSubHeading);
          freeShippingPopupContent = await this.replaceParameter();
          await expect(page.locator(elements.freeShippingPopup.msgCB2FreeShippingPopup)).toContainText(freeShippingPopupContent);
        }
        await testReport.log(this.pageName, freeShippingPopupContent);
      }
    }
    await page.getByTitle('Close Popup').click();
  }

  /**
   * @author: amariappan
   * @function_Name : verifyVDSShippingPopup
   * @Description : check the content of VDS popup and close popup
   * @params : None
   * @returns : None
   * */

  async verifyVDSShippingPopup() {
    // Verifies Vendor shipping Popup
    await page.getByRole('button', { name: /Ships directly from vendor/i }).click();
    testReport.log(this.pageName, 'Clicked on "Ships directly from vendor" Link');
    await expect(page.locator(elements.cartPage.divPopupContainer)).toBeVisible({ timeout });
    const popupText = await page.innerText(elements.cartPage.divPopupContainer);
    expect(popupText).toContain(env.VDS_DIRECTLY_FROM_VENDOR_MSG);
    await page.getByTitle('Close Popup').click();
  }

  /**
   * @author: sreerag
   * @function_Name : navigateBackToCart
   * @Description : go back to cart from checkout pages
   * @params : None
   * @returns : None
   * */

  async navigateBackToCart() {
    await page.locator(this.lnkEditCart).click();
    await expect(page.locator(this.pageTitle)).toContainText(`Cart: `);
    await testReport.log(this.pageName, `Navigated back to Cart page`);
  }

  async setTimeMachineCookie(dateString, timeString) {
    const parts = dateString.split(',');
    const datePart = parts[1];
    const dateArray = datePart.split('/');
    let month = parseInt(dateArray[0], 10);
    let date = parseInt(dateArray[1], 10);
    const year = parseInt(dateArray[2], 10);

    // adding 6 hrs to time machine, 10 minute to time

    const time = commonUtils.addTime(timeString, 6, 10);
    const timeParts = timeString.split(' ');
    const timePart = timeParts[0];
    const timeArray = timePart.split(':');
    let hour = parseInt(timeArray[0], 10);
    hour += 1;

    if (hour > 12) {
      hour -= 12;
    }

    let minute = parseInt(timeArray[1], 10);
    minute += 10;

    const meridiem = timeParts[1];

    const fakeTimeCookieValue = `${month}%2f${date}%2f${year}+${hour}%3a${minute}%3a00+${meridiem}`;
    testReport.log(this.pageName, `FakeTime: ${month}%2f${date}%2f${year}+${hour}%3a${minute}%3a00+${meridiem}`);
    month = month.toString().padStart(2, '0');
    date = date.toString().padStart(2, '0');

    const timeMachineCookieValue = `Time=${year}-${month}-${date}T${time}Z`;
    testReport.log(this.pageName, `TimeMachine: Time=${year}-${month}-${date}T${time}Z`);

    const cookies = [
      {
        name: 'TimeMachine',
        value: timeMachineCookieValue,
        url: envUtils.baseURL(),
        secure: true
      },
      {
        name: 'FakeTime',
        value: fakeTimeCookieValue,
        url: envUtils.baseURL(),
        secure: true
      }
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const cookie of cookies) {
      // eslint-disable-next-line no-await-in-loop
      await page.context().addCookies([cookie]);
    }
    const fakeTime = new Date(`${month}/${date}/${year} ${timeString}`);
    await testReport.log(`Fake time object :`, fakeTime);
    return fakeTime;
  }

  async verifyShippingDiscountApplied() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    const shipDiscountElementCount = await orderSummaryEle.locator('li', { hasText: 'Shipping Discount:' }).count();
    let shippingDiscountFlag = false;
    if (shipDiscountElementCount > 0) {
      shippingDiscountFlag = true;
      await testReport.log(this.pageName, `Shipping Discount displayed in order summary`);
    }
    return shippingDiscountFlag;
  }

  async verifyGiftBoxChargeApplied() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    const giftBoxChargeElementCount = await orderSummaryEle.locator('li', { hasText: 'Gift Box:' }).count();
    let blnIsGiftBoxApplied = false;
    if (giftBoxChargeElementCount > 0) {
      blnIsGiftBoxApplied = true;
      await testReport.log(this.pageName, `GiftBox charge displayed in order summary`);
    }
    return blnIsGiftBoxApplied;
  }

  async verifyIfGiftBoxChargeDisplayed() {
    const orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(0);
    orderSummaryEle.locator('li', { hasText: 'Gift Box:' });
  }

  async replaceParameter() {
    let freeShippingPopupContent;
    freeShippingPopupContent = env.FREE_SHIPPING_POPUP_CONTENT.replace(/LINK/g, env.FREE_SHIP_LINK);
    freeShippingPopupContent = freeShippingPopupContent.replace(/THRESHOLD/g, env.FREE_SHIPPING_THRESHOLD);
    freeShippingPopupContent = freeShippingPopupContent.replace(/START_DATE/g, env.FREE_SHIPPING_START_DATE);
    freeShippingPopupContent = freeShippingPopupContent.replace(/END_DATE/g, env.FREE_SHIPPING_END_DATE);
    return freeShippingPopupContent;
  }

  async verifyShippingDiscountIsNotApplied() {
    const blnIsShipDiscountApplied = await this.verifyShippingDiscountApplied();
    expect(blnIsShipDiscountApplied).toBe(false);
    await testReport.log(`Shipping discount not applied in order summary`);
    return blnIsShipDiscountApplied;
  }

  async verifyFreeShippingLinkNotDisplayed() {
    const freeShipLink = env.FREE_SHIP_LINK;
    const freeShippingLinkCount = await page.getByRole('button', { name: freeShipLink }).count();
    expect(freeShippingLinkCount).toBe(0);
    await testReport.log(this.pageName, `Free shipping link is not getting displayed`);
  }

  async setPayPalAuthorizationOrigin(orderDetailsInfo, payPalAuthorizationOriginPage) {
    const orderDetailObject = orderDetailsInfo;
    orderDetailObject.payPalAuthorizationOriginPage = payPalAuthorizationOriginPage;
    return orderDetailObject;
  }

  async verifyCustomOrderMessagingOnCartPage(itemInfo) {
    const shippingMessages = page.locator('[data-testid="shipping-avail-messages"]');
    const firstMessage = shippingMessages.locator('.availability').nth(0);
    await this.verifyCustomOrderOptionsText(itemInfo, '.option-summary');
    await expect(firstMessage).toContainText('This item is made just for you');
  }

  async verifyCustomOptionOnShippingPage(itemInfo) {
    const shippingMethodLabel = await page.locator('[data-testid="ship-method-default"]').textContent();
    const scheduleMessage = await page.locator('.schedule-date').textContent();
    const selectedShippingMessage = await page.locator('.selected-shipping-message').textContent();
    await this.verifyCustomOrderOptionsText(itemInfo, '.product-summary-item-text');
    expect(await shippingMethodLabel.includes('In-Home Delivery')).toBe(true);
    expect(await scheduleMessage).toBe('We will contact you to schedule your delivery.');
    expect(await selectedShippingMessage.includes('Based on delivery to ZIP code ')).toBe(true);
    expect(await selectedShippingMessage.includes('This flat rate includes all furniture and applicable large items in your order.')).toBe(true);
  }

  async verifyCustomOptionOnReviewPage(itemInfo) {
    const customItemWarning = await page.locator('[data-testid="lbl-review-item-availability-msg-container"]').textContent();
    await this.verifyCustomOrderOptionsText(itemInfo, '.product-summary-item-text');
    expect(await customItemWarning).toContain('This item is made just for you');
  }

  async verifyCustomOrderMessaging(itemInfo) {
    const availabilityMessage = await page.locator('[data-testid="lbl-availability-msg"]').textContent();
    await this.verifyCustomOrderOptionsText(itemInfo, '.product-summary-item-text');
    expect(availabilityMessage.includes('This item is made just for you')).toBe(true);
  }

  async verifyCustomOrderOptionsText(itemInfo, optionsElementLocatorText) {
    const itemInfoJsonObj = JSON.parse(itemInfo);
    const { selectedOptionCategory } = itemInfoJsonObj;
    const selectedOptions = itemInfoJsonObj.selectedOption;
    const expectedOptionDescription = `${selectedOptionCategory}: ${selectedOptions}`.replace(/\u00A0/g, ' ');
    testReport.log(this.pageName, `Expected optionDescription: ${expectedOptionDescription}`);
    await expect(page.locator(optionsElementLocatorText).first()).toBeVisible({ timeout });

    const optionNamesOnCartPageCount = await page.locator(optionsElementLocatorText).count();

    let optionNamesOnCartPage;
    if (optionNamesOnCartPageCount > 1) {
      optionNamesOnCartPage = await page.locator(optionsElementLocatorText).nth(0).textContent();
      const optionNamesOnCartPage2 = await page.locator(optionsElementLocatorText).nth(1).textContent();
      expect(expectedOptionDescription).toContain(optionNamesOnCartPage.replace(/\u00A0/g, ' ').trim());
      expect(expectedOptionDescription).toContain(optionNamesOnCartPage2.replace(/\u00A0/g, ' ').trim());
    } else {
      optionNamesOnCartPage = await page.locator(optionsElementLocatorText).textContent();
      expect(expectedOptionDescription).toContain(optionNamesOnCartPage.replace(/\u00A0/g, ' ').trim());
    }
  }

  async fetchAvailabilityData() {
    /*
       fetch record from database

       //passing parameter
       const query = 'SELECT * FROM YourTable WHERE id = @id';
       const params = {
           id: { type: sql.Int, value: 1 }
       }

       //commented to avoid DB calls
       const queryString = (sqlData.availability.SQL_AVAILABILITY).replace('@queryParam', itemJson['skuNum'])
       testReport.log(this.pageName, 'SQL String to query the Database :: ' + queryString);
       const dbResult = await DBConnUtils(queryString);
       console.log(dbResult);
       var dbResultsJSON = JSON.parse(JSON.stringify(dbResult))
       var a = dbResultsJSON[0]
       testReport.log(this.pageName, 'ArrivesBy Date value from the Database :: ' + a['date_available']);
       */
  }

  async getPrice(priceElement) {
    const priceInfo = {};
    const skuPriceElement = priceElement;
    testReport.log(this.pageName, `Item unit price displayed is ->${await skuPriceElement.textContent()}`);
    const skuPriceElementText = await skuPriceElement.textContent();

    let skuPrice;
    // const nestedRegPriceElementCount = await skuPriceElement.locator('.regPrice').first().locator('.regPrice').count();
    const nestedRegPriceElementCount = await skuPriceElement.locator('.regPrice').first().count();

    if (nestedRegPriceElementCount > 0) {
      skuPrice = (await skuPriceElement.locator('.regPrice').first().textContent()).replace(/^\s+|\s+$/gm, '');
    } else {
      skuPrice = (await skuPriceElement.locator('.reg').first().textContent()).replace(/^\s+|\s+$/gm, '');
    }

    skuPrice = await this.removeCharsFromPrice(skuPrice);
    let skuSellingPrice = skuPrice;
    if (skuPriceElementText.includes('Sale')) {
      skuSellingPrice = await this.removeCharsFromPrice(await skuPriceElement.locator('.salePrice').textContent());
    } else if (skuPriceElementText.includes('Set Savings')) {
      skuSellingPrice = await this.removeCharsFromPrice(await skuPriceElement.locator('.salePrice').textContent());
    } else if (skuPriceElementText.includes('Clearance')) {
      skuSellingPrice = await this.removeCharsFromPrice(await skuPriceElement.locator('.salePrice').textContent());
    } else {
      skuPrice = await this.removeCharsFromPrice(skuPrice.replace(' reg.  ', ''));
      testReport.log(this.pageName, `Item On Sale/Clearance and salePrice/clearancePrice displayed is ->${skuPrice}`);
    }
    skuSellingPrice = skuSellingPrice.trim();
    testReport.log(this.pageName, `itemPrice ->${skuPrice}, sellingPrice ->${skuSellingPrice}`);
    priceInfo.skuPrice = skuPrice;
    priceInfo.skuSellingPrice = skuSellingPrice;
    return priceInfo;
  }

  async removeCharsFromPrice(inputPrice) {
    const monogramString = `includes ${env.MONOGRAMMING_FEE} personalization fee`;
    const price = inputPrice
      .replace(monogramString, '')
      .replace(/[a-z]/gi, '')
      .replace(/^\s+|\s+$/gm, '');
    return price;
  }

  async getMonogrammingData(selectedPersonalizationInfo, personalizationItemElements) {
    const personalizationInfo = {};
    const designInfo = selectedPersonalizationInfo.locator(personalizationItemElements);
    // eslint-disable-next-line no-await-in-loop
    for (let i = 0; i < (await designInfo.count()); i++) {
      const designElement = designInfo.nth(i);
      // eslint-disable-next-line no-await-in-loop
      const key = (await designElement.textContent()).split(':')[0].trim().toLowerCase().replace(/ /g, '_');
      // eslint-disable-next-line no-await-in-loop
      const value = await designElement.locator('span').textContent();
      personalizationInfo[key] = value;
    }
    return personalizationInfo;
  }

  async getStockStatus(availabilityMsg, arrivesByMessage) {
    let stockAvailability = '';
    if (arrivesByMessage.includes('take longer') || arrivesByMessage.includes('Purchase now') || availabilityMsg.includes('take longer')) {
      stockAvailability = 'backorder';
    }
    return stockAvailability;
  }

  async getPersonalizationStatus(personalizationReturnPolicyTextElement) {
    let isPersonalizedSku = false;
    if (await personalizationReturnPolicyTextElement.isVisible()) {
      const returnPolicyText = await personalizationReturnPolicyTextElement.first().textContent();
      testReport.log(this.pageName, `ReturnPolicyText displayed:: ${returnPolicyText}`);
      if (returnPolicyText.includes('Personalized')) {
        isPersonalizedSku = true;
        testReport.log(this.pageName, `Personalized SKU:: ${isPersonalizedSku}`);
      }
    }
    return isPersonalizedSku;
  }

  async verifyPersonalizationInfo(pageName, selectedPersonalizationInfoElement, expectedPersonalizationInfo) {
    // const details = JSON.parse(expectedPersonalizationInfo);
    const details = expectedPersonalizationInfo;
    testReport.log(this.pageName, `Monogram Details found in ${pageName},${details}`);
    await page.waitForLoadState();
    const dataKey = Object.keys(expectedPersonalizationInfo);
    await Promise.all(
      dataKey.map(async (ele, i) => {
        const monogramItemElements = await selectedPersonalizationInfoElement.textContent();
        expect(monogramItemElements).toContain(details[dataKey[i]]);
        testReport.log(this.pageName, `Expect ${monogramItemElements} to contain, ${details[dataKey[i]]}`);
      })
    );
  }
}

module.exports = { CheckoutPage };
