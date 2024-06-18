const { When, Then } = require('@cucumber/cucumber');
const { StoreLandingPage } = require('../../page-objects/pages/stores/store-landing.page');
const { SearchPLP } = require('../../page-objects/pages/search/search.page');

const searchPage = new SearchPLP();
const storeLandingPage = new StoreLandingPage();

When('Customer click on View All Stores and Facilities link from the Store Locator page', async function () {
  await storeLandingPage.clickOnViewAllStoresAndFacilities();
});

Then('Customer should be able see and interact with the {string} section', async function (section) {
  await storeLandingPage.validateStoreFeatures(section);
});

Then('Customer should be navigated to the store list page', async function () {
  await searchPage.verifyExpectedUrl('/stores/list-state');
});

When('Customer navigates back to the store locator page', async function () {
  await page.goBack();
});

When('Customer enters the  zipcode {string} and clicks the find button', async function (zipcode) {
  await storeLandingPage.enterZipcode(zipcode);
});

Then('Customer should be able to see the Store list header as {string}', async function (storeHeader) {
  await storeLandingPage.verifyZipcodeEntry(storeHeader);
});

Then('Customer should be able to see the map', async function () {
  await storeLandingPage.validateGoogleMap();
});

Then('Customer should be able to see the list of stores', async function () {
  await storeLandingPage.verifyStoresAreDisplayed();
});

Then('Customer should see the stores sorted by distance', async function () {
  await storeLandingPage.verifyStoresAreSorted();
});

Then('Make This My Store button should select the store as My Store', async function () {
  await storeLandingPage.validateMyStoreButton();
});

Then('Customer should be able to interact with the displayed stores', async function () {
  await storeLandingPage.validateStoreInfo();
});

Then('View store detail button should navigate customer to coresponding stores details page', async function () {
  await page.reload();
  await storeLandingPage.validateStoreDetailsButton();
});

Then('View upcomming events button should navigate customer to coresponding stores details page', async function () {
  await storeLandingPage.validateViewStoreEventButton();
});
Then('Customer should see the zipcode error message {string}', async function (expectedError) {
  await storeLandingPage.validateZipcodeError(expectedError);
});

Then('Customer should be able to interact with the filters', async function () {
  await storeLandingPage.validateStoreFilters();
});

Then('The customer clicks on the {string} button', async function (link) {
  await storeLandingPage.clickOnCB2StoreLinks(link);
});

Then('Cusomer should be able to click on the {string} button to navigate to {string}', async function (button, expectedURL) {
  await storeLandingPage.validateWindowSwitch(button, expectedURL);
});
let firstCanadaStore;
When('The customer clicks on the first canada store', async function () {
  firstCanadaStore = await storeLandingPage.getFirstStore();
  await storeLandingPage.clickOnFirstStore();
});

Then('Customer should be navigated to the correspoding store details page', async function () {
  await storeLandingPage.validateStoreNavigation(firstCanadaStore);
});
