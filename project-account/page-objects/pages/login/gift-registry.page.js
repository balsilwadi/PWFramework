// TODO this page should not exist.  This belongs in the gift registry area and any steps that need it should be using that page object, not this one

const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class GiftRegistryPage extends PageObject {
  pageName = this.constructor.name;

  async navigateToGiftRegistryPage() {
    await page.goto(`${env.BASE_URL}/wedding-gift-registry`);
  }

  async clickOnGiftRegistryLogin() {
    if (common.verifyIsMobile()) {
      if (env.EXEC_SITE.startsWith('crate')) {
        await page.locator(el.registryPage.lnkManageRegistryCBMobile).click();
      } else await page.locator(el.registryPage.lnkManageRegistry).nth(0).click();
    } else if (!common.verifyIsMobile()) {
      if (env.EXEC_SITE.startsWith('cb2')) {
        await page.locator(el.registryPage.lnkManageRegistry).nth(0).click();
      } else await page.locator(el.registryPage.lnkManageRegistryCB).click();
    }
  }

  async validateManageGiftRegistryPage() {
    await page.waitForLoadState('load');
    await expect(page.locator(el.manageRegistry.lblHeader)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(el.manageRegistry.lblHeader)).toContainText('Manage My Registry');
    testReport.log(this.page, 'Customer successfully logged into their Gift Registry');
  }

  async clickOnCreateMyRegistry() {
    await page.waitForLoadState('load');
    if (env.EXEC_SITE.startsWith('cb2')) {
      await page.locator(el.registryPage.lnkCreateMyRegistryCB2).click();
    } else await page.locator(el.registryPage.lnkCreateMyRegistryCB).click();
    testReport.log(this.pageName, `Click On Creae Registry`);
  }

  async verifyStep1IntakeForm() {
    await page.waitForLoadState('load');
    if (env.EXEC_SITE.startsWith('crate')) {
      await expect(page.locator(el.registryPage.txtGiftRegistry)).toHaveText(td.createRegistry.weddingHeader1CB, { ignoreCase: true });
    } else await expect(page.locator(el.registryPage.txtGiftRegistry)).toHaveText(td.createRegistry.weddingHeader1CB2, { ignoreCase: true });
    await expect(page.locator(el.registryPage.txtLetsGetYouRegistered)).toHaveText(td.createRegistry.weddingHeader2, { ignoreCase: true });
    await expect(page.locator(el.registryPage.lblFName)).toHaveText(td.createRegistry.firstNameLabel);
    await expect(page.locator(el.registryPage.lblLName)).toHaveText(td.createRegistry.lastNameLabel);
    await expect(page.locator(el.registryPage.lblPhone)).toHaveText(td.createRegistry.phoneNumberLabel);
    await expect(page.locator(el.registryPage.lblEmail)).toHaveText(td.createRegistry.emailLabel);
    testReport.log(this.pageName, `Verified step1 Intake Form`);
  }

  async fillOutStep1IntakeForm() {
    await page.fill(el.registryPage.txtFName, td.createRegistry.firstName, { delay: 100 });
    await page.fill(el.registryPage.txtLName, td.createRegistry.lastName, { delay: 100 });
    await page.fill(el.registryPage.txtPhone, td.createRegistry.phoneNumber, { delay: 100 });
    await page.locator(el.registryPage.drpRegistryType).selectOption(td.createRegistry.registryWedding, { delay: 100 });
    await page.fill(el.registryPage.txtEmail, common.generateNewEmail());
    await page.locator(el.registryPage.btnContinue).click();
    testReport.log(this.pageName, `Filled Out step1 Intake Form`);
  }

  async verifyStep2IntakeForm() {
    await page.waitForLoadState('load');
    await expect(page.locator(el.registryPage.txtCreateAcntH1)).toHaveText(td.createRegistry.createAccount);
    await expect(page.locator(el.registryPage.txtCreateAcntH2)).toHaveText(td.createRegistry.createAccountH2);
    await expect(page.locator(el.registryPage.lblCreatePassword)).toHaveText(td.createRegistry.createPassword);
    await expect(page.locator(el.registryPage.txtPolicy)).toHaveText(td.createRegistry.policy);
    await expect(page.locator(el.registryPage.lnkPrevious)).toBeEnabled();
    testReport.log(this.pageName, `Verified step2 Intake Form`);
  }

  async fillOutStep2IntakeForm() {
    await page.waitForLoadState('load');
    await page.fill(el.registryPage.txtCreatePassword, td.createRegistry.password);
    await page.locator(el.registryPage.btnCreateAcnt).click();
    expect(page.url({ timeout: 90000 })).toContain(env.BASE_URL);
    if (env.EXEC_SITE.includes('crate')) {
      await expect(page.locator(el.homePage.lblAcntGreeting)).toContainText('Hi,', { timeout: 90000 });
    } else {
      await expect(page.locator(el.homePage.lblAcntGreetinCB2)).toContainText('Hi,', { timeout: 90000 });
    }
    testReport.log(this.pageName, `Entered password`);
  }

  async validateMyGRStep1Page() {
    page.setDefaultTimeout(200000);
    await page.waitForLoadState('load', { timeout: 180000 });
    if (env.EXEC_SITE.includes('crate')) {
      await expect(page.locator(el.registryPage.txtwelcomeMsg)).toBeVisible({ timeout: 30000 });
      await expect(page.locator(el.registryPage.txtwelcomeMsg)).toContainText('Hi');
    } else {
      await expect(page.locator(el.registryPage.lblAcntGreetinCB2)).toBeVisible({ timeout: 30000 });
      await expect(page.locator(el.registryPage.lblAcntGreetinCB2)).toContainText('Hi');
    }

    testReport.log('Customer successfully logged in');
  }

  async fillOutStep1IntakeFormExistingCustomer() {
    await page.fill(el.registryPage.txtFName, td.createRegistry.firstName, { delay: 100 });
    await page.fill(el.registryPage.txtLName, td.createRegistry.lastName, { delay: 100 });
    await page.fill(el.registryPage.txtPhone, td.createRegistry.phoneNumber, { delay: 100 });
    await page.locator(el.registryPage.drpRegistryType).selectOption(td.createRegistry.registryWedding, { delay: 100 });
    await page.fill(el.registryPage.txtEmail, td.createRegistry.emailExCustomer, { delay: 100 });
    await page.locator(el.registryPage.btnContinue).click();
    testReport.log(this.pageName, `Filled Out step1 Intake Form`);
  }

  async verifyStep2IntakeFormExistingCustomer() {
    await page.waitForLoadState('load');
    await expect(page.locator(el.registryPage.txtWelcomeBack)).toHaveText(
      td.createRegistry.welcomeBackmsg1 + td.createRegistry.firstName + td.createRegistry.welcomeBackmsg2
    );
    await expect(page.locator(el.registryPage.lnkResetPassword)).toBeEnabled();
    // await expect(await page.locator(el.registryPage.txtReturningCustomerEmail)).toHaveText(td.createRegistry.emailExCustomer);
    await expect(page.locator(el.registryPage.btnSignInWithApple)).toBeEnabled();
    await expect(page.locator(el.registryPage.btnSignInWithGoogle)).toBeEnabled();
    await expect(page.locator(el.registryPage.lnkPreviousEx)).toBeEnabled();
    testReport.log(this.pageName, `Verified step2 Intake Form`);
  }

  /**
   * @function : clickOnTheFirstRegistry
   * @Description : click on the first registry displayed in the manage registries page
   * @Params: None
   * @Returns: none
   */
  async clickOnTheFirstRegistry() {
    await page.locator(el.registryPage.lnkFirstRegistry).click();
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Clicked on the first Active Registry');
  }

  /**
   * @function : clickOnSisterBrand
   * @Description : click on the sister brand button in the registry page
   * @Params: None
   * @Returns: none
   */
  async clickOnSisterBrand() {
    await page.locator(el.registryPage.btnBrandSwitch).click();
    await expect(page.locator(el.registryPage.lnkSisterBrand)).toBeVisible({ timeout: 30000 });
    // await page.locator(el.registryPage.lnkSisterBrand).click();
    testReport.log(this.pageName, 'Clicked on sister brand');
  }

  /**
   * @function : verifyReigstryPageForSisterBrand
   * @Description : click on the sister brand button in the registry page
   * @Params: None
   * @Returns: none
   */
  async verifyReigstryPageForSisterBrand() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(el.registryPage.lnkSisterBrand).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_GR_URL));
    testReport.log(this.pageName, 'URL is matching as expected');
    // close the interrupter if it present
    try {
      await expect(newPage.locator('#email-sms-signup-modal-main')).toBeVisible({ timeout: 60000 });
      await newPage.locator('#email-sms-maybe-later-button').click();
    } catch (err) {
      testReport.log(this.pageName, 'Interrupter not present');
    } // navigate to account page
    if (common.verifyIsMobile()) {
      await newPage.locator(el.homePage.btnAccountIconMobile).click();
      await newPage.locator(el.homePage.lnkMyAccount).click();
      testReport.log(this.pageName, 'Clicked on My Account link');
    } else await newPage.locator(el.homePage.btnAccountIconMobile).click();
    await newPage.waitForLoadState('load', { timeout: 60000 });

    // navigate to Account Settigns
    await newPage.waitForLoadState('load');
    if (common.verifyIsMobile()) await newPage.locator(el.accountPage.lnkAccountSettingsMobile).click();
    else await newPage.locator(el.accountPage.lnkAccountSettings).click();

    // validate the email address
    await expect(newPage.locator(el.accountSettingsPage.lblCurrentEmail)).toHaveText('registrytest@cb.com', { timeout: 30000 });
    testReport.log(this.pageName, 'Logged in as expected');
  }
}

module.exports = { GiftRegistryPage };
