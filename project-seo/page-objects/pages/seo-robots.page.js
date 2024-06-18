const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoRobotsPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : navigateToRobotsTxt
   * @Description : This method is used to navigate to robots.txt page
   * @params : None
   * @returns : None
   * */
  async navigateToRobotsTxt() {
    testReport.log(this.pageName, 'Navigate to robots txt page');
    await page.goto(`${env.BASE_URL}/robots.txt`, { timeout: 60000 });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRobotsTxt
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : robotsValue1, robotsValue2
   * @returns : None
   * */
  async verifyRobotsTxt(robotsValue1, robotsValue2) {
    testReport.log(this.pageName, 'Verify the Robots txt of the page');
    const actualRobotsTxt = await page.locator(el.robotsPage.robotsText).textContent();
    expect(actualRobotsTxt).toContain(robotsValue1);
    expect(actualRobotsTxt).toContain(robotsValue2);
    testReport.log(this.pageName, `Robots Txt matched!! and the value is : ${actualRobotsTxt}`);
  }
}

module.exports = { SeoRobotsPage };
