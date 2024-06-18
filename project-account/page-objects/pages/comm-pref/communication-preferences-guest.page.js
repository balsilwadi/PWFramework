const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
class CommunicationPreferenceGuestPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'CommunicationPreferenceGuestPage';
  }

  /**
   * @author: krishna
   * @function_Name : navigatesToCommPrefPage
   * @Description :  Navigate to communication preferences page as a guest user
   * @params : none
   * @returns : None
   * */
  async navigatesToCommPrefPage() {
    await page.goto(`${env.BASE_URL}/customer-service/communication-preferences`);
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Communication Preferences page is launched as guest user');
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
    await expect(page.locator(el.commPref.lblTextDrawerHeaderGuest)).toHaveText(env.ACNT_TXTDRAWER);
    await expect(page.locator(el.commPref.lblTextDrawerDesc)).toHaveText(env.ACNT_TEXTDESC_GUEST);
    await expect(page.locator(el.commPref.lblEmailDrawerHeader)).toHaveText(td.commPref.emailDrawerHeader);
    await expect(page.locator(el.commPref.lblEmailDrawerDesc)).toHaveText(env.ACNT_EMAILDESC_GUEST);
    await page.locator(el.commPref.btnTextDrawer).click();
    await expect(page.locator(el.commPref.lblPhone)).toHaveText(td.commPref.phone);
    await expect(page.locator(el.commPref.chkCb2Text)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkCrateText)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkKidsText)).not.toBeChecked();
    await expect(page.locator(el.commPref.lblCrateText)).toHaveText(td.commPref.emailCrate);
    await expect(page.locator(el.commPref.lblKidsText)).toHaveText(td.commPref.emailKids);
    await expect(page.locator(el.commPref.lblCb2Text)).toHaveText(td.commPref.emailCb2);
    const consentElement = page.locator(el.commPref.lblSmsConsent);
    let consent = await consentElement.textContent();
    consent = common.replaceAll(consent, '\n', '');
    consent = common.replaceAll(consent, ' ', '');
    // eslint-disable-next-line playwright/prefer-web-first-assertions
    expect(consent).toEqual(env.ACNT_SMS_CONSENT);
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.lblEmailFieldGuest)).toHaveText(td.commPref.emailLabelGuest);
    await expect(page.locator(el.commPref.lblEmailDesc)).toHaveText(env.ACNT_EMAILTEXT_GUEST);
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
   * @Description :  Opt in for sms as a guest user for all brands
   * @params : none
   * @returns : None
   * */
  async optInForSMS() {
    await page.fill(el.commPref.txtPhone, env.ACNT_INTERRUPTER_PHONE);
    await page.locator(el.commPref.lblCrateText).click();
    await expect(page.locator(el.commPref.chkTermsCrate)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(el.commPref.chkTermsCrate)).not.toBeChecked();
    await page.locator(el.commPref.lblTermsCrate).click();
    await expect(page.locator(el.commPref.lblTermsCrate)).toHaveText(td.commPref.smsCrate);
    await page.locator(el.commPref.lblKidsText).click();
    await expect(page.locator(el.commPref.chkTermsKids)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(el.commPref.chkTermsKids)).not.toBeChecked();
    await page.locator(el.commPref.lblTermsKids).click();
    await expect(page.locator(el.commPref.lblTermsKids)).toHaveText(td.commPref.smsKids);
    await page.locator(el.commPref.lblCb2Text).click();
    await expect(page.locator(el.commPref.chkTermsCB2)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(el.commPref.chkTermsCB2)).not.toBeChecked();
    await page.locator(el.commPref.lblTermsCB2).click();
    await expect(page.locator(el.commPref.lblTermsCB2)).toHaveText(td.commPref.smsCb2);
    await page.locator(el.commPref.btnSmsSignIn).click();
    testReport.log(this.pageName, 'Checked all the brands and submitted the text preference');
    await expect(page.locator(el.commPref.divTextDrawerExpand)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(el.commPref.lblSuccessMsg)).toHaveText(td.commPref.smsSuccessmsg);
    await page.locator(el.commPref.btnTextDrawer).click();
    await expect(page.locator(el.commPref.lblOptInPhone)).toHaveText(env.ACNT_PHONE);
    await expect(page.locator(el.commPref.lblUpdateTextOptIn)).toHaveText(td.commPref.updatedTextOptIn);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand1)).toHaveText(env.ACNT_CRATE);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand2)).toHaveText(env.ACNT_KIDS);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInBrand3)).toHaveText(env.ACNT_CB2);
    await expect(page.locator(el.commPref.lblUpdatedTextOptInMsg)).toHaveText(td.commPref.smsOptInStatus);
    testReport.log(this.pageName, 'SMS Optin is working as expected');
    await page.locator(el.commPref.btnTextDrawer).click();
  }

  /**
   * @author: krishna
   * @function_Name : optInForEmail
   * @Description :  Opt in for email as a logged in user for all brands
   * @params : none
   * @returns : None
   * */
  async optInForEmail(email) {
    // await page.locator(el.commPref.btnEmailDrawer).click();
    await page.fill(el.commPref.txtEmail, email);
    await page.locator(el.commPref.lblEmailCrate).click();
    await page.locator(el.commPref.lblEmailKids).click();
    await page.locator(el.commPref.lblEmailCb2).click();
    if (env.EXEC_SITE.includes('us')) await page.locator(el.commPref.lblEmailHG).click();
    await page.locator(el.commPref.btnApplyChanges).click();
    testReport.log(this.pageName, 'Opted in for Email on all brands');
    await this.verifyEmailOptIn(email);
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
    await expect(page.locator(el.commPref.lblEmailSuccessMsgGuest)).toHaveText(td.commPref.emailSuccessMsg, { timeout: 20000 });
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.lblEmailAddress)).toHaveText(email);
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
    await expect(page.locator(el.commPref.divTextDrawerExpand).nth(1)).toBeVisible({ timeout: 60000 });
    await page.locator(el.commPref.btnEmailDrawer).click();
    await expect(page.locator(el.commPref.lblUnsubscribeSuccess)).toHaveText(td.commPref.emailUnsubscribeAllMsg, { timeout: 45000 });
    await expect(page.locator(el.commPref.chkEmailCrate)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailCb2)).not.toBeChecked();
    await expect(page.locator(el.commPref.chkEmailKids)).not.toBeChecked();
    await expect(page.locator(el.commPref.lblEmailSuccessMsgGuest)).toHaveText(td.commPref.emailUnsubscribeAll);
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.commPref.chkEmailHG)).not.toBeChecked();
    testReport.log(this.pageName, 'Unsubscribed from all the brands and verified the same');
  }
}

module.exports = new CommunicationPreferenceGuestPage();
