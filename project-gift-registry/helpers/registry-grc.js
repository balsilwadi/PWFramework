const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const { getAdminApiVersion } = require('./registry-api');

const env = require('../../support/env/env');
const globalData = require('../../support/global-data-object/global-data-object');
const data = require('../data/temp/Registry/Create-GRC.json');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();
const testReport = new ReportUtils();

/**
 * @Function_Name : getGrIdForGRC
 * @Description : This Function return the GrId for the registry being tested depending on the env
 * @returns : the GrId for the grc test of the corresponding env
 */
async function getGrIdForGRC() {
  const registryId = data[`${env.BRAND} ${env.COUNTRY}`][0]['Registry Id'];
  return registryId;
}

/**
 * @Function_Name : createGRC
 * @Description : This Function calls GRAPI to attempt to create a grc
 * @param : Registry ID
 * @returns : Api response
 */
async function createGRC(registryId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-admin-read-write-token.json', 'project-gift-registry', 'x-api-key');
  const result = await apiUtils.postRequest(
    `${env.API_URL}/gift-registry/admin/${getAdminApiVersion('grc')}/registries/completion-coupon?locale=${env.GR_LOCALE}`,
    { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey, 'content-type': 'application/json' },
    `[ ${registryId} ]`
  );

  testReport.log('', result || 'GRC Created successfully');

  return result;
}

/**
 * @Function_Name : updateGRC
 * @Description : This Function calls GRAPI to attempt to create or update a grc
 * @param : Registry ID
 * @returns : Api response
 */
async function updateGRC(registryId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-admin-read-write-token.json', 'project-gift-registry', 'x-api-key');
  const result = await apiUtils.putRequest(
    `${env.API_URL}/gift-registry/admin/${getAdminApiVersion('grc')}/registries/${registryId}/completion-coupon?locale=${env.GR_LOCALE}`,
    { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
    null
  );

  return result;
}

/**
 * @Function_Name : cancelGRC
 * @Description : This Function calls GRAPI to attempt to cancel a grc
 * @param : Registry ID
 * @returns : Api response
 */
async function cancelGRC(registryId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-admin-read-write-token.json', 'project-gift-registry', 'x-api-key');
  const result = await apiUtils.deleteRequest(
    `${env.API_URL}/gift-registry/admin/${getAdminApiVersion('grc')}/registries/${registryId}/completion-coupon?locale=${env.GR_LOCALE}`,
    { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
    null
  );

  testReport.log('', result || 'GRC Deleted successfully');

  return result;
}

module.exports = {
  getGrIdForGRC,
  createGRC,
  updateGRC,
  cancelGRC
};
