const { Given } = require('@cucumber/cucumber');

Given('the interrupter should show', async function () {
  const cookies = await global.context.cookies();
  const removeCookies = cookies.filter((cookie) => cookie.name !== 'EmailOptInAlreadyViewedCount');
  await global.context.clearCookies();
  await global.context.addCookies(removeCookies);
});
