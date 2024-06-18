const { expect } = require('@playwright/test');
const { ReportUtils } = require('./report-utils');
const globalData = require('../global-data-object/global-data-object');
const { CommonUtils } = require('./common-utils');
const { ApiUtils } = require('./api-utils');
const { EXEC_ENV } = require('../env/env');
const { API_URL } = require('../env/env');
const env = require('../env/env');

const objApiUtils = new ApiUtils();
const reporter = new ReportUtils();
const objCommon = new CommonUtils();
const promises = [];

class RequestUtils {
  /**
   *
   * @Function_Name : getBearerToken
   * @Description : This Function used to get the bearer token from Authentication API
   * @Params : String value of URL, JSON Object of Header,JSON Object of form,JSON object of Authorization
   * @returns : None
   */

  async getBearerToken(strDataUrl, headers, data = null, authorization = null) {
    const request = await global.context.request;
    const response = await request.post(`${strDataUrl}`, {
      headers,
      form: data,
      Authorization: authorization
    });
    reporter.log(`Bearer token api response Status code ${response.status()}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const jsonResp = await response.json();
    const accessToken = jsonResp.access_token;
    return accessToken;
  }

  /**
   *
   * @Function_Name : getBearerTokenData
   * @Description : This Function used to get the Bearer token from Auth API which have the HttpCredential parameters
   * @Params : API endpoint with base URL,Json name which have the parameter of Authentication API param details, Environment,Project Name, Security key which should present in the Secret file
   * @returns : none
   */
  async getBearerTokenData(strJsonname, strPrjFolder, strSecurityKey = null) {
    // storing the page name for logging in the report
    const myArray = strJsonname.split('.');
    this.pageName = `${myArray[0]} Bearer Token`;
    // stores the secret data from the secret file
    const apiAuthorization = await objCommon.readSecureProperties(strSecurityKey);
    // gets the environment on which test cases are running
    const strEnv = EXEC_ENV;
    // gets the name of the project
    const strProject = strPrjFolder;
    // get all the data inside the json file
    const payload = await objCommon.readJson(strEnv, strJsonname, strProject);
    // Get the API path or query parameters from JSON File
    const urlData = payload.URL1;
    // concatenates the url fetched from json file with url which is globally declared
    const apiUrl = `https://preview-auth.crateandbarrel.com/oauth2${urlData}`;
    // gets the header details from json file
    const apiHeaders = payload.Headers;
    // gets the data from teh json file
    const bearerData = payload.data;
    reporter.log(`API Endpoint : ${apiUrl}`);
    // gets the accessToken if there is no Authorization key passed from feature file
    const objBearerToken = new RequestUtils();
    if (apiAuthorization != null) {
      globalData.accessToken = await objBearerToken.getBearerToken(apiUrl, apiHeaders, bearerData, apiAuthorization);
    } else {
      // gets the accessToken if there is a Authorization key passed from feature file
      globalData.accessToken = await objBearerToken.getBearerToken(apiUrl, apiHeaders, bearerData);
    }
    // return accesToken;
    reporter.log(`${strEnv} Environment ${strProject} Project, API bearer token was generated with ${strJsonname}`);
  }

  /**
   *
   * @Function_Name : getRequestWithBearerToken
   * @Description : This Function used to get the Response from API with GET request
   * @Params : API endpoint with apiname,Json name which have the parameter of Authentication API param details, Environment,Project Name,Security key which should present in the Secret file
   * @returns : none
   */
  async getRequestWithBearerToken(strData, strPrjFolder, strSecretvalue = null) {
    // storing the page name for logging in the report
    const myArray = strData.split('.');
    this.pageName = myArray;
    // pageName = strApi_Name + ' API';
    // stores the secret data from the secret file
    const apiAuthorization = await objCommon.readSecureProperties(strSecretvalue);
    reporter.log('API testing was started.');
    // gets the environment on which test cases are running
    const strEnv = EXEC_ENV;
    // get all the data inside the json file
    const payload = await objCommon.readJson(strEnv, strData, strPrjFolder);
    // fetches the URL
    const urlData = payload.URL1;
    // concatenates the url fetched from json file with url which is globally declared apiUrl
    const apiUrl = global.apiUrl + urlData;
    // gets the header data form json file
    const apiHeaders = payload.Headers;
    // gets the token from header
    let apiAuthtoken = apiHeaders.Authorization;
    // concatenates the token from header and access token and strore it in authorizarion header
    apiAuthtoken += globalData.accessToken;
    apiHeaders.Authorization = apiAuthtoken;
    // gets the http credentials
    const apiAuthCredentials = payload.httpCredentials;
    // setting up the x-api-key to Header values
    apiHeaders['x-api-key'] = apiAuthorization;
    reporter.log(`API Endpoint : ${apiUrl}`);
    const apiResponse = await objApiUtils.getRequest(apiUrl, apiHeaders, apiAuthCredentials);
    // await Promise.all(promises);
    env.CMN_API_RESPONSE = apiResponse;
    return apiResponse;
  }

  async createRequestUrlAndHeader(strData, strSecretvalue = null, url = null) {
    const myArray = strData.split('.');
    [this.pageName] = myArray;
    // pageName = strApi_Name + ' API';
    // stores the secret data from the secret file
    const apiAuthorization = await objCommon.readSecureProperties(strSecretvalue);
    reporter.log('API testing was started.');
    // gets the environment on which test cases are running
    const strEnv = EXEC_ENV;
    // get all the data inside the json file
    const payload = await objCommon.readJson(strEnv, strData, globalData.project_name);
    // fetches the URL
    const urlData = url != null ? url : payload.URL1;
    // concatenates the url fetched from json file with url which is globally declared apiUrl
    const apiUrl = global.apiUrl + urlData;
    // gets the header data form json file
    const apiHeaders = payload.Headers;
    // setting up the x-api-key to Header values
    apiHeaders['x-api-key'] = apiAuthorization;
    reporter.log(`API Endpoint : ${apiUrl}`);
    return { apiUrl, apiHeaders };
  }

  /**
   *
   * @Function_Name : getAPIRequestWithBearerToken
   * @Description : This Function used to get the Response from API with GET request
   * @Params : API endpoint with apiname,Json name which have the parameter of Authentication API param details, Environment,Project Name,Security key which should present in the Secret file
   * @returns : none
   */
  async getAPIRequestWithBearerToken(strData, locale, strSecretvalue = null) {
    // stores the secret data from the secret file
    const apiAuthorization = await objCommon.readSecureProperties(strSecretvalue);
    const payload = strData;
    // fetches the URL
    const urlData = payload.URL1;
    // concatenates the url fetched from json file with url which is globally declared apiUrl
    const apiUrl = API_URL + urlData;
    // gets the header data form json file
    const apiHeaders = payload.Headers;
    // gets the token from header
    let apiAuthtoken = apiHeaders.Authorization;
    // concatenates the token from header and access token and strore it in authorizarion header
    apiAuthtoken += globalData.accessToken;
    apiHeaders.Authorization = apiAuthtoken;
    // gets the http credentials
    const apiAuthCredentials = payload.httpCredentials;
    // setting up the x-api-key to Header values
    apiHeaders['x-api-key'] = apiAuthorization;
    const apiResponse = await objApiUtils.getRequest(apiUrl, apiHeaders, apiAuthCredentials);
    env.CMN_API_RESPONSE = apiResponse;

    switch (locale) {
      case 'cb-en-us':
        if (env.EXEC_SITE.includes('crate')) {
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.key')).toEqual('kids');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.value')).toEqual('true');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.1.key')).toEqual('core');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.1.value')).toEqual('true');
          reporter.log('API Validation', 'Verified the Opt in status in API for core and kids');
        } else {
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.key')).toEqual('core');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.value')).toEqual('true');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.1.key')).toEqual('kids');
          expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.1.value')).toEqual('true');
          reporter.log('API Validation', 'Verified the Opt in status in API for core and kids');
        }
        break;
      case 'c2-en-us':
        expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.key')).toEqual('cb2');
        expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.value')).toEqual('true');
        reporter.log('API Validation', 'Verified the Opt in status in API for cb2');
        break;
      case 'hg-en-us':
        expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.key')).toEqual('hg');
        expect(objCommon.readJSONValue(env.CMN_API_RESPONSE, 'preferencesByBrand.0.identityPreferences.0.preferences.0.value')).toEqual('true');
        reporter.log('API Validation', 'Verified the Opt in status in API for Hudson Grace');
        break;
      default:
        throw new Error('invalid locale');
    }
    await Promise.all(promises);
  }
}

module.exports = { RequestUtils };
