const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class DesignServices extends PageObject {
  constructor() {
    super();
    this.pageName = 'DesignServicesPage';
    this.lnkDesignServices = '#Nav_Free-Design-Services';
    this.lnkMeetDesignerOrConnectWithDesigner = "//p[normalize-space()='Meet A Design Pro Online'] | //a[normalize-space()='connect with a designer online']";
    this.lnkGetStartedMobile = "a[href='/design-services-form']";
    this.lnkBookeAStoreConsultation = "//a[normalize-space()='book a store consultation']";
    this.lnkQuickDesignQuestion = "//a[normalize-space()='book a store consultation']";
    this.lblLetsGetToKnow = '.ds-form-title';
    this.lblAllFieldsRequired = '.all-field-messages';
    this.lblFname = "label[for='ds-first-name']";
    this.lblLname = "label[for='ds-LastName']";
    this.lblEmail = "label[for='ds-email']";
    this.lblPhone = "label[for='ds-Phone']";
    this.lblZipCode = "label[for='ds-zip-code']";
    this.lblPrefContactMethod = "label[for='ds-preferredContactMethod']";
    this.txtDisabledEmail = '.disabled-email-text';
    this.txtEnabledEmail = '#ds-email';
    this.txtFname = '#ds-first-name';
    this.txtLname = '#ds-LastName';
    this.txtEmail = '.disabled-email-text';
    this.txtPhone = '#ds-Phone';
    this.txtZipCode = '#ds-zip-code';
    this.ddlPrefContactMethod = '#ds-preferredContactMethod';
    this.btnContinue = "button[class*='button button-primary button-lg button-continue']";
    this.lblHowCanWeHelp = '.ds-form-title';
    this.lblHowCanWeHelpSub = "//span[normalize-space()='How can we help you design your space?']";
    this.lblRoomUpdate = "//span[normalize-space()='Room Update']";
    this.lblStyling = "//span[normalize-space()='Styling']";
    this.lblSpacePlanning = "//span[normalize-space()='Space Planning']";
    this.lblStartingFresh = "//span[normalize-space()='Starting Fresh']";
    this.chkRoomUpdates = "//span[normalize-space()='Room Update']";
    this.chkSpacePlanning = "//span[normalize-space()='Space Planning']";
    this.chkStyling = "//span[normalize-space()='Styling']";
    this.chkStartingFresh = "//span[normalize-space()='Starting Fresh']";
    this.chkRoomRefresh = "//span[normalize-space()='Room Refresh']";
    this.chkStylingHelp = "//span[normalize-space()='Styling Help']";
    this.chkEmptyRoom = "//span[normalize-space()='Empty Room']";
    this.txtDesignDetails = '#ds-project-additional-detail';
    this.btnContinueSecond = "(//button[contains(@class,'button button-primary button-lg button-continue')])[1]";
    this.btnAddAnotherLink = "(//button[@type='button'])[46]";
    this.btnUploadImage = "(//button[@type='button'])[47]";
    this.txtTellUsMore = '#ds-tell-us-more';
    this.btnSendToDesignTeam = "//button[contains(@class,'button button-primary button-lg button-continue')]";
    this.msgSuccess = '.ds-results-title';
    this.msgListSuccess = '.ds-success-list';
    this.btnContinueShopping = "//a[normalize-space()='Continue Shopping']";
    this.lnkTheFrame = "a[href='/the-frame']";
    this.lnkWhatsNew = "a[href='/new']";
    this.lnkOurLatestLookbook = "a[href='https://catalogs.cb2.com/']";
    this.lnkPDFGuide = "a[href='/assets/DesignServices/DS-Guide-2D_022021.pdf']";
    this.lblReturningUserGreeting = 'div.okta-sign-in-top h2';
    this.lblSignInConfirmation = 'div.guest-confirmation-message';
    this.lblSignInAgreement = 'p#sign-in-agreement-msg';
    this.lnkResetPassword = 'button#forgot-password';
    this.lnkPrevious = 'button[class*="button-previous"]';
  }

  goto = async () => {
    await page.waitForLoadState('load');
    await page.goto(env.ACNT_DESIGN_SEVICES_PAGE_URL);
  };

  async verifyDesignServicesFormPrepopulated() {
    await page.waitForLoadState('load');

    // verify prepopulated fields , email is not editable
    await expect(page.locator(this.txtDisabledEmail)).toHaveClass('disabled-email-text');
    await expect(page.locator(this.txtDisabledEmail)).toHaveText(td.designServicesForm.disabledEmail);
    await expect(page.locator(this.txtFname)).not.toBeEmpty();
    await expect(page.locator(this.txtLname)).not.toBeEmpty();

    // verify all labels
    await expect(page.locator(this.lblEmail)).toHaveText(env.ACNT_DS_FORM_LBL_EMAIL_REQUIRED);
    await expect(page.locator(this.lblPhone)).toHaveText(env.ACNT_DS_FORM_LBL_PHONE_REQUIRED);
    await expect(page.locator(this.lblFname)).toHaveText(env.ACNT_DS_FORM_LBL_FNAME_REQUIRED);
    await expect(page.locator(this.lblLname)).toHaveText(env.ACNT_DS_FORM_LBL_LNAME_REQUIRED);
    await expect(page.locator(this.lblZipCode)).toHaveText(env.ACNT_DS_FORM_LBL_ZIPCODE_REQUIRED);
    await expect(page.locator(this.lblPrefContactMethod)).toHaveText(env.ACNT_DS_FORM_LBL_CONTACT_METHOD_REQUIRED);

    testReport.log(this.pageName, 'Design Services form loaded and prepopulated');
  }

  async fillOutDesignServicesForm() {
    // first screen
    await page.waitForLoadState('load');

    if (env.EXEC_SITE.endsWith('us')) {
      await page.fill(this.txtZipCode, td.myaccountpage_address.zipcode);
    } else await page.fill(this.txtZipCode, td.myaccountpage_address.zipcodeCa);
    await page.fill(this.txtPhone, td.myaccountpage_address.phone);
    await page.locator(this.ddlPrefContactMethod).selectOption(td.designServicesForm.preferredContactMethod);
    await page.locator(this.btnContinue).click();

    // second screen
    await page.waitForLoadState('load');

    await page.locator(this.chkSpacePlanning).click();
    await expect(page.locator(this.chkSpacePlanning)).toBeChecked();

    if (env.EXEC_SITE.startsWith('crate')) {
      await expect(page.locator(this.chkRoomUpdates)).not.toBeChecked();
      await expect(page.locator(this.chkStyling)).not.toBeChecked();
      await expect(page.locator(this.chkStartingFresh)).not.toBeChecked();

      await page.locator(this.chkSpacePlanning).click();
      await expect(page.locator(this.chkSpacePlanning)).not.toBeChecked();

      await page.locator(this.chkRoomUpdates).click();
      await expect(page.locator(this.chkSpacePlanning)).not.toBeChecked();
    } else if (env.EXEC_SITE.startsWith('cb2')) {
      await expect(page.locator(this.chkRoomRefresh)).not.toBeChecked();
      await expect(page.locator(this.chkStylingHelp)).not.toBeChecked();
      await expect(page.locator(this.chkEmptyRoom)).not.toBeChecked();

      await page.locator(this.chkSpacePlanning).click();
      await expect(page.locator(this.chkSpacePlanning)).not.toBeChecked();

      await page.locator(this.chkRoomRefresh).click();
      await expect(page.locator(this.chkSpacePlanning)).not.toBeChecked();
    }

    await page.fill(this.txtDesignDetails, td.designServicesForm.msgDesignDetails);
    await page.locator(this.btnContinueSecond).click();

    // third screen
    await page.waitForLoadState('load');

    await expect(page.locator(this.btnAddAnotherLink)).toBeEnabled();
    await expect(page.locator(this.btnUploadImage)).toBeEnabled();

    await page.fill(this.txtTellUsMore, td.designServicesForm.msgDesignDetails);
    await page.locator(this.btnSendToDesignTeam).click();
    await page.waitForLoadState('load');
  }

  async verifyFormIsSent() {
    await expect(page.locator(this.msgSuccess)).toBeVisible({ timeout: 30000 });
    const isSuccessMsgVisible = await page.locator(this.msgSuccess).isVisible();
    if (isSuccessMsgVisible) {
      await this.successMsgVisible();
    }

    await page.locator(this.btnContinueShopping).click();
  }

  async successMsgVisible() {
    await page.locator(this.msgSuccess).isVisible();
    await expect(page.locator(this.msgSuccess)).toHaveText(env.ACNT_DS_FORM_SUCCESS_MSG, { ignoreCase: true });
    await expect(page.locator(this.btnContinueShopping)).toBeVisible();
    await expect(page.locator(this.lnkWhatsNew)).toBeEnabled();
    await expect(page.locator(this.lnkPDFGuide)).toBeEnabled();
    if (env.EXEC_SITE.startsWith('crate')) {
      await expect(page.locator(this.msgListSuccess)).toHaveText(td.designServicesForm.msgListSuccessCB);
    } else if (env.EXEC_SITE.startsWith('cb2')) {
      await expect(page.locator(this.msgListSuccess)).toHaveText(td.designServicesForm.msgListSuccessCB2);
      await expect(page.locator(this.lnkOurLatestLookbook)).toBeEnabled();
    }
  }

  async verifyDesignServicesFormIsNotPrepopulated() {
    await page.waitForLoadState('load');

    // verify all labels
    await expect(page.locator(this.lblEmail)).toHaveText(env.ACNT_DS_FORM_LBL_EMAIL_REQUIRED);
    await expect(page.locator(this.lblPhone)).toHaveText(env.ACNT_DS_FORM_LBL_PHONE_REQUIRED);
    await expect(page.locator(this.lblFname)).toHaveText(env.ACNT_DS_FORM_LBL_FNAME_REQUIRED);
    await expect(page.locator(this.lblLname)).toHaveText(env.ACNT_DS_FORM_LBL_LNAME_REQUIRED);
    await expect(page.locator(this.lblZipCode)).toHaveText(env.ACNT_DS_FORM_LBL_ZIPCODE_REQUIRED);
    await expect(page.locator(this.lblPrefContactMethod)).toHaveText(env.ACNT_DS_FORM_LBL_CONTACT_METHOD_REQUIRED);

    // verify prepopulated fields , email is editable
    await expect(page.locator(this.txtEnabledEmail)).toHaveClass(' input-xl');
    await expect(page.locator(this.txtEnabledEmail)).toBeEmpty();
    await expect(page.locator(this.txtFname)).toBeEmpty();
    await expect(page.locator(this.txtLname)).toBeEmpty();

    testReport.log(this.pageName, 'Design Services form loaded and is not prepopulated');
  }

  async enterPasswordandSignIn(password) {
    await expect(page.locator(this.lblReturningUserGreeting)).toBeVisible({ timeout: 20000 });
    await expect(page.locator(this.lblSignInConfirmation)).toHaveText(td.designServicesForm.signInDesc);
    await expect(page.locator(this.lnkResetPassword)).toBeVisible();
    await expect(page.locator(this.lnkPrevious)).toBeVisible();
    await expect(page.locator(this.lblSignInAgreement)).toBeVisible();
    testReport.log(this.pageName, 'Verified the content on login page');
    await page.fill(el.loginPage.txtPassword, password);
    await page.locator(el.loginPage.btnSignIn).click();
    testReport.log(this.pageName, 'Entered the password and clicked on sign in button');
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  async verifySignIn() {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(4000);
    if (env.EXEC_SITE.includes('crate')) {
      await expect(page.locator(el.homePage.lblAcntGreeting)).toBeAttached({ timeout: 30000 });
      // await page.waitForSelector(el.homePage.lblAcntGreeting, { state: 'attached', timeout: 90000 });
      await expect(page.locator(el.homePage.lblAcntGreeting)).toContainText('Hi,');
    } else {
      await expect(page.locator(el.homePage.lblAcntGreetinCB2)).toBeAttached({ timeout: 30000 });
      // await page.waitForSelector(el.homePage.lblAcntGreetinCB2, { state: 'attached', timeout: 90000 });
      await expect(page.locator(el.homePage.lblAcntGreetinCB2)).toContainText('Hi,');
    }
    testReport.log(this.pageName, 'Login is successful');
  }
}

module.exports = new DesignServices();
