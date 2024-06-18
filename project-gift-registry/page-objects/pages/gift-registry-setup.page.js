const { expect } = require('@playwright/test');
const { ReportUtils } = require('../../../support/utils/report-utils');
const { CommonUtils } = require('../../../support/utils/common-utils');
const el = require('../../elements/setup-registry-elements');
// eslint-disable-next-line import/no-restricted-paths
const td = require('../../data/registry-common');

const testReport = new ReportUtils();
const env = require('../../../support/env/env');

const common = new CommonUtils();

class GiftRegistry {
  pageName = this.constructor.name;

  async goToGiftRegistrySetup() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    testReport.log(this.pageName, 'Navigate to Gift Registry start page');
    await page.goto(`${env.BASE_URL}/gift-registry/authenticate`);
    await page.waitForLoadState();
  }

  async goToGiftRegistryForm() {
    testReport.log(this.pageName, `Loading Website:: ${env.BASE_URL}`);
    testReport.log(this.pageName, 'Navigate to Gift Registry start page');
    await page.goto(`${env.BASE_URL}/gift-registry/new`);
    await page.waitForLoadState();
  }

  async fillOutGiftRegistrySetupAndAuth(email) {
    await page.waitForLoadState('load');
    expect(page.locator(el.giftRegistry.btnContinue).toBeVisible());

    await page.fill(el.giftRegistry.txtFirstName, td.giftRegistry.firstName);
    await page.fill(el.giftRegistry.txtLastName, td.giftRegistry.lastName);
    await page.fill(el.giftRegistry.txtPhone, td.giftRegistry.phone);
    await page.fill(el.giftRegistry.txtEmail, email);
  }

  async submitGiftRegistrySetupAndAuth(email, password, expectsHasAccount) {
    const accountApiValidator = page.waitForResponse('**/gift-registry/validate');

    await page.locator(el.giftRegistry.btnContinue).click();

    const accountApiResponse = await accountApiValidator;
    const accountApiJson = await accountApiResponse.json();
    expect(accountApiJson.email).toEqual(email);

    // Verify flag if provided
    if (expectsHasAccount === true || expectsHasAccount === false) {
      expect(accountApiJson.hasAccount).toEqual(expectsHasAccount);
    }

    await page.waitForLoadState('load');
    expect(page.locator(el.giftRegistry.txtPassword).toBeVisible());
    if (expectsHasAccount === true) {
      testReport.log(this.pageName, 'Account exists and checking for password login to appear.');
      expect(page.locator(el.giftRegistry.lblAccountLoginHeader).toBeVisible());
    } else if (expectsHasAccount === false) {
      testReport.log(this.pageName, 'No account exists and checking for Create instructions.');
      expect(page.locator(el.giftRegistry.lblAccountCreateHeader).toBeVisible());
    }

    // Password if account exists
    if (accountApiJson.hasAccount) {
      // Auth page

      await page.fill(el.giftRegistry.txtPassword, password);
      await page.locator(el.giftRegistry.btnSignin).click();

      // Wait
      await common.forcedWait(2000);
      await page.waitForLoadState('load');
      expect(page.locator(el.giftRegistry.txtEventDate).toBeVisible());
    }
  }

  async fillOutGiftRegistryContactForm(includeCoRegistrant) {
    await page.waitForLoadState('load');
    expect(page.locator(el.giftRegistry.btnNext).toBeVisible());

    await page.fill(el.giftRegistry.txtNumberOfGuests, td.giftRegistry.numberOfGuests.toString());
    await page.locator(el.giftRegistry.txtEventDate).type(td.giftRegistry.eventDate);
    await page.fill(el.giftRegistry.txtFirstName, td.giftRegistry.firstName);
    await page.fill(el.giftRegistry.txtLastName, td.giftRegistry.lastName);
    await page.fill(el.giftRegistry.txtPhone, td.giftRegistry.phone);
    await page.fill(el.giftRegistry.txtAddress1, td.giftRegistry.address1);

    if (env.EXEC_SITE.endsWith('us')) {
      await page.fill(el.giftRegistry.txtPostalCode, td.giftRegistry.zipCode);
      await page.fill(el.giftRegistry.txtCity, td.giftRegistry.city);
      await page.locator(el.giftRegistry.ddlState).selectOption(td.giftRegistry.state);
    } else {
      await page.fill(el.giftRegistry.txtPostalCode, td.giftRegistry.postalCode);
      await page.fill(el.giftRegistry.txtCity, td.giftRegistry.cityCanada);
      await page.locator(el.giftRegistry.ddlState).selectOption(td.giftRegistry.province);
    }

    if (env.EXEC_SITE.startsWith('crate') && !includeCoRegistrant) {
      // No co-registrant
      await expect(page.locator(el.giftRegistry.chkCoHasCoRegistrant)).not.toBeChecked();
    } else {
      await page.locator(el.giftRegistry.chkHasCoRegistrant).click();
      await page.fill(el.giftRegistry.coRegistrant.firstName, td.giftRegistry.coRegistrant.firstName);
      await page.fill(el.giftRegistry.coRegistrant.lastName, td.giftRegistry.coRegistrant.lastName);
      await page.fill(el.giftRegistry.coRegistrant.phone, td.giftRegistry.coRegistrant.phone);
      const rndEmail = await common.getRandomInt(10000, 99999);
      const coRegEmail = `order-tracking+${rndEmail}@gmail.com`;
      await page.fill(el.giftRegistry.coRegistrant.email, coRegEmail);
      await page.fill(el.giftRegistry.coRegistrant.password, 'Crate123!');
    }

    await page.locator(el.giftRegistry.btnNext).click();

    // next screen
    testReport.log(this.pageName, 'Contact Form complete');
    await page.waitForLoadState('load');
    await common.forcedWait(5000);
  }

  async verifyContactInfoMatch() {
    // Event Details
    await expect(page.locator(el.giftRegistry.txtNumberOfGuests)).toHaveValue(td.giftRegistry.numberOfGuests.toString());
    const eventDate = new Date(td.giftRegistry.eventDate).toISOString().split('T')[0]; // format conversion to 'yyyy-mm-66'
    await expect(page.locator(el.giftRegistry.txtEventDate)).toHaveValue(eventDate);

    // Registrant
    await expect(page.locator(el.giftRegistry.txtFirstName)).toHaveValue(td.giftRegistry.firstName, { ignoreCase: true });
    await expect(page.locator(el.giftRegistry.txtLastName)).toHaveValue(td.giftRegistry.lastName, { ignoreCase: true });
    await expect(page.locator(el.giftRegistry.txtPhone)).toHaveValue(td.giftRegistry.phone, { ignoreCase: true });
    await expect(page.locator(el.giftRegistry.txtAddress1)).toHaveValue(td.giftRegistry.address1, { ignoreCase: true });

    if (env.EXEC_SITE.endsWith('us')) {
      await expect(page.locator(el.giftRegistry.ddlState)).toHaveValue(td.giftRegistry.state, { ignoreCase: true });
      await expect(page.locator(el.giftRegistry.txtPostalCode)).toHaveValue(td.giftRegistry.zipCode, { ignoreCase: true });
      await expect((await page.inputValue(el.giftRegistry.txtCity)).toUpperCase()).toBe(td.giftRegistry.city.toUpperCase());
    } else {
      await expect(page.locator(el.giftRegistry.ddlState)).toHaveValue(td.giftRegistry.province, { ignoreCase: true });
      await expect(page.locator(el.giftRegistry.txtPostalCode)).toHaveValue(td.giftRegistry.postalCode, { ignoreCase: true });
      await expect((await page.inputValue(el.giftRegistry.txtCity)).toUpperCase()).toBe(td.giftRegistry.cityCanada.toUpperCase());
    }

    if (env.EXEC_SITE.startsWith('crate')) {
      await expect(page.locator(el.giftRegistry.chkCoHasCoRegistrant)).not.toBeChecked();
    }
  }

  async verifyLocationAddressesMatch() {
    // Wait
    await common.forcedWait(5000);

    // Before Address
    await expect((await page.inputValue(el.giftRegistry.location.beforeAddress.txtAddress1)).toUpperCase()).toBe(
      td.giftRegistry.location.beforeAddress.address1.toUpperCase()
    );

    if (env.EXEC_SITE.endsWith('us')) {
      await expect(page.locator(el.giftRegistry.location.beforeAddress.txtPostalCode)).toHaveValue(td.giftRegistry.location.beforeAddress.zipCode);
      await expect((await page.inputValue(el.giftRegistry.location.beforeAddress.txtCity)).toUpperCase()).toBe(
        td.giftRegistry.location.beforeAddress.city.toUpperCase()
      );
      await expect(page.locator(el.giftRegistry.location.beforeAddress.ddlState)).toHaveValue(td.giftRegistry.location.beforeAddress.state, {
        ignoreCase: true
      });
    } else {
      await expect(page.locator(el.giftRegistry.location.beforeAddress.txtPostalCode)).toHaveValue(td.giftRegistry.location.beforeAddress.postalCode);
      await expect((await page.inputValue(el.giftRegistry.location.beforeAddress.txtCity)).toUpperCase()).toBe(
        td.giftRegistry.location.beforeAddress.cityCanada.toUpperCase()
      );
      await expect(page.locator(el.giftRegistry.location.beforeAddress.ddlState)).toHaveValue(td.giftRegistry.location.beforeAddress.province, {
        ignoreCase: true
      });
    }

    // After Address
    await expect(page.locator(el.giftRegistry.location.afterAddress.txtAddress1)).toHaveValue(td.giftRegistry.location.afterAddress.address1, {
      ignoreCase: true
    });

    if (env.EXEC_SITE.endsWith('us')) {
      await expect(page.locator(el.giftRegistry.location.afterAddress.txtPostalCode)).toHaveValue(td.giftRegistry.location.afterAddress.zipCode);
      await expect((await page.inputValue(el.giftRegistry.location.afterAddress.txtCity)).toUpperCase()).toBe(
        td.giftRegistry.location.afterAddress.city.toUpperCase()
      );
      await expect(page.locator(el.giftRegistry.location.afterAddress.ddlState)).toHaveValue(td.giftRegistry.location.afterAddress.state, {
        ignoreCase: true
      });
    } else {
      await expect(page.locator(el.giftRegistry.location.afterAddress.txtPostalCode)).toHaveValue(td.giftRegistry.location.afterAddress.postalCode);
      await expect((await page.inputValue(el.giftRegistry.location.afterAddress.txtCity)).toUpperCase()).toBe(
        td.giftRegistry.location.afterAddress.cityCanada.toUpperCase()
      );
      await expect(page.locator(el.giftRegistry.location.afterAddress.ddlState)).toHaveValue(td.giftRegistry.location.afterAddress.province, {
        ignoreCase: true
      });
    }
  }

  async fillOutGiftRegistryLocationForm() {
    await page.waitForLoadState('load');
    expect(page.locator(el.giftRegistry.btnNext).toBeVisible());

    await page.locator(el.giftRegistry.ddlLocation).selectOption(td.giftRegistry.state);
    await page.waitForFunction(
      (data) => {
        const select = document.querySelector(data.selector);
        if (!select) return false;
        return [...select.options].some((x) => x.label === data.label);
      },
      { selector: el.giftRegistry.ddlPreferredStore, label: td.giftRegistry.preferredStore }
    );
    await page.selectOption('select[name="preferredStore"]', { label: td.giftRegistry.preferredStore });

    // Before Address
    await page.fill(el.giftRegistry.location.beforeAddress.txtAddress1, td.giftRegistry.location.beforeAddress.address1);

    if (env.EXEC_SITE.endsWith('us')) {
      await page.fill(el.giftRegistry.location.beforeAddress.txtPostalCode, td.giftRegistry.location.beforeAddress.zipCode);
      await page.fill(el.giftRegistry.location.beforeAddress.txtCity, td.giftRegistry.location.beforeAddress.city);
      await page.locator(el.giftRegistry.location.beforeAddress.ddlState).selectOption(td.giftRegistry.location.beforeAddress.state);
    } else {
      await page.fill(el.giftRegistry.location.beforeAddress.txtPostalCode, td.giftRegistry.location.beforeAddress.postalCode);
      await page.fill(el.giftRegistry.location.beforeAddress.txtCity, td.giftRegistry.location.beforeAddress.cityCanada);
      await page.locator(el.giftRegistry.location.beforeAddress.ddlState).selectOption(td.giftRegistry.location.beforeAddress.province);
    }

    // After Address
    await page.fill(el.giftRegistry.location.afterAddress.txtAddress1, td.giftRegistry.location.afterAddress.address1);

    if (env.EXEC_SITE.endsWith('us')) {
      await page.fill(el.giftRegistry.location.afterAddress.txtPostalCode, td.giftRegistry.location.afterAddress.zipCode);
      await page.fill(el.giftRegistry.location.afterAddress.txtCity, td.giftRegistry.location.afterAddress.city);
      await page.locator(el.giftRegistry.location.afterAddress.ddlState).selectOption(td.giftRegistry.location.afterAddress.state);
    } else {
      await page.fill(el.giftRegistry.location.afterAddress.txtPostalCode, td.giftRegistry.location.afterAddress.postalCode);
      await page.fill(el.giftRegistry.location.afterAddress.txtCity, td.giftRegistry.location.afterAddress.cityCanada);
      await page.locator(el.giftRegistry.location.afterAddress.ddlState).selectOption(td.giftRegistry.location.afterAddress.province);
    }

    await page.locator(el.giftRegistry.btnNext).click();

    // next screen
    testReport.log(this.pageName, 'Location Form complete');
    await page.waitForLoadState('load');
  }

  async fillOutGiftRegistryPreferencesForm() {
    await page.waitForLoadState('load');
    expect(page.locator(el.giftRegistry.btnNext).toBeVisible());

    await page.locator(el.giftRegistry.rdoDisplayPref_public_wrapper).click();

    await page.locator(el.giftRegistry.btnNext).click();

    // next screen
    testReport.log(this.pageName, 'Registry Preferences Form complete');
    await page.waitForLoadState('load');
  }

  async verifyRegistryPreferencesMatch() {
    // Radio buttons
    await expect(page.locator(el.giftRegistry.rdoDisplayPref_public)).toBeChecked();
  }

  async validateNewGiftRegistryPage() {
    await common.forcedWait(9000);
    await expect(page).toHaveURL(/gift-registry\/registrant-list\//);
    testReport.log(this.pageName, 'Loaded New Gift Registry page');
  }

  async gotoEditPage() {
    const currentUrl = page.url();
    // currentUrl += '/5471513';
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    testReport.log(this.pageName, `Loaded Edit Gift Registry page at "${id}"`);
    const newUrl = `${env.BASE_URL}/gift-registry/edit/${id}`;
    await page.goto(newUrl);
    await page.waitForLoadState();
    expect(page.locator(el.giftRegistry.editHeader).toBeVisible());
  }

  async goToRegistrantPageTesting() {
    testReport.log(this.pageName, 'Navigate directly to Registrant page');
    await page.goto(`${env.BASE_URL}/gift-registry/registrant-list/5471513?create=true`);
    await page.waitForLoadState();
  }

  async validateGiftRegistrySetupPage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    expect(page.locator(el.giftRegistry.txtFirstName).toBeVisible());
    // await expect(await page.locator(el.giftRegistrySetup.header)).toContainText('Hi'); //TODO: Adjust once page layout is complete
    testReport.log(this.pageName, 'Registry Setup complete');
  }
}
module.exports = { GiftRegistry };
