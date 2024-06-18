const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

const releaseUrl = '/release.txt';

class ReleasePage {
  pageName = this.constructor.name;

  async navigateToReleasePage(baseUrl) {
    const url = baseUrl + releaseUrl;
    testReport.log(this.pageName, `Loading: ${url}`);
    await page.goto(url);
    const content = await page.content();
    testReport.log(this.pageName, `Release: ${content}`);
  }
}

module.exports = { ReleasePage };
