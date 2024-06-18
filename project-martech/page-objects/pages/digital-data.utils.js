/* eslint-disable no-await-in-loop */
const { expect } = require('@playwright/test');
const { SearchPLP, arrFiltersSelcted } = require('../../../project-search-stores/page-objects/pages/search/search.page');

const searchPage = new SearchPLP();

class CompareDDL {
  pageName = this.constructor.name;

  /**
   * @function_Name : deepEqual
   * @Description : To Compare  expected object with actual object
   * @params : objExpected,objActual
   * @returns : true (Error if not matched)
   * */

  // Method to compare if expected object value matches with actual object value
  async deepEqual(objExpected, objActual, eventName) {
    // array of the keys from the expected object whose values we want to test
    const expectedObjKeys = Object.keys(objExpected);
    // function that returns true/false if argument is an object
    const isObject = function (object) {
      return object != null && typeof object === 'object';
    };

    // for loop that will loop through the array of keys from the expected object
    for (let i = 0; i < expectedObjKeys.length; i++) {
      // gets the expected object and actual object's value of the current iteration's key
      const key = expectedObjKeys[i];
      let expectedObjValue = objExpected[key];
      let actualObjValue = objActual[key];

      if (key === 'url' || key === 'destinationURL') {
        if (actualObjValue.includes('?')) {
          [expectedObjValue] = expectedObjValue.split('?');
          [actualObjValue] = actualObjValue.split('?');
        }
      }
      // variable that stores true/false if both values are objects
      const areObjects = isObject(expectedObjValue) && isObject(actualObjValue);

      // if statement is evaluing two conditions
      // 1. expectedObjValue and actualObjValue are objects AND the result of recursion is false
      // 2. expectedObjValue and actualObjValue are NOT objects AND expectedObjValue and actualObjValue are not equal
      // if one of these two condtions are met, then the process gets inside if-condition
      if ((areObjects && !this.deepEqual(expectedObjValue, actualObjValue, eventName)) || (!areObjects && expectedObjValue !== actualObjValue)) {
        try {
          // This will throw an error if expectedObjValue & actualObjValue are not same
          expect(actualObjValue).toEqual(expectedObjValue);
          // returning false will break the deepEqual recursion on the failure
          return false;
        } catch (error) {
          throw new Error(
            `On "${eventName}" object: "${key}" property Expected and Received values are not equal\n Expected: ${JSON.stringify(
              expectedObjValue
            )}\n Received: "${actualObjValue}"`
          );
        }
      }
    }

    // returning true when the values match will continue the recusion
    // if there are no failures (false is never met) then the recursion will end when the for loop runs out of keys in the array to test
    return true;
  }

  /**
   * @function_Name : deepEqual
   * @Description : To check expected object with actual object for Null or Undefined values
   * @params : objExpected,objActual
   * @returns : true (Error if not matched)
   * */

  async deepCheck(objActual) {
    // array of the keys from the expected object whose values we want to test
    const actualObjKeys = Object.keys(objActual);
    // function that returns true/false if argument is an object
    const isObject = function (object) {
      return object != null && typeof object === 'object';
    };

    // for loop that will loop through the array of keys from the expected object
    for (let i = 0; i < actualObjKeys.length; i++) {
      // gets the expected object and actual object's value of the current iteration's key
      const key = actualObjKeys[i];
      let actualObjValue = objActual[key];
      if (key === 'coupon') {
        actualObjValue = '';
      }

      // variable that stores true/false if both values are objects
      const areObjects = isObject(actualObjValue);

      // if statement is evaluing two conditions
      // 1. actualObjValue is object AND the result of recursion is false
      // 2. actualObjValue is NOT object AND actualObjValue is null or undefined
      // if one of these two condtions are met, then the process gets inside if-condition
      if ((areObjects && !this.deepCheck(actualObjValue)) || (!areObjects && (actualObjValue == null || actualObjValue === undefined))) {
        try {
          // This will throw an error if actualObjValue is Null of Undefined
          expect(actualObjValue).not.toBeNull();
          expect(actualObjValue).toBeDefined();
          // returning false will break the deepCheck recursion on the failure
          return false;
        } catch (error) {
          throw new Error(`"${key}" property has a digital data value of "${actualObjValue}"`);
        }
      }
    }

    // returning true when the values match will continue the recusion
    // if there are no failures (false is never met) then the recursion will end when the for loop runs out of keys in the array to test
    return true;
  }

  async deepEqualSearch(objExpected, objActual, eventName) {
    // array of the keys from the expected object whose values we want to test
    const expectedObjKeys = Object.keys(objExpected);
    // function that returns true/false if argument is an object
    const isObject = function (object) {
      return object != null && typeof object === 'object';
    };

    // for loop that will loop through the array of keys from the expected object
    for (let i = 0; i < expectedObjKeys.length; i++) {
      // gets the expected object and actual object's value of the current iteration's key
      const key = expectedObjKeys[i];
      let expectedObjValue = objExpected[key];
      const actualObjValue = objActual[key];

      if (eventName === 'Product List Viewed') {
        if (key === 'filters') {
          expectedObjValue = arrFiltersSelcted;
        } else if (key === 'list_id') {
          // const nth = (await page.url().includes('/search_partial')) || (await page.url().includes('/KidsSearchPartial')) ? 0 : 1;
          let searchTerm = await page.locator('.plp-header-search').innerText();
          searchTerm = searchTerm.slice(searchTerm.indexOf('“') + 1, searchTerm.lastIndexOf('”'));
          expectedObjValue = searchTerm.toLowerCase();
        } else if (key === 'products') {
          expect(actualObjValue.length).toBe(await page.locator('.product-card').count());
          expectedObjValue = await searchPage.getProductList();
        }
      } else if (eventName === 'Filter Interaction') {
        if (key === 'name') expectedObjValue = arrFiltersSelcted[arrFiltersSelcted.length - 1].value;
        else if (key === 'type') expectedObjValue = arrFiltersSelcted[arrFiltersSelcted.length - 1].type;
      }
      // variable that stores true/false if both values are objects
      const areObjects = isObject(expectedObjValue) && isObject(actualObjValue);

      // if statement is evaluing two conditions
      // 1. expectedObjValue and actualObjValue are objects AND the result of recursion is false
      // 2. expectedObjValue and actualObjValue are NOT objects AND expectedObjValue and actualObjValue are not equal
      // if one of these two condtions are met, then the process gets inside if-condition
      if ((areObjects && !this.deepEqualSearch(expectedObjValue, actualObjValue, eventName)) || (!areObjects && expectedObjValue !== actualObjValue)) {
        try {
          // This will throw an error if expectedObjValue & actualObjValue are not same
          expect(actualObjValue).toEqual(expectedObjValue);
          // returning false will break the deepEqualSearch recursion on the failure
          return false;
        } catch (error) {
          throw new Error(
            `On "${eventName}" object: "${key}" property Expected and Received values are not equal\n Expected: ${JSON.stringify(
              expectedObjValue
            )}\n Received: "${actualObjValue}"`
          );
        }
      }
    }

    // returning true when the values match will continue the recusion
    // if there are no failures (false is never met) then the recursion will end when the for loop runs out of keys in the array to test
    return true;
  }
}

module.exports = { CompareDDL };
