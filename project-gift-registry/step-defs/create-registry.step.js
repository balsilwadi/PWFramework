const { Given, When } = require('@cucumber/cucumber');
const { RegistryAccount } = require('../helpers/registry-account');

Given('I have created a registry', async function () {
  const registryAccount = new RegistryAccount();
  const body = registryAccount.BuildCreateRegistryRequest();
  await registryAccount.createRegistry(body);
});

Given('I have created a registry with a co-registrant', async function () {
  const registryAccount = new RegistryAccount();
  const body = registryAccount.withCoRegistrant().BuildCreateRegistryRequest();
  await registryAccount.createRegistry(body);
});

Given('I have created a registry with the following registrant', async function (table) {
  const registryAccount = new RegistryAccount();
  const data = table.rowsHash();
  const body = registryAccount
    .withRegistrant({
      email: data.email,
      password: data.password,
      profileId: data.profileId
    })
    .build();
  await registryAccount.createRegistry(body);
});

Given('I have created a registry with sms preference', async function () {
  const registryAccount = new RegistryAccount();
  const body = registryAccount.withSmsPreference.BuildCreateRegistryRequest();
  await registryAccount.createRegistry(body);
});

Given('I have created a registry with email preference', async function () {
  const registryAccount = new RegistryAccount();
  const body = registryAccount.withEmailPreference.BuildCreateRegistryRequest();
  await registryAccount.createRegistry(body);
});

When('the customer clicks create a registry', async function () {
  // if (!context.page) Assert.Fail("no context");
  // if (!context.page.clickCreateRegistry) Assert.Fail("no context");
  // context.page.clickCreateRegistry();
});
