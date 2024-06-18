const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const credentialsFile = require('../../data-files/login-credentials.json');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const common = new CommonUtils();

const env = require('../../../../support/env/env');

class OrderTrackingPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'OrderTrackingPage';
    this.lblHeader = '.page-instructions > h1';
    this.lblDesc = 'div.page-instructions > p';
    this.lblOrderNum = "//label[@for='orderNumber']";
    this.lblEmail = "//label[@for='email']";
    this.lblContact = '.contact-store-msg > p';
    this.lblCreateAccountButtonsGroup = '.order-details-create-account-buttons';
    this.btnCreateAccountLink = '.create-account-link';
    this.hdrSignIn = '[class*=promote-sign-in-title]';
    this.msgSignInText = '.promote-sign-in-text';
    this.lnkResetPassword = '#forgot-password';
    this.lblsignInEmail = '[for=okta-signin-username]';
    this.txtSignInEmail = '#okta-signin-username';
    this.lblPassword = '[for=okta-signin-password]';
    this.txtPassword = '#okta-signin-password';
    this.btnSignIn = '#okta-signin-submit';
    this.btnAppleSignIn = '[class*=social-auth-apple-button]';
    this.btnGoogleSignIn = '[class*=social-auth-google-button]';
    this.msgSignInAgreement = '#sign-in-agreement-msg';
    this.lnkCreateAccount = '.create-account-link';
    this.lblFreeSwatch = 'h4.order-item-name';
    this.btnStartReturn = 'button[class*="start-a-return-link"]';
    this.lblOrderNumber = '.order-number .bold';
    this.lblOrderStatus = "(//div[contains(@class,'order-shipment-status')]/*[contains(@class,'status')])";
    this.lblTotalItems = '.order-items';
    this.lblDiscount = "li[class*='shipping-discount'] > .amount";
    this.btnExpandOrderSummaryMobile = "button[class*='plus-minus']";
    this.lblShipToName = "(//div[contains(@class,'shipment-address')]//div[contains(@class,'order-information')]/div[1])[1]";
    this.lblShipToAddress = "(//div[contains(@class,'shipment-address')]//div[contains(@class,'order-information')]/div[2])[1]";
    this.lblShipToCityState = "(//div[contains(@class,'shipment-address')]//div[contains(@class,'order-information')]/div[3])[1]";
    this.lblShipToPhone = "(//div[contains(@class,'shipment-address')]//div[contains(@class,'order-information')]/div[4])[1]";
    this.lblItemSku = "(//ul[@class='order-item-list']/li[1])";
    this.lblItemPrice = "(//ul[@class='order-item-list']/li[2])";
    this.lblItemQuantity = "(//ul[@class='order-item-list']/li[3])";
    this.lblItemTotal = "(//ul[@class='order-item-list']/li[4])";
    this.lnkItem = "(//div[@class='order-item-details']//a)";
    this.lblBillToName = "div[class*='bill-to-address'] > .order-information > div:nth-of-type(1)";
    this.lblBillToAddress = "div[class*='bill-to-address'] > .order-information > div:nth-of-type(2)";
    this.lblBillToCityState = "div[class*='bill-to-address'] > .order-information > div:nth-of-type(3)";
    this.lblBillToPhone = "div[class*='bill-to-address'] > .order-information > div:nth-of-type(4)";
    this.lblBillToPayment = "(//div[contains(@class,'order-bill-to')]//div[contains(@class,'order-payment')]//div//div)";
    this.lblTextUpdatesHeader = '.order-text-messaging-terms > * h2';
    this.lblTextUpdatesMobile = '.bops-label-text';
    this.lblTextUpdatesMobileCond = '.message';
    this.lblTextUpdatesTnC = "label[class*='terms-and-conditions-text']";
    this.txtTextUpdatesMobile = "input[id*='pickupPhone']";
    this.chkTextUpdatesTnC = "[type='checkbox']";
    this.btnTextUpdatesSubmit = 'div[class*=order-text-updates] >* button';
    this.lblOrderDate = '.order-date';
    this.lblPrivacyPolicy = '//*[@id="sign-in-agreement-msg"]';
    this.lblGreetingMsg = 'div.okta-sign-in-top h2';
    this.lnkResetPassword = '#forgot-password';
    this.lblPromotionTxt = 'div.promote-sign-in-text';
    this.txtPersonalizationText = '.personalization-text';
    this.txtPersonalizationFont = '.personalization-font';
    this.txtPersonalizationColor = '.personalization-color';
    this.txtPersonalizationMessage = '.personalization-message';
    this.txtMonogrammingFee = "//span[normalize-space()='Monogramming Fee:']";
  }

  /**
   * @function : clickOnOrderTrackingLink
   * @Description : Click on Order tracking link from the top banner icon
   * @Params: None
   * @Returns: none
   */

  /* async clickOnOrderTrackingLink() {
    await page.goto(`${env.BASE_URL}/account/order-tracking/`);
  } */

  goto = async () => {
    await page.goto(`${env.BASE_URL}/account/order-tracking/`);
  };

  async verifyOrderTrackingpage() {
    // verify the fields on order tracking page
    await expect(page.locator(this.lblHeader)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(this.lblHeader)).toHaveText(td.orderTrackingPage.header);
    await expect(page.locator(this.lblDesc)).toHaveText(td.orderTrackingPage.description);
    await expect(page.locator(this.lblOrderNum)).toHaveText(td.orderTrackingPage.orderNumber);
    await expect(page.locator(this.lblEmail)).toHaveText(td.orderTrackingPage.email);
    await expect(page.locator(this.lblContact)).toHaveText(td.orderTrackingPage.contact);
  }

  async enterOrderTrackingDetails(orderNumber, email) {
    await page.fill(el.orderTrackingPage.txtOrderNum, orderNumber);
    await page.fill(el.orderTrackingPage.txtEmail, email);
    await page.locator(el.orderTrackingPage.btnViewOrder).click();
    await page.waitForLoadState('load', { timeout: 60000 });
  }

  async verifyOrderSummaryDetails() {
    await expect(page.locator(this.lblOrderNumber)).toHaveText(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderNumber'));

    // validate order date
    let strOrderDate = common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderDate');
    strOrderDate = strOrderDate.substring(0, strOrderDate.indexOf('T'));

    const arr = strOrderDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[parseInt(arr[1], 10) - 1];
    let strDay = arr[2];
    if (strDay.charAt(0) === '0') strDay = strDay.charAt(1);
    strOrderDate = `Order Date: ${month} ${strDay}, ${arr[0]}`;
    await expect.soft(page.locator(this.lblOrderDate)).toHaveText(strOrderDate, { ignoreCase: true });
    testReport.log(this.pageName, 'Validated order number and date');

    // validate Order Summary details
    let merchandiseAmount = await page.innerText(el.orderDetails.lblMerchandiseAmount);
    merchandiseAmount = merchandiseAmount.replaceAll(',', '');
    if (env.EXEC_SITE.includes('us')) {
      expect(merchandiseAmount).toEqual(
        `$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.merchandiseAmount')) / 100).toFixed(2)}`
      );
      await expect(page.locator(el.orderDetails.lblShippingAmount)).toHaveText(
        `$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.shippingAndHandling')) / 100).toFixed(2)}`
      );
      if (await page.isVisible(this.lblDiscount))
        await expect(page.locator(this.lblDiscount)).toHaveText(
          `-$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.shippingDiscount')) / 100).toFixed(2)}`
        );
      await expect(page.locator(el.orderDetails.lblTax)).toHaveText(
        `$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.tax')) / 100).toFixed(2)}`
      );
    } else {
      expect(merchandiseAmount).toEqual(
        `CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.merchandiseAmount')) / 100).toFixed(2)}`
      );
      await expect(page.locator(el.orderDetails.lblShippingAmount)).toHaveText(
        `CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.shippingAndHandling')) / 100).toFixed(2)}`
      );
      if (await page.isVisible(this.lblDiscount))
        await expect(page.locator(this.lblDiscount)).toHaveText(
          `-CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.shippingDiscount')) / 100).toFixed(2)}`
        );
      await expect(page.locator(el.orderDetails.lblTax)).toHaveText(
        `CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.tax')) / 100).toFixed(2)}`
      );
    }

    if (common.verifyIsMobile()) {
      let orderTotalMobile = await page.locator(el.orderDetails.lblOrderTotalMobile).textContent();
      orderTotalMobile = orderTotalMobile.replaceAll(',', '');
      await page.locator(this.btnExpandOrderSummaryMobile).click();
      if (env.EXEC_SITE.includes('us'))
        // eslint-disable-next-line playwright/prefer-web-first-assertions
        expect(orderTotalMobile).toEqual(`$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.totalAmount')) / 100).toFixed(2)}`);
      else {
        // eslint-disable-next-line playwright/prefer-web-first-assertions
        expect(orderTotalMobile).toEqual(`CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.totalAmount')) / 100).toFixed(2)}`);
      }
    } else {
      let orderTotal = await page.locator(el.orderDetails.lblOrderTotal).textContent();
      orderTotal = common.replaceAll(orderTotal, ',', '');

      if (env.EXEC_SITE.includes('us')) {
        // eslint-disable-next-line playwright/prefer-web-first-assertions
        expect(orderTotal).toEqual(`$${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.totalAmount')) / 100).toFixed(2)}`);
      } else {
        // eslint-disable-next-line playwright/prefer-web-first-assertions
        expect(orderTotal).toEqual(`CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.orderSummary.totalAmount')) / 100).toFixed(2)}`);
      }
    }
    testReport.log(this.pageName, 'Validated Order Summary section');

    // Validate ship to details
    const shipToFirstName = common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.firstName');
    const shipToMiddleInitial = common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.middleInitial');
    const shipToLastName = common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.lastName');

    let strShipToName = shipToFirstName;
    if (shipToMiddleInitial.length > 0) strShipToName += ' ';
    strShipToName = `${strShipToName} ${shipToLastName}`;
    await expect(page.locator(this.lblShipToName)).toHaveText(strShipToName, { ignoreCase: true });

    let strShipToAddress = common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.addressLines');
    strShipToAddress = strShipToAddress.toString().replaceAll(',', '');
    await expect(page.locator(this.lblShipToAddress)).toHaveText(strShipToAddress, { ignoreCase: true });

    if (env.EXEC_SITE.includes('us')) {
      const strShipToCityState = `${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.city')}, ${common.readJSONValue(
        env.CMN_API_RESPONSE,
        'order.recipients.0.shipTo.state'
      )} ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.zip')}`;
      await expect(page.locator(this.lblShipToCityState)).toHaveText(strShipToCityState, { ignoreCase: true });
    } else {
      let strShipToCityState = `${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.city')}, ${common.readJSONValue(
        env.CMN_API_RESPONSE,
        'order.recipients.0.shipTo.state'
      )} ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.zip')}`;
      strShipToCityState = strShipToCityState.replaceAll(' ', '');
      let strShipAddress = await page.locator(this.lblShipToCityState).innerText();
      strShipAddress = strShipAddress.replaceAll(' ', '');
      expect(strShipToCityState.toLowerCase()).toEqual(strShipAddress.toLowerCase());
    }
    const strShiptoPhone = `Phone: (${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.phoneAreaCode1')}) ${common.readJSONValue(
      env.CMN_API_RESPONSE,
      'order.recipients.0.shipTo.phonePrefix1'
    )}-${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.shipTo.phoneLineNumber1')}`;
    await expect(page.locator(this.lblShipToPhone)).toHaveText(strShiptoPhone, { ignoreCase: true });
    testReport.log(this.pageName, 'Validated Ship To details');

    // validate Item details - Parcel item
    const strItemLink1 = await page.getAttribute(`${this.lnkItem}[1]`, 'href');
    expect(strItemLink1).toContain(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.sku'));
    await expect(page.locator(`${this.lblItemSku}[1]`)).toHaveText(
      `SKU: ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.sku')}`,
      { ignoreCase: true }
    );
    if (env.EXEC_SITE.includes('us')) {
      await expect(page.locator(`${this.lblItemPrice}[1]`)).toHaveText(
        `Price: $${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.price')) / 100).toFixed(2)}`
      );
      await expect(page.locator(`${this.lblItemTotal}[1]`)).toHaveText(
        `Total: $${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.totalPrice')) / 100).toFixed(2)}`
      );
    } else {
      await expect(page.locator(`${this.lblItemPrice}[1]`)).toHaveText(
        `Price: CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.price')) / 100).toFixed(2)}`
      );
      await expect(page.locator(`${this.lblItemTotal}[1]`)).toHaveText(
        `Total: CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.totalPrice')) / 100).toFixed(2)}`
      );
    }
    await expect(page.locator(`${this.lblItemQuantity}[1]`)).toHaveText(
      `Quantity: ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.parcel.openProducts.0.quantity')}`,
      { ignoreCase: true }
    );

    testReport.log(this.pageName, 'Validated parcel item details');

    // Validate Item details - Delivery item
    const strItemLink2 = await page.getAttribute(`${this.lnkItem}[2]`, 'href');
    let itemPrice = await page.innerText(`${this.lblItemPrice}[2]`);
    itemPrice = itemPrice.replaceAll(',', '');
    let itemTotal = await page.innerText(`${this.lblItemTotal}[2]`);
    itemTotal = itemTotal.replaceAll(',', '');
    expect(strItemLink2).toContain(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.sku'));
    await expect(page.locator(`${this.lblItemSku}[2]`)).toHaveText(
      `SKU: ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.sku')}`,
      { ignoreCase: true }
    );
    if (env.EXEC_SITE.includes('us')) {
      expect(itemPrice).toEqual(
        `Price: $${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.price')) / 100).toFixed(2)}`
      );
      expect(itemTotal).toEqual(
        `Total: $${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.totalPrice')) / 100).toFixed(2)}`
      );
    } else {
      expect(itemPrice).toEqual(
        `Price: CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.price')) / 100).toFixed(2)}`
      );
      expect(itemTotal).toEqual(
        `Total: CAD ${(parseFloat(common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.totalPrice')) / 100).toFixed(2)}`
      );
    }
    await expect(page.locator(`${this.lblItemQuantity}[2]`)).toHaveText(
      `Quantity: ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.recipients.0.delivery.openProducts.0.quantity')}`,
      { ignoreCase: true }
    );

    testReport.log(this.pageName, 'Validated delivery item details');

    // Validate bill to and payment method
    const billToFirstName = common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.firstName');
    const billToMiddleInitial = common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.middleInitial');
    const billToLastName = common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.lastName');

    let strBillToName = billToFirstName;
    if (billToMiddleInitial.length > 0) strBillToName += ' ';
    strBillToName = `${strBillToName} ${billToLastName}`;
    await expect(page.locator(this.lblBillToName)).toHaveText(strBillToName, { ignoreCase: true });

    let strBillToAddress = common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.addressLines');
    strBillToAddress = strBillToAddress.toString().replaceAll(',', '');
    await expect(page.locator(this.lblBillToAddress)).toHaveText(strBillToAddress, { ignoreCase: true });

    if (env.EXEC_SITE.includes('us')) {
      const strBillToCityState = `${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.city')}, ${common.readJSONValue(
        env.CMN_API_RESPONSE,
        'order.billTo.state'
      )} ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.zip')}`;
      await expect(page.locator(this.lblBillToCityState)).toHaveText(strBillToCityState, { ignoreCase: true });
    } else {
      let strBillToCityState = `${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.city')}, ${common.readJSONValue(
        env.CMN_API_RESPONSE,
        'order.billTo.state'
      )} ${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.zip')}`;
      strBillToCityState = strBillToCityState.replaceAll(' ', '');
      let strBillAddress = await page.locator(this.lblBillToCityState).innerText();
      strBillAddress = strBillAddress.replaceAll(' ', '');
      expect(strBillAddress.toLowerCase()).toEqual(strBillToCityState.toLowerCase());
    }
    const strBilltoPhone = `Phone: (${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.phoneAreaCode1')}) ${common.readJSONValue(
      env.CMN_API_RESPONSE,
      'order.billTo.phonePrefix1'
    )}-${common.readJSONValue(env.CMN_API_RESPONSE, 'order.billTo.phoneLineNumber1')}`;
    await expect(page.locator(this.lblBillToPhone)).toHaveText(strBilltoPhone, { ignoreCase: true });

    if (await page.isVisible(this.lblBillToPayment)) {
      const strPaymentMethod = `${common.readJSONValue(env.CMN_API_RESPONSE, 'order.paymentSummary.payments.0.paymentMethod')} ****${common.readJSONValue(
        env.CMN_API_RESPONSE,
        'order.paymentSummary.payments.0.documentNumber'
      )}`;
      await expect(page.locator(`${this.lblBillToPayment}[1]`)).toHaveText(strPaymentMethod, { ignoreCase: true });
      testReport.log(this.pageName, 'Validated Bill To and Payment details');
    }
  }

  async verifyCreateAccountArea() {
    await expect(page.locator(this.lblCreateAccountButtonsGroup)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(this.btnCreateAccountLink)).toHaveText('Create Account');
  }

  async clickOnCreateAccountButton() {
    await page.click(this.btnCreateAccountLink);
  }

  /**
   * @author: sreerag
   * @function_Name : verifySignInArea
   * @Description : Verify sign in section is displayed in order tracking page
   * @params : none
   * @returns : None
   * */
  async verifySignInArea() {
    await expect(page.locator(this.hdrSignIn)).toBeVisible({ timeout: 30000 });
    await expect(page.locator(this.hdrSignIn)).toContainText('Welcome back,');
    await expect(page.locator(this.msgSignInText)).toHaveText(env.ACNT_SIGNIN_MSG);
    await expect(page.locator(this.lnkResetPassword)).toBeVisible();
    await expect(page.locator(this.lblsignInEmail)).toHaveText('Email');
    await expect(page.locator(this.txtSignInEmail)).toBeVisible();
    await expect(page.locator(this.lblPassword)).toHaveText('Password');
    await expect(page.locator(this.txtPassword)).toBeVisible();
    await expect(page.locator(this.btnSignIn)).toHaveAttribute('value', 'Sign In');
    await expect(page.locator(this.btnAppleSignIn), 'Sign in with Apple').toBeVisible();
    await expect(page.locator(this.btnGoogleSignIn), 'Sign in with Google').toBeVisible();
    await expect(page.locator(this.msgSignInAgreement)).toHaveText(td.orderTrackingPage.signInAgreement);
    await expect(page.locator(this.lnkCreateAccount)).toHaveText(td.orderTrackingPage.createAccount);
  }

  /**
   * @author: sreerag
   * @function_Name : verifyPrePopulatedEmail
   * @Description : Verify email address of last logged in user is getting displayed in email textbox in order tracking page
   * @params : none
   * @returns : None
   * */
  async verifyPrePopulatedEmail(scenario) {
    await expect(page.locator(el.orderTrackingPage.txtEmail)).toBeVisible();
    const filter = credentialsFile.filter((element) => element.Type === scenario);
    if (filter.length === 1) {
      await expect(page.locator(this.txtSignInEmail)).toHaveValue(filter[0].Email, { delay: 100 });
      testReport.log(this.pageName, 'Prepopulated email verified');
    } else if (filter.lenght === 0) {
      testReport.log(this.pageName, 'Invalid Scenario');
    } else {
      testReport.log(this.pageName, 'Duplicate scenario exists in Login Crededntials file');
    }
  }

  /**
   * @author: sreerag
   * @function_Name : enterPassword
   * @Description : Enter password of the account in password textbox in order tracking page
   * @params : scenario
   * @returns : None
   * */
  async enterPassword(scenario) {
    await expect(page.locator(this.txtPassword)).toBeVisible();
    const filter = credentialsFile.filter((element) => element.Type === scenario);
    if (filter.length === 1) {
      await page.fill(this.txtPassword, filter[0].Password, { delay: 100 });
      testReport.log(this.pageName, `Entered password of account${scenario}`);
    } else if (filter.lenght === 0) {
      testReport.log(this.pageName, 'Invalid Scenario');
    } else {
      testReport.log(this.pageName, 'Duplicate scenario exists in Login Crededntials file');
    }
  }

  /**
   * @author: sreerag
   * @function_Name : clickOnSignInButton
   * @Description : click on sign in button in order tracking page
   * @params : None
   * @returns : None
   * */
  async clickOnSignInButton() {
    await expect(page.locator(this.hdrSignIn)).toBeVisible({ timeout: 30000 });
    await page.locator(this.btnSignIn).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 120000 });
    await expect(page.locator('h1 >> text=Orders')).toBeVisible({ timeout: 90000 });
    testReport.log(this.pageName, 'clicked on SignIn button');
    expect(page.url({ timeout: 60000 })).toContain(env.BASE_URL);
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  /**
   * @author: krishna
   * @function_Name : verifyStartReturnLink
   * @Description : verify whether start return link is displayed
   * @params : None
   * @returns : None
   * */
  async verifyStartReturnLink() {
    await expect(page.locator(this.btnStartReturn)).toBeVisible();
    testReport.log(this.pageName, 'Start return link is displayed as expected');
  }

  /**
   * @author: krishna
   * @function_Name : clickOnStartReturnLink
   * @Description : click on start return link and verify whether the narvar page is displayed
   * @params : None
   * @returns : None
   * */
  async clickOnStartReturnLink() {
    const [newPage] = await Promise.all([global.context.waitForEvent('page'), page.locator(this.btnStartReturn).click()]);
    await newPage.waitForLoadState('load', { timeout: 60000 });
    await expect(newPage).toHaveURL(new RegExp(td.narvarReturns.narvarURL));
    testReport.log('Narvar Returns', 'Narvar Returns page opened in new window');
    await expect(newPage.locator(el.narvarPage.lblItemTitle)).toContainText(env.ACNT_RETURN_ITEMTITLE);
    await expect(newPage.locator(el.narvarPage.lblItemSku)).toContainText(env.ACNT_RETURN_ITEMSKU);
    await expect(newPage.locator(el.narvarPage.lblItemLocation)).toContainText(env.ACNT_RETURN_ITEMLOCATION);
    await expect(newPage.locator(el.narvarPage.lblItemPrice)).toContainText(env.ACNT_RETURN_ITEMPRICE);
    await expect(newPage.locator(el.narvarPage.lblItemQty)).toContainText(env.ACNT_RETURN_ITEMQTY);
    testReport.log('Narvar Returns', 'Order details are displayed as expected');
    await newPage.close();
  }
}

module.exports = new OrderTrackingPage();
