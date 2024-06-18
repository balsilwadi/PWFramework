// const { expect } = require('@playwright/test');
const { ApiModel } = require('./api-model');
const apiEl = require('../page-objects/elements/api-elements');

class PingApiModel extends ApiModel {
  constructor(Ping, action) {
    // expect(Ping, 'should have a Ping').not.toBeNull();
    super(Ping, action);
    this.pageName = this.constructor.name;
  }

  validate(pid) {
    this.pingApiPidPidAttributeValidate(pid);
    this.commonApiActionActionAttributeValidate(apiEl.Action.ping);
  }

  get commonApiAction() {
    return this.model.action ? this.model.action : null;
  }

  commonApiActionVerify() {
    // expect(this.model.action, 'should have an action').not.toBeNull();
  }

  commonApiActionActionAttributeVerify() {
    this.commonApiActionVerify();
    // expect(this.model.action.action, 'should have an action attribute').not.toBeNull();
  }

  commonApiActionActionAttributeValidate(action) {
    this.commonApiActionActionAttributeVerify();
    // temp code for linting
    this.action = action;
    // expect(this.model.action.action, `should have an action attribute: ${action}`).toBe(action);
  }

  get commonApiPid() {
    return this.model.pid ? this.model.pid : null;
  }

  pingApiPidVerify() {
    // expect(this.model.pid, 'should have an pid').toContainText();
  }

  pingApiPidPidAttributeVerify() {
    this.pingApiPidVerify();
    // expect(this.model.pid.pid, 'should have an pid attribute').not.toBeNull();
  }

  pingApiPidPidAttributeValidate(pid) {
    this.pingApiPidPidAttributeVerify();
    // temp code for linting
    this.pid = pid;
    // expect(this.model.pid.pid, `should have a PID: ${pid}`).toBe(pid);
  }
}

module.exports = { PingApiModel };

/*  Uber Solution

    Model:      https://bitbucket.org/crate_web_development/uber/src/master/Crate.Application.Api/DataTransfer/PingModel.cs 
    
*/
