/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const elements = require('../../elements/elements');
const pdpTestData = require('../../datafiles/testdata');
const { ReportUtils } = require('../../../../support/utils/report-utils');
// eslint-disable-next-line import/no-restricted-paths
const { ProductPage } = require('./product.page');
const { EnvironmentUtils } = require('../../../../support/utils/env-utils');

const envUtils = new EnvironmentUtils();
const testReport = new ReportUtils();
let strPdpSummary;
let threadColor;
let word;
let fontType;
let strNonPersonalizedPrice;

class MonogramPage extends ProductPage {
  constructor() {
    super();
    this.btnAddToRegistry = '//button[@value="addToRegistry"]';
    this.personalizedBtn = '#personalized';
    this.styleGrouper = '.monogramming-container';
    this.nonPersoanlizedBtn = '#non-personalized';
    this.textBtnMonogramming = 'text-element';
    this.fontBtnMonogramming = 'select-custom-button';
    this.threads = 'fieldset#thread-color-legend button';
    this.charLimit = '.character-limit-copy';
    this.fontName = 'span.text-md-reg.selected-font';
    this.threadColorValue = '.mg-color-title .selected-color';
    this.threadBtn = '#thread-color-legend';
    this.pageName = 'MonogramPage';
  }

  async getSummaryText() {
    await page.waitForLoadState();
    await page.waitForSelector(elements.productPage.lblProductSummary);
    strPdpSummary = await page.locator(elements.productPage.lblProductSummary).innerText();
    testReport.log(this.pageName, `The summary text is captured as ${strPdpSummary}`);
    return strPdpSummary;
  }

  async clickMonogramAddToCart() {
    const addToCartBtn = page.getByTestId(elements.productPage.MainBtnAddToCart).first();
    await addToCartBtn.click();
    testReport.log(this.pageName, 'Clicked ADD TO CART button');
  }

  async validateMonogrammingPopup() {
    const strMtoPopupTitle = await page.locator(elements.productPage.lblMtoPopupTitle).innerText();
    const strMtoPopupTerms = await page.locator(elements.productPage.lblMtoTerms).innerText();
    page.locator(elements.productPage.lblMtoPopupTitle);
    expect(strMtoPopupTitle.toLowerCase()).toEqual('confirm your selection'.toLowerCase());
    testReport.log(this.pageName, `Double Dare Popup Title is present as ${strMtoPopupTitle}`);
    await expect(page.locator(elements.productPage.imgMtoProduct)).toBeVisible();
    testReport.log(this.pageName, 'MTO Product Image is Present');
    page.locator(elements.productPage.lblMtoTerms);
    expect(strMtoPopupTerms.trim()).toEqual(pdpTestData.productPageInfo.monogramTerms);
    testReport.log(this.pageName, `Monogram terms and Condition is Present as ${strMtoPopupTerms}`);
    await page.locator(elements.productPage.btnMtoAddToCart).toBeVisible;
    await page.locator(elements.productPage.btnMtoDecline).toBeVisible;
    await page.locator(elements.productPage.btnMtoClose).toBeVisible;
    testReport.log(this.pageName, 'MTO Confirmation Popup Action buttons are present');
    const summary = await page.locator(elements.productPage.lblMtoProductSummary).innerText();
    if (envUtils.isCb2()) {
      const Font = fontType.toUpperCase();
      const Thread = threadColor.toUpperCase();
      const expectedSummary = `PERSONALIZATION  ${word} FONT  ${Font} THREAD COLOR ${Thread}`;
      const isSummaryMatching = this.compareSumamry(summary.trim(), expectedSummary);
      // await expect(strMtoSummary.trim()).toEqual(expectedMtoSummary);
      if (!isSummaryMatching) {
        throw new Error(`Summary does not match. Expected: ${expectedSummary}, Actual: ${summary}`);
      }
      testReport.log(this.pageName, `Double dare pop-up has summary text : ${expectedSummary}`);
    } else {
      const expectedSummary = `Personalization ${word} Font ${fontType} Thread Color ${threadColor}`;
      await expect(summary.trim().toLowerCase()).toContain(`Personalization ${word}`.toLowerCase());
      await expect(summary.trim().toLowerCase()).toContain(`Font ${fontType}`.toLowerCase());
      await expect(summary.trim().toLowerCase()).toContain(`Thread Color ${threadColor}`.toLowerCase());
      testReport.log(this.pageName, `Double dare pop-up has summary text : ${expectedSummary}`);
    }
  }

  async compareSumamry(actualSummary, expectedSummary) {
    const trimActualSummary = actualSummary.replace(/\s+/g, '');
    const trimExpectedSummary = expectedSummary.replace(/\s+/g, '');
    return trimActualSummary.trim() === trimExpectedSummary;
  }

  async mtoDeclineValidation() {
    if (envUtils.isCb2()) {
      await page.locator(elements.productPage.btnMtoCB2Decline).click();
    } else {
      await page.locator(elements.productPage.btnMtoDecline).click();
    }
    testReport.log(this.pageName, 'Double Dare Popup Closed by Clicking Decline button');
    await page.getByTestId(elements.productPage.MainBtnAddToCart).first().click();
    await page.locator(elements.productPage.btnMtoClose).click();
    testReport.log(this.pageName, 'Double Dare Popup Closed by Clicking close button');
  }

  async validateAddtoCartisPresent() {
    const addToCartBtn = page.getByTestId(elements.productPage.MainBtnAddToCart).first();
    await await expect(addToCartBtn).toBeVisible();
    testReport.log(this.pageName, 'Add to Cart button is present');
  }

  async mtoAcceptValidation() {
    await page.locator(elements.productPage.btnMtoAccept).click();
    testReport.log(this.pageName, 'Accept Terms and Add to cart is clicked on Double Dare Popup');
  }

  async getPrice() {
    let priceText;
    // Attempt to get the sale price
    const salePriceElement = page.locator('.header-container .salePrice').first();
    if (await salePriceElement.isVisible()) {
      priceText = await salePriceElement.innerText();
    } else {
      // If there was no sale price, get the regular price
      const priceElement = page.locator('.header-container .regPrice').first();
      priceText = await priceElement.innerText();
    }
    const price = priceText.replace(/[^0-9.]/g, '');
    testReport.log('Price is : ', price);
    return Number(price);
  }

  async clickPersonalized() {
    strNonPersonalizedPrice = await this.getPrice();
    testReport.log('Price before clicking personalized is ', strNonPersonalizedPrice);
    await page.locator(this.personalizedBtn).click();
  }

  async personalizedPrice() {
    const expectedPersonalizedPrice = parseFloat(strNonPersonalizedPrice) + 12;
    const actualstrPersonalizedPrice = await this.getPrice();
    testReport.log('Price after clicking personalized is ', actualstrPersonalizedPrice);
    await expect(expectedPersonalizedPrice).toEqual(actualstrPersonalizedPrice);
    testReport.log('Price is as expected after clicking personalized : ', actualstrPersonalizedPrice);
    await page.waitForLoadState();
    const skuDesc = await page.innerText(elements.productPage.SKU_DESCRIPTION);
    await expect(skuDesc.toLowerCase()).toContain('personalized');
    testReport.log('SKU title includes Personalzed');
    // await page.waitForSelector(this.textBtnMonogramming, { visible: true, timeout: 5000 });
    await expect(page.getByTestId(this.textBtnMonogramming).first()).toBeVisible();
    await expect(page.getByTestId(this.fontBtnMonogramming)).toBeVisible();
    await expect(page.locator(this.threadBtn)).toBeVisible();
    testReport.log('Personalized PDP page contains Text, Font and Thread options');
  }

  async clickAcceptMonogram() {
    await page.locator(elements.productPage.btnMtoAddToCart).click();
    testReport.log(this.pageName, 'Add to cart clicked on Double Dare Popup');
  }

  async verifyStyleGrouper() {
    await page.waitForSelector(this.styleGrouper, { waitFor: 'visible' });
    await page.waitForLoadState('load');
    await expect(page.locator(this.nonPersoanlizedBtn), 'The page is not a Monogramming page').toBeEnabled();
    testReport.log(this.pageName, 'The page has Non-Personalized button ');
    await expect(page.locator(this.personalizedBtn), 'The page is not a Monogramming page').toBeEnabled();
    testReport.log(this.pageName, 'The page has Personalized button ');
  }

  async enterText(characters) {
    await page.getByTestId(this.textBtnMonogramming).first().fill(characters);
  }

  async getCharacterCount() {
    const char = await page.locator(this.charLimit).innerText();
    const charCount = parseInt(char, 10);
    return charCount;
  }

  async addToCartDisabled() {
    const addToCartBtn = '[data-testid="add-to-cart-button"]';
    await page.waitForSelector(addToCartBtn, { state: 'visible', timeout: 10000 });
    const addToCartButton = page.getByTestId(elements.productPage.MainBtnAddToCart).first();
    const isDisabled = await addToCartButton.getAttribute('aria-disabled');
    return isDisabled;
  }

  async validateSummaryTextPDP(text, font, color) {
    await page.waitForSelector(elements.productPage.txtProductSummary);
    // const summarySelector = page.waitForSelector(elements.productPage.txtProductSummary);
    // Personalization j Font Beloved Thread Color White
    const expectedMtoSummary = `Personalization ${text} Font ${font} Thread Color ${color}`;
    const strSummary = await page.locator(elements.productPage.txtProductSummary).innerText();
    await expect(strSummary.trim()).toEqual(expectedMtoSummary);
    testReport.log('Summary text is matching the expected text ', strSummary);
  }

  async selectThread() {
    await page.waitForSelector('fieldset#thread-color-legend button', { timeout: 5000 });
    const threadColors = await page.locator('fieldset#thread-color-legend button').all();
    for (let i = 0; i < 2; i++) {
      // eslint-disable-next-line no-await-in-loop
      const colorName = await threadColors[i].getAttribute('title');
      testReport.log('Clicking the Color.... ', colorName);
      // eslint-disable-next-line no-await-in-loop
      await threadColors[i].click();
      // eslint-disable-next-line no-await-in-loop
      await page.waitForLoadState('load');
      // eslint-disable-next-line no-await-in-loop
      const selectedColor = await page.locator(this.threadColorValue).innerText();
      testReport.log('Selected Color is ', selectedColor);
      // eslint-disable-next-line no-await-in-loop
      await expect(selectedColor.toLowerCase()).toEqual(colorName.toLowerCase());
      testReport.log('Verified the color : ', colorName);
      threadColor = colorName;
    }
  }

  async selectFont(font) {
    const text = 'C1@t$0n742%()l';
    // Open the dropdown
    await page.getByTestId(this.fontBtnMonogramming).click();
    const optionElements = await page.locator('#select-custom-panel-mg-font div[role="option"]').all();
    await this.enterText('');
    for (let i = 0; i < optionElements.length; i++) {
      const option = optionElements[i]; // eslint-disable-next-line no-await-in-loop
      fontType = await option.innerText(); // eslint-disable-next-line no-await-in-loop
      if (fontType === font) {
        // eslint-disable-next-line no-await-in-loop
        await option.click();
        testReport.log('Clicked : ', fontType); // eslint-disable-next-line no-await-in-loop
        const charCount = await this.getCharacterCount(); // eslint-disable-next-line no-await-in-loop
        await expect(this.addToCartDisabled()).not.toBe('true');
        testReport.log('Add to cart is disabled before entering text');
        word = text.substring(0, charCount);
        testReport.log('Entering the word : ', word); // eslint-disable-next-line no-await-in-loop
        await this.enterText(word); // eslint-disable-next-line no-await-in-loop
        await expect(this.addToCartDisabled()).not.toBe('false');
        testReport.log('Add to cart is enabled before entering text');
        break;
      }
    }
  }
}

module.exports = { MonogramPage };
