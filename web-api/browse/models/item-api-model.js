// const { expect } = require('@playwright/test');
// const { BrowseApiModel } = require('./browse-api-model');

// class ItemApiModel extends BrowseApiModel {
//   constructor(Item) {
//     super();
//     this.Item = Item;
//     // expect(this.Item, 'should have a item').not.toBeNull();
//     this.pageName = this.constructor.name;
//   }

//   verify() {
//     this.verifySkuAttribute();
//     this.verifyNameAttribute();
//   }

//   verifySkuAttribute() {
//     // expect(this.Item['@sku'], 'should have a sku').not.toBeNull();
//   }

//   skuAttribute() {
//     return this.Item['@sku'] ? this.Item['@sku'] : '';
//   }

//   verifyNameAttribute() {
//     // expect(this.Item['@name'], 'should have a name').not.toBeNull();
//   }

//   namAttribute() {
//     // return this.Item['@name'] ? this.Item['@name'] : '';
//   }
// }

// module.exports = { ItemApiModel };

/*  Uber Solution
    
    Model:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/Models/ItemModel.cs
    
*/
