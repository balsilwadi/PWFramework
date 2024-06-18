const { When, Then } = require('@cucumber/cucumber');
const { assertIsFunction } = require('../helpers/function');

When('they click search', async function () {
  assertIsFunction(this.pageObject?.clickSearch);
  await this.pageObject?.clickSearch();
});

Then('there are {int} results', async function (count) {
  assertIsFunction(this.pageObject?.verifyResultsCount);
  await this.pageObject.verifyResultsCount(count);
});

Then('there are some results', async function () {
  assertIsFunction(this.pageObject?.verifySomeResultsCount);
  await this.pageObject.verifySomeResultsCount();
});

Then('the search results details are visible', async function () {
  assertIsFunction(this.pageObject?.verifySearchResultDetails);
  await this.pageObject.verifySearchResultDetails();
});
