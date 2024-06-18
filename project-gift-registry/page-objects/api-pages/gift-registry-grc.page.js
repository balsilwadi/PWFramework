const { expect } = require('@playwright/test');
const PageObject = require('../../../project-shared/page-objects/pages/page-object');
const { getRegistryById } = require('../../helpers/registry');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ApiPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'GRC Api page';
  }

  async verifyGRCExists(registryId) {
    const registry = await getRegistryById(registryId);
    await expect(registry.giftRegistryCompletion).not.toBeNull();
    testReport.log(this.pageName, 'GRC Exists');
  }

  async checkRegistryIsGRCEligible(registryId) {
    const registry = await getRegistryById(registryId);
    const eventDate = new Date(registry.eventDate).getTime();
    await expect(eventDate).toBeLessThan(Date.now());
    await expect(registry.items.length).toBeGreaterThan(0);
    testReport.log(this.pageName, 'Registry is GRC eligible');
  }
}
module.exports = new ApiPage();
