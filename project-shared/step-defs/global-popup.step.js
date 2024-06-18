const { Given, Then } = require('@cucumber/cucumber');

Given('the global popup should show', async function () {
  const cookies = await global.context.cookies();
  const removeCookies = cookies.filter((cookie) => cookie.name !== 'HideGeoLocationPopup');
  await global.context.clearCookies();
  await global.context.addCookies(removeCookies);
});

// actually And
Then('the active registry cookie has been removed from cookies', async function () {
  const activeGRCookie = 'Active_GR';
  const cookies = await global.context.cookies();
  const removeCookies = cookies.filter((cookie) => cookie.name !== activeGRCookie);
  await global.context.clearCookies();
  await global.context.addCookies(removeCookies);
});
