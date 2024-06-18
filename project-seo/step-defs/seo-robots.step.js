const { When, Then } = require('@cucumber/cucumber');
const { SeoRobotsPage } = require('../page-objects/pages/seo-robots.page');

const seoRobotsPage = new SeoRobotsPage();

When('Customer navigates to robots txt page', async function () {
  await seoRobotsPage.navigateToRobotsTxt();
});

Then('Verify the robots txt content {string},{string}', async function (robotsValue1, robotsValue2) {
  await seoRobotsPage.verifyRobotsTxt(robotsValue1, robotsValue2);
});
