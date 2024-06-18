const { expect } = require('@playwright/test');

class ApiUtils {
  async getRequest(url, headers = null, autorization = null) {
    const { request } = global.context;
    const response = await request.get(`${url}`, {
      headers,
      Authorization: autorization
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const resp = await response.json();

    return resp;
  }

  async postRequest(url, headers = null, form = null, autorization = null) {
    const { request } = global.context;
    const response = await request.post(`${url}`, {
      headers,
      form,
      Authorization: autorization
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    // const resp = await response.json();
  }
}

module.exports = { ApiUtils };
