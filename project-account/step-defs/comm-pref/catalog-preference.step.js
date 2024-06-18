const { When, Then } = require('@cucumber/cucumber');
const CatalogPreferencePage = require('../../page-objects/pages/comm-pref/catalog-preference.page');
const env = require('../../../support/env/env');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

Then('Catalog preference page should display', async function () {
  this.pageObject = CatalogPreferencePage;
  if (env.EXEC_SITE.endsWith('us')) {
    await this.pageObject.validateCatalogPreferencePage();
  } else {
    await this.pageObject.validateCatalogPage();
  }
});
Then('Catalog unsubscribe form should display', async function () {
  if (env.EXEC_SITE.endsWith('us')) {
    await this.pageObject.validateCatalogUnsubscribeForm();
    await this.pageObject.validatePrepopulatedAddress();
  } else {
    testReport.log(`This feature not valid in canada sites`);
  }
});
When('Customer submit catalog unsubscribe form', async function () {
  if (env.EXEC_SITE.endsWith(`us`)) {
    await this.pageObject.submitCatalogUnsubscribeForm();
  } else {
    testReport.log(`This feature not valid in canada sites`);
  }
});
Then('Catalog unsubscribe success message should display', async function () {
  if (env.EXEC_SITE.endsWith(`us`)) {
    await this.pageObject.validateSuccessMessage();
  } else {
    testReport.log(`This feature not valid in canada sites`);
  }
});
