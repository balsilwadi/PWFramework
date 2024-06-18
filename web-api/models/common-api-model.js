// const { expect } = require('@playwright/test');
const { ApiModel } = require('./api-model');

class CommonApiModel extends ApiModel {
  constructor(jsonResponse, actionCommand) {
    super(jsonResponse.CommonAPI, actionCommand);
    // expect(jsonResponse.CommonAPI, 'should have a Common API').not.toBeNull();
    this.model = null;
    this.pageName = 'CommonApiModel';
  }

  get commonApi() {
    return this.model ? this.model : null;
  }

  commonApiVerify() {
    // expect(this.model, 'should have a Common API').not.toBeNull();
  }

  get commonApiError() {
    return this.model.Error ? this.model.Error : null;
  }

  commonApiErrorVerify() {
    // expect(this.model.Error, 'should have an Error').not.toBeNull();
  }

  commonApiErrorDescriptionAttributeVerify() {
    this.commonApiErrorVerify();
    // expect(this.model.Error.description, 'should have an description attribute').not.toBeNull();
  }

  // commonApiErrorDescriptionAttributeValidate(message) {
  //   this.commonApiErrorDescriptionAttributeVerify();
  //   // expect(this.model.Error.description === message, `should have a message: ${message}`).not.toBeNull();
  // }
}

module.exports = { CommonApiModel };

/*  Uber Solution

    Model:    https://bitbucket.org/crate_web_development/uber/src/master/Crate.Application.Api/DataTransfer/PingModel.cs

*/
