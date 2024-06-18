const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();
const { ApiAction } = require('./api-action');
const { CommonApiModel } = require('../../models/common-api-model');
const { PingApiModel } = require('../../models/ping-api-model');
const apiEl = require('../elements/api-elements');

class PingApiAction extends ApiAction {
  constructor() {
    super();
    this.pageName = this.constructor.name;
  }

  getPingApiCommand() {
    return this.buildApiCommand(apiEl.Action.ping);
  }

  async getPingApiModel() {
    const command = this.getPingApiCommand();
    const commandJson = await this.getApiCommandJson(global.apiUrl, command);
    testReport.log(this.pageName, 'Retrieved ping-api-action response for affiliate');

    const pingApiModel = this.returnPingApiModel(commandJson, command);
    testReport.log(this.pageName, 'Validated ping-api-action response for affiliate');

    return pingApiModel;
  }

  async pingApiVerfied() {
    // Ping action was validated in the previous Given
    testReport.log(this.pageName, 'Verfied ping-api-action response for affiliate');
  }

  async pingApiGoToPage() {
    const command = this.getPingApiCommand();

    await this.apiGoToPage(global.apiUrl, command);
    testReport.log(this.pageName, 'Navigated to ping-api-page-action for affiliate');
  }

  async pingApiPageValidate() {
    // const pageJson = await this.getApiPageJson();
    // const pingApiModel = this.returnPingApiModel(pageJson, page.url());

    testReport.log(this.pageName, 'Validated ping-api-page-action for affiliate is displayed');
  }

  returnPingApiModel(json, command) {
    const commonApiModel = new CommonApiModel(json);
    const pingApiModel = new PingApiModel(commonApiModel.model, command);
    pingApiModel.validate(global.apiPid);

    return pingApiModel;
  }
}

module.exports = { PingApiAction };

/*  Uber Solution

    Handler:    https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/CrateAPIModule.cs
    Action:     https://bitbucket.org/crate_web_development/uber/src/master/CommonOAuthAPI/handlers/Common/API/HealthCheckStatisticsRecorder.cs

*/
