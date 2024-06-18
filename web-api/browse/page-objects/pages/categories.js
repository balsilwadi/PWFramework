// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();
// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { CategoriesApiData } = require('../../models/categories-api-model');

// const jsonData = new CategoriesApiData();

// class CategoriesAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeCategories(pid, simple) {
//     const toSimple = this.toSimpleParam(simple);
//     const command = this.buildApiPidCommand(pid, apiEl.Action.categories + toSimple);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async getCategoriesJson(pid, simple) {
//     await action.executeCategory(this.pidDefault(), simple);
//     const jsonResponse = await this.getApiPageJson();

//     return jsonResponse;
//   }

//   async verifyCategories(pid, simple) {
//     await this.verifyCategoriesJson();
//     testReport.log(this.pageName, `Verified categories for simple ${simple} response for ${pid}`);
//   }

//   async verifyCategoriesJson() {
//     const jsonText = await page.innerText(apiEl.htmlObjects.Pre);
//     const jsonResponse = JSON.parse(jsonText);

//     jsonData.verifyCategories(jsonResponse);
//     jsonData.verifyCategoriesChildren(jsonResponse);

//     if (page.url().includes(apiEl.Parameter.toSimple)) {
//       await this.verifyCategoriesJsonChildrenSimple(jsonResponse);
//     } else {
//       await this.verifyCategoriesJsonChildren(jsonResponse);
//     }
//   }

//   async verifyCategoriesJsonChildrenSimple(jsonResponse) {
//     jsonData.verifyCategoriesChildrenIdAttribute(jsonResponse);
//     jsonData.verifyCategoriesChildrenNameAttribute(jsonResponse);
//   }

//   async verifyCategoriesJsonChildren(jsonResponse) {
//     jsonData.verifyCategoriesChildrenName(jsonResponse);
//     jsonData.verifyCategoriesChildrenCategoryId(jsonResponse);
//     jsonData.verifyCategoriesChildrenParentId(jsonResponse);
//     jsonData.verifyCategoriesChildrenSequence(jsonResponse);
//     jsonData.verifyCategoriesChildrenCategoryType(jsonResponse);
//     jsonData.verifyCategoriesChildrenCategoryTypeType(jsonResponse);
//     jsonData.verifyCategoriesChildrenIsKids(jsonResponse);
//     jsonData.verifyCategoriesChildrenName(jsonResponse);
//   }
// }

// module.exports = { CategoriesAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
