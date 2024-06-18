const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

const env = require('../../../../support/env/env');

class SMSOnlyIntPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'SMSOnlyIntPage';
  }

  async launchTestsite() {
    // uses env params
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    await page.goto(env.BASE_URL);
  }

  /**
   * @function : navigateToHomePage
   * @Description : Click on logo at the top banner
   * @Params: None
   * @Returns: none
   */

  async navigateToHomePage() {
    await page.waitForLoadState('load', { timeout: 120000 });
    await page.locator(el.homePage.lnkHomePageLogo).click();
    testReport.log(this.pageName, 'Navigated to Home Page');
    await page.waitForLoadState('load', { timeout: 120000 });
  }

  /**
   * @function : verifySMSOnlyInterrupter
   * @Description : verify sms only interrutper is displayed, validate the fields on the interrupter and submit details
   * @Params: None
   * @Returns: none
   */

  async verifySMSOnlyInterrupter() {
    // verify offer banner is displayed

    if (common.verifyIsMobile()) {
      await expect(page.locator(el.interrupter.lblOfferbanner)).toBeVisible({ timeout: 30000 });
      testReport.log(this.pageName, 'Offer banner is displayed');
      // verify the content on offer banner
      await expect(page.locator(el.interrupter.lblOfferbanner)).toHaveText(env.ACNT_INTRPT_OFFERBANNER1MOBILE, { ignoreCase: true });
      await expect(page.locator(el.interrupter.btnOfferBannerClose)).toBeVisible();
      testReport.log(this.pageName, 'Content on offer banner is matched as expected');
      await page.locator(el.interrupter.btnOfferBannerPhone).click();
      let strClassName = await page.locator(el.interrupter.popInterrupter).getAttribute('class');
      const arrClassName = strClassName.split(' ');
      strClassName = arrClassName[arrClassName.length - 1];
      // eslint-disable-next-line playwright/prefer-web-first-assertions
      expect(strClassName).toEqual('expanded');
      testReport.log(this.pageName, 'Offer banner is hidden and interrupter popup is visible');
    }

    // verify whether sms only interrutper is displaying
    await expect(page.locator(el.interrupter.lblInterrupterEmail)).toBeHidden();
    await expect(page.locator(el.interrupter.lblInterrupterSubText)).toHaveText(env.ACNT_SMSONLY_SUBTEXT);
    if (env.EXEC_SITE.includes('crateus')) {
      if (common.verifyIsMobile())
        expect((await page.innerText(el.interrupter.lblInterrupterDesc)).toString().replace('\n', '')).toEqual(
          'By signing up for text, you agree to receive recurring automated promotional and personalized marketing text messages (e.g. cart reminders) at this number from Crate and Barrel. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. View Terms and Privacy Policy. Offer terms available here. Exclusions apply. Discount code available for new subscribers only.'
        );
    } else expect((await page.innerText(el.interrupter.lblInterrupterDesc)).toString().replace('\n', '')).toEqual(env.ACNT_SMSONLYDESC);
    await expect(page.locator(el.interrupter.lblInterrupterHeader)).toHaveText(env.ACNT_INTRPT_SMSONLYOFFERBANNER, { ignoreCase: true });

    if (!common.verifyIsMobile()) {
      await expect(page.locator(el.interrupter.lblInterrupterPhone)).toHaveText(td.interrupter.intterupterMobileField);
      await expect(page.locator(el.interrupter.txtInterrupterSMS)).toBeEmpty();
      await expect(page.locator(el.interrupter.btnMaybeLater)).toBeVisible({ timeout: 90000 });
      await expect(page.locator(el.interrupter.btnInterrupterSubmit)).toBeVisible();
      await expect(page.locator(el.interrupter.btnMaybeLater)).toBeVisible();
    } else await expect(page.locator(el.interrupter.btnMaybeLaterMobile)).toBeVisible();

    testReport.log(this.pageName, 'SMS Only interrupter is displayed as expected');
  }

  /**
   * @function : SubmitSMSOnlyInterrupter
   * @Description : Fill the details and submit the SMS Only interrutper
   * @Params: None
   * @Returns: none
   */

  async SubmitSMSOnlyInterrupter() {
    if (!common.verifyIsMobile()) {
      // enter phone number and click on submit
      await page.fill(el.interrupter.txtInterrupterSMS, env.ACNT_INTERRUPTER_PHONE);
      await page.locator(el.interrupter.btnInterrupterSubmit).click();

      await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toBeVisible({ timeout: 30000 });
      await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(td.interrupter.secondPageHeader, { ignoreCase: true });
      await page.locator(el.interrupter.btnStartShopping).click();
      testReport.log(this.pageName, 'SMSOnly interrupter is submitted');

      // verify whether interrupter is btnCloseResetPasswordPopup
      const strInterrupterClass = page.locator(el.interrupter.sectionInterrupter);
      await expect(strInterrupterClass).toHaveAttribute('class', 'hidden');
      testReport.log(this.pageName, 'Interrupter popup is closed as expected');
      // refresh the page and verify whether interrutper is still hidden
      await page.reload();
      // strInterrupterClass = await page.locator(el.interrupter.sectionInterrupter).getAttribute('class');
      // expect(strInterrupterClass).toEqual('hidden');
      await expect(page.locator(el.interrupter.sectionInterrupter)).toHaveAttribute('class', /hidden/);
      testReport.log(this.pageName, 'Interrupter popup is still hidden after page reload');
    } else testReport.log(this.pageName, "Couldn't validate submitting the interrutper from phone, since double tab only supported");
  }
}

module.exports = new SMSOnlyIntPage();
