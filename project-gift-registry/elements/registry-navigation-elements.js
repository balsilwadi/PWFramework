module.exports = {
  lnkHamburgerMenu: '//*[contains(@class,"header-menu-toggle")]',
  lnkWeddingRegistryHeader: '//*[@id="Nav_Wedding-Registry"] | //*[@id="Nav_Gift-Registry"]',
  lnkWeddingRegistryFooter:
    '//*[@class="footer-gift-registry-links"] | //*[@class="footer-link-col-list"]//a[contains(text(),"Gift Registry")] |//*[@class="footer-gift-registry-links"]',
  txtFindaRegistry: '//*[@id="gr-form-section"]//h2 | //*[contains(@class,"find-registry-block")]/h2',
  btnCreateRegistry: '(//*[contains(text(),"Create My Registry")])[1] | (//a[contains(text(),"Create a Registry")])',
  lnkManageRegistry: '//*[@id="manage-registry-trigger-link"] | //*[@id="mobile-manage-registry-trigger-link"]',
  lnkAccountHeader: '//*[@data-testid="header-account-container"]',
  lnkCreateRegistryHeader: '//*[contains(text(),"Create a Registry")]',
  lnkManageRegistryHeader: '//*[@class="account-flyout-menu"]//a[contains(text(),"My Registries")]',
  txtCreateRegistryHeader: '//*[@class="create-registry-title"]',
  txtManageMyRegistry: '//*[@data-testid="registries-list-container-container"]/h1'
};
