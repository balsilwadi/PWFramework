const ENV = require('../support/env/env.js');

Object.assign(global, {
  browser: 'webkit',
  brand: ENV.BRAND,
  language: ENV.LANGUAGE,
  country: ENV.COUNTRY,
  env: ENV.EXEC_ENV,
  site: ENV.EXEC_SITE,
  baseURL: ENV.BASE_URL,
  availabilityBaseURL: ENV.BASE_URL_Availability,
  crateUrl: ENV.CRATE_BROWSER_URL,
  apiUrl: ENV.API_URL,
  apiPid: ENV.API_PID,
  auth_urlQA: 'https://preview-auth.crateandbarrel.com/oauth2',
  QA_api: 'https://qa-api.crateandbarrel.com',
  idServerLogin: 'cbvendor',
  idServerPwd: 'Pas2t6eQ',
  pageName: '',
  report: '<p><u>Details of validations performed as part of this TestScript</u></p></br>',
  testSnapshot: '',
  browserName: '',
  crateUS_URL: ENV.CRATEUS_URL,
  cb2US_URL: ENV.CB2US_URL,
  crateCAN_URL: ENV.CRATECAN_URL,
  cb2CAN_URL: ENV.CB2CAN_URL,
  isTestReportEnabled: true,
  skipSearch: true,
  isSmsOptInEnabledForFT: true,
  small_wait: 5000,
  medium_wait: 10000,
  large_wait: 90000
});
const TIMEOUT_IN_MINS = 3;
const TIMEOUT = TIMEOUT_IN_MINS * 60 * 1000;
const config = {
  retries: 2,
  timeout: TIMEOUT,
  expect: { timeout: TIMEOUT },
  use: {
    trace: 'off',
    actionTimeout: TIMEOUT,
    navigationTimeout: TIMEOUT,
    testAutAttribute: 'data-aut'
  },
  globalTimeout: TIMEOUT
};

module.exports = config;
