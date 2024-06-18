const { When, Then } = require('@cucumber/cucumber');
const DesignServices = require('../../page-objects/pages/design-services/design-services-form.page');

When('Customer opens the Design Services form', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.goto();
});

Then('the form should be prepopulated', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.verifyDesignServicesFormPrepopulated();
});

When('Customer fills the form and clicks Submit button', async function () {
  await this.pageObject.fillOutDesignServicesForm();
});

Then('the form should be sent', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.verifyFormIsSent();
});

Then('the form should not be prepopulated', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.goto();
  await this.pageObject.verifyDesignServicesFormIsNotPrepopulated();
});

When('Enters the password and clicks on Sign in button', async function () {
  this.pageObject = DesignServices;
  await this.pageObject.enterPasswordandSignIn('Crate123!');
});

Then('Verifies login is successful', async function () {
  await this.pageObject.verifySignIn();
});
