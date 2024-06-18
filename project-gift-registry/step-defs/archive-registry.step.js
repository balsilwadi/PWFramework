const { Given, When, Then } = require('@cucumber/cucumber');
const { test, expect } = require('@playwright/test');
const { getRegistry, deleteRegistry, checkRegistryExist } = require('../helpers/registry');

Given('a registry', async function () {
  const registry = await getRegistry();
  this.setData('registry', registry);
  test('expectation for registry id', async () => {
    expect(registry.id).toBeGreaterThan(0);
  });
});

When('a registry is deleted', async function () {
  await deleteRegistry(this.data.registry.id, this.data.registry.primaryRegistrant.profileId);
});

Then('registry should be deleted', async function () {
  const response = await checkRegistryExist(this.data.registry.id);
  test('expectation for registry status', async () => {
    expect(response.status()).toBe(404);
  });
});
