const { expect } = require('@playwright/test');
// const el = require('../elements/elements');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');
const siteMap = require('../data-files/seo-sitemap.json');

// const { CommonUtils } = require('../../../support/utils/common-utils');
// const common = new CommonUtils();

const testReport = new ReportUtils();

class SeoSitemapPage {
  pageName = this.constructor.name;

  /**
   * @author: balsilwadi
   * @function_Name : navigateToSitemapXml
   * @Description : This method is used to navigate to sitemap XML page
   * @params : None
   * @returns : None
   * */
  async navigateToSitemapXml() {
    testReport.log(this.pageName, 'Navigate to sitemap-index.xml page');
    await page.goto(`${env.BASE_URL}/assets/sitemap-index.xml`, { timeout: 60000 });
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifySitemapXML
   * @Description : This method is used to verify the content in the XML page is displayed
   * @params : None
   * @returns : None
   * */
  async verifySitemapXML() {
    testReport.log(this.pageName, 'Verify the Sitemap');

    // storing all displayed sitemap URLs in an array
    let arrURL = [];
    const countOfSitemap = await page.locator('span').count();
    const textContentPromises = Array.from({ length: countOfSitemap }, (_, i) => page.locator('span').nth(i).textContent());
    arrURL.push(...(await Promise.all(textContentPromises)));
    arrURL = arrURL.filter((x) => x.includes('https'));

    // validating the displayed sitemap urls

    const urls = siteMap[env.EXEC_SITE];
    if (urls) {
      urls.forEach((url) => {
        expect(arrURL).toContain(url);
      });
    }

    // validating all specific sitemaps
    const validationPromises = urls.map((url) => this.validateSpecificSitemap(url));
    await Promise.all(validationPromises);

    testReport.log(this.pageName, `All Sitemap content is displayed`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateSpecificSitemap
   * @Description : This method is used to Validate each sitemap has URLs
   * @params : url
   * @returns : None
   * */
  async validateSpecificSitemap(url) {
    testReport.log(this.pageName, `Verify the Sitemap, ${url}, is displayed and has content`);

    const expectedUrls = {
      crateus: 'www.crateandbarrel.com',
      cratecan: 'www.crateandbarrel.ca',
      cb2us: 'www.cb2.com',
      cb2can: 'www.cb2.ca'
    };
    const expectedUrl = expectedUrls[env.EXEC_SITE];

    try {
      const newPage = await global.context.newPage();
      await newPage.goto(url);

      const urlCount = await newPage.locator(`//*[contains(text(),"${expectedUrl}")]`).count();
      expect(urlCount).toBeGreaterThan(0);

      await newPage.close();
      testReport.log(this.pageName, `Sitemap content is displayed for URL: ${url}`);
    } catch (error) {
      testReport.log(this.pageName, `An error occurred while validating sitemap ${url}: ${error}`);
      throw error; // Rethrow the error if you want to propagate it further
    }
  }
}

module.exports = { SeoSitemapPage };
