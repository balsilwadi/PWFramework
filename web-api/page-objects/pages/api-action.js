// #region Constatnts
const { expect, request } = require('@playwright/test');
const { ReportUtils } = require('../../../support/utils/report-utils');

const testReport = new ReportUtils();
const apiEl = require('../elements/api-elements');

const apiHandler = '/APIHandler.ashx?';
// #endregion Constatnts

class ApiAction {
  constructor() {
    this.pageName = this.constructor.name;
  }

  get pidDefault() {
    return global.apiPid;
  }

  buildApiCommand(actionCommand) {
    return apiHandler + apiEl.Parameter.pidFirst + this.pidDefault + apiEl.Parameter.action + actionCommand + apiEl.Parameter.toJson;
  }

  buildApiPidCommand(pid, actionCommand) {
    return apiHandler + apiEl.Parameter.pidFirst + pid + apiEl.Parameter.action + actionCommand + apiEl.Parameter.toJson;
  }

  buildApiNoPidCommand(actionCommand) {
    return apiHandler + apiEl.Parameter.actionFirst + actionCommand + apiEl.Parameter.toJson;
  }

  async getApiCommandJson(baseUrl, command) {
    const apiRequestContext = await request.newContext({
      baseURL: baseUrl
    });

    const response = await apiRequestContext.get(command);
    const responseBody = await response.body();
    apiRequestContext.dispose();

    return JSON.parse(responseBody);
  }

  async apiGoToPage(apiUrl, command) {
    const url = apiUrl + command;
    testReport.log(this.pageName, `API Loading: ${url}`);
    await page.goto(url, { timeout: 2 * 80000 });
    testReport.log(this.pageName, `API Loaded: ${page.url()}`);
  }

  async getApiPageJson() {
    const jsonText = await page.innerText(apiEl.htmlObjects.Pre);
    await expect(jsonText.length, 'should have some raw JSON text').toBeGreaterThan(0);

    const jsonResponse = JSON.parse(jsonText);
    expect(jsonResponse).toBeInstanceOf(typeof Object);

    return jsonResponse;
  }

  get isJsonPageParam() {
    return page.url().includes(apiEl.Parameter.toJson);
  }

  toJsonParam(toJson) {
    return toJson.includes(apiEl.Output.json) ? apiEl.Parameter.toJson : '';
  }

  toSimpleParam(simple) {
    return simple.includes('1') ? apiEl.Parameter.toSimple : '';
  }
}

module.exports = { ApiAction };
