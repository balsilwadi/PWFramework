const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
class ComboInterrupter extends PageObject {
  constructor() {
    super();
    this.pageName = 'ComboInterrupter';
  }

  /**
   * @function : verifyComboInterrutperisDisplayed
   * @Description : Verify whether the combo interrutper is displayed for a guest user
   * @Params: None
   * @Returns: none
   */

  async verifyComboInterrutperisDisplayed() {
    // verify whether combo interrupter is displaying
    if (common.verifyIsMobile()) {
      await expect(page.locator(el.interrupter.lblInterrupterBannerMobile)).toBeVisible({ timeout: 60000 });
      await expect(page.locator(el.interrupter.lblSMSOnlyOfferBanner)).toHaveText(env.ACNT_INTRPT_OFFERBANNER1MOBILE, { ignoreCase: true });
      await expect(page.locator(el.interrupter.lblOfferBanner2)).toHaveText(td.interrupter.offerBanner2Mobile, { ignoreCase: true });
      await page.locator(el.interrupter.btnOfferBannerPhone).click();
    } // else await page.waitForSelector(el.interrupter.lblInterrupterHeader, { timeout: 60000 });
    try {
      await expect(page.locator(el.interrupter.lblInterrupterHeader)).toBeVisible({ timeout: 60000 });
    } catch (err) {
      testReport.log(this.pageName, 'Interrupter header not displayed');
    }
    await expect(page.locator(el.interrupter.lblInterrupterEmail)).toBeVisible();
    await expect(page.locator(el.interrupter.lblInterrupterPhone)).toBeVisible();
    testReport.log(this.pageName, 'Combo Interrupter is displayed as expected');
  }

  /**
   * @function : verifyComboInterrutperContent
   * @Description : Verify the content on the combo interrutper
   * @Params: None
   * @Returns: none
   */

  async verifyComboInterrutperContent() {
    if (!common.verifyIsMobile()) {
      await expect(page.locator(el.interrupter.lblInterrupterHeader)).toBeVisible({ timeout: 60000 });
      await expect(page.locator(el.interrupter.lblInterrupterHeader)).toHaveText(env.ACNT_COM_INTERRUPTER_HEADER, { ignoreCase: true });
    }
    await expect(page.locator(el.interrupter.lblInterrupterSubText)).toHaveText(env.ACNT_SMSONLY_SUBTEXT, { ignoreCase: true });
    await expect(page.locator(el.interrupter.lblInterrupterEmail)).toHaveText(td.interrupter.comboEmailField, { ignoreCase: true });
    expect((await page.innerText(el.interrupter.lblInterrupterDesc)).toString().replace('\n', '')).toEqual(env.ACNT_INTERRUPTER_DESC);
    await expect(page.locator(el.interrupter.lblInterrupterPhone)).toHaveText(td.interrupter.comboPhoneField, { ignoreCase: true });
    await expect(page.locator(el.interrupter.btnInterrupterSubmit)).toBeVisible();
    await expect(page.locator(el.interrupter.btnMaybeLater)).toBeVisible();
    if (env.EXEC_SITE.includes('crate')) await expect(page.locator(el.interrupter.lblKidsCheckbox)).toHaveText(td.interrupter.kidsCheckbox);
    if (env.EXEC_SITE.includes('crateus')) await expect(page.locator(el.interrupter.chkKidsCheckbox)).toBeChecked();
    else if (env.EXEC_SITE.includes('crateca')) await expect(page.locator(el.interrupter.chkKidsCheckbox)).not.toBeChecked();
    testReport.log(this.pageName, 'Content on the combo interrupter is matching as expected');
  }

  /**
   * @function : submitComboInterrutper
   * @Description : Add email and phone number on the combo interrupter and submit it
   * @Params: None
   * @Returns: none
   */

  async submitComboInterrutper() {
    const newEmail = common.generateNewEmail();
    await page.fill(el.interrupter.txtEmail, newEmail);
    await page.fill(el.interrupter.txtPhone, env.ACNT_INTERRUPTER_PHONE);
    await page.locator(el.interrupter.btnInterrupterSubmit).click();
    testReport.log(this.pageName, 'Submitted the interrupter');
  }

  /**
   * @function : verifyInterrupterSecondPage
   * @Description : Verify the content displayed in the second page if the interrutper and submit it
   * @Params: None
   * @Returns: none
   */

  async verifyInterrupterSecondPage() {
    // verify the content on second page
    await expect(page.locator(el.interrupter.lblSecondPageHeader)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.interrupter.lblSecondPageHeader)).toHaveText(td.interrupter.secondPageHeader, { ignoreCase: true });
    await expect(page.locator(el.interrupter.lblSecondPageDesc)).toHaveText(td.interrupter.additionalBrandDesc);
    await expect(page.locator(el.interrupter.lblSecondPageSubtext)).toHaveText(env.ACNT_INTRPT_SECOND_SUBTEXT, { ignoreCase: true });

    // verify the brands displayed
    if (env.EXEC_SITE.includes('crateus')) {
      await expect(page.locator(el.interrupter.chkCB2)).toBeVisible();
      await expect(page.locator(el.interrupter.chkHG)).toBeVisible();
      await expect(page.locator(el.interrupter.chkCrateandKids)).toBeHidden();
      testReport.log(this.pageName, 'Expected additional brands are displayed');
    } else if (env.EXEC_SITE.includes('crateca')) {
      await expect(page.locator(el.interrupter.chkCB2)).toBeVisible();
      await expect(page.locator(el.interrupter.chkCrateandKids)).toBeHidden();
      testReport.log(this.pageName, 'Expected additional brands are displayed');
    } else if (env.EXEC_SITE.includes('cb2us')) {
      await expect(page.locator(el.interrupter.chkCrate)).toBeVisible();
      await expect(page.locator(el.interrupter.chkHG)).toBeVisible();
      await expect(page.locator(el.interrupter.chkCrateandKids)).toBeVisible();
      testReport.log(this.pageName, 'Expected additional brands are displayed');
    } else if (env.EXEC_SITE.includes('cb2ca')) {
      await expect(page.locator(el.interrupter.chkCrate)).toBeVisible();
      await expect(page.locator(el.interrupter.chkCrateandKids)).toBeVisible();
      testReport.log(this.pageName, 'Expected additional brands are displayed');
    }

    // check all the additional brands
    const arrayBrands = page.locator(el.interrupter.chkBrands);

    // eslint-disable-next-line no-restricted-syntax
    for (const ele of await arrayBrands.elementHandles()) {
      // eslint-disable-next-line no-await-in-loop
      await ele.click();
    }

    testReport.log(this.pageName, 'Additional brands are selected');
    // Click on submit
    await page.locator(el.interrupter.btnSecondPageSubmit).click();
    testReport.log(this.pageName, 'Clicked submit on second page of the interrupter');
  }

  /**
   * @function : verifyInterrupterFinalPage
   * @Description : Verify the content displayed in the second page if the interrutper and submit it
   * @Params: None
   * @Returns: none
   */

  async verifyInterrupterFinalPage() {
    await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.interrupter.lblThanksMsgFinalScreen)).toHaveText(td.interrupter.secondPageHeader, { ignoreCase: true });
    await expect(page.locator(el.interrupter.lblSubTextFinalScreen)).toHaveText(td.interrupter.subtextFinalScreen, { ignoreCase: true });
    await page.locator(el.interrupter.btnStartShopping).click();
    testReport.log(this.pageName, 'Combo interrupter is submitted');

    // verify whether interrupter is closed
    const strInterrupterClass = page.locator(el.interrupter.sectionInterrupter);
    await expect(strInterrupterClass).toHaveAttribute('class', 'hidden');
    testReport.log(this.pageName, 'Interrupter popup is closed as expected');
    // refresh the page and verify whether interrutper is still hidden
    await page.reload();
    await expect(page.locator(el.interrupter.sectionInterrupter)).toHaveAttribute('class', /hidden/);
    testReport.log(this.pageName, 'Interrupter popup is still hidden after page reload');
  }

  /**
   * @function : verifyTermsLink
   * @Description : Click on the terms link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyTermsLink() {
    if (common.verifyIsMobile()) await page.locator(el.interrupter.btnClaimOfferMobile).click();
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkTerms).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_INTERRUPTER_TERMSLNK));
    testReport.log(this.pageName, 'Navigated to the Terms link as expected');
    await newPage.close();
  }

  /**
   * @function : verifyPrivacypolicyLink
   * @Description : Click on the privacy policy link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyPrivacypolicyLink() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkPrivacy).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_INTERRUPTER_PRIVACYLNK));
    testReport.log(this.pageName, 'Navigated to the Privacy link as expected');
    await newPage.close();
  }

  /**
   * @function : verifyOfferTermsLink
   * @Description : Click on the offer terms link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyOfferTermsLink() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkOffers).click()]);
    await newPage.waitForLoadState('load', { timeout: 90000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_INTERRUPTER_OFFERSLNK));
    testReport.log(this.pageName, 'Navigated to the Available Offers link as expected');
    await newPage.close();
  }

  /**
   * @function : verifyKidsTermsLink
   * @Description : Click on the terms link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyKidsTermsLink() {
    if (common.verifyIsMobile()) await page.locator(el.interrupter.btnClaimOfferMobile).click();
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkTerms).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_KIDSINTERRUPTER_TERMSLNK));
    testReport.log(this.pageName, 'Navigated to the Terms link as expected');
    await newPage.close();
  }

  /**
   * @function : verifyKidsPrivacypolicyLink
   * @Description : Click on the privacy policy link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyKidsPrivacypolicyLink() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkPrivacy).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_KIDSINTERRUPTER_PRIVACYLNK));
    testReport.log(this.pageName, 'Navigated to the Privacy link as expected');
    await newPage.close();
  }

  /**
   * @function : verifyKidsOfferTermsLink
   * @Description : Click on the offer terms link and verify whether it is navigating to the correct page
   * @Params: None
   * @Returns: none
   */

  async verifyKidsOfferTermsLink() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.interrupter.lnkOffers).click()]);
    await newPage.waitForLoadState('load', { timeout: 90000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_KIDSINTERRUPTER_OFFERSLNK));
    testReport.log(this.pageName, 'Navigated to the Available Offers link as expected');
    await newPage.close();
  }
}

module.exports = new ComboInterrupter();
