/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const el = require('../../../../project-account/page-objects/elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const { getAddressData } = require('../../../helpers/data-dictionary');
const { timeout } = require('../../../../configs/config');

const testReport = new ReportUtils();

class CreateDummyAccount {
  async loginReturningUserProfile(usrEmail) {
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout });
    await page.fill(el.loginPage.txtEmail, usrEmail);
    await page.fill(el.loginPage.txtPassword, 'Crate123$');
    await expect(page.locator(el.loginPage.hdrSignInForm)).toBeVisible({ timeout });
    await page.locator(el.loginPage.btnSignIn).click();
  }

  async createDummyReturningUserProfile(usrEmail) {
    await page.getByLabel('First Name required').fill('ajesh', { delay: 100 });
    await page.getByLabel('Last Name required').fill('soman', { delay: 100 });
    await page.getByLabel('Phone Number required').fill('6302223333', { delay: 100 });
    await page.getByLabel('Email Address required').fill(usrEmail, { delay: 100 });
    await page.getByLabel('Create Password required').fill('Crate123$', { delay: 100 });
    await page.click("//button[contains(@class,'button button-primary')]");

    // await page.locator('[class="button button-primary button-md create-account-button"]').click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await expect(page.locator('.account-title.account-orders-title')).toBeVisible({ timeout });
  }

  async updateEmailAddress(updateEmail) {
    await page.getByRole('link', { name: 'Account Settings' }).click();
    await page.locator('#accountEmail').fill(updateEmail, { delay: 100 });
    await page.locator('#confirmEmail').fill(updateEmail, { delay: 100 });
    await page.getByRole('button', { name: 'Apply Changes' }).first().click();
  }

  async addDefaultShippingAddress(usrEmail) {
    const shipAddressData = getAddressData();

    await page.getByRole('button', { name: 'addresses' }).click();
    await page.getByRole('link', { name: 'shipping addresses' }).click();
    const isAddressPresent = await page.locator('.account-shipping-address-card').count();
    testReport.log(this.pageName, `isAddressPresent--${usrEmail}-${isAddressPresent}`);
    if (isAddressPresent < 2) {
      await page.getByRole('button', { name: '+ Add New Address' }).click();
      await page.getByLabel('First NameRequired').fill(shipAddressData.firstName, { delay: 100 });
      await page.getByLabel('Last NameRequired').fill(shipAddressData.lastName, { delay: 100 });
      await page.getByLabel('Street AddressRequired').fill(shipAddressData.address1, { delay: 100 });
      await page.locator('#ba-zipCode').fill(shipAddressData.zipCode, { delay: 100 });
      await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
      await page.locator('#ba-daytimePhone').fill(shipAddressData.phoneNumber, { delay: 100 });
      await page.locator('#sel-state').selectOption({ value: shipAddressData.state });
      await page.locator('#ba-city').fill(shipAddressData.city, { delay: 100 });
      await page.locator('#ba-Submit').click();
    }
  }

  async addDefaultBillingAddress() {
    // await page.waitForSelector('.address-edit', { waitFor: 'visible' });
    const billAddressData = getAddressData('DOMESTICAPT');

    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await page.getByRole('link', { name: 'billing address' }).click();
    await page.getByLabel('Street AddressRequired').fill(billAddressData.address1, { delay: 100 });

    await page.getByLabel('First NameRequired').fill(billAddressData.firstName, { delay: 100 });
    await page.getByLabel('Last NameRequired').fill(billAddressData.lastName, { delay: 100 });
    const addAptButton = await page.getByRole('button', { name: 'Add apt, suite or other' }).count();
    if (addAptButton > 0) {
      await page.getByRole('button', { name: 'Add apt, suite or other' }).click();
      await page.locator('#ba-address2').fill(billAddressData.apt, { delay: 100 });
    }

    await page.locator('#ba-zipCode').fill(billAddressData.zipCode, { delay: 100 });
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    await page.locator('#ba-city').fill(billAddressData.city, { delay: 100 });
    await page.locator('#sel-state').selectOption({ value: billAddressData.state });
    await page.locator('#ba-daytimePhone').fill(billAddressData.phoneNumber, { delay: 100 });

    await page.locator('#ba-Submit').click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async addCreditCardPayements() {
    await page.getByRole('link', { name: 'payments' }).click();
    const isPrimaryCardPresent = await page.locator('[class="card-delete-container"]').count();
    testReport.log(this.pageName, `isPrimaryCardPresent--${isPrimaryCardPresent}`);
    // if (isPrimaryCardPresent < 1) {
    if (!(await page.locator('.cards-container').textContent()).includes('Master')) {
      this.addMasterCreditCard();
    }
    if (!(await page.locator('.cards-container').textContent()).includes('Visa')) {
      this.addVisaCreditCard();
    }
    if (!(await page.locator('.cards-container').textContent()).includes('Reward')) {
      this.addAmexCreditCard();
    }
    // }

    const cardsContainer = page.locator('.cards-container');
    const cardsCount = await cardsContainer.locator('.card-info').count();

    for (let i = 0; i < cardsCount; i++) {
      const cardInfo = cardsContainer.locator('.card-info').nth(i);
      if ((await cardInfo.textContent()).includes('expired')) {
        const cardNumber = await cardInfo.locator('.card-number').textContent();
        if (cardNumber.includes('MasterCard')) {
          this.addMasterCreditCard();
        } else if (cardNumber.includes('Visa')) {
          this.addVisaCreditCard();
        } else if (cardNumber.includes('Reward')) {
          this.addAmexCreditCard();
        }
      }
    }
  }

  async addMasterCreditCard() {
    await page.getByRole('button', { name: '+ Add New Payment Add new credit card (opens modal dialog)' }).click();
    await page.getByTestId('credit-card-form-credit-card-number-formatter').fill('5454 5454 5454 5454', { delay: 100 });
    await page.getByTestId('credit-card-expiration-date').fill('12/28', { delay: 100 });
    await page.getByTestId('credit-card-form-security-code-input', { delay: 100 }).fill('123');
    await page.getByText('Make Primary').click();
    await page.getByRole('button', { name: 'Add Payment' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async addVisaCreditCard() {
    await page.getByRole('button', { name: '+ Add New Payment Add new credit card (opens modal dialog)' }).click();
    await page.getByTestId('credit-card-form-credit-card-number-formatter').fill('4111 1111 1111 1111', { delay: 100 });
    await page.getByTestId('credit-card-expiration-date').fill('12/28', { delay: 100 });
    await page.getByTestId('credit-card-form-security-code-input').fill('123', { delay: 100 });
    await page.getByRole('button', { name: 'Add Payment' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  async addAmexCreditCard() {
    await page.getByRole('button', { name: '+ Add New Payment Add new credit card (opens modal dialog)' }).click();
    await page.getByTestId('credit-card-form-credit-card-number-formatter').fill('374245002741006', { delay: 100 });
    await page.getByTestId('credit-card-expiration-date').fill('12/28', { delay: 100 });
    await page.getByTestId('credit-card-form-security-code-input').fill('1234', { delay: 100 });
    await page.getByRole('button', { name: 'Add Payment' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }
}

module.exports = { CreateDummyAccount };
