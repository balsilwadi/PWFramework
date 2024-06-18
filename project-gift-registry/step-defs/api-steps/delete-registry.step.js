const { Given, Then } = require('@cucumber/cucumber');
const { getProfileIdByRegistryId, checkRegistryExist } = require('../../helpers/registry-get');
const { deleteRegistryById } = require('../../helpers/registry-delete');

const env = require('../../../support/env/env');
const data = require('../../data/temp/Registry/delete-registry.json');
const globalData = require('../../../support/global-data-object/global-data-object');
const apiPage = require('../../page-objects/api-pages/gift-registry.page');

const registryId = data[`${env.BRAND} ${env.COUNTRY}`][0]['Registry ID'];
globalData.registryId = registryId;

Given('The user deletes the registry using registryid', async function () {
  const profileId = await getProfileIdByRegistryId(registryId);
  await deleteRegistryById(registryId, profileId);
});

Then('The registry should be deleted successfully', async function () {
  const actualResponse = await checkRegistryExist(globalData.registryId);
  await apiPage.validateNotFoundResponse(actualResponse, 404);
});
