const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class MyStoresPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'MyStoresPage';
    this.txtZipcode = 'input#keyword';
    this.btnFind = "//button[text()='Find']";
    this.btnFirstStore = 'div.store-list-container > div:nth-of-type(2) button';
    this.btnMakeMyStore = "//button[text()='Make This My Store']";
    this.lblStoreName = "div.store-list-container > div:nth-of-type(2) button span[class*='store-name']";
    this.lblMyStore = "div.store-list-container > div:nth-of-type(2) button span[class*='my-store text']";
    this.lblStoreNameinPDP = "span[class*='store-title']";
    this.lblStoreHeading = "h1[class*='store-location']";
    this.chkCanadaStores = "label[for='CanadaStores']";
    this.btnFilter = "button[class*='filter-toggle-button']";
    this.btnFilterApply = "[data-testid*='filter-panel-footer'] > button";
  }

  /**
   * @author: krishna
   * @function_Name : navigateToMyStores
   * @Description : Customer navigates to "My Stores" left nav menu
   * @params : None
   * @returns : None
   */
  async navigateToMyStores() {
    await page.waitForLoadState('load', { timeout: 60000 });
    if (env.EXEC_SITE.includes('crateus')) {
      await page.locator(el.accountPage.lnkMyStoreCrate).click();
    } else if (env.EXEC_SITE.includes('cratecan')) {
      await page.locator(el.accountPage.lnkMyStoreCrateCA).click();
    } else if (env.EXEC_SITE.includes('cb2can')) {
      await page.locator(el.accountPage.lnkMyStoreCB2CA).click();
    } else {
      await page.locator(el.accountPage.lnkMyStoreCB2).click();
    }
  }

  /**
   * @author: krishna
   * @function_Name : verifyStoresPageisLaunched
   * @Description : verify whether the stores page is launched
   * @params : None
   * @returns : None
   */
  async verifyStoresPageisLaunched() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/stores/);
    testReport.log(this.pageName, 'Stores page is launched as expected');
  }

  /**
   * @author: krishna
   * @function_Name : verifyStoreinPDP
   * @Description : verify whether the customer chosen store is getting displayed in PDP
   * @params : storeName to compare it with store name in PDP
   * @returns : None
   */
  async verifyStoreinPDP(storeName) {
    // navigat to PDP
    await page.goto(env.ACNT_STORE_NAME);
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.lblStoreNameinPDP)).toHaveText(`${storeName}:`, { ignoreCase: true });
    testReport.log(this.pageName, 'Store name displayed as expected in PDP');
  }

  /**
   * @author: krishna
   * @function_Name : selectTheStore
   * @Description : search for a store and select it
   * @params : None
   * @returns : customer selected store name from stores page
   */
  async selectTheStore() {
    if (env.EXEC_SITE.includes('us')) {
      await page.fill(this.txtZipcode, td.storePage.txtZipcode);
      await page.locator(this.btnFind).click();
      await page.waitForLoadState('load');
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2000);
    }
    if (env.EXEC_SITE.includes('ca')) {
      if (common.verifyIsMobile()) {
        await page.locator(this.btnFilter).click();
        await page.locator(this.chkCanadaStores).nth(0).click();
        await page.locator(this.btnFilterApply).nth(1).click();
      } else {
        await page.locator(this.chkCanadaStores).nth(0).click();
      }
      expect(page.url()).toContain('storefilter=CanadaStores');
      testReport.log(this.pageName, 'Clicked on Canada Stores checkbox');
    }
    // select the first store as My Store
    const storeName = page.innerText(this.lblStoreName);
    await page.locator(this.btnFirstStore).click();
    await page.locator(this.btnMakeMyStore).click();
    // verify My Store tag is added
    await expect(page.locator(this.lblMyStore)).toHaveText(td.storePage.lblStore, { ignoreCase: true });
    testReport.log(this.pageName, 'My Store is chosen successfully');
    return storeName;
  }

  /**
   * @author: krishna
   * @function_Name : verifyCustomerStoreinStoresPage
   * @Description : verify whether the customer chosen store is displaying in the stores page
   * @params : None
   * @returns : None
   */
  async verifyCustomerStoreinStoresPage(storeName) {
    await expect(page.locator(this.lblStoreHeading)).toHaveText(storeName, { ignoreCase: true });
    testReport.log(this.pageName, 'Selected store is getting displayed in the stores page');
  }
}
module.exports = new MyStoresPage();
