const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const env = require('../../support/env/env');
const globalData = require('../../support/global-data-object/global-data-object');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();

const version = require('../data/temp/Registry/api-version.json');

/**
 * @Function_Name : updateEventDate
 * @Description : This function calls GRAPI to attempt to update a registry that contains an updated event date
 * @param : Registry object
 * @returns : Api response
 */
async function updateEventDate(registry) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-write-token.json', 'project-gift-registry', 'x-api-key', 'Profile-Id');
  const response = await apiUtils.putRequest(
    `${env.API_URL}/gift-registry/${version.registry.update}/registries/${registry.id}?locale=${env.GR_LOCALE}`,
    { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey, 'Profile-Id': registry.primaryRegistrant.profileId },
    registry
  );
  return response;
}

module.exports = {
  updateEventDate
};
