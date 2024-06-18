// const { Given, When, Then } = require('@cucumber/cucumber');
// const { FamiliesApiAction } = require('../page-objects/pages/families-api-action');

// const action = new FamiliesApiAction();

// // Families
// Given('Affiliate executes the families action with category ID {string} simple {string}', async function (cid, simple) {
//   await action.executeFamilies(global.apiPid, cid, simple);
// });

// Then('Families with category ID {string} simple {string} should be displayed', async function (cid, simple) {
//   await action.familiesValidate(cid, simple, global.apiPid);
// });

// When(
//   'Affiliate executes the families action with category ID {string} simple {string} show SKUs {string} first subgroup {string}',
//   async function (cid, simple, showSkus, firstSubgroup) {
//     await action.executeFamiliesSkus(global.apiPid, cid, simple, showSkus, firstSubgroup);
//   }
// );

// Then(
//   'Families with category ID {string} simple {string} show SKUs {string} first subgroup {string} should be displayed',
//   // eslint-disable-next-line no-unused-vars
//   async function (cid, simple, showSkus, firstSubgroup) {
//     await action.familiesValidate(cid, simple, global.apiPid);
//   }
// );
