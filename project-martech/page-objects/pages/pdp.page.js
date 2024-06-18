const repoCommonElements = require('../elements/pdp-elements');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ProductPage {
  pageName = this.constructor.name;

  /**
   * @function_Name : validateProductPage
   * @Description : To validate product details like SKU, Sku title, Sku price
   * @params : None
   * @returns : None
   * */

  async validateProductPage() {
    // Getting Sku num and storing it in a variable
    const skuNum = await page.innerText(repoCommonElements.productPage.txtSkuNum);
    testReport.log(this.pageName, `Item SKU displayed in Product Page -> ${skuNum}`);

    // Getting Sku title and storing it in a variable
    const skuTitle = await page.innerText(repoCommonElements.productPage.txtSkuDescription);
    testReport.log(this.pageName, `Item Description from the Product page -> ${skuTitle}`);

    // Getting Sku price and storing it in a variable
    const skuPrice = await page.innerText(repoCommonElements.productPage.txtPdpSkuPriceReg);
    testReport.log(this.pageName, `Item Unit Price displayed in Product Page -> ${skuPrice}`);

    // Getting Sku price and storing it in a variable
    const availMsg = await page.innerText(repoCommonElements.productPage.txtShipIt);
    testReport.log(this.pageName, `Item Availability Status displayed in Product Page -> ${availMsg}`);
  }

  /**
   * @function_Name : addItemToFavorites
   * @Description : To add the provided item to favourites
   * @params : index(nth item's fav button displayed on the page (eg: 0,1,2...))
   * @returns : None
   * */

  async addItemToFavorites(index) {
    // index = nth item's fav button displayed on the page (eg: 0,1,2...)
    // Wait for visibility of Add to favorites button
    await page.customWait(repoCommonElements.productPage.btnAddToFavorites, 'btnAddToFavorites');
    // click on add to fav button of a specific item displayed on the page
    await page.customClick(`${repoCommonElements.productPage.btnAddToFavorites}[${index}]`, 'btnAddToFavorites');
    testReport.log(this.pageName, 'clicked on SAVE TO FAVORITES button');
    // Wait for visibility of add to My Favorites button
    await page.customWait(repoCommonElements.productPage.btnMyFavorites, 'btnMyFavorites');
    // click on add to My Favorites button
    await page.customClick(repoCommonElements.productPage.btnMyFavorites, 'btnMyFavorites');
    testReport.log(this.pageName, 'Item added to Favorites');
  }

  /**
   * @function_Name : closeAddToFavoritesPopup,removeItemFromFavorites
   * @Description : To close add to favourites pop up and remove item from the list of fabricavourites
   * @params : None
   * @returns : None
   * */

  async closeAddToFavoritesPopup() {
    await page.customWait(repoCommonElements.productPage.btnCloseFavoritesPopup, 'btnCloseFavoritesPopup');
    await page.customClick(repoCommonElements.productPage.btnCloseFavoritesPopup, 'btnCloseFavoritesPopup');
    testReport.log(this.pageName, 'Closed popup displayed after clicking on add to Favorites button');
  }

  // Remove item from favorites list
  async removeItemFromFavorites() {
    // click on favorites icon on top right of website
    await page.customClick(repoCommonElements.productPage.lnkHeaderFavorites, 'lnkHeaderFavorites');
    testReport.log(this.pageName, 'clicked on FAVORITES button in the header');
    await page.customWait(repoCommonElements.productPage.btnRemoveFavorite, 'btnRemoveFavorite');
    // click on close button on the items list
    await page.customClick(repoCommonElements.productPage.btnRemoveFavorite, 'btnRemoveFavorite');
    testReport.log(this.pageName, 'Item removed from Favorites');
  }

  /**
   * @function_Name : addItemToRegistry
   * @Description : To Add item to gift registry
   * @params : index(nth item's add to registry button displayed on the page (eg: 0,1,2...))
   * @returns : None
   * */

  async addItemToRegistry(index) {
    // index = nth item's add to registry button displayed on the page (eg: 0,1,2...)
    await page.waitForLoadState('domcontentloaded');
    await page.customClick(`${repoCommonElements.productPage.btnAddToRegistry}[${index}]`, 'btnAddToRegistry');
    if (await page.locator(repoCommonElements.productPage.lblAddToRegPopup).isVisible()) {
      await page.customClick(repoCommonElements.productPage.btnRegistryAdd, 'btnRegistryAdd');
    }
    testReport.log(this.pageName, 'Item is added to Registry');
  }

  /**
   * @function_Name : clickContinueShoppingReg
   * @Description : To Close popup displayed after adding item to registry
   * @params : None
   * @returns : None
   * */

  async clickContinueShoppingReg() {
    await page.customWait(repoCommonElements.productPage.btnContinueShoppingReg, 'btnContinueShoppingReg');
    await page.customClick(repoCommonElements.productPage.btnContinueShoppingReg, 'btnContinueShoppingReg');
    testReport.log(this.pageName, 'Clicked CONTINUE SHOPPING button');
  }

  /**
   * @function_Name : clickViewReg
   * @Description : To click view registry after adding item to registry
   * @params : None
   * @returns : None
   * */

  async clickViewReg() {
    await page.customWait(repoCommonElements.productPage.btnViewRegistry, 'btnViewRegistry');
    await page.customClick(repoCommonElements.productPage.btnViewRegistry, 'btnViewRegistry');
    testReport.log(this.pageName, 'Clicked VIEW REGISTRY button');
  }

  /**
   * @function_Name : clickAddToCart
   * @Description : To add item to the cart
   * @params : index(nth item's add to cart button displayed on the page (eg: 0,1,2...))
   * @returns : None
   * */

  async clickAddToCart(index) {
    // index = nth item's add to cart button displayed on the page (eg: 0,1,2...)
    await page.customWait(repoCommonElements.productPage.btnAddToCart, 'btnAddToCart');
    await page.customClick(`${repoCommonElements.productPage.btnAddToCart}[${index}]`, 'btnAddToCart');
    testReport.log(this.pageName, 'Clicked ADD TO CART button');
  }

  /**
   * @function_Name : clickAddToCart
   * @Description : To Add  item to cart when item name is passed
   * @params : itemName
   * @returns : None
   * */

  async clickAddToCartWithItemName(itemName) {
    const addToCartLocator = repoCommonElements.productPage.btnAddToCartWithItemName.replace('X', itemName);
    try {
      await page.customWait(addToCartLocator, 'btnAddToCartWithItemName');
      await page.customClick(addToCartLocator, 'btnAddToCartWithItemName');
      testReport.log(this.pageName, `Clicked ADD TO CART button for the item "${itemName}"`);
    } catch (error) {
      throw new Error(`Item with name "${itemName}" is not found`);
    }
  }

  /**
   * @function_Name : clickMTOPopupAddToCart
   * @Description : To Click on 'Accept Terms and Add To Cart' button
   * @params : None
   * @returns : None
   * */

  async clickMTOPopupAddToCart() {
    if (
      !(
        (await page
          .locator(repoCommonElements.productPage.btnAddToCartOnMTOPopup)
          .waitFor({ timeout: global.small_wait })
          .catch((e) => e)) instanceof Error
      )
    ) {
      await page.customClick(repoCommonElements.productPage.btnAddToCartOnMTOPopup, 'btnAddToCartOnMTOPopup');
      testReport.log(this.pageName, 'Clicked on ACCEPT TERMS AND ADD TO CART button');
    }
  }

  /**
   * @function_Name : clickContinueShoppingCart,clickCheckoutNow
   * @Description : To Click on continue shopping button and to click check out now button on cart flyout
   * @params : None
   * @returns : None
   * */

  async clickContinueShoppingCart() {
    await page.customWait(repoCommonElements.productPage.btnContinueShoppingCart, 'btnContinueShoppingCart');
    await page.customClick(repoCommonElements.productPage.btnContinueShoppingCart, 'btnContinueShoppingCart');
    testReport.log(this.pageName, 'Clicked CONTINUE SHOPPING button');
  }

  // Click check out now button on cart flyout
  async clickCheckoutNow() {
    await page.customWait(repoCommonElements.productPage.btnViewCartAndCheckout, 'btnViewCartAndCheckout');
    await Promise.all([page.waitForNavigation(), page.customClick(repoCommonElements.productPage.btnViewCartAndCheckout, 'btnViewCartAndCheckout')]);
    testReport.log(this.pageName, 'Clicked CHECKOUT NOW button from Cart Flyout');
  }
}

module.exports = { ProductPage };
