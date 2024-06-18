const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const { CommonUtils } = require('../../../support/utils/common-utils');
const { ReportUtils } = require('../../../support/utils/report-utils');
const env = require('../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoSupercategoryPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : verifyCanonicalUrl
   * @Description : This method is used to verify the SEO Canonical Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyCanonicalUrl(superCategoryUrl) {
    testReport.log(this.pageName, 'Verify the Canonical url of the page');
    const actualCanonicalUrl = await page.locator(el.seoMetaTags.seoCanonicalLink).getAttribute('href');
    expect(actualCanonicalUrl).toContain(env.SEO_CANONICAL_OG_URL + superCategoryUrl);
    testReport.log(this.pageName, `Canonical Url matched!! and the Canonical Url is : ${actualCanonicalUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyOgUrl
   * @Description : This method is used to verify the open graph Url of the page
   * @params : None
   * @returns : None
   * */
  async verifyOgUrl(superCategoryUrl) {
    testReport.log(this.pageName, 'Verify Open graph Url of the page');
    const actualOgUrl = await page.locator(el.seoMetaTags.seoOgUrl).getAttribute('content');
    expect(actualOgUrl).toContain(env.SEO_CANONICAL_OG_URL + superCategoryUrl);
    testReport.log(this.pageName, `Og URl matched!! and the Og Url is : ${actualOgUrl}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySeoHeader1Tag
   * @Description : This method is used to verify the Seo Header1 tag in the page
   * @params : None
   * @returns : None
   * */
  async verifySeoHeader1Tag() {
    testReport.log(this.pageName, 'Verify Header 1 tag is displayed in the page');
    let actualHeader1Tag;
    if (common.verifyIsMobile()) {
      actualHeader1Tag = await page.locator(el.seoSupercategoryPage.seoHeader1TagMobile).textContent();
    } else {
      actualHeader1Tag = await page.locator(el.seoSupercategoryPage.seoHeader1Tag).textContent();
    }
    expect(actualHeader1Tag).not.toBeNull();
    testReport.log(this.pageName, `Header 1 tag is not empty!! And the Header 1 tag value is : ${actualHeader1Tag}`);
  }

  async verifyRelatedCategories() {
    testReport.log(this.pageName, 'Verify Related Categories dsiplayed in the page');
    const pageHeader = (await page.locator(el.SITECOMMON.lblH1).textContent()).trim();
    const relatedCategoriesHeader = await page.locator(el.seoSupercategoryPage.lblRelatedCategoriesHeader).textContent();
    expect(relatedCategoriesHeader.toLowerCase()).toEqual(`Categories Related to ${pageHeader}`.toLowerCase());
    const relatedCatCount = await page.locator(el.seoSupercategoryPage.lnkRelatedCategories).count();
    expect(relatedCatCount).toBeGreaterThan(0);
    testReport.log(this.pageName, 'Related Categories is displayed in the page');
  }

  async verifyPDPRelatedCategories() {
    testReport.log(this.pageName, 'Verify Related Categories dsiplayed in the page');
    const relatedCategoriesHeader = page.locator(el.seoSupercategoryPage.lblRelatedCategoriesHeader);
    await expect(relatedCategoriesHeader).toHaveText(`Related Categories`);
    const relatedCatCount = await page.locator(el.seoSupercategoryPage.lnkRelatedCategories).count();
    expect(relatedCatCount).toBeGreaterThan(0);
    testReport.log(this.pageName, 'Related Categories is displayed in the page');
  }

  async verifyPLPRelatedCategories() {
    testReport.log(this.pageName, 'Verify Related Categories dsiplayed in the page');
    const relatedCategoriesHeader = await page.locator(el.seoSupercategoryPage.lblRelatedCategoriesHeader).textContent();
    const pageHeader = await page.locator(el.SITECOMMON.lblH1).textContent();
    expect(relatedCategoriesHeader.toLowerCase()).toEqual(`categories related to ${pageHeader.toLowerCase()}`);
    const relatedCatCount = await page.locator(el.seoSupercategoryPage.lnkRelatedCategories).count();
    expect(relatedCatCount).toBeGreaterThan(0);
    testReport.log(this.pageName, 'Related Categories is displayed in the page');
  }

  async clickOnRelatedCategories() {
    testReport.log(this.pageName, 'Click on Related Categories and verify');
    const previousPageUrl = page.url();
    await page.locator('.related-button > a').nth(0).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Clicked on first Related category');
    await page.goto(previousPageUrl, { timeout: 50000 });
    await page.waitForLoadState('load');
  }

  async verifySeoCopy() {
    testReport.log(this.pageName, 'Verify SEO copy is displayed in the page');
    if (env.EXEC_SITE.includes('crate')) {
      await expect(page.locator(el.seoSupercategoryPage.lblSeoCopyCrate)).toBeVisible();
    } else {
      await expect(page.locator(el.seoSupercategoryPage.lblSeoCopyCB2)).toBeVisible();
    }
    testReport.log(this.pageName, 'SEO copy is displayed in the page');
  }
}

module.exports = { SeoSupercategoryPage };
