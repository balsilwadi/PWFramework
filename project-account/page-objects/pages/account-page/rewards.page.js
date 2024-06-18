const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();
const { CommonUtils } = require('../../../../support/utils/common-utils');

const common = new CommonUtils();
const env = require('../../../../support/env/env');

class RewardsPage extends PageObject {
  constructor() {
    super();
    this.pageName = 'RewardsPage';
    this.svgRewards = 'svg.svg-icon-rewards';
    this.lblRewardsMsg = "[data-testid='header-apply-cbcc']>h2";
    this.lblZeroRewardsMsg = "[data-testid='header-without-rewards']>h2";
    this.lblRewardsMsgTotal = "[data-testid='header-without-rewards']>div";
    this.lnkApply = "[data-testid='header-apply-cbcc']>a";
    this.lblHeader = 'section.account-rewards-container h1';
    this.svgBenefit1 = 'div.marketing-information-icon-wrapper:nth-of-type(1) > div.marketing-information-icon > svg';
    this.svgBenefit2 = 'div.marketing-information-icon-wrapper:nth-of-type(2) > div.marketing-information-icon > svg';
    this.svgBenefit3 = 'div.marketing-information-icon-wrapper:nth-of-type(3) > div.marketing-information-icon > svg';
    this.lblBenefit1 = 'div.marketing-information-icon-wrapper:nth-of-type(1) > h3';
    this.lblBenefit2 = 'div.marketing-information-icon-wrapper:nth-of-type(2) > h3';
    this.lblBenefit3 = 'div.marketing-information-icon-wrapper:nth-of-type(3)  > h3';
    this.lblBenefit1Desc = 'div.marketing-information-icon-wrapper:nth-of-type(1) > p';
    this.lblBenefit2Desc = 'div.marketing-information-icon-wrapper:nth-of-type(2) > p';
    this.lblBenefit3Desc = 'div.marketing-information-icon-wrapper:nth-of-type(3) > p';
    this.lblAddCCDesc = "[data-testid='rewards'] > div:nth-of-type(1) > div:nth-of-type(1)";
    this.lnkAddCC = 'div.rewards-add-card-link a';
    this.lblRewardsValueinCart = 'div.reward-details-title-total-amount';
    this.svgCartIcon = "[data-testid='header-cart-container']";
    this.lnkViewCartMobile = "a[class*='cart-view-btn']";
    this.lblRewardsHistory = 'h2.rewards-history-title';
    this.lblRewardsDesc = 'p.rewards-history-message';
    this.lblRewardsAvailTitle = 'h2.rewards-available-title';
    this.lnkManageCC = "[data-testid='rewards-view-credit-card']";
    this.lnkNextReward = "[data-testid='rewards-view-next-rewards']";
    this.lblZeroRewardsValue = "//div[@class='left-nav-items']//*[@id='total-rewards-amount']";
    this.lblCartCount = "[data-testid='cart-count']";
    this.lblTotalRewards1 = '#total-rewards-amount';
    this.lblTotalRewards2 = '[data-testid="rewards-message-total-amount"] span';
    this.lblMultipleRewards = '[data-testid*="rewards-account-C"]';
    this.lblCard1Rewards = 'div.rewards-padding-sides > [data-testid*="rewards-account-C"]:nth-of-type(1) >div:nth-of-type(1) [data-testid*="rewards-card-8"]';
    this.lblCard2Rewards = 'div.rewards-padding-sides > [data-testid*="rewards-account-C"]:nth-of-type(2) >div:nth-of-type(1) [data-testid*="rewards-card-8"]';
    this.btnCartFlyoutClose = 'div[class="global-flyout header-cart-flyout"] button';
    this.btnAddToCart = '[data-testid="add-to-cart-button"]';
    this.btnViewCart = 'button[class*="button-checkout-now"]';
  }

  /**
   * @function_Name : validatetheRewardsPage
   * @Description :  Verify the content of rewards page
   * @params : none
   * @returns : None
   * */
  async validatetheRewardsPage() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.lblRewardsMsg)).toHaveText(env.ACNT_REWARDSDESC);
    await expect(page.locator(this.lnkApply)).toHaveText(td.rewards.applyNow, 'ignoreCase: true');
    await expect(page.locator(this.lblAddCCDesc)).toHaveText(env.ACNT_ADDCC, { ignoreCase: true });
    await expect(page.locator(this.lnkAddCC)).toHaveText(td.rewards.addCC, { ignoreCase: true });
    await this.verifyTheContentonRewardsPage();
    await page.locator(this.lnkAddCC).click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/edit-saved-payments/);
    testReport.log(this.pageName, 'Clicking on Add CC is navigating to Payments page as expected');
  }

  /**
   * @function_Name : validatetheRewardsPageWithCBCC
   * @Description :  Verify the content of rewards page when a CBCC added in the account
   * @params : none
   * @returns : None
   * */
  async validatetheRewardsPageWithCBCC() {
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page.locator(this.lblZeroRewardsValue)).toHaveText(td.rewards.zeroRewards);
    await expect(page.locator(this.lblZeroRewardsMsg)).toHaveText(env.ACNT_ZERO_REWARDS, { ignoreCase: true });
    await expect(page.locator(this.lblRewardsMsgTotal)).toHaveText(env.ACNT_REWARDS_MSG, { ignoreCase: true });
    if (env.EXEC_SITE.startsWith('crate')) await expect(page.locator(this.lblRewardsAvailTitle)).toHaveText(td.rewards.rewardsAvailTitle, { ignoreCase: true });
    await expect(page.locator(this.lnkManageCC)).toHaveText(td.rewards.manageCC, { ignoreCase: true });
    await expect(page.locator(this.lnkNextReward)).toHaveText(td.rewards.nextCC, { ignoreCase: true });
    await this.verifyTheContentonRewardsPage();
    testReport.log(this.pageName, 'Clicking on Add CC is navigating to Payments page as expected');
  }

  async verifyTheContentonRewardsPage() {
    await expect(page.locator(this.lblHeader)).toHaveText(td.rewards.header, { ignoreCase: true });
    if (env.EXEC_SITE.startsWith('crate')) await expect(page.locator(this.svgRewards)).toBeVisible();
    if (env.EXEC_SITE.startsWith('crate') && !common.verifyIsMobile()) {
      await expect(page.locator(this.svgBenefit1)).toBeVisible();
      await expect(page.locator(this.svgBenefit2)).toBeVisible();
      await expect(page.locator(this.svgBenefit3)).toBeVisible();
      await expect(page.locator(this.lblBenefit1)).toHaveText(td.rewards.benefit1Title);
      await expect(page.locator(this.lblBenefit2)).toHaveText(td.rewards.benefit2Title);
      await expect(page.locator(this.lblBenefit3)).toHaveText(td.rewards.benefit3Title);
      await expect(page.locator(this.lblBenefit1Desc)).toHaveText(td.rewards.benefit1Desc);
      await expect(page.locator(this.lblBenefit2Desc)).toHaveText(td.rewards.benefit2Desc);
      await expect(page.locator(this.lblBenefit3Desc)).toHaveText(td.rewards.benefit3Desc);
    }
    await expect(page.locator(this.lblRewardsHistory)).toHaveText(td.rewards.rewardHistory, { ignoreCase: true });
    await expect(page.locator(this.lblRewardsDesc)).toHaveText(td.rewards.rewardHistoryDesc, { ignoreCase: true });
    testReport.log(this.pageName, 'Content on the rewards page is displaying as expected.');
  }

  /**
   * @function_Name : verifyRewardsMenuinHeader
   * @Description :  Verify whether the rewards menu is not displaying i nthe header flyout
   * @params : none
   * @returns : None
   * */
  async verifyRewardsMenuinHeader() {
    if (common.verifyIsMobile()) await page.click(el.homePage.svgAccountIcon);
    else await page.hover(el.homePage.svgAccountIcon);
    await expect(page.locator(el.homePage.lnkRewardsFlyout)).toBeHidden();
    if (common.verifyIsMobile()) await page.click(el.homePage.btnFlyoutCloseMobile);
    testReport.log(this.pageName, 'Rewards menu is not displayed in the flyout modal');
  }

  /**
   * @function_Name : verifyRewardsMenuinHeaderWithCBCC
   * @Description :  Verify whether the rewards menu is not displaying i nthe header flyout
   * @params : none
   * @returns : None
   * */
  async verifyRewardsMenuinHeaderWithCBCC() {
    if (common.verifyIsMobile()) await page.click(el.homePage.svgAccountIcon);
    else await page.hover(el.homePage.svgAccountIcon);
    await expect(page.locator(el.homePage.lnkRewardsFlyout)).toHaveText(td.rewards.rewardsMenu, { ignoreCase: true });
    if (common.verifyIsMobile()) await page.click(el.homePage.btnFlyoutCloseMobile);
    testReport.log(this.pageName, 'Rewards menu is displayed in the flyout modal');
  }

  /**
   * @function_Name : navigatetoCartPage
   * @Description :  Navigate to cart page from account page
   * @params : none
   * @returns : None
   * */
  async navigatetoCartPage() {
    await page.locator(this.svgCartIcon).click();
    if (common.verifyIsMobile()) {
      try {
        await page.locator(this.lnkViewCartMobile).click();
      } catch (error) {
        // adding an item if the cart is empty
        await page.locator(this.btnCartFlyoutClose).click();
        await page.goto(env.ACNT_PLP);
        await page.waitForLoadState('load', { timeout: 60000 });
        await page.locator(this.btnAddToCart).first().click();
        await page.locator('div[class*="linkWithLoaderContainer"] a').click();
      }
    }
    await page.waitForLoadState('load', { timeout: 60000 });
    testReport.log(this.pageName, 'Navigated to cart page');
  }

  /**
   * @function_Name : verifyRewardsinCartPage
   * @Description :  Verify $0 rewards is displaying in the cart page
   * @params : none
   * @returns : None
   * */
  async verifyRewardsinCartPage() {
    const cartCount = await page.innerText(this.lblCartCount);
    if (cartCount !== '0') {
      await expect(page.locator(this.lblRewardsValueinCart)).toHaveText(td.rewards.zeroRewards, { timeout: 20000 });
      testReport.log(this.pageName, '$0 reward is displayed as expected');
    } else testReport.log(this.pageName, 'Cart is empty, so could not validate this');
  }

  async verifyManageMyCBCCPage() {
    expect(page.url()).toContain('rewards');
    testReport.log(this.pageName, 'Manage My CBCC page is loaded');
  }

  /**
   * @function_Name : verifyCombinedRewards
   * @Description :  Verify the rewards added from multiple cards
   * @params : none
   * @returns : None
   * */
  async verifyCombinedRewards() {
    await expect(page.locator(this.lblHeader)).toBeVisible({ timeout: 60000 });
    expect(await page.locator(this.lblMultipleRewards).count()).toEqual(2);
    testReport.log(this.pageName, 'Rewards displayed for multiple CBCC as expected');
    const strReward1 = await page.innerText(this.lblTotalRewards1);
    const strReward2 = await page.innerText(this.lblTotalRewards2);
    const intTotRewardsCard1 = await page.locator(this.lblCard1Rewards).count();
    const intTotRewardsCard2 = await page.locator(this.lblCard2Rewards).count();
    const intTotRewards = intTotRewardsCard1 + intTotRewardsCard2;
    if (!common.verifyIsMobile()) expect(`$${parseFloat(intTotRewards * 20).toFixed(2)}`).toEqual(strReward1);
    expect(`$${parseFloat(intTotRewards * 20).toFixed(2)}`).toEqual(strReward2);
    testReport.log(this.pageName, `Total Rewards: ${intTotRewards} Total Rewards Value: $${parseFloat(intTotRewards * 20).toFixed(2)}`);
    testReport.log(this.pageName, 'Total rewards matching as expected');
  }
}
module.exports = new RewardsPage();
