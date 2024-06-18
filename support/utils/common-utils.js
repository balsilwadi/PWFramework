const { expect } = require('@playwright/test');
const fileSystem = require('fs');
const filePath = require('path');
const { PNG } = require('pngjs');
const sharp = require('sharp');
const pixelmatch = require('pixelmatch');
const PropertiesReader = require('properties-reader');
const Jimp = require('jimp');
const { ReportUtils } = require('./report-utils');
const env = require('../env/env');

const fileName = require('../../project-account/page-objects/data-files/new-accounts.json');
const accountFile = require('../../project-account/page-objects/data-files/new-accounts.json');

const reporter = new ReportUtils();

class CommonUtils {
  constructor(page) {
    this.page = page;
    this.isCanada = env.EXEC_SITE.includes('can');
    this.isCB2 = env.EXEC_SITE.includes('cb2');
    this.elapsedTime = 0;
  }

  /**
   *
   * @Function_Name : readSecureProperties
   * @Description : This Function reads the secure property values from property file.
   * @Params : This function expects the Keyword to read the value from secret property file
   * @returns : Will return the Value for secret property keyword
   */
  async readSecureProperties(strKeyword) {
    const strGlobalPath = 'C:/Secrets/secure.properties';
    const globalWriter = PropertiesReader(strGlobalPath, { writer: { saveSections: true } });
    const globalValue = globalWriter.get(strKeyword);
    reporter.log('', `${strKeyword}  was read from secrets file`);
    return globalValue;
  }

  /**
   *
   * @Function_Name : compareString
   * @Description : This Function compares two String values and add the result in report
   * @Params : Two String Values
   * @returns : None
   */
  async compareString(strValue1, strValue2) {
    const strFirstString = strValue1.trim();
    const strSecondString = strValue2.trim();
    if (strFirstString === strSecondString) {
      reporter.log('Compare', `Expected String : ${strFirstString} and Actual String : ${strSecondString} are equal`);
    } else {
      reporter.log('Compare', `Expected String :${strFirstString} and Actual String :${strSecondString} are not equal`);
      throw new Error(`Expected String :${strFirstString} and Actual String :${strSecondString} are not equal`);
    }
  }

  /**
   *
   * @Function_Name : compareActualAndExpectedText
   * @Description : This Function compares a text from website with string value. Then will add the result in report
   * @Params : xpath Object of text value,String
   * @returns : None
   */
  async compareActualAndExpectedText(objEle, strExpText) {
    await expect(page.locator(objEle)).toContainText(strExpText);
    const strActualText = await page.locator(objEle).innerText();
    reporter.log('Compare', `Actual:: ${strActualText}, Expected:: ${strExpText}`);
    /* if (expect(strActualText).toContain(strExpText)) {
            reporter.log('Expected value \"' + strExpText + '"\ matches with \"' + strActualText + '\"');
        }
        else {
            reporter.log('Expected value \"' + strExpText + '"\ not matches with \"' + strActualText + '\"');
            throw new Error('Expected value \"' + strExpText + '"\ not matches with \"' + strActualText + '\"');
        } */
  }

  /**
   *
   * @Function_Name : verifyListOfItemsInfo
   * @Description : This Function compares a text from Object of Xpath Array with string value. Then will add the result in report
   * @Params : Array of Elements, Expected String Value
   * @returns : None
   */
  async verifyListOfItemsInfo(arrEles, strExpectedText) {
    await Promise.all(
      arrEles.map(async (ele, i) => {
        const strActualValue = (await ele.innerText()).toUpperCase();
        // console.log(`strActualValue - ${strActualValue}`, `strExpectedText[i] - ${strExpectedText[i]}`);
        // console.count('----'+i+'--> '+actualValue);
        const expectedValue = strExpectedText[i].toUpperCase();
        expect(strActualValue).toContain(expectedValue, { ignoreCase: true });
        reporter.log(`ItemInfo:: Assert -> Displayed:: ${await strActualValue}matched with Expected:: ${expectedValue}`);
      })
    );
  }

  async verifyCartElements(arrayEle, expArray, jsonKey) {
    await Promise.all(
      arrayEle.map(async (ele, i) => {
        const actualValue = await ele.innerText();
        const itemJson = JSON.parse(expArray[i]);
        // console.log(`ActualValue - ${actualValue}`, `ExpectedText - ${itemJson[jsonKey]}`);
        expect(actualValue).toContain(itemJson[jsonKey], { ignoreCase: true });
        reporter.log(`ItemInfo:: Assert -> Displayed:: ${await actualValue}matched with Expected:: ${itemJson[jsonKey]}`);
      })
    );
  }

  async compareStringByRemovingSpecChars(pageName, actual, expected) {
    // removing oz characters as there is a discrepancy with review and cart
    const cleansedActual = actual
      .replace(/[^a-z]/gi, '')
      .toLowerCase()
      .replace('oz', '');
    const cleansedExpected = expected
      .replace(/[^a-z]/gi, '')
      .toLowerCase()
      .replace('oz', '');

    expect(cleansedActual).toContain(cleansedExpected);
    // console.log('actual -> ' + actual + ' expected => ' + expected)
    reporter.log(pageName, `Assertion -> ActualValue:: ${actual}matches with Expected:: ${expected}`);
  }

  async compareStringByRemovingExtraSpaces(pageName, actual, expected) {
    const cleansedActual = actual.replace(/\s{2,}/g, ' ').toLowerCase();
    const cleansedExpected = expected.replace(/\s{2,}/g, ' ').toLowerCase();
    reporter.log(pageName, `Assertion -> ActualValue:: ${actual}, Expected:: ${expected}`);
    expect(cleansedActual).toContain(cleansedExpected);
    // console.log('actual -> ' + actual + ' expected => ' + expected)
    reporter.log(pageName, `Assertion -> ActualValue:: ${actual}matches with Expected:: ${expected}`);
  }

  async removeAlphaCharactersFromString(inputString) {
    const stringAfterRemovingAplhaChars = inputString.replace(/[a-zA-Z\s]/g, '');
    return stringAfterRemovingAplhaChars;
  }

  async validateCartElements(pageName, actualValue, expectedValue) {
    expect(actualValue).toContain(expectedValue, { ignoreCase: true });
    reporter.log(pageName, `Assertion -> ActualValue:: ${actualValue}matches with Expected:: ${expectedValue}`);
  }

  async validateCartElementsIgnoringCase(pageName, actualValue, expectedValue) {
    expect(actualValue.toLowerCase().trim()).toContain(expectedValue.toLowerCase().trim(), { ignoreCase: true });
    reporter.log(pageName, `Assertion -> ActualValue:: ${actualValue}matches with Expected:: ${expectedValue}`);
  }

  convertDateString(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(dateString);
    const day = d.getUTCDate();
    const dayIndex = d.getUTCDay();
    const dayName = days[dayIndex];
    const monthIndex = d.getUTCMonth();

    return `${dayName}, ${monthIndex + 1}/${day}`;
  }

  parseFloatFromCurrency(currencyAmt) {
    return parseFloat(currencyAmt.replace('$', '').replace('CAD ', '').replaceAll(',', ''));
  }

  formatDate(dateString) {
    // console.log(`dateString ----- >${dateString}`);
    const [month, day, year] = dateString.split('/');
    let formattedDay = day;
    if (day.length === 1) {
      formattedDay = `0${day}`;
    }
    return `${month}/${formattedDay}/${year}`;
  }

  /**
   *
   * @Function_Name : extractingJsonKey
   * @Description : This Function used to extract the  Keys from JSON
   * @Params : JSON
   * @returns : Keys of given JSON
   */
  async extractingJsonKeys(objJson1) {
    const objKeys = Object.keys(objJson1);
    // const keys1 = keys;
    // const value = Object.values(objJson1);
    return objKeys;
  }

  /**
   *
   * @Function_Name : validateEmail
   * @Description : This Function used to Validate the Email address format
   * @Params : Email Address
   * @returns : None
   */
  async validateEmail(strEmail) {
    const strMailFormat = /^\w+([.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (strMailFormat.test(strEmail)) {
      reporter.log(`${strEmail}is a Valid email address!`);
    } else {
      reporter.log('Invalid email address!');
      throw new Error(`${strEmail}is a Invalid email address!`);
    }
  }

  /**
   *
   * @Function_Name : validateLocationNumber
   * @Description : This Function used to Validate the location number three digit
   * @Params : location number in three digits
   * @returns : None
   */
  async validateLocationNumber(intLocationNumber) {
    const strNumFormat = /^[0-9]{3}$/;
    if (strNumFormat.test(intLocationNumber)) {
      reporter.log(`${intLocationNumber} Valid Location Number!`);
    } else {
      reporter.log(`${intLocationNumber} is an invalid Location Number!`);
    }
  }

  /**
   *
   * @Function_Name : formUrl
   * @Description : This Function used to generate the URL for API service
   * @Params : Environment and the URL with out domain name
   * @returns : API URL
   */
  async formUrl(strEnv, strUrl) {
    let apiEndPoint;
    let baseUrl;
    switch (strEnv) {
      case 'QA_Bearer':
        baseUrl = global.auth_urlQA;
        apiEndPoint = baseUrl + strUrl;
        break;

      case 'QA':
        baseUrl = global.QA_api;
        apiEndPoint = baseUrl + strUrl;
        break;

      default:
        break;
    }
    return apiEndPoint;
  }

  /**
   *
   * @Function_Name : readJson
   * @Description : This Function used to read the API Testdata JSON file from apidatafile folder
   * @Params : Environment (QA,Preview),JSON file name,Project Name
   * @returns : JSON from API data file
   */

  async readJson(strEnv, strJsonName, strProject) {
    reporter.log(`${strProject} ${strEnv} Environment ${strJsonName} was read.`);
    const testDataJson = JSON.parse(fileSystem.readFileSync(`${strProject}/data/api-data/${strEnv}/${strJsonName}`, 'utf-8'));
    return testDataJson;
  }

  /**
   *
   * @Function_Name : convertingJSONToMap
   * @Description : This Function used to converting a JSON to Map
   * @Params :  JSON Object need to be passed as a parameter
   * @returns : Map
   */
  async convertingJSONToMap(objJsonData) {
    return new Map(Object.entries(objJsonData));
  }

  /**
   *
   * @Function_Name : compareSimpleJsonData
   * @Description : This Function used validate the key Value Pair from Json
   * @Params : JSON Object,String value of Key,String Value of Value
   * @returns : none
   */
  async compareSimpleJsonData(objResponseJson, strExpKey, strExpValue) {
    Object.entries(objResponseJson).forEach(([key, value]) => {
      if (key === strExpKey) {
        if (value === strExpValue) {
          reporter.log(`Expected key: ${key}, and expcted value: ${value} pairs are equal `);
        } else {
          reporter.log(`Expected key: ${key} is matched but expected value: ${value} does not match with the actual value `);
        }
      }
    });
  }

  /**
   *
   * @Function_Name : validateJsonValueIsNotEmpty
   * @Description : This Function used validate the key is not empty
   * @Params : JSON Object,String value of Key
   * @returns : none
   */
  async validateJsonValueIsNotEmpty(objResponseJson, strExpKey) {
    Object.entries(objResponseJson).forEach(([key, value]) => {
      if (key === strExpKey) {
        if (value == null) {
          reporter.log(`Expected key: ${key} and its value is null `);
        } else {
          reporter.log(`Expected key: ${key} and its value is not null`);
        }
      }
    });
  }

  /**
   *
   * @Function_Name : generateNewEmail
   * @Description : This Function used to generate the random email ID in Valid Format
   * @Params : JSON Object,String value of Key
   * @returns : random email ID in Valid format
   */
  generateNewEmail() {
    const strCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 5;
    const intCharactersLength = strCharacters.length;
    for (let i = 0; i < length; i++) {
      result += strCharacters.charAt(Math.floor(Math.random() * intCharactersLength));
    }
    reporter.log('CreateNewAccount', `The Email Generated was pw.automation${result}@crateandbarrel.com`);
    result = `pw.automation${result}@crateandbarrel.com`;
    return result;
  }

  /**
   *
   * @Function_Name : replaceAll
   * @Description : This Function used to remove the value from String
   * @Params : string Value, String value of Particular String part which should removed, String Value of the part which wll get it replaced
   * @returns : String
   */
  replaceAll(strValue, strFind, strReplace) {
    return strValue.replace(new RegExp(strFind, 'g'), strReplace);
  }

  verifyIsMobile() {
    let isMobile = false;
    isMobile = !process.env.DEVICE.includes('Desktop');
    return isMobile;
  }

  // eslint-disable-next-line no-shadow
  addNewAccountToJSON(email, password, isDone, env) {
    let users = fileName;
    // const file = require(fileName);
    const user = {
      email,
      password,
      isDone,
      env
    };

    const content = fileSystem.readFileSync(fileName, 'utf-8');
    users = JSON.parse(content);
    users.push(user);
    fileSystem.writeFile(fileName, JSON.stringify(users, null, 4), (err) => {
      if (err) {
        return;
      }

      reporter.log(`New account details are added to the json file email: ${email} password: ${password}`);
    });
  }

  getEmailfromNewAccount() {
    let temp;
    let i;
    const dataFilter = accountFile.filter((element) => element.isDone === 'no');

    if (dataFilter.length > 0) {
      temp = dataFilter[0].email;

      for (i = 0; i < accountFile.length; i++) {
        if (accountFile[i].email.toString().includes(temp)) {
          accountFile[i].isDone = 'yes';
          temp = `${temp} | ${dataFilter[0].password}`;
          fileSystem.writeFileSync(
            fileName,
            // eslint-disable-next-line consistent-return
            JSON.stringify(accountFile, null, 4, (err) => {
              if (err) return reporter.log(err);
              reporter.log('Updated the account as used in the JSON file');
            })
          );
          break;
        }
      }
      fileName.close();
      return temp;
    }

    fileName.close();
    return null;
  }

  generatePassword() {
    const strLowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const strUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const strNumbers = '0123456789';
    const strSpecialChar = '!@$*';
    let result = '';
    const length = 4;
    const charactersLength = strLowerCase.length;
    for (let i = 0; i < length; i++) {
      result += strLowerCase.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let k = 0; k < length; k++) {
      result += strNumbers.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let j = 0; j < length; j++) {
      result += strUpperCase.charAt(Math.floor(Math.random() * charactersLength));
    }

    result += strSpecialChar.charAt(Math.floor(Math.random() * 1));
    return result;
  }

  /**
   *
   * @Function_Name : hasNumber
   * @Description : This Function returns true if a string contains number else false
   * @Params : any string
   * @returns : returns true / false
   */

  hasNumber(str) {
    return /\d/.test(str);
  }

  /**
   *
   * @Function_Name : getJSONProperty
   * @Description : This Function used to read a key from a json file
   * @Params : json file, json path
   * @returns : returns the json value for the given key. Returns undefined if key not matches
   */

  getJSONProperty(json, path) {
    const tokens = path.split('.');
    let obj = json;
    for (let i = 0; i < tokens.length; i++) {
      obj = obj[tokens[i]];
    }
    return obj;
  }

  /**
   *
   * @Function_Name : readJSONValue
   * @Description : This Function invokes the getJSONProperty() to read a key from a json file
   * @Params : json path
   * @returns : returns the json value for the given key. Returns undefined if key not matches
   */

  readJSONValue(jsonFile, jsonPath) {
    const value = this.getJSONProperty(jsonFile, jsonPath);
    return value;
  }

  /**
   * @author: Ajesh Soman
   * @function_Name : proceedToCanadaFromGlobalPopup
   * @Description :  lick on continue canada but in geo location popup
   * @params : none
   * @returns : None
   * */
  async proceedToCanadaFromGlobalPopup() {
    for (let attempt = 1; attempt < 10; attempt++) {
      reporter.log(`checking whether global popup is launched. attempt # ${attempt}`);
      // eslint-disable-next-line no-await-in-loop
      await page.waitForLoadState('load');
      let isGlobalPopupVisible = false;
      // eslint-disable-next-line no-await-in-loop
      isGlobalPopupVisible = await page.locator('[data-id=popup-container]').isVisible();
      if (isGlobalPopupVisible) {
        // eslint-disable-next-line no-await-in-loop
        await page.getByRole('button', { name: 'Continue to Canadian Site' }).click();
        break;
      }
    }
  }

  async captureSnapshot(pageName) {
    const buffer = await global.page.screenshot({
      // eslint-disable-next-line no-undef
      path: `reports/screenshots/${pageName}_${scenario.pickle.name}.png`,
      fullPage: true
    });
    const decodedImage = Buffer.from(buffer, 'base64');
    return decodedImage;
  }

  async captureElementSnapshot(screenElement) {
    // const element = await page.$(`img[data-cardtype=${input[i].giftCardType}]`); // Replace with your element selector
    // await element.screenshot({ path: `reports/screenshots/${input[i].giftCardType}.png` });
    const buffer = await screenElement.screenshot({ path: `reports/screenshots/123.png` });
    const decodedImage = Buffer.from(buffer, 'base64');
    // IWorld.attach(decodedImage, 'image/png');
    return decodedImage;
  }

  async capturePageScreenshot(pageNameOrCase) {
    await page.screenshot({ path: `reports/${pageNameOrCase}_s.png` });
    /*
    const buffer = await global.page.screenshot({
      path: `reports/${pageNameOrCase}_s.png`,
      fullPage: true
    });

    const decodedImage = Buffer.from(buffer, 'base64');
    this.attach(decodedImage, 'image/png');
    */
  }

  // visual comparison with pixel match and PNG
  async visualComparison(pageName, element, referenceImagePath) {
    page.setDefaultTimeout(600000);
    let elementScreenshot;
    if (element) {
      elementScreenshot = await element.screenshot();

      let capturedImage = PNG.sync.read(elementScreenshot);
      const referenceImageBuffer = fileSystem.readFileSync(filePath.join(__dirname, referenceImagePath));
      const referenceImage = PNG.sync.read(referenceImageBuffer);
      let resizedScreenshotBuffer;
      if (capturedImage.width !== referenceImage.width || capturedImage.height !== referenceImage.height) {
        resizedScreenshotBuffer = await sharp(elementScreenshot).resize(referenceImage.width, referenceImage.height).toBuffer();
      } else {
        resizedScreenshotBuffer = elementScreenshot;
      }
      capturedImage = PNG.sync.read(resizedScreenshotBuffer);
      const { width, height } = capturedImage;
      const diffImage = new PNG({ width, height });

      const numDiffPixels = pixelmatch(referenceImage.data, capturedImage.data, diffImage.data, width, height, { threshold: 0.1 });
      const mismatchThreshold = 100; // Adjust this based on your requirements
      if (numDiffPixels <= mismatchThreshold) {
        reporter.log(pageName, `Image comparison passed. Images match within the threshold. ${numDiffPixels} pixels.`);
      } else {
        throw new Error(`Image comparison failed. Images differ by ${numDiffPixels} pixels.`);
      }
    } else {
      throw new Error('Element not found');
    }
    return elementScreenshot;
  }

  // visual comparison with pixel match and Jimp, saves images
  async visualComparisonVerIII(pageName, element, referenceImagePath) {
    page.setDefaultTimeout(600000);
    const elementScreenshot = await element.screenshot();
    let comparisonImageData;
    try {
      const referenceImageBuffer = fileSystem.readFileSync(filePath.join(__dirname, referenceImagePath));
      const elementImage = await Jimp.read(elementScreenshot);
      const referenceImage = await Jimp.read(referenceImageBuffer);

      const width = Math.max(elementImage.getWidth(), referenceImage.getWidth());
      const height = Math.max(elementImage.getHeight(), referenceImage.getHeight());

      elementImage.resize(width, height);
      referenceImage.resize(width, height);

      const comparisonImage = new Jimp(width, height);

      comparisonImage.blit(elementImage, 0, 0);
      comparisonImage.blit(referenceImage, elementImage.getWidth(), 0);

      const diffImage = new Uint8Array(comparisonImage.bitmap.data.length);
      const mismatchedPixels = pixelmatch(elementImage.bitmap.data, referenceImage.bitmap.data, diffImage, width, height, { threshold: 150000 });

      for (let i = 0; i < mismatchedPixels * 4; i += 4) {
        comparisonImage.bitmap.data[i] = 255; // Set the red channel to 255
      }

      comparisonImageData = await comparisonImage.getBufferAsync(Jimp.MIME_PNG);
      let outputPath = 'reports/screenshots/comparison.png';
      fileSystem.writeFile(outputPath, comparisonImageData, (error) => {
        if (error) {
          reporter.log('Error writing the file:', error);
        } else {
          reporter.log('File written successfully.');
        }
      });

      outputPath = 'reports/screenshots/difference.png';
      fileSystem.writeFile(outputPath, diffImage, (error) => {
        if (error) {
          reporter.log('Error writing the file:', error);
        } else {
          reporter.log('File written successfully.');
        }
      });

      reporter.log(pageName, `Number of mismatched pixels: ${mismatchedPixels}`);
    } catch (error) {
      reporter.log(pageName, `Error: ${error}`);
    }
    return comparisonImageData;
  }

  async visualComparisonVerII(pageName, element, referenceImagePath) {
    page.setDefaultTimeout(600000);
    const elementScreenshot = await element.screenshot();
    let comparisonImageData;
    try {
      const referenceImageBuffer = fileSystem.readFileSync(filePath.join(__dirname, referenceImagePath));
      const elementImage = await Jimp.read(elementScreenshot);
      const referenceImage = await Jimp.read(referenceImageBuffer);
      const width = elementImage.getWidth() + referenceImage.getWidth();
      const height = Math.max(elementImage.getHeight(), referenceImage.getHeight());
      const comparisonImage = new Jimp(width, height);
      // Composite the two images side by side
      comparisonImage.blit(elementImage, 0, 0);
      comparisonImage.blit(referenceImage, elementImage.getWidth(), 0);
      comparisonImageData = await comparisonImage.getBufferAsync(Jimp.MIME_PNG); // Convert the comparison image to a buffer
    } catch (error) {
      reporter.log(pageName, `Error: ${error}`);
    }
    return comparisonImageData;
  }

  async getElementHandlesArray(locatorText) {
    const elementsHandle = await page.evaluateHandle((selector) => {
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map((element) => element);
    }, locatorText);
    const elementsHandles = await elementsHandle.jsonValue();
    return elementsHandles;
  }

  async clickUsingElementHandle(locatorText) {
    // eslint-disable-next-line playwright/no-eval
    await page.$eval(locatorText, (elem) => elem.click());
  }

  async isCheckBoxCheckedUsingElementHandle(locatorText) {
    let booleanIsCheckBoxCheckedUsingElementHandle = false;
    // eslint-disable-next-line playwright/no-eval
    booleanIsCheckBoxCheckedUsingElementHandle = await page.$eval(locatorText, (checkbox) => checkbox.checked);
    return booleanIsCheckBoxCheckedUsingElementHandle;
  }

  // this can be called await common.forcedWait(1000);
  async forcedWait(pageName, ms) {
    this.elapsedTime += ms;
    const startTime = Date.now();
    while (Date.now() - startTime < ms) {
      // Do nothing, wait for the specified time to elapse
    }
    await reporter.logTestSnapshot(pageName, `hard wait -> ${ms} ms, total forced wait: ${this.elapsedTime}`);
  }

  removeCommasFromCurrencyValue(dollarAmt) {
    const updatedDollarAmt = dollarAmt.replace(/,/g, '');
    return parseFloat(updatedDollarAmt);
  }

  getCurrencyString() {
    const currencyString = this.isCanada ? 'CAD ' : '$';
    return currencyString;
  }

  async getRandomInt(min, max) {
    const Min = Math.ceil(min);
    const Max = Math.floor(max);
    return Math.floor(Math.random() * (Max - Min + 1) + Min); // The maximum is exclusive and the minimum is inclusive
  }

  formattedDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();

    return `${dayOfWeek}, ${date.getMonth() + 1}/${day}`;
  }

  addBusinessDays(date, days) {
    const day = 1000 * 60 * 60 * 24;
    let count = 0;
    while (count < days) {
      date.setTime(date.getTime() + day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    }
    return date;
  }

  holidayWithinRange(startDate, endDate) {
    const holidays = [
      new Date('2024-01-01'), // New Year's Day
      new Date('2024-07-04'), // Independence Day
      new Date('2024-05-27') // Memorial Day
      // Add more holidays as needed...
    ];
    return holidays.some((holiday) => holiday >= startDate && holiday <= endDate);
  }

  generateDateRange() {
    const now = new Date();

    const options = { timeZone: 'America/Chicago' };
    const today = new Date(now.toLocaleString('en-US', options));
    const todayInUTC = new Date(today);
    const utcDateString = todayInUTC.toISOString();
    // const today = new Date();
    const cutoffTime = 12; // 12 PM (noon)
    let businessDays = env.CONTINENTALSTANDARDPARCELDELIVERYDATEMIN;

    if (today.getHours() >= cutoffTime) {
      businessDays = 4;
    }

    let startDate = this.addBusinessDays(new Date(utcDateString), businessDays);
    let futureDate = this.addBusinessDays(new Date(startDate), env.CONTINENTALSTANDARDPARCELDELIVERYDATEADD);
    const isHolidayInRange = this.holidayWithinRange(today, futureDate);

    if (isHolidayInRange) {
      businessDays = 1;
      startDate = this.addBusinessDays(new Date(startDate), businessDays);
      futureDate = this.addBusinessDays(new Date(startDate), env.CONTINENTALSTANDARDPARCELDELIVERYDATEADD);
    }

    const formattedStartDate = this.formattedDate(startDate);
    const formattedEndDate = this.formattedDate(futureDate);

    // const dateSeperator = this.isCB2 ? '–' : '-';
    const dateSeperator = '–';
    return `${formattedStartDate} ${dateSeperator} ${formattedEndDate}`;
  }

  addTime(inputTime, hoursToAdd, minutesToAdd) {
    const inputDate = new Date();
    const [inputHours, inputMinutes] = inputTime.split(':');
    inputDate.setHours(parseInt(inputHours, 10), parseInt(inputMinutes, 10), 0, 0);
    const resultTime = new Date(inputDate.getTime() + (hoursToAdd * 60 + minutesToAdd) * 60000);
    const hours = resultTime.getHours();
    const minutes = resultTime.getMinutes();
    const formattedResult = `${(hours < 10 ? '0' : '') + hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedResult;
  }

  /**
   *
   * @Function_Name : getArrayOfRandomInt
   * @Description : This Function is used to return a array of random integers with desired length.The array contains integers between 1 and upper limit and are sorted in ascending order
   * @Params : Integer, Integer
   * @returns : Array of integers
   */
  async getArrayOfRandomInt(quantity, max) {
    const arr = [];
    while (arr.length < quantity) {
      const candidateInt = Math.floor(Math.random() * max) + 1;
      if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
    }
    arr.sort(function (a, b) {
      return a - b;
    });
    return arr;
  }

  /**
   *
   * @Function_Name : sortDates
   * @Description : This Function takes an array of dates in string format and sort them and return an array. input x = ['1/1/2025', '1/3/2024', '11/2/2024', '1/5/2024']. output y = ['1/3/2024', '1/5/2024', '11/2/2024', '1/1/2025']
   * @Params : Array
   * @returns : Array
   */
  async sortDates(inputArray) {
    // Convert strings to Date objects for sorting
    const dateObjects = inputArray.map((dateString) => new Date(dateString));

    // Sort the Date objects
    dateObjects.sort((a, b) => a - b);

    // Convert sorted Date objects back to string format
    const sortedStrings = dateObjects.map((dateObject) => {
      const month = dateObject.getMonth() + 1; // Months are zero-based
      const day = dateObject.getDate();
      const year = dateObject.getFullYear();
      return `${month}/${day}/${year}`;
    });

    return sortedStrings;
  }
}

module.exports = { CommonUtils };
