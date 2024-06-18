const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const env = require('../../support/env/env');
const globalData = require('../../support/global-data-object/global-data-object');
const version = require('../data/temp/Registry/api-version.json');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();

async function deleteRegistryById(grId, profileId) {
  const xApiKey = await common.readSecureProperties('x-api-key');

  await requestUtils.getBearerTokenData('get-write-token.json', 'project-gift-registry', 'x-api-key');

  return apiUtils.deleteRequest(
    `${env.API_URL}/gift-registry/${version.registry.delete}/registries/${grId}?locale=${env.GR_LOCALE}`,
    {
      Authorization: `Bearer ${globalData.accessToken}`,
      'x-api-key': xApiKey,
      'Profile-Id': profileId
    },
    'x-api-key'
  );
}

module.exports = {
  deleteRegistryById
};
