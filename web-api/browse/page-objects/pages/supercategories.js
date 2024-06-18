// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { SuperCategoriesApiModel } = require('../../models/supercategories-api-model');

// const superCategoriesApiModel = new SuperCategoriesApiModel();

// class SuperCategoriesAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeSupercategories(pid, simple) {
//     const toSimple = this.toSimpleParam(simple);
//     const command = this.buildApiPidCommand(pid, apiEl.Action.supercategories + toSimple);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async getSupercategoriesJson(simple) {
//     await action.executeSupercategories(this.pidDefault(), simple);
//     const jsonResponse = await this.getApiPageJson();

//     return jsonResponse;
//   }

//   async verifySupercategories(pid, simple) {
//     await this.verifySupercategoriesJson();
//     testReport.log(this.pageName, `Verified supercategories for simple ${simple} response for ${pid}`);
//   }

//   async verifySupercategoriesJson() {
//     const jsonText = await page.innerText(apiEl.htmlObjects.Pre);
//     const jsonResponse = JSON.parse(jsonText);

//     superCategoriesApiModel.verifySuperCategories(jsonResponse);
//     superCategoriesApiModel.verifySuperCategoriesChildren(jsonResponse);
//   }
// }

// module.exports = { SuperCategoriesAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
