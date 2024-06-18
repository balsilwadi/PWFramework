const { expect } = require('@playwright/test');
const PageObject = require('../../../project-shared/page-objects/pages/page-object');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ApiPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Gift Registry Api page';
  }

  async validateNotFoundResponse(actualResponse, expectedResponse) {
    try {
      testReport.log(this.pageName, `Actual response and Expected response are ${actualResponse} and ${expectedResponse}`);
      expect(actualResponse).toBe(expectedResponse);
      testReport.log(this.pageName, 'Registry is deleted || VERIFIED');
    } catch (error) {
      testReport.log(`Expected Status code : ${expectedResponse}, But Actual status code is ${actualResponse}`);
      throw new Error(`Expected Status code : ${expectedResponse}, But Actual status code is ${actualResponse}`);
    }
  }
}

module.exports = new ApiPage();
