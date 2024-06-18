const apiEl = require('../page-objects/elements/api-elements');

class ApiModel {
  action = '';

  model;

  constructor(model, action) {
    this.model = model;
    this.actionCommand = action;
    this.pageName = this.constructor.name;
  }

  get isJson() {
    return this.action.includes(apiEl.Parameter.toJson);
  }

  get isSimple() {
    return this.action.includes(apiEl.Parameter.toSimple);
  }
}

module.exports = { ApiModel };
