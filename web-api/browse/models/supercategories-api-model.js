// const { expect } = require('@playwright/test');
// const { BrowseApiModel } = require('./browse-api-model');

// class SuperCategoriesApiModel extends BrowseApiModel {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   verifySuperCategories(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories, 'should have a supercategory').not.toBeNull();
//   }

//   getSuperCategories(jsonResponse) {
//     return typeof jsonResponse.CommonAPI.SuperCategories !== 'undefined' ? jsonResponse.CommonAPI.Categories : null;
//   }

//   verifySuperCategoriesChildren(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children.length, 'should have a children').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenIdAttribute(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0]['@id'].length, 'should have an id attribute').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenNameAttribute(jsonResponse) {
//     if (jsonResponse.CommonAPI.SuperCategories.children[0] && jsonResponse.CommonAPI.SuperCategories.children[0]['@name'])
//       expect(jsonResponse.CommonAPI.SuperCategories.children[0]['@name'].length, 'should have a name attribute').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenName(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].name.length, 'should have a name').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenCategoryId(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].categoryId.length, 'should have a categoryId').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenParentId(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].parentId.length, 'should have a parentId').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenSequence(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].sequence.length, 'should have a sequence').toBeGreaterThan(0);
//   }

//   verifySuperCategoriesChildrenCategoryType(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].categoryType, 'should have a categoryType').not.toBeNull();
//   }

//   verifySuperCategoriesChildrenCategoryTypeType(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].categoryType['@type'], 'should have a categoryType type').not.toBeNull();
//   }

//   verifySuperCategoriesChildrenIsKids(jsonResponse) {
//     expect(jsonResponse.CommonAPI.SuperCategories.children[0].isKids.length, 'should have an isKids').toBeGreaterThan(0);
//   }

//   verifyErrorMessage(jsonResponse, message) {
//     expect(jsonResponse.CommonAPI.SuperCategories.Error['@description'], `should have a message: ${message}`).toBe(message);
//   }
// }

// module.exports = { SuperCategoriesApiModel };

/*  Uber Solution
    
    Model:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Models/SuperCategoriesModel.cs
    
*/
