const { When, Then } = require('@cucumber/cucumber');
const { ConfrmPageCreateAccount } = require('../../page-objects/pages/create-account/confrm-page-create-account.page');
const { CheckoutPage } = require('../../../project-checkout/page-objects/pages/common/checkout.page');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { LogInPage } = require('../../page-objects/pages/login/login.page');

const checkoutPage = new CheckoutPage();
const confrmPage = new ConfrmPageCreateAccount();
const common = new CommonUtils();
const accountPage = new AccountPage();
const loginPage = new LogInPage();

Then('Enter a brand new email address', async function () {
  this.setData('newEmail', common.generateNewEmail());
  await confrmPage.enterNewEmailAddressinShippingPage(this.data.newEmail);
});

Then('Confirmation page displays', async function () {
  await checkoutPage.closeSurveyPopupIfShown();
});

Then('Validate the create new account fields', async function () {
  await confrmPage.verifyCreateNewAccountFields(this.data.newEmail);
});

Then('Customer Creates an account', async function () {
  this.setData('newPassword', 'Crate123!');
  await confrmPage.createAccount(this.data.newPassword);
});

Then('Customer Sign in to the newly created account', async function () {
  await confrmPage.completeTheSignin();
  await loginPage.enterCredentials(this.data.newEmail, this.data.newPassword);
  await loginPage.clickOnSignInButton();
});

Then('Customer account details should match', async function () {
  await accountPage.navigateToAccountSettings();
  await confrmPage.verifyTheAccountDetails(this.data.newEmail);
  await accountPage.clickOnSignOut();
});

When('Customer clicks on Apple Signin button', async function () {
  await confrmPage.clickOnAppleSigninButton();
});

Then('Apple signin page should display', async function () {
  await confrmPage.verifyApplySigninPage();
});

When('Customer clicks on Google Signin button', async function () {
  await confrmPage.clickOnGoogleSigninButton();
});

Then('Google signin page should display', async function () {
  await confrmPage.verifyGoogleSigninPage();
});

When('Customer enters an email address', async function () {
  this.setData('newEmail', 'confirmationpagelogin@gmail.com');
  await confrmPage.enterNewEmailAddressinShippingPage(this.data.newEmail);
});

When('Customer logs in from the confirmation page', async function () {
  await confrmPage.completeSignin(this.data.newEmail);
});
