const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

class AccountPage extends PageObject {
  pageName = this.constructor.name;

  async validateMyAccountPage() {
    page.setDefaultTimeout(200000);
    await page.waitForLoadState('load', { timeout: 180000 });
    await expect(page.locator(el.accountPage.lblUsername)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(el.accountPage.lblUsername)).toContainText('Hi');
    testReport.log('Customer successfully logged in');
  }

  async navigateToAccountSettings() {
    await page.waitForLoadState('load');
    if (common.verifyIsMobile()) await page.locator(el.accountPage.lnkAccountSettingsMobile).click();
    else await page.locator(el.accountPage.lnkAccountSettings).click();
  }

  async navigateToPaymentPage() {
    if (common.verifyIsMobile()) await page.locator(el.accountPage.lnkPaymentsMobile).click();
    else await page.locator(el.accountPage.lnkPayments).click();
  }

  async navigateToPaymentLink() {
    await page.goto(`${env.BASE_URL}/account/edit-saved-payments`);
    await page.waitForLoadState();
  }

  async navigateToAddressPage() {
    if (common.verifyIsMobile()) await page.locator(el.accountPage.btnAddressMobile).click();
    else await page.locator(el.accountPage.btnAddress).click();
  }

  async clickOnSignOut() {
    if (common.verifyIsMobile()) await page.locator(el.accountPage.lnkSignOutMobile).click();
    else await page.locator(el.accountPage.lnkSignOut).click();
    testReport.log(this.pageName, 'Signed out from the MyAccount page');
  }

  async navigateToMyFavoritesPage() {
    await page.goto(`${env.BASE_URL}/favorites`);
    await page.waitForLoadState();
  }

  async navigateToPDP(pdpLink) {
    await page.goto(pdpLink);
    await page.waitForLoadState();
  }

  async navigateToDesignServicesPage() {
    if (common.verifyIsMobile()) {
      await page.locator(el.accountPage.btnMyAccount).click();
    }
    await expect(page.locator(el.accountPage.lnkDesignPackage)).toBeVisible({ timeout: 60000 });
    await page.locator(el.accountPage.lnkDesignPackage).click();
    testReport.log(this.pageName, 'Navigated to Design Services page');
  }

  async navigateToRewardsPage() {
    if (common.verifyIsMobile()) {
      await page.locator(el.accountPage.btnMyAccount).click();
    }
    if (env.EXEC_SITE.includes('can')) {
      await expect(page.locator(el.accountPage.lnkRewards)).toBeHidden();
      testReport.log('Rewards Page', 'Rewards page is not visible on CA site as expected');
    } else {
      await expect(page.locator(el.accountPage.lnkRewards)).toBeVisible({ timeout: 60000 });
      await page.locator(el.accountPage.lnkRewards).click();
      testReport.log(this.pageName, 'Navigated to Rewards page');
    }
  }

  async navigateToRewardsLink() {
    await page.goto(`${env.BASE_URL}/account/rewards`);
    await page.waitForLoadState();
  }

  async clickOnPreferencesSubscriptions() {
    await expect(page.locator(el.accountPage.btnPreferences)).toBeVisible({ timeout: 60000 });
    await page.locator(el.accountPage.btnPreferences).click();
    testReport.log(this.pageName, 'Clicked on Preferences/Subscription in left account nav');
  }

  async navigateToCatalogPreferencePage() {
    this.clickOnPreferencesSubscriptions();
    await expect(page.locator(el.accountPage.lnkCatalogSubscriptions)).toBeVisible({ timeout: 60000 });
    await page.locator(el.accountPage.lnkCatalogSubscriptions).click();
    testReport.log(this.pageName, 'Clicked on Catalog Subscription option in account left nav');
  }

  async goToMyAccount() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    testReport.log(this.pageName, 'Navigate to My Account page');
    await page.goto(`${env.BASE_URL}/account`);
    await page.waitForLoadState();
  }

  async navigateToManageMyCBCC() {
    if (common.verifyIsMobile()) {
      await page.locator(el.accountPage.btnMyAccount).click();
    }
    if (env.EXEC_SITE.includes('can')) {
      await expect(page.locator(el.accountPage.lnkManageCBCC)).toBeHidden();
      testReport.log('Crate & Barrel Credit Card/CB2 CREDIT CARD link is not applicable for CA sites');
    } else {
      await expect(page.locator(el.accountPage.lnkManageCBCC)).toBeVisible({ timeout: 60000 });
      await page.locator(el.accountPage.lnkManageCBCC).click();
      testReport.log(this.pageName, 'Navigated to Manage My CBCC');
    }
  }
}
module.exports = { AccountPage };
