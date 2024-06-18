const { expect } = require('@playwright/test');

const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const env = require('../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

const _ISMOBILE = common.verifyIsMobile();
const _VISIBLE = 'visible';
const _BUTTON = 'button';
const _LINK = 'link';

class HeaderCorePage {
  pageName = this.constructor.name;

  async clickCrateHeaderLogo() {
    const headerLogoLocator = page.getByTestId('header-logo').getByRole(_LINK);
    await headerLogoLocator.waitFor(_VISIBLE);
    await headerLogoLocator.click({ delay: 3000, trail: true });
    testReport.log(this.pageName, 'Clicked on Header logo');
  }

  async verifyCorePresence() {
    const cartIconLocator = _ISMOBILE
      ? page.getByTestId('header-cart-container').getByRole(_BUTTON).first()
      : page.getByTestId('header-cart-container').getByTestId('anchor-link').first();
    const headerLogoLocator = page.getByTestId('header-logo').getByRole(_LINK);
    const searchLocator = _ISMOBILE ? page.locator('#site-search') : page.getByRole('combobox', { name: 'Search' });
    const ordersLocator = page.getByTestId('header-account-link').getByRole(_LINK, { name: 'Orders' }); // playwright generated :: page.getByTestId('header-account-link').getByTestId('anchor-link');
    const signInLocator = page.getByTestId('header-account-link').getByRole(_BUTTON, { name: 'Sign In' }); // playwright generated :: page.getByTestId('header-account-link').getByTestId(_BUTTON);
    const locationLocator = _ISMOBILE ? null : page.getByTestId('site-header-desktop').getByRole(_LINK, { name: 'Location' }); // not valid for mobile
    let favLocator = _ISMOBILE ? null : page.getByTestId('favorites-count'); // not valid for mobile
    const accountLocator = page.getByRole(_BUTTON, { name: 'Account' }).first();

    await cartIconLocator.waitFor(_VISIBLE);
    await expect(cartIconLocator).toBeVisible();
    testReport.log(this.pageName, 'Header Core option:: Cart presence is verified');

    await headerLogoLocator.waitFor(_VISIBLE);
    await expect(headerLogoLocator).toBeVisible();
    testReport.log(this.pageName, 'Header Core option:: HeaderLogo presence is verified');

    await searchLocator.waitFor(_VISIBLE);
    await expect(searchLocator).toBeVisible();
    testReport.log(this.pageName, 'Header Core option:: Search presence is verified');

    if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cratecan')) {
      await ordersLocator.waitFor(_VISIBLE);
      await expect(ordersLocator).toBeVisible();
      testReport.log(this.pageName, 'Header Core option:: Orders presence is verified');

      await signInLocator.waitFor(_VISIBLE);
      await expect(signInLocator).toBeVisible();
      testReport.log(this.pageName, 'Header Core option:: Sign In presence is verified');
    } else if (env.EXEC_SITE.includes('cb2us') || env.EXEC_SITE.includes('cb2ca')) {
      favLocator = page.getByRole(_LINK, { name: 'Favorties items' });
    }

    await accountLocator.waitFor(_VISIBLE);
    await expect(accountLocator).toBeVisible();
    testReport.log(this.pageName, 'Header Core option:: Account presence is verified');

    if (!_ISMOBILE) {
      await locationLocator.waitFor(_VISIBLE);
      await expect(locationLocator).toBeVisible();
      testReport.log(this.pageName, 'Header Core option:: Location presence is verified');
      if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cratecan')) {
        await favLocator.waitFor(_VISIBLE);
        await expect(favLocator).toBeVisible();
        testReport.log(this.pageName, 'Header Core option:: Favorites presence is verified');
      }
    }
  }
}

module.exports = { HeaderCorePage };
