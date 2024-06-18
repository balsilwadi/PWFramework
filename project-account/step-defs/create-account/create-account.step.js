const { When, Then } = require('@cucumber/cucumber');
const { CreateAccountPage } = require('../../page-objects/pages/create-account/create-account.page');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { LogInPage } = require('../../page-objects/pages/login/login.page');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();
const loginPage = new LogInPage();
const common = new CommonUtils();
const createAccountPage = new CreateAccountPage();
const objAccount = new AccountPage();

When('Customer clicks on Create Account button', async function () {
  await createAccountPage.clickonCreateNewAccount();
});

Then('Customer fills the Create New account form and click on Create Account button', async function () {
  await createAccountPage.verifyandCompletetheCreateAccountForm();
  this.setData('newEmail', common.generateNewEmail());
  await createAccountPage.enterNewEmailandPwd(this.data.newEmail);
});

Then('Customer should land to MyAccount page', async function () {
  await createAccountPage.validateAccountPage(this.data.newEmail);
  await objAccount.navigateToAccountSettings();
  await createAccountPage.validateEmail(this.data.newEmail);
});

Then('Customer lands to MyAccount page', async function () {
  await createAccountPage.validateAccountPage(this.data.newEmail, false);
  await objAccount.navigateToAccountSettings();
});

Then('Customer verifies his name in the top banner', async function () {
  await page.waitForLoadState();
  await createAccountPage.validateCustomerNameinTopBanner();
});

Then('Customer logouts of the account', async function () {
  await objAccount.clickOnSignOut();
});

Then('Customer lands to the Signin page', async function () {
  await createAccountPage.verifySigninPageAfterLogout();
});

Then('Customer add the Payment Address', async function () {
  await createAccountPage.CB_ClickonBillingAddress();
  await createAccountPage.CB_AddNewBillingAddress();
});

Then('Customer logins with a new account', async function () {
  const userCredential = common.getEmailfromNewAccount();
  if (!userCredential) {
    this.setData('newEmail', common.generateNewEmail());
    await createAccountPage.loginToaNewAccount(this.data.newEmail);
  } else {
    const email = userCredential.split('|');
    this.setData('newEmail', email[0].trim());
    await createAccountPage.loginToExistingAccount(userCredential);
    await loginPage.clickOnSignInButton();
  }
});

Then('Customer add a visa creditcard', async function () {
  await objAccount.navigateToPaymentPage();
  await createAccountPage.verifyAddNewPayment();
  await createAccountPage.verifyAddingVisaCC();
});

When('Customer navigates to Payments page', async function () {
  await objAccount.navigateToPaymentPage();
});

Then('Customer add a master creditcard', async function () {
  await createAccountPage.verifyAddingMasterCC();
});

Then('Customer add a amex creditcard', async function () {
  await createAccountPage.verifyAddingAmexCC();
});

Then('Customer add a crateandbarrel creditcard', async function () {
  if (env.EXEC_SITE.toLowerCase().includes('us')) await createAccountPage.verifyAddingCBCC();
  else testReport.log('Account Page', 'CBCC N/A for CAN sites');
});

Then('Customer add a PLCC', async function () {
  if (env.EXEC_SITE.toLowerCase().includes('us')) await createAccountPage.verifyAddingPLCC();
  else testReport.log('Account Page', 'PLCC N/A for CAN sites');
});

Then('Customer add a discover creditcard', async function () {
  if (env.EXEC_SITE.toLowerCase().includes('us')) await createAccountPage.verifyAddingDiscoverCC();
  else testReport.log('Account Page', 'Discover N/A for CAN sites');
});

Then('Customer delete all creditcards', async function () {
  await createAccountPage.deleteCreditCard();
});

Then('Verifies whether the correct email address is displayed', async function () {
  await createAccountPage.verifyEmailInAccountSettings(this.data.newEmail);
});
