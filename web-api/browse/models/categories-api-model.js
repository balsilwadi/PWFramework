// const { expect } = require('@playwright/test');
// const { BrowseApiModel } = require('./browse-api-model');

// class CategoriesApiData extends BrowseApiModel {
//   constructor() {
//     super();
//     this.pageName = this.constructor.name;
//   }

//   verify(categoryId) {
//     // placeholder
//     return categoryId;
//   }

//   verifySimple(categoryId) {
//     // placeholder
//     return categoryId;
//   }

//   verifyCategories(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories, 'should have a category').not.toBeNull();
//   }

//   getCategories(jsonResponse) {
//     return typeof jsonResponse.CommonAPI.Categories !== 'undefined' ? jsonResponse.CommonAPI.Categories : null;
//   }

//   verifyCategoryId(jsonResponse, categoryId) {
//     expect(jsonResponse.CommonAPI.Categories.categoryid, 'should have a categoryId').toBe(categoryId);
//   }

//   verifyCategoriesChildren(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children.length, 'should have a children').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenIdAttribute(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0]['@id'].length, 'should have an id attribute').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenNameAttribute(jsonResponse) {
//     if (jsonResponse.CommonAPI.Categories.children[0] && jsonResponse.CommonAPI.Categories.children[0]['@name'])
//       expect(jsonResponse.CommonAPI.Categories.children[0]['@name'].length, 'should have a name attribute').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenName(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].name.length, 'should have a name').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenCategoryId(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].categoryId.length, 'should have a categoryId').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenParentId(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].parentId.length, 'should have a parentId').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenSequence(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].sequence.length, 'should have a sequence').toBeGreaterThan(0);
//   }

//   verifyCategoriesChildrenCategoryType(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].categoryType, 'should have a categoryType').not.toBeNull();
//   }

//   verifyCategoriesChildrenCategoryTypeType(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].categoryType['@type'], 'should have a categoryType type').not.toBeNull();
//   }

//   verifyCategoriesChildrenIsKids(jsonResponse) {
//     expect(jsonResponse.CommonAPI.Categories.children[0].isKids.length, 'should have an isKids').toBeGreaterThan(0);
//   }

//   verifyErrorMessage(jsonResponse, message) {
//     expect(jsonResponse.CommonAPI.Categories.Error['@description'], `should have a message: ${message}`).toBe(message);
//   }
// }

// module.exports = { CategoriesApiData };

/*  Uber Solution
    
    Model:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Models/CategoriesModel.cs
    
*/
