// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { BrowseCommonApiModel } = require('../../models/browse-common-api-model');
// const { SkuApiModel } = require('../../models/sku-api-model');

// class SkuApiAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   getSkuApiCommand(sku, simple, itemGroup) {
//     const toSimple = this.toSimpleParam(simple);
//     const includeItemGroup = this.toItemGroupParam(itemGroup);

//     return this.buildApiCommand(apiEl.Action.sku + apiEl.Parameter.skuParam + sku + toSimple + includeItemGroup);
//   }

//   async getSkuApiModel(sku, simple, itemGroup) {
//     const command = this.getSkuApiCommand(sku, simple, itemGroup);
//     const commandJson = await this.getApiCommandJson(global.apiUrl, command);
//     testReport.log(this.pageName, `Retrieved sku-api-action response for SKU ${sku} simple ${simple} response for affiliate`);

//     const skuApiModel = this.returnSkuApiModel(sku, commandJson, command);
//     testReport.log(this.pageName, `Validated sku-api-action response for SKU ${sku} simple ${simple} response for affiliate`);

//     return skuApiModel;
//   }

//   async skuApiVerfied(sku, simple, itemGroup) {
//     // Sku action was validated in the previous Given
//     testReport.log(this.pageName, `Verfied sku-api-action response for SKU ${sku} simple ${simple} response for affiliate`);
//   }

//   async skuApiGoToPage(sku, simple, itemGroup) {
//     const command = this.getSkuApiCommand(sku, simple, itemGroup);

//     await this.apiGoToPage(global.apiUrl, command);
//     testReport.log(this.pageName, `Navigated to sku-api-page-action response for SKU ${sku} simple ${simple} response for affiliate`);
//   }

//   returnSkuApiModel(sku, json, command) {
//     const browseCommonApiModel = new BrowseCommonApiModel(json);
//     browseCommonApiModel.commonApiItemValidate(sku);
//     const skuApiModel = new SkuApiModel(browseCommonApiModel.commonApi.Item.Sku, command);
//     skuApiModel.validate(sku);

//     return skuApiModel;
//   }

//   async skuApiPageValidate(sku, simple, itemGroup) {
//     const pageJson = await this.getApiPageJson();
//     const skuApiModel = this.returnSkuApiModel(sku, pageJson, page.url());

//     testReport.log(this.pageName, `Validated sku-api-page-action for SKU ${sku} simple ${simple} response for affiliate`);
//   }

//   async itemNoSkuValidate(sku, simple) {
//     expect(sku === 0, 'should not have a sku');
//     const message = 'No valid sku, isbn, or upc given';

//     await this.commonApiErrorPageValidate(message);
//     testReport.log(this.pageName, `Validated sku-api-page-action Item ${message} error for sku ${sku} simple ${simple} response for affiliate`);
//   }

//   async itemNotFoundValidate(sku, simple) {
//     expect(sku === 0, 'should not have a sku');
//     const message = 'Sku Not Found';

//     await this.commonApiErrorPageValidate(message);
//     testReport.log(this.pageName, `Validated sku-api-page-action Item ${message} error for sku ${sku} simple ${simple} response for affiliate`);
//   }

//   async commonApiErrorPageValidate(message) {
//     const jsonResponse = await this.getApiPageJson();

//     const browseCommonApiJsonModel = new BrowseCommonApiModel(jsonResponse);
//     browseCommonApiJsonModel.commonApiErrorDescriptionAttributeValidate(message);
//   }
// }

// module.exports = { SkuApiAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
