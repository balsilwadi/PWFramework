const { When } = require('@cucumber/cucumber');
const { MarLogInPage } = require('../page-objects/pages/login.page');
const env = require('../../support/env/env');

const loginPage = new MarLogInPage();

When('Customer login with an existing account', async function () {
  await loginPage.loginWithOkta(env.MAR_EMAIL, env.MAR_PASSWORD);
});
