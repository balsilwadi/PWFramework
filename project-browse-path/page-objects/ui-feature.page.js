const { expect } = require('@playwright/test');
const ui = require('../elements/ui-feature');
const { ReportUtils } = require('../../support/utils/report-utils');

let newWindow = {};
let openWindow = {};
const testReport = new ReportUtils();

class UiFeature {
  async navigateToAutomationPage() {
    testReport.log('UI Feature', `Global base: ${global.testUrl}`);
    await page.goto(global.testUrl);
    testReport.log('UI Feature', 'Get page title');
    testReport.log('UI Feature', `Current page title: ${await page.title()}`);
  }

  async alertLnk() {
    await page.click(ui.UIFEATUREPAGE.ALERTWITH_OK_CANCEL_LNK);
    // await page.click(ui.UIFEATUREPAGE.AD_BTN);
  }

  async alertBtn() {
    page.on('dialog', (dialog) => dialog.accept());
    // page.on('dialog', dialog => dialog.dismiss());
    page.on('dialog', (dialog) => testReport.log('UI Feature', dialog.message()));
    await page.click(ui.UIFEATUREPAGE.ALERT_BTN);
  }

  async verifyButtonMessage() {
    expect(await page.innerText(ui.UIFEATUREPAGE.VERIFICATION_LNK)).to.contain('You pressed Ok');
  }

  async alertwithTxtboxLnk() {
    await page.reload();
    await page.click(ui.UIFEATUREPAGE.ALERTWITH_TXTBOX_LNK);
    await page.reload();
    await page.click(ui.UIFEATUREPAGE.ALERTWITH_TXTBOX_LNK);
  }

  async promptBtn() {
    page.on('dialog', (dialog) => dialog.accept());
    // //page.on('dialog', dialog => dialog.dismiss());
    page.on('dialog', (dialog) => testReport.log('UI Feature', dialog.message()));
    await page.click(ui.UIFEATUREPAGE.PROMPT_BTN);
    // await page.click(ui.UIFEATUREPAGE.PROMPT_BTN);
  }

  async verifyTxtMessage() {
    expect(await page.innerText(ui.UIFEATUREPAGE.TXT_VERIFICATION_LNK)).to.contain('Hello Automation How are you today');
  }

  async tabsPage() {
    const locator = page.locator(ui.UIFEATUREPAGE.SWITCHTO_LNK);
    await locator.hover();
    await page.click(ui.UIFEATUREPAGE.WINDOWS_LNK);
    await page.mouse.click(0, 100);
  }

  async tabbtn() {
    [newWindow] = await Promise.all([global.context.waitForEvent('page'), await page.click(ui.UIFEATUREPAGE.TAB_BTN)]);
    testReport.log('UI Feature', 'newWindow>>>>>>', typeof newWindow);
  }

  async switchTab() {
    expect(await newWindow.innerText(ui.UIFEATUREPAGE.NEWTAB_TXT)).to.contain('Selenium automates browsers.');
    await page.bringToFront();
    await newWindow.bringToFront();
    await newWindow.close();
  }

  async windowButton() {
    await page.click(ui.UIFEATUREPAGE.WINDOW_LNK);
    [openWindow] = await Promise.all([global.context.waitForEvent('page'), await page.click(ui.UIFEATUREPAGE.WINDOW_BTN)]);
    testReport.log('UI Feature', 'newWindow>>>>>>', typeof openWindow);
  }

  async swithcWindow() {
    expect(await openWindow.innerText(ui.UIFEATUREPAGE.NEWTAB_TXT)).to.contain('Selenium automates browsers.');
    await page.bringToFront();
    await openWindow.bringToFront();
    await openWindow.click(ui.UIFEATUREPAGE.ABOUT_LNK);
    await openWindow.close();
  }
}

module.exports = { UiFeature };
