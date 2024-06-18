const { CommonUtils } = require('../../support/utils/common-utils');
const { RequestUtils } = require('../../support/utils/api-request-utils');
const { ApiUtils } = require('../../support/utils/api-utils');
const globalData = require('../../support/global-data-object/global-data-object');
const env = require('../../support/env/env');
const { getApiVersion } = require('./registry-api');

const common = new CommonUtils();
const requestUtils = new RequestUtils();
const apiUtils = new ApiUtils();

// function addItemToRegistry(registryId, item, quantity = 1) {}

// function updateItemWantedQuantity(registryId, item, wantedQuantity) {}

// function addItemToGroupGift(registryId, item) {}

// function removeItemFromGroupGift(registryId, item) {}

// function addItemToMostLoved(registryId, item) {}

// function removeItemFromMostLoved(registryId, item) {}

async function getRegistryItems(grID) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-read-token.json', 'project-gift-registry', 'x-api-key');
  const grItems = await apiUtils
    .getRequest(
      `${env.API_URL}/gift-registry/${getApiVersion('get')}/registries/${grID}?locale=cb-en-us`,
      { Authorization: `Bearer ${globalData.accessToken}`, 'x-api-key': xApiKey },
      { username: '', password: '' }
    )
    .then((response) => response.items);

  return grItems;
}

async function deleteRegistryItems(grId, grItems) {
  const xApiKey = await common.readSecureProperties('x-api-key');
  await requestUtils.getBearerTokenData('get-write-token.json', 'project-gift-registry', 'x-api-key').then(async () => {
    await Promise.all(
      grItems.map(async (item) => {
        await apiUtils.deleteRequest(
          `${env.API_URL}/gift-registry/${getApiVersion('items')}/registries/${grId}/items/${item.sku}?Locale=cb-en-us`,
          {
            'content-type': 'application/json',
            Authorization: `Bearer ${globalData.accessToken}`,
            'x-api-key': xApiKey
          },
          'x-api-key'
        );
      })
    );
  });
}
module.exports = {
  //   addItemToRegistry,
  //   updateItemWantedQuantity,
  //   addItemToGroupGift,
  //   removeItemFromGroupGift,
  //   addItemToMostLoved,
  //   removeItemFromMostLoved
  getRegistryItems,
  deleteRegistryItems
};
