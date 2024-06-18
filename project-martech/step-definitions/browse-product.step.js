const { When, Then } = require('@cucumber/cucumber');
const repoCommonElements = require('../page-objects/elements/pdp-elements');
const { BrowseProductPage } = require('../page-objects/pages/browse-product.page');
const env = require('../../support/env/env');

const browseProductPage = new BrowseProductPage();

When('they navigate to the Grouper PDP', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_GROUPER_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they select a different color from the color group', async function () {
  if (env.BRAND === "Crate") {
    await browseProductPage.selectColor('Grey');
  } else {
    await browseProductPage.selectColor('Silver Blue');
  }
});

When('they select a different size from the size group', async function () {
  if (env.BRAND === "Crate") {
    await browseProductPage.selectSizeInGroup("9'x12'");
  } else {
    await browseProductPage.selectSizeInGroup("8'x10'");
  }
});

When('they navigate to the Super SOR PDP', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_SUPERSOR_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

Then('they click on quick ship link and select a quick ship product', async function () {
  await browseProductPage.clickAvailableSoonest();
  await browseProductPage.selectItemFromAvailableSoonest('Lounge Sofa 83"');
});

When('they select a different {string} from the depth drawer', async function (drawer) {
  await browseProductPage.clickDrawer(drawer);
  await browseProductPage.selectDepth('Classic');
  await browseProductPage.clickDrawer(drawer);
});

When('they select a different {string} from the size drawer', async function (drawer) {
  await browseProductPage.selectSizeInDrawer('73');
  await browseProductPage.clickDrawer(drawer);
});

When('they select a different {string} from the fabric drawer', async function (drawer) {
  await browseProductPage.clickDrawer(drawer);
  await browseProductPage.selectFabric('View White Microfiber');
});

When('they click on Get Free Swatches button', async function () {
  await browseProductPage.clickGetFreeSwatch();
});

Then('Get Free Swatches popup is closed', async function () {
  await browseProductPage.closeGetFreeSwatchPopup();
});

When('they navigate to the PDP which has Installation service option', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_INSTALLATION_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they clicked on Add Installation Service check box', async function () {
  await browseProductPage.addInstallationService();
});

When('they navigate to the PDP which has Add Ons', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_CONFIRMATION_ADDONS_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they click Add To Cart under Extras And Essentials on the cart popup', async function () {
  await browseProductPage.addToCartOnConfirmationAddOns(1);
});

When('they navigate to the PDP which has monogram style', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_MONOGRAM_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they select Personalized option from style group', async function () {
  await browseProductPage.clickPersonalized();
});

Then('they fill the Personalized Text field', async function () {
  await browseProductPage.fillPersonalizedText();
});

When('they navigate to the PDP which has Add Swatch To Cart button', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_SWATCH_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they click on the Add Swatch To Cart button', async function () {
  await browseProductPage.clickAddSwatchToCart(2);
});

When('they navigate to the PDP which has Extras And Essentials', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_ADDONS_URL}`);
  if (await page.locator(repoCommonElements.productPage.txtItemNotAvailable).isVisible()) {
    throw new Error('This item is no longer available');
  }
});

When('they click on Add To Cart button under Extras And Essentials', async function () {
  await browseProductPage.addToCartOnAddOns(1);
});

When('they navigate to the PDP which has Part of a Collection', async function () {
  await page.goto(`${env.BASE_URL}/${env.MAR_PARTOFCOLLECTION_URL}`);
});

When('they click on Add To Cart button under Part of a Collection', async function () {
  await browseProductPage.addToCartOnPartOfColl(1);
});
