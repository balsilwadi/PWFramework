const { When, Then } = require('@cucumber/cucumber');
const MyStoresPage = require('../../page-objects/pages/account-page/my-store.page');
const env = require('../../../support/env/env');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

When('Customer clicks on My Store link', async function () {
  this.pageObject = MyStoresPage;
  await this.pageObject.navigateToMyStores();
});

Then('the stores page should launch', async function () {
  await this.pageObject.verifyStoresPageisLaunched();
});

When('Customer selects his store', async function () {
  if (env.EXEC_SITE.includes('cb2can')) testReport.log('Select store feature is not enabed for CB2 CA');
  else await this.setData('myStore', await this.pageObject.selectTheStore());
});

Then('the same store should display in the PDP', async function () {
  if (env.EXEC_SITE.includes('cb2can')) testReport.log('Select store feature is not enabed for CB2 CA');
  else await this.pageObject.verifyStoreinPDP(this.data.myStore);
});

Then('Customer chosen store should display', async function () {
  if (env.EXEC_SITE.includes('cb2can')) testReport.log('Select store feature is not enabed for CB2 CA');
  else await this.pageObject.verifyCustomerStoreinStoresPage(this.data.myStore);
});
