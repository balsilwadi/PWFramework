const { expect } = require('@playwright/test');
const PageObject = require('../../../project-shared/page-objects/pages/page-object');
const { getRegistryById } = require('../../helpers/registry');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();

class ApiPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'Edit Registry Api page';
  }

  /**
   * @Function_Name : verifyEventDateUpdated
   * @Description : Verifies that the event date of a registry has been updated to be a given number of days before or after today's date
   * @param : Registry ID, number of days to move event date, direction the event date should move
   * @returns : Test report log
   */
  async verifyEventDateUpdated(registryId, numDays, direction) {
    const registry = await getRegistryById(registryId);
    const currentDate = new Date();
    const updatedDate = new Date(currentDate);
    let updatedDateStr = '';

    if (direction === 'Before') {
      updatedDate.setDate(currentDate.getDate() - numDays);
      updatedDateStr = `${updatedDate.toISOString().split('T')[0]}T00:00:00Z`;
      await expect(registry.eventDate).toEqual(updatedDateStr);
    } else if (direction === 'After') {
      updatedDate.setDate(currentDate.getDate() + numDays);
      updatedDateStr = `${updatedDate.toISOString().split('T')[0]}T00:00:00Z`;
      await expect(registry.eventDate).toEqual(updatedDateStr);
    }
    testReport.log(this.pageName, `Event date has been updated to ${updatedDateStr}`);
  }
}
module.exports = new ApiPage();
