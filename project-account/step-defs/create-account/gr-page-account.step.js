const { When, Then } = require('@cucumber/cucumber');
const { GiftRegistryPage } = require('../../page-objects/pages/login/gift-registry.page');

const giftRegistryPage = new GiftRegistryPage();

When('Customer clicks Create my registry', async function () {
  await giftRegistryPage.clickOnCreateMyRegistry();
});

Then('step1 intake form should be loaded', async function () {
  await giftRegistryPage.verifyStep1IntakeForm();
});

When('Customer fills information and brand new email', async function () {
  await giftRegistryPage.fillOutStep1IntakeForm();
});

Then('step2 intake form should be loaded', async function () {
  await giftRegistryPage.verifyStep2IntakeForm();
});

When('Customer enters password', async function () {
  await giftRegistryPage.fillOutStep2IntakeForm();
});

Then('step1 GR page should display with Hi message', async function () {
  await giftRegistryPage.validateMyGRStep1Page();
});

When('Customer fills information and existing email', async function () {
  await giftRegistryPage.fillOutStep1IntakeFormExistingCustomer();
});

Then('step2 intake form should be loaded for existing Customer', async function () {
  await giftRegistryPage.verifyStep2IntakeFormExistingCustomer();
});
