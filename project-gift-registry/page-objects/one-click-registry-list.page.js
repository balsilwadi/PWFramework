const { CommonUtils } = require('../../support/utils/common-utils');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();

class OneClickRegistryListPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'One Click Registry page';
    this.txtOneclickRegistryBundleMobile = '(//*[@class="brand__slider"])[X]';
    this.txtOneclickRegistryBundle = '(//*[@class="card-grid__item"])[X]';
    this.productContainer = '(//*[@class="card product-card"])[X]';
    this.countOfProductContainer = '(//*[@class="card product-card"])';
    this.iconAddtoRegistry = '(//*[@class="card product-card"]//*[@value="addToRegistry"])[X]';
    this.btnAddAll = '(//*[contains(@class,"registry-add-all-container")]/button[@value="addToRegistry"])[1]';
  }

  goto = async () => {
    await page.goto(`/wedding-gift-registry/one-click-registry/`);
  };

  async clickOnFirstBundle(productIndex = 1) {
    if (common.verifyIsMobile()) {
      await page.locator(this.txtOneclickRegistryBundleMobile.replace('X', productIndex)).click();
    } else {
      await page.locator(this.txtOneclickRegistryBundle.replace('X', productIndex)).click();
    }
  }

  async addFirstProductfromBundle(productIndex = 1) {
    await page.locator(this.iconAddtoRegistry.replace('X', productIndex)).click();
    const sku = await page.locator(this.productContainer.replace('X', productIndex)).getAttribute('id');
    return sku;
  }

  async allProductfromBundle() {
    await page
      .locator(this.btnAddAll)
      .waitFor({ timeout: 1000 })
      .catch((errNotVisible) => errNotVisible);
    const numberOfProducts = await page.locator(this.countOfProductContainer).count();
    const sku = [];
    for (let i = 1; i <= numberOfProducts; i++) {
      // eslint-disable-next-line no-await-in-loop
      sku.push(await page.locator(this.productContainer.replace('X', i)).getAttribute('id'));
    }
    await page.locator(this.btnAddAll).click();
    return sku;
  }
}

module.exports = new OneClickRegistryListPage();
