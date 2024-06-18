// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { BrowseCommonApiModel } = require('../../models/browse-common-api-model');
// const { CategoryApiModel } = require('../../models/category-api-model');

// class CategoryApiAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeCategory(pid, cid, simple) {
//     const toSimple = this.toSimpleParam(simple);
//     const command = this.buildApiPidCommand(pid, apiEl.Action.category + apiEl.Parameter.cid + cid + toSimple);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async categoryValidate(cid, simple, pid) {
//     await this.categoryValidateCategory(cid);
//     testReport.log(this.pageName, `Validated Category for categoryId ${cid} simple ${simple} response for ${pid}`);
//   }

//   async categoryValidateCategory(categoryId) {
//     const jsonResponse = await this.getApiPageJson();

//     const browseCommonApiJsonModel = new BrowseCommonApiModel(jsonResponse);
//     browseCommonApiJsonModel.commonApiCategoryValidate(categoryId);
//     const categoryJsonApiModel = new CategoryApiModel(browseCommonApiJsonModel.commonApiCategory);

//     if (page.url().includes(apiEl.Parameter.toSimple)) {
//       await categoryJsonApiModel.simpleValidate(categoryId);
//     } else {
//       await categoryJsonApiModel.simpleValidate(categoryId);
//     }
//   }

//   async verifyCategoryNoId(cid, simple, pid) {
//     expect(cid, 'should not have a category id').toBe(0);

//     await this.verifyCategoryNoIdJson('No Category Id given');

//     testReport.log(this.pageName, `Validated Category No Category Id given error for categoryId ${cid} simple ${simple} response for ${pid}`);
//   }

//   async verifyCategoryNoIdJson(message) {
//     const jsonText = await page.innerText(apiEl.htmlObjects.Pre);
//     const jsonResponse = JSON.parse(jsonText);

//     testReport.log(this.pageName, message);
//   }

//   async verifyCategoryNotFound(cid, simple, pid) {
//     await this.verifyCategoryNotFoundJson('Category Not Found');
//     testReport.log(this.pageName, `Validated Category No Category Id given error for categoryId ${cid} simple ${simple} response for ${pid}`);
//   }

//   async verifyCategoryNotFoundJson(message) {
//     // const jsonText = await page.innerText(apiEl.htmlObjects.Pre)
//     // const jsonResponse = JSON.parse(jsonText);
//     // jsonData.verifyErrorMessage(jsonResponse, message);
//   }
// }

// module.exports = { CategoryApiAction };

/*  Uber Solution

    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple

*/
