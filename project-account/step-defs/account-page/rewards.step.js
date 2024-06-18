const { When, Then } = require('@cucumber/cucumber');
const { AccountPage } = require('../../page-objects/pages/account-page/account.page');
const { CreateAccountPage } = require('../../page-objects/pages/create-account/create-account.page');
const RewardsPage = require('../../page-objects/pages/account-page/rewards.page');
const env = require('../../../support/env/env');
const { ReportUtils } = require('../../../support/utils/report-utils');

const accountPage = new AccountPage();
const createAccountPage = new CreateAccountPage();
const testReport = new ReportUtils();

When('Navigates to Rewards page', async function () {
  await accountPage.navigateToRewardsLink();
});

Then('Rewards page should display without reward content', async function () {
  this.pageObject = RewardsPage;
  await this.pageObject.validatetheRewardsPage();
});

Then('Rewards menu should not show in the account header menu', async function () {
  await this.pageObject.verifyRewardsMenuinHeader();
});

Then('Verifies Rewards menu is shown in the account header menu', async function () {
  await this.pageObject.verifyRewardsMenuinHeaderWithCBCC();
});

When('Customer click on the cart icon', async function () {
  await this.pageObject.navigatetoCartPage();
});

Then('Zero reward should display in cart page', async function () {
  await this.pageObject.verifyRewardsinCartPage();
});

Then('Rewards content should display in the rewards page', async function () {
  this.pageObject = RewardsPage;
  await this.pageObject.validatetheRewardsPageWithCBCC();
});

/* Then('Rewards content should display in the rewards page', async function () {
  await this.pageObject.validatetheRewardsPageWithCBCC();
}); */

When('Customer clicks on Crate Barrel Credit Card CB2 CREDIT CARD link', async function () {
  if (env.EXEC_SITE.includes('can')) testReport.log('Crate & Barrel Credit Card/CB2 CREDIT CARD link is not applicable for CA sites');
  else await accountPage.navigateToManageMyCBCC();
});

Then('Crate & Barrel Credit Card CB2 CREDIT CARD is loaded', async function () {
  this.pageObject = RewardsPage;
  await this.pageObject.verifyManageMyCBCCPage();
});

When('Navigates to Payments page and add CBCC', async function () {
  if (env.EXEC_SITE.includes('can')) testReport.log('Rewards Page', 'Rewards page is not applicable for CA sites');
  else {
    await accountPage.navigateToPaymentLink();
    await createAccountPage.deletePaymentCards();
    await createAccountPage.addMultipleCBCC();
  }
});

Then('Rewards should combine', async function () {
  this.pageObject = RewardsPage;
  await this.pageObject.verifyCombinedRewards();
  await createAccountPage.deleteCreditCard();
});
