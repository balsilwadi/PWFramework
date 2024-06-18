const { expect } = require('@playwright/test');

const { ReportUtils } = require('../../support/utils/report-utils');
const el = require('../elements/elements');

const testReport = new ReportUtils();

const { CartIcon, CartProductQtyTestId, CartTextMessageGuestMode } = el.HOMEPAGE_HEADER;

class HeaderCartIconHelper {
  pageName = this.constructor.name;

  /**
   * Hovers or Clicks on Cart Icon
   *
   * @param {boolean} isMobile - Indicates whether the execution is on a mobile device.
   * @author [Emmanuel Miller]
   */
  async hoverCartIcon(isMobile, shouldClickCartIcon = true) {
    const cartIconLocator = await this.getCartIconLocator(isMobile, CartIcon);

    await cartIconLocator.waitFor('visible', { timeout: 12000 });
    await expect(cartIconLocator).toBeVisible();

    if (isMobile) {
      if (shouldClickCartIcon) {
        await cartIconLocator.click({ delay: 300 });
      }
    } else {
      await cartIconLocator.hover({ delay: 300 });
    }
  }

  /**
   * Verifies the list of items in the cart, optionally checking for specific SKUs.
   *
   * @param {boolean} isMobile - Indicates whether the execution is on a mobile device.
   * @param {Array} skus - An array of SKUs to check in the cart (null for no specific SKUs).
   * @author [Emmanuel Miller]
   */
  async verifyListOfItems(isMobile, skus = null, quantity = 0) {
    const shouldClickCartIcon = false;
    await this.hoverCartIcon(isMobile, shouldClickCartIcon);

    if (skus === null) {
      const cartItems = await page.getByTestId(CartProductQtyTestId).count();

      expect(cartItems).toBe(0);
    } else {
      const loggedSkus = [];

      const productQtySelectors = skus.map((sku) => {
        const selector = `[data-testid="${CartProductQtyTestId}"]:has-text("Qty: ${quantity}")`;

        const skuToLog = { sku, quantity };
        loggedSkus.push(skuToLog);

        return selector;
      });

      loggedSkus.forEach((skuToLog) => testReport.log(this.pageName, `THE SKU ${skuToLog.sku} HAS ADDED QTY OF ${parseInt(skuToLog.quantity, 10) + 1}`));

      const productQtyElements = await Promise.all(productQtySelectors.map((selector) => page.locator(selector).first()));

      await Promise.all(productQtyElements.map((element) => expect(element).toBeHidden()));
    }
  }

  /**
   * Verifies the guest view of the cart, checking for the missing items message.
   *
   * @throws {Error} - If the guest view cart flyout or message is not found.
   * @author [Emmanuel Miller]
   */
  async verifyGuestView() {
    try {
      const cartGuestModeMessage = 'Are you missing items in your cart?';
      const guestViewCartFlyout = page.getByTestId(CartIcon).getByTestId('flyout');

      // Check if the guest view cart flyout is visible
      await expect(guestViewCartFlyout).toBeVisible({ timeout: 20000 });
      testReport.log(this.pageName, 'GUEST VIEW CART FLYOUT IS VISIBLE');

      const cartTextMsg = guestViewCartFlyout.getByTestId(CartTextMessageGuestMode);

      // Check if the guest view cart message is present
      await expect(cartTextMsg).toContainText(cartGuestModeMessage, { timeout: 20000 });
      testReport.log(this.pageName, 'GUEST VIEW CART MESSAGE PRESENT');
    } catch (error) {
      testReport.log(this.pageName, `Error in verifyGuestView: ${error.message}`);
      throw error; // Rethrow the error to indicate that it was not successfully handled
    }
  }

  /**
   * Gets the Locator for the Cart Icon based on mobile or desktop view.
   *
   * @param {boolean} isMobile - Indicates whether the execution is on a mobile device.
   * @param {string} cartContainer - The data-testid of the cart container.
   * @returns {Locator} - The Locator for the cart icon.
   * @throws {Error} - If the cart icon is not found.
   * @author [Emmanuel Miller]
   */
  async getCartIconLocator(isMobile, cartContainer) {
    try {
      const containerLocator = page.getByTestId(cartContainer);
      const roleOrTestId = isMobile ? 'button' : 'anchor-link';
      const cartIconLocator = isMobile ? containerLocator.getByTestId(roleOrTestId).first() : containerLocator.getByTestId(roleOrTestId).first();

      // Check if the cart icon locator is successfully found
      if (!cartIconLocator) {
        testReport.log(this.pageName, `Unable to find the cart icon with role "${roleOrTestId}" or data-testid "${roleOrTestId}"`);
      }

      return cartIconLocator;
    } catch (error) {
      testReport.log(this.pageName, `Error in getCartIconLocator: ${error.message}`);
      throw error;
    }
  }
}

module.exports = { HeaderCartIconHelper };
