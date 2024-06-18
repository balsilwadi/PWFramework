const { When, Then } = require('@cucumber/cucumber');
const InterrupterText = require('../../page-objects/pages/interrupter/interrupter-main-subtext.page');

When('Customer enters Email and Phone number {string}', async function (optInScenario) {
  this.pageObject = InterrupterText;
  const temp = optInScenario;
  this.setData('optInScenario', temp);
  await this.pageObject.enterEmailAndPhone(this.data.optInScenario);
});
When('uncheck the kids checkbox', async function () {
  await this.pageObject.uncheckKidsCheckbox();
});
When('Customer navigates to Kids page', async function () {
  this.pageObject = InterrupterText;
  await this.pageObject.navigatesToKidsPage();
});
When('check the kids checkbox', async function () {
  await this.pageObject.checkKidsCheckbox();
});
When('clicks on Submit button', async function () {
  await this.pageObject.submitInterrupter();
});
Then('verifies the main and sub copy text', async function () {
  await this.pageObject.verifyMainAndSubCopy(this.data.optInScenario);
});
When('Customer expands Email Drawer', async function () {
  this.pageObject = InterrupterText;
  await this.pageObject.expandEmailDrawer();
});
Then('Customer uncheck the Kids checkbox', async function () {
  this.pageObject = InterrupterText;
  await this.pageObject.unsubscribeKidsBrand();
});
Then('Customer uncheck the Crate checkbox', async function () {
  this.pageObject = InterrupterText;
  await this.pageObject.unsubscribeCrateBrand();
});
Then('Clicks on Apply Changes', async function () {
  await this.pageObject.clickOnApplyChanges();
});
When('clicks on submit button in the second screen with additional brands {string} checked', async function (additionalbrands) {
  const isAdditionalBrands = additionalbrands;
  this.setData('additionalbrands', isAdditionalBrands);
  await this.pageObject.submitInterrupterSecondPage(this.data.additionalbrands);
});
Then('verifies the main and sub copy text in the final screen', async function () {
  await this.pageObject.verifyFinalPageMainAndSubCopy(this.data.additionalbrands);
});
