const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../support/utils/report-utils');
const SubObject = require('../../project-shared/page-objects/pages/sub-object');

const testReport = new ReportUtils();

class PLPAddToRegistry extends SubObject {
  constructor() {
    super();
    this.iconAddToRegistryfromSEO = '(//*[@value="addToRegistry"])[X]';
    this.iconAddToRegistry = '(//*[@class="product-colorbar-container"]/ancestor::li//*[@class="plp-registry-btn-container"])[X]';
    this.txtProductcontainer = '(//*[@class="card product-card"])[X]';
    this.leftPopUpcontainer = '//*[@class="registry-quick-add slide-left"]//*[@id="popup-close"]';
    this.btnAddToRegistry = '//*[@class="registry-quick-add-footer"]/button[@value="addToRegistry"]';
    this.txtAddToRegistryConfirmation = '//*[@class="conf-item-count text-lg-bold"]/text()';
    this.popupAddToRegistryConfirmation = '//*[@id="confirmationLayer"]';
    this.liProductCard = '(//*[@class="product-colorbar-container"]/ancestor::li)[X]';
    this.ProductCard = '(//li[@class="card product-card"])[X]';
    this.youMayAlsoWantCarousel = '//*[@data-name="You May Also Want add registry"]';
    this.txtProductDescription = '(//*[@class="hover-item-detail"]/h3)[1]';
    this.btnAddfromYouMayalsowant = '(//*[@data-id="addToCartButton"])[1]';
    this.txtAddedSuccessmessage = '//*[@class="success added-message"]';
    this.txtProductContainer = '(//*[@class="showcase-item-link"])[X]';
    this.pageName = 'AddToRegistry';
  }

  async readSku(productIndex = 2) {
    const liProductCardElement = page.locator(this.liProductCard.replace('X', productIndex));
    const sku = await liProductCardElement.getAttribute('id');
    return sku;
  }

  async readSkuFromSEO(productIndex = 1) {
    const liProductCardElement = page.locator(this.ProductCard.replace('X', productIndex));
    const sku = await liProductCardElement.getAttribute('id');
    return sku;
  }

  /**
   * @author: rajaduraip
   * @function_Name : addProductToRegistry
   * @Description : This function is used to add product to Registry
   * @params : None
   * @returns : None
   * */
  async addProductToRegistry(productIndex = 2) {
    await page.locator(this.iconAddToRegistry.replace('X', productIndex)).click();

    if (
      !(
        (await page
          .locator(this.leftPopUpcontainer)
          .waitFor({ timeout: 10000 })
          .catch((errNotVisible) => errNotVisible)) instanceof Error
      )
    ) {
      await page.waitForLoadState('domcontentloaded');
      if (
        !(
          (await page
            .locator(this.btnAddToRegistry)
            .waitFor({ timeout: 40000 })
            .catch((errNotVisible) => errNotVisible)) instanceof Error
        )
      ) {
        await page.locator(this.btnAddToRegistry).scrollIntoViewIfNeeded();
        await expect(page.locator(this.btnAddToRegistry)).toBeVisible();
        await page.locator(this.btnAddToRegistry).click();
      } else {
        throw new Error(`Add to Registry button was not displayed.`);
      }
    }
    testReport.log(this.pageName, 'Clicked ADD TO REGISTRY button');
  }

  async addProductToRegistryfromSEO(productIndex = 1) {
    await page.locator(this.iconAddToRegistryfromSEO.replace('X', productIndex)).click();

    if (
      !(
        (await page
          .locator(this.leftPopUpcontainer)
          .waitFor({ timeout: 10000 })
          .catch((errNotVisible) => errNotVisible)) instanceof Error
      )
    ) {
      await page.waitForLoadState('domcontentloaded');
      if (
        !(
          (await page
            .locator(this.btnAddToRegistry)
            .waitFor({ timeout: 40000 })
            .catch((errNotVisible) => errNotVisible)) instanceof Error
        )
      ) {
        await page.locator(this.btnAddToRegistry).scrollIntoViewIfNeeded();
        await expect(page.locator(this.btnAddToRegistry)).toBeVisible();
        await page.locator(this.btnAddToRegistry).click();
      } else {
        throw new Error(`Add to Registry button was not displayed.`);
      }
    }
    testReport.log(this.pageName, 'Clicked ADD TO REGISTRY button');
  }

  async verifyAddtoRegistryConfirmation() {
    const registryDrawerCount = await page.locator(this.txtAddToRegistryConfirmation).count();
    if (registryDrawerCount === 1) {
      expect(page.locator(this.txtAddToRegistryConfirmation).toBeVisible());
      await expect(page.locator(this.txtAddToRegistryConfirmation)).toBeVisible();
      const registryMessage = await page.locator(this.txtAddToRegistryConfirmation).textContent();
      testReport.log(this.pageName, registryMessage);
    } else {
      expect(page.locator(this.popupAddToRegistryConfirmation).toBeVisible());
      const registryPopupCount = await page.locator(this.popupAddToRegistryConfirmation).count();

      if (registryPopupCount === 1) {
        await expect(page.locator(this.popupAddToRegistryConfirmation)).toBeVisible();
        const registryMessage = await page.locator(this.popupAddToRegistryConfirmation).textContent();
        testReport.log(this.pageName, registryMessage);
      } else {
        throw new Error(`Product was not added to registry`);
      }
    }
  }

  async clickAddButton() {
    await page
      .locator(this.youMayAlsoWantCarousel)
      .waitFor({ timeout: 2000 })
      .catch((errNotVisible) => errNotVisible);
    await page.locator(this.btnAddfromYouMayalsowant).click();
    testReport.log(this.pageName, 'Product Added to registry.');
  }

  async readSkuFromCarousel(productIndex = 1) {
    let prodLink = await page.locator(this.txtProductContainer.replace('X', productIndex)).getAttribute('href');
    prodLink = prodLink.split('/s');
    const sku = prodLink[prodLink.length - 1];
    return sku;
  }

  async verifyItemAddedMessage() {
    await page
      .locator(this.txtAddedSuccessmessage)
      .waitFor({ timeout: 2000 })
      .catch((errNotVisible) => errNotVisible);
    const addedConfirmation = await page.locator(this.txtAddedSuccessmessage).textContent();
    testReport.log(this.pageName, addedConfirmation);
  }
}

module.exports = new PLPAddToRegistry();
