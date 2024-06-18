const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const elements = require('../../elements/elements');
const env = require('../../../../support/env/env');

const testReport = new ReportUtils();
const expressTestData = require('../../datafiles/express-testdata');
const testData = require('../../datafiles/testdata');
const { timeout } = require('../../../../configs/config');

const { getAddressData } = require('../../../helpers/data-dictionary');
// eslint-disable-next-line import/no-restricted-paths
const { CheckoutPage } = require('../common/checkout.page');

class ReviewPage extends CheckoutPage {
  pageName = this.constructor.name;

  /**
   * @author: asoman
   * @function_Name : getReviewOrderSummaryJSON
   * @Description : To get the order details and order summary data from review age
   * @params :
   * @returns : None
   * */
  async getReviewOrderSummaryJSON() {
    const itemContexts = [];
    const itemContext = [];
    const recipientElementArray = await common.getElementHandlesArray(elements.reviewPage.eleRecipientSection);
    testReport.log(this.pageName, `Number of recipients in order:: ${recipientElementArray.length}`);

    await Promise.all(
      recipientElementArray.map(async (ele, i) => {
        const itemsJSONArray = [];
        const itemJSONObj = {};
        const itemDetailJSONObj = {};
        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.reviewPage.eleRecipientSection} >> nth=${i} >> ${elements.reviewPage.eleArrayItemList}`);
        testReport.log(this.pageName, `number of items shipped to current recipient-- ${itemElementHandlesArray.length}`);
        const recipientElement = page.locator(elements.reviewPage.eleRecipientSection).nth(i);
        const itemsElementArray = recipientElement.locator(elements.reviewPage.eleArrayItemList);
        const shipToAddress = await recipientElement.locator(elements.reviewPage.REVIEW_SHIP_BLOCK).textContent();
        testReport.log(this.pageName, shipToAddress);

        // items
        let prevPromise = Promise.resolve();

        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            prevPromise = prevPromise.then(async () => {
              const itemInfoElement = itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);
              itemDetailJSONObj.isGRItem = await this.checkIfSkuIsGRItem(itemInfoElement);
              itemDetailJSONObj.skuNum = await this.getSkuNumber(itemInfoElement);
              itemDetailJSONObj.skuTitle = await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuTitle).textContent();
              itemDetailJSONObj.skuQty = await this.getSkuQty(itemInfoElement);
              itemDetailJSONObj.skuPrice = await this.getSkuPrice(itemInfoElement);
              itemDetailJSONObj.skuPriceTotal = await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPriceTotal).textContent();

              const skuAvailabilityMsg =
                (await itemInfoElement.locator(elements.reviewPage.lblReviewItemAvailabilityMsg).count()) > 0
                  ? await itemInfoElement.locator(elements.reviewPage.lblReviewItemAvailabilityMsg).textContent()
                  : '';
              itemDetailJSONObj.skuAvailabilityMsg = skuAvailabilityMsg;

              const selectedPersonalizationInfoElement = page.locator('.personalization-design').nth(i);
              const personalizationItemElements = '.personalization-design-info';
              const personalizationInfo = await this.getMonogrammingData(selectedPersonalizationInfoElement, personalizationItemElements);
              const personalizationReturnPolicyTextElement = page.locator('.personalization-note').nth(i);
              const isPersonalizedSku = await this.getPersonalizationStatus(personalizationReturnPolicyTextElement);

              const arriveMessageCount = await itemInfoElement.locator(elements.reviewPage.lblReviewItemArrivesByMsg).count();
              if (arriveMessageCount > 0) {
                itemDetailJSONObj.skuArrivesByMsg = await itemInfoElement.locator(elements.reviewPage.lblReviewItemArrivesByMsg).textContent();
              } else if (isPersonalizedSku && !skuAvailabilityMsg.includes('In stock')) {
                itemDetailJSONObj.skuArrivesByMsg = await itemInfoElement.getByTestId('lbl-recipient-arrives-msg').textContent();
              } else {
                itemDetailJSONObj.skuArrivesByMsg = '';
              }

              // get the pickup message if pickup item present
              const pickupArriveMessageCount = await itemInfoElement.locator('.store-pickup-slot').count();
              if (pickupArriveMessageCount > 0) {
                itemDetailJSONObj.skuArrivesByMsg = await itemInfoElement.locator('.store-pickup-slot').textContent();
                itemDetailJSONObj.skuFfmType = 'bops';
              }

              const stockAvailability = await this.getStockStatus(itemDetailJSONObj.skuAvailabilityMsg, itemDetailJSONObj.skuArrivesByMsg);

              itemDetailJSONObj.personalizationInfo = personalizationInfo;
              itemDetailJSONObj.isPersonalizedSku = isPersonalizedSku;
              itemDetailJSONObj.stockAvailability = stockAvailability;
              const itemJson = JSON.stringify(itemDetailJSONObj);
              itemsJSONArray.push(itemJson);
            });
            return prevPromise; // Return the promise for the next iteration
          })
        );

        itemJSONObj.items = itemsJSONArray;

        // pickup - bops check
        const pickUpNotificationMsgCount = await page.locator('.store-pickup-notify-message').count();
        if (pickUpNotificationMsgCount > 0) {
          itemJSONObj.pickupLocationType = 'store';
        }

        // shipmode
        const shipMethodSection = recipientElement.locator(elements.reviewPage.eleShippingMethodSection);
        const shipModeSelected =
          (await shipMethodSection.locator(elements.reviewPage.lblSelectedShipMode).count()) > 0
            ? await shipMethodSection.locator(elements.reviewPage.lblSelectedShipMode).textContent()
            : 'Pickup';
        itemJSONObj.shipMode = shipModeSelected;

        // arrivesMsg
        let shipModeArrivesByMsg;
        if (shipModeSelected === 'Pickup') {
          shipModeArrivesByMsg =
            (await recipientElement.locator('[data-testid=ele-shipping-method-section] > p').count()) > 0
              ? await recipientElement.locator('[data-testid=ele-shipping-method-section] > p').textContent()
              : '';
        } else {
          shipModeArrivesByMsg =
            (await recipientElement.locator(elements.reviewPage.lblRecipientArrivesMsg).count()) > 0
              ? await recipientElement.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent()
              : '';
        }
        shipModeArrivesByMsg = shipModeArrivesByMsg.replace(/\s\s+/g, ' ');
        itemJSONObj.arrivesMsg = shipModeArrivesByMsg;
        // gifting
        // const giftingSection = await recipientElement.locator(elements.reviewPage.eleGiftingSection);

        // email
        const contactInfoSection = recipientElement.locator(elements.reviewPage.eleContactInfo);
        let receiptEmail = await contactInfoSection.locator(elements.reviewPage.lblRecipientEmail).textContent();
        receiptEmail = receiptEmail.replace('Email: ', '');
        itemJSONObj.receiptEmail = receiptEmail;
        itemJSONObj.shipToAddress = shipToAddress;

        itemContext[`recipient${i}`] = itemJSONObj;
        itemContext.receiptEmail = receiptEmail;
      })
    );

    // cardinfo

    const paymentEle = await common.getElementHandlesArray(elements.reviewPage.lblPaymentInfo);
    let paymentCount = await page.locator(elements.reviewPage.lblPaymentInfo).count();
    const allPay = await page.locator(elements.reviewPage.lblPaymentInfo).allTextContents();
    allPay.forEach((pay) => {
      // if (pay.includes('Rewards' || 'GiftCard' || 'PayPal')) paymentCount -= 1;
      if (/Rewards|Gift Card|PayPal/.test(pay)) {
        paymentCount -= 1;
      }
    });
    const arrayPaymentMethod = [];
    await Promise.all(
      paymentEle.map(async (ele, i) => {
        const cardJson = {};
        let selectedPaymentType = await page.locator('.card-info').nth(i).textContent();
        let amount;
        if (selectedPaymentType.includes('Gift Card') || selectedPaymentType.includes('PayPal')) {
          testReport.log(this.pageName, `selectedPaymentType:: ${selectedPaymentType}`);
        } else {
          if (paymentCount > 1) {
            const cardInfo = page.locator('.card-info').nth(i);
            amount = await cardInfo.locator('span > span').textContent();
            selectedPaymentType = selectedPaymentType.replace(`Amount: ${amount}`, '');
            amount = amount.replace(`Amount: `, '');
          } else {
            amount = await page.locator('li', { hasText: 'Order Total:' }).nth(0).textContent();
            amount = amount.replace('Order Total: ', '');
          }
          cardJson.paymentType = selectedPaymentType;
          cardJson.amount = amount;

          arrayPaymentMethod.push(cardJson);
        }
      })
    );
    testReport.log(this.pageName, arrayPaymentMethod);
    itemContext.paymentMethod = arrayPaymentMethod;

    // billing address
    const lblPaymentInfo = await page.textContent(elements.reviewPage.lblPaymentInfo);
    if (lblPaymentInfo.includes('PayPal')) {
      testReport.log(this.pageName, 'PayPal payment was used');
      expect(await page.locator(elements.reviewPage.eleBillToAddress).count()).toEqual(0);
      itemContext.billingAddress = '';
    } else {
      const billingEle = page.locator(elements.reviewPage.eleBillToAddress);
      const billingAddress = await billingEle.locator(elements.reviewPage.lblBillToAddress).textContent();
      itemContext.billingAddress = billingAddress;
      testReport.log(this.pageName, `>>>>>>>>>>>>>>>>>>> getReviewOrderDetails(): itemContext.billingAddress: ${itemContext.billingAddress}`);
    }
    itemContexts.itemContext = itemContext;

    // order summary
    const orderSummary = {};
    let orderSummaryEle;
    if (global.isMobile) {
      orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary).nth(1);
    } else {
      orderSummaryEle = page.locator(elements.reviewPage.eleOrderSummary);
    }
    let merchandiseAmt = await orderSummaryEle.locator('li', { hasText: 'Merchandise:' }).textContent();
    merchandiseAmt = merchandiseAmt.replace('Merchandise: ', '');
    orderSummary.merchandiseAmt = merchandiseAmt;

    let shippingHandlingAmt = await orderSummaryEle.locator('li', { hasText: 'Shipping & Handling:' }).textContent();
    shippingHandlingAmt = shippingHandlingAmt.replace('Shipping & Handling: ', '');
    orderSummary.shippingHandlingAmt = shippingHandlingAmt;

    const blnIsShipDiscountApplied = await orderSummaryEle.locator('li', { hasText: 'Shipping Discount:' }).isVisible();
    let shippingDiscountAmt = '$0.00';
    if (blnIsShipDiscountApplied) {
      shippingDiscountAmt = await orderSummaryEle.locator('li', { hasText: 'Shipping Discount:' }).textContent();
      shippingDiscountAmt = shippingDiscountAmt.replace('Shipping Discount:-', '');
    }
    orderSummary.shippingDiscountAmt = shippingDiscountAmt;

    const blnIsMerchDiscountApplied = await orderSummaryEle.locator('li', { hasText: 'Merchandise Discount:' }).isVisible();
    let merchandiseDiscountAmt = '$0.00';
    if (blnIsMerchDiscountApplied) {
      merchandiseDiscountAmt = await orderSummaryEle.locator('li', { hasText: 'Merchandise Discount:' }).textContent();
      merchandiseDiscountAmt = merchandiseDiscountAmt.replace('Merchandise Discount: ', '');
    }
    orderSummary.merchandiseDiscountAmt = merchandiseDiscountAmt;

    let taxAmt = await orderSummaryEle.locator('li', { hasText: 'Tax:' }).textContent();
    taxAmt = taxAmt.replace('Tax: ', '');
    orderSummary.taxAmt = taxAmt;

    let orderTotalAmt = await orderSummaryEle.locator('li', { hasText: 'Order Total:' }).textContent();
    orderTotalAmt = orderTotalAmt.replace('Order Total: ', '');
    orderSummary.orderTotalAmt = orderTotalAmt;

    const blnIsGiftBoxApplied = await orderSummaryEle.locator('li', { hasText: 'Gift Box:' }).isVisible();
    let giftBoxAmt = '$0.00';
    if (blnIsGiftBoxApplied) {
      giftBoxAmt = await orderSummaryEle.locator('li', { hasText: 'Gift Box:' }).textContent();
      giftBoxAmt = giftBoxAmt.replace('Gift Box: ', '');
    }
    orderSummary.giftBoxAmt = giftBoxAmt;

    const blnIsGiftCardApplied = await orderSummaryEle.locator('li', { hasText: 'Gift Card:' }).isVisible();
    let giftCardAmt = '$0.00';
    if (blnIsGiftCardApplied) {
      giftCardAmt = await orderSummaryEle.locator('li', { hasText: 'Gift Card:' }).textContent();
      giftCardAmt = giftCardAmt.replace('Gift Card: ', '');
    }
    orderSummary.giftCardAmt = giftCardAmt;

    const blnIsRewardsApplied = await orderSummaryEle.locator('li', { hasText: 'Reward Certificates:' }).isVisible();
    let rewardsAmt = '$0.00';
    if (blnIsRewardsApplied) {
      rewardsAmt = await orderSummaryEle.locator('li', { hasText: 'Reward Certificates:' }).textContent();
      rewardsAmt = rewardsAmt.replace('Reward Certificates: ', '');
    }
    orderSummary.rewardsAmt = rewardsAmt;

    const blnIsRemainingAmountDisplayed = await orderSummaryEle.locator('li', { hasText: 'Remaining Total:' }).isVisible();
    let remainingTotalAmt = '$0.00';
    if (blnIsRemainingAmountDisplayed) {
      remainingTotalAmt = await orderSummaryEle.locator('li', { hasText: 'Remaining Total:' }).textContent();
      remainingTotalAmt = remainingTotalAmt.replace('Remaining Total: ', '');
    }
    orderSummary.remainingTotalAmt = remainingTotalAmt;

    itemContexts.orderSummary = orderSummary;
    // itemContexts['itemContext'] = itemContext
    testReport.log(this.pageName, '-------------data cptured from review----');
    testReport.log(this.pageName, `Order object -> ${JSON.stringify(itemContexts)}`);

    return itemContexts;
  }

  async checkIfSkuIsGRItem(itemInfoElement) {
    let isGRItem = false;
    const grLabelCount = await itemInfoElement.locator(elements.reviewPage.lblReviewItemGRLabel).count();
    if (grLabelCount > 0) {
      const grLabel = await itemInfoElement.locator(elements.reviewPage.lblReviewItemGRLabel).textContent();
      expect(grLabel).toContain('Registry Item');
      isGRItem = true;
    }
    return isGRItem;
  }

  async getSkuNumber(itemInfoElement) {
    let skuNum = await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuNum).textContent();
    skuNum = skuNum.replace('SKU: ', '');
    return skuNum;
  }

  async getSkuQty(itemInfoElement) {
    let skuQty = await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuQty).textContent();
    skuQty = skuQty.replace('Quantity: ', '');
    return skuQty;
  }

  async getSkuPrice(itemInfoElement) {
    let skuPrice = await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPrice).textContent();

    const priceElement = itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPrice);
    const salePriceElementCount = await priceElement.locator('.sale').count();
    if (salePriceElementCount > 0) {
      skuPrice = await priceElement.locator('.sale > .salePrice').textContent();
      skuPrice = skuPrice.replace(/[a-z]/gi, '').trim();
    } else {
      skuPrice = await priceElement.textContent();
    }

    skuPrice = skuPrice.replace('Price: ', '');
    return skuPrice;
  }

  /**
   * @author: asoman
   * @function_Name : verifyOrderDetails
   * @Description : Verify the order shipment details displayed in review page with the data captured from shipping page
   * @params : JSON Object from Payment Page
   * @returns : None
   * */
  async verifyOrderDetails(shippingInfo) {
    await expect(page.locator(elements.reviewPage.lblReviewPageGreeting)).toBeVisible({ timeout });
    expect(await page.locator(elements.reviewPage.lblReviewPageGreeting).textContent()).toContain('You’re almost finished');
    expect(await page.locator(elements.reviewPage.lblRecipientHeader).textContent()).toContain('Shipping and Gift Options');
    const recipientElementArray = await common.getElementHandlesArray(elements.reviewPage.eleRecipientSection);
    const recipientElementArrayCount = recipientElementArray.length;
    testReport.log(this.pageName, `recipientElementArrayCount${recipientElementArrayCount}`);
    const shippingInfoEleList = shippingInfo.itemContexts.itemContext[0];

    await Promise.all(
      recipientElementArray.map(async (ele, i) => {
        const recipientElement = page.locator(elements.reviewPage.eleRecipientSection).nth(i);

        await expect(page.locator(elements.reviewPage.REVIEW_SHIP_BLOCK).first()).toBeVisible({ timeout });
        const shipToAddress = await page.innerText(elements.reviewPage.REVIEW_SHIP_BLOCK);
        testReport.log(this.pageName, shipToAddress);
        const shippingInfoEle = JSON.parse(JSON.stringify(shippingInfoEleList[`recipient${i}`]));
        // var recipient;
        let itemList;

        // if (shippingInfoEle.hasOwnProperty('shipToAddress')) {
        if (Object.prototype.hasOwnProperty.call(shippingInfoEle, 'shipToAddress')) {
          // recipient = shippingInfoEle['recipient']
          itemList = shippingInfoEle.items;
          // testReport.log(this.pageName,'recipient---> ' + recipient)
          testReport.log(this.pageName, `itemList-- -> ${itemList}`);
        }

        testReport.log(this.pageName, `recipientElementArrayCount-- > ${recipientElementArrayCount}`);
        const isShippingToRecipient = shippingInfoEle.fulfillmentType === 'Ship';
        const { skuType } = shippingInfoEle;
        if (isShippingToRecipient) {
          if (recipientElementArrayCount < 2) {
            expect(await recipientElement.locator(elements.reviewPage.lblShipToSingleRecipientHdr).textContent()).toContain('Shipping To');
          } else {
            const recipientNum = i + parseInt(1, 10);
            expect(await recipientElement.locator(elements.reviewPage.lblShipToMultiRecipientHdr).textContent()).toContain(
              `Ship To (Recipient ${recipientNum})`
            );
          }
        }
        expect(await recipientElement.locator(elements.reviewPage.lnkShipToRecipientEdit).getAttribute('href')).toContain(
          '/checkout/shippingandgiftoptions#header_recipient'
        );
        expect(await recipientElement.locator(elements.reviewPage.txtRecipientItemHdr).textContent()).toContain('Item(s)');
        expect(await recipientElement.locator(elements.reviewPage.lnkRecipientItemEdit).getAttribute('href')).toContain('/checkout/cart');
        expect(await recipientElement.locator(elements.reviewPage.lnkRecipientItemEdit).textContent()).toContain('Edit cart');

        // var recipientElement = await page.locator('.sub-section >> nth=' + i)
        const itemsElementArray = recipientElement.locator(elements.reviewPage.eleArrayItemList);
        // testReport.log(this.pageName,await recipientElement.locator(elements.reviewPage.eleArrayItemList).count())
        const itemsElementArrayCount = await recipientElement.locator(elements.reviewPage.eleArrayItemList).count();
        testReport.log(this.pageName, itemsElementArrayCount);

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.reviewPage.eleRecipientSection} >> nth=${i} >> ${elements.reviewPage.eleArrayItemList}`);
        testReport.log(this.pageName, `number of items shipped to current recipient-- ${itemElementHandlesArray.length}`);

        // items
        // items
        let prevPromise = Promise.resolve();

        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            prevPromise = prevPromise.then(async () => {
              const itemInfoElement = itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);
              const item = JSON.parse(itemList[j]);
              await expect(itemsElementArray.locator(elements.reviewPage.imgItem).nth(j)).toBeVisible({ timeout });

              // const itemInfoElement = await itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);
              const skuTotalPrice = (parseFloat(item.skuQty) * parseFloat(item.skuSellingPrice.replace('$', ''))).toLocaleString('en-US', {
                maximumFractionDigits: 2
              });

              expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuNum).textContent()).toContain(item.skuNum);

              /* bug in review page. product name in cart doesnt match with review and confirmation page
                    //common.compareStringByRemovingSpecChars(this.pageName, await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuTitle).textContent(), item['skuTitle'])
                    //expect.soft(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuTitle).textContent()).toContain(item['skuTitle'])
                   */

              expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuQty).textContent()).toContain(item.skuQty);
              expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPrice).textContent()).toContain(item.skuPrice);
              expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPriceTotal).textContent()).toContain(skuTotalPrice);

              const { isPersonalizedSku } = item;
              if (isPersonalizedSku) {
                const selectedPersonalizationInfoElement = page.locator('.personalization-design').nth(i);
                const { personalizationInfo } = item;
                testReport.log(this.pageName, `personalizationInfo - ${JSON.stringify(personalizationInfo)}`);
                // eslint-disable-next-line no-await-in-loop
                await this.verifyPersonalizationInfo(this.pageName, selectedPersonalizationInfoElement, personalizationInfo);
              }

              if (skuType === 'Ship') {
                expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemAvailabilityMsg).textContent()).toContain(item.skuAvailabilityMsg);
              }
              const { skuArrivesByMsg } = item;

              if (!skuArrivesByMsg.includes('We will contact you') && !skuArrivesByMsg.includes(env.MONOGRAM_ARRIVES_MESSAGE)) {
                if (shippingInfoEle.fulfillmentType === 'Ship') {
                  const shipArrivesMsgElement = itemInfoElement.locator(elements.reviewPage.lblReviewItemArrivesByMsg);
                  const shipArrivesMsg = await shipArrivesMsgElement.textContent();
                  expect(shipArrivesMsg).toContain(item.skuArrivesByMsg.replace('Arrives: ', ''));
                }
              }

              if (item.pickupLocationType === 'store') {
                expect(await itemInfoElement.locator('.store-pickup-slot').textContent()).toContain(skuArrivesByMsg);
              }

              testReport.log(this.pageName, `skuNum-- > ${item.skuNum} `);
              testReport.log(this.pageName, `skuTitle-- > ${item.skuTitle} `);
              testReport.log(this.pageName, `skuPrice-- > ${item.skuPrice} `);
              testReport.log(this.pageName, `skuAvailabilityMsg-- > ${item.skuAvailabilityMsg} `);
              testReport.log(this.pageName, `skuArrivesByMsg-- > ${item.skuArrivesByMsg} `);
            });
            return prevPromise;
          })
        );

        if (isShippingToRecipient) {
          const shipMethodSection = recipientElement.locator(elements.reviewPage.eleShippingMethodSection);
          const shipMethodTopSection = recipientElement.locator(elements.reviewPage.eleShippingMethodSectionTop);
          expect(await shipMethodSection.locator(elements.reviewPage.lblShippingSectionHeader).textContent()).toContain('Shipping Method');
          expect(await shipMethodTopSection.locator(elements.reviewPage.lnkShippingSectionEdit).getAttribute('href')).toContain(
            '/checkout/shippingandgiftoptions#header_shippingMethod'
          );
          expect(await shipMethodSection.locator(elements.reviewPage.lnkShippingSectionEdit).textContent()).toContain('Edit Shipping');
          expect(await shipMethodSection.locator(elements.reviewPage.lblSelectedShipMode).textContent()).toContain(shippingInfoEle.shipMode);
        }

        if (shippingInfoEle.fulfillmentType === 'Ship') {
          let shipModeArrivesByMsg = await recipientElement.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent();
          shipModeArrivesByMsg = shipModeArrivesByMsg.replace(/\s\s+/g, ' ');
          expect(shipModeArrivesByMsg).toContain(shippingInfoEle.arrivesMsg);
        } else if (shippingInfoEle.fulfillmentType === 'Pickup' && shippingInfoEle.pickupLocationType === 'warehouse') {
          let pickupByMsg = await recipientElement.locator('[data-testid=ele-shipping-method-section] > p').textContent();
          pickupByMsg = pickupByMsg.replace(/\s\s+/g, ' ');
          expect(pickupByMsg).toContain(shippingInfoEle.arrivesMsg);
        }

        if (shippingInfoEle.fulfillmentType === 'Pickup' && shippingInfoEle.pickupLocationType === 'store') {
          await this.verifyPickupNotificationMsg();
          const fillBopsPickupContactEle = recipientElement.locator('.sub-section-content').nth(2);
          expect(await fillBopsPickupContactEle.locator('h4').textContent()).toContain('Who is picking up your order?');

          expect(await fillBopsPickupContactEle.locator('a').getAttribute('href')).toContain('/checkout/shippingandgiftoptions#header_pickupContact');
          expect(await fillBopsPickupContactEle.locator('div').nth(0).textContent()).toContain('ajesh soman');

          const fillBopsPickupPackagingEle = recipientElement.locator('.sub-section-content').nth(3);
          expect(await fillBopsPickupPackagingEle.locator('h4').textContent()).toContain('Select Your Packaging');

          expect(await fillBopsPickupPackagingEle.locator('a').getAttribute('href')).toContain('/checkout/shippingandgiftoptions#header_baggingOptions');
          expect(await fillBopsPickupPackagingEle.locator('div').textContent()).toContain('Bag my item(s)');

          const fillBopsPickupGiftReceiptingEle = recipientElement.locator('.sub-section-content').nth(4);
          expect(await fillBopsPickupGiftReceiptingEle.locator('h4').textContent()).toContain('Include gift receipts?');

          expect(await fillBopsPickupGiftReceiptingEle.locator('a').getAttribute('href')).toContain(
            '/checkout/shippingandgiftoptions#header_giftReceiptOptions'
          );
          expect(await fillBopsPickupGiftReceiptingEle.locator('div').textContent()).toContain('Do not include gift receipts');
        }

        if (isShippingToRecipient) {
          const giftingSection = recipientElement.locator(elements.reviewPage.eleGiftingSection);

          expect(await giftingSection.locator(elements.reviewPage.lblGiftingSectionHeader).textContent()).toContain('Gift Options');
          expect(await giftingSection.locator(elements.reviewPage.lnkGiftingSectionEdit).getAttribute('href')).toContain(
            '/checkout/shippingandgiftoptions#header_giftOptions'
          );
          expect(await giftingSection.locator(elements.reviewPage.lnkGiftingSectionEdit).textContent()).toContain('Edit Gift Options');
        }

        const contactInfoSection = recipientElement.locator(elements.reviewPage.eleContactInfo);

        expect(await contactInfoSection.locator(elements.reviewPage.lblContactSectionHeader).textContent()).toContain('Contact Information');
        expect(await contactInfoSection.locator(elements.reviewPage.lnkContactSectionEdit).getAttribute('href')).toContain(
          '/checkout/shippingandgiftoptions#header_receiptOptions'
        );
        expect(await contactInfoSection.locator(elements.reviewPage.lnkContactSectionEdit).textContent()).toContain('Edit Contact Information');
        expect(await contactInfoSection.locator(elements.reviewPage.lblRecipientEmail).textContent()).toContain(shippingInfo.receiptEmail);
      })
    );

    // below payment details
    const policyUpdateBottom = page.locator(elements.reviewPage.lblPolicyUpdate).nth(0);
    let policyUpdateMessage = await policyUpdateBottom.innerText();
    policyUpdateMessage = policyUpdateMessage.replace(/\s+/g, ' ');
    expect(await policyUpdateMessage).toContain(
      'By placing your order, you are agreeing to our terms of use and privacy policy. Clicking Place Order will finalize your transaction.'
    );

    expect(await policyUpdateBottom.locator(elements.reviewPage.lnkTermsOfUse).getAttribute('href')).toContain('/customer-service/terms-of-use');
    expect(await policyUpdateBottom.locator(elements.reviewPage.lnkPrivacyPolicy).getAttribute('href')).toContain('/customer-service/privacy-policy');

    // below order summary details
    const policyUpdateBelowOrderSummary = page.locator(elements.reviewPage.lblPolicyUpdate).nth(1);
    let policyUpdateBelowOrderSummaryMsg = await policyUpdateBottom.innerText();
    policyUpdateBelowOrderSummaryMsg = policyUpdateBelowOrderSummaryMsg.replace(/\s+/g, ' ');
    expect(await policyUpdateBelowOrderSummaryMsg).toContain(
      'By placing your order, you are agreeing to our terms of use and privacy policy. Clicking Place Order will finalize your transaction.'
    );

    if (!global.isMobile) {
      expect(await policyUpdateBelowOrderSummary.locator(elements.reviewPage.lnkTermsOfUse).getAttribute('href')).toContain('/customer-service/terms-of-use');
      expect(await policyUpdateBelowOrderSummary.locator(elements.reviewPage.lnkPrivacyPolicy).getAttribute('href')).toContain(
        '/customer-service/privacy-policy'
      );
    }
  }

  async addAvailabilityMessageInReviewPage(shippingInfo, itemType) {
    const recipientElementArray = await common.getElementHandlesArray(elements.reviewPage.eleRecipientSection);
    const shippingInfoEleList = shippingInfo.itemContexts.itemContext[0];

    const reviewPageAvailability = {};

    await Promise.all(
      recipientElementArray.map(async (ele, i) => {
        const recipientElement = page.locator(elements.reviewPage.eleRecipientSection).nth(i);
        await expect(page.locator(elements.reviewPage.REVIEW_SHIP_BLOCK).first()).toBeVisible({ timeout });
        const shippingInfoEle = JSON.parse(JSON.stringify(shippingInfoEleList[`recipient${i}`]));
        // var recipient;
        let itemList;
        // if (shippingInfoEle.hasOwnProperty('shipToAddress')) {
        if (Object.prototype.hasOwnProperty.call(shippingInfoEle, 'shipToAddress')) {
          // recipient = shippingInfoEle['recipient']
          itemList = shippingInfoEle.items;
        }
        const { skuType } = shippingInfoEle;
        // var recipientElement = await page.locator('.sub-section >> nth=' + i)
        const itemsElementArray = recipientElement.locator(elements.reviewPage.eleArrayItemList);

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.reviewPage.eleRecipientSection} >> nth=${i} >> ${elements.reviewPage.eleArrayItemList}`);

        // items
        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            const item = JSON.parse(itemList[j]);

            const itemInfoElement = itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);

            if (skuType === 'Ship') {
              reviewPageAvailability.AvailabilityMessage = await itemInfoElement.locator(elements.reviewPage.lblReviewItemAvailabilityMsg).textContent();
            }
            const { skuArrivesByMsg } = item;

            if (!skuArrivesByMsg.includes(`We will contact you`)) {
              if (itemType === 'Personalized') {
                reviewPageAvailability.ArrivesBy = await page.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent();
              } else if (shippingInfoEle.fulfillmentType === 'Ship') {
                const shipArrivesMsgElement = itemInfoElement.locator(elements.reviewPage.lblReviewItemArrivesByMsg);
                reviewPageAvailability.ArrivesBy = await shipArrivesMsgElement.textContent();
              }
            }

            if (shippingInfoEle.pickupLocationType === 'store') {
              reviewPageAvailability.ArrivesBy = await itemInfoElement.getByTestId('store-pickup-slot').textContent();
            }
            testReport.log(this.pageName, `skuAvailabilityMsg-- > ${reviewPageAvailability.AvailabilityMessage} `);
            testReport.log(this.pageName, `skuArrivesByMsg-- > ${reviewPageAvailability.ArrivesBy} `);
          })
        );

        if (shippingInfoEle.fulfillmentType === 'Ship') {
          reviewPageAvailability.shipModeArrivesByMsg = await recipientElement.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent();
        } else if (shippingInfoEle.fulfillmentType === 'Pickup' && shippingInfoEle.pickupLocationType === 'warehouse') {
          reviewPageAvailability.pickupByMsg = await recipientElement.locator('[data-testid=ele-shipping-method-section] > p').textContent();
        }
      })
    );
    this.availabilityInfo = { ...this.availabilityInfo, reviewPageAvailability };
  }

  async verifyAvailabilityMessageInReviewPage(shippingInfo, itemType) {
    const recipientElementArray = await common.getElementHandlesArray(elements.reviewPage.eleRecipientSection);
    const shippingInfoEleList = shippingInfo.itemContexts.itemContext[0];

    const { reviewPageAvailability } = this.availabilityInfo;

    await Promise.all(
      recipientElementArray.map(async (ele, i) => {
        const recipientElement = page.locator(elements.reviewPage.eleRecipientSection).nth(i);
        await expect(page.locator(elements.reviewPage.REVIEW_SHIP_BLOCK).first()).toBeVisible({ timeout });
        const shippingInfoEle = JSON.parse(JSON.stringify(shippingInfoEleList[`recipient${i}`]));
        // var recipient;
        let itemList;
        // if (shippingInfoEle.hasOwnProperty('shipToAddress')) {
        if (Object.prototype.hasOwnProperty.call(shippingInfoEle, 'shipToAddress')) {
          // recipient = shippingInfoEle['recipient']
          itemList = shippingInfoEle.items;
        }
        const { skuType } = shippingInfoEle;
        // var recipientElement = await page.locator('.sub-section >> nth=' + i)
        const itemsElementArray = recipientElement.locator(elements.reviewPage.eleArrayItemList);

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.reviewPage.eleRecipientSection} >> nth=${i} >> ${elements.reviewPage.eleArrayItemList}`);

        // items
        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            const item = JSON.parse(itemList[j]);

            const itemInfoElement = itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);

            if (skuType === 'Ship') {
              const AvailabilityMessage = await itemInfoElement.locator(elements.reviewPage.lblReviewItemAvailabilityMsg).textContent();
              expect(AvailabilityMessage).toContain(reviewPageAvailability.AvailabilityMessage);
              testReport.log(this.pageName, `skuAvailabilityMsg: - Actual ->${AvailabilityMessage} Expected -> ${reviewPageAvailability.AvailabilityMessage}`);
            }
            const { skuArrivesByMsg } = item;

            if (!skuArrivesByMsg.includes(`We will contact you`)) {
              if (itemType === 'Personalized') {
                const ArrivesBy = await page.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent();
                expect(ArrivesBy).toContain(reviewPageAvailability.ArrivesBy);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${reviewPageAvailability.ArrivesBy}`);
              } else if (shippingInfoEle.fulfillmentType === 'Ship') {
                const shipArrivesMsgElement = itemInfoElement.locator(elements.reviewPage.lblReviewItemArrivesByMsg);
                const ArrivesBy = await shipArrivesMsgElement.textContent();
                expect(ArrivesBy).toContain(reviewPageAvailability.ArrivesBy);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${reviewPageAvailability.ArrivesBy}`);
              }
            }

            if (shippingInfoEle.pickupLocationType === 'store') {
              const ArrivesBy = await itemInfoElement.getByTestId('store-pickup-slot').textContent();
              expect(ArrivesBy).toContain(reviewPageAvailability.ArrivesBy);
              testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${reviewPageAvailability.ArrivesBy}`);
            }
          })
        );

        if (shippingInfoEle.fulfillmentType === 'Ship') {
          const shipModeArrivesByMsg = await recipientElement.locator(elements.reviewPage.lblRecipientArrivesMsg).textContent();
          expect(shipModeArrivesByMsg).toContain(reviewPageAvailability.shipModeArrivesByMsg);
          testReport.log(
            this.pageName,
            `skuShipModeArrivesByMsg: - Actual ->${shipModeArrivesByMsg} Expected -> ${reviewPageAvailability.shipModeArrivesByMsg}`
          );
        } else if (shippingInfoEle.fulfillmentType === 'Pickup' && shippingInfoEle.pickupLocationType === 'warehouse') {
          const pickupByMsg = await recipientElement.locator('[data-testid=ele-shipping-method-section] > p').textContent();
          expect(pickupByMsg).toContain(reviewPageAvailability.pickupByMsg);
          testReport.log(this.pageName, `skuPickupByMsg: - Actual ->${pickupByMsg} Expected -> ${reviewPageAvailability.pickupByMsg}`);
        }
      })
    );
  }

  /**
   * @author: asoman
   * @function_Name : verifyPaymentInfo
   * @Description : Verify the order payment details displayed in review page with the data captured from payment page
   * @params : JSON Object from Payment Page
   * @returns : None
   * */
  async verifyPaymentInfo(shippingInfo) {
    const paymentSectionEle = page.locator(elements.reviewPage.elePaymentSection);
    expect(await paymentSectionEle.textContent()).toContain('Payment');

    const paymentTypeEle = page.locator(elements.reviewPage.eleReviewPaymentBlock);

    expect(await paymentTypeEle.locator('h4').textContent()).toContain('Payment');
    expect(await paymentTypeEle.locator('a').getAttribute('href')).toContain('/checkout/paymentandbilling#header_payment');
    expect(await paymentTypeEle.locator('a').textContent()).toContain('EditPayment');

    const paymentJson = JSON.parse(JSON.stringify(shippingInfo.tenderItems));
    const billingAddressJson = JSON.parse(JSON.stringify(shippingInfo.billingAddress));

    const cardInfo = paymentJson[0].cardUsed;
    expect(await paymentTypeEle.locator(elements.reviewPage.lblPaymentInfo).textContent()).toContain(cardInfo);

    const billingEle = page.locator(elements.reviewPage.eleBillToAddress);
    expect(await billingEle.locator('h4').textContent()).toContain('Billing Address');
    expect(await billingEle.locator('a').getAttribute('href')).toContain('/checkout/paymentandbilling#billingAddressContainer');
    expect(await billingEle.locator('a').textContent()).toContain('Edit Billing Address');
    expect(await billingEle.locator(elements.reviewPage.lblBillToAddress).textContent()).toContain(billingAddressJson);
  }

  async someConditionIsMet() {
    await expect(page.locator('[data-testid=lbl-order-confirmation-dtl]')).toBeVisible({ timeout });
  }

  /**
   * @author: asoman
   * @function_Name : clickPlaceOrder
   * @Description : To Place order from review page
   * @params : None
   * @returns : None
   * */
  async clickPlaceOrder() {
    // await page.waitForNavigation();
    page.locator(elements.reviewPage.btnPlaceOrder, { waitFor: 'visible' }).nth(0);
    await page.locator(elements.reviewPage.btnPlaceOrder).nth(0).click();
    testReport.log(this.pageName, 'Clicked on PLACE ORDER to submit the order details');
    await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    //     await expect(page.locator(elements.confirmationPage.lblOrderConfirmationDtl)).toBeVisible({ timeout });
    await expect(page.locator('[data-testid=lbl-order-confirmation-dtl]')).toBeVisible({ timeout });

    // await page.waitForFunction(() => this.someConditionIsMet(), { timeout: 10000 });
  }

  async verifyCardUsed(cardType) {
    const cardListCount = cardType.length;
    const cardListEle = page.locator(elements.reviewPage.lblPaymentInfo);
    testReport.log(`card type  ${cardType[0]}`);
    if (cardListCount > 1) {
      // this condition is to handle any order in which 2 cards are printed
      const firstPaymentInList = await cardListEle.nth(0).textContent();
      testReport.log(this.pageName, `firstPaymentInList--${firstPaymentInList} `);
      testReport.log(this.pageName, `secondPaymentInList--${await cardListEle.nth(1).textContent()} `);
      testReport.log(this.pageName, `cardType[0]--${cardType[0]} `);
      testReport.log(this.pageName, `cardType[1]--${cardType[1]} `);

      if (firstPaymentInList.includes(cardType[0])) {
        expect(await cardListEle.nth(0).textContent()).toContain(cardType[0]);
        expect(await cardListEle.nth(1).textContent()).toContain(cardType[1]);
      } else {
        expect(await cardListEle.nth(0).textContent()).toContain(cardType[1]);
        expect(await cardListEle.nth(1).textContent()).toContain(cardType[0]);
      }
    } else if (cardType[0] === 'C&B/CB2 CC' || cardType[0] === 'C&B/CB2 MC') {
      expect(await page.locator(elements.reviewPage.lblPaymentInfo).nth(0).textContent()).toContain(cardType[0]);
    } else {
      expect(await page.locator(elements.reviewPage.lblPaymentInfo).textContent()).toContain(cardType[0]);
    }
  }

  async verifyRewardUsed(cardNo) {
    expect(await page.locator(elements.reviewPage.lblPaymentInfoReward).nth(1).textContent()).toContain(cardNo);
  }

  async verifyMultipleRewardUsed(cardList) {
    const cardCount = await common.getElementHandlesArray(elements.reviewPage.lblPaymentInfoReward);
    await Promise.all(
      cardCount.map(async (ele, i) => {
        let CardDetails = await page.locator(elements.reviewPage.lblPaymentInfoReward).nth(i).textContent();
        if (CardDetails.indexOf('Rewards') > -1) {
          CardDetails = CardDetails.replace('Rewards Number ***', '');
          expect(cardList).toContain(CardDetails);
        }
      })
    );
    // for (let i = 0; i < cardCount.length; i++) {
    //   let CardDetails = await page.locator(elements.reviewPage.lblPaymentInfoReward).nth(i).textContent();
    //   if (CardDetails.indexOf('Rewards') > -1) {
    //     CardDetails = CardDetails.replace('Rewards Number ***', '');
    //     expect(cardList).toContain(CardDetails);
    //   }
    // }
  }

  // isolated functions
  async verifyShippingMethodInfo() {
    await expect(page.locator(elements.reviewPage.lnkEditShippingMethod)).toBeVisible({ timeout });
  }

  async verifyGiftOptionsInfo() {
    await expect(page.locator(elements.reviewPage.lnkEditGiftOptions)).toBeVisible({ timeout });
    const giftOptionsMsg = page.locator(elements.reviewPage.lblGiftOptionsMsg);
    await expect(giftOptionsMsg).toHaveText('Hi John, Happy Birthday');
    testReport.log(this.pageName, `Assert -> GiftMessage displayed - ${giftOptionsMsg} matches with - 'Hi John, Happy Birthday'`);
  }

  async verifyContactInfo(receiptEmail) {
    await expect(page.locator(elements.reviewPage.lnkContactInfo)).toBeVisible({ timeout });
    const email = await page.innerText(elements.reviewPage.lblRecipientEmail);
    expect(email).toContain(receiptEmail);
    testReport.log(this.pageName, `Assert -> Receipient Email displayed - ${email} matches with${receiptEmail} `);
  }

  async VerifyPaymentInfo(paymentCards) {
    await expect(page.locator(elements.reviewPage.eleReviewPaymentBlock)).toBeVisible({ timeout });
    await expect(page.locator(elements.reviewPage.lnkEditPayment)).toBeVisible({ timeout });
    const verifyCardNo = await page.locator(elements.reviewPage.eleReviewPaymentBlock).innerText();
    expect(verifyCardNo).toContain(paymentCards);
    testReport.log(this.pageName, `Assert -> Payment Information displayed - ${verifyCardNo} matches with${paymentCards} `);
  }

  async apoSpecificValidations() {
    let taxAmt = await this.getTaxTotalFromOrderSummary();
    taxAmt = taxAmt.replace('Tax: ', '');
    taxAmt = taxAmt.replace('$', '');
    expect(taxAmt).toEqual('0.00');
    testReport.log(this.page, `Tax amount is zero for orders shipping to APO Address -> ${taxAmt} `);
  }

  async verfiyGiftMessage() {
    const giftingSection = page.locator(elements.reviewPage.eleGiftingSection);

    expect(await giftingSection.locator(elements.reviewPage.lblGiftingSectionHeader).textContent()).toContain('Gift Options');
    expect(await giftingSection.locator(elements.reviewPage.lnkGiftingSectionEdit).getAttribute('href')).toContain(
      '/checkout/shippingandgiftoptions#header_giftOptions'
    );
    expect(await giftingSection.locator(elements.reviewPage.lnkGiftingSectionEdit).textContent()).toContain('Edit Gift Options');
    this.verifyGiftOptionsInfo();
  }

  async verifyGiftBoxDetails(orderInfo) {
    // const orderInfoJson = orderInfo.itemContext;
    const orderSummaryJson = JSON.parse(JSON.stringify(orderInfo.orderSummary));
    const giftingSection = page.locator(elements.reviewPage.eleGiftingSection);
    const messagedata = await giftingSection.locator('.message').count();
    for (let i = 0; i < messagedata.length; i++) {
      if (messagedata.nth(i).innerText.includes('Gift Box')) {
        const messagePrice = messagedata.nth(i).innerText.replace('Gift Box: ');
        expect(messagePrice).toEqual(orderSummaryJson.giftBoxAmt);
      }
    }
  }

  /**
   * @author: jlight
   * @function_Name : expressUserReviewValidation
   * @Description : Verify the order shipment details displayed in review page with expected data
   * @params : JSON Object from Payment Page
   * @returns : None
   * See async verifyOrderDetails(shippingInfo) { as example
   * */
  async expressUserReviewValidation() {
    const isCB2 = env.EXEC_SITE.includes('cb2');
    expect(await page.locator(elements.reviewPage.lblReviewPageGreeting).textContent()).toContain('You’re almost finished');
    expect(await page.locator(elements.reviewPage.lblRecipientHeader).textContent()).toContain('Shipping and Gift Options');

    // verify recipient
    const recipientElementArray = await common.getElementHandlesArray(elements.reviewPage.eleRecipientSection);
    const recipientElementArrayCount = recipientElementArray.length;
    testReport.log(this.pageName, `recipientElementArrayCount${recipientElementArrayCount} `);
    // Express checkout can only have one recipient
    expect(recipientElementArrayCount).toBe(1);

    const recipientElement = page.locator(elements.reviewPage.eleRecipientSection);
    await expect(page.locator(elements.reviewPage.REVIEW_SHIP_BLOCK).first()).toBeVisible({ timeout });
    const shipToAddress = await page.innerText(elements.reviewPage.REVIEW_SHIP_BLOCK);
    testReport.log(this.pageName, shipToAddress);

    expect(await recipientElement.locator(elements.reviewPage.lblShipToSingleRecipientHdr).textContent()).toContain('Shipping To');
    expect(await recipientElement.locator(elements.reviewPage.lnkShipToRecipientEdit).getAttribute('href')).toContain(
      '/checkout/shippingandgiftoptions#header_recipient'
    );
    expect(await recipientElement.locator(elements.reviewPage.txtRecipientItemHdr).textContent()).toContain('Item(s)');
    expect(await recipientElement.locator(elements.reviewPage.lnkRecipientItemEdit).getAttribute('href')).toContain('/checkout/cart');
    expect(await recipientElement.locator(elements.reviewPage.lnkRecipientItemEdit).textContent()).toContain('Edit cart');

    const shipAddressData = expressTestData.shippingInfo;
    expect(shipToAddress).toContain(shipAddressData.address1);
    expect(shipToAddress).toContain(shipAddressData.city);
    expect(shipToAddress).toContain(shipAddressData.zipCode);

    // verify items
    const itemsElementArray = recipientElement.locator(elements.reviewPage.eleArrayItemList);
    const itemsElementArrayCount = await recipientElement.locator(elements.reviewPage.eleArrayItemList).count();
    testReport.log(this.pageName, itemsElementArrayCount);

    // eslint-disable-next-line playwright/no-element-handle
    const itemElementHandlesArray = await page.$$(`${elements.reviewPage.eleRecipientSection} >> nth=1 >> ${elements.reviewPage.eleArrayItemList} `);
    testReport.log(this.pageName, `number of items shipped to current recipient-- ${itemElementHandlesArray.length} `);
    // items
    await Promise.all(
      itemElementHandlesArray.map(async (elem, j) => {
        testReport.log(this.pageName, `j-- > ${j} `);
        await expect(itemsElementArray.locator(elements.reviewPage.imgItem).nth(j)).toBeVisible({ timeout });

        const itemInfoElement = itemsElementArray.locator(elements.reviewPage.eleItemInfo).nth(j);
        const skuTotalPrice = (expressTestData.testItem.qty * expressTestData.testItem.price).toString();

        expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuNum).textContent()).toContain(`SKU: ${expressTestData.testItem.sku} `);

        /* bug in review page. product name in cart doesnt match with review and confirmation page
          //common.compareStringByRemovingSpecChars(this.pageName, await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuTitle).textContent(), item['skuTitle'])
          //expect.soft(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuTitle).textContent()).toContain(item['skuTitle'])
         */

        expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuQty).textContent()).toContain(`Quantity: ${expressTestData.testItem.qty} `);
        expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPrice).textContent()).toContain(`Price: $${expressTestData.testItem.price} `);
        expect(await itemInfoElement.locator(elements.reviewPage.lblReviewItemSkuPriceTotal).textContent()).toContain(skuTotalPrice);
      })
    );

    const contactInfoSection = recipientElement.locator(elements.reviewPage.eleContactInfo);
    expect(await contactInfoSection.locator(elements.reviewPage.lblRecipientEmail).textContent()).toContain(
      isCB2 ? expressTestData.cb2.shippingInfo.email : expressTestData.shippingInfo.email
    );
  }

  async verifyCardInfo(cardInfo) {
    const paymentCount = await page.locator(elements.reviewPage.lblPaymentInfo).count();
    testReport.log(this.pageName, `number of payment modes in order-- ${paymentCount} `);
    const paymentElementArray = await common.getElementHandlesArray(elements.reviewPage.lblPaymentInfo);

    await Promise.all(
      paymentElementArray.map(async (ele, i) => {
        const cardDetail = await page.locator(elements.reviewPage.lblPaymentInfo).nth(i).textContent();
        if (cardDetail.includes('C&B/CB2 MC')) {
          expect(cardDetail).toContain(cardInfo.PLCCWithReward);
        } else if (cardDetail.includes('Gift Card')) {
          expect(cardDetail).toContain(cardInfo.GiftCard);
        } else if (cardDetail.includes('Rewards Number')) {
          if (cardDetail.includes(cardInfo.Reward)) expect(cardDetail).toContain(cardInfo.Reward);
          else expect(cardDetail).toContain(cardInfo.TenderCode);
        }
      })
    );
  }

  async verifyShopCard(shopCardInfo) {
    const paymentCount = await page.locator(elements.reviewPage.lblPaymentInfo).count();
    testReport.log(this.pageName, `number of payment modes in order-- ${paymentCount} `);
    const paymentElementArray = await common.getElementHandlesArray(elements.reviewPage.lblPaymentInfo);

    await Promise.all(
      paymentElementArray.map(async (ele, i) => {
        const cardDetail = await page.locator(elements.reviewPage.lblPaymentInfo).nth(i).textContent();
        if (cardDetail.includes('Gift Card')) {
          expect(cardDetail).toContain(shopCardInfo);
        }
      })
    );
  }

  async verifyMultipleRecipientAddress(addresses) {
    await Promise.all(
      addresses.map(async (address, i) => {
        let strShipToAddress = await page.getByTestId('review-ship-block').nth(i).textContent();
        strShipToAddress = strShipToAddress.replace(/[\s,]/g, '').toLowerCase();
        const addressDisplay = address.replace(/[\s,]/g, '').replace('Editselectedaddress', '').toLowerCase();
        expect(strShipToAddress).toContain(addressDisplay);
      })
    );
  }

  async verifyPickupNotificationMsg() {
    const pickUpNotificationMsgHdr = await page.locator('.store-pickup-notify-message > h4').textContent();
    expect(pickUpNotificationMsgHdr).toContain('What you need to know');
    const pickUpNotificationMsg = await page.locator('.store-pickup-notify-message > .message').textContent();
    expect(pickUpNotificationMsg).toContain(
      'Please wait for your “Ready for Pickup” email before coming to the store. We will notify you via email or text as each item in your order is ready for pickup.'
    );
  }

  async verifyThankYouMsgSection() {
    await expect(page.locator(elements.reviewPage.divTym)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Thank you message section is displayed in the review page');
    await expect(page.locator(elements.reviewPage.lblTymTitle)).toContainText(testData.reviewPage.tymTitle);
    await expect(page.locator(elements.reviewPage.lblTymCopy)).toHaveText(testData.reviewPage.tymCopy);
    await expect(page.locator(elements.reviewPage.lblTymOption1)).toHaveText(testData.reviewPage.tymOption1);
    await expect(page.locator(elements.reviewPage.lblTymOption2)).toHaveText(testData.reviewPage.tymOption2);
    await expect(page.locator(elements.reviewPage.lblTymAddress)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Content on the Thank you message section is displayed as expected');
    await expect(page.locator(elements.reviewPage.rdTymOption1)).toBeChecked();
    await expect(page.locator(elements.reviewPage.rdTymOption2)).not.toBeChecked();
    testReport.log(this.pageName, 'First radio option is selected by default');
  }

  async verifyRegistryItemLabel() {
    const arrayReviewElements = await common.getElementHandlesArray(elements.reviewPage.lblRegistryItem);
    let isSuccess = false;

    await Promise.all(
      arrayReviewElements.map(async (ele, i) => {
        await expect(page.locator(elements.reviewPage.lblRegistryItem).nth(i)).toHaveText('Registry Item');
        isSuccess = true;
      })
    );
    if (isSuccess) testReport.log(this.pageName, 'Registry Item label displayed in the review page for all registry items as expected');
    else testReport.log(this.pageName, 'Registry Item label not displayed in the review page');
  }

  async verifyThankyouManagerAddressDetails() {
    const addressInfo = getAddressData('DOMESTIC');
    const addressInfoString = `${addressInfo.firstName} ${addressInfo.lastName}${addressInfo.address1}${addressInfo.city}, ${addressInfo.state} Edit`;
    const txtTYMAddress = await page.locator(elements.reviewPage.lblTymAddress).locator('.address-display').textContent();
    expect(addressInfoString.toLowerCase()).toEqual(txtTYMAddress.toLowerCase());
  }

  async proceedToReviewPageAndValidate() {
    await expect(page.locator(elements.paymentPage.btnPymtProceedToReview)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnPymtProceedToReview);
    const avsPopup = page.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopup);
    if (avsPopup.count() > 0) avsPopup.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await expect(page.locator('[data-testid="lbl-review-page-greeting"]')).toBeVisible({ timeout });
  }

  async verifyShipToRegistrantMessage() {
    // await expect(page.locator(elements.reviewPage.btnPlaceOrder).first()).toBeVisible({ timeout });
    await expect(page.locator(elements.giftRegistryItems.lblShipToGrAddressMessageReview).first()).toBeVisible({ timeout });
  }
}

module.exports = { ReviewPage };
