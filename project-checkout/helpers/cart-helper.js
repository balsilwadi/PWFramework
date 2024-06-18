const testData = require('../page-objects/datafiles/testdata');
const env = require('../../support/env/env');

function getAccountEmail(key) {
  const accountArray = testData.returningUsrAccounts;
  const email = accountArray[key.toLowerCase()];
  return email;
}

function getSkuFromEnvFile(skuDesc) {
  return env[skuDesc];
}

function getZipCode(zipCodeType) {
  return env[zipCodeType];
}

module.exports = {
  getAccountEmail,
  getSkuFromEnvFile,
  getZipCode
};
