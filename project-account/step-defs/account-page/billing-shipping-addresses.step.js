const { When, Then } = require('@cucumber/cucumber');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { BillingShippingAddresses } = require('../../page-objects/pages/account-page/billing-shipping-addresses.page');

const accountPage = new AccountPage();
const billingShippingAddresses = new BillingShippingAddresses();

When('Customer adds valid shipping address', async function () {
  await accountPage.navigateToAddressPage();
  await billingShippingAddresses.clickonShippingAddress();
  await billingShippingAddresses.addaNewShippingAddressLink();
  await billingShippingAddresses.verifyContentShippingAddress();
  await billingShippingAddresses.fillaNewShippingAddress();
});

When('Customer edits existing shipping address', async function () {
  await billingShippingAddresses.editShippingAddress();
});

When('Customer deletes existing shipping address', async function () {
  await billingShippingAddresses.deleteShippingAddress();
});

Then('address should not display as a shipping address', async function () {
  await billingShippingAddresses.verifyDeleteShippingAddress();
});

Then('Customer adds the Billing Address', async function () {
  await accountPage.navigateToAddressPage();
  await billingShippingAddresses.clickonBillingAddress();
  await billingShippingAddresses.addNewBillingAddress(this.data.newEmail);
});

Then('Customer edits the Billing Address', async function () {
  await accountPage.navigateToPaymentPage();
  await accountPage.navigateToAddressPage();
  await billingShippingAddresses.clickonBillingAddress();
  await billingShippingAddresses.editBillingAddress();
});

Then('Customer adds the International Billing Address', async function () {
  // await accountPage.navigateToAddressPage();
  await billingShippingAddresses.clickonBillingAddress();
  await billingShippingAddresses.addInternationalBillingAddress(this.data.newEmail);
});

Then('Customer click on the Address Link', async function () {
  await accountPage.navigateToAddressPage();
});

Then('address should be added as a shipping address', async function () {
  await billingShippingAddresses.verifytheAddedShippingAddress();
});

Then('changes should be saved', async function () {
  await billingShippingAddresses.verifyEditShippingAddress();
});
