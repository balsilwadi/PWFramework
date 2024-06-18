const { When, Then } = require('@cucumber/cucumber');
const OrderDetailsPage = require('../../page-objects/pages/order-tracking/order-details.page');

When('Customer navigates to track orders page', async function () {
  this.pageObject = OrderDetailsPage;
  await this.pageObject.clickOnTrackOrder();
});
When('Customer enters Monogrammed order number and email', async function () {
  await this.pageObject.fillOrderNumberAndEmail();
});
Then('Customer should see Monogrammed details for order', async function () {
  await this.pageObject.verifyMonogrammedOrderDetail();
});

When('Customer enters Gift Registry order number and email', async function () {
  await this.pageObject.fillGROrderNumberAndEmail();
});
Then('Customer should see Gift Registry details for order', async function () {
  await this.pageObject.verifyGROrderDetail();
});

When('Customer enters Free Swatch order number and email', async function () {
  this.pageObject = OrderDetailsPage;
  await this.pageObject.fillSwatchOrderNumberAndEmail();
});

Then('Customer verifies whether only the quantity and fabric is displayed', async function () {
  this.pageObject = OrderDetailsPage;
  await this.pageObject.verifySwatchOrderDetails();
});
