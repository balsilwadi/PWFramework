const { Given, When, Then } = require('@cucumber/cucumber');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { LogInPage } = require('../../page-objects/pages/login/login.page');

// TODO this page should not exist in the account area, this is a registry page that belongs in the registry section.  Please coordinate with the GR team to implement this functionality in their area
const { GiftRegistryPage } = require('../../page-objects/pages/login/gift-registry.page');

const loginPage = new LogInPage();
const accountPage = new AccountPage();
const giftRegistryPage = new GiftRegistryPage();

Given('the customer has been authenticated', async function () {
  await loginPage.verifyLogInForm();
  await loginPage.enterCredentials(this.user.email, this.user.password);
  await loginPage.clickOnSignInButton();
});

When('Customer clicks on sign in from header', async function () {
  await loginPage.openSignInPopUp();
});
Then('Login page should display with sign in form', async function () {
  await loginPage.verifyLogInForm();
});
Then('Signin form displayed with create account option', async function () {
  await loginPage.verifyCreateAccountSection();
});
When('Customer sign in with valid {string} and {string}', async function (email, password) {
  await loginPage.enterCredentials(email, password);
  await loginPage.clickOnSignInButton();
});
Then('Account page should display with Hi message', async function () {
  await accountPage.validateMyAccountPage();
});
Then('the login page should display', async function () {
  await loginPage.verifyLoginPageDisplayed();
});
When('Customer opens reset password link', async function () {
  await loginPage.clickOnResetPasswordLink();
  await loginPage.verifyResetPasswordPopup();
});
Then('Customer should land on the account page', async function () {
  await loginPage.verifyAccountPage();
});
When('Customer reset the password of {string}', async function (email) {
  await loginPage.enterEmailInResetPasswordPopup(email);
  await loginPage.clickOnResetPasswordPopupSubmitButton();
  await loginPage.verifyResetPasswordPopupSuccessMsg();
});
When('Customer closes the reset password popup', async function () {
  await loginPage.closeResetPasswordPopup();
  await loginPage.verifyResetPasswordPopupIsClosed();
});

Then('Manage My Registry page is displayed', async function () {
  await loginPage.verifyManageRegistryPage();
});

When('the customer clicks on sign out in the top banner', async function () {
  await loginPage.signOutFromHeader();
});
When('Customer sign in with updated credentials', async function () {
  await loginPage.enterCredentials(this.data.newEmail, this.data.newPassword);
  await loginPage.clickOnSignInButton();
});
When('Customer sign in with {string} login credentials', async function (scenario) {
  await loginPage.enterCredential(scenario);
  await loginPage.clickOnSignInButton();
});
Then('Error message should display in login page', async function () {
  await loginPage.validateErrorMessage();
});
When('Customer navigates to sign in page', async function () {
  await loginPage.navigateToLoginPage();
});
When('Customer navigates to Create Account page', async function () {
  await loginPage.navigateToCreateAccountPage();
});
When('Customer clicks on registry link', async function () {
  await giftRegistryPage.navigateToGiftRegistryPage();
});
Then('Customer clicks manage my registry', async function () {
  await giftRegistryPage.clickOnGiftRegistryLogin();
});
Then('the Gift Registry Management page should display with Manage My Registry', async function () {
  await giftRegistryPage.validateManageGiftRegistryPage();
});
Then('Customer logs out from header', async function () {
  await loginPage.signOutFromHeader();
});
When('Customer enter {string} login credentials', async function (type) {
  await loginPage.enterCredential(type);
});
When('Customer click on sign in button', async function () {
  await loginPage.clickSignInButton();
});
Then('Customer launches signin popup on other brands and verify SSO is working', { timeout: 4 * 200000 }, async function () {
  await loginPage.verifySSOFromSigninPopup();
});
Then('Reload the page', async function () {
  await loginPage.reloadThePage();
});
Then('Clicks on the first registry in the page', async function () {
  await giftRegistryPage.clickOnTheFirstRegistry();
});
When('Customer clicks on the brand switch button', async function () {
  await giftRegistryPage.clickOnSisterBrand();
});
Then('the registry page should open for the sister brand as a logged in user', async function () {
  await giftRegistryPage.verifyReigstryPageForSisterBrand();
});
