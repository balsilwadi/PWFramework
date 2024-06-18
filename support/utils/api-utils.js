const { expect } = require('@playwright/test');
const globalData = require('../global-data-object/global-data-object');
const { ReportUtils } = require('./report-utils');

const reporter = new ReportUtils();

const promises = [];

class ApiUtils {
  /**
   *
   * @Function_Name : getRequest
   * @Description : This Function used to  call the GET request and update the response to global varaible
   * @Params : String value of URL, JSON Object of Header,JSON Object of form,JSON object of Authorization
   * @returns : Response will be stored in globalData with variable api_response.
   */
  async getRequest(strDataUrl, headers = null, authorization = null) {
    const request = await global.context.request;
    const response = await request.get(`${strDataUrl}`, {
      headers,
      Authorization: authorization
    });
    // await page.waitForTimeout(5000);
    await Promise.all(promises);
    reporter.log(`Status code ${response.status()}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const jsonResp = await response.json();
    globalData.api_response = jsonResp;
    reporter.log(`API Response : ${JSON.stringify(jsonResp)}`);
    return jsonResp;
  }

  async getRequestReturnsStatus(strDataUrl, headers = null, authorization = null) {
    const request = await global.context.request;
    const response = await request.get(`${strDataUrl}`, {
      headers,
      Authorization: authorization
    });
    // await page.waitForTimeout(5000);
    await Promise.all(promises);
    reporter.log(`Status code ${response.status()}`);
    return response.status();
  }

  /**
   *
   * @Function_Name : postRequest
   * @Description : This Function used to  call the POST request and update the response to global varaible
   * @Params : String value of URL, JSON Object of Header,JSON Object of form,JSON object of Authorization
   * @returns : Response will be stored in globalData with variable api_response.
   */

  async postRequest(strDataUrl, headers = null, data = null) {
    const request = await global.context.request;
    const response = await request.post(`${strDataUrl}`, {
      headers,
      data
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    try {
      const jsonResp = await response.json();
      globalData.api_response = jsonResp;
      reporter.log(`API Response : ${JSON.stringify(jsonResp)}`);
      return jsonResp;
    } catch {
      /* empty */
    }
    const textResp = await response.text();
    globalData.api_response = textResp;
    reporter.log(`API Response : ${JSON.stringify(textResp)}`);
    return textResp;
  }

  /**
   *
   * @Function_Name : putRequest
   * @Description : This Function used to  call the PUT request and update the response to global varaible
   * @Params : String value of URL, JSON Object of Header,JSON Object of form,JSON object of Authorization
   * @returns : Response will be stored in globalData with variable api_response.
   */
  async putRequest(strDataUrl, headers = null, data = null) {
    const request = await global.context.request;
    const response = await request.put(`${strDataUrl}`, {
      headers,
      data
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    try {
      const jsonResp = await response.json();
      globalData.api_response = jsonResp;
      reporter.log(`API Response : ${JSON.stringify(jsonResp)}`);
      return jsonResp;
    } catch {
      /* empty */
    }
    const textResp = await response.text();
    globalData.api_response = textResp;
    reporter.log(`API Response : ${JSON.stringify(textResp)}`);
    return textResp;
  }

  /**
   *
   * @Function_Name : deleteRequest
   * @Description : This Function used to  call the DELETE request and update the response to global varaible
   * @Params : String value of URL, JSON Object of Header,JSON Object of form,JSON object of Authorization
   * @returns : Response will be stored in globalData with variable api_response.
   */

  async deleteRequest(strDataUrl, headers = null, authorization = null) {
    const request = await global.context.request;
    const response = await request.delete(`${strDataUrl}`, {
      headers,
      Authorization: authorization,
      // TODO: find a better way to have this not timeout on delete all items
      timeout: 60000
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  }

  async validateResponseCode(expectedResponseCode, actualResponse) {
    // validates the response code
    try {
      expect(actualResponse.status()).toBe(parseInt(expectedResponseCode, 10));
      reporter.log(`Status code ${actualResponse.status()}`);
    } catch (error) {
      reporter.log(`Expected Status code${expectedResponseCode}, But Actual status code is ${actualResponse.status()} ${actualResponse.statusText()}`);
      throw new Error(`Expected Status code${expectedResponseCode}, But Actual status code is ${actualResponse.status()} ${actualResponse.statusText()}`);
    }
  }

  async validateResponseHeader(expectedResponseHeader, actualResponse) {
    // validates the response code
    try {
      expect(actualResponse.headers()['content-type']).toContain(expectedResponseHeader);
      reporter.log(`Response Header ${actualResponse.headers()['content-type']}`);
    } catch (error) {
      reporter.log(`Expected  response header${expectedResponseHeader}, But Actual response header ${actualResponse.headers()['content-type']}`);
      throw new Error(`Expected  response header${expectedResponseHeader}, But Actual response header ${actualResponse.headers()['content-type']}`);
    }
  }
}

module.exports = { ApiUtils };
