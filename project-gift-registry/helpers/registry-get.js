const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const globalData = require('../../support/global-data-object/global-data-object');
const env = require('../../support/env/env');
const version = require('../data/temp/Registry/api-version.json');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();

/**
 * @Function_Name : getRegistryById
 * @Description : This Function returns the registry detail against the passing registry id
 * @param : Registry ID
 * @returns : Gift Registry detail
 */
async function getRegistryById(grID) {
  const xApiKey = await common.readSecureProperties('x-api-key');

  const giftRegistry = await requestUtils
    .getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key')
    .then(() =>
      apiUtils
        .getRequest(
          `${env.API_URL}/gift-registry/${version.registry.get}/registries/${grID}?locale=${env.GR_LOCALE}`,
          { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
          'x-api-key'
        )
        .then((response) => response)
    );
  return giftRegistry;
}

/** 
@Function_Name : getProfileIdByRegistryId
@Description : This Function returns the profileId
@param : Registry ID
@returns : ProfileId
*/
async function getProfileIdByRegistryId(grID) {
  const giftRegistry = await getRegistryById(grID);
  return giftRegistry?.primaryRegistrant?.profileId;
}
/**
 * @Function_Name : checkRegistryExist
 * @Description : This Function returns the status of the gift registry against the passing registry id
 * @returns : Gift Registry status[200/400/401/404]
 */
async function checkRegistryExist(grID) {
  const xApiKey = await common.readSecureProperties('x-api-key');

  await requestUtils.getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key');
  return apiUtils
  .getRequestReturnsStatus(
    `${env.API_URL}/gift-registry/${version.registry.get}/registries/${grID}?locale=${env.GR_LOCALE}`,
    { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
    'x-api-key'
  );
}

module.exports = {
  getRegistryById,
  getProfileIdByRegistryId,
  checkRegistryExist
};
