// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');

// class GetCategoriesAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeGetCategories(pid, isUrlPath) {
//     // may remove isUrlPathParam
//     const isUrlPathParam = isUrlPath.includes('1') ? apiEl.Parameter.isUrlPathParam : '';
//     const command = this.buildApiPidCommand(pid, apiEl.Action.getCategories + isUrlPathParam);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async verifyGetCategories(pid, isUrlPath) {
//     await this.verifyGetCategoriesJson();
//     testReport.log(this.pageName, `Verified GetCategories for url path ${isUrlPath} response for ${pid}`);
//   }

//   async verifyGetCategoriesJson() {
//     const jsonResponse = await this.getApiPageJson();

//     expect(jsonResponse.CommonAPI.GetCategories, 'should have a category');
//   }
// }

// module.exports = { GetCategoriesAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
