const { When, Then } = require('@cucumber/cucumber');
const { StoreDetailsPage } = require('../../page-objects/pages/stores/store-details.page');
const env = require('../../../support/env/env');

const storeDetailsPage = new StoreDetailsPage();

When('Enter the zipcode {string} and click on the Find button', async function (zipcode) {
  if (env.COUNTRY === 'US') {
    await storeDetailsPage.enterLocation(zipcode);
  }
});

Then('List of Stores is displayed in the page', async function () {
  // empty function
});

When('Customer selects the store from the store List', async function () {
  await storeDetailsPage.selectStoreFromStoreLocatorPage();
});

Then('Verify View All Stores link is displayed', async function () {
  await storeDetailsPage.isDisplayedViewAllStoresLink();
});

Then('Verify breadcrumb is displayed in the page', async function () {
  await storeDetailsPage.isDisplayedBreadcrumb();
});

Then('Customer navigates to store details page', async function () {
  await storeDetailsPage.verifyStoreNameIsDisplayed();
});

Then('Verify the Map is displayed', async function () {
  await storeDetailsPage.verifyMapIsDisplayed();
});
Then('Verify Make This My Store Button is displayed', async function () {
  await storeDetailsPage.verifyMakeThisMyStoreButton();
});
When('Customer click on Make This My Store button', async function () {
  await storeDetailsPage.clickMakeThisMyStoreButton();
});
Then('Make This My Store button should be changed to My Store button', async function () {
  await storeDetailsPage.verifyMyStoreIsDisplayed();
});
Then('Verify Address and Phone Number is displayed', async function () {
  await storeDetailsPage.verifyAddressAndPhoneNumberIsDisplayed();
});
When('Customer click on Find A New Store button', async function () {
  await storeDetailsPage.verifyAndClickOnFindANewStoreButton();
});
Then('Store hours should be displayed', async function () {
  await storeDetailsPage.verifyStoreHours();
});

Then('Verify Registry message', async function () {
  await storeDetailsPage.verifyRegistryMessage();
});

Then('Verify Get Directions', async function () {
  await storeDetailsPage.verifyGetDirectionsButton();
});

Then('Verify Store Information section is displayed', async function () {
  await storeDetailsPage.verifyStoreInformation();
});

Then('Verify Upcoming Store Events section is displayed', async function () {
  await storeDetailsPage.verifyUpcomingStoreEvents();
});

Then('Verify Need Guidance section is displayed to Schedule Consultation', async function () {
  await storeDetailsPage.verifyGuidanceSection();
});

Then('Verify Most Popular Items is displayed in the Store', async function () {
  await storeDetailsPage.verifyMostPopularItemsSection();
});

Then('Verify Store Features is displayed', async function () {
  await storeDetailsPage.storeFeaturesSection();
});

Then('Verify SEO Copy is displayed in the page', async function () {
  await storeDetailsPage.verifySEOCopySction();
});

Then('Verify See Store Services button is displayed', async function () {
  await storeDetailsPage.verifySeeStoreServices();
});

When('Customer click on See Store Services button', async function () {
  await storeDetailsPage.clickOnSeeStoreServicesButton();
});

Then('Verify Customer is taken to the Services section in the page', async function () {
  await storeDetailsPage.verifyServicesSection();
});

Then('Verify Free Design Consultation is displayed in the Services section', async function () {
  await storeDetailsPage.verifyFreeDesignConsultation();
});

Then('Verify In Store Shopping Appointment is displayed in the Services section', async function () {
  await storeDetailsPage.verifyInStoreShoppingAppointment();
});

Then('Verify Meet Virtually with a Personal Shopper is displayed in the Services section', async function () {
  await storeDetailsPage.verifyPersonalShopper();
});

Then('Verify Store Events section is displayed in the page', async function () {
  await storeDetailsPage.verifyStoreEvents();
});

Then('Verify Careers section is displayed in the page', async function () {
  await storeDetailsPage.verifyCareers();
});
