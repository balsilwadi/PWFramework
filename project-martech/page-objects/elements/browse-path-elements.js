module.exports = {
  signInInterruptor: {
    dlgPopupWindow: '#popup-content',
    lnkPopupWindowclose: '#popup-close'
  },

  homePage: {
    txtCbLogo: '(//*[@class="header-svg-logo"])[1]',
    txtIdentityAuthUsrname: '#Username',
    txtIdentityAuthPwd: '#Password',
    btnIdentityAuthSignInButton: "button[value*='login']",
    txtSearchTxtBox: '#site-search-input',
    btnSearchButton: '//div[contains(@class,"site-search-input-buttons")]//button[2]',
    lnkCustomerServiceLink: "//div[@class='footer-links']/div[2]//ul/li[1]/a",
    lnkOrderOrSignInLink: '[class="account-link"]',
    btnSignInCreatActPopup: '[class="global-flyout header-account-container"]',
    lnkSignInOrCreatActLink: '[class="header-account-svg-icon svg-icon-account-outline"]',
    btnCreateAccountButton: '[class="button button-primary button-lg button-full-width create-account-link"]',
    lnkAcntHeaderLink: '.header-account-link',
    lnkCB2USSignInLink: '.account-icon-link',
    lnkCB2USSignInLinkLbl: "//ul[@class='account-flyout-menu']//li[1]",
    txtCartCount: '//*[@data-testid="cart-count"]',
    txtFavCount: '//*[@data-testid="favorites-count"]',
    btnCart: '(//div[@class="svg-container"])[4]',
    btnFavorites: '(//div[@class="svg-container"])[3]',
    txtFoundZeroResults: '//div[contains(@class,"search-no-results-actions")]'
  }
};
