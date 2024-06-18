const { expect } = require('@playwright/test');

const elements = require('../../elements/elements');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const env = require('../../../../support/env/env');
const { timeout } = require('../../../../configs/config');
const pdpTestData = require('../../datafiles/testdata');
// eslint-disable-next-line import/no-restricted-paths
const { CheckoutPage } = require('../../../../project-checkout/page-objects/pages/common/checkout.page');

const testReport = new ReportUtils();
const commonUtils = new CommonUtils();
const checkoutPage = new CheckoutPage();

let skuPrice;
// const itemInfo = {};
let strPdpSummary;
let strMtoMessage;

class ProductPage extends PageObject {
  constructor() {
    super();
    this.btnAddToRegistry = '//button[@value="addToRegistry"]';
    this.skuValue = '//*[@class="right-col"]//*[@class="sku-number"]';
    this.pageName = 'ProductPage';
    this.logo = '//span[@class="exclusive-label text-xs"]';
    this.btnMtoAddToCart = '//button[@data-id="addToCartButton"]';
    this.detailsDrawer = '//div[@class="drawer-header"]/div[contains(text(),"Details")]';
    this.reviewsDrawer = '//div[@data-id="reviews-drawer"]';
    this.dimesionsDrawer = '//div[@data-id="dimensions-drawer"]';
    this.careDrawer = '//div[@class="drawer-header"]/div[contains(text(),"Care")]';
    this.assemblyDrawer = '//div[@class="drawer-header"]/div[contains(text(),"Assembly")]';
    this.peopleAlsoViewedCarousel = '//div[@id="people-also-viewed-carousel"]//span[contains(text(),"People Also Viewed")]';
    this.recentlyViewed = '//span[contains(text(),"Recently Viewed Products")]';
    this.partOfCollection = '//span[contains(text(),"Part of a Collection")]';
    this.extrasCarousel = '//div[@id="extras-carousel-wrapper"]//span[contains(text(),"Extras and Essentials")]';
    this.completeLookCarousel = '//span[contains(text(),"Complete the Look")]';
    this.shopSimilarCarousel = '//div[@id="backordered-carousel-wrapper"]//span[contains(text(),"Shop Similar Items In-Stock")]';
    this.recentlyViewedCarousel = '//span[contains(text(),"Recently Viewed Products")]';
    this.peopleAlsoViewedATC = '//section[@data-testid="people-also-viewed-carousel"]//div[2]//div[@class="dsProductCardHoverButton_10iUC"]';
    this.partOfCollectionATC = '//div[@id="part-of-a-collection-track"]//div//div/div/span/button[@data-testid="add-to-cart-button"]';
    this.extrasCarouselATC = '//div[@id="extras-carousel-wrapper"]//div//div/div/span/button[@data-testid="add-to-cart-button"]';
    this.complettheLookATC = '//div[@id="mix-and-match"]//div//div/div/span/button[@data-testid="add-to-cart-button"]';
    this.shopSimilarATC = '//div[@id="backordered-carousel-wrapper"]//div//div/div/span/button[@data-testid="add-to-cart-button"]';
    this.recentlyViewedATC = '//div[@id="recently-viewed-products-track"]//div//div/div/span/button[@data-testid="add-to-cart-button"]';
    this.zipCode = '//div[@class="zip-code-message"]/div/button[@class="button-transparent zip-code-display"]';
    this.zipCodeTextbox = '//input[@data-testid="text-element"]';
    this.zipcodeSubmit = '//button[@type="submit" ][@class="zip-submit-button button button-secondary button-lg"]';
    this.textSkuElement = '[data-testid="text-element"]';
    this.fontSku = '[class="text-md-reg selected-font"]';
    this.threadSku = '[class="text-md-reg selected-color"]';
    this.storePickupButton = '//label[contains(text(),"FREE & FAST STORE PICKUP")]';
    this.chkHandy = '.a11y-checkbox-label';
    this.handyCharge = '.handy-price-info > .text-md-reg';
    this.monogramFeeText = '.personalization-fee-msg';
    this.vdsLink = '//button[contains(text(),"Ships directly from vendor. Learn More")]';
    this.vdsPopupMessage = '//div[@id="primary-copy popup-copy"]/p';
    this.vdsPopupClose = '//button[@class="button button-secondary button-xl popup-close"]';
    this.freeShipLink = '[class*=promo-popup]';
  }

  async navigateToProductPage(sku) {
    const productUrl = `${global.baseURL}/s/s${sku}`;
    testReport.log(productUrl);
    await page.goto(productUrl);
  }

  async navigateToVerifyAvailabilityProductPage(sku) {
    const productUrl = `${env.BASE_URL_Availability}/s/s${sku}`;
    testReport.log(productUrl);
    await page.goto(productUrl);
  }

  async proceedToCanadaFromGlobalPopup() {
    for (let attempt = 1; attempt < 10; attempt++) {
      testReport.log(`checking whether global popup is launched. attempt # ${attempt}`);

      // eslint-disable-next-line no-await-in-loop
      const isGlobalPopupVisible = await page.locator('[data-id=popup-container]').isVisible();
      if (isGlobalPopupVisible) {
        // eslint-disable-next-line no-await-in-loop
        await page.getByRole('button', { name: 'Continue to Canadian Site' }).click();
        break;
      }
    }
  }

  async validateProductPage(item) {
    let availabilityMsg = '';
    let skuNum;
    let itemInfo = {};

    // Defensive fix as PDP team uses wrong input. Object expected
    await testReport.log(this.pageName, `type of input data- ${typeof item} . [Object expected but PDP sending string]`);
    if (typeof item === 'object') {
      itemInfo = item;
      skuNum = itemInfo.skuNum;
    } else {
      skuNum = item;
    }

    await page.waitForLoadState('domcontentloaded');
    if (!skuNum.includes('f')) {
      await expect(page.getByText(skuNum).nth(1)).toHaveText(skuNum, { timeout: 120000 });
      await expect(page.locator(elements.productPage.SKU_NUM).first()).toHaveText(skuNum, { timeout: 120000 });
      testReport.log(this.pageName, `Assert -> SKU number displayed in Product page is same as search keyword ->${skuNum}`);
    }
    await page.waitForLoadState('domcontentloaded');

    // check if global popup is displayed for canada and if yes, click on proceed to Canada
    if (env.EXEC_SITE.includes('can')) {
      await this.proceedToCanadaFromGlobalPopup();
    }

    const skuTitle = await page.innerText(elements.productPage.SKU_DESCRIPTION);
    testReport.log(this.pageName, `Item Description from the Product page ->${skuTitle}`);

    const priceElement = page.locator('.shop-bar-price-area.jsProductPrice').first();
    const priceInfo = await checkoutPage.getPrice(priceElement);

    // ----------TO BE REMOVED---------------------------------------------------

    skuPrice = await page.innerText(elements.productPage.SKU_PRICE_REGULAR);
    testReport.log(this.pageName, `Item unit price displayed is ->${skuPrice}`);

    if (skuPrice.includes('Sale')) {
      skuPrice = (await page.getInnerText(elements.productPage.SKU_PRICE_SALE))[0].replace('Sale ', '');
    } else if (skuPrice.includes('Clearance')) {
      skuPrice = (await page.getInnerText(elements.productPage.SKU_PRICE_SALE))[0].replace('Clearance ', '');
    } else {
      skuPrice = await page.locator(elements.productPage.SKU_PRICE_REGULAR).textContent();
      skuPrice = skuPrice.replace(' reg.  ', '');
      testReport.log(this.pageName, `Item On Sale/Clearance and salePrice/clearancePrice displayed is ->${skuPrice}`);
    }

    //-------------------------------------------------------------

    itemInfo.skuNum = skuNum;
    itemInfo.skuTitle = skuTitle;
    itemInfo.skuPrice = priceInfo.skuPrice;
    itemInfo.skuSellingPrice = priceInfo.skuSellingPrice;
    itemInfo.isPersonalizedSku = false;

    if (await page.locator('.text-md-reg.return-policy-text').isVisible()) {
      const returnPolicyText = await page.locator('.text-md-reg.return-policy-text').textContent();
      if (returnPolicyText.includes('Personalized')) {
        const textElement = await page.getByTestId('mg-text').getByTestId('text-element').inputValue();
        const fontSku = await page.locator(this.fontSku).textContent();
        const threadSku = await page.locator(this.threadSku).textContent();
        const monogramFeeText = await page.locator(this.monogramFeeText).first().textContent();
        const monogramFee = await commonUtils.removeAlphaCharactersFromString(monogramFeeText);
        itemInfo.skuTitle = skuTitle.replace('Personalized ', '');
        itemInfo.textElement = textElement;
        itemInfo.fontSku = fontSku;
        itemInfo.threadSku = threadSku;
        itemInfo.monogramFee = monogramFee;
        itemInfo.isPersonalizedSku = true;
      }
    }

    let arrivesByMessage = '';

    ({ arrivesByMessage, availabilityMsg } = await this.GetAvailabilityInfo(availabilityMsg));
    itemInfo.availabilityMsg = availabilityMsg;
    itemInfo.arrivesByMessage = arrivesByMessage;

    itemInfo.stockAvailability = await checkoutPage.getStockStatus(itemInfo.availabilityMsg, itemInfo.arrivesByMessage);

    testReport.log(this.pageName, `Captured items details from PDP -> ${JSON.stringify(itemInfo, null, 2)}`);
    return itemInfo;
  }

  async GetAvailabilityInfo(availabilityMsgInp = '') {
    let arrivesByMessage = '';
    let isPersonalizedSku = false;
    let availabilityMsg = availabilityMsgInp;
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });

    const personalizationReturnPolicyTextElement = page.locator('.text-md-reg.return-policy-text');
    isPersonalizedSku = await checkoutPage.getPersonalizationStatus(personalizationReturnPolicyTextElement);

    if ((await page.locator('.availability-sub-label').first().isVisible()) && isPersonalizedSku) {
      availabilityMsg = await page.locator('.availability-sub-label >> span').first().textContent();
      testReport.log(this.pageName, `Personalized SKU availability message:: ${availabilityMsg}`);
    } else {
      await expect(page.locator(elements.productPage.lblInstockAvailabilityMessage)).toBeVisible(timeout);
      availabilityMsg = await page.innerText(elements.productPage.lblInstockAvailabilityMessage);
      testReport.log(this.pageName, `Availability message:: ${availabilityMsg}`);
    }

    if (availabilityMsg.includes('Please allow')) {
      await expect(page.locator(elements.productPage.lblInstockAvailabilityMessage)).toBeVisible(timeout);
      availabilityMsg = await page.innerText(elements.productPage.lblInstockAvailabilityMessage);
      availabilityMsg = availabilityMsg.replace('.', '').replace('to ZIP code', '').replace('to postal code', '').trim();
      testReport.log(this.pageName, `Availability message includes 'Please allow', Modified availability message string:: ${availabilityMsg}`);
    } else if (availabilityMsg.includes('Purchase now') || availabilityMsg.includes('This item is in high demand')) {
      testReport.log(this.pageName, `Availability seems to be backorder:: ${availabilityMsg}`);

      if (isPersonalizedSku) {
        availabilityMsg = await page.locator('.availability-sub-label').textContent();
        const firstDotIndex = availabilityMsg.indexOf('.');
        const result = availabilityMsg.substring(0, firstDotIndex);
        availabilityMsg = result;
        // arrivesByMessage = result;
      } else {
        // 45 day condition
        testReport.log(this.pageName, `Furniture backorder condition`);
        const blackBackOrderMessageCount = await page.locator('.product-backorder').count();
        if (blackBackOrderMessageCount > 0) {
          testReport.log(this.pageName, `Expected backorder < 45 days`);
          availabilityMsg = await page.innerText('.product-backorder');
          arrivesByMessage = await page.innerText('.availMsg.product-backorder');
        } else {
          testReport.log(this.pageName, `Expected backorder > 45 days`);
          availabilityMsg = await page.innerText(elements.productPage.lblAvailabilityMessage);
          arrivesByMessage = await page.innerText(elements.productPage.lblArrivesMessage);
        }
      }
      // availabilityMsg = availabilityMsg.replace(arrivesByMessage, '');
    } else if (availabilityMsg.includes(env.MONOGRAM_ARRIVES_MESSAGE)) {
      testReport.log(this.pageName, `In stock monogram block`);
      availabilityMsg = 'In stock and ready to ship';
      arrivesByMessage = await page.locator('.availability-sub-label >> span').first().textContent();
    } else if (
      !availabilityMsg.includes('In stock') &&
      !availabilityMsg.includes('made just for you') &&
      !availabilityMsg.includes('Purchase now') &&
      !availabilityMsg.includes(env.MONOGRAM_ARRIVES_MESSAGE)
    ) {
      testReport.log(this.pageName, `None of the availability message condition matched`);
      availabilityMsg = await page.innerText(elements.productPage.lblAvailabilityMessage);
      arrivesByMessage = await page.innerText(elements.productPage.lblArrivesMessage);
      availabilityMsg = availabilityMsg.replace(arrivesByMessage, '');
    } else {
      availabilityMsg = await page.innerText(elements.productPage.lblInstockAvailabilityMessage);
      availabilityMsg = availabilityMsg.replace('.', '').replace('to ZIP code', '').replace('to postal code', '').trim();
    }
    // when the implementation to read item properties from the API, we can remove this code
    if (availabilityMsg.includes('made just for you')) {
      testReport.log(this.pageName, `MTO availability found`);
      availabilityMsg = availabilityMsg.replace('Estimated in', 'Estimated in ');
      availabilityMsg = availabilityMsg.replace('This item is made just for you', 'This item is made just for you.');
      testReport.log(this.pageName, 'MTO availability Message for Cart validations modified for validation in cart');
    } else {
      availabilityMsg = availabilityMsg.trim();
      arrivesByMessage = arrivesByMessage.replace('Estimated in', 'Estimated on backorder until ');
    }
    return { arrivesByMessage, availabilityMsg };
  }

  async addProductPageAvailability() {
    let availabilityMsg = '';
    let arrivesByMessage = '';

    ({ arrivesByMessage, availabilityMsg } = await this.GetAvailabilityInfo(availabilityMsg));

    const productPageAvailability = {};
    productPageAvailability.availabilityMsg = availabilityMsg;
    productPageAvailability.arrivesByMessage = arrivesByMessage;

    this.availabilityInfo = { productPageAvailability };

    testReport.log(this.pageName, `Captured availability details from PDP -> ${JSON.stringify(productPageAvailability)}`);
  }

  async verifyProductPageAvailability() {
    let availabilityMsg = '';
    let arrivesByMessage = '';

    ({ arrivesByMessage, availabilityMsg } = await this.GetAvailabilityInfo(availabilityMsg));

    const { productPageAvailability } = this.availabilityInfo;
    expect(arrivesByMessage).toContain(productPageAvailability.arrivesByMessage);
    expect(availabilityMsg).toContain(productPageAvailability.availabilityMsg);
    testReport.log(this.pageName, `Availability Message: Actual -> ${arrivesByMessage} Expected -> ${productPageAvailability.arrivesByMessage}`);
    testReport.log(this.pageName, `Arrives By Message: Actual -> ${availabilityMsg} Expected -> ${productPageAvailability.availabilityMsg}`);
  }

  findIfSpecialItemType() {
    /*
    // need to move this to a DB call later
    const { availabilityMsg } = itemInfo;
    let itemType = 'regular';
    if (availabilityMsg.includes('item is made just for you')) {
      itemType = 'MTO';
    }
    return itemType;
    */
  }

  async validateAddtoCartPresent() {
    await expect(page.getByTestId(elements.productPage.MainBtnAddToCart).first()).toBeVisible();
  }

  async clickAddToCart(quantityAdjuster = null) {
    const { MainBtnAddToCart, QuantityMinusButton, QuantityPlusButton } = elements.productPage;
    // const itemType = this.findIfSpecialItemType();
    const mtoMsgLocator = page.locator('.availability-sub-label');

    let availabilityMsg = '';
    let itemType = 'regular';

    if ((await mtoMsgLocator.count()) > 0) {
      availabilityMsg = await page.locator('.availability-sub-label').first().textContent();
      if (availabilityMsg.includes('item is made just for you')) {
        itemType = 'MTO';
      }
    }

    if (itemType === 'MTO') {
      let addToCartElement;
      if (commonUtils.verifyIsMobile() && env.BRAND !== 'CB2') {
        testReport.log(this.pageName, 'Locating addtocart button for mobile browser view');
        addToCartElement = page.getByTestId(MainBtnAddToCart).nth(1);
      } else {
        testReport.log(this.pageName, 'Locating addtocart button for desktop browser view');
        addToCartElement = page.getByTestId(MainBtnAddToCart).first();
      }
      await addToCartElement.click();
      await expect(page.locator(this.btnMtoAddToCart)).toBeVisible({ timeout: 10000 });
      await page.locator(this.btnMtoAddToCart).click();
    } else {
      if (quantityAdjuster !== null) {
        const { quantityAdjusterMethod, quantity } = quantityAdjuster;

        const clickQuantityButton = async () => {
          const buttonSelector = quantityAdjusterMethod === 'decrease' ? QuantityMinusButton : QuantityPlusButton;
          await page.getByTestId(buttonSelector).click();
        };

        const clickPromises = Array.from({ length: quantity }, () => clickQuantityButton());

        await Promise.all(clickPromises);
      }
      await expect(page.locator('[data-testid="add-to-cart-button"]').first()).toBeVisible(timeout);
      //        await page.locator('[data-testid="add-to-cart-button"]').nth(1).scrollIntoViewIfNeeded();
      const addToCartButtonContainer = page.locator('.shop-button-container').first();
      await addToCartButtonContainer.scrollIntoViewIfNeeded();
      await addToCartButtonContainer.getByTestId(MainBtnAddToCart).first().click();

      testReport.log(this.pageName, 'Clicked ADD TO CART button');
    }

    return itemType;
  }

  async clickStorePickup(skuType) {
    // await page.locator('button:text("Select Store")').click();
    const seeOtherStoresButton = page.locator('button:text("See Other Stores")');
    const changeStoreButton = page.locator('button:text("Change Store")');
    const selectStoreButton = page.locator('button:text("Select Store")');

    if (await seeOtherStoresButton.isVisible()) {
      await seeOtherStoresButton.click();
      await testReport.log(this.pageName, 'See Other Stores button found and clicked');
    } else if (await changeStoreButton.isVisible()) {
      await changeStoreButton.click();
      await testReport.log(this.pageName, 'Change Store button found and clicked');
    } else if (await selectStoreButton.isVisible()) {
      await selectStoreButton.click();
      await testReport.log(this.pageName, 'Select Store" button found and clicked');
    } else {
      await testReport.log(this.pageName, 'None of the buttons "See Other Stores", "Change Store", "Select Store" buttons found');
    }

    await expect(page.locator('//*[@id="popup-content"]')).toBeVisible();
    await expect(page.locator('text="Store Availability"')).toBeVisible();

    await page.locator('#txtZIP').fill(env.DEFAULT_ZIPCODE);
    await page.getByRole('button', { name: 'Find stores. Submit' }).click();
    // await page.waitForSelector('.store-accordion-row');
    // await commonUtils.forcedWait(5000);

    await expect(page.locator('text="See It on Display at a Store Near You"')).toBeVisible();

    let storeAvailabilityText;
    if (skuType.includes('BOPS')) {
      storeAvailabilityText = 'for same-day pickup';
    } else if (skuType.includes('BOSS')) {
      storeAvailabilityText = 'Order today and pickup';
    } else {
      storeAvailabilityText = 'for same-day pickup';
    }

    await expect(page.locator('#divStoreRows')).toBeVisible({ timeout: 60000 });

    let availabilityInfoMsg;
    try {
      const storeAccordionElements = page.locator(`div.store-accordion-row:has-text("${storeAvailabilityText}")`).first();
      await testReport.log(this.pageName, `storeAccordionElements - ${await storeAccordionElements.textContent()}`);

      availabilityInfoMsg = await storeAccordionElements.locator('.availability-info-msg').textContent();
      await testReport.log(this.pageName, `storeAccordionElements - ${availabilityInfoMsg}`);
      await storeAccordionElements.locator('.button-transparent.button-make-my-store').click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('.llm-store-message')).toBeVisible();

      expect(await page.locator('.llm-store-message').textContent()).toContain(availabilityInfoMsg);
    } catch (error) {
      await testReport.log(this.pageName, 'Make This My Store button not found within 60 seconds.');
    }
    return availabilityInfoMsg;
  }

  async addStorePickupAvailability() {
    await page.locator('button:text("Select Store")').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('//*[@id="popup-content"]')).toBeVisible();
    const availabileStoreElementsArray = await commonUtils.getElementHandlesArray('.store-accordion-row');
    // const count = availabileStoreElementsArray.length;
    const productPickupAvailabilityArray = [];
    await Promise.all(
      availabileStoreElementsArray.map(async (ele, i) => {
        const storeNameEle = page.getByTestId('store-name').nth(i);
        const storeName = await storeNameEle.textContent();

        const eleSkuAvailabilityMsgEle = page.getByTestId('store-availability-message').nth(i);
        const eleSkuAvailabilityMsg = await eleSkuAvailabilityMsgEle.textContent();

        productPickupAvailabilityArray.push({ storeName, eleSkuAvailabilityMsg });
        testReport.log(this.pageName, `Availability Message for ${storeName} is ${eleSkuAvailabilityMsg}`);
      })
    );
    this.availabilityInfo = { ...this.availabilityInfo, productPickupAvailabilityArray };
    await page.getByTitle('Close Popup').click();
  }

  async verifyStorePickupAvailability() {
    await page.locator('button:text("Select Store")').click();

    const availabileStoreElementsArray = await commonUtils.getElementHandlesArray('.store-accordion-row');
    const { productPickupAvailabilityArray } = this.availabilityInfo;
    await Promise.all(
      availabileStoreElementsArray.map(async (ele, i) => {
        const storeName = await page.getByTestId('store-name').nth(i).textContent();
        const eleSkuAvailabilityMsg = await page.getByTestId('store-availability-message').nth(i).textContent();
        const productStoreAvailability = productPickupAvailabilityArray[i];
        expect(eleSkuAvailabilityMsg).toContain(productStoreAvailability.eleSkuAvailabilityMsg);
        testReport.log(
          this.pageName,
          `Availability Message for: Actual > ${storeName} is ${eleSkuAvailabilityMsg} Expected > ${productStoreAvailability.storeName} is ${productStoreAvailability.eleSkuAvailabilityMsg}`
        );
      })
    );

    await page.getByTitle('Close Popup').click();
  }

  async clickCheckoutNow(itemType) {
    if (itemType === 'MTO') {
      testReport.log(this.pageName, `ADD TO CART Flyout ByPassed. ItemType was ${itemType}`);
    } else {
      await page.locator(elements.productPage.CHECKOUTNOW_BUTTON).click();
      testReport.log(this.pageName, 'Clicked CHECKOUT NOW button from Cart Flyout');
    }
  }

  async clickCheckout() {
    await page.locator(elements.productPage.CHECKOUTNOW_BUTTON).click();
    testReport.log(this.pageName, 'Clicked CHECKOUT NOW button from Cart Flyout');
  }

  async clickSwatch() {
    await page.locator(elements.productPage.GET_FREE_SWATCH_BUTTON).click();
    await page.locator(elements.productPage.FREE_SWATCH_POPUP_CLOSE_BUTTON).click();
  }

  /**
   * @author: ddhanasekaran
   * @function_Name : getSummaryText
   * @Description : To get the summary text of the product from PDP page
   * @params : None
   * @returns : None
   * */

  async getSummaryText() {
    await page.waitForLoadState();
    await expect(page.locator(elements.productPage.lblProductSummary)).toBeVisible();

    strPdpSummary = await page.locator(elements.productPage.lblProductSummary).innerText();
    testReport.log(`str pdp summary from product page is${strPdpSummary}`);
    testReport.log(this.pageName, `The summary text is captured as ${strPdpSummary}`);
  }

  /**
   * @author: ddhanasekaran
   * @function_Name : validateMtoProductPage
   * @Description : To validate key difference in the Made To Order product page
   * @params : None
   * @returns : None
   * */

  async validateMtoProductPage() {
    strMtoMessage = await page.locator(elements.productPage.lblMtoMessageOnPdp).innerText();
    // global.mtoMessagePDP = mtoMessage;
    if (strMtoMessage.includes('This item is made just for you')) {
      testReport.log(this.pageName, `MTO message is as expected${strMtoMessage}`);
    } else {
      testReport.log(this.pageName, 'MTO message mismatch');
    }
    await expect(page.locator(elements.productPage.btnAddToRegistry)).toBeDisabled();
    testReport.log(this.pageName, 'Add to Registry is disabled');
  }

  /**
   * @author: ddhanasekaran
   * @function_Name : clickMtoAddToCart
   * @Description : To add the MTO product to cart
   * @params : None
   * @returns : None
   * */

  async clickMtoAddToCart() {
    await page.getByTestId(elements.productPage.MainBtnAddToCart).first().click();
    testReport.log(this.pageName, 'Clicked ADD TO CART button');
  }
  /**
   * @author: ddhanasekaran
   * @function_Name : clickAddFavorite, clickMyFavoritesList, clickViewFavorites
   * @Description : To validate the Favourite funtionality
   * @params : None
   * @returns : None
   * */

  async clickAddFavorite() {
    const buttonLocator = page.locator('.shop-button-container .add-to-favorites-wrapper button');
    await buttonLocator.waitFor({ state: 'visible', timeout: 35000 });
    await buttonLocator.click({ delay: 20000 });

    // Log the action
    testReport.log(this.pageName, 'Clicked on Add to Favorites button');
  }

  async clickMyFavoritesList() {
    testReport.log(this.pageName, 'Popup Opened');
    await expect(page.locator(elements.productPage.popUpSkuTitle)).toBeVisible();
    await expect(page.locator(elements.productPage.btnCreateNew)).toBeVisible();
    await page.locator(elements.productPage.btnMyFavorites).click();
    testReport.log(this.pageName, 'click on favorites list');
  }

  async clickViewFavorites() {
    await expect(page.locator(elements.productPage.msgAddedFavorites)).toBeVisible();
    await expect(page.locator(elements.productPage.msgAddedFavorites)).toContainText('Added To My Favorites');
    await page.locator(elements.productPage.lnkViewFavorites).click();
    testReport.log(this.pageName, 'Clicked in View Favorites button');
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : clickQuickShip
   * @Description : To Verify Quick ship functionality
   * @params : None
   * @returns : None
   * */

  async clickQuickShip() {
    await page.locator(elements.productPage.quickShip).click();
    expect(await page.innerText(elements.productPage.quickShipTitle)).toContain('Available Soonest');
    expect(await page.innerText(elements.productPage.quickShipZipcode)).toContain('Showing products for ZIP Code');
    await page.locator(elements.productPage.quickShipClose).click();
    testReport.log(this.pageName, 'User Clicked oN Quick ship');
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : clickQuickShip
   * @Description : To Verify Quick ship functionality
   * @params : None
   * @returns : None
   * */

  async verifyLogo() {
    if (!commonUtils.verifyIsMobile()) {
      const logoElement = page.locator(this.logo);
      await logoElement.waitFor({ state: 'visible' }); // Ensure the element is visible
      const logoname = await logoElement.textContent(); // Extract text content from the logo element
      testReport.log(logoname);
      expect(logoname).toEqual('Exclusive');
    }
  }
  /**
   * @author: lalithayarramsetty
   * @function_Name : getSummaryText
   * @Description : commong method to verify summary text under hero image
   * @params : None
   * @returns : None
   * */

  async getProductSummaryText() {
    let strSummary = page;
    const strSkuTitle = await page.innerText(elements.productPage.skuTitle);
    const strDepthOption = await page.innerText(elements.productPage.depthSelectedChoice);
    const strSizeOption = await page.innerText(elements.productPage.sizeSelectedChoice);
    const strFabricOption = await page.innerText(elements.productPage.fabricSelectedChoice);
    let strOptionSummary = `${strSkuTitle}  ${strDepthOption} ${strSizeOption} ${strFabricOption}`;
    strOptionSummary = strOptionSummary.replace(/[^a-zA-Z0-9 ]/g, '');
    strSummary = strSummary.replace(/[^a-zA-Z0-9 ]/g, '');
    await expect(strOptionSummary).toHaveText(strSummary);
    testReport.log(`depath option is${strDepthOption}`);
    testReport.log(`sizeOption is${strSizeOption}`);
    testReport.log(`fabric option is${strFabricOption}`);
    testReport.log(`summary is${strSummary}`);
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : clickDrawer
   * @Description : To Verify Drawers on PDP pages
   * @params : None
   * @returns : None
   * */
  async verifyDrawer(drawer) {
    if (drawer === 'DETAILS' || drawer === 'details & care') {
      expect(await page.innerText(this.detailsDrawer)).toContain(drawer);
    } else if (drawer === 'REVIEWS' || drawer === 'reviews') {
      expect(await page.innerText(this.reviewsDrawer)).toContain(drawer);
    } else if (drawer === 'DIMENSIONS' || drawer === 'dimensions') {
      expect(await page.innerText(this.dimesionsDrawer)).toContain(drawer);
    } else if (drawer === 'CARE') {
      expect(await page.innerText(this.careDrawer)).toContain(drawer);
    } else if (drawer === 'assembly') {
      expect(await page.innerText(this.assemblyDrawer)).toContain(drawer);
    }
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : verifyCarousels
   * @Description : To Verify Carousels
   * @params : None
   * @returns : None
   * */
  async verifyCarousel(carousel) {
    if (carousel === 'People Also Viewed') {
      const scrollPDP = page.locator(this.peopleAlsoViewedCarousel);
      await scrollPDP.scrollIntoViewIfNeeded();
      expect(await page.innerText(this.peopleAlsoViewedCarousel)).toContain(carousel);
    } else if (carousel === 'Recently Viewed') {
      expect(await page.innerText(this.recentlyViewed)).toContain(carousel);
    } else if (carousel === 'Part of a Collection') {
      await page.waitForLoadState('domcontentloaded', { timeout: 80000 });
      await page.evaluate(() => {
        window.scrollTo(0, window.innerHeight); // Scroll down to trigger loading
      });
      page.locator(this.partOfCollection, { waitFor: 'visible' });
    } else if (carousel === 'Extras and Essentials') {
      const scrollPDP = page.locator(this.extrasCarousel);
      await scrollPDP.scrollIntoViewIfNeeded();
      expect(await page.innerText(this.extrasCarousel)).toContain(carousel);
    } else if (carousel === 'Complete the Look') {
      await page.evaluate(() => {
        window.scrollBy(0, 1500);
      });
      expect(await page.innerText(this.completeLookCarousel)).toContain(carousel);
    } else if (carousel === 'Shop Similar Items In-Stock') {
      const scrollPDP = page.locator(this.shopSimilarCarousel);
      await scrollPDP.scrollIntoViewIfNeeded();
      expect(await page.innerText(this.shopSimilarCarousel)).toContain(carousel);
    } else if (carousel === 'Recently Viewed Products') {
      const scrollPDP = page.locator(this.recentlyViewedCarousel);
      await scrollPDP.scrollIntoViewIfNeeded();
      expect(await page.innerText(this.recentlyViewedCarousel)).toContain(carousel);
    }
  }

  async getProductSellingPrice() {
    const skuPriceEle = page.locator('.shop-bar-price-area.jsProductPrice').nth(0);
    const skuPriceEleText = await skuPriceEle.innerText();
    const salePriceElementCount = await skuPriceEle.locator('.salePrice').count();

    if (salePriceElementCount > 0) {
      skuPrice = await skuPriceEle.locator(elements.productPage.SKU_PRICE_SALE).innerText();

      if (skuPriceEleText.includes('Sale')) {
        skuPrice = skuPrice.replace('Sale ', '');
      } else if (skuPriceEleText.includes('Clearance')) {
        skuPrice = skuPrice.replace('Clearance ', '');
      } else if (skuPriceEleText.includes('Set Savings')) {
        skuPrice = skuPrice.replace('Set Savings ', '');
      } else if (skuPriceEleText.includes('limited time')) {
        skuPrice = skuPrice.replace('limited time ', '');
      }
    } else {
      skuPrice = await page.locator(elements.productPage.SKU_PRICE_REGULAR).textContent();
      testReport.log(this.pageName, `Item unit price displayed is ->${skuPrice}`);
      skuPrice = skuPrice.replace(' reg.  ', '');
      testReport.log(this.pageName, `Item On Sale/Clearance and salePrice/clearancePrice displayed is ->${skuPrice}`);
    }
    return skuPrice;
  }

  async personalizeItem() {
    await this.clickPersonalized();
    await this.enterText();
    await this.selectFont();
    await this.selectThread();
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : clickPersonalized
   * @Description : selecting personalization
   * @params : None
   * @returns : None
   * */

  async clickPersonalized() {
    let strNonPersonalizedPrice = await this.getProductSellingPrice();
    testReport.log(this.pageName, `strNonPersonalizedPrice:: ${strNonPersonalizedPrice}`);
    strNonPersonalizedPrice = strNonPersonalizedPrice.replace(/[a-zA-Z]/g, '').replace('$', '');
    let strExpectedPersonalizedPrice = parseFloat(strNonPersonalizedPrice) + 12;
    strExpectedPersonalizedPrice = `${commonUtils.getCurrencyString()}${strExpectedPersonalizedPrice}`;
    testReport.log(
      this.pageName,
      `Non personalized price: ${strExpectedPersonalizedPrice}, expected item price after personalization: ${strExpectedPersonalizedPrice}`
    );
    await page.locator('#personalized').click();
    await page.waitForLoadState();
    const skuDesc = await page.innerText(elements.productPage.SKU_DESCRIPTION);
    await commonUtils.compareStringByRemovingExtraSpaces(this.pageName, skuDesc, 'Personalized');
    const strPersonalizedPrice = await this.getProductSellingPrice();
    expect(strPersonalizedPrice).toContain(strExpectedPersonalizedPrice);
    testReport.log(this.pageName, `Expected personalized price: ${strExpectedPersonalizedPrice}, actual displayed in the screen: ${strPersonalizedPrice}`);

    await expect(page.getByTestId('mg-text').getByTestId('text-element')).toBeVisible();
    await expect(page.getByTestId('select-custom-button')).toBeVisible();
    await expect(page.getByText('Thread color:')).toBeVisible();
    const monogramFeeText = await page.locator(this.monogramFeeText).first().textContent();
    expect(monogramFeeText).toContain(`includes ${env.MONOGRAMMING_FEE} personalization fee`);
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : enterText
   * @Description : enter Monogram text
   * @params : None
   * @returns : None
   * */

  async enterText() {
    await page.getByTestId('mg-text').getByTestId('text-element').fill('cra');
    await page.waitForLoadState();
  }

  /**
   * @author: lalithayarramsetty
   * @function_Name : selectFont
   * @Description : select Font
   * @params : FontName
   * @returns : None
   * */

  async selectFont(strFontName) {
    await page.getByTestId('select-custom-button').click();
    const fontTobeSelected =
      strFontName === undefined || strFontName === null || strFontName === ''
        ? page.locator('#select-custom-panel-mg-font >> div').first()
        : page.getByRole('option', { name: strFontName }).first();
    await fontTobeSelected.click();
  }
  /**
   * @author: lalithayarramsetty
   * @function_Name : selectThread
   * @Description : select Thread Color
   * @params : ThreadColor
   * @returns : None
   * */

  async selectThread(strThreadColor) {
    const threadColor = strThreadColor === undefined || strThreadColor === null || strThreadColor === '' ? 'White' : strThreadColor;
    await page
      .getByTestId('mg-color-container')
      .getByRole('radio', { name: `${threadColor}` })
      .click();
    await page.waitForLoadState();
    await this.getSummaryText();
    await expect(page.locator(elements.productPage.btnAddToRegistry)).toBeDisabled();
    testReport.log(this.pageName, 'Add to Registry is disabled');
  }

  async clickAcceptMonogram() {
    await page.locator(elements.productPage.btnMtoAddToCart).click();
    testReport.log(this.pageName, 'Add to cart clicked on Double Dare Popup');
    // await page.waitForLoadState('domcontentloaded');
  }

  async addProductToRegistry() {
    await page.locator(this.btnAddToRegistry).click();
    testReport.log(this.pageName, 'Clicked ADD TO REGISTRY button');
    const sku = await page.locator(this.skuValue).innerText();
    return sku;
  }
  /**
   * @author: lalithayarramsetty
   * @function_Name : clickCarouselAddtoCart
   * @Description : To validate ATC functionality on carousels
   * @params : carousel name
   * @returns : None
   * */

  async clickCarouselAddtoCart(carousel) {
    if (carousel === 'Part of a Collection') {
      await page.locator(this.partOfCollectionATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    } else if (carousel === 'People Also Viewed') {
      await page.locator(this.peopleAlsoViewedATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    } else if (carousel === 'Extras and Essentials') {
      await page.locator(this.extrasCarouselATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    } else if (carousel === 'Complete the Look') {
      await page.locator(this.complettheLookATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    } else if (carousel === 'Shop Similar Items In-Stock') {
      await page.locator(this.shopSimilarATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    } else if (carousel === 'Recently Viewed Products') {
      await page.locator(this.recentlyViewedATC).first().click();
      testReport.log(this.pageName, `Add to Cart Clicked for ${carousel}`);
    }
  }

  async changeZip(zipcode) {
    await page.locator(this.zipCode).click();
    await page.locator(this.zipCodeTextbox).fill(' ');
    await page.locator(this.zipCodeTextbox).fill(zipcode);
    await page.locator(this.zipcodeSubmit).click();
  }

  async verifyStorePickupDisplay() {
    await expect(page.locator(this.storePickupButton)).toBeVisible();
  }

  async checkHandyInstallation() {
    await page.locator(this.chkHandy).isVisible();
    await page.locator(this.chkHandy).check();
    await expect(page.locator(this.chkHandy)).toBeChecked();
    let handyCharge = await page.locator(this.handyCharge).textContent();
    handyCharge = handyCharge.replace('per item');
    await testReport.log(`handy charge : ${handyCharge}`);
    return handyCharge;
  }

  async vendordropshipPresent() {
    await page.locator(this.vdsLink).isVisible();
  }

  async verifyVDSlink() {
    await page.locator(this.vdsLink).click();
    const vdsTitle = await page.locator('//*[@class="popup-title"][1]').innerText();
    const vdsMessage = await page.locator(this.vdsPopupMessage).innerText();
    if (env.BRAND === 'CB2') {
      expect(vdsTitle).toEqual('DIRECT FROM VENDOR SHIPPING');
      expect(vdsMessage).toEqual(pdpTestData.productPageInfo.vdsCB2Terms);
    } else {
      expect(vdsTitle).toEqual('Direct from Vendor Shipping');
      expect(vdsMessage).toEqual(pdpTestData.productPageInfo.vdsCrateTerms);
    }
    await page.locator(this.vdsPopupClose).click();
  }

  async verifyPageType() {
    const pageName = await page.evaluate('window.digitalData.page.pageInfo.pageTemplateName');
    expect(pageName).toEqual('product detail content grouper');
  }

  async verifyFreeShipLink() {
    await page.locator(this.freeShipLink).isVisible();
    await expect(page.locator(this.freeShipLink)).toHaveText(env.FREE_SHIP_LINK);
    await testReport.log(this.pageName, `Free shipping link displayed in PDP`);
  }

  async verifyFreeShippingPopup(iWorldObj) {
    if (env.FREE_SHIPPING_FLAG === 'true') {
      await testReport.log(this.pageName, `Free shipping enabled`);
      await page.locator(this.freeShipLink).click();
      await expect(page.locator(elements.freeShippingPopup.divPopupContainer)).toBeVisible({ timeout });
      let freeShippingPopupContent;
      if (env.BRAND === 'Crate') {
        await expect(page.locator(elements.freeShippingPopup.hdrFreeShippingPopup)).toContainText(env.FREE_SHIPPING_POPUP_HEADER);
        const freeShippingPopupSubHeading = env.FREE_SHIPPING_POPUP_SUB_HEADER.replace('THRESHOLD', env.FREE_SHIPPING_THRESHOLD);
        await expect(page.locator(elements.freeShippingPopup.hdrSubFreeShippingPopup)).toContainText(freeShippingPopupSubHeading);
        freeShippingPopupContent = await this.replaceParameter();
        await expect(page.locator(elements.freeShippingPopup.msgFreeShippingPopup)).toContainText(freeShippingPopupContent);
      } else {
        await testReport.log(`Fake time :`, iWorldObj.fakeTime);
        const eTime = new Date(`${env.FREE_SHIPPING_END_DATE} 11:59 AM`);
        const timeDifference = eTime - iWorldObj.fakeTime;
        await testReport.log(`Fake Time : `, iWorldObj.fakeTime);
        await testReport.log(`End Time = `, eTime);
        if (timeDifference < 8640000) {
          // Checking the last day of promotion
          const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', 'today');
          await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
        } else if (timeDifference > 8640000 && timeDifference < 172800000) {
          // checking day before last day of promotion
          const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', 'tomorrow');
          await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
        } else {
          const freeShippingHeading = env.FREE_SHIPPING_POPUP_HEADER.replace('END_DATE', env.FREE_SHIPPING_END_DATE.slice(0, -3));
          await expect(page.locator(elements.freeShippingPopup.hdrCB2FreeShippingPopup)).toContainText(freeShippingHeading);
        }
        const freeShippingPopupSubHeading = env.FREE_SHIPPING_POPUP_SUB_HEADER.replace('THRESHOLD', env.FREE_SHIPPING_THRESHOLD);
        await expect(page.locator(elements.freeShippingPopup.hdrCB2SubFreeShippingPopup)).toContainText(freeShippingPopupSubHeading);
        freeShippingPopupContent = await this.replaceParameter();
        await expect(page.locator(elements.freeShippingPopup.msgCB2FreeShippingPopup)).toContainText(freeShippingPopupContent);
      }
      await testReport.log(this.pageName, freeShippingPopupContent);
      await page.getByTitle('Close Popup').click();
    }
  }

  async replaceParameter() {
    let freeShippingPopupContent;
    freeShippingPopupContent = env.FREE_SHIPPING_POPUP_CONTENT.replace(/LINK/g, env.FREE_SHIP_LINK);
    freeShippingPopupContent = freeShippingPopupContent.replace(/THRESHOLD/g, env.FREE_SHIPPING_THRESHOLD);
    freeShippingPopupContent = freeShippingPopupContent.replace(/START_DATE/g, env.FREE_SHIPPING_START_DATE);
    freeShippingPopupContent = freeShippingPopupContent.replace(/END_DATE/g, env.FREE_SHIPPING_END_DATE);
    return freeShippingPopupContent;
  }
}

module.exports = { ProductPage };
