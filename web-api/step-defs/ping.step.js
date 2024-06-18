const { Given, Then } = require('@cucumber/cucumber');
const { PingApiAction } = require('../page-objects/pages/ping-api-action');

const pingApiAction = new PingApiAction();

Given('Affiliate executes the ping-api-page-action', async function () {
  await pingApiAction.pingApiGoToPage();
});

Then('The ping-api-action for affiliate has been verified', async function () {
  await pingApiAction.pingApiVerfied();
});

Given('Affiliate executes the ping-api-action', async function () {
  await pingApiAction.getPingApiModel();
});

Then('The ping-api-page-action for affiliate is displayed', async function () {
  await pingApiAction.pingApiPageValidate();
});
