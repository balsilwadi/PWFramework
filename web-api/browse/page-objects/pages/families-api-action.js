// const { expect } = require('@playwright/test');

// const { ReportUtils } = require('../../../../support/utils/report-utils');

// const testReport = new ReportUtils();

// const apiEl = require('../../../page-objects/elements/api-elements');
// const { BrowseApiAction } = require('./browse-api-action');
// const { BrowseCommonApiModel } = require('../../models/browse-common-api-model');
// const { FamilyApiModel } = require('../../models/family-api-model');

// class FamiliesApiAction extends BrowseApiAction {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   async executeFamilies(pid, cid, simple) {
//     const toSimple = simple.includes('1') ? apiEl.Parameter.toSimple : '';
//     const command = this.buildApiPidCommand(pid, apiEl.Action.families + apiEl.Parameter.cid + cid + toSimple);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async executeFamiliesSkus(pid, cid, simple, showSkus, firstSubgroup) {
//     const toSimple = this.toSimpleParam(simple);
//     const toshowSkus = this.toShowSkusParam(showSkus);
//     const toFirstGroup = this.toFirstGroupParam(firstSubgroup);
//     const command = this.buildApiPidCommand(pid, apiEl.Action.families + apiEl.Parameter.cid + cid + toSimple + toshowSkus + toFirstGroup);

//     await this.apiGoToPage(global.apiUrl, command);
//   }

//   async familiesValidate(cid, simple, pid) {
//     await this.familiesJsonValidate(cid);
//     testReport.log(this.pageName, `Verified Families for categoryId ${cid} simple ${simple} response for ${pid}`);
//   }

//   async familiesJsonValidate(categoryId) {
//     const jsonResponse = await this.getApiPageJson();

//     const browseCommonApiJsonModel = new BrowseCommonApiModel(jsonResponse);
//     browseCommonApiJsonModel.commonApiFamiliesValidate(categoryId);

//     const firstFamilyJsonApiModel = new FamilyApiModel(browseCommonApiJsonModel.commonApiFamilies.item[0]);

//     if (page.url().includes(apiEl.Parameter.toSimple)) {
//       firstFamilyJsonApiModel.simpleValidate(firstFamilyJsonApiModel.familyId);
//     } else {
//       firstFamilyJsonApiModel.validate(firstFamilyJsonApiModel.familyId);
//     }
//   }
// }

// module.exports = { FamiliesApiAction };

/*  Uber Solution
    
    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/BrowseAPIModule.cs
    Controller: https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Controllers/BrowseController.cs

    Parameters:
    simple
    
*/
