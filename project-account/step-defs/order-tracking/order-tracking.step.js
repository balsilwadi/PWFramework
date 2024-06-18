const { When, Then } = require('@cucumber/cucumber');
const OrderTrackingPage = require('../../page-objects/pages/order-tracking/order-tracking.page');
const { RequestUtils } = require('../../../support/utils/api-request-utils');
const env = require('../../../support/env/env');

const requestUtils = new RequestUtils();

When('Customer navigates to order tracking page', async function () {
  this.pageObject = OrderTrackingPage;
  await this.pageObject.goto();
});
When('Customer enters the Order Number and Email', async function () {
  await this.pageObject.verifyOrderTrackingpage();
  await this.pageObject.enterOrderTrackingDetails(env.ACNT_ORDTRK_ORDERNUM, env.ACNT_ORDTRK_EMAIL);
});
When('Customer view the order summary page', async function () {
  await this.pageObject.verifyOrderSummaryDetails();
});

When('User request Authorization API with {string} and {string}', async function (jsonName, secretKey) {
  await requestUtils.getBearerToken(jsonName, 'project-account', secretKey);
});

When('User request Authorization API with {string}', async function (jsonName) {
  // gets the bearer token without secret key
  await requestUtils.getBearerTokenData(jsonName, 'project-account');
  // await requestUtils.getBearerToken(jsonName, 'project-account');
});

When('User send GET request to API with Data and Secretkey', async function () {
  await requestUtils.getRequestWithBearerToken(env.ACNT_ORDTRK_DATA, 'project-account', 'Get_Order_Details_API_x-api-key');
});
Then('Customer should see order tracking section in order tracking page', async function () {
  this.pageObject = OrderTrackingPage;
  await this.pageObject.verifyOrderTrackingpage();
});
Then('Start return link should display', async function () {
  await this.pageObject.verifyStartReturnLink();
});
Then('Clicking on Start Return link should launch the narvar page', async function () {
  await this.pageObject.clickOnStartReturnLink();
});
When('Customer enters the Order Number in delivered status', async function () {
  await this.pageObject.enterOrderTrackingDetails(env.ACNT_RETURN_ORDER, env.ACNT_RETURN_EMAIL);
});
