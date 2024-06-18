const { Given, Then, When } = require('@cucumber/cucumber');
const DesignServices = require('../../page-objects/pages/design-services/design-services.page');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { CartPage } = require('../../../project-martech/page-objects/pages/cart.page');

const common = new CommonUtils();
const cartPage = new CartPage();
/**
 * @module: DESIGN SERVICES FORM page
 * @description: Navigates directly to the form.
 * */

Given('the customer is on the Design Services Form page', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.goToDesignServicesForm();
});

Then('Design Pacakges page for a new Customer should display', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.verifyDesignPackagesPageforNewCustomer();
});

When('Fills out the Design Services Form', async function () {
  this.setData('newEmail', common.generateNewEmail());
  await this.pageObject.fillFormDesignServicesStep1(this.data.newEmail);
  await this.pageObject.fillFormDesignServicesStep2();
  await this.pageObject.fillFormDesignServicesStep3();
  await this.pageObject.fillFormDesignServicesStep4();
});

Then('Verify Design Services Form auth succeeded', async function () {
  await this.pageObject.verifyFormDesignServicesStep2();
});

When('Fills out the Design Services Form with {string} and {string}', async function (loginEmail, loginPassword) {
  await this.pageObject.fillFormDesignServicesStep1(loginEmail);
  await this.pageObject.fillFormDesignServicesStep2(loginPassword);
});

Then('Design Services Form should complete', async function () {
  await this.pageObject.verifyDesignServicesFormCompleted();
});

When('Fills out the Step 1 on Design Services Form', async function () {
  await this.pageObject.fillFormDesignServicesStep1('prodcptesting1@hotmail.com');
});

Then('Continue filling the form', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.fillFormDesignServicesStep3();
  await this.pageObject.fillFormDesignServicesStep4();
});

Then('Design Packages page should load with Design Package', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.verifyDesignPackagesPageforCustomerwithPackage();
});

When('Customer clicks on Design Package', async function () {
  await this.pageObject.clickOnDesignPackage();
});

Then('Customer can see Moodboard, Download link and Room Tour link', async function () {
  await this.pageObject.verifyDesignPackage();
});

When('Customer clicks on Products link and Add all products button', async function () {
  await this.pageObject.goToProductsList();
});

Then('Add all products pop up is displayed', async function () {
  await this.pageObject.verifyAddAllPopUp();
  await cartPage.emptyCart();
});
