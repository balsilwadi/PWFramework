const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

const reporter = new ReportUtils();

const common = new CommonUtils();

class RegistrantListPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Registrant List';

    // Locators:
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
    await page.goto(`/gift-registry/registrant-list/${registryId}`);
  };

  verifyRegistryId = async (registryId) => {
    await expect(page.locator(this.txtRegistryId)).toBeVisible();
    await common.compareActualAndExpectedText(this.txtRegistryId, registryId);
  };

  verifySkuInList = async (skuArray) => {
    skuArray.forEach(async (sku) => {
      await expect(page.locator(this.productSku.replace('X', sku))).toBeVisible();
      reporter.log(`${sku} is present in the registry list.`);
    });
  };

  getWantsCount = async (sku) => {
    let wantCount = 0;

    if (await expect(page.locator(this.productSku.replace('X', sku))).toBeVisible()) {
      const wantsHasCount = await page.locator(this.txtWantHasCountForSku.replace('X', sku)).textContent();
      wantCount = wantsHasCount.match(/[0-9]+/m);
    }
    reporter.log(' Wants Count ', wantCount);
    return wantCount;
  };

  verifyWantsCountIncrease = async (sku, count) => {
    let wantCount = 0;
    const isVisible = await expect(page.locator(this.productSku.replace('X', sku))).toBeVisible();
    if (isVisible) {
      const wantsHasCount = await page.locator(this.txtWantHasCountForSku.replace('X', sku)).textContent();
      wantCount = wantsHasCount.match(/[0-9]+/m);
    }
    const previousWantCount = count;
    if (previousWantCount < wantCount) {
      reporter.log(`Previous wants count was: ${previousWantCount} has now been increased to ${wantCount}`);
    } else {
      throw new Error(`Previous conunt was not getting increased.`);
    }
  };

  async verifyPage() {
    await expect(page.locator(this.lnkNavigationContainer)).toBeVisible();
  }

  async validateWantsCount(skuArray, count) {
    let wantCount = 0;
    skuArray.forEach(async (sku) => {
      if (page.isObjectExist(this.productSku.replace('X', sku))) {
        await expect(page.locator(this.txtWantHasCountForSku.replace('X', sku))).toBeVisible();
        let wantsHashCount = await page.locator(this.txtWantHasCountForSku.replace('X', sku)).textContent();
        wantsHashCount = wantsHashCount.split(' ');
        wantCount = parseInt(wantsHashCount[2], 2);
      }
      expect(wantCount).toBe(count);
    });
  }
}
module.exports = new RegistrantListPage();
