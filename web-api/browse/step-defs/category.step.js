// const { Given, Then } = require('@cucumber/cucumber');
// const { CategoryApiAction } = require('../page-objects/pages/category-api-action');

// const action = new CategoryApiAction();

// // Category
// Given('Affiliate executes the category action with category ID {string} simple {string}', async function (cid, simple) {
//   await action.executeCategory(global.apiPid, cid, simple);
// });

// Then('Category with category ID {string} simple {string} should be displayed', async function (cid, simple) {
//   await action.categoryValidate(cid, simple, global.apiPid);
// });

// Then('Category with category ID {string} simple {string} No Category Id given error should be displayed', async function (cid, simple) {
//   await action.verifyCategoryNoId(cid, simple, global.apiPid);
// });

// Then('Category with category ID {string} simple {string} Category Not Found error should be displayed', async function (cid, simple) {
//   await action.verifyCategoryNotFound(cid, simple, global.apiPid);
// });
