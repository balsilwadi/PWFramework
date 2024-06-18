const apiEl = require('../../../page-objects/elements/api-elements');
const { ApiAction } = require('../../../page-objects/pages/api-action');

class BrowseApiAction extends ApiAction {
  constructor() {
    super();
    this.pageName = this.constructor.name;
  }

  toFirstGroupParam(firstSubgroup) {
    return firstSubgroup.includes('1') ? apiEl.Parameter.firstGroupParam : '';
  }

  toItemGroupParam(itemGroup) {
    return itemGroup.includes('1') ? apiEl.Parameter.itemGroupParam : '';
  }

  toShowSkusParam() {
    // showSkus.includes('1') ? apiEl.Parameter.showSkusParam : '';
  }
}

module.exports = { BrowseApiAction };
