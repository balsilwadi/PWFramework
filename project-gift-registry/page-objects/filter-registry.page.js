const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const PageObject = require('../../project-shared/page-objects/pages/page-object');
const logger = require('../../setup/logger');

const reporter = new ReportUtils();
const common = new CommonUtils();

class FilterRegistryPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Filter Registry Page';

    // Locators:
    this.chkFilterCategories = "//div[@id='filter-categories']//div[@class='checkbox-wrap ']";
    this.chkRandomFilterCategory = "(//div[@id='filter-categories']//label)[xyz]";
    this.accFilterCategories = "//section[@id='registrant-items']/div[@data-testid='accordion']";
    this.btnFilter = "//button[normalize-space()='Filter']";
    this.btnCategories = "//button[normalize-space()='Categories']";
    this.btnPrice = "//button[normalize-space()='Price']";
    this.intCategories = 0;
    this.intItems = 0;
    this.intPrices = 9;
    this.minPrice = 0;
    this.maxPrice = 999999;
    this.intFilteredArray = 0;
    this.chkRandomFilterPrice = "(//div[@id='filter-price']//label)[xyz]";
    this.strPrices = "//div[@class='current-price ']";
    this.strPriceRead = '';
    this.strTrimmedPriceRead = '';
    this.arrPrices = [];
    this.intRandomPrice = [];
    this.productSku = '//*[@class="list-card-sku"]/span[text()[contains(.,"X")]]';
    this.txtMyRegistry = '//*[@class="gr-header-reg-info-possessive"]';
    this.txtRegistryId = '//*[@class="gr-header-reg-info-desktop-id"]';
    this.txtWantHasCountForSku = '//div[*[@class="list-card-sku"]/span[text()[contains(.,"X")]]]/div[@class="list-card-wants-has "]';
    this.btnMaybelaterInterruptor = '//*[@id="email-sms-maybe-later-button"]';
    this.btnShortInterruptor = '//*[@id="email-signup-banner-close"]';
    this.txtProductContainer = '//*[@data-testid="registry-card-item-container"]';
    this.txtProduct = '(//*[@data-testid="registry-card-item-container"])[X]';
    this.txtManageItem = '//*[@id="popup-sticky-close"]';
    this.lnkRemoveItemRegistry = '//*[@data-testid="save-edit-remove-from-registry"]';
    this.lnkNavigationContainer = '//*[@data-testid="navigation-container"] | //*[@data-testid="navigation-cb2-container"]';
    this.txtRedistryStatContainer = '//*[@data-testid="registry-statistics-container"]';
  }

  goto = async (registryId) => {
    await page.goto(`/gift-registry/a/${registryId}`);
  };

  async selectRandomCategory(number) {
    await page.locator(this.btnFilter).click();
    await page.locator(this.btnCategories).click();
    this.intCategories = await page.locator(this.chkFilterCategories).count();
    logger.info(`The total number of checkboxes for categorries found are ${this.intCategories}`);
    if (number > this.intCategories) {
      reporter.log(`${number} checkboxes doesnt exist to be clickable`);
    } else {
      const intRandomCategory = await common.getArrayOfRandomInt(number, this.intCategories);
      for (let i = 0; i < intRandomCategory.length; i++) {
        logger.info(`The random checkbox selected is ${intRandomCategory[i]}`);
        page.locator(this.chkRandomFilterCategory.replace('xyz', intRandomCategory[i])).click();
      }
    }
  }

  async validateSelectedCategory(number) {
    if (number > this.intCategories) {
      reporter.log(`${number} checkboxes doesnt exist to be clickable`);
    } else {
      const intAccCategories = await page.locator(this.accFilterCategories).count();
      logger.info(`The total number of accordions after filtered are ${intAccCategories}`);
      expect(intAccCategories.toString()).toBe(number.toString());
    }
  }

  async selectRandomPrice(number) {
    await page.locator(this.btnFilter).click();
    await page.locator(this.btnPrice).click();
    this.intRandomPrice = await common.getArrayOfRandomInt(number, this.intPrices);
    this.intItems = await page.locator(this.strPrices).count();
    logger.info(`total items on page is ${this.intItems}`);
    for (let i = 1; i <= this.intItems; i++) {
      /* eslint-disable no-await-in-loop */
      this.strPriceRead = await page.locator(`(${this.strPrices})[${i}]`).innerText().valueOf();
      this.strTrimmedPriceRead = this.strPriceRead.replace('$', '');
      this.strTrimmedPriceRead = this.strTrimmedPriceRead.replace(',', '');
      this.arrPrices.push(this.strTrimmedPriceRead);
    }
    for (let i = 0; i < this.intRandomPrice.length; i++) {
      logger.info(`The random checkbox selected is ${this.intRandomPrice[i]}`);
      await page.locator(this.chkRandomFilterPrice.replace('xyz', this.intRandomPrice[i])).click();
    }
  }

  async validateSelectedPrices() {
    for (let i = 0; i < this.intRandomPrice.length; i++) {
      this.minMaxPrices(this.intRandomPrice[i]);
      this.findCountInFilteredArray();
    }
    logger.info(`Total items in the price range is ${this.intFilteredArray}`);
    this.intItems = await page.locator(this.strPrices).count();
    logger.info(`Total filtered items on the page is ${this.intItems}`);
    expect(this.intItems).toBe(this.intFilteredArray);
  }

  findCountInFilteredArray() {
    for (let i = 0; i < this.arrPrices.length; i++) {
      if (this.arrPrices[i] > this.minPrice && this.arrPrices[i] < this.maxPrice) {
        this.intFilteredArray += 1;
      }
    }
  }

  minMaxPrices(intRandomPrice) {
    switch (intRandomPrice) {
      case 1:
        this.maxPrice = 20;
        break;
      case 2:
        this.minPrice = 20;
        this.maxPrice = 50;
        break;
      case 3:
        this.minPrice = 50;
        this.maxPrice = 100;
        break;
      case 4:
        this.minPrice = 100;
        this.maxPrice = 250;
        break;
      case 5:
        this.minPrice = 250;
        this.maxPrice = 500;
        break;
      case 6:
        this.minPrice = 500;
        this.maxPrice = 1000;
        break;
      case 7:
        this.minPrice = 1000;
        this.maxPrice = 1500;
        break;
      case 8:
        this.minPrice = 1500;
        this.maxPrice = 2000;
        break;
      case 9:
        this.minPrice = 2000;
        break;
      default:
        reporter.log('Recheck the value of this.intPrices');
    }
  }
}
module.exports = new FilterRegistryPage();
