const { expect } = require('@playwright/test');
const elements = require('../../elements/elements');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();
const testData = require('../../datafiles/testdata');
const env = require('../../../../support/env/env');
const { timeout } = require('../../../../configs/config');

// eslint-disable-next-line import/no-restricted-paths
const { CheckoutPage } = require('../common/checkout.page');

class ConfirmationPage extends CheckoutPage {
  pageName = this.constructor.name;

  /**
   * @author: asoman
   * @function_Name : verifyOrderConfirmationDetails
   * @Description : Verify the confirmation page for top order information like greeting, order number, date, email etc
   * @params : JSON Object captured from the review order page
   * @returns : None
   * */

  async verifyOrderConfirmationDetails(orderInfo) {
    // await page.waitForNavigation();
    await expect(page.locator(elements.confirmationPage.lblOrderConfirmationDtl)).toBeVisible({ timeout });
    // Verify Confirmation Message
    testReport.log(this.pageName, 'Order Confirmation Page is displayed');
    expect(await page.locator(elements.confirmationPage.lblConfirmationMsg).textContent()).toContain('Thank you for shopping with us!');
    testReport.log(this.pageName, "Assert -> 'Thank you for shopping with us!' is displayed");

    const orderNo = await page.innerText(elements.confirmationPage.lblOrderNumber);
    expect(typeof orderNo).toEqual('string');
    testReport.log(this.pageName, `Order Confirmation Number -> ${orderNo}`);
    testReport.logTestSnapshot(this.pageName, `Order Confirmation Number -> ${orderNo}`);

    const orderDate = await page.innerText(elements.confirmationPage.lblOrderDate);
    expect(typeof orderDate).toEqual('string');
    testReport.log(this.pageName, `Order Date -> ${orderDate}`);

    // verify ACCT Email
    const orderInfoJson = orderInfo.itemContext;
    const receiptEmail = JSON.parse(JSON.stringify(orderInfoJson.receiptEmail));
    expect(await page.locator(elements.confirmationPage.lblRecipientEmail).textContent()).toContain(receiptEmail);
    testReport.log(this.pageName, `Receipt Email -> ${await page.locator(elements.confirmationPage.lblRecipientEmail).textContent()}`);
  }

  async verifyLongDistanceMessageOnConfirmationPage() {
    await expect(page.getByTestId(elements.confirmationPage.lblAvailabilityMsg).textContent()).toContain(env.LBL_AVAILABILITY_MSG_LONG_DISTANCE);
  }

  /**
   * @author: mpeddi
   * @function_Name : clickOnPrintReceiptLink
   * @Description : To Launch the print receipt dialog
   * @params :
   * @returns : None
   * */

  async clickOnPrintReceiptLink() {
    await page.click(elements.confirmationPage.lnkPrintReceipt());
  }

  /**
   * @author: mpeddi
   * @function_Name : handlePrintDlg
   * @Description : To Handle print print dialogue by clicking on Cancel button
   * @params :
   * @returns : None
   * */

  async handlePrintDlg() {
    // Handle print dlg by clicking on Cancel button
  }

  /**
   * @author: mpeddi
   * @function_Name : clickOnViewOrderDetailsLink
   * @Description : To Handle print print dialogue by clicking on Cancel button
   * @params :
   * @returns : None
   * */

  async clickOnViewOrderDetailsLink() {
    expect(page.locator(elements.confirmationPage.lnkViewOrderDetails)).isVisible();
    testReport.log(this.pageName, 'Order Details Link is Present');
  }

  /**
   * @author: asoman
   * @function_Name : validateRecipientDetails
   * @Description : To validate the recipient shipping information, item details, billing details
   * @params : JSON Object captured from the review order page
   * @returns : None
   * */
  async validateRecipientDetails(orderInfo) {
    const arrayRecipient = await common.getElementHandlesArray(elements.confirmationPage.eleRecipientSection);
    const arrayRecipientCount = arrayRecipient.length;
    testReport.log(this.pageName, `Number of Recipients -> ${arrayRecipientCount}`);

    const orderInfoJson = orderInfo.itemContext;

    // for (let i = 0; i < arrayRecipientCount; i++) {

    await Promise.all(
      arrayRecipient.map(async (ele, i) => {
        const recipientSection = page.locator(elements.confirmationPage.eleRecipientChild).nth(i);

        if (arrayRecipientCount > 1) {
          const recipientNum = i + parseInt(1, 10);
          const hdrRecipientChild = await recipientSection.locator(elements.confirmationPage.eleRecipientCount).textContent();
          expect(hdrRecipientChild).toContain(`Ship To (Recipient ${recipientNum})`);
          testReport.log(this.pageName, `Recipient Header -> Ship To (Recipient ${recipientNum})`);
        }

        const strShipToAddress = await recipientSection.locator(elements.confirmationPage.eleShippingAddress).textContent();
        const recipientJson = JSON.parse(JSON.stringify(orderInfoJson[`recipient${i}`]));
        common.compareStringByRemovingExtraSpaces(this.pageName, strShipToAddress, recipientJson.shipToAddress);
        testReport.log(this.pageName, `Ship To Address -> ${strShipToAddress}`);

        let strPaymentInfo = await recipientSection.locator(elements.confirmationPage.lblPaymentInfo).textContent();
        const arrayPaymentJson = orderInfoJson.paymentMethod;
        let expectedPaymentType = '';
        for (let j = 0; j < arrayPaymentJson.length; j++) {
          const paymentJson = arrayPaymentJson[j];
          let { paymentType } = paymentJson;
          if (paymentType.includes('PayPal')) {
            paymentType = 'PayPal';
          }
          if (paymentType.includes('Rewards')) {
            paymentType = paymentType.replace('Rewards Number', 'Reward Certificate');
          }
          expectedPaymentType += paymentType;
        }
        strPaymentInfo = strPaymentInfo.replace('Payment', '');
        expectedPaymentType = expectedPaymentType.replace('Payment', '');
        expect(strPaymentInfo).toContain(expectedPaymentType);
        testReport.log(this.pageName, `Payment Info -> ${strPaymentInfo}`);

        if (strPaymentInfo.includes('PayPal')) {
          testReport.log(this.pageName, 'PayPal payment was used');
          expect(await recipientSection.locator(elements.confirmationPage.eleBillingAddress).count()).toEqual(0);
        } else {
          const strBillToAddress = await recipientSection.locator(elements.confirmationPage.eleBillingAddress).textContent();
          let actualBillingAddress = orderInfoJson.billingAddress;

          if (!orderInfo.isInternationalBillingAddress) {
            testReport.log(this.pageName, 'Is NOT international billing...');
            if (env.EXEC_SITE.includes('can')) {
              actualBillingAddress = actualBillingAddress.replace('(', 'canada(');
            } else {
              actualBillingAddress = actualBillingAddress.replace('(', 'united states of america(');
            }
          }

          common.compareStringByRemovingExtraSpaces(this.pageName, strBillToAddress, actualBillingAddress);
          testReport.log(this.pageName, `Bill To Address -> ${strBillToAddress}`);
        }

        const strItemListHdr = await recipientSection.locator(elements.confirmationPage.lblItemListHdr).textContent();
        expect(strItemListHdr).toContain('Item(s)');
        testReport.log(this.pageName, `Item List Header -> ${strItemListHdr}`);

        const arrayItemListCount = await recipientSection.locator(elements.confirmationPage.eleItemList).count();
        testReport.log(this.pageName, arrayItemListCount);
        testReport.log(this.pageName, `Number of Items shipping to Recipient -> ${arrayItemListCount}`);

        const itemList = recipientJson.items;
        const fulfillmentType = recipientJson.shipMode;

        let isAllItemsInStock = true;

        const recipientSectionText = await page.locator(elements.confirmationPage.eleRecipientChild).nth(i).textContent();
        testReport.log(this.pageName, `recipientSectionText --> ${recipientSectionText}`);

        // check atleast one item shipping to recipient has backordered item
        let isShipmentHasBackOrder = false;
        let isShipmentHasMTO = false;

        if (recipientSectionText.includes('backorder')) {
          isShipmentHasBackOrder = true;
        }

        if (recipientSectionText.includes('made just for you')) {
          isShipmentHasBackOrder = false;
          isShipmentHasMTO = true;
        }

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.confirmationPage.eleRecipientChild} >> nth=${i} >> ${elements.confirmationPage.eleItemList}`);
        testReport.log(this.pageName, `number of items shipped to current recipient-- ${itemElementHandlesArray.length}`);

        // items
        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            // for (let j = 0; j < arrayItemListCount; j++) {
            testReport.log(this.pageName, `j-->${j}`);
            const item = JSON.parse(itemList[j]);
            await expect(recipientSection.locator(elements.confirmationPage.imgProduct).nth(j)).toBeVisible({ timeout });
            testReport.log(this.pageName, 'Item image is visible');

            if (item.isGRItem) {
              const grLabel = await recipientSection.locator(elements.confirmationPage.divRegistryItem).textContent();
              expect(grLabel).toContain('Registry Item');
            }

            const arrayItem = recipientSection.locator(elements.confirmationPage.eleItemList).nth(j);
            let skuPrice = item.skuPrice.replace('$', '');
            skuPrice = skuPrice.replace('CAD ', '');
            const skuTotalPrice = (parseFloat(item.skuQty) * parseFloat(skuPrice)).toString();
            const strSkuTitle = await arrayItem.locator(elements.confirmationPage.lblProductTitle).textContent();

            /* bug in review page. product name in cart doesnt match with review and confirmation page                
                          common.compareStringByRemovingSpecChars(this.pageName, strSkuTitle, item['skuTitle'])
                          */

            const strSkuQty = await arrayItem.locator(elements.confirmationPage.lblSkuQty).textContent();
            expect(strSkuQty).toContain(item.skuQty);
            const strSkuPrice = await arrayItem.locator(elements.confirmationPage.lblSkuPrice).textContent();
            expect(strSkuPrice).toContain(item.skuPrice);

            const strSkuPriceTotal = await arrayItem.locator(elements.confirmationPage.lblPriceTotal).textContent();
            expect(strSkuPriceTotal).toContain(skuTotalPrice);

            testReport.log(this.pageName, `skuTitle: - Actual ->${strSkuTitle} Expected -> ${item.skuTitle}`);
            testReport.log(this.pageName, `skuQty: - Actual ->${strSkuQty} Expected -> ${item.skuQty}`);
            testReport.log(this.pageName, `skuPrice: - Actual ->${strSkuPrice} Expected -> ${item.skuPrice}`);
            testReport.log(this.pageName, `skuTotalPrice: - Actual ->${strSkuPriceTotal} Expected -> ${skuTotalPrice}`);

            const { isPersonalizedSku } = item;
            if (isPersonalizedSku) {
              const selectedPersonalizationInfoElement = page.locator('.personalization-design').nth(i);
              const { personalizationInfo } = item;
              testReport.log(this.pageName, `personalizationInfo - ${JSON.stringify(personalizationInfo)}`);
              // eslint-disable-next-line no-await-in-loop
              await this.verifyPersonalizationInfo(this.pageName, selectedPersonalizationInfoElement, personalizationInfo);
            }

            if (fulfillmentType !== 'Pickup') {
              // check current item is backordered or not
              const isItemOnBackOrder = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).isVisible();
              if (!isShipmentHasBackOrder && !isShipmentHasMTO) {
                const strSkuAvailabilityMsg = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();
                expect(strSkuAvailabilityMsg).toContain(item.skuAvailabilityMsg);
                testReport.log(this.pageName, `skuAvailabilityMsg: - Actual ->${strSkuAvailabilityMsg} Expected -> ${item.skuAvailabilityMsg}`);
              } else if (isShipmentHasMTO) {
                let strSkuArrivesMsg;
                const backOrderMtoMsgCount = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).count();
                if (backOrderMtoMsgCount > 0) {
                  strSkuArrivesMsg = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                } else {
                  strSkuArrivesMsg = await arrayItem.locator('.warning.fcRed').textContent();
                }
                expect(strSkuArrivesMsg).toContain(item.skuAvailabilityMsg.trim());
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${strSkuArrivesMsg} Expected -> ${item.skuAvailabilityMsg}`);
                isAllItemsInStock = false;
              } else if (isItemOnBackOrder) {
                const strSkuArrivesMsg = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                expect(strSkuArrivesMsg).toContain(item.skuArrivesByMsg);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${strSkuArrivesMsg} Expected -> ${item.skuArrivesByMsg}`);
                isAllItemsInStock = false;
              } else if (item.isPersonalizedSku) {
                const strSkuArrivesMsg = await arrayItem.locator('.product-arrives-by-message').textContent();
                expect(strSkuArrivesMsg).toContain(item.skuArrivesByMsg);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${strSkuArrivesMsg} Expected -> ${item.skuArrivesByMsg}`);
                isAllItemsInStock = false;
              } else {
                const strSkuAvailabilityMsg = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();
                expect(strSkuAvailabilityMsg).toContain(item.skuAvailabilityMsg);
                testReport.log(this.pageName, `skuAvailabilityMsg: - Actual ->${strSkuAvailabilityMsg} Expected -> ${item.skuAvailabilityMsg}`);

                const strSkuArrivesMsg = await arrayItem.locator(elements.confirmationPage.lblArrivesByMessage).textContent();
                expect(strSkuArrivesMsg).toContain(item.skuArrivesByMsg);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${strSkuArrivesMsg} Expected -> ${item.skuArrivesByMsg}`);
              }
            } else if (fulfillmentType === 'Pickup' && item.skuFfmType === 'bops') {
              const pickupByMsg = await arrayItem.locator('.store-pickup-slot').textContent();
              expect(pickupByMsg).toContain(item.skuArrivesByMsg);
            }

            // arrives by message is missing at item level for instock. hence below line commented
            // expect(await arrayItemList.locator('.item-shipping-messages').textContent()).toContain(item['skuArrivesByMsg'])
          })
        );

        if (recipientJson.pickupLocationType === 'store') {
          if (fulfillmentType === 'Pickup') {
            const pickUpNotificationMsgHdr = await recipientSection.locator('.store-pickup-notify-message > h4').textContent();
            expect(pickUpNotificationMsgHdr).toContain('What you need to know');
            const pickUpNotificationMsg = await recipientSection.locator('.store-pickup-notify-message > .message').textContent();
            expect(pickUpNotificationMsg).toContain(
              'Please wait for your “Ready for Pickup” email before coming to the store. We will notify you via email or text as each item in your order is ready for pickup.'
            );
          }
        } else if (isAllItemsInStock) {
          const strRecipientAvailabilityMsg = await recipientSection.locator(elements.confirmationPage.lblRecipientAvailabilityMsg).textContent();
          // when multiple items with mixed status we dont show arrives message
          expect(strRecipientAvailabilityMsg).toContain(recipientJson.arrivesMsg);
          testReport.log(this.pageName, `Avaialability Message at Recipient level -> ${strRecipientAvailabilityMsg}`);
        }
      })
    );
  }

  async addAvailabilityMessageInConfirmationPage(orderInfo) {
    const arrayRecipient = await common.getElementHandlesArray(elements.confirmationPage.eleRecipientSection);

    const orderInfoJson = orderInfo.itemContext;

    const confirmationPageAvailability = {};

    // for (let i = 0; i < arrayRecipientCount; i++) {

    await Promise.all(
      arrayRecipient.map(async (ele, i) => {
        const recipientSection = page.locator(elements.confirmationPage.eleRecipientChild).nth(i);

        const recipientJson = JSON.parse(JSON.stringify(orderInfoJson[`recipient${i}`]));

        const itemList = recipientJson.items;
        const fulfillmentType = recipientJson.shipMode;

        let isAllItemsInStock = true;

        const recipientSectionText = await page.locator(elements.confirmationPage.eleRecipientChild).nth(i).textContent();
        testReport.log(this.pageName, `recipientSectionText --> ${recipientSectionText}`);

        // check atleast one item shipping to recipient has backordered item
        let isShipmentHasBackOrder = false;
        let isShipmentHasMTO = false;

        if (recipientSectionText.includes('backorder')) {
          isShipmentHasBackOrder = true;
        }

        if (recipientSectionText.includes('made just for you')) {
          isShipmentHasBackOrder = false;
          isShipmentHasMTO = true;
        }

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.confirmationPage.eleRecipientChild} >> nth=${i} >> ${elements.confirmationPage.eleItemList}`);

        // items
        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            // for (let j = 0; j < arrayItemListCount; j++) {
            const item = JSON.parse(itemList[j]);

            const arrayItem = recipientSection.locator(elements.confirmationPage.eleItemList).nth(j);

            if (!(fulfillmentType === 'Pickup')) {
              // check current item is backordered or not
              const isItemOnBackOrder = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).isVisible();
              if (!isShipmentHasBackOrder && !isShipmentHasMTO) {
                confirmationPageAvailability.AvailabilityMessage = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();
              } else if (isShipmentHasMTO) {
                confirmationPageAvailability.ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                isAllItemsInStock = false;
              } else if (isItemOnBackOrder) {
                confirmationPageAvailability.ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                isAllItemsInStock = false;
              } else {
                confirmationPageAvailability.AvailabilityMessage = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();

                confirmationPageAvailability.ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblArrivesByMessage).textContent();
              }
            } else if (fulfillmentType === 'Pickup' && item.skuFfmType === 'bops') {
              confirmationPageAvailability.pickupByMsg = await arrayItem.getByTestId('store-pickup-slot').textContent();
            }

            // arrives by message is missing at item level for instock. hence below line commented
            // expect(await arrayItemList.locator('.item-shipping-messages').textContent()).toContain(item['skuArrivesByMsg'])
          })
        );

        if (recipientJson.pickupLocationType === 'store') {
          if (fulfillmentType === 'Pickup') {
            const pickUpNotificationMsgHdr = await recipientSection.locator('.store-pickup-notify-message > h4').textContent();
            expect(pickUpNotificationMsgHdr).toContain('What you need to know');
            const pickUpNotificationMsg = await recipientSection.locator('.store-pickup-notify-message > .message').textContent();
            expect(pickUpNotificationMsg).toContain(
              'Please wait for your “Ready for Pickup” email before coming to the store. We will notify you via email or text as each item in your order is ready for pickup.'
            );
          }
        } else if (isAllItemsInStock) {
          confirmationPageAvailability.strRecipientAvailabilityMsg = await recipientSection
            .locator(elements.confirmationPage.lblRecipientAvailabilityMsg)
            .textContent();
        }
      })
    );
    this.availabilityInfo = { ...this.availabilityInfo, confirmationPageAvailability };
  }

  async verifyAvailabilityMessageInConfirmationPage(orderInfo) {
    const arrayRecipient = await common.getElementHandlesArray(elements.confirmationPage.eleRecipientSection);

    const orderInfoJson = orderInfo.itemContext;

    const { confirmationPageAvailability } = this.availabilityInfo;

    // for (let i = 0; i < arrayRecipientCount; i++) {

    await Promise.all(
      arrayRecipient.map(async (ele, i) => {
        const recipientSection = page.locator(elements.confirmationPage.eleRecipientChild).nth(i);

        const recipientJson = JSON.parse(JSON.stringify(orderInfoJson[`recipient${i}`]));

        const itemList = recipientJson.items;
        const fulfillmentType = recipientJson.shipMode;

        let isAllItemsInStock = true;

        const recipientSectionText = await page.locator(elements.confirmationPage.eleRecipientChild).nth(i).textContent();
        testReport.log(this.pageName, `recipientSectionText --> ${recipientSectionText}`);

        // check atleast one item shipping to recipient has backordered item
        let isShipmentHasBackOrder = false;
        let isShipmentHasMTO = false;

        if (recipientSectionText.includes('backorder')) {
          isShipmentHasBackOrder = true;
        }

        if (recipientSectionText.includes('made just for you')) {
          isShipmentHasBackOrder = false;
          isShipmentHasMTO = true;
        }

        // eslint-disable-next-line playwright/no-element-handle
        const itemElementHandlesArray = await page.$$(`${elements.confirmationPage.eleRecipientChild} >> nth=${i} >> ${elements.confirmationPage.eleItemList}`);

        // items
        await Promise.all(
          itemElementHandlesArray.map(async (elem, j) => {
            // for (let j = 0; j < arrayItemListCount; j++) {
            const item = JSON.parse(itemList[j]);

            const arrayItem = recipientSection.locator(elements.confirmationPage.eleItemList).nth(j);

            if (!(fulfillmentType === 'Pickup')) {
              // check current item is backordered or not
              const isItemOnBackOrder = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).isVisible();
              if (!isShipmentHasBackOrder && !isShipmentHasMTO) {
                const AvailabilityMessage = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();
                expect(AvailabilityMessage).toContain(confirmationPageAvailability.AvailabilityMessage);
                testReport.log(
                  this.pageName,
                  `skuAvailabilityMsg: - Actual ->${AvailabilityMessage} Expected -> ${confirmationPageAvailability.AvailabilityMessage}`
                );
              } else if (isShipmentHasMTO) {
                const ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                expect(ArrivesBy).toContain(confirmationPageAvailability.ArrivesBy);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${confirmationPageAvailability.ArrivesBy}`);
                isAllItemsInStock = false;
              } else if (isItemOnBackOrder) {
                const ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblBackOrderArrivesByMessage).textContent();
                expect(ArrivesBy).toContain(confirmationPageAvailability.ArrivesBy);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${confirmationPageAvailability.ArrivesBy}`);
                isAllItemsInStock = false;
              } else {
                const AvailabilityMessage = await arrayItem.locator(elements.confirmationPage.lblAvailabilityMsg).textContent();
                expect(AvailabilityMessage).toContain(confirmationPageAvailability.AvailabilityMessage);
                testReport.log(
                  this.pageName,
                  `skuAvailabilityMsg: - Actual ->${AvailabilityMessage} Expected -> ${confirmationPageAvailability.AvailabilityMessage}`
                );

                const ArrivesBy = await arrayItem.locator(elements.confirmationPage.lblArrivesByMessage).textContent();
                expect(ArrivesBy).toContain(confirmationPageAvailability.ArrivesBy);
                testReport.log(this.pageName, `skuArrivesByMsg: - Actual ->${ArrivesBy} Expected -> ${confirmationPageAvailability.ArrivesBy}`);
              }
            } else if (fulfillmentType === 'Pickup' && item.skuFfmType === 'bops') {
              const pickupByMsg = await arrayItem.getByTestId('store-pickup-slot').textContent();
              expect(pickupByMsg).toContain(confirmationPageAvailability.pickupByMsg);
              testReport.log(this.pageName, `skupickupByMsg: - Actual ->${pickupByMsg} Expected -> ${confirmationPageAvailability.pickupByMsg}`);
            }

            // arrives by message is missing at item level for instock. hence below line commented
            // expect(await arrayItemList.locator('.item-shipping-messages').textContent()).toContain(item['skuArrivesByMsg'])
          })
        );

        if (recipientJson.pickupLocationType === 'store') {
          if (fulfillmentType === 'Pickup') {
            const pickUpNotificationMsgHdr = await recipientSection.locator('.store-pickup-notify-message > h4').textContent();
            expect(pickUpNotificationMsgHdr).toContain('What you need to know');
            const pickUpNotificationMsg = await recipientSection.locator('.store-pickup-notify-message > .message').textContent();
            expect(pickUpNotificationMsg).toContain(
              'Please wait for your “Ready for Pickup” email before coming to the store. We will notify you via email or text as each item in your order is ready for pickup.'
            );
          }
        } else if (isAllItemsInStock) {
          const strRecipientAvailabilityMsg = await recipientSection.locator(elements.confirmationPage.lblRecipientAvailabilityMsg).textContent();
          // when multiple items with mixed status we dont show arrives message
          expect(strRecipientAvailabilityMsg).toContain(confirmationPageAvailability.strRecipientAvailabilityMsg);
          testReport.log(
            this.pageName,
            `Avaialability Message at Recipient level: Actual -> ${strRecipientAvailabilityMsg} Expected -> ${confirmationPageAvailability.strRecipientAvailabilityMsg}`
          );
        }
      })
    );
  }

  /**
   * @author: asoman
   * @function_Name : verifyReviewOrderSummary
   * @Description : To validate the order summary printed in confirmation page and compare it with review page
   * @params : JSON Object captured from the review order page
   * @returns : None
   * */
  async verifyReviewOrderSummary(orderInfo) {
    // var objOrderSummary = orderInfo['orderSummary']
    const jsonObjOrderSummary = JSON.parse(JSON.stringify(orderInfo.orderSummary));

    const lblMerchadiseTotalAmount = await page.locator(elements.confirmationPage.lblMerchadiseTotalAmount).textContent();
    const lblShippingHandlingAmount = await page.locator(elements.confirmationPage.lblShippingHandlingAmount).textContent();
    const lblTaxTotalAmount = await page.locator(elements.confirmationPage.lblTaxTotalAmount).textContent();
    const lblSummaryTotalAmount = await page.locator(elements.confirmationPage.lblSummaryTotalAmount).textContent();

    /*
            these may or may not come. need to handle accordingly
    
            var lblGiftCardAmount = await page.locator(elements.confirmationPage.lblGiftCardAmount).textContent()
            var lblRemainingAmount = await page.locator(elements.confirmationPage.lblRemainingAmount).textContent()
            */

    expect(lblMerchadiseTotalAmount).toContain(jsonObjOrderSummary.merchandiseAmt);
    expect(lblShippingHandlingAmount).toContain(jsonObjOrderSummary.shippingHandlingAmt);
    expect(lblTaxTotalAmount).toContain(jsonObjOrderSummary.taxAmt);
    expect(lblSummaryTotalAmount).toContain(jsonObjOrderSummary.orderTotalAmt);

    testReport.log(this.pageName, `MerchandiseAmount: - Actual ->${lblMerchadiseTotalAmount} Expected -> ${jsonObjOrderSummary.merchandiseAmt}`);
    testReport.log(this.pageName, `EstShippingAndHandling: - Actual ->${lblShippingHandlingAmount} Expected -> ${jsonObjOrderSummary.shippingHandlingAmt}`);
    testReport.log(this.pageName, `Est.Tax: - Actual ->${lblTaxTotalAmount} Expected -> ${jsonObjOrderSummary.taxAmt}`);
    testReport.log(this.pageName, `Est. OrderTotal: - Actual ->${lblSummaryTotalAmount} Expected -> ${jsonObjOrderSummary.orderTotalAmt}`);

    const paymentInfoElements = page.locator('.payment-info');
    const paymentInfoElementsCount = paymentInfoElements.count();
    if (paymentInfoElementsCount === 1) {
      if ((await page.locator('.payment-info').textContent()).includes('Gift Card')) {
        const lblGiftCardAmount = await page.locator(elements.confirmationPage.lblGiftCardAmount).textContent();
        const lblRemainingAmount = await page.locator(elements.confirmationPage.lblRemainingAmount).textContent();
        expect(lblGiftCardAmount).toContain(jsonObjOrderSummary.giftCardAmt);
        expect(lblRemainingAmount).toContain(jsonObjOrderSummary.remainingTotalAmt);
        testReport.log(this.pageName, `Est. Gift Card: - Actual ->${lblGiftCardAmount} Expected -> ${jsonObjOrderSummary.taxAmt}`);
        testReport.log(this.pageName, `Est. Remaining Total:  - Actual ->${lblRemainingAmount} Expected -> ${jsonObjOrderSummary.orderTotalAmt}`);
      }
      if ((await page.locator('.payment-info').textContent()).includes('Reward')) {
        const lblRewards = await page.locator(elements.confirmationPage.lblRewards).textContent();
        const lblRemainingAmount = await page.locator(elements.confirmationPage.lblRemainingAmount).textContent();
        expect(lblRewards).toContain(jsonObjOrderSummary.rewardsAmt);
        expect(lblRemainingAmount).toContain(jsonObjOrderSummary.remainingTotalAmt);
        testReport.log(this.pageName, `Est. Rewards: - Actual ->${lblRewards} Expected -> ${jsonObjOrderSummary.rewardsAmt}`);
        testReport.log(this.pageName, `Est. Remaining Total:  - Actual ->${lblRemainingAmount} Expected -> ${jsonObjOrderSummary.orderTotalAmt}`);
      }
    }
  }

  async verifyRewardUsed(cardNo) {
    const paymentCardInfo = await page.locator(elements.confirmationPage.paymentCardInfo).last().innerText();
    await expect(paymentCardInfo).toContain(cardNo);
  }

  async verifyMultipleRewardUsed(cardList) {
    const cardCount = await common.getElementHandlesArray(elements.confirmationPage.paymentCardListInfo);
    await Promise.all(
      cardCount.map(async (ele, i) => {
        let paymentCardInfo = await page.locator(elements.confirmationPage.paymentCardListInfo).nth(i).textContent();
        if (paymentCardInfo.indexOf('Reward') > -1) {
          paymentCardInfo = paymentCardInfo.replace('Reward Certificate ***', '');
          expect(cardList).toContain(paymentCardInfo);
        }
      })
    );
    // for (let i = 0; i < cardCount.length; i++) {
    //   let paymentCardInfo = await page.locator(elements.confirmationPage.paymentCardListInfo).nth(i).textContent();
    //   if (paymentCardInfo.indexOf('Reward') > -1) {
    //     paymentCardInfo = paymentCardInfo.replace('Reward Certificate ***', '');
    //     expect(cardList).toContain(paymentCardInfo);
    //   }
    // }
  }

  async verifyConfirmationGiftBoxOrderSummary(orderInfo) {
    // const orderInfoJson = orderInfo.itemContext;
    const orderSummaryJson = JSON.parse(JSON.stringify(orderInfo.orderSummary));
    let lblGiftBox = await page.locator(elements.confirmationPage.lblGiftBoxAmount).textContent();
    lblGiftBox = lblGiftBox.replace('Gift Box: ', '');
    expect(lblGiftBox).toContain(orderSummaryJson.giftBoxAmt);

    testReport.log(this.pageName, `Est. GiftBox: - Actual ->${lblGiftBox} Expected -> ${orderSummaryJson.giftBoxAmt}`);
  }

  async verifyShopCard(shopCardInfo) {
    const arrayRecipient = await common.getElementHandlesArray(elements.confirmationPage.eleRecipientSection);
    await Promise.all(
      arrayRecipient.map(async (ele, i) => {
        const recipientSection = page.locator(elements.confirmationPage.eleRecipientChild).nth(i);
        const strPaymentInfo = await recipientSection.locator(elements.confirmationPage.lblPaymentInfo).textContent();
        expect(strPaymentInfo).toContain('Gift Card');
        expect(strPaymentInfo).toContain(shopCardInfo);
      })
    );
  }

  async verifyRegistryItemLabel() {
    const arrayConfirmPageElements = await common.getElementHandlesArray(elements.confirmationPage.divRegistryItem);
    let isSuccess = false;

    await Promise.all(
      arrayConfirmPageElements.map(async (ele, i) => {
        await expect(page.locator(elements.confirmationPage.divRegistryItem).nth(i)).toHaveText('Registry Item');
        isSuccess = true;
      })
    );
    if (isSuccess) testReport.log(this.pageName, 'Registry Item label displayed in the confirmation page for all registry items as expected');
    else testReport.log(this.pageName, 'Registry Item label not displayed in the confirmation page');
  }

  async verifyAutoCorrectionAddress() {
    const strShipToAddress = page.locator(elements.confirmationPage.shipToAddress);
    const isCanada = env.EXEC_SITE.includes('can');
    const shipAddressData = isCanada ? testData.canada.autoCorrectionAddress : testData.autoCorrectionAddress;
    const address = `${shipAddressData.firstName} ${shipAddressData.lastName}${shipAddressData.addressCorrection}${shipAddressData.city}, ${shipAddressData.state} ${shipAddressData.zipCode}${shipAddressData.phoneNumber}`;
    await expect(strShipToAddress).toContainText(address, { ignoreCase: true });
    testReport.log(this.pageName, `Ship To Address -> ${strShipToAddress}`);
  }

  async verifyShipToRegistrantMessage() {
    await expect(page.locator(elements.giftRegistryItems.lblShipToGrAddressMessageConfirm).first()).toBeVisible({ timeout });
  }
}

module.exports = { ConfirmationPage };
