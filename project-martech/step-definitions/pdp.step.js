const { When } = require('@cucumber/cucumber');
const { ProductPage } = require('../page-objects/pages/pdp.page');
const { MarLogInPage } = require('../page-objects/pages/login.page');
const repoCommonElements = require('../page-objects/elements/pdp-elements');
const env = require('../../support/env/env');

const productPage = new ProductPage();
const loginPage = new MarLogInPage();

When('they navigate to the PDP', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_PDP_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they navigate to the Family page', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_FAMILY_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they click on Add To Cart button', async function () {
  await productPage.clickAddToCart(1);
  await productPage.clickMTOPopupAddToCart();
});

When('they add item to favourites', async function () {
  await productPage.addItemToFavorites(1);
});

When('they add item to registry', async function () {
  await productPage.addItemToRegistry(1);
  await loginPage.loginWithOkta(env.MAR_EMAIL, env.MAR_PASSWORD);
  await productPage.addItemToRegistry(1);
});

When('they click on Continue Shopping button', async function () {
  if (await page.locator(repoCommonElements.productPage.btnContinueShoppingCart).isVisible()) {
    await productPage.clickContinueShoppingCart();
  } else if (await page.locator(repoCommonElements.productPage.btnContinueShoppingReg).isVisible()) {
    await productPage.clickContinueShoppingReg();
  }
});

When('they close Added To Favorites popup', async function () {
  await productPage.closeAddToFavoritesPopup();
});
