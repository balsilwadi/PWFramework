/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const testReport = new ReportUtils();

class SeoGeneratedPage extends PageObject {
  pageName = this.constructor.name;

  priceArray = [];

  sortedPriceArray = [];

  /**
   * @author: vtharakan
   * @function_Name : navigateToSeoGeneratedHomePage
   * @Description : Verify user is able to click on the Aplhabets and navigate to the respective page list
   * @params : None
   * @returns : None
   * */
  async navigateToSeoGeneratedHomePage() {
    testReport.log(this.pageName, 'Navigate to SEO Generated Homepage');
    await page.goto(`${env.BASE_URL}/search`, { timeout: 60000 });
    await page.waitForSelector(el.seoGeneratedPage.lblSeoPageTitle, { waitFor: 'visible' });
    expect(await page.textContent(el.seoGeneratedPage.lblSeoPageTitle)).not.toBeNull();
    testReport.log(this.pageName, 'Successfully navigated to SEO Generated page');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnGPLinkAndVerify
   * @Description : Verify user is able to click on the Aplhabets and navigate to the respective page list
   * @params : None
   * @returns : None
   * */
  async clickOnGPLinkAndVerify(gpLinkHomePage) {
    testReport.log(this.pageName, 'Click on Generated Page link from SEO Generated Homepage');
    await page.getByRole('link', { name: gpLinkHomePage, exact: true }).click();
    testReport.log(this.pageName, `Successfully clicked on the expected ${gpLinkHomePage} Generated Page link from the page`);
    page.locator(el.seoGeneratedPage.lnkSeoPage);
  }

  /**
   * @author: vtharakan
   * @function_Name : navigateToSeoGeneratedPage
   * @Description : Verify user is able to navigate to SEO generated page successfully
   * @params : None
   * @returns : None
   * */
  // async navigateToSeoGeneratedPage() {
  //   testReport.log(this.pageName, 'Navigate to SEO Generated page');
  //   await page.goto(`${global.baseURL}/search`);
  //   await page.waitForSelector(el.seoGeneratedPage.lblSeoPageTitle, { waitFor: 'visible' });
  //   expect(await page.textContent(el.seoGeneratedPage.lblSeoPageTitle)).not.toBeNull();
  //   testReport.log(this.pageName, 'Successfully navigated to SEO Generated page');
  // }

  /**
   * @author: vtharakan
   * @function_Name : clickOnSEOPageLink
   * @Description : This method is used to click on the SEO page link displayed in the SEO homepage
   * @params : None
   * @returns : None
   * */
  async clickOnSEOPageLink(seoPageLink) {
    testReport.log(this.pageName, 'Click on the SEO page link');
    await page.getByRole('link', { name: seoPageLink, exact: true }).click();
    await page.waitForSelector(el.seoGeneratedPage.lblSeoPlpHeader, { waitFor: 'visible' });
    expect(await page.textContent(el.seoGeneratedPage.lblSeoPlpHeader)).not.toBeNull();
    testReport.log(this.pageName, 'SEO Plp header is displayed');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFilterIsDisplayed
   * @Description : This method is used to verify the filter section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyFilterIsDisplayed() {
    testReport.log(this.pageName, 'Verify Filter is displayed in the page');
    await page.waitForLoadState('load');
    await page.waitForSelector(el.seoGeneratedPage.btnFilter, { waitFor: 'visible' });
    await page.locator(el.seoGeneratedPage.btnFilter).click();
    if (common.verifyIsMobile()) {
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lblHideFilter, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.btnFilter).click();
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyProductCountIsDisplayed
   * @Description : This method is used to verify the product count is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyProductCountIsDisplayed() {
    testReport.log(this.pageName, 'Verify product count is displayed in the page');
    await page.waitForSelector(el.seoGeneratedPage.lblTotalProductCount, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySortByDropdownIsDisplayed
   * @Description : This method is used to verify sort section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifySortByDropdownIsDisplayed() {
    testReport.log(this.pageName, 'Verify Sort by is displayed in the page');
    if (common.verifyIsMobile()) {
      await page.locator(el.seoGeneratedPage.btnFilter).click();
      await page.waitForSelector(el.seoGeneratedPage.btnMobileSortByDropDown, { waitFor: 'visible' });
      expect((await page.textContent(el.seoGeneratedPage.btnMobileSortByDropDown)) === 'Most Relevant').toBeTruthy();
      testReport.log(this.pageName, 'The default sort option Most Relevant is displayed in the page');
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.btnSortByDropDown, { waitFor: 'visible' });
      expect((await page.textContent(el.seoGeneratedPage.btnSortByDropDown)) === 'Most Relevant').toBeTruthy();
      testReport.log(this.pageName, 'The default sort option Most Relevant is displayed in the page');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRelatedCategoriesSectionIsDisplayed
   * @Description : This method is used to verify RelatedCategories section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyRelatedCategoriesSectionIsDisplayed() {
    testReport.log(this.pageName, 'Verify Related Categories is displayed in the page');
    await page.waitForSelector(el.seoGeneratedPage.lblRelatedCategories, { waitFor: 'visible' });
    if ((await page.locator(el.seoGeneratedPage.lnkRelatedCategoriesCount).count()) > 0) {
      testReport.log(this.pageName, 'Related Categories section is not empty');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySEOCopyIsDisplayed
   * @Description : This method is used to verify SEO copy section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifySEOCopyIsDisplayed() {
    testReport.log(this.pageName, 'Verify SEO copy is displayed in the page');
    await page.waitForSelector(el.seoGeneratedPage.seoContainer, { waitFor: 'visible' });
    // expect(await page.textContent(el.seoGeneratedPage.lblSeoCopyHeader)).not.toBeNull();
    expect(await page.textContent(el.seoGeneratedPage.lblSeoCopy)).not.toBeNull();
    testReport.log(this.pageName, 'SEO section is not empty');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnSortByDropdown
   * @Description : This method is used to click on the Sort by dropdown
   * @params : None
   * @returns : None
   * */
  async clickOnSortByDropdown() {
    testReport.log(this.pageName, 'Click on the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.locator(el.seoGeneratedPage.btnFilter).click();
      await page.waitForSelector(el.seoGeneratedPage.btnMobileSortByDropDown, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.btnMobileSortByDropDown).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.btnSortByDropDown, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.btnSortByDropDown).click();
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : selectPriceLowToHigh
   * @Description : This method is used to select price low to high
   * @params : None
   * @returns : None
   * */
  async selectPriceLowToHigh() {
    testReport.log(this.pageName, 'Select Price Low to High option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.seoGeneratedPage.lnkMobilePriceLowToHigh, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkMobilePriceLowToHigh).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lnkPriceLowToHigh, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkPriceLowToHigh).click();
    }
    await page.waitForLoadState('load');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyPriceIsSortedFromLowToHigh
   * @Description : This method is used to verify Price low to high is displaying in ascending order
   * @params : None
   * @returns : None
   * */
  async verifyPriceIsSortedFromLowToHigh() {
    testReport.log(this.page, 'Verify Price is displayed from Low To High');
    const priceElementCount = await page.locator(el.seoGeneratedPage.lblProductsCount).count();
    const pricePromises = [];

    await common.forcedWait(5000);
    for (let i = 0; i < priceElementCount; i++) {
      // const resultElement = this.page.locator(el.seoGeneratedPage.lblProductsCount).nth(i);
      const priceElement = page.locator('//div[contains(@class, "product-detail-description")]//div[3]').nth(i);
      pricePromises.push(
        (async () => {
          const priceElementText = await priceElement.textContent();
          let priceText = await (
            priceElementText.includes('Clearance') || priceElementText.includes('Sale')
              ? priceElement.locator(el.seoGeneratedPage.lblSalePrice)
              : priceElement.locator(el.seoGeneratedPage.lblRegularPrice)
          ).textContent();
          priceText = priceText.replace(/(Clearance \$|Sale \$|\$)/, '');
          return parseFloat(priceText.replace(',', '.'));
        })()
      );
    }

    const prices = await Promise.all(pricePromises);
    // check if array is sorted
    const sortedarr = [...prices].sort((a, b) => a - b);
    testReport.log(this.pageName, `Actual Price before sorting : ${prices}`);
    testReport.log(this.pageName, `Price after sorting : ${sortedarr}`);
    // comparing the price
    expect(prices.join(',')).toEqual(sortedarr.join(','));
    testReport.log(this.pageName, 'Price Low to High : displays in the ascending order');
  }

  /**
   * @author: vtharakan
   * @function_Name : selectPriceHighToLow
   * @Description : This method is used to select price high to low
   * @params : None
   * @returns : None
   * */
  async selectPriceHighToLow() {
    testReport.log(this.pageName, 'Select Price High to Low option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.seoGeneratedPage.lnkMobilePriceHighToLow, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkMobilePriceHighToLow).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lnkPriceHighToLow, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkPriceHighToLow).click();
      await page.waitForLoadState('load');
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyPriceIsSortedFromHighToLow
   * @Description : This method is used to verify Price high to low is displaying in descending order
   * @params : None
   * @returns : None
   * */
  async verifyPriceIsSortedFromHighToLow() {
    testReport.log(this.page, 'Verify Price is displayed from High To Low');
    const priceElementCount = await page.locator(el.seoGeneratedPage.lblProductsCount).count();
    const pricePromises = [];

    await common.forcedWait(5000);
    for (let i = 0; i < priceElementCount; i++) {
      const priceElement = page.locator('//div[contains(@class, "product-detail-description")]//div[3]').nth(i);
      pricePromises.push(
        (async () => {
          const priceElementText = await priceElement.textContent();
          let priceText = await (
            priceElementText.includes('Clearance') || priceElementText.includes('Sale')
              ? priceElement.locator(el.seoGeneratedPage.lblSalePrice)
              : priceElement.locator(el.seoGeneratedPage.lblRegularPrice)
          ).textContent();
          priceText = priceText.replace(/(Clearance \$|Sale \$|\$)/, '');
          return parseFloat(priceText.replace(',', '.'));
        })()
      );
    }

    const prices = await Promise.all(pricePromises);
    // check if array is sorted from high to low
    const sortedarr = [...prices].sort((a, b) => b - a);
    testReport.log(this.pageName, `Actual Price before sorting : ${prices}`);
    testReport.log(this.pageName, `Price after sorting : ${sortedarr}`);
    // comparing the price
    expect(prices.join(',')).toEqual(sortedarr.join(','));
    testReport.log(this.pageName, 'Price High to Low : displays in the descending order');
  }

  /**
   * @author: vtharakan
   * @function_Name : selectTopRated
   * @Description : This method is used to select Top rated option
   * @params : None
   * @returns : None
   * */
  async selectTopRated() {
    testReport.log(this.pageName, 'Select Top Rated option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.seoGeneratedPage.lnkMobileTopRated, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkMobileTopRated).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lnkTopRated, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkTopRated).click();
      await page.waitForLoadState('load');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRatingIsDisplayedFromHighToLow
   * @Description : This method is used to verify Rating is displaying in descending order
   * @params : None
   * @returns : None
   * */
  async verifyRatingIsDisplayedFromHighToLow() {
    testReport.log(this.pageName, 'Verify Top Rated is displayed from High to Low');
    const ratingElementCount = await page.locator(el.seoGeneratedPage.lblRating).count();
    const ratingArray = [];
    for (let i = 0; i < ratingElementCount; i++) {
      const ratingValue = page.locator(el.seoGeneratedPage.lblRating).nth(i).getAttribute('title');
      const actualRatingValue = ratingValue.replace('out of 5 stars', '');
      ratingArray.push(actualRatingValue);
    }
    // check if array is sorted
    const sortedarr = [...ratingArray].sort().reverse();
    // comparing the price
    expect(ratingArray.join(',')).toEqual(sortedarr.join(','));
    testReport.log(this.pageName, 'Top Rated : displays in the descending order (Highest to Lowest)');
  }

  /**
   * @author: vtharakan
   * @function_Name : selectNewOption
   * @Description : This method is used to select New option
   * @params : None
   * @returns : None
   * */
  async selectNewOption() {
    testReport.log(this.pageName, 'Select New option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.seoGeneratedPage.lnkMobileNew, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkMobileNew).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lnkNew, { waitFor: 'visible' });
      await page.locator(el.seoGeneratedPage.lnkNew).click();
    }
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyNewOption
   * @Description : This method is used to verify Rating is displaying in descending order
   * @params : None
   * @returns : None
   * */
  async verifyNewOption() {
    testReport.log(this.pageName, 'Verify New Arrival products are present in the page');
    await page.waitForLoadState('load');
    await page.waitForSelector(el.seoGeneratedPage.lblNew, { waitFor: 'visible' });
    // const newCount = await page.locator(el.seoGeneratedPage.lblNew).count();
    if ((await page.locator(el.seoGeneratedPage.lblNew).count()) > 0) {
      testReport.log(this.pageName, 'New Arrival products are present in the page');
    }
  }
}

module.exports = { SeoGeneratedPage };
