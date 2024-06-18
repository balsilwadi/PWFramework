const { When, Then } = require('@cucumber/cucumber');

const { PLPpage } = require('../page-objects/plp.page');

const { assertIsFunction } = require('../../helpers/function');

const plpPage = new PLPpage();

When('the Customer clicks on the {string} facet option', async function (facetOption) {
  this.pageObject = plpPage;
  assertIsFunction(this.pageObject?.clickSortByFilter);
  await plpPage.clickSortByFilter(facetOption);
});

Then('the Page should be sorted based on the selected facet option {string}', async function (facetOption) {
  this.pageObject = plpPage;
  assertIsFunction(this.pageObject?.verifyFacetOptionToBeFilteredBy);
  await plpPage.verifyFacetOptionToBeFilteredBy(facetOption);
});
