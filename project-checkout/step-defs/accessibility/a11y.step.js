const { When } = require('@cucumber/cucumber');
const A11y = require('../../page-objects/pages/accessibility/a11y');

When('I run an accessibility audit', async function () {
  await A11y.audit();
});
