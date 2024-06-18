// const { expect } = require('@playwright/test');
// const elements = require('../../elements/elements');
// const pdpTestData = require('../../datafiles/testdata');
// const { CommonUtils } = require('../../../../support/utils/common-utils');

// const common = new CommonUtils();
// const { ReportUtils } = require('../../../../support/utils/report-utils');
// const globalData = require('../../../../support/global-data-object/global-data-object');

// const testReport = new ReportUtils();
// let skuPrice;
// let skuRegPrice;
// const itemInfo = {};
// let strPdpSummary;
// let strMtoMessage;

class FamilyPage {
  pageName = this.constructor.name;

  async navigateToFamilyPage(sku) {
    const familyUrl = `${global.baseURL}/f/f${sku}`;
    // console.log(familyUrl);
    // console.log(globalData);
    await page.goto(familyUrl);
  }
}
module.exports = { FamilyPage };
