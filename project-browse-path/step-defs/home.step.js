const { When, Then } = require('@cucumber/cucumber');

const { HomePage } = require('../page-objects/home.page');
const { HeaderAccountIconHelper } = require('../helpers/header-account-icon-helper');
const { ProductPage } = require('../../project-browse-product/page-objects/pages/product/product.page');
const { UiFeature } = require('../page-objects/ui-feature.page');
const { ReportUtils } = require('../../support/utils/report-utils');
const { HeaderCorePage } = require('../page-objects/header-core');

const uipage = new UiFeature();
const homePage = new HomePage();
const headerAccountIconHelper = new HeaderAccountIconHelper();
const productPage = new ProductPage();
const testReport = new ReportUtils();
const headerCorePage = new HeaderCorePage();

When('User verifies the Save Offer window and closing the window', async function () {
  await uipage.switchToOfferSaveWindow();
});

Then('Search for Second SKU and Verify the loaded Product Page {string}', async function (skuNum) {
  await homePage.searchItem(skuNum);
  await productPage.validateProductPage(skuNum);
});

When('Customer clicks on Header logo', async function () {
  await headerCorePage.clickCrateHeaderLogo();
});

Then('Customer should land on {string}', async function (relativeUrl) {
  const url = relativeUrl.includes('http') ? new RegExp(`^${relativeUrl}`) : new RegExp(`^${global.baseURL}${relativeUrl}`);
  await homePage.verifyURL(url);
});

Then('{string} should be present in header banner', async function (bannerItem) {
  await homePage.verifyPresenceOfBannerItem(bannerItem);
});

When('Customer clicks on {string} in header banner to land in {string} tab', async function (bannerItem, newTab) {
  await homePage.clickBannerItem(bannerItem, newTab);
});

Then('Country button should be present', async function () {
  testReport.log(homePage.pageName, 'Verfiy Country button should be present');
  await homePage.verifyCountrySelector();
});

When('Customer clicks on country icon', async function () {
  await homePage.clickCountryIcon();
});

Then('Country popup should open', async function () {
  await homePage.verifyCountryPopup();
});

Then('Country popup should have USA active radio button', async function () {
  // add function here
});

When('Customer picks the option Canada', async function () {
  await homePage.selectCanadaButton();
});

Then('Customer lands on the crate homepage canada', async function () {
  await homePage.verifyCanadaSite();
});

Then('Customer verifies header core options', async function () {
  await headerCorePage.verifyCorePresence();
});

When('Customer clicks on {string} in the primary navigation header', async function (primaryNavOption) {
  await homePage.clickOnPrimaryNavigation(primaryNavOption);
});

Then('Customer should see {string} tag on primary navigation landing page', async function (heading) {
  await homePage.verifyPrimaryNavigationUrl(heading);
});

When('customer hover account icon', async function () {
  await headerAccountIconHelper.openFlyout();
});

Then('account menu should be present in guest mode', async function () {
  await headerAccountIconHelper.verifyGuestView();
});

Then('customer should verify guest view of Registry CBCC and DesignPackages', async function () {
  await headerAccountIconHelper.accountMenuGuestFLow();
});

Then('customer should see {string} CBCC and {string} rewards and DesignPackages', async function (creditCardEnabled, rewardsEnabled) {
  await headerAccountIconHelper.verifyAccountSignedIn(creditCardEnabled, rewardsEnabled);
});

When('Customer clicks on {string} in the secondary navigation header with a flyout {string}', async function (navOption, flyout) {
  await homePage.clickOnSecondaryNavigation(navOption, flyout);
});

When('Customer clicks on My Account navigation header', async function () {
  await headerAccountIconHelper.clickMyAccountRegisteredUser();
});

Then('Customer verifies default options for country selector', async function () {
  await homePage.verifyDefaultCountrySelector();
});

When('Customer picks the other option on country selector', async function () {
  await homePage.selectUncheckedCountry();
});

Then('Customer lands on same brand with different country', async function () {
  await homePage.verifyCountrySelected();
});
