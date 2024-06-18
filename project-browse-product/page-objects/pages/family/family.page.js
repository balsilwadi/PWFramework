const { promisify } = require('util');
const { expect } = require('@playwright/test');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');
const { ReportUtils } = require('../../../../support/utils/report-utils');

const testReport = new ReportUtils();
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();

const sleep = promisify(setTimeout);
class FamilyPage extends PageObject {
  constructor() {
    super();
    this.btnAddToRegistry = '(//button[@value="addToRegistry"])[X]';
    this.skuValue = '(//*[@class="right-col"]//*[@class="sku-number"])[X]';
    this.addAllToCart = '(//div[@class="add-to-cart-below-button-container"]/button)';
    this.lineItemContainer = '(//div[@class="line-products-items-container"])';
    this.lineItemsList = '(//div[@data-id="line-items-section"]/ul)';
    this.firstLineItem =
      '(//div[@data-id="line-items-section"]/ul/li[1]/div/div[@class="right-inner-sec"]/div/div/div[@class="product-price-info"]/p/span/span)';
    this.colorButton = '(//div[@aria-label="Color"]/fieldset/div/div/div/div/span/button[@aria-checked="false"])';
    this.firstLineItemTitle = '(//h2[@class="line-product-name text-lg-bold"])';
    this.firstLineItemGroupername = '(//span[@class="grouper-selected-name"])';
  }

  pageName = this.constructor.name;

  async navigateToFamilyPage(sku) {
    const familyUrl = `${global.baseURL}/f/f${sku}`;
    await page.goto(familyUrl);
  }

  async addProductToRegistry(productIndex = 1) {
    await page.waitForLoadState();
    await page.locator(this.btnAddToRegistry.replace('X', productIndex)).waitFor({ timeout: 10000 });

    const scroll = page.locator(this.btnAddToRegistry.replace('X', productIndex));
    await scroll.scrollIntoViewIfNeeded();
    await page.locator(this.btnAddToRegistry.replace('X', productIndex)).click();
    testReport.log(this.pageName, 'Clicked ADD TO REGISTRY button');
    const sku = await page.locator(this.skuValue.replace('X', productIndex)).innerText();
    return sku;
  }

  async validateAddAlltoCartPresent() {
    if (!common.verifyIsMobile()) {
      await page.locator(this.addAllToCart).click();
      page.locator(this.lineItemContainer);
      testReport.log(this.pageName, 'Clicked Add All to Cart button');
    }
  }

  async validateLineItemTitles() {
    const myList = page.locator(this.lineItemsList); // Replace 'myList' with the actual ID of your <ul>
    const listItems = await myList.locator('li').all();
    const firstTitleElement = listItems[0].locator('div > div > div > h2');
    const firstTitleText = await firstTitleElement.textContent();
    for (let i = 1; i < listItems.length; i++) {
      const currentItem = listItems[i];
      const titleElement = currentItem.locator('div > div > div > h2');
      const currentTitleText = titleElement.textContent();
      expect(firstTitleText).not.toEqual(currentTitleText);
      testReport.log(this.pageName, `first item title -> ${firstTitleText} current item title -> ${currentTitleText}`);
    }
  }

  async validatePriceLineItem() {
    const firstItem = page.locator(this.firstLineItem);
    const firstItemPrice = await firstItem.textContent();
    const itemTexts = await page.evaluateHandle(() => {
      const items = Array.from(document.querySelectorAll('.product-price-info p span span'));
      return items.map((title) => title.textContent);
    });

    for (let i = 1; i < itemTexts.length; i++) {
      const currentPrice = itemTexts[i];
      expect(firstItemPrice).not.toEqual(currentPrice);
      testReport.log(this.pageName, `first item price -> ${firstItemPrice} current item price -> ${currentPrice}`);
    }
  }

  async validateSku() {
    const skuList = page.locator(this.lineItemsList); // Replace 'myList' with the actual ID of your <ul>
    const skuListItems = await skuList.locator('li').all();
    const firstSkuElement = skuListItems[0].locator('div > div > div > div > div .sku-number');
    const firstSkuTitleText = await firstSkuElement.textContent();
    for (let i = 1; i < skuListItems.length; i++) {
      const currentItem = skuListItems[i];
      const skuElement = currentItem.locator('div > div > div > div > div .sku-number');
      const currentSkuText = skuElement.textContent();
      expect(firstSkuTitleText).not.toEqual(currentSkuText);
      testReport.log(this.pageName, `first item title -> ${firstSkuTitleText} current item title -> ${currentSkuText}`);
    }
  }

  async validateGroupers() {
    const buttons = page.locator(this.colorButton);
    const unSelectedButton = buttons.filter((button) => button.getAttribute('aria-checked') === 'false').first();
    await unSelectedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await sleep(30000);
    const titleVerify = await page.locator(this.firstLineItemTitle).first().textContent();
    const buttonVerify = await page.locator(this.firstLineItemGroupername).first().textContent();
    expect(titleVerify).toContain(buttonVerify);
    testReport.log(this.pageName, `first item grouper -> ${titleVerify} grouper name -> ${buttonVerify}`);
  }
}
module.exports = new FamilyPage();
