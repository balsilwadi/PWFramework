const { expect } = require('@playwright/test');

const { EnvironmentUtils } = require('../../support/utils/env-utils');
const { NavigationHelperUtils } = require('../../support/utils/navigation-helper-utils');
const { ReportUtils } = require('../../support/utils/report-utils');

const envUtils = new EnvironmentUtils();
const navHelper = new NavigationHelperUtils();
const testReport = new ReportUtils();

const pageElements = require('./page-elements');

class Page {
  pageName = this.constructor.name;

  async navigateToUrl(url) {
    // This is test code and should be updated
    await navHelper.goTo(url);
  }

  async navigateToRelativeUrl(relativeUrl) {
    const url = global.baseURL + relativeUrl;
    await this.navigateToUrl(url);
  }

  async navigateToSite() {
    const url = global.baseURL;
    await this.navigateToUrl(url);
  }

  async verifyPage() {
    await page.waitForLoadState();
    // This is a test element, should be replaced
    await expect(page.locator(pageElements.Body)).toBeVisible();
    this.verifyPageGroup(); // SKIP THIS
    this.verifyPageTemplate(); // // SKIP THIS
    testReport.log(this.pageName, 'Verified page loaded');
  }

  // you can skip everything below

  async validatePage(pageGroup, pageTemplate) {
    await page.waitForLoadState();
    // This is a test element, should be replaced
    await expect(page.locator(pageElements.Body)).toBeVisible();
    this.validatePageGroup(pageGroup);
    this.validatePageTemplate(pageTemplate);
    testReport.log(this.pageName, 'Validated page loaded');
  }

  async pageGroup() {
    return page.evaluate(() => window.digitalData.page.category.pageType);
  }

  async verifyPageGroup() {
    const value = await this.pageGroup();
    expect(value).not.toEqual('');
  }

  async validatePageGroup(pageGroup) {
    const value = await this.pageGroup();
    expect(value).toEqual(pageGroup);
  }

  async pageTemplate() {
    return page.evaluate(() => window.digitalData.page.pageInfo.pageTemplateName);
  }

  async verifyPageTemplate() {
    const value = this.pageTemplate;
    expect(value).not.toEqual('');
  }

  async validatePageTemplate(pageTemplate) {
    const value = this.pageTemplate;
    expect(value).toEqual(pageTemplate);
  }

  // #region Environment Utility Values

  brand() {
    return envUtils.brand();
  }

  country() {
    return envUtils.country();
  }

  environment() {
    return envUtils.environment();
  }

  site() {
    return envUtils.site();
  }

  language() {
    return envUtils.language();
  }

  baseURL() {
    return envUtils.baseURL();
  }

  isCrate() {
    return envUtils.isCrate();
  }

  isCb2() {
    return envUtils.isCb2();
  }

  isUs() {
    return envUtils.isUs();
  }

  isCa() {
    return envUtils.isCa();
  }

  isDev() {
    return envUtils.isDev();
  }

  isQa() {
    return envUtils.isQa();
  }

  isProd() {
    return envUtils.isProd();
  }

  // #endregion
}

module.exports = { Page };
