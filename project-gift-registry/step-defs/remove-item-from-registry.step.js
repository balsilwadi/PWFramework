const { Given, When, Then } = require('@cucumber/cucumber');
const { test, expect } = require('@playwright/test');
const { getRegistryItems, deleteRegistryItems } = require('../helpers/registry-item');
const env = require('../../support/env/env');

Given('registry with items', async function () {
  const grItems = await getRegistryItems(env.GR_ID);
  this.setData('grItems', grItems);
  test('expectation for registry items', async () => {
    expect(grItems.length).toBeGreaterThan(0);
  });
});

When('items are deleted', async function () {
  await deleteRegistryItems(env.GR_ID, this.data.grItems);
});

Then('items should be deleted', async function () {
  const gritems = await getRegistryItems(env.GR_ID);
  test('expectation for registry items', async () => {
    expect(gritems.length).toBe(0);
  });
});
