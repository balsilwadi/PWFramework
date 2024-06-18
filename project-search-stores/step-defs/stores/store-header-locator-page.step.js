const { When, Then } = require('@cucumber/cucumber');
const { HeaderStoreLocator } = require('../../page-objects/pages/stores/store-header-locator.page');
const { SearchPLP } = require('../../page-objects/pages/search/search.page');

const searchPage = new SearchPLP();
const headerStoreLocator = new HeaderStoreLocator();

When('the customer hover on header store locator from the Home page', async function () {
  await headerStoreLocator.hoverOnHeaderStoreLocatorIcon();
});

Then('Verify the Shipping to and Find a Store link is displayed', async function () {
  await headerStoreLocator.verifyHeaderLocatorIconMenus();
});

When('Customer click on the Shipping to zip code link', async function () {
  await headerStoreLocator.clickOnZipCodeDisplayLink();
});

Then('Verify zip code textbox is displayed', async function () {
  await headerStoreLocator.verifyZipCodeTextboxIsDisplayed();
});

When('Customer enter the zip code {string} {string} and click on the update zip code button', async function (uszipcode, canzipcode) {
  await headerStoreLocator.clickOnUpdateZipCode(uszipcode, canzipcode);
});

Then('Verify zip code is displayed on zip code display link', async function () {
  await headerStoreLocator.verifyZipCodeIsDisplayedOnZipCodeLink();
});

When('Customer enter the zip code as empty and click on the update zip code button', async function () {
  await headerStoreLocator.clickOnUpdateZipCodeWithEmptyValue();
});

Then('Verify appropriate error message is displayed', async function () {
  await headerStoreLocator.verifyZipCodeErrorMessageDisplayed();
});

When('Customer click on find a store link', async function () {
  await headerStoreLocator.clickOnFindaStoreLink();
});

Then('Verify list of stores is displayed in locator popup', async function () {
  // linting issue
});

When('Customer enter the zip code {string} {string} and click on the zip code link in locator popup', async function (uszipcode, canzipcode) {
  await headerStoreLocator.enterZipCodeAndSubmit(uszipcode, canzipcode);
});

Then('Verify View All Stores link is displayed in locator popup', async function () {
  await headerStoreLocator.isDisplayedViewAllStoresLink();
});

When('Customer click on View All Stores link from the locator popup', async function () {
  await headerStoreLocator.clickOnViewAllStores();
});

Then('Verify customer navigates to store locator page', async function () {
  await searchPage.verifyExpectedUrl('/stores');
});

When('Customer click on the store from the locator popup', async function () {
  await headerStoreLocator.hoverOnHeaderStoreLocatorIcon();
  await headerStoreLocator.clickOnFindaStoreLink();
  await headerStoreLocator.clickOnStoreFromStoreList();
});

Then(
  'the store should be displayed in the expanded form with address, store operating time, store info and events link and make this my store button',
  async function () {
    await headerStoreLocator.verifyStoreDetailsIsDisplayed();
  }
);

When('Customer click on Store Info and Events from the locator popup', async function () {
  await headerStoreLocator.clickOnStoreInfoEvents();
});

Then('Verify customer is taken to the store details page', async function () {
  await headerStoreLocator.verifyUpcomingStoreEventsIsDisplayed();
});

When('Customer click on Make This My Store button in the locator popup', async function () {
  await headerStoreLocator.hoverOnHeaderStoreLocatorIcon();
  await headerStoreLocator.clickOnFindaStoreLink();
  await headerStoreLocator.clickOnMakeThisMyStoreButton();
});

Then('Verify make this My Store button should be changed to My Store button in locator popup', async function () {
  await headerStoreLocator.verifyMyStoreIsDisplayed();
});

When('Customer click on store name link from header store locator in home page', async function () {
  await page.reload();
  await headerStoreLocator.hoverOnHeaderStoreLocatorIcon();
  await headerStoreLocator.clickOnMyStoreHeaderLink();
});

Then(
  'Verify phone number, store operating time, store info and events link, change my store link and all stores link are displayed in header store locator',
  async function () {
    await headerStoreLocator.verifyMyStoreDetailsIsDisplayedHeadeLocator();
  }
);

When('Customer click on Store Info and Events from header store locator', async function () {
  await headerStoreLocator.clickOnStoreInfoEventsLink();
});

When('Customer click on Change My Store from header store locator', async function () {
  await headerStoreLocator.hoverOnHeaderStoreLocatorIcon();
  await headerStoreLocator.clickOnMyStoreHeaderLink();
  await headerStoreLocator.clickOnChangeMyStoreLink();
});

Then('Verify customer navigates to locator popup', async function () {
  // listing issue
});

When('Customer click on All Stores from header store locator', async function () {
  await headerStoreLocator.clickOnAllStoresLink();
});
