// const { expect } = require('@playwright/test');

// const { apipage } = require('./api.page');
// const crateHome = require('../elements/crateHomepage');
// const { commonutils } = require('./common-utils');

// const api = new apipage();
// const common = new commonutils();

// class associateDetails {
//   async associate() {
//     const token = await api.bearerToken();
//     const { request } = global.context;
//     const response = await request.get('https://qa-api.crateandbarrel.com/associates/2177996?', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'x-api-key': '',
//         Cookie: 'Internationalization=US|USD'
//       },

//       params: { locale: 'c2-en-ca' }
//     });
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy();
//     const resp = await response.json();
//     console.log(resp);
//     return resp;
//   }

//   async NavigateToCratebrowser() {
//     await page.goto(global.crateUrl);
//   }

//   async logIntocratebrowser(associateID) {
//     await page.click(crateHome.CrateHomePage.LogIn_LNK);
//     await page.fill(crateHome.CrateHomePage.Associate_ID_BOX, associateID, { delay: 100 });
//     await page.click(crateHome.CrateHomePage.LogIN_Btn);
//     // await page.evaluate(() => {
//     //     document.body.style.zoom=0.5;
//     // });
//     await page.waitForTimeout(10000);
//   }

//   async AssociateIDValidation() {
//     await page.click(crateHome.CrateHomePage.Hamburger_Btn);
//     await page.waitForTimeout(2000);
//     await page.mouse.wheel(0, 600);
//     await page.waitForTimeout(2000);
//     const Associatedetails = await page.innerText(crateHome.CrateHomePage.Associate_det);

//     const myArray = Associatedetails.split(' ', 3);
//     const associateId = myArray[0];
//     const associateIdUI = associateId.slice(1, 8);
//     const associateFirstName = myArray[1].toUpperCase();
//     const associateLastName = myArray[2].slice(0, 1).toUpperCase();
//     const AD = new associateDetails();
//     const js = await AD.associate();

//     let associateIdApi = js.id;
//     associateIdApi = associateIdApi.trim();
//     const associateFirstNameApi = js.first;
//     const associateLastNameApi = js.nickLast;
//     common.extractingJsonKeys(js);

//     common.compareString(associateIdUI, associateIdApi);
//   }
// }
// module.exports = { associateDetails };
