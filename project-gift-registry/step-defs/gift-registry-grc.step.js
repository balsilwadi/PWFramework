const { Given, Then } = require('@cucumber/cucumber');
const { getGrIdForGRC, createGRC } = require('../helpers/registry-grc');
const apiPage = require('../page-objects/api-pages/gift-registry-grc.page');

Given('The user creates a GRC for registry', async function () {
  const GRCGrId = await getGrIdForGRC();
  this.setData('GRCGrId', GRCGrId);
  await createGRC(this.data.GRCGrId);
});

Given('Registry is eligible', async function () {
  await apiPage.checkRegistryIsGRCEligible(this.data.GRCGrId);
});

Then('The GRC should be created successfully for registry', async function () {
  await apiPage.verifyGRCExists(this.data.GRCGrId);
});
