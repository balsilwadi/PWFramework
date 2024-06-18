const { When, Then } = require('@cucumber/cucumber');
const { NoResults } = require('../../page-objects/pages/search/no-results.page');
const { SearchPLP } = require('../../page-objects/pages/search/search.page');

const env = require('../../../support/env/env');

const noResultsPage = new NoResults();
const searchPage = new SearchPLP();

When('Customer clicks on {string} Button', async function (button) {
  await noResultsPage.clickNoSearchResultsButtons(button);
});

Then('Customer should be navigated to the gift registry', async function () {
  if (env.EXEC_SITE !== 'cb2can') {
    const expectedUrl = env.EXEC_SITE === 'cb2us' ? '/gift-registry/guest/find-registry' : '/wedding-gift-registry';
    await searchPage.verifyExpectedUrl(expectedUrl);
    await page.goBack();
  }
});

Then('Customer should see the search results message {string}', async function (error) {
  await noResultsPage.validateResultsMessage(error);
});

Then('Customer should see the chat window', async function () {
  await noResultsPage.verifyChatWindow();
});

Then('Recently viewed products should be displayed', async function () {
  await noResultsPage.validateRecentlyViewedShown();
});

Then('Customer should see the search bar focused', async function () {
  await noResultsPage.validateSearchBarIsSelected();
});

Then('Customer should be navigated to the new arrivals page', async function () {
  await noResultsPage.validateNewArrivals();
  await page.goBack();
});

Then('Customer should be able to see the Chat with us Button', async function () {
  await noResultsPage.verifyChatButton();
});
