// const { expect } = require('@playwright/test');
const { BrowseApiModel } = require('./browse-api-model');

class CommonItemApiModel extends BrowseApiModel {
  constructor(object) {
    super();
    // expect(object, 'should have a object').not.toBeNull();
    this.object = object;
    this.pageName = this.constructor.name;
  }

  async verifySimple() {
    // placeholder
  }

  async verify() {
    // placeholder
  }
}

module.exports = { CommonItemApiModel };

/*  Uber Solution
    
    Model:    https://bitbucket.org/crate_web_development/uber/src/master/Common.Model/Item/Item.cs
    
*/
