const { expect } = require('@playwright/test');
// const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const testReport = new ReportUtils();

class SeoKidsPages {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : verifyPageTitle
   * @Description : This method is used to verify the SEO title of the page contains Crate & Kids value
   * @params : None
   * @returns : None
   * */
  async verifyPageTitle() {
    testReport.log(this.pageName, 'Verify the SEO page title');
    const actualPageTitle = await page.title();
    expect(actualPageTitle).toContain('Crate & Kids');
    testReport.log(this.pageName, `Verified the page title and the title is : ${actualPageTitle}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToKidsSupercategoryPage
   * @Description : This method is used to navigate to Kids Supercategory page
   * @params : None
   * @returns : None
   * */
  async navigateToKidsSupercategoryPage(supercategory) {
    testReport.log(this.pageName, 'Navigate to Kids Supercategory page');
    await page.goto(`${env.BASE_URL}/kids/${supercategory}`, { timeout: 60000 });
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Successfully navigated to Kids Supercategory page');
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToKidsSpategoryPage
   * @Description : This method is used to navigate to Kids Spategory page
   * @params : None
   * @returns : None
   * */
  async navigateToKidsSpategoryPage(spategory) {
    testReport.log(this.pageName, 'Navigate to Kids Spategory page');
    await page.goto(`${env.BASE_URL}/kids/${spategory}`, { timeout: 60000 });
    expect(await page.locator('h1').textContent()).not.toBeNull();
    testReport.log(this.pageName, 'Successfully navigated to Kids Spategory page');
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToKidsPLPPage
   * @Description : This method is used to navigate to Kids PLP page
   * @params : None
   * @returns : None
   * */
  async navigateToKidsPLPPage(plp) {
    testReport.log(this.pageName, 'Navigate to Kids PLP');
    await page.goto(`${env.BASE_URL}/kids/${plp}`, { timeout: 60000 });
    expect(await page.locator('h1').textContent()).not.toBeNull();
    testReport.log(this.pageName, 'Successfully navigated to Kids PLP page');
  }
}
module.exports = { SeoKidsPages };
