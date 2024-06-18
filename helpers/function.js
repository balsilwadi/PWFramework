const { expect } = require('@playwright/test');

const assertIsFunction = (func) => {
  expect(func, 'Function is not defined').not.toBeUndefined();
  expect(typeof func, `${func} is not a function`).toBe('function');
};

module.exports = {
  assertIsFunction
};
