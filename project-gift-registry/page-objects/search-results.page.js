const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../support/utils/common-utils');
const { appendQueryStrings } = require('../../helpers/url');
const PageObject = require('../../project-shared/page-objects/pages/page-object');
const { ReportUtils } = require('../../support/utils/report-utils');
const logger = require('../../setup/logger');

const common = new CommonUtils();
const reporter = new ReportUtils();

class SearchResultsPage extends PageObject {
  constructor() {
    super();
    this.pageH1 = 'Find a Registry Search Results';
    this.intRegistriesCount = 0;
    this.arrBeforeSort = [];
    this.arrAfterSort = [];
    this.strName = '';
    // Locators:
    this.cboSortBy = "//select[@id='SortBy']";
    this.availableRegistries = "//section[@class = 'registries']/div[@data-testid ='registry-list-item-container']";
    this.strRegistryName = "//div[@class = 'registry-name']/h2";
    this.strRegistryDate = "//div[@class = 'registry-date']/span[@class = 'event-info']";
  }

  async goto(firstName, lastName) {
    const url = '/gift-registry/guest/find-registry';
    const urlWithQueryString = appendQueryStrings(url, [
      ['Firstname', firstName],
      ['Lastname', lastName]
    ]);

    await page.goto(urlWithQueryString);
  }

  async sortBy(sortValue) {
    switch (sortValue) {
      case 'Registrant Name':
        await page.customSelectByIndex(this.cboSortBy, 1, 'Sort By Value');
        break;
      case 'Co Registrant Name':
        await page.customSelectByIndex(this.cboSortBy, 2, 'Sort By Value');
        break;
      case 'Event Type':
        await page.customSelectByIndex(this.cboSortBy, 3, 'Sort By Value');
        break;
      case 'State':
        await page.customSelectByIndex(this.cboSortBy, 4, 'Sort By Value');
        break;
      case 'Event Date':
        await page.customSelectByIndex(this.cboSortBy, 5, 'Sort By Value');
        break;
      default:
        reporter.log('Recheck the Sort value');
    }
  }

  async verifyRegistrantNameSorted() {
    this.intRegistriesCount = await page.locator(this.availableRegistries).count();
    logger.info(`Total registries count is ${this.intRegistriesCount}`);
    for (let i = 1; i <= this.intRegistriesCount; i++) {
      /* eslint-disable no-await-in-loop */
      this.strName = await page.locator(`(${this.strRegistryName})[${i}]`).innerText().valueOf();
      [this.strName] = this.strName.split(' ');
      this.arrBeforeSort.push(this.strName);
    }
    logger.info(`Print array before sort: ${this.arrBeforeSort}`);
    this.arrAfterSort = this.arrBeforeSort.slice();
    this.arrAfterSort.sort();
    logger.info(`Print array after sort:${this.arrAfterSort}`);
    expect(this.arrBeforeSort).toStrictEqual(this.arrAfterSort);
  }

  async verifyCoRegistrantNameSorted() {
    this.intRegistriesCount = await page.locator(this.availableRegistries).count();
    logger.info(`Total registries count is ${this.intRegistriesCount}`);
    for (let i = 1; i <= this.intRegistriesCount; i++) {
      /* eslint-disable no-await-in-loop */
      this.strName = await page.locator(`(${this.strRegistryName})[${i}]`).innerText().valueOf();
      [, , , this.strName] = this.strName.split(' ');
      this.arrBeforeSort.push(this.strName);
    }
    logger.info(`Print array before sort: ${this.arrBeforeSort}`);
    this.arrAfterSort = this.arrBeforeSort.slice();
    this.arrAfterSort.sort();
    logger.info(`Print array after sort:${this.arrAfterSort}`);
    expect(this.arrBeforeSort).toStrictEqual(this.arrAfterSort);
  }

  async verifyEventTypeSorted() {
    this.intRegistriesCount = await page.locator(this.availableRegistries).count();
    logger.info(`Total registries count is ${this.intRegistriesCount}`);
    for (let i = 1; i <= this.intRegistriesCount; i++) {
      /* eslint-disable no-await-in-loop */
      this.strName = await page.locator(`(${this.strRegistryDate})[${i}]`).innerText().valueOf();
      [, this.strName] = this.strName.split('\n');
      [this.strName] = this.strName.split(' ');
      logger.info(`split text 2nd ${this.strName}`);
      this.arrBeforeSort.push(this.strName);
    }
    logger.info(`Print array before sort: ${this.arrBeforeSort}`);
    this.arrAfterSort = this.arrBeforeSort.slice();
    this.arrAfterSort.sort();
    logger.info(`Print array after sort:${this.arrAfterSort}`);
    expect(this.arrBeforeSort).toStrictEqual(this.arrAfterSort);
  }

  async verifyStateSorted() {
    this.intRegistriesCount = await page.locator(this.availableRegistries).count();
    logger.info(`Total registries count is ${this.intRegistriesCount}`);
    for (let i = 1; i <= this.intRegistriesCount; i++) {
      /* eslint-disable no-await-in-loop */
      this.strName = await page.locator(`(${this.strRegistryDate})[${i}]`).innerText().valueOf();
      [this.strName] = this.strName.split('\n');
      [, this.strName] = this.strName.split(' ');
      logger.info(`split text 2nd ${this.strName}`);
      this.arrBeforeSort.push(this.strName);
    }
    logger.info(`Print array before sort: ${this.arrBeforeSort}`);
    this.arrAfterSort = this.arrBeforeSort.slice();
    this.arrAfterSort.sort();
    logger.info(`Print array after sort:${this.arrAfterSort}`);
    expect(this.arrBeforeSort).toStrictEqual(this.arrAfterSort);
  }

  async verifyEventDateSorted() {
    this.intRegistriesCount = await page.locator(this.availableRegistries).count();
    logger.info(`Total registries count is ${this.intRegistriesCount}`);
    for (let i = 1; i <= this.intRegistriesCount; i++) {
      /* eslint-disable no-await-in-loop */
      this.strName = await page.locator(`(${this.strRegistryDate})[${i}]`).innerText().valueOf();
      [, this.strName] = this.strName.split('\n');
      [, this.strName] = this.strName.split('on ');
      this.arrBeforeSort.push(this.strName);
    }
    logger.info(`Print array before sort: ${this.arrBeforeSort}`);
    this.arrAfterSort = this.arrBeforeSort.slice();
    await common.sortDates(this.arrAfterSort);
    logger.info(`Print array after sort:${this.arrAfterSort}`);
    expect(this.arrBeforeSort).toStrictEqual(this.arrAfterSort);
  }

  verify = async () => {
    const locator = page.getByRole('heading', { name: this.pageH1 });
    await expect(locator).toBeVisible();
  };

  verifyResultsCount = async (count) => {
    const locator = page.getByTestId('registries-list-container-container');
    await expect(locator).toContainText(`returned ${count} results`);
  };

  verifySomeResultsCount = async () => {
    const locator = page.getByTestId('registries-list-registries');
    await expect(locator).not.toBeEmpty();
  };

  verifySearchResultDetails = async () => {
    const container = page.getByTestId('registry-list-item-container').first(); // usual anti pattern, we only care about validating data in any row

    // photo
    await expect(container.locator('#registrantPhotoImg')).toBeVisible();

    // name(s)
    await expect(container.getByRole('heading', { level: 2 })).toBeVisible();

    // date
    // registryType
    // state
    await expect(container.locator('.event-info')).toBeVisible();

    // link
    await expect(container.locator('.jsRegistry')).toBeVisible();
  };
}

module.exports = new SearchResultsPage();
