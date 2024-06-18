/* eslint-disable no-console */
/* eslint-disable no-undef */
const { BeforeAll, Before, After, AfterAll, setDefaultTimeout, Status, AfterStep, BeforeStep, supportCodeLibraryBuilder } = require('@cucumber/cucumber');
const { setWorldConstructor } = require('@cucumber/cucumber');
const playwright = require('playwright');
const { devices } = require('@playwright/test');
const chalk = require('chalk');
const fs = require('fs');
const sharp = require('sharp');
const CustomWorld = require('./custom-world');
const { ExtendedBaseFunctions } = require('./extended-base-functions');
const { ReportUtils } = require('../support/utils/report-utils');
const globalData = require('../support/global-data-object/global-data-object');
const env = require('../support/env/env');
const logger = require('./logger');

const extendedFunctions = new ExtendedBaseFunctions();
const testReport = new ReportUtils();
let isUiTestCase = false;
setWorldConstructor(CustomWorld);
setDefaultTimeout(120 * 1000);
const device = process.env.DEVICE;
global.device = device;

// Set launch options.
const options = {
  headless: env.HEADLESS === 'true',
  // args: ["--remote-debugging-port=4999"],
  slowMo: 100 // faster faster faster!
};

BeforeAll({}, async () => {
  // print out all step definitions to /reports/step-definitions.json file
  const stepDefinitions = supportCodeLibraryBuilder.stepDefinitionConfigs;
  const given = stepDefinitions
    .filter((step) => step.keyword === 'Given')
    .map((record) => record.pattern)
    .sort();
  const when = stepDefinitions
    .filter((step) => step.keyword === 'When')
    .map((record) => record.pattern)
    .sort();
  const then = stepDefinitions
    .filter((step) => step.keyword === 'Then')
    .map((record) => record.pattern)
    .sort();
  const definitions = {
    given,
    when,
    then
  };

  // write out file
  fs.writeFile('./reports/step-definitions.json', JSON.stringify(definitions), () => {});
});

// Create a global browser for the test session.
BeforeAll({ timeout: 100 * 1000 }, async () => {
  // Purge all old screenshots
  fs.readdirSync('./reports').forEach((file) => (file.includes('.png') ? fs.rmSync(`./reports/${file}`) : ''));

  const currentBrowser = devices[device];

  switch (currentBrowser?.defaultBrowserType) {
    case 'chromium':
      global.browser = await playwright.chromium.launch(options);
      break;
    case 'firefox':
      global.browser = await playwright.firefox.launch(options);
      break;
    case 'webkit':
      global.browser = await playwright.webkit.launch(options);
      break;
    default:
      global.browser = await playwright.chromium.launch(options);
  }
});

// Create a fresh browser context for each test.
Before({ timeout: 180 * 1000 }, async (scenario) => {
  // setDefaultTimeout(120 * 1000);
  pageName = '';
  let arr = [];
  arr = scenario.gherkinDocument.feature.children.filter((e) => e.background === undefined); // filters out background from the array of objects
  arr = arr.find((e) => e.scenario.name === scenario.pickle.name); // fetches the scenario which is currenlty running
  arr = arr.scenario.tags; // fetches the tag names

  global.report = '';
  if (scenario.gherkinDocument.feature.name !== undefined) {
    global.txtLog = JSON.stringify(scenario.gherkinDocument.feature.name); // fetches the feature name to log it to logger file
  }

  global.isMobile = devices[device]?.isMobile;
  global.report = '';

  testReport.logHdr(`Device & Browser Info:: ${device}, isMobile: ${global.isMobile}`);
  logger.info('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Starting Scenario >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  logger.info(`Feature Name :${JSON.stringify(scenario.gherkinDocument.feature.name)}`);

  const currentBrowser = devices[device];
  global.browserType = currentBrowser?.defaultBrowserType ?? 'chromium';

  if (currentBrowser === null) {
    throw new Error('Browser not supported');
  }

  if (!scenario.gherkinDocument.feature.name.includes(device)) {
    // eslint-disable-next-line no-param-reassign
    scenario.gherkinDocument.feature.name = `${scenario.gherkinDocument.feature.name} [${device}]`;
  }
  console.group(chalk.bgMagentaBright(`Browser: ${device} - Test Scenario:${chalk.reset(` ${scenario.pickle.name}`)}`));
  global.context = await global.browser.newContext({
    ...currentBrowser,
    extraHTTPHeaders: {
      IsCorporateRequest: 'true'
    },
    deviceScaleFactor: 2,
    baseURL: env.BASE_URL
  });
  context.setDefaultNavigationTimeout(3 * 30000);

  await global.context.addCookies([
    {
      name: 'EmailOptInAlreadyViewedCount',
      value: '3',
      url: env.BASE_URL,
      secure: true
    }
  ]);

  if (env.EXEC_SITE.includes('can')) {
    await global.context.addCookies([
      {
        name: 'HideGeoLocationPopup',
        value: '1',
        url: env.BASE_URL,
        secure: true
      }
    ]);
  }

  // Handling the API Testcases not opening the browsers
  global.request = await global.context.request;
  for (let i = 0; i < arr.length; i++) {
    // checks if the test case is API test case
    if (arr[i].name === '@API') {
      isUiTestCase = false;
      break;
    } else {
      isUiTestCase = true;
    }
  }

  // checks if the test case is UI test case
  if (isUiTestCase) {
    global.page = await global.context.newPage();
    global.request = await global.context.request;
    global.page.customClick = extendedFunctions.customClick;
    global.page.customCheck = extendedFunctions.customCheck; // await page.customCheck(selector)
    global.page.customSelectByValue = extendedFunctions.customSelectByValue; // await page.customSelectByValue(selector,value)
    global.page.customSelectByIndex = extendedFunctions.customSelectByIndex; // await page.customSelectByIndex(selector, index)
    global.page.customSet = extendedFunctions.customSet; // await page.customSet(selector, data)
    global.page.customRadio = extendedFunctions.customRadio; // await page.customRadio(selector)
    global.page.isObjectExist = extendedFunctions.isObjectExist;
    global.page.isDisabled = extendedFunctions.isDisabled;
    global.page.customWait = extendedFunctions.customWait;
    global.page.elementReporterLog = extendedFunctions.elementReporterLog;
    global.page.verifyElementExistOrDisable = extendedFunctions.verifyElementExistOrDisable;

    await global.context.tracing.start({ screenshots: true, snapshots: true });
  }

  const arr1 = [];
  for (let i = 0; i < arr.length; i++) {
    arr1[i] = arr[i].name;
  }

  testReport.logHdr(`Envrionment:: ${env.EXEC_SITE}, ${env.BASE_URL}, Tags:: ${arr1}`);

  // Setting the project name for API Data files
  if (arr1.includes('@GRSS')) {
    globalData.project_name = 'projectOne';
  } else if (arr1.includes('@ISD')) {
    globalData.project_name = 'projectTwo';
  }
});

BeforeStep({ timeout: 180 * 1000 }, async (scenario) => {
  testReport.logHdr(`Step >> ${scenario.pickleStep.text}`);
});

AfterStep({ timeout: 180 * 1000 }, async function (scenario) {
  const timestamp = Math.floor(new Date().getTime() / 1000); // Divide by 1000 to get Unix timestamp in seconds
  if (scenario.result.status !== Status.PASSED) {
    const buffer = await global.page.screenshot({
      path: `reports/${scenario.result.status}${scenario.pickle.name}_${timestamp}_s.jpeg`,
      fullPage: true,
      quality: 25
    });

    // Use sharp to compress the image
    const decodedImage = Buffer.from(buffer, 'base64');
    const compressedBuffer = await sharp(decodedImage)
      .resize({ width: 800 })
      .png({ compressionLevel: 9 }) // Adjust the compression level (0-9) as needed
      .toBuffer();
    this.attach(compressedBuffer, 'image/png');
  }
});

After({}, async function () {
  // close the context
  await global.context.close();
});

After({ timeout: 180 * 1000 }, async function (scenario) {
  if (isUiTestCase) {
    await global.context.tracing.stop({
      path: `traces/${device}/${scenario.pickle.name}.zip`
    });

    if (scenario.result.status === Status.PASSED) {
      const timestamp = Math.floor(new Date().getTime() / 1000); // Divide by 1000 to get Unix timestamp in seconds
      const buffer = await global.page.screenshot({
        path: `reports/${device}_${scenario.pickle.name}_${timestamp}_s.jpeg`,
        fullPage: true,
        quality: 25
      });

      // Use sharp to compress the image
      const decodedImage = Buffer.from(buffer, 'base64');
      const compressedBuffer = await sharp(decodedImage)
        .resize({ width: 800 })
        .png({ compressionLevel: 9 }) // Adjust the compression level (0-9) as needed
        .toBuffer();
      this.attach(compressedBuffer, 'image/png');
    }

    console.groupEnd();
    testReport.logHdr(`<strong><p><u>Snapshot of Test</u></p></strong>`);
    testReport.log(`Scenario`, `${scenario.pickle.name} <br> ${global.testSnapshot}`);

    await global.page.close();
    await global.context.close();
  }
  this.attach(global.report);
  logger.info('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End of Scenario >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
});

AfterAll(async () => {
  await global.browser.close();
});
