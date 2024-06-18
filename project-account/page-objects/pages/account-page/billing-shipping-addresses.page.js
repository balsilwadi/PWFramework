const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const td = require('../../data-files/test-data');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const env = require('../../../../support/env/env');

class BillingShippingAddresses extends PageObject {
  pageName = this.constructor.name;

  async clickonAddressLink() {
    await page.waitForLoadState('load');
    await page.locator(el.accountPage.lnkAddresses).click();
    // await page.locator(el.accountPage.lnkAddresses.accountPage.btnAddress).click();
    testReport.log(this.pageName, 'Clicked on Address link');
  }

  /**
   * @function : CB_ClickonShippingAddress
   * @Description : Click on the shipping address link in the account page -> address link
   * @Params: None
   * @Returns: none
   */

  async clickonShippingAddress() {
    await page.waitForLoadState('load');

    await page.click(el.addAddress.lnkShippingAddress);
    testReport.log(this.pageName, 'Clicked on Shipping address');
  }

  /**
   * @function : CB_AddaNewShippingAddress
   * @Description : Verify the fields on shipping address modal and Add a new shipping address
   * @Params: None
   * @Returns: none
   */

  async addaNewShippingAddressLink() {
    await page.waitForLoadState('load');
    await page.locator(el.addAddress.btnAddNewAddress, { delay: 100 }).click();
  }

  async verifyContentShippingAddress() {
    // Verify the content
    await expect(page.locator(el.addAddress.lblAddShippingAddressHeader)).toHaveText(td.myaccountpage_address.shippingaddress_header, {
      ignoreCase: true
    });
    await expect(page.locator(el.addAddress.lblAddShippingAddressFname)).toHaveText(td.myaccountpage_address.shippingaddress_fname, { ignoreCase: true });
    await expect(page.locator(el.addAddress.lblAddShippingAddressLname)).toHaveText(td.myaccountpage_address.shippingaddress_lname, { ignoreCase: true });
    await expect(page.locator(el.addAddress.lblAddShippingAddress)).toHaveText(td.myaccountpage_address.shippingaddress_address, { ignoreCase: true });

    // Click on Add apartment
    await page.locator(el.addAddress.lnkAddShippingApt).click();

    await expect(page.locator(el.addAddress.lblAddShippingApt)).toHaveText(td.myaccountpage_address.shippingaddress_apt, { ignoreCase: true });
    if (env.EXEC_SITE.includes('us'))
      await expect(page.locator(el.addAddress.lblAddShippingZipcode)).toHaveText(td.myaccountpage_address.shippingaddress_zipcode, { ignoreCase: true });
    else
      await expect(page.locator(el.addAddress.lblAddShippingZipcode)).toHaveText(td.myaccountpage_address.shippingaddress_zipcodeCA, {
        ignoreCase: true
      });
    await expect(page.locator(el.addAddress.lblAddShippingCity)).toHaveText(td.myaccountpage_address.shippingaddress_city, { ignoreCase: true });
    if (env.EXEC_SITE.includes('us'))
      await expect(page.locator(el.addAddress.lblAddShippingState)).toHaveText(td.myaccountpage_address.shippingaddress_state, { ignoreCase: true });
    else await expect(page.locator(el.addAddress.lblAddShippingState)).toHaveText(td.myaccountpage_address.shippingaddress_stateCA, { ignoreCase: true });
    await expect(page.locator(el.addAddress.lblAddShippingPhone)).toHaveText(td.myaccountpage_address.shippingaddress_phone, { ignoreCase: true });
    testReport.log(this.pageName, 'Verified the content on add new shipping address page');
  }

  async fillaNewShippingAddress() {
    await page.waitForLoadState('load');

    if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cb2us')) {
      await page.fill(el.addAddress.txtAddShippingAddressFname, td.myaccountpage_address.fname);
      await page.fill(el.addAddress.txtAddShippingAddressLname, td.myaccountpage_address.lname);
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.address);
      // await page.fill(el.addAddress.txtAddShippingApt, td.myaccountpage_address.apt);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcode);
      await expect(page.locator(el.addAddress.txtAddShippingCity)).toHaveValue(td.myaccountpage_address.city, { timeout: 15000 });
      await expect(page.locator(el.addAddress.drpAddShippingState)).toHaveValue(td.myaccountpage_address.statecode, { timeout: 15000 });
      await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone);
    } else if (env.EXEC_SITE.includes('crateca') || env.EXEC_SITE.includes('cb2ca')) {
      await page.fill(el.addAddress.txtAddShippingAddressFname, td.myaccountpage_address.fname);
      await page.fill(el.addAddress.txtAddShippingAddressLname, td.myaccountpage_address.lname);
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.addressCa);
      await page.fill(el.addAddress.txtAddShippingApt, td.myaccountpage_address.aptCa);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcodeCa);
      await page.fill(el.addAddress.txtAddShippingCity, td.myaccountpage_address.cityCa);
      await page.locator(el.addAddress.drpAddShippingState).selectOption(td.myaccountpage_address.stateCa);
      await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone);
    }

    // Click on Add address button
    await page.locator(el.addAddress.btnAddShippingAddress, { delay: 5000 }).click();

    // Handle the address check modal if it is visible
    try {
      await expect(page.locator(el.addAddress.mdlAddShippingCheck)).toBeVisible({ timeout: 60000 });
      await page.click(el.addAddress.btnAddShippingKeepAddress);
    } catch (error) {
      testReport.log(this.pageName, 'AVS popup not displayed');
    }
    testReport.log(this.pageName, 'Shipping address added successfully');
  }

  /**
   * @function : verifytheAddedShippingAddress
   * @Description : Verify whether the shipping address is added successfully
   * @Params: None
   * @Returns: none
   */

  async verifytheAddedShippingAddress() {
    await page.waitForLoadState('load');

    await expect(page.locator(el.addAddress.cntAddShippingName)).toHaveText(`${td.myaccountpage_address.fname} ${td.myaccountpage_address.lname}`);
    await expect(page.locator(el.addAddress.cntAddShippingPhone)).toHaveText(`Phone: ${td.myaccountpage_address.phone}`);
    await expect(page.locator(el.addAddress.msgAddressSuccess)).toContainText('Your address has been added.');

    if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cb2us')) {
      await expect(page.locator(el.addAddress.cntAddShippingAddressLine)).toHaveText(td.myaccountpage_address.address);
      await expect(page.locator(el.addAddress.cntAddShippingCity)).toHaveText(
        `${td.myaccountpage_address.city}, ${td.myaccountpage_address.statecode} ${td.myaccountpage_address.zipcode}`
      );
    } else if (env.EXEC_SITE.includes('crateca') || env.EXEC_SITE.includes('cb2ca')) {
      await expect(page.locator(el.addAddress.cntAddShippingAddressLine)).toHaveText(td.myaccountpage_address.addressCa);
      await expect(page.locator(el.addAddress.cntAddShippingCity)).toHaveText(
        `${td.myaccountpage_address.cityCa}, ${td.myaccountpage_address.stateCa} ${td.myaccountpage_address.zipcodeCa}`
      );
    }
    testReport.log(this.pageName, 'Verified the added shipping address');
  }

  async editShippingAddress() {
    await page.waitForLoadState('load');
    await page.locator(el.addAddress.btnEditShippingAddress).click();

    if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cb2us')) {
      await page.fill(el.addAddress.txtAddShippingAddressFname, td.myaccountpage_address.fname_ed);
      await page.fill(el.addAddress.txtAddShippingAddressLname, td.myaccountpage_address.lname_ed);
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.address_ed);
      // await page.fill(el.addAddress.txtAddShippingApt, td.myaccountpage_address.apt_ed);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcode_ed);
      await expect(page.locator(el.addAddress.txtAddShippingCity)).toHaveValue(td.myaccountpage_address.city_ed, { timeout: 15000 });
      await expect(page.locator(el.addAddress.drpAddShippingState)).toHaveValue(td.myaccountpage_address.statecode_ed, { timeout: 15000 });
      await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone_ed);
    }
    if (env.EXEC_SITE.includes('crateca') || env.EXEC_SITE.includes('cb2ca')) {
      await page.fill(el.addAddress.txtAddShippingAddressFname, td.myaccountpage_address.fname_ed);
      await page.fill(el.addAddress.txtAddShippingAddressLname, td.myaccountpage_address.lname_ed);
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.addressCa_ed);
      await page.fill(el.addAddress.txtAddShippingApt, td.myaccountpage_address.aptCa_ed);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcodeCa_ed);
      await page.fill(el.addAddress.txtAddShippingCity, td.myaccountpage_address.cityCa_ed);
      await page.locator(el.addAddress.drpAddShippingState).selectOption(td.myaccountpage_address.stateCa_ed);
      await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone_ed);
    }

    await page.locator(el.addAddress.btnUpdateAddress).click();

    // Handle the address check modal if it is visible
    try {
      await expect(page.locator(el.addAddress.mdlAddShippingCheck)).toBeVisible({ timeout: 60000 });
      await page.locator(el.addAddress.btnAddShippingKeepAddress, { delay: 5000 }).click();
      testReport.log(this.pageName, 'Validated adding and editing the shipping address');
    } catch (error) {
      testReport.log(this.pageName, 'Validated adding the shipping address');
    }
  }

  async verifyEditShippingAddress() {
    await page.waitForLoadState('load');

    if (env.EXEC_SITE.includes('crateus') || env.EXEC_SITE.includes('cb2us')) {
      await expect(page.locator(el.addAddress.cntAddShippingName)).toHaveText(`${td.myaccountpage_address.fname_ed} ${td.myaccountpage_address.lname_ed}`);
      await expect(page.locator(el.addAddress.cntAddShippingAddressLine)).toHaveText(td.myaccountpage_address.address_ed);
      await expect(page.locator(el.addAddress.cntAddShippingCity)).toHaveText(
        `${td.myaccountpage_address.city_ed}, ${td.myaccountpage_address.statecode_ed} ${td.myaccountpage_address.zipcode_ed}`
      );
    }

    if (env.EXEC_SITE.includes('crateca') || env.EXEC_SITE.includes('cb2ca')) {
      await expect(page.locator(el.addAddress.cntAddShippingName)).toHaveText(`${td.myaccountpage_address.fname_ed} ${td.myaccountpage_address.lname_ed}`);
      await expect(page.locator(el.addAddress.cntAddShippingAddressLine)).toHaveText(td.myaccountpage_address.addressCa_ed);
      await expect(page.locator(el.addAddress.cntAddShippingCity)).toHaveText(
        `${td.myaccountpage_address.cityCa_ed}, ${td.myaccountpage_address.stateCa_ed} ${td.myaccountpage_address.zipcodeCa_ed}`
      );
    }

    await expect(page.locator(el.addAddress.cntAddShippingPhone)).toHaveText(`Phone: ${td.myaccountpage_address.phone_ed}`);
    await expect(page.locator(el.addAddress.msgAddressSuccess)).toContainText('Your information has been updated.');
    testReport.log(this.pageName, 'Verified edit shipping address');
  }

  async deleteShippingAddress() {
    await expect(page.locator(el.addAddress.btnDeleteAddress)).toBeVisible({ timeout: 60000 });
    await page.locator(el.addAddress.btnDeleteAddress).click();
    await page.locator(el.addAddress.btnYesDeleteAddress).click();
  }

  async verifyDeleteShippingAddress() {
    await page.waitForLoadState('load');
    await expect.soft(page.locator(el.addAddress.btnDeleteAddress)).toBeHidden();
    testReport.log(this.pageName, 'Verified edit shipping address');
  }

  async clickonBillingAddress() {
    await page.click(el.addAddress.lnkAddBilling);
    testReport.log(this.pageName, 'Clicked on Billing address');
  }

  /**
   * @function : addNewShippingAddress
   * @Description : Verify the fields on shipping address modal and Add a new shipping address
   * @Params: None
   * @Returns: none
   */

  async addNewBillingAddress(newEmail) {
    await expect(page.locator(el.addAddress.lblBillingAddressHeader)).toHaveText(td.myaccountpage_address.billingaddress_header, { ignoreCase: true });
    if (env.EXEC_SITE.includes('us'))
      await expect(page.locator(el.addAddress.lblBillingAddressDomestic)).toHaveText(td.myaccountpage_address.billingaddress_domestic);
    else await expect(page.locator(el.addAddress.lblBillingAddressDomestic)).toHaveText(td.myaccountpage_address.billingaddress_domesticCA);
    await expect(page.locator(el.addAddress.lblBillingAddressinternational)).toHaveText(td.myaccountpage_address.billingaddress_international);
    // Verify if domestic radio button is checked by default
    await expect(page.locator(el.addAddress.radBillingAddressDomestic)).toBeChecked();

    // Verify the content
    await expect(page.locator(el.addAddress.lblAddShippingAddressFname)).toHaveText(td.myaccountpage_address.shippingaddress_fname);
    await expect(page.locator(el.addAddress.lblAddShippingAddressLname)).toHaveText(td.myaccountpage_address.shippingaddress_lname);
    await expect(page.locator(el.addAddress.lblAddShippingAddress)).toHaveText(td.myaccountpage_address.shippingaddress_address);
    if (env.EXEC_SITE.includes('us'))
      await expect(page.locator(el.addAddress.lblAddShippingZipcode)).toHaveText(td.myaccountpage_address.shippingaddress_zipcode);
    else await expect(page.locator(el.addAddress.lblAddShippingZipcode)).toHaveText(td.myaccountpage_address.shippingaddress_zipcodeCA);
    await expect(page.locator(el.addAddress.lblAddShippingCity)).toHaveText(td.myaccountpage_address.shippingaddress_city);
    if (env.EXEC_SITE.includes('us')) await expect(page.locator(el.addAddress.lblAddShippingState)).toHaveText(td.myaccountpage_address.shippingaddress_state);
    else await expect(page.locator(el.addAddress.lblAddShippingState)).toHaveText(td.myaccountpage_address.shippingaddress_stateCA);
    await expect(page.locator(el.addAddress.lblAddShippingPhone)).toHaveText(td.myaccountpage_address.shippingaddress_phone);
    testReport.log(this.pageName, 'Verified the content on Billing address page');
    // Enter the billing address
    await expect(page.locator(el.addAddress.txtAddShippingAddressLname)).toHaveValue(td.createnewaccount.lName);

    if (env.EXEC_SITE.includes('us')) {
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.address);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcode);
      await page.click(el.addAddress.txtAddShippingCity);
      await expect(page.locator(el.addAddress.txtAddShippingCity)).toHaveValue(td.myaccountpage_address.city, { timeout: 20000 });
      await expect(page.locator(el.addAddress.drpAddShippingState)).toHaveValue(td.myaccountpage_address.statecode);
    } else {
      await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.addressCa);
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.zipcodeCa);
      await page.fill(el.addAddress.txtAddShippingCity, td.myaccountpage_address.cityCa);
      await page.selectOption(el.addAddress.drpAddShippingState, td.myaccountpage_address.stateCa);
    }
    await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone);
    await expect(page.locator(el.addAddress.txtBillingAddressEmail)).toHaveValue(newEmail);
    await page.click(el.addAddress.btnBillingAddress);

    // Handle the address check modal if it is visible
    try {
      await expect(page.locator(el.addAddress.mdlAddShippingCheck)).toBeVisible({ timeout: 60000 });
      await page.click(el.addAddress.btnAddShippingKeepAddress);
    } catch (error) {
      testReport.log(this.pageName, 'AVS popup not displayed');
    }

    // Verify info updated message is displaying
    await expect(page.locator(el.addAddress.lblBillingAddressSuccessMsg)).toBeVisible({ timeout: 60000 });
    const strSuccessMessage = await page.innerText(el.addAddress.lblBillingAddressUpdated);
    expect(strSuccessMessage.trim()).toEqual(td.myaccountpage_address.billingaddress_updated);
    testReport.log(this.pageName, 'New billing address added');
  }

  /**
   * @function : editBillingAddress
   * @Description : Verify the fields on billing adress and add a billing address
   * @Params: None
   * @Returns: none
   */

  async editBillingAddress() {
    await page.click(el.addAddress.txtAddShippingAddress);

    await page.fill(el.addAddress.txtAddShippingAddress, td.myaccountpage_address.updatedAddress);
    await page.click(el.addAddress.btnBillingAddress);

    // Handle the address check modal if it is visible
    try {
      await expect(page.locator(el.addAddress.mdlAddShippingCheck)).toBeVisible({ timeout: 60000 });
      await page.click(el.addAddress.btnAddShippingKeepAddress);
    } catch (error) {
      testReport.log(this.pageName, 'AVS popup not displayed');
    }

    await expect(page.locator(el.addAddress.lblBillingAddressUpdated)).toBeVisible({ timeout: 60000 });
    const strSuccessMessage = await page.innerText(el.addAddress.lblBillingAddressUpdated);
    expect(strSuccessMessage.trim()).toEqual(td.myaccountpage_address.billingaddress_updated);
    testReport.log(this.pageName, 'Billing address updated successfully');
  }

  /**
   * @function : addInternationalBillingAddress
   * @Description : Verify the fields on international billing adress and add an international billing address
   * @Params: account email
   * @Returns: none
   */

  async addInternationalBillingAddress(newEmail) {
    // select the international radio button
    await page.locator(el.addAddress.radInternational).click();
    await page.selectOption(el.addAddress.drpInternationalCountry, td.myaccountpage_address.intaddress_country);
    // Verify the content
    await expect(page.locator(el.addAddress.lblAddShippingAddressFname)).toHaveText(td.myaccountpage_address.shippingaddress_fname);
    await expect(page.locator(el.addAddress.lblAddShippingAddressLname)).toHaveText(td.myaccountpage_address.shippingaddress_lname);
    await expect(page.locator(el.addAddress.lblIntBillingAddress)).toHaveText(td.myaccountpage_address.shippingaddress_address);
    await expect(page.locator(el.addAddress.lblAddShippingZipcode)).toHaveText(td.myaccountpage_address.interpostalcode);
    await expect(page.locator(el.addAddress.lblAddShippingCity)).toHaveText(td.myaccountpage_address.shippingaddress_city);
    await expect(page.locator(el.addAddress.lblIntBillingState)).toHaveText(td.myaccountpage_address.interstate);
    await expect(page.locator(el.addAddress.lblAddShippingPhone)).toHaveText(td.myaccountpage_address.shippingaddress_phone);
    await expect(page.locator(el.addAddress.lblInternationalEmail)).toHaveText(td.myaccountpage_address.interemail);

    testReport.log(this.pageName, 'Verified the content on international shipping address page');

    // Verify the apartment suite field for non-us
    await expect(page.locator(el.addAddress.btnAptToggle)).toHaveText(td.myaccountpage_address.aptToggleShow);
    await page.locator(el.addAddress.btnAptToggle).click();
    await expect(page.locator(el.addAddress.btnAptToggle)).toHaveText(td.myaccountpage_address.aptToggleHide);
    await expect(page.locator(el.addAddress.lblAddress2)).toHaveText(td.myaccountpage_address.interaddress2);
    await expect(page.locator(el.addAddress.lblAddress3)).toHaveText(td.myaccountpage_address.interaddress3);
    await expect(page.locator(el.addAddress.txtAddress2)).toBeVisible();
    await expect(page.locator(el.addAddress.txtAddress3)).toBeVisible();

    // verify the apartment suite field for US / CAN
    if (env.EXEC_SITE.includes('us')) await page.selectOption(el.addAddress.drpInternationalCountry, td.myaccountpage_address.intaddress_countryCA);
    else await page.selectOption(el.addAddress.drpInternationalCountry, td.myaccountpage_address.intaddress_countryUS);
    await expect(page.locator(el.addAddress.lblAddress2)).toHaveText(td.myaccountpage_address.shippingaddress_apt);
    await expect(page.locator(el.addAddress.txtAddress2)).toBeVisible();
    testReport.log(this.pageName, 'Verified the apartment suite field for US / CAN and non US / CAN countries');

    // Enter the international billing address
    await page.fill(el.addAddress.txtAddShippingAddressFname, td.myaccountpage_address.intaddress_fname);
    await page.fill(el.addAddress.txtAddShippingAddressLname, td.myaccountpage_address.intaddress_lname);
    await page.fill(el.addAddress.txtIntBillingAddress, td.myaccountpage_address.intaddress_address1);
    await page.fill(el.addAddress.txtAddress2, td.myaccountpage_address.intaddress_address2);
    if (env.EXEC_SITE.includes('us')) {
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.intaddress_zipcodeCA);
      await page.fill(el.addAddress.txtAddShippingCity, td.myaccountpage_address.intaddress_cityCA);
      await page.selectOption(el.addAddress.drpCityInternational, td.myaccountpage_address.billingaddress_stateCA);
    } else {
      await page.fill(el.addAddress.txtAddShippingZipcode, td.myaccountpage_address.intaddress_zipcodeUS);
      await page.fill(el.addAddress.txtAddShippingCity, td.myaccountpage_address.intaddress_cityUS);
      await page.selectOption(el.addAddress.drpCityInternational, td.myaccountpage_address.billingaddress_stateUS);
    }
    // Enter phone number
    await page.fill(el.addAddress.txtAddShippingPhone, td.myaccountpage_address.phone);
    await page.fill(el.addAddress.txtInternationalEmail, newEmail);

    // Click on Add address button
    await page.locator(el.addAddress.btnBillingAddress).click();

    try {
      await expect(page.locator(el.addAddress.mdlAddShippingCheck)).toBeVisible({ timeout: 60000 });
      await page.click(el.addAddress.btnAddShippingKeepAddress);
    } catch (error) {
      testReport.log(this.pageName, 'AVS popup not displayed');
    }

    // Verify the update successful message
    await expect(page.locator(el.addAddress.lblBillingAddressUpdated)).toBeVisible({ timeout: 60000 });
    const strSuccessMessage = await page.innerText(el.addAddress.lblBillingAddressUpdated);
    expect(strSuccessMessage.trim()).toEqual(td.myaccountpage_address.billingaddress_updated);
    testReport.log(this.pageName, 'International billing address added successfully');
  }
}
module.exports = { BillingShippingAddresses };
