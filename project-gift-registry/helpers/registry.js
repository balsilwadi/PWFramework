const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const globalData = require('../../support/global-data-object/global-data-object');
const env = require('../../support/env/env');
const { getApiVersion } = require('./registry-api');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();
const promises = [];

async function getRegistry() {
  const giftRegistry = await requestUtils
    .getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key')
    .then(() => requestUtils.getRequestWithBearerToken('get-registry.json', 'project-gift-registry', 'x-api-key').then((response) => response));

  return giftRegistry;
}

async function getRegistryById(grId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  const giftRegistry = await requestUtils
    .getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key')
    .then(() =>
      apiUtils
        .getRequest(
          `${env.API_URL}/gift-registry/${getApiVersion('get')}/registries/${grId}?Locale=${env.GR_LOCALE}`,
          { 'content-type': 'application/json', Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
          'x-api-key'
        )
        .then((response) => response)
    );

  return giftRegistry;
}

async function deleteRegistry(grId, profileId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-write-token.json', 'project-gift-registry', 'x-api-key').then(async () => {
    await apiUtils.deleteRequest(
      `${env.API_URL}/gift-registry/${getApiVersion('delete')}/registries/${grId}?Locale=${env.GR_LOCALE}&ProfileId=${profileId}`,
      {
        'content-type': 'application/json',
        Authorization: `Bearer ${globalData.accessToken}`,
        'x-api-key': xApiKey
      },
      'x-api-key'
    );
  });
}
async function checkRegistryExist(grId) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key');
  const request = await global.context.request;
  const strDataUrl = `${env.API_URL}/gift-registry/${getApiVersion('get')}/registries/${grId}?locale=${env.GR_LOCALE}`;
  const headers = { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey };
  const authorization = { username: '', password: '' };
  const response = await request.get(strDataUrl, { headers, Authorization: authorization });

  await Promise.all(promises);
  return response;
}
module.exports = {
  getRegistry,
  getRegistryById,
  deleteRegistry,
  checkRegistryExist
};
