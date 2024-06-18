const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class CustomerService extends PageObject {
  constructor() {
    super();
    this.pageName = 'CustomerServicePage';
    this.lnkTrackOrder =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(1) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(1)";
    this.lnkStartReturn =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(2) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(2)";
    this.lnkSchDelivery =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(3) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(3)";
    this.lnkGiftCC =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(4) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(4)";
    this.lnkCBCC =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(5) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(5)";
    this.lnkMngAccount =
      "div[class*='cs-home-self-help'] div.cs-home-menu:nth-of-type(6) a, div[class='customer-service-layout-container'] div.option-links:nth-of-type(1) a:nth-of-type(6)";
  }

  /**
   * @author: krishna
   * @function_Name : navigateToCustomerService
   * @Description : navigates to customer service link left nav menu
   * @params : None
   * @returns : None
   */
  async navigateToCustomerService() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await page.locator(el.accountPage.lnkCustomerService).click();
    testReport.log(this.pageName, 'Clicked on customer service link');
  }

  /**
   * @author: krishna
   * @function_Name : verifyCustomerServicePageisLaunched
   * @Description : verify whether the customer service page is launched
   * @params : None
   * @returns : None
   */
  async verifyCustomerServicePageisLaunched() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/customer-service/);
    testReport.log(this.pageName, 'Customer service page is launched as expected');
  }

  /**
   * @author: krishna
   * @function_Name : verifyOrderTrackingLink
   * @Description : verify link is navigating toorder tracking page
   * @params : None
   * @returns : none
   */
  async verifyOrderTrackingLink() {
    await expect(page.locator(this.lnkTrackOrder)).toHaveText(env.ACNT_LNK_TRACKORDER, { ignoreCase: true });
    await page.locator(this.lnkTrackOrder).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/order-tracking/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifyStartReturnsLink
   * @Description : verify link is navigating to start returns page
   * @params : None
   * @returns : none
   */
  async verifyStartReturnsLink() {
    await expect(page.locator(this.lnkStartReturn)).toHaveText(env.ACNT_LNK_STARTRETURN, { ignoreCase: true });
    await page.locator(this.lnkStartReturn).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/returns/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifySchDeliveryLink
   * @Description : verify link is navigating to schedule delivery page
   * @params : None
   * @returns : none
   */
  async verifySchDeliveryLink() {
    await expect(page.locator(this.lnkSchDelivery)).toHaveText(env.ACNT_LNK_SCHDELIVERY, { ignoreCase: true });
    await page.locator(this.lnkSchDelivery).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/order-tracking/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifyGCBalanceLink
   * @Description : verify link is navigating to GC balance page
   * @params : None
   * @returns : none
   */
  async verifyGCBalanceLink() {
    await expect(page.locator(this.lnkGiftCC)).toHaveText(env.ACNT_LNK_GCBALANCE, { ignoreCase: true });
    await page.locator(this.lnkGiftCC).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/gift-cards/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifyCBCCLink
   * @Description : verify link is navigating to GC balance page
   * @params : None
   * @returns : none
   */
  async verifyCBCCLink() {
    await expect(page.locator(this.lnkCBCC)).toHaveText(env.ACNT_LNK_CBCC, { ignoreCase: true });
    await page.locator(this.lnkCBCC).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/rewards/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifyMngAccountLink
   * @Description : verify link is navigating to account page
   * @params : None
   * @returns : none
   */
  async verifyMngAccountLink() {
    if (env.EXEC_SITE.includes('us')) {
      await expect(page.locator(this.lnkMngAccount)).toHaveText(env.ACNT_LNK_MNGACNT, { ignoreCase: true });
      await page.locator(this.lnkMngAccount).click();
    } else {
      await expect(page.locator(this.lnkCBCC)).toHaveText(env.ACNT_LNK_MNGACNT, { ignoreCase: true });
      await page.locator(this.lnkCBCC).click();
    }
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/account/);
    await page.goBack();
    await page.waitForLoadState('load', { timeout: 60000 });
  }
}
module.exports = new CustomerService();
