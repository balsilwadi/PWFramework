// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { BrowseCommonApiModel } = require('../../models/browse-common-api-model');
// const { FamilyApiModel } = require('../../models/family-api-model');

// class FamilyApiAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeFamily(pid, fid, simple) {
//     const toSimple = this.toSimpleParam(simple);
//     const command = this.buildApiPidCommand(pid, apiEl.Action.family + apiEl.Parameter.fid + fid + toSimple);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async familyValidate(pid, fid, simple) {
//     await this.familyJsonValidate(fid);
//     testReport.log(this.pageName, `Validated family for family ID ${fid} simple ${simple} response for ${pid}`);
//   }

//   async familyJsonValidate(familyId) {
//     const jsonResponse = await this.getApiPageJson();

//     const browseCommonApiJsonModel = new BrowseCommonApiModel(jsonResponse);
//     browseCommonApiJsonModel.commonApiFamilyValidate(familyId);
//     const familyJsonApiModel = new FamilyApiModel(browseCommonApiJsonModel.commonApiFamily.item);

//     if (page.url().includes(apiEl.Parameter.toSimple)) {
//       familyJsonApiModel.simpleValidate(familyId);
//     } else {
//       familyJsonApiModel.validate(familyId);
//     }
//   }
// }

// module.exports = { FamilyApiAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
