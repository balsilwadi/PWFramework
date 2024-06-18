const { Given, Then } = require('@cucumber/cucumber');
const { getRegistryById } = require('../../helpers/registry');
const { updateEventDate } = require('../../helpers/registry-edit');
const apiPage = require('../../page-objects/api-pages/gift-registry-edit.page');

Given('The user changes the event date to {int} days {string} todays date for the registry {int}', async function (numDays, direction, registryId) {
  const registry = await getRegistryById(registryId);
  const updatedDate = new Date();

  if (direction === 'Before') {
    updatedDate.setDate(updatedDate.getDate() - numDays);
  } else if (direction === 'After') {
    updatedDate.setDate(updatedDate.getDate() + numDays);
  }
  const [eventDate] = updatedDate.toISOString().split('T');
  registry.eventDate = `${eventDate}T00:00:00.000Z`;

  await updateEventDate(registry);
});

Then('The event date of {int} is {int} days {string} todays date', async function (registryId, numDays, direction) {
  await apiPage.verifyEventDateUpdated(registryId, numDays, direction);
});
