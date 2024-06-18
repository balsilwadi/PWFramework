const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class DTPUserLoginPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'CatalogPreferencePage';
  }

  /**
   * @function : verifyAccountSettingPageForDTPLogin
   * @Description : validate dtp message, change passowrd only field is displaying on account settings page for DTP customer
   * @Params: None
   * @Returns: none
   */
  async verifyAccountSettingPageForDTPLogin() {
    await page.waitForLoadState('load');
    if (await page.locator(el.accountPage.txtAccountSettingsEmail).isVisible())
      testReport.log(this.pageName, 'User environment is not set to User 4, hence unable to validate the dtp account login');
    else {
      await expect(page.locator(el.accountSettingsPage.lblAccountSettingsheader)).toHaveText(
        td.accountSettingsPage.accountSettingsHeader,
        '{ignoreCase : true}'
      );
      await expect(page.locator(el.accountSettingsPage.lblUpdatePassword)).toHaveText(td.accountSettingsPage.updatePasswordHeader);
      await expect(page.locator(el.accountSettingsPage.lblUpdatePasswordDTP)).toHaveText(td.accountSettingsPage.updatePasswordMessage);
      await expect(page.locator(el.accountSettingsPage.lblDTPEmailMsg)).toHaveText(td.accountSettingsPage.updatePasswordMsgDTP);
      await expect(page.locator(el.accountSettingsPage.lblOriginalPassword)).toHaveText(td.accountSettingsPage.originalPassword);
      await expect(page.locator(el.accountSettingsPage.lblNewPassword)).toHaveText(td.accountSettingsPage.newPassword);
      await expect(page.locator(el.accountSettingsPage.txtOriginalPassword)).toBeVisible();
      await expect(page.locator(el.accountSettingsPage.txtNewPassword)).toBeVisible();
      await expect(page.locator(el.accountSettingsPage.btnApplyChangesPassworDTP)).toBeVisible();

      // verify email field is not displaying
      await expect(page.locator(el.accountSettingsPage.txtNewEmail)).toBeHidden();
      testReport.log(this.pageName, 'Verified Account Settings page for DTP Customer');
    }
  }

  /**
   * @function : verifyBillingAddressPageForDTPLogin
   * @Description : validate billing address page for DTP customer
   * @Params: None
   * @Returns: none
   */

  async verifyBillingAddressPageForDTPLogin() {
    await expect(page.locator(el.addAddress.lblBillingAddressHeader)).toHaveText(td.myaccountpage_address.billingaddress_header, '{ignoreCase:true}');
    await expect(page.locator(el.addAddress.lblDTPBillingAddressMessage)).toHaveText(td.myaccountpage_address.dtpBillingAddressMsg);
    await expect(page.locator(el.addAddress.lblDTPBillingAddressTitle)).toHaveText(td.myaccountpage_address.dtpBillingAddressTitle);
    const address = page.locator(el.addAddress.lblDTPBillingAddress);
    await expect(address).toHaveText(env.ACNT_DTP_BILLINGADDRESS);

    // verify billing address edit fields are not displaying
    await expect(page.locator(el.addAddress.txtAddShippingAddressFname)).toBeHidden();
    testReport.log(this.pageName, 'Verified Billing Address page for DTP Customer');
  }
}

module.exports = new DTPUserLoginPage();
