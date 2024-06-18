/* eslint-disable playwright/no-element-handle */
const { When } = require('@cucumber/cucumber');
const repoCommonElements = require('../page-objects/elements/interior-design-elements');
const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const testData = require('../page-objects/datafiles/test-data');
const env = require('../../support/env/env');

const testReport = new ReportUtils();
const common = new CommonUtils();

When('they navigate to the Design Services page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_DESIGNSERVICES_URL}`);
});

When('they click on Book Your Free Appointment button on crate core', async function () {
  await page.customClick(repoCommonElements.designServicesCrateKidsPage.btnBookFreeAptCore, 'btnBookFreeAptCore');
});

When('they click on Book Your Free Appointment button on crate kids', async function () {
  await page.customClick(repoCommonElements.designServicesCrateKidsPage.btnBookFreeAptKids, 'btnBookFreeAptKids');
});

When('they click on the {string} button', async function (btnName) {
  switch (btnName) {
    case 'In-Home':
      await page.customClick(repoCommonElements.designServicesCrateKidsPage.btnInHomeApt, 'btnInHomeApt');
      break;
    case 'Local':
      await page.customClick(repoCommonElements.designServicesCrateKidsPage.btnLocalApt, 'btnLocalApt');
      break;
    case 'Online':
      await page.customClick(repoCommonElements.designServicesCrateKidsPage.btnOnlineApt, 'btnOnlineApt');
      break;
    case 'Meet Locally':
      await page.customClick(repoCommonElements.designServicesCb2Page.btnMeetLocally, 'btnMeetLocally');
      break;
    case 'Meet Virtually':
      await page.customClick(repoCommonElements.designServicesCb2Page.btnMeetVirtually, 'btnMeetVirtually');
      break;
    // no default
  }
});

When('they navigate to the Design Services Kids page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_DESIGNSERVICESKIDS_URL}`);
});

When('they navigate to the Trade Program page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_TRADEPROGRAM_URL}`);
});

When('they click on Apply Now button on the trade program page', async function () {
  if (env.EXEC_SITE.includes('cb2')) {
    await page.customClick(repoCommonElements.tradePage.btnSignup, 'btnSignup');
  } else {
    await page.customClick(repoCommonElements.tradePage.btnApplyNow, 'btnApplyNow');
  }
});

When('they navigate to the Rewards page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_REWARDS_URL}`);
});

When('they click on Apply Now button on the rewards page', async function () {
  await page.customClick(repoCommonElements.rewardsPage.btnApplyNow, 'btnApplyNow');
});

When('Customer click on RSVP button under Upcoming Store Events', async function () {
  await page.waitForLoadState('load', { timeout: global.large_wait });
  const rsvpBtnCount = (await page.$$(repoCommonElements.storesPage.btnRsvp)).length;
  const rsvpBtnIndex = await common.getRandomInt(1, rsvpBtnCount);
  await page.customClick(`${repoCommonElements.storesPage.btnRsvp}[${rsvpBtnIndex}]`, 'btnRsvp');
  testReport.log('StoreListPage', 'Clicked on RSVP button under Upcoming Store Events');
});

When('Customer fill out the Private Registry Event RSVP form and submit', async function () {
  await page.customWait(repoCommonElements.storesPage.txtRsvpForm, 'txtRsvpForm');
  await page.customSet(repoCommonElements.storesPage.txtYourName, testData.rsvpFormInfo.name, 'txtYourName');
  await page.customSet(repoCommonElements.storesPage.txtFianceName, testData.rsvpFormInfo.fianceName, 'txtFianceName');
  await page.customSet(repoCommonElements.storesPage.txtEmail, testData.rsvpFormInfo.email, 'txtEmail');
  await page.customSet(repoCommonElements.storesPage.txtPhone, testData.rsvpFormInfo.phone, 'txtPhone');
  await page.customClick(repoCommonElements.storesPage.btnSendMyRsvp, 'btnSendMyRsvp');
  testReport.log('StoreListPage', 'Private Registry Event RSVP form is submitted');
});
