/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const repoCommonElements = require('../elements/pdp-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class BrowseProductPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : selectColor,selectSizeInGroup
   * @Description : To Select Color, Size from color and size group respectively
   * @params : item(Index of number of items returned)
   * @returns : None
   * */

  async selectColor(color) {
    await page.customWait(repoCommonElements.productPage.lblGrouperContainer, 'lblGrouperContainer');
    await page.customClick(repoCommonElements.productPage.btnGrouperColor.replace('X', color), 'btnGrouperColor');
    await expect(page.locator(repoCommonElements.productPage.txtProductName.replace('X', color))).toBeVisible({ timeout: global.large_wait });
    testReport.log(this.pageName, `Selected ${color} color from color group`);
  }

  // To select a size from the size grouper
  async selectSizeInGroup(size) {
    await page.customWait(repoCommonElements.productPage.lblGrouperContainer, 'lblGrouperContainer');
    await page.customClick(repoCommonElements.productPage.btnGrouperSize.replace('X', size), 'btnGrouperSize');
    await expect(page.locator(repoCommonElements.productPage.txtProductName.replace('X', size))).toBeVisible({ timeout: global.large_wait });
    testReport.log(this.pageName, `Selected ${size} size from size group`);
  }

  /**
   * @function_Name : selectDepth,selectSizeInDrawer,selectFabric
   * @Description : To Select Depth, Size, Fabric from Depth ,Size , Fabric Drawer respectively
   * @params : item(Index of number of options retuned in drawer)
   * @returns : None
   * */

  async selectDepth(depth) {
    await page.waitForLoadState('load');
    await page.customWait(repoCommonElements.productPage.lblDepthDrawer, 'lblDepthDrawer');
    await page.customClick(repoCommonElements.productPage.btnItemsInDepthDrawer.replace('X', depth), 'btnItemsInDepthDrawer');
    await expect(page.locator(repoCommonElements.productPage.lblScreenLoadEle)).toBeHidden({ timeout: global.large_wait });
    testReport.log(this.pageName, `Selected ${depth} item from depth drawer`);
  }

  // To select a size from the size drawer
  async selectSizeInDrawer(size) {
    await page.waitForLoadState('load');
    await page.customWait(repoCommonElements.productPage.lblSizeDrawer, 'lblSizeDrawer');
    await page.customClick(repoCommonElements.productPage.btnItemsInSizeDrawer.replace('X', size), 'btnItemsInSizeDrawer');
    await expect(page.locator(repoCommonElements.productPage.lblScreenLoadEle)).toBeHidden({ timeout: global.large_wait });
    testReport.log(this.pageName, `Selected size ${size} from size drawer`);
  }

  // To select a fabric from the fabric drawer
  async selectFabric(fabricName) {
    const [text1, text2, text3] = fabricName.split(' ');
    await page.waitForLoadState('load');
    await page.customWait(repoCommonElements.productPage.lblFabricDrawer, 'lblFabricDrawer');
    await page.customClick(
      repoCommonElements.productPage.btnItemsInFabricDrawer.replace('A', text1).replace('B', text2).replace('C', text3),
      'btnItemsInFabricDrawer'
    );
    await expect(page.locator(repoCommonElements.productPage.lblScreenLoadEle)).toBeHidden({ timeout: global.large_wait });
    testReport.log(this.pageName, `Selected ${fabricName} from fabric drawer`);
  }

  /**
   * @function_Name : clickDrawer
   * @Description : To Click Drawer (Depth,Size,Fabric)
   * @params : drawerName
   * @returns : None
   * */

  async clickDrawer(drawerName) {
    if (drawerName === 'Depth') {
      await page.customClick(repoCommonElements.productPage.btnDepthDrawer, 'btnDepthDrawer');
    }
    if (drawerName === 'Size') {
      await page.customClick(repoCommonElements.productPage.btnSizeDrawer, 'btnSizeDrawer');
    }
    if (drawerName === 'Fabric') {
      await page.customClick(repoCommonElements.productPage.btnFabricDrawer, 'btnFabricDrawer');
    }
    testReport.log(this.pageName, `Clicked on ${drawerName} drawer`);
  }

  /**
   * @function_Name : fillPersonalizedText,clickPersonalized
   * @Description : To fill personalized text and click personalized
   * @params : None
   * @returns : None
   * */

  async fillPersonalizedText() {
    await page.customSet(repoCommonElements.productPage.txtpersnText, 'test', 'txtpersnText');
    testReport.log(this.pageName, 'Filled Personalized');
  }

  // click personalized button
  async clickPersonalized() {
    await page.customClick(repoCommonElements.productPage.btnPersonalized, 'btnPersonalized');
    testReport.log(this.pageName, 'Clicked Personalized');
  }

  /**
   * @function_Name : clickGetFreeSwatch,closeGetFreeSwatchPopup
   * @Description : To click get free swatch button and close Get Free Swatch popup
   * @params : None
   * @returns : None
   * */

  async clickGetFreeSwatch() {
    await page.waitForLoadState('load');
    await page.customWait(repoCommonElements.productPage.btnGetFreeSwatch, 'btnGetFreeSwatch');
    await page.customClick(repoCommonElements.productPage.btnGetFreeSwatch, 'btnGetFreeSwatch');
    testReport.log(this.pageName, 'clicked on Get Free Swatch button');
  }

  // To close Get Free Swatch popup
  async closeGetFreeSwatchPopup() {
    await page.customWait(repoCommonElements.productPage.btnGetFreeSwatchPopupClose, 'btnGetFreeSwatchPopupClose');
    await page.customClick(repoCommonElements.productPage.btnGetFreeSwatchPopupClose, 'btnGetFreeSwatchPopupClose');
    testReport.log(this.pageName, 'Closed the Get Free Swatch popup');
  }

  /**
   * @function_Name : clickAvailableSoonest,selectItemFromAvailableSoonest
   * @Description : To click on See What's Available Soonest and select item from available available soonest
   * @params : itemIndex (Index of number of items retuned in SEE WHATS AVAILABLE SOONEST drawer)
   * @returns : None
   * */

  async clickAvailableSoonest() {
    await page.customWait(repoCommonElements.productPage.btnSeeWhatsAvailableSoonest, 'btnSeeWhatsAvailableSoonest');
    await page.customClick(repoCommonElements.productPage.btnSeeWhatsAvailableSoonest, 'btnSeeWhatsAvailableSoonest');
    testReport.log(this.pageName, 'clicked on SEE WHATS AVAILABLE SOONEST drawer');
  }

  // select item from Available soonest
  async selectItemFromAvailableSoonest(itemName) {
    await page.waitForLoadState('load');
    try {
      await page.customWait(repoCommonElements.productPage.btnItemFromAvailableSoonest.replace('X', itemName), 'btnItemFromAvailableSoonest');
      await page.customClick(repoCommonElements.productPage.btnItemFromAvailableSoonest.replace('X', itemName), 'btnItemFromAvailableSoonest');
      await expect(page.locator(repoCommonElements.productPage.lblScreenLoadEle)).toBeHidden({ timeout: global.large_wait });
      testReport.log(this.pageName, `Selected "${itemName}" from quick ship products`);
    } catch (error) {
      throw new Error(`Quick ship products with name "${itemName}" is not found`);
    }
  }

  /**
   * @function_Name : addInstallationService
   * @Description : To click on Add Installation Service check box
   * @params : None
   * @returns : None
   * */

  async addInstallationService() {
    const installationMsg = await page.innerText(repoCommonElements.productPage.chkInstallationService);
    testReport.log(this.pageName, `'${installationMsg}' check box is displayed`);
    await page.customClick(repoCommonElements.productPage.chkInstallationService, 'chkInstallationService');
    testReport.log(this.pageName, 'clicked on Add Installation Service check box');
  }

  /**
   * @function_Name : addToCartOnConfirmationAddOns
   * @Description : To click on Add To Cart button under Extras and Essentials of Add To cart Confirmation page
   * @params : index(nth item's add to cart button displayed on the page (eg: 0,1,2...))
   * @returns : None
   * */

  async addToCartOnConfirmationAddOns(index) {
    // index = nth item's add to cart button displayed on the page (eg: 0,1,2...)
    await page.customWait(repoCommonElements.productPage.btnAddToCartOnConfrmAddOns, 'btnAddToCartOnConfrmAddOns');
    await page.customClick(`${repoCommonElements.productPage.btnAddToCartOnConfrmAddOns}[${index}]`, 'btnAddToCartOnConfrmAddOns');
    testReport.log(this.pageName, 'Clicked ADD TO CART button under Extras and Essesntials on Add To cart Confirmation page');
  }

  /**
   * @function_Name : clickAddSwatchToCart
   * @Description : To click on Add Awatch To Cart button
   * @params : index(nth add to cart button displayed on the page)
   * @returns : None
   * */

  async clickAddSwatchToCart(index) {
    await page.customWait(repoCommonElements.productPage.btnAddToCart, 'btnAddToCart');
    await page.customClick(`${repoCommonElements.productPage.btnAddToCart}[${index}]`, 'btnAddToCart');
    testReport.log(this.pageName, 'Clicked ADD TO SWATCH CART button');
  }

  /**
   * @function_Name : addToCartOnPartOfColl
   * @Description : To Click Add to cart under Part of a Collection
   * @params : index(nth item's add to cart button displayed under Part of a Collection (eg: 0,1,2...))
   * @returns : None
   * */

  async addToCartOnPartOfColl(index) {
    // index = nth item's add to cart button displayed under Part of a Collection (eg: 0,1,2...)
    let elementVisible = false;
    while (!elementVisible) {
      await page.keyboard.press('PageDown');
      elementVisible = await page.isVisible(repoCommonElements.productPage.btnAddToCartOnPartOfColl);
    }
    await page.customClick(`${repoCommonElements.productPage.btnAddToCartOnPartOfColl}[${index}]`, 'btnAddToCartOnPartOfColl');
    testReport.log(this.pageName, 'Clicked ADD TO CART button under Part of a Collection');
  }

  // click Add To Cart button under Extras and Essentials
  async addToCartOnAddOns(index) {
    // index = nth item's add to cart button displayed on the page (eg: 0,1,2...)
    await page.customWait(repoCommonElements.productPage.btnAddToCartOnAddOns, 'btnAddToCartOnAddOns');
    await page.customClick(`${repoCommonElements.productPage.btnAddToCartOnAddOns}[${index}]`, 'btnAddToCartOnAddOns');
    testReport.log(this.pageName, 'Clicked ADD TO CART button under Extras and Essesntials');
  }
}

module.exports = { BrowseProductPage };
