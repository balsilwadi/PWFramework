/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const { Promise } = require('mssql');

const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
// eslint-disable-next-line import/no-restricted-paths
const { ProductPage } = require('../../../../project-browse-product/page-objects/pages/product/product.page');

const { Order } = require('../../datafiles/order');
const elements = require('../../elements/elements');
const testData = require('../../datafiles/testdata');
const env = require('../../../../support/env/env');
// eslint-disable-next-line import/no-restricted-paths
const { CheckoutPage } = require('../common/checkout.page');
const { timeout } = require('../../../../configs/config');

const commonUtils = new CommonUtils();
const testReport = new ReportUtils();
const productPage = new ProductPage();

class CartPage extends CheckoutPage {
  constructor() {
    super();
    this.isMobile = commonUtils.verifyIsMobile();
    this.pageName = 'CartPage';
    this.dtpPromoText = 'Trade Program discount has been applied.';
    this.cartLineItemRow = 'cart-product-line-item-row';
    this.merchandiseDiscountAmt = 'merchandiseDiscount-amt';
    this.shippingDiscountAmt = 'shippingDiscount-amt';
    this.disabledSaveForLater = '.save-for-later.button-transparent.button-saveforlater.disabled';
  }

  pageName = this.constructor.name;

  selectedOption = '';

  /**
   * @author: asoman
   * @function_Name : verifyCartPageIsLoaded
   * @Description : Verify whether cart page is loaded
   * @params : None
   * @returns : None
   * */

  async verifyCartPageIsLoaded() {
    await page.waitForLoadState('domcontentloaded', { timeout });
    const cartSkuCount = page.locator(elements.cartPage.lblCartSkuCount);
    // await cartSkuCount.waitFor({ visibility: 'visible' });
    await expect(cartSkuCount).toBeVisible({ timeout });

    const cartUrlString = '/checkout/cart|Checkout/Cart';
    expect(page.url({ timeout })).toMatch(new RegExp(cartUrlString));
    testReport.log(this.pageName, `Cart page loaded, url contains${cartUrlString}`);
  }

  /**
   * @author: nsukhadia
   * @function_Name : cartPageBasicVerification
   * @Description : Verify merchandise total is not ZERO
   * @params : None
   * @returns : None
   * */

  async cartPageBasicVerification() {
    const merchandise = page.getByTestId('total-amt').getByTestId('formatted-price');
    expect(await merchandise).not.toEqual('$0.00');
    testReport.log(this.pageName, 'Verified merchandise total is not ZERO');
  }

  /**
   * @author: asoman
   * @function_Name : verifyCartProductDetails
   * @Description : Verify the added product details in the cart
   * @params : iWorld object array from the add to cart steps
   * @returns : None
   * */

  async verifyCartProductDetails(objItemDetails) {
    // wait for the cart page to load
    await this.verifyCartPageIsLoaded();

    // verify the number of items added to cart
    const intCartItemCount = objItemDetails.length;
    await testReport.log(this.pageName, ` Added ${intCartItemCount} to cart`);
    const strCartItemCount = page.locator(elements.cartPage.lblCartSkuCount);
    await expect(strCartItemCount).toContainText(`${intCartItemCount} item`, { timeout });
    testReport.log(this.pageName, `Cart page is displayed with ${strCartItemCount} item(s)`);

    // const cartLineItemElementsArray = await page.$$(elements.cartPage.arrayCartItemElements);
    const cartLineItemElementsArray = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);

    // exit if cart count is zero
    if (intCartItemCount === 0) return;

    // iterate each item to make sure the item details(title, sku#, price, availability and arrives) are displayed correctly
    await Promise.all(
      cartLineItemElementsArray.map(async (ele, i) => {
        const lineItemDetailsJson = JSON.parse(objItemDetails[i]);
        const { isPersonalizedSku } = lineItemDetailsJson;

        const productList = page.getByTestId('cart-product-line-item-row').nth(i);

        const eleSkuTitle = productList.locator(elements.cartPage.lblCartSkuDescription);
        await this.assertItemTitle(eleSkuTitle, lineItemDetailsJson.skuTitle);

        const eleSkuNum = productList.locator(elements.cartPage.lblCartSkuNum);
        await this.assertItemNum(eleSkuNum, lineItemDetailsJson.skuNum);

        const eleSkuPrice = productList.locator(elements.cartPage.lblCartSkuPrice);
        await this.assertItemPrice(eleSkuPrice, lineItemDetailsJson.skuPrice);

        if (!isPersonalizedSku) {
          const eleSkuAvailabilityMsg = productList.locator(elements.cartPage.lblCartAvailabilityMsg);
          await this.assertAvailabilityMsg(eleSkuAvailabilityMsg, lineItemDetailsJson.availabilityMsg);
        }

        const eleSkuArrivesByMsg = productList.locator(elements.cartPage.lblArrivesByMessage);
        await this.assertSkuArrivesByMsg(eleSkuArrivesByMsg, lineItemDetailsJson.arrivesByMessage);

        testReport.log(this.pageName, 'Assert -> Remove Item option is present');
        const btnRemove = productList.locator(elements.cartPage.btnRemove);
        await this.verifyRemoveItemLink(btnRemove);

        // const rdoShipping = page.locator(elements.cartPage.lblShippingDeliveryMethod).nth(i);
        const rdoShipping = productList.getByTestId('ship-radio-btn');
        await this.verifyItemLevelShippingOption(rdoShipping);

        testReport.log(this.pageName, 'Assert -> Save For Later option is present');
        const btnSaveForLater = productList.locator(elements.cartPage.btnSaveForLater);
        await this.verifySaveForLaterLink(isPersonalizedSku, btnSaveForLater);

        if (isPersonalizedSku) {
          this.verifyMonogramDetails('Cart', objItemDetails[i]);
        }
      })
    );
  }

  /**
   * @author: asoman
   * @function_Name : assertItemTitle
   * @Description : verify the product description matches with what we received from PDP
   * @params : sku description element text, expected title name as we found in PDP
   * @returns : None
   * */
  async assertItemTitle(skuTitleElement, expectedTitle) {
    testReport.log(this.pageName, 'Validating the Item Description');
    const skuTitleElementText = await skuTitleElement.textContent();
    commonUtils.validateCartElementsIgnoringCase(this.pageName, skuTitleElementText, expectedTitle);
  }

  /**
   * @author: asoman
   * @function_Name : assertItemNum
   * @Description : verify the product number matches with what we received from PDP
   * @params : sku number element text, expected sku number as we found in PDP
   * @returns : None
   * */
  async assertItemNum(skuNumElement, expectedItemNum) {
    testReport.log(this.pageName, 'Validating the Item Number');
    const skuNumElementText = await skuNumElement.textContent();
    commonUtils.validateCartElementsIgnoringCase(this.pageName, skuNumElementText, expectedItemNum);
  }

  /**
   * @author: asoman
   * @function_Name : assertItemPrice
   * @Description : verify the product price matches with what we received from PDP
   * @params : sku price element text, expected sku price as we found in PDP
   * @returns : None
   * */
  async assertItemPrice(skuPriceElement, expectedItemPrice) {
    testReport.log(this.pageName, 'Validating the Item Price');
    const skuPriceElementText = await skuPriceElement.textContent();
    commonUtils.validateCartElementsIgnoringCase(this.pageName, skuPriceElementText, expectedItemPrice);
  }

  /**
   * @author: asoman
   * @function_Name : assertAvailabilityMsg
   * @Description : verify the product availability matches with what we received from PDP
   * @params : sku availability element text, expected availability as we found in PDP
   * @returns : None
   * */
  async assertAvailabilityMsg(availabilityMsgElement, expectedAvailabilityMsg) {
    testReport.log(this.pageName, 'Validating the Item availabilityMsg');
    let availabilityMsgElementText = await availabilityMsgElement.textContent();
    availabilityMsgElementText = availabilityMsgElementText.replace(/&nbsp;/g, '');
    if (availabilityMsgElementText.includes('made just for you')) {
      await expect(availabilityMsgElement).toContainText(expectedAvailabilityMsg);
      testReport.log(this.pageName, `Assertion -> ActualValue:: ${availabilityMsgElementText}matches with Expected:: ${expectedAvailabilityMsg}`);
    } else {
      commonUtils.validateCartElementsIgnoringCase(this.pageName, availabilityMsgElementText, expectedAvailabilityMsg);
    }
  }

  /**
   * @author: asoman
   * @function_Name : assertSkuArrivesByMsg
   * @Description : verify the arrives message matches with what we received from PDP
   * @params : arrives message element text, expected arrives msg(if available) as we found in PDP
   * @returns : None
   * */
  async assertSkuArrivesByMsg(skuArrivesByMsgElement, expectedArrivesByMsg) {
    testReport.log(this.pageName, 'Validating the Item skuArrivesByMsg');
    const skuArrivesByMsgElementText = await skuArrivesByMsgElement.textContent();
    commonUtils.validateCartElementsIgnoringCase(this.pageName, skuArrivesByMsgElementText, expectedArrivesByMsg);
  }

  /**
   * @author: asoman
   * @function_Name : verifyRemoveItemLink
   * @Description : verify remove link is present
   * @params : remove element
   * @returns : None
   * */
  async verifyRemoveItemLink(btnRemove) {
    await expect(await btnRemove).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Remove button displayed at line item level');
  }

  /**
   * @author: asoman
   * @function_Name : verifySaveForLaterLink
   * @Description : verify save for later link is present
   * @params : save for later element
   * @returns : None
   * */
  async verifySaveForLaterLink(isPersonalizedSku, btnSaveForLater) {
    const classValueOfElement = await btnSaveForLater.getAttribute('class');
    testReport.log(this.pageName, `classValue of saveForLater button displayed at line item level${classValueOfElement}`);
    if (isPersonalizedSku) {
      await expect(btnSaveForLater).toHaveClass(/disabled/);
      testReport.log(this.pageName, 'disabled saveForLater button is displayed');
    } else {
      await expect(btnSaveForLater).not.toHaveClass(/disabled/);
      testReport.log(this.pageName, 'enabled saveForLater button displayed at line item level');
    }
  }

  /**
   * @author: asoman
   * @function_Name : verifySaveForLaterLink
   * @Description : verify save for later link is present
   * @params : save for later element
   * @returns : None
   * */
  async verifyItemLevelShippingOption(rdoShipping) {
    await expect(await rdoShipping).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Assert -> Shipping option is present');
  }

  /**
   * @author: asoman
   * @function_Name : launchZipCodePopUp
   * @Description : Launch the zipcode popup, verify contents
   * @params : zipCode
   * @returns : None
   * */
  async launchZipCodePopUp() {
    await expect(page.locator(elements.cartPage.lnkZipCode)).toBeVisible({ timeout });
    await page.locator(elements.cartPage.lnkZipCode).click();

    /*
    const zipCodeLocator = page.getByRole('button', { name: /ZIP Code/i });
    const postalCodeLocator = page.getByRole('button', { name: /Postal Code/i });

    if (env.EXEC_SITE.includes('can')) {
      await postalCodeLocator.click();
    } else {
      await zipCodeLocator.click();
    }
    */

    await page.waitForLoadState('domcontentloaded');
    testReport.log(this.pageName, 'Click on the zipcode link in cart order summary');
    await expect(page.locator(elements.cartPage.txtZipCode)).toBeVisible({ timeout: 180000 });
  }

  async enterAndSubmitZipcodeOnCartPage(zipCodeType) {
    await this.launchZipCodePopUp();
    await this.enterZipCode(env[zipCodeType] || env.zipCode);
    await this.submitZipCode(env[zipCodeType] || env.zipCode);
  }

  /**
   * @author: asoman
   * @function_Name : enterZipCode
   * @Description : Enter zipcode/Postal code
   * @params : zipCode
   * @returns : None
   * */

  async enterZipCode(zipCode) {
    await page.click(elements.cartPage.txtZipCode, zipCode, { delay: 100 });
    await page.fill(elements.cartPage.txtZipCode, zipCode, { delay: 100 });
    testReport.log(this.pageName, `Entering zipcode ${zipCode} in zipcode popup`);
  }

  /**
   * @author: asoman
   * @function_Name : submitZipCode
   * @Description : Click on submit zipcode
   * @params : None
   * @returns : None
   * */

  async submitZipCode(zipCode) {
    await page.locator(elements.cartPage.btnSubmitZipCode).click();
    let zipCodeTextDesc = 'ZIP Code';
    if (env.EXEC_SITE.includes('can')) {
      zipCodeTextDesc = 'Postal Code';
    }
    await expect(page.getByText(`Showing availability for ${zipCodeTextDesc}: ${zipCode}`)).toBeVisible({ timeout });

    testReport.log(this.pageName, 'Submit zipcode in zipcode popup to re-evaluate the cart');
    await expect(page.locator('.availability-zip')).toBeVisible({ timeout });
    expect(await page.getByTestId('lnk-zip-code').first().textContent()).toContain(zipCode);
    const zipCodeLinkText = await page.locator('.availability-zip').textContent();
    testReport.log(this.pageName, `Zipcode link text after submit -> ${zipCodeLinkText}`);
  }

  async submitZipCodeIgnoreError(zipCode) {
    await page.locator(elements.cartPage.btnSubmitZipCode).click();
    let zipCodeTextDesc = 'ZIP Code';
    if (env.EXEC_SITE.includes('can')) {
      zipCodeTextDesc = 'Postal Code';
    }
    await page.waitForLoadState('domcontentloaded');

    let successMessage;
    try {
      successMessage = await expect(page.getByText(`Showing availability for ${zipCodeTextDesc}: ${zipCode}`)).toBeVisible({ timeout });
    } catch (error) {
      // Handle any errors or exceptions here
      testReport.log(this.pageName, `Error occurred:${error}`);
      successMessage = null;
    }

    testReport.log(this.pageName, `Zipcode text updated - ${successMessage}` === null);

    if (!successMessage) {
      const zipCodeErrorText = await page.locator('#zipcode-error-msg').textContent();
      testReport.log(this.pageName, `ERROR: Zipcode ${zipCode} not accepted -> ${zipCodeErrorText}`);
      await page.getByRole('button', { name: 'Cancel' }).click();
    } else {
      await expect(page.getByText(`Showing availability for ${zipCodeTextDesc}: ${zipCode}`)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Submit zipcode in zipcode popup to re-evaluate the cart');
      await expect(page.locator('.availability-zip')).toBeVisible({ timeout });
      expect(await page.getByTestId('lnk-zip-code').first().textContent()).toContain(zipCode);
      const zipCodeLinkText = await page.locator('.availability-zip').textContent();
      testReport.log(this.pageName, `Zipcode link text after submit -> ${zipCodeLinkText}`);
    }
  }

  async verifyMTOMessaging() {
    const verifyMTOTextContent = async (txtContent) => {
      const mtoTextContent = await page.locator(elements.cartPage.lblShippingAvailabilityMessage).nth(0).textContent();
      expect(mtoTextContent).toContain(txtContent);
      testReport.log(this.pageName, `MTO message -> ${mtoTextContent} - is displayed`);
    };

    await expect(page.locator(elements.cartPage.lblShippingAvailabilityMessages).first()).toBeVisible({ timeout });

    verifyMTOTextContent('This item is made just for you.');
    verifyMTOTextContent('Made-to-order items cannot be cancelled, returned or exchanged.');
  }

  async verifyLongDistanceLabelInCart() {
    const lnkShippingDeliveryMethodElement = page.locator(elements.cartPage.lnkShippingDeliveryMethod);
    const shippingDeliveryMethod = await lnkShippingDeliveryMethodElement.textContent();
    expect(shippingDeliveryMethod).toContain(env.LNG_SHIPPING_DELIVERY_LINK_TXT);
    testReport.log(this.pageName, `Shipping method type -> ${shippingDeliveryMethod} - is displayed`);
    await lnkShippingDeliveryMethodElement.click();
    testReport.log(this.pageName, `Click on -> ${shippingDeliveryMethod} - to open the shipping popup`);
    const txtldDelivery = await page.locator(elements.cartPage.txtldDelivery).textContent();
    expect(txtldDelivery).toContain(env.TXT_LONG_DISTANCE_DELIVERY);
    testReport.log(this.pageName, `Shipping popup displayed with -> ${txtldDelivery}`);
    const btnPopupClose = page.locator(elements.common.btnPopupClose);
    await btnPopupClose.click();
    testReport.log(this.pageName, `Clicked on close popup to dismiss shipping popup`);
  }

  /**
   * @author: nsukhadia
   * @function_Name : verifyAdditionalChargesMsgForOversizedItems
   * @Description : Verify cart messaging for oversized items
   * @params : None
   * @returns : None
   * */
  async verifyAdditionalChargesMsgForOversizedItems() {
    await expect(page.locator(elements.cartPage.lblAdditionalChargesMsg)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.lblAdditionalChargesMsg)).toContainText(env.CART_OVERSIZED_LINK_TEXT);
    await page.click(elements.cartPage.btnOversizeShippingCharges);
    const lblOversizeShippingPopupMsg = page.locator(elements.cartPage.lblOversizeShippingPopupMsg);
    await expect(lblOversizeShippingPopupMsg).toContainText(env.CART_OVERSIZED_POPUP_TEXT);
    await expect(page.locator('#popup-close')).toBeVisible({ timeout });

    await page.click('#popup-close');
  }

  /**
   * @author: asoman
   * @function_Name : returningCustomerSignIn
   * @Description : SignIn from cart flyout for a returning user
   * @params : None
   * @returns : None
   * */

  async returningCustomerSignIn() {
    // get returning user credentials
    const returningUserEmail = testData.returningUser.email;
    const returningUserPwd = testData.returningUser.password;

    await expect(page.locator(elements.cartFlyOut.txtReturningUserEmail)).toBeVisible({ timeout });

    await page.fill(elements.cartFlyOut.txtReturningUserEmail, returningUserEmail);
    testReport.log(this.pageName, `Entering Returning User email - ${returningUserEmail}`);

    await page.fill(elements.cartFlyOut.txtReturningUserPassword, returningUserPwd);
    testReport.log(this.pageName, `Entering Returning User password - ${returningUserPwd}`);

    await page.click(elements.cartFlyOut.btnSignInForReturningUser);
    await expect(page.locator(elements.cartFlyOut.lblCheckoutTitle)).toBeVisible({ timeout });

    testReport.log(this.pageName, 'Returning User Logged in');
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * @author: asoman
   * @function_Name : calculateMerchandiseTotal
   * @Description : Calculate the merchandise total from the items added to cart
   * @params : None
   * @returns : None
   * */

  async calculateMerchandiseTotal() {
    let merchandiseTotal = 0.0;
    const priceElementCount = await commonUtils.getElementHandlesArray(elements.cartPage.lblCartSkuPrice);
    await Promise.all(
      priceElementCount.map(async (ele, i) => {
        // we cannot avoid putting this in a loop. i dont know how to avoid this
        let itemPrice = await page.getByTestId('item-price').nth(i).textContent();
        itemPrice = itemPrice.replace(/[a-z]/gi, '');
        merchandiseTotal += commonUtils.parseFloatFromCurrency(itemPrice);
      })
    );
    testReport.log(this.pageName, `merchandiseTotal calculated -->${merchandiseTotal}`);
    return merchandiseTotal;
  }

  /**
   * @author: asoman
   * @function_Name : calculateMerchandiseTotal
   * @Description : Calculate the merchandise total from the items added to cart
   * @params : None
   * @returns : None
   * */

  async calculateItemTotal() {
    let itemTotal = 0.0;
    let itemPrice = await page.getByTestId('item-price').textContent();
    const itemQuantity = await page.getByTestId('price-quantity-totals-input').inputValue();
    const monogramString = `includes ${env.MONOGRAMMING_FEE} personalization fee`;
    itemPrice = itemPrice.replace(monogramString, '').replace(/[a-z]/gi, '').replace('$', '').replace('CAD ', '');
    itemPrice = commonUtils.removeCommasFromCurrencyValue(itemPrice.trim());
    itemTotal = (itemPrice * itemQuantity).toFixed(2);
    testReport.log(this.pageName, `itemTotal calculated -->${itemTotal}`);
    return itemTotal;
  }

  async assertItemTotal(expectedItemTotal) {
    testReport.log(this.pageName, 'Validating the Item total');
    const skuTotalElementText = await page.getByTestId('total-price').textContent();
    commonUtils.validateCartElementsIgnoringCase(this.pageName, skuTotalElementText, expectedItemTotal);
  }

  /**
   * @author: nsukhadia
   * @function_Name : clickRemoveFromCart
   * @Description : To remove items added to cart
   * @params : Item to be removed
   * @returns : true/false
   * */
  async clickRemoveFromCart(skuInput) {
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    let isSuccess = false;
    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        const skuNumTxt = await page.locator(elements.cartPage.lblCartSkuNum).nth(i).textContent();
        const skuNum = skuNumTxt?.split(' ')[1];
        if (skuNum === skuInput) {
          await page.locator(elements.cartPage.btnRemove).nth(i).click();
          testReport.log(this.pageName, `Clicked REMOVE FROM CART button for sku --> ${skuNum}`);
          isSuccess = true;
        }
      })
    );
    if (!isSuccess) {
      testReport.log(this.pageName, 'SKUs did not match');
    }
    expect(isSuccess).toBeTruthy();
    return isSuccess;
  }

  /**
   * @author: nsukhadia
   * @function_Name : verifyCartItemRemoved
   * @Description : Verify cart after removing items
   * @params : Item removed, current cart count
   * @returns : None
   * */
  async verifyCartItemRemoved(removedItemInfo, cartItemCount) {
    // checking removal message container exists
    await expect(page.locator(elements.cartPage.containerItemRemoved)).toBeVisible({ timeout });
    const containerEl = page.locator(elements.cartPage.containerItemRemoved);
    expect(containerEl).toBeTruthy();
    // link exists to item removed
    const linkTxt = await page.locator(elements.cartPage.lnkItemRemoved).nth(0).textContent();
    expect(linkTxt).toBeTruthy();
    const removedItemSkuTitle = removedItemInfo.skuTitle.replace('Personalized ', '');
    await expect(page.locator(elements.cartPage.lnkItemRemoved).nth(0)).toContainText(removedItemSkuTitle, {
      ignoreCase: true
    });
    testReport.log(this.pageName, `Removed Item Link Text -> ${linkTxt} , expected - ${removedItemInfo.skuTitle}`);
    await expect(page.locator(elements.cartPage.containerItemRemoved)).toContainText(`${removedItemSkuTitle} has been removed.`, {
      ignoreCase: true
    });
    // verify cart item count message
    const cartOrderSummaryCountMsg = await page.locator(elements.cartPage.txtCartOrderSummaryCountMsg).textContent();
    testReport.log(this.pageName, `Cart item count message reported after removal -> ${cartOrderSummaryCountMsg}`);
    expect(`(${cartItemCount} items)`).toBe(cartOrderSummaryCountMsg);
    testReport.log(this.pageName, `Cart count -> ${cartItemCount} items), expected ${cartOrderSummaryCountMsg}`);
  }

  /**
   * @author: asoman
   * @function_Name : navigateToCartPage
   * @Description : load cart page directly
   * @params : None
   * @returns : None
   * */
  async navigateToCartPage() {
    await page.goto(`${env.BASE_URL}/checkout/cart`, { timeout });
    if (env.EXEC_SITE.includes('can')) {
      await commonUtils.proceedToCanadaFromGlobalPopup();
    }
  }

  /**
   * @author: asoman
   * @function_Name : checkCartHasItems
   * @Description : return item quantity if cart has items added previously
   * @params : None
   * @returns : None
   * */
  async checkCartHasItems() {
    let cartItemCount = 0;
    cartItemCount = page.locator(elements.cartPage.arrayCartItemElements).count();
    return cartItemCount;
  }

  /**
   * @author: nsukhadia
   * @function_Name : verifyCartHeaderCount
   * @Description : Verify cart header count
   * @params : Item list
   * @returns : None
   * */
  async verifyCartHeaderCount(itemInfo) {
    // await page.waitForTimeout(1000);
    await page.waitForLoadState();
    if (!commonUtils.verifyIsMobile()) {
      const cartHeaderCount = await page.locator(elements.cartPage.lblCartItemCount).textContent();
      testReport.log(this.pageName, `Cart header has ${cartHeaderCount} item(s)`);
      expect(itemInfo?.length).toEqual(parseInt(cartHeaderCount, 10));
    } else {
      await expect(page.locator(elements.cartPage.lblCartItemCount)).toBeHidden();
    }
    testReport.log(this.pageName, 'Cart header count asserted');
  }

  /**
   * @author: asoman
   * @function_Name : verifyCartOrderSummary
   * @Description : Validate the cart order summary
   * @params : None
   * @returns : None
   * */

  async verifyCartOrderSummary() {
    const orderSummaryInfo = [];
    let merchandiseTotal = await this.calculateMerchandiseTotal();
    merchandiseTotal = merchandiseTotal.toFixed(2);
    await expect(page.locator(elements.cartPage.lblOrderSummaryMerchandiseTotal)).toBeVisible({ timeout });
    let merchandise = await this.getMerchTotalFromCartOrderSummary();
    expect(merchandise).not.toEqual('$0.00');
    testReport.log(this.pageName, `Assert -> Merchandise Total is a Non zero value - ${merchandise}`);

    expect(commonUtils.parseFloatFromCurrency(merchandise).toFixed(2)).toEqual(merchandiseTotal);
    testReport.log(this.pageName, `Displayed Merchandise Total - ${merchandise}Calculated Merchandise Total${merchandiseTotal}`);
    orderSummaryInfo.push.merchandiseTotal = merchandiseTotal;

    let estShippingHandling = await page.getByTestId('est-shipping-handling-total').getByTestId('formatted-price').textContent();

    testReport.log(this.pageName, `Assert -> Estimated Shipping & Handling Fee is a Non zero value - ${estShippingHandling}`);
    orderSummaryInfo.push.estShippingHandling = estShippingHandling;

    const blnIsShippingDiscountApplied = await page.getByTestId('shippingDiscount-amt').getByTestId('formatted-price').isVisible();
    let shippingDiscount = '-$0.00';
    if (blnIsShippingDiscountApplied) {
      shippingDiscount = await page.getByTestId('shippingDiscount-amt').getByTestId('formatted-price').textContent();
    }
    orderSummaryInfo.push.shippingDiscount = shippingDiscount;

    let estTax = await page.getByTestId('order-summary-tax-total').getByTestId('formatted-price').textContent();

    testReport.log(this.pageName, `Assert -> Estimated Tax is a Non zero value - ${estTax}`);
    orderSummaryInfo.push.estTax = estTax;

    const ordTotal = await this.getEstimateOrderTotalFromOrderSummary();

    merchandise = parseFloat(merchandise.replace('$', '').replace('CAD ', ''));
    estShippingHandling = parseFloat(estShippingHandling.replace('$', '').replace('CAD ', ''));
    shippingDiscount = parseFloat(shippingDiscount.replace('-$', '').replace('-CAD ', ''));
    estTax = parseFloat(estTax.replace('$', '').replace('CAD ', ''));
    let calculatedOrderTotal = merchandise + estShippingHandling - shippingDiscount + estTax;
    calculatedOrderTotal = calculatedOrderTotal.toFixed(2);
    expect(parseFloat(calculatedOrderTotal)).toEqual(parseFloat(ordTotal));
    await testReport.log(this.pageName, `Assert -> Calculated OrderTotal ${calculatedOrderTotal} matches with the displayed ${ordTotal}`);
    orderSummaryInfo.push.ordTotal = ordTotal;
    const blnIsRewardsApplied = await page.getByTestId('est-total-row-reward').getByTestId('formatted-price').isVisible();
    if (blnIsRewardsApplied) {
      const rewardAmountElement = page.getByTestId('est-total-row-reward').getByTestId('formatted-price');
      let rewardAmount = await rewardAmountElement.textContent();
      rewardAmount = parseFloat(rewardAmount.replace('$', ''));
      let remainingTotal = await page.locator('[class*="est-total-row order-summary-list-item"]').getByTestId('formatted-price').textContent();
      remainingTotal = parseFloat(remainingTotal.replace('$', ''));
      const calculatedRemainingTotal = ordTotal - rewardAmount;
      expect(calculatedRemainingTotal).toEqual(remainingTotal);
      await testReport.log(this.pageName, `Assert -> Calculated Remaining Total ${calculatedRemainingTotal} matches with the displayed ${remainingTotal}`);
    }
    await testReport.log(this.pageName, `Order summary info --> ${orderSummaryInfo}`);
  }

  /**
   * @author: asoman
   * @function_Name : verifyAgreementNotes
   * @Description : Validate the agreement, privacy policy links shown under cart order summary
   * @params : None
   * @returns : None
   * */

  async verifyAgreementNotes() {
    await expect(page.locator(elements.cartPage.lblAgreementNote).first()).toBeVisible({ timeout });
    let termsOfUseText;
    let termsOfUseText2;
    if (global.isMobile) {
      const agreementNoteText = await page.locator(elements.cartPage.lblAgreementNoteText1).textContent();
      const agreementNoteText2 = await page.locator(elements.cartPage.lblAgreementNoteText2).textContent();
      expect(agreementNoteText).toContain('By continuing to Checkout, you are agreeing to our Terms of Use');
      expect(agreementNoteText2).toContain('By continuing to Checkout, you are agreeing to our Terms of Use');
      termsOfUseText = await page.locator(elements.cartPage.txtTermsOfUse).nth(0).textContent();
      termsOfUseText2 = await page.locator(elements.cartPage.txtTermsOfUse).nth(1).textContent();
      expect(termsOfUseText).toContain('Terms of Use');
      expect(termsOfUseText2).toContain('Terms of Use');
      testReport.log(this.pageName, `Assert -> Terms and conditions text ${termsOfUseText}`);
      await expect(page.locator(elements.cartPage.lblPrivacyPolicy).nth(0)).toBeVisible({ timeout });
      await expect(page.locator(elements.cartPage.lblPrivacyPolicy).nth(1)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Privacy policy link exists');
    } else {
      const agreementNoteText = await page.locator(elements.cartPage.lblAgreementNote).textContent();
      expect(agreementNoteText).toContain('By continuing to Checkout, you are agreeing to our Terms of Use');
      termsOfUseText = await page.locator(elements.cartPage.txtTermsOfUse).textContent();
      expect(termsOfUseText).toContain('Terms of Use');
      testReport.log(this.pageName, `Assert -> Terms and conditions text ${termsOfUseText}`);
      await expect(page.locator(elements.cartPage.lblPrivacyPolicy)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Privacy policy link exists');
    }
  }

  /**
   * @author: asoman
   * @function_Name : clickCheckoutNow
   * @Description : Click on proceed to checkout to proceed to next page
   * @params : None
   * @returns : None
   * */

  async clickCheckoutNow() {
    await expect(page.locator(elements.cartPage.btnCheckoutNow).first()).toBeVisible({ timeout });
    if (global.browser === 'webkit') {
      await page.locator(elements.cartPage.btnCheckoutNow).click();
      testReport.log(this.pageName, '<<<<<<<<<<<<<<WEBKIT: Click on CHECKOUT NOW button on cartPage');
    } else {
      const btnProceedToCheckout = page.locator(elements.cartPage.btnProceedToCheckout).first();
      await btnProceedToCheckout.click();
      testReport.log(this.pageName, 'Click on CHECKOUT NOW button on cartPage');
    }
    await page.waitForLoadState('domcontentloaded', { timeout });
    await commonUtils.forcedWait(this.pageName, 10000);
  }

  async verifyAndContinueThroughOversizedPopup() {
    await expect(page.locator('#popup-container')).toContainText('Make sure these items will fit in your vehicle.');
    await page.locator('#popup-container').getByRole('button', { name: 'Continue to Checkout' }).click();
  }

  /**
   * @author: asoman
   * @function_Name : clickGuestCheckout
   * @Description : Proceed as a Guest user
   * @params : None
   * @returns : None
   * */
  async clickGuestCheckout() {
    await page.locator(elements.cartPage.btnGuestCheckout).click();
    testReport.log(this.pageName, 'Click on GUEST CHECKOUT button on CartFlyout');
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * @author: None
   * @function_Name : applyRewardsInCart
   * @Description : None
   * @params : None
   * @returns : None
   * */

  async applyRewardsInCart() {
    // to be coded
  }

  /**
   * @author: None
   * @function_Name : validateRewarsDollarsInCart
   * @Description : None
   * @params : None
   * @returns : None
   * */

  async validateRewarsDollarsInCart() {
    // to be coded
  }

  /**
   * @author: madhavi
   * @function_Name : validatePromoCodeOption
   * @Description :
   * @params : None
   * @returns : None
   * */

  async validatePromoCodeOption() {
    await expect(page.locator(elements.cartPage.txtPromoCode)).toBeVisible({ timeout });
    const hdrPromoCode = await page.locator(elements.cartPage.lblPromoCodeHeader).textContent();
    expect(hdrPromoCode).toContain('Apply a Promotion CodeRemove any spaces or dashes before hitting apply.');
  }

  /**
   * @author: Sreerag
   * @function_Name : applyPromoCode
   * @Description :
   * @params : None
   * @returns : None
   * */
  async applyPromoCode(promo) {
    await page.click(elements.cartPage.txtPromoCode);
    let promoCode;
    switch (promo) {
      case 'Invalid_Promo_Code_1':
        promoCode = env.INVALID_PROMO_CODE_1;
        break;
      case 'Invalid_Promo_Code_2':
        promoCode = env.INVALID_PROMO_CODE_2;
        break;
      case 'Valid_Promo_Code_1':
        promoCode = env.VALID_PROMO_CODE_1;
        break;
      default:
        testReport.log('Promo not listed in Env file');
        break;
    }
    await page.fill(elements.cartPage.txtPromoCode, promoCode);
    await page.click(elements.cartPage.btnApplyPromoCode);
    return promoCode;
  }

  /**
   * @author: madhavi
   * @function_Name : validateVenmoPayment
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async validateVenmoPayment() {
    await expect(page.locator(elements.cartPage.btnVenmoPayment)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Assert -> Venmo payment button exists');
  }

  /**
   * @author: madhavi
   * @function_Name : verifyPaypalInCart
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async verifyPaypalInCart() {
    await expect(page.locator(elements.cartPage.btnSubmitPaypal)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Assert -> PayPal payment button exists');
  }

  /**
   * @author: None
   * @function_Name : makePaypalPayment
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async makePaypalPayment() {
    // to be coded
  }

  /**
   * @author: asoman
   * @function_Name : validateCartBannerMessage
   * @Description : Validate the cart banner and messages
   * @params : None
   * @returns : None
   * */
  async validateCartBannerMessage(orderDetailsInfo) {
    const isUserLoggedIn = orderDetailsInfo.userLoggedIn;
    if (!env.EXEC_SITE.includes('can')) {
      const isVisiblepromoHeadline = await page.locator(elements.cartPage.hdrCartBannerPromo).isVisible();
      if (isVisiblepromoHeadline) {
        const promoHeadline = await page.locator(elements.cartPage.hdrCartBannerPromo).textContent();
        /* need to add logic for showing % and $ amount
              expect(promoHeadline.replace(/\s+/g, ' ')).toContain(env.CART_REWARDS_PROMO_HDR)
              commonUtils.captureElementSnapshot(elements.cartPage.txtCartBannerPromo)
              */
        testReport.log(this.pageName, `Promo headline printed in cart ${promoHeadline}`);
        const promoText = await page.locator(elements.cartPage.txtCartBannerPromo).textContent();
        testReport.log(this.pageName, `Double rewards Flag - ${env.DOUBLE_REWARDS_FLAG}`);

        if (isUserLoggedIn) {
          if (env.DOUBLE_REWARDS_FLAG === 'true' && isUserLoggedIn) {
            expect(promoText.replace(/\s+/g, ' ').trim()).toContain(env.CART_REWARDS_PROMO_MSG_DOUBLE.trim());
          } else {
            expect(promoText.replace(/\s+/g, ' ').trim()).toContain(env.CART_REWARDS_PROMO_MSG.trim());
            const promoLink = await page.locator(elements.cartPage.lnkCartBannerPromo).textContent();
            expect(promoLink.trim()).toContain(env.CART_REWARDS_PROMO_LINK);
          }
        } else {
          let rewardsDollars;
          if (this.getMerchTotalFromOrderSummary > env.CART_REWARDS_DISPLAY_THRESHOLD) {
            rewardsDollars = this.getMerchTotalFromOrderSummary * 0.2;
          } else {
            rewardsDollars = '20%';
          }
          await testReport.log(this.pageName, `rewardsDollars${rewardsDollars}`);
          if (env.DOUBLE_REWARDS_FLAG === 'true') {
            expect(promoText.replace(/\s+/g, ' ').trim()).toContain(env.CART_REWARDS_PROMO_MSG_DOUBLE.trim());
          } else {
            expect(promoText.replace(/\s+/g, ' ').trim()).toContain(env.CART_REWARDS_PROMO_MSG.trim());
            const promoLink = await page.locator(elements.cartPage.lnkCartBannerPromo).textContent();
            expect(promoLink.trim()).toContain(env.CART_REWARDS_PROMO_LINK);
          }
        }
      }
    }
  }

  /**
   * @author: None
   * @function_Name : validateCartSignInContainer
   * @Description : Validate the static messages and links
   * @params : None
   * @returns : None
   * */

  async validateCartSignInContainer() {
    // to be coded
  }

  /**
   * @author: asoman
   * @function_Name : verifyCartStaticContents
   * @Description : Validate the static messages and links
   * @params : None
   * @returns : None
   * */

  async verifyCartStaticContents() {
    const giftMessageContent = await page.innerText(elements.cartPage.lblGiftMessageContent);
    expect(giftMessageContent).toContain(env.CART_GIFT_MSG_CONTENT);
    testReport.log(this.pageName, `Gift Message content displayed in Cart => ${giftMessageContent}`);

    const drawer = page.locator('.promo-container');

    let isFurnitureItemPresentInCart = false;
    const shippingType = await page.getByTestId('btn-txt-shipping-delivery-rate').nth(0).textContent();
    if (shippingType.includes('Local')) {
      isFurnitureItemPresentInCart = true;
    }
    if (global.isMobile) {
      if (isFurnitureItemPresentInCart) {
        if (!env.BRAND.includes('CB2')) {
          await page.getByText('Unlimited Furniture Delivery for One Flat Fee').first().click();
          const specialLocalHomeMsgContentHdr = await page.locator(elements.cartPage.lblSpecialLocalHomeMsgHdr).first().textContent();
          const specialLocalHomeMsgContentText = await page.locator(elements.cartPage.lblSpecialLocalHomeMsgText).textContent();
          const specialLocalHomeMsgContentLink = await page.locator(elements.cartPage.lblSpecialLocalHomeMsgLink).textContent();
          expect(specialLocalHomeMsgContentHdr.trim()).toContain(env.CART_SPECIAL_LOCAL_INHOME_HDR);
          expect(specialLocalHomeMsgContentText.trim()).toContain(env.CART_SPECIAL_DELIVERY_MSG_TEXT);
          expect(specialLocalHomeMsgContentLink.trim()).toContain(env.CART_SPECIAL_DELIVERY_MSG_LINK);
        }
        await page.getByText('Returns Made Easy').click();
        const drawerReturnPolicy = drawer.locator(elements.cartPage.lblDrawers).nth(1);
        const returnsMadeEasyContentHdr = await drawerReturnPolicy.locator('h2').first().textContent();
        const returnsMadeEasyContentText = await drawerReturnPolicy.locator(elements.cartPage.lblReturnsMadeEasyContentMobText).textContent();
        const returnsMadeEasyContentLinks = await drawerReturnPolicy.locator(elements.cartPage.lblReturnsMadeEasyContentLinks).textContent();
        // expect(returnsMadeEasyContentHdr.trim()).toContain(env.CART_RETURNS_MSG_HDR, { ignoreCase: true });
        await commonUtils.validateCartElementsIgnoringCase(this.pageName, returnsMadeEasyContentHdr.trim(), env.CART_RETURNS_MSG_HDR);

        expect(returnsMadeEasyContentText.trim()).toContain(env.CART_RETURNS_MSG_TEXT);
        expect(returnsMadeEasyContentLinks.trim()).toContain(env.CART_RETURNS_MSG_LINK);
      } else {
        await page.getByText('Returns Made Easy').click();
        const drawerReturnPolicy = drawer.locator(elements.cartPage.lblDrawerReturnPolicy);
        const returnsMadeEasyContentHdr = await drawerReturnPolicy.locator('h2').textContent();
        const returnsMadeEasyContentText = await drawerReturnPolicy.locator(elements.cartPage.lblReturnsMadeEasyContentMobText).textContent();
        const returnsMadeEasyContentLinks = await drawerReturnPolicy.locator(elements.cartPage.lblReturnsMadeEasyContentLinks).textContent();
        expect(returnsMadeEasyContentHdr.trim().toLowerCase()).toContain(env.CART_RETURNS_MSG_HDR.toLowerCase());
        expect(returnsMadeEasyContentText.trim()).toContain(env.CART_RETURNS_MSG_TEXT);
        expect(returnsMadeEasyContentLinks.trim()).toContain(env.CART_RETURNS_MSG_LINK);
      }

      if (!env.EXEC_SITE.includes('can')) {
        if (env.BRAND === 'CB2') {
          await page.getByText('About Store Pickup').click();
        } else {
          await page.getByText('Free Store & Warehouse Pickup').click();
        }
        let drawerFreePickup;
        if (isFurnitureItemPresentInCart) {
          drawerFreePickup = drawer.locator(elements.cartPage.lblDrawerFreePickup).nth(2);
        } else {
          drawerFreePickup = drawer.locator(elements.cartPage.lblDrawerFreePickup).nth(1);
        }
        const freeStoreAndWarehousePickupContentAccordion = drawer.locator(elements.cartPage.lblFreeStoreAndWarehousePickupContentAccordion);
        const freeStoreAndWarehousePickupContentHdr = await drawerFreePickup.locator(elements.cartPage.lblFreeStoreAndWarehousePickupContentHdr).textContent();
        const freeStoreAndWarehousePickupContentText = await freeStoreAndWarehousePickupContentAccordion
          .locator(elements.cartPage.lblFreeStoreAndWarehousePickupContentTextMob)
          .textContent();
        const freeStoreAndWarehousePickupContentLinks = await freeStoreAndWarehousePickupContentAccordion
          .locator(elements.cartPage.lnkFreeStoreAndWarehousePickupContentLinkMob)
          .textContent();
        expect(freeStoreAndWarehousePickupContentHdr.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_HDR);
        expect(freeStoreAndWarehousePickupContentText.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_TEXT);
        expect(freeStoreAndWarehousePickupContentLinks.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_LINK);
        testReport.log(
          this.pageName,
          `Free Pickup Message content displayed in Cart => ${freeStoreAndWarehousePickupContentHdr}${freeStoreAndWarehousePickupContentText}${freeStoreAndWarehousePickupContentLinks}`
        );

        await page.getByText('Outside the Contiguous U.S.').click();
        const drawerInternational = drawer.locator(elements.cartPage.lblDrawerInternational);
        testReport.log(this.pageName, `drawerInternational${drawerInternational}`);
      }
    } else {
      const returnsMadeEasyContentHdr = await page.locator(elements.cartPage.lblReturnsMadeEasyContentHeader).textContent();
      const returnsMadeEasyContentText = await page.locator(elements.cartPage.lblReturnsMadeEasyContentText).textContent();
      const returnsMadeEasyContentLinks = await page.locator(elements.cartPage.lnkReturnsMadeEasyContentText).textContent();
      expect(returnsMadeEasyContentHdr.trim()).toContain(env.CART_RETURNS_MSG_HDR);
      expect(returnsMadeEasyContentText.trim()).toContain(env.CART_RETURNS_MSG_TEXT);
      expect(returnsMadeEasyContentLinks.trim()).toContain(env.CART_RETURNS_MSG_LINK);
      testReport.log(
        this.pageName,
        `Returns Made Easy content displayed in Cart => ${returnsMadeEasyContentHdr}${returnsMadeEasyContentText}${returnsMadeEasyContentLinks}`
      );

      if (!env.EXEC_SITE.includes('can')) {
        const freeStoreAndWarehousePickupContentHdr = await page.locator(elements.cartPage.lblFreeStoreAndWarehousePickupContentHeader).textContent();
        const freeStoreAndWarehousePickupContentText = await page.locator(elements.cartPage.lblFreeStoreAndWarehousePickupContentText).textContent();
        const freeStoreAndWarehousePickupContentLinks = await page.locator(elements.cartPage.lnkFreeStoreAndWarehousePickupContentText).textContent();
        expect(freeStoreAndWarehousePickupContentHdr.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_HDR);
        expect(freeStoreAndWarehousePickupContentText.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_TEXT);
        expect(freeStoreAndWarehousePickupContentLinks.trim()).toContain(env.CART_FREE_PICKUP_CONTENT_LINK);
        testReport.log(
          this.pageName,
          `Free Pickup Message content displayed in Cart => ${freeStoreAndWarehousePickupContentHdr}${freeStoreAndWarehousePickupContentText}${freeStoreAndWarehousePickupContentLinks}`
        );

        const interNationalShippingContentHdr = await page.getByRole('heading', { name: 'International Shipping' }).textContent();
        const interNationalShippingContentText = await page.locator(elements.cartPage.lblInterNationalShippingContentText).textContent();
        const interNationalShippingContentLink1 = await page.getByRole('link', { name: 'International Order Quote' }).textContent();
        const interNationalShippingContentLink2 = await page.getByRole('link', { name: 'Shop our Canadian website.' }).textContent();
        expect(interNationalShippingContentHdr.trim()).toContain(env.CART_INTERNATIONAL_CONTENT_HDR);
        expect(interNationalShippingContentText.trim()).toContain(env.CART_INTERNATIONAL_CONTENT_TEXT);
        expect(interNationalShippingContentLink1.trim()).toContain(env.CART_INTERNATIONAL_CONTENT_LINK1_TEXT);
        expect(interNationalShippingContentLink2.trim()).toContain(env.CART_INTERNATIONAL_CONTENT_LINK2_TEXT);
        testReport.log(
          this.pageName,
          `International Shipping content displayed in Cart => ${interNationalShippingContentHdr}${interNationalShippingContentText}${interNationalShippingContentLink1}${interNationalShippingContentLink2}`
        );
      }
    }
  }

  /**
   * @author: asoman
   * @function_Name : verifyAvailability
   * @Description : Verify the availability and arrivesmessage for added product in the cart
   * @params : iWorld json object with item properties
   * @returns : None
   * */

  async verifyAvailability(itemInfo, itemType) {
    const cartItemCount = itemInfo.length;
    testReport.log(this.pageName, `ItemType received -> ${itemType}`);
    // validate the number of items added to cart
    await expect(page.locator(elements.cartPage.lblCartSkuCount)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.lblCartSkuCount)).toContainText(`${cartItemCount} item`);
    testReport.log(this.pageName, `Cart page is displayed with ${cartItemCount} item(s)`);

    // validate the item details displayed
    const itemJson = JSON.parse(itemInfo[0]);
    const skuNum = page.locator(elements.cartPage.lblCartSkuNum);
    this.assertItemNum(skuNum, itemJson.skuNum);
    const skuAvailabilityMsg = page.locator(elements.cartPage.lblCartAvailabilityMsg);
    this.assertAvailabilityMsg(skuAvailabilityMsg, itemJson.availabilityMsg);
    const skuArrivesByMsg = await page.locator(elements.cartPage.lblArrivesByMessage).textContent();

    testReport.log(this.pageName, `Assert -> ArrivesBy Message has value:: ${skuArrivesByMsg}`);
  }

  /**
   * @author: asoman
   * @function_Name : validateTermsOfUse
   * @Description : click on terms of use link and validate the contents
   * @params : None
   * @returns : None
   * */
  async validateTermsOfUse() {
    // Get page after a specific action (here clicking terms of use link)
    const [newPage] = await Promise.all([
      page.waitForEvent('page'),
      page.click(elements.cartPage.lnkTermsOfUse) // Opens a new tab
    ]);
    await newPage.waitForLoadState();
    testReport.log(this.pageName, `Terms of Use page title -> ${await newPage.title()}`);
  }

  /**
   * @author: asoman
   * @function_Name : getOrderDetailsInfo
   * @Description : Get the details of cart to compare it in checkout pages
   * @params : None
   * @returns : None
   * */
  async getOrderDetailsInfo(orderDetailsObj) {
    // create the default order object
    const orderObj = orderDetailsObj;
    const objCartItemDetails = [];

    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElementsArray = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = page.locator(elements.cartPage.arrayCartItemElements);
    await Promise.all(
      arrayCartItemElementsArray.map(async (ele, i) => {
        let isGRItem = false;
        // const cartSkuElement = page.getByTestId('cart-product-line-item-row').nth(i);
        const cartSelectedFulfilType = await this.getSelectedFulfillmentType(arrayCartItemElements.nth(i));
        const cartSkuTitle = await arrayCartItemElements.nth(i).locator(elements.cartPage.lblCartSkuDescription).textContent();
        const cartSkuNum = await arrayCartItemElements.nth(i).locator(elements.cartPage.lblCartSkuNum).textContent();
        const cartSkuQty = await arrayCartItemElements.nth(i).locator(elements.cartPage.lblCartSkuQuantity).inputValue();
        let cartSkuAvailabilityMsg = await this.GetskuAvailabilityMessage(arrayCartItemElements.nth(i).locator(elements.cartPage.lblCartAvailabilityMsg));
        const cartSkuArrivesByMsg = await arrayCartItemElements.nth(i).locator(elements.cartPage.lblArrivesByMessage).textContent();

        const selectedPersonalizationInfoElement = arrayCartItemElements.nth(i).locator('.personalization-design');
        const personalizationItemElements = '.personalization-design-info';
        const personalizationInfo = await this.getMonogrammingData(selectedPersonalizationInfoElement, personalizationItemElements);
        const personalizationReturnPolicyTextElement = arrayCartItemElements.nth(i).locator('.warning.fcRed').nth(0);
        const isPersonalizedSku = await this.getPersonalizationStatus(personalizationReturnPolicyTextElement);
        if (isPersonalizedSku && cartSkuAvailabilityMsg === '') {
          cartSkuAvailabilityMsg = 'In stock and ready to ship';
        }

        const stockAvailability = await this.getStockStatus(cartSkuAvailabilityMsg, cartSkuArrivesByMsg);

        const grLinkCount = await arrayCartItemElements.nth(i).locator(elements.giftRegistryItems.lnkViewRegistry).count();
        if (grLinkCount > 0) {
          isGRItem = true;
        }

        const cartSkuPriceElement = arrayCartItemElements.nth(i).locator(elements.cartPage.lblCartSkuPrice);
        const priceInfo = await this.getPrice(cartSkuPriceElement);

        const objItem = {};
        const objItems = {};
        const cartSkuNumber = cartSkuNum.replace('SKU ', '').valueOf();
        objItem.skuNum = cartSkuNumber;
        objItem.skuTitle = cartSkuTitle;
        objItem.skuQty = cartSkuQty;
        objItem.skuPrice = priceInfo.skuPrice;
        objItem.skuSellingPrice = priceInfo.skuSellingPrice;
        objItem.skuAvailabilityMsg = cartSkuAvailabilityMsg;
        objItem.skuArrivesByMsg = cartSkuArrivesByMsg;
        objItem.selectedFulfilType = cartSelectedFulfilType;
        objItem.isGRItem = isGRItem;
        objItem.isPersonalizedSku = isPersonalizedSku;
        objItem.personalizationInfo = personalizationInfo;
        objItem.stockAvailability = stockAvailability;
        objItems[cartSkuTitle] = objItem;
        objCartItemDetails.push(JSON.stringify(objItems));
      })
    );
    await testReport.log(this.pageName, `Order object received -> ${JSON.stringify(orderObj.itemContexts)}`);
    await testReport.log(this.pageName, `Order object received1 -> ${JSON.stringify(orderObj.itemContexts.itemContext[0])}`);
    await testReport.log(this.pageName, `Order object received2 -> ${JSON.stringify(orderObj.itemContexts.itemContext[0].recipient0)}`);

    orderObj.itemContexts.itemContext[0].recipient0.items = objCartItemDetails;
    await testReport.log(this.pageName, `Order object created with cart items -> ${JSON.stringify(orderObj)}`);
    return orderObj;
  }

  async GetskuAvailabilityMessage(availMsgEle) {
    // const availMsgEle = page.locator(elements.cartPage.lblCartAvailabilityMsg).nth(i);
    if (await availMsgEle.isVisible()) {
      return availMsgEle.textContent();
    }
    testReport.log(this.pageName, `Cart Page -> Availability Message is not Visible`);
    return '';
  }

  /**
   * @author: asoman
   * @function_Name : getSelectedFulfillmentType
   * @Description : to get the selected fulfilment option ship or pickup
   * @params : None
   * @returns : None
   * */

  async getSelectedFulfillmentType(cartSkuElement) {
    const rdoShipOptionCount = await cartSkuElement.getByTestId('ship-radio-btn').count();
    const rdoPickupOptionCount = await cartSkuElement.getByTestId('pickup-radio-btn').count();
    let selectedFulfilmentType;

    if (rdoShipOptionCount > 0) {
      const rdoShipOption = cartSkuElement.getByTestId('ship-radio-btn');
      if (await rdoShipOption.isChecked()) {
        selectedFulfilmentType = 'Ship';
      }
    }

    if (rdoPickupOptionCount > 0) {
      const rdoPickupOption = cartSkuElement.getByTestId('pickup-radio-btn');
      if (await rdoPickupOption.isChecked()) {
        selectedFulfilmentType = 'PickUp';
      }
    }
    return selectedFulfilmentType;
  }
  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify save for later section is unavailable
   * @params : None
   * @returns : None
   * */

  async validateNoSaveForLater(isSignedIn) {
    await page.waitForLoadState('load', { waitFor: 'visible' });
    if (isSignedIn === true && (await page.isVisible(elements.cartPage.lblSaveForLaterSection))) {
      // const btnSaveForLaterClose = await page.$$(elements.cartPage.btnSaveForLaterClose);
      const btnSaveForLaterClose = await commonUtils.getElementHandlesArray(elements.cartPage.btnSaveForLaterClose);

      await Promise.all(
        btnSaveForLaterClose.map(async (ele, i) => {
          await page.locator(elements.cartPage.btnSaveForLaterClose).nth(i).click();
        })
      );
      testReport.log(this.pageName, `Exisiting item removed from Save for later list`);
      await page.reload();
      await expect(page.locator(elements.cartPage.lblCartSkuCount)).toBeVisible({ timeout });
    }
    await expect(page.locator(elements.cartPage.lblSaveForLaterSection)).toBeHidden();
    testReport.log(this.pageName, 'Verify Save for later section is not present');
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Click on save for later button and validate the contents
   * @params : None
   * @returns : None
   * */

  async validatesaveForLater() {
    if (env.EXEC_SITE.includes('crate')) {
      if (!commonUtils.verifyIsMobile()) {
        await expect(page.locator(elements.cartPage.lblFavouritesItemCount)).toBeVisible({ timeout });
        const FavouritesItemCount = '0';
        const strFavouritesCount = await page.innerText(elements.cartPage.lblFavouritesItemCount);
        expect(strFavouritesCount).toEqual(FavouritesItemCount);
        testReport.log(this.pageName, 'Assert -> Validating favourites count');
        await page.locator(elements.cartPage.btnSaveForLater).click();
      } else {
        await expect(page.locator(elements.cartPage.btnSaveForLater)).toBeVisible({ timeout });
        testReport.log(this.pageName, 'Assert -> Save For Later button displayed in cart');
        await page.locator(elements.cartPage.btnSaveForLater).click();
      }
    } else if (!commonUtils.verifyIsMobile()) {
      await expect(page.locator(elements.cartPage.lblCb2Favourites)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Validating favourites count');
      await page.locator(elements.cartPage.btnSaveForLater).click();
    } else {
      await expect(page.locator(elements.cartPage.btnSaveForLater)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Save For Later button displayed in cart');
      await page.locator(elements.cartPage.btnSaveForLater).click();
    }

    const strCartSkuCount = '1';
    const strCartCount = await page.innerText(elements.cartPage.lblCartSkuCount);
    const strCartCountNumber = strCartCount.replace(/[^\d]/g, '');
    expect(strCartCountNumber).toEqual(strCartSkuCount);
    testReport.log(this.pageName, 'Assert -> Validating cart count');

    await page.waitForLoadState('domcontentloaded', { timeout });
    await expect(page.locator('#save-for-later-remove-msg')).toBeVisible({ timeout });
    await expect(page.locator('#save-for-later-remove-msg')).toContainText('has been moved to Saved for Later below.');
    testReport.log(this.pageName, 'Assert -> Item moved from cart to save for later');
  }

  async VerifySignedIn() {
    let blnSignedIn;
    if (!commonUtils.verifyIsMobile()) {
      blnSignedIn = await page.isVisible(elements.cartPage.lblCartSignIn);
      if (!blnSignedIn) {
        testReport.log(this.pageName, `Signd in customer : Desktop`);
        blnSignedIn = true;
      } else {
        testReport.log(this.pageName, `Guest User : Desktop`);
        blnSignedIn = false;
      }
    } else {
      blnSignedIn = await page.isVisible(elements.cartPage.lblMobileCartSignIn);
      if (!blnSignedIn) {
        testReport.log(this.pageName, `Signd in customer : Mobile`);
        blnSignedIn = true;
      } else {
        testReport.log(this.pageName, `Guest User : Mobile`);
        blnSignedIn = false;
      }
    }
    return blnSignedIn;
  }

  async guestContentSaveForLater() {
    await expect(page.locator(elements.cartPage.txtSaveForLater)).toHaveText(env.CART_SAVE4LATER_GUEST_MSG);
  }

  async signedInContentSaveForLater() {
    await expect(page.locator(elements.cartPage.txtSaveForLater)).toHaveText(env.CART_SAVE4LATER_LOGGED_IN_MSG);
    this.getFavouritesCount();
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : get cart count on clicking save for later button
   * @params : None
   * @returns : None
   * */

  async getCartCount() {
    const strCartSkuCount = '0';
    const strCartCount = await page.innerText(elements.cartPage.lblCartSkuCount);
    const strCartCountNumber = strCartCount.replace(/[^\d]/g, '');
    expect(strCartCountNumber).toEqual(strCartSkuCount);
    testReport.log(this.pageName, `Assert -> Validating cart count : ${strCartCountNumber}`);
  }
  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : get favourites count on clicking save for later button
   * @params : None
   * @returns : None
   * */

  async getFavouritesCount() {
    if (env.EXEC_SITE.includes('crate')) {
      if (!commonUtils.verifyIsMobile()) {
        await expect(page.locator(elements.cartPage.lblFavouritesItemCount)).toBeVisible({ timeout });
        const strFavouritesItemCount = 1;
        testReport.log(this.pageName, `Favourites Item Count ${strFavouritesItemCount} `);
        testReport.log(this.pageName, 'Assert -> Validating favourites count');
      }
    } else if (!commonUtils.verifyIsMobile()) {
      await expect(page.locator(elements.cartPage.lblCb2AddToFavourites)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Validating favourites icon');
    }
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify product details in save for later section
   * @params : None
   * @returns : None
   * */

  async verifysaveForLaterProductDetails(itemInfo) {
    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);

    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        const itemJson = JSON.parse(itemInfo[i]);

        await expect(page.locator(elements.cartPage.hdrSaveForLater)).toBeVisible({ timeout });
        testReport.log(this.pageName, 'Assert -> Save For Later header is present');

        const skuTitle = await page.locator(elements.cartPage.lblSaveForLaterItemDescription).textContent();
        commonUtils.validateCartElements(this.pageName, skuTitle, itemJson, 'skuTitle');

        const cartSkuPrice = await page.locator(elements.cartPage.lblSaveForLaterItemPrice).textContent();
        commonUtils.validateCartElements(this.pageName, cartSkuPrice, itemJson, 'cartSkuPrice');

        const skuAvailabilityMsg = await page.locator(elements.cartPage.lblSaveForLaterAvailabilityMsg).textContent();
        commonUtils.validateCartElements(this.pageName, skuAvailabilityMsg, itemJson, 'availabilityMsg');

        await expect(page.locator(elements.cartPage.btnSaveForLaterClose)).toBeVisible({ timeout });
        testReport.log(this.pageName, 'Assert -> Save For Later Close button is present');
      })
    );
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify save for later count
   * @params : None
   * @returns : None
   * */

  async getSaveForLaterCount() {
    const saveForLaterCount = '1';
    const saveForLater = await page.innerText(elements.cartPage.lblSaveForLaterItemCount);
    const strSaveForLater = saveForLater.replace(/[^\d]/g, '');
    expect(strSaveForLater).toEqual(saveForLaterCount);
    testReport.log(this.pageName, 'Assert -> Validating save for later count');
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Click on move to cart button
   * @params : None
   * @returns : None
   * */

  async validateMoveToCart() {
    await expect(page.locator(elements.cartPage.btnMoveToCart)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Assert -> Move To Cart button displayed in cart');

    await page.locator(elements.cartPage.btnMoveToCart).click();
    // await page.waitForLoadState('networkidle');
    await expect(page.locator(elements.cartPage.lblSaveForLaterItemCount)).toBeVisible({ timeout });

    await expect(page.locator(elements.cartPage.lblSaveForLaterItemCount)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.txtItemMovedToCart)).toBeVisible({ timeout });

    await expect(page.locator(elements.cartPage.txtItemMovedToCart)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.txtItemMovedToCart)).toContainText('has been moved to Cart above.');
    testReport.log(this.pageName, 'Item moved back to cart');
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify save for later count on moving item from save for later to cart
   * @params : None
   * @returns : None
   * */

  async verifySaveForLaterCount() {
    // await page.waitForTimeout(4000);
    await page.waitForLoadState();
    const saveForlaterSkuCount = await page.locator(elements.cartPage.btnMoveToCart).count();
    const saveForLaterCount = await page.innerText(elements.cartPage.lblSaveForLaterItemCount);
    const strsaveForLaterCount = saveForLaterCount.replace(/[^\d]/g, '');
    expect(strsaveForLaterCount).toEqual(saveForlaterSkuCount.toString());
    testReport.log(this.pageName, `Assert -> Validating save for later count : ${strsaveForLaterCount}`);
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify cart count on moving item from save for later to cart
   * @params : None
   * @returns : None
   * */

  async verifyCartCount() {
    const cartSkuCount = '1';
    const cartItemCount = await page.innerText(elements.cartPage.lblCartSkuCount);
    const strCartItemCount = cartItemCount.replace(/[^\d]/g, '');
    expect(strCartItemCount).toEqual(cartSkuCount);
    testReport.log(this.pageName, 'Assert -> Validating cart count');
  }

  /**
   * @author: skrishnasamy
   * @function_Name : validateSaveForLater
   * @Description : Verify favourites count on moving item from save for later to cart
   * @params : None
   * @returns : None
   * */

  async verifyFavouritesCount() {
    if (env.EXEC_SITE.includes('crate')) {
      if (!commonUtils.verifyIsMobile()) {
        const favouritesItemCount = await page.locator(elements.cartPage.lblFavouritesItemCount).textContent();
        const favouritesCount = '0';
        expect(await favouritesItemCount).toEqual(favouritesCount);
        testReport.log(this.pageName, 'verify favourites count');
      }
    } else if (!commonUtils.verifyIsMobile()) {
      await expect(page.locator(elements.cartPage.lblCb2Favourites)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Validating favourites icon');
    }
  }

  /**
   * @author: joverton
   * @function_Name : clickIncrementCartItemQuantity
   * @Description : Click the increment cart item quantity link
   * @params : Item whose quantity will be incremented
   * @returns : true/false
   * */
  async clickIncrementCartItemQuantity(skuInput) {
    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    let isSuccess = false;
    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        // const ele = arrayCartItemElements[i];
        const skuNumTxt = await page.locator(elements.cartPage.lblCartSkuNum).nth(i).textContent();
        const skuNum = skuNumTxt?.split(' ')[1];
        if (skuNum === skuInput) {
          await page.locator(elements.cartPage.btnIncrementItemQuantity).nth(i).click();
          await page.waitForLoadState('domcontentloaded');
          testReport.log(this.pageName, 'Clicked increment cart item quantity button');
          isSuccess = true;
        }
      })
    );

    const initialPrice = await page.locator(elements.cartPage.lblCartSaleRegularSkuPrice).textContent();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(1000);
      const newPrice = await page.locator(elements.cartPage.lblCartSaleRegularSkuPrice).textContent();
      if (newPrice !== initialPrice) {
        break;
      }
    }

    if (!isSuccess) {
      testReport.log(this.pageName, 'SKUs did not match');
    }
    expect(isSuccess).toBeTruthy();
    return isSuccess;
  }

  /**
   * @author: joverton
   * @function_Name : clickDecrementCartItemQuantity
   * @Description : Click the decrement cart item quantity link
   * @params : Item whose quantity will be decremented
   * @returns : true/false
   * */
  async clickDecrementCartItemQuantity(skuInput) {
    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    let isSuccess = false;
    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        const skuNumTxt = await page.locator(elements.cartPage.lblCartSkuNum).nth(i).textContent();
        const skuNum = skuNumTxt?.split(' ')[1];
        if (skuNum === skuInput) {
          await page.locator(elements.cartPage.btnDecrementItemQuantity).nth(i).click();
          testReport.log(this.pageName, 'Clicked decrement cart item quantity button');
          isSuccess = true;
        }
      })
    );
    if (!isSuccess) {
      testReport.log(this.pageName, 'SKUs did not match');
    }
    expect(isSuccess).toBeTruthy();
    return isSuccess;
  }

  /**
   * @author: joverton
   * @function_Name : verifyCartItemQuantity
   * @Description : Verify cart item has a specified quantity in the cart line item display
   * @params : skuInput = Item in question, cartItemQuantity = the quantity of the SKU in the Cart
   * @returns : true/false
   * */
  async verifyCartItemQuantity(skuInput, cartItemQuantity) {
    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    let isSuccess = false;
    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        const skuNumTxt = await page.locator(elements.cartPage.lblCartSkuNum).nth(i).textContent();
        const skuNum = skuNumTxt?.split(' ')[1];
        if (skuNum === skuInput) {
          const quantityDisplayText = await page.locator(elements.cartPage.inputItemQuantity).nth(i).inputValue();
          expect(quantityDisplayText.replace(/\s+/g, ' ')).toContain(cartItemQuantity);
          testReport.log(this.pageName, `Cart item quantity -> ${quantityDisplayText}, expected ${cartItemQuantity} `);
          isSuccess = true;
        }
      })
    );
    if (!isSuccess) {
      testReport.log(this.pageName, 'Cart item quantity: SKUs did not match');
    }
    expect(isSuccess).toBeTruthy();
    return isSuccess;
  }

  /**
   * @author: asoman
   * @function_Name : cartCleanup
   * @Description : remove all the items exists in the cart
   * @params : world object array from the add to cart steps
   * @returns : None
   * */

  async cleanupCartByRemovingAllItems() {
    await page.waitForLoadState('domcontentloaded', { timeout });
    // check if global popup is displayed for canada and if yes, click on proceed to Canada
    if (env.EXEC_SITE.includes('can')) {
      await productPage.proceedToCanadaFromGlobalPopup();
    }
    // validate the number of items added to cart
    await expect(page.locator(elements.cartPage.lblCartSkuCount)).toBeVisible({ timeout });

    const skuCountMsg = page.locator(elements.cartPage.lblCartSkuCount);
    testReport.log(this.pageName, `Cart page is displayed with ${skuCountMsg} item(s)`);

    // const arrayCartItemElements = await page.$$(elements.cartPage.arrayCartItemElements);
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    // const arrayCartItems=await page.locator()
    await arrayCartItemElements.reduce(async (previousPromise, currentValue, currentIndex) => {
      await previousPromise;
      const skuNum = await page.locator(elements.cartPage.lblCartSkuNum).nth(currentIndex).textContent();
      await expect(page.locator(elements.cartPage.btnRemove).nth(currentIndex)).toBeVisible({ timeout });
      testReport.log(this.pageName, 'Assert -> Remove Item option is present');
      await page.locator(elements.cartPage.btnRemove).nth(currentIndex).click();
      testReport.log(this.pageName, `Removed Item # ${currentIndex} -> SKU: ${skuNum} `);
      await page.waitForLoadState('domcontentloaded', { timeout });
    }, Promise.resolve());
    await expect(page.locator('.empty-cart-message')).toBeVisible({ timeout });

    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * @author: gbollepalli
   * @function_Name : verifyItemLevelShippingMethod
   * @Description : Verify shipmethod is getting updated as we update Zip Code
   * @params : None
   * @returns : None
   * */
  async verifyItemLevelShippingMethod(shippingMethod) {
    await page.waitForLoadState('domcontentloaded');
    const shipMethodDisplayMethod = await page.locator(elements.cartPage.lnkShipping).textContent();
    expect(shipMethodDisplayMethod.trim()).toEqual(shippingMethod.trim());
    testReport.log(this.pageName, `${shippingMethod} - Shipping Method has been Updated`);
    const updatedZipCode = await page.locator(elements.cartPage.txtZipCodetxt).textContent();
    testReport.log(this.pageName, `${shippingMethod} - Updated Zip Code: ${updatedZipCode} `);
  }

  /**
   * @author: gbollepalli
   * @function_Name : clickOnShippingDeliveryPopUpLink
   * @Description : Click on Shipping Delivery Pop Up Link
   * @params : None
   * @returns : None
   * */
  async clickOnShippingDeliveryPopUpLink() {
    await page.click(elements.cartPage.lnkShipping);
    await page.waitForLoadState();
    // await page.waitForTimeout(2000);
    testReport.log(this.pageName, 'Click on Shipping Delivery PopUp Link on Cart Page');
  }

  /**
   * @author: gbollepalli
   * @function_Name : verifyShippingDetails
   * @Description : Verify Shipping Details in Shipping PopUp
   * @params : None
   * @returns : None
   * */
  async verifyShippingDetails(shipMethod) {
    await page.waitForLoadState('domcontentloaded');
    switch (shipMethod) {
      case 'Local In-Home':
        if (env.COUNTRY === 'US') {
          const localIHDHeader = await page.locator(elements.cartPage.txtShippingPopUpHeader).textContent();
          expect(localIHDHeader.trim()).toEqual(testData.ShippingPopUpMessages.msgLIHHeader);
          testReport.log(this.pageName, `${shipMethod}Has Header ${localIHDHeader.trim()} `);

          const localIHD = await page.locator(elements.cartPage.txtLIHFOU999).textContent();
          expect(localIHD.trim()).toEqual(testData.ShippingPopUpMessages.msgtxtLIHFurnitureOrderUnder999);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localIHDHeader.trim()} `);

          const localIHDUp100Mil = await page.locator(elements.cartPage.txtLIHUpto100Mil).textContent();
          expect(localIHDUp100Mil.trim()).toEqual(testData.ShippingPopUpMessages.msgLIHLimitedFurbitureOrderUpto100Miles);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localIHDUp100Mil.trim()} `);

          const localIHDOver100Mil = await page.locator(elements.cartPage.txtLIHOver100Mil).textContent();
          expect(localIHDOver100Mil.trim()).toEqual(testData.ShippingPopUpMessages.msgLIHLimitedFurbitureOrderOver100Miles);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localIHDOver100Mil.trim()} `);

          const localInHomeUnlimitedDelivery = await page.locator(elements.cartPage.txtLIHUnlimted).textContent();
          expect(localInHomeUnlimitedDelivery.trim()).toEqual(testData.ShippingPopUpMessages.msgtxtLIHFurnitureOrderUnlimited);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localInHomeUnlimitedDelivery.trim()} `);

          const localIHDULUp100Mil = await page.locator(elements.cartPage.txtLIHULUpto100Mil).textContent();
          expect(localIHDULUp100Mil.trim()).toEqual(testData.ShippingPopUpMessages.msgLIHULUpto100Miles);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localIHDULUp100Mil.trim()} `);

          const localIHDULOver100Mil = await page.locator(elements.cartPage.txtLIHULOver100Mil).textContent();
          expect(localIHDULOver100Mil.trim()).toEqual(testData.ShippingPopUpMessages.msgLIHULOver100Miles);
          testReport.log(this.pageName, `${shipMethod}Has Message ${localIHDULOver100Mil.trim()} `);
        } else if (env.COUNTRY === 'CA') {
          let deliveryDetailsTexttable = await page.innerText(elements.cartPage.txtCANDeliverDetailsLIHtable);
          deliveryDetailsTexttable = deliveryDetailsTexttable.replaceAll('\t', '');
          deliveryDetailsTexttable = deliveryDetailsTexttable.replaceAll('\n', '');
          // deliveryDetailsTexttable = deliveryDetailsTexttable.replace(/\s+/g, ' ');
          // console.log("arraytxtCANDeliverDetailsLIHtable =" + deliveryDetailsTexttable.trim());
          // console.log("env.CART_LIH_MSG =" + env.CART_LIH_MSG);
          expect(deliveryDetailsTexttable.trim()).toEqual(env.CART_LIH_MSG);
          testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexttable.trim()} `);
        }
        break;
      case 'Basic Freight': {
        const basicFreightDelivery = await page.locator(elements.cartPage.txtShippingPopUpHeader).textContent();
        expect(basicFreightDelivery.trim()).toEqual(testData.ShippingPopUpMessages.msgBFHeader);
        testReport.log(this.pageName, `${shipMethod}Has Message ${basicFreightDelivery.trim()} `);

        if (env.COUNTRY === 'US') {
          const deliveryDetailsBFText = page.locator(elements.cartPage.txtbftShippingCharge).innerText();
          expect(await deliveryDetailsBFText).toContain(env.MSG_SCBFLINE);
          testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsBFText} `);
        } else if (env.COUNTRY === 'CA') {
          const deliveryDetailsBFText = await page.innerText(elements.cartPage.txtCANBFDHeaderText);
          const deliveryDetailsTexts = deliveryDetailsBFText.replaceAll('\n', ' ');
          // deliveryDetailsTexts = deliveryDetailsBFText.replaceAll(/&nbsp;/g, '');
          expect(deliveryDetailsTexts.trim()).toEqual(env.MSG_SCBFLINE);
          testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexts.trim()} `);
        }
        break;
      }
      case 'Long Distance In-Home': {
        const ldDelivery = await page.locator(elements.cartPage.txtldDelivery).textContent();
        expect(ldDelivery.trim()).toEqual(testData.ShippingPopUpMessages.msgldDelivery);
        testReport.log(this.pageName, `${shipMethod}Has Message ${ldDelivery.trim()} `);
        let ldShippingCharge;
        if (env.COUNTRY === 'US') {
          ldShippingCharge = await page.locator(elements.cartPage.txtldShippingCharge).textContent();
          expect(ldShippingCharge.trim()).toEqual(testData.ShippingPopUpMessages.msgldShippingCharge);
          testReport.log(this.pageName, `${shipMethod}Has Message ${ldShippingCharge.trim()} `);
        } else if (env.COUNTRY === 'CA') {
          ldShippingCharge = await page.locator(elements.cartPage.txtldShippingCharge).textContent();
          expect(ldShippingCharge.trim()).toEqual(testData.ShippingPopUpMessages.msgldCAShippingCharge);
          testReport.log(this.pageName, `${shipMethod}Has Message ${ldShippingCharge.trim()} `);
        }
        break;
      }
      case 'Standard': {
        await expect(page.locator(elements.cartPage.btnShippingCharges)).toHaveText(`Shipping Charges`);
        await expect(page.locator(elements.cartPage.btnShippingCharges)).toHaveAttribute('aria-expanded');
        await expect(page.locator(elements.cartPage.hdrStandardDeliveryFee)).toHaveText(`Standard Delivery Fee`);
        if (env.COUNTRY === 'US') {
          await expect(page.locator(elements.cartPage.msgUSStandardDeliveryFee).nth(0)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG1_TEXT);
          await expect(page.locator(elements.cartPage.msgUSStandardDeliveryFee).nth(1)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG2_TEXT);
          await expect(page.locator(elements.cartPage.msgUSStandardDeliveryFee).nth(2)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG3_TEXT);
          await expect(page.locator(elements.cartPage.hdrUSShippingDestinations).first()).toHaveText(env.CART_SHIPPING_DESTINATIONS_HDR);
          await this.verifyShippingRatesTable();
          testReport.log(this.pageName, `Verified shipping rates to destinations within the contiguous U.S.`);
          await expect(page.locator(elements.cartPage.hdrUSShippingDestinations).last()).toHaveText(env.CART_SHIPPING_DESTINATIONS_ALASKA_HDR);
          await this.verifyAHShippingRatesTable();
          testReport.log(this.pageName, `Verified shipping rates to Alaska, Hawaii and U.S. Territories`);
        } else {
          await expect(page.locator(elements.cartPage.msgCAStandardDeliveryFee).nth(0)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG1_TEXT);
          await expect(page.locator(elements.cartPage.msgCAStandardDeliveryFee).nth(1)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG2_TEXT);
          await expect(page.locator(elements.cartPage.msgCAStandardDeliveryFee).nth(2)).toHaveText(env.CART_STANDARD_DELIVERY_FEE_MSG3_TEXT);
          await expect(page.locator(elements.cartPage.hdrCAShippingDestinations)).toHaveText(env.CART_SHIPPING_DESTINATIONS_HDR);
          await this.verifyShippingRatesTable();
          testReport.log(this.pageName, `Verified shipping rates to destinations within Canada.`);
        }

        await page.locator(elements.cartPage.btnCloseShippingPopUp).click();
        testReport.log(this.pageName, `Closed shipping charges popup`);
        break;
      }
      default:
        break;
    }
  }

  /**
   * @author: gbollepalli
   * @function_Name : verifyDeliveryDetails
   * @Description : Verify verifyDeliveryDetails in Shipping PopUp
   * @params : None
   * @returns : None
   * */
  async verifyDeliveryDetails(shipMethod) {
    await page.click(elements.cartPage.btnExpandDeliveryDetails);
    switch (shipMethod) {
      case 'Local In-Home': {
        // Validating Delivery details header
        const deliveryIHDHeader = await page.locator(elements.cartPage.txtDeliveryPopUpHeader).textContent();
        expect(deliveryIHDHeader.trim()).toEqual(testData.ShippingPopUpMessages.msgDeliveryLIHHeader);
        testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryIHDHeader.trim()} `);
        // validating Delivery details content
        const deliveryDetailsText = await page.innerText(elements.cartPage.txtDeliverDetails);
        let deliveryDetailsTexts = deliveryDetailsText.replaceAll('\n', ' ');
        expect(deliveryDetailsTexts.trim()).toEqual(env.MSG_SCDCLINE);
        await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexts.trim()} `);

        if (env.COUNTRY === 'US') {
          await page.click(elements.cartPage.btnExpandDIDetails);
          await testReport.log(this.pageName, `Expanded Domestic and International Delivery details`);
          // validating domestic and international delivery details content
          let deliveryDetailsIntTexts = await page.innerText(elements.cartPage.txtDeliveryDI);
          deliveryDetailsIntTexts = deliveryDetailsIntTexts.replaceAll('\n', ' ');
          deliveryDetailsTexts = this.isMobile
            ? deliveryDetailsIntTexts.replaceAll('\n', ' ').replaceAll('International Delivery', ' International Delivery')
            : deliveryDetailsIntTexts;
          expect(deliveryDetailsIntTexts.trim()).toEqual(env.MSG_SCDI);
          testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsIntTexts.trim()} `);
          await page.click(elements.cartPage.btnExpandDIDetails);
        }
        const ldShippingAmount = await page.locator(elements.cartPage.txtldShippingAmount).textContent();
        await page.click(elements.cartPage.btnPopUpClose);
        const ldShippingAmountOrderSummary = await page.locator(elements.cartPage.txtCartShippingAmount).textContent();
        expect(ldShippingAmount.trim()).toEqual(ldShippingAmountOrderSummary.trim());
        await testReport.log(this.pageName, `${shipMethod}Has Shipping Charge ${ldShippingAmount.trim()} `);
        break;
      }
      case 'Basic Freight': {
        // validating delivery details header
        const basicFreightDelivery = await page.locator(elements.cartPage.txtShippingPopUpHeader).textContent();
        expect(basicFreightDelivery.trim()).toEqual(testData.ShippingPopUpMessages.msgBFHeader);
        await testReport.log(this.pageName, `${shipMethod} Has Message header ${basicFreightDelivery.trim()} `);
        // validating delivery details content
        const deliveryDetailsText = await page.innerText(elements.cartPage.txtDeliverDetails);
        let deliveryDetailsTexts = deliveryDetailsText.replaceAll('\n', ' ');

        if (env.COUNTRY === 'US') {
          deliveryDetailsTexts = this.isMobile
            ? deliveryDetailsTexts.replaceAll(' International', '  International').replaceAll('\n', ' ')
            : deliveryDetailsTexts;
          expect(deliveryDetailsTexts.trim()).toEqual(env.MSG_SCDCBFD);
          await testReport.log(this.pageName, `${shipMethod} Has Message content ${deliveryDetailsTexts.trim()} `);
          await page.click(elements.cartPage.btnExpandDIDetails);
          await testReport.log(this.pageName, `Expanded Domestic and International Delivery details`);
          // validating domestic and international delivery details content
          let deliveryDetailsIntTexts = await page.innerText(elements.cartPage.txtDeliveryDI);
          deliveryDetailsIntTexts = deliveryDetailsIntTexts.replaceAll('\n', ' ');
          deliveryDetailsIntTexts = this.isMobile
            ? deliveryDetailsIntTexts.replaceAll('\n', ' ').replaceAll('International Delivery', ' International Delivery')
            : deliveryDetailsIntTexts;
          expect(deliveryDetailsIntTexts.trim()).toEqual(env.MSG_SCDI);
          await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsIntTexts.trim()} `);

          await page.click(elements.cartPage.btnPopUpClose);
          const bfShippingAmountOrderSummary = await page.locator(elements.cartPage.txtCartShippingAmount).textContent();
          expect(bfShippingAmountOrderSummary.trim()).toEqual(env.MSG_BF_CHARGE);
          await testReport.log(this.pageName, `${shipMethod} Has ShippingCharge ${bfShippingAmountOrderSummary.trim()} `);
        } else if (env.COUNTRY === 'CA') {
          expect(deliveryDetailsTexts.trim()).toEqual(env.MSG_SCDCBFDDD);
          await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexts.trim()} `);
          await page.click(elements.cartPage.btnPopUpClose);
          const bfShippingAmountOrderSummary = await page.locator(elements.cartPage.txtCartShippingAmount).textContent();
          expect(bfShippingAmountOrderSummary.trim()).toEqual(env.MSG_BF_CHARGE);
          await testReport.log(this.pageName, `${shipMethod} Has ShippingCharge ${bfShippingAmountOrderSummary.trim()} `);
        }
        break;
      }
      case 'Long Distance In-Home': {
        // validating delivery details header
        const ldDelivery = await page.locator(elements.cartPage.txtldDelivery).textContent();
        expect(ldDelivery.trim()).toEqual(testData.ShippingPopUpMessages.msgldDelivery);
        await testReport.log(this.pageName, `${shipMethod}Has Message ${ldDelivery.trim()} `);
        // validating delivery details content
        const deliveryDetailsText = await page.innerText(elements.cartPage.txtDeliverDetails);
        let deliveryDetailsTexts = deliveryDetailsText.replaceAll('\n', ' ');
        let ldShippingAmount;
        if (env.COUNTRY === 'US') {
          deliveryDetailsTexts = this.isMobile
            ? deliveryDetailsTexts.replaceAll(' International', '  International').replaceAll('\n', ' ')
            : deliveryDetailsTexts;
          expect(deliveryDetailsTexts.trim()).toContain(env.MSG_SCDCLDI);
          await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexts.trim()} `);
          // validating domestic and international delivery details content
          await page.click(elements.cartPage.btnExpandDIDetails);
          let deliveryDetailsIntTexts = await page.locator(elements.cartPage.txtDeliveryDI).textContent();
          deliveryDetailsIntTexts = deliveryDetailsIntTexts.replaceAll('\n', ' ');
          deliveryDetailsIntTexts = deliveryDetailsIntTexts
            .replaceAll('\n', ' ')
            .replaceAll('Request  form', 'Request form')
            .replaceAll('  Shipping to Canada', ' Shipping to Canada')
            .replaceAll('800.967.6696. ', '800.967.6696.')
            .replaceAll('Shipping outside', ' Shipping outside');
          expect(deliveryDetailsIntTexts.trim()).toEqual(env.MSG_SCDI);
          await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsIntTexts.trim()} `);

          ldShippingAmount = await page.locator(elements.cartPage.txtldShippingAmount).textContent();
        } else if (env.COUNTRY === 'CA') {
          expect(deliveryDetailsTexts.trim()).toEqual(env.MSG_SCDCLDI);
          await testReport.log(this.pageName, `${shipMethod}Has Message ${deliveryDetailsTexts.trim()} `);
          ldShippingAmount = await page.locator(elements.cartPage.txtldShippingAmount).textContent();
        }
        await page.click(elements.cartPage.btnPopUpClose);
        const ldShippingAmountOrderSummary = await page.locator(elements.cartPage.txtCartShippingAmount).textContent();
        expect(ldShippingAmount.trim()).toEqual(ldShippingAmountOrderSummary.trim());
        await testReport.log(this.pageName, `${shipMethod}Has ShippingCharge ${ldShippingAmount.trim()} `);
        break;
      }
      case 'Standard': {
        await expect(page.locator(elements.cartPage.btnShippingCharges)).toHaveText(`Shipping Charges`);
        await expect(page.locator(elements.cartPage.btnShippingCharges)).toHaveAttribute('aria-expanded', `false`);
        await expect(page.locator(elements.cartPage.btnDeliveryDetails)).toHaveText(`Delivery Details`);
        await expect(page.locator(elements.cartPage.btnDeliveryDetails)).toHaveAttribute('aria-expanded');
        await expect(page.locator(elements.cartPage.hdrStandardDeliveryDetails)).toHaveText(`Standard Delivery Details`);
        await expect(page.locator(elements.cartPage.msgStandardDeliveryDetails)).toHaveText(env.CART_STANDARD_DELIVERY_DETAILS_MSG);
        if (env.COUNTRY === 'CA') {
          await expect(page.locator(elements.cartPage.msgCAStandardDeliveryDetails1)).toHaveText(env.CART_STANDARD_DELIVERY_DETAILS_MSG1);
          await expect(page.locator(elements.cartPage.msgCAStandardDeliveryDetails2)).toHaveText(env.CART_STANDARD_DELIVERY_DETAILS_MSG2);
        } else {
          await this.verifyDeliveryDetailsTable();
        }
        testReport.log(this.pageName, `Verified shipping details`);
        break;
      }
      default:
        break;
    }
  }

  async getSharedRegistryUrlFromEnv(sharedRegistryUrl) {
    return env[sharedRegistryUrl];
  }

  /**
   * @author: jlight
   * @function_Name : proceedToReview
   * @Description : click on proceed to review button to see review page
   * @params : None
   * @returns : None
   * */
  async proceedToReview() {
    testReport.log(this.pageName, 'Proceeding to REVIEW PAGE');
    await expect(page.locator(elements.paymentPage.btnPymtProceedToReview)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnPymtProceedToReview);
  }

  orderDetailsObject(profileType) {
    const orderObj = {
      ...Order
    };

    switch (profileType) {
      case 'expressUsr':
        orderObj.userLoggedIn = true;
        orderObj.receiptEmail = testData.returningUserInfo.expressCheckoutUsr.email;
        orderObj.paymentMethod = [testData.returningUserInfo.expressCheckoutUsr.defaultCreditCard];
        orderObj.billingAddress = testData.returningUserInfo.expressCheckoutUsr.defaultBillToAddress;
        orderObj.itemContexts.itemContext[0].recipient0.shipToAddress = testData.returningUserInfo.expressCheckoutUsr.defaultShipToAddress;
        break;
      case 'dtpUsr':
        orderObj.userLoggedIn = true;
        orderObj.receiptEmail = testData.returningUserInfo.defaultReturningUsr.email;
        orderObj.paymentMethod = [testData.returningUserInfo.defaultReturningUsr.defaultCreditCard];
        orderObj.billingAddress = testData.returningUserInfo.defaultReturningUsr.defaultBillToAddress;
        orderObj.itemContexts.itemContext[0].recipient0.shipToAddress = testData.returningUserInfo.defaultReturningUsr.defaultShipToAddress;
        break;
      case 'returningUsr':
        orderObj.userLoggedIn = true;
        orderObj.receiptEmail = testData.returningUserInfo.defaultReturningUsr.email;
        orderObj.paymentMethod = [testData.returningUserInfo.defaultReturningUsr.defaultCreditCard];
        orderObj.billingAddress = testData.returningUserInfo.defaultReturningUsr.defaultBillToAddress;
        orderObj.itemContexts.itemContext[0].recipient0.shipToAddress = testData.returningUserInfo.defaultReturningUsr.defaultShipToAddress;
        break;
      default:
        orderObj.userLoggedIn = false;
        orderObj.receiptEmail = testData.returningUserInfo.defaultReturningUsr?.email;
        orderObj.paymentMethod = [testData.returningUserInfo.defaultReturningUsr.defaultCreditCard];
        orderObj.billingAddress = testData.returningUserInfo.defaultReturningUsr.defaultBillToAddress;
        orderObj.itemContexts.itemContext[0].recipient0.shipToAddress = testData.returningUserInfo.defaultReturningUsr.defaultShipToAddress;
    }
    return orderObj;
  }

  /**
   * @author: amariappan
   * @function_Name : verifyTaxExemptionCanBeAppliedMessage
   * @Description : Verify that the Tax Exemption can be applied during checkout message is displayed
   * @params : None
   * @returns : None
   * */

  async verifyTaxExemptionCanBeAppliedMessage() {
    await expect(page.getByText(elements.txtLocators.txtDtpCanBeApplied)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Assert -> DTP Tax Exemption can be applied message is displayed');
  }

  async verifyAltPaymentsHidden() {
    await expect(page.locator(elements.cartPage.altPaymentsContainer)).toBeEmpty();
    testReport.log(this.pageName, 'Alt Payments found to be hidden');
  }

  async verifyPromoDiscountApplied() {
    await expect(page.locator(elements.cartPage.txtAppliedPromoCode)).not.toBeEmpty();
    await expect(page.getByText(this.dtpPromoText)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Trade program discount promo message is displayed -> Trade Program discount has been applied');

    const MerchandiseEligibleItems =
      (await page.getByTestId(this.cartLineItemRow).count()) -
      (await page.getByTestId(this.cartLineItemRow).filter({ hasText: 'Promo code not eligible' }).count());
    if (MerchandiseEligibleItems > 0) await expect(page.getByTestId(this.merchandiseDiscountAmt)).toBeVisible({ timeout });
    if (env.COUNTRY === 'US' && env.BRAND === 'Crate' && page.getByTestId(this.shippingDiscountAmt).count() > 0) {
      await expect.soft(page.getByTestId(this.shippingDiscountAmt)).toBeVisible({ timeout });
    }
    testReport.log(this.pageName, 'Promo Code has been applied');
  }

  async verifyRemovePromoIsDisabled() {
    await expect(page.locator(elements.cartPage.btnRemovePromo)).toHaveClass(/disabled-promo/);
    testReport.log(this.pageName, 'Remove Promo button is disabled');
  }

  async verifyGiftRegistryViewRegistryLink() {
    await page.waitForLoadState('load');
    const arrayCartItemElements = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);
    let isSuccess = false;
    await Promise.all(
      arrayCartItemElements.map(async (ele, i) => {
        const elem = page.locator(elements.giftRegistryItems.lnkViewRegistry).nth(i);
        testReport.log(this.pageName, 'Looking for view registry link');
        if (elem) {
          testReport.log(this.pageName, 'Found view registry link');
          isSuccess = true;
        }
      })
    );
    if (!isSuccess) {
      testReport.log(this.pageName, 'Could not find view registry link');
    }
    expect(isSuccess).toBeTruthy();
    return isSuccess;
  }

  async selectStorePickup() {
    await page.locator(elements.cartPage.lnkFreePickup).nth(0).click();
    await expect(page.locator(elements.cartPage.txtZipCode)).toBeVisible({ timeout });

    if (await page.locator(elements.cartPage.lblPickupAlert).first().isVisible()) {
      await page.fill(elements.cartPage.txtZipCode, '60025');
      await page.locator(elements.cartPage.btnZipcodeSubmit).click();
      await expect(page.locator('div.slide-open').first()).toBeVisible({ timeout });
    }
    const eleStores = page.locator('div.slide-open');
    let intStoreNumber = 0;
    for (let i = 0; i < eleStores.length; i++) {
      const test = eleStores[i].innerText();
      if (test === 'In Stock') intStoreNumber = i;
    }

    await page.locator('div.store-pickup-modal').locator('div.slide-open').nth(intStoreNumber).click();
    await page.locator('a:text("Select This Location")').nth(intStoreNumber).click();

    await expect(page.locator(elements.cartPage.lblPickupAvailable).first()).toBeVisible({ timeout });

    testReport.log(this.pageName, 'Pickup Store is chosen successfully');
    await expect(page.locator(elements.cartPage.rdPickup).nth(0)).toBeChecked();
    testReport.log(this.pageName, 'Free pickup radio button is checked');
  }

  async verifyBasicFreightLabelInCart() {
    await expect(page.locator(elements.cartPage.btnTxtShippingDeliveryRate)).toBeVisible(timeout);
    await expect(page.locator(elements.cartPage.btnTxtShippingDeliveryRate)).toContainText('Basic Freight');
    await page.click(elements.cartPage.btnTxtShippingDeliveryRate);
    await expect(page.locator(elements.cartPage.txtldDelivery)).toContainText('Basic Freight Delivery Fee');
    await page.click(elements.cartPage.btnPopUpClose);
  }

  async validateMonogramPDP(skuNum) {
    await page.waitForLoadState('domcontentloaded');
    // await page.waitForSelector(elements.productPage.SKU_NUM);
    await expect(page.getByText(skuNum).nth(1)).toHaveText(skuNum, { timeout });
    await page.waitForLoadState('domcontentloaded');

    // check if global popup is displayed for canada and if yes, click on proceed to Canada
    if (env.EXEC_SITE.includes('can')) {
      await this.proceedToCanadaFromGlobalPopup();
    }

    await expect(page.locator(elements.cartPage.SkuNum).first()).toHaveText(skuNum, { timeout });
    testReport.log(this.pageName, `Assert -> SKU number displayed in Product page is same as search keyword ->${skuNum}`);

    let skuTitle = await page.innerText(elements.cartPage.SkuDescription);
    skuTitle = skuTitle.replace('Personalized ', '');
    testReport.log(this.pageName, `Item Description from the Product page ->${skuTitle}`);

    let skuPrice = await page.innerText(elements.cartPage.SkuPriceRegular);
    testReport.log(this.pageName, `Item unit price displayed is ->${skuPrice}`);

    if (skuPrice.includes('Sale')) {
      skuPrice = (await page.getInnerText(elements.cartPage.SkuPriceSale))[0].replace('Sale ', '');
    } else if (skuPrice.includes('Clearance')) {
      skuPrice = (await page.getInnerText(elements.cartPage.SkuPriceSale))[0].replace('Clearance ', '');
    } else {
      skuPrice = await page.locator(elements.cartPage.SkuPriceRegular).textContent();
      skuPrice = skuPrice.replace(' reg.  ', '');
      testReport.log(this.pageName, `Item On Sale/Clearance and salePrice/clearancePrice displayed is ->${skuPrice}`);
    }

    const textElement = await page.getByTestId('mg-text').getByTestId('text-element').inputValue();
    const fontSku = await page.locator(elements.cartPage.fontSku).textContent();
    const threadSku = await page.locator(elements.cartPage.threadSku).textContent();

    const itemInfo = {};
    itemInfo.skuNum = skuNum;
    itemInfo.skuTitle = skuTitle;
    itemInfo.skuPrice = skuPrice;

    itemInfo.textElement = textElement;
    itemInfo.fontSku = fontSku;
    itemInfo.threadSku = threadSku;

    let arrivesByMessage = '';
    let stockAvailability = '';
    arrivesByMessage = await page.locator('.secondary-message.secondary-message-contain-promo > span').textContent();
    const availabilityMsg = await page.locator(elements.cartPage.lblCartAvailabilityMsg).textContent();
    itemInfo.arrivesByMessage = arrivesByMessage;
    itemInfo.availabilityMsg = availabilityMsg;

    if (arrivesByMessage.includes('take longer')) {
      stockAvailability = 'backorder';
    }

    itemInfo.stockAvailability = stockAvailability;

    testReport.log(this.pageName, `Captured items details from PDP -> ${itemInfo}`);
    return itemInfo;
  }

  async verifyMonogramDetails(pageName, detail) {
    const details = JSON.parse(detail);
    testReport.log(this.pageName, `Monogram Details found in ${pageName},${details}`);
    await page.waitForLoadState();
    const dataKey = ['textElement', 'fontSku', 'threadSku'];
    await Promise.all(
      dataKey.map(async (ele, i) => {
        const monogramItemElements = await page.locator(elements.confirmationPage.personalizationDetails).nth(i).textContent();
        expect(monogramItemElements).toContain(details[dataKey[i]]);
      })
    );

    let arrivesByMessage;

    if (details.stockAvailability === 'backorder') {
      arrivesByMessage = await page.innerText(elements.cartPage.lblArrivesMessage);
    } else if (pageName === 'Cart') {
      arrivesByMessage = await page.innerText('.deliveryTime >> .button-shipping-delivery > span');
    } else if (pageName === 'Confirmation') {
      arrivesByMessage = await page.getByTestId('lbl-recipient-availability-msg').textContent();
    } else {
      arrivesByMessage = await page.innerText('.selected-shipping-message');
    }

    if (arrivesByMessage) {
      if (pageName === 'Cart') {
        details.arrivesByMessage = arrivesByMessage;
        return details;
      }

      // disabled temporarily due to backorder arrives message issue
      // expect(arrivesByMessage).toContain(details.arrivesByMessage);
    }

    return false;
  }

  /**
   * @author: jlight
   * @function_Name: handleOversizeItemPopup
   * @Description: Close the oversize item popup when checking out with CPU furniture
   * @params : None
   * @returns : None
   * */

  async handleOversizeItemPopup() {
    testReport.log(this.pageName, `handle oversize item popup`);
    expect(await page.locator('.popup-dialog-content-title').textContent()).toContain(env.CART_OVERSIZED_PICKUP_POPUP_TEXT);
    const btnContinueCheckoutFromOversizePopup = this.isMobile
      ? page.locator(elements.cartPage.btnOversizePickupMob)
      : page.locator(elements.cartPage.btnOversizePickupDesk);
    await btnContinueCheckoutFromOversizePopup.click();
    // await page.waitForSelector('#popup-close', { waitFor: 'visible', timeout });
    // await page.click('#popup-close');
  }

  /**
   * @author: jlight
   * @function_Name : clickFreePickup
   * @Description : Click on free pickup
   * @params : None
   * @returns : None
   * */
  async clickFreePickup() {
    await commonUtils.clickUsingElementHandle('[data-testid=pickup-radio-btn]');
    // await page.$eval('[data-testid=pickup-radio-btn]', (elem) => elem.click());
    await page.locator('[class="slide-btn"]').click();
    await page.locator('[class="button button-primary button-md"]').click();
  }

  async clickSelectUpdateWarehouseLink() {
    await page.locator('.button-transparent.location-link').click();
  }

  async clickOnArrivalMessage() {
    await page.locator(elements.cartPage.lblArrivesByMessage).click();
    await page.waitForLoadState();
    testReport.log(this.pageName, 'Click on arrival link on Cart Page');
  }

  async verifyShippingRatesTable() {
    const ratesTable = page.locator(elements.cartPage.tblShippingRates);
    const ratesHeader = ratesTable.locator('thead');
    const headerArray = await ratesHeader.allTextContents();
    let headers;
    headerArray.forEach((header) => {
      headers = header;
    });
    await testReport.log(this.pageName, headers);
    expect(headers).toEqual(env.CART_STANDARD_DELIVERY_RATE_TABLE_HDR);
    const ratesBody = ratesTable.locator('tbody');
    const ratesArray = await ratesBody.allTextContents();
    let ratesDetails;
    ratesArray.forEach((rates) => {
      ratesDetails = rates.trim().replaceAll(/[\t\n\r\s]/gm, '');
    });
    await testReport.log(this.pageName, `Standard Shipping rate :${ratesDetails}`);
    expect(ratesDetails).toEqual(env.CART_STANDARD_DELIVERY_RATE_TABLE_CONTENT);
  }

  async verifyAHShippingRatesTable() {
    const ahRatesTable = page.locator(elements.cartPage.tblAHShippingRates);
    const ahRatesHeader = ahRatesTable.locator('thead');
    const ahHeaderArray = await ahRatesHeader.allTextContents();
    let ahHeaders;
    ahHeaderArray.forEach((ahHeader) => {
      ahHeaders = ahHeader;
    });
    await testReport.log(this.pageName, ahHeaders);
    expect(ahHeaders).toEqual(env.CART_AH_SHIPPING_RATE_TABLE_HDR);
    const ahRatesBody = ahRatesTable.locator('tbody');
    const ahRatesArray = await ahRatesBody.allTextContents();
    let ahRatesDetails;
    ahRatesArray.forEach((ahRates) => {
      ahRatesDetails = ahRates.trim().replaceAll(/[\t\n\r\s]/gm, '');
    });
    await testReport.log(this.pageName, `Alaska/Hawaii shipping rates:${ahRatesDetails}`);
    expect(ahRatesDetails).toEqual(env.CART_AH_SHIPPING_RATE_TABLE_CONTENT);
  }

  async verifyDeliveryDetailsTable() {
    const detailsTable = page.locator(elements.cartPage.tblShippingDetails);
    const detailsHeader = detailsTable.locator('thead');
    const headerArray = await detailsHeader.allTextContents();
    let headers;
    headerArray.forEach((header) => {
      headers = header;
    });
    await testReport.log(this.pageName, headers);
    expect(headers).toEqual(env.CART_DELIVERY_DETAILS_TABLE_HDR);
    const detailsBody = detailsTable.locator('tbody');
    const detailsArray = await detailsBody.allTextContents();
    let deliveryDetails;
    detailsArray.forEach((details) => {
      deliveryDetails = details;
    });
    testReport.log(this.pageName, `Delivery details:${deliveryDetails}`);
    expect(deliveryDetails).toEqual(env.CART_DELIVERY_DETAILS_TABLE_CONTENT);
  }

  async updateQuantity(startRange, endRange) {
    testReport.log(this.pageName, `Start range: ${startRange} and End range ${endRange}`);
    let eRange = endRange.replace(/\$/g, '').replace('CAD ', '');
    eRange = parseFloat(eRange);
    let sRange = startRange.replace(/\$/g, '').replace('CAD ', '');
    sRange = parseFloat(sRange);
    let eleSkuPrice = await page.locator(elements.cartPage.lblCartSaleRegularSkuPrice).innerText();
    eleSkuPrice = eleSkuPrice.replace(/\$/g, '').replace('CAD ', '');
    eleSkuPrice = parseFloat(eleSkuPrice);
    await testReport.log(this.pageName, `erange ${eRange}  srange ${sRange} eleSkuPrice ${eleSkuPrice}`);
    if (eleSkuPrice <= eRange && eleSkuPrice >= sRange) {
      await testReport.log(this.pageName, `Sku price is inside range, no need to update quantity`);
    } else {
      let count = eRange / eleSkuPrice;
      count = Math.floor(count);
      await testReport.log(this.pageName, `Quantity to be updated is  ${count}`);
      if (eleSkuPrice * count <= eRange && eleSkuPrice * count >= sRange) {
        count = count.toString();
        await page.fill(elements.cartPage.inputItemQuantity, count);
        await commonUtils.forcedWait(this.pageName, 10000);
        await testReport.log(this.pageName, `Quatity updated`);
      } else {
        await testReport.log(this.pageName, `error in count calculated`);
        throw new Error(`Error in Quantity updation`);
      }
    }
  }

  async verifyShippingCharge(standardShipCharge) {
    const cartShippingCharge = page.locator(elements.cartPage.lblOrderSummaryEstShippingHandlingTotal);
    await await expect(cartShippingCharge).toHaveText(standardShipCharge);
    await testReport.log(this.pageName, `Expected Shipping Charge : ${standardShipCharge}  Actual Shipping Charge : ${cartShippingCharge}`);
  }

  async verifyShippingAndTax() {
    await expect(page.locator(elements.cartPage.lblShippingCharges)).toHaveText(env.ACNT_SWATCH_AMT);
    await expect(page.locator(elements.cartPage.lblTax)).toHaveText(env.ACNT_SWATCH_AMT);
    testReport.log(this.pageName, 'No shipping and tax added on gift card purchase');
  }

  async loadGiftCardPage() {
    await page.goto(`${env.BASE_URL}/gift-cards/`, { timeout });
    await page.waitForLoadState();
  }

  async selectGiftCardType(giftCardType) {
    const largeSlider = page.locator('.gift-card-slider-large.flexslider');
    await largeSlider.locator(`img[data-cardtype=${giftCardType}]`).click();
  }

  async enterGiftCardDenomination() {
    await page.fill('#Amount', '100', { delay: 100 });
  }

  async addGiftCardToCart() {
    await page.waitForLoadState();
    await page.locator('.jsbtn-Personalize').click();
    await commonUtils.forcedWait(this.pageName, 5000);

    if (global.isMobile) {
      await page.goto(`${env.BASE_URL}/checkout/cart`);
    } else {
      await page.locator(elements.cartPage.CheckoutButton).click();
    }
    await page.waitForLoadState();
  }

  async getGiftCardInfo(arrivesByDate) {
    await page.waitForLoadState();
    const itemInfo = {};
    const eleSkuPrice = await page.locator('#Amount').inputValue();
    itemInfo.skuNum = '999055';
    itemInfo.skuTitle = 'Gift Card';
    itemInfo.skuPrice = eleSkuPrice;
    itemInfo.availabilityMsg = 'In stock and ready to ship';
    itemInfo.arrivesByMessage = arrivesByDate;
    return JSON.stringify(itemInfo);
  }

  async verifyProductCarouselIsDisplayed() {
    await page.locator(elements.cartPage.secCartProdyctCarousel).isVisible();
    await testReport.log(this.pageName, `Product carousel is displayed in cart page`);
  }

  async addCarouselProductToCart(itemPlace) {
    const carouselItemInfo = {};
    let skuNum;
    let skuTitle;
    let skuPrice;
    let itemCount;
    if (itemPlace === 'First') {
      skuTitle = await page.locator(elements.cartPage.lnkCarouselSkuDesc).nth(0).innerText();
      const carouselSkuPriceElement = page.locator(elements.cartPage.lnkCarouselSkuPrice).nth(0);
      const salePriceElementCount = await carouselSkuPriceElement.locator(elements.cartPage.lnkCarouselSkuSalePrice).count();
      if (salePriceElementCount > 0) {
        skuPrice = await carouselSkuPriceElement.locator(elements.cartPage.lnkCarouselSkuSalePrice).innerText();
        skuPrice = skuPrice.replace(/[a-z\s]/gi, '');
      } else {
        skuPrice = await page.locator(elements.cartPage.lnkCarouselSkuPrice).nth(0).innerText();
      }
      skuNum = await page.locator(elements.cartPage.lnkCarouselSkuNum).first().getAttribute('href');
      await page.locator(elements.cartPage.btnCarouselAddToCart).nth(0).click();
      itemCount = 1;
    } else {
      skuTitle = await page.locator(elements.cartPage.lnkCarouselSkuDesc).nth(1).innerText();
      const carouselSkuPriceElement = page.locator(elements.cartPage.lnkCarouselSkuPrice).nth(1);
      const salePriceElementCount = await carouselSkuPriceElement.locator(elements.cartPage.lnkCarouselSkuSalePrice).count();
      if (salePriceElementCount > 0) {
        skuPrice = await carouselSkuPriceElement.locator(elements.cartPage.lnkCarouselSkuSalePrice).innerText();
        skuPrice = skuPrice.replace(/[a-z\s]/gi, '');
      } else {
        skuPrice = await page.locator(elements.cartPage.lnkCarouselSkuPrice).nth(1).innerText();
      }
      skuNum = await page.locator(elements.cartPage.lnkCarouselSkuNum).nth(1).getAttribute('href');
      await page.locator(elements.cartPage.btnCarouselAddToCart).nth(1).click();
      itemCount = 2;
    }
    skuNum = skuNum.slice(-6);
    carouselItemInfo.skuNum = skuNum;
    carouselItemInfo.skuTitle = skuTitle;
    carouselItemInfo.skuPrice = skuPrice;
    carouselItemInfo.skuCount = itemCount;
    await testReport.log(this.pageName, `${skuTitle} added to cart from product carousel`);
    return carouselItemInfo;
  }

  async VerifyToastIsDisplayed(itemDetails) {
    const skuDetails = JSON.parse(itemDetails[itemDetails.length - 1]);
    await expect(page.locator(elements.cartPage.txtCarouselToastMessage)).toBeVisible({ timeout });
    await commonUtils.forcedWait(this.pageName, 5000);
    await page.locator(elements.cartPage.txtCarouselToastMessage).isVisible();
    await expect(page.locator(elements.cartPage.txtCarouselToastMessage)).toContainText(`${skuDetails.skuTitle} has been added to Cart above.`, {
      ignoreCase: true
    });
    testReport.log('Toast Verified', itemDetails.length);
  }

  async verifyCartCountOnAddingItemFromProductCarousel(itemDetails) {
    testReport.log(itemDetails);
    const skuDetails = JSON.parse(itemDetails[itemDetails.length - 1]);
    await commonUtils.forcedWait(this.pageName, 5000);
    const strCartCount = await page.innerText(elements.cartPage.lblCartSkuCount);
    const strCartCountNumber = strCartCount.replace(/[^\d]/g, '');
    const cartCountNumber = Number(strCartCountNumber);
    expect(cartCountNumber).toEqual(skuDetails.skuCount + 1);
    await testReport.log(this.pageName, `Verified cart count is getting updated on adding product from product carousel`);
  }

  async verifyAddedItemFromProductCarousel(itemDetails) {
    const skuDetails = JSON.parse(itemDetails[itemDetails.length - 1]);
    const eleSkuTitle = page.locator(elements.cartPage.lblCartSkuDescription).last();
    await this.assertItemTitle(eleSkuTitle, skuDetails.skuTitle);
    const eleSkuNum = page.locator(elements.cartPage.lblCartSkuNum).last();
    await this.assertItemNum(eleSkuNum, skuDetails.skuNum);
    let eleSkuPrice;

    const cartSkuPriceElement = page.locator(elements.cartPage.lblCartSkuPrice).last();
    const salePriceElementCount = await cartSkuPriceElement.locator(elements.cartPage.lblSalePriceElement).count();
    if (salePriceElementCount > 0) {
      eleSkuPrice = page.locator(elements.cartPage.lblSalePrice).last();
    } else {
      eleSkuPrice = page.locator(elements.cartPage.lblCartSkuPrice).last();
    }
    await this.assertItemPrice(eleSkuPrice, skuDetails.skuPrice);
    await testReport.log(this.pageName, `Item added from product carousel to cart is verified in cart`);
  }

  async clickOnViewButtonCarouselToast() {
    await page.locator(elements.cartPage.btncarouselToastView).click();
    await testReport.log(this.pageName, `Clicked View button on carousel toast`);
  }

  async verifyAddedItemIsInViewPort(itemDetails) {
    await expect(page.locator(elements.cartPage.lblCartSkuDescription).last()).toBeInViewport();
    const skuDetails = JSON.parse(itemDetails[itemDetails.length - 1]);
    const eleSkuTitle = page.locator(elements.cartPage.lblCartSkuDescription).last();
    await this.assertItemTitle(eleSkuTitle, skuDetails.skuTitle);
    await testReport.log(this.pageName, `Page scrolled up to the added item`);
  }

  async closeCarouselToast() {
    // await page.locator(elements.cartPage.btnCarouselClose).click();
    await commonUtils.forcedWait(this.pageName, 5000);
    await page.getByTestId('toast-message-message-close').click();
    await commonUtils.forcedWait(this.pageName, 10000);
    await expect(page.locator(elements.cartPage.txtCarouselToastMessage)).toBeHidden();
    await expect(page.locator(elements.cartPage.btncarouselToastView)).toBeHidden();
    testReport.log(this.page, `Carousel toast closed`);
  }

  async clickOnPayPal() {
    const payPalFrame = page.frameLocator('[title="PayPal"]').nth(0);
    // Locate the target element you want to scroll to
    const altPayElement = page.locator('.alt-pay-title');
    if (altPayElement.isVisible()) {
      // Scroll the page to bring the target element into view
      await altPayElement.scrollIntoViewIfNeeded();
    } else {
      testReport.log(this.page, `Target element to scroll down not found`);
    }

    const [newWindow] = await Promise.all([page.waitForEvent('popup'), payPalFrame.locator('.paypal-button-label-container').nth(0).click()]);
    testReport.log(this.pageName, newWindow.url());
    await newWindow.getByPlaceholder('Email or mobile number').isVisible();
    await newWindow.getByRole('img', { name: 'PayPal Logo' }).isVisible();
    await newWindow.getByPlaceholder('Email or mobile number').isVisible();
    await newWindow.getByPlaceholder('Email or mobile number').fill(env.PAYPAL_TEST_USRID);
    await newWindow.locator('#signupContainer div').isVisible();
    await newWindow.getByRole('button', { name: 'Next' }).click();
    await newWindow.getByPlaceholder('Password').click();
    await newWindow.getByPlaceholder('Password').fill(env.PAYPAL_TEST_PWD);
    await newWindow.getByRole('button', { name: 'Log In' }).click();
    await newWindow.locator('[data-testid="consentButton"]').click();
    await page.waitForLoadState('domcontentloaded');
  }

  async verifyPickUpButtonNotDisplayed(sku) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    await expect(productLocator.locator(`[id*="ShippingOptionStorePickup"]`)).toBeHidden();
  }

  async verifyWarehouseDisplayedInStoreGrid(dataTable) {
    const input = dataTable.hashes();
    page.setDefaultTimeout(600000);
    await expect(page.locator(elements.cartPage.lblPickUpLocationNames)).toBeVisible({ timeout });

    for (let i = 0; i < input.length; i++) {
      const divSelector = '.store-pickup-modal'; // Replace with your div selector
      // eslint-disable-next-line playwright/no-eval
      const initialContent = await page.$eval(divSelector, (div) => div.textContent);

      await this.enterZipCode(input[i].zipCode);
      await this.submitZipCode(input[i].zipCode);

      // Poll for changes in the content of the div
      let contentChanged = false;
      const maxPollAttempts = 20;
      let pollAttempt = 0;
      let currentContent;
      while (!contentChanged && pollAttempt < maxPollAttempts) {
        await commonUtils.forcedWait(this.pageName, 1000); // Wait for 1 second before each polling attempt

        // eslint-disable-next-line playwright/no-eval
        currentContent = await page.$eval(divSelector, (div) => div.textContent);
        if (currentContent !== initialContent) {
          contentChanged = true;
        }

        // eslint-disable-next-line no-plusplus
        pollAttempt++;
      }

      const storePickupModelTextContent = page.locator('.store-pickup-modal');
      testReport.log(
        this.pageName,
        `For zipCode ${input[i].zipCode} |expected ${input[i].expectedWarehouse} |not ${input[i].wrongWarehouse} - used ${pollAttempt} sec`
      );
      expect(await storePickupModelTextContent.textContent()).toContain(input[i].expectedWarehouse);
      expect(await storePickupModelTextContent.textContent()).not.toContain(input[i].wrongWarehouse);
    }
  }

  async verifyZipcodeAcceptedInCart(dataTable) {
    const input = dataTable.hashes();
    page.setDefaultTimeout(600000);

    for (let i = 0; i < input.length; i++) {
      testReport.log(this.pageName, `#${i} - ${input[i].description} -${input[i].zipCode}`);
      await this.launchZipCodePopUp();
      await this.enterZipCode(input[i].zipCode);
      await this.submitZipCodeIgnoreError(input[i].zipCode);
    }
  }

  async validateInvalidPromoCodeMessage(promoCode) {
    await expect(page.locator(elements.cartPage.lblInvalidPromoError)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.lblInvalidPromoError)).toHaveText(`${promoCode} is not a valid promo code.`);
  }

  async validateStorePickupMessage(sku) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    testReport.log(await productLocator.locator(elements.cartPage.lblFreeStorePickupWithRadioButton).innerText());
    await expect(productLocator.locator(elements.cartPage.lblFreeStorePickupWithRadioButton)).toHaveText(`Free & Fast Store Pickup`);
    await expect(productLocator.locator(elements.cartPage.btnPickUpHelp)).toBeVisible({ timeout });
    await productLocator.locator(elements.cartPage.btnPickUpHelp).click();
    await expect(page.locator(elements.cartPage.msgPickupFAQ)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.hdrPickupFAQ)).toHaveText(`Store Pickup FAQ`);
    await page.locator(elements.common.btnPopupClose).click();
    await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toBeVisible({ timeout });
  }

  async validateWarehousePickupMessage(sku) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    testReport.log(await productLocator.locator(elements.cartPage.lblFreeWarehousePickupWithRadioButton).innerText());
    await expect(productLocator.locator(elements.cartPage.lblFreeWarehousePickupWithRadioButton)).toHaveText(`Free Warehouse Pickup`);
    await expect(productLocator.locator(elements.cartPage.btnPickUpHelp)).toBeVisible({ timeout });
    await productLocator.locator(elements.cartPage.btnPickUpHelp).click();
    await expect(page.locator(elements.cartPage.msgPickupFAQ)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.hdrPickupFAQ)).toHaveText(`Warehouse Pickup FAQ`);
    await page.locator(elements.common.btnPopupClose).click();
    await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toBeVisible({ timeout });
    await expect(productLocator.locator(elements.cartPage.msgWarehousePickup)).toHaveText(`Pay no delivery fee.`);
    await expect(productLocator.locator(elements.cartPage.lnkLearnMore)).toHaveText(`Learn more`);
    await productLocator.locator(elements.cartPage.lnkLearnMore).hover();
    await expect(productLocator.locator(elements.cartPage.msgWarehouseLearnMoreToolTip)).toHaveText(testData.cartMessages.msgWarehouseLearnMoreToolTip);
  }

  async openPickupLocationPopup(sku) {
    const productLocator = page.locator(`[data-sku= "${sku}"]`);
    await productLocator.locator(elements.cartPage.lnkFreePickup).click();
  }

  async updateZipcodeInPickupLocationPopup(zipCode) {
    await expect(page.locator(elements.cartPage.txtZipCode)).toBeVisible({ timeout });
    await expect(page.locator(elements.cartPage.hdrpickUpPopup)).toHaveText(`Select Your Location for Free Pickup`);
    await expect(page.locator(elements.cartPage.msgPickupPopup)).toHaveText(`Only one location can be selected for pickup per order.`);
    await expect(page.locator(elements.cartPage.chkIncludeWarehouse)).toBeChecked();
    await page.fill(elements.cartPage.txtZipCode, zipCode);
    await page.locator(elements.cartPage.btnZipcodeSubmit).click();
  }

  async selectStore(availability) {
    await expect(page.locator(elements.cartPage.lblPickUpLocationNames).first()).toBeVisible({ timeout });
    await page.locator(elements.cartPage.chkIncludeWarehouse).check();
    const eleStores = await commonUtils.getElementHandlesArray(elements.cartPage.lblPickUpLocationNames);
    let intStoreNumber = null;
    await testReport.log(`Select store for Parcel item`);
    await Promise.all(
      eleStores.map(async (ele, i) => {
        const slideDiv = page.locator(elements.cartPage.lblPickUpLocationNames).nth(i);
        const storeId = await slideDiv.locator('[name=inStorePickupStoreId]').getAttribute('value');
        const isStore = await this.checkIsStore(storeId);
        const msgAvailable = await slideDiv.locator(elements.cartPage.lblPickUpAvailability).textContent();
        if ((msgAvailable === availability || msgAvailable.includes('available')) && intStoreNumber !== 0 && isStore === true) intStoreNumber = i;
      })
    );
    if (intStoreNumber === null) {
      await testReport.log(this.pageName, `No store found with availability ${availability}`);
      throw new Error(`Store not found`);
    }
    const pickupLocation = await page.locator(elements.cartPage.lblPickUpLocationNames).nth(intStoreNumber).locator('h3').nth(0).innerText();
    await page.locator(elements.cartPage.lblPickUpLocationNames).nth(intStoreNumber).click();
    await page.locator(elements.cartPage.btnSelectLocation).nth(intStoreNumber).click();
    await expect(page.locator(elements.cartPage.lblPickupAvailable)).toBeVisible({ timeout });
    testReport.log(this.pageName, `Pickup location ${pickupLocation} is chosen successfully`);
    await commonUtils.forcedWait(this.pageName, 5000);
    await expect(page.locator(elements.cartPage.rdPickup).nth(0)).toBeChecked();
    testReport.log(this.pageName, 'Free pickup radio button is checked');
    return pickupLocation;
  }

  async selectLocationFromPopup(selectionCriteria) {
    await expect(page.locator(elements.cartPage.lblPickUpLocationNames).first()).toBeVisible({ timeout });
    await page.locator(elements.cartPage.chkIncludeWarehouse).check();
    let eleStores = await commonUtils.getElementHandlesArray(elements.cartPage.lblPickUpLocationNames);
    let intStoreNumber = null;
    await testReport.log(`Select warehouse for Furniture item`);
    await Promise.all(
      eleStores.map(async (ele, i) => {
        const slideDiv = page.locator(elements.cartPage.lblPickUpLocationNames).nth(i);
        const storeId = await slideDiv.locator('[name=inStorePickupStoreId]').getAttribute('value');
        const isStore = await this.checkIsStore(storeId);
        const msgPickupAvailability = await slideDiv.locator(elements.cartPage.lblPickUpAvailability).textContent();
        // const test = await slideDiv.textContent();
        if (selectionCriteria === storeId) {
          intStoreNumber = i;
          eleStores = [];
        } else if (selectionCriteria === 'In Stock') {
          await testReport.log(`Looking for Instock warehouse`);
          if ((msgPickupAvailability.includes('Available') || msgPickupAvailability.includes('available')) && isStore === false) {
            intStoreNumber = i;
            eleStores = [];
          }
        }
      })
    );
    if (intStoreNumber === null) {
      await testReport.log(this.pageName, `No warehouse found with availability ${selectionCriteria}`);
      throw new Error(`Warehouse not found`);
    }
    const pickupLocation = await page.locator(elements.cartPage.lblPickUpLocationNames).nth(intStoreNumber).locator('h3').nth(0).innerText();
    await page.locator(elements.cartPage.lblPickUpLocationNames).nth(intStoreNumber).click();
    await page.locator(elements.cartPage.btnSelectLocation).nth(intStoreNumber).click();
    await expect(page.locator(elements.cartPage.lblPickupAvailable).first()).toBeVisible({ timeout });
    testReport.log(this.pageName, `Pickup location ${pickupLocation} is chosen successfully`);
    await commonUtils.forcedWait(this.pageName, 5000);
    await expect(page.locator(elements.cartPage.rdPickup).nth(0)).toBeChecked();
    testReport.log(this.pageName, 'Free pickup radio button is checked');
    return pickupLocation;
  }

  async ValidateStorePickupAvailabilityMessage(sku, availability, pickupLocation) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    await expect(productLocator).toBeVisible(timeout);
    switch (availability) {
      case 'Not Selected':
        await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Select Store');
        break;
      case 'In Stock':
        await expect(productLocator.locator(elements.cartPage.msgStoreAvailability)).toContainText(`${pickupLocation}`, timeout);
        await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Update Store');
        break;
      default:
        await testReport.log(`Invalid Availability`);
    }
  }

  async ValidateWarehousePickupAvailabilityMessage(sku, availability, pickupLocation) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    switch (availability) {
      case 'Not Selected':
        await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Select Warehouse');
        break;
      case 'In Stock':
        await expect(productLocator.locator(elements.cartPage.msgWarehouseAvailability)).toContainText(`${pickupLocation}`);
        await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Update Warehouse');
        break;
      default:
        await testReport.log(`Invalid Availability`);
    }
  }

  async validateWarehousePickupMessageWhenStoreSelected(sku) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    testReport.log(await productLocator.locator(elements.cartPage.lblFreeWarehousePickupWithoutRadioButton).innerText());
    await expect(productLocator.locator(elements.cartPage.lblFreeWarehousePickupWithoutRadioButton)).toHaveText(`Free Warehouse Pickup`);
    await expect(productLocator.locator(elements.cartPage.btnPickUpHelp)).toBeHidden();
    await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Select Warehouse');
    await expect(productLocator.locator(elements.cartPage.msgWarehousePickup)).toHaveText(`Pay no delivery fee.`);
    await expect(productLocator.locator(elements.cartPage.lnkLearnMore)).toHaveText(`Learn more`);
    await productLocator.locator(elements.cartPage.lnkLearnMore).hover();
    await expect(productLocator.locator(elements.cartPage.msgWarehouseLearnMoreToolTip)).toHaveText(testData.cartMessages.msgWarehouseLearnMoreToolTip);
  }

  async validateStorePickupMessageWhenWarehouseSelected(sku) {
    const productLocator = page.locator(`[data-sku="${sku}"]`);
    testReport.log(await productLocator.locator(elements.cartPage.lblFreeStorePickupWithoutRadioButton).innerText());
    await expect(productLocator.locator(elements.cartPage.lblFreeStorePickupWithoutRadioButton)).toHaveText(`Free & Fast Store Pickup`);
    await expect(productLocator.locator(elements.cartPage.btnPickUpHelp)).toBeHidden();
    await expect(productLocator.locator(elements.cartPage.msgStoreAvailWhenWarehouseSelected)).toHaveText('Available for free store pickup');
    await expect(productLocator.locator(elements.cartPage.lnkFreePickup)).toContainText('Select Store');
  }

  async validateListedGiftCards(giftCardType, availableToPurchase) {
    let screenshot;
    page.setDefaultTimeout(600000);
    testReport.log(this.pageName, `No of card slides - ${await page.locator('.gift-card-slider-large.flexslider >> .slides > li').count()}`);
    testReport.log(this.pageName, `Validating giftcard type - |${giftCardType}|`);
    const largeSlider = page.locator('.gift-card-slider-large.flexslider');
    const giftcardImg = largeSlider.locator(`img[data-cardtype=${giftCardType}]`);
    if (availableToPurchase) {
      await expect(giftcardImg).toBeVisible({ timeout });
      // eslint-disable-next-line playwright/no-element-handle
      const element = await page.$(`img[data-cardtype=${giftCardType}]`);
      const referenceImagePath = `../../project-checkout/page-objects/datafiles/images/${giftCardType}.png`;
      screenshot = await commonUtils.visualComparisonVerII(this.pageName, element, referenceImagePath);
    } else {
      await expect(giftcardImg).toBeHidden();
    }
    // }
    return screenshot;
  }

  async compareProductImages(skuIdentifier, pageName) {
    let locatorText;
    if (pageName === 'SharedRegistryPage') {
      locatorText = '.gift-card-list-item-thumbnail';
    } else if (pageName === 'ConfirmationPage') {
      locatorText = '.product-image';
    } else {
      locatorText = '.item-image';
    }
    // eslint-disable-next-line playwright/no-element-handle
    const element = await page.$(locatorText);
    const referenceImagePath = `../../project-checkout/page-objects/datafiles/images/${skuIdentifier}_${pageName}.png`;
    const screenshot = await commonUtils.visualComparisonVerII(pageName, element, referenceImagePath);
    return screenshot;
  }

  async VerifyRewards() {
    // await expect(await page.locator(`[class='reward-list-container']`)).isVisible();
    await expect(page.locator(`[class='reward-details-title']`)).toHaveText(`Redeem Rewards`);
    await expect(page.locator(`[class='reward-details-title-total']`)).toContainText(`Total Reward Certificates: `);
    // await expect(await page.locator(`[class='plus-minus reward-list-a11y-accordion-button']`)).isVisible();
    const rewardsDrawerState = await page.locator(`[class='plus-minus reward-list-a11y-accordion-button']`).getAttribute('aria-expanded');
    if (rewardsDrawerState === false) {
      await page.locator(`[class='plus-minus reward-list-a11y-accordion-button']`).click();
    }
    await expect(page.locator(`[class='reward-number']`).last()).toContainText(`Reward: ****`);
  }

  async verifyAppliedRewards(rewardNumber) {
    await testReport.log(this.pageName, rewardNumber);
    // await expect(await page.locator(`[class='reward-list-container']`)).isVisible();
    await expect(page.locator(`[class='reward-number'] >> nth=0`)).toContainText(rewardNumber);
    await expect(page.locator('.reward-container >> nth=0 >> .reward-state >> .reward-applied')).toHaveText(`Applied`);
    await expect(page.locator(`[class='a11y-link button-transparent reward-remove']`)).toContainText(`Remove`);
  }

  async verifyFreeshippingMessage() {
    const blnIsShippingDiscountApplied = await page.getByTestId('shippingDiscount-amt').getByTestId('formatted-price').isVisible();
    const blnCartContainGRItem = await page.locator('[data-testid = lnk-view-registry]').isVisible();
    let freeShippingThreshold;
    if (blnIsShippingDiscountApplied === true && env.FREE_SHIPPING_FLAG === 'true') {
      if (blnCartContainGRItem) await expect(page.locator('#afreeShippingMessage')).toHaveText(`Eligible items in your order will ship FREE`);
      else await expect(page.locator('#afreeShippingMessage')).toHaveText(` All items marked Free Shipping Eligible will ship FREE`);
    } else {
      let merchandise = await this.getMerchTotalFromCartOrderSummary();
      merchandise = parseFloat(merchandise.replace('$', '').replace('CAD ', ''));
      if (blnCartContainGRItem) freeShippingThreshold = parseFloat(env.GR_FREE_SHIPPING_THRESHOLD.replace('$', '').replace('CAD ', ''));
      else freeShippingThreshold = parseFloat(env.FREE_SHIPPING_THRESHOLD.replace('$', '').replace('CAD ', ''));

      let moreForDiscount = freeShippingThreshold - merchandise;
      moreForDiscount = moreForDiscount.toFixed(2);
      await expect(page.locator('#afreeShippingMessage')).toHaveText(` Add $${moreForDiscount}  worth of merchandise to get FREE shipping on eligible items`);
      await testReport.log(this.pageName, `To get free shipping discount add ${env.CURRENCY}${moreForDiscount} more merchandise`);
    }
    await testReport.log(this.pageName, `Free shipping message verification success`);
  }

  // AVAILABILITY METHODS

  async addAvailabilityInfoInCart() {
    const cartLineItemElementsArray = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);

    // exit if cart count is zero
    // if (intCartItemCount === 0) return;
    // const availMessage = this.GetAvailability(availabilityType);
    const cartPageAvailability = {};

    // iterate each item to make sure the item details(availability and arrives) are displayed correctly
    await Promise.all(
      cartLineItemElementsArray.map(async (ele, i) => {
        const eleSkuAvailabilityMsg = page.locator(elements.cartPage.lblCartAvailabilityMsg).nth(i);
        const isAvailabilityMsgVisible = await eleSkuAvailabilityMsg.isVisible();
        if (isAvailabilityMsgVisible) {
          cartPageAvailability.AvailabilityMessage = await eleSkuAvailabilityMsg.textContent();
        }
        const eleSkuArrivesByMsg = page.locator(elements.cartPage.lblArrivesByMessage).nth(i);
        cartPageAvailability.ArrivesByMessage = await eleSkuArrivesByMsg.textContent();
      })
    );
    this.availabilityInfo = { ...this.availabilityInfo, cartPageAvailability };
  }

  async verifyAvailabilityInfoInCart() {
    const cartLineItemElementsArray = await commonUtils.getElementHandlesArray(elements.cartPage.arrayCartItemElements);

    // exit if cart count is zero
    // if (intCartItemCount === 0) return;
    // const availMessage = this.GetAvailability(availabilityType)
    const { cartPageAvailability } = this.availabilityInfo;

    // iterate each item to make sure the item details(availability and arrives) are displayed correctly
    await Promise.all(
      cartLineItemElementsArray.map(async (ele, i) => {
        const eleSkuAvailabilityMsg = page.locator(elements.cartPage.lblCartAvailabilityMsg).nth(i);
        const isAvailabilityMsgVisible = await eleSkuAvailabilityMsg.isVisible();
        if (isAvailabilityMsgVisible) {
          const AvailabilityMessage = await eleSkuAvailabilityMsg.textContent();
          commonUtils.validateCartElementsIgnoringCase(this.pageName, AvailabilityMessage, cartPageAvailability.AvailabilityMessage);
        }

        const eleSkuArrivesByMsg = page.locator(elements.cartPage.lblArrivesByMessage).nth(i);
        const ArrivesByMessage = await eleSkuArrivesByMsg.textContent();
        commonUtils.validateCartElementsIgnoringCase(this.pageName, ArrivesByMessage, cartPageAvailability.ArrivesByMessage);
      })
    );
  }

  // MOVE TO PDP

  /**
   * @author: nsukhadia
   * @function_Name : customOrderAcceptTerms
   * @Description : Verify merchandise total is not ZERO
   * @params : None
   * @returns : None
   * */

  async customOrderAcceptTerms() {
    await page.locator('button[data-id="addToCartButton"]').click();
    testReport.log(this.pageName, 'Add to cart clicked on Double Dare Popup (for customm order)');
  }

  async clickToExpandFabricSelectionOnPDP() {
    const fabricSelection = page.locator('.accordion-sor-content-container', { hasText: 'Fabric' });
    let selectedOption = '';

    await fabricSelection.click();
    selectedOption = await fabricSelection.locator('.accordion-sor-title').textContent();
    testReport.log(this.pageName, `Selected custom option: ${selectedOption}`);

    return selectedOption;
  }

  async locateCustomFagricGroup() {
    const isCB2 = env.EXEC_SITE.includes('cb2');
    const groupLabel = isCB2 ? 'CUSTOM' : 'OUR DESIGNERS RECOMMEND';
    const customFabricGroup = page
      .locator('[data-id="fabric-listing-type"] [role="radiogroup"]')
      .filter({ hasText: groupLabel })
      .locator('.fabric-swatch-group');

    return customFabricGroup;
  }

  async getCustomLegGroupDefaultOption() {
    let customLegGroupDefaultOption;
    if ((await page.locator('.accordion-sor-content-container').filter({ hasText: 'Leg' }).count()) > 0) {
      customLegGroupDefaultOption = await page
        .locator('.accordion-sor-content-container')
        .filter({ hasText: 'Leg' })
        .locator('.accordion-sor-description.text-md-reg')
        .textContent();
      customLegGroupDefaultOption = `Leg: ${customLegGroupDefaultOption}`;
    }
    return customLegGroupDefaultOption;
  }

  async selectFabricOptionOnPDP() {
    const customFabricGroup = await this.locateCustomFagricGroup();
    const customFabricOption = customFabricGroup.locator('[data-testid="radio"]').nth(1);
    const customFabricOptionSelection = customFabricOption.locator('[data-testid="radio-label"] > span');
    const customFabricOptionLabel1 = (await customFabricOptionSelection.locator('span').nth(0).textContent()).replace(', ', '');
    const customFabricOptionLabel2 = await customFabricOptionSelection.locator('p').nth(0).textContent();
    const customFabricOptionLabel3 = await customFabricOptionSelection.locator('span').nth(1).textContent();

    const customLegGroupDefaultOption = await this.getCustomLegGroupDefaultOption();

    const customFabricOptionSelectionString = `${customFabricOptionLabel1}, ${customFabricOptionLabel2}, ${customFabricOptionLabel3}|${customLegGroupDefaultOption}`;
    testReport.log(this.pageName, `Selected custom option value: ${customFabricOptionSelectionString}`);
    await customFabricOption.click();

    return customFabricOptionSelectionString;
  }

  async verifyFabricCustomOptionsExpanded() {
    const customFabricGroup = await this.locateCustomFagricGroup();

    await expect(customFabricGroup).toBeVisible({ timeout });
  }

  async verifyCustomOrderMessagingOnPDP() {
    try {
      const termsEl = page.locator('#popup-content .terms');
      const verifyCustomTextContent = async (txtContent) => {
        testReport.log(this.pageName, await termsEl.nth(0).textContent());
        await expect(termsEl.nth(0)).toContainText(txtContent);
      };

      if (termsEl.nth(0)) verifyCustomTextContent('We’re pleased to make this item just for you.');
    } catch {
      testReport.log(this.pageName, 'Terms popup not displayed for custom sku.');
    }
  }

  async verifyShippingDiscountIsAppliedInCart() {
    let blnIsShippingDiscountApplied = false;
    const shipDiscountCount = await page.getByTestId('shippingDiscount-amt').count();
    if (shipDiscountCount > 0) {
      blnIsShippingDiscountApplied = true;
    }
    await testReport.log(`Free shipping discount applied : `, blnIsShippingDiscountApplied);
    expect(blnIsShippingDiscountApplied).toBeTruthy();
    return blnIsShippingDiscountApplied;
  }

  async verifyShippingDiscountIsNotAppliedInCart() {
    let blnIsShippingDiscountNotApplied = false;
    const shipDiscountCount = await page.getByTestId('shippingDiscount-amt').count();
    if (shipDiscountCount === 0) {
      blnIsShippingDiscountNotApplied = true;
    }
    await testReport.log(`Free shipping discount not applied : `, blnIsShippingDiscountNotApplied);
    expect(blnIsShippingDiscountNotApplied).toBeTruthy();
    return blnIsShippingDiscountNotApplied;
  }

  async verifyFreeShippingMessageNotDisplayed() {
    const freeShippingMessageCount = await page.locator('#afreeShippingMessage').count();
    expect(freeShippingMessageCount).toBe(0);
    await testReport.log(this.pageName, `Free shipping message not displayed in cart page`);
    return true;
  }

  async checkIsStore(storeId) {
    const warehouseList = env.WAREHOUSE_LIST;
    if (warehouseList.indexOf(storeId) !== -1) {
      await testReport.log(this.pageName, `${storeId} is a warehouse`);
      return false;
    }
    await testReport.log(this.pageName, `${storeId} is a Store`);
    return true;
  }

  async verifyFreeShippingTextInSearchResultsPage() {
    await expect(page.locator('[data-testid = "ships-free-label"]').first()).toHaveText(env.FREE_SHIP_LINK);
    await testReport.log(`Search Results Page`, `Free shiping text is visible`);
  }
}

module.exports = { CartPage };
