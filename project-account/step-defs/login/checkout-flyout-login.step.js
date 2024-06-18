const { When, Then } = require('@cucumber/cucumber');
const { LogInPage } = require('../../page-objects/pages/login/login.page');
const { CartPage } = require('../../../project-checkout/page-objects/pages/cart/cart.page');
const AcntCartPage = require('../../page-objects/pages/login/cart.page');

const env = require('../../../support/env/env');

const cartPage = new CartPage();
const loginPage = new LogInPage();

When('Signin from the returing customer flyout', async function () {
  this.pageObject = AcntCartPage;
  await this.pageObject.enterCredentialsInFlyoutModal(env.ACNT_CHK_FLYOUT_LOGIN_EMAIL, env.ACNT_CHK_FLYOUT_LOGIN_PWD);
  await this.pageObject.clickOnSignInButton();
});

Then('Customer should be successfully signed in', async function () {
  await this.pageObject.verifySigninIsSuccessful();
});

When('Click on Checkout Now button in Cart Page', async function () {
  await cartPage.clickCheckoutNow();
});

When('Customer navigates to home page from Cart Page', async function () {
  await loginPage.navigateToHomePageFromCartPage();
});
