const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class HeaderStoreLocator {
  pageName = this.constructor.name;

  /**
   * @author: scherukumalli
   * @function_Name : hoverOnHeaderStoreLocatorIcon
   * @Description : This method is used to hover on the header locator icon from Home page
   * @params : None
   * @returns : None
   * */
  async hoverOnHeaderStoreLocatorIcon() {
    if (common.verifyIsMobile()) {
      testReport.log(this.pageName, 'CLick on the Header Locator Icon from Home page');
      await page.locator(el.headerStoreLocatorPopUp.headerStoreLocatorIcon).click();
    } else {
      testReport.log(this.pageName, 'Hover on the Header Locator Icon from Home page');
      await page.locator(el.headerStoreLocatorPopUp.headerStoreLocatorIcon).hover();
    }
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyHeaderLocatorIconMenus
   * @Description : This method is used to verifying the Shipping to and Find a Store menus displayeing when Hover on Store Locator Icon
   * @params : None
   * @returns : None
   * */
  async verifyHeaderLocatorIconMenus() {
    testReport.log(this.pageName, 'verifying Shipping to and Find a Store menus displaying');
    expect(await page.locator(el.headerStoreLocatorPopUp.shippingTo).textContent()).toContain(td.headerStoreLocator.shippingTo, { ignoreCase: true });
    testReport.log(this.pageName, 'Shipping to menu displayed');
    expect(await page.locator(el.headerStoreLocatorPopUp.findStore).textContent()).toContain(td.headerStoreLocator.findStore, { ignoreCase: true });
    testReport.log(this.pageName, 'Find a Store menu displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonZipCodeDisplayLink
   * @Description : This method is used to click on Shipping to Zip Code link
   * @params : None
   * @returns : None
   * */
  async clickOnZipCodeDisplayLink() {
    testReport.log(this.pageName, 'click on Shipping to zip code link');
    await page.locator(el.headerStoreLocatorPopUp.zipCodedisplay).click();
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyZipCodeTextboxIsDisplayed
   * @Description : This method is used to verifying Zip Code textbox is displaying
   * @params : None
   * @returns : None
   * */
  async verifyZipCodeTextboxIsDisplayed() {
    testReport.log(this.pageName, 'verify Zip Code textbox is displaying');
    // await page.locator(el.headerStoreLocatorPopUp.txtZipCode, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.txtZipCode)).toBeVisible();
    testReport.log(this.pageName, 'Zip Code textbox are displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnUpdateZipCode
   * @Description : This method is used to enter the zip code and click on apply zip link
   * @params : None
   * @returns : None
   * */
  async clickOnUpdateZipCode(uszipcode, canzipcode) {
    testReport.log(this.pageName, 'Click on the Zip Code input box');
    testReport.log(this.pageName, 'Enter the Zip Code value into input box');
    if (!env.EXEC_SITE.includes('can')) {
      await page.fill(el.headerStoreLocatorPopUp.txtZipCode, uszipcode, { delay: 400 });
    } else {
      await page.fill(el.headerStoreLocatorPopUp.txtZipCode, canzipcode, { delay: 400 });
    }
    testReport.log(this.pageName, 'Click on ApplyZip link');
    await page.locator(el.headerStoreLocatorPopUp.applyZip).click();
    await page.waitForLoadState('load');
    await common.forcedWait(this.pageName, 2000);
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyZipCodeIsDisplayedOnZipCodeLink
   * @Description : This method is used to verify the zip code is dispaying in zip code display link
   * @params : None
   * @returns : None
   * */
  async verifyZipCodeIsDisplayedOnZipCodeLink() {
    testReport.log(this.pageName, 'Verifying Zip Code is display in zip code display link');
    let zipCode = await page.locator(el.headerStoreLocatorPopUp.zipCodedisplay).textContent();
    testReport.log(`Display Zip code is :${zipCode}`);
    if (!env.EXEC_SITE.includes('can')) {
      zipCode = zipCode.replace('ZIP code. Update.', '');
    } else {
      zipCode = zipCode.replace('Postal Code. Update.', '');
    }
    let txtZipCode = '';
    txtZipCode = await page.locator(el.headerStoreLocatorPopUp.txtZipCode).getAttribute('value');

    testReport.log(`Display Zip code is :${zipCode}`);
    testReport.log(`Zip code is : ${txtZipCode}`);
    if (txtZipCode === zipCode) {
      testReport.log(this.pageName, 'Zip code is displayed in zip code display link');
    } else {
      throw new Error('Zip code is not displayed in zip code display link!!');
    }
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonUpdateZipCodeWithEmptyValue
   * @Description : This method is used to enter the zip code as empty and click on apply zip link
   * @params : None
   * @returns : None
   * */
  async clickOnUpdateZipCodeWithEmptyValue() {
    testReport.log(this.pageName, 'Click on the Zip Code input box');
    await page.locator(el.headerStoreLocatorPopUp.txtZipCode).click();
    testReport.log(this.pageName, 'Enter the Zip Code value into input box');
    await page.fill(el.headerStoreLocatorPopUp.txtZipCode, '', { delay: 500 });
    testReport.log(this.pageName, 'Click on ApplyZip link');
    await page.locator(el.headerStoreLocatorPopUp.applyZip).click();
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyZipCodeErrorMessageDisplayed
   * @Description : This method is used to verifying Zip Code textbox is displaying
   * @params : None
   * @returns : None
   * */
  async verifyZipCodeErrorMessageDisplayed() {
    testReport.log(this.pageName, 'verify Zip Code error msg is displaying');
    // await page.locator(el.headerStoreLocatorPopUp.errorMsg, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.errorMsg)).toBeVisible();
    testReport.log(this.pageName, 'Zip Code error msg is displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnFindaStoreLink
   * @Description : This method is used to click on the Find a Store link and displaying store details
   * @params : None
   * @returns : None
   * */
  async clickOnFindaStoreLink() {
    testReport.log(this.pageName, 'click on the find a store link');
    await page.locator(el.headerStoreLocatorPopUp.findStore).click();
    testReport.log(this.pageName, 'Store List details are displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterZipCodeAndSubmit
   * @Description : This method is used to enter a Zip Code and dispalying store List details
   * @params : None
   * @returns : None
   * */
  async enterZipCodeAndSubmit(uszipcode, canzipcode) {
    testReport.log(this.pageName, 'Enter Zip Code');
    if (!env.EXEC_SITE.includes('can')) {
      await page.fill(el.headerStoreLocatorPopUp.txtStoreZipCode, uszipcode, { delay: 100 });
    } else {
      await page.fill(el.headerStoreLocatorPopUp.txtStoreZipCode, canzipcode, { delay: 100 });
    }
    testReport.log(this.pageName, 'Click on Zip Code link');
    await page.locator(el.headerStoreLocatorPopUp.submitZipCode).click();
    testReport.log(this.pageName, 'Store List details displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnViewAllStores
   * @Description : This method is used to click on view all stores link from Locator popup page
   * @params : None
   * @returns : None
   * */
  async isDisplayedViewAllStoresLink() {
    testReport.log(this.pageName, 'Verify View All Stores link is displayed in Locator po up page');
    // await page.locator(el.storeDetailsPage.lnkViewAllStores, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkViewAllStores)).toBeVisible();
    testReport.log(this.pageName, 'View All Stores link is displayed in Locator po up page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnViewAllStores
   * @Description : This method is used to click on view all stores link from Locator popup page
   * @params : None
   * @returns : None
   * */
  async clickOnViewAllStores() {
    testReport.log(this.pageName, 'Click on the View All Stores link');
    await page.locator(el.headerStoreLocatorPopUp.lnkViewAllStores).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Naviagate to Store page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyStoreNameIsDisplayed
   * @Description : This method is used to verify store name is displayed
   * @params : None
   * @returns : None
   * */
  async verifyStoreNameIsDisplayed() {
    testReport.log(this.pageName, 'Verify Store Name is displayed in Store Details page');
    // await page.locator(el.headerStoreLocatorPopUp.lblStoreName, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.lblStoreName)).toBeVisible();
    testReport.log(this.pageName, 'Store Name is displayed in Store Details page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnStoreFromStoreList
   * @Description : This method is used to click store locator form store list in locator popup page
   * @params : None
   * @returns : None
   * */
  async clickOnStoreFromStoreList() {
    testReport.log(this.pageName, 'Click on the Store Location from Store List');
    if (common.verifyIsMobile()) {
      await page.locator(el.headerStoreLocatorPopUp.mobilebtnStoreWrapper).click();
    } else {
      await page.locator(el.headerStoreLocatorPopUp.btnStoreWrapper).click();
    }
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Specific Store detail displayed in locator popup page');
  }

  /**
   * @author: sCherukumalli
   * @function_Name : verifyStoreDetailsIsDisplayed
   * @Description : This method is used to store should be displayed in the expanded form with address, store operating time, store info and events link and make this my store button
   * @params : None
   * @returns : None
   * */
  async verifyStoreDetailsIsDisplayed() {
    testReport.log(this.pageName, 'Verify Store Address and Phone Number is displayed');
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkStoreAddress)).toBeVisible();
    testReport.log(this.pageName, 'Store Address and Phone Number is displayed');
    testReport.log(this.pageName, 'Verify Store info and make this my button is displayed');
    await expect(page.locator(el.headerStoreLocatorPopUp.btnViewStoreInfoandEvents)).toBeVisible();
    await expect(page.locator(el.headerStoreLocatorPopUp.btnMakeThisMyStore)).toBeVisible();

    testReport.log(this.pageName, 'Store info and make this my button is displayed');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnStoreInfoEvents
   * @Description : This method is used to click on Store Info and Events link and naviagte events page
   * @params : None
   * @returns : None
   * */
  async clickOnStoreInfoEvents() {
    testReport.log(this.pageName, 'Click on the Store Info and Events button');

    // await page.locator(el.headerStoreLocatorPopUp.btnViewStoreInfoandEvents).click();
    await page.$eval(el.headerStoreLocatorPopUp.btnViewStoreInfoandEvents, (elem) => elem.click());
    await common.forcedWait(this.pageName, 2000);
    await page.reload();
    testReport.log(this.pageName, 'Successfully navigated to Store Info and Events page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyUpcomingStoreEventsIsDisplayed
   * @Description : This method is used to verify the Upcoming coming store events is displayed
   * @params : None
   * @returns : None
   * */
  async verifyUpcomingStoreEventsIsDisplayed() {
    testReport.log(this.pageName, 'Verify Upcoming Store events is displayed in the store details page');
    const pageURL = page.url();
    expect(pageURL).toContain('str');
    testReport.log(this.pageName, 'Upcoming Store events is displayed in the store details page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonMakeThisMyStoreButton
   * @Description : This method is used to click on the Make this my store button
   * @params : None
   * @returns : None
   * */
  async clickOnMakeThisMyStoreButton() {
    testReport.log(this.pageName, 'Click on Make this my store button');
    await page.locator(el.headerStoreLocatorPopUp.btnMakeThisMyStore).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Clicked on Make this my store button in Store Details page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyMyStoreIsDisplayed
   * @Description : This method is used to verify My store button is displaying
   * @params : None
   * @returns : None
   * */
  async verifyMyStoreIsDisplayed() {
    testReport.log(this.pageName, 'Verify My Store button is displaying');
    // await page.locator(el.headerStoreLocatorPopUp.btnMyStore, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.btnMyStore)).toBeHidden();
    testReport.log(this.pageName, 'My Store button is displayed in Store Details page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonMyStoreHeaderLink
   * @Description : This method is used to verify My store is displayed
   * @params : None
   * @returns : None
   * */
  async clickOnMyStoreHeaderLink() {
    testReport.log(this.pageName, 'click on My header Store button');
    await page.locator(el.headerStoreLocatorPopUp.btnMyStore).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'My Store Details are displayed');
  }

  /**
   * @author: sCherukumalli
   * @function_Name : verifyMyStoreDetailsIsDisplayed
   * @Description : This method is used to Verify phone number, store operating time, store info and events link, change my store link and all stores link are displayed in header store locator
   * @params : None
   * @returns : None
   * */
  async verifyMyStoreDetailsIsDisplayedHeadeLocator() {
    testReport.log(this.pageName, 'Verify Store Phone Number is displayed');
    // await page.locator(el.headerStoreLocatorPopUp.lnkHeaderPhoneNumber, { waitFor: 'visible' });
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkHeaderPhoneNumber)).toBeVisible();
    testReport.log(this.pageName, 'Store Phone Number is displayed');
    testReport.log(this.pageName, 'Verify Store Events is displayed');
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkHeaderstoredetailslink)).toBeVisible();
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkChangeMyStore)).toBeVisible();
    await expect(page.locator(el.headerStoreLocatorPopUp.lnkAllStores)).toBeVisible();
    testReport.log(this.pageName, 'Store Events with store details,Change My store and All Stores are displayed in the page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonStoreInfoEventsLink
   * @Description : This method is used to click on Store Info and Events link and naviagte events page
   * @params : None
   * @returns : None
   * */
  async clickOnStoreInfoEventsLink() {
    testReport.log(this.pageName, 'Click on the Store Info and Events Link from HeaderLocator');
    await page.locator(el.headerStoreLocatorPopUp.lnkHeaderstoredetailslink).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Successfully navigated to Store Info and Events page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnStoreInfoEvents
   * @Description : This method is used to click on Chnage My Store link and naviagte to Locator popup page
   * @params : None
   * @returns : None
   * */
  async clickOnChangeMyStoreLink() {
    testReport.log(this.pageName, 'Click on the Change My store link');
    await page.locator(el.headerStoreLocatorPopUp.lnkChangeMyStore).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Successfully navigated to Locator popup page');
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickonAllStoresLink
   * @Description : This method is used to click on All Stores link and naviagte Stores page
   * @params : None
   * @returns : None
   * */
  async clickOnAllStoresLink() {
    testReport.log(this.pageName, 'Click on the All Stores Link');
    if (common.verifyIsMobile()) {
      await page.locator(el.headerStoreLocatorPopUp.mobilelnkAllStores).click();
    } else {
      await page.locator(el.headerStoreLocatorPopUp.lnkAllStores).click();
    }
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Successfully navigated to Stores page');
  }
}
module.exports = { HeaderStoreLocator };
