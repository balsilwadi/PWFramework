/* eslint-disable playwright/no-element-handle */
/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/checkout-elements');
// const repoCommonElementshome = require('../elements/browse-path-elements');
const env = require('../../../support/env/env');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class CartPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : verifyCartSummary
   * @Description : To verify cart summary and to verify various links are present
   * @params : None
   * @returns : None
   * */

  async verifyCartSummary() {
    // Making sure Marchandise total is non-zero value
    await page.customWait(repoCommonElements.cartPage.txtMarchTotal, 'txtMarchTotal');
    let merchandise = page;
    testReport.log(this.pageName, `Merchandise Total - ${merchandise}`);
    await expect(merchandise).not.toHaveText('$0.00');
    testReport.log(this.pageName, `Assert -> Merchandise Total is a Non zero value - ${merchandise}`);

    // Making sure Estimated Shipping & Handling Fee is non-zero value
    let estShippingHandling = await page.innerText(repoCommonElements.cartPage.txtShippingTotal);
    testReport.log(this.pageName, `Merchandise Total - ${merchandise}`);
    expect(estShippingHandling).not.toEqual('$0.00');
    testReport.log(this.pageName, `Assert -> Estimated Shipping & Handling Fee is a Non zero value - ${estShippingHandling}`);

    // Making sure Estimated Tax is non-zero value
    let estTax = await page.innerText(repoCommonElements.cartPage.txtTaxTotal);
    testReport.log(this.pageName, `Estimated Tax - ${estTax}`);
    expect(estTax).not.toEqual('$0.00');
    testReport.log(this.pageName, `Assert -> Estimated Tax is a Non zero value - ${estTax}`);

    // Making sure Order Total is non-zero value
    let ordtotal = await page.innerText(repoCommonElements.cartPage.txtOrderTotal);
    testReport.log(this.pageName, `Order Total - ${ordtotal}`);
    expect(ordtotal).not.toEqual('$0.00');
    testReport.log(this.pageName, `Assert -> Order Total is a Non zero value - ${ordtotal}`);

    // Taking integer part of Marchandise total, est Shipping Handling, estTax & ordtotal to calculate order total manually
    merchandise = parseFloat(merchandise.replace('$', ''));
    estShippingHandling = parseFloat(estShippingHandling.replace('$', ''));
    estTax = parseFloat(estTax.replace('$', ''));
    ordtotal = parseFloat(ordtotal.replace('$', ''));
    const calculatedOrderTotal = parseFloat(merchandise + estShippingHandling + estTax).toFixed(2);
    // Checking of calculated order total matches with the displayed order total in UI
    expect(calculatedOrderTotal.toString()).toEqual(ordtotal.toString());
    testReport.log(this.pageName, `Assert -> Calculated OrderTotal ${calculatedOrderTotal} matches with the displayed ${ordtotal}`);

    // Checking if T&C text is present
    const byContinuingToCheckoutText = await page.innerText(repoCommonElements.cartPage.txtTermsOfUse);
    expect(byContinuingToCheckoutText).to.contain('By continuing to Checkout, you are agreeing to our');
    testReport.log(this.pageName, `Assert -> Terms and conditions text ${byContinuingToCheckoutText}`);

    // Checking if Privacy policy link is present
    await expect(page.locator(repoCommonElements.cartPage.lnkPrivacyPolicy)).toBeVisible();
    testReport.log(this.pageName, 'Assert -> Privacy policy link exists');

    // Checking if PayPal payment button is present
    await expect(page.locator(repoCommonElements.cartPage.btnPaypal)).toBeVisible();
    testReport.log(this.pageName, 'Assert -> PayPal payment button exists');

    // Checking if Venmo payment button is present
    await expect(page.locator(repoCommonElements.cartPage.btnVenmo)).toBeVisible();
    testReport.log(this.pageName, 'Assert -> Venmo payment button exists');
  }

  /**
   * @function_Name : increaseQtyOfItem
   * @Description : To increase item quantity by clicking '+' icon
   * @params : index(Index of '+' button displayed)
   * @returns : None
   * */

  async increaseQtyOfItem(index) {
    await page.customWait(repoCommonElements.cartPage.btnQtyIncrease, 'btnQtyIncrease');
    await page.customClick(`${repoCommonElements.cartPage.btnQtyIncrease}[${index}]`, 'btnQtyIncrease');
    testReport.log(this.pageName, 'Cart quantity increased by 1 by clicking on "+" button on CartPage');
  }

  /**
   * @function_Name : clickSaveForLater
   * @Description : To click SAVE FOR LATER button button
   * @params : index(Index of SAVE FOR LATER button on CartPage)
   * @returns : None
   * */

  async clickSaveForLater(index) {
    await page.customWait(repoCommonElements.cartPage.btnSaveForLater, 'btnSaveForLater');
    await page.customClick(`${repoCommonElements.cartPage.btnSaveForLater}[${index}]`, 'btnSaveForLater');
    testReport.log(this.pageName, 'Click on SAVE FOR LATER button on CartPage');
  }

  /**
   * @function_Name : clickMoveToCart,clickCheckoutNow,clickGuestCheckout
   * @Description : To click on MOVE TO CART , to click  CHECKOUT NOW button , to click on Guest Checkout button
   * @params : None
   * @returns : None
   * */

  async clickMoveToCart() {
    await page.customWait(repoCommonElements.cartPage.btnMoveToCart, 'btnMoveToCart');
    await page.customClick(repoCommonElements.cartPage.btnMoveToCart, 'btnMoveToCart');
    testReport.log(this.pageName, 'Click on MOVE TO CART button on CartPage');
  }

  // Method to click on CHECKOUT NOW button
  async clickCheckoutNow() {
    await page.customWait(repoCommonElements.cartPage.btnProceedToChkout, 'btnProceedToChkout');
    await page.customClick(repoCommonElements.cartPage.btnProceedToChkout, 'btnProceedToChkout');
    testReport.log(this.pageName, 'Click on CHECKOUT NOW button on CartPage');
  }

  // Method to click on Guest Checkout button
  async clickGuestCheckout() {
    await page.customWait(repoCommonElements.cartPage.btnGuestChkout, 'btnGuestChkout');
    await page.customClick(repoCommonElements.cartPage.btnGuestChkout, 'btnGuestChkout');
    testReport.log(this.pageName, 'Click on GUEST CHECKOUT button on CartFlyout');
  }

  /**
   * @function_Name : clickRemoveItem,emptyCart
   * @Description : To remove cart items and to empty the cart if it has any items
   * @params : index(Index of Remove button on CartPage)
   * @returns : None
   * */

  async clickRemoveItem(index) {
    const skuNum = await page.locator(repoCommonElements.cartPage.lblCartSkuNum).nth(index).textContent();
    await page.customWait(repoCommonElements.cartPage.btnRemoveCartItem, 'btnRemoveCartItem');
    await page.customClick(`${repoCommonElements.cartPage.btnRemoveCartItem}[${index + 1}]`, 'btnRemoveCartItem');
    testReport.log(this.pageName, `Removed Item with ${skuNum} `);
  }

  // If cart has any item(s) then empty the cart
  async emptyCart() {
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    const cartCount = await this.checkCartHasItems();
    // clicking on all the REMOVE buttons
    for (let item = 1; item <= cartCount; item++) {
      await this.clickRemoveItem(0);
      await page.customClick(repoCommonElements.cartPage.btnItemHasBeenRemovedClose, 'btnItemHasBeenRemovedClose');
    }
    testReport.log(this.pageName, 'All cart items are removed');
  }

  /**
   * @function_Name : navigateToCartPage
   * @Description : To navigate to the cart page
   * @params : None
   * @returns : None
   * */

  async navigateToCartPage() {
    await page.goto(`${env.BASE_URL}/checkout/cart`, { timeout: global.large_wait });
  }

  /**
   * @function_Name : checkCartHasItems
   * @Description : To get number of items of cart
   * @params : None
   * @returns :Total count of cart
   * */

  async checkCartHasItems() {
    let cartItemCount = 0;
    cartItemCount = (await page.$$(repoCommonElements.cartPage.arrayCartItemElements)).length;
    testReport.log(this.pageName, `Cart has '${cartItemCount}' items`);
    return cartItemCount;
  }
}
module.exports = { CartPage };
