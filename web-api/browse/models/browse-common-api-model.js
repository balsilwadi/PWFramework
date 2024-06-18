// const { expect } = require('@playwright/test');
// const { CommonApiModel } = require('../../models/common-api-model');

// class BrowseCommonApiModel extends CommonApiModel {
//   constructor(jsonResponse) {
//     super(jsonResponse);
//     this.pageName = this.constructor.name;
//   }

//   get commonApiCategory() {
//     return this.model.Categories.children[0] ? this.model.Categories.children[0] : null;
//   }

//   commonApiCategoryValidate(categoryId) {
//     // expect(this.model.Categories, 'should have a Categories').not.toBeNull();
//     // expect(this.model.Categories.categoryid, `should have a category ID: ${categoryId}`).toBe(categoryId);
//   }

//   get commonApiFamilies() {
//     return this.model.Items ? this.model.Items : null;
//   }

//   commonApiFamilyValidate(familyId) {
//     // expect(this.model.Family, 'should have a Family').not.toBeNull();
//     // expect(this.model.Family.familyid, `should have a family ID: ${familyId}`).toBe(familyId);
//     // expect(this.model.Family.name, 'should have a name').not.toBeNull();
//   }

//   get commonApiFamily() {
//     // return this.model.Family ? this.model.Family : null;
//   }

//   commonApiFamiliesValidate(categoryId) {
//     // expect(this.model.Items, 'should have an Items').not.toBeNull();
//     // expect(this.model.Items.categoryid, `should have a category ID: ${categoryId}`).toBe(categoryId);
//     // expect(this.model.Items.name, 'should have a name').not.toBeNull();
//   }

//   get commonApiItem() {
//     return this.model.Item ? this.model.Item : null;
//   }

//   commonApiItemValidate(sku) {
//     // expect(this.model.Item, 'should have an Item').not.toBeNull();
//     // expect(this.model.Item['@sku'], `should have a sku: ${sku}`).toBe(sku);
//     // expect(this.model.Item['@name'], 'should have a name').not.toBeNull();
//   }
// }

// module.exports = { BrowseCommonApiModel };

/*  Uber Solution
    
    Model:    
    
*/
