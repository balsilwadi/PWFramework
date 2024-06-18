const { checkA11y, injectAxe } = require('axe-playwright');

class A11y {
  static async audit() {
    await injectAxe(global.page);
    await checkA11y(global.page, null, null, false);
  }
}

module.exports = A11y;
