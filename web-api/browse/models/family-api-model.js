// const { expect } = require('@playwright/test');
// const { BrowseApiModel } = require('./browse-api-model');

// class FamilyApiModel extends BrowseApiModel {
//   constructor(item, actionCommand) {
//     expect(item, 'should have an item').not.toBeNull();
//     super(item, actionCommand);
//     this.pageName = this.constructor.name;
//   }

//   validate(familyId) {
//     this.titleVerify();
//     this.familyIdValidate(familyId);
//   }

//   simpleValidate(familyId) {
//     this.titleAttributeVerify();
//     this.familyIdAttributeValidate(familyId);
//   }

//   get familyId() {
//     return this.model.familyId ? this.model.familyId : '';
//   }

//   familyIdVerify() {
//     expect(this.model.familyId, 'should have a familyId').not.toBeNull();
//   }

//   familyIdValidate(familyId) {
//     this.familyIdVerify();
//     expect(this.model.familyId, `should have a familyId: ${familyId}`).toBe(familyId);
//   }

//   familyIdAttributeVerify() {
//     expect(this.model.familyId, 'should have a familyId').not.toBeNull();
//   }

//   familyIdAttributeValidate(familyId) {
//     this.familyIdAttributeVerify();
//     expect(this.model.familyId, `should have a familyId: ${familyId}`).toBe(familyId);
//   }
// }

// module.exports = { FamilyApiModel };

/*  Uber Solution
    
    Model:    https://bitbucket.org/crate_web_development/uber/src/master/Crate.Application.Api/DataTransfer/FamilyModel.cs
    
*/
