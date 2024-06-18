const { When, Then } = require('@cucumber/cucumber');
const ComboInterrupter = require('../../page-objects/pages/interrupter/combo-interrupter.page');
const { RequestUtils } = require('../../../support/utils/api-request-utils');

const requestUtils = new RequestUtils();
const env = require('../../../support/env/env');

Then('Combo interrupter should display', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyComboInterrutperisDisplayed();
  await this.pageObject.verifyComboInterrutperContent();
});
When('customer submits the combo interrutper', async function () {
  await this.pageObject.submitComboInterrutper();
});
Then('the second page of the interrutper should display', async function () {
  await this.pageObject.verifyInterrupterSecondPage();
});
Then('the final page of the interrupter should display', async function () {
  await this.pageObject.verifyInterrupterFinalPage();
});
When('User send GET Preferences request to API with Data and Secretkey', async function () {
  const newEmail = env.ACNT_NEWEMAIL;
  const locales = ['cb-en-us', 'c2-en-us', 'hg-en-us'];
  let getPreferenesJSON;
  let obj;
  const results = [];
  for (let i = 0; i < locales.length; i++) {
    getPreferenesJSON =
      `{ "URL1": "/profile/preferences?locales=${locales[i]}&email=${newEmail}",` +
      `"Headers": { "Authorization": "Bearer ", "Cookie": "null", "x-api-key": "null"},` +
      `"data": { "grant_type": "null", "scope": "null"},` +
      `"httpCredentials": {"username": "null","password": "null"}` +
      `}`;
    obj = JSON.parse(getPreferenesJSON);
    results.push(requestUtils.getAPIRequestWithBearerToken(obj, locales[i], 'Get_Order_Details_API_x-api-key'));
  }
  await Promise.all(results);
});
Then('Customer verifies the Terms link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyTermsLink();
});
Then('Customer verifies the Privacy Policy link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyPrivacypolicyLink();
});
Then('Customer verifies the Offer Terms link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyOfferTermsLink();
});
Then('Customer verifies the Kids Terms link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyKidsTermsLink();
});
Then('Customer verifies the Kids Privacy Policy link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyKidsPrivacypolicyLink();
});
Then('Customer verifies the Kids Offer Terms link', async function () {
  this.pageObject = ComboInterrupter;
  await this.pageObject.verifyKidsOfferTermsLink();
});
