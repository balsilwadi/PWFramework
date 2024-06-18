/* eslint-disable playwright/no-wait-for-timeout */
const { expect } = require('@playwright/test');
const el = require('../elements/elements');
const td = require('../data/testdata.json');

const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const { EnvironmentUtils } = require('../../support/utils/env-utils');

const envUtils = new EnvironmentUtils();

const common = new CommonUtils();
const testReport = new ReportUtils();

class HeaderAccountIconHelper {
  pageName = this.constructor.name;

  async initialize() {
    if (!this.headerAccountLocator) {
      this.headerAccountLocator = common.verifyIsMobile()
        ? page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.HeaderAccount)
        : page.locator(el.ACCOUNT_LINK_CONTAINER.AccountHover);
    }
    if (!this.signInLocator) {
      this.signInLocator = common.verifyIsMobile()
        ? page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.SignIn_CreateAccount)
        : page.getByTestId('header-account-container').locator(el.ACCOUNT_LINK_CONTAINER.SignIn_CreateAccount);
    }
    if (!this.trackOrderLocator) {
      this.trackOrderLocator = common.verifyIsMobile()
        ? page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.TrackOrders_ScheduleDelivery)
        : page.getByTestId('header-account-container').locator(el.ACCOUNT_LINK_CONTAINER.TrackOrders_ScheduleDelivery);
    }
    if (!this.registryLocator) {
      this.registryLocator = common.verifyIsMobile()
        ? page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.CreateRegistry)
        : page.getByTestId('header-account-container').locator(el.ACCOUNT_LINK_CONTAINER.CreateRegistry);
    }
  }

  async openFlyout() {
    await this.initialize();
    if (common.verifyIsMobile()) {
      await this.headerAccountLocator.click();
    } else {
      await this.headerAccountLocator.hover();
    }
    testReport.log(this.pageName, `Opened Account Floyout from Header`);
  }

  async verifyGuestView() {
    await expect(await this.signInLocator).toContainText('Sign In / Create Account', {
      ignoreCase: true
    });
    testReport.log(this.pageName, `Verified Signin/Create Account for Guest Mode`);
  }

  async verifyURL(pattern) {
    testReport.log(this.pageName, `Page is displayed with url actual :: ${page.url()} expected :: ${pattern}`);
    await expect(page).toHaveURL(pattern);
  }

  async accountMenuGuestFLow() {
    await page.waitForLoadState('load');
    await this.openFlyout();

    await this.verifyTrackOrders(false);
    await this.openFlyout();

    if (!(envUtils.isCa() && envUtils.isCb2())) {
      await expect(this.registryLocator).toContainText('Create a Registry', {
        ignoreCase: true
      });
      testReport.log(this.pageName, `Verified Registry for Guest Mode`);
      await this.registryLocator.click();
      await this.verifyURL('/gift-registry/create/step1');
      testReport.log(this.pageName, `Verified navigation to Registry for Guest Mode`);
      await this.openFlyout();
    } else {
      testReport.log(this.pageName, `No verification needed for Registry for Guest Mode in CB2 CA`);
    }

    if (common.verifyIsMobile()) {
      await expect(page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.MyFavorites)).toContainText(td.accountFlyoutMenuItems.MyFavorites, { ignoreCase: true });
      // todo add click MyFav
      await expect(page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.CountryName)).toContainText(td.accountFlyoutMenuItems.CountryName_US, { ignoreCase: true });

      await page.click(el.ACCOUNT_FLYOUT_MENU_ITEMS.FlyoutCloseButton);
      await page.click(el.HEADER_MOBILE.MobileMenu);
      await page.waitForLoadState('load');
      await expect(page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.HeaderGreetings)).toContainText(td.accountFlyoutMenuItems.HeaderGreetingsOrdersSignIn, {
        ignoreCase: true
      });
    }

    await this.verifyCreditCard(false);
    await this.openFlyout();
    await this.signInLocator.click();
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Header account icon options are verified');
  }

  async verifyTrackOrders(signedIn) {
    await expect(this.trackOrderLocator).toContainText('Track Orders / Schedule Delivery', { ignoreCase: true });
    testReport.log(this.pageName, `Verified Track Orders / Schedule Delivery for Guest Mode`);
    await this.trackOrderLocator.click({ delay: 3000, trail: true });
    if (signedIn) {
      await this.verifyURL('/account/');
    } else {
      await this.verifyURL('/account/order-tracking');
    }
    testReport.log(this.pageName, `Verified navigation to Track Orders / Schedule Delivery`);
  }

  async verifyRewards(rewardsEnabled) {
    const rewardsLocator = page.getByTestId('header-account-container').locator("//a[@href='/account/rewards/']");
    if (rewardsEnabled === 'true') {
      await expect(rewardsLocator).toContainText('Rewards', {
        ignoreCase: true
      });
      testReport.log(this.pageName, `Verified Rewards option for signed in user with CC`);
      await rewardsLocator.click({ delay: 3000, trail: true });
      await this.verifyURL('/account/rewards/');
      testReport.log(this.pageName, `Verified navigation to Rewards`);
      await this.openFlyout();
    } else {
      await expect(rewardsLocator).toHaveCount(0);
      testReport.log(this.pageName, `Verified Rewards is not present`);
    }
  }

  async verifyAccountSignedIn(creditCardEnabled, rewardsEnabled) {
    await page.waitForLoadState('load');
    await this.openFlyout();

    await this.verifyTrackOrders(true);
    await this.openFlyout();

    await this.verifyRewards(rewardsEnabled);
    if (creditCardEnabled === 'true') {
      await this.verifyCreditCard(rewardsEnabled);
      await this.openFlyout();
    }

    if (common.verifyIsMobile()) {
      await expect(page.getByTestId('header-account-container').locator("//*[text()='My Registries']")).toContainText(td.accountFlyoutMenuItems.MyRegistries, {
        ignoreCase: true
      });
      await expect(page.getByTestId('header-account-container').locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.MyDesignPackages)).toContainText(
        td.accountFlyoutMenuItems.MyDesignPackages,
        {
          ignoreCase: true
        }
      );
      await expect(page.getByTestId('header-account-container').locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.MyFavorites)).toContainText(
        td.accountFlyoutMenuItems.MyFavorites,
        { ignoreCase: true }
      );

      await expect(page.getByTestId('header-account-container').locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.SignOut)).toContainText(
        td.accountFlyoutMenuItems.SignOut,
        { ignoreCase: true }
      );
      await expect(page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.CountryName)).toContainText(td.accountFlyoutMenuItems.CountryName_US, { ignoreCase: true });
      await page.click(el.ACCOUNT_FLYOUT_MENU_ITEMS.FlyoutCloseButton);
      await page.click(el.HEADER_MOBILE.MobileMenu);
      await expect(page.locator(el.ACCOUNT_FLYOUT_MENU_ITEMS.HeaderGreetings)).toContainText('Hi');
      testReport.log(this.pageName, 'Account Icon : CBCC with no rewards is verified in Mobile');
      await page.click(el.ACCOUNT_FLYOUT_MENU_ITEMS.MenuCloseButton);
      await page.click(el.ACCOUNT_FLYOUT_MENU_ITEMS.HeaderAccount);
      await page.click(el.ACCOUNT_FLYOUT_MENU_ITEMS.SignOut);
    } else {
      await page.waitForLoadState('load');
      await expect(page.locator(el.ACCOUNT_LINK_CONTAINER.MyAccount)).toContainText(td.accountLinkContainer.MyAccount, { ignoreCase: true });
      if (envUtils.isUs()) {
        const registryLocator = page.getByTestId('header-account-container').getByRole('link', { name: 'My Registries' });
        await expect(registryLocator).toContainText('My Registries', { ignoreCase: true });
        await registryLocator.click();
        await this.verifyURL('/gift-registry/manage-registries');
        testReport.log(this.pageName, `Verified navigation to My registries`);
        this.openFlyout();
      }

      await expect(page.locator(el.ACCOUNT_LINK_CONTAINER.MyDesignPackages)).toContainText(td.accountLinkContainer.MyDesignPackages, {
        ignoreCase: true
      });
      await expect(page.locator(el.ACCOUNT_LINK_CONTAINER.SignOut)).toContainText(td.accountLinkContainer.SignOut, { ignoreCase: true });
      await expect(page.locator(el.ACCOUNT_LINK_CONTAINER.AnchorLink)).toContainText('Hi');
      testReport.log(this.pageName, 'Account Icon : CBCC with no rewards is verified in Desktop');
      await page.click(el.ACCOUNT_LINK_CONTAINER.SignOut);
      await page.waitForLoadState('load');
    }
  }

  async verifyCreditCard(hasCreditCard) {
    const rewardsUrl = hasCreditCard === 'true' ? '/account/rewards/' : '/rewards/';
    if (envUtils.isUs()) {
      const creditCard = envUtils.isCrate()
        ? page.getByTestId('header-account-container').locator(el.ACCOUNT_LINK_CONTAINER.CrateBarrelCreditCard)
        : page.getByTestId('header-account-container').locator(el.ACCOUNT_LINK_CONTAINER.CB2CreditCard);

      if (envUtils.isCrate()) {
        await expect(creditCard).toContainText(td.accountLinkContainer.CrateBarrelCreditCard, {
          ignoreCase: true
        });
      } else {
        await expect(creditCard).toContainText(td.accountLinkContainer.CB2CreditCard, { ignoreCase: true });
      }
      testReport.log(this.pageName, `Verified CreditCard presence for Guest Mode`);

      await creditCard.click({ delay: 1000, trail: true });
      await this.verifyURL(rewardsUrl);
      testReport.log(this.pageName, `Verified navigation to CreditCard for Guest Mode`);
    }
  }

  async clickMyAccountRegisteredUser() {
    await page.locator(el.ACCOUNT_LINK_CONTAINER.MyAccount).click();
  }
}

module.exports = { HeaderAccountIconHelper };
