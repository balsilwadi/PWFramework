// // TODO This page is obsolete and should move code to the appropriate area

// const registryNavigationElements = require('../page-objects/elements/registry-navigation-elements');
// const registryData = require('../datafiles/registry-common');
// const { CommonUtils } = require('../../../support/utils/common-utils');

// const common = new CommonUtils();
// const { ReportUtils } = require('../../../support/utils/report-utils');

// const reporter = new ReportUtils();

// class RegistryCommon {
//   /**
//    * @author: rajadurai
//    * @function_Name : registryPageNavigation
//    * @Description :  Validate the Registry page navigation is working fine
//    * @params : section details- header, footer.
//    * @returns : None
//    * */
//   async registryPageNavigation(section) {
//     switch (section) {
//       case 'header': {
//         if (common.verifyIsMobile()) {
//           this.openHamburgerMenu();
//         }
//         await page.customClick(registryNavigationElements.lnkWeddingRegistryHeader, 'lnkWeddingRegistryHeader');
//         break;
//       }
//       case 'footer': {
//         const title = await page.title();
//         if (common.verifyIsMobile()) {
//           if (title.includes('CB2')) {
//             // something should go here
//           } else {
//             await page.customClick(registryNavigationElements.lnkWeddingRegistryFooter, 'lnkWeddingRegistryFooterc');
//           }
//         } else {
//           await page.customClick(registryNavigationElements.lnkWeddingRegistryFooter, 'lnkWeddingRegistryFooterc');
//         }

//         break;
//       }
//       default: {
//         reporter.log('Invalid option. Make sure it should be either header,footer');
//         throw new Error('Invalid option for the section. Please mention it either header,footer');
//       }
//     }
//     await page.isObjectExist(registryNavigationElements.txtFindaRegistry, 'txtFindaRegistry');
//     await page.isObjectExist(registryNavigationElements.btnCreateRegistry, 'btnCreateRegistry');
//     await page.isObjectExist(registryNavigationElements.lnkManageRegistry, 'lnkManageRegistry');
//   }

//   async openHamburgerMenu() {
//     if (page.isObjectExist(registryNavigationElements.lnkHamburgerMenu, 'lnkHamburgerMenu')) {
//       await page.customClick(registryNavigationElements.lnkHamburgerMenu, 'lnkHamburgerMenu');
//     }
//   }

//   async openProfileMenu() {
//     if (page.isObjectExist(registryNavigationElements.lnkAccountHeader, 'lnkAccountHeader')) {
//       await page.customClick(registryNavigationElements.lnkAccountHeader, 'lnkAccountHeader');
//     }
//   }

//   /**
//    * @author: rajadurai
//    * @function_Name : registryPageNavigationFromProfile
//    * @Description : Navigating to the registry pages from profile icon
//    * @params : Create a Registry,My Registries
//    * @returns : None
//    * */
//   async registryPageNavigationFromProfile(linkname) {
//     await page.customWait(registryNavigationElements.lnkAccountHeader, 'lnkAccountHeader');
//     await page.hover(registryNavigationElements.lnkAccountHeader);
//     if (common.verifyIsMobile()) {
//       this.openProfileMenu();
//     }
//     switch (linkname) {
//       case 'Create a Registry':
//         await page.customClick(registryNavigationElements.lnkCreateRegistryHeader, 'lnkCreateRegistryHeader');
//         await page.isObjectExist(registryNavigationElements.txtCreateRegistryHeader, 'txtCreateRegistryHeader');
//         await common.compareActualAndExpectedText(registryNavigationElements.txtCreateRegistryHeader, "let's get you registered");
//         await this.titleValidation('createRegistry');
//         break;

//       case 'My Registries':
//         await page.customClick(registryNavigationElements.lnkManageRegistryHeader, 'lnkManageRegistryHeader');
//         await this.titleValidation('manageMyRegistries');
//         break;

//       default:
//         break;
//     }
//   }

//   // TODO Move this to a common shared library that every team can use
//   /**
//    * @author: rajadurai
//    * @function_Name : titleValidation
//    * @Description :  Validate the title of  Gift Registry page
//    * @params : None
//    * @returns : None
//    * */
//   async titleValidation(data) {
//     reporter.log(`Current page title: ${await page.title()}`);
//     const title = await page.title();
//     let updatedData = data;
//     if (common.verifyIsMobile()) {
//       updatedData = `mob${data}`;
//     }
//     if (title.includes('CB2')) {
//       await common.compareString(await page.title(), registryData.CB2_US[updatedData]);
//     } else {
//       await common.compareString(await page.title(), registryData.Crate_US[updatedData]);
//     }
//     // else {
//     //     await common.compareString(await page.title(), registryData.Crate_US[data]);}
//   }
// }

// module.exports = { RegistryCommon };
