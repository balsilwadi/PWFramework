const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
// eslint-disable-next-line import/no-restricted-paths
const { CheckoutPage } = require('../common/checkout.page');

const testReport = new ReportUtils();
const common = new CommonUtils();
const checkout = new CheckoutPage();
const testData = require('../../datafiles/testdata');
const elements = require('../../elements/elements');
const env = require('../../../../support/env/env');
const { getAddressData } = require('../../../helpers/data-dictionary');
const { timeout } = require('../../../../configs/config');

const shipAddress = {};
const multipleShipAddress = [];
let shipModeSelected;
let shipmentArrivesBy = '';

class ShippingPage extends CheckoutPage {
  constructor() {
    super();
    this.isMobile = common.verifyIsMobile();
    this.pageName = 'ShippingPage';
  }

  pageName = this.constructor.name;

  /**
   * @author:  asoman
   * @function_Name : verifyShippingPageBreadcrumbs
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async verifyShippingPageBreadcrumbs() {
    const shippingPageBreadCrumbs = await page.locator(elements.shippingAndGiftingPage.shippingPageSelectBreadCrumbs).textContent();
    expect(shippingPageBreadCrumbs).toContain('Shipping and\nGift Options');
    testReport.log(this.pageName, "Verified 'Shipping and Gift options' is present");
  }

  async verifyShippingPageLoad() {
    const strShippingToSingleRecipientHeader = await page
      .locator('.shipping-title.section-title.shipping-single-title, .section-title.shipping-title.single-address')
      .textContent();
    expect(strShippingToSingleRecipientHeader).toContain('Ship To');
    testReport.log(this.pageName, `Verified the ShipTo Single Recipient header:: ${strShippingToSingleRecipientHeader}`);
  }

  /**
   * @author:  asoman
   * @function_Name : verifyShippingRecipientDetails
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async verifyShippingRecipientDetails(orderDetailsInfo) {
    await this.verifyShippingPageLoad();

    /// /var strShipToAddress = await page.getByTestId('ship-to-address').textContent()
    const strShipToAddress = await page.getByTestId(elements.shippingAndGiftingPage.lblShipToAddress).textContent();
    testReport.log(this.pageName, strShipToAddress);
    shipAddress.shipToAddress = strShipToAddress;
    testReport.log(this.pageName, `Verified that ShipTo Address is present:: ${strShipToAddress}`);

    await expect(page.locator(elements.shippingAndGiftingPage.lnkEditShipAddress)).toBeVisible({ timeout });
    testReport.log(this.pageName, "Verified 'Edit' link present next to the shipping address");

    const strShippingItemHeader = await page.getByTestId(elements.shippingAndGiftingPage.lblShipItemsHdr).textContent();
    expect(strShippingItemHeader).toContain('Item(s)');
    testReport.log(this.pageName, `Verified that Shipping Item header is present:: ${strShippingItemHeader}`);
    const cartSkuInfo = orderDetailsInfo.itemContexts.itemContext[0].recipient0.items;

    const arrayShipItemElements = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayItems);
    await Promise.all(
      arrayShipItemElements.map(async (ele, i) => {
        const skuTitle = await page.getByTestId(elements.shippingAndGiftingPage.lblItemTitle).nth(i).textContent();
        const skuQty = await page.getByTestId(elements.shippingAndGiftingPage.lblItemQuantity).nth(i).textContent();
        testReport.log(this.pageName, `Item - ${skuTitle} is displayed with quantity ${skuQty}`);

        for (let k = 0; k < cartSkuInfo.length; k++) {
          const skuObj = JSON.parse(cartSkuInfo[k]);
          if (Object.prototype.hasOwnProperty.call(skuObj, skuTitle)) {
            const { isPersonalizedSku } = skuObj[skuTitle];
            if (isPersonalizedSku) {
              const selectedPersonalizationInfoElement = page.locator('.personalization-design').nth(i);
              const { personalizationInfo } = skuObj[skuTitle];
              testReport.log(this.pageName, `personalizationInfo - ${JSON.stringify(personalizationInfo)}`);
              // eslint-disable-next-line no-await-in-loop
              await this.verifyPersonalizationInfo(this.pageName, selectedPersonalizationInfoElement, personalizationInfo);
            }
          }
        }
      })
    );

    if (arrayShipItemElements.length > 1) {
      const strMultiRecipientLink = await page.getByRole('button', { name: 'Ship to multiple addresses' }).textContent();
      expect(strMultiRecipientLink).toContain('Ship to multiple addresses');
      testReport.log(this.pageName, "Verified that link 'Ship to multiple addresses' is present");
    }
  }

  /**
   * @author:  asoman
   * @function_Name : enterShippingAddress
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async enterShippingAddress(addressType) {
    page.setDefaultNavigationTimeout(60000);
    const shipAddressData = getAddressData(addressType);
    try {
      await expect(page.locator(elements.shippingAndGiftingPage.lblShipToLastName)).toBeVisible({ timeout });
      await page.fill(elements.shippingAndGiftingPage.lblShipToFirstName, shipAddressData.firstName, { delay: 100 });
      await page.fill(elements.shippingAndGiftingPage.lblShipToZipCode, shipAddressData.zipCode, { delay: 100 });
      common.forcedWait(this.pageName, 2000);
      await page.fill(elements.shippingAndGiftingPage.lblShipToCity, shipAddressData.city, { delay: 100 });
      await page.fill(elements.shippingAndGiftingPage.lblShipToAddress1, shipAddressData.address1, { delay: 100 });
      await page.fill(elements.shippingAndGiftingPage.lblShipToLastName, shipAddressData.lastName, { delay: 100 });
      await page.selectOption(elements.shippingAndGiftingPage.lblShipToState, shipAddressData.state);
      await page.fill(elements.shippingAndGiftingPage.lblShipToPhoneNum, shipAddressData.phoneNumber || '(630) 222-3333', { delay: 100 });
      testReport.log(this.pageName, `Populated shipping address form with address: ${shipAddressData}`);
      if (addressType === 'ACA') {
        return `${shipAddressData.firstName} ${shipAddressData.lastName}${shipAddressData.addressCorrection}${shipAddressData.city}, ${shipAddressData.state} ${shipAddressData.zipCode}${shipAddressData.phoneNumber}`;
      }
      return `${shipAddressData.firstName} ${shipAddressData.lastName}${shipAddressData.address1}${shipAddressData.city}, ${shipAddressData.state} ${shipAddressData.zipCode}${shipAddressData.phoneNumber}`;
    } catch (e) {
      return false;
    }
  }

  async enterPickupInfo(addressType) {
    page.setDefaultNavigationTimeout(60000);
    const isCanada = env.EXEC_SITE.includes('can');
    const isCB2 = env.EXEC_SITE.includes('cb2');
    const canadaLDShippingInfo = isCB2 ? testData.canada.shippingInfoLDCB2 : testData.canada.shippingInfoLD;
    const shippingInfoBFT = isCanada ? testData.canada.shippingInfoBFT : testData.shippingInfoBFT;
    const shippingInfoLD = isCanada ? canadaLDShippingInfo : testData.shippingInfoLD;
    const shippingInfoDefault = isCanada ? testData.canada.shippingInfo : testData.shippingInfo;
    const addressDictionary = {
      BFT: shippingInfoBFT,
      LD: shippingInfoLD,
      APO: testData.shippingInfoAPO,
      AK: testData.shippingInfoAK,
      AVS: testData.shippingInfoAVS,
      AVS2: testData.shippingInfoAVS2
    };
    const shipAddressData = addressDictionary[addressType] || shippingInfoDefault;
    await page.getByLabel('First Name').fill(shipAddressData.firstName);
    await page.getByLabel('Last Name').fill(shipAddressData.lastName);
    await page.locator('.input-md.text-input.input-validation-valid').fill(shipAddressData.email);
  }

  /**
   * @author:  asoman
   * @function_Name : clickShipAddressNext
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async clickShipAddressNext() {
    await page.click(elements.shippingAndGiftingPage.btnShipAddressNext);
    await this.handleAvsPopup();
    await expect(page.locator(elements.shippingAndGiftingPage.lnkEditShipAddress).first()).toBeVisible({ timeout });
  }

  async handleAvsPopup() {
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    /* since networkidle times out even after 20 seconds, using forcedWait method */
    // await page.waitForLoadState('networkidle', { timeout: 20000 });
    await common.forcedWait(this.pageName, 10000);
    const avsTitle = await page.locator(elements.shippingAndGiftingPage.divAvsPopupContainer).isVisible();

    if (avsTitle) {
      testReport.log(this.pageName, 'AVS popup displayed');
      const activeAvsPopup = page.locator(elements.shippingAndGiftingPage.divButtonHiddenAvsPopup);
      const confirmAvsButton = this.isMobile
        ? activeAvsPopup.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopupMob)
        : activeAvsPopup.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopup);
      await confirmAvsButton.click();
      await page.waitForLoadState('domcontentloaded');
    }
  }

  async clickUseAsBilling() {
    const checkboxUseAsBilling = page.locator(elements.shippingAndGiftingPage.lblUseAsBilling);
    await checkboxUseAsBilling.click();
  }

  /**
   * @author:  asoman
   * @function_Name : verifyShipTo
   * @Description : shipToAddress
   * @params : None
   * @returns : None
   * */
  async verifyShipTo(shipToAddress) {
    const strShipToAddress = page.getByTestId(elements.shippingAndGiftingPage.lblShipToAddress);
    testReport.log(this.pageName, `SHIP TO ADDRESS: >>>>>>>>>>>>>>> ${strShipToAddress.textContent()}`);
    await expect(strShipToAddress).toContainText(shipToAddress, { ignoreCase: true });
    testReport.log(this.pageName, 'ShipTo address is present');
  }

  /**
   * @author:  asoman
   * @function_Name : verifyRecipientPickupInfo
   * @Description : Pickup Address
   * @params : None
   * @returns : None
   * */
  async verifyRecipientPickupInfo(pickupAddress) {
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await common.forcedWait(this.pageName, 10000);
    const eleStorePickupAddress = page.getByTestId(elements.shippingAndGiftingPage.lblShipToAddress);
    testReport.log(this.pageName, `PICKUP ADDRESS: >>>>>>>>>>>>>>> ${eleStorePickupAddress.textContent()}`);
    await expect(eleStorePickupAddress).toContainText(pickupAddress, { ignoreCase: true });
    testReport.log(this.pageName, 'PickupAddress is present');
  }

  /**
   * @author:  asoman
   * @function_Name : verifyEmailReceipt
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async verifyReceiptEmail() {
    await expect(page.locator(elements.shippingAndGiftingPage.txtReceiptEmail)).toBeVisible({ timeout });
    const strReceiptEmail = await page.inputValue(elements.shippingAndGiftingPage.txtReceiptEmail);
    // global.receiptEmail = strReceiptEmail;
    shipAddress.receiptEmail = strReceiptEmail;
    testReport.log(this.pageName, `Receipient Email -> ${strReceiptEmail}`);
  }

  /**
   * @author:  asoman
   * @function_Name : enterEmailReceipt
   * @Description : None
   * @params : None
   * @returns : None
   * */
  async enterEmailReceipt(email) {
    await expect(page.locator(elements.shippingAndGiftingPage.txtReceiptEmail)).toBeVisible({ timeout });
    const guestEmailAddress = email === undefined ? common.generateNewEmail() : email;
    await page.fill(elements.shippingAndGiftingPage.txtReceiptEmail, guestEmailAddress, { delay: 100 });
    testReport.log(this.pageName, `Entered Receipient Email -> ${guestEmailAddress}`);
  }

  /**
   * @author:  asoman
   * @function_Name : verifyShipModeInformation
   * @Description : vefify the shipmode section for various shipmode printed in the page
   * @params : None
   * @returns : None
   * */
  async verifyShippingMethodDetails(fulfillmentType, itemType, addressType) {
    if (fulfillmentType === 'Ship') {
      const strShippingMethodHdr = await page.locator(elements.shippingAndGiftingPage.lblShippingMethodHdr).textContent();
      expect(strShippingMethodHdr).toContain('Shipping Method');
      testReport.log(this.pageName, `Verified Shipping Method Header Displayed -> ${strShippingMethodHdr}`);
    }

    if (itemType === 'PARCEL') {
      /// /var blnShipMethodSectionExist = await page.locator('.shipping-method-section').isVisible()
      const blnShipMethodSectionExist = await page.locator(elements.shippingAndGiftingPage.divShippingMethodSection).isVisible();
      if (blnShipMethodSectionExist) {
        const shipMethodElementCount = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);
        testReport.log(this.pageName, `number of items ship method-- ${shipMethodElementCount}`);

        const shipMethodElementArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
        const shipMethodElementList = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);

        await Promise.all(
          shipMethodElementArray.map(async (elem, i) => {
            /* since testid's are 
            await expect(await page.getByTestId(elements.shippingAndGiftingPage.rdoShipMethodName).nth(i)).toBeVisible({ timeout });
            const strShipModeName = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodName).nth(i).textContent();
            */

            await expect(shipMethodElementList.locator('.a11y-radio').nth(i)).toBeVisible({ timeout });
            const strShipModeName = await shipMethodElementList.locator('.a11y-radio-label.label-large').nth(i).textContent();

            testReport.log(this.pageName, `Element ${i} : Shipping Method Option Found -> ${strShipModeName}`);

            if (i === 0) {
              expect(strShipModeName).toContain('Standard');
            } else if (i === 1) {
              if (addressType === 'AK') expect(strShipModeName).toContain('Express');
              else expect(strShipModeName).toContain('Premium');
            } else if (i === 2) {
              expect(strShipModeName).toContain('Express');
            }
            /// /expect(await page.getByTestId('rdo-ship-method-name').nth(0).isChecked()).toBeTruthy()
            await expect(shipMethodElementList.locator('.a11y-radio').nth(0)).toBeChecked();
            testReport.log(this.pageName, "Verified Shipping Method 'Standard' is selected by default");
            const strShipModeArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesBy).nth(i);
            expect(await strShipModeArrivesBy.textContent()).toContain('Arrives');
            const strShipModeArrivesByMessage = await strShipModeArrivesBy.textContent();
            testReport.log(this.pageName, `Shipping Method Arrives By Message for ${strShipModeName} -> ${strShipModeArrivesByMessage}`);
          })
        );
      }

      if (addressType === 'APO') {
        /// /var strShipModeName = await page.getByTestId('ship-method-default').textContent()
        const strShipModeName = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault).textContent();
        testReport.log(this.pageName, `Shipping Method Option Found -> ${strShipModeName}`);

        expect(strShipModeName).toContain('Standard');
      }
    } else if (itemType === 'FURNITURE') {
      if (fulfillmentType === 'Ship') {
        shipModeSelected = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault).textContent();
        let shippingHandlingAmt = await page.locator('li', { hasText: 'Shipping & Handling:' }).nth(0).textContent();
        shippingHandlingAmt = shippingHandlingAmt.replace('Shipping & Handling: ', '');
        expect(shipModeSelected).toContain(shippingHandlingAmt);
        const selectedShippingMessage = await page.locator('.selected-shipping-message').textContent();

        let strCountrySpecificText;
        let shippingZipcode = await page.locator('[data-testid=ship-to-address] > .address').nth(3).textContent();
        if (env.EXEC_SITE.includes('can')) {
          strCountrySpecificText = 'postal code';
          shippingZipcode = shippingZipcode.substr(shippingZipcode.length - 7);
          shippingZipcode = shippingZipcode.replace(/\s/g, '');
        } else {
          strCountrySpecificText = 'ZIP code';
          shippingZipcode = shippingZipcode.substr(shippingZipcode.length - 5);
        }

        if (addressType === 'BFT') {
          expect(selectedShippingMessage).toContain(env.SHIP_DELAY_BFT);
        } else if (addressType === 'LONG_DISTANCE') {
          shipModeSelected = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault).textContent();
          expect(shipModeSelected).toContain(env.LBL_SHIP_METHOD_DEFAULT_LONG_DISTANCE);
        } else {
          expect(selectedShippingMessage).toContain(
            `Based on delivery to ${strCountrySpecificText} ${shippingZipcode}. This flat rate includes all furniture and applicable large items in your order.`
          );
        }
      }

      let tripDateSelected = '';
      const blnIsTripCalendarAvailable = await page.locator('.shipping-options.sub-section-content.trip-booking-content').isVisible();

      if (blnIsTripCalendarAvailable) {
        const tripBookingContent = page.locator('.shipping-options.sub-section-content.trip-booking-content');
        if (fulfillmentType === 'Ship') {
          expect(await tripBookingContent.locator('.sub-section-content-title').textContent()).toContain('Schedule Your Delivery');
        } else {
          expect(await tripBookingContent.locator('.sub-section-content-title').textContent()).toContain('Schedule Your Pickup');
        }
        await expect(tripBookingContent.locator('.trip-booking-container')).toBeVisible({ timeout });

        const isDayPickerPresent = await page.locator('.DayPicker').isVisible();
        if (isDayPickerPresent) {
          const isTripDateAvailable = await page.locator('[class="DayPicker-Day"]').first().isVisible();
          if (!isTripDateAvailable) {
            // await page.locator('.DayPicker-NavButton.DayPicker-NavButton--next').click();
            await page.locator('[aria-label="Next Month"]').click();
            const isTripDateAvailableInNextMonth = await page.locator('[class="DayPicker-Day"]').first().isVisible();
            if (isTripDateAvailableInNextMonth) {
              await page.locator('[class="DayPicker-Day"]').first().click();
            }
          } else {
            await page.locator('[class="DayPicker-Day"]').first().click();
          }
          if (fulfillmentType === 'Ship') {
            expect(await page.locator('.currently-picked-date').textContent()).toContain('Scheduled Delivery Date'); // need to capture selected date and assert here
          } else {
            expect(await page.locator('.currently-picked-date').textContent()).toContain('Scheduled Pickup Date'); // need to capture selected date and assert here
          }
          tripDateSelected = await page.locator('.currently-picked-date > span').textContent();
          testReport.log(this.pageName, `tripDateSelected -> ${tripDateSelected}`);
          shipmentArrivesBy = tripDateSelected;
          if (fulfillmentType === 'Ship') {
            const deliveryTimeframeNote = await page.locator('.note-delivery-time-frame').textContent();
            expect(deliveryTimeframeNote).toContain('Note: 1-2 days before delivery, you will receive a call with a 2-3 hour delivery time frame.');
            const intersectionLabel = await page.locator('.intersection-label').textContent();
            expect(intersectionLabel).toContain('Major Intersection Near Delivery Address optional');
            await expect(page.locator('[aria-describedby=tripbooking-message]')).toBeVisible({ timeout });
            const btnPostTranTripSelection = await page.locator('label:near([aria-describedby=tripbooking-message])').textContent();
            testReport.log(this.pageName, btnPostTranTripSelection);
            expect(btnPostTranTripSelection).toContain('I do not wish to pick a delivery date right now. Please contact me to arrange delivery.');
          } else {
            await expect(page.locator('label[for^="notAtThisTime"]')).toBeVisible({ timeout });
            const btnPostTranTripSelection = await page.locator('label[for^="notAtThisTime"]').textContent();
            expect(btnPostTranTripSelection).toContain('I do not wish to schedule a pickup online. Please contact me to arrange pickup.');
          }
          // expect(await page.locator('.intersection-label > label')).toBeVisible({ timeout })
          //  expect(await page.locator('.intersection-label.text-input')).toBeVisible({ timeout })
        }
      } else if (addressType !== 'BFT') {
        const scheduleDeliveryMsg = await page.locator('.schedule-date').textContent();
        shipmentArrivesBy = scheduleDeliveryMsg;
      }
    }

    const blnIsBackorderSkuPresent = false;

    if (blnIsBackorderSkuPresent) {
      const strShippingMethodPolicy = await page.locator(elements.shippingAndGiftingPage.lblShippingMethodPolicy).textContent();
      expect(strShippingMethodPolicy).toContain('Please Note: Item(s) may ship separately as they become available at no additional charge.');
      testReport.log(this.pageName, `Verified Shipping Method Policy message Displayed -> ${strShippingMethodPolicy}`);
    }
  }

  async addShippingMethodAvilabilityMessages(fulfillmentType, itemType, addressType) {
    const shippingAvailabilityMessages = {};
    if (itemType === 'PARCEL') {
      /// /var blnShipMethodSectionExist = await page.locator('.shipping-method-section').isVisible()
      const blnShipMethodSectionExist = await page.locator(elements.shippingAndGiftingPage.divShippingMethodSection).isVisible();
      if (blnShipMethodSectionExist) {
        const shipMethodElementCount = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);
        testReport.log(this.pageName, `number of items ship method-- ${shipMethodElementCount}`);

        const shipMethodElementArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
        const shipMethodElementList = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);

        await Promise.all(
          shipMethodElementArray.map(async (elem, i) => {
            /* since testid's are 
            await expect(await page.getByTestId(elements.shippingAndGiftingPage.rdoShipMethodName).nth(i)).toBeVisible({ timeout });
            const strShipModeName = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodName).nth(i).textContent();
            */

            await expect(shipMethodElementList.locator('.a11y-radio').nth(i)).toBeVisible({ timeout });
            const strShipModeName = await shipMethodElementList.locator('.a11y-radio-label.label-large').nth(i).textContent();

            testReport.log(this.pageName, `Element ${i} : Shipping Method Option Found -> ${strShipModeName}`);

            const strShipModeArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesBy).nth(i);
            const strShipModeArrivesByMessage = await strShipModeArrivesBy.textContent();
            if (i === 0) {
              shippingAvailabilityMessages.ArrivesByStandard = strShipModeArrivesByMessage;
              expect(strShipModeName).toContain('Standard');
            } else if (i === 1) {
              if (addressType === 'AK') {
                shippingAvailabilityMessages.ArrivesByExpress = strShipModeArrivesByMessage;
                expect(strShipModeName).toContain('Express');
              } else {
                shippingAvailabilityMessages.ArrivesByPremium = strShipModeArrivesByMessage;
                expect(strShipModeName).toContain('Premium');
              }
            } else if (i === 2) {
              shippingAvailabilityMessages.ArrivesByExpress = strShipModeArrivesByMessage;
              expect(strShipModeName).toContain('Express');
            }
            testReport.log(this.pageName, `Shipping Method Arrives By Message for ${strShipModeName} -> ${strShipModeArrivesByMessage}`);
          })
        );
      }
    } else if (itemType === 'FURNITURE') {
      if (fulfillmentType === 'Ship') {
        const selectedShippingMessage = await page.getByTestId('selected-shipping-message').textContent();

        if (addressType === 'BFT') {
          shippingAvailabilityMessages.ArrivesBy = selectedShippingMessage;
        } else if (addressType === 'LONG_DISTANCE') {
          shipModeSelected = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault).textContent();
          shippingAvailabilityMessages.shipModeSelected = shipModeSelected;
        } else {
          shippingAvailabilityMessages.ArrivesBy = selectedShippingMessage;
        }
      }
      const blnIsTripCalendarAvailable = await page.getByTestId('trip-booking-calendar').isVisible();
      if (blnIsTripCalendarAvailable) {
        await this.scheduleTripCalendarDate(fulfillmentType, true);
      } else if (addressType !== 'BFT') {
        const scheduleDeliveryMsg = await page.getByTestId('schedule-date').textContent();
        shipmentArrivesBy = scheduleDeliveryMsg;
      }
    }

    const blnIsBackorderSkuPresent = false; // qibwqid

    if (blnIsBackorderSkuPresent) {
      const strShippingMethodPolicy = await page.locator(elements.shippingAndGiftingPage.lblShippingMethodPolicy).textContent();
      shippingAvailabilityMessages.BackOrderArrivesByMessage = strShippingMethodPolicy;
      testReport.log(this.pageName, `Verified Shipping Method Policy message Displayed -> ${strShippingMethodPolicy}`);
    }
    this.availabilityInfo = { ...this.availabilityInfo, shippingAvailabilityMessages };
  }

  async verifyShippingMethodAvilabilityMessages(fulfillmentType, itemType, addressType) {
    const { shippingAvailabilityMessages } = this.availabilityInfo;
    if (itemType === 'PARCEL') {
      /// /var blnShipMethodSectionExist = await page.locator('.shipping-method-section').isVisible()
      const blnShipMethodSectionExist = await page.locator(elements.shippingAndGiftingPage.divShippingMethodSection).isVisible();
      if (blnShipMethodSectionExist) {
        const shipMethodElementCount = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);
        testReport.log(this.pageName, `number of items ship method-- ${shipMethodElementCount}`);

        const shipMethodElementArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
        const shipMethodElementList = page.locator(elements.shippingAndGiftingPage.arrayShipMethods);

        await Promise.all(
          shipMethodElementArray.map(async (elem, i) => {
            /* since testid's are 
            await expect(await page.getByTestId(elements.shippingAndGiftingPage.rdoShipMethodName).nth(i)).toBeVisible({ timeout });
            const strShipModeName = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodName).nth(i).textContent();
            */

            await expect(shipMethodElementList.locator('.a11y-radio').nth(i)).toBeVisible({ timeout });
            const strShipModeName = await shipMethodElementList.locator('.a11y-radio-label.label-large').nth(i).textContent();

            const strShipModeArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesBy).nth(i);
            const strShipModeArrivesByMessage = await strShipModeArrivesBy.textContent();
            let expectedArrivesByMessage = '';
            if (i === 0) {
              expectedArrivesByMessage = shippingAvailabilityMessages.ArrivesByStandard;
              expect(strShipModeName).toContain('Standard');
            } else if (i === 1) {
              if (addressType === 'AK') {
                expectedArrivesByMessage = shippingAvailabilityMessages.ArrivesByExpress;
                expect(strShipModeName).toContain('Express');
              } else {
                expectedArrivesByMessage = shippingAvailabilityMessages.ArrivesByPremium;
                expect(strShipModeName).toContain('Premium');
              }
            } else if (i === 2) {
              expectedArrivesByMessage = shippingAvailabilityMessages.ArrivesByExpress;
              expect(strShipModeName).toContain('Express');
            }
            expect(strShipModeArrivesByMessage).toContain(expectedArrivesByMessage);
            testReport.log(
              this.pageName,
              `Shipping Method Arrives By Message for ${strShipModeName}: Actual -> ${strShipModeArrivesByMessage} Expected ${expectedArrivesByMessage}`
            );
          })
        );
      }
    } else if (itemType === 'FURNITURE') {
      if (fulfillmentType === 'Ship') {
        const selectedShippingMessage = await page.getByTestId('selected-shipping-message').textContent();

        if (addressType === 'BFT') {
          expect(selectedShippingMessage).toContain(shippingAvailabilityMessages.ArrivesBy);
          testReport.log(
            this.pageName,
            `Shipping Method Arrives By Message: Actual -> ${selectedShippingMessage} Expected ${shippingAvailabilityMessages.ArrivesBy}`
          );
        } else if (addressType === 'LONG_DISTANCE') {
          shipModeSelected = await page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault).textContent();
          expect(shipModeSelected).toContain(shippingAvailabilityMessages.shipModeSelected);
          testReport.log(
            this.pageName,
            `Shipping Method Arrives By Message: Actual -> ${shipModeSelected} Expected ${shippingAvailabilityMessages.shipModeSelected}`
          );
        } else {
          expect(selectedShippingMessage).toContain(shippingAvailabilityMessages.ArrivesBy);
          testReport.log(
            this.pageName,
            `Shipping Method Arrives By Message: Actual -> ${selectedShippingMessage} Expected ${shippingAvailabilityMessages.ArrivesBy}`
          );
        }
      }
      const blnIsTripCalendarAvailable = await page.getByTestId('trip-booking-calendar').isVisible();
      if (blnIsTripCalendarAvailable) {
        await this.scheduleTripCalendarDate(fulfillmentType, true);
      } else if (addressType !== 'BFT') {
        const scheduleDeliveryMsg = await page.getByTestId('schedule-date').textContent();
        shipmentArrivesBy = scheduleDeliveryMsg;
      }
    }

    const blnIsBackorderSkuPresent = false; // qibwqid

    if (blnIsBackorderSkuPresent) {
      const strShippingMethodPolicy = await page.locator(elements.shippingAndGiftingPage.lblShippingMethodPolicy).textContent();
      expect(strShippingMethodPolicy).toContain(shippingAvailabilityMessages.BackOrderArrivesByMessage);
      testReport.log(
        this.pageName,
        `Verified Shipping Method Policy message Displayed: Actual -> ${strShippingMethodPolicy} Expected ${shippingAvailabilityMessages.BackOrderArrivesByMessage}`
      );
    }
  }

  async verifyPersonalizedDetailsForAvailability(actionType) {
    const selectedShippingMessage = await page.getByTestId('selected-shipping-message').textContent();
    if (actionType === 'ADD') {
      this.availabilityInfo = { ...this.availabilityInfo, selectedShippingMessage };
    } else {
      expect(selectedShippingMessage).toContain(this.availabilityInfo.selectedShippingMessage);
      testReport.log(
        this.pageName,
        `Shipping Page Arrives By Message: Actual -> ${selectedShippingMessage} Expected -> ${this.availabilityInfo.selectedShippingMessage}`
      );
    }
  }

  // data-testid="lbl-pickup-notification-msg"
  async verifyPickupNotificationMsg() {
    const pickUpNotificationMsgHdr = await page.locator('.store-pickup-notify-message > h4').textContent();
    expect(pickUpNotificationMsgHdr).toContain('What you need to know');
    const pickUpNotificationMsg = await page.locator('.store-pickup-notify-message > .message').textContent();
    expect(pickUpNotificationMsg).toContain(
      'Please wait for your “Ready for Pickup” email before coming to the store. We will notify you via email or text as each item in your order is ready for pickup.'
    );
  }

  // class="sub-section bops-section"

  async scheduleTripCalendarDate(fulfillmentType, isCustomerOptedToSchedule) {
    let tripDateSelected = '';
    const blnIsTripCalendarAvailable = await page.locator('.shipping-options.sub-section-content.trip-booking-content').isVisible();
    if (blnIsTripCalendarAvailable) {
      const tripBookingContent = page.locator('.shipping-options.sub-section-content.trip-booking-content');
      if (fulfillmentType === 'Ship') {
        expect(await tripBookingContent.locator('.sub-section-content-title').textContent()).toContain('Schedule Your Delivery');
      } else {
        expect(await tripBookingContent.locator('.sub-section-content-title').textContent()).toContain('Schedule Your Pickup');
      }
      await expect(tripBookingContent.locator('.trip-booking-container')).toBeVisible({ timeout });

      if (isCustomerOptedToSchedule) {
        const isDayPickerPresent = await page.locator('.DayPicker').isVisible();
        if (isDayPickerPresent) {
          const isTripDateAvailable = await page.locator('[class="DayPicker-Day"]').first().isVisible();
          if (!isTripDateAvailable) {
            await page.locator('.DayPicker-NavButton.DayPicker-NavButton--next').click();
            const isTripDateAvailableInNextMonth = await page.locator('[class="DayPicker-Day"]').first().isVisible();
            if (isTripDateAvailableInNextMonth) {
              await page.locator('[class="DayPicker-Day"]').first().click();
            }
          } else {
            await page.locator('[class="DayPicker-Day"]').first().click();
          }
          if (fulfillmentType === 'Ship') {
            expect(await page.locator('.currently-picked-date').textContent()).toContain('Scheduled Delivery Date'); // need to capture selected date and assert here
          } else {
            expect(await page.locator('.currently-picked-date').textContent()).toContain('Scheduled Pickup Date'); // need to capture selected date and assert here
          }
          tripDateSelected = await page.locator('.currently-picked-date > span').textContent();
          testReport.log(this.pageName, `tripDateSelected -> ${tripDateSelected}`);
          shipmentArrivesBy = tripDateSelected;

          // expect(await page.locator('.intersection-label > label')).toBeVisible({ timeout })
          //  expect(await page.locator('.intersection-label.text-input')).toBeVisible({ timeout })
        }
      } else if (fulfillmentType === 'Ship') {
        const deliveryTimeframeNote = await page.locator('.note-delivery-time-frame').textContent();
        expect(deliveryTimeframeNote).toContain('Note: 1-2 days before delivery, you will receive a call with a 2-3 hour delivery time frame.');
        const intersectionLabel = await page.locator('.intersection-label').textContent();
        expect(intersectionLabel).toContain('Major Intersection Near Delivery Address optional');
        await expect(page.locator('[aria-describedby=tripbooking-message]')).toBeVisible({ timeout });
        const btnPostTranTripSelection = await page.locator('label:near([aria-describedby=tripbooking-message])').textContent();
        testReport.log(this.pageName, btnPostTranTripSelection);
        expect(btnPostTranTripSelection).toContain('I do not wish to pick a delivery date right now. Please contact me to arrange delivery.');
        if (!isCustomerOptedToSchedule) {
          await page.locator('label:near([aria-describedby=tripbooking-message])').click();
        }
      } else {
        await expect(page.locator('label[for^="notAtThisTime"]')).toBeVisible({ timeout });
        const btnPostTranTripSelection = await page.locator('label[for^="notAtThisTime"]').textContent();
        expect(btnPostTranTripSelection).toContain('I do not wish to schedule a pickup online. Please contact me to arrange pickup.');
        if (!isCustomerOptedToSchedule) {
          await page.locator('label[for^="notAtThisTime"]').click();
        }
      }
    }
  }

  async verifyBopsSection() {
    const bopsSectionElement = page.locator('.sub-section.bops-section');
    const bopsContactElement = bopsSectionElement.locator('.sub-section-content.pickup-contact');
    const bopsContactElementHdr = bopsContactElement.locator('h4');
    expect(await bopsContactElementHdr.textContent()).toContain('Who is picking up your order?');
    const bopsContactElementMsg = bopsContactElement.locator('p');
    expect(await bopsContactElementMsg.textContent()).toContain(
      'Your "Ready for Pick-up" email will be required at time of pickup. If someone other than yourself is picking up, you may enter their email address below.'
    );
    const bopsContactFormElement = bopsContactElement.locator('.pickup-contact-form');
    const bopsContactFirstNameElement = bopsContactFormElement.locator('.bops-label-text').nth(0);
    expect(await bopsContactFirstNameElement.textContent()).toContain('First Name required');
    const bopsContactLastNameElement = bopsContactFormElement.locator('.bops-label-text').nth(1);
    expect(await bopsContactLastNameElement.textContent()).toContain('Last Name required');
    const bopsContactEmailElement = bopsContactFormElement.locator('.bops-label-text').nth(2);
    expect(await bopsContactEmailElement.textContent()).toContain('Email optional');

    const bopsPackagingElement = bopsSectionElement.locator('.sub-section-content.select-packaging-form');
    const bopsPackagingElementHdr = await bopsPackagingElement.locator('.sub-section-content-title').textContent();
    expect(bopsPackagingElementHdr).toContain('How do you want your items packed?');
    const bopsPackagingElementToolTip = await bopsPackagingElement.locator('.tooltip-help-wrap.tooltip-help-bagging-options').textContent();
    expect(bopsPackagingElementToolTip).toContain(env.SHIPPING_PACKAGE_TOOLTIP);

    const bopsPackagingBaggingOptionOne = bopsPackagingElement.locator('.a11y-radio-label').nth(0);
    expect(await bopsPackagingBaggingOptionOne.textContent()).toContain('Classic Bag');
    const bopsPackagingBaggingOptionTwo = bopsPackagingElement.locator('.a11y-radio-label').nth(1);
    expect(await bopsPackagingBaggingOptionTwo.textContent()).toContain('Package my item(s) into one box, if possible');
    const bopsPackagingBaggingOptionThree = bopsPackagingElement.locator('.a11y-radio-label').nth(2);
    expect(await bopsPackagingBaggingOptionThree.textContent()).toContain('No packaging');

    const bopsGiftReceiptsFormElement = bopsSectionElement.locator('.sub-section-content.include-gift-receipts-form');
    const bopsGiftReceiptsFormElementHdr = bopsGiftReceiptsFormElement.locator('h4');
    expect(await bopsGiftReceiptsFormElementHdr.textContent()).toContain('Include gift receipts?');
    const bopsGiftReceiptOptionOne = bopsGiftReceiptsFormElement.locator('.gift-receipt-form.col-xs-12 >> label').nth(0);
    // const bopsGiftReceiptOptionOne = await bopsGiftReceiptOptions.locator('label').nth(0);
    expect(await bopsGiftReceiptOptionOne.textContent()).toContain("I don't need a gift receipt");
    const bopsGiftReceiptOptionTwo = bopsGiftReceiptsFormElement.locator('.gift-receipt-form.col-xs-12 >> label').nth(1);
    expect(await bopsGiftReceiptOptionTwo.textContent()).toContain('Include one gift receipt for each item');
    const bopsGiftReceiptOptionThird = bopsGiftReceiptsFormElement.locator('.gift-receipt-form.col-xs-12 >> label').nth(2);
    expect(await bopsGiftReceiptOptionThird.textContent()).toContain('Include one gift receipt for everything');
  }

  async fillBopsPickupContactForm() {
    const bopsSectionElement = page.locator('.sub-section.bops-section');
    const bopsContactElement = bopsSectionElement.locator('.sub-section-content.pickup-contact');
    const bopsContactFormElement = bopsContactElement.locator('.pickup-contact-form');
    await bopsContactFormElement.locator('input').nth(0).fill('ajesh');
    await bopsContactFormElement.locator('input').nth(1).fill('soman');
    await bopsContactFormElement.locator('input').nth(2).fill('contractor.asoman@crateandbarrel.com');
  }

  async verifyNotificationTextMessagingDetails() {
    let notificationSection;
    if ((await page.locator('.sub-section.delivery-notification').count()) > 0) {
      notificationSection = page.locator('.sub-section.delivery-notification');
    } else {
      notificationSection = page.locator('.sub-section.pickup-notifications');
    }
    const notificationSectionHdr = notificationSection.locator('h3');
    expect(await notificationSectionHdr.textContent()).toContain('Text Updates');

    expect(await notificationSection.locator('label[for=receiveTextMessage_undefined]').textContent()).toContain('Yes, I want text updates on this order');
    expect(await notificationSection.locator('.bops-label-text').textContent()).toContain('Mobile Phone Number');

    // const isBopsNotificationOptionChecked = await common.isCheckBoxCheckedUsingElementHandle('label[for=receiveTextMessage_undefined]');
    const isBopsNotificationOptionChecked = await common.isCheckBoxCheckedUsingElementHandle('#receiveTextMessage_undefined');

    if (!isBopsNotificationOptionChecked) {
      await notificationSection.locator('label[for=receiveTextMessage_undefined]').click();
      await notificationSection.locator('#pickupPhone_undefined').fill(testData.billingAddressInfo.phoneNumber);
    }

    const isBopsNotificationAgreeTermsChecked = await common.isCheckBoxCheckedUsingElementHandle('#textMessageAgreeTerms_undefined');
    if (!isBopsNotificationAgreeTermsChecked) {
      await common.clickUsingElementHandle('label:near([aria-describedby=chkAgreeError])');
    }
  }

  /**
   * @author:  asoman
   * @function_Name : selectPostTranTripSelection
   * @Description : customer opts to choose trip date after post transaction
   * @params : None
   * @returns : None
   * */

  async selectPostTranTripSelection() {
    await common.clickUsingElementHandle('label:near([aria-describedby=tripbooking-message])');
    // await page.$eval('label:near([aria-describedby=tripbooking-message])', (elem) => elem.click());
  }

  /**
   * @author:  asoman
   * @function_Name : selectNotificationPreferences
   * @Description : customer opts to notification preferences
   * @params : None
   * @returns : None
   * */

  async selectNotificationPreferences() {
    const notificationSection = page.locator('.sub-section.delivery-notification');
    const notificationSectionHdr = await notificationSection.locator('h4').textContent();
    const notificationSectionMsg = await notificationSection.locator('.message.i-prefer').textContent();
    expect(notificationSectionHdr).toContain('Select Notification Preference');
    expect(notificationSectionMsg).toContain('When my item(s) are ready, notify me via:');
    await expect(notificationSection.locator('#notificationPreferencesEmail')).toBeVisible({ timeout });
    expect(await notificationSection.locator('label[for=notificationPreferencesEmail]').textContent()).toContain('Email only');

    await expect(notificationSection.locator('#notificationPreferencesText')).toBeVisible({ timeout });
    expect(await notificationSection.locator('label[for=notificationPreferencesText]').textContent()).toContain('Email and text');

    await notificationSection.locator('label[for=notificationPreferencesText]').click();
    await notificationSection.locator('#OnlineDeliveryNotificationPhone').fill(testData.billingAddressInfo.phoneNumber);

    const isDeliveryNotificationAgreeTermsChecked = await common.isCheckBoxCheckedUsingElementHandle('#OnlineDeliveryNotificationAgreeTerms');
    // const isDeliveryNotificationAgreeTermsChecked = await page.$eval('#OnlineDeliveryNotificationAgreeTerms', (checkbox) => checkbox.checked);
    if (!isDeliveryNotificationAgreeTermsChecked) {
      await common.clickUsingElementHandle('label:near([aria-describedby=chkAgreeError])');
      // await page.$eval('label:near([aria-describedby=chkAgreeError])', (elem) => elem.click());
    }
  }

  async getShipModArrivesText(strShipMode) {
    let eleStrshipmentArrivesBy;
    let strshipmentArrivesBy = '';
    const selectedShipmode = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
    testReport.log(this.pageName, `Number of shipping methods present: ${selectedShipmode.length}`);

    if (selectedShipmode.length > 1) {
      if (strShipMode === 'Standard') {
        eleStrshipmentArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(0);
      } else if (strShipMode === 'Premium') {
        eleStrshipmentArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(1);
      } else if (strShipMode === 'Express') {
        eleStrshipmentArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(2);
      } else {
        eleStrshipmentArrivesBy = page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg);
      }
    } else {
      eleStrshipmentArrivesBy = await page.locator('.selected-shipping-message').innerText();
    }

    strshipmentArrivesBy = eleStrshipmentArrivesBy.innerText();

    shipmentArrivesBy = strshipmentArrivesBy;
    return strshipmentArrivesBy;
  }

  async assertShipModArrivesText(expectedShipModArrivesText, actualShipModArrivesText) {
    expect(actualShipModArrivesText).toContain(expectedShipModArrivesText);
  }

  /**
   * @author:  asoman
   * @function_Name : selectShipMode
   * @Description : select an available shipmode from shipping page
   * @params : strShipMode (input from featire file)
   * @returns : None
   * */
  async selectShipMode(strShipMode) {
    let strShipModeSelected = '';
    let strshipmentArrivesBy = '';
    const selectedShipmode = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
    testReport.log(this.pageName, `Number of shipping methods present: ${selectedShipmode.length}`);
    if (selectedShipmode.length > 1) {
      if (strShipMode === 'Standard') {
        await page.locator(elements.shippingAndGiftingPage.lblShipMethodStandard).click();
        strShipModeSelected = await page.locator(elements.shippingAndGiftingPage.lblShipMethodStandard).innerText();
        strshipmentArrivesBy = await page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(0).innerText();
      } else if (strShipMode === 'Premium') {
        await page.locator(elements.shippingAndGiftingPage.lblShipMethodPremium).click();
        strShipModeSelected = await page.locator(elements.shippingAndGiftingPage.lblShipMethodPremium).innerText();
        strshipmentArrivesBy = await page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(1).innerText();
      } else if (strShipMode === 'Express') {
        await page.locator(elements.shippingAndGiftingPage.lblShipMethodExpress).click();
        strShipModeSelected = await page.locator(elements.shippingAndGiftingPage.lblShipMethodExpress).innerText();
        strshipmentArrivesBy = await page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).nth(2).innerText();
      } else {
        strShipModeSelected = await page.locator(elements.shippingAndGiftingPage.lblShipMethodStandard).innerText();
        strshipmentArrivesBy = await page.locator(elements.shippingAndGiftingPage.lblShipMethodArrivesMsg).innerText();
      }
    } else {
      strShipModeSelected = await page.getByTestId('ship-method-default').innerText();
    }
    shipAddress.shipModeSelected = strShipModeSelected;
    testReport.log(this.pageName, `Shipping method selected: ${strShipModeSelected}`);

    shipModeSelected = strShipModeSelected;
    shipmentArrivesBy = strshipmentArrivesBy;
    testReport.log(this.pageName, `Captured Shipping method selected and saved: ${shipModeSelected}`);
  }

  /**
   * @author:  asoman
   * @function_Name : proceedToPayment
   * @Description : click on the proceed to payment button
   * @params : None
   * @returns : None
   * */
  async proceedToPayment() {
    await page.click(elements.shippingAndGiftingPage.btnProceedToPayment);
    testReport.log(this.pageName, 'Clicked on PROCEED TO PAYMENT button');
    await page.waitForURL('**/paymentandbilling', { timeout: 120000 });
  }

  /**
   * @author:  asoman
   * @function_Name : verifyGiftMessageDetails
   * @Description : verify the gift message opting fields
   * @params : None
   * @returns : None
   * */
  async verifyGiftMessageDetails() {
    page.locator(elements.shippingAndGiftingPage.rdoNoThisIsNotaGift, { waitFor: 'visible' });
    const strGiftOptionsHdr = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsHdr).textContent();
    expect(strGiftOptionsHdr).toContain('Gift Options');
    testReport.log(this.pageName, `Verified Gift options Header -> ${strGiftOptionsHdr}`);
    /// expect(await page.locator(elements.shippingAndGiftingPage.rdoYesThisIsGift)).toBeVisible({ timeout });
    await expect(page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption)).toBeVisible({ timeout });
    testReport.log(this.pageName, "Assert -> 'No, this isn't a gift.' is displayed");
    testReport.log(this.pageName, 'Assert -> Yes, this is a Gift option is displayed');
  }

  /**
   * @author:  asoman
   * @function_Name : enterGiftMessage
   * @Description : enter gift messaging details
   * @params : None
   * @returns : None
   * */
  async enterGiftMessage(blnSelectGiftBox) {
    testReport.log(this.pageName, `GiftBox selection Required -> ${blnSelectGiftBox}`);

    await expect(page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption)).toBeVisible({ timeout });
    await page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption).click();
    await common.clickUsingElementHandle(elements.shippingAndGiftingPage.lblYesThisIsGiftOption);
    // await page.$eval(elements.shippingAndGiftingPage.lblYesThisIsGiftOption, (elem) => elem.click());
    const strGiftOptionsMessageContent = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsMessageContent).textContent();
    expect(strGiftOptionsMessageContent).toContain('Prices will not appear on shipment when a gift message is present.');
    testReport.log(this.pageName, `GiftOptions message content displayed -> ${strGiftOptionsMessageContent}`);

    const strGiftOptionsMessageContainerHdr = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsMessageHdr).textContent();
    expect(strGiftOptionsMessageContainerHdr).toContain('Gift Message (Free)');
    testReport.log(this.pageName, `GiftOptions message container header displayed -> ${strGiftOptionsMessageContainerHdr}`);

    const strGiftOptionsMessageContainer = page.locator(elements.shippingAndGiftingPage.txtGiftMessageBox);
    if (await strGiftOptionsMessageContainer.isVisible()) {
      testReport.log(this.pageName, 'Gift Message is Open and Active');
    } else {
      await page.click(elements.shippingAndGiftingPage.lblYesThisIsGiftOption);
      testReport.log(this.pageName, "Click on 'Yes, this is a Gift'");
    }
    testReport.log(this.pageName, 'Gift Message is Available to Enter messages');
    const giftMessage = 'Hi John, Happy Birthday';
    await page.fill(elements.shippingAndGiftingPage.txtGiftMessageBox, giftMessage, { delay: 100 });
    shipAddress.giftMessage = giftMessage;
    testReport.log(this.pageName, `Gift Message '${giftMessage}' entered into GiftMessage Box`);

    const strGiftOptionsSpecialCharWarning = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsSpecialCharWarning).textContent();
    expect(strGiftOptionsSpecialCharWarning).toContain('(Some special characters not accepted ex. emoji, à, è, ö, >, <, etc.)');
    testReport.log(this.pageName, `GiftOptions special character warning message displayed -> ${strGiftOptionsSpecialCharWarning}`);
  }

  /**
   * @author:  asoman
   * @function_Name : selectGiftBox
   * @Description : select gift box
   * @params : None
   * @returns : None
   * */
  async selectGiftBox() {
    const blnIsGiftBoxChecked = await page.locator('data-testid=gift-box-option-add-gift-box').isChecked();
    if (!blnIsGiftBoxChecked) {
      await page.click(elements.shippingAndGiftingPage.chkAddGiftBox);
      testReport.log(this.pageName, 'Opted for Gift Box');
    }

    const strGiftBoxCharge = await page.innerText(elements.shippingAndGiftingPage.chkAddGiftBox);
    expect(strGiftBoxCharge).toContain(env.SHIPPING_GIFTBOX_CHARGE);
    testReport.log(this.pageName, `GiftBox charge displayed -> ${strGiftBoxCharge}`);
    shipAddress.giftBoxCharge = strGiftBoxCharge.replace(/\D/g, '');

    const strPresentYourGiftText = await page.innerText(elements.shippingAndGiftingPage.lblPresentYourGiftText);
    expect(strPresentYourGiftText).toContain('Present your gift in our beautiful two-toned gift box.');
    testReport.log(this.pageName, `Present your Gift text message content displayed -> ${strPresentYourGiftText}`);

    await expect(page.locator(elements.shippingAndGiftingPage.lnkGiftOptionsViewDetails)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'GiftOptions view details link is displayed');

    await expect(page.locator(elements.shippingAndGiftingPage.imgCrateAndBarrel)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Crate and barrel GiftBox image is displayed');

    const strGiftBoxedItemHdr = await page.locator(elements.shippingAndGiftingPage.lblGiftBoxedItemsHdr).textContent();
    expect(strGiftBoxedItemHdr).toContain('Select Items to Gift Box');
    testReport.log(this.pageName, `List of boxed items header displayed -> ${strGiftBoxedItemHdr}`);

    const strGiftBoxPolicy = await page.locator(elements.shippingAndGiftingPage.lblGiftBoxPolicy).textContent();
    expect(strGiftBoxPolicy).toContain('Please Note: Item(s) may ship in separate gift boxes as they become available at no additional charge.');
    testReport.log(this.pageName, `Giftbox policy displayed -> ${strGiftBoxPolicy}`);
  }

  async getShippingDetails(i, shippingOptionsCount, orderDetailsInfo, pageName) {
    const cartSkuInfo = orderDetailsInfo.itemContexts.itemContext[0].recipient0.items;
    testReport.log(pageName, cartSkuInfo);
    // for (let i = 0; i < shippingOptionsCount; i++) {
    const items = {};
    const skuList = [];
    // var sku = {}
    let fulfillmentType = 'Ship'; // default
    let pickupLocationType = 'warehouse'; // default
    let skuType = '';
    let formattedDate = '';
    let tripDateSelected = false;
    let giftMessageText = '';
    let giftBoxOpted = false;
    testReport.log(pageName, `elementsHandlearrayShippingOptions - ${i}`);
    const arrayShipOptionsEle = page.locator(`.sub-section.shipping-options >> nth=${i}`);
    // eslint-disable-next-line playwright/no-element-handle
    const arrayShipOptionsElementArray = await page.$$(
      `.sub-section.shipping-options >> nth=${i} >> ${elements.shippingAndGiftingPage.arrayItems} >> .item-info-container`
    );
    let strShipToAddress = page.getByTestId('ship-to-address');

    if ((await arrayShipOptionsEle.locator('.sub-section-content.trip-booking-content').count()) > 0) {
      skuType = 'Furniture';
    }

    let pickupHeaderText;
    let pickupHeaderCount = await page.locator('.section-title.shipping-title.pickup-address').count();
    if (pickupHeaderCount > 0) {
      pickupHeaderText = await page.locator('.section-title.shipping-title.pickup-address').textContent();
      if (pickupHeaderText.includes('Pick Up')) {
        fulfillmentType = 'Pickup';
      }
    }

    if (shippingOptionsCount > 1) {
      strShipToAddress = await strShipToAddress.nth(i).textContent();
    } else {
      strShipToAddress = await strShipToAddress.textContent();
    }
    items.shipToAddress = strShipToAddress;
    const arrayShipItemElements = arrayShipOptionsEle.locator(`${elements.shippingAndGiftingPage.arrayItems}> .item-info-container`);
    // const count = await arrayShipItemElements.count();

    pickupHeaderCount = await arrayShipOptionsEle.locator('.pickup-recipient-header').count();
    if (pickupHeaderCount > 0) {
      pickupHeaderText = await arrayShipOptionsEle.locator('.pickup-recipient-header').textContent();
      if (pickupHeaderText.includes('Pick Up')) {
        fulfillmentType = 'Pickup';
      }
    }
    testReport.log(pageName, `fulfillmentType--> ${fulfillmentType}`);
    items.fulfillmentType = fulfillmentType;
    /// /////////////////////////

    const bopsSectionElementCount = await page.locator('.sub-section.bops-section').count();
    if (bopsSectionElementCount > 0) {
      skuType = 'Parcel';
      pickupLocationType = 'store';
    }

    if (fulfillmentType === 'Ship') {
      const isSelectedShipmodeDisplayed = await page.locator('.selected-shipping-method').nth(i).isVisible();
      if (isSelectedShipmodeDisplayed) {
        shipModeSelected = await page.locator('.selected-shipping-method').nth(i).textContent();
        shipmentArrivesBy = await page.locator('.selected-shipping-message').nth(i).textContent();

        // overrrhide for personalized sku due to open checkout bug
        shipmentArrivesBy = shipmentArrivesBy
          .replace('This item is in high demand and may take longer than usual to arrive.', 'Estimated on backorder until mid August 2024')
          .trim();

        formattedDate = shipmentArrivesBy;
      } else {
        skuType = 'Parcel';
        const shipModeList = await common.getElementHandlesArray('.shipping-list');
        pickupLocationType = 'warehouse';
        await Promise.all(
          shipModeList.map(async (ele, l) => {
            shipModeSelected = await page.locator('.shipping-list > label').nth(l).isChecked();
            if (shipModeSelected) {
              shipModeSelected = await page.locator('.shipping-list > label').nth(l).textContent();
              shipmentArrivesBy = await page.locator('.shipping-list > p').nth(l).textContent();
              formattedDate = shipmentArrivesBy;
            }
          })
        );
      }

      if (shipModeSelected.includes('Home Delivery')) {
        skuType = 'Furniture';
      } else {
        skuType = 'Parcel';
      }
    }

    if (fulfillmentType === 'Ship') {
      if (skuType === 'Furniture') {
        pickupLocationType = 'warehouse';
        shipModeSelected = await page.locator('.selected-shipping-method').textContent();

        const isDayPickerPresent = await page.locator('.DayPicker').isVisible();
        const isCheckBoxToOptScheduleLaterPresent = await page.locator('label:near([aria-describedby=tripbooking-message])').isVisible();
        let isCheckBoxToOptScheduleLaterIsChecked = false;
        if (isCheckBoxToOptScheduleLaterPresent) {
          isCheckBoxToOptScheduleLaterIsChecked = await page.locator('label:near([aria-describedby=tripbooking-message])').isChecked();
        }

        if (isDayPickerPresent) {
          shipmentArrivesBy = await page.locator('.currently-picked-date > span').textContent();
          // uber checkout shows different date formats in different pages. bad practice. hence the below code
          shipmentArrivesBy = common.formatDate(shipmentArrivesBy);
          formattedDate = common.convertDateString(shipmentArrivesBy);
          tripDateSelected = true;
        } else if (isCheckBoxToOptScheduleLaterIsChecked) {
          const scheduleDeliveryMsg = 'We will contact you to schedule your delivery';
          shipmentArrivesBy = scheduleDeliveryMsg;
          formattedDate = scheduleDeliveryMsg;
        } else {
          const scheduleDeliveryMsg = await page.locator('.schedule-date').textContent();
          shipmentArrivesBy = scheduleDeliveryMsg;
          formattedDate = scheduleDeliveryMsg;
        }
      }
    } else if (fulfillmentType === 'Pickup') {
      if (skuType === 'Furniture') {
        pickupLocationType = 'warehouse';

        const isDayPickerPresent = await page.locator('.DayPicker').isVisible();
        const isCheckBoxToOptScheduleLaterPresent = await page.locator('label[for^="notAtThisTime"]').isVisible();
        let isCheckBoxToOptScheduleLaterIsChecked = false;
        if (isCheckBoxToOptScheduleLaterPresent) {
          isCheckBoxToOptScheduleLaterIsChecked = await page.locator('label[for^="notAtThisTime"]').isChecked();
        }

        if (isDayPickerPresent) {
          shipmentArrivesBy = await page.locator('.currently-picked-date > span').textContent();
          // uber checkout shows different date formats in different pages. bad practice. hence the below code
          shipmentArrivesBy = common.formatDate(shipmentArrivesBy);
          formattedDate = common.convertDateString(shipmentArrivesBy);
          tripDateSelected = true;
        } else if (isCheckBoxToOptScheduleLaterIsChecked) {
          const scheduleDeliveryMsg = 'We will contact you via your preferred method to finalize pickup';
          shipmentArrivesBy = scheduleDeliveryMsg;
          formattedDate = scheduleDeliveryMsg;
        } else {
          const scheduleDeliveryMsg = await page.locator('.schedule-date').textContent();
          shipmentArrivesBy = scheduleDeliveryMsg;
          formattedDate = scheduleDeliveryMsg;
        }
      } else if (skuType === 'Parcel') {
        pickupLocationType = 'store';
        shipmentArrivesBy = await page.locator('.store-pickup-slot').textContent();
        formattedDate = shipmentArrivesBy;
      }
    }

    items.pickupLocationType = pickupLocationType;
    await Promise.all(
      arrayShipOptionsElementArray.map(async (ele, j) => {
        // for (let j = 0; j < count; j++) {
        let sku;
        let backOrderAvailabilityMsg;
        const skuTitle = await arrayShipItemElements.locator('h5').nth(j).textContent();
        const backOrderItemCount = await arrayShipItemElements.nth(j).locator('.availMsg.warning.product-backorder').count();
        if (backOrderItemCount > 0) {
          backOrderAvailabilityMsg = await arrayShipItemElements.nth(j).locator('.availMsg.warning.product-backorder').textContent();
          formattedDate = backOrderAvailabilityMsg;
        }

        await arrayShipItemElements.locator('h5').nth(j).isVisible();
        for (let k = 0; k < cartSkuInfo.length; k++) {
          const skuObj = JSON.parse(cartSkuInfo[k]);
          if (Object.prototype.hasOwnProperty.call(skuObj, skuTitle)) {
            // if (skuObj.hasOwnProperty(skuTitle)) {
            sku = skuObj[skuTitle];
            sku.skuType = skuType;
            sku.skuArrivesByMsg = formattedDate;
          }
        }

        const skuJson = JSON.stringify(sku);
        skuList.push(skuJson);
      })
    );

    items.items = skuList;
    items.shipMode = shipModeSelected;
    items.arrivesMsg = shipmentArrivesBy;
    items.tripDateSelected = tripDateSelected;

    const giftMessageElement = await arrayShipOptionsEle.locator(elements.shippingAndGiftingPage.txtGiftMessageBox).isVisible();
    if (giftMessageElement) {
      giftMessageText = await arrayShipOptionsEle.locator(elements.shippingAndGiftingPage.txtGiftMessageBox).inputValue();
    }
    items.giftMessage = giftMessageText;

    const giftElementCount = await arrayShipOptionsEle.locator('data-testid=gift-box-option-add-gift-box').count();
    if (giftElementCount > 0) {
      const blnIsGiftBoxChecked = await arrayShipOptionsEle.locator('data-testid=gift-box-option-add-gift-box').isChecked();
      if (blnIsGiftBoxChecked) {
        giftBoxOpted = true;
        testReport.log(pageName, 'Opted for Gift Box');
      }
    }
    items.giftBoxOpted = giftBoxOpted;
    testReport.log(pageName, `getShippingDetails items -> ${JSON.stringify(items)}`);

    return items;
  }

  /**
   * @author:  asoman
   * @function_Name : getShippingInfo
   * @Description : get the details from shipping page and pass it to payment page
   * @params : None
   * @returns : None
   * */
  async getOrderDetailsInfo(orderDetailsInfo) {
    const elementsHandlesArrayShippingOptions = await common.getElementHandlesArray('.sub-section.shipping-options');
    const shippingOptionsCount = elementsHandlesArrayShippingOptions.length;
    const shippingOrderObject = orderDetailsInfo;
    const itemContext = [];
    await testReport.log(` Order object in shipping page from cart page`, JSON.stringify(orderDetailsInfo));
    const { pageName, getShippingDetails } = this;
    let shipIndex = 0;
    await elementsHandlesArrayShippingOptions.reduce(function (promise) {
      return promise.then(async function () {
        return getShippingDetails(shipIndex, shippingOptionsCount, orderDetailsInfo, pageName).then((myResult) => {
          itemContext[`recipient${shipIndex}`] = myResult;
          shipIndex += 1;
        });
      });
    }, Promise.resolve());

    shippingOrderObject.itemContexts.itemContext[0] = itemContext;

    await expect(page.locator(elements.shippingAndGiftingPage.txtReceiptEmail)).toBeVisible({ timeout });
    const strReceiptEmail = await page.inputValue(elements.shippingAndGiftingPage.txtReceiptEmail);
    shippingOrderObject.receiptEmail = strReceiptEmail;
    testReport.log(this.pageName, `getOrderDetailsInfo:: ${JSON.stringify(shippingOrderObject)}`);
    return shippingOrderObject;
  }

  async selectGiftBoxWithGivenSelectionType(selectionType) {
    const blnIsGiftBoxChecked = await page.locator(elements.shippingAndGiftingPage.giftBoxChk).isChecked();
    if (!blnIsGiftBoxChecked) {
      await page.click(elements.shippingAndGiftingPage.chkAddGiftBox);
      testReport.log(this.pageName, 'Opted for Gift Box');
    }

    const strGiftBoxedItemHdr = await page.locator(elements.shippingAndGiftingPage.lblGiftBoxedItemsHdr).textContent();
    expect(strGiftBoxedItemHdr).toContain('Select Items to Gift Box');
    testReport.log(this.pageName, `List of boxed items header displayed -> ${strGiftBoxedItemHdr}`);

    const selectItemsList = page.locator(elements.shippingAndGiftingPage.giftBoxSelectList);
    const itemsListElementArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.giftBoxSelectList);

    const selectItems = page.locator(elements.shippingAndGiftingPage.giftBoxSelect);
    const selectItemsCount = await selectItemsList.count();

    await Promise.all(
      itemsListElementArray.map(async (ele, i) => {
        const selectItemChecked = await selectItemsList.nth(i).isChecked();
        if (!selectItemChecked) {
          await selectItems.nth(i).click();
          testReport.log(this.pageName, 'Selected Items for Gift Box Checked');
        }
      })
    );

    if (selectionType === 'FEW') {
      const lastIndex = selectItemsCount - 1;
      const selectItemChecked = await selectItemsList.nth(lastIndex).isChecked();
      if (selectItemChecked) {
        await selectItems.nth(lastIndex).click();
      }
    }
  }

  async waitForAVSpopup() {
    let avsPopupDisplayed = false;
    try {
      await expect(page.locator('.avs-popup-container')).toBeVisible({ timeout });
      avsPopupDisplayed = true;
    } catch (error) {
      testReport.log(this.pageName, `Error waiting AVS popup: ${error}`);
      avsPopupDisplayed = false;
    }
    return avsPopupDisplayed;
  }

  async clickShipAddressNextAVS(shippingAddress) {
    // await this.waitForAVSpopup();
    let avsResponseAddress;
    let newAddressLineSuggestion = shippingAddress;
    const isNextVisible = await page.locator(elements.shippingAndGiftingPage.btnShipAddressNext).isVisible();
    if (isNextVisible) {
      await page.click(elements.shippingAndGiftingPage.btnShipAddressNext);
      await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    }
    // eslint-disable-next-line playwright/no-element-handle
    const avsTitle = await page.$$('#popup-content');
    const avs = page.locator('.avs-popup-container');
    if (avsTitle.length > 0) {
      testReport.log(this.pageName, 'AVS popup displayed');
      const avsPopupTitle = await avs.locator(elements.shippingAndGiftingPage.lblAvsPopupTitle).innerText();
      expect(avsPopupTitle).toContain('Please double check address');
      const isWeFoundThere = await avs.locator(elements.shippingAndGiftingPage.lblAVSWeFound).isVisible();
      testReport.log(isWeFoundThere, 'AVS Popup');
      if (isWeFoundThere) {
        const avsPopupDesc = await avs.locator(elements.shippingAndGiftingPage.lblAvsDesc).innerText();
        expect(avsPopupDesc).toContain('There appears to be a problem with your city, state, zip code. Please select a suggestion.');
        const avsEnterDetail = await avs.locator(elements.shippingAndGiftingPage.lblAVSYouEnter).innerText();
        expect(avsEnterDetail).toContain('You entered:');
        const avsFoundList = await avs.locator(elements.shippingAndGiftingPage.lblAVSWeFound).innerText();
        expect(avsFoundList).toContain('We found:');
        const avsFoundSelection = await avs.locator(elements.shippingAndGiftingPage.buttonAVSSelection).count();
        if (avsFoundSelection > 0) {
          const incorrectAddressLineText = await avs.locator('.no-link.address-display').nth(0).textContent();
          testReport.log(this.pageName, `Found incorrect address in AVS Popup - ${incorrectAddressLineText}`);
          newAddressLineSuggestion = await avs.locator(elements.shippingAndGiftingPage.buttonAVSSelection).nth(0).textContent();
          testReport.log(this.pageName, `New address suggestion found in AVS Popup - ${newAddressLineSuggestion}`);
          await avs.locator(elements.shippingAndGiftingPage.buttonAVSSelection).nth(0).click();
          avsResponseAddress = shippingAddress.replace(incorrectAddressLineText, newAddressLineSuggestion);
          testReport.log(this.pageName, `Expected address after clicking on suggestion - ${newAddressLineSuggestion}`);
          await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        }
      } else {
        const avsPopupDesc = await avs.locator(elements.shippingAndGiftingPage.lblAvsDesc).innerText();
        expect(avsPopupDesc).toContain('Please go back to edit your address or choose to keep address as entered');
        const isactiveAvsPopup = await avs.locator('.button-container.hidden-xs').isVisible();
        if (isactiveAvsPopup) {
          const activeAvsPopup = avs.locator('.button-container.hidden-xs');
          await activeAvsPopup.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopup).click();
        } else {
          const activeAvsPopup = avs.locator('.button-container.visible-xs');
          // await activeAvsPopup.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopup).click();
          await activeAvsPopup.locator('[data-testid="btn-confirm-avs-popup"]').click();
        }
        await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        if (isNextVisible) {
          await page.click(elements.shippingAndGiftingPage.btnShipAddressNext);
          await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        }
      }
    }
    return avsResponseAddress;
  }

  async updateBillingAddressforAVS(addressType) {
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    let shipAddressData = testData.billingAddressInfo;
    if (addressType === 'AVS') {
      shipAddressData = testData.shippingInfoAVS;
    } else if (addressType === 'AVS2') {
      shipAddressData = testData.shippingInfoAVS2;
    }
    await page.click(elements.paymentPage.billingEdit);
    await expect(page.locator(elements.shippingAndGiftingPage.lblShipToAddress1)).toBeVisible({ timeout });
    await page.fill(elements.shippingAndGiftingPage.lblShipToAddress1, shipAddressData.address1, { delay: 100 });
    await page.fill(elements.shippingAndGiftingPage.lblShipToZipCode, shipAddressData.zipCode, { delay: 100 });
    await page.fill(elements.shippingAndGiftingPage.lblShipToCity, shipAddressData.city, { delay: 100 });
    await page.selectOption(elements.shippingAndGiftingPage.lblShipToState, shipAddressData.state);
    const billingContainer = page.locator(elements.paymentPage.billingContainer);
    await billingContainer.locator(elements.paymentPage.billingPopupSave).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    // await page.waitForLoadState('networkidle', { timeout: 60000 });
    const shipToAddress = `${shipAddressData.firstName} ${shipAddressData.lastName}${shipAddressData.address1}${shipAddressData.city}, ${shipAddressData.state} ${shipAddressData.zipCode}${shipAddressData.phoneNumber}`;
    return shipToAddress;
  }

  async verifyBasicFreightShippingRate() {
    await expect(page.getByTestId(elements.shippingAndGiftingPage.lblShipMethodDefault)).toContainText('Basic Freight Delivery');
  }

  async selectSavedAddress(itemSequence) {
    await page.locator(elements.shippingAndGiftingPage.selectedAddrbutton).nth(itemSequence).click();
    const addressList = await page.locator(elements.shippingAndGiftingPage.addressList).count();
    if (addressList > 1) {
      let addrDefalut = await page.locator(elements.shippingAndGiftingPage.selectedAddressDetail).nth(0).textContent();
      const addressListEle = page.locator('.other-address-lists').nth(itemSequence);
      let addr = await addressListEle.locator('.address-list').nth(0).textContent();
      addrDefalut = addrDefalut.replace("'s address", '');
      addr = addr.replace("'s address", '');

      multipleShipAddress.push(addrDefalut);
      multipleShipAddress.push(addr);
      await addressListEle.locator('.address-list').nth(0).click();
    }
  }

  async selectMutipleAddress() {
    await page.click(elements.shippingAndGiftingPage.lnkMultiRecipient);
    await expect(page.locator(elements.shippingAndGiftingPage.lblMultiAddrTitle)).toBeVisible({ timeout });
    const selectAddressListCount = await page.locator(elements.shippingAndGiftingPage.selectedAddrbutton).count();

    if (selectAddressListCount > 1) {
      // select different address for second item
      await this.selectSavedAddress(1);
    } else {
      // const addNewAddress = await page.$$(elements.shippingAndGiftingPage.multipleNewAddr);
      const addNewAddressElementHandlesArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.multipleNewAddr);
      await Promise.all(
        addNewAddressElementHandlesArray.map(async (ele, i) => {
          await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
          // await page.waitForTimeout(4000);
          await page.locator(elements.shippingAndGiftingPage.multipleNewAddr).nth(i).click();
          const addressDetails = await this.enterShippingAddress(i === 0 ? 'BFT' : 'LD');
          multipleShipAddress.push(addressDetails);
          await page.click('.button-next:has-text("Save")');
          await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
          const avsTitle = await page.locator(elements.shippingAndGiftingPage.divAvsPopupContainer).isVisible();
          testReport.log('avsTitle', avsTitle);
          if (avsTitle) {
            testReport.log(this.pageName, 'AVS popup displayed');
            const activeAvsPopup = page.locator(elements.shippingAndGiftingPage.divButtonHiddenAvsPopup);
            testReport.log('activeAvsPopup', activeAvsPopup);
            await activeAvsPopup.locator(elements.shippingAndGiftingPage.btnConfirmAvsPopup).click();
            await page.waitForLoadState('domcontentloaded');
          }
        })
      );
    }
  }

  async enterMultipleGiftMessage() {
    await expect(page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption).first()).toBeVisible({ timeout });
    // const giftMessageList = await page.$$(elements.shippingAndGiftingPage.lblYesThisIsGiftOption);
    const giftMessageListElementHandlesArray = await common.getElementHandlesArray(elements.shippingAndGiftingPage.lblYesThisIsGiftOption);
    await Promise.all(
      giftMessageListElementHandlesArray.map(async (ele, i) => {
        await page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption).nth(i).click();
        // await page.$eval(elements.shippingAndGiftingPage.lblYesThisIsGiftOption, (elem) => elem.click());
        const strGiftOptionsMessageContent = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsMessageContent).nth(i).textContent();
        expect(strGiftOptionsMessageContent).toContain('Prices will not appear on shipment when a gift message is present.');
        testReport.log(this.pageName, `GiftOptions message content displayed -> ${strGiftOptionsMessageContent}`);
        const strGiftOptionsMessageContainerHdr = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsMessageHdr).nth(i).textContent();
        expect(strGiftOptionsMessageContainerHdr).toContain('Gift Message (Free)');
        testReport.log(this.pageName, `GiftOptions message container header displayed -> ${strGiftOptionsMessageContainerHdr}`);
        const strGiftOptionsMessageContainer = page.locator(elements.shippingAndGiftingPage.txtGiftMessageBox).nth(i);
        if (await strGiftOptionsMessageContainer.isVisible()) {
          testReport.log(this.pageName, 'Gift Message is Open and Active');
        } else {
          await page.locator(elements.shippingAndGiftingPage.lblYesThisIsGiftOption).nth(i).click();
          await expect(page.locator('[data-testid="lbl-gift-boxed-items-hdr"]').first()).toBeVisible({ timeout });
          await page.waitForLoadState('domcontentloaded');
          testReport.log(this.pageName, "Click on 'Yes, this is a Gift'");
        }
        testReport.log(this.pageName, 'Gift Message is Available to Enter messages');
        const giftMessage = 'Hi John, Happy Birthday';
        await page.fill(`#gift-message-message  >> nth=${i}`, giftMessage, { delay: 100 });
        shipAddress.giftMessage = giftMessage;
        testReport.log(this.pageName, `Gift Message '${giftMessage}' entered into GiftMessage Box`);
        const strGiftOptionsSpecialCharWarning = await page.locator(elements.shippingAndGiftingPage.lblGiftOptionsSpecialCharWarning).nth(i).textContent();
        expect(strGiftOptionsSpecialCharWarning).toContain('(Some special characters not accepted ex. emoji, à, è, ö, >, <, etc.)');
        testReport.log(this.pageName, `GiftOptions special character warning message displayed -> ${strGiftOptionsSpecialCharWarning}`);

        const giftBox = await page.locator('data-testid=gift-box-option-add-gift-box').nth(i).isVisible();
        if (giftBox) {
          const blnIsGiftBoxChecked = await page.locator('data-testid=gift-box-option-add-gift-box').nth(i).isChecked();
          if (!blnIsGiftBoxChecked) {
            await page.locator(elements.shippingAndGiftingPage.chkAddGiftBox).nth(i).click();
            testReport.log(this.pageName, 'Opted for Gift Box');
          }
        }
      })
    );
  }

  async getMulipleShipAddress() {
    return multipleShipAddress;
  }

  async verifyMultipleRecipientAddress(addresses) {
    let prevPromise = Promise.resolve();
    await Promise.all(
      addresses.map(async (address, i) => {
        prevPromise = prevPromise.then(async () => {
          let strShipToAddress = await page.getByTestId('ship-to-address').nth(i).textContent();
          strShipToAddress = strShipToAddress.replace(/[\s,]/g, '').toLowerCase();
          const addressDisplay = address.replace(/[\s,]/g, '').replace('Editselectedaddress', '').toLowerCase();
          expect(strShipToAddress).toContain(addressDisplay);
        });
        return prevPromise;
      })
    );
  }

  async verifyShipToAK() {
    const taxAmt = await this.getTaxTotalFromOrderSummary();

    if (global.isMobile) {
      this.clickViewDetails();
      expect(taxAmt).toContain('0.00');
      this.clickHideDetails();
    } else {
      expect(taxAmt).toContain('0.00');
    }
  }

  async verifyRegistryItemLabel() {
    await expect(page.locator(elements.shippingAndGiftingPage.divRegistryItem).first()).toBeVisible({ timeout });
    const arrayShippingPageElements = await common.getElementHandlesArray(elements.shippingAndGiftingPage.divRegistryItem);
    let isSuccess = false;

    await Promise.all(
      arrayShippingPageElements.map(async (ele, i) => {
        await expect(page.locator(elements.shippingAndGiftingPage.divRegistryItem).nth(i)).toHaveText('Registry Item');
        isSuccess = true;
      })
    );
    if (isSuccess) testReport.log(this.pageName, 'Registry Item label displayed in the shipping page for all registry items as expected');
    else testReport.log(this.pageName, 'Registry Item label not displayed in the shipping page');
  }

  async verifyShippingCharge(shipMethod, expectedShipCharge) {
    const blnIsShipDiscountApplied = await this.verifyShippingDiscountApplied();
    const shippingDiscount = await checkout.getShippingDiscountAmtFromOrderSummary(blnIsShipDiscountApplied);

    let shipChargeDisplayed = '$0.00';

    const selectedShipmode = await common.getElementHandlesArray(elements.shippingAndGiftingPage.arrayShipMethods);
    testReport.log(this.pageName, `Number of shipping methods present: ${selectedShipmode.length}`);
    if (selectedShipmode.length > 1) {
      if (shipMethod === 'Standard') {
        if (env.COUNTRY === 'US') {
          shipChargeDisplayed = await page.locator(elements.shippingAndGiftingPage.lblShipMethodStandardCharge).innerText();
        } else if (env.COUNTRY === 'CA') {
          shipChargeDisplayed = await page.locator(elements.shippingAndGiftingPage.lblDefaultStandardShipMode).innerText();
        }
      } else if (shipMethod === 'Premium') {
        shipChargeDisplayed = await page.locator(elements.shippingAndGiftingPage.lblShipMethodPremiumCharge).innerText();
      } else if (shipMethod === 'Express') {
        shipChargeDisplayed = await page.locator(elements.shippingAndGiftingPage.lblShipMethodExpressCharge).innerText();
      }
    } else {
      shipChargeDisplayed = await page.locator(elements.shippingAndGiftingPage.lblDefaultStandardShipMode).innerText();
    }
    shipChargeDisplayed = shipChargeDisplayed.replace('$', '').replace('CAD ', '');

    const netShippingCharge = (parseFloat(expectedShipCharge) + parseFloat(shippingDiscount)).toFixed(2);
    expect(shipChargeDisplayed).toEqual(netShippingCharge);
    testReport.log(
      this.pageName,
      `Shipping charge displayed: ${shipChargeDisplayed} for ${shipMethod}, Expected Shipping Charge: ${netShippingCharge} [Shipping Discount: ${shippingDiscount}]`
    );
  }

  async verifyShippingChargeInShippingPageOrderSummary(expectedShipCharge) {
    testReport.log(this.pageName, `Shipping charge Expected: ${expectedShipCharge}`);
    common.forcedWait(this.pageName, 10000);
    let shipingChargeInOrderSummaary = await checkout.getShippingHandlingAmtFromOrderSummary();
    testReport.log(this.pageName, `Shipping charge shown in Order summary: ${shipingChargeInOrderSummaary}`);
    shipingChargeInOrderSummaary = parseFloat(shipingChargeInOrderSummaary).toFixed(2);
    expect(shipingChargeInOrderSummaary).toEqual(parseFloat(expectedShipCharge).toFixed(2));
  }

  /**
   * @author:  krishna
   * @function_Name : clickOnAddNewAddress
   * @Description : click on add new address radio button when checking out a gift registry item and ship it to customer address
   * @params : None
   * @returns : None
   * */
  async clickOnAddNewAddress() {
    await expect(page.locator(elements.shippingAndGiftingPage.rdoShipToOtherAddress)).not.toBeChecked();
    testReport.log(this.pageName, 'Add new address radio button is not checked as expected');
    await expect(page.locator(elements.shippingAndGiftingPage.divShipToAddressContainer)).toBeHidden();
    testReport.log(this.pageName, 'Add new address section is not visible as expected');
    await page.locator(elements.shippingAndGiftingPage.lblShipToOtherAddress).click();
    testReport.log(this.pageName, 'Clicked on Add new address radio button');
  }

  async clickOnGRShipToNewAddress() {
    await page.locator('text="Add new address"').click();
    testReport.log(this.pageName, 'Selected Ship to Customer address radio button');
  }

  async verifyShipToRegistrantMessage() {
    await expect(page.locator(elements.giftRegistryItems.lblShippingAddressMessageGiftRegistry).first()).toBeVisible({ timeout });
  }
}

module.exports = { ShippingPage };
