// const { Given, When, Then } = require('@cucumber/cucumber');
// const { SkuApiAction } = require('../page-objects/pages/sku-api-action');

// const skuApiAction = new SkuApiAction();

// Given('Affiliate executes the sku-api-action with SKU {string} simple {string} item group {string}', async function (sku, simple, itemGroup) {
//   await skuApiAction.getSkuApiModel(sku, simple, itemGroup);
// });

// Then('The sku-api-action for affiliate with SKU {string} simple {string} item group {string} has been verified', async function (sku, simple, itemGroup) {
//   await skuApiAction.skuApiVerfied(sku, simple, itemGroup);
// });

// Given('Affiliate executes the sku-api-page-action with SKU {string} simple {string} item group {string}', async function (sku, simple, itemGroup) {
//   await skuApiAction.skuApiGoToPage(sku, simple, itemGroup);
// });

// Then('The sku-api-page-action with SKU {string} simple {string} item group {string} should be displayed', async function (sku, simple, itemGroup) {
//   await skuApiAction.skuApiPageValidate(sku, simple, itemGroup);
// });

// Then(
//   'The sku-api-page-action with SKU {string} simple {string} item group {string} No valid sku, isbn, or upc given error should be displayed',
//   async function (sku, simple, itemGroup) {
//     await skuApiAction.itemNoSkuValidate(simple, sku);
//   }
// );

// Then(
//   'The sku-api-page-action with SKU {string} simple {string} item group {string} Sku Not Found error should be displayed',
//   async function (sku, simple, itemGroup) {
//     await skuApiAction.itemNotFoundValidate(simple, sku);
//   }
// );

/*  Uber Solution

    Handler:
    Action:
    Model:

    Parameters:
    simple

*/
