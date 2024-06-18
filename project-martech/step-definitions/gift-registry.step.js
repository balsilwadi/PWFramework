const { When } = require('@cucumber/cucumber');
const { ProductPage } = require('../page-objects/pages/pdp.page');
const { RegistryPage } = require('../page-objects/pages/gift-registry.page');
const env = require('../../support/env/env');

const productPage = new ProductPage();
const regPage = new RegistryPage();

When('navigate to the registrant list page', async function () {
  await regPage.viewExistingRegistry();
});

When('navigate to registrant list page', async function () {
  await productPage.clickViewReg();
});

When('they click on Create My Registry button in Wedding Registry', async function () {
  await regPage.clickCreateRegistry();
});

When('they register with a new email', async function () {
  await regPage.registryLoginWithNewEmail();
});

When('they add an item to registry', async function () {
  await page.goto(env.MAR_PDP_URL);
  await productPage.addItemToRegistry(1);
});

When('they create account by creating a password and continue', async function () {
  await regPage.createAccountAndContinue();
});

When('they fill out the Contact Information form and navigate to Location Preferences page', async function () {
  await regPage.fillContactInfo();
});

When('they navigate to Registry Preferences page', async function () {
  await regPage.clickLocPrefContinue();
});

When('they try to abandon the registry creation flow', async function () {
  await regPage.clickHeaderLogo();
});

When('they close popup and create new register', async function () {
  await regPage.clickNevermind();
  if (env.COUNTRY === 'CA') {
    await regPage.optinEmail();
  }
  await regPage.clickCreateMyRegistry();
});
