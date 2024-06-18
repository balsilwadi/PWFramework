const { expect } = require('@playwright/test');

class ApiPage {
  async bearerToken() {
    const { request } = global.context;
    const data = { grant_type: 'client_credentials', scope: 'associate.read' };
    const headers1 = {
      Authorization: 'Basic MG9hMThsNTV6dGdKWWIwaDIxZDc6NmNjTDYtQW1idmdzXzY3QkFXNm5neXNXY0Naa08yejE4VE5aUEhrbA==',
      Cookie: 'DT=DI0l3yQet5hSe2udTJXNiyNYQ; JSESSIONID=03E8BEF79291404C2EF7B4ADA181608C',
      'x-api-key': 'null'
    };

    const response = await request.post('https://preview-auth.crateandbarrel.com/oauth2/ausa03e3lGR0t1pno1d6/v1/token', {
      headers: headers1,
      form: data,
      Authorization: null
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const resp = await response.json();

    const err = resp.access_token;

    return err;
  }
}

module.exports = { ApiPage };
