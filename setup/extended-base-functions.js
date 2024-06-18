const { expect } = require('@playwright/test');
const { ReportUtils } = require('../support/utils/report-utils');

const testReport = new ReportUtils();

let elementName = '';
let blnSetValue = false;
class ExtendedBaseFunctions {
  async verifyElementExistOrDisable(selector, selectorName) {
    await page.waitForLoadState('domcontentloaded');
    // await this.waitForTimeout(2000)
    await this.isObjectExist(selector, selectorName);
    // verifies if element is disabled or not
    if (await this.isDisabled(selector, selectorName)) {
      blnSetValue = false;
      throw new Error(`${elementName} with selector name: ${selectorName} and selector: ${selector} is disabled`);
    }
  }

  // custom method to click on any element
  customClick = async (selector, selectorName) => {
    await this.verifyElementExistOrDisable(selector, selectorName);
    blnSetValue = true;
    await page.locator(selector).click();
    await this.elementReporterLog(selector, selectorName, ' is clicked');
  };

  // custom method to select a checkbox
  customCheck = async (selector, selectorName) => {
    let lbl = '';
    await this.verifyElementExistOrDisable(selector, selectorName);
    lbl = await page.locator(selector).textContent();
    blnSetValue = true;
    await page.locator(selector).click();
    this.elementReporterLog(selector, selectorName, '', lbl);
  };

  // custom method to select a radio button
  customRadio = async (selector, selectorName) => {
    let lbl = '';
    await this.verifyElementExistOrDisable(selector, selectorName);
    blnSetValue = true;
    lbl = await page.locator(selector).textContent();
    blnSetValue = true;
    await page.locator(selector).click();
    this.elementReporterLog(selector, selectorName, '', lbl);
  };

  // custom method to type on a text field
  customSet = async (selector, data, selectorName) => {
    await this.verifyElementExistOrDisable(selector, selectorName);
    await page.locator(selector).fill(data, { delay: 100 });
    await this.elementReporterLog(selector, selectorName, '', data);
  };

  // custom method to select from dropdown using its label
  customSelectByValue = async (selector, value, selectorName) => {
    await this.verifyElementExistOrDisable(selector, selectorName);
    await page.locator(selector).selectOption({ label: value });
    await this.elementReporterLog(selector, selectorName, 'Option with value ', value);
  };

  // custom method to select from dropdown using index
  customSelectByIndex = async (selector, zeroBasedIndex, selectorName) => {
    await this.verifyElementExistOrDisable(selector, selectorName);
    await page.locator(selector).selectOption({ index: zeroBasedIndex });
    await this.elementReporterLog(selector, selectorName, 'Option with Index ', zeroBasedIndex);
  };

  // custom method to wait until element is attached to DOM
  /* eslint-disable playwright/no-wait-for-selector */
  customWait = async (selector, selectorName) => {
    if (
      (await page
        .waitForSelector(selector, {
          state: 'attached',
          timeout: 90000
        })
        .catch((e) => e)) instanceof Error
    ) {
      blnSetValue = false;
      this.elementReporterLog(selector, selectorName, ' is not found');
      throw new Error(`${elementName} with selector Name ${selectorName} and locator ${selector} is not found`);
    }
  };

  // checks if object exists and is visible
  isObjectExist = async (selector, selectorName) => {
    await this.customWait(selector, selectorName);
    const objCount = await page.locator(selector).count(); // gets the number of elements present

    // if number of elements is more than 1 throws the below error
    if (objCount > 1) {
      blnSetValue = false;
      this.elementReporterLog(selector, selectorName, ' have multiple elements');
      throw new Error(`${elementName} with selector Name ${selectorName} and locator ${selector} have multiple elements`);
    }
    // waits until the element is visible for maximum 10 second
    if (
      (await page
        .locator(selector)
        .waitFor({ timeout: 10000 })
        .catch((e) => e)) instanceof Error
    ) {
      blnSetValue = false;
      this.elementReporterLog(selector, selectorName, ' is not visible');
      throw new Error(`${elementName} with selector Name ${selectorName} and locator ${selector} is not visible`);
    }
  };

  // checks if elements is disabled
  isDisabled = async (selector) => {
    try {
      await expect(selector).toBeDisabled({ timeout: 90000 });
      return true;
    } catch (error) {
      return false;
    }
  };

  elementReporterLog = (selector, selectorName, msg = '', data = '') => {
    const prefix = selectorName.slice(0, 3).toLowerCase();
    // checks the type of element and based on that logs the message to the report
    switch (prefix) {
      case 'lnk': {
        elementName = 'Link';
        testReport.log(`Link with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        break;
      }
      case 'img': {
        elementName = 'Image Link';
        testReport.log(`Image Link with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        break;
      }
      case 'btn': {
        elementName = 'Button';
        testReport.log(`Button with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        break;
      }
      case 'txt': {
        elementName = 'Text Field';

        if (blnSetValue) {
          testReport.log(`Value ${data} is entered in the ${selectorName} field`);
        } else {
          testReport.log(`Text Field with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        }
        break;
      }
      case 'cbo': {
        elementName = 'DropDown';

        if (blnSetValue) {
          testReport.log(`${msg} ${data} is selected in the ${selectorName} dropdown`);
        } else {
          testReport.log(`Dropdown with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        }
        break;
      }
      case 'chk': {
        elementName = 'CheckBox';

        if (blnSetValue) {
          testReport.log(`Checkbox with label: ${data} and selector name: ${selectorName} is checked`);
        } else {
          testReport.log(`Checkbox with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        }

        break;
      }
      case 'rdb': {
        elementName = 'Radio Button';

        if (blnSetValue) {
          testReport.log(`Radio Button with label: ${data} and selector Name: ${selectorName} is checked`);
        } else {
          testReport.log(`Radio Button with selector name: ${selectorName} and selector: ${selector} ${msg}`);
        }
        break;
      }
      default: {
        elementName = 'UNKNOWN ELEMENT';

        testReport.log(`${elementName} with selector name: ${selectorName} has completed the action`);
        testReport.log('However the above element does not match the coding standards. Please rename the selector name');
        break;
      }
    }
  };
}

module.exports = { ExtendedBaseFunctions };
