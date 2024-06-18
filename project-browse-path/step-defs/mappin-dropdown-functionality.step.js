const { When, Then } = require('@cucumber/cucumber');

const { CommonUtils } = require('../../support/utils/common-utils');
const { HeaderLocationDropdownIconHelper } = require('../helpers/header-location-dropdown-icon-helper');

const { HomePage } = require('../page-objects/home.page');

const { assertIsFunction } = require('../../helpers/function');

const common = new CommonUtils();
const headerLocationDropdownIconHelper = new HeaderLocationDropdownIconHelper();
const homePage = new HomePage();

When('Customer hover on location icon', async function () {
  await headerLocationDropdownIconHelper.hoverMapPinDropdownIcon(common.verifyIsMobile());
});

Then('Customer should see default shipping to option with appropriate zip code and default select my store option', async function () {
  this.pageObject = homePage;
  assertIsFunction(this.pageObject?.verifyLocationIconDropDownContents);
  await homePage.verifyLocationIconDropDownContents();
});

When('Customer clicks on arrow beside zipcode', async function () {
  await headerLocationDropdownIconHelper.clickDropdownBesideZipCode();
});

Then('Customer should be able to enter a new zipcode {string}', async function (zipCode) {
  await headerLocationDropdownIconHelper.inputZipCodeInLocationDropdown(zipCode);
});
