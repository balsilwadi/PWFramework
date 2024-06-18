/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();
class StorePickupPage {
  /**
   * @author: balsilwadi
   * @function_Name : clickLearnMorePickUpButton
   * @Description : This method is used to click on the learn more under the ORDER ONLINE PICK UP IN STORE section on the store locator page
   * @params : None
   * @returns : None
   * */
  async clickLearnMorePickUpButton() {
    testReport.log(this.pageName, 'Clicking on the learn more button');
    await page.click("//div[@class = 'store-service-block'][2]/a");
    testReport.log(this.pageName, 'Learn more button clicked');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyHeader1
   * @Description : This method is to verify the main header on the store pickup page
   * @params : expectedHeader
   * @returns : None
   * */
  async verifyHeader1(expectedHeader) {
    testReport.log(this.pageName, 'Verifying the Header1 tag');
    await expect(page.locator(el.SITECOMMON.lblH1)).toContainText(expectedHeader);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateFAQSection
   * @Description : This method is validate that the FAQ is displayed and working as expected
   * @params : None
   * @returns : None
   * */
  async validateFAQSection() {
    testReport.log(this.pageName, `Verifying the FAQ Section`);
    testReport.log(this.pageName, `Verifying the FAQ Section headers`);
    const optionHeader1 = page.locator(el.storePickupPage.txtPickUpFAQ).nth(0);
    await expect(optionHeader1).toContainText('free store pickup');
    const optionHeader2 = page.locator(el.storePickupPage.txtPickUpFAQ).nth(1);
    await expect(optionHeader2).toContainText('free ship to store');
    const optionHeader3 = page.locator(el.storePickupPage.txtPickUpFAQ).nth(2);
    await expect(optionHeader3).toContainText('free warehouse pickup');
    testReport.log(this.pageName, `Verifying the store FAQ link`);
    await page.click(el.storePickupPage.lnkStorePickupFAQ);
    await page.waitForSelector(el.storePickupPage.lblFAQPopup);
    const storeFaqLink = await page.locator(el.storePickupPage.lblFAQPopupHeader).textContent();
    expect(storeFaqLink.toLowerCase()).toBe('store pickup faq');
    testReport.log(this.pageName, `The store FAQ link is displayed`);
    await page.click(el.storePickupPage.btnCloseFAQPopup);
    testReport.log(this.pageName, `Verifying the warehouse FAQ link`);
    await page.click(el.storePickupPage.lnkWarehousePickupFAQ);
    await page.waitForSelector(el.storePickupPage.lblFAQPopup);
    const warehosueFaqLink = await page.locator(el.storePickupPage.lblFAQPopupHeader).textContent();
    await expect(warehosueFaqLink.toLowerCase()).toBe('warehouse pickup faq');
    testReport.log(this.pageName, `The warehosue FAQ link is displayed`);
    await page.click(el.storePickupPage.btnCloseFAQPopup);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreListHeader
   * @Description : This method is to verify the Header above the store list section
   * @params : None
   * @returns : None
   * */
  async validateStoreListHeader() {
    testReport.log(this.pageName, `Verifiying the header is displayed as expected`);
    await expect(page.locator(el.storePickupPage.lblStoreListHeader)).toContainText('All Store and Warehouse Locations');
    testReport.log(this.pageName, `The header is displayed as expected`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateUSStoreList
   * @Description : This method is to verify the US Store list on the store pickup page
   * @params : None
   * @returns : None
   * */
  async validateUSStoreList() {
    testReport.log(this.pageName, `Valdiating US Store locations`);
    const storeLocation = page.locator(el.storePickupPage.lblStoresUSLocation);
    const storeButton = page.locator(el.storePickupPage.btnStoresUSLocation);

    // Check initial state (drawer closed)
    await common.forcedWait(this.pageName, 2000);
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'true');

    // Open the drawer
    await storeButton.click();
    // Wait for the drawer to open
    await common.forcedWait(this.pageName, 2000);
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'false');

    // Close the drawer
    await storeButton.click();
    // Wait for the drawer to close
    await common.forcedWait(this.pageName, 2000);
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'true');
    this.viewStoreInfoValidation('US Stores');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateCAStoreList
   * @Description : This method is to verify the CA Store list on the store pickup page
   * @params : None
   * @returns : None
   * */
  async validateCAStoreList() {
    testReport.log(this.pageName, `Valdiating Canada Store locations`);
    const storeLocation = page.locator(el.storePickupPage.lblStoresCALocation);
    const storeButton = page.locator(el.storePickupPage.btnStoresCALocation);

    // Check initial state (drawer closed)
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'true');

    // Open the drawer
    await storeButton.click();
    // Wait for the drawer to open
    await common.forcedWait(this.pageName, 2000);
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'false');
    // Close the drawer
    await storeButton.click();
    // Wait for the drawer to close
    await common.forcedWait(this.pageName, 2000);
    await expect(storeLocation).toHaveAttribute('aria-hidden', 'true');
    this.viewStoreInfoValidation('CA Stores');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateUSWarehouseList
   * @Description : This method is to verify the store/warehouse locations and the store list
   * @params : None
   * @returns : None
   * */
  async validateUSWarehouseList() {
    testReport.log(this.pageName, `Valdiating US Warehouse locations`);
    const warehouseLocation = page.locator(el.storePickupPage.lblWarehouseUSLocation);
    const warehouseButton = page.locator(el.storePickupPage.btnWarehouseUSLocation);

    // Check initial state (drawer closed)
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'true');

    // Open the drawer
    await warehouseButton.click();
    // Wait for the drawer to open
    await common.forcedWait(this.pageName, 2000);
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'false');

    // Close the drawer
    await warehouseButton.click();
    // Wait for the drawer to close
    await common.forcedWait(this.pageName, 2000);
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'true');

    this.viewStoreInfoValidation('US Warehouse');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateCAWarehouseList
   * @Description : This method is to verify the store/warehouse locations and the store list
   * @params : None
   * @returns : None
   * */
  async validateCAWarehouseList() {
    testReport.log(this.pageName, `Valdiating Canada Warehouse locations`);

    const warehouseLocation = page.locator(el.storePickupPage.lblWareHouseCALocation);
    const warehouseButton = page.locator(el.storePickupPage.btnWareHouseCALocation);

    // Check initial state (drawer closed)
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'true');

    // Open the drawer
    await warehouseButton.click();
    // Wait for the drawer to open
    await common.forcedWait(this.pageName, 2000);
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'false');

    // Close the drawer
    await warehouseButton.click();
    // Wait for the drawer to close
    await common.forcedWait(this.pageName, 2000);
    await expect(warehouseLocation).toHaveAttribute('aria-hidden', 'true');

    // Validates functionality
    this.viewStoreInfoValidation('CA Warehouse');
  }

  /**
   * @author: balsilwadi
   * @function_Name : viewStoreInfoValidation
   * @Description : This method is to click on view store detail and verify it takes you to the corresponding store details page
   * @params : location
   * @returns : None
   * */
  async viewStoreInfoValidation(location) {
    let buttonLocation;
    let btnExpand;
    let lblStoreName;
    let btnViewDetails;

    switch (location) {
      case 'US Stores':
        testReport.log(this.pageName, `Validating US Stores, view store detail button`);
        buttonLocation = el.storePickupPage.btnStoresUSLocation;
        btnExpand = el.storePickupPage.btnExpandStoreUS;
        lblStoreName = el.storePickupPage.lblStoreNameUS;
        btnViewDetails = el.storePickupPage.btnViewStoreDetailsUS;
        break;
      case 'CA Stores':
        testReport.log(this.pageName, `Validating CA Stores, view store detail button`);
        buttonLocation = el.storePickupPage.btnStoresCALocation;
        btnExpand = el.storePickupPage.btnExpandStoreCA;
        lblStoreName = el.storePickupPage.lblStoreNameCA;
        btnViewDetails = el.storePickupPage.btnViewStoreDetailsCA;
        break;
      case 'US Warehouse':
        testReport.log(this.pageName, `Validating US Warehouse, view store detail button`);
        buttonLocation = el.storePickupPage.btnWarehouseUSLocation;
        btnExpand = el.storePickupPage.btnExpandWarehouseUS;
        lblStoreName = el.storePickupPage.lblWarehouseNameUS;
        btnViewDetails = el.storePickupPage.btnViewWarehouseDetailsUS;
        break;
      case 'CA Warehouse':
        testReport.log(this.pageName, `Validating CA Warehouse, view store detail button`);
        buttonLocation = el.storePickupPage.btnWareHouseCALocation;
        btnExpand = el.storePickupPage.btnExpandWarehouseCA;
        lblStoreName = el.storePickupPage.lblWarehouseNameCA;
        btnViewDetails = el.storePickupPage.btnViewWarehouseDetailsCA;
        break;
      default:
        throw new Error('Available store/warehouse locations are US Stores|CA Stores|US Warehouse|CA Warehouse');
    }

    await this.validateStoreInfo(buttonLocation, btnExpand, lblStoreName, btnViewDetails);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateStoreInfo
   * @Description : This method is to click on view store detail and verify it takes you to the corresponding store details page
   * @params : buttonLocation, btnExpand, lblStoreName, btnViewDetails
   * @returns : None
   * */
  async validateStoreInfo(buttonLocation, btnExpand, lblStoreName, btnViewDetails) {
    await page.click(buttonLocation);
    if (common.verifyIsMobile()) {
      await page.click(btnExpand);
    }

    const expectedStoreName = await page.locator(lblStoreName).nth(0).textContent();

    await page.locator(btnViewDetails).nth(0).click();
    await page.waitForLoadState('load');
    let retrivedStoreName = await page.locator(el.SITECOMMON.lblH1).textContent();
    retrivedStoreName = retrivedStoreName.toLowerCase();

    expect(expectedStoreName.toLowerCase()).toBe(retrivedStoreName);
    await page.goBack();
    await page.waitForLoadState('load');
    await page.reload();
  }
}
module.exports = { StorePickupPage };
