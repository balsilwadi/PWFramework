const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../support/utils/report-utils');
const SubObject = require('../../project-shared/page-objects/pages/sub-object');

const testReport = new ReportUtils();

class RegistryConfirmationPopup extends SubObject {
  constructor() {
    super();
    this.pageName = 'Registry Confirmation Popup Modal';

    this.confModel = '//*[@class="quick-add-message-text"]';
    this.btnViewYourRegistry = '//*[@id="confirmationLayer"]/p/a';
  }

  async verifyAddtoRegistryConfirmation() {
    await expect(page.locator(this.confModel)).toBeVisible();
    testReport.log(this.pageName, 'Verified the Add to registry confirmation popup.');
  }

  async clickViewYourRegistry() {
    await page.locator(this.btnViewYourRegistry).click();
    testReport.log(this.pageName, 'View Registry button clicked.');
  }
}

module.exports = new RegistryConfirmationPopup();
