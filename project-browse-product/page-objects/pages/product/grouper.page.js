const { expect } = require('@playwright/test');
const elements = require('../../elements/elements');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');
const { ReportUtils } = require('../../../../support/utils/report-utils');

const testReport = new ReportUtils();

class GrouperPage extends PageObject {
  constructor() {
    super();
    this.grouperAttribute = '//div[@data-testid="toolbar"]';
    this.grouperType = '//span[contains(text(), "Type")]';
    this.grouperQuantity = '//span[contains(text(), "Quantity")]';
    this.grouperField = '//div[@data-testid="toolbar"]';
    this.grouperColor = '//span[contains(text(), "Color")]';
    this.grouperSize = '//span[contains(text(), "Size")]';
  }

  // pageName = this.constructor.name;

  /**
   * @author: ddhanasekaran
   * @function_Name : verifyGroupers
   * @Description : To validate the Grouper in rugs
   * @params : None
   * @returns : None
   * */

  async verifyGroupersPage() {
    const groupers = await page.locator(this.grouperAttribute).all();
    const grouperCount = groupers.length;
    testReport.log(`grouper count is${grouperCount}`);
    const element = await page.locator('.toolbar-container.grouper-toolbar').all();
    const attributes = element.length;
    expect(grouperCount).toEqual(attributes);
  }

  /**
   * @author: ddhanasekaran
   * @function_Name : verifySizeGrouper, verifyColorGrouper
   * @Description : To validate the Color Grouper in rugs
   * @params : None
   * @returns : None
   * */

  async verifySizeGrouper(size) {
    const skuNumBefore = await page.innerText(elements.productPage.SKU_NUM);
    testReport.log(`sku Number before selecting grouper is${skuNumBefore}`);
    await page.getByRole('radio', { name: size }).click({ delay: 300 });
    await Promise.race([page.waitForEvent('framenavigated')]);
    const skuNumAfter = await page.innerText(elements.productPage.SKU_NUM);
    testReport.log(`sku number after grouper selection is ${skuNumAfter}`);
    await expect(skuNumAfter).not.toEqual(skuNumBefore);
    const currentURL = page.url();
    expect(currentURL.replace(/[^a-z0-9]/g, '')).toContain(size.toLowerCase().replace(/[^a-z0-9]/g, ''), 'the url does not contain specific string');
    testReport.log(this.pageName, `${size} size selected`);
    if (size === "10'x14'" || size === "9'x12'" || size === "8'x10'") {
      await expect(page.locator(elements.productPage.rdPickUpAtStore)).toBeHidden();
      testReport.log(this.pageName, 'Free Crubside Pick option is hidden for larger size rugs');
    }
  }

  async verifyColorGrouper(color) {
    await page.getByRole('radio', { name: color }).click({ delay: 300 });
    await Promise.race([page.waitForEvent('framenavigated')]);
    const currentURL = page.url();
    expect(currentURL.replace(/[^a-z0-9]/g, '')).toContain(color.toLowerCase().replace(/[^a-z0-9]/g, ''), 'the url does not contain specific string');
    testReport.log(this.pageName, `${color} Color selected`);
  }

  async verifyTypeGrouper(type) {
    await page.getByRole('radio', { name: type }).click({ delay: 300 });
    await Promise.race([page.waitForEvent('framenavigated')]);
    const currentURL = page.url();
    expect(currentURL.replace(/[^a-z0-9]/g, '')).toContain(type.toLowerCase().replace(/[^a-z0-9]/g, ''), 'the url does not contain specific string');
    testReport.log(this.pageName, `${type} Type selected`);
  }

  async verifyQtyGrouper(quantity) {
    await page.getByRole('radio', { name: quantity }).click({ delay: 300 });
    await Promise.race([page.waitForEvent('framenavigated')]);
    const currentURL = page.url();
    expect(currentURL.replace(/[^a-z0-9]/g, '')).toContain(quantity.toLowerCase().replace(/[^a-z0-9]/g, ''), 'the url does not contain specific string');
    testReport.log(this.pageName, `${quantity} Quantity selected`);
  }
}

module.exports = new GrouperPage();
