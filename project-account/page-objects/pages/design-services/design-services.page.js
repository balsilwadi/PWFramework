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
    this.imgDesignDesk = 'div.design-package-list-container img';
    this.lblHeader = 'h1.design-packages-title';
    this.lblDesc = 'div.design-package-list-container p:nth-of-type(1)';
    this.lblMsg = 'div.design-package-list-container p:nth-of-type(2)';
    // this.lblPackageDate = '.package-date';
    this.lblPackageDate = '.package-date:nth-of-type(2)';
    this.itemTrainStop2 = 'li.step-2.step-active';
    this.btnActiveBrand = 'div.site-buttons div';
    this.lnkSecondBrand = 'div.site-buttons a';
    this.lblDivider = 'span.flex-spacer';
    this.lnkStartNewPackage = "div.account-content a[class*='button-primary']";
    // this.lnkPackageLink = '.package-link';
    this.lnkPackageLink = '.package-link:nth-of-type(1)';
    this.lnkBacktoDesignPackages = '.button-transparent.my-design-packages';
    this.lnkQuoteDate = "//div[contains(@class,'design-package-info')]//p[1]";
    this.lnkPackageName = "div[class='design-package-info'] h2";
    this.lnkPackageNameCB2 = 'h2[class="design-package-title"]';
    this.lnkDesignerInfo = "div[class='designer-info'] p";
    this.lnkDesignPackage2 = "//button[normalize-space()='Design Package']";
    this.lnkProductList = "//button[normalize-space()='Products']";
    this.imgMoodboard = '.moodboard-img';
    this.lnkDownloadPackage = '#link-open-package';
    this.lnkRoomTour = '#link-360-tour';
    this.msgCBCC = "//div[contains(@class,'plcc-offer-cms')]//p[1]";
    this.additonalMessageCBCC = "//div[contains(@class,'plcc-offer-cms')]//p[2]";
    this.btnAddAll = "button[class='button button-primary button-xl add-all-to-cart']";
    this.msgPopUp = '.quick-add-message-text';
    this.lnkViewMyCart = 'a.quick-add-message-link';
    this.btnBookAppointment = 'div#sContent_Hero_Core_DesignDeskHero a';
    this.btnDesignServicesForm = 'a#onlineAptBtn';
    this.designServicesFormTrainStops = 'div.ds-form-page div.navigation-list-wrap ul.navigation-list';
    this.txtFirstName = 'input[name=firstName]';
    this.txtLastName = 'input[name=lastName]';
    this.txtEmail = 'input#ds-email';
    this.txtPassword = 'input[name=password]';
    this.txtPhone = 'input[name=phone]';
    this.txtZipCode = 'input[name=zipCode]';
    this.ddlContactMethod = 'select[name=preferredContactMethod]';
    this.formProjectStyle = 'form.ds-form.project-style';
    this.formDocumentAndLink = 'form.ds-form.document-and-link';
    this.txtTellUsMore = '#ds-tell-us-more';
  }

  async goToDesignServicesForm() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    testReport.log(this.pageName, 'Navigate to Design Services Form page');
    await page.goto(`${env.BASE_URL}/design-services-form`);
    await page.waitForLoadState();
  }

  /**
   * @function : verifyDesignPackagesPageforNewCustomer
   * @Description : Verify the design packages page for a new customer
   * @Params: None
   * @Returns: none
   */

  async verifyDesignPackagesPageforNewCustomer() {
    // verify the content on the page
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.imgDesignDesk)).toBeVisible();
    await expect(page.locator(this.lblHeader)).toHaveText(td.designPackage.header);
    await expect(page.locator(this.lblDesc)).toHaveText(td.designPackage.desc);
    await expect(page.locator(this.btnActiveBrand)).toHaveText(env.ACNT_DS_ACTIVEBRAND, { ignoreCase: true });
    expect(await page.innerText(this.lnkSecondBrand)).toMatch(new RegExp(env.ACNT_DS_SECONDARYBRAND));
    await expect(page.locator(this.lblDivider)).toBeVisible();
    await expect(page.locator(this.lblMsg)).toHaveText(td.designPackage.newPackage);
    expect(await page.innerText(this.lnkStartNewPackage)).toMatch(new RegExp(td.designPackage.startNewPackage));
    testReport.log(this.pageName, 'Content is matching as expected in Design Services page');
    // click on the start new package button
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(this.lnkStartNewPackage).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(env.ACNT_DS_URL));
    testReport.log(this.pageName, 'Design services page opened in new window');
    await newPage.close();
    // Click on the secondarybrand
    const [newPage1] = await Promise.all([global.context.waitForEvent('page'), page.locator(this.lnkSecondBrand).click()]);
    await newPage1.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage1).toHaveURL(new RegExp(env.ACNT_DS_SECONDARYURL));
    testReport.log(this.pageName, 'Secondary site opened in new window');
    await newPage1.close();
  }

  async verifyDesignPackagesPageforCustomerwithPackage() {
    // verify the content on the page
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.imgDesignDesk)).toBeVisible();
    await expect(page.locator(this.lblHeader)).toHaveText(td.designPackage.header);
    await expect(page.locator(this.lblDesc)).toHaveText(td.designPackage.desc);
    await expect(page.locator(this.btnActiveBrand)).toHaveText(env.ACNT_DS_ACTIVEBRAND, { ignoreCase: true });
    expect(await page.innerText(this.lnkSecondBrand)).toMatch(new RegExp(env.ACNT_DS_SECONDARYBRAND));
    await expect(page.locator(this.lblDivider)).toBeVisible();
    await expect(page.locator(this.lblPackageDate)).toHaveText(env.ACNT_DSGNSRVS_PACKAGEDATE);
    expect(await page.innerText(this.lnkPackageLink)).toMatch(new RegExp(env.ACNT_DSGNSRVS_PACKAGENAME));
    testReport.log(this.pageName, 'Content and Design Package are visible as expected in Design Services page');
  }

  async clickOnDesignPackage() {
    await page.locator(this.lnkPackageLink).click();
    testReport.log(this.pageName, 'Clicked on Design Services Package');
  }

  async verifyDesignPackage() {
    await expect(page.locator(this.lnkBacktoDesignPackages)).toBeEnabled();
    if (env.EXEC_SITE.includes('cb2us')) expect(await page.innerText(this.lnkPackageNameCB2)).toMatch(env.ACNT_DSGNSRVS_PACKAGENAME);
    else expect(await page.innerText(this.lnkPackageName)).toMatch(env.ACNT_DSGNSRVS_PACKAGENAME);
    expect(await page.innerText(this.lnkQuoteDate)).toMatch(td.designPackage.quoteDate);
    expect(await page.innerText(this.lnkDesignerInfo)).toMatch(td.designPackage.designerInfo);
    expect(await page.innerText(this.lnkDesignPackage2)).toMatch(td.designPackage.lnkDesignPackage);
    expect(await page.innerText(this.lnkProductList)).toMatch(td.designPackage.lnkProducts);
    await expect(page.locator(this.imgMoodboard)).toBeVisible();
    await expect(page.locator(this.lnkDownloadPackage)).toBeEnabled();
    await expect(page.locator(this.lnkRoomTour)).toBeEnabled();
    if (env.EXEC_SITE.includes('crateus')) {
      await expect(page.locator(this.msgCBCC)).toHaveText(td.designPackage.msgCBCC, { ignoreCase: true });
    } else if (env.EXEC_SITE.includes('cb2us')) {
      expect(await page.innerText(this.msgCBCC)).toContain(td.designPackage.msgCBCC_CB2);
    }
    testReport.log(this.pageName, 'Verified Design Package');
  }

  async goToProductsList() {
    await page.locator(this.lnkProductList).click();
    await page.locator(this.btnAddAll).click();
    testReport.log(this.pageName, 'Clicked on Add All on Product list');
  }

  async verifyAddAllPopUp() {
    expect(await page.innerText(this.msgPopUp)).toContain(td.designPackage.msgAddAll, { timeout: 60000 });
    await expect(page.locator(this.lnkViewMyCart)).toBeVisible({ timeout: 30000 });
    await page.locator(this.lnkViewMyCart).click();
    expect(page.url()).toContain(env.ACNT_CART_URL);
    testReport.log(this.pageName, 'Added products and navigated to cart');
  }

  async clickLabelByCheckbox(selector, index) {
    const inputId = await page.locator(selector).nth(index).getAttribute('id');
    await page.locator(`label[for="${inputId}"]`).click();
  }

  /**
   * @author: FAgudelo
   * @function_Name : fillFormDesignServicesStep1
   * @Description : Fills out the Design Services Form
   * @params : none
   * @returns : None
   * */
  async fillFormDesignServicesStep1(loginEmail) {
    const currentUrl = page.url();
    const options = { delay: 100 };
    testReport.log(this.pageName, `Design Services Form page verifying at ${currentUrl}`);
    await expect(page.locator(this.designServicesFormTrainStops)).toBeVisible({ timeout: 30000 });

    // enter the details to create a new account
    await page.locator(this.txtFirstName).fill(td.createnewaccount.fName);
    await page.locator(this.txtLastName).fill(td.createnewaccount.lName);
    await page.locator(this.txtPhone).fill(td.createnewaccount.phone);
    await page.locator(this.txtEmail).fill(loginEmail);
    await page.locator(this.txtZipCode).fill(env.DEFAULT_ZIPCODE);
    await page.locator(this.ddlContactMethod).selectOption({ index: 2 });
    testReport.log(this.pageName, 'Entered values on create account field');
    await page.click(el.createAccountPage.btnCreateAccount, { options });
  }

  async fillFormDesignServicesStep2(loginPassword) {
    const options = { delay: 100 };

    // Enter new password
    const pwd = loginPassword ?? td.createnewaccount.password;
    await expect(page.locator(this.txtPassword)).toBeVisible({ timeout: 30000 });
    await page.locator(this.txtPassword).fill(pwd);
    testReport.log(this.pageName, 'Entered password on create account field');
    await page.click(el.createAccountPage.btnCreateAccount, { options });
  }

  async verifyFormDesignServicesStep2() {
    testReport.log(this.pageName, 'Verify step 2');
    await expect(page.locator(this.itemTrainStop2)).toBeVisible({ timeout: 30000 });
    testReport.log(this.pageName, `Verified step 2`);
  }

  async fillFormDesignServicesStep3() {
    const options = { delay: 100 };

    // Verify next page
    await expect(page.locator(this.formProjectStyle)).toBeVisible({ timeout: 30000 });
    await this.clickLabelByCheckbox('input[name=projectKind]', 2);
    await this.clickLabelByCheckbox('input[name=rooms]', 0);
    await this.clickLabelByCheckbox('input[name=rooms]', 2);
    await this.clickLabelByCheckbox('input[name=rooms]', 3);
    await this.clickLabelByCheckbox('input[name=colors]', 1);
    await this.clickLabelByCheckbox('input[name=colors]', 2);
    await this.clickLabelByCheckbox('input[name=usedBy]', 0);
    await this.clickLabelByCheckbox('input[name=usedBy]', 1);
    await this.clickLabelByCheckbox('input[name=styles]', 1);
    await this.clickLabelByCheckbox('input[name=styles]', 3);
    await this.clickLabelByCheckbox('input[name=styles]', 4);
    testReport.log(this.pageName, 'Completed style selections');
    await page.click(el.createAccountPage.btnCreateAccount, { options });
  }

  async fillFormDesignServicesStep4() {
    const options = { delay: 100 };

    await expect(page.locator(this.formDocumentAndLink)).toBeVisible({ timeout: 30000 });
    await page.locator(this.txtTellUsMore).fill(td.createnewaccount.description);
    testReport.log(this.pageName, 'Completed document and link info');
    await page.click(el.createAccountPage.btnCreateAccount, { options });
  }

  async verifyDesignServicesFormCompleted() {
    const currentUrl = page.url();

    await expect(page.locator('div')).toBeVisible({ timeout: 30000 });
    testReport.log(this.pageName, `Design Services Form page verified at ${currentUrl}`);
  }
}

module.exports = new DesignServices();
