const { World } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { User } = require('./entity/user');
const { assertIsFunction } = require('../helpers/function');
const PageObject = require('../project-shared/page-objects/pages/page-object');
const SubObject = require('../project-shared/page-objects/pages/sub-object');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this._data = {}; // miscallenous bucket for all other data
    this._pageObject = null; // saves current page object
    this._subObject = null; // saves current page sub object
    this._user = null; // saves current user data
  }

  get data() {
    return this._data;
  }

  get pageObject() {
    return this._pageObject;
  }

  set pageObject(newPage) {
    expect(newPage).not.toBeNull();
    expect(newPage).toBeInstanceOf(PageObject);
    this._pageObject = newPage;
  }

  get subObject() {
    return this._subObject;
  }

  set subObject(subObject) {
    expect(subObject).toBeInstanceOf(SubObject);
    this._subObject = subObject;
  }

  get user() {
    return this._user;
  }

  set user(newUser) {
    expect(newUser).toBeInstanceOf(User);
    this._user = newUser;
  }

  setData = async (key, newData) => {
    expect(key).not.toBeNull();
    expect(newData).not.toBeNull();
    this._data[key] = newData;
  };

  removeData(key) {
    delete this._data[key];
  }

  async useSubObjectIfPresent(func) {
    assertIsFunction(func);

    if (this._subObject !== null) {
      assertIsFunction(this._subObject[func.name]);
      await this._subObject[func.name]();
      return; // don't attempt to run original function
    }

    // invoke original function
    await func();
  }

  SetDataInArray = async (key, newData) => {
    expect(key).not.toBeNull();
    expect(newData).not.toBeNull();
    if (!this._data[key]) {
      // For the first time, set the array with the initial value
      this._data[key] = [newData];
    } else {
      // For subsequent calls, insert the new value into the existing array
      this._data[key].push(newData);
    }
  };
}

module.exports = CustomWorld;
