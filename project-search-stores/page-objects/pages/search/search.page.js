/* eslint-disable playwright/no-wait-for-selector */
const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
// const td = require('../../data-files/test-data');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');
const env = require('../../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

const arrFiltersSelcted = [];
class SearchPLP extends PageObject {
  pageName = this.constructor.name;

  arrTopFacets = [];

  /**
   * @author: vtharakan
   * @function_Name : searchWithKeyword
   * @Description : Verify user is able to search with keyword
   * @params : expectedSearchterm
   * @returns : None
   * */
  async searchWithKeyword(expectedSearchterm) {
    testReport.log(this.pageName, `Search with keyword: ${expectedSearchterm}`);
    await page.waitForSelector(el.searchResultsPage.txtSearchInputBox, { waitFor: 'visible' });
    await page.click(el.searchResultsPage.txtSearchInputBox);
    await page.waitForLoadState('load');
    await page.fill(el.searchResultsPage.txtSearchInputBox, expectedSearchterm, { delay: 100 });
    await page.locator(el.searchResultsPage.btnSearchSubmit).click();
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyHeaderTag
   * @Description : Verify h1 header is displayed in search PLP
   * @params : expectedSearchterm
   * @returns : None
   * */
  async verifyHeaderTag(expectedSearchterm) {
    testReport.log(this.pageName, `Verify the header ${expectedSearchterm} is displayed in Search PLP`);
    await page.waitForSelector(el.searchResultsPage.lblH1PlpHeader, { waitFor: 'visible' });
    const actualSearchTerm = el.searchResultsPage.lblH1PlpHeader;
    const url = page.url();
    if (url.includes('/search_partial') || url.includes('/KidsSearchPartial')) {
      let lblH1HeaderTag = await page.locator(el.searchResultsPage.lblH1PlpHeader).innerText();
      lblH1HeaderTag = lblH1HeaderTag.slice(lblH1HeaderTag.indexOf('“') + 1, lblH1HeaderTag.lastIndexOf('”'));
      expect(expectedSearchterm.toLowerCase()).toContain(lblH1HeaderTag.toLowerCase());
    } else {
      await common.compareActualAndExpectedText(actualSearchTerm, expectedSearchterm);
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnFirstProductFromSearchPLP
   * @Description : Click on the first product from search PLP
   * @params : None
   * @returns : None
   * */
  async clickOnFirstProductFromSearchPLP() {
    testReport.log(this.pageName, 'Click on the first product from Search PLP');
    await page.waitForSelector(el.searchResultsPage.lnkFirstProduct, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lnkFirstProduct).scrollIntoViewIfNeeded();
    // eslint-disable-next-line playwright/no-force-option
    await page.click(el.searchResultsPage.lnkFirstProduct, { force: true });
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Verify user is successfully navigated to PDP');

    if (common.verifyIsMobile()) {
      if (await page.waitForSelector(el.searchResultsPage.lblSKUMobile, { waitFor: 'visible' })) {
        testReport.log(this.pageName, 'User navigated to PDP successfully');
      } else {
        testReport.log(this.pageName, 'PDP is not loaded successfully');
      }
    } else if (await page.waitForSelector(el.searchResultsPage.lblSKU, { waitFor: 'visible' })) {
      testReport.log(this.pageName, 'User navigated to PDP successfully');
    } else {
      testReport.log(this.pageName, 'PDP is not loaded successfully');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySearchUrl
   * @Description : Verify the Search PLP url contains the value '/search?query='
   * @params : None
   * @returns : None
   * */
  async verifySearchUrl() {
    testReport.log(this.pageName, "Verify the Search PLP url contains '/search' keyword");
    const url = page.url();
    expect(url).toContain('/search?query=');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnBrowserBackButton
   * @Description : This method is used to click on the browser back button
   * @params : None
   * @returns : None
   * */
  async clickOnBrowserBackButton() {
    testReport.log(this.pageName, 'Click on browser back button');
    await page.goBack();
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnFilterButton
   * @Description : This method is used to click on the Filter button
   * @params : None
   * @returns : None
   * */
  async clickOnFilterButton() {
    testReport.log(this.pageName, 'Click on Filter button');
    await page.waitForSelector(el.searchResultsPage.btnFilter, { waitFor: 'visible' });
    await page.waitForLoadState('load');
    await page.locator(el.searchResultsPage.btnFilter).click();
  }

  /**
   * @author: vtharakan
   * @function_Name : filterDrawersIsDisplayed
   * @Description : This method is used to verify the filter drawers are displayed in the page
   * @params : None
   * @returns : None
   * */
  async filterDrawersIsDisplayed() {
    testReport.log(this.pageName, 'Verify the Filter drawers are displayed');
    // hide filter is displayed only for crate US and CA desktop view
    if (!common.verifyIsMobile()) {
      if (env.EXEC_SITE === 'crateus' || env.EXEC_SITE === 'cratecan') {
        await page.waitForSelector(el.searchResultsPage.btnHideFilter, { waitFor: 'visible' });
      }
    }
    await page.waitForSelector(el.searchResultsPage.filterContainer, { waitFor: 'visible' });
    if ((await page.locator(el.searchResultsPage.filterDrawersCount).count()) > 0) {
      testReport.log(this.pageName, 'Filter drawer is not empty');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTypeFilter
   * @Description : This method is used to click on the Type Filter
   * @params : None
   * @returns : None
   * */
  async clickOnTypeFilter() {
    testReport.log(this.pageName, 'Click on the Type Filter ');
    await page.waitForSelector(el.searchResultsPage.lblTypeFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblTypeFilter).click();
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTypeFacet
   * @Description : This method is used to click on the Type facet and store it in the array
   * @params : None
   * @returns : None
   * */
  async clickOnTypeFacet() {
    testReport.log(this.pageName, 'Click on the Type facet');
    await page.waitForSelector(el.searchResultsPage.lblTypeFacet, { waitFor: 'visible' });
    await page.click(el.searchResultsPage.lblTypeFacet);
    const typeFacetOption = await page.innerText(el.searchResultsPage.lblTypeFacet);
    this.arrTopFacets.push(typeFacetOption);
    arrFiltersSelcted.push({ type: 'Type', value: typeFacetOption });
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyTypeFilter
   * @Description : This method is used to verify the type filter displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyTypeFilter() {
    testReport.log(this.pageName, 'Verify the Type filter');
    const topTypeFacetOption = await page.innerText(el.searchResultsPage.lnkTopTypeFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (topTypeFacetOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Type facet "${topTypeFacetOption}" selected is displayed in the top Filter`);
      } else {
        testReport.log(this.pageName, `Expected facet is not selected ${topTypeFacetOption}`);
      }
      return null;
    });
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnColorFilter
   * @Description : This method is used to click on the Color Filter
   * @params : None
   * @returns : None
   * */
  async clickOnColorFilter() {
    testReport.log(this.pageName, 'Click on the Color Filter ');
    await page.waitForSelector(el.searchResultsPage.lblColorFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblColorFilter).click();
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnColorFacet
   * @Description : This method is used to click on the Color facet and store in an array
   * @params : None
   * @returns : None
   * */
  async clickOnColorFacet() {
    testReport.log(this.pageName, 'Click on the Color facet');
    await page.waitForSelector(el.searchResultsPage.lblColorFacet, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblColorFacet).click();
    const colorFacetOption = await page.innerText(el.searchResultsPage.lblColorFacet);
    this.arrTopFacets.push(colorFacetOption);
    arrFiltersSelcted.push({ type: 'Color', value: colorFacetOption });
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyColorFilter
   * @Description : This method is used to verify the default filters - Color displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyColorFilter() {
    testReport.log(this.pageName, 'Verify the color filter');
    const topColorFacetOption = await page.innerText(el.searchResultsPage.lnkTopColorFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (topColorFacetOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Color facet "${topColorFacetOption}" selected is displayed in the top Filter`);
      }
      return null;
    });
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnPriceFilter
   * @Description : This method is used to click on the Price Filter
   * @params : None
   * @returns : None
   * */
  async clickOnPriceFilter() {
    testReport.log(this.pageName, 'Click on the Price Filter ');
    await page.waitForLoadState('load');
    await page.waitForSelector(el.searchResultsPage.lblPriceFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblPriceFilter).click();
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnPriceFacet
   * @Description : This method is used to select the Price facet and store in an array
   * @params : None
   * @returns : None
   * */
  async clickOnPriceFacet() {
    testReport.log(this.pageName, 'Click on the Price facet');
    await page.waitForSelector(el.searchResultsPage.lblPriceFacet, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblPriceFacet).click();
    const priceFacetOption = await page.innerText(el.searchResultsPage.lblPriceFacet);
    this.arrTopFacets.push(priceFacetOption);
    arrFiltersSelcted.push({ type: 'Price', value: priceFacetOption });
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyPriceFilter
   * @Description : This method is used to verify the default filters - Price displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyPriceFilter() {
    testReport.log(this.pageName, 'Verify default filter - Price');
    const topPriceFacetOption = await page.innerText(el.searchResultsPage.lnkTopPriceFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (topPriceFacetOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Price facet "${topPriceFacetOption}" selected is displayed in the top Filter`);
      }
      return null;
    });
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnMaterialFilter
   * @Description : This method is used to click on the Material Filter
   * @params : None
   * @returns : None
   * */
  async clickOnMaterialFilter() {
    testReport.log(this.pageName, 'Click on the Material Filter ');
    await page.waitForSelector(el.searchResultsPage.lblMaterialFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblMaterialFilter).click();
    // await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnMaterialFacet
   * @Description : This method is used to select the Material facet and store in an array
   * @params : None
   * @returns : None
   * */
  async clickOnMaterialFacet() {
    testReport.log(this.pageName, 'Click on the Material facet');
    await page.waitForSelector(el.searchResultsPage.lblMaterialFacet, { waitFor: 'visible' });
    await page.click(el.searchResultsPage.lblMaterialFacet);
    const materialFacetOption = await page.innerText(el.searchResultsPage.lblMaterialFacet);
    this.arrTopFacets.push(materialFacetOption);
    arrFiltersSelcted.push({ type: 'Material', value: materialFacetOption });
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMaterialFilter
   * @Description : This method is used to verify the default filters - Material displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyMaterialFilter() {
    testReport.log(this.pageName, 'Verify default filters - Material');
    const topMaterialFacetOption = await page.innerText(el.searchResultsPage.lnkTopMaterialFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (topMaterialFacetOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Material facet "${topMaterialFacetOption}" selected is displayed in the top Filter`);
      }
      return null;
    });
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnResponsibleDesignFilter
   * @Description : This method is used to click on the Responsible Design Filter
   * @params : None
   * @returns : None
   * */
  async clickOnResponsibleDesignFilter() {
    testReport.log(this.pageName, 'Click on the Responsible Design Filter ');
    await page.waitForSelector(el.searchResultsPage.lblResponsibleDesignFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblResponsibleDesignFilter).click();
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnResponsibleDesignFacet
   * @Description : This method is used to click on the Responsible Design facet and store it in the array
   * @params : None
   * @returns : None
   * */
  async clickOnResponsibleDesignFacet() {
    testReport.log(this.pageName, 'Click on the Responsible Design facet');
    await page.waitForSelector(el.searchResultsPage.lblResponsibleDesignFacet, { waitFor: 'visible' });
    await page.click(el.searchResultsPage.lblResponsibleDesignFacet);
    const typeResponsibleDesignFacetOption = await page.innerText(el.searchResultsPage.lblResponsibleDesignFacet);
    this.arrTopFacets.push(typeResponsibleDesignFacetOption);
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyResponsibleDesignFilter
   * @Description : This method is used to verify the Responsible Design filter displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyResponsibleDesignFilter() {
    testReport.log(this.pageName, 'Verify the Responsible Design filter is selected with type filter');
    const topResponsibleDesignFacetOption = await page.locator(el.searchResultsPage.lnkAllTopFilters).nth(2).innerText();
    const toptypeOption = await page.locator(el.searchResultsPage.lnkAllTopFilters).nth(1).innerText();

    await expect(await page.locator(el.searchResultsPage.lnkAllTopFilters).count()).toBe(3);

    testReport.log(this.pageName, `Responsible Design: ${topResponsibleDesignFacetOption} and type: ${toptypeOption} are selected`);
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinPrice
   * @Description : This method is used to enter the Min price details
   * @params : None
   * @returns : None
   * */
  async enterMinPrice(minPrice) {
    testReport.log(this.pageName, 'Enter Min Price');
    await page.fill(el.searchResultsPage.txtMinValue, minPrice, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, '', { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMaxPrice
   * @Description : This method is used to enter the Max price details
   * @params : None
   * @returns : None
   * */
  async enterMaxPrice(maxPrice) {
    testReport.log(this.pageName, 'Enter Max Price');
    await page.fill(el.searchResultsPage.txtMinValue, '', { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, maxPrice, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinPriceGreaterthanMaxPrice
   * @Description : This method is used to enter the Min price greater than Max price
   * @params : None
   * @returns : None
   * */
  async enterMinPriceGreaterthanMaxPrice(maxPrice, minPrice) {
    testReport.log(this.pageName, 'Enter Min Price greater than Max Price');
    await page.fill(el.searchResultsPage.txtMinValue, maxPrice, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, minPrice, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinPriceMaxPriceEmpty
   * @Description : This method is used to enter the Min price and Max price as empty value
   * @params : None
   * @returns : None
   * */
  async enterMinPriceMaxPriceEmpty() {
    testReport.log(this.pageName, 'Enter Min Price and Max Price as empty values');
    await page.fill(el.searchResultsPage.txtMinValue, '', { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, '', { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : VerifyErrorMsgDisplayed
   * @Description : This method is used to verify eror message is displayed
   * @params : None
   * @returns : None
   * */
  async VerifyErrorMsgDisplayed() {
    testReport.log(this.pageName, 'Verify error message is displayed');
    await expect(page.locator(el.searchResultsPage.lblRangeErrorMessage)).toBeVisible();
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinAndMaxPriceRange
   * @Description : This method is used to enter the Min and Max price details
   * @params : None
   * @returns : None
   * */
  async enterMinAndMaxPriceRange(minPrice, maxPrice) {
    testReport.log(this.pageName, 'Enter Min and Max Price Range ');
    await page.fill(el.searchResultsPage.txtMinValue, minPrice, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, maxPrice, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinAndMaxPriceRange
   * @Description : This method is used to click on price range button
   * @params : None
   * @returns : None
   * */
  async clickOnPriceRangeButton() {
    testReport.log(this.pageName, 'Click on the Price Range button in the Filter drawer');
    if (common.verifyIsMobile()) {
      await page.keyboard.press('Enter');
    } else {
      await page.waitForSelector(el.searchResultsPage.btnRange, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.btnRange).click();
    }
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyPriceRangeFilter
   * @Description : This method is used to verify the Price Range filter displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyPriceRangeFilter() {
    testReport.log(this.pageName, 'Verify the Price Range filter');
    const toptypePriceRangeOption = await page.innerText(el.searchResultsPage.lnkTopPriceRangeFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (toptypePriceRangeOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Price Range facet "${toptypePriceRangeOption}" selected is displayed in the top Filter`);
      } else {
        testReport.log(this.pageName, `Expected facet is not selected ${toptypePriceRangeOption}`);
      }
      return null;
    });
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnWidthFilter
   * @Description : This method is used to click on the Width Filter
   * @params : None
   * @returns : None
   * */
  async clickOnWidthFilter() {
    testReport.log(this.pageName, 'Click on the Width Filter ');
    await page.waitForLoadState('load');
    await page.waitForSelector(el.searchResultsPage.lblWidthFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lblWidthFilter).click();
    await page.waitForLoadState('load');
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinWidth
   * @Description : This method is used to enter the Min Width details
   * @params : None
   * @returns : None
   * */
  async enterMinWidth(minWidth) {
    testReport.log(this.pageName, 'Enter Min Width');
    await page.fill(el.searchResultsPage.txtMinValue, minWidth, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, '', { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMaxWidth
   * @Description : This method is used to enter the Max Width details
   * @params : None
   * @returns : None
   * */
  async enterMaxWidth(maxWidth) {
    testReport.log(this.pageName, 'Enter Max Width');
    await page.fill(el.searchResultsPage.txtMinValue, '', { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, maxWidth, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinWidthGreaterthanMaxWidth
   * @Description : This method is used to enter the Min Width greater than Max Width
   * @params : None
   * @returns : None
   * */
  async enterMinWidthGreaterthanMaxWidth(maxWidth, minWidth) {
    testReport.log(this.pageName, 'Enter Min Width greater than Max Width');
    await page.fill(el.searchResultsPage.txtMinValue, maxWidth, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, minWidth, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinWidthMaxWidthEmpty
   * @Description : This method is used to enter the Min Width and Max Width as empty value
   * @params : None
   * @returns : None
   * */
  async enterMinWidthMaxWidthEmpty() {
    testReport.log(this.pageName, 'Enter Min Width and Max Width as empty values');
    await page.fill(el.searchResultsPage.txtMinValue, '', { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, '', { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : enterMinAndMaxWidthRange
   * @Description : This method is used to enter the Min and Max Width details
   * @params : None
   * @returns : None
   * */
  async enterMinAndMaxWidthRange(minWidth, maxWidth) {
    testReport.log(this.pageName, 'Enter Min and Max Width Range ');
    await page.fill(el.searchResultsPage.txtMinValue, minWidth, { delay: 400 });
    await page.fill(el.searchResultsPage.txtMaxValue, maxWidth, { delay: 400 });
  }

  /**
   * @author: scherukumalli
   * @function_Name : clickOnWidthRangeButton
   * @Description : This method is used to click on width range button
   * @params : None
   * @returns : None
   * */
  async clickOnWidthRangeButton() {
    testReport.log(this.pageName, 'Click on the Width Range button in the Filter drawer');
    if (common.verifyIsMobile()) {
      await page.keyboard.press('Enter');
    } else {
      await page.waitForSelector(el.searchResultsPage.btnRange, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.btnRange).click();
    }
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
  }

  /**
   * @author: scherukumalli
   * @function_Name : verifyWidthRangeFilter
   * @Description : This method is used to verify the Width Range filter displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyWidthRangeFilter() {
    testReport.log(this.pageName, 'Verify the Width Range filter');
    const toptypeWidthRangeOption = await page.innerText(el.searchResultsPage.lnkTopWidthRangeFilter);
    this.arrTopFacets.map((arrayItem) => {
      if (toptypeWidthRangeOption.includes(arrayItem)) {
        testReport.log(this.pageName, `Width Range facet "${toptypeWidthRangeOption}" selected is displayed in the top Filter`);
      } else {
        testReport.log(this.pageName, `Expected facet is not selected ${toptypeWidthRangeOption}`);
      }
      return null;
    });
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnFilterApplyButton
   * @Description : This method is used to click on the Apply button in the Filter drawer for CB2 sites
   * @params : None
   * @returns : None
   * */
  async clickOnFilterApplyButton() {
    testReport.log(this.pageName, 'Click on the Apply button in the Filter drawer');
    if (common.verifyIsMobile()) {
      // if(globalData.execSite == 'cb2_us' || globalData.execSite == 'cb2_canada' || (common.verifyIsMobile())){
      await page.waitForSelector(el.searchResultsPage.btnApplyFilter, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.btnApplyFilter).click();
      await common.forcedWait(this.pageName, 10000);
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTopFilterClearAllLink
   * @Description : This method is used to clear the selected filters from the top section
   * @params : None
   * @returns : None
   * */
  async clickOnTopFilterClearAllLink() {
    testReport.log(this.pageName, 'Click on the Clear All link');
    await page.waitForSelector(el.searchResultsPage.lnkTopClearAllFilter, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.lnkTopClearAllFilter).click();
    await page.waitForSelector(el.searchResultsPage.lblSingleProduct, { waitFor: 'visible' });
    arrFiltersSelcted.length = 0;
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTopFilterClearAllLink
   * @Description : This method is used to clear the selected filters from the top section
   * @params : None
   * @returns : None
   * */
  async clearAllLinkIsNotDisplayed() {
    testReport.log(this.pageName, 'Verify Clear All link is not displayed');
    await expect(page.locator(el.searchResultsPage.lnkTopClearAllFilter)).toBeHidden();
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRelatedSearchesSection
   * @Description : This method is used to verify the Related Searches section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyRelatedSearchesSection() {
    testReport.log(this.pageName, 'Verify Related Searches in the Search PLP');
    await page.waitForSelector(el.searchResultsPage.lblRelatedSearches, { waitFor: 'visible' });
    await page.waitForSelector(el.searchResultsPage.lnkFirstRelatedSearches, { waitFor: 'visible' });
    if ((await page.locator(el.searchResultsPage.lnkRelatedSearchesCount).count()) > 0) {
      testReport.log(this.pageName, 'Related Searches section is not empty');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnRelatedSearches
   * @Description : This method is used to click on the Related Searches
   * @params : None
   * @returns : None
   * */
  async clickOnRelatedSearches() {
    testReport.log(this.pageName, 'Click on the first Related Searches link');
    await page.waitForSelector(el.searchResultsPage.lnkFirstRelatedSearches, { waitFor: 'visible' });
    // await page.locator(el.searchResultsPage.lnkFirstRelatedSearches).click();
    await page.$eval(el.searchResultsPage.lnkFirstRelatedSearches, (elem) => elem.click());
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRelatedSearchPLP
   * @Description : This method is used to verify the h1 tag in Related Searches page
   * @params : None
   * @returns : None
   * */
  async verifyRelatedSearchPLP() {
    testReport.log(this.pageName, 'Verify the H1 header label in the page');
    await page.waitForLoadState('load');
    await page.waitForSelector(el.searchResultsPage.lblH1PlpHeader, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRelatedCategoriesIsDisplayed
   * @Description : This method is used to verify Related category is displayed
   * @params : None
   * @returns : None
   * */
  async verifyRelatedCategoriesIsDisplayed() {
    testReport.log(this.pageName, 'Verify Related Categories in the Search PLP');
    if (await page.url().includes('/search')) {
      await page.waitForSelector(el.searchResultsPage.lblRelatedCategories, { waitFor: 'visible' });
      await page.waitForSelector(el.searchResultsPage.lnkFirstRelatedCategories, { waitFor: 'visible' });
      if ((await page.locator(el.searchResultsPage.lnkRelatedCategoriesCount).count()) > 0) {
        testReport.log(this.pageName, 'Related Categories section is not empty');
      }
    } else {
      await page.waitForSelector(el.seoGeneratedPage.lblRelatedCategories, { waitFor: 'visible' });
      await page.waitForSelector(el.seoGeneratedPage.lnkFirstRelatedCategories, { waitFor: 'visible' });
      if ((await page.locator(el.seoGeneratedPage.lnkRelatedCategoriesCount).count()) > 0) {
        testReport.log(this.pageName, 'Related Categories section is not empty');
      }
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnTheRelatedCategory
   * @Description : This method is used to click on the Related Category
   * @params : None
   * @returns : None
   * */
  async clickOnTheRelatedCategory() {
    testReport.log(this.pageName, 'Click on the first Related Category');
    if (await page.url().includes('/search')) {
      // await page.locator(el.searchResultsPage.lnkFirstRelatedCategories).click();
      await page.$eval(el.searchResultsPage.lnkFirstRelatedCategories, (elem) => elem.click());
    } else {
      await page.locator(el.seoGeneratedPage.lnkFirstRelatedCategories).click();
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyTheRelatedCategoryPage
   * @Description : This method is used to verify the Related Category page
   * @params : None
   * @returns : None
   * */
  async verifyTheRelatedCategoryPage() {
    testReport.log(this.pageName, 'Verify the Crate and Barrel header is displayed in Related Category page');
    await page.waitForSelector(el.searchResultsPage.lblHeaderLogo, { waitFor: 'visible' });
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyInitialProductCountInPartialSearchPage
   * @Description : This method is used to verify the initial product count in Partial Search page
   * @params : None
   * @returns : None
   * */
  async verifyInitialProductCountInPartialSearchPage() {
    testReport.log(this.pageName, 'Verify only 12 products are displayed in the Partial Search page when searched for the first time');
    await page.waitForSelector(el.partialSearch.lblPartialSearchCount, { waitFor: 'visible' });
    const lblShowCount = await page.locator(el.partialSearch.lblPartialSearchCount).textContent();
    let actualPartialCount = lblShowCount.substring(8, 10);
    actualPartialCount = Number(actualPartialCount);
    expect(actualPartialCount === 12).toBeTruthy();
    testReport.log(this.pageName, `Partial search page loaded with expected ${actualPartialCount} product count`);
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewMoreProductsButton
   * @Description : This method is used to click on View More Products button
   * @params : None
   * @returns : None
   * */
  async clickOnViewMoreProductsButton() {
    testReport.log(this.pageName, 'Click on the View More Products button');
    await page.waitForSelector(el.searchResultsPage.btnViewMoreProducts, { waitFor: 'visible' });
    await page.click(el.searchResultsPage.btnViewMoreProducts);
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Clicked on View More button');
    await common.forcedWait(this.pageName, 10000);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyProductCount
   * @Description : This method is used to verify the product count displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyProductCount() {
    testReport.log(this.pageName, 'Verify the product count');
    await page.waitForSelector(el.searchResultsPage.btnViewMoreProducts, { waitFor: 'visible' });
    await page.waitForSelector(el.searchResultsPage.lblShowingProductCount, { waitFor: 'visible' });
    await page.waitForSelector(`${el.searchResultsPage.lblSingleProduct}:nth-child(13)`, { waitFor: 'visible' });
    const lblShowCount1 = await page.locator(el.searchResultsPage.lblShowingProductCount).textContent();
    let actualCount = lblShowCount1.substring(8, 11);
    actualCount = Number(actualCount);
    testReport.log(`Actual Product Count after clicking View More button:${actualCount}`);
    expect(actualCount !== 12).toBeTruthy(); // partial search page validation
    testReport.log(this.pageName, `The product count is : ${actualCount}`);
  }

  /**
   * @author: vtharakan
   * @function_Name : searchItem
   * @Description : This method is used to search an item using SKU
   * @params : skuNum
   * @returns : None
   * */
  async searchItem(skuNum) {
    await page.waitForLoadState();
    if (skuNum === 'itemList') {
      const items = await this.readJson();
      items.map((arrayItem) => {
        const itemSku = arrayItem.sku;
        page.waitForSelector(el.searchResultsPage.txtSearchInputBox, { waitFor: 'visible' });
        page.fill(el.searchResultsPage.txtSearchInputBox, itemSku, { delay: 100 });
        page.waitForSelector(el.searchResultsPage.btnSearchSubmit);
        page.locator(this.pageName, el.searchResultsPage.btnSearchSubmit).click();
        expect(page.innerText(el.searchResultsPage.skuNum)).to.equal(itemSku);
        testReport.log(this.pageName, `Searching SKU ->${itemSku}`);
        return itemSku;
      });

      // for (const item of items) {
      //   const itemSku = item.sku;
      //   await page.waitForSelector(el.searchResultsPage.txtSearchInputBox, { waitFor: 'visible' });
      //   await page.fill(el.searchResultsPage.txtSearchInputBox, itemSku, { delay: 100 });
      //   await page.waitForSelector(el.searchResultsPage.btnSearchSubmit);
      //   await page.locator(this.pageName, el.searchResultsPage.btnSearchSubmit).click();
      //   expect(await page.innerText(el.searchResultsPage.skuNum)).to.equal(itemSku);
      //   testReport.log(this.pageName, `Searching SKU ->${itemSku}`);
      // }
    } else {
      await page.waitForSelector(el.searchResultsPage.txtSearchInputBox, { waitFor: 'visible' });
      await page.fill(el.searchResultsPage.txtSearchInputBox, skuNum, { delay: 100 });
      await page.waitForSelector(el.searchResultsPage.btnSearchSubmit);
      testReport.log(this.pageName, `Searching SKU ->${skuNum}`);
      await page.locator(el.searchResultsPage.btnSearchSubmit).click();
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyExpectedUrl
   * @Description : Verify the current page Url contains expectedUrl keyword
   * @params : expectedUrl
   * @returns : None
   * */
  async verifyExpectedUrl(expectedUrl) {
    testReport.log(this.pageName, 'Verify the page Url contains expected keyword');
    await page.reload();
    const url = page.url();
    expect(page.url({ timeout: 1000 })).toContain(expectedUrl);
    testReport.log(this.pageName, `Assertion - Expected:${expectedUrl} Acutal:${url}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyHeader1
   * @Description : Verify the h1 tag equals the expected h1 tag to that corresponding to that page
   * @params : expectedHeader
   * @returns : None
   * */
  async verifyHeader1(expectedHeader) {
    testReport.log(this.pageName, 'Verify the h1 tag equals the expected h1 tag corresponding to that page');
    const newExpectedHeader = expectedHeader.toLowerCase();
    const actualHeader = (await page.locator(el.SITECOMMON.lblH1).innerText()).toLowerCase();

    expect(actualHeader).toContain(newExpectedHeader);
    testReport.log(this.pageName, `Assertion - Expected:${newExpectedHeader} Acutal:${actualHeader}`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : getProductCount
   * @Description : retuns the Product count on the search page
   * @params : None
   * @returns : ProductCount
   * */
  async getProductCount() {
    testReport.log(this.pageName, 'Saving original Product count');
    await page.waitForLoadState('load', { timeout: 10000 });
    let productCount = await page.innerText('.total-count-container');
    productCount = productCount.replace(/\D/g, '');
    testReport.log(this.pageName, 'original Product count saved');
    return parseInt(productCount, 10);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyViewAllAvailabilityIsDisplayed
   * @Description : Validating ViewAll availability button is displayed in the search page
   * @params : None
   * @returns : None
   * */
  async verifyViewAllAvailabilityIsDisplayed() {
    testReport.log(this.pageName, 'Checking for View All availability button displayed in the page');
    let actualViewAllLabel = await page.locator(el.searchResultsPage.lblViewAll).innerText();
    actualViewAllLabel = actualViewAllLabel.toLowerCase();
    expect(actualViewAllLabel === 'view all').toBeTruthy();
    testReport.log(this.pageName, 'View All availability button is displayed in the page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyReadyToShipAvailabilityIsDisplayed
   * @Description : Validating ReadyToShip availability button is displayed in the search page
   * @params : None
   * @returns : None
   * */
  async verifyReadyToShipAvailabilityIsDisplayed() {
    testReport.log(this.pageName, 'Checking for Ready to Ship button is displayed in the page');
    let actualReadyToShipLabel = await page.locator(el.searchResultsPage.lblReadyToShip).innerText();
    actualReadyToShipLabel = actualReadyToShipLabel.toLowerCase();
    expect(actualReadyToShipLabel === 'ready to ship').toBeTruthy();
    testReport.log(this.pageName, 'Ready to Ship button is displayed correctly');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyShipsWithin4WeeksIsDisplayed
   * @Description : Validating ShipsWithin4Weeks availability button is displayed in the search page
   * @params : None
   * @returns : None
   * */
  async verifyShipsWithin4WeeksIsDisplayed() {
    testReport.log(this.pageName, 'Checking for Ships Within 4 Weeks is displayed in the page');
    let actualReadyToShipLabel = page.locator(el.searchResultsPage.lblShipsWithin4Weeks);
    actualReadyToShipLabel = actualReadyToShipLabel.toLowerCase();
    await expect(actualReadyToShipLabel).toHaveText('ships within 4 weeks');
    testReport.log(this.pageName, 'Ships Within 4 Weeks is displayed correctly');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyInitialPageLoad
   * @Description : Validating ReadyToShip availability button is displayed in the search page
   * @params : None
   * @returns : None
   * */
  async verifyInitialPageLoad() {
    testReport.log(this.pageName, 'Checking the pageurl with "isReadyToShipAvailabilityOn=false"');
    const pageUrl = page.url();
    expect(pageUrl).toContain(`isReadyToShipAvailabilityOn=false`);
    testReport.log(this.pageName, 'Current page url has the attribute "isReadyToShipAvailabilityOn=false"');
  }

  /**
   * @author: balsilwadi
   * @function_Name : clickOnReadyToShipAvailabilityFilter
   * @Description : Click on availability Filter Button
   * @params : button
   * @returns : None
   * */
  async clickOnReadyToShipAvailabilityFilter(button) {
    testReport.log(this.pageName, `Clicking ${button} availability filter`);
    if (button === 'ReadyToShip') await page.locator(el.searchResultsPage.lblReadyToShip).click();
    else await page.locator(el.searchResultsPage.lblShipsWithin4Weeks).click();
    testReport.log(this.pageName, `Switched to ${button} availability filter successfully`);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyPageUrlAfterAvailabilityFilterOn
   * @Description : After availability filter is turned on, validating the URL has attribute
   * @params : button
   * @returns : None
   * */
  async verifyPageUrlAfterAvailabilityFilterOn(button) {
    testReport.log(this.pageName, 'Checking the pageurl with availability attribute');
    await common.forcedWait(this.pageName, 10000);
    await page.reload();

    const pageURL = page.url();
    if (button === 'ReadyToShip') await expect(pageURL).toContain(`availability=shipNow`);
    else await expect(pageURL).toContain(`availability=shipSoon`);
    testReport.log(this.pageName, 'Current page url has the availability attribute');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickOnViewAllFilter
   * @Description : Click on View All Filter by Availabity toggle
   * @params : None
   * @returns : None
   * */
  async clickOnViewAllFilter() {
    testReport.log(this.pageName, 'Clicking View All availability filter');
    await page.click(el.searchResultsPage.lblViewAll, { timeout: 10000 });
    await page.waitForLoadState('load', { timeout: 10000 });
    testReport.log(this.pageName, 'Switched to View All availability filter successfully');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyZipcodeLocationIsDisplayed
   * @Description : Verify zipcode is displayed
   * @params : None
   * @returns : None
   * */
  async verifyZipcodeLocationIsDisplayed() {
    testReport.log(this.pageName, 'Verify zipcode location is displayed');
    await expect(page.locator(el.searchResultsPage.lblZipCodeLocation)).toBeVisible();
    testReport.log(this.pageName, 'Zipcode location is displayed');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateProductCountDecreased
   * @Description : Validate the product count decreased after FBA has been turned on
   * @params : originalProductCount, currectProductCount
   * @returns : None
   * */
  async validateProductCountDecreased(originalProductCount, currectProductCount) {
    testReport.log(this.pageName, 'Validating that product count has decreased');
    await expect(page.locator(el.searchResultsPage.lblH1PlpHeader)).toBeVisible();
    expect(originalProductCount).toBeGreaterThan(currectProductCount);
    testReport.log(this.pageName, 'Product count has decreased');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateProductCountReturned
   * @Description : Validate the product count returned after FBA has been turned back off
   * @params : originalProductCount
   * @returns : None
   * */
  async validateProductCountReturned(originalProductCount, currentProductCount) {
    testReport.log(this.pageName, 'Validating that product count has returned to original state');
    await expect(page.locator(el.searchResultsPage.lblH1PlpHeader)).toBeVisible();
    expect(originalProductCount).toBe(currentProductCount);
    testReport.log(this.pageName, 'Product count has returned to original state');
  }

  /**
   * @author: balsilwadi
   * @function_Name : enterZipcodeInFBA
   * @Description : Entering a zipcode in FBA
   * @params : zipcode
   * @returns : None
   * */
  async enterZipcodeInFBA(zipcode) {
    testReport.log(this.pageName, `Entering ${zipcode} into FBA inputbox`);
    await page.reload();
    await page.waitForSelector(el.searchResultsPage.btnZipCode, { waitFor: 'visible' });
    await page.locator(el.searchResultsPage.btnZipCode).click();
    await page.locator(el.searchResultsPage.txtZipCode).last().fill('');
    await page.locator(el.searchResultsPage.txtZipCode).last().fill(zipcode);
    await page.locator(el.searchResultsPage.btnApplyZipCode).last().click();
    testReport.log(this.pageName, `${zipcode} has been entered into FBA`);
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateFBAError
   * @Description : Validating zipcode error is displayed when invalid zipcode is entered in FBA
   * @params : errorMessage
   * @returns : None
   * */
  async validateFBAError(errorMessage) {
    testReport.log(this.pageName, 'Validating that FBA Error message is displaying');
    await expect(page.locator(el.searchResultsPage.lblZipCodeErr)).toHaveText(errorMessage);
    testReport.log(this.pageName, 'FBA Error message is displaying');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateSortByIsDisplayed
   * @Description : Validating sortBy dropdown button is displayed and clickable
   * @params : None
   * @returns : None
   * */
  async validateSortByIsDisplayed() {
    if (!common.verifyIsMobile) {
      testReport.log(this.pageName, 'Validating that sortBy button is displayed and clickable');
      await expect(page.locator(el.searchResultsPage.btnSort)).toBeVisible();
      await expect(page.locator(el.searchResultsPage.btnSort)).toBeEnabled();
      testReport.log(this.pageName, 'SortBy button is displayed and clickable');
    }
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateSelectedSortBy
   * @Description : Validating the selected sortBy option is correct
   * @params : None
   * @returns : None
   * */
  async validateSelectedSortBy(expectedSortByOption) {
    testReport.log(this.pageName, `Validating ${expectedSortByOption} sortBy option is selected`);
    let actualSortByOption;
    if (common.verifyIsMobile()) {
      await page.locator(el.seoGeneratedPage.btnFilter).click();
      await page.waitForSelector(el.seoGeneratedPage.btnMobileSortByDropDown, { waitFor: 'visible' });
      actualSortByOption = await page.locator(el.searchResultsPage.lblMobileCurrentSortBy).textContent();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      actualSortByOption = await page.locator(el.searchResultsPage.btnSort).textContent();
    }
    await expect(actualSortByOption.toLowerCase()).toBe(expectedSortByOption);
    testReport.log(this.pageName, `${expectedSortByOption} sortBy option is selected`);
    await common.forcedWait(this.pageName, 1000);
  }

  /**
   * @author: balsilwadi
   * @function_Name : clickOnSortByButton
   * @Description : Clicking on sortBy button
   * @params : None
   * @returns : None
   * */
  async clickOnSortByButton() {
    testReport.log(this.pageName, 'Clicking on sortBy Button');
    await page.locator(el.searchResultsPage.btnSort).click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'SortBy Button is clicked');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validatingSortByDropdown
   * @Description : Validating SortBy all options are displayed
   * @params : None
   * @returns : None
   * */
  async validatingSortByDropdown() {
    testReport.log(this.pageName, 'Verifying all sortBy options are displayed');
    const sortByDropdownLocator = common.verifyIsMobile() ? el.searchResultsPage.btnMobileSortByOptions : el.searchResultsPage.btnSortByDropDown;
    await expect(page.locator(sortByDropdownLocator)).toHaveText([
      'Most Relevant',
      'Price, low to high',
      'Price, high to low',
      'Top Rated',
      'Best Selling',
      'New'
    ]);
    testReport.log(this.pageName, 'All sortBy options are displayed');
    await page.reload();
  }

  /**
   * @author: balsilwadi
   * @function_Name : selectNewOption
   * @Description : This method is used to select New option
   * @params : None
   * @returns : None
   * */
  async selectNewOption() {
    testReport.log(this.pageName, 'Select New option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.searchResultsPage.lnkMobileNew, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.lnkMobileNew).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.searchResultsPage.lnkNew, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.lnkNew).click();
    }
    await page.waitForLoadState('load');
  }

  /**
   * @author: balsilwadi
   * @function_Name : selectBestSellingOption
   * @Description : This method is used to select Best Selling option
   * @params : None
   * @returns : None
   * */
  async selectBestSellingOption() {
    testReport.log(this.pageName, 'Select Best Selling option from the Sort by dropdown');
    if (common.verifyIsMobile()) {
      await page.waitForSelector(el.searchResultsPage.lnkMobileBestSelling, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.lnkMobileBestSelling).click();
      await page.locator(el.seoGeneratedPage.btnCloseFilter).click();
    } else {
      await page.waitForSelector(el.searchResultsPage.lnkBestSelling, { waitFor: 'visible' });
      await page.locator(el.searchResultsPage.lnkBestSelling).click();
    }
    await page.waitForLoadState('load');
  }

  /**
   * @author: balsilwadi
   * @function_Name : verifyBestSellingOption
   * @Description : This function is used to verify best selling is selected
   * @params : None
   * @returns : None
   * */
  async verifyBestSellingOption() {
    testReport.log(this.pageName, 'Verify Best Selling is selected for sortBy');
    await this.validateSelectedSortBy('best selling');
    await common.forcedWait(this.pageName, 40000);
    await this.verifyExpectedUrl('sortBy=bestSelling');
    testReport.log(this.pageName, 'Best Selling is selected for sortBy');
  }

  /**
   * @author: balsilwadi
   * @function_Name : validateAvailabilityFilterProductCount
   * @Description : This function is used to verify Availability filter product count is viewAll > shipsWithin4Weeks > readyToShip
   * @params : viewAll, readyToShip, shipsWithin4Weeks
   * @returns : None
   * */
  async validateAvailabilityFilterProductCount(viewAll, readyToShip, shipsWithin4Weeks) {
    testReport.log(this.pageName, 'Verifiy product count order is viewAll > shipsWithin4Weeks > readyToShip');
    const countArr = [viewAll, shipsWithin4Weeks, readyToShip];
    expect(countArr.sort((a, b) => a - b)).toBe(countArr);
    testReport.log(this.pageName, 'Product count order is viewAll > shipsWithin4Weeks > readyToShip');
  }

  /**

   * @author: kepperson
   * @function_Name : validateRecentlyViewedShown
   * @Description : validating recently viewed products are shown
   * @params : None
   * @returns : None
   * */
  async validateRecentlyViewedShown() {
    testReport.log(this.pageName, `Verifying recently viewed products are visible`);
    const recentlyViewedLocator = common.verifyIsMobile() ? el.searchResultsPage.lblRecentlyViewedMobile : el.searchResultsPage.lblRecentlyViewedDesktop;
    await expect(page.locator(recentlyViewedLocator)).toBeVisible();
    testReport.log(this.pageName, `Verified recently viewed products are visible`);
  }

  /**

   * @author: balsilwadi
   * @function_Name : getProductList
   * @Description : Returning an array of the product names that display(removing the kids label) on the page as an object with the name and value
   * @params : None
   * @returns : returns array of objects -> [{name:value}]
   * */
  async getProductList() {
    return page.evaluate((selectors) => {
      const products = [];
      document.querySelectorAll(selectors.searchResultsPage.lblSingleProduct).forEach((product) => {
        const productNameElement = product.querySelector(selectors.searchResultsPage.lblSingleProductName);
        const kidsLabel = productNameElement.querySelector(selectors.searchResultsPage.lblSingleProductKids);
        let productName = productNameElement.textContent;
        if (kidsLabel) {
          productName = productName.replace(kidsLabel.textContent, '').trim();
        }
        products.push({ name: productName });
      });
      return products;
    }, el);
  }
}

module.exports = { SearchPLP, arrFiltersSelcted };
