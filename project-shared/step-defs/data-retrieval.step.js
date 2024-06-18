const { Given } = require('@cucumber/cucumber');
const { JsonHelper } = require('../../helpers/json-helper');

const jsonHelper = new JsonHelper();

Given('a random category uri has been retreived', async function () {
  const categoryUri = await jsonHelper.getRandomCategoryUri();
  this.setData('categoryUri', categoryUri);
});

Given('a random wide plp uri has been retreived', async function () {
  const widePlpUri = await jsonHelper.getRandomWidePlpUri();
  this.setData('widePlpUri', widePlpUri);
});

Given('a random wide collection plp uri has been retreived', async function () {
  const wideCollectionPlpUri = await jsonHelper.getRandomWidePlpUri();
  this.setData('wideCollectionPlpUri', wideCollectionPlpUri);
});

Given('a random spategory uri has been retreived', async function () {
  const categoryUri = await jsonHelper.getRandomSpategoryUri();
  this.setData('categoryUri', categoryUri);
});
