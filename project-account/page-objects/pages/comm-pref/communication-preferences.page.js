const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
class CommunicationPreferencePage extends PageObject {
  constructor() {
    super();
    this.pageName = 'CommunicationPreferencePage';
  }

  /**
   * @author: krishna
   * @function_Name : clickOnPreferencesLink
   * @Description :  Click on the Preferences / subscription link in account page
   * @params : none
   * @returns : None
   * */
  async clickOnPreferencesLink() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await page.locator(el.accountPage.btnPreferences).click();
  }

  /**
   * @author: krishna
   * @function_Name : clickOnEmailandTextLink
   * @Description :  Click on the Email and Text Preferences link in account page
   * @params : none
   * @returns : None
   * */
  async clickOnEmailandTextLink() {
    if (common.verifyIsMobile()) await page.locator(el.accountPage.lnkEmailPreferencesMobile).click();
    else await page.locator(el.accountPage.lnkEmailPreferences).click();
    testReport.log(this.pageName, 'Clicked on Email and Text Preferences link');
  }

  /**
   * @author: krishna
   * @function_Name : verifyCommPrefPage
   * @Description :  Verifywhether communication preferences page is displaying
   * @params : none
   * @returns : None
   * */
  async verifyCommPrefPage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveURL(/communication-preferences/);
    testReport.log(this.pageName, 'Communication preferences page is displaying as expected');
  }

  /**
   * @author: krishna
   * @function_Name : verifyEmailandtextDrawer
   * @Description :  Verifies the content on email and text drawer
   * @params : none
   * @returns : None
   * */
  async verifyEmailandTextDrawer() {
    await expect(page.locator(el.commPref.lblHeader)).toHaveText(env.ACNT_PREF_LABEL);
    if (env.EXEC_SITE.includes('crateus') && !common.verifyIsMobile()) await expect(page.locator(el.commPref.mnuHeader)).toHaveText(env.ACNT_PREF_LABEL);
    if (env.EXEC_SITE.includes('crateus') && !common.verifyIsMobile()) await expect(page.locator(el.commPref.lnkLeftPane)).toHaveText(env.ACNT_PREF_LABEL);
    await expect(page.locator(el.commPref.lblPrefDesc)).toHaveText(env.ACNT_MNGPREF_LBL);
    await expect(page.locator(el.commPref.lblTextDrawerHeader)).toHaveText(env.ACNT_TXTDRAWER);
    await expect(page.locator(el.commPref.lblTextDrawerDesc)).toHaveText(td.commPref.textDrawerDesc);
    await expect(page.locator(el.commPref.lblEmailDrawerHeader)).toHaveText(td.commPref.emailDrawerHeader);
    await expect(page.locator(el.commPref.lblEmailDrawerDesc)).toHaveText(td.commPref.emailDrawerDesc);
    await page.locator(el.commPref.btnTextDrawer).click();
    await expect(page.locator(el.commPref.lblPhone)).toHaveText(td.commPref.phone);
    await expect(page.locator(el.commPref.chkCb2Text)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkCrateText)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkKidsText)).not.toBeChecked();
    await expect(page.locator(el.commPref.lblCrateText)).toHaveText(td.commPref.smsCrate);
    await expect(page.locator(el.commPref.lblKidsText)).toHaveText(td.commPref.smsKids);
    await expect(page.locator(el.commPref.lblCb2Text)).toHaveText(td.commPref.smsCb2);
    let consent = await page.locator(el.commPref.lblSmsConsent).textContent();
    consent = common.replaceAll(consent, '\n', '');
    consent = common.replaceAll(consent, ' ', '');
    // eslint-disable-next-line playwright/prefer-web-first-assertions
    expect(consent).toEqual(env.ACNT_SMS_CONSENT);
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.lblEmailField)).toHaveText(td.commPref.emailLabel);
    await expect(page.locator(el.commPref.lblEmailDesc)).toHaveText(td.commPref.emailDesc);
    await expect(page.locator(el.commPref.chkEmailCrate)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailCb2)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailKids)).not.toBeChecked();
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.commPref.chkEmailHG)).not.toBeChecked();
    await expect(page.locator(el.commPref.lblEmailCrate)).toHaveText(td.commPref.emailCrate);
    await expect(page.locator(el.commPref.lblEmailKids)).toHaveText(td.commPref.emailKids);
    await expect(page.locator(el.commPref.lblEmailCb2)).toHaveText(td.commPref.emailCb2);
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.commPref.lblEmailHG)).toHaveText(td.commPref.emailHG);
    await expect(page.locator(el.commPref.lblEmailConsent)).toHaveText(td.commPref.emailConsent);
    await expect(page.locator(el.commPref.lblEmailUnsubscribe)).toHaveText(td.commPref.emailUnsubscribe);
    testReport.log(this.pageName, 'Verify the content on Text and Email drawer');
  }

  /**
   * @author: krishna
   * @function_Name : optInForSMS
   * @Description :  Opt in for sms as a logged in user for all brands
   * @params : none
   * @returns : None
   * */
  async optInForSMS() {
    await page.fill(el.commPref.txtPhone, env.ACNT_INTERRUPTER_PHONE);
    await page.locator(el.commPref.lblCrateText).click();
    await page.locator(el.commPref.lblKidsText).click();
    await page.locator(el.commPref.lblCb2Text).click();
    await page.locator(el.commPref.btnSmsSignIn).click();
    testReport.log(this.pageName, 'Checked all the brands and submitted the text preference');
    await expect(page.locator(el.commPref.divTextDrawerExpand)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.commPref.lblSuccessMsg)).toHaveText(td.commPref.smsSuccessmsg);
    await page.locator(el.commPref.btnTextDrawer).click();
    await expect(page.locator(el.commPref.lblOptInPhone)).toHaveText(env.ACNT_PHONE);
    await expect(page.locator(el.commPref.lblUpdateTextOptIn)).toHaveText(td.commPref.updatedTextOptIn);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand1)).toHaveText(env.ACNT_CRATE);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand2)).toHaveText(env.ACNT_KIDS);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand3)).toHaveText(env.ACNT_CB2);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInMsg)).toHaveText(td.commPref.smsOptInStatus);
    testReport.log(this.pageName, 'SMS Optin is working as expected');
    await page.reload();
  }

  /**
   * @author: krishna
   * @function_Name : optInForEmail
   * @Description :  Opt in for email as a logged in user for all brands
   * @params : none
   * @returns : None
   * */
  async optInForEmail() {
    await page.locator(el.commPref.btnEmailDrawer).click();
    await page.locator(el.commPref.lblEmailCrate).click();
    await page.locator(el.commPref.lblEmailKids).click();
    await page.locator(el.commPref.lblEmailCb2).click();
    if (env.EXEC_SITE.includes('us')) await page.locator(el.commPref.lblEmailHG).click();
    await page.locator(el.commPref.btnApplyChanges).click();
    testReport.log(this.pageName, 'Opted in for Email on all brands');
  }

  /**
   * @author: krishna
   * @function_Name : verifyEmailOptIn
   * @Description :  Verify whether email opt in is successful
   * @params : none
   * @returns : None
   * */
  async verifyEmailOptIn(email) {
    await expect(page.locator(el.commPref.divTextDrawerExpand)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.commPref.lblSuccessMsg)).toHaveText(td.commPref.emailSuccessMsg);
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.lblEmailAddress)).toHaveText(email);
    await page.reload();
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.chkEmailCrate)).toBeChecked();
    await expect(page.locator(el.commPref.chkEmailCb2)).toBeChecked();
    await expect(page.locator(el.commPref.chkEmailKids)).toBeChecked();
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.commPref.chkEmailHG)).toBeChecked();
    testReport.log(this.pageName, 'Verified the email opt in');
  }

  /**
   * @author: krishna
   * @function_Name : unsubscribeAll
   * @Description :  Verify unsubscribing all from comm pref page
   * @params : none
   * @returns : None
   * */
  async unsubscribeAll() {
    await expect(page.locator(el.commPref.lblEmailUnsubscribe)).toHaveText(td.commPref.emailUnsubscribe);
    await page.locator(el.commPref.btnUnsubscribe).click();
    await expect(page.locator(el.commPref.divTextDrawerExpand)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.commPref.lblSuccessMsg)).toHaveText(td.commPref.emailUnsubscribeAll);
    await expect(page.locator(el.commPref.lblUnsubscribeSuccess)).toHaveText(td.commPref.emailUnsubscribeAllMsg);
    await page.reload();
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.chkEmailCrate)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailCb2)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailKids)).not.toBeChecked();
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.commPref.chkEmailHG)).not.toBeChecked();
    testReport.log(this.pageName, 'Unsubscribed from all the brands and verified the same');
  }
}

module.exports = new CommunicationPreferencePage();
