// const { When } = require('@cucumber/cucumber');
// const { FindRegistry } = require('../page-objects/pages/find-registry-validation.page');

// const findRegistry = new FindRegistry();

// When('Customer  search a registry with {string} and {string}', async function (firstname, lastname)  {
//   await findRegistry.searchRegistry(firstname, lastname);
// });

// When('Verifies the search results displayed for {string} and {string}', async function (firstname, lastname)  {
//   await findRegistry.searchRegistryPageValidation(firstname, lastname);
// });

// When('Customer sort the results by sorting option', async function () {
//   await findRegistry.sortRegistryDetails(4);
//   await findRegistry.verifySortRegistryDetails();
// });

// When('Customer opens a registry with event type as {string} from search results', async function (eventtype)  {
//   await findRegistry.selectRegistry(eventtype);
// });

// When('Customer Validates the Registry details page', async function ()  {
//   await findRegistry.validateRegistryDetails();
// });
// When('Customer sort the products by {string}', async function (sortOption)  {
//   await findRegistry.sortRegistryProducts(sortOption);
//   await findRegistry.validateSortedProducts(sortOption);
// });

// When('Customer Validates the product details', async function ()  {
//   await findRegistry.validateProductDetails();
// });

// When('Customer validates the product details popup', async function ()  {
//   await findRegistry.clickProduct();
//   await findRegistry.validateProductDetailsPopup();
// });

// When('Customer verifies the store availability popup', async function ()  {
//   await findRegistry.clickStoreLocationLink();
//   await findRegistry.validateStoreLocationPopup();
// });

// When('Customer verifies the Free shipping popup', async function ()  {
//   await findRegistry.validateTheFreeshippingmsg();
// });

// When('Customer update the quantity {string} of Registry product', async function (quantity)  {
//   await findRegistry.updateQuantity(quantity);
// });

// When('Customer add a product to the cart', async function ()  {
//   await findRegistry.addToCart();
// });

// When('Customer validate the add to cart confirmation popup', async function ()  {
//   await findRegistry.verifyAddToCartConfirmation();
// });
