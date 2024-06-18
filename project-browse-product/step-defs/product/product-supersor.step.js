const { Then } = require('@cucumber/cucumber');
const { SuperSorPage } = require('../../page-objects/pages/product/product.supersor.page');
const { assertIsFunction } = require('../../../helpers/function');

const superSorPage = new SuperSorPage();

Then('Verify Super Sor drawers', async function () {
  await superSorPage.verifyDrawers();
});

Then('they verify the presence of Grouper Drawers', async function () {
  assertIsFunction(superSorPage.verifySORGrouperDrawerCount);
  await superSorPage.verifySORGrouperDrawerCount();
});

Then('they click {string} grouper', async function (grouperName) {
  assertIsFunction(superSorPage.clickGrouper);
  await superSorPage.clickGrouper(grouperName);
});

Then('they validate {string} grouper option choices', async function (grouperName) {
  assertIsFunction(superSorPage.validateGrouperChoices);
  await superSorPage.validateGrouperChoices(grouperName);
});
