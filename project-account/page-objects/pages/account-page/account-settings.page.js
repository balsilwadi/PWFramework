const fileSystem = require('fs');
const { expect } = require('@playwright/test');
const td = require('../../data-files/test-data');
const el = require('../../elements/elements');
const { ReportUtils } = require('../../../../support/utils/report-utils');
const PageObject = require('../../../../project-shared/page-objects/pages/page-object');

const testReport = new ReportUtils();

const fileName = `${process.cwd()}/project-account/page-objects/data-files/login-credentials.json`;
// const credentialsFile = require(fileName);

const cp = 'AccountSettingsPage';
class AccountSettingsPage extends PageObject {
  /**
   * @function_Name : verifyPageHeader
   * @Description : Verify account setting page header is displayed
   * @params : None
   * @returns : None
   */
  async verifyPageHeader() {
    await expect(page.locator(el.accountSettingsPage.lblAccountSettingsheader)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(el.accountSettingsPage.lblAccountSettingsheader)).toHaveText('Account Settings');
    testReport.log(cp, 'Account Settings page displayed');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyUpdateEmailSection
   * @Description :  verify elements displayed in update email section
   * @params : none
   * @returns : None
   * */
  async verifyUpdateEmailSection() {
    await expect(page.locator(el.accountSettingsPage.lblUpdateEmail)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.lblCurrentEmailLabel)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.lblCurrentEmail)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.txtNewEmail)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.txtConfirmEmail)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.txtNewEmail)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.btnApplyChangesEmail)).toBeVisible();
    testReport.log(cp, 'Verified Update email section');
  }

  /**
   * @author: sreerag
   * @function_Name : verifyLoggedInUserEmail
   * @Description :  verify email soociated with the logged in account is displayed on account settings page
   * @params : Scenario,uodatedEmail
   * @returns : None
   * */
  async verifyLoggedInUserEmail(scenario, updatedEmail) {
    if (scenario === 'Changed') {
      await expect(page.locator(el.accountSettingsPage.lblCurrentEmail)).toHaveText(updatedEmail);
    } else {
      const accountCred = fileName.filter((element) => element.Type === scenario);
      await expect(page.locator(el.accountSettingsPage.lblCurrentEmail)).toHaveText(accountCred[0].Email);
      testReport.log(cp, 'Verified email associated with the logged in account displayed in account settings page');
    }
  }

  /**
   * @author: sreerag
   * @function_Name : verifyUpdatePasswordSection
   * @Description :  verify elements displayed in update password section
   * @params : none
   * @returns : None
   * */
  async verifyUpdatePasswordSection() {
    await expect(page.locator(el.accountSettingsPage.lblUpdatePassword)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.msgUpdatePassword)).toHaveText(td.accountSettingsPage.updatePasswordMessage);
    await expect(page.locator(el.accountSettingsPage.txtOriginalPassword)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.txtNewPassword)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.btnApplyChangesPassword)).toBeVisible();
    await expect(page.locator(el.accountSettingsPage.msgUpdateSummary)).toHaveText(td.accountSettingsPage.updateSummaryMessage);
    testReport.log(cp, 'Verified Update password section');
  }

  /**
   * @author: sreerag
   * @function_Name : updateEmail
   * @Description :  update the email address  of an account
   * @params : none
   * @returns : The updated email address
   * */
  async updateEmail(updatedEmail) {
    await page.locator(el.accountSettingsPage.txtNewEmail).fill(' ');
    await page.fill(el.accountSettingsPage.txtNewEmail, updatedEmail, { delay: 100 });
    await page.fill(el.accountSettingsPage.txtConfirmEmail, updatedEmail, { delay: 100 });
    testReport.log(cp, `Entered email:${updatedEmail}`);
    await page.locator(el.accountSettingsPage.btnApplyChangesEmail).click();
    testReport.log(cp, 'Clicked on Apply changes button of Update email');
    await page.waitForLoadState();
    await expect(page.locator(el.accountSettingsPage.msgEmailUpdated)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(el.accountSettingsPage.msgEmailUpdated)).toHaveText(td.accountSettingsPage.emailUpdatedSuccessMessage);
    testReport.log(cp, `Email updated :${updatedEmail}`);
  }

  /**
   * @author: sreerag
   * @function_Name : updatePassword
   * @Description :  update password of an account
   * @params : none
   * @returns : None
   * */
  async updatePassword(updatedPassword) {
    await page.fill(el.accountSettingsPage.txtOriginalPassword, 'Crate123!', { delay: 100 });
    await page.fill(el.accountSettingsPage.txtNewPassword, updatedPassword, { delay: 100 });
    testReport.log(cp, 'Entered password');
    await page.locator(el.accountSettingsPage.btnApplyChangesPassword).click();
    testReport.log(cp, 'Clicked on Apply changes button of Update password');
    await page.mouse.up();
    await expect(page.locator(el.accountSettingsPage.msgPasswordUpdated)).toBeVisible({ timeout: 60000 });
    await expect(page.locator(el.accountSettingsPage.msgPasswordUpdated)).toHaveText(td.accountSettingsPage.passwordUpdatedSuccessMessage);
    testReport.log(cp, 'Password updated');
  }

  /**
   * @author: sreerag
   * @function_Name : pushUpdatedEmailToLoginCredentialsFile
   * @Description :  Save the updated email to loginCredentials.jSON file in Email of type 'Updated'
   * @params : none
   * @returns : none
   * */
  async pushUpdatedEmailToLoginCredentialsFile(updatedEmail) {
    for (let i = 0; i < fileName.length; i++) {
      if (fileName[i].Type.toString().includes('Updated')) {
        fileName[i].Email = updatedEmail;
        fileSystem.writeFileSync(fileName, JSON.stringify(fileName, null, 3), (err) => {
          if (err) return testReport.log(err);
          testReport.log('updated email in login credentials file', updatedEmail);
          return true;
        });
        break;
      }
    }
    testReport.log('updated email in login credentials file', updatedEmail);
  }

  /**
   * @author: sreerag
   * @function_Name : pushUpdatedPasswordToLoginCredentialsFile
   * @Description :  Save the updated password to loginCredentials.jSON file in Password of type 'Updated'
   * @params : none
   * @returns : none
   * */
  async pushUpdatedPasswordToLoginCredentialsFile(updatedPassword) {
    for (let i = 0; i < fileName.length; i++) {
      if (fileName[i].Type.toString().includes('Updated')) {
        fileName[i].Password = updatedPassword;
        fileSystem.writeFileSync(fileName, JSON.stringify(fileName, null, 3), (err) => {
          if (err) return testReport.log(err);
          testReport.log('updated password in login credentials file ');
          return true;
        });
        break;
      }
    }
    testReport.log('updated password in login credentials file');
    fileName.close();
  }
}
module.exports = { AccountSettingsPage };
