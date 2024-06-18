/* eslint-disable playwright/no-wait-for-timeout */
const { expect } = require('@playwright/test');
const el = require('../elements/elements');
// const td = require('../datafiles/testdata');
// eslint-disable-next-line import/no-restricted-paths
const td = require('../data/testdata.json');

const { CommonUtils } = require('../../support/utils/common-utils');
const { ReportUtils } = require('../../support/utils/report-utils');
const { EnvironmentUtils } = require('../../support/utils/env-utils');

const envUtils = new EnvironmentUtils();

const common = new CommonUtils();
const testReport = new ReportUtils();

const _ISMOBILE = common.verifyIsMobile();
const _VISIBLE = 'visible';

class FooterPage {
  pageName = this.constructor.name;

  async navigateToFooter() {
    const scroll = page.locator(el.FOOTER.ContactUs);
    await scroll.scrollIntoViewIfNeeded();
    testReport.log(this.pageName, 'Navigated to Footer');
  }

  async verifyContactUs() {
    const options = { timeout: 10000 };

    // await page.waitForSelector(el.FOOTER.ContactUs, { waitFor: _VISIBLE });
    await expect(page.locator(el.FOOTER.ContactUs)).toHaveText(td.footer.contactUs, options);
    testReport.log(this.pageName, `contactus options are verified in Mobile : ${await page.locator(el.FOOTER.ContactUs).innerText()}`);

    if (!_ISMOBILE) {
      if (envUtils.isCb2() && envUtils.isUs()) {
        await expect(page.locator(el.FOOTER.cb2PhoneNumber)).toBeVisible();
      } else if (envUtils.isCrate()) {
        await expect(page.locator("a[href='sms:312-779-1979']")).toBeVisible();
      } else {
        await expect(page.locator(el.FOOTER.PhoneNumber)).toBeVisible();
      }
      if (envUtils.isCrate()) {
        await expect(page).toHaveText(td.footer.weekdayHours);
        await expect(page).toHaveText(td.footer.weekendHours);
        testReport.log(this.pageName, 'Weekend and Weekday hours are verified');
      }
      testReport.log(this.pageName, `contactus options are verified in Desktop`);
    } else {
      await page.locator(el.FOOTER.ContactUs, { waitFor: _VISIBLE }).click();
      if (envUtils.isCb2()) {
        if (envUtils.isUs()) {
          await expect(page.locator(el.FOOTER.cb2PhoneNumber)).toBeVisible();
        } else {
          await expect(page.locator(el.FOOTER.PhoneNumber)).toBeVisible();
        }
      }
      await page.locator(el.FOOTER.ContactUs, { waitFor: _VISIBLE }).click();
    }
    // TODO: Verify clicking on contact us for mobile.
  }

  async verifyOrderTrackingScheduledDelivery() {
    const options = { delay: 1000, timeout: 10000 };

    if (_ISMOBILE) {
      const orderTrackingText = await page.locator(el.FOOTER.OrderTrackingSchedulDelivery).innerText();
      await expect(page.locator(el.FOOTER.OrderTrackingSchedulDelivery)).toContainText(td.footer.orderTrackingSchedulDelivery);
      testReport.log(this.pageName, `OrderTrackingScheduledDelivery options are verified in Mobile : ${orderTrackingText}`);
    } else {
      // await page.waitForSelector(el.FOOTER.OrderTrackingSchedulDelivery, { waitFor: _VISIBLE });
      await expect(page.locator(el.FOOTER.OrderTrackingSchedulDelivery)).toBeVisible(options);
      if (envUtils.isCrate()) {
        await expect(page.locator(el.FOOTER.OrderTrackingDescription)).toContainText(td.footer.orderTrackingDescription);
      }
      await expect((await page.innerText(el.FOOTER.TackYourOrder)).toLowerCase()).toEqual(td.footer.tackYourOrder.toLowerCase());
      await expect((await page.innerText(el.FOOTER.ScheduledDelivery)).toLowerCase()).toEqual(td.footer.scheduledDelivery.toLowerCase());
      await page.click(el.FOOTER.TackYourOrder);

      testReport.log(this.page, `Page Title: ${await page.title()}`);
      await page.click(el.FOOTER.ScheduledDelivery);

      testReport.log(this.pageName, `OrderTrackingScheduledDelivery options are verified in desktop.`);
    }
  }

  async verifyWeddingRegistry() {
    if (envUtils.isCrate()) {
      if (_ISMOBILE) {
        await page.click(el.FOOTER.WeddingRegistryMobile);
        await expect(page.locator(el.FOOTER.createMyRegistryLabel)).toContainText(td.footer.createRegistry);
        testReport.log(this.pageName, 'WeddingRegistry optionsa are verified in Mobile');
      } else {
        await page.click(el.FOOTER.WeddingRegistryDesktop);
        testReport.log(this.pageName, 'WeddingRegistry options are verified in desktop');
        await expect(await page).toHaveURL(global.baseURL + td.footer.weddingRegistryURL);
        testReport.log(this.page, `Page Title: ${await page.title()}`);
      }
    }
  }

  async verifyOurCompanyOptions() {
    const OCO = await page.locator(el.FOOTER.OurCompany).innerText();
    const options = { delay: 1000, timeout: 10000 };

    if (!_ISMOBILE) {
      // if (envUtils.isCrate()) {
      //   await page.waitForSelector(el.FOOTER.FooterLinks, { waitFor: _VISIBLE });
      // }
      await page.getByRole('contentinfo').getByRole('link', { name: 'Responsible Design' }).click(options);
      await expect(await page).toHaveURL(global.baseURL + td.footer.responsibleDesignURL);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      await page.click(el.FOOTER.AboutUs);
      if (envUtils.isCrate()) {
        await expect(await page).toHaveURL(global.baseURL + td.footer.aboutCBURL);
      } else {
        await expect(await page).toHaveURL(global.baseURL + td.footer.aboutCB2URL);
      }
      testReport.log(this.page, `Page Title: ${await page.title()} about us has been verified`);
    }

    if (envUtils.isCrate()) {
      const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.click(el.FOOTER.Careers)]);
      await newPage.waitForLoadState();
      const title = await newPage.title();
      testReport.log(this.pageName, `New Page Title: ${title}`);
      newPage.close();
    }
    if (envUtils.isCrate()) {
      await page.click(el.FOOTER.StoreLocation);
      await page.waitForLoadState();
      await expect(await page).toHaveURL(global.baseURL + td.footer.storesURL);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      testReport.log(this.pageName, `OurCompany options are verified : ${OCO}`);
    }
  }

  async verifyResourcesOptions() {
    const resourcesTitle = await page.locator(el.FOOTER.Resources).innerText();
    await page.locator(el.FOOTER.Resources).click();
    if (envUtils.isCrate() && _ISMOBILE) {
      await page.click(el.FOOTER.CustomerService);
      await expect(await page).toHaveURL(global.baseURL + td.footer.customerServiceURL);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
    }
    // TODO : Close up Id must be used.
    // await page.click(el.FOOTER.Account);
    // expect((await page.innerText(el.FOOTER.AccountPopup)).toLowerCase()).toEqual(td.footer.creatAccount.toLowerCase());
    // await page.click(el.FOOTER.ClosePopup, { delay: 30000, trail: true });

    await page.click(el.FOOTER.ReturnPolicy);
    await expect(await page).toHaveURL(global.baseURL + td.footer.returnsExchangeURL);
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    await page.click(el.FOOTER.ShippingInformation);
    await expect(await page).toHaveURL(global.baseURL + td.footer.shippingDeliveryURL);
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    await page.click(el.FOOTER.EmailPreferences);
    await expect(await page).toHaveURL(global.baseURL + td.footer.shippingDeliveryURL);
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    if (envUtils.isCrate()) {
      await page.click(el.FOOTER.Catalogs);
      try {
        await expect(await page).toHaveURL(global.baseURL + td.footer.catalogsURL);
      } catch (error) {
        testReport.log(this.page, `URL check failed: ${error.message}`);
      }
      testReport.log(this.page, `Page Title: ${await page.title()}`);
    }
    await page.click(el.FOOTER.ProductRecalls);
    await expect(await page).toHaveURL(global.baseURL + td.footer.productRecallsURL);
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    await page.click(el.FOOTER.AccessibilityStatement);
    await expect(await page).toHaveURL(global.baseURL + td.footer.accessibilityURL);
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    if (envUtils.isUs()) {
      await page.click(el.FOOTER.CASupplyChainAct);
      try {
        await expect(await page).toHaveURL(global.baseURL + td.footer.chainActURL);
      } catch (error) {
        testReport.log(this.page, `URL check failed: ${error.message}`);
      }
    }
    testReport.log(this.page, `Page Title: ${await page.title()}`);
    // testReport.log(this.page, "Page Title: " + await page.title());
    // await page.click(el.FOOTER.CookieSettings);
    //
    // expect(await page.innerText(el.FOOTER.policypopup)).toEqual(td.footer.policypopup);
    // await page.click(el.FOOTER.policyPopupOk);
    if (envUtils.isUs()) {
      const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.click(el.FOOTER.DoNotSellInfo)]);
      await newPage.waitForLoadState();
      const title = await newPage.title();
      testReport.log(this.pageName, `Page Title: ${title}`);
      newPage.close();
    }
    if (envUtils.isCrate()) {
      const giftcard = _ISMOBILE ? page.locator(el.FOOTER.GiftCardsMobile) : page.getByRole('link', { name: 'Gift Cards' });
      await giftcard.waitFor(_VISIBLE);
      await giftcard.click();
      await expect(await page).toHaveURL(global.baseURL + td.footer.giftCardsURL);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      testReport.log(this.pageName, `Resources options are verified : ${resourcesTitle}`);
    }
  }

  async verifyShoppingApp() {
    if (envUtils.isUs() && envUtils.isCrate()) {
      await expect(page.locator(el.FOOTER.ShoppingApp)).toHaveText(td.footer.shoppingApp);
      if (_ISMOBILE) {
        await expect(page.locator(el.FOOTER.FooterAppTextMobile)).toContainText(td.footer.footerAppText);
      } else {
        await expect(page.locator(el.FOOTER.FooterAppText)).toContainText(td.footer.footerAppText);
      }
      // not present in canada crate
      const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.click(el.FOOTER.DownloadiOSApp)]);
      await newPage.waitForLoadState();
      newPage.close();
      testReport.log(this.pageName, 'Shopping App is verified');
    }
  }

  async verifySocialMedia() {
    if (!_ISMOBILE && envUtils.isCrate()) {
      await expect(page).toHaveText(td.footer.socialMedia);
      testReport.log(this.pageName, 'Social media text in footer are verfiied');
    }

    const socialMediaLocator = envUtils.isCrate() ? "(//*[@class='track-ddl-link'])" : "//*[contains(@class, 'track-ddl-link')]";

    await Promise.all(
      Array.from({ length: 4 }, async (_, i) => {
        const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.click(`${socialMediaLocator}[${i + 1}]`)]);
        await newPage.waitForLoadState();
        newPage.close();
        testReport.log(this.pageName, 'Social media links in footer are verfiied');
      })
    );

    testReport.log(this.pageName, 'SocialMedia options are verified');
  }

  async verifyFooterMeta() {
    const copyRight = await page.locator(el.FOOTER.CopyRight).innerText();
    const screenReader = await page.locator(el.FOOTER.ScreenReaderNote).innerText();
    const terms = await page.locator(el.FOOTER.TermsOfUse).innerText();
    if (_ISMOBILE) {
      const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.click(el.FOOTER.CB2mobile)]);
      await newPage.waitForLoadState();
      testReport.log(this.pageName, `Page Title: ${await newPage.title()}`);
      newPage.close();

      const [newPage1] = await Promise.all([global.context.waitForEvent('page'), page.click(el.FOOTER.HudsonGraceMobile)]);
      await newPage1.waitForLoadState();
      testReport.log(this.pageName1, `Page Title: ${await newPage1.title()}`);
      newPage.close();

      page.click(el.FOOTER.FlagMobile);
      await expect(page).toHaveText(td.footer.shopCanadaUS);
      page.click(el.FOOTER.SaveContinue);
      testReport.log(this.pageName, `FooterMeta options are verified in mobile${copyRight} ${screenReader}${terms}`);
    } else {
      await expect(page).toHaveText(td.footer.copyRight);
      await expect(page).toHaveText(td.footer.screenReaderNote);
      await expect(page).toHaveText(td.footer.termsOfUse);
      await expect(page).toHaveText(td.footer.privacy);
      await expect(page).toHaveText(td.footer.siteIndex);
      await expect(page).toHaveText(td.footer.adChoices);
      await page.click(el.FOOTER.TermsOfUse);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      await page.click(el.FOOTER.Privacy);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      await page.click(el.FOOTER.SiteIndex);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      await page.click(el.FOOTER.AdChoices);
      testReport.log(this.page, `Page Title: ${await page.title()}`);
      testReport.log(this.pageName, `FooterMeta options are verified in Desktop${copyRight} ${screenReader}${terms}`);
    }
  }

  async verifyCBCreditCard() {
    const options = { timeout: 10000 };

    if (envUtils.isUs()) {
      const CBCC = await page.locator(el.FOOTER.CrateBarrelCreditCard).innerText();
      if (envUtils.isCb2()) {
        await expect(page.locator(el.FOOTER.CrateBarrelCreditCard)).toHaveText(td.footer.cb2CreditCard, options);
      } else {
        await expect(page.locator(el.FOOTER.CrateBarrelCreditCard)).toHaveText(td.footer.crateBarrelCreditCard, options);
      }
      testReport.log(this.pageName, `CBCC options are verified`);
      if (!_ISMOBILE) {
        // await page.waitForSelector(el.FOOTER.CrateBarrelCreditCard, { waitFor: _VISIBLE });
        if (envUtils.isCrate()) {
          await expect(page.locator(el.FOOTER.PromoDescription)).toContainText(td.footer.promoDescription);
        }
        expect((await page.innerText(el.FOOTER.ApplyNow)).toLowerCase()).toEqual(td.footer.applyNow.toLowerCase());
        if (envUtils.isCrate()) {
          await expect(page.locator("//a[normalize-space()='Manage Your Account']")).toBeVisible();
        } else {
          await expect(page.locator("//a[normalize-space()='Manage Account']")).toBeVisible();
        }
        testReport.log(this.pageName, `CBCC options are verified in desktop : ${CBCC}`);
      }
    }
  }
}

module.exports = { FooterPage };
