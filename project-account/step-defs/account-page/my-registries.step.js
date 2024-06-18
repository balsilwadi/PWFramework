const { When, Then } = require('@cucumber/cucumber');
// TODO this page should not exist in the account area, this is a registry page that belongs in the registry section.  Please coordinate with the GR team to implement this functionality in their area
const MyRegistriesPage = require('../../page-objects/pages/account-page/my-registries.page');

When('Customer clicks on myRegistry Link', async function () {
  this.pageObject = MyRegistriesPage;
  await this.pageObject.navigateToMyRegistries();
});

Then('Gift Registry home page should display', async function () {
  await this.pageObject.verifyMyRegistriesHomePage();
});

Then('Active Gift Registry page should display', async function () {
  await this.pageObject.verifyMyActiveRegistries();
});
