module.exports = {
  txtSearchFirstName: '//*[@id="Firstname"] | //*[@id="txtFindARegistryFirstName"]',
  txtSearchLastName: '//*[@id="Lastname"] | //*[@id="txtFindARegistryLastName"]',
  btnFindRegistry: '//*[@class="gr-cms-form-container"]//button | //*[contains(@class,"find-registry-block")]//button | (//*[@type="submit"])[1]',
  txtResultMessage: '//*[@class="result-message hidden-xs"]/span',
  lnkRegistryContainer: '//*[@data-testid="registry-list-item-container"]',
  btnSortBy: '//*[@data-testid="registries-list-sort-by"]',
  txtSortingOptions: '//*[@data-testid="registries-list-sort-by"]/option',
  txtRegistrantNameResults: '(//*[@data-testid="registry-list-item-container"]//h2)[X]',
  txtRegistrantEventDetails: '(//*[@class="event-info"])[X]',
  btnGiveaGift: '(//*[@class="registry-block find-registry-block "])[2]/a',

  giftRegistry: {
    editHeader: '.registry-step-edit-title',
    btnContinue: 'button.gift-registry-continue-button',
    btnNext: '[data-testid="wizard-nav-next-button"]',
    btnSignin: '#okta-signin-submit',
    txtEventDate: 'input[name="date"]',
    txtNumberOfGuests: 'input[name="guestCount"]',
    txtFirstName: 'input[name="firstName"]',
    txtLastName: 'input[name="lastName"]',
    txtEmail: 'input[name="email"]',
    txtPassword: 'input[name="password"]',
    lblAccountLoginHeader: '.form-sign-in-title',
    lblAccountCreateHeader: '.step-create-account-form-titles',
    txtPhone: '#gr-phone',
    ddlRegistryType: 'select[name="registryType"]',
    txtAddress1: 'input[name="gr-address-address"]',
    txtCity: 'input[name="gr-address-city"]',
    ddlState: 'select[name="gr-address-stateOrProvince"]',
    txtPostalCode: 'input[name="gr-address-postalCode"]',
    chkCoHasCoRegistrant: 'input[name="hasCoRegistrant"]',
    chkHasCoRegistrant: '//label[contains(@for,"gr-hasCoRegistrant")]',
    ddlLocation: 'select[name="location"]',
    ddlPreferredStore: 'select[name="preferredStore"]',
    rdoDisplayPref_public_wrapper: 'div[data-testid="displayPreference-public"]',
    rdoDisplayPref_public: '[data-testid="displayPreference-publicGlobal-element"]',
    chkPreferences_sms: 'div[data-testid="preferences-smsOptIn"]',
    coRegistrant: {
      firstName: '#gr-coRegistrantFirstName',
      lastName: '#gr-coRegistrantLastName',
      phone: '#gr-coRegistrantPhone',
      email: '#gr-coRegistrantEmail',
      password: '#StrongPassword'
    },
    location: {
      beforeAddress: {
        txtAddress1: '#gr-ship-before-gr-address',
        txtAddress2: '#gr-ship-before-gr-address2',
        txtPostalCode: '#gr-ship-before-gr-postalCode',
        txtCity: '#gr-ship-before-gr-city',
        ddlState: '#gr-ship-before-stateOrProvince'
      },
      afterAddress: {
        txtAddress1: '#gr-ship-after-gr-address',
        txtAddress2: '#gr-ship-after-gr-address2',
        txtPostalCode: '#gr-ship-after-gr-postalCode',
        txtCity: '#gr-ship-after-gr-city',
        ddlState: '#gr-ship-after-stateOrProvince'
      }
    }
  }
};
