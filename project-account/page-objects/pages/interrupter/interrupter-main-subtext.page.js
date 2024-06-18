const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
class InterrupterText extends PageObject {
  constructor() {
    super();
    this.pageName = 'InterrupterText';
  }

  /**
   * @function : enterEmailAndPhone
   * @Description : Enter email and phone number in te interrutper bases on the scenario
   * @Params: optInScenario
   * @Returns: none
   */

  async enterEmailAndPhone(optInScenario) {
    switch (optInScenario.toLowerCase()) {
      case 'emailyesphoneyes':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTER_EMAIL_ALREADYOPTIN);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_PHONE_ALREADYOPTIN);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneYes`);
        break;
      case 'emailyesphoneno':
        await page.fill(el.interrupter.txtEmail, td.interrupterText.emailOnlyOptIn);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneNo`);
        break;
      case 'emailnophoneyes':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTER_EMAIL_NOTOPTIN);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_PHONEONLY_OPTIN);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailNoPhoneYes`);
        break;
      case 'emailnophoneno':
        await page.fill(el.interrupter.txtEmail, common.generateNewEmail());
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailNoPhoneNo`);
        break;
      case 'emailyesphoneyescb2no':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN_CB2NO);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN_CB2NO);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneYesCB2No`);
        break;
      case 'emailyesphonenocb2no':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTERTEXT_MAIN_CRATEEMAILONLY_OPTIN_CB2NO);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneNoCB2No`);
        break;
      case 'emailyesphonenokidsno':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTERTEXT_KIDSONLY_NEWOPTIN);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneNoKidsNo`);
        break;
      case 'emailnophonenokidsyes':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTERTEXT_CRATEONLY_NEWOPTIN);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailNoPhoneNoKidsYes`);
        break;
      case 'emailnophonenokidsno':
        await page.fill(el.interrupter.txtEmail, common.generateNewEmail());
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_NEWPHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailNoPhoneNoKidsNo`);
        break;
      case 'emailyesphoneyeskidsyes':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTER_EMAIL_ALREADYOPTIN);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_PHONE_ALREADYOPTIN);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneYesKidsYes`);
        break;
      case 'emailyesphonenokidsyes':
        await page.fill(el.interrupter.txtEmail, env.ACNT_INTERRUPTER_KIDSEMAILONLY);
        await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_PHONE);
        await testReport.log(this.pageName, `Entered email address and phone number: EmailYesPhoneNoKidsYes`);
        break;
      default:
        testReport.log(this.pageName, `invalid scenario`);
    }
  }

  /**
   * @function : submitInterrupter
   * @Description : Click on the submit button in the interrutper page
   * @Params: None
   * @Returns: none
   */

  async submitInterrupter() {
    await page.locator(el.interrupter.btnInterrupterSubmit).click();
    testReport.log(this.pageName, `Clicked on Submit`);
  }

  /**
   * @function : navigatesToKidsPage
   * @Description : Launch kids URL
   * @Params: None
   * @Returns: none
   */

  async navigatesToKidsPage() {
    if (env.EXEC_SITE.includes('crate')) {
      await page.goto(`${env.BASE_URL}/kids`);
      await page.waitForLoadState('load', { timeout: 60000 });
    } else testReport.log(this.pageName, 'kids site only applicable for crate');
  }

  /**
   * @function : uncheckKidsCheckbox
   * @Description : uncheck kids checkbox
   * @Params: None
   * @Returns: none
   */

  async uncheckKidsCheckbox() {
    if (env.EXEC_SITE.includes('crateus')) {
      await page.locator(el.interrupter.lblKidsCheckbox).click();
      testReport.log(this.pageName, `Unchecked Kids checkbox`);
    }
  }

  /**
   * @function : checkKidsCheckbox
   * @Description : check kids checkbox
   * @Params: None
   * @Returns: none
   */

  async checkKidsCheckbox() {
    if (env.EXEC_SITE.includes('crateca')) {
      await page.locator(el.interrupter.lblKidsCheckbox).click();
      testReport.log(this.pageName, `Checked Kids checkbox`);
    }
  }

  /**
   * @function : submitInterrupterSecondPage
   * @Description : check if additonal brand needs to be enabled and click on submit button in the second page of the interrutper
   * @Params: None
   * @Returns: none
   */

  async submitInterrupterSecondPage(additionalBrands) {
    await expect(page.locator(el.interrupter.lblFirstAdditionalBrand)).toBeVisible({ timeout: 30000 });
    if (additionalBrands.toLowerCase().includes('yes')) {
      await page.locator(el.interrupter.lblFirstAdditionalBrand).click();
      testReport.log(this.pageName, 'Enabled first additional brand');
    }
    await page.locator(el.interrupter.btnSecondPageSubmit).click();
    testReport.log(this.pageName, 'Clicked on submit button in the second page of the interrupter');
  }

  /**
   * @function : expandEmailDrawer
   * @Description : expand email drawer to complete unsubscribe all
   * @Params: None
   * @Returns: none
   */

  async expandEmailDrawer() {
    await page.locator(el.commPref.btnEmailDrawer).click();
    testReport.log('Communication Preferences', `Email Drawer expanded`);
  }

  /**
   * @function : unsubscribeKidsBrand
   * @Description : unsubscribe from kids brand if already opted in
   * @Params: None
   * @Returns: none
   */

  async unsubscribeKidsBrand() {
    await page.locator(el.commPref.lblEmailKids).click();
    try {
      await expect(page.locator(el.commPref.chkKidsText)).not.toBeChecked();
    } catch (error) {
      await page.locator(el.commPref.lblEmailKids).click();
    }
  }

  /**
   * @function : unsubscribeCrateBrand
   * @Description : unsubscribe from crate brand if already opted in
   * @Params: None
   * @Returns: none
   */

  async unsubscribeCrateBrand() {
    await page.locator(el.commPref.lblEmailCrate).click();
    try {
      await expect(page.locator(el.commPref.chkCrateText)).not.toBeChecked();
    } catch (error) {
      await page.locator(el.commPref.lblEmailCrate).click();
    }
  }

  /**
   * @function : clickOnApplyChanges
   * @Description : click on apply changes button
   * @Params: None
   * @Returns: none
   */

  async clickOnApplyChanges() {
    await page.locator(el.commPref.btnApplyChanges).click();
    await expect(page.locator(el.commPref.divTextDrawerExpand)).toBeVisible({ timeout: 60000 });
    testReport.log('Communication Preferences', `Clicked on Apply changes`);
  }

  /**
   * @function : verifyMainAndSubCopy
   * @Description : verify the main and sub copy of the interrutper text based on the scenario
   * @Params: optInScenario
   * @Returns: none
   */

  async verifyMainAndSubCopy(optInScenario) {
    switch (optInScenario.toLowerCase()) {
      case 'emailyesphoneyes':
        await expect(page.locator(el.interrupter.lblMainEmailPhoneAlreadyOptIn)).toBeVisible({ timeout: 60000 });
        await expect(page.locator(el.interrupter.lblMainEmailPhoneAlreadyOptIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN, {
          ignoreCase: true
        });
        await expect(page.locator(el.interrupter.lblSubEmailPhoneAlreadyOptIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYes`);
        break;

      case 'emailyesphoneno':
        await expect(page.locator(el.interrupter.lblMainEmailPhoneAlreadyOptIn)).toBeVisible({ timeout: 60000 });
        await expect(page.locator(el.interrupter.lblMainEmailPhoneAlreadyOptIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_EMAILONLY, {
          ignoreCase: true
        });
        await expect(page.locator(el.interrupter.lblSubEmailPhoneAlreadyOptIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYes`);
        break;

      case 'emailnophoneyes':
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toBeVisible({ timeout: 60000 });
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUTPERTEXT_MAIN_PHONEONLY, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUTPERTEXT_SUB_PHONEONLY, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYes`);
        break;

      case 'emailnophoneno':
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        try {
          await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_NEWOPTIN, {
            ignoreCase: true
          });
        } catch (err) {
          await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY, {
            ignoreCase: true
          });
        }
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailNoPhoneNo`);
        break;

      case 'emailyesphoneyescb2no':
        // await page.waitForSelector(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn, { state: 'visible', timeout: 60000 });
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYesCB2No`);
        break;

      case 'emailyesphonenocb2no':
        // await page.waitForSelector(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn, { state: 'visible', timeout: 60000 });
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_EMAILONLY, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneNoCB2No`);
        break;

      case 'emailyesphonenokidsno':
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_NEWWMAIL_PHONE, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneNoKidsNo`);
        break;

      case 'emailnophonenokidsyes':
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        try {
          await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_NEWOPTIN, {
            ignoreCase: true
          });
        } catch (error) {
          await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY, {
            ignoreCase: true
          });
        }
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailNoPhoneNoKidsYes`);
        break;

      case 'emailnophonenokidsno':
        await expect(page.locator(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_NEWOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSubPhoneOnlyAlreadyOptedIn)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_NEWWMAIL_PHONE, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailNoPhoneNoKidsNo`);
        break;

      case 'emailyesphoneyeskidsyes':
        // await page.waitForSelector(el.interrupter.lblMainPhoneOnlyAlreadyOptedIn, { state: 'visible', timeout: 60000 });
        await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_ALREADYOPTIN, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblThanksSubMsgFinalScreen)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_ALREADYOPTIN, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYesKidsYes`);
        break;

      case 'emailyesphonenokidsyes':
        await expect(page.locator(el.interrupter.lblSecondPageHeader)).toHaveText(env.ACNT_INTERRUPTERTEXT_MAIN_EMAILONLY, {
          ignoreCase: true,
          timeout: 60000
        });
        await expect(page.locator(el.interrupter.lblSecondPageSubtext)).toHaveText(env.ACNT_INTERRUPTERTEXT_SUB_EMAILONLY, {
          ignoreCase: true
        });
        await testReport.log(this.pageName, `Main and sub copy displayed as expected: EmailYesPhoneYesKidsYes`);
        break;

      default:
        testReport.log(this.pageName, `invalid scenario`);
    }
  }

  /**
   * @function : verifyFinalPageMainAndSubCopy
   * @Description : verify the final page main and sub copy of the interrutper text based on the scenario
   * @Params: optInScenario
   * @Returns: none
   */

  async verifyFinalPageMainAndSubCopy(additionalBrands) {
    await expect(page.locator(el.interrupter.lblMainEmailPhoneAlreadyOptIn)).toBeVisible({ timeout: 30000 });
    if (additionalBrands.toLowerCase().includes('yes')) {
      await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(td.interrupter.secondPageHeader);
      await expect(page.locator(el.interrupter.lblSubTextFinalScreen)).toHaveText(td.interrupter.subtextFinalScreen);
      testReport.log(this.page, 'Subtext matched as expected in the final page');
    } else {
      await expect(page.locator(el.interrupter.lblSubTextFinalScreen)).toBeHidden();
      testReport.log(this.page, 'Subtext not displayed as expected in the final page');
      if (env.EXEC_SITE.includes('crate')) await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(td.interrupter.thanksMsgSMSOnly);
      else await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(td.interrupter.thanksMsgSMSOnlyCB2);
      testReport.log(this.page, 'Main text matched as expected in the final page');
    }
  }
}

module.exports = new InterrupterText();
