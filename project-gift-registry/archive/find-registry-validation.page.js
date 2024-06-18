// // TODO This page is obsolete and should be updated to move code to the search.page.js

// const findRegistryElements = require('../elements/find-registry-elements');
// const registryDetailsElements = require('../elements/registry-details-elements');
// const { CommonUtils } = require('../../../support/utils/common-utils');

// const common = new CommonUtils();
// const { ReportUtils } = require('../../../support/utils/report-utils');

// const reporter = new ReportUtils();
// const globalData = require('../../../support/global_data_object/global_data_object');

// class FindRegistry
// {
//   constructor()
//   {
//     this.pageName = 'Wedding Registry Page';
//   }
//   /**
//    * @author: rajadurai
//    * @function_Name : searchRegistry
//    * @Description :  Search a Registry with first Name, Last Name
//    * @params : First Name, Last Name
//    * @returns : None
//    * */
//   async searchRegistry(firstName, lastName) {
//     const url = await page.url();
//     reporter.log('<<<<<<<<<< Test Logged In >>>>>>>>>>>>>>>>>>>>>');
//     if (url.includes('cb2')) {
//       if (common.verifyIsMobile()) {
//         await page.customClick(findRegistryElements.btnGiveaGift, 'btnGiveaGift');
//       }
//     }
//     reporter.log(">>>>>>>>>>>>>>> I'm In<<<<<<<<<<<<<<<<<<<<<<<");
//     await page.customWait(findRegistryElements.txtSearchFirstName, 'txtSearchFirstName');
//     await page.customSet(findRegistryElements.txtSearchFirstName, firstName, 'txtSearchFirstName');
//     await page.customSet(findRegistryElements.txtSearchLastName, lastName, 'txtSearchLastName');
//     await page.customClick(findRegistryElements.btnFindRegistry, 'btnFindRegistry');
//   }

//   /**
//    * @author: rajadurai
//    * @function_Name : searchRegistryPageValidation
//    * @Description :  Validate the Find Registry results page
//    * @params : First name, Last Name
//    * @returns : None
//    * */
//   async searchRegistryPageValidation(firstName, lastName) {
//     pageName = 'Registry Results Page';

//     await page.customWait(findRegistryElements.txtResultMessage, 'txtResultMessage');
//     const strActualText = await page.innerText(findRegistryElements.txtResultMessage);
//     const strExpectedText = `${firstName} ${lastName}`;
//     if (strActualText.includes(strExpectedText)) {
//       reporter.log(`Expected value \"${strExpectedText}"\ is present in the \"${strActualText}\"`);
//     } else {
//       reporter.log(`Expected value \"${strExpectedText}"\ is not present in the \"${strActualText}\"`);
//       throw new Error(`Expected value \"${strExpectedText}"\ is not present in the \"${strActualText}\"`);
//     }
//     const strRegistryCount = strActualText.replace(/\D/g, '');
//     if (strRegistryCount == 0) {
//       reporter.log(strActualText);
//     } else {
//       const intRegistryCount = await page.locator(findRegistryElements.lnkRegistryContainer).count();
//       if (strRegistryCount == intRegistryCount) {
//         reporter.log('Actual Registry count matches the Search Results.');
//       } else {
//         reporter.log(`Actual Registry count (${intRegistryCount}) was not mtaches the search results (${intRegistryCount})`);
//       }
//     }
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : sortRegistryDetails
//    * @Description :  Registry search results were sort by the different options
//    * @params : None
//    * @returns : None
//    * */
//   async sortRegistryDetails(sortIndex = this.getRandomInt(1, intSortingOptions - 1)) {
//     pageName = 'Registry Results page';
//     await page.customWait(findRegistryElements.btnSortBy, 'btnSortBy');
//     const intSortingOptions = await page.locator(findRegistryElements.txtSortingOptions).count();
//     // var randomIndexvalue = await this.getRandomInt(1, intSortingOptions - 1);
//     globalData.RegistrySortIndex = sortIndex;
//     await page.customSelectByIndex(findRegistryElements.btnSortBy, sortIndex, 'btnFindRegistry');
//   }

//   async getRandomInt(min, max) {
//     min = Math.ceil(min);
//     reporter.log(`Minimum Value ${min}`);
//     max = Math.floor(max);
//     reporter.log(`Maximum Value ${max}`);
//     return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : verifySortRegistryDetails
//    * @Description :  Validate the Registry search results were sorted by the different options
//    * @params : None
//    * @returns : None
//    * */
//   async verifySortRegistryDetails() {
//     pageName = 'Registry Results page';
//     const arrRegistryDetails = [];
//     const intRegistryCount = await page.locator(findRegistryElements.lnkRegistryContainer).count();
//     switch (globalData.RegistrySortIndex) {
//       case 1:
//         for (let i = 1; i <= intRegistryCount; i++) {
//           var strRegistrantName = await page.innerText(findRegistryElements.txtRegistrantNameResults.replace('X', i));
//           var arrRegistrantName = strRegistrantName.split(' ');
//           arrRegistryDetails.push(arrRegistrantName[0]);
//         }
//         var arrSortedName = arrRegistryDetails.sort();
//         this.compareArrays(arrSortedName, arrRegistryDetails);
//         break;
//       case 2:
//         for (let i = 1; i <= intRegistryCount; i++) {
//           var strRegistrantName = await page.innerText(findRegistryElements.txtRegistrantNameResults.replace('X', i));
//           var arrRegistrantName = strRegistrantName.split(' ');
//           if (arrRegistrantName.length > 3) {
//             arrRegistryDetails.push(arrRegistrantName[3]);
//           }
//         }
//         var arrSortedcoRegName = arrRegistryDetails.sort();
//         this.compareArrays(arrSortedcoRegName, arrRegistryDetails);

//         break;
//       case 3:
//         for (let i = 1; i <= intRegistryCount; i++) {
//           var strEventDetails = await page.innerText(findRegistryElements.txtRegistrantEventDetails.replace('X', i));
//           var arrEventDetails = strEventDetails.split(' ');
//           if (arrEventDetails.length == 5) {
//             arrRegistryDetails.push(`${arrEventDetails[1].substr(3)} ${arrEventDetails[2]}`);
//           } else if (arrEventDetails.length == 6) {
//             arrRegistryDetails.push(`${arrEventDetails[1].substr(3)} ${arrEventDetails[2]} ${arrEventDetails[3]}`);
//           } else {
//             arrRegistryDetails.push(arrEventDetails[1].substr(3));
//           }
//         }
//         var arrSortedEvent = arrRegistryDetails.sort();
//         this.compareArrays(arrSortedEvent, arrRegistryDetails);

//         break;
//       case 4:
//         for (let i = 1; i <= intRegistryCount; i++) {
//           var strEventDetails = await page.innerText(findRegistryElements.txtRegistrantEventDetails.replace('X', i));
//           var arrEventDetails = strEventDetails.split(' ');
//           arrRegistryDetails.push(arrEventDetails[1].substring(0, 2));

//           var arrSortedState = arrRegistryDetails.sort();
//         }
//         this.compareArrays(arrSortedState, arrRegistryDetails);

//         break;
//       case 5:
//         for (let i = 1; i <= intRegistryCount; i++) {
//           var strEventDetails = await page.innerText(findRegistryElements.txtRegistrantEventDetails.replace('X', i));
//           var arrEventDetails = strEventDetails.split(' ');
//           arrRegistryDetails.push(arrEventDetails[arrEventDetails.length - 1]);
//         }
//         var arrSortedDate = arrRegistryDetails.sort();
//         this.compareArrays(arrSortedDate, arrRegistryDetails);
//         break;
//       default:
//         break;
//     }
//   }

//   async compareArrays(arr1, arr2) {
//     // compare arrays
//     const result = JSON.stringify(arr1) == JSON.stringify(arr2);

//     // if result is true
//     if (result) {
//       reporter.log('The sorting method working as expected.');
//     } else {
//       reporter.log('Sorting method is not working as expected.');
//       throw new Error('Sorting method is not working as expected.');
//     }
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : selectRegistry
//    * @Description :  Search a Registry based on event
//    * @params : Event type
//    * @returns : None
//    * */
//   async selectRegistry(eventtype) {
//     pageName = 'Registry Results page';
//     const intRegistryCount = await page.locator(findRegistryElements.lnkRegistryContainer).count();
//     await page.customWait(findRegistryElements.txtRegistrantEventDetails.replace('X', intRegistryCount));
//     for (let i = 1; i <= intRegistryCount; i++) {
//       const strEventDetails = await page.innerText(findRegistryElements.txtRegistrantEventDetails.replace('X', i));
//       const arrEventDetails = strEventDetails.split(' ');

//       if (arrEventDetails.length == 5) {
//         if (eventtype == `${arrEventDetails[1].substr(3)} ${arrEventDetails[2]}`) {
//           globalData.strRegistrantName = await page.innerText(findRegistryElements.txtRegistrantNameResults.replace('X', i));
//           await page.customClick(findRegistryElements.txtRegistrantEventDetails.replace('X', i), 'txtRegistrantEventDetails');

//           break;
//         }
//       } else if (arrEventDetails.length == 6) {
//         globalData.strRegistrantName = await page.innerText(findRegistryElements.txtRegistrantNameResults.replace('X', i));
//         if (eventtype == `${arrEventDetails[1].substr(3)} ${arrEventDetails[2]} ${arrEventDetails[3]}`) {
//           await page.customClick(findRegistryElements.txtRegistrantEventDetails.replace('X', i), 'txtRegistrantEventDetails');

//           break;
//         }
//       } else if (eventtype == arrEventDetails[1].substr(3)) {
//         globalData.strRegistrantName = await page.innerText(findRegistryElements.txtRegistrantNameResults.replace('X', i));
//         await page.customClick(findRegistryElements.txtRegistrantEventDetails.replace('X', i), 'txtRegistrantEventDetails');

//         break;
//       }
//     }
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateRegistryDetails
//    * @Description :  Validate Registry details page
//    * @params : None
//    * @returns : None
//    * */
//   async validateRegistryDetails() {
//     pageName = 'Registry details page';

//     reporter.log(`Registrant Info :${await page.innerText(registryDetailsElements.txtRegistryInfo)}`);

//     // await page.customWait(registryDetailsElements.txtRegistryContainer);
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : sortRegistryProducts
//    * @Description :  Sort the Registry products based on sorting option
//    * @params : sort option-Price,Category
//    * @returns : None
//    * */
//   async sortRegistryProducts(sortOption) {
//     pageName = 'Registry details page';
//     if (await page.isVisible(registryDetailsElements.cboSortProduct)) {
//       await page.customSelectByValue(registryDetailsElements.cboSortProduct, sortOption, 'cboSortProduct');
//       await page.customClick(registryDetailsElements.btnSortProduct, 'btnSortProduct');
//     } else {
//       reporter.log('There is no products associated to this registry');
//       throw new Error('There is no products associated to this registry');
//     }
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateSortedProducts
//    * @Description :  validate products were sorted by sorting option
//    * @params : sort option-Price,Category
//    * @returns : None
//    * */
//   async validateSortedProducts(sortOption) {
//     pageName = 'Registry details page';
//     await page.customWait(registryDetailsElements.txtListItemGroup, 'txtListItemGroup');
//     if (sortOption == 'Price') {
//       if ((await page.innerText(registryDetailsElements.txtListItemGroup)).includes('$')) {
//         reporter.log('Registry Products were sorted based on Price');
//       }
//     } else if (sortOption == 'Category') {
//       if (!(await page.innerText(registryDetailsElements.txtListItemGroup)).includes('$')) {
//         reporter.log('Registry Products were sorted based on Category');
//       }
//     } else {
//       reporter.log('Invalid Option to sort the Registry');
//       throw new Error('Invalid Option to sort the Registry');
//     }
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateProductDetails
//    * @Description :  Validate the product details in gift Registry detils page
//    * @params : None
//    * @returns : None
//    * */
//   async validateProductDetails() {
//     pageName = 'Registry Details page';
//     await page.customWait(registryDetailsElements.lnkRegistryProductTitles, 'lnkRegistryProductTitles');
//     const intProductCount = await page.locator(registryDetailsElements.lnkRegistryProductTitles).count();
//     const randomIndexvalue = await this.getRandomInt(1, intProductCount);
//     await page.isObjectExist(registryDetailsElements.lnkRegistryProductTitle.replace('X', randomIndexvalue), 'lnkRegistryProductTitle');
//     await page.isObjectExist(registryDetailsElements.txtRegistryProductSKU.replace('X', randomIndexvalue), 'txtRegistryProductSKU');
//     await page.isObjectExist(registryDetailsElements.txtRegistryProductPrice.replace('X', randomIndexvalue), 'txtRegistryProductPrice');
//     await page.isObjectExist(registryDetailsElements.txtproductWantscount.replace('X', randomIndexvalue), 'txtproductWantscount');
//     await page.isObjectExist(registryDetailsElements.txtproductHascount.replace('X', randomIndexvalue), 'txtproductHascount');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : clickProduct
//    * @Description :  click the product link from gift Registry
//    * @params : None
//    * @returns : None
//    * */
//   async clickProduct() {
//     pageName = 'Registry Details page';
//     await page.customWait(registryDetailsElements.lnkRegistryProductTitles, 'lnkRegistryProductTitles');
//     const intProductCount = await page.locator(registryDetailsElements.lnkRegistryProductTitles).count();
//     const randomIndexvalue = await this.getRandomInt(1, intProductCount);
//     await page.customClick(registryDetailsElements.lnkRegistryProductTitle.replace('X', randomIndexvalue), 'lnkRegistryProductTitle');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateProductDetailsPopup
//    * @Description :  Verify the product details in popup
//    * @params : None
//    * @returns : None
//    * */
//   async validateProductDetailsPopup() {
//     pageName = 'Registry Details page';

//     await page.customWait(registryDetailsElements.txtPopupContainer, 'txtRegistryContainer');
//     await page.customWait(registryDetailsElements.lnkPopupClose, 'lnkPopupClose');
//     await page.customWait(registryDetailsElements.txtProductInfo, 'txtProductInfo');
//     await page.customWait(registryDetailsElements.btnPopUpAddTocart, 'btnPopUpAddTocart');
//     await page.customClick(registryDetailsElements.lnkPopupClose, 'lnkPopupClose');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : clickStoreLocationLink
//    * @Description :  Click the store details popup
//    * @params : None
//    * @returns : None
//    * */
//   async clickStoreLocationLink() {
//     pageName = 'Registry Details page';
//     await page.customWait(registryDetailsElements.lnkRegistryProductTitles, 'lnkRegistryProductTitles');
//     const intProductCount = await page.locator(registryDetailsElements.lnkRegistryProductTitles).count();
//     const randomIndexvalue = await this.getRandomInt(1, intProductCount);
//     await page.customWait(registryDetailsElements.lnkStoreLocationPopup.replace('X', randomIndexvalue), 'lnkStoreLocationPopup');
//     await page.customClick(registryDetailsElements.lnkStoreLocationPopup.replace('X', randomIndexvalue), 'lnkStoreLocationPopup');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateStoreLocationPopup
//    * @Description :
//    * @params : None
//    * @returns : None
//    * */
//   async validateStoreLocationPopup() {
//     pageName = 'Registry Details page';
//     await page.customWait(registryDetailsElements.txtStoreAvailabilityPopup, 'txtStoreAvailabilityPopup');
//     await page.customWait(registryDetailsElements.txtZipcode, 'txtZipcode');
//     await page.customWait(registryDetailsElements.btnFindStore, 'btnFindStore');
//     await page.customWait(registryDetailsElements.btnPopupClose, 'btnPopupClose');
//     await page.customClick(registryDetailsElements.btnPopupClose, 'btnPopupClose');

//     await page.waitForTimeout(5000);
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : validateStoreLocationPopup
//    * @Description :
//    * @params : None
//    * @returns : None
//    * */
//   async validateTheFreeshippingmsg() {
//     pageName = 'Registry Details page';

//     await page.customWait(registryDetailsElements.lnkFreeshippingDetailsProducts, 'lnkFreeshippingDetailsProducts');
//     const intProductCount = await page.locator(registryDetailsElements.lnkFreeshippingDetailsProducts).count();
//     const randomIndexvalue = await this.getRandomInt(1, intProductCount);
//     await page.customWait(registryDetailsElements.lnkFreeshippingDetails.replace('X', randomIndexvalue), 'lnkStoreLocationPopup');
//     await page.customClick(registryDetailsElements.lnkFreeshippingDetails.replace('X', randomIndexvalue), 'lnkStoreLocationPopup');
//     await page.customWait(registryDetailsElements.txtFreeshippingDetails, 'txtFreeshippingDetails');
//     await page.customClick(registryDetailsElements.btnFreeShippingClose, 'btnFreeShippingClose');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : updateQuantity
//    * @Description : Update the QTY for gift registry product
//    * @params : Qty
//    * @returns : None
//    * */
//   async updateQuantity(quantity) {
//     pageName = 'Registry Details page';

//     await page.customWait(registryDetailsElements.lnkRegistryProductTitles, 'lnkRegistryProductTitles');
//     const intProductCount = await page.locator(registryDetailsElements.lnkRegistryProductTitles).count();
//     const randomIndexvalue = await this.getRandomInt(1, intProductCount);
//     globalData.productLnk = randomIndexvalue;
//     // await page.customWait((registryDetailsElements.txtQuantityBox).replace('X', randomIndexvalue), 'lnkStoreLocationPopup');
//     await page.customSet(registryDetailsElements.txtQuantityBox.replace('X', randomIndexvalue), quantity, 'txtQuantityBox');
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : addToCart
//    * @Description : Add the the Product to cart from gift Registry details page
//    * @params : None
//    * @returns : None
//    * */
//   async addToCart() {
//     pageName = 'Registry Details page';
//     await page.customClick(registryDetailsElements.btnAddtoCart.replace('X', globalData.productLnk), 'btnAddtoCart');
//     await page.waitForTimeout(5000);
//   }

//   /**
//    * @author: Rajadurai
//    * @function_Name : verifyAddToCartConfirmation
//    * @Description : Verify the Add to Cart confirmation popup
//    * @params : None
//    * @returns : None
//    * */
//   async verifyAddToCartConfirmation() {
//     pageName = 'Registry Details page';
//     await page.customWait(registryDetailsElements.txtAddToCartConfirmation);
//     reporter.log(await page.innerText(registryDetailsElements.txtAddToCartConfirmation));
//     await page.isObjectExist(registryDetailsElements.btnCheckOutNow, 'btnCheckOutNow');
//     await page.customWait(registryDetailsElements.btnContinueShopping, 'btnContinueShopping');
//     await page.customClick(registryDetailsElements.btnContinueShopping, 'btnContinueShopping');
//     await page.waitForTimeout(5000);
//   }
// }

// module.exports = { FindRegistry };
