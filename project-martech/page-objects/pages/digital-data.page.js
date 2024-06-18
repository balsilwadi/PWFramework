/* eslint-disable no-await-in-loop */
/* eslint-disable playwright/no-wait-for-timeout */
/* eslint-disable playwright/no-networkidle */
const { expect } = require('@playwright/test');
const repoCommonElementsAcc = require('../elements/account-elements');
const repoCommonElements = require('../elements/pdp-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { CompareDDL } = require('./digital-data.utils');
const env = require('../../../support/env/env');

const dataLayer = require('../datafiles/datalayer-test-data.json');

const testReport = new ReportUtils();
const compare = new CompareDDL();

class DigitalDataLayer {
  pageName = this.constructor.name;

  constructor() {
    [this.dataLayer] = dataLayer[env.EXEC_SITE];
  }

  /**
   * @function_Name : validateStaticDDL
   * @Description : To validate static DDL
   * @params : objExpected
   * @returns : None
   * */

  async validateStaticDDL(objExpected) {
    // objExpected: data object from expected file (dataLayer.json)
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    testReport.log(this.pageName, 'Validating Static Digital Data');
    // Read data from the dev tools console and Store in 'objActual'
    const objActual = await page.evaluate('window.digitalData');
    try {
      testReport.log(this.pageName, `Expected Objects: "${Object.keys(objExpected)}" matched with Actual Objects: "${Object.keys(objActual)}"`);
    } catch (error) {
      throw new Error(`Static Digital Data validation Failed - Received: "${objActual}"`);
    }
    // Compare actual website DDL data with expected JSON file data
    compare.deepEqual(objExpected, objActual, Object.keys(objExpected));
  }

  /**
   * @function_Name : validateDynamicDDL
   * @Description : To validate dynamic DDL
   * @params : eventName, objExpected
   * @returns : None
   * */

  async validateDynamicDDL(eventName, objExpected) {
    // eventName: specific event name present in the website DDL object, objExpected: data object from expected file (dataLayer.json)
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    testReport.log(this.pageName, `Validating Dynamic Digital Data for event - "${eventName}"`);
    // Read data from the dev tools console and Store in 'eventArray'
    const eventArray = await page.evaluate('window.digitalData.event');
    // Read actual matched event from event array evaluated
    const actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);

    try {
      testReport.log(this.pageName, `Expected Objects: "${Object.keys(objExpected)}" matches with Actual Objects: "${Object.keys(actualMatchedEvent)}"`);
    } catch (error) {
      throw new Error(`Expected Digital Data event not found\n Expected: "${eventName}"\n Received: "${actualMatchedEvent}"`);
    }
    // Compare actual website DDL data with expected JSON file data
    compare.deepEqual(objExpected, actualMatchedEvent, eventName);
  }

  /**
   * @function_Name : validateDynamicSearchDDL
   * @Description : To validate dynamic DDL on search page
   * @params : eventName, objExpected
   * @returns : None
   * */

  async validateDynamicSearchDDL(eventName, objExpected) {
    // eventName: specific event name present in the website DDL object, objExpected: data object from expected file (dataLayer.json)
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    testReport.log(this.pageName, `Validating Dynamic Digital Data for event - "${eventName}"`);
    // Read data from the dev tools console and Store in 'eventArray'
    const eventArray = await page.evaluate('window.digitalData.event');
    // Read actual matched event from event array evaluated
    const actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);

    try {
      testReport.log(this.pageName, `Expected Objects: "${Object.keys(objExpected)}" matches with Actual Objects: "${Object.keys(actualMatchedEvent)}"`);
    } catch (error) {
      throw new Error(`Expected Digital Data event not found\n Expected: "${eventName}"\n Received: "${actualMatchedEvent}"`);
    }
    // Compare actual website DDL data with expected JSON file data
    await compare.deepEqualSearch(objExpected, actualMatchedEvent, eventName);
  }

  /**
   * @function_Name : validateDynamicDatalayer
   * @Description : To validation/check Dynamic DDL for Null or Undefined values
   * @params : eventName, objExpected
   * @returns : None
   * */

  async validateDDLForNullAndUndefined(eventName, keyHeader) {
    // eventName: specific event name present in the website DDL object
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });
    testReport.log(this.pageName, `Validating Dynamic Digital Data for event - "${eventName}"`);
    // Read data from the dev tools console and Store in 'eventArray'
    const eventArray = await page.evaluate('window.digitalData.event');
    let actualMatchedEvent = [];
    // Read actual matched event from event array evaluated
    if (keyHeader === 'ADDTOCART-CONFIRMATION-ADDONS-PDP') {
      actualMatchedEvent = eventArray.reverse().filter((event) => event.eventInfo.eventName === eventName);
      if (actualMatchedEvent.length <= 1) {
        throw new Error(`Expected Digital Data event not found\n Expected: "${eventName}"\n Received: "undefined"`);
      } else {
        actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);
      }
    } else {
      actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);
    }
    try {
      testReport.log(this.pageName, `Actual Objects found : "${Object.keys(actualMatchedEvent)}"`);
    } catch (error) {
      throw new Error(`Expected Digital Data event not found\n Expected: "${eventName}"\n Received: "${actualMatchedEvent}"`);
    }
    // Compare actual website DDL data with expected JSON file data
    compare.deepCheck(actualMatchedEvent);
  }

  /**
   * @function_Name : validateDdlOnPageLoad
   * @Description : To Validate DDL when a page loads
   * @params : keyHeader
   * @returns : None
   * */

  async validateDdlOnPageLoad(keyHeader) {
    // keyHeader: page name which is same as subheader in dataLayer.json(expected data) file
    await page.waitForLoadState('load');
    switch (keyHeader) {
      case 'HOME-PAGE': // Validate Static & Dynamic DDL on Home Page
      case 'REWARDS-PAGE': // Validate Static & Dynamic DDL on Rewards Page
      case 'DESIGN-SERVICES-CRATE-PAGE': // Validate Static & Dynamic DDL on Design Services Page
      case 'DESIGN-SERVICES-CB2-PAGE': // Validate Static & Dynamic DDL on Design Services Page
      case 'DESIGN-SERVICES-KIDS-PAGE': // Validate Static & Dynamic DDL on Design Kids Services Page
      case 'TRADE-PROGRAM-PAGE': // Validate Static & Dynamic DDL on Trade Page
      case 'SUPERCATEGORY': // Validate Static & Dynamic DDL on Supercategory Page
      case 'STORES-LOCATOR-PAGE': // Validate Static & Dynamic DDL on Stores Page
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        break;
      case 'STORES-DETAILS-PAGE': // Validate Static & Dynamic DDL on Stores Details Page
      case 'STORES-LIST-PAGE': // Validate Static & Dynamic DDL on Stores List Page
        await this.validateDynamicDDL('Page Viewed', this.dataLayer.STORES.dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer.STORES.dynamic.identifyEvent);
        break;
      case 'CART-PAGE': // Validate Static & Dynamic DDL on Cart Page
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Cart Viewed', this.dataLayer[keyHeader].dynamic.cartViewedEvent);
        break;
      case 'ORDER-CONFIRMATION-PAGE-CORE': // Validate Static & Dynamic DDL on Confirmation Page
      case 'ORDER-CONFIRMATION-PAGE-CORE&KIDS': // Validate Static & Dynamic DDL on Confirmation Page when multiple items in cart
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Order Completed', this.dataLayer[keyHeader].dynamic.orderCompletedEvent);
        break;
      case 'REGISTRANT-LIST-PAGE': // Validate Static & Dynamic DDL on Gift Registry Page
      case 'SPATEGORY-PLP': // Validate Static & Dynamic DDL on Category Page
      case 'PRODUCT-LISTING-PAGE': // Validate Static & Dynamic DDL on Product Listing Page
      case 'SEARCH-RESULTS': // Validate Static & Dynamic DDL on Search Page
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await page.waitForLoadState('networkidle', { timeout: global.medium_wait });
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Product List Viewed', this.dataLayer[keyHeader].dynamic.productListViewedEvent);
        break;
      case 'GR-INITIAL-FORM-PAGE': // Validate Static & Dynamic DDL on Gift Registry Page
        await page.waitForTimeout(2000); // Giving time for the DDL event to fire
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        break;
      case 'GR-CONTACT-INFORMATION-PAGE': // Validate Static & Dynamic DDL on Gift Registry Page
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await page.waitForLoadState('networkidle', { timeout: global.medium_wait });
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Account Created', this.dataLayer[keyHeader].dynamic.accountCreatedEvent);
        break;
      case 'GR-REGISTRANT-LIST-PAGE': // Validate Static & Dynamic DDL on Gift Registry Page
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await page.waitForLoadState('networkidle', { timeout: global.medium_wait });
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Registry Created', this.dataLayer[keyHeader].dynamic.registryCreatedEvent);
        await this.validateDynamicDDL('Form Step Completed', this.dataLayer[keyHeader].dynamic.formStepCompletedEvent);
        await this.validateDynamicDDL('Preferences Changed', this.dataLayer[keyHeader].dynamic.preferencesChangedEmailEvent);
        break;
      case 'ACCOUNT-PAGE': // Validate Static & Dynamic DDL on Account Sign in Page
        await page.customWait(repoCommonElementsAcc.myAccountPage.lblAcntLayout, 'lblAcntLayout');
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await page.waitForLoadState('networkidle', { timeout: global.medium_wait });
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Log In', this.dataLayer[keyHeader].dynamic.logInEvent);
        break;
      case 'CREATE-ACCOUNT-PAGE': // Validate Static & Dynamic DDL on Account Creation Page
        await page.customWait(repoCommonElementsAcc.myAccountPage.lblAcntLayout, 'lblAcntLayout');
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await page.waitForLoadState('networkidle', { timeout: global.medium_wait });
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Account Created', this.dataLayer[keyHeader].dynamic.accountCreatedEvent);
        break;
      case 'PDP': // Validate Static & Dynamic DDL on PDP when user comes from home page
      case 'FAMILY-PAGE': // Validate Static & Dynamic DDL on Family Page
      case 'GROUPER-PDP': // Validate Static & Dynamic DDL on Grouper Page
      case 'SUPERSOR-PDP': // Validate Static & Dynamic DDL on SuperSor Page
      case 'INSTALLATION-PDP': // Validate Static & Dynamic DDL on Installation PDP
      case 'MONOGRAM-PDP': // Validate Static & Dynamic DDL on Monogram PDP
      case 'SWATCH-PDP': // Validate Static & Dynamic DDL on Swatch PDP
        await this.comparePrice();
        await this.validateStaticDDL(this.dataLayer[keyHeader].static);
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Identify', this.dataLayer[keyHeader].dynamic.identifyEvent);
        await this.validateDynamicDDL('Product Viewed', this.dataLayer[keyHeader].dynamic.productViewedEvent);
        await this.compareDdlEventPrice('Product Viewed');
        break;
      case 'GROUPER-PDP-COLOR-GROUP': // Validate Static & Dynamic DDL on Grouper Page when different color is selected
      case 'GROUPER-PDP-SIZE-GROUP': // Validate Static & Dynamic DDL on Grouper Page when different size is selected
      case 'SUPERSOR-QUICK-SHIP-PRODUCTS': // Validate Static & Dynamic DDL on Super Sor Page when what's available soonest item is selected
      case 'SUPERSOR-PDP-DEPTH-DRAWER': // Validate Static & Dynamic DDL on Super Sor Page when different depth is selected
      case 'SUPERSOR-PDP-SIZE-DRAWER': // Validate Static & Dynamic DDL on Super Sor Page when different size is selected
      case 'SUPERSOR-PDP-FABRIC-DRAWER': // Validate Static & Dynamic DDL on Super Sor Page when different fabric is selected
        await this.comparePrice();
        await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        await this.validateDynamicDDL('Product Viewed', this.dataLayer[keyHeader].dynamic.productViewedEvent);
        await this.compareDdlEventPrice('Product Viewed');
        break;
      // no default
    }
  }

  /**
   * @function_Name : validateDdlWithEventName
   * @Description : To Validate DDL when a particular action is performed on website
   * @params : eventName, keyHeader
   * @returns : None
   * */

  async validateDdlWithEventName(eventName, keyHeader) {
    // eventName: specific event name present in the website DDL object
    await page.waitForTimeout(2500); // Giving time for the DDL event to fire

    switch (eventName) {
      case 'Product Added':
        if (arguments.length === 2) {
          if (keyHeader === 'ADDTOCART-CONFIRMATION-ADDONS-PDP') {
            await this.validateDDLForNullAndUndefined(eventName, keyHeader);
          } else {
            await this.validateDynamicDDL('Product Added', this.dataLayer[keyHeader].dynamic.productAddedEvent);
            await this.compareDdlEventPrice('Product Added', keyHeader);
          }
        } else {
          await this.validateDDLForNullAndUndefined('Product Added');
        }
        break;
      case 'Favorites Item Added':
        await page.customWait(repoCommonElements.productPage.lblAddToFavConfPopup, 'lblAddToFavConfPopup');
        await this.validateDynamicDDL('Favorites Item Added', this.dataLayer[keyHeader].dynamic.favoritesItemAddedEvent);
        await this.compareDdlEventPrice('Favorites Item Added', keyHeader);
        break;
      case 'Registry Item Added':
        await page.customWait(repoCommonElements.productPage.lblAddToRegConfPopup, 'lblAddToRegConfPopup');
        await this.validateDynamicDDL('Registry Item Added', this.dataLayer[keyHeader].dynamic.registryItemAddedEvent);
        await this.compareDdlEventPrice('Registry Item Added', keyHeader);
        break;
      case 'Cart Updated':
        await this.validateDynamicDDL('Cart Updated', this.dataLayer[keyHeader].dynamic.cartUpdateEvent);
        break;
      case 'Save For Later Product Added':
        await this.validateDynamicDDL('Save For Later Product Added', this.dataLayer[keyHeader].dynamic.saveForLaterEvent);
        break;
      case 'Product Removed':
        await this.validateDynamicDDL('Product Removed', this.dataLayer[keyHeader].dynamic.productRemoved);
        break;
      case 'Save for Later Product Removed':
        await this.validateDynamicDDL('Save for Later Product Removed', this.dataLayer[keyHeader].dynamic.saveForLaterEventProductRemoved);
        break;
      case 'Initiate Checkout':
        await this.validateDynamicDDL('Initiate Checkout', this.dataLayer[keyHeader].dynamic.initiateCheckoutEvent);
        break;
      case 'Trade Program Apply Now':
        await this.validateDynamicDDL('Trade Program Apply Now', this.dataLayer[keyHeader].dynamic.tradeProgramApplyNowTrackedEvent);
        break;
      case 'Design Services In-Home Appointment Schedule Start': {
        let keyheaderInHome;
        if (keyHeader === 'DESIGN-SERVICES-CRATE-PAGE') {
          keyheaderInHome = this.dataLayer[keyHeader].dynamic.designServicesInHomeAppointmentScheduleStartTrackedEvent;
        } else {
          keyheaderInHome = this.dataLayer[keyHeader].dynamic.designKidsServicesInHomeAppointmentScheduleStartTrackedEvent;
        }
        await this.validateDynamicDDL('Design Services In-Home Appointment Schedule Start', keyheaderInHome);
        break;
      }
      case 'Design Services In-Store Appointment Schedule Start': {
        let keyheaderInStore;
        if (keyHeader === 'DESIGN-SERVICES-CRATE-PAGE') {
          keyheaderInStore = this.dataLayer[keyHeader].dynamic.designServicesInStoreAppointmentScheduleStartTrackedEvent;
        } else {
          keyheaderInStore = this.dataLayer[keyHeader].dynamic.designKidsServicesInStoreAppointmentScheduleStartTrackedEvent;
        }
        await this.validateDynamicDDL('Design Services In-Store Appointment Schedule Start', keyheaderInStore);
        break;
      }
      case 'Design Services Online Appointment Schedule Start': {
        let keyheaderOnline;
        if (keyHeader === 'DESIGN-SERVICES-CRATE-PAGE') {
          keyheaderOnline = this.dataLayer[keyHeader].dynamic.designServicesOnlineAppointmentScheduleStartTrackedEvent;
        } else {
          keyheaderOnline = this.dataLayer[keyHeader].dynamic.designKidsServicesOnlineAppointmentScheduleStartTrackedEvent;
        }
        await this.validateDynamicDDL('Design Services Online Appointment Schedule Start', keyheaderOnline);
        break;
      }
      case 'Connect With a Designer Locally Schedule Start':
        await this.validateDynamicDDL(
          'Connect With a Designer Locally Schedule Start',
          this.dataLayer[keyHeader].dynamic.designServicesLocallyScheduleStartTrackedEvent
        );
        break;
      case 'Connect With a Designer Virtually Schedule Start':
        await this.validateDynamicDDL(
          'Connect With a Designer Virtually Schedule Start',
          this.dataLayer[keyHeader].dynamic.designServicesVirtuallyScheduleStartTrackedEvent
        );
        break;
      case 'CBCC Apply Now Click':
        await this.validateDynamicDDL('CBCC Apply Now Click', this.dataLayer[keyHeader].dynamic.rewardsCBCCApplyNowTrackedEvent);
        break;
      case 'Registry Started':
        await this.validateDynamicDDL('Registry Started', this.dataLayer[keyHeader].dynamic.registryStartedEvent);
        break;
      case 'Popup':
        await this.validateDynamicDDL('Popup', this.dataLayer[keyHeader].dynamic.popupEvent);
        break;
      case 'Personalized Button Click':
        await this.validateDynamicDDL('Personalized Button Click', this.dataLayer[keyHeader].dynamic.personalizedEvent);
        break;
      case 'Form Submitted':
        await this.validateDynamicDDL('Form Submitted', this.dataLayer[keyHeader].dynamic.formSubmittedEvent);
        break;
      case 'Product List Viewed':
        if (keyHeader === 'SEARCH-RESULTS') {
          await page.waitForTimeout(3000);
          await this.validateDynamicDDL('Product List Viewed', this.dataLayer[keyHeader].dynamic.productListViewedEvent);
          break;
        } else {
          await this.validateDynamicSearchDDL('Product List Viewed', this.dataLayer[keyHeader].dynamic.productListViewedEvent);
          await page.waitForTimeout(3000);
        }
        break;
      case 'Filter Interaction':
        await this.validateDynamicSearchDDL('Filter Interaction', this.dataLayer[keyHeader].dynamic.filterInteractionEvent);
        break;
      case 'Page Viewed':
        if (keyHeader.includes('GR-')) {
          await this.validateDynamicDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
        } else {
          await this.validateDynamicSearchDDL('Page Viewed', this.dataLayer[keyHeader].dynamic.pageViewedEvent);
          await page.waitForTimeout(1000);
        }
        break;
      case 'Form Step Completed':
        await this.validateDynamicDDL('Form Step Completed', this.dataLayer[keyHeader].dynamic.formStepCompletedEvent);
        break;
      case 'Form Abandon':
        await this.validateDynamicDDL('Form Abandon', this.dataLayer[keyHeader].dynamic.formAbandonEvent);
        break;
      // no default
    }
  }

  /**
   * @function_Name : comparePrice
   * @Description : To compare UI Current price to DDL Current price
   * @params : None
   * @returns : None
   * */

  async comparePrice() {
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });

    // Compare UI Current price with DDL Current price on mPDP
    if (await page.locator(repoCommonElements.productPage.lblLineProductsContainer).isVisible()) {
      // Get Sku prices from UI and storing them in a variable
      const skuPriceArr = await page.locator(repoCommonElements.productPage.txtFmlySkuPricesReg).allTextContents();
      // Get line item names from UI and storing them in a variable
      const itemNameArr = await page.locator(repoCommonElements.productPage.txtLineItemNames).allTextContents();
      // Get product objects from DDL and storing them in a variable
      const ddlPriceArr = await page.evaluate('window.digitalData.product');

      // using for-loop to get all the product[n] objects from digital data
      for (let index = 0; index < ddlPriceArr.length; index++) {
        // index = num of product objects found in DDL (ex: 0,1,2 and so on...)
        // Get Sku price from nth index and store it in a variable
        const ddlPrice = ddlPriceArr[index].attributes.price.regularPrice;
        try {
          // compare DDL price with UI price
          expect(await this.getPriceNumber(skuPriceArr[index])).toEqual(ddlPrice);
          testReport.log(
            this.pageName,
            `For line item: '${itemNameArr[index]}' UI regular price '${await this.getPriceNumber(
              skuPriceArr[index]
            )}' matches with the DDL regular price '${ddlPrice}'`
          );
        } catch (error) {
          throw new Error(
            // eslint-disable-next-line prettier/prettier
            `UI price '${await this.getPriceNumber(skuPriceArr[index])}' for line item: '${itemNameArr[index]
            }' does not matches with the DDL price '${ddlPrice}'\n UI Price: "${await this.getPriceNumber(skuPriceArr[index])}"\n DDL Price: "${ddlPrice}"`
          );
        }
      }
      // To validate price if a non mPDP item is on Sale/Clearance
    } else if (await page.locator(repoCommonElements.productPage.txtPdpSkuPriceCurrent).isVisible()) {
      // Get Sku price from UI and storing it in a variable
      const skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceCurrent);
      // Get Sku price from DDL and storing it in a variable
      const ddlPrice = await page.evaluate('window.digitalData.product[0].attributes.price.currentPrice');
      try {
        // compare DDL price with UI price
        expect(await this.getPriceNumber(skuPrice)).toEqual(ddlPrice);
        testReport.log(this.pageName, `UI current price '${await this.getPriceNumber(skuPrice)}' matches with the DDL current price '${ddlPrice}'`);
      } catch (error) {
        throw new Error(
          `UI current price '${await this.getPriceNumber(
            skuPrice
          )}' does not matches with the DDL current price '${ddlPrice}'\n UI Price: "${await this.getPriceNumber(skuPrice)}"\n DDL Price: "${ddlPrice}"`
        );
      }
    } else {
      // To validate price if non mPDP item is not on Sale/Clearance
      // Get Sku price from UI and storing it in a variable
      const skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceReg);
      // Get Sku price from DDL and storing it in a variable
      const ddlPrice = await page.evaluate('window.digitalData.product[0].attributes.price.regularPrice');
      try {
        expect(await this.getPriceNumber(skuPrice)).toEqual(ddlPrice);
        testReport.log(this.pageName, `UI price '${await this.getPriceNumber(skuPrice)}' matches with the DDL price '${ddlPrice}'`);
      } catch (error) {
        throw new Error(
          `UI price '${await this.getPriceNumber(skuPrice)}' does not matches with the DDL price '${ddlPrice}'\n UI Price: "${await this.getPriceNumber(
            skuPrice
          )}"\n DDL Price: "${ddlPrice}"`
        );
      }
    }
  }

  // To get the Price as a number from alpha numeric string (price example: reg $24.99 or CAD 24.99)
  async getPriceNumber(price) {
    if (price.includes('$')) {
      return parseFloat(price.split('$')[1].replace(',', ''));
    }
    if (price.includes('CAD')) {
      return parseFloat(price.split('CAD ')[1].replace(',', ''));
    }
    return parseFloat(price.replace(',', ''));
  }

  // Method to compare UI Current price to DDL Current price
  async compareDdlEventPrice(eventName, keyHeader) {
    await page.waitForLoadState('domcontentloaded', { timeout: global.large_wait });

    // Compare UI Current price with DDL Current price On mPDP
    if (await page.locator(repoCommonElements.productPage.lblLineProductsContainer).isVisible()) {
      // Get Sku prices from UI and storing them in a variable
      let skuPriceArr = '';
      if (await page.locator(repoCommonElements.productPage.txtFmlyFirstSkuPricesCurrent).isVisible()) {
        skuPriceArr = await page.locator(repoCommonElements.productPage.txtFmlySkuPricesCurrent).allTextContents();
      } else {
        skuPriceArr = await page.locator(repoCommonElements.productPage.txtFmlySkuPricesReg).allTextContents();
      }
      // Get line item names from UI and storing them in a variable
      const itemNameArr = await page.locator(repoCommonElements.productPage.txtLineItemNames).allTextContents();
      // Get product objects from DDL and storing them in a variable
      const eventArray = await page.evaluate('window.digitalData.event');
      const actualMatchedEvent = eventArray.filter((event) => event.eventInfo.eventName === eventName);
      if (actualMatchedEvent.length === 0) {
        throw new Error(`Expected event "${eventName}" is not found`);
      } else {
        // using for-loop to get all the actualMatchedEvent objects from digital data
        for (let index = 0; index < actualMatchedEvent.length; index++) {
          const ddlPrice = actualMatchedEvent[index].attributes.price;
          try {
            // compare DDL price with UI price on mPDP
            expect(await this.getPriceNumber(skuPriceArr[index])).toEqual(ddlPrice);
            testReport.log(
              this.pageName,
              `For line item: '${itemNameArr[index]}' UI price '${await this.getPriceNumber(
                skuPriceArr[index]
              )}' matches with the ${eventName} event price '${ddlPrice}'`
            );
          } catch (error) {
            throw new Error(
              `"${eventName}" event price for line item: '${itemNameArr[index]}' does not match with UI price\n UI Price: "${await this.getPriceNumber(
                skuPriceArr[index]
              )}"\n DDL Price: "${ddlPrice}"`
            );
          }
        }
      }
      // To Compare UI Current price with DDL Current price On non mPDP
      // To validate price if item is on Sale/Clearance
    } else if (await page.locator(repoCommonElements.productPage.txtPdpSkuPriceCurrent).isVisible()) {
      // Get Sku price from UI and storing it in a variable
      let skuPrice = '';
      if (eventName === 'Product Added') {
        if (keyHeader === 'SWATCH-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtSwatchPrice);
        } else if (keyHeader === 'ADDTOCART-CONFIRMATION-ADDONS-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtAddToCartAddOnsPrice);
        } else if (keyHeader === 'ADDONS-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtAddOnsPrice);
        } else if (keyHeader === 'PART-OF-COLLECTION-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPartOfCollPriceCurrent);
        } else {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceCurrent);
        }
      } else {
        skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceCurrent);
      }
      // const skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceCurrent);
      // Get DDL event price from and storing it in a variable
      const eventArray = await page.evaluate('window.digitalData.event');
      const actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);
      const ddlPrice = actualMatchedEvent.attributes.price;
      try {
        // compare DDL price with UI price
        expect(await this.getPriceNumber(skuPrice)).toEqual(ddlPrice);
        testReport.log(this.pageName, `UI price '${await this.getPriceNumber(skuPrice)}' matches with the ${eventName} event price '${ddlPrice}'`);
      } catch (error) {
        throw new Error(
          `"${eventName}" event price does not match with UI price\n UI Price: "${await this.getPriceNumber(skuPrice)}"\n DDL Price: "${ddlPrice}"`
        );
      }
    } else {
      // To validate price if item is not on Sale/Clearance
      // Get Sku price from UI and storing it in a variable
      let skuPrice = '';
      if (eventName === 'Product Added') {
        if (keyHeader === 'SWATCH-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtSwatchPrice);
        } else if (keyHeader === 'ADDTOCART-CONFIRMATION-ADDONS-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtAddToCartAddOnsPrice);
        } else if (keyHeader === 'ADDONS-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtAddOnsPrice);
        } else if (keyHeader === 'PART-OF-COLLECTION-PDP') {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPartOfCollPriceReg);
        } else {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceReg);
        }
      } else if (keyHeader === 'PRODUCT-LISTING-PAGE' || keyHeader === 'SEARCH-RESULTS') {
        if (await page.locator(repoCommonElements.productPage.txtPlpPriceCurrent).isVisible()) {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPlpPriceCurrent);
        } else {
          skuPrice = await page.innerText(repoCommonElements.productPage.txtPlpPriceReg);
        }
      } else if (await page.locator(repoCommonElements.productPage.txtMonoSkuPriceCurrent).isVisible()) {
        skuPrice = await page.innerText(repoCommonElements.productPage.txtMonoSkuPriceCurrent);
      } else {
        skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceReg);
      }
      // Get DDL event price from and storing it in a variable
      const eventArray = await page.evaluate('window.digitalData.event');
      const actualMatchedEvent = eventArray.reverse().find((event) => event.eventInfo.eventName === eventName);
      const ddlPrice = actualMatchedEvent.attributes.price;
      try {
        // compare DDL price with UI price
        expect(await this.getPriceNumber(skuPrice)).toEqual(ddlPrice);
        testReport.log(this.pageName, `UI price '${await this.getPriceNumber(skuPrice)}' matches with the ${eventName} event price '${ddlPrice}'`);
      } catch (error) {
        throw new Error(
          `"${eventName}" event price does not match with UI price\n UI Price: "${await this.getPriceNumber(skuPrice)}"\n DDL Price: "${ddlPrice}"`
        );
      }
    }
  }
}

module.exports = { DigitalDataLayer };
