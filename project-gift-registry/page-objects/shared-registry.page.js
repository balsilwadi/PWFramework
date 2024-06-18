const { expect } = require('@playwright/test');
const sharedRegistryElements = require('../elements/shared-registry-elements');
const { ReportUtils } = require('../../support/utils/report-utils');
const { CommonUtils } = require('../../support/utils/common-utils');
const { timeout } = require('../../configs/config');

const testReport = new ReportUtils();
const commonUtils = new CommonUtils();
class SharedRegistryPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : addGiftCardToCart
   * @Description : add a gift card to cart from a shared registry page
   * @params : giftCardValue - the value of the gift card to be purchased without a currency symbol
   * @returns : None
   * */
  async addGiftCardToCart(giftCardValue) {
    const giftCardBlock = page.locator('[data-card-type="gift card"]');
    await giftCardBlock.locator('#add-to-cart-input').click();
    await giftCardBlock.locator('#add-to-cart-input').fill(giftCardValue, { delay: 100 });
    await page.getByRole('button', { name: /Contribute/i }).click();
    // await page.click(sharedRegistryElements.txtGiftCardAmountToPurchase);
    // await page.fill(sharedRegistryElements.txtGiftCardAmountToPurchase, giftCardValue, { delay: 100 });
    // await page.click(sharedRegistryElements.giftRegistryAddToCartTrigger);
    if (commonUtils.verifyIsMobile()) {
      await expect(page.locator(sharedRegistryElements.chkFlyout)).toBeVisible({ timeout });
    } else {
      await page.click(sharedRegistryElements.CHECKOUTNOW_BUTTON);
    }
    await page.waitForLoadState('domcontentloaded');
  }

  async handlePopUp() {
    try {
      const popupCloseBtn = page.locator('#popup-close');
      if (popupCloseBtn.count() > 0) {
        await popupCloseBtn.click();
      }
    } catch (e) {
      testReport.log(this.pageName, `Error locating popup close button, moving on: ${e}`);
    }
  }

  async compareGRImages(skuIdentifier, pageName) {
    // eslint-disable-next-line playwright/no-element-handle
    const element = await page.$('.gift-card-list-item-thumbnail > img');
    await element.scrollIntoViewIfNeeded();
    const referenceImagePath = `../../project-checkout/page-objects/datafiles/images/${skuIdentifier}_${pageName}.png`;
    await commonUtils.visualComparison(pageName, element, referenceImagePath);
  }

  async validateGiftCardImage(giftCardType) {
    await this.compareGRImages(giftCardType, this.pageName);
  }

  async addFirstItemToCart() {
    // const btnAddToCart = await page.locator(sharedRegistryElements.btnAddToCart).nth(0);
    // await btnAddToCart.click();

    /* temporary fix to make checkout work */
    await page
      .getByRole('button', { name: /Add to Cart/i })
      .nth(0)
      .click();
  }

  async addSecondItemToCart() {
    // const btnAddToCart = await page.locator(sharedRegistryElements.btnAddToCart).nth(1);
    // await btnAddToCart.click();

    /* temporary fix to make checkout work */
    await page
      .getByRole('button', { name: /Add to Cart/i })
      .nth(1)
      .click();
  }

  async addGiftCardItemToCart() {
    const btnAddToCart = page.getByTestId(sharedRegistryElements.btnGiftCardAddToCart).nth(0);
    await btnAddToCart.click();
  }

  async closeChkoutFlyout() {
    let btnClose;
    if (commonUtils.verifyIsMobile()) btnClose = page.locator(sharedRegistryElements.btnCloseChkFlyoutMobile);
    else btnClose = page.locator(sharedRegistryElements.btnCloseChkFlyout);
    await btnClose.click();
  }

  async clickCheckoutNow(itemType) {
    if (itemType === 'MTO') {
      testReport.log(this.pageName, `Shared Registry Flyout ByPassed. ItemType was ${itemType}`);
    } else {
      if (commonUtils.verifyIsMobile()) await page.locator(sharedRegistryElements.btnCheckoutMobile).click();
      else await page.locator(sharedRegistryElements.CHECKOUTNOW_BUTTON).click();
      testReport.log(this.pageName, 'Clicked CHECKOUT NOW button from Shared Registry Flyout');
    }
  }
}

module.exports = { SharedRegistryPage };
