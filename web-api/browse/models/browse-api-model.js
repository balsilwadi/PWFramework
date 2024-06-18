// const { expect } = require('@playwright/test');
// const { ApiModel } = require('../../models/api-model');
// const apiEl = require('../page-objects/elements/browse-api-elements');

// class BrowseApiModel extends ApiModel {
//   constructor(model, actionCommand) {
//     super(model, actionCommand);
//     this.pageName = this.constructor.name;
//   }

//   get isKids() {
//     return this.model.isKids ? this.model.isKids : '';
//   }

//   isKidsVerify() {
//     expect(this.model.isKids, 'should have an isKids').not.toBeNull();
//   }

//   get isKidsAttribute() {
//     return this.model.isKids ? this.model.isKids : '';
//   }

//   isKidsAttributeVerify() {
//     expect(this.model.isKids, 'should have an isKids attribute').not.toBeNull();
//   }

//   get title() {
//     return this.model.title ? this.model.title : '';
//   }

//   titleVerify() {
//     // expect(this.model.title, 'should have a title').not.toBeNull();
//   }

//   get titleAttribute() {
//     return this.model.title ? this.model.title : '';
//   }

//   titleAttributeVerify() {
//     // expect(this.model.title, 'should have a title attribute').not.toBeNull();
//   }

//   hasFirstGroupParam() {
//     return this.action.includes(apiEl.Parameter.firstGroupParam);
//   }

//   hasItemGroupParam() {
//     return this.action.includes(apiEl.Parameter.itemGroupParam);
//   }

//   hasShowSkusParam() {
//     return this.action.includes(apiEl.Parameter.showSkusParam);
//   }
// }
// module.exports = { BrowseApiModel };

/*  Uber Solution
    
    Model:    
    
*/
