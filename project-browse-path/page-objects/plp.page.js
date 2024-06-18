const { expect } = require('@playwright/test');
const el = require('../elements/elements');

// eslint-disable-next-line import/no-restricted-paths
const td = require('../data/testdata.json');
const { CommonUtils } = require('../../support/utils/common-utils');
const { EnvironmentUtils } = require('../../support/utils/env-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

const common = new CommonUtils();
const envUtils = new EnvironmentUtils();
const testReport = new ReportUtils();

const ISMOBILE = common.verifyIsMobile();

class PLPpage extends PageObject {
  constructor() {
    super();
    this.pageName = this.constructor.name;

    this.expectedSubwayCarouselItems = [];

    // Locators:
    this.btnAddToRegistry = '//*[@id="X"]//button[@value="addToRegistry"]';
    this.liProductCard = '(//li[@class="card product-card"])[X]';
  }

  async primaryNavigation(superCategoryItem, subCategoryItem, categoryItem) {
    if (ISMOBILE) {
      await Promise.all([
        page.click(el.HEADER_MOBILE.MobileMenu),
        page.click(`${el.NAVIGATION.MobileSuperCategory + superCategoryItem}']`),
        page.click(`${el.NAVIGATION.MobileSubCategory + subCategoryItem}']`),
        page.click(`${el.NAVIGATION.MobileCategory + categoryItem}']`)
      ]);

      testReport.log(this.pageName, `VALUE PASSED IN MOBILE -- CategoryItem: ${categoryItem}`);
    } else {
      await Promise.all([
        page.hover(`${el.NAVIGATION.DesktopSuperCategory + superCategoryItem}']`),
        page.hover(`${el.NAVIGATION.DesktopSubCategory + subCategoryItem}']`),
        page.click(`${el.NAVIGATION.DesktopCategory + categoryItem}']`)
      ]);

      testReport.log(this.pageName, `VALUE PASSED IN DESKTOP -- CategoryItem: ${categoryItem}`);
    }
  }

  async spCategoryNavigation(superCategoryItem, subCategoryItem, spCategoryItem) {
    if (ISMOBILE) {
      await Promise.all([
        page.click(el.HEADER_MOBILE.MobileMenu),
        page.click(`${el.NAVIGATION.MobileSuperCategory + superCategoryItem}']`),
        page.click(`${el.NAVIGATION.MobileSubCategory + subCategoryItem}']`),
        page.click(`${el.NAVIGATION.MobileSPCategory + spCategoryItem}')]`)
      ]);

      testReport.log(this.pageName, `VALUE PASSED IN MOBILE -- SPCategoryItem: ${spCategoryItem}`);
      this.verifySpcategoryPage();
    } else {
      await Promise.all([
        page.hover(`${el.NAVIGATION.DesktopSuperCategory + superCategoryItem}']`),
        page.click(`${el.NAVIGATION.DesktopSPCategory + spCategoryItem}']`),
        page.hover(`${el.NAVIGATION.DesktopSubCategory + subCategoryItem}']`),
        page.click(`${el.NAVIGATION.DesktopSPCategory + spCategoryItem}']`)
      ]);

      testReport.log(this.pageName, `VALUE PASSED IN DESKTOP -- SPCategoryItem: ${spCategoryItem}`);
      //   this.verifySpcategoryPage();
    }
  }

  /**
   * Clicks on specific navigation item on CBUS & CBCA Sites
   * @param {string} superCategoryItem - SuperCategoryItem (Top-Level Navigation Item)
   * @param {string} categoryItem - CategoryItem (Second-Level Navigation Item)
   * @author Naga Yellinedi & Emmanuel Miller
   */
  async primaryNavigationFromMegaMenu(superCategoryItem, categoryItem) {
    const { DesktopSuperCategory, MobileSuperCategory, MobileSubCategory, MobileCategory } = el.NAVIGATION;

    try {
      if (ISMOBILE) {
        const headerMobileButton = page.getByTestId(el.HEADER_MOBILE.SiteHeaderMobile).locator('div').getByTestId('button').first();

        if (headerMobileButton) {
          await headerMobileButton.isVisible({ timeout: 20000 });
          await headerMobileButton.click({ delay: 500 });
        } else {
          testReport.log(this.pageName, 'HEADER MOBILE BUTTON NOT FOUND');
        }

        const foundCategoryItem = this.retrieveSubCategoryToClickOn(categoryItem);
        const mobileClickActions = [
          page.click(`${MobileSuperCategory + superCategoryItem}']`),
          page.click(`${MobileSubCategory}${foundCategoryItem}']`),
          page.click(`${MobileCategory + categoryItem}']`)
        ];

        await this.#retryWithMaxAttempts(mobileClickActions, `SUCCESSFULLY FOUND CATEGORY ITEM ${categoryItem} IN MOBILE VIEW.`);
      } else {
        const categoryItemSelector = `//a[contains(@class,'nav-subcategory-links') or contains(@class,'nav-subcategory-header')][contains(.,'${categoryItem}')]`;

        const desktopClickActions = [
          page.hover(`${DesktopSuperCategory + superCategoryItem}']`, { timeout: 12000 }),
          // page.waitForSelector(categoryItemSelector, { timeout: 12000 }),
          page.click(categoryItemSelector, { timeout: 12000 })
        ];

        await this.#retryWithMaxAttempts(desktopClickActions, `SUCCESSFULLY FOUND CATEGORY ITEM ${categoryItem} IN DESKTOP VIEW.`);
      }
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN primaryNavigationFromMegaMenu: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retries a set of actions with a specified maximum number of attempts.
   *
   * @param {Array<Promise>} actions - An array of actions to perform.
   * @param {string} successMessage - Success message to log.
   * @param {number} [initialAttempts=0] - Initial number of attempts (default: 0).
   * @param {number} [maxAttempts=3] - Maximum number of attempts (default: 5).
   * @throws Throws an error if the maximum number of attempts is reached.
   * @author [Emmanuel Miller]
   */
  async #retryWithMaxAttempts(actions, successMessage, initialAttempts = 0, maxAttempts = 5) {
    const { pageName } = this;

    async function retry(attempts) {
      try {
        await Promise.all(actions);
        testReport.log(pageName, successMessage);
      } catch (error) {
        if (attempts === maxAttempts) {
          testReport.log(pageName, `ERROR: Maximum attempts reached. ${error.message}`);
          throw error;
        } else {
          testReport.log(pageName, `Attempt ${attempts + 1}: Retry. ${error.message}`);
          await retry(attempts + 1);
        }
      }
    }

    await retry(initialAttempts);
  }

  retrieveSubCategoryToClickOn(categoryItem) {
    let foundCategoryItem = '';

    switch (categoryItem) {
      case 'Bath Towels':
        foundCategoryItem = 'Bath';
        break;
      case 'Napkins':
        foundCategoryItem = 'Table Linens';
        break;
      case 'Steak Knives':
        foundCategoryItem = 'Cutlery';
        break;
      case 'Throw Pillows':
        foundCategoryItem = 'Pillows & Throws';
        break;
      case 'Flatware':
        foundCategoryItem = 'Dinnerware & Flatware';
        break;
      case 'Bath Linens':
        foundCategoryItem = 'Bath';
        break;
      case 'Vases':
        foundCategoryItem = 'Home Decor & Accessories';
        break;
      default:
        testReport.log(this.pageName, `CANNOT FIND CATEGORYITEM: ${categoryItem}. PLEASE ENSURE IT EXISTS`);
        break;
    }

    return foundCategoryItem;
  }

  async spCategoryNavigationFromMegaMenu(superCategoryItem, spCategoryItem) {
    if (ISMOBILE) {
      const mobileMenu = page.getByTestId(el.HEADER_MOBILE.MobileMenu);

      if (mobileMenu.isVisible()) {
        await Promise.all([
          page.click(el.HEADER_MOBILE.MobileMenu),
          page.click(`${el.NAVIGATION.MobileSuperCategory + superCategoryItem}']`),
          page.click(`${el.NAVIGATION.MobileMenuDrawer + spCategoryItem}')]`)
        ]);
        await page.getByRole('link', { name: spCategoryItem }).waitFor({ state: 'visible' });
        await page.getByRole('link', { name: spCategoryItem }).click();

        testReport.log(this.pageName, `VALUE PASSED IN MOBILE -- SPCategoryItem: ${spCategoryItem}`);
      }

      this.handleCB2GeoLocationPopup();
      this.verifySpcategoryPage();
    } else {
      await Promise.all([
        await page.waitForLoadState(),
        await page.hover(`${el.NAVIGATION.DesktopSuperCategory + superCategoryItem}']`),
        await page.waitForLoadState(),
        await page.click(`${el.NAVIGATION.DesktopSPCategory + spCategoryItem}']`, { timeout: 12000 })
      ]);

      testReport.log(this.pageName, `VALUE PASSED IN DESKTOP -- SPCategoryItem: ${spCategoryItem}`);
      this.verifySpcategoryPage();
    }
  }

  // fixme
  async superCategoryNavigation(superCategoryItem) {
    if (ISMOBILE) {
      await Promise.all([
        page.click(el.HEADER_MOBILE.MobileMenu),
        page.click(`${el.NAVIGATION.MobileSuperCategory + superCategoryItem}']`),
        page.click(el.NAVIGATION.MobileSuperCategory + superCategoryItem + el.NAVIGATION.MobileAncestor)
      ]);

      testReport.log(this.pageName, `value passed in mobile >> ${superCategoryItem}`);
      await this.verifySupercategoryPage(superCategoryItem);
    } else {
      await page.click(`${el.NAVIGATION.DesktopSuperCategory + superCategoryItem}']`);

      testReport.log(this.pageName, `value passed in desktop >> ${superCategoryItem}`);
      await this.verifySupercategoryPage(superCategoryItem);
    }
  }

  async navigateToBrowsePLP() {
    testReport.log(`BrowsePLP: ${this.pageName}`);
  }

  /**
   * Navigates to PLP and favorites the product based off SKU.
   * @param {string} sku  - The SKU of the product to navigate to and favorite.
   * @author Emmanuel Miller
   */
  async navigateToPlpAndFavoriteProduct(sku) {
    await this.navigateToBrandSpecificPLP();
    await this.favoriteProduct(sku);
  }

  /**
   * Navigates to a specific PLP based off site.
   * @author Emmanuel Miller
   */
  async navigateToBrandSpecificPLP() {
    const isCrate = envUtils.isCrate();
    const [superCategoryItem, categoryItem] = isCrate ? ['Kitchen', 'Steak Knives'] : ['Lighting', 'Floor Lamps'];

    await this.primaryNavigationFromMegaMenu(superCategoryItem, categoryItem);
  }

  /**
   * Validates the PLP landing page based on the provided URL and header title.
   * @param {string} url - The URL of the PLP landing page.
   * @param {string} headerTitle - The expected header title on the PLP.
   * @returns {Promise<void>} - A Promise that resolves once the PLP validation is complete.
   * @author Emmanuel Miller
   */
  async plpLandingPage(url, headerTitle) {
    // Wait for the page to load
    await page.waitForLoadState('load');

    // Verify the URL
    await expect(page).toHaveURL(global.baseURL + url);

    // Verify the header title visibility and text
    const foundHeaderTitle = page.getByTestId(el.PLP_INFO.PLPheaderTitle);
    await expect(foundHeaderTitle).toBeVisible({ timeout: 20000 });
    await expect(foundHeaderTitle).toHaveText(headerTitle, { ignoreCase: true, timeout: 20000 });

    // Wait for the page to finish loading
    await page.waitForLoadState();

    // Handle CB2 GeoLocation Popup if present
    this.handleCB2GeoLocationPopup();

    // Validate other PLP titles as needed
    this.validatePLPTitles();

    // Log the completion of PLP landing page verification
    testReport.log(this.pageName, 'VERIFIED PLP LANDING PAGE URL AND HEADERTITLE TAG');
  }

  /**
   * Verifies the type of PLP the user is on
   * @param {string} plpType - Type of PLP Page user is on
   * @author Emmanuel Miller
   */
  async verifyPlpPageType(plpType) {
    try {
      testReport.log(this.pageName, `PLP TYPE: ${plpType}`);

      switch (plpType) {
        case 'Browse PLP':
          testReport.log(this.pageName, `THE PLP TYPE IS ${plpType}. VERIFIED`);
          break;
        case 'Wide PLP':
          testReport.log(this.pageName, `THE PLP TYPE IS ${plpType}. VERIFIED`);
          break;
        default:
          break;
      }
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN verifyPlpPageType: ${error.message}`);
      throw error;
    }
  }

  getSortByOptionsWithRadioButtonValues() {
    return {
      MostRelevant: {
        SortOptionName: 'Most Relevant',
        RadioButtonValue: 'sequence'
      },
      PriceLowToHigh: {
        SortOptionName: 'Price, low to high',
        RadioButtonValue: 'priceLowToHigh'
      },
      PriceHighToLow: {
        SortOptionName: 'Price, high to low',
        RadioButtonValue: 'priceHighToLow'
      },
      New: {
        SortOptionName: 'New',
        RadioButtonValue: 'newestFirst'
      }
    };
  }

  async getFirstSortByButton() {
    const { PlpFilterFacets, SortBySection } = el.MobileFilterAndSortOptions;

    return page.getByTestId(PlpFilterFacets).getByTestId(SortBySection).locator('button');
  }

  /**
   * Clicks on the sort-by filter based on the provided facet option.
   * @param {string} facetOption - The sorting option to be selected.
   * @returns {Promise<void>} - A Promise that resolves once the sorting action is complete.
   * @author Emmanuel Miller
   */
  async clickSortByFilter(facetOption) {
    let newRadioOptionLocator;
    const { MostRelevant, PriceLowToHigh, PriceHighToLow, New } = this.getSortByOptionsWithRadioButtonValues();
    const { MobileFilterAndSortOptions, DesktopFilterAndSortOptions } = el.PLP_INFO;

    try {
      if (ISMOBILE) {
        // Open & Click the 3 lines (Filter & Sort)
        const filterButtonMobile = page.getByTestId(MobileFilterAndSortOptions.SliderTrack).locator('button');
        await expect(filterButtonMobile).toBeVisible({ timeout: 5000 });
        await filterButtonMobile.click({ delay: 300 });

        // Open the "Sort By" section
        const firstSortButton = await this.getFirstSortByButton();
        await expect(firstSortButton).toBeVisible();
        await firstSortButton.click({ delay: 300 });

        const formatInputRadioOption = (value) => `input[type="radio"][value="${value}"]`;

        // Handle different sorting options
        switch (facetOption.toLowerCase()) {
          case 'most relevant':
            newRadioOptionLocator = formatInputRadioOption(MostRelevant.RadioButtonValue);
            await common.clickUsingElementHandle(newRadioOptionLocator);

            testReport.log(this.pageName, 'Successfully handled "Most Relevant" sorting option');
            break;

          case 'price, low to high':
            newRadioOptionLocator = formatInputRadioOption(PriceLowToHigh.RadioButtonValue);
            await common.clickUsingElementHandle(newRadioOptionLocator);

            testReport.log(this.pageName, 'Successfully handled "Price, low to high" sorting option');
            break;

          case 'price, high to low':
            newRadioOptionLocator = formatInputRadioOption(PriceHighToLow.RadioButtonValue);
            await common.clickUsingElementHandle(newRadioOptionLocator);

            testReport.log(this.pageName, 'Successfully handled "Price, high to low" sorting option');
            break;

          case 'new':
            newRadioOptionLocator = formatInputRadioOption(New.RadioButtonValue);
            await common.clickUsingElementHandle(newRadioOptionLocator);

            testReport.log(this.pageName, 'Successfully clicked "New" radio button');
            break;
          default:
            testReport.log(this.pageName, `Unsupported sorting option: ${facetOption}`);
            break;
        }
      } else {
        // For desktop view
        const filterButtonDesktop = page.getByTestId(DesktopFilterAndSortOptions.SortByButton);
        await expect(filterButtonDesktop).toBeVisible();
        await filterButtonDesktop.click({ delay: 300 });

        // Select the sorting option based on facetOption
        const sortOption = page
          .getByTestId(DesktopFilterAndSortOptions.DropDownFilter)
          .getByTestId(DesktopFilterAndSortOptions.DropDownOptionWrap)
          .locator(`.sort-option:has-text('${facetOption}')`);

        await expect(sortOption).toBeVisible();
        await sortOption.click({ delay: 100 });
      }

      // Log the sorting action
      testReport.log(this.pageName, `USER CLICKED ON FACET OPTION: ${facetOption}`);
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN clickSortByFilter: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verifies that the selected Sort-By Option matches the expected sort option.
   * @param {string} expectedSortOption - The expected Sort-By Option.
   * @returns {Promise<void>} - A Promise that resolves once the verification is complete.
   * @author Emmanuel Miller
   */
  async verifyFacetOptionToBeFilteredBy(expectedSortOption) {
    const { DesktopFilterAndSortOptions, MobileFilterAndSortOptions } = el.PLP_INFO;

    try {
      const dropDownFilter = page.getByTestId(DesktopFilterAndSortOptions.DropDownOptionWrap);

      if (!dropDownFilter) {
        testReport.log(this.pageName, 'CANNOT FIND dropDownFilter. ATTEMPTED TO GET DATA-TESTID: dropdown-option-warp');
        return; // exit the method early... no need to keep going
      }

      // Perform different actions based on mobile or desktop view
      if (ISMOBILE) {
        // For mobile, click the apply button and verify the filtered items
        const applyButton = page.getByTestId(MobileFilterAndSortOptions.FilterPanelFooter).getByTestId(MobileFilterAndSortOptions.FilterPanelFooterButton);

        await expect(applyButton).toBeVisible();
        await applyButton.click({ delay: 100 });

        this.verifyItemsOnPageAreFilteredBySortByOption(expectedSortOption);
      } else {
        // For desktop, verify the filter button contains the expected sort option text
        const filterButton = page.getByTestId(DesktopFilterAndSortOptions.SortByButton);
        await expect(filterButton).toContainText(expectedSortOption);
      }

      // Log the completion of the Sort-By Option verification
      testReport.log(this.pageName, `Selected Sort Option: ${expectedSortOption}`);
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN verifyFacetOptionToBeFilteredBy: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify the items on page are in correct order based off Sort Option.
   * @param {string} sortOption - Sort Option
   * @author Emmanuel Miller
   */
  async verifyItemsOnPageAreFilteredBySortByOption(sortOption) {
    const sortOptions = this.getSortByOptionsWithRadioButtonValues();

    try {
      switch (sortOption) {
        case sortOptions.MostRelevant.SortOptionName:
          testReport.log(this.pageName, `USER CLICKED: ${sortOption}. NOTHING TO VERIFY`);
          break;

        case sortOptions.PriceLowToHigh.SortOptionName:
          await this.verifyPriceLowToHigh();
          break;

        case sortOptions.PriceHighToLow.SortOptionName:
          await this.verifyPriceHighToLow();
          break;

        case sortOptions.New.SortOptionName:
          await this.verifyNew();
          break;

        default:
          if (sortOption !== sortOptions.MostRelevant) {
            testReport.log(this.pageName, `SORT OPTION: ${sortOption} IS NOT RECOGNIZED. IT MAY NOT EXIST OR MAY NEED TO BE ADDED.`);
          }
          break;
      }
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN verifyItemsOnPageAreFilteredBySortByOption: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verifies products on page are sorted price low to high.
   */
  async verifyPriceLowToHigh() {
    await this.verifyPriceOrder(true);
  }

  /**
   * Verifies products on page are sorted price high to low.
   */
  async verifyPriceHighToLow() {
    await this.verifyPriceOrder(false);
  }

  /**
   * Verifies that items on the page are sorted based on the specified price order.
   * @param {string} ascendingOrder - The expected sorting order (either 'high to low' or 'low to high').
   * @returns {Promise<void>} - A Promise that resolves once the verification is complete.
   * @author Emmanuel Miller
   */
  async verifyPriceOrder(ascendingOrder) {
    const { PlpMainSection, CardDeckContainer } = el.PLP_INFO;

    // Get the container of items on the page
    const itemsContainer = page.getByTestId(PlpMainSection).getByTestId(CardDeckContainer);
    const items = itemsContainer.locator('li');

    // Create an array to store promises for extracting prices from items
    const pricePromises = [];

    // Loop through items to extract prices
    for (let i = 0; i < items.length - 1; i++) {
      const currentPricePromise = this.extractPriceFromItem(items[i]);
      const nextPricePromise = this.extractPriceFromItem(items[i + 1]);

      pricePromises.push(currentPricePromise, nextPricePromise);
    }

    // Wait for all price promises to resolve
    const prices = await Promise.all(pricePromises);

    // Compare prices based on the specified order
    for (let i = 0; i < prices.length; i += 2) {
      const currentPrice = prices[i];
      const nextPrice = prices[i + 1];

      if (ascendingOrder) {
        // Verify that the current price is less than or equal to the next price for ascending order
        expect(currentPrice).toBeLessThanOrEqual(nextPrice);
      } else {
        // Verify that the current price is greater than or equal to the next price for descending order
        expect(currentPrice).toBeGreaterThanOrEqual(nextPrice);
      }
    }
  }

  /**
   * Normally when user filtered products on a PLP by "New," you are able
   * to see the first few items have the tag "New Arrival" (as of 12/21/23).
   * This ensures the first item has that tag and assumes the rest of the page is
   * filtered accordingly.
   * @author Emmanuel Miller
   */
  async verifyNew() {
    const { PlpMainSection, CardDeckContainer } = el.PLP_INFO;

    try {
      const itemsContainer = page.getByTestId(PlpMainSection).getByTestId(CardDeckContainer);
      const items = itemsContainer.locator('li');
      const productDescriptionPromises = [];

      for (let i = 0; i < items.length - 1; i++) {
        const productDescription = this.extractProductDescriptionFromItem(items[i]);
        productDescriptionPromises.push(productDescription);
      }

      const productDescriptions = await Promise.all(productDescriptionPromises);
      const containsNewProduct = productDescriptions.some((description) => description.includes('New') || description.includes('New Arrival'));

      if (containsNewProduct) {
        testReport.log(this.pageName, 'PAGE IS FILTERED CORRECTLY BY "New');
      }
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN verifyNew: ${error.message}`);
    }
  }

  /**
   * Extracts the price from Product Card.
   * @param {string} item - Item
   * @returns - Price in an integer (number)
   * @author Emmanuel Miller
   */
  async extractPriceFromItem(item) {
    const priceElement = item.locator('.regPrice');
    const priceText = await priceElement.textContent();

    const numericPriceText = priceText.replace(/[^\d.]/g, '');
    return parseFloat(numericPriceText);
  }

  async extractProductDescriptionFromItem(item) {
    try {
      const productDetail = item.locator('.product-detail').locator('.product-name');
      const productNew = productDetail.locator('.product-new');

      if (productNew) {
        return await productNew.textContent();
      }

      return '';
    } catch (error) {
      testReport.log(this.pageName, `Error in extractProductDescriptionFromItem: ${error.message}`);
      return '';
    }
  }

  async plpFilter(plpAvailabilityFilter) {
    let plpAvailabilityFilterSelected = '';
    testReport.log(this.pageName, `Value passsed ${plpAvailabilityFilter}`);
    if (plpAvailabilityFilter === td.plpInfo.ShipsWithFourWeeks) {
      await page.click(el.PLP_INFO.ShipFourWeeks);
      plpAvailabilityFilterSelected = await page.locator(el.PLP_INFO.ShipFourWeeks).innerText();
      testReport.log(this.pageName, `customer clicked ${plpAvailabilityFilterSelected}`);
      this.validateShipSixWeeksButtonSelection();
    } else if (plpAvailabilityFilter === td.plpInfo.ReadyToShip) {
      await page.click(el.PLP_INFO.ReadyToShip);
      plpAvailabilityFilterSelected = await page.locator(el.PLP_INFO.ReadyToShip).innerText();
      testReport.log(this.pageName, `customer clicked ${plpAvailabilityFilterSelected}`);
      this.validateReadyToShipButtonSelection();
    } else if (plpAvailabilityFilter === td.plpInfo.Pickup) {
      await page.waitForLoadState('load');
      await page.click(el.PLP_INFO.Pickup);
      plpAvailabilityFilterSelected = await page.getByTestId(el.PLP_INFO.Pickup).innerText();
      testReport.log(this.pageName, `customer clicked ${plpAvailabilityFilterSelected}`);
      // this.validatePickupButtonSelection();
    } else if (plpAvailabilityFilter === td.plpInfo.ViewAll) {
      await page.click(el.PLP_INFO.ViewAll);
      plpAvailabilityFilterSelected = await page.locator(el.PLP_INFO.ViewAll).innerText();
      testReport.log(this.pageName, `customer clicked ${plpAvailabilityFilterSelected}`);
      this.validateViewAllButtonSelection();
    }
  }

  async validatePLPTitles() {
    if (ISMOBILE) {
      await this.validateMobilePLPTitles();
      await page.waitForLoadState('load');
    } else {
      await this.validateDesktopPLPTitles();
    }
  }

  async validateDesktopPLPTitles() {
    const { MostRelavent, Pickup } = el.PLP_INFO;

    // await page.waitForSelector(Filter, { waitFor: 'visible' });

    const matchingFilter = envUtils.isCb2() ? td.plpInfo.Filter.toUpperCase() : td.plpInfo.Filter;
    await expect(page).toHaveText(matchingFilter, { timeout: 20000 });

    await this.verifyTopFilters();

    await expect(page.locator(MostRelavent)).toHaveText(td.plpInfo.MostRelevant, { ignoreCase: true });
    await this.verifyPLPBreadcrumb();
    await this.verifyPLPHeaderTitle();
    if (await page.isVisible(Pickup)) {
      await expect(page.locator(Pickup)).toHaveText(td.plpInfo.Pickup, { ignoreCase: true });
    }
    testReport.log(this.pageName, 'Verified Desktop PLP Titles');
  }

  async validateMobilePLPTitles() {
    await page.waitForLoadState();

    await this.verifyTopFilters();

    const firstSortButton = await this.getFirstSortByButton();
    await expect(firstSortButton).toContainText('Sort By', { ignoreCase: true });

    const pickUpLocator = page.locator(el.PLP_INFO.Pickup);
    if (pickUpLocator.isVisible({ timeout: 60000 })) {
      testReport.log(`Pickup info : ${this.pageName}`);
      await expect(pickUpLocator).toHaveText(td.plpInfo.Pickup, { ignoreCase: true });
    }

    await this.verifyPLPHeaderTitle();
    testReport.log(this.pageName, 'Verified Mobile PLP Titles');
  }

  async verifyTopFilters() {
    const readyToShipLabel = page.getByTestId('shipNow');
    const shipsWithinFourWeeksLabel = page.getByTestId('shipSoon');
    const viewAllLabel = page.getByTestId('showAll');

    await expect(readyToShipLabel).toHaveText(td.plpInfo.ReadyToShip, { ignoreCase: true });
    await expect(shipsWithinFourWeeksLabel).toHaveText(td.plpInfo.ShipsWithFourWeeks, { ignoreCase: true });
    await expect(viewAllLabel).toHaveText(td.plpInfo.ViewAll, { ignoreCase: true });
  }

  async verifyPLPHeaderTitle() {
    if (await page.isVisible(el.PLP_INFO.headerTitle)) {
      const plpTitle = await page.locator(el.PLP_INFO.headerTitle).innerText();
      if (plpTitle === td.plpInfo.plpHeaderTitle_AllKidsBedding) {
        await expect(page).toHaveText(td.pageName.AllKidsBedding);
        testReport.log(this.pageName, `PLP  title name ${plpTitle}`);
      } else if (plpTitle === td.plpInfo.plpHeaderTitle_Napkins) {
        await expect(page).toHaveText(td.pageName.Napkins);
        testReport.log(this.pageName, `PLP  title name ${plpTitle}`);
      }
    }
  }

  async verifyPLPBreadcrumb() {
    if (await page.isVisible(el.PLP_INFO.headerTitle)) {
      const plpTitle = await page.locator(el.PLP_INFO.headerTitle).innerText();
      if (plpTitle === td.pageName.AllKidsBedding) {
        await expect(page).toHaveText(td.pageName.AllKidsBedding);
        testReport.log(this.pageName, `PLP  title name  in breadcrumb${plpTitle}`);
        await expect(page).toHaveText(td.primaryCategory.KidsBabyBath);
        await expect(page).toHaveText(td.primaryCategory.KidsBeddingBath);
        await expect(page).toHaveText(td.subCategory.KidsBedding);
      } else if (plpTitle === td.pageName.Napkins) {
        await expect(page).toHaveText(td.pageName.Napkins);
        testReport.log(this.pageName, `PLP  title name in breadcrumb${plpTitle}`);
        await expect(page).toHaveText(td.primaryCategory.TableTopBar);
        await expect(page).toHaveText(td.subCategory.TableLinens);
      } else if (plpTitle === td.pageName.SteakKnives) {
        await expect(page).toHaveText(td.pageName.SteakKnives);
        testReport.log(this.pageName, `PLP  title name in breadcrumb${plpTitle}`);
        await expect(page).toHaveText(td.primaryCategory.Kitchen);
        await expect(page).toHaveText(td.subCategory.Cutlery);
      } else if (plpTitle === td.pageName.ThrowPillows) {
        await expect(page).toHaveText(td.pageName.ThrowPillows);
        testReport.log(this.pageName, `PLP  title name in breadcrumb${plpTitle}`);
        await expect(page).toHaveText(td.primaryCategory.DecorPillows);
        await expect(page).toHaveText(td.subCategory.PillowsThrows);
      }
    }
  }

  async compareStoreNamePLP(storeName) {
    const options = { delay: 1000, timeout: 10000 };
    await this.verifyStoreName(storeName);
    // await page.waitForSelector(el.STORE_POPUP.StoreName, { waitFor: 'visible' });
    const popupStoreNameValue = page;
    testReport.log(this.pageName, `StoreName in Popup >>> ${popupStoreNameValue}`);
    // await page.waitForSelector(el.STORE_POPUP.CloseButton, { waitFor: 'visible' });
    await page.click(el.STORE_POPUP.CloseButton, options);
    // await page.waitForSelector(el.PLP_INFO.selectedStoreLabel, { waitFor: 'visible' });
    const plpStoreName = await page.innerText(el.PLP_INFO.selectedStoreLabel, options);
    testReport.log(this.pageName, `Selected Store Name in PLP>>> ${plpStoreName}`);
    await expect(popupStoreNameValue).toHaveText(plpStoreName);
    testReport.log(this.pageName, `StorePopup and PLP StoreName value >>> ${popupStoreNameValue}    ${plpStoreName}`);
  }

  async verifyPDPShipIt() {
    const options = { delay: 1000, timeout: 10000 };
    // await page.waitForSelector(el.PDP_INFO.radioButtonShipIt, { waitFor: 'visible' });
    await expect(page.locator(el.PDP_INFO.radioButtonShipIt)).toBeChecked(options);
    if (await page.isVisible(el.PDP_INFO.ShipIt)) {
      await expect(page).toHaveText(td.pdpInfo.ShipIt);
    } else {
      await expect(page).toHaveText(td.pdpInfo.ShipItCB2);
    }
    await expect(page.locator(el.PDP_INFO.InStockReadyToShip)).toContainText(td.pdpInfo.InStockReadyToShip);
    if (await page.isVisible(el.PDP_INFO.ShipsFree)) {
      await expect(page.locator(el.PDP_INFO.ShipsFree)).toContainText(td.pdpInfo.ShipsFree);
    }
    if (await page.isVisible(el.PDP_INFO.FreeShippingEligible)) {
      await expect(page.locator(el.PDP_INFO.FreeShippingEligible)).toContainText(td.pdpInfo.FreeShippingEligible);
    }
  }

  async verifyPDPCrubsidePickup() {
    const options = { delay: 1000, timeout: 10000 };

    // await page.waitForSelector(el.PDP_INFO.radioButtonFreeCrubsidePickup, { waitFor: 'visible' });
    await expect(page).toHaveText(td.pdpInfo.FreeCrubsidePickup, options);
    await page.click(el.PDP_INFO.radioButtonFreeCrubsidePickup, options);
    await expect(page.locator(el.PDP_INFO.radioButtonFreeCrubsidePickup)).toBeChecked();
    await expect(page).toHaveText(td.pdpInfo.StoreMessage);
    await expect(page).toHaveText(td.pdpInfo.SeeOtherStores);
  }

  async compareStoreNamePDP(storeName) {
    const options = { delay: 1000, timeout: 10000 };

    testReport.log(this.pageName, `INCOMING STORE NAME: ${storeName}`);
    const plpStoreName = page;
    // await page.waitForSelector(el.PLP_INFO.ItemImage, { waitFor: 'visible' });
    await page.click(el.PLP_INFO.ItemImage, options);
    // await page.waitForSelector(el.PDP_INFO.StoreTitle, { waitFor: 'visible' });
    // const scrollPDP = await page.locator(el.PDP_INFO.PromoBanner);
    // await page.waitForSelector(el.PDP_INFO.PromoBanner, { waitFor: "visible" });
    // await scrollPDP.scrollIntoViewIfNeeded();
    let pdpselectedStoreLabel = await page.innerText(el.PDP_INFO.StoreTitle, options);
    pdpselectedStoreLabel = pdpselectedStoreLabel.replace(':', '');
    pdpselectedStoreLabel = pdpselectedStoreLabel.trim();
    testReport.log(this.pageName, `Selected Store Name in PDP>>> ${pdpselectedStoreLabel}`);
    testReport.log(this.pageName, `Selected Store Name in PLP>>> ${plpStoreName}`);
    await expect(plpStoreName).toHaveText(pdpselectedStoreLabel);
    await this.verifyPDPCrubsidePickup();
    testReport.log(this.pageName, `PLP and PDP storeName >>> ${plpStoreName}    ${pdpselectedStoreLabel}`);
  }

  async navigateToPDP() {
    testReport.log(this.pageName, 'PDP page launched ');
  }

  /**
   * Navigates to the specified spCategory landing page, performs verifications, and logs results.
   *
   * @param {string} spCategoryURL - The URL of the spCategory landing page.
   * @param {string} spCategoryHeaderTitle - The expected header title of the spCategory landing page.
   * @returns {Promise<void>}
   * @author Emmanuel Miller
   */
  async spcategoryLandingPage(spCategoryURL, spCategoryHeaderTitle) {
    const { PrimaryHeaderDataTestId } = el.SPCATEGORY;

    common.proceedToCanadaFromGlobalPopup();
    await page.waitForLoadState('load');
    expect(page.url()).toContain(spCategoryURL);
    testReport.log(this.pageName, 'Verified spCategory Landing Page URL.');

    if (!ISMOBILE) {
      const primaryHeader = page.getByTestId(PrimaryHeaderDataTestId);

      await expect(primaryHeader).toBeVisible();
      await expect(primaryHeader).toContainText(spCategoryHeaderTitle);
      testReport.log(this.pageName, 'Verified spCategory headerTitle Tag.');
    }
  }

  /**
   * Verifies the spCategory page by checking titles, view all links, and images.
   * @author Emmanuel Miller
   */
  async verifySpcategoryPage() {
    const { SectionRenewHeader } = el.SPCATEGORY;
    const sectionRenewHeader = page.getByTestId(SectionRenewHeader);
    const sectionRenewHeaderCount = await sectionRenewHeader.count();

    testReport.log(this.pageName, `COUNT OF sectionRenewHeader: ${sectionRenewHeaderCount}`);

    await page.waitForLoadState('load');
    this.handleCB2GeoLocationPopup();

    const promises = [];

    for (let i = 1; i <= sectionRenewHeaderCount; i++) {
      promises.push(this.verifyHeader(i));
    }

    await Promise.all(promises);

    testReport.log(this.pageName, 'spCategory');
  }

  /**
   * Verifies the elements within a header, including titles and view all links.
   * @param {number} i - The index of the header.
   * @author Emmanuel Miller
   */
  async verifyHeader(i) {
    const { TitleCarousel, ViewAll, SpategoryFavorites } = el.SPCATEGORY;

    // clear before adding
    this.expectedSubwayCarouselItems = [];

    if (await page.isVisible(TitleCarousel)) {
      const titleSpcategoryText = page;
      const titleCarouselText = await page.innerText(`${TitleCarousel}[${i}]`);

      await expect(titleSpcategoryText).toHaveText(titleCarouselText);
      testReport.log(this.pageName, `Title >>>> ${titleSpcategoryText}`);
    }

    await expect(page.locator(`${ViewAll}[${i}]`)).toBeVisible();
    const subwayCarouselItems = await page.innerText(`${ViewAll}[${i}]`);

    testReport.log(this.pageName, `View ALL >>>> ${subwayCarouselItems}`);
    this.expectedSubwayCarouselItems.push(subwayCarouselItems);

    const countImage = await page.locator(`${SpategoryFavorites}[${i}]//li//button)`).count();

    const imagePromises = [];

    for (let j = 1; j <= countImage; j++) {
      if (countImage <= 6) {
        imagePromises.push(this.verifyImage(i, j));
      }
    }

    await Promise.all(imagePromises);
  }

  /**
   * Verifies individual images within a header, including favorites icon and product details.
   * @param {number} i - The index of the header.
   * @param {number} j - The index of the image within the header.
   * @author Emmanuel Miller
   */
  async verifyImage(i, j) {
    const { SpategoryFavorites, Title, ProductName, RegPrice } = el.SPCATEGORY;

    await expect(page.locator(`${SpategoryFavorites}[${i}]//li//button)[${j}]`)).toBeVisible();

    testReport.log(this.pageName, 'Favorites icon displayed in spCategory Page ');

    await expect(page.locator(`${Title}[${i}]//ul//li[${j}]${ProductName}`)).toBeVisible();
    testReport.log(this.pageName, `Product title  >>>> ${await page.innerText(`${Title}[${i}]//ul//li[${j}]${ProductName}`)}`);

    if (await page.isVisible(RegPrice)) {
      await expect(page.locator(`${Title}[${i}]//ul//li[${j}]${RegPrice}`)).toBeVisible();
      testReport.log(this.pageName, `Regular PRice >>>> ${await page.innerText(`${Title}[${i}]//ul//li[${j}]${RegPrice}`)}`);
    }
  }

  /**
   * Verifies the spCategory ShopAll page by checking header titles and corresponding PLP titles.
   * @author Emmanuel Miller
   */
  async verifySpcategoryShopall() {
    const headerCount = await page.getByTestId(el.SPCATEGORY.SectionRenewHeader).count();
    const promises = [];

    this.handleCB2GeoLocationPopup();
    await page.waitForLoadState('load');

    for (let i = 1; i <= headerCount; i++) {
      promises.push(this.verifyHeaderShopall(i));
    }

    await Promise.all(promises);
  }

  /**
   * Verifies the ShopAll functionality for a specific header.
   * @param {number} i - The index of the header.
   * @author Emmanuel Miller
   */
  async verifyHeaderShopall(i) {
    const headerTitle = await page.innerText(`${el.SPCATEGORY.TitleSpcategory}[${i}]`);
    const foundShopAllInnerText = await page.innerText(`${el.SPCATEGORY.lnkShopAll}[${i}]//following-sibling::*[contains(@class,"shop-all")]/a`);

    if (foundShopAllInnerText === 'Shop All') {
      await this.clickAndVerifyShopAll(i, headerTitle);
    }
  }

  /**
   * Clicks the "Shop All" link, verifies titles, and navigates back.
   * @param {number} i - The index of the header.
   * @param {string} headerTitle - The title of the header.
   * @author Emmanuel Miller
   */
  async clickAndVerifyShopAll(i, headerTitle) {
    const { SpategoryViewAllContainer } = el.SPCATEGORY;

    await page.click(`${SpategoryViewAllContainer}[${i}]`);
    await page.waitForLoadState('load');

    await page.click(`${SpategoryViewAllContainer}[${i}]`);
    await page.waitForLoadState('load');

    const plpTitle = page;
    await expect(headerTitle).toHaveText('plp-header', plpTitle);
    testReport.log(this.pageName, `Header Title ${headerTitle} PLP title ${plpTitle} are equal`);

    await page.goBack();
    await page.waitForLoadState('load');
    await page.goBack();
    await page.waitForLoadState('load');
  }

  async verifySupercategoryPage(superCategoryItem) {
    const options = { delay: 1000, timeout: 10000, ignoreCase: true };

    let superCategorytitle = '';
    let mobileSuperCategoryTitle = '';

    await page.waitForLoadState('load');

    if (await page.isVisible(el.PLP_INFO.MobileSuperCategoryHeaderTitle)) {
      mobileSuperCategoryTitle = await page.locator(el.PLP_INFO.MobileSuperCategoryHeaderTitle).innerText(options);
      // await page.waitForSelector(el.PLP_INFO.MobileSuperCategoryHeaderTitle, { waitFor: 'visible' });
      expect(mobileSuperCategoryTitle).toEqual(superCategoryItem);
      testReport.log(this.pageName, `Compared the title >> ${mobileSuperCategoryTitle} equal to ${superCategoryItem}`);
    } else {
      superCategorytitle = await page.locator(el.PLP_INFO.SuperCategoryHeaderTitle).innerText();
      // await page.waitForSelector(el.PLP_INFO.SuperCategoryHeaderTitle, { waitFor: 'visible' });
      await expect(page.locator(el.PLP_INFO.SuperCategoryHeaderTitle)).toHaveText(superCategoryItem, options);
      testReport.log(this.pageName, `Compared the title >> ${superCategorytitle} equal to ${superCategoryItem}`);
    }
  }

  /**
   * Verifies the content of the Subway Carousel.
   *
   * This method ensures that the Subway Carousel is visible, retrieves its items,
   * and compares the count with the expected count.
   * @author Emmanuel Miller
   */
  async verifySubwayCarousel() {
    testReport.log(this.pageName, 'Starting Verification of Subway Carousel');

    const { SpategorySubwayCarousel, SectionRenewHeader, ViewAll } = el.SPCATEGORY;
    const subwayCarouselItems = [];

    // wait for subway carousel to be visible
    const spategorySubwayCarousel = page.getByTestId(SpategorySubwayCarousel);
    await expect(spategorySubwayCarousel).toBeVisible();

    // get subway carousel items
    const sectionRenewHeader = page.getByTestId(SectionRenewHeader);
    const headerCount = await sectionRenewHeader.count();

    await Promise.all(
      Array.from({ length: headerCount }, (_, i) => i + 1).map(async (i) => {
        await expect(page.locator(`${ViewAll}[${i}]`)).toBeVisible();
        const subwayCarouselItem = await page.innerText(`${ViewAll}[${i}]`);
        subwayCarouselItems.push(subwayCarouselItem);
      })
    );

    testReport.log(this.pageName, `THE COUNT OF EXPECTED SUBWAY CAROUSEL ITEMS: ${this.expectedSubwayCarouselItems.length}`);
    testReport.log(this.pageName, `THE COUNT OF SUBWAY CAROUSEL ITEMS IS: ${subwayCarouselItems.length}`);

    try {
      if (this.expectedSubwayCarouselItems.length === subwayCarouselItems.length) {
        testReport.log(this.pageName, 'EXPECTED SUBWAY CAROUSEL ITEMS COUNT MATCHES COUNT ON PAGE.');
      }
    } catch (err) {
      testReport.log(this.pageName, 'ERROR :: SUBWAY CAROUSEL ITEMS COUNT DOES NOT MATCH COUNT ON PAGE.');
      throw err;
    }

    // clear after verifying
    this.expectedSubwayCarouselItems = [];
  }

  async validateShipSixWeeksFilter() {
    await this.validateViewAllButtonSelection();
    await page.click(el.PLP_INFO.ShipFourWeeks);
    await this.validateShipSixWeeksButtonSelection();
  }

  async validateReadyToShipFilter() {
    await this.validateShipSixWeeksButtonSelection();
    await page.click(el.PLP_INFO.ReadyToShip);
    await this.validateReadyToShipButtonSelection();
    await this.updateZipcode();
  }

  async verifyZipcodeSection() {
    const options = { delay: 1000, timeout: 10000 };
    const element = await page.innerText(el.PLP_INFO.ZipcodeValue);
    // await page.waitForSelector(el.PLP_INFO.btnZipcodeValue, { waitFor: 'visible' });
    await expect(page.locator(el.PLP_INFO.btnZipcodeValue)).toBeVisible(options);
    if (element === td.plpInfo.ZipCodeCB) {
      await expect(page.locator(el.PLP_INFO.Zipcode)).toBeVisible(options);
    } else {
      await expect(page.locator(el.PLP_INFO.CB2Zipcode)).toBeVisible(options);
    }
    await page.click(el.PLP_INFO.btnZipcodeValue);
    await expect(page.locator(el.PLP_INFO.inputZipcode)).toBeVisible();
    await expect(page.locator(el.PLP_INFO.btnZipcodeEnter)).toBeVisible();
    await page.click(el.PLP_INFO.btnZipcodeValue);
    testReport.log(this.pageName, 'Verified zipcode section');
  }

  async updateZipcode(zipCode) {
    const options = { delay: 1000, timeout: 10000 };

    // await page.waitForSelector(el.PLP_INFO.btnZipcodeValue, { waitFor: 'visible' });
    await page.click(el.PLP_INFO.btnZipcodeValue, options);

    const temp = await page.locator(el.PLP_INFO.inputZipcode).inputValue();
    await page.click(el.PLP_INFO.inputZipcode);

    const backspacePromises = Array.from({ length: temp.length }, () => page.keyboard.press('Backspace'));

    await Promise.all(backspacePromises);

    // await page.waitForSelector(el.PLP_INFO.inputZipcode, { waitFor: 'visible' });
    await page.fill(el.PLP_INFO.inputZipcode, zipCode, options);
    // await page.waitForSelector(el.PLP_INFO.btnZipcodeEnter, { waitFor: 'visible' });
    await page.click(el.PLP_INFO.btnZipcodeEnter, options);

    testReport.log(this.pageName, `Updated zipcode to ${zipCode}`);
  }

  async pageAfterZipcodeUpdate(zipCode) {
    // await page.waitForSelector(el.PLP_INFO.ZipcodeValue, { waitFor: 'visible' });
    await page.waitForLoadState('load');
    await expect(page).toHaveText(zipCode, { delay: 1000, timeout: 10000 });
    const zipcodeAfterUpdate = await page.innerText(el.PLP_INFO.ZipcodeValue);
    testReport.log(this.pageName, `Zipcode after update >>> ${zipcodeAfterUpdate}    ${zipCode}`);
  }

  async compareZipcode(zipCode) {
    const options = { delay: 1000, timeout: 10000 };

    // await page.waitForSelector(el.PLP_INFO.ZipcodeValue, { waitFor: 'visible' });
    const plpZipcodeValue = page;
    testReport.log(`plpZipcodeValue ********************** ${plpZipcodeValue}`);
    testReport.log(this.pageName, `Zipcode PLP >>> ${plpZipcodeValue}`);
    const scrollCB = await page.innerText(el.PLP_INFO.ShopByCategory);
    if (scrollCB.includes('Shop by Category')) {
      await page.locator(el.PLP_INFO.ShopByCategory).scrollIntoViewIfNeeded();
    } else {
      await page.locator(el.PLP_INFO.CB2Facebook).scrollIntoViewIfNeeded();
    }
    // await page.waitForSelector(el.PLP_INFO.ItemImage, { waitFor: 'visible' });
    await page.click(el.PLP_INFO.ItemImage, options);
    const scrollPDP = page.locator(el.PDP_INFO.AddToCart);
    await scrollPDP.scrollIntoViewIfNeeded();
    // await page.waitForSelector(el.PDP_INFO.ZipcodeValue, { waitFor: 'visible' });
    let pdpZipcodeValue = await page.innerText(el.PDP_INFO.ZipcodeValue, options);
    pdpZipcodeValue = pdpZipcodeValue.substring(0, 5);
    testReport.log(`pdpZipcodeValue ********************** ${pdpZipcodeValue}`);
    testReport.log(this.pageName, `Zipcode PDP >>> ${pdpZipcodeValue}`);
    await expect(plpZipcodeValue).toHaveText(pdpZipcodeValue);
    await this.verifyPDPShipIt();
    testReport.log(this.pageName, `PLP and PDP ZIpcode value >>> ${plpZipcodeValue}    ${zipCode}`);
  }

  async validateBreadCrumb() {
    if (!ISMOBILE) await this.verifyPLPBreadcrumb();
  }

  async validateViewAllButtonSelection() {
    const element = page.locator(el.PLP_INFO.ViewAll);
    const color = await element.evaluate((elem) => window.getComputedStyle(elem).getPropertyValue('background-color'));
    if (color === td.plpInfo.plpAvailabilityFilterButtonSelection) {
      expect(color).toEqual(td.plpInfo.plpAvailabilityFilterButtonSelection);
    } else {
      expect(color).toEqual(td.plpInfo.cb2PLPAvailabilityFilterButtonSelection);
    }
    testReport.log(this.pageName, `Background Color  of ViewAll Button >>> ${color}`);
  }

  async validateShipSixWeeksButtonSelection() {
    const element = page.locator(el.PLP_INFO.ShipFourWeeks);
    const color = await element.evaluate((elem) => window.getComputedStyle(elem).getPropertyValue('background-color'));
    if (color === td.plpInfo.plpAvailabilityFilterButtonSelection) {
      expect(color).toEqual(td.plpInfo.plpAvailabilityFilterButtonSelection);
    } else {
      expect(color).toEqual(td.plpInfo.cb2PLPAvailabilityFilterButtonSelection);
    }
    testReport.log(this.pageName, `Background Color of ShipSixWeeks Button >>> ${color}`);
  }

  async validateReadyToShipButtonSelection() {
    const element = page.locator(el.PLP_INFO.ReadyToShip);
    const color = await element.evaluate((elem) => window.getComputedStyle(elem).getPropertyValue('background-color'));
    if (color === td.plpInfo.plpAvailabilityFilterButtonSelection) {
      expect(color).toEqual(td.plpInfo.plpAvailabilityFilterButtonSelection);
    } else {
      expect(color).toEqual(td.plpInfo.cb2PLPAvailabilityFilterButtonSelection);
    }
    testReport.log(this.pageName, `Background Color of ReadyToShip  >>>  ${color}`);
  }

  async validatePickupButtonSelection() {
    const element = page.getByTestId(el.PLP_INFO.Pickup);
    if (element.isVisible) {
      const color = await element.evaluate((elem) => window.getComputedStyle(elem).getPropertyValue('background-color'));
      if (color === td.plpInfo.plpAvailabilityFilterButtonSelection) {
        expect(color).toEqual(td.plpInfo.plpAvailabilityFilterButtonSelection);
      } else {
        expect(color).toEqual(td.plpInfo.cb2PLPAvailabilityFilterButtonSelection);
      }
      testReport.log(this.pageName, `Background Color of Pickup  >>>  ${color}`);
    }
  }

  async setStorefromPopup(zipCode) {
    const options = { timeout: 10000 };

    // await page.waitForSelector(el.STORE_POPUP.PopupHeaderLabel, { waitFor: 'visible' });
    await expect(page).toHaveText(td.storeInfo.PopupHeaderLabel, options);
    await expect(page).toHaveText(td.storeInfo.EnterZipCodeLabel, options);
    await page.waitForLoadState('load');
    // await page.waitForSelector(el.STORE_POPUP.inputZipcode, { waitFor: 'visible' });
    await page.fill(el.STORE_POPUP.inputZipcode, zipCode, { delay: 1000 });
    await page.waitForLoadState('load');
    // await page.waitForSelector(el.STORE_POPUP.SubmitZipcode, { waitFor: 'visible' });
    await page.click(el.STORE_POPUP.SubmitZipcode, options);
    testReport.log(this.pageName, `Added zipcode is ${zipCode}`);
    await page.waitForLoadState('load');
    await expect(page.locator(el.STORE_POPUP.MakeThisStore)).toHaveText(td.storeInfo.MakeThisStore, { ignoreCase: true });
    await page.click(el.STORE_POPUP.MakeThisStore);
    await page.waitForLoadState('load');
    this.validatePickupButtonSelection();
    await page.click(el.PLP_INFO.selectedStoreLabel);
    // await page.waitForSelector(el.STORE_POPUP.ThisIsMyStore, { waitFor: 'visible' });
    await expect(page).toHaveText(td.storeInfo.ThisIsMyStore, options);
  }

  async verifyStoreName(storeName) {
    if (await expect(page).toHaveText(storeName)) {
      await expect(page).toHaveText(td.storeInfo.StoreNameOakbrook);
      await expect(page).toHaveText(td.storeInfo.CityStateZipcodeOakbrook);
      // await expect(page).toHaveText(td.storeInfo.StoreNameNorthClybourn);
      // await expect(page).toHaveText(td.storeInfo.CityStateZipcodeNorthClybourn);
    }
  }

  async handleCB2GeoLocationPopup() {
    if (await page.isVisible(el.SITECOMMON.CONTINUE_TO_CANADA)) {
      await page.click(el.SITECOMMON.CONTINUE_TO_CANADA);
    }
  }

  async readSku(productIndex = 1) {
    const liProductCardElement = page.locator(this.liProductCard.replace('X', productIndex));
    const sku = await liProductCardElement.getAttribute('id');
    return sku;
  }

  async clickAddToRegistry(sku) {
    await page.click(this.btnAddToRegistry.replace('X', sku));
  }

  /**
   * Favorites a product based off SKU on the current PLP.
   *
   * @param {string} sku - The SKU of the product to favorite.
   * @returns {Promise<void>} - A Promise that resolves once the favoriting process is complete.
   * @author Emmanuel Miller
   */
  async favoriteProduct(sku) {
    const { FavoritesAddButtonSelector, FavoritesPopupClose } = el.HOMEPAGE_HEADER;
    try {
      const locatedFirstFavoriteButton = page.getByTestId(sku);
      await locatedFirstFavoriteButton.locator('button').click({ timeout: 60000 });

      const locatedSecondFavoriteButton = page.getByTestId(FavoritesAddButtonSelector);
      await locatedSecondFavoriteButton.locator('button').click({ timeout: 60000 });

      const closeAddedFavoritesModel = page.getByTestId(FavoritesPopupClose);
      await closeAddedFavoritesModel.click({ timeout: 60000 });
    } catch (error) {
      testReport.log(this.pageName, `ERROR IN favoriteProduct: ${error.message}`);
    }
  }
}

module.exports = { PLPpage };
