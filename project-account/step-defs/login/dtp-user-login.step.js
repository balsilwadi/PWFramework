const { Then } = require('@cucumber/cucumber');
const DTPUserLoginPage = require('../../page-objects/pages/login/dtp-user-login.page');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { BillingShippingAddresses } = require('../../page-objects/pages/account-page/billing-shipping-addresses.page');

const accountPage = new AccountPage();
const billingAddresspage = new BillingShippingAddresses();

Then('Customer views the Account Settings Page of Trade program user', async function () {
  this.pageObject = DTPUserLoginPage;
  await this.pageObject.verifyAccountSettingPageForDTPLogin();
});

Then('Customer views Billing Page of Trade program user', async function () {
  await accountPage.navigateToAddressPage();
  await billingAddresspage.clickonBillingAddress();
  await this.pageObject.verifyBillingAddressPageForDTPLogin();
});
