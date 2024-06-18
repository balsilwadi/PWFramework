const { When, Then } = require('@cucumber/cucumber');
const CustomerService = require('../../page-objects/pages/account-page/customer-service.page');
const env = require('../../../support/env/env');

// const customerServicePage = new CustomerService();

When('Customer clicks on Customer Service link', async function () {
  this.pageObject = CustomerService;
  await this.pageObject.navigateToCustomerService();
});

Then('Customer service page should launch', async function () {
  await this.pageObject.verifyCustomerServicePageisLaunched();
});

Then('the links on customer service page should navigate to the desired pages', async function () {
  await this.pageObject.verifyOrderTrackingLink();
  if (env.EXEC_SITE.includes('us')) await this.pageObject.verifyCBCCLink();
  await this.pageObject.verifySchDeliveryLink();
  await this.pageObject.verifyGCBalanceLink();
  await this.pageObject.verifyMngAccountLink();
  await this.pageObject.verifyStartReturnsLink();
});
