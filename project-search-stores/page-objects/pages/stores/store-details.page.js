const { expect } = require('@playwright/test');
const el = require('../../elements/elements');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const env = require('../../../../support/env/env');

const common = new CommonUtils();
const testReport = new ReportUtils();

class StoreDetailsPage {
  pageName = this.constructor.name;

  /**
   * @author: vtharakan
   * @function_Name : enterLocation
   * @Description : This method is used to enter the zipcode in the location inputbox
   * @params : None
   * @returns : None
   * */
  async enterLocation(zipCode) {
    if (!env.EXEC_SITE.includes('can')) {
      testReport.log(this.pageName, 'Click on the Location input box and enter the zip code');
      await page.click(el.storeLandingPage.txtZipCode);
      await page.fill(el.storeLandingPage.txtZipCode, zipCode, { delay: 100 });
      await page.click(el.storeLandingPage.btnFind);
      await page.waitForLoadState('load');
    } else {
      testReport.log('Please note Canada sites do not have the option to Enter the zipcode in Store Locator page');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : selectStoreFromStoreLocatorPage
   * @Description : This method is used to select any store from the store locator page and navigate to store details page
   * @params : None
   * @returns : None
   * */
  async selectStoreFromStoreLocatorPage() {
    if (env.EXEC_SITE.includes('cb2can')) {
      testReport.log(this.pageName, 'Click on the Store name');
      await page.click(el.storeLandingPage.lnkTorontoStore);
    } else {
      await common.forcedWait(this.pageName, 10000);
      testReport.log(this.pageName, 'Click on the Store drawer');
      await page.locator(el.storeLandingPage.lnkStoreDrawer).nth(1).click();
      await common.forcedWait(this.pageName, 10000);
      testReport.log(this.pageName, 'Click on the View Store Details button');
      await page.click(el.storeLandingPage.btnViewStoreDetails);
    }
    await page.waitForLoadState('load');
    page.locator(el.storeDetailsPage.lnkBreadcrumbList, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Successfully navigated to Store details page');
  }

  async isDisplayedViewAllStoresLink() {
    testReport.log(this.pageName, 'Verify View All Stores link is displayed in Store Details page');
    page.locator(el.storeDetailsPage.lnkViewAllStores, { waitFor: 'visible' });
    testReport.log(this.pageName, 'View All Stores link is displayed in Store Details page');
  }

  async isDisplayedBreadcrumb() {
    testReport.log(this.pageName, 'Verify Breadcrumb is displayed in Store Details page');
    page.locator(el.storeDetailsPage.lnkBreadcrumbList, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Breadcrumb is displayed in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyStoreNameIsDisplayed
   * @Description : This method is used to verify store name is displayed
   * @params : None
   * @returns : None
   * */
  async verifyStoreNameIsDisplayed() {
    testReport.log(this.pageName, 'Verify Store Name is displayed in Store Details page');
    page.locator(el.storeDetailsPage.lblStoreName, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Store Name is displayed in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMapIsDisplayed
   * @Description : This method is used to verify map is displayed
   * @params : None
   * @returns : None
   * */
  async verifyMapIsDisplayed() {
    testReport.log(this.pageName, 'Verify Map is displayed in Store Details page');
    page.locator(el.storeDetailsPage.mapContainer, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Map is displayed in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMakeThisMyStoreButton
   * @Description : This method is used to verify Make this my store button is displayed
   * @params : None
   * @returns : None
   * */
  async verifyMakeThisMyStoreButton() {
    testReport.log(this.pageName, 'Verify Make This My Store button is displayed');
    page.locator(el.storeDetailsPage.btnMakeThisMyStore, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Make This My Store button is displayed in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : clickMakeThisMyStoreButton
   * @Description : This method is used to click on the Make this my store button
   * @params : None
   * @returns : None
   * */
  async clickMakeThisMyStoreButton() {
    testReport.log(this.pageName, 'Click on Make this my store button');
    await page.click(el.storeDetailsPage.btnMakeThisMyStore);
    testReport.log(this.pageName, 'Clicked on Make this my store button in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMyStoreIsDisplayed
   * @Description : This method is used to verify My store is displayed
   * @params : None
   * @returns : None
   * */
  async verifyMyStoreIsDisplayed() {
    testReport.log(this.pageName, 'Verify My Store button is displayed');
    page.locator(el.storeDetailsPage.btnMyStore, { waitFor: 'visible' });
    testReport.log(this.pageName, 'My Store button is displayed in Store Details page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyAddressAndPhoneNumberIsDisplayed
   * @Description : This method is used to verify Address and Phone number is displayed
   * @params : None
   * @returns : None
   * */
  async verifyAddressAndPhoneNumberIsDisplayed() {
    testReport.log(this.pageName, 'Verify Store Address and Phone Number is displayed');
    page.locator(el.storeDetailsPage.lnkStoreAddress, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Store Address is displayed');
    page.locator(el.storeDetailsPage.lnkPhoneNumber, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Store Phone Number is displayed');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyAndClickOnFindANewStoreButton
   * @Description : This method is used to Click on Find A New Store button
   * @params : None
   * @returns : None
   * */
  async verifyAndClickOnFindANewStoreButton() {
    testReport.log(this.pageName, 'Verify Find A Store button is displayed');
    page.locator(el.storeDetailsPage.btnFindANewStore, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Find A Store button is displayed');
    testReport.log(this.pageName, 'Click on Find A Store button');
    await page.click(el.storeDetailsPage.btnFindANewStore);
    testReport.log(this.pageName, 'Clicked on Find A Store button');
    testReport.log(this.pageName, 'Verify on clicking on Find A Store button user is taken to the Store Locator page');
    const url = page.url();
    if (url.includes('/stores/')) {
      testReport.log(this.pageName, 'Successfully navigated to Store locator page after clicking the Find a Store button');
    } else {
      throw new Error('Unable to navigate to Store Locator page. Please check!!!');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyStoreHours
   * @Description : This method is used to verify Store Hours is displayed
   * @params : None
   * @returns : None
   * */
  async verifyStoreHours() {
    testReport.log(this.pageName, 'Verify Store Current Status is displayed');
    const storeStatusLocator = env.BRAND === 'Crate' ? el.storeDetailsPage.lblStoreStatus : '.store-Status';
    page.locator(storeStatusLocator, { waitFor: 'visible' });
    const storeStatus = await page.locator(storeStatusLocator).innerText();
    testReport.log(this.pageName, `Store Current Status is : ${storeStatus}`);
    testReport.log(this.pageName, 'Verify Store hours is displayed for a week');
    page.locator(el.storeDetailsPage.lblStoreHours, { waitFor: 'visible' });
    const count = await page.locator(el.storeDetailsPage.lblStoreHours).count();
    if (count !== 7) {
      throw new Error('Days are missing in the store hours. Please check!!!');
    } else {
      testReport.log(this.pageName, 'Store hours are displayed for all days in a week');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyRegistryMessage
   * @Description : This method is used to verify Registry message is displayed
   * @params : None
   * @returns : None
   * */
  async verifyRegistryMessage() {
    testReport.log(this.pageName, 'Verify Registry message is displayed');
    let registryContent = false;
    registryContent = await page.locator(el.storeDetailsPage.lblRegistry).isVisible();
    if (registryContent) {
      testReport.log(this.pageName, 'Registry message is displayed');
    } else {
      testReport.log(this.pageName, 'Registry message is not displayed');
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFeatureIcons
   * @Description : This method is used to verify Feature Icons is displayed
   * @params : None
   * @returns : None
   * */
  async verifyFeatureIcons() {
    testReport.log(this.pageName, 'Verify Feature Icon is displayed');
    await expect.soft(page.locator(el.storeDetailsPage.lblFeatureIcons)).toBeVisible();
    testReport.log(this.pageName, 'Feature Icon is displayed');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyGetDirectionsButton
   * @Description : This method is used to verify Get Directions button and Click on it
   * @params : None
   * @returns : None
   * */
  async verifyGetDirectionsButton() {
    testReport.log(this.pageName, 'Verify Get Directions button is displayed');
    page.locator(el.storeDetailsPage.btnGetDirections, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Get Directions button is displayed');
    testReport.log(this.pageName, 'Click on the Get Directions button');
    // switch to window
    const [newWindow] = await Promise.all([page.waitForEvent('popup'), page.click(el.storeDetailsPage.btnGetDirections)]);
    testReport.log(this.pageName, `Get Directions Window Url : ${newWindow.url()}`);
    testReport.log(this.pageName, 'Clicked on the Get Directions button');
    // switch back to main window
    page.bringToFront();
    await page.waitForLoadState('load');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyCurbsidePickup
   * @Description : This method is used to verify Curbside Pick up is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyCurbsidePickup() {
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Verify Curbside Pickup info is displayed');
    page.locator(el.storeDetailsPage.lblCurbsidePickup, { waitFor: 'visible' });
    testReport.log(this.pageName, 'Curbside Pickup info is displayed');
    testReport.log(this.pageName, 'Click on the Learn More link in Curbside Pickup');
    await page.locator(el.storeDetailsPage.lnkLearnMore).click();
    testReport.log(this.pageName, 'Clicked on the Learn More link in Curbside Pickup');
    testReport.log(this.pageName, 'Verify the Header is displayed in Curbside Pickup popup');
    page.locator(el.storeDetailsPage.lblCurbsideHeader, { waitFor: 'visible' });
    testReport.log(this.pageName, 'The Header is displayed in Curbside Pickup popup');
    testReport.log(this.pageName, 'Click on close icon in Curbside Pickup popup');
    page.locator(el.storeDetailsPage.btnCurbsideCloseIcon, { waitFor: 'visible' });
    await page.locator(el.storeDetailsPage.btnCurbsideCloseIcon).click();
    testReport.log(this.pageName, 'Clicked on close icon in Curbside Pickup popup');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyStoreInformation
   * @Description : This method is used to verify Store Information is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyStoreInformation() {
    testReport.log(this.pageName, 'Verify Store Information header is displayed');

    if (env.BRAND === 'Crate') {
      // store-pickup-accordion
      await page.locator(el.storeDetailsPage.btnPickupDrawar).isVisible();
      await page.click(el.storeDetailsPage.btnPickupDrawar);
      await page.locator(`${el.storeDetailsPage.btnPickupDrawar} ${el.storeDetailsPage.txtDrawarContent}`).isVisible();
      testReport.log(this.pageName, 'Pickup drawar is displayed and functional');

      // store-parking-accordion
      await page.locator(el.storeDetailsPage.btnParkingDrawar).isVisible();
      await page.click(el.storeDetailsPage.btnParkingDrawar);
      await page.locator(`${el.storeDetailsPage.btnParkingDrawar} ${el.storeDetailsPage.txtDrawarContent}`).isVisible();
      testReport.log(this.pageName, 'Parking drawar is displayed and functional');

      // store-services-accordion
      await page.locator(el.storeDetailsPage.btnServicesDrawar).isVisible();
      await page.click(el.storeDetailsPage.btnServicesDrawar);
      await page.locator(`${el.storeDetailsPage.btnServicesDrawar} ${el.storeDetailsPage.txtDrawarContent}`).isVisible();
      testReport.log(this.pageName, 'Services drawar is displayed and functional');

      // store-returns-accordion
      await page.locator(el.storeDetailsPage.btnReturnsDrawar).isVisible();
      await page.click(el.storeDetailsPage.btnReturnsDrawar);
      await page.locator(`${el.storeDetailsPage.btnReturnsDrawar} ${el.storeDetailsPage.txtDrawarContent}`).isVisible();
      testReport.log(this.pageName, 'Returns drawar is displayed and functional');

      // store-customer-service-accordion
      await page.locator(el.storeDetailsPage.btnCustomerServiceDrawar).isVisible();
      await page.click(el.storeDetailsPage.btnCustomerServiceDrawar);
      await page.locator(`${el.storeDetailsPage.btnCustomerServiceDrawar} ${el.storeDetailsPage.txtDrawarContent}`).isVisible();
      testReport.log(this.pageName, 'cCustomer Service drawar is displayed and functional');
    } else {
      page.locator(el.storeDetailsPage.lblStoreInformation, { waitFor: 'visible' });
      testReport.log(this.pageName, 'Store Information header is displayed');
      await page.click(el.storeDetailsPage.lnkPickupDrawer);
      testReport.log(this.pageName, 'Pickup is clicked');
      if (!(env.EXEC_SITE === 'cb2can')) {
        await page.click(el.storeDetailsPage.lnkParkingDrawer);
        testReport.log(this.pageName, 'Parking is clicked');
      }
      await page.click(el.storeDetailsPage.lnkDeliveryAndInstallationServices);
      testReport.log(this.pageName, 'Delivery And Installation Services is clicked');
      await page.click(el.storeDetailsPage.lnkReturnServices);
      testReport.log(this.pageName, 'Return Policy is clicked');
      if (env.EXEC_SITE === 'cb2us') {
        await page.click(el.storeDetailsPage.lblPublicTransportation);
        testReport.log(this.pageName, 'Public Transportation is clicked');
      }
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyUpcomingStoreEvents
   * @Description : This method is used to verify Upcoming Store Events is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyUpcomingStoreEvents() {
    testReport.log(this.pageName, 'Verify Upcoming Store Events header is displayed');
    await expect(page.locator(el.storeDetailsPage.lblUpcomingStoreEvents)).toBeVisible();
    const isEventPresent = await page.locator(el.storeDetailsPage.lnkStoreEventCard).nth(0).isVisible();
    if (isEventPresent) {
      if (env.BRAND === 'Crate') {
        testReport.log(this.pageName, 'Verify the events sub title is displayed');
        const subTitle = await page.locator(el.storeDetailsPage.lblStoreEventSubTitle).innerText();
        expect(subTitle === `RSVP to an upcoming event at ${await page.locator(el.SITECOMMON.lblH1).innerText()}`).toBeTruthy();
        testReport.log(this.pageName, `The events subtitle is : ${subTitle}`);
      }
      testReport.log(this.pageName, 'Verify Store image is diplayed in the card');
      page.locator(el.storeDetailsPage.imgContainer, { waitFor: 'visible' });
      testReport.log(this.pageName, 'The store image is diplayed in the card');
      testReport.log(this.pageName, 'Verify The Store info - Day, Date, Event Header and Time is displayed in the card');
      await expect(await page.locator(el.storeDetailsPage.lblEventHeader).count()).toBeGreaterThan(0);
      await expect(await page.locator(el.storeDetailsPage.lblDateTime).count()).toBeGreaterThan(0);
      const eventHeader = await page.locator(el.storeDetailsPage.lblEventHeader).nth(0).innerText();
      page.locator(el.storeDetailsPage.btnLearnMore, { waitFor: 'visible' });
      await page.click(el.storeDetailsPage.btnLearnMore);
      // make sure the popup is not empty
      page.locator(el.storeDetailsPage.lblStoreEventPopupHeader, { waitFor: 'visible' });
      const eventPopupHeader = await page.locator(el.storeDetailsPage.lblStoreEventPopupHeader).innerText();
      await expect(eventPopupHeader.toLowerCase()).toBe(eventHeader.toLowerCase());
      const closeBtn = env.BRAND === 'Crate' ? el.storeDetailsPage.lnkStoreEventPopupCloseCrate : el.storeDetailsPage.lnkStoreEventPopupCloseCB2;
      await page.click(closeBtn);
      page.locator(el.storeDetailsPage.btnRSVP, { waitFor: 'visible' });
      await page.locator(el.storeDetailsPage.btnRSVP).last().click();
      // await page.click(el.storeDetailsPage.btnRSVP);
      if (env.BRAND === 'Crate') {
        await expect(page.locator('[data-testid="event-rsvp-modal"]')).toBeVisible();
        await page.click('[data-testid="modal-close-button"]');
      } else {
        await page.waitForLoadState('load');
        await expect(await page.locator(el.storeDetailsPage.lblRSVPHeader).innerText()).not.toBeNull();
        await page.goBack();
        await page.waitForLoadState('load');
      }
      testReport.log(this.pageName, 'The Store info is displayed in the card');
    } else {
      const noEventMessageLocator = env.BRAND === 'Crate' ? el.storeDetailsPage.lblCratenoEventMessage : el.storeDetailsPage.lblCB2noEventMessage;
      await expect(page.locator(noEventMessageLocator)).toBeVisible();
      const noEventMessage = await page.locator(noEventMessageLocator).textContent();
      expect(noEventMessage).toBe(env.NO_STORE_EVENT_MESSAGE);
    }
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyGuidanceSection
   * @Description : This method is used to verify Guidance section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyGuidanceSection() {
    testReport.log(this.pageName, 'Verify Guidance section is displayed');
    page.locator(el.storeDetailsPage.lblGuidance, { waitFor: 'visible' });
    const currentUrl = page.url();
    testReport.log(this.pageName, 'Click on Schedule Consultation button');
    await page.locator(el.storeDetailsPage.btnScheduleConsultation).click();
    testReport.log(this.pageName, 'Clicked on Schedule Consultation button');
    testReport.log(this.pageName, 'Verify Appointment type header is displayed');
    testReport.log(this.pageName, 'Click on browser back button');
    await page.goto(currentUrl);
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyMostPopularItemsSection
   * @Description : This method is used to verify Most Popular Items section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyMostPopularItemsSection() {
    testReport.log(this.pageName, 'Verify Most Popular Items section is displayed');
    await common.forcedWait(this.pageName, 2000);
    // await page.locator(el.storeDetailsPage.lnkMostPopularItems, { waitFor: 'visible' });
    // expect(await page.locator(el.storeDetailsPage.lblMostPopularItems).innerText()).not.toBeNull();
    expect(await page.locator(el.storeDetailsPage.lnkPopularItemsCount).count()).toBeGreaterThan(0);
    if (!common.verifyIsMobile()) {
      await expect(page.locator(el.storeDetailsPage.lnkMostPopularPrevIcon)).toBeDisabled();
      await expect(page.locator(el.storeDetailsPage.lnkMostPopularNextIcon)).toBeEnabled();
      await page.click(el.storeDetailsPage.lnkMostPopularNextIcon);
      await expect(page.locator(el.storeDetailsPage.lnkMostPopularPrevIcon)).toBeEnabled();
      await page.click(el.storeDetailsPage.lnkMostPopularPrevIcon);
    }
    testReport.log(this.pageName, 'Most popular Items section is displayed');
  }

  /**
   * @author: vtharakan
   * @function_Name : storeFeaturesSection
   * @Description : This method is used to verify Store Features section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async storeFeaturesSection() {
    testReport.log(this.pageName, 'Verify Design Services section is displayed');
    page.locator(el.storeDetailsPage.lblStoreFeaturesTitle, { waitFor: 'visible' });

    testReport.log(this.pageName, 'Verify the features sub title is displayed');
    const subTitle = await page.locator(el.storeDetailsPage.lblStoreFeaturesSubTitle).innerText();
    expect(subTitle === `Learn more about what's available at ${await page.locator(el.SITECOMMON.lblH1).innerText()}`).toBeTruthy();
    testReport.log(this.pageName, `The features subtitle is : ${subTitle}`);

    testReport.log(this.pageName, 'Verify the Design Services is displayed');
    await expect(page.locator(el.storeDetailsPage.lblDesignServicesFeature)).toBeVisible();
    expect((await page.locator(el.storeDetailsPage.lblDesignServicesFeatureHeader).innerText()) === 'Design Services').toBeTruthy();
    expect((await page.locator(el.storeDetailsPage.txtDesignServicesFeatureCopy).nth(0).innerText()) !== null).toBeTruthy();
    await expect(page.locator(el.storeDetailsPage.btnDesignServicesFeature).nth(0)).toBeEnabled();
    let buttonHref = await page.locator(el.storeDetailsPage.btnDesignServicesFeature).nth(0).getAttribute('href');
    expect(buttonHref).toContain('timetrade.com/app/crateandbarrel/workflows/');
    testReport.log(this.pageName, 'Design Services is displayed');

    testReport.log(this.pageName, 'Verify Registry Consultations is displayed');
    await expect(page.locator(el.storeDetailsPage.lblRegistryFeature)).toBeVisible();
    expect((await page.locator(el.storeDetailsPage.lblRegistryFeatureHeader).innerText()) === 'Registry Consultations').toBeTruthy();
    expect((await page.locator(el.storeDetailsPage.txtRegistryFeatureCopy).nth(0).innerText()) !== null).toBeTruthy();
    await expect(page.locator(el.storeDetailsPage.btnRegistryFeature)).toBeEnabled();
    buttonHref = await page.locator(el.storeDetailsPage.btnRegistryFeature).getAttribute('href');
    expect(buttonHref).toContain('timetrade.com/app/crateandbarrel/workflows/');
    testReport.log(this.pageName, 'Registry Consultations is displayed');

    testReport.log(this.pageName, 'Verify Job Opportunities is displayed');
    await expect(page.locator(el.storeDetailsPage.lblCareerFeature)).toBeVisible();
    expect((await page.locator(el.storeDetailsPage.lblCareerFeatureHeader).innerText()) === 'Job Opportunities').toBeTruthy();
    expect((await page.locator(el.storeDetailsPage.txtCareerFeatureCopy).nth(0).innerText()) !== null).toBeTruthy();
    await expect(page.locator(el.storeDetailsPage.btnCareerFeature)).toBeEnabled();
    buttonHref = await page.locator(el.storeDetailsPage.btnCareerFeature).getAttribute('href');
    expect(buttonHref).toContain('/careers');
    testReport.log(this.pageName, 'Job Opportunities is displayed');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifySEOCopySction
   * @Description : This method is used to verify SEO copy is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifySEOCopySction() {
    testReport.log(this.pageName, 'Verify SEO copy is displayed at the bottom of the page');
    await page.waitForLoadState('load');
    page.locator(el.storeDetailsPage.lblSeoCopy, { waitFor: 'visible' });
    expect(await page.locator(el.storeDetailsPage.lblSeoTitle).nth(0).innerText()).not.toBeNull();
    expect(await page.locator(el.storeDetailsPage.lblSeoContent).count()).toBeGreaterThan(0);
    testReport.log(this.pageName, 'SEO copy is displayed at the bottom of the page');
  }

  /**
   * @author: vtharakan
   * @function_Name : verifyFAQSection
   * @Description : This method is used to verify FAQ section is displayed in the page
   * @params : None
   * @returns : None
   * */
  async verifyFAQSection() {
    let isFaqPresent = false;
    isFaqPresent = await page.locator(el.storeDetailsPage.lblSeoStoreFaqs).isVisible();
    if (isFaqPresent) {
      testReport.log(this.pageName, 'Verify FAQ section is displayed at the bottom of the page after SEO copy');
      expect(await page.locator(el.storeDetailsPage.lblSeoStoreFaqTitle).innerText()).not.toBeNull();
      page.locator(el.storeDetailsPage.lblSeoStoreFaqContent, { waitFor: 'visible' });
      testReport.log(this.pageName, 'FAQ is displayed at the bottom of the page after SEO copy');
    } else {
      testReport.log(this.pageName, 'FAQ section is not present for the store');
    }
  }

  async verifySeeStoreServices() {
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Verify See Store Services button is displayed');
    expect(await page.locator(el.storeDetailsPage.btnSeeStoreServices).innerText()).not.toBeNull();
    testReport.log(this.pageName, 'See Store Services button is displayed');
  }

  async clickOnSeeStoreServicesButton() {
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Click on See Store Services button');
    await page.locator(el.storeDetailsPage.btnSeeStoreServices).click();
    testReport.log(this.pageName, 'Clicked on See Store Services button');
  }

  async verifyServicesSection() {
    testReport.log(this.pageName, 'Verify Services section is displayed');
    let services = false;
    services = await page.locator(el.storeDetailsPage.servicesSection).isVisible();
    if (services) {
      testReport.log(this.pageName, 'Services section is displayed');
    } else {
      throw new Error('Services section is not displayed in Store details page');
    }
  }

  async verifyFreeDesignConsultation() {
    testReport.log(this.pageName, 'Verify Free Design Consultation is displayed');
    let isDesignHeader = false;
    let isDesignText = false;
    let isMeetLocally = false;
    let isMeetVirtually = false;
    isDesignHeader = await page.locator(el.storeDetailsPage.lblFreeDesignConsultation).isVisible();
    isDesignText = await page.locator(el.storeDetailsPage.txtFreeDesign).isVisible();
    isMeetLocally = await page.locator(el.storeDetailsPage.btnMeetLocally).isVisible();
    isMeetVirtually = await page.locator(el.storeDetailsPage.btnMeetVirtually).isVisible();
    if (isDesignHeader && isDesignText && isMeetLocally && isMeetVirtually) {
      testReport.log(this.pageName, 'Free Design Consultation section is displayed in the page');
    } else {
      throw new Error('Free Design Consultation is not displayed in the page');
    }
  }

  async verifyInStoreShoppingAppointment() {
    await page.waitForLoadState('load');
    testReport.log(this.pageName, 'Verify In Store Shopping Appointment is displayed');
    let isAppointmentHeader = false;
    let isAppointmentText = false;
    let isAppointmentBookNow = false;
    isAppointmentHeader = await page.locator(el.storeDetailsPage.lblInStoreShoppingAppointment).isVisible();
    isAppointmentText = await page.locator(el.storeDetailsPage.txtAppointment).isVisible();
    isAppointmentBookNow = await page.locator(el.storeDetailsPage.btnAppointmentBookNow).isVisible();
    if (isAppointmentHeader && isAppointmentText && isAppointmentBookNow) {
      testReport.log(this.pageName, 'In Store Shopping Appointment section is displayed in the page');
    } else {
      throw new Error('In Store Shopping Appointment section is not displayed in the page');
    }
  }

  async verifyPersonalShopper() {
    testReport.log(this.pageName, 'Verify Meet Virtually With a Personal Shopper is displayed');
    let isShopperHeader = false;
    let isShopperText = false;
    let isShopperBookNow = false;
    isShopperHeader = await page.locator(el.storeDetailsPage.lblPersonalShopper).isVisible();
    isShopperText = await page.locator(el.storeDetailsPage.txtPersonalShopper).isVisible();
    isShopperBookNow = await page.locator(el.storeDetailsPage.btnPersonalShopperBookNow).isVisible();
    if (isShopperHeader && isShopperText && isShopperBookNow) {
      testReport.log(this.pageName, 'Meet Virtually with a Personal Shopper section is displayed in the page');
    } else {
      throw new Error('Meet Virtually with a Personal Shopper section is not displayed in the page');
    }
  }

  async verifyStoreEvents() {
    testReport.log(this.pageName, 'Verify Store Events section is displayed');
    await expect(page.locator(el.storeDetailsPage.lblStoreEventsHeader)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.imgStoreEventsImage).nth(0)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.lblH2).nth(0)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.txtStoreEventsCopy).nth(0)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.btnBookYourAppnt).nth(0)).toBeVisible();
    testReport.log(this.pageName, 'Store Events section is displayed');
  }

  async verifyCareers() {
    testReport.log(this.pageName, 'Verify Careers section is displayed');
    await expect(page.locator(el.storeDetailsPage.lblCareers).nth(0)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.txtCareers).nth(0)).toBeVisible();
    await expect(page.locator(el.storeDetailsPage.lnkApplyNow).nth(0)).toBeVisible();
    testReport.log(this.pageName, 'Careers section is displayed');
  }
}

module.exports = { StoreDetailsPage };
