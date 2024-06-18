const { ReportUtils } = require('./report-utils');

const testReport = new ReportUtils();

class NavigationHelperUtils {
  pageName = this.constructor.name;

  async goTo(url) {
    testReport.log(this.pageName, `Loading: ${url}`);
    await page.goto(url, { timeout: 2 * 80000 });
    testReport.log(this.pageName, `Loaded: ${page.url()}`);
    testReport.log(this.pageName, `Page title: ${await page.title()}`);
  }
}

module.exports = { NavigationHelperUtils };
