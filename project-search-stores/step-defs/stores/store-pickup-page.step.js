const { Then } = require('@cucumber/cucumber');
const { StorePickupPage } = require('../../page-objects/pages/stores/store-pickup.page');

const storePickupPage = new StorePickupPage();
Then('Customer click on learn more link under ORDER ONLINE PICK UP IN STORE', async function () {
  await storePickupPage.clickLearnMorePickUpButton();
});
Then('Customer should see header1 tag as {string}', async function (expectedHeader) {
  await storePickupPage.verifyHeader1(expectedHeader);
});
Then('Customer should be able to see and interact with the Store pick up FAQ', async function () {
  await storePickupPage.validateFAQSection();
});
Then('Customer should be able to see and interact the store location list', async function () {
  await storePickupPage.validateStoreListHeader();
  await storePickupPage.viewStoreInfoValidation('US Stores');
  await storePickupPage.viewStoreInfoValidation('CA Stores');
  await storePickupPage.viewStoreInfoValidation('US Warehouse');
  await storePickupPage.viewStoreInfoValidation('CA Warehouse');
});
