const { When, Then } = require('@cucumber/cucumber');
const { LogInPage } = require('../../page-objects/pages/login/login.page');
const AcntCartPage = require('../../page-objects/pages/login/cart.page');

const loginPage = new LogInPage();

When('Customer opens sign in popup in cart page', async function () {
  this.pageObject = AcntCartPage;
  await this.pageObject.launchCartLoginPopup();
  await this.pageObject.verifyCartLoginPopUpIsDisplayed();
  await this.pageObject.validateCartLoginPopup();
});
When('Customer sign in with {string} login credentials from cart page', async function (scenario) {
  await loginPage.enterCredential(scenario);
  await this.pageObject.clickOnSignInButton();
});
Then('Customer should still stay in the cart page', async function () {
  await this.pageObject.verifyCartPage();
});
