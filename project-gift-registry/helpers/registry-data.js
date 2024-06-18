const { expect } = require('@playwright/test');

const { CommonUtils } = require('../../support/utils/common-utils');
const userWithoutItemFile = require('../data/users-without-items.json');
const env = require('../../support/env/env');

const common = new CommonUtils();

class RegistryDataHelper {
  constructor() {
    this.pageName = 'RegistrydataHelper';
    this.txtProductContainer = '//*[contains(@data-testid,"registry-card-item-container")]//*[@class="list-card-image-container"]';
    this.txtProduct = '(//*[contains(@data-testid,"registry-card-item-container")]//*[@class="list-card-overlay "])[1]';
    this.txtManageItem = '//*[@id="popup-sticky-close"]';
    this.lnkRemoveItemRegistry = '//*[@data-testid="save-edit-remove-from-registry"]';
  }

  async getEmptyRegistryData() {
    const listOfUsers = userWithoutItemFile.filter((element) => element.type === 'emptyRegistry').filter((element) => element.brand === env.EXEC_SITE);
    const index = await common.getRandomInt(0, listOfUsers.length - 1);
    const emptyRegistryData = listOfUsers[index];
    return emptyRegistryData;
  }

  async cleanUpTheRegistry() {
    const count = await page.locator(this.txtProductContainer).count();
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        //  since its the async UI action and eslint is not allowing await inside for lopp we are disabling eslint inside of the forloop
        // eslint-disable-next-line no-await-in-loop
        await page.locator(this.txtProduct).click();
        // eslint-disable-next-line no-await-in-loop
        await expect(page.locator(this.txtProduct)).toBeVisible();
        // eslint-disable-next-line no-await-in-loop
        await page.locator(this.txtManageItem).isVisible({ delay: 5000 });
        // eslint-disable-next-line no-await-in-loop
        await page.locator(this.lnkRemoveItemRegistry).click();
        // eslint-disable-next-line no-await-in-loop
        await expect(page.locator(this.txtManageItem)).toBeHidden();
      }
    }
  }
}

module.exports = new RegistryDataHelper();
