const { Given, When, Then } = require('@cucumber/cucumber');
const SearchPage = require('../page-objects/search.page');
const SearchResultsPage = require('../page-objects/search-results.page');

When('they sort the registry list by {string}', async function (sortValue) {
  await SearchResultsPage.sortBy(sortValue);
});

Then('The registry is sorted by Registrant Name', async function () {
  await SearchResultsPage.verifyRegistrantNameSorted();
});

Then('The registry is sorted by Co Registrant Name', async function () {
  await SearchResultsPage.verifyCoRegistrantNameSorted();
});

Then('The registry is sorted by Event Type', async function () {
  await SearchResultsPage.verifyEventTypeSorted();
});

Then('The registry is sorted by State', async function () {
  await SearchResultsPage.verifyStateSorted();
});

Then('The registry is sorted by Event Date', async function () {
  await SearchResultsPage.verifyEventDateSorted();
});

Given('the customer is on the registry search page', async function () {
  this.pageObject = SearchPage;
  await SearchPage.goto();
  await SearchPage.verify();
});

// Quick execution method to place user on search results page
Given('the customer searched for a registry', async function () {
  this.pageObject = SearchResultsPage;
});

When('they go to the registry search results page with first name {string} and last name {string}', async function (firstName, lastName) {
  await SearchResultsPage.goto(firstName, lastName);
});

When('the customer is on registry search results page with {string} and {string}', async function (firstName, lastName) {
  await SearchResultsPage.goto(firstName, lastName);
});

Then('the customer goes to the registry search results page', async function () {
  this.pageObject = SearchResultsPage;
  await SearchResultsPage.verify();
});
