// const { expect } = require('@playwright/test');
// const { BrowseApiModel } = require('./browse-api-model');

// class SkuApiModel extends BrowseApiModel {
//   constructor(Sku, command) {
//     expect(Sku, 'should have a Sku').not.toBeNull();
//     super(Sku, command);
//     this.pageName = this.constructor.name;
//   }

//   validate(sku) {
//     this.verifySku(sku);
//     this.titleVerify();
//     this.isKidsVerify();

//     /* To Do:
//         if(this.model.cares)
//           verify with care-model.js

//         if(this.model.itemdimensions)
//           verify with itemdimensions-model.js
//     */

//     if (this.hasItemGroupParam) {
//       /* To Do:
//         if(this.model.itemGroupAttributeSelected-model)
//           verify with itemGroupAttributeSelected-model.js
//       */
//     }
//   }

//   simpleValidate(sku) {
//     this.skuAttributeVerify(sku);
//     this.titleAttributeVerify();
//     this.isKidsAttributeVerify();
//   }

//   get sku() {
//     return this.model.sku ? this.model.sku : '';
//   }

//   // verifySku(sku) {
//   //   expect(this.model.sku, 'should have a sku').not.toBeNull();
//   //   expect(this.model.sku, `should have a sku: ${sku}`).toBe(sku);
//   // }

//   // skuAttributeVerify(sku) {
//   //   expect(this.model.sku, 'should have a sku').not.toBeNull();
//   //   expect(this.model.sku === sku, `should have a sku: ${sku}`).toBe(sku);
//   // }
// }

// module.exports = { SkuApiModel };

/*  Uber Solution

    Model:    https://bitbucket.org/crate_web_development/uber/src/master/Crate.Application.Api/DataTransfer/ProductModel.cs

*/
