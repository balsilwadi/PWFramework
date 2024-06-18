const { Given, When, Then } = require('@cucumber/cucumber');
const { Page } = require('./page');
const { ReportUtils } = require('../../support/utils/report-utils');

const page = new Page();
const reporter = new ReportUtils();
When('They are on website', async function () {
  await page.navigateToSite();
});

Given('A Customer navigates to shared page for URL: {string}', async function (relativeUrl) {
  await page.navigateToRelativeUrl(relativeUrl);
});

When('They navigate to shared page for URL: {string}', async function (relativeUrl) {
  await page.navigateToRelativeUrl(relativeUrl);
});

Then('They see shared page for URL: {string}', async function (url) {
  reporter.log(`Url is ${url}`);
  await page.verifyPage();
});
