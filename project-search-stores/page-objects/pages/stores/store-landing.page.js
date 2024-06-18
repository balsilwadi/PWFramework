/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const ENV = require('../../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class StoreLandingPage {
  /**
   * @author: vtharakan
   * @function_Name : clickOnViewAllStoresAndFacilities
   * @Description : This method is used to click on the View All Stores and Facilities link
   * @params : None
   * @returns : None
   * */
  async clickOnViewAllStoresAndFacilities() {
    if (ENV.EXEC_SITE.includes('crate')) {
      testReport.log(this.pageName, 'Click on the View All Stores and Facilities link');
      await page.click(el.storesPage.lnkViewAllStoresAndFacilities);
    } else if (ENV.EXEC_SITE === 'cb2us') {
      testReport.log(this.pageName, 'Click on the link View Stores By State');
      await page.locator(el.storesPage.lnkViewStoresByStateCB2).click();
    }
    await page.waitForLoadState('load');
    // await page.waitForTimeout(1000);
    await common.forcedWait(this.pageName, 1000);
    await page.reload();
    if (ENV.EXEC_SITE.includes('us')) {
      expect(page.url({ timeout: 6000 })).toContain('/list-state/retail-stores');
    } else {
      expect(page.url({ timeout: 6000 })).toContain('/list-province/canada-stores');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToStoreLandingPage
   * @Description : This method is used to navigate to the Store Landing page
   * @params : None
   * @returns : None
   * */
  async navigateToStoreLandingPage() {
    testReport.log(this.pageName, 'Navigate to Store Landing page');
    const currentUrl = page.url();
    let homeUrl = new URL(currentUrl);
    homeUrl = homeUrl.hostname;
    await page.goto(`https://${homeUrl}/stores/`, { timeout: 60000 });
    testReport.log(this.pageName, 'Successfully navigated to Store Landing page');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreFeatures
   * @Description : Validate Free Design Services, Buy Online Pickup in Store, We're Hiring sections on the Crate store landing page
   * @params : storeFeature
   * @returns : None
   * */
  async validateStoreFeatures(storeFeature) {
    switch (storeFeature) {
      case 'Free Design Services': {
        testReport.log(this.pageName, 'Validating Free Design Services section');
        await page.locator(el.storeLandingPage.lblFeatureCards).nth(0).isVisible();
        await page.locator(el.storeLandingPage.btnFeatureCards).nth(0).click();
        expect(page.url()).toContain('interior-design/');
        await page.goBack();
        break;
      }
      case 'Buy Online Pickup in Store': {
        testReport.log(this.pageName, 'Validating Buy Online Pickup in Store section');
        await page.waitForLoadState('load');
        await page.locator(el.storeLandingPage.lblFeatureCards).nth(1).isVisible();
        await page.locator(el.storeLandingPage.btnFeatureCards).nth(1).click();
        await expect(page.locator(el.storeLandingPage.lblStorePickupFAQ)).toBeVisible();
        await page.locator(el.storeLandingPage.btnCloseStorePickupFAQ).click();

        break;
      }
      case "We're Hiring": {
        testReport.log(this.pageName, 'Validating Were Hiring section');
        await page.locator(el.storeLandingPage.lblFeatureCards).nth(2).isVisible();
        await page.locator(el.storeLandingPage.btnFeatureCards).nth(2).click();
        expect(page.url()).toContain('jobs.crateandbarrel');
        await page.goBack();
        break;
      }
      case 'STORE SERVICES': {
        testReport.log(this.pageName, 'Validating Store services in Store section');
        await page.waitForLoadState('load');
        await page.locator(el.storeLandingPage.lblCB2StoreService).nth(0).isVisible();
        await page.locator(el.storeLandingPage.lnkCB2StoreService).nth(0).click();
        expect(page.url()).toContain('/store-services');
        await page.goBack();

        break;
      }
      case 'ORDER ONLINE PICK UP IN STORE': {
        testReport.log(this.pageName, 'Validating Buy Online Pickup in Store section');
        await page.locator(el.storeLandingPage.lblCB2StoreService).nth(1).isVisible();
        await page.locator(el.storeLandingPage.lnkCB2StoreService).nth(1).click();

        await page.waitForLoadState('load');
        if (ENV.BASE_URL.includes('cb2.ca')) expect(page.url()).toContain('/store-services');
        else expect(page.url()).toContain('/stores/store-pickup');

        await page.goBack();
        break;
      }
      default:
        throw new Error("Please use Free Design Services|Buy Online Pickup in Store|We're Hiring");
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : enterZipcode
   * @Description : entering a zipcode into the Store landing Page zipcode input box
   * @params : zipcode
   * @returns : None
   * */
  async enterZipcode(zipcode) {
    testReport.log(this.pageName, `Entering ${zipcode} into zipcode box`);
    await page.locator(el.storeLandingPage.txtZipCode).fill('');
    await page.locator(el.storeLandingPage.txtZipCode).fill(zipcode);
    await page.locator(el.storeLandingPage.btnFind).nth(0).click();
    await common.forcedWait(this.pageName, 2000);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyZipcodeEntry
   * @Description : After entering a zipcode in the store landing page, the header should change to match that zipcode
   * @params : zipcode
   * @returns : None
   * */
  async verifyZipcodeEntry(storeHeader) {
    testReport.log(this.pageName, `Validating store header is: ${storeHeader}`);
    await expect(page.locator(el.storeLandingPage.lblStoreListHeader)).toHaveText(storeHeader);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateGoogleMap
   * @Description : After entering a zipcode in the store landing page, the google map should be displayed
   * @params : None
   * @returns : None
   * */
  async validateGoogleMap() {
    testReport.log(this.pageName, `Validating Store map is displayed`);
    await expect(page.locator(el.storeLandingPage.storeMap)).toBeVisible();
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyStoresAreDisplayed
   * @Description : After entering a zipcode in the store landing page, the stores should be displayed
   * @params : None
   * @returns : None
   * */
  async verifyStoresAreDisplayed() {
    testReport.log(this.pageName, `Validating Stores are displayed`);
    const storeListCount = await page.locator(el.storeLandingPage.lblStore).count();
    const storeListLocator = page.locator(el.storeLandingPage.lblStore);
    const promises1 = [];
    for (let i = 0; i < storeListCount; i++) {
      promises1.push(await expect(storeListLocator.nth(i)).toBeVisible());
    }
    await Promise.all(promises1);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyStoresAreSorted
   * @Description : After entering a zipcode in the store landing page, the stores should be displayed
   * @params : None
   * @returns : None
   * */
  async verifyStoresAreSorted() {
    testReport.log(this.pageName, `Validating Stores are sorted by distance form zipcode location`);
    const storeListCount = await page.locator(el.storeLandingPage.lblStoreDistance).count();
    const listOfDistance = [];
    for (let i = 0; i < storeListCount; i++) {
      const distance = await page.locator(el.storeLandingPage.lblStoreDistance).nth(i).textContent();
      listOfDistance.push(Number(distance.replaceAll(/\D/g, '')));
    }
    expect(listOfDistance.sort((a, b) => a - b)).toBe(listOfDistance);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreInfo
   * @Description : Validate when store is clicked on the drawer opens with all store info and buttons
   * @params : None
   * @returns : None
   * */
  async validateStoreInfo() {
    testReport.log(this.pageName, `Validating Stores are displaying all information`);

    const storeCount = await page.locator(el.storeLandingPage.lblStore).count();
    const promises = [];
    for (let i = 0; i < storeCount; i++) {
      promises.push(page.locator(el.storeLandingPage.btnAllStoreDrawers).nth(i).click());
      promises.push(page.locator(el.storeLandingPage.lnkStoreLocation).isVisible());
      promises.push(page.locator(el.storeLandingPage.lnkStorePhone).isVisible());
      promises.push(page.locator(el.storeLandingPage.lblStoreHours).isVisible());
      promises.push(page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(0).isVisible());
      promises.push(page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(1).isVisible());
      promises.push(page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(2).isVisible());
      promises.push(page.locator(el.storeLandingPage.btnAllStoreDrawers).nth(i).click());
    }
    await Promise.all(promises);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreDetailsButton
   * @Description : validating that the stores details button navigates to the corresponding store
   * @params : None
   * @returns : None
   * */
  async validateStoreDetailsButton() {
    testReport.log(this.pageName, `Validating Store details button navigates user to stores details page`);
    const currentStore = await page.locator(el.storeLandingPage.lblStoreName).nth(0).textContent();
    await page.locator(el.storeLandingPage.btnAllStoreDrawers).nth(0).click();
    await page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(0).click();
    const storeHeader = await page.locator(el.storeDetailsPage.lblStoreName).textContent();
    await expect(currentStore.toLowerCase().includes(storeHeader.toLowerCase())).toBeTruthy();
    await page.goBack();
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateViewStoreEventButton
   * @Description : validating that the stores events button navigates to the corresponding store
   * @params : None
   * @returns : None
   * */
  async validateViewStoreEventButton() {
    testReport.log(this.pageName, `Validating store events button navigates user to stores details page`);
    await page.locator(el.storeLandingPage.btnAllStoreDrawers).nth(0).click();
    const currentStore = await page.locator(el.storeLandingPage.lblStoreName).nth(0).textContent();
    await page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(1).click();
    const storeHeader = await page.locator(el.storeDetailsPage.lblStoreName).textContent();
    expect(storeHeader.toLowerCase()).toBe(currentStore.toLowerCase());
    await page.goBack();
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateMyStoreButton
   * @Description : validating that when clicking Make this my store button, the store is selected as My Store
   * @params : None
   * @returns : None
   * */
  async validateMyStoreButton() {
    testReport.log(this.pageName, `Validating Make this my store button selects store as my store`);

    const storeCount = await page.locator(el.storeLandingPage.lblStore).count();
    const storeButtonIndex = ENV.BASE_URL.includes('cb2') ? 1 : 2;

    for (let i = 1; i < storeCount; i++) {
      const storeLocator = page.locator(el.storeLandingPage.btnAllStoreDrawers).nth(i);
      await storeLocator.click();
      await page.locator(el.storeLandingPage.btnListOfStoreButtons).nth(storeButtonIndex).click();
      await common.forcedWait(this.pageName, 1000);
      expect(await page.locator(el.storeLandingPage.lblMyStore).count()).toBe(1);
      await storeLocator.click();
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateMyStoreButton
   * @Description : validating that when clicking Make this my store button, the store is selected as My Store
   * @params : None
   * @returns : None
   * */
  async validateZipcodeError(expectedZipcodeError) {
    testReport.log(this.pageName, `Validating error message is displayed and equals ${expectedZipcodeError}`);

    const actualZipcodeError = await page.locator(el.storeLandingPage.lblZipCodeError).textContent();

    expect(actualZipcodeError.toLowerCase()).toBe(expectedZipcodeError.toLowerCase());
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStroeFilters
   * @Description : validating that when clicking Make this my store button, the store is selected as My Store
   * @params : None
   * @returns : None
   * */
  async validateStoreFilters() {
    const isMobile = common.verifyIsMobile();
    testReport.log(this.pageName, `Validating the store filters`);
    const filterCount = await page.locator(el.storeLandingPage.btnStoreFilters).count();
    for (let i = 0; i < filterCount / 2; i++) {
      if (isMobile) {
        await page.locator(el.storeLandingPage.btnMobileFilterButton).click();
        await page.locator(el.storeLandingPage.btnStoreFilters).nth(i).click();
        await page.locator(el.storeLandingPage.btnCloseFilter).click();
      } else {
        await page.locator(el.storeLandingPage.btnStoreFilters).nth(i).click();
      }
      await expect(page.locator(el.storeLandingPage.btnStoreFilters).nth(i)).toBeChecked();
      const expectedStoreCount = await page.locator(el.storeLandingPage.btnStoreFilterCount).nth(i).textContent();
      const actualStoreCount = await page.locator(el.storeLandingPage.lblStore).count();
      expect(Number(expectedStoreCount.replaceAll(/\D/g, ''))).toBe(actualStoreCount);
      if (isMobile) {
        await page.locator(el.storeLandingPage.btnMobileFilterButton).click();
        await page.locator(el.storeLandingPage.btnStoreFilters).nth(i).click();
        await page.locator(el.storeLandingPage.btnCloseFilter).click();
      } else {
        await page.locator(el.storeLandingPage.btnStoreFilters).nth(i).click();
      }
    }
    testReport.log(this.pageName, `Filters are looking good`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : clickOnCB2USStoreLinks
   * @Description : Clicking on store navigation links on CB2 US stores landing page
   * @params : None
   * @returns : None
   * */
  async clickOnCB2StoreLinks(link) {
    if (link === 'View All Stores') await page.locator(el.storeLandingPage.btnCB2ViewAllStores).click();
    else if (link === 'View Stores by State') await page.locator(el.storeLandingPage.btnCB2StoresByState).click();
    else if (link === 'View Canada Warehouses') await page.locator(el.storeLandingPage.btnCB2CanadaWarehouse).nth(0).click();
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateWindowSwitch
   * @Description :
   * @params : button
   * @returns : None
   * */
  async validateWindowSwitch(button, expectedURL) {
    const buttonLocator = button === 'VIEW U.S. WAREHOUSES' ? el.storeLandingPage.btnCB2USWarehouse : el.storeLandingPage.btnFirstUSStore;
    const storeName = await page.locator(el.storeLandingPage.lblFirstUSStore).nth(0).textContent();
    const [newWindow] = await Promise.all([global.context.waitForEvent('page'), await page.locator(buttonLocator).nth(0).click()]);
    if (button !== 'VIEW U.S. WAREHOUSES') {
      const actualStore = await newWindow.locator(el.SITECOMMON.lblH1).nth(0).textContent();
      expect(actualStore.toLowerCase()).toContain(storeName.toLowerCase());
    }
    await newWindow.waitForLoadState('load');
    expect(newWindow.url()).toContain(expectedURL);
    await newWindow.close();
  }

  /**
   * @author: balsilwadi
   * @function_Name : getFirstStore
   * @Description :
   * @params : button
   * @returns : None
   * */
  async getFirstStore() {
    const firstStore = await page.locator(el.storeLandingPage.lblFirstCAStore).nth(0).textContent();
    return firstStore;
  }

  /**
   * @author: balsilwadi
   * @function_Name : clickOnFirstStore
   * @Description :
   * @params : button
   * @returns : None
   * */
  async clickOnFirstStore() {
    await page.locator(el.storeLandingPage.lblFirstCAStore).nth(0).click();
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreNavigation
   * @Description :
   * @params : button
   * @returns : None
   * */
  async validateStoreNavigation(storeName) {
    const header1 = await page.locator(el.SITECOMMON.lblH1).textContent();
    await expect(header1.toLowerCase()).toBe(storeName.toLowerCase());
  }
}
module.exports = { StoreLandingPage };
