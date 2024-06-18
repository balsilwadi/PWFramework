const { When, Then } = require('@cucumber/cucumber');
const { CreateDummyAccount } = require('../../page-objects/pages/common/dummy-account-create');
const env = require('../../../support/env/env');

const createDummyAccount = new CreateDummyAccount();

When('DummyUser Creation with {string}', async function (email) {
  await page.goto(`${env.BASE_URL}/account/create-account`);
  await createDummyAccount.createDummyReturningUserProfile(email);
  await createDummyAccount.addDefaultShippingAddress(email);
  await createDummyAccount.addDefaultBillingAddress();
  await createDummyAccount.addCreditCardPayements();
});

Then('DummyUser update account for {string}', async function (email) {
  await page.goto(`${env.BASE_URL}/account/login`);
  await createDummyAccount.loginReturningUserProfile(email);
  await createDummyAccount.addDefaultShippingAddress();
  await createDummyAccount.addDefaultBillingAddress();
  await createDummyAccount.addCreditCardPayements();
});

When('DummyUser update email for {string} to {string}', async function (email, updateEmail) {
  await page.goto(`${env.BASE_URL}/account/login`);
  await createDummyAccount.loginReturningUserProfile(email);
  await createDummyAccount.updateEmailAddress(updateEmail);
});
