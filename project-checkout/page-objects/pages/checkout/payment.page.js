const { expect } = require('@playwright/test');
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const { ReportUtils } = require('../../../../support/utils/report-utils');
const elements = require('../../elements/elements');

const testReport = new ReportUtils();
const testData = require('../../datafiles/testdata');
const env = require('../../../../support/env/env');
const { timeout } = require('../../../../configs/config');
// eslint-disable-next-line import/no-restricted-paths
const { ShippingPage } = require('./shipping.page');

const shipping = new ShippingPage();

const { getAddressData } = require('../../../helpers/data-dictionary');

// let paymentInfo = [];
// const payment = {};
// const tenderItem = [];
// const tender = {};
const billingInfo = [];
// const billingAddress = {};
const rewardInfo = {};
const TenderCodeGiftRewards = {};
const ShopCardInfo = '';
class PaymentPage {
  pageName = this.constructor.name;

  // need to code
  async verifyBillingPageHeader() {
    // to be coded
  }

  async enterPaymentAndProceedToReview(cardType) {
    await this.selectCreditCardAsPaymentMethod();
    await this.populateCreditCardForm(cardType);
    await this.applyNewCreditCard();
  }

  /**
   * @author: asoman
   * @function_Name : selectCreditCardAsPaymentMethod
   * @Description : To select the radio button for creditcard payment
   * @params : None
   * @returns : None
   * */

  async selectCreditCardAsPaymentMethod() {
    await expect(page.locator(elements.paymentPage.btnSelectCreditCardAsPayment)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnSelectCreditCardAsPayment);
    testReport.log(this.pageName, 'Selected CreditCards as payment mode');
  }

  /**
   * @author: asoman
   * @function_Name : selectPayPalAsPaymentMethod
   * @Description : To select paypal as payment and authorize
   * @params : None
   * @returns : None
   * */
  async selectPayPalAsPaymentMethod() {
    await page.getByText('Other Payment Methods').click();
    await expect(page.locator('button[aria-controls="paypal-pay"]')).toBeVisible({ timeout });
    if (!env.EXEC_SITE.includes('can')) {
      await expect(page.locator('button[aria-controls="venmo-pay"]')).toBeVisible({ timeout });
    }
    await page.locator('button[aria-controls="paypal-pay"]').click();
    await expect(page.locator('button[aria-controls="paypal-pay"] > div').nth(0)).toHaveText('PayPal');
    await expect(page.locator('.payment-paypal > p').nth(0)).toHaveText(
      'You will have an opportunity to review your order after logging in to your PayPal account.'
    );

    // eslint-disable-next-line playwright/no-element-handle
    const elementHandle = await page.$('button[aria-controls="paypal-pay"]');
    const content = await elementHandle.evaluateHandle((element) => {
      const pseudo = window.getComputedStyle(element, '::after');
      return pseudo.getPropertyValue('content');
    });

    let isPayPalAuthSuccessImgPresent = false;
    const imgUrlCheckMark = await content.jsonValue();
    if (imgUrlCheckMark.includes('check-mark-success')) {
      isPayPalAuthSuccessImgPresent = true;
      testReport.log(this.pageName, `isPayPalAuthSuccessImgPresent${isPayPalAuthSuccessImgPresent}`);
    }

    const payPalFrame = page.frameLocator('[title="PayPal"]').nth(0);
    const [newWindow] = await Promise.all([page.waitForEvent('popup'), payPalFrame.locator('.paypal-button-label-container').nth(0).click()]);
    testReport.log(this.pageName, newWindow.url());
    await newWindow.getByPlaceholder('Email or mobile number').isVisible();
    await newWindow.getByRole('img', { name: 'PayPal Logo' }).isVisible();
    await newWindow.getByPlaceholder('Email or mobile number').isVisible();
    await newWindow.getByPlaceholder('Email or mobile number').fill(env.PAYPAL_TEST_USRID);
    await newWindow.locator('#signupContainer div').isVisible();
    await newWindow.getByRole('button', { name: 'Next' }).click();
    await newWindow.getByPlaceholder('Password').click();
    await newWindow.getByPlaceholder('Password').fill(env.PAYPAL_TEST_PWD);
    await newWindow.getByRole('button', { name: 'Log In' }).click();
    await newWindow.locator('[data-testid="consentButton"]').click();
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * @author: asoman
   * @function_Name : isPayPalUsedAsPaymentMethod
   * @Description : To verify successful paypal auth checking green tick
   * @params : None
   * @returns : None
   * */
  async isPayPalUsedAsPaymentMethod() {
    let isPayPalAuthSuccessImgPresent = false;
    await common.forcedWait(this.pageName, 10000);
    // await page.waitForLoadState('networkidle', { timeout: 20000 });
    const paypalButtonCount = await page.locator('button[aria-controls="paypal-pay"]').count();
    // eslint-disable-next-line playwright/no-element-handle
    const elementHandle = await page.$('button[aria-controls="paypal-pay"]');
    if (paypalButtonCount > 0) {
      const content = await elementHandle.evaluateHandle((element) => {
        const pseudo = window.getComputedStyle(element, '::after');
        return pseudo.getPropertyValue('content');
      });

      const imgUrlCheckMark = await content.jsonValue();
      if (imgUrlCheckMark.includes('check-mark-success')) {
        isPayPalAuthSuccessImgPresent = true;
      }
      if (isPayPalAuthSuccessImgPresent) {
        const lblPayPalSuccessMessage = await page.locator('.payment-paypal > p').first().textContent();
        expect(lblPayPalSuccessMessage).toContain('You are paying with PayPal.');
      }
    }

    return isPayPalAuthSuccessImgPresent;
  }

  /**
   * @author: asoman
   * @function_Name : verifyPayPalSuccess
   * @Description : To verify successful paypal auth checking green tick
   * @params : None
   * @returns : None
   * */
  async verifyPayPalBillingAddrress() {
    // todo block
  }

  /**
   * @author: asoman
   * @function_Name : populateCreditCardForm
   * @Description : To fill the creditcard form with card num, expiry, cvv based on card type input
   * @params : card type
   * @returns : None
   * */

  async populateCreditCardForm(cardType) {
    testReport.log(this.pageName, `Populate CreditCard Information for${cardType}`);
    await expect(page.locator(elements.paymentPage.txtCreditCardNumber)).toBeVisible({ timeout });
    await this.creditCardFormFilling(cardType);
    /*
        if (cardType == 'PLCC' || cardType == 'CoBrandCBCC') {
            this.verifyRedeemRewardCertificateAmount();
        }
        */
  }

  async checkIfCardNeedsToBeVerified() {
    const txtVerifyCardCount = await page.locator('label[for^="txtVerifyCard"]').count();
    testReport.log(this.pageName, `verify card displayed - ${txtVerifyCardCount} occurance`);
    /*
    if (txtVerifyCardCount > 0) {
      await page.locator('#txtVerifyCard').fill('5454545454545454');
      await page.getByTestId('credit-card-form-security-code-input').fill('123');
      await page.locator('#applyVerifyCard').click();
    }
    */
  }

  /**
   * @author: FAgudelo
   * @function_Name : verifyCreditCardSaved
   * @Description : Looks at the account saved cards and verifies the cardType with testData values exists.
   * @params : cardType, ie, 'Visa',' MasterCard', etc
   * @returns : None
   * */

  async verifyCreditCardSaved(cardType) {
    testReport.log(this.pageName, `Check saved credit cards for added ${cardType}`);
    await expect(page.locator(elements.paymentPage.arrayCreditCards)).toBeVisible({ timeout });
    const creditCardInfo = this.getCreditCardByType(cardType);
    const creditCardText = `${cardType} ***${creditCardInfo.cardNum.substring(creditCardInfo.cardNum.length - 4)}`;

    const arrayCreditCards = await common.getElementHandlesArray(elements.paymentPage.arrayCreditCards);
    testReport.log(`Checking ${arrayCreditCards.length} entries for "${creditCardText}"`);
    let isFound = false;
    await Promise.all(
      arrayCreditCards.map(async (ele, i) => {
        const ccText = await page.locator('.card-number').nth(i).textContent();
        if (ccText === creditCardText) {
          testReport.log(`Found credit card for ${cardType}`);
          isFound = true;
        }
      })
    );
    expect(isFound).toBeTruthy();
  }

  getCreditCardByType(cardType) {
    let creditCardInfo;

    switch (cardType) {
      case 'Visa':
        [creditCardInfo] = testData.creditCards.visa;
        break;
      case 'MasterCard':
        [creditCardInfo] = testData.creditCards.masterCard;
        break;
      case 'Discover':
        [creditCardInfo] = testData.creditCards.discover;
        break;
      case 'ChinaUnionPay':
        [creditCardInfo] = testData.creditCards.chinaUnionPay;
        break;
      case 'JCB':
        [creditCardInfo] = testData.creditCards.JCB;
        break;
      case 'Diners':
        [creditCardInfo] = testData.creditCards.diners;
        break;
      case 'AmericanExpress':
        [creditCardInfo] = testData.creditCards.americanExpress;
        break;
      case 'C&B/CB2 CC':
        [creditCardInfo] = testData.creditCards.plccCBCC;
        break;
      case 'C&B/CB2 MC':
        [creditCardInfo] = testData.creditCards.coBrandCBCC;
        break;
      case 'PLCCWithReward':
        [creditCardInfo] = testData.creditCards.plccCBCCwithReward;
        break;
      default:
        [creditCardInfo] = testData.creditCards.visa;
    }

    return creditCardInfo;
  }

  /**
   * @author: asoman
   * @function_Name : isRequestedCardMatcheswithSelectedCard
   * @Description : To verify the requested card type and displayed card is the same or not
   * @params : card type provided in the feature file
   * @returns : None
   * */
  async isRequestedCardMatcheswithSelectedCard(requestedCardType) {
    const isSelectedCardVisible = await page.locator(elements.paymentPage.lblSelectedCardType).isVisible();
    if (isSelectedCardVisible) {
      const strDefaultCreditCardSelected = await page.locator(elements.paymentPage.lblSelectedCardType).textContent();
      testReport.log(this.pageName, `Default credit card displayed in payment page --> ${strDefaultCreditCardSelected}`);
      let blnIsRequestedCardMatcheswithSelectedCard = false;
      if (strDefaultCreditCardSelected.includes(requestedCardType)) {
        blnIsRequestedCardMatcheswithSelectedCard = true;
      }
      return blnIsRequestedCardMatcheswithSelectedCard;
    }
    return false;
  }

  /**
   * @author: asoman
   * @function_Name : selectCardFromSavedPayment
   * @Description : to select a saved card from the change card popup(saved payments) for returning user
   * @params : card type provided in the feature file
   * @returns : None
   * */
  async selectCardFromSavedPayment(requestedCardType) {
    await page.locator('label').filter({ hasText: requestedCardType }).click();
    // const cardInfoList = await page.locator('.card-number');
    const selectedCardFromSavedPayment = await page.locator('label').filter({ hasText: requestedCardType }).textContent();
    await page.locator(elements.paymentPage.btnUpdatePayment).click();
    await testReport.log(this.pageName, selectedCardFromSavedPayment);
    return selectedCardFromSavedPayment;
  }

  /**
   * @author: asoman
   * @function_Name : selectMultipleCreditCards
   * @Description : to select multiple saved card from the change card popup(saved payments) for returning user
   * @params : cards provided in the feature file (card 1 and card 2)
   * @returns : None
   * */
  async selectMultipleCreditCards(cardFirst, cardSecond) {
    const cardListEle = await common.getElementHandlesArray('.a11y-checkbox-label.card-label');
    const preSelectedCardList = await common.getElementHandlesArray('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card');
    let preSelectedCardListCount = await page.locator('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card').count();
    testReport.log(this.pageName, `selectedCardListCount before start unchecking -> ${preSelectedCardListCount}`);
    // uncheck selected cards

    //  await common.capturePageScreenshot('card_popup_before_uncheck');
    await Promise.all(
      preSelectedCardList.map(async (ele, i) => {
        // for (let i = 0; i < preSelectedCardListCount; i++) {
        await page.locator('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card').nth(i).click();
      })
    );

    preSelectedCardListCount = await page.locator('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card').count();
    testReport.log(this.pageName, `selectedCardListCount after unchecking -> ${preSelectedCardListCount}`);

    // select first card requested in the input
    await Promise.all(
      cardListEle.map(async (ele, i) => {
        const cardEle = page.locator('.a11y-checkbox-label.card-label').nth(i);
        const card = await cardEle.textContent();
        testReport.log(this.pageName, `Cards to be selected - ${cardFirst}`);
        if (card.includes(cardFirst)) {
          testReport.log(this.pageName, `Selecting first card -${i}`);
          await cardEle.click();
          testReport.log(this.pageName, `First card selected by clicking on checkbox`);
        }
      })
    );

    // select second card requested in the input
    await Promise.all(
      cardListEle.map(async (ele, i) => {
        const cardEle = page.locator('.a11y-checkbox-label.card-label').nth(i);
        const card = await cardEle.textContent();
        testReport.log(this.pageName, `Cards to be selected - ${cardSecond}`);
        if (card.includes(cardSecond)) {
          testReport.log(this.pageName, `Selecting second card -${i}`);
          await cardEle.click();
          testReport.log(this.pageName, `Second card selected by clicking on checkbox`);
        }
      })
    );

    const selectedCardsJsonArray = [];
    const selectedCardList = await common.getElementHandlesArray('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card');

    await Promise.all(
      selectedCardList.map(async (ele, i) => {
        const cardJson = {};
        const selectedCardType = await page.locator('.col-xs-12.saved-card-list.applied-credit-card-block.selected-card').nth(i).textContent();

        const selectedCard = await page.locator('label').filter({ hasText: selectedCardType }).textContent();
        // expect(selectedCard).toContain([cardFirst, cardSecond])

        const cArray = selectedCard.split('Expires: ', 2);
        const savedExpiryDate = cArray[1];
        const selectedPaymentText = cArray[0];

        cardJson.cardType = selectedPaymentText;
        cardJson.expiryDate = savedExpiryDate;

        selectedCardsJsonArray.push(cardJson);
      })
    );
    testReport.log(this.pageName, selectedCardsJsonArray);
    expect(selectedCardsJsonArray.length).toEqual(2);
    testReport.log(this.pageName, `Cards Selected- ${selectedCardsJsonArray.length} opted, => ${selectedCardsJsonArray}`);
    await page.locator(elements.paymentPage.btnUpdatePayment).click();
    return selectedCardsJsonArray;
  }

  async verifySelectedCreditCard(requestedCardType, selectedPaymentText) {
    testReport.log(this.pageName, `selectedPaymentText- ${selectedPaymentText}`);

    const creditCardSelectedElements = await common.getElementHandlesArray(elements.paymentPage.lblSelectedCardType);
    const creditCardSelectedCount = await page.locator(elements.paymentPage.lblSelectedCardType).count();

    // for (let i = 0; i < creditCardSelectedCount; i++) {
    await Promise.all(
      creditCardSelectedElements.map(async (ele, i) => {
        let selectedCardType = await page.locator(elements.paymentPage.lblSelectedCardType).nth(i).textContent();
        // selectedCardType = selectedCardType.replace(/[^a-z]/gi, '');
        selectedCardType = selectedCardType.substr(0, selectedCardType.length - 8);
        expect(requestedCardType).toContain(selectedCardType);
        // const expiryTxt = await page.locator('.expire-date').nth(i).textContent();
        if (creditCardSelectedCount > 1) {
          await page.locator('.card-amount > div > input').nth(i).inputValue();
        }
      })
    );
  }

  async clickPayWith2CreditCards() {
    await expect(page.locator(elements.paymentPage.lnkPayWith2CreditCards)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.lnkPayWith2CreditCards);
    testReport.log(this.pageName, 'Opted to Pay with 2 CreditCards from the List');
  }

  async populateMultipleCreditCardAmt(dolarAmt) {
    await page.fill(elements.paymentPage.txtAmountSecondCard, dolarAmt, { delay: 100 });
  }

  async verifyRedeemRewardCertificateAmount() {
    await expect(page.locator(elements.paymentPage.totalRewardCertificatesAmount)).toBeVisible({ timeout });
    const totalRewardAmount = await page.innerText(elements.paymentPage.totalRewardCertificatesAmount);
    expect(totalRewardAmount).toContain('$0.00');
    await page.click(elements.paymentPage.redeemRewardsPlusIcon);
    await expect(page.locator(elements.paymentPage.enterRewardLink)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.enterRewardLink);
    await expect(page.locator(elements.paymentPage.rewardCertificateNoTxt)).toBeVisible({ timeout });
    await page.fill(elements.paymentPage.rewardCertificateNoTxt, testData.rewardCertificates.rewardCertificateNo);
    await page.click(elements.paymentPage.redeemRewardApplybutton);
    testReport.log(this.pageName, 'Applied Rewards Certificates');
  }

  async verifyRewards() {
    await page.waitForLoadState('load');
    await expect(page.locator(elements.paymentPage.rewardSubTitle)).toBeVisible({ timeout });
    const rewardTitle = await page.innerText(elements.paymentPage.rewardTitle);
    expect(rewardTitle.toLowerCase()).toContain('rewards');
    await expect(page.locator(elements.paymentPage.rewardTitleTooltip)).toBeVisible({ timeout });
    const rewardDescription = await page.innerText(elements.paymentPage.rewardDescription);
    if (env.EXEC_SITE.toLowerCase().includes('cb2'))
      expect(rewardDescription).toContain(
        'For validation purposes you must use your Crate and Barrel or CB2 credit card to redeem Rewards Dollars. Multiple Rewards Dollars can be applied per transaction.'
      );
    else
      expect(rewardDescription).toContain(
        'For validation purposes you must use your Crate & Barrel or CB2 credit card to redeem Rewards Dollars. Multiple Rewards Dollars can be applied per transaction.'
      );
    const rewardSubTitle = await page.innerText(elements.paymentPage.rewardSubTitle);
    expect(rewardSubTitle).toContain('Redeem Rewards');
    const rewardSubTitleTxt = await page.innerText(elements.paymentPage.rewardSubTitleTxt);
    expect(rewardSubTitleTxt).toContain('Total Reward Certificates:');
    await expect(page.locator(elements.paymentPage.redeemRewardsPlusIcon)).toBeVisible({ timeout });
    const rewardsDrawerState = await page.locator(elements.paymentPage.redeemRewardsPlusIcon).getAttribute('aria-expanded');
    if (rewardsDrawerState === 'false') {
      await page.click(elements.paymentPage.redeemRewardsPlusIcon);
      await testReport.log(this.pageName, `Rewards drawer opened`);
    }
    await expect(page.locator(elements.paymentPage.enterRewardLink)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.enterRewardLink);

    // await page.waitForLoadState('networkidle', { timeout: 50000 });
    await expect(page.locator(elements.paymentPage.rewardCertificateNoTxt)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.redeemRewardApplyPromoButton)).toBeVisible({ timeout });
  }

  async applyReward() {
    const redeemRewardCardDetails = await page.innerText(elements.paymentPage.redeemRewardCardDetails);
    if (redeemRewardCardDetails) {
      let cardDetails = redeemRewardCardDetails.replace('Reward ***', '');
      // eslint-disable-next-line prefer-destructuring
      cardDetails = cardDetails.split(':')[0];
      rewardInfo.card = cardDetails;
      TenderCodeGiftRewards.Reward = cardDetails;
    }
    expect(redeemRewardCardDetails).toContain('Reward ***');
    await page.click(elements.paymentPage.redeemRewardCardApplyButton);
    await page.waitForLoadState('load');
    // await page.waitForLoadState('networkidle', { timeout: 20000 });
    const appliedSuccess = await page.locator(elements.paymentPage.rewardAppliedState).isVisible();
    if (appliedSuccess) {
      await expect(page.locator(elements.paymentPage.rewardAppliedState)).toBeVisible({ timeout });
      await expect(page.locator(elements.paymentPage.rewardAppliedState)).toHaveText('Applied');
      await expect(page.locator(elements.paymentPage.rewardAppliedStateRemove)).toBeVisible({ timeout });
    }
  }

  async applyMultipleRewards() {
    const rewardsList = [];
    const applyRewardList = await common.getElementHandlesArray(elements.paymentPage.redeemRewardCardAllApplyButton);
    const rewardsLimitList = applyRewardList.length > 2 ? applyRewardList.slice(0, 2) : applyRewardList;
    await testReport.log(rewardsLimitList.length);
    await Promise.all(
      rewardsLimitList.map(async (ele, i) => {
        // await page.waitForLoadState('networkidle', { timeout: 5000 });
        const redeemRewardCardDetails = await page.locator(elements.paymentPage.redeemRewardCardAllDetails).nth(i).textContent();
        await testReport.log(this.pageName, `Redeemed reward card detail : ${redeemRewardCardDetails}`);
        if (redeemRewardCardDetails) {
          let cardDetails = redeemRewardCardDetails.replace('Reward ***', '');
          // eslint-disable-next-line prefer-destructuring
          cardDetails = cardDetails.split(':')[0];
          rewardInfo.card = cardDetails;
          rewardsList.push(cardDetails);
        }
        expect(redeemRewardCardDetails).toContain('Reward ***');

        // await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator(elements.paymentPage.redeemRewardCardAllApplyButton).nth(i).click();
      })
    );
    await page.waitForLoadState('load');
    // for (let i = 0; i < rewardsLimitList; i++) {
    //   const redeemRewardCardDetails = await page.locator(elements.paymentPage.redeemRewardCardAllDetails).nth(i).textContent();
    //   if (redeemRewardCardDetails) {
    //     let cardDetails = redeemRewardCardDetails.replace('Reward ***', '');
    //     // eslint-disable-next-line prefer-destructuring
    //     cardDetails = cardDetails.split(':')[0];
    //     rewardInfo.card = cardDetails;
    //     rewardsList.push(cardDetails);
    //   }
    //   expect(redeemRewardCardDetails).toContain('Reward ***');
    //   await page.locator(elements.paymentPage.redeemRewardCardAllApplyButton).nth(i).click();
    //   await page.waitForLoadState('load');
    //   await page.waitForTimeout(5000);
    // }
    rewardInfo.rewardsList = rewardsList;
    const appliedSuccess = await page.locator(elements.paymentPage.rewardAppliedState).isVisible();
    if (appliedSuccess) {
      await expect(page.locator(elements.paymentPage.rewardAppliedState)).toBeVisible({ timeout });
      await expect(page.locator(elements.paymentPage.rewardAppliedStateRemove)).toBeVisible({ timeout });
    }
  }

  async applyNewCreditCard() {
    const isMobile = common.verifyIsMobile();
    if (!isMobile) {
      await page.click(elements.paymentPage.btnPymtApplyCard);
    } else {
      await page.click(elements.paymentPage.btnPymtApplyCardMob);
    }
    testReport.log(this.pageName, 'Clicked to ADD a new CreditCard Information');
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  /**
   * @author: asoman
   * @function_Name : proceedToReview
   * @Description : click on proceed to review button to see review page
   * @params : None
   * @returns : None
   * */

  async proceedToReview(paymentInfo, newAddressEnteredFlag) {
    testReport.log(this.pageName, 'Proceeding to REVIEW PAGE');

    await expect(page.locator(elements.paymentPage.btnPymtProceedToReview)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnPymtProceedToReview);
    if (newAddressEnteredFlag) {
      await shipping.handleAvsPopup();
    }
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    const paymentJson = JSON.parse(JSON.stringify(paymentInfo.tenderItems));
    const paymentJsonData = paymentJson[0];
    let orderTotalAmt = await page.locator('li', { hasText: 'Order Total:' }).first().textContent();
    orderTotalAmt = orderTotalAmt.replace(/^\D+/g, '');
    orderTotalAmt = orderTotalAmt.replace(/,/g, '');
    orderTotalAmt = parseFloat(orderTotalAmt);

    if (paymentJsonData && paymentJsonData.toString().includes('C&B/CB2') && orderTotalAmt > 749) {
      await testReport.log(this.pageName, `paymentJsonData --> ${paymentJsonData} and orderTotalAmt -->${orderTotalAmt}`);
      this.verifySpecialFinancingPopup();
    }
  }

  async verifySpecialFinancingPopup() {
    expect(await page.locator('.popup-dialog-content-title').textContent()).toContain('Please select an offer');
    expect(await page.locator('.cbcc-financing-title').nth(0).textContent()).toContain('10% back in rewards');
    expect(await page.locator('.cbcc-financing-item').nth(0).textContent()).toContain("Earn $20 in rewards for every $200 spent on today's purchase");
    expect(await page.locator('.cbcc-financing-title').nth(1).textContent()).toContain('Special Financing');
    expect(await page.locator('.cbcc-financing-item').nth(1).textContent()).toContain('6 months special financing for orders totaling $749 to $1,498.99');
    const isMobile = common.verifyIsMobile();
    if (isMobile) {
      testReport.log(this.pageName, `common.verifyIsMobile--${isMobile}`);
      await page.locator('.button-container.visible-xs > .button.button-md.button-primary.btn-delivery-continue').click();
    } else {
      await page.locator('.button-container.hidden-xs > .button.button-md.button-primary.btn-delivery-continue').click();
    }
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  }

  /**
   * @author: skrishnasamy
   * @function_Name : verifyPromoGiftTenderCodeSections
   * @Description : Validate PromoGiftTenderCode Header in payment page
   * @params : None
   * @returns : None
   * */

  async verifyPromoGiftTenderCodeSections() {
    const strPromoCodeHdr = await page.locator('col-xs-12.payment-section > h2').textContent();
    expect(strPromoCodeHdr).toContain('Promo Code, Gift Cards, and Tender Codes');
    testReport.log(this.pageName, `PromoCode section header displayed -> ${strPromoCodeHdr}`);
  }

  /**
   * @author: skrishnasamy
   * @function_Name : verifyPromoCodeOption
   * @Description : Get the details of promotion code option in payment page
   * @params : None
   * @returns : None
   * */

  async verifyPromoCodeOption() {
    const txtpromoCode = await page.innerText(elements.paymentPage.btnHaveAPromotionCodePlus);
    expect(txtpromoCode).toContain('Have a Promotion Code?');

    const lblpromoCode = await page.innerText(elements.paymentPage.lblPromotionCode);
    expect(lblpromoCode).toContain('Promotion Code');

    await expect(page.locator(elements.paymentPage.promoCodeTxtBox)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.btnPromoCodeApply)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.promoCodeSuccessMsg)).toBeVisible({ timeout });

    testReport.log(this.pageName, `Promotion Code => ${lblpromoCode}${txtpromoCode}`);
  }

  /**
   * @author: skrishnasamy
   * @function_Name : verifyGiftCardOption
   * @Description : Get the details of gift card option in payment page
   * @params : None
   * @returns : None
   * */

  async verifyGiftCardOption(giftCardType, appliedGiftCard) {
    const giftCardhdr = await page.innerText(elements.paymentPage.hdrHaveAGiftCard);
    expect(giftCardhdr).toContain('Have a Gift Card?');
    await expect(page.locator(elements.paymentPage.btnHaveAGiftCardPlus)).toBeVisible({ timeout });
    const txtyouWillBeEnter = await page.innerText(elements.paymentPage.txtYouWillBeEnter);
    expect(txtyouWillBeEnter).toContain('You will be able to enter more than one Gift Card and may use Gift Cards from Crate and Barrel and CB2.');
    // await expect(await page.locator(elements.paymentPage.lblGiftCard)).toBeVisible({ timeout });
    const giftCard = await page.innerText(elements.paymentPage.appliedGiftCard);
    expect(giftCard).toContain(appliedGiftCard);

    await expect(page.locator(elements.paymentPage.appliedGiftCard)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.removeGiftCardBtn)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.giftCardAppliedAmt)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.giftCardRemainingAmt)).toBeVisible({ timeout });

    const txtAppliedMsg = await page.innerText(elements.paymentPage.appliedSuccessMsg);
    expect(txtAppliedMsg).toContain('Your Gift Card has been applied.');
    testReport.log(this.pageName, ` ${giftCardType} => ${giftCardhdr}${txtyouWillBeEnter}`);
  }

  /**
   * @author: skrishnasamy
   * @function_Name : verifyTenderCodeOption
   * @Description : Get the details of Tender code in payment page
   * @params : None
   * @returns : None
   * */
  async verifyTenderCodeOption() {
    const tenderCodehdr = await page.innerText(elements.paymentPage.hdrHaveATenderCode);
    expect(tenderCodehdr).toContain('Have a Tender Code?');

    await expect(page.locator(elements.paymentPage.haveATenderCodePlusButton)).toBeVisible({ timeout });

    const youWillBeTxt = await page.innerText(elements.paymentPage.TxtYouWillBeTenderCode);
    expect(youWillBeTxt).toContain('You will be able to enter more than one Tender Code.');

    await expect(page.locator(elements.paymentPage.lblTenderCode)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.tenderCodeTxtBox)).toBeVisible({ timeout });

    const pleaseNoteTxt = await page.innerText(elements.paymentPage.pleaseNoteTxt);
    expect(pleaseNoteTxt).toContain(
      'Please Note: You will have an opportunity to enter Reward Certificates after entering your Crate and Barrel or CB2 credit card.'
    );

    await expect(page.locator(elements.paymentPage.tenderCodeErrorMessage)).toBeVisible({ timeout });
    await expect(page.locator(elements.paymentPage.tenderCodeApplyButton)).toBeVisible({ timeout });

    testReport.log(this.pageName, `Tender Code => ${tenderCodehdr}${youWillBeTxt}`);
  }

  /**
   * @author: skrishnasamy
   * @function_Name : applyPromoCode
   * @Description : Apply promo code in payment page
   * @params : None
   * @returns : None
   * */

  async applyPromoCode() {
    await page.click(elements.paymentPage.promoCodeTxtBox);
    await page.fill(elements.paymentPage.promoCodeTxtBox, testData.promotions.promoCode, { delay: 100 });
    await page.click(elements.paymentPage.btnPromoCodeApply);
    await expect(await page.innerText(elements.paymentPage.promoCodeSuccessMsg)).toBeVisible({ timeout });
  }

  /**
   * @author: skrishnasamy
   * @function_Name : applyGiftCard
   * @Description : Apply gift card in payment page
   * @params : None
   * @returns : None
   * */

  async applyGiftCard(giftCardType) {
    let i = 0;
    const isCanada = env.EXEC_SITE.includes('can');
    const cardList = giftCardType === 'giftcard' ? testData.giftCards : testData.shopCards;
    const giftCardDetails = isCanada ? cardList.Canada : cardList.US;
    testReport.log(this.pageName, `Applying ${giftCardType} as Payment Method`);

    await page.click(elements.paymentPage.btnHaveAGiftCardPlus);
    // eslint-disable-next-line no-await-in-loop
    while (!(await this.submitGiftcard(giftCardType, giftCardDetails[i]))) {
      i += 1;
    }

    TenderCodeGiftRewards.GiftCard = giftCardDetails[i].giftCardNo.slice(-4);
    return giftCardDetails[i].giftCardNo;
  }

  async submitGiftcard(giftCardType, giftCardDetails) {
    const successfulAppliedElement = '#gift-card-discount-message';
    const errorOnApplyElement = '#status-error-message';
    let isGiftCardSuccessFullyApplied = false;

    try {
      await page.fill(elements.paymentPage.txtGiftCard, giftCardDetails.giftCardNo, { delay: 100 });
      await page.fill(elements.paymentPage.txtGiftCardPin, giftCardDetails.giftCardPINNo, { delay: 100 });
      await page.click(elements.paymentPage.btnGiftCardApply);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator(successfulAppliedElement)).toBeVisible({ timeout: 20000 });
      isGiftCardSuccessFullyApplied = true;
      testReport.log(this.pageName, `Apply ${giftCardType}` - ` ${giftCardDetails.giftCardNo} successful`);
    } catch (successError) {
      await expect(page.locator(errorOnApplyElement)).toBeVisible({ timeout: 20000 });
      testReport.log(this.pageName, `Apply ${giftCardType} ` - `${giftCardDetails.giftCardNo} failed`);
      testReport.log(this.pageName, `Resultant message ${await page.locator(errorOnApplyElement).textContent()}`);
      isGiftCardSuccessFullyApplied = false;
    }

    return isGiftCardSuccessFullyApplied;
  }

  /**
   * @author: skrishnasamy
   * @function_Name : applyTenderCode
   * @Description : Apply Tender code in payment page
   * @params : None
   * @returns : None
   * */

  async applyTenderCode() {
    let tenderCode = '';
    if (env.EXEC_SITE.toLowerCase().includes('cb2')) tenderCode = testData.tenderCodes.Cb2US.certificates;
    else tenderCode = testData.tenderCodes.CrateUS.certificates;

    testReport.log('entered tender code');
    await expect(page.locator(elements.paymentPage.btnHaveATenderCodePlus)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnHaveATenderCodePlus);
    await expect(page.locator(elements.paymentPage.txtTenderCode)).toBeVisible({ timeout });
    TenderCodeGiftRewards.TenderCode = tenderCode.slice(-4);
    await page.fill(elements.paymentPage.txtTenderCode, tenderCode, { delay: 100 });
    await page.click(elements.paymentPage.btnTenderCodeApply);

    const tenderSuccess = await page.locator(elements.paymentPage.tenderCodeSuccessmsg).isVisible();
    if (tenderSuccess) {
      const tenderCodeSuccessMsg = await page.innerText(elements.paymentPage.tenderCodeSuccessmsg);
      expect(tenderCodeSuccessMsg).toContain('Your Tender Code has been applied.');
    }

    testReport.log(this.pageName, 'Applying tender code as Payment Method');
  }

  async clickOnChangeCard() {
    await expect(page.locator(elements.paymentPage.btnChangeCard)).toBeVisible({ timeout });
    await page.click(elements.paymentPage.btnChangeCard);
  }

  async clickOnApplyNewCard() {
    await expect(page.locator(elements.changeCard.btnApplyNewCard)).toBeVisible({ timeout });
    await page.click(elements.changeCard.btnApplyNewCard);
  }

  // new
  async verifyBillingAddress() {
    const isPayPalUsed = await this.isPayPalUsedAsPaymentMethod();
    if (isPayPalUsed) {
      testReport.log(this.pageName, 'PayPal payment was used');
      expect(await page.locator('.col-xs-12.address-display').count()).toEqual(0);
    } else {
      const billingAddress = await page.locator('.col-xs-12.address-display').textContent();
      testReport.log(this.pageName, `billing address:${billingAddress}`);
      billingInfo.billingAddress = billingAddress;
    }
  }

  async verifyBillingAddr() {
    const billingAddrName = await page.innerText(elements.paymentPage.billingAddrName);
    testReport.log(this.pageName, `billing addr:${billingAddrName}`);
    expect(billingAddrName).toContain(`${testData.billingAddressInfo.firstName} ${testData.billingAddressInfo.lastName}`);

    const billingAddrPhone = await page.innerText(elements.paymentPage.billingAddrPhone);
    expect(billingAddrPhone).toContain(testData.billingAddressInfo.phoneNumber);

    const addrList = await common.getElementHandlesArray(elements.paymentPage.billingAddress);
    const arrAddrInfo = [testData.billingAddressInfo.address1, testData.billingAddressInfo.apt, testData.billingAddressInfo.zipCode];

    // Compare list of Items actual title with expected title
    common.verifyListOfItemsInfo(addrList, arrAddrInfo);
    testReport.log(this.pageName, 'Verifying the BillingAddressInformation displayed');
  }

  async getPaymentInfo(itemInfo, paymentType, inputBillingAddress, isBillingAddressInternational) {
    const paymentObj = itemInfo;
    const tenderItem = [];
    const isPayPalUsed = await this.isPayPalUsedAsPaymentMethod();
    let strBillToAddress = inputBillingAddress;

    if (isPayPalUsed) {
      tenderItem.push('PayPal');
      if (!paymentObj.userLoggedIn) {
        if (paymentType === 'PayPal' && paymentObj.payPalAuthorizationOriginPage === 'paymentPage') {
          paymentObj.receiptEmail = env.PAYPAL_TEST_USRID;
        }
      }
      testReport.log(this.pageName, 'PayPal payment was used');
    } else {
      if (!strBillToAddress) {
        strBillToAddress = await page.locator('.col-xs-12.address-display').textContent();
        strBillToAddress = strBillToAddress.replace('Edit Billing Address', '');
      }
      testReport.log(this.pageName, `billing addres${strBillToAddress}`);
    }
    testReport.log(this.pageName, `itemInfo${itemInfo}`);
    // let paymentInfo = JSON.stringify(tenderItem);
    const creditCardSelectedEle = await common.getElementHandlesArray(elements.paymentPage.lblSelectedCardType);
    const creditCardSelectedCount = await page.locator(elements.paymentPage.lblSelectedCardType).count();

    if (creditCardSelectedCount > 0) {
      testReport.log(this.pageName, `CreditCard payment was used. Number of cards used: ${creditCardSelectedCount}`);
      await Promise.all(
        creditCardSelectedEle.map(async (ele, i) => {
          const cardJson = {};
          const selectedCardType = await page.locator(elements.paymentPage.lblSelectedCardType).nth(i).textContent();
          const expiryTxt = await page.locator('.expire-date').nth(i).textContent();
          let amount = '$0.00';

          cardJson.cardUsed = selectedCardType;
          cardJson.expiryDate = expiryTxt;

          if (creditCardSelectedCount > 1) {
            amount = `$${await page.locator('.card-amount > div > input').nth(i).inputValue()}`;
            cardJson.amount = amount;
          }

          tenderItem.push(cardJson);
        })
      );
    }

    testReport.log(this.pageName, `tenderItem: ${tenderItem}`);
    // tenderItem = this.verifyPaymentSection()
    paymentObj.tenderItems = tenderItem;
    paymentObj.billingAddress = strBillToAddress;
    paymentObj.isBillingAddressInternational = isBillingAddressInternational;
    testReport.log(this.pageName, `paymentObj: ${paymentObj}`);
    return paymentObj;
  }

  async getRewardInfo() {
    return rewardInfo;
  }

  async getTenderInfo() {
    return TenderCodeGiftRewards;
  }

  async getShopCardInfo() {
    return ShopCardInfo;
  }

  async clickTaxExemptionCheckbox() {
    await page.locator(elements.paymentPage.chkTaxExemption).click();
  }

  async verifyTaxExemptionIsDisabled() {
    await expect(page.locator(elements.paymentPage.chkTaxExemption)).toHaveText(testData.paymentMessages.tax_Exemption_Label);
    await expect(page.locator(elements.paymentPage.msgTaxExemptionIneligible)).toHaveText(testData.paymentMessages.tax_exemption_Invalid_Message);
    await expect(page.locator(elements.paymentPage.lnkTaxExemptionIneligible)).toHaveAttribute('href', `/checkout/shippingandgiftoptions`);
  }

  async waitForLoadingComplete() {
    // Ensure that the throbber opens and then closes so that the data beceomes correct
    await expect(page.getByTestId('checkout-loading-indicator')).toBeVisible({ timeout });
    await expect(page.getByTestId('checkout-loading-indicator')).toBeHidden({ timeout });
  }

  async verifyTaxExemptionFieldsDisplayed() {
    await expect(page.locator(elements.paymentPage.containerTaxExemption)).not.toBeEmpty();
    await expect(page.getByText('Tax Exemption Applied')).toBeVisible({ timeout });
  }

  async verifyAltPaymentsHidden() {
    await expect(page.locator(elements.paymentPage.lblAltPayments)).toBeHidden();
    await expect(page.locator(elements.paymentPage.altPaymentsWrap)).toBeHidden();
  }

  async verifyPromoDiscountApplied() {
    await expect(page.locator(elements.paymentPage.txtAppliedPromoCode)).not.toBeEmpty();
    await expect(page.getByText('Trade Program discount has been applied.')).toBeVisible({ timeout });
    await expect(page.getByTestId('order-summary-merchandise-total')).toBeVisible({ timeout });
    await expect.soft(page.getByTestId('order-summary-shipping-handling-total')).toBeVisible({ timeout });
    const appliedPromoText = `Code Applied: ${await page.locator(elements.paymentPage.txtAppliedPromoCode).textContent()}`;
    await expect(page.getByText(appliedPromoText)).toBeVisible({ timeout });
    testReport.log(this.pageName, 'Promo Code has been applied');
  }

  async verifyRemovePromoIsDisabled() {
    await expect(page.getByTitle('Remove Promotion Code')).toHaveClass(/disabled-promo/);
  }

  async enterBillingAddress(addressType = 'DOMESTIC') {
    const addressDictionary = {
      DOMESTIC: getAddressData('DOMESTIC'),
      INTERNATIONAL: getAddressData('INTERNATIONAL')
    };
    const billingAddressData = addressDictionary[addressType] || addressDictionary.DOMESTIC;
    const isDomestic = addressType === 'DOMESTIC';
    if (!isDomestic) {
      const useInternationalButton = page.locator('label', { hasText: 'International Address' });
      await useInternationalButton.click();
    }
    await page.fill(elements.paymentPage.txtBillingFirstName, billingAddressData.firstName);
    await page.fill(elements.paymentPage.txtBillingLastName, billingAddressData.lastName);
    await page.fill(elements.paymentPage.txtBillingAddress1, billingAddressData.address1);
    await page.fill(elements.paymentPage.txtBillingCity, billingAddressData.city);
    if (isDomestic) {
      const billingState = page.locator(elements.paymentPage.txtBillingState);
      await billingState.selectOption(billingAddressData.state);
    } else {
      await page.fill(elements.paymentPage.txtBillingState, billingAddressData.state);
      const billingCountry = page.locator(elements.paymentPage.txtBillingCountry);
      await billingCountry.selectOption(billingAddressData.country);
    }
    await page.fill(elements.paymentPage.txtBillingZipCode, billingAddressData.zipCode);
    await page.fill(elements.paymentPage.txtBillingPhone, billingAddressData.phoneNumber);

    return billingAddressData;
  }

  async submitBillingAddressForm() {
    await page.getByTestId('btn-proceed-to-review').click();
  }

  async verifyPlccPopup() {
    await common.forcedWait(this.pageName, 10000);
    // await page.waitForLoadState('networkidle', { timeout: 20000 });
    const checkPlccPopup = await page.locator(elements.paymentPage.plccOffer).isVisible();
    testReport.log(this.pageName, 'checkPlccPopup', checkPlccPopup);
    if (checkPlccPopup) {
      if (common.verifyIsMobile()) {
        await page.locator('.button-container.visible-xs > .button.button-md.button-primary.btn-delivery-continue').click();
        await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
      } else {
        await page.locator('.button-container.hidden-xs > .button.button-md.button-primary.btn-delivery-continue').click();
        await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
      }
    }
  }

  async creditCardFormFilling(cardType) {
    let creditCardInfo;

    switch (cardType) {
      case 'Visa':
        [creditCardInfo] = testData.creditCards.visa;
        break;
      case 'MasterCard':
        [creditCardInfo] = testData.creditCards.masterCard;
        break;
      case 'Discover':
        [creditCardInfo] = testData.creditCards.discover;
        break;
      case 'ChinaUnionPay':
        [creditCardInfo] = testData.creditCards.chinaUnionPay;
        break;
      case 'JCB':
        [creditCardInfo] = testData.creditCards.JCB;
        break;
      case 'Diners':
        [creditCardInfo] = testData.creditCards.diners;
        break;
      case 'AmericanExpress':
        [creditCardInfo] = testData.creditCards.americanExpress;
        break;
      case 'C&B/CB2 CC':
        [creditCardInfo] = testData.creditCards.plccCBCC;
        break;
      case 'C&B/CB2 MC':
        [creditCardInfo] = testData.creditCards.coBrandCBCC;
        break;
      case 'PLCCWithReward':
        [creditCardInfo] = testData.creditCards.plccCBCCwithReward;
        break;
      case 'CBCCwithReward':
        [creditCardInfo] = testData.creditCards.CBCCwithReward;
        break;
      default:
        [creditCardInfo] = testData.creditCards.visa;
    }
    TenderCodeGiftRewards.PLCCWithReward = creditCardInfo.cardNum.slice(-4);
    await page.fill(elements.paymentPage.txtCreditCardNumber, creditCardInfo.cardNum);
    await page.fill(elements.paymentPage.txtExpiryDate, creditCardInfo.cardExpiry);
    const cvv = await page.locator(elements.paymentPage.txtCvv).isVisible();
    if (cvv) await page.fill(elements.paymentPage.txtCvv, creditCardInfo.cardCvv);
    else await page.fill(elements.paymentPage.txtCvvPop, creditCardInfo.cardCvv);
  }

  async newCreditCardForm(cardType) {
    testReport.log(this.pageName, `New CreditCard Information for${cardType}`);
    // await page.waitForTimeout(4000);
    await page.waitForLoadState('domcontentloaded');
    const isVisible = await page.locator(elements.paymentPage.txtNewCreditCardNumber).isVisible();
    testReport.log('newCard', isVisible);
    if (isVisible) {
      await this.creditCardFormFilling(cardType);
      return true;
    }
    return false;
  }

  async verifyCustomOrderMessaging() {
    const customOrderMessaging = await page.locator('.important-notes .message').textContent();

    expect(customOrderMessaging).toContain(env.PAYMENT_DEPOSIT_MSG);
  }
}

module.exports = { PaymentPage };
