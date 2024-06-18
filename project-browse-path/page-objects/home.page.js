/* eslint-disable playwright/no-wait-for-timeout */
const { expect } = require('@playwright/test');
const fs = require('fs');
const el = require('../elements/elements');

const { CommonUtils } = require('../../support/utils/common-utils');
// eslint-disable-next-line import/no-restricted-paths
const { ProductPage } = require('../../project-browse-product/page-objects/pages/product/product.page');
const { ReportUtils } = require('../../support/utils/report-utils');
const { EnvironmentUtils } = require('../../support/utils/env-utils');

const env = require('../../support/env/env');
const PageObject = require('../../project-shared/page-objects/pages/page-object');

const envUtils = new EnvironmentUtils();

const common = new CommonUtils();
const productPage = new ProductPage();
const testReport = new ReportUtils();

const _IMGPATH = 'testdata/img.jpg';
const _ISMOBILE = common.verifyIsMobile();
const _VISIBLE = 'visible';
const _BUTTON = 'button';
const _LINK = 'link';

class HomePage extends PageObject {
  pageName = this.constructor.name;

  async goto() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    await page.goto(env.BASE_URL);
  }

  async gotoLocalVerifier() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL_Availability}`);
    await page.goto(env.BASE_URL_Availability);

    // handling global location popup in CAN sites
    // if (env.EXEC_SITE.includes('can')) await common.proceedToCanadaFromGlobalPopup();
  }

  async readJson() {
    const dataArray = JSON.parse(fs.readFileSync('./page-objects/datafiles/item.json', 'utf-8'));
    return dataArray;
  }

  /**
   * @deprecated
   */
  async searchItem(skuNum) {
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    if (skuNum === 'itemList') {
      const items = await this.readJson();
      items.map((arrItem) => {
        const itemSku = arrItem.sku;

        // page.waitForSelector(el.HOMEPAGE.SEARCH_TXTBOX, { waitFor: _VISIBLE });
        page.fill(el.HOMEPAGE.SEARCH_TXTBOX, itemSku, { delay: 1000 });
        // page.waitForSelector(el.HOMEPAGE.SEARCH_BUTTON);
        page.locator(el.HOMEPAGE.SEARCH_BUTTON).click({ timeout: 10000 });
        expect(page.innerText(el.PRODUCTPAGE.SKU_NUM)).to.equal(itemSku);
        testReport.log(this.pageName, `Searching SKU: ${itemSku}`);

        return itemSku;
      });
    } else {
      // await page.waitForSelector(el.HOMEPAGE.SEARCH_TXTBOX, { waitFor: _VISIBLE });
      await page.fill(el.HOMEPAGE.SEARCH_TXTBOX, skuNum, { delay: 100 });
      // await page.waitForSelector(el.HOMEPAGE.SEARCH_BUTTON, { waitFor: _VISIBLE });
      testReport.log(this.pageName, `Searching SKU: ${skuNum}`);
      await page.locator(el.HOMEPAGE.SEARCH_BUTTON).click({ timeout: 120000 });
      await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    }
  }

  async launchPDP(urlString) {
    await page.goto(global.baseURL + urlString);
    if (!urlString.includes('gift-cards')) {
      // eslint-disable-next-line playwright/no-wait-for-selector
      await page.waitForSelector('[data-testid="add-to-cart-button"]');
    }
  }

  async launchPDPAvailability(urlString) {
    await page.goto(global.availabilityBaseURL + urlString);
  }

  async LoginfromHomepage() {
    await page.customClick(el.HOMEPAGE.LOGIN_LINK, 'homepage login link');
    await page.fill(el.LOGINPAGE.EMAIL_TXTBOX, 'autotesting@gmail.com');
    await page.fill(el.LOGINPAGE.PWD_TXTBOX, 'Password@123');
    await page.customClick(el.LOGINPAGE.SIGNIN_BUTTON, 'loginpage signin _BUTTON');
    await page.waitForLoadState();
  }

  async openSignInPopUp() {
    if (_ISMOBILE) {
      await page.customClick(el.HOMEPAGE.SIGNINICONMOBILE_BUTTON, 'hover login icon');
      await page.customClick(el.HOMEPAGE.SIGNINMOBILE_LINK, 'login link clicked');
    } else {
      await page.customClick(el.HOMEPAGE.LOGIN_LINK, 'homepage login link');
      // await page.waitForTimeout(3000);
    }
  }

  async UploadanImage() {
    await page.customClick(el.REGISTRYPAGE.PREFERENCE_LINK, 'registry preference link');
    await page.setInputFiles(el.REGISTRYPAGE.EDITPIC_BUTTON, _IMGPATH);
    testReport(this.pageName, 'File uploaded successfully');
  }

  async NavigatetoCustomerServicepage() {
    await page.customClick(el.HOMEPAGE.CUSTOMERSERVICE_LINK, 'homepage customer service link');
  }

  async NavigatetoSellingPreferencesLink() {
    await page.customClick(el.CUSTOMERSERVICEPAGE.PREFERENCES_BUTTON, 'customer service preferences _BUTTON');
    const [newPage] = await Promise.all([
      global.context.waitForEvent('page'),
      page.customClick(el.CUSTOMERSERVICEPAGE.SELLINGPREFERENCES_LINK, 'customer service selling perferences link')
    ]);
    await newPage.waitForLoadState();
    testReport(this.pageName, `New Page Title: ${await newPage.title()}`);

    // Fill the form
    await newPage.fill(el.SELLINGPREFERENCESPAGE.FNAME_TXTBOX, 'John');
    await newPage.fill(el.SELLINGPREFERENCESPAGE.LNAME_TXTBOX, 'Smith');
    await newPage.fill(el.SELLINGPREFERENCESPAGE.ADDRESS_TXTBOX, '1104 Stearns Hill Rd');
    await newPage.fill(el.SELLINGPREFERENCESPAGE.EMAIL_TXTBOX, 'john.smith@gmail.com');
  }

  async verifyPresenceOfBannerItem(bannerItem) {
    if (_ISMOBILE) {
      testReport.log(this.pageName, `Skipping ${bannerItem} to be present in header banner for mobile.`);
    } else {
      const bannerItemLocator = page.getByTestId('site-header-desktop').getByRole('list').getByRole(_LINK, { name: bannerItem });
      await expect(bannerItemLocator).toBeVisible();
      testReport.log(this.pageName, `Verified ${bannerItem} to be present in header banner for desktop.`);
    }
  }

  async clickBannerItem(bannerItem, newTab) {
    if (_ISMOBILE) {
      testReport.log(this.pageName, `Skipping ${bannerItem} to be clicked in header banner for mobile.`);
    } else {
      const bannerItemLocator = page.getByTestId('site-header-desktop').getByRole('list').getByRole(_LINK, { name: bannerItem });
      if (newTab === 'new') {
        const [newPage] = await Promise.all([global.context.waitForEvent('page'), bannerItemLocator.click({ delay: 1000 })]);
        await newPage.waitForLoadState('load', { timeout: 60000 });
        global.page = newPage;
      } else {
        await bannerItemLocator.click({ delay: 1000 });
      }
      testReport.log(this.pageName, `Clicked ${bannerItem} in header banner for desktop.`);
    }
  }

  async verifyCountrySelector() {
    const countrySelectorLocator = _ISMOBILE
      ? page.locator("//a[contains(@class,'international-shipping-chooser')] | //button[contains(@class,'shipping-chooser-button')]")
      : page.getByTestId('header-country-selector').getByRole(_BUTTON);
    await expect(countrySelectorLocator).toBeVisible();
    testReport.log(this.pageName, 'Verified CountrySelector option is present in header banner');
  }

  async clickCountryIcon() {
    const countrySelectorLocator = _ISMOBILE
      ? page.locator("//a[contains(@class,'international-shipping-chooser')] | //button[contains(@class,'shipping-chooser-button')]")
      : page.getByTestId('header-country-selector').getByRole(_BUTTON);
    await countrySelectorLocator.waitFor(_VISIBLE);
    await countrySelectorLocator.dispatchEvent('click');
  }

  async verifyCountryPopup() {
    // await expect(await page.locator("//div[@class='shipping-form-container']").isVisible()).toBeTruthy();
    // await expect(await page.locator("//div[@class='shipping-form-container']").isVisible()).toBeTruthy();
  }

  async selectCanadaButton() {
    if (_ISMOBILE) {
      // TODO: complete this while doing the footer
    } else {
      const canadaOption = page.getByText('Canada (CAD)crateandbarrel.ca');
      await canadaOption.click({ delay: 1000 });
      await page.getByRole(_BUTTON, { name: 'Save and Continue' }).click({ delay: 1000 });
    }
  }

  async verifyCanadaSite() {
    if (_ISMOBILE) {
      // TODO: complete this while doing the footer
    } else {
      // await expect(page).toHaveURL(new RegExp('.*www.crateandbarrel.ca/$'));
      await expect(page).toHaveURL(/.*www.crateandbarrel.ca\/$/);
      testReport.log(this.pageName, 'Verified navigating to Crate canada is working from Crate USA');
    }
  }

  /**
   * Validate the pattern passed is correct and addes a log.
   */
  async verifyURL(pattern) {
    testReport.log(this.pageName, `Page is displayed with url actual :: ${page.url()} expected :: ${pattern}`);
    await expect.soft(page).toHaveURL(pattern);
  }

  async navigateToCrateAndKidsHomePage() {
    testReport.log(this.pageName, 'Navigate to Crate and Kids US homepage');
    const options = { delay: 100 };

    if (_ISMOBILE) {
      await page.click(el.HEADER_MOBILE.MobileMenu, { options });
      // await page.waitForSelector(el.HOMEPAGE_HEADER.crateKidsMobile, { waitFor: _VISIBLE });
      await page.click(el.HOMEPAGE_HEADER.crateKidsMobile, { options });
      await page.click(el.HOMEPAGE_HEADER.kidsNavMobile, { options });
    } else {
      // await page.waitForSelector(el.HOMEPAGE_HEADER.CrateKids, { waitFor: _VISIBLE });
      await page.click(el.HOMEPAGE_HEADER.CrateKids, { options });
    }
  }

  async navigateToCartPageFromHeader() {
    const options = { delay: 1000, timeout: 10000 };
    testReport.log(this.pageName, 'Navigate to Cart page by clicking the cart icon from the header');
    await page.getByTestId('header-cart-container').waitFor(_VISIBLE);
    const cartIconLocator = _ISMOBILE
      ? page.getByTestId('header-cart-container').getByRole(_BUTTON).first()
      : page.getByTestId('header-cart-container').getByTestId('anchor-link').first();
    await cartIconLocator.waitFor(_VISIBLE);
    await cartIconLocator.click();
    await page.waitForLoadState('load');
    if (_ISMOBILE) {
      // await page.waitForSelector(el.HOMEPAGE_HEADER.btnViewCart, { waitFor: _VISIBLE });
      await page.locator(el.HOMEPAGE_HEADER.btnViewCart).click(options);
      await page.waitForLoadState('load');
    }
    testReport.log(this.pageName, 'Successfully navigated to Cart page');
  }

  async clickOnPrimaryNavigation(primaryNavOption) {
    if (_ISMOBILE) {
      await page.click(el.HEADER_MOBILE.MobileMenu);
      const primaryNavOptionLocator = page.getByTestId('header-menu-container').getByRole(_BUTTON, { name: primaryNavOption });
      await primaryNavOptionLocator.click();
      const shopAllLocator = page.getByTestId('header-menu-container').getByRole(_LINK, { name: `Shop All ${primaryNavOption}` });
      await shopAllLocator.click();
      testReport.log(this.pageName, `Clicked on Primary navigation option:: ${primaryNavOption} is clicked.`);
    } else {
      const primaryNavOptionLocator = page.getByTestId('primary-navigation').getByRole(_LINK, { name: primaryNavOption });
      await primaryNavOptionLocator.click();
      testReport.log(this.pageName, `Clicked on Primary navigation option:: ${primaryNavOption} is clicked.`);
    }
  }

  async verifyPrimaryNavigationUrl(heading) {
    const cartIconLocator = _ISMOBILE
      ? page.getByTestId('header-cart-container').getByRole(_BUTTON).first()
      : page.getByTestId('header-cart-container').getByTestId('anchor-link').first();
    await cartIconLocator.waitFor(_VISIBLE);
    await expect(page.locator('h1')).toHaveText(heading);
    testReport.log(this.pageName, `Verfied header on Primary navigation option::  ${heading}`);
  }

  async clickOnSecondaryNavigation(secondaryNavOption, flyout) {
    if (_ISMOBILE) {
      await page.click(el.HEADER_MOBILE.MobileMenu);
      await page.waitForLoadState('load', { timeout: 30000 });
      if (flyout === 'true') {
        await page.getByTestId('header-menu-container').getByRole(_BUTTON, { name: secondaryNavOption }).click({ trail: true });
        await page.waitForLoadState('load', { timeout: 30000 });
        await await page
          .getByTestId('header-menu-container')
          .getByRole(_BUTTON, { name: secondaryNavOption })
          .locator('..')
          .locator('..')
          .getByRole(_LINK)
          .first()
          .click({ trail: true });
      } else {
        await page.getByTestId('header-menu-container').getByRole(_LINK, { name: secondaryNavOption }).click({ trail: true });
      }
      testReport.log(this.pageName, `Clicked on secondary navigation option:: ${secondaryNavOption} is clicked.`);
    } else {
      if (flyout === 'true') {
        await page.getByTestId('secondary-navigation').getByRole(_BUTTON, { name: secondaryNavOption }).hover({ trail: true });
        await page.locator("//div[@class='brand-nav']").getByRole(_LINK).first().click({ trail: true });
      } else {
        await page.getByTestId('secondary-navigation').getByRole(_LINK, { name: secondaryNavOption }).click();
      }
      testReport.log(this.pageName, `Clicked on secondary navigation option:: ${secondaryNavOption} is clicked.`);
    }
  }

  async verifyCartHasNoItems() {
    const expectedValue = 0;
    const cartIconLocator = _ISMOBILE
      ? page.getByTestId('header-cart-container').getByRole(_BUTTON).first()
      : page.getByTestId('header-cart-container').getByTestId('anchor-link').first();

    await cartIconLocator.waitFor(_VISIBLE);

    const actualCartList = page.locator(el.HOMEPAGE_HEADER.listOfCartItems);

    await expect(actualCartList.length).toHaveCount(expectedValue);
  }

  async verifyLocationIconDropDownContents() {
    let zipCode = envUtils.isUs() ? '60601' : 'L5T2T5';
    const country = envUtils.isUs() ? 'US' : 'CA';
    const appendZipCodeUpdateString = envUtils.isUs() ? 'ZIP code. Update.' : 'Postal Code. Update.';

    testReport.log(this.pageName, `VERIFYING COUNTRY: ${country}. CALCULATED COUNTRY AFTER CHECKING ENV FILE: ${zipCode}`);

    const mapPinZipCodeDropDown = page.getByTestId(el.HOMEPAGE_HEADER.MapPinZipCodeDropDown);

    await expect(mapPinZipCodeDropDown.locator('span').nth(0)).toContainText('Shipping to ');
    await expect(mapPinZipCodeDropDown.getByRole(_BUTTON)).toHaveText((zipCode += appendZipCodeUpdateString) || ''); // when running in preview there is no pre-selected zipcode (i.e. '')
  }

  async addItemToCart(sku, goToCartPage = false, quantityAdjuster = null) {
    if (await page.locator('global-flyout header-cart-flyout').locator('button').isVisible()) {
      await page.locator('header-cart-flyout').locator('button').click({ timeout: 12000 });
    }

    const itemInfo = [];
    await this.searchItem(sku);
    const item = JSON.stringify(await productPage.validateProductPage(sku));
    await productPage.clickAddToCart(quantityAdjuster);
    await page.waitForTimeout(3000);
    if (goToCartPage) {
      await productPage.clickCheckoutNow();
    } else {
      await this.clickSwatch();
    }
    itemInfo.push(item);

    this.itemsInfo = itemInfo;
  }

  async clickSwatch() {
    await page.locator(el.PRODUCTPAGE.FREE_SWATCH_POPUP_CLOSE_BUTTON).click();
  }

  async logoutFromHeaderMobile() {
    const signOutButton = page.getByTestId('unordered-list').getByTestId('list-item').getByRole(_BUTTON, { name: 'Sign Out' });

    expect(signOutButton).toBeTruthy();
    await signOutButton.click({ delay: 300 });
  }

  async verifyDefaultCountrySelector() {
    testReport.log(this.pageName, `Vefirying the default options for country selector: ${env.COUNTRY}`);

    testReport.log(this.pageName, 'Verified CountrySelector option is present in header banner');
    const countryOptionLocator = env.COUNTRY === 'US' ? page.locator('#us-select') : page.locator('#canada-select');
    testReport.log(this.pageName, `Verifying the current option to be default on ${env.BRAND}-${env.COUNTRY}`);
    await page.waitForLoadState('load', { timeout: 30000 });
    await countryOptionLocator.waitFor(_VISIBLE);
    await expect(await countryOptionLocator).toBeChecked();
    testReport.log(this.pageName, 'Verified Default state of CountrySelector to have Us Option picked as deafult option');
  }

  async verifyCountrySelected() {
    await page.waitForLoadState('load', { timeout: 30000 });
    await page.getByTestId('header-logo').getByRole(_LINK).waitFor(_VISIBLE, { timeout: 30000 });
    if (env.COUNTRY === 'US' && env.BRAND === 'Crate') {
      await this.verifyURL(global.crateCAN_URL);
    } else if (env.COUNTRY === 'CA' && env.BRAND === 'Crate') {
      await this.verifyURL(global.crateUS_URL);
    } else if (env.COUNTRY === 'US' && env.BRAND === 'CB2') {
      await this.verifyURL(global.cb2CAN_URL);
    } else if (env.COUNTRY === 'CA' && env.BRAND === 'CB2') {
      await this.verifyURL(global.cb2US_URL);
    } else {
      throw new Error('Unknown Brand or country');
    }
  }

  async selectUncheckedCountry() {
    const name = env.BRAND === 'CB2' ? 'Save & Continue' : 'Save and Continue';
    const unselectedOptionLocator = env.COUNTRY === 'US' ? page.locator("//span[@class='canada-icon']") : page.locator("//span[@class='us-icon']");
    await page.waitForLoadState('load', { timeout: 30000 });
    await unselectedOptionLocator.waitFor(_VISIBLE);
    await unselectedOptionLocator.click({ delay: 1000, trail: true });
    await page.getByRole(_BUTTON, { name }).click({ delay: 1000 });
  }
}

module.exports = { HomePage };
