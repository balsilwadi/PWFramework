const { expect } = require('@playwright/test');

class bearerTokenutils {
  async bearerToken(url, headers, form = null, authorization = null) {
    const { request } = global.context;
    const response = await request.post(`${url}`, {
      headers,
      form,
      Authorization: authorization
    });
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const resp = await response.json();
    const err = resp.access_token;
    return err;
  }
}

module.exports = { bearerTokenutils };
