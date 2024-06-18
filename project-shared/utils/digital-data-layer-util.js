const { expect } = require('@playwright/test');

class DigitalDataLayerUtil {
  pageName = this.constructor.name;

  async getPageGroup() {
    return page.evaluate(() => window.digitalData.page.category.pageType);
  }

  async verifyPageGroup() {
    const value = this.getPageGroup;
    expect(value).not.toEqual('');
  }

  async getPageTemplate() {
    return page.evaluate(() => window.digitalData.page.pageInfo.pageTemplateName);
  }

  async verifyPageTemplate() {
    const value = this.getPageTemplate;
    expect(value).not.toEqual('');
  }
}

module.exports = { DigitalDataLayerUtil };
