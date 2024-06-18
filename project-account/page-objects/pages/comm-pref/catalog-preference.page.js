const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();
class CatalogPreferencePage extends PageObject {
  constructor() {
    super();
    this.pageName = 'CatalogPreferencePage';
    this.hdrCatalogPreference = "[class*='page-title'] >> nth=1";
    this.hdrRemoveFromList = '.customer-service-content > div > h3';
    this.frmAddress = '.address-form';
    this.lblFirstName = '[for=firstName]';
    this.txtFirstName = '#firstName';
    this.lblLastName = '[for=lastName]';
    this.txtLastName = '#lastName';
    this.lblAddress1 = '[for=address1]';
    this.txtAddress1 = '#address1';
    this.lblAddress2 = '[for=address2]';
    this.txtAddress2 = '#address2';
    this.lblCity = '[for=city]';
    this.txtCity = '#city';
    this.lblState = '[for=state]';
    this.ddState = '#state';
    this.lblZipCode = '[for=zipCode]';
    this.txtZipCode = '#zipCode';
    this.btnSubmit = '[class="button button-md button-primary"]';
    this.hdrSuccess = '.customer-service-content > div > h3';
    this.msgSuccess = '[class="desktop-small standard-text"]';
    this.hdrCatalog = '[class="landing-page-content custom-cms"] > div > h1';
  }

  async validateCatalogPreferencePage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.hdrCatalogPreference)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(this.hdrCatalogPreference)).toHaveText('Catalog Preferences');
    await expect(page.locator(this.hdrRemoveFromList)).toHaveText('Remove me from your catalog list');
    await expect(page.locator(this.frmAddress)).toBeVisible();
    testReport.log(this.pageName, 'Catalog preference page displayed with unsubscribe form');
  }

  async validateCatalogUnsubscribeForm() {
    await expect(page.locator(this.frmAddress)).toBeVisible();
    await expect(page.locator(this.hdrRemoveFromList)).toHaveText('Remove me from your catalog list');
    await expect(page.locator(this.lblFirstName)).toHaveText('First NameRequired');
    await expect(page.locator(this.txtFirstName)).toBeVisible();
    await expect(page.locator(this.lblLastName)).toHaveText('Last NameRequired');
    await expect(page.locator(this.txtLastName)).toBeVisible();
    await expect(page.locator(this.lblAddress1)).toHaveText('Address 1Required');
    await expect(page.locator(this.txtAddress1)).toBeVisible();
    await expect(page.locator(this.lblAddress2)).toHaveText('Address 2Optional');
    await expect(page.locator(this.txtAddress2)).toBeVisible();
    await expect(page.locator(this.lblCity)).toHaveText('CityRequired');
    await expect(page.locator(this.txtCity)).toBeVisible();
    await expect(page.locator(this.lblState)).toHaveText('StateRequired');
    await expect(page.locator(this.ddState)).toBeVisible();
    await expect(page.locator(this.lblZipCode)).toHaveText('ZIP CodeRequired');
    await expect(page.locator(this.txtZipCode)).toBeVisible();
    await expect(page.locator(this.btnSubmit)).toBeVisible();
    testReport.log(this.pageName, 'Verified catalog unsusbcribe form elements');
  }

  async validatePrepopulatedAddress() {
    await expect(page.locator(this.txtFirstName)).toHaveValue(td.catalogUnsubscribeForm.firstName);
    await expect(page.locator(this.txtLastName)).toHaveValue(td.catalogUnsubscribeForm.lastName);
    await expect(page.locator(this.txtAddress1)).toHaveValue(td.catalogUnsubscribeForm.address1);
    await expect(page.locator(this.txtCity)).toHaveValue(td.catalogUnsubscribeForm.city);
    await expect(page.locator(this.ddState)).toHaveValue(td.catalogUnsubscribeForm.state);
    await expect(page.locator(this.txtZipCode)).toHaveValue(td.catalogUnsubscribeForm.zipCode);
    testReport.log(this.pageName, 'Verified prepopulated values in catalog unsubscribe form');
  }

  async submitCatalogUnsubscribeForm() {
    await expect(page.locator(this.btnSubmit)).toBeVisible();
    await page.locator(this.btnSubmit).click();
    testReport.log(this.pageName, 'Clicked on submit button in catalog unsubscribe form');
  }

  async validateSuccessMessage() {
    await expect(page.locator(this.hdrSuccess)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(this.hdrSuccess)).toHaveText(`Thank You`);
    await expect(page.locator(this.msgSuccess)).toHaveText(env.ACNT_CATALOG_UNSUB_SUCCESS_MSG);
    testReport.log(this.pageName, 'Success message displayed in catalog preference page');
  }

  async validateCatalogPage() {
    await common.proceedToCanadaFromGlobalPopup();
    await expect(page.locator(this.hdrCatalog)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(this.hdrCatalog)).toHaveText(env.ACNT_CATALOG_HDR);
    await expect(page).toHaveURL(env.BASE_URL + env.ACNT_CATALOG_URL);
  }
}
module.exports = new CatalogPreferencePage();
