const { When, Then } = require('@cucumber/cucumber');
const { LogInPage } = require('../../page-objects/pages/login/login.page');
const { AccountSettingsPage } = require('../../page-objects/pages/account-page/account-settings.page');
const { CommonUtils } = require('../../../support/utils/common-utils');

const loginPage = new LogInPage();
const accountSettingsPage = new AccountSettingsPage();
const common = new CommonUtils();

let email;
let password;

When('Customer updates his email address', async function () {
  this.setData('newEmail', common.generateNewEmail());
  await accountSettingsPage.updateEmail(this.data.newEmail);
});

When('Customer updates his password', async function () {
  // adding the below validation to make sure the generated password contains at least 1 number
  let hasNum = false;
  let newPwd;
  while (!hasNum) {
    newPwd = common.generatePassword();
    hasNum = common.hasNumber(newPwd);
  }
  this.setData('newPassword', newPwd);
  password = await accountSettingsPage.updatePassword(this.data.newPassword);
});

When('Customer sign in with updated login credentials', async function () {
  await loginPage.enterCredentials(email, password);
  await loginPage.clickOnSignInButton();
});

Then('Account settings page should display', async function () {
  await accountSettingsPage.verifyPageHeader();
  await accountSettingsPage.verifyUpdateEmailSection();
  await accountSettingsPage.verifyUpdatePasswordSection();
});

Then('Customer views email of {string} account', async function (scenario) {
  await accountSettingsPage.verifyLoggedInUserEmail(scenario, email);
});
