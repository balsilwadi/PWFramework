const { expect } = require('@playwright/test');
const elements = require('../../elements/elements');
const testData = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const testReport = new ReportUtils();
const cp = 'FavoritesPage';
const env = require('../../../../support/env/env');

class FavoritesPage extends PageObject {
  pageName = this.constructor.name;

  /**
   * @author: sreerag
   * @function_Name : validateEmptyFavoritesPage
   * @Description :  validate favorites page without items. If favorites page have items then it will call removeItems funtion andremove all items from Favorites page then validate.
   * @params : none
   * @returns : None
   * */
  async validateEmptyFavoritesPage() {
    await page.waitForLoadState('domcontentloaded');

    let itemCount;

    if (common.verifyIsMobile) {
      if (await page.locator(elements.myFavoritesPage.arrayFavoriteItemElements).nth(0).isVisible()) {
        itemCount = 1;
      } else {
        itemCount = 0;
      }
    } else {
      itemCount = await page.innerText(elements.myFavoritesPage.lblFavoriteItemCount);
    }

    if (itemCount === '0') {
      if (await page.isVisible(elements.myFavoritesPage.msgEmptyFavoritesPage)) {
        await expect(page.locator(elements.myFavoritesPage.msgEmptyFavoritesPage1)).toBeVisible();
        testReport.log(cp, 'Guest View');
      } else {
        await page.reload();
        await expect(page.locator(elements.myFavoritesPage.lblMyFavoritesTitle)).toBeVisible({ timeout: 60000 });
        await expect(page.locator(elements.myFavoritesPage.lblMyFavoritesTitle)).toHaveText(testData.myFavoritesPage.title, { ignoreCase: true });
        if (env.EXEC_SITE.toLowerCase().includes('cb2')) {
          await expect(page.locator(elements.myFavoritesPage.msgNoItemCb2)).toHaveText(testData.myFavoritesPage.Cb2NoItemMessage);
        } else {
          await expect(page.locator(elements.myFavoritesPage.imgNoItem)).toBeVisible();
        }

        testReport.log(cp, 'Favorite with 0 item');
      }
    } else {
      testReport.log(cp, 'Favorites page have items');
      await this.removeItems();
      testReport.log(cp, 'Removed all items from favorites');
    }
  }

  /**
   * @author: sreerag
   * @function_Name : validateFavoritesPage
   * @Description :  validate favorites page with  items
   * @params : itemInfo --> JSON array with item details
   * @returns : None
   * */
  async validateFavoritesPage() {
    // verify the count in the favorites Page
    await expect(page.locator('ul[class*="line-item-list"] li')).toHaveCount(1);
  }

  /**
   * @author: sreerag
   * @function_Name : signOutFavoritePage
   * @Description :  Clicks on sign out link in favorites page
   * @params : None
   * @returns : None
   * */
  async signOutFavoritePage() {
    if (common.verifyIsMobile()) {
      await page.locator(elements.homePage.btnAccountIconMobile).click();
      await page.locator('button[class*="account-flyout-menu-button"]').click();
    } else {
      await expect(page.locator(elements.myFavoritesPage.lnkSignOut)).toBeVisible({ timeout: 60000 });
      await page.locator(elements.myFavoritesPage.lnkSignOut).click();
    }
    testReport.log(cp, 'Customer signed out from account');
  }

  /**
   * @author: krishna
   * @function_Name : clickOnFavorites
   * @Description :  Clicks on sign out link in favorites page
   * @params : None
   * @returns : None
   * */
  async clickOnFavorites() {
    await page.locator(elements.myFavoritesPage.btnFavorites).click();
    testReport.log(this.pageName, 'Clicked on Add to Favorites button');
  }

  /**
   * @author: sreerag
   * @function_Name : removeItems
   * @Description :  remove items from favorites list
   * @params : None
   * @returns : None
   * */
  async removeItems() {
    try {
      await expect(page.locator(elements.myFavoritesPage.lblMyFavoritesTitle)).toBeVisible({ timeout: 60000 });
    } catch (error) {
      // There is an issue where it thinks there are favorites and when there are not.
      // This will log the findings and move onto the next method (assuming there are not items favorited)
      testReport.log('Unable to find lblMyFavoritesTitle. Exiting removeItems method.');
      return;
    }

    // eslint-disable-next-line playwright/no-element-handle
    const arrayRemoveButton = await page.$$(elements.myFavoritesPage.btnRemoveItem);

    await Promise.all(
      arrayRemoveButton.map(async (ele, i) => {
        await page.locator(elements.myFavoritesPage.btnRemoveItem).nth(i).dispatchEvent('click');
        testReport.log(cp, `${i + 1} Item removed`);
      })
    );

    await expect(page.locator(elements.myFavoritesPage.btnRemoveItem)).toBeHidden({ timeout: 60000 });
  }

  async removeSkuFromFavorites(sku) {
    const deleteButtonSelector = `.js-delete-item[data-sku="${sku}"]`;

    await expect(page.locator(deleteButtonSelector)).toBeVisible({ timeout: 60000 });
    await page.click(deleteButtonSelector);
    testReport.log(this.pageName, `Unfavoriting sku ${sku}`);

    // Wait for a specified duration (e.g., 5 seconds) to allow time for deletion
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(5000);
    testReport.log(this.pageName, `Sku ${sku} has been unfavorited`);
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnGeoLocationPopups
   * @Description :  close geo location popup in canada
   * @params : None
   * @returns : None
   * */
  async clickOnGeoLocationPopup() {
    if (env.EXEC_SITE.toLowerCase().endsWith('can')) {
      testReport.log(this.pageName, 'Click on Continue to Canadian Site ');
      await page.click(elements.myFavoritesPage.btnContinueToCanadaSite);
    }
  }

  /**
   * @author: krishna
   * @function_Name : navigatesToMyAccountPage
   * @Description :  function is used to navigates to my account page for mobile
   * @params : None
   * @returns : None
   * */
  async navigatesToMyAccountPage() {
    if (common.verifyIsMobile()) {
      await page.locator(elements.homePage.btnAccountIconMobile).click();
      await page.locator(elements.homePage.lnkMyAccount).click();
      testReport.log(this.pageName, 'Clicked on My Account link');
    } else await page.locator(elements.homePage.btnAccountIconMobile).click();
    await page.waitForLoadState('load', { timeout: 60000 });
  }
}
module.exports = { FavoritesPage };
