const { EnvironmentUtils } = require('../../support/utils/env-utils');
const { ReportUtils } = require('../../support/utils/report-utils');

const el = require('../elements/elements');

const envUtils = new EnvironmentUtils();
const testReport = new ReportUtils();

class HeaderLocationDropdownIconHelper {
  pageName = this.constructor.name;

  /**
   * Hovers over the map pin dropdown icon in the homepage header.
   * If on mobile, clicks the first button in the dropdown; otherwise, hovers over the icon.
   *
   * @param {boolean} isMobile - Indicates whether the execution is on a mobile device.
   * @throws {Error} If the map pin dropdown icon is not found while hovering.
   * @author Emmanuel Miller
   */
  async hoverMapPinDropdownIcon(isMobile) {
    const locator = page.getByTestId(el.HOMEPAGE_HEADER.MapPinDropdownIcon, { waitFor: 'visible' });

    if (locator) {
      if (isMobile) {
        await locator.getByTestId('button').first().click();
      } else {
        await locator.hover({ delay: 1000 });
      }
    } else {
      testReport.log(this.pageName, `DROPDOWN ICON NOT FOUND WHILE HOVERING.`);
    }
  }

  /**
   * Clicks the dropdown button beside the ZIP code in the homepage header.
   *
   * @throws {Error} If the dropdown button is not found while clicking.
   * @author Emmanuel Miller
   */
  async clickDropdownBesideZipCode() {
    const dropdownButton = page.getByTestId(el.HOMEPAGE_HEADER.MapPinZipCodeDropDown).getByRole('button', { waitFor: 'visible' });

    if (dropdownButton) {
      await dropdownButton.click({ delay: 200 });
    } else {
      testReport.log(this.pageName, `BUTTON NOT FOUND WHILE CLICKING STORE LOCATION.`);
    }
  }

  /**
   * Enters a ZIP code in the location dropdown on the homepage and updates it.
   *
   * @param {string} zipCode - The ZIP code to be entered in the location dropdown.
   * @throws {Error} If the input text box or button is not found, or if there's an issue setting the ZIP code value.
   * @author [Emmanuel Miller]
   */
  async inputZipCodeInLocationDropdown(zipCode) {
    const { LOCATION_TXTBOX, LOCATION_BUTTON } = el.HOMEPAGE;
    const finalZipCode = envUtils.isCa() ? 'L4B1K4' : zipCode.toString();
    const setErrorMessage = (errMessage) => testReport.log(this.pageName, errMessage);

    // locate txtBox and verify it's actually there
    const input = page.getByTestId(LOCATION_TXTBOX);
    if (!input) {
      setErrorMessage('Input text box not found');
    }

    // insert zipcode and verify
    testReport.log(this.pageName, `Final zipCode : ${finalZipCode}`);
    // await page.evaluate(
    //   ([LOCATION_TXTBOX, finalZipCode, setErrorMessage]) => {
    //     const _input = document.querySelector(LOCATION_TXTBOX);
    //     _input.value = finalZipCode;
    //     if (_input.value !== finalZipCode) {
    //       setErrorMessage('Failed to set ZIP code value');
    //     }
    //   },
    //   [LOCATION_TXTBOX, finalZipCode, setErrorMessage]
    // );

    // locate the div with the class location-input and data-testid location-input
    const locationInputDiv = page.getByTestId(LOCATION_BUTTON);
    if (!locationInputDiv) {
      setErrorMessage('Location input div not found');
    }

    // locate the button within the location-input div and click it
    const button = locationInputDiv.getByTestId('button');
    if (!button) {
      setErrorMessage('Button not found within location-input div');
    }
  }
}

module.exports = { HeaderLocationDropdownIconHelper };
